package com.hyvalker.storemanagementapi.dto;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class CreateOrderRequest {

    @Schema(description = "Lista de itens incluídos no pedido.")
    @NotEmpty(message = "O pedido deve conter pelo menos um item.")
    @Valid
    private List<CreateOrderItemRequest> items;

    
}
