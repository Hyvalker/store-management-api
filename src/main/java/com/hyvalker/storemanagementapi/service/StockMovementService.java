package com.hyvalker.storemanagementapi.service;

import com.hyvalker.storemanagementapi.model.Product;
import com.hyvalker.storemanagementapi.model.StockMovement;
import com.hyvalker.storemanagementapi.model.StockMovementType;
import com.hyvalker.storemanagementapi.repository.StockMovementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class StockMovementService {

    private final StockMovementRepository stockMovementRepository;

    public StockMovement createEntry(
            Product product,
            Integer quantity,
            BigDecimal costPrice,
            BigDecimal salePrice,
            BigDecimal profitMargin
    ) {
        StockMovement movement = new StockMovement();

        movement.setProduct(product);
        movement.setQuantity(quantity);
        movement.setType(StockMovementType.ENTRY);
        movement.setCostPrice(costPrice);
        movement.setSalePrice(salePrice);
        movement.setProfitMargin(profitMargin);
        movement.setCreatedAt(LocalDateTime.now());

        return stockMovementRepository.save(movement);
    }

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

    public StockMovement createLoss(
            Product product,
            Integer quantity,
            String reason
    ) {
        StockMovement movement = new StockMovement();

        movement.setProduct(product);
        movement.setQuantity(quantity);
        movement.setType(StockMovementType.LOSS);
        movement.setReason(reason);
        movement.setCreatedAt(LocalDateTime.now());

        return stockMovementRepository.save(movement);
    }
}
