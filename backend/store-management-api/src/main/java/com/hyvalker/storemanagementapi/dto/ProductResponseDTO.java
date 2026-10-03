package com.hyvalker.storemanagementapi.dto;

import com.hyvalker.storemanagementapi.model.Product;
import com.hyvalker.storemanagementapi.model.Type;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ProductResponseDTO {

    @Schema(description = "ID único do produto.", example = "1")
    private Long id;

    @Schema(description = "Nome do produto.", example = "Amphiprion ocellaris (peixe-palhaço)")
    private String name;

    @Schema(description = "Tipo do produto.", example = "LIVING")
    private Type type;

    @Schema(description = "Quantidade disponível em estoque.", example = "10")
    private Integer quantity;

    @Schema (description = "Preço de custo unitário.", example = "50.00")
    private BigDecimal costPrice;

    @Schema(description = "Preço final de venda.", example = "85.00")
    private BigDecimal salePrice;

    @Schema(description = "Margem de lucro sobre o custo.", example = "70.00")
    private BigDecimal profitMargin;

    @Schema(description = "Código de barras do produto.", example = "7891234567890")
    private String barcode;

    @Schema(description = "Indica se o produto está ativo.", example = "true")
    private Boolean active;

    @Schema(description = "Data e hora em que o produto foi cadastrado.", example = "2026-08-09T00:30:00")
    private LocalDateTime createdAt;

    public ProductResponseDTO(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.type = product.getType();
        this.quantity = product.getQuantity();
        this.costPrice = product.getCostPrice();
        this.salePrice = product.getSalePrice();
        this.profitMargin = product.getProfitMargin();
        this.barcode = product.getBarcode();
        this.active = product.getActive();
        this.createdAt = product.getCreatedAt();
    }
}
