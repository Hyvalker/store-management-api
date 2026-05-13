package com.hyvalker.storemanagementapi.dto;

import com.hyvalker.storemanagementapi.model.Order;
import com.hyvalker.storemanagementapi.model.OrderStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;


@Data
public class OrderResponseDTO {

    private Long id;
    private BigDecimal totalPrice;
    private LocalDateTime createdAt;
    private List<OrderItemResponseDTO> items;
    private OrderStatus status;

    public OrderResponseDTO (Order order) {
        this.id = order.getId();
        this.totalPrice = order.getTotalPrice();
        this.createdAt = order.getCreatedAt();
        this.status = order.getStatus();
        this.items = order.getItems()
                .stream()
                .map(OrderItemResponseDTO::new)
                .toList();
    }
}
