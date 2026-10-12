package com.hyvalker.storemanagementapi.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * Chamado quando alguém NÃO AUTENTICADO tenta acessar uma rota protegida.
 * Responde <b>401 Unauthorized</b> ("não sei quem você é").
 *
 * <p>Sem isso, o Spring Security responderia com uma página/header padrão, sem o JSON da API.</p>
 */
@Component
public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException {

        Object reason = request.getAttribute(JwtAuthenticationFilter.AUTH_ERROR_ATTRIBUTE);
        String message;

        if (JwtAuthenticationFilter.AUTH_ERROR_EXPIRED.equals(reason)) {
            message = "Sua sessão expirou. Faça login novamente.";
        } else if (JwtAuthenticationFilter.AUTH_ERROR_INVALID.equals(reason)) {
            message = "Sessão inválida. Faça login novamente.";
        } else if (request.getHeader(HttpHeaders.AUTHORIZATION) == null) {
            message = "Autenticação necessária. Faça login para continuar.";
        } else {
            message = "Não foi possível autenticar a requisição.";
        }

        SecurityErrorWriter.write(response, HttpServletResponse.SC_UNAUTHORIZED, message);
    }
}
