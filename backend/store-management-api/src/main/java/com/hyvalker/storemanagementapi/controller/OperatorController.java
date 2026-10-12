package com.hyvalker.storemanagementapi.controller;

import com.hyvalker.storemanagementapi.dto.CreateOperatorRequest;
import com.hyvalker.storemanagementapi.dto.OperatorResponseDTO;
import com.hyvalker.storemanagementapi.dto.ResetPasswordRequest;
import com.hyvalker.storemanagementapi.dto.UpdateOperatorRequest;
import com.hyvalker.storemanagementapi.exception.ApiError;
import com.hyvalker.storemanagementapi.model.Operator;
import com.hyvalker.storemanagementapi.service.OperatorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/** Gestão de operadores. Todas as rotas exigem ROLE_ADMIN (regra "/operators/**" no SecurityConfig). */
@Tag(name = "Operators", description = "Gestão dos operadores do sistema (somente ADMIN).")
@RequiredArgsConstructor
@RestController
@RequestMapping("/operators")
public class OperatorController {

    private final OperatorService operatorService;

    @Operation(summary = "Lista todos os operadores (ativos e inativos).")
    @GetMapping
    public List<OperatorResponseDTO> findAll() {
        return operatorService.findAll();
    }

    @Operation(summary = "Cadastra um novo operador.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Operador cadastrado com sucesso."),
            @ApiResponse(responseCode = "409", description = "Usuário já existente.",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiError.class)))
    })
    @PostMapping
    public ResponseEntity<OperatorResponseDTO> create(@Valid @RequestBody CreateOperatorRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(operatorService.create(request));
    }

    @Operation(summary = "Atualiza nome, papel e status de um operador.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operador atualizado com sucesso."),
            @ApiResponse(responseCode = "404", description = "Operador não encontrado.",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiError.class))),
            @ApiResponse(responseCode = "409", description = "Operação removeria o último administrador ativo ou o seu próprio acesso.",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiError.class)))
    })
    @PutMapping("/{id}")
    public ResponseEntity<OperatorResponseDTO> update(@PathVariable Long id,
                                                      @Valid @RequestBody UpdateOperatorRequest request,
                                                      @AuthenticationPrincipal Operator current) {
        return ResponseEntity.ok(operatorService.update(id, request, current));
    }

    @Operation(summary = "Redefine a senha de um operador.")
    @PatchMapping("/{id}/password")
    public ResponseEntity<Void> resetPassword(@PathVariable Long id,
                                              @Valid @RequestBody ResetPasswordRequest request) {
        operatorService.resetPassword(id, request);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Desativa um operador (ele perde o acesso imediatamente).")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deactivate(@PathVariable Long id,
                                           @AuthenticationPrincipal Operator current) {
        operatorService.deactivate(id, current);
        return ResponseEntity.noContent().build();
    }
}
