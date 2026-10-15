package com.hyvalker.storemanagementapi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateAquariumNoteRequest {

    private Long aquariumId;

    private LocalDateTime noteDate = LocalDateTime.now();

    private String title;

    @NotBlank(message = "O conteúdo da anotação não pode ficar vazio.")
    private String content;

    private String authorName;
}
