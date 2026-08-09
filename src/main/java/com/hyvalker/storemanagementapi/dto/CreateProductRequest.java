package com.hyvalker.storemanagementapi.dto;

import com.hyvalker.storemanagementapi.model.Type;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreateProductRequest {

    @Schema(
            description = "Nome do produto.",
            example = "Amphiprion ocellaris (peixe-palhaço)"
    )
    @NotBlank(message = "O nome não pode estar em branco.")
    private String name;

    @Schema (
            description = "Quantidade disponível em estoque.",
            example = "10"
    )
    @NotNull(message = "A quantidade não pode ser nula.")
    @PositiveOrZero(message = "A quantidade não pode ser negativa.")
    private Integer quantity;

    @Schema (
            description = "Tipo do produto.",
            example = "LIVING"
    )
    @NotNull(message = "O tipo não pode ser nulo.")
    private Type type;

    @Schema (
            description = "Preço de custo unitário do produto.",
            example = "50.00"
    )
    @NotNull(message = "O preço não pode ser nulo.")
    @PositiveOrZero(message = "O preço de custo não pode ser negativo.")
    private BigDecimal costPrice;

    @Schema (
            description = "Preço final de venda. Pode ser informado diretamente ou calculado a patir da margem de lucro.",
            example = "85,00"
    )
    @PositiveOrZero(message = "O preço final não pode ser negativo.")
    private BigDecimal salePrice;

    @Schema (
            description = "Margem de lucro sobre o custo. Pode ser informada diretamente ou calculada a partir do preço final.",
            example = "70,00"
    )
    @PositiveOrZero(message = "A margem de lucro não pode ser negativa.")
    private BigDecimal profitMargin;

    @Schema (
            description = "Código de barras do produto.",
            example = "7891234567890"
    )
    @NotBlank(message = "O código do produto não pode estar em branco.")
    private String barcode;
}
