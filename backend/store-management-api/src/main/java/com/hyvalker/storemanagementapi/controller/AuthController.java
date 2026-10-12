package com.hyvalker.storemanagementapi.controller;

import com.hyvalker.storemanagementapi.dto.ChangePasswordRequest;
import com.hyvalker.storemanagementapi.dto.LoginRequest;
import com.hyvalker.storemanagementapi.dto.LoginResponseDTO;
import com.hyvalker.storemanagementapi.dto.OperatorResponseDTO;
import com.hyvalker.storemanagementapi.exception.ApiError;
import com.hyvalker.storemanagementapi.model.Operator;
import com.hyvalker.storemanagementapi.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Auth", description = "Login e dados do operador autenticado.")
@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @Operation(summary = "Autentica um operador e retorna um token JWT.")
    @SecurityRequirements // rota pública: remove o cadeado no Swagger
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login realizado com sucesso."),
            @ApiResponse(responseCode = "401", description = "Usuário ou senha inválidos, ou operador desativado.",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiError.class)))
    })
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    /**
     * {@code @AuthenticationPrincipal} injeta o operador que o JwtAuthenticationFilter colocou
     * no SecurityContext. Ou seja: o controller recebe "quem está logado" sem nenhuma consulta extra.
     */
    @Operation(summary = "Retorna os dados do operador autenticado.")
    @GetMapping("/me")
    public ResponseEntity<OperatorResponseDTO> me(@AuthenticationPrincipal Operator current) {
        return ResponseEntity.ok(authService.me(current));
    }

    @Operation(summary = "Altera a senha do próprio operador autenticado.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Senha alterada com sucesso."),
            @ApiResponse(responseCode = "409", description = "Senha atual incorreta ou nova senha igual à atual.",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiError.class)))
    })
    @PatchMapping("/me/password")
    public ResponseEntity<Void> changePassword(@AuthenticationPrincipal Operator current,
                                               @Valid @RequestBody ChangePasswordRequest request) {
        authService.changeOwnPassword(current, request);
        return ResponseEntity.noContent().build();
    }
}
