package com.hyvalker.storemanagementapi.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Schema(description = "Resumo dos principais indicadores do dashboard.")
public class DashboardSummaryDTO {

    @Schema(description = "Receita total das vendas no período.")
    private BigDecimal revenue;

    @Schema(description = "Custo total dos produtos vendidos no período.")
    private BigDecimal salesCost;

    @Schema(description = "Resultado bruto das vendas no período.")
    private BigDecimal grossProfit;

    @Schema(description = "Custo dos produtos perdidos no período.")
    private BigDecimal lossCost;

    @Schema(description = "Valor de venda dos produtos perdidos no período.")
    private BigDecimal lossSalesValue;

    @Schema(description = "Valor de custo do estoque atual.")
    private BigDecimal inventoryCostValue;

    @Schema(description = "Valor de venda do estoque atual.")
    private BigDecimal inventorySaleValue;
}
