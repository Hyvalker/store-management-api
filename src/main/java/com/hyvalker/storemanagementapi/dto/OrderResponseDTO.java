package com.hyvalker.storemanagementapi.dto;

import com.hyvalker.storemanagementapi.model.Order;
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

    public OrderResponseDTO (Order order) {
        this.id = order.getId();
        this.totalPrice = order.getTotalPrice();
        this.createdAt = order.getCreatedAt();
        this.items = order.getItems()
                .stream()
                .map(OrderItemResponseDTO::new)
                .toList();
    }
}
