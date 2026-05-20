package com.hyvalker.storemanagementapi.exception;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ApiError {

    @Schema(description = "Código HTTP do erro.", example = "400")
    private Integer status;

    @Schema(description = "Mensagem descritiva do erro.", example = "Produto não encontrado.")
    private String error;

    @Schema(description = "Data e hora em que o erro ocorreu.", example = "2026-05-19t23:40:38")
    private LocalDateTime timestamp;

    public ApiError(Integer status, String error) {
        this.timestamp = LocalDateTime.now();
        this.status = status;
        this.error = error;
    }
}
