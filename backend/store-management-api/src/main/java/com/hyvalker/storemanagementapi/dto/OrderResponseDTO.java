package com.hyvalker.storemanagementapi.dto;

import com.hyvalker.storemanagementapi.model.Order;
import com.hyvalker.storemanagementapi.model.OrderStatus;
import com.hyvalker.storemanagementapi.model.PaymentMethod;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;


@Data
public class OrderResponseDTO {

    @Schema(description = "ID único do pedido.", example = "1")
    private Long id;

    @Schema(description = "Subtotal bruto do pedido (antes do desconto).", example = "333.11")
    private BigDecimal subtotalPrice;

    @Schema(description = "Percentual de desconto concedido no pedido.", example = "10.0")
    private BigDecimal discountPercentage;

    @Schema(description = "Valor nominal do desconto concedido em reais.", example = "33.31")
    private BigDecimal discountAmount;

    @Schema(description = "Valor total líquido a pagar do pedido.", example = "299.80")
    private BigDecimal totalPrice;

    @Schema(description = "Forma de pagamento utilizada no pedido.", example = "PIX")
    private PaymentMethod paymentMethod;

    @Schema(description = "Data e hora de criação do pedido.", example = "2026-05-19T23:40:38")
    private LocalDateTime createdAt;

    @Schema(description = "Status atual do pedido.", example = "PENDING")
    private OrderStatus status;
    
    @Schema(description = "Lista de itens incluídos no pedido.")
    private List<OrderItemResponseDTO> items;

    @Schema(description = "ID único do cliente.", example = "1")
    private Long customerId;

    @Schema(description = "Nome do cliente.", example = "Alberto de Souza")
    private String customerName;




    public OrderResponseDTO (Order order) {
        this.id = order.getId();
        this.subtotalPrice = order.getSubtotalPrice() != null ? order.getSubtotalPrice() : order.getTotalPrice();
        this.discountPercentage = order.getDiscountPercentage() != null ? order.getDiscountPercentage() : BigDecimal.ZERO;
        this.discountAmount = order.getDiscountAmount() != null ? order.getDiscountAmount() : BigDecimal.ZERO;
        this.totalPrice = order.getTotalPrice();
        this.paymentMethod = order.getPaymentMethod();
        this.createdAt = order.getCreatedAt();
        this.status = order.getStatus();

        if (order.getCustomer() != null) {
            this.customerId = order.getCustomer().getId();
            this.customerName = order.getCustomer().getName();
        } else {
            this.customerName = order.getUnregisteredCustomerName();
        }
        this.items = order.getItems()
                .stream()
                .map(OrderItemResponseDTO::new)
                .toList();
    }
}
