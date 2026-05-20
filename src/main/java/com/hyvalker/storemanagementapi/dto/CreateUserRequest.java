package com.hyvalker.storemanagementapi.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateUserRequest {

    @Schema(
            description = "Nome completo do usuário.",
            example = "João Silva."
    )
    @NotBlank (message = "O nome não pode estar em branco.")
    private String name;

    @Schema(
            description = "E-mail do usuário.",
            example = "joao.silva@gmail.com"
    )
    @NotBlank (message = "O e-mail não pode estar em branco.")
    @Email (message = "E-mail inválido.")
    private String email;

    @Schema(
            description = "Endereço do usuário.",
            example = "Rua das Acácias, 123"
    )
    @NotBlank (message = "O endereço não pode estar em branco.")
    private String address;

    @Schema(
            description = "Número de celular do usuário.",
            example = "(21) 99999-9999"
    )
    @NotBlank (message = "O número do celular não pode estar em branco.")
    private String phoneNumber;

}
