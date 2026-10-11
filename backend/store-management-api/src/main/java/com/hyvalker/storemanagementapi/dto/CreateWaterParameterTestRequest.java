package com.hyvalker.storemanagementapi.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateWaterParameterTestRequest {

    @NotNull(message = "O ID do aquário é obrigatório.")
    private Long aquariumId;

    private LocalDateTime testDate = LocalDateTime.now();

    // Parâmetros (todos opcionais)
    private Double ph;
    private Double ammonia;
    private Double nitrite;
    private Double nitrate;
    private Double phosphate;
    private Double kh;
    private Double gh;
    private Double salinity;
    private Double calcium;
    private Double magnesium;
    private Double temperature;
    private Double silicate;

    // Relato do cliente
    private String clientReport;

    // Diagnóstico e recomendações do especialista / administrador
    private String diagnosisNotes;
}
