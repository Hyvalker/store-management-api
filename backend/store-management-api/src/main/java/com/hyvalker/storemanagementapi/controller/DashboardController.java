package com.hyvalker.storemanagementapi.controller;

import com.hyvalker.storemanagementapi.dto.DashboardSummaryDTO;
import com.hyvalker.storemanagementapi.dto.ProductSalesRankingDTO;
import com.hyvalker.storemanagementapi.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/summary")
    public DashboardSummaryDTO getSummary(
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime from,

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime to
    ) {
        return dashboardService.getSummary(from, to);
    }

    @GetMapping("/top-products")
    public List<ProductSalesRankingDTO> getTopSellingProducts(
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime from,

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime to,

            @RequestParam
            Integer limit
    ) {
        return dashboardService.getTopSellingProducts(from, to, limit);
    }
}
