package com.hyvalker.storemanagementapi.dto;

import com.hyvalker.storemanagementapi.model.OperatorRole;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateOperatorRequest {

    @Schema(description = "Nome de exibição do operador.", example = "Carlos Silva")
    @NotBlank(message = "O nome não pode estar em branco.")
    @Size(max = 100, message = "O nome deve ter no máximo 100 caracteres.")
    private String name;

    @Schema(description = "Login (3 a 30 caracteres: letras, números, ponto, hífen ou underline).", example = "carlos")
    @NotBlank(message = "O usuário não pode estar em branco.")
    @Pattern(regexp = "^[a-zA-Z0-9._-]{3,30}$",
            message = "O usuário deve ter de 3 a 30 caracteres (letras, números, '.', '-' ou '_').")
    private String username;

    @Schema(description = "Senha inicial (mínimo 6 caracteres).", example = "senha123")
    @NotBlank(message = "A senha não pode estar em branco.")
    // BCrypt só considera os primeiros 72 bytes da senha; limitamos para evitar surpresas.
    @Size(min = 6, max = 72, message = "A senha deve ter entre 6 e 72 caracteres.")
    private String password;

    @Schema(description = "Papel do operador.", example = "OPERATOR")
    @NotNull(message = "Informe o papel do operador.")
    private OperatorRole role;
}
