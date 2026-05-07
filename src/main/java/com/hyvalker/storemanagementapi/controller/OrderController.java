package com.hyvalker.storemanagementapi.controller;


import com.hyvalker.storemanagementapi.dto.CreateOrderRequest;
import com.hyvalker.storemanagementapi.model.Order;
import com.hyvalker.storemanagementapi.model.OrderItem;
import com.hyvalker.storemanagementapi.repository.OrderRepository;
import com.hyvalker.storemanagementapi.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;
    private final OrderRepository orderRepository;

    @PostMapping
    public Order createOrder(@RequestBody CreateOrderRequest request) { return orderService.createOrder(request); }

    @GetMapping
    public List<Order> findAll() { return orderService.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Order> findById(@PathVariable Long id) {
        return orderService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
