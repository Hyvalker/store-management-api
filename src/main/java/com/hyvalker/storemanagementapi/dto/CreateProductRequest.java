package com.hyvalker.storemanagementapi.dto;

import com.hyvalker.storemanagementapi.model.Category;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreateProductRequest {

    @NotBlank
    private String name;

    @NotNull
    @PositiveOrZero

    private Integer quantity;

    @NotNull
    @PositiveOrZero
    private BigDecimal price;

    private String description;

    @NotNull
    private Category category;
}
