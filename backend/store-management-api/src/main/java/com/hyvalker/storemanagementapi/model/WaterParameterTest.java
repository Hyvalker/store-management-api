package com.hyvalker.storemanagementapi.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "water_parameter_tests", indexes = {
        @Index(name = "idx_water_tests_aquarium_id", columnList = "aquarium_id"),
        @Index(name = "idx_water_tests_test_date", columnList = "test_date")
})
public class WaterParameterTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "aquarium_id", nullable = false)
    private Aquarium aquarium;

    @Column(nullable = false)
    private LocalDateTime testDate = LocalDateTime.now();

    // Medições Químicas e Físicas (Opcionais)
    private Double ph;
    private Double ammonia;     // ppm
    private Double nitrite;     // ppm
    private Double nitrate;     // ppm
    private Double phosphate;   // ppm
    private Double kh;          // dKH
    private Double gh;          // dGH
    private Double salinity;    // Densidade (ex: 1.025) ou Salinidade ppt (ex: 35)
    private Double calcium;     // ppm (ex: 420)
    private Double magnesium;   // ppm (ex: 1350)
    private Double temperature; // °C (ex: 25.5)
    private Double silicate;    // ppm (ex: 0.1)

    // Relato trazido pelo cliente
    @Column(columnDefinition = "TEXT")
    private String clientReport;

    // Diagnóstico técnico e orientações do especialista / administrador
    @Column(columnDefinition = "TEXT")
    private String diagnosisNotes;

    private LocalDateTime createdAt = LocalDateTime.now();
}
