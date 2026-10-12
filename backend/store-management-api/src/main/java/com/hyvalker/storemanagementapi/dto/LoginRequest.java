package com.hyvalker.storemanagementapi.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {

    @Schema(description = "Login do operador.", example = "admin")
    @NotBlank(message = "Informe o usuário.")
    private String username;

    @Schema(description = "Senha do operador.", example = "admin123")
    @NotBlank(message = "Informe a senha.")
    private String password;
}
