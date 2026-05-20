package com.hyvalker.storemanagementapi.dto;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class CreateOrderItemRequest {

    @Schema(description = "ID do produto incluído no pedido.", example = "1")
    @NotNull(message = "O ID do produto é obrigatório.")
    private Long productId;

    @Schema(description = "Quantidade solicitada do produto.", example = "2")
    @NotNull(message = "A quantidade não pode ser nula.")
    @Positive(message = "A quantidade deve ser maior que zero.")
    private Integer quantity;
}
