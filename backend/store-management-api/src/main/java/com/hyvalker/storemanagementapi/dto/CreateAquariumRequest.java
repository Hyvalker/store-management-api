package com.hyvalker.storemanagementapi.dto;

import com.hyvalker.storemanagementapi.model.AquariumType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateAquariumRequest {

    @NotNull(message = "O ID do cliente é obrigatório.")
    private Long userId;

    @NotBlank(message = "O nome do aquário é obrigatório.")
    private String name;

    private AquariumType type = AquariumType.MARINE;

    private Double volumeLiters;

    private String description;
}
