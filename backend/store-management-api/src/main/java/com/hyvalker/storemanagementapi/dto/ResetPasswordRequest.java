package com.hyvalker.storemanagementapi.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

/** Usado pelo ADMIN para redefinir a senha de outro operador (ex.: funcionário esqueceu a senha). */
@Data
public class ResetPasswordRequest {

    @Schema(description = "Nova senha (mínimo 6 caracteres).", example = "novaSenha123")
    @NotBlank(message = "A nova senha não pode estar em branco.")
    @Size(min = 6, max = 72, message = "A senha deve ter entre 6 e 72 caracteres.")
    private String newPassword;
}
