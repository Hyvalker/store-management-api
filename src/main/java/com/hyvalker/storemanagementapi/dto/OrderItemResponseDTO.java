package com.hyvalker.storemanagementapi.dto;

import com.hyvalker.storemanagementapi.model.OrderItem;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrderItemResponseDTO {

    @Schema(description = "ID do produto incluído no pedido.", example = "1")
    private Long productId;

    @Schema(description = "Nome do produto incluído no pedido.", example = "Filtro externo Sunsun HBL-802")
    private String productName;

    @Schema(description = "Quantidade comprada do produto.", example = "2")
    private Integer quantity;

    @Schema(description = "Preço unitário do produto no momento da compra.", example = "149.90")
    private BigDecimal unitPrice;

    @Schema(description = "Subtotal do item, calculado por quantidade x preço unitário.", example = "299.80")
    private BigDecimal subtotal;



    public OrderItemResponseDTO (OrderItem orderItem) {

        this.productId = orderItem.getProduct().getId();
        this.productName = orderItem.getProduct().getName();
        this.quantity = orderItem.getQuantity();
        this.unitPrice = orderItem.getUnitPrice();
        this.subtotal = orderItem.getSubtotal();
    }
}
