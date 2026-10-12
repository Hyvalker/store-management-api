package com.hyvalker.storemanagementapi.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * Chamado quando alguém AUTENTICADO tenta acessar algo que o papel dele não permite
 * (ex.: um OPERATOR tentando abrir o painel gerencial).
 * Responde <b>403 Forbidden</b> ("sei quem você é, mas você não pode fazer isso").
 */
@Component
public class RestAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request,
                       HttpServletResponse response,
                       AccessDeniedException accessDeniedException) throws IOException {

        SecurityErrorWriter.write(response, HttpServletResponse.SC_FORBIDDEN,
                "Você não tem permissão para realizar esta ação. Solicite a um administrador.");
    }
}
