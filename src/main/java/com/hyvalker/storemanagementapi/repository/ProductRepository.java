package com.hyvalker.storemanagementapi.repository;

import com.hyvalker.storemanagementapi.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository <Product, Long>{
    List<Product> findByActiveTrue();
    Optional<Product> findByBarcode(String barcode);
    List<Product> findByNameContainingIgnoreCaseAndActiveTrue(String name);
}
