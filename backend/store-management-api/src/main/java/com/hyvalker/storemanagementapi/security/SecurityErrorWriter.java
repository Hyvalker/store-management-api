package com.hyvalker.storemanagementapi.security;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.time.LocalDateTime;

/**
 * Escreve respostas de erro de segurança (401/403) no mesmo formato JSON do {@code ApiError}
 * usado pelo resto da API: {@code {"status": 401, "error": "...", "timestamp": "..."}}.
 *
 * <p>É necessário porque erros de autenticação/autorização acontecem nos FILTROS, antes de
 * a requisição chegar ao controller — então o {@code @ControllerAdvice} não consegue tratá-los.</p>
 */
final class SecurityErrorWriter {

    private SecurityErrorWriter() {
    }

    static void write(HttpServletResponse response, int status, String message) throws IOException {
        response.setStatus(status);
        response.setContentType("application/json;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");

        String json = "{\"status\":" + status
                + ",\"error\":\"" + escape(message) + "\""
                + ",\"timestamp\":\"" + LocalDateTime.now() + "\"}";

        response.getWriter().write(json);
    }

    private static String escape(String value) {
        return value.replace("\\", "\\\\").replace("\"", "\\\"");
    }
}
