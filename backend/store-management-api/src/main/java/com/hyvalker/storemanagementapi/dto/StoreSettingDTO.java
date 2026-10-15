package com.hyvalker.storemanagementapi.dto;

import com.hyvalker.storemanagementapi.model.StoreSetting;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StoreSettingDTO {

    @Schema(description = "Chave identificadora da configuração.", example = "PAYMENT_DISCOUNTS")
    private String key;

    @Schema(description = "Valor serializado em JSON ou texto.", example = "{\"pix\":10,\"money\":5,\"debit\":0,\"credit\":0}")
    private String value;

    @Schema(description = "Data e hora da última alteração.")
    private LocalDateTime updatedAt;

    @Schema(description = "Identificação do operador que alterou.", example = "admin")
    private String updatedBy;

    public StoreSettingDTO(StoreSetting setting) {
        this.key = setting.getKey();
        this.value = setting.getValue();
        this.updatedAt = setting.getUpdatedAt();
        this.updatedBy = setting.getUpdatedBy();
    }
}
