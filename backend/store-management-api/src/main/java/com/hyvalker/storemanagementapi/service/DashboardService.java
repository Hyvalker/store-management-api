package com.hyvalker.storemanagementapi.service;

import com.hyvalker.storemanagementapi.dto.DashboardSummaryDTO;
import com.hyvalker.storemanagementapi.dto.ProductSalesRankingDTO;
import com.hyvalker.storemanagementapi.repository.OrderRepository;
import com.hyvalker.storemanagementapi.repository.ProductRepository;
import com.hyvalker.storemanagementapi.repository.StockMovementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final StockMovementRepository stockMovementRepository;

    public DashboardSummaryDTO getSummary(
            LocalDateTime from,
            LocalDateTime to
    ) {
        BigDecimal revenue =
                orderRepository.calculatedRevenue(from, to);

        BigDecimal salesCost =
                orderRepository.calculateSaleCost(from, to);

        BigDecimal lossCost =
                stockMovementRepository.calculateLossCost(from, to);
        BigDecimal lossSalesValue =
                stockMovementRepository.calculateLossSalesValue(from, to);
        DashboardSummaryDTO response = new DashboardSummaryDTO();

        response.setRevenue(revenue);
        response.setSalesCost(salesCost);
        response.setGrossProfit(revenue.subtract(salesCost));
        response.setLossCost(lossCost);
        response.setLossSalesValue(lossSalesValue);
        response.setInventoryCostValue(productRepository.calculateInvetoryCostValue());
        response.setInventorySaleValue(productRepository.calculateInventorySaleValue());

        return response;
    }


    public List<ProductSalesRankingDTO> getTopSellingProducts(
            LocalDateTime from,
            LocalDateTime to,
            Integer limit
    ) {
        if (limit <= 0) {
            throw new IllegalArgumentException(
                    "O limite deve ser maior que zero."
            );
        }

        if (limit > 100) {
            throw new IllegalArgumentException(
                    "O limite não pode ser maior do que 100."
            );
        }

        return orderRepository.findTopSellingProducts(from, to)
                .stream()
                .limit(limit)
                .toList();
    }

}
