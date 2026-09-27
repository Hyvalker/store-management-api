package com.hyvalker.storemanagementapi.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import lombok.Data;

@Data
@Schema(description = "Dados para registrar uma saída de estoque por perda.")
public class CreateStockLossRequest {

    @Schema(description = "ID do produto que terá estoque reduzido.", example = "15")
    @NotNull(message = "O produto deve ser informado.")
    private Long productId;

    @Schema(description = "Quantidade perdida.", example = "1")
    @NotNull(message = "A quantidade deve ser informada.")
    @Positive(message = "A quantidade deve ser maior que zero.")
    private Integer quantity;

    @Schema(description = "Motivo da perda.", example = "Morte do animal.")
    @NotBlank(message = "O motivo da perda deve ser informado.")
    private String reason;

}
