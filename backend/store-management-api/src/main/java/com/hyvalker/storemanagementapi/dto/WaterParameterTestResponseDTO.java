package com.hyvalker.storemanagementapi.dto;

import com.hyvalker.storemanagementapi.model.WaterParameterTest;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class WaterParameterTestResponseDTO {

    private Long id;
    private Long aquariumId;
    private String aquariumName;
    private LocalDateTime testDate;

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

    private String clientReport;
    private String diagnosisNotes;

    private LocalDateTime createdAt;

    public WaterParameterTestResponseDTO(WaterParameterTest test) {
        this.id = test.getId();
        this.aquariumId = test.getAquarium() != null ? test.getAquarium().getId() : null;
        this.aquariumName = test.getAquarium() != null ? test.getAquarium().getName() : null;
        this.testDate = test.getTestDate();
        this.ph = test.getPh();
        this.ammonia = test.getAmmonia();
        this.nitrite = test.getNitrite();
        this.nitrate = test.getNitrate();
        this.phosphate = test.getPhosphate();
        this.kh = test.getKh();
        this.gh = test.getGh();
        this.salinity = test.getSalinity();
        this.calcium = test.getCalcium();
        this.magnesium = test.getMagnesium();
        this.temperature = test.getTemperature();
        this.silicate = test.getSilicate();
        this.clientReport = test.getClientReport();
        this.diagnosisNotes = test.getDiagnosisNotes();
        this.createdAt = test.getCreatedAt();
    }
}
