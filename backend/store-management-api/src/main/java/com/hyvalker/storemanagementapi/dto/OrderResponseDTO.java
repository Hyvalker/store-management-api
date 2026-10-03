package com.hyvalker.storemanagementapi.dto;

import com.hyvalker.storemanagementapi.model.Order;
import com.hyvalker.storemanagementapi.model.OrderStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;


@Data
public class OrderResponseDTO {

    @Schema(description = "ID único do pedido.", example = "1")
    private Long id;

    @Schema(description = "Valor total do pedido.", example = "299.80")
    private BigDecimal totalPrice;

    @Schema(description = "Data e hora de criação do pedido.", example = "2026-05-19T23:40:38")
    private LocalDateTime createdAt;

    @Schema(description = "Status atual do pedido.", example = "PENDING")
    private OrderStatus status;
    
    @Schema(description = "Lista de itens incluídos no pedido.")
    private List<OrderItemResponseDTO> items;




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
