package com.hyvalker.storemanagementapi.dto;


import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class CreateOrderRequest {

    @NotEmpty(message = "A venda deve possuir pelo menos um item.")
    @Valid
    private List<CreateOrderItemRequest> items;

    
}
