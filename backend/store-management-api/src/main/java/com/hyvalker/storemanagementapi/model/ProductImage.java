package com.hyvalker.storemanagementapi.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product_images")
public class ProductImage {

    @Id
    @Column(name = "product_id")
    private Long productId;

    @JdbcTypeCode(SqlTypes.VARBINARY)
    @Column(name = "image_data", nullable = false)
    private byte[] imageData;

    @Column(name = "content_type", length = 50, nullable = false)
    private String contentType;

    @Column(name = "file_name", length = 255)
    private String fileName;

    @Column(name = "file_size")
    private Long fileSize;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    @PreUpdate
    protected void onSave() {
        this.updatedAt = LocalDateTime.now();
    }
}
