package com.hyvalker.storemanagementapi.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Schema(description = "Ranking de produtos vendidos em determinado período.")
public class ProductSalesRankingDTO {

    @Schema(description = "ID do produto.", example = "2")
    private Long productId;

    @Schema(description = "Nome do produto.", example = "Blue tang (Paracanthurus hepatus)")
    private String productName;

    @Schema(description = "Quantidade total de unidades vendidas.", example = "15")
    private Long quantitySold;

    @Schema(description = "Receita gerada pelo produto no período.", example = "506.25")
    private BigDecimal revenue;

    public ProductSalesRankingDTO(
            Long productId,
            String productName,
            Long quantitySold,
            BigDecimal revenue
    ) {
        this.productId = productId;
        this.productName = productName;
        this.quantitySold = quantitySold;
        this.revenue = revenue;
    }
}
