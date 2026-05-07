package com.hyvalker.storemanagementapi.dto;


import lombok.Data;

@Data
public class CreateOrderItemRequest {

    private Long productId;

    private Integer quantity;
}
