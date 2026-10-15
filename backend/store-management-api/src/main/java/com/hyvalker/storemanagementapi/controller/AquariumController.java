package com.hyvalker.storemanagementapi.controller;

import com.hyvalker.storemanagementapi.dto.*;
import com.hyvalker.storemanagementapi.service.AquariumService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Aquariums", description = "Endpoints para gerenciamento de aquários e histórico de parâmetros dos clientes.")
@RestController
@RequestMapping("/aquariums")
public class AquariumController {

    private final AquariumService aquariumService;

    public AquariumController(AquariumService aquariumService) {
        this.aquariumService = aquariumService;
    }

    @Operation(summary = "Lista todos os aquários de um cliente específico.")
    @GetMapping("/user/{userId}")
    public List<AquariumResponseDTO> findByUserId(@PathVariable Long userId) {
        return aquariumService.findByUserId(userId);
    }

    @Operation(summary = "Busca detalhes de um aquário pelo ID.")
    @GetMapping("/{id}")
    public AquariumResponseDTO findById(@PathVariable Long id) {
        return aquariumService.findById(id);
    }

    @Operation(summary = "Cadastra um novo aquário para um cliente.")
    @PostMapping
    public ResponseEntity<AquariumResponseDTO> create(@Valid @RequestBody CreateAquariumRequest request) {
        AquariumResponseDTO response = aquariumService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Operation(summary = "Atualiza os dados de um aquário.")
    @PutMapping("/{id}")
    public AquariumResponseDTO update(@PathVariable Long id, @Valid @RequestBody CreateAquariumRequest request) {
        return aquariumService.update(id, request);
    }

    @Operation(summary = "Remove um aquário.")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        aquariumService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // --- Parâmetros e Testes da Água ---

    @Operation(summary = "Lista todas as medições de parâmetros de um aquário.")
    @GetMapping("/{id}/tests")
    public List<WaterParameterTestResponseDTO> findTestsByAquariumId(@PathVariable Long id) {
        return aquariumService.findTestsByAquariumId(id);
    }

    @Operation(summary = "Registra uma nova medição de parâmetros de água para um aquário.")
    @PostMapping("/{id}/tests")
    public ResponseEntity<WaterParameterTestResponseDTO> createTest(
            @PathVariable Long id,
            @Valid @RequestBody CreateWaterParameterTestRequest request) {
        request.setAquariumId(id);
        WaterParameterTestResponseDTO response = aquariumService.createTest(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Operation(summary = "Atualiza uma medição de parâmetros existente.")
    @PutMapping("/tests/{testId}")
    public WaterParameterTestResponseDTO updateTest(
            @PathVariable Long testId,
            @Valid @RequestBody CreateWaterParameterTestRequest request) {
        return aquariumService.updateTest(testId, request);
    }

    @Operation(summary = "Remove uma medição de parâmetros.")
    @DeleteMapping("/tests/{testId}")
    public ResponseEntity<Void> deleteTest(@PathVariable Long testId) {
        aquariumService.deleteTest(testId);
        return ResponseEntity.noContent().build();
    }

    // --- Caderno de Anotações Gerais do Aquário ---

    @Operation(summary = "Lista o histórico de anotações gerais de um aquário.")
    @GetMapping("/{id}/notes")
    public List<AquariumNoteResponseDTO> findNotesByAquariumId(@PathVariable Long id) {
        return aquariumService.findNotesByAquariumId(id);
    }

    @Operation(summary = "Registra uma nova anotação geral para o aquário.")
    @PostMapping("/{id}/notes")
    public ResponseEntity<AquariumNoteResponseDTO> createNote(
            @PathVariable Long id,
            @Valid @RequestBody CreateAquariumNoteRequest request) {
        request.setAquariumId(id);
        AquariumNoteResponseDTO response = aquariumService.createNote(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Operation(summary = "Atualiza uma anotação geral do aquário.")
    @PutMapping("/notes/{noteId}")
    public AquariumNoteResponseDTO updateNote(
            @PathVariable Long noteId,
            @Valid @RequestBody CreateAquariumNoteRequest request) {
        return aquariumService.updateNote(noteId, request);
    }

    @Operation(summary = "Remove uma anotação geral do aquário.")
    @DeleteMapping("/notes/{noteId}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long noteId) {
        aquariumService.deleteNote(noteId);
        return ResponseEntity.noContent().build();
    }
}
