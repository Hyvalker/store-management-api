package com.hyvalker.storemanagementapi.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import lombok.Data;

import java.math.BigDecimal;

@Data
@Schema (description = "Dados para registrar uma nova entrada de estoque.")
public class CreateStockEntryRequest {

    @Schema (
            description = "ID do produto que recebrá a entrada.",
            example = "1"
    )
    @NotNull(message = "O produto deve ser informado.")
    private Long productId;

    @Schema (
            description = "Quantidade recebida na entrada.",
            example = "10"
    )
    @NotNull(message = "A quantidade deve ser informada.")
    @Positive(message = "A quantidade deve ser maior que zero.")
    private Integer quantity;

    @Schema (
            description = "Preço de custo unitário desta entrada.",
            example = "25.00"
    )
    @NotNull(message = "O preço de custo deve ser informado.")
    @jakarta.validation.constraints.PositiveOrZero(
            message = "O preço de custo não pode ser negativo."
    )
    private BigDecimal costPrice;

    @Schema (
            description = "Preço de venda unitário desta entrada. Informe este campo ou profitMargin.",
            example = "40.00"
    )
    @jakarta.validation.constraints.PositiveOrZero(
            message = "O preço de venda não pode ser negativo."
    )
    private BigDecimal salePrice;
    @Schema (
            description = "Markup sobre o custo da entrada. Informe este campo ou salePrice.",
            example = "60.00"
    )
    @jakarta.validation.constraints.PositiveOrZero(
            message = "A margem de lucro não pode ser negativa."
    )
    private BigDecimal profitMargin;

}
