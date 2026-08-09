package com.hyvalker.storemanagementapi.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private Type type;

    private Integer quantity;
    private BigDecimal costPrice;
    private BigDecimal salePrice;
    private BigDecimal profitMargin;

    private String barcode;

    private Boolean active = true;

    private LocalDateTime createdAt;
}
