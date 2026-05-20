package com.hyvalker.storemanagementapi.dto;

import com.hyvalker.storemanagementapi.model.Category;
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
            example = "Filtro externo Sunsun UBL-802"
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

    @Schema(
            description = "Preço unitário do produto.",
            example = "149.90"
    )
    @NotNull(message = "O preço não pode ser nulo.")
    @PositiveOrZero(message = "O preço não pode ser negativo.")
    private BigDecimal price;

    @Schema(
            description = "Descrição detalhada do produto.",
            example = "Filtro externo para aquários de água doce de até 100 litros."
    )
    private String description;

    @Schema(
            description = "Categoria do produto.",
            example = "FRESHWATER"
    )
    @NotNull(message = "A categoria não pode ser nula.")
    private Category category;
}
