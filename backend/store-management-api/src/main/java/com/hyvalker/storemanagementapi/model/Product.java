package com.hyvalker.storemanagementapi.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "products", indexes = {
        @Index(name = "idx_products_barcode", columnList = "barcode"),
        @Index(name = "idx_products_normalized_name", columnList = "normalized_name"),
        @Index(name = "idx_products_active", columnList = "active"),
        @Index(name = "idx_products_sub_category", columnList = "sub_category")
})
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (nullable = false)
    private String name;

    @Column(nullable = false)
    private String normalizedName;

    @Enumerated(EnumType.STRING)
    private Type type;

    @Enumerated(EnumType.STRING)
    @Column(name = "sub_category")
    private SubCategory subCategory;

    @Column(name = "image_slug")
    private String imageSlug;

    @Column (nullable = false)
    private Integer quantity;

    @Column (nullable = false)
    private BigDecimal costPrice;

    private BigDecimal salePrice;

    private BigDecimal profitMargin;

    private String barcode;

    @Column (nullable = false)
    private Boolean active = true;

    @Version
    @Column(nullable = false, columnDefinition = "bigint default 0")
    private Long version = 0L;

    @Column (nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
