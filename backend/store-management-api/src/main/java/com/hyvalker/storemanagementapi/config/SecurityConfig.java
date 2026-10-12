package com.hyvalker.storemanagementapi.config;

import com.hyvalker.storemanagementapi.security.JwtAuthenticationFilter;
import com.hyvalker.storemanagementapi.security.JwtService;
import com.hyvalker.storemanagementapi.security.RestAccessDeniedHandler;
import com.hyvalker.storemanagementapi.security.RestAuthenticationEntryPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Configuração CENTRAL de segurança da API. É aqui que se define:
 * <ul>
 *     <li>quais rotas são públicas e quais exigem login;</li>
 *     <li>quais rotas exigem o papel ADMIN;</li>
 *     <li>que a API é "stateless" (sem sessão no servidor — cada requisição traz seu token);</li>
 *     <li>onde o nosso filtro JWT entra na cadeia de filtros.</li>
 * </ul>
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final RestAuthenticationEntryPoint authenticationEntryPoint;
    private final RestAccessDeniedHandler accessDeniedHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // CSRF protege apps que usam COOKIE de sessão. Como usamos token no header
                // Authorization (que o navegador não envia sozinho), CSRF não se aplica.
                .csrf(AbstractHttpConfigurer::disable)

                // Usa o bean CorsConfigurationSource definido em CorsConfig.
                .cors(Customizer.withDefaults())

                // STATELESS: o servidor não guarda sessão. Quem você é vem SEMPRE do token.
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Desliga os mecanismos padrão (popup de usuário/senha e formulário HTML de login).
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)

                // Respostas JSON padronizadas para 401 (não autenticado) e 403 (sem permissão).
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint(authenticationEntryPoint)
                        .accessDeniedHandler(accessDeniedHandler))

                // ===================== REGRAS DE AUTORIZAÇÃO =====================
                // A ordem importa: a PRIMEIRA regra que casar com a requisição é a aplicada.
                .authorizeHttpRequests(auth -> auth
                        // Preflight do CORS (o navegador manda OPTIONS antes de POST/PUT/etc.)
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Rotas públicas
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                        .requestMatchers("/swagger-ui/**", "/swagger-ui.html", "/v3/api-docs/**").permitAll()
                        .requestMatchers("/error").permitAll()

                        // Somente ADMIN: gestão de operadores e painel gerencial (faturamento/lucro)
                        .requestMatchers("/operators/**").hasRole("ADMIN")
                        .requestMatchers("/dashboard/**").hasRole("ADMIN")

                        // Somente ADMIN: cadastro, edição de preço/custo e remoção de produtos
                        .requestMatchers(HttpMethod.POST, "/products").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/products/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/products/**").hasRole("ADMIN")

                        // Somente ADMIN: desativar clientes
                        .requestMatchers(HttpMethod.DELETE, "/users/**").hasRole("ADMIN")

                        // Todo o resto (vendas, reposição, clientes, aquários...) exige apenas estar logado.
                        // Obs.: o ESTORNO de pedidos pagos é verificado dentro do OrderController.
                        .anyRequest().authenticated())

                // Coloca o filtro JWT ANTES do filtro padrão de usuário/senha do Spring.
                .addFilterBefore(new JwtAuthenticationFilter(jwtService, userDetailsService),
                        UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /**
     * BCrypt: algoritmo de hash próprio para senhas. É propositalmente LENTO e usa "salt"
     * aleatório, então a mesma senha gera hashes diferentes e ataques de força bruta ficam caros.
     * Não existe "descriptografar" — no login o BCrypt refaz o hash da senha digitada e compara.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * O AuthenticationManager é quem efetivamente valida usuário+senha no login.
     * O Spring Boot o monta automaticamente usando o nosso UserDetailsService + PasswordEncoder.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}
