package com.hyvalker.storemanagementapi.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

/** Usado pelo próprio operador logado para trocar a sua senha. */
@Data
public class ChangePasswordRequest {

    @Schema(description = "Senha atual, para confirmar a identidade.", example = "admin123")
    @NotBlank(message = "Informe a senha atual.")
    private String currentPassword;

    @Schema(description = "Nova senha (mínimo 6 caracteres).", example = "novaSenha123")
    @NotBlank(message = "A nova senha não pode estar em branco.")
    @Size(min = 6, max = 72, message = "A nova senha deve ter entre 6 e 72 caracteres.")
    private String newPassword;
}
