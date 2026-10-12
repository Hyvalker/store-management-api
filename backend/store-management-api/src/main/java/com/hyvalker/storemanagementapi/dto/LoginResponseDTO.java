package com.hyvalker.storemanagementapi.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponseDTO {

    @Schema(description = "Token JWT. Envie em todas as requisições no header 'Authorization: Bearer <token>'.")
    private String token;

    @Schema(description = "Tipo do token.", example = "Bearer")
    private String tokenType;

    @Schema(description = "Validade do token em segundos.", example = "43200")
    private long expiresIn;

    @Schema(description = "Dados do operador autenticado.")
    private OperatorResponseDTO operator;
}
