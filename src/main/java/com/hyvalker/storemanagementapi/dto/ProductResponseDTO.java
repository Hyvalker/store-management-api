package com.hyvalker.storemanagementapi.dto;


import com.hyvalker.storemanagementapi.model.Category;
import com.hyvalker.storemanagementapi.model.Product;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductResponseDTO {

    private Long id;
    private String name;
    private Integer quantity;
    private BigDecimal price;
    private String description;
    private Category category;
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
