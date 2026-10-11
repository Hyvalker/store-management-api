package com.hyvalker.storemanagementapi.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "aquarium_notes")
public class AquariumNote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "aquarium_id", nullable = false)
    private Aquarium aquarium;

    @Column(nullable = false)
    private LocalDateTime noteDate = LocalDateTime.now();

    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    private String authorName;

    private LocalDateTime createdAt = LocalDateTime.now();
}
