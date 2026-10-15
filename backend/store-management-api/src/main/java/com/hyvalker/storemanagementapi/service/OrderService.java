package com.hyvalker.storemanagementapi.service;

import com.hyvalker.storemanagementapi.dto.CreateOrderItemRequest;
import com.hyvalker.storemanagementapi.dto.CreateOrderRequest;
import com.hyvalker.storemanagementapi.dto.OrderResponseDTO;
import com.hyvalker.storemanagementapi.exception.*;
import com.hyvalker.storemanagementapi.model.*;
import com.hyvalker.storemanagementapi.repository.OrderRepository;
import com.hyvalker.storemanagementapi.repository.ProductRepository;
import com.hyvalker.storemanagementapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final StockMovementService stockMovementService;

    @Transactional
    public OrderResponseDTO createOrder(CreateOrderRequest request) {

        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new InvalidOrderException("O pedido deve ter pelo menos um item");
        }

        Order order = new Order();
        order.setCreatedAt(LocalDateTime.now());
        order.setTotalPrice(BigDecimal.ZERO);
        order.setStatus(OrderStatus.PENDING);

        if (request.getCustomerId() != null) {
            User customer = userRepository.findById(request.getCustomerId())
                    .orElseThrow(() -> new UserNotFoundException (
                            "Cliente com id " + request.getCustomerId() + " não encontrado."
                    ));
            if (!Boolean.TRUE.equals(customer.getActive())) {
                throw new InvalidOrderException("Não é possível criar pedido para um cliente inativo: " + customer.getName());
            }
            order.setCustomer(customer);
        } else if (request.getCustomerName() != null && !request.getCustomerName().trim().isEmpty()) {
            order.setUnregisteredCustomerName(request.getCustomerName().trim());
        }

        BigDecimal grossTotal = BigDecimal.ZERO;

        for (CreateOrderItemRequest itemRequest : request.getItems()) {

            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new ProductNotFoundException(
                            "Produto com id " + itemRequest.getProductId() + " não encontrado."));
            if (Boolean.FALSE.equals(product.getActive())) {
                throw new InvalidOrderException("Produto inativo: " + product.getName());
            }

            if (product.getQuantity() == null) {
                throw new InvalidOrderException("Produto sem estoque definido: " + product.getName());
            }

            if (product.getQuantity() < itemRequest.getQuantity()) {
                throw new InsufficientStockException("Estoque insuficiente para o produto: " + product.getName());
            }

            if (product.getSalePrice() == null) {
                throw new InvalidOrderException("Produto sem preço definido: " + product.getName());
            }

            if (product.getCostPrice() == null) {
                throw new InvalidOrderException(
                        "Produto sem preço de custo definido: " + product.getName());
            }


            OrderItem orderItem = new OrderItem();

            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(itemRequest.getQuantity());

            orderItem.setUnitPrice(product.getSalePrice());
            orderItem.setUnitCost(product.getCostPrice());

            BigDecimal subtotal = product.getSalePrice()
                    .multiply(BigDecimal.valueOf(itemRequest.getQuantity()));

            orderItem.setSubtotal(subtotal);

            order.getItems().add(orderItem);

            grossTotal = grossTotal.add(subtotal);

        }

        order.setSubtotalPrice(grossTotal);

        BigDecimal discountPct = request.getDiscountPercentage() != null ? request.getDiscountPercentage() : BigDecimal.ZERO;
        if (discountPct.compareTo(BigDecimal.ZERO) < 0 || discountPct.compareTo(BigDecimal.valueOf(100)) > 0) {
            throw new InvalidOrderException("O percentual de desconto deve estar entre 0 e 100.");
        }

        BigDecimal discountAmt = grossTotal.multiply(discountPct)
                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
        BigDecimal netTotal = grossTotal.subtract(discountAmt);

        order.setDiscountPercentage(discountPct);
        order.setDiscountAmount(discountAmt);
        order.setTotalPrice(netTotal);
        order.setPaymentMethod(request.getPaymentMethod());

        Order savedOrder = orderRepository.save(order);
        return new OrderResponseDTO(savedOrder);
    }

    @Transactional
    public OrderResponseDTO payOrder(Long id) {
        return payOrder(id, null);
    }

    @Transactional
    public OrderResponseDTO payOrder(Long id, PaymentMethod paymentMethod) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException(
                        "Pedido não encontrado."
                ));

        if (order.getStatus() == OrderStatus.CANCELED) {
            throw new InvalidOrderException(
                    "Não é possível pagar um pedido cancelado."
            );
        }

        if (order.getStatus() == OrderStatus.PAID) {
            throw new InvalidOrderException(
                    "O pedido já foi pago."
            );
        }

        if (paymentMethod != null) {
            order.setPaymentMethod(paymentMethod);
        }

        for (OrderItem item : order.getItems()) {
            Product product = productRepository.findByIdWithLock(item.getProduct().getId())
                    .orElse(item.getProduct());

            if (!Boolean.TRUE.equals(product.getActive())) {
                throw new InvalidOrderException(
                        "Produto inativo: " + product.getName()
                );
            }

            if (product.getQuantity() == null) {
                throw new InvalidOrderException(
                        "Produto sem estoque definido: " + product.getName()
                );
            }

            if (product.getQuantity() < item.getQuantity()) {
                throw new InsufficientStockException(
                        "Estoque insuficiente para o produto: " + product.getName()
                );
            }

            product.setQuantity(
                    product.getQuantity() - item.getQuantity()
            );

            stockMovementService.createMovement(
                    product,
                    item.getQuantity(),
                    StockMovementType.SALE
            );
        }

        order.setStatus(OrderStatus.PAID);

        Order savedOrder = orderRepository.save(order);

        return new OrderResponseDTO(savedOrder);
    }

    public List<OrderResponseDTO> findAll() {
        return findAll(null, null, null);
    }

    public List<OrderResponseDTO> findByCustomerId(Long customerId) {
        return findAll(customerId, null, null);
    }

    public List<OrderResponseDTO> findAll(Long customerId, LocalDateTime from, LocalDateTime to) {
        List<Order> orders;
        if (customerId != null && from != null && to != null) {
            orders = orderRepository.findByCustomerIdAndCreatedAtBetweenOrderByCreatedAtDesc(customerId, from, to);
        } else if (customerId != null) {
            orders = orderRepository.findByCustomerIdOrderByCreatedAtDesc(customerId);
        } else if (from != null && to != null) {
            orders = orderRepository.findByCreatedAtBetweenOrderByCreatedAtDesc(from, to);
        } else {
            orders = orderRepository.findAll();
        }

        return orders.stream()
                .map(OrderResponseDTO::new)
                .toList();
    }

    public Optional<OrderResponseDTO> findById(Long id) {
        return orderRepository.findById(id)
                .map(OrderResponseDTO::new);
    }

    @Transactional
    public OrderResponseDTO cancelOrder(Long id) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException("Pedido não encontrado."));

        if (order.getStatus() == OrderStatus.CANCELED) {
            throw new OrderAlreadyCanceledException("O pedido já foi cancelado.");
        }

        if (order.getStatus() == OrderStatus.PAID) {

            for (OrderItem item : order.getItems()) {

                Product product = productRepository.findByIdWithLock(item.getProduct().getId())
                        .orElse(item.getProduct());

                product.setQuantity(product.getQuantity() + item.getQuantity());

                stockMovementService.createMovement(
                        product,
                        item.getQuantity(),
                        StockMovementType.RETURN
                );
            }
        }

        order.setStatus(OrderStatus.CANCELED);

        Order savedOrder = orderRepository.save(order);
        
        return new OrderResponseDTO(savedOrder);
    }
}
