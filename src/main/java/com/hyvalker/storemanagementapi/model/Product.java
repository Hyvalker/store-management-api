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

    @Column (nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String normalizedName;

    @Enumerated(EnumType.STRING)
    private Type type;

    @Column (nullable = false)
    private Integer quantity;

    @Column (nullable = false)
    private BigDecimal costPrice;

    private BigDecimal salePrice;

    private BigDecimal profitMargin;

    private String barcode;

    @Column (nullable = false)
    private Boolean active = true;

    @Column (nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
