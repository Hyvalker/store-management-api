package com.hyvalker.storemanagementapi.service;

import com.hyvalker.storemanagementapi.dto.CreateOrderItemRequest;
import com.hyvalker.storemanagementapi.dto.CreateOrderRequest;
import com.hyvalker.storemanagementapi.model.Order;
import com.hyvalker.storemanagementapi.model.OrderItem;
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
    public Order createOrder(CreateOrderRequest request) {

        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new RuntimeException("A venda deve possuir pelo menos um item.");
        }

        Order order = new Order();

        order.setCreatedAt(LocalDateTime.now());

        order.setTotalPrice(BigDecimal.ZERO);

        for (CreateOrderItemRequest itemRequest : request.getItems()) {

            if (itemRequest.getQuantity() == null || itemRequest.getQuantity() <= 0) {
                throw new RuntimeException("Quantidade inválida!");
            }

            if (itemRequest.getProductId() == null) {
                throw new RuntimeException("Produto obrigatório.");
            }

            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new RuntimeException(("Produto nao encontrado")));

            if (product.getQuantity() == null) {
                throw new RuntimeException("Produto sem estoque definido: " + product.getName());
            }

            if (product.getQuantity() < itemRequest.getQuantity()) {
                throw new RuntimeException("Estoque insuficiente para o produto: " + product.getName());
            }

            if (product.getPrice() == null) {
                throw new RuntimeException("Produto sem preço definido: " + product.getName());
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
        return orderRepository.save(order);
    }

    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    public Optional<Order> findById(Long id) {
        return orderRepository.findById(id);
    }

}
