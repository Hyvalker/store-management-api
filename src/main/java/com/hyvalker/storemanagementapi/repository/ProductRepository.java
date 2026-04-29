package com.hyvalker.storemanagementapi.repository;

import com.hyvalker.storemanagementapi.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository <Product, Long>{
}
