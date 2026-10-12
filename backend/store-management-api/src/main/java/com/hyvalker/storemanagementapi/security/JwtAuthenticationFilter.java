package com.hyvalker.storemanagementapi.security;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Filtro executado UMA vez em TODA requisição, antes de chegar no controller.
 *
 * <p>Passo a passo:</p>
 * <ol>
 *     <li>Procura o header {@code Authorization: Bearer <token>}.</li>
 *     <li>Se não houver, apenas segue adiante (a requisição continua "anônima" e,
 *     se a rota exigir login, o Spring Security responde 401).</li>
 *     <li>Se houver, valida o token (assinatura + expiração) e extrai o username.</li>
 *     <li>Busca o operador no banco para garantir que ele ainda existe e está ativo
 *     (assim, desativar um funcionário corta o acesso dele imediatamente, mesmo com token válido).</li>
 *     <li>Coloca o operador autenticado no {@link SecurityContextHolder}. A partir daí, o Spring
 *     Security "sabe" quem está fazendo a requisição e quais roles ele tem.</li>
 * </ol>
 *
 * <p><b>Importante:</b> esta classe NÃO é anotada com {@code @Component} de propósito. Se fosse,
 * o Spring Boot a registraria também como filtro global do servlet e ela rodaria fora da
 * cadeia do Spring Security. Ela é instanciada manualmente no {@code SecurityConfig}.</p>
 */
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    /** Atributo usado para informar ao EntryPoint o motivo da falha (expirado x inválido). */
    public static final String AUTH_ERROR_ATTRIBUTE = "auth_error";
    public static final String AUTH_ERROR_EXPIRED = "expired";
    public static final String AUTH_ERROR_INVALID = "invalid";

    private static final String BEARER_PREFIX = "Bearer ";

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String header = request.getHeader(HttpHeaders.AUTHORIZATION);

        // 1) Sem token -> segue como anônimo
        if (header == null || !header.startsWith(BEARER_PREFIX)) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = header.substring(BEARER_PREFIX.length()).trim();

        try {
            // 2) Valida o token e extrai o username (lança JwtException se inválido/expirado)
            String username = jwtService.extractUsername(token);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                // 3) Confirma no banco que o operador existe e está ativo
                UserDetails operator = userDetailsService.loadUserByUsername(username);

                if (operator.isEnabled()) {
                    // 4) Cria o objeto de autenticação com as roles do operador
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(operator, null, operator.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    // 5) Registra no contexto: a partir daqui a requisição está autenticada
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } else {
                    request.setAttribute(AUTH_ERROR_ATTRIBUTE, AUTH_ERROR_INVALID);
                }
            }
        } catch (ExpiredJwtException ex) {
            request.setAttribute(AUTH_ERROR_ATTRIBUTE, AUTH_ERROR_EXPIRED);
        } catch (JwtException | IllegalArgumentException | UsernameNotFoundException ex) {
            request.setAttribute(AUTH_ERROR_ATTRIBUTE, AUTH_ERROR_INVALID);
        }

        // Sempre continua a cadeia. Se não autenticou, as regras do SecurityConfig decidem (401/403).
        filterChain.doFilter(request, response);
    }
}
