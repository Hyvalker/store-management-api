package com.hyvalker.storemanagementapi.repository;

import com.hyvalker.storemanagementapi.model.Product;
import com.hyvalker.storemanagementapi.model.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByActiveTrue();

    List<Product> findBySubCategoryAndActiveTrue(SubCategory subCategory);

    Optional<Product> findByBarcode(String barcode);

    Optional<Product> findFirstByBarcodeAndActiveTrue(String barcode);

    boolean existsByBarcodeAndActiveTrue(String barcode);

    boolean existsByBarcodeAndIdNotAndActiveTrue(String barcode, Long id);

    List<Product> findByNameContainingIgnoreCaseAndActiveTrue(String name);

    boolean existsByNormalizedName(String normalizedName);

    boolean existsByNormalizedNameAndActiveTrue(String normalizedName);

    boolean existsByNormalizedNameAndIdNot(String normalizedName, Long id);

    boolean existsByNormalizedNameAndIdNotAndActiveTrue(String normalizedName, Long id);

    @org.springframework.data.jpa.repository.Lock(jakarta.persistence.LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT p FROM Product p WHERE p.id = :id")
    Optional<Product> findByIdWithLock(@org.springframework.data.repository.query.Param("id") Long id);

    @Query("""
                    SELECT COALESCE(
                    SUM(p.quantity * p.costPrice),
                    0
                    )
                    FROM Product p
                    WHERE p.active = true
            """)
    BigDecimal calculateInventoryCostValue();

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
