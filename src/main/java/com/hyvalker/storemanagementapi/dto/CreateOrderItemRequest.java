package com.hyvalker.storemanagementapi.dto;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class CreateOrderItemRequest {

    @NotNull(message = "Produto obrigatório.")
    private Long productId;

    @NotNull(message = "Quantidade obrigatória.")
    @Positive(message = "Quantidade deve ser maior que zero.")
    private Integer quantity;
}
