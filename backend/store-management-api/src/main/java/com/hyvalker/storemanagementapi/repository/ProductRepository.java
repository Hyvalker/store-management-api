package com.hyvalker.storemanagementapi.repository;

import com.hyvalker.storemanagementapi.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByActiveTrue();

    Optional<Product> findByBarcode(String barcode);

    List<Product> findByNameContainingIgnoreCaseAndActiveTrue(String name);

    boolean existsByNormalizedName(String normalizedName);

    boolean existsByNormalizedNameAndIdNot(String normalizedName, Long id);

    @Query("""
                    SELECT COALESCE(
                    SUM(p.quantity * p.costPrice),
                    0
                    )
                    FROM Product p
                    WHERE p.active = true
            """)
    BigDecimal calculateInvetoryCostValue();

    @Query("""
                    SELECT COALESCE(
                    SUM(p.quantity * p.salePrice),
                    0
                    )
                    FROM Product p
                    WHERE p.active = true
            """)
    BigDecimal calculateInventorySaleValue();
}
