package com.hyvalker.storemanagementapi.repository;


import com.hyvalker.storemanagementapi.dto.ProductSalesRankingDTO;
import com.hyvalker.storemanagementapi.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("""
            SELECT COALESCE(SUM(oi.subtotal), 0)
            FROM OrderItem oi
            WHERE oi.order.status = com.hyvalker.storemanagementapi.model.OrderStatus.PAID
            AND oi.order.createdAt >= :from
            AND oi.order.createdAt < :to
            """)
    BigDecimal calculatedRevenue(
            LocalDateTime from,
            LocalDateTime to
    );

    @Query("""
                        SELECT COALESCE(
                        SUM(oi.unitCost * oi.quantity),
                        0
                        )
                        FROM OrderItem oi
                        WHERE oi.order.status = com.hyvalker.storemanagementapi.model.OrderStatus.PAID
                        AND oi.order.createdAt >= :from
                        AND oi.order.createdAt < :to
            """)
    BigDecimal calculateSaleCost(
            LocalDateTime from,
            LocalDateTime to
    );

    @Query("""
        SELECT new com.hyvalker.storemanagementapi.dto.ProductSalesRankingDTO(
        oi.product.id,
        oi.product.name,
        SUM(oi.quantity),
        SUM(oi.subtotal)
        )
        FROM OrderItem oi
        WHERE oi.order.status = com.hyvalker.storemanagementapi.model.OrderStatus.PAID
        AND oi.order.createdAt >= :from
        AND oi.order.createdAt < :to
        GROUP BY oi.product.id, oi.product.name
        ORDER BY SUM(oi.quantity) DESC
""")
    List<ProductSalesRankingDTO> findTopSellingProducts(
            LocalDateTime from,
            LocalDateTime to
    );
}
