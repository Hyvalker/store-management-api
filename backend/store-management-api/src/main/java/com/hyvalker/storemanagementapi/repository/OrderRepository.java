package com.hyvalker.storemanagementapi.repository;

import com.hyvalker.storemanagementapi.dto.ProductSalesRankingDTO;
import com.hyvalker.storemanagementapi.model.Order;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("""
            SELECT COALESCE(SUM(o.totalPrice), 0)
            FROM Order o
            WHERE o.status = com.hyvalker.storemanagementapi.model.OrderStatus.PAID
            AND o.createdAt >= :from
            AND o.createdAt < :to
            """)
    BigDecimal calculatedRevenue(
            @Param("from") LocalDateTime from,
            @Param("to") LocalDateTime to
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
            @Param("from") LocalDateTime from,
            @Param("to") LocalDateTime to
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
            @Param("from") LocalDateTime from,
            @Param("to") LocalDateTime to,
            Pageable pageable
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
        ORDER BY SUM(oi.subtotal) DESC
    """)
    List<ProductSalesRankingDTO> findTopRevenueProducts(
            @Param("from") LocalDateTime from,
            @Param("to") LocalDateTime to,
            Pageable pageable
    );

    @Override
    @EntityGraph(attributePaths = {"customer", "items", "items.product"})
    List<Order> findAll();

    @Override
    @EntityGraph(attributePaths = {"customer", "items", "items.product"})
    Optional<Order> findById(Long id);

    @EntityGraph(attributePaths = {"customer", "items", "items.product"})
    List<Order> findByCustomerIdOrderByCreatedAtDesc(Long customerId);

    @EntityGraph(attributePaths = {"customer", "items", "items.product"})
    @Query("SELECT o FROM Order o WHERE o.createdAt >= :from AND o.createdAt <= :to ORDER BY o.createdAt DESC")
    List<Order> findByCreatedAtBetweenOrderByCreatedAtDesc(
            @Param("from") LocalDateTime from,
            @Param("to") LocalDateTime to
    );

    @EntityGraph(attributePaths = {"customer", "items", "items.product"})
    @Query("SELECT o FROM Order o WHERE o.customer.id = :customerId AND o.createdAt >= :from AND o.createdAt <= :to ORDER BY o.createdAt DESC")
    List<Order> findByCustomerIdAndCreatedAtBetweenOrderByCreatedAtDesc(
            @Param("customerId") Long customerId,
            @Param("from") LocalDateTime from,
            @Param("to") LocalDateTime to
    );
}
