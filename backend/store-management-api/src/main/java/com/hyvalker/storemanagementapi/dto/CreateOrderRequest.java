package com.hyvalker.storemanagementapi.dto;


import com.hyvalker.storemanagementapi.model.PaymentMethod;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class CreateOrderRequest {

    private Long customerId;

    private String customerName;

    @Schema(description = "Forma de pagamento escolhida (PIX, MONEY, DEBIT, CREDIT).", example = "PIX")
    private PaymentMethod paymentMethod;

    @Schema(description = "Percentual de desconto aplicado no pedido (0 a 100%).", example = "10.0")
    @DecimalMin(value = "0.0", message = "O desconto não pode ser negativo.")
    @DecimalMax(value = "100.0", message = "O desconto não pode ser superior a 100%.")
    private BigDecimal discountPercentage;

    @Schema(description = "Lista de itens incluídos no pedido.")
    @NotEmpty(message = "O pedido deve conter pelo menos um item.")
    @Valid
    private List<CreateOrderItemRequest> items;

}
