package com.hyvalker.storemanagementapi.dto;

import com.hyvalker.storemanagementapi.model.Aquarium;
import com.hyvalker.storemanagementapi.model.AquariumType;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AquariumResponseDTO {

    private Long id;
    private Long userId;
    private String userName;
    private String name;
    private AquariumType type;
    private Double volumeLiters;
    private String description;
    private LocalDateTime createdAt;
    private long testsCount;

    public AquariumResponseDTO(Aquarium aquarium, long testsCount) {
        this.id = aquarium.getId();
        this.userId = aquarium.getUser() != null ? aquarium.getUser().getId() : null;
        this.userName = aquarium.getUser() != null ? aquarium.getUser().getName() : null;
        this.name = aquarium.getName();
        this.type = aquarium.getType();
        this.volumeLiters = aquarium.getVolumeLiters();
        this.description = aquarium.getDescription();
        this.createdAt = aquarium.getCreatedAt();
        this.testsCount = testsCount;
    }
}
