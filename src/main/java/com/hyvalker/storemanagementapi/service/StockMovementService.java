package com.hyvalker.storemanagementapi.service;

import com.hyvalker.storemanagementapi.model.Product;
import com.hyvalker.storemanagementapi.model.StockMovement;
import com.hyvalker.storemanagementapi.model.StockMovementType;
import com.hyvalker.storemanagementapi.repository.StockMovementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class StockMovementService {

    private final StockMovementRepository stockMovementRepository;

    public StockMovement createMovement(
            Product product,
            Integer quantity,
            StockMovementType type
    ) {
        StockMovement movement = new StockMovement();

        movement.setProduct(product);
        movement.setQuantity(quantity);
        movement.setType(type);
        movement.setCreatedAt(LocalDateTime.now());

        return stockMovementRepository.save(movement);
    }
}
