package com.hyvalker.storemanagementapi.controller;

import com.hyvalker.storemanagementapi.dto.StoreSettingDTO;
import com.hyvalker.storemanagementapi.dto.UpdateStoreSettingRequest;
import com.hyvalker.storemanagementapi.exception.ApiError;
import com.hyvalker.storemanagementapi.service.StoreSettingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Tag(name = "Settings", description = "Endpoints para gerenciamento de configurações globais e regras da loja.")
@RestController
@RequestMapping("/settings")
@RequiredArgsConstructor
public class StoreSettingController {

    private final StoreSettingService storeSettingService;

    @Operation(summary = "Obtém todas as configurações da loja em formato de mapa chave-valor.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Configurações listadas com sucesso.")
    })
    @GetMapping
    public ResponseEntity<Map<String, String>> getAllSettings() {
        return ResponseEntity.ok(storeSettingService.findAllAsMap());
    }

    @Operation(summary = "Obtém uma configuração específica pelo nome da chave.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Configuração retornada com sucesso."),
            @ApiResponse(responseCode = "404", description = "Configuração não encontrada.")
    })
    @GetMapping("/{key}")
    public ResponseEntity<StoreSettingDTO> getSettingByKey(@PathVariable String key) {
        return storeSettingService.findByKey(key)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Salva ou atualiza uma configuração global da loja (Exclusivo para ADMIN).")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Configuração salva com sucesso."),
            @ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos.",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ApiError.class)
                    )),
            @ApiResponse(responseCode = "403", description = "Apenas administradores podem alterar configurações globais.",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ApiError.class)
                    ))
    })
    @PutMapping("/{key}")
    public ResponseEntity<StoreSettingDTO> updateSetting(
            @PathVariable String key,
            @Valid @RequestBody UpdateStoreSettingRequest request,
            Authentication authentication) {

        String operatorName = (authentication != null && authentication.getName() != null)
                ? authentication.getName()
                : "admin";

        StoreSettingDTO updated = storeSettingService.saveSetting(key, request.getValue(), operatorName);
        return ResponseEntity.ok(updated);
    }
}
