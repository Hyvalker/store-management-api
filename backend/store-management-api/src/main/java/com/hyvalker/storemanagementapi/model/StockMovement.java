package com.hyvalker.storemanagementapi.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "stock_movements")
public class StockMovement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    private Integer quantity;

    private BigDecimal costPrice;

    private BigDecimal salePrice;

    private BigDecimal profitMargin;

    private String reason;

    @Enumerated(EnumType.STRING)
    private StockMovementType type;

    private LocalDateTime createdAt;
}
