package com.hyvalker.storemanagementapi.repository;


import com.hyvalker.storemanagementapi.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {

}
