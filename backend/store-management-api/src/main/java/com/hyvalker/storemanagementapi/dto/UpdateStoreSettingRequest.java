package com.hyvalker.storemanagementapi.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateStoreSettingRequest {

    @Schema(description = "Novo valor da configuração em formato JSON ou texto.", example = "{\"pix\":12,\"money\":5,\"debit\":0,\"credit\":0}")
    @NotBlank(message = "O valor da configuração não pode estar em branco.")
    private String value;
}
