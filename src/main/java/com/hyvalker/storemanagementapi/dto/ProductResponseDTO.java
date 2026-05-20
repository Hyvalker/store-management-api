package com.hyvalker.storemanagementapi.dto;


import com.hyvalker.storemanagementapi.model.Category;
import com.hyvalker.storemanagementapi.model.Product;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductResponseDTO {

    @Schema(description = "ID único do produto.", example = "1")
    private Long id;

    @Schema(description = "Nome do produto.", example = "Filtro externo Sunsun HBL-802")
    private String name;

    @Schema(description = "Quantidade disponível em estoque.", example = "10")
    private Integer quantity;

    @Schema(description = "Preço unitário do produto.", example = "149.90")
    private BigDecimal price;

    @Schema(description = "Descrição detalhada do produto.", example = "Filtro externo para aquários de água doce de até 100 litros.")
    private String description;

    @Schema(description = "Categoria do produto.", example = "FRESHWATER")
    private Category category;

    @Schema(description = "Indica se o produto está ativo.", example = "true")
    private Boolean active;



    public ProductResponseDTO(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.quantity = product.getQuantity();
        this.price = product.getPrice();
        this.description = product.getDescription();
        this.category = product.getCategory();
        this.active = product.getActive();
    }
}
