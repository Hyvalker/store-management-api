package com.hyvalker.storemanagementapi.repository;

import com.hyvalker.storemanagementapi.model.StockMovement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockMovementRepository extends JpaRepository<StockMovement, Long> {
}
