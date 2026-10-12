package com.hyvalker.storemanagementapi.dto;

import com.hyvalker.storemanagementapi.model.OperatorRole;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateOperatorRequest {

    @Schema(description = "Nome de exibição do operador.", example = "Carlos Silva")
    @NotBlank(message = "O nome não pode estar em branco.")
    @Size(max = 100, message = "O nome deve ter no máximo 100 caracteres.")
    private String name;

    @Schema(description = "Papel do operador.", example = "OPERATOR")
    @NotNull(message = "Informe o papel do operador.")
    private OperatorRole role;

    @Schema(description = "Se o operador pode acessar o sistema.", example = "true")
    @NotNull(message = "Informe se o operador está ativo.")
    private Boolean active;
}
