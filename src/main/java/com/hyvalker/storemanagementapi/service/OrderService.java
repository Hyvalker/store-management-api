package com.hyvalker.storemanagementapi.service;

import com.hyvalker.storemanagementapi.dto.CreateOrderItemRequest;
import com.hyvalker.storemanagementapi.dto.CreateOrderRequest;
import com.hyvalker.storemanagementapi.dto.OrderResponseDTO;
import com.hyvalker.storemanagementapi.exception.*;
import com.hyvalker.storemanagementapi.model.Order;
import com.hyvalker.storemanagementapi.model.OrderItem;
import com.hyvalker.storemanagementapi.model.OrderStatus;
import com.hyvalker.storemanagementapi.model.Product;
import com.hyvalker.storemanagementapi.repository.OrderRepository;
import com.hyvalker.storemanagementapi.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    private final ProductRepository productRepository;

    @Transactional
    public OrderResponseDTO createOrder(CreateOrderRequest request) {

        Order order = new Order();

        order.setCreatedAt(LocalDateTime.now());

        order.setTotalPrice(BigDecimal.ZERO);

        order.setStatus(OrderStatus.PENDING);

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

            if (product.getPrice() == null) {
                throw new InvalidOrderException("Produto sem preço definido: " + product.getName());
            }

            OrderItem orderItem = new OrderItem();

            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setUnitPrice(product.getPrice());

            BigDecimal subtotal = product.getPrice()
                    .multiply(BigDecimal.valueOf(itemRequest.getQuantity()));

            orderItem.setSubtotal(subtotal);

            order.getItems().add(orderItem);

            order.setTotalPrice(order.getTotalPrice().add(subtotal));

            product.setQuantity(product.getQuantity() - itemRequest.getQuantity());

        }
        Order savedOrder = orderRepository.save(order);
        return new OrderResponseDTO(savedOrder);
    }

    public List<OrderResponseDTO> findAll() {
        return orderRepository.findAll()
                .stream()
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

        for (OrderItem item : order.getItems()) {
            Product product = item.getProduct();

            product.setQuantity(product.getQuantity() + item.getQuantity());
        }

        order.setStatus(OrderStatus.CANCELED);

        Order savedOrder = orderRepository.save(order);
        return new OrderResponseDTO(savedOrder);
    }
}
