package com.hyvalker.storemanagementapi.repository;

import com.hyvalker.storemanagementapi.model.StockMovement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface StockMovementRepository extends JpaRepository<StockMovement, Long> {

    @Query("""
                        SELECT COALESCE(
                        SUM(sm.costPrice * sm.quantity),
                        0
                        )
                        FROM StockMovement sm
                        WHERE sm.type = com.hyvalker.storemanagementapi.model.StockMovementType.LOSS
                        AND sm.createdAt >= :from
                        AND sm.createdAt < :to
            """)
    BigDecimal calculateLossCost(
            LocalDateTime from,
            LocalDateTime to
    );

    @Query("""
                            SELECT COALESCE(
                            SUM(sm.salePrice * sm.quantity),
                            0
                            )
                            FROM StockMovement sm
                            WHERE sm.type = com.hyvalker.storemanagementapi.model.StockMovementType.LOSS
                            AND sm.createdAt >= :from
                            AND sm.createdAt < :to
            """)
    BigDecimal calculateLossSalesValue(
            LocalDateTime from,
            LocalDateTime to
    );
}
