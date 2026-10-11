package com.hyvalker.storemanagementapi.dto;

import com.hyvalker.storemanagementapi.model.AquariumNote;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AquariumNoteResponseDTO {

    private Long id;
    private Long aquariumId;
    private String aquariumName;
    private LocalDateTime noteDate;
    private String title;
    private String content;
    private String authorName;
    private LocalDateTime createdAt;

    public AquariumNoteResponseDTO(AquariumNote note) {
        this.id = note.getId();
        this.aquariumId = note.getAquarium() != null ? note.getAquarium().getId() : null;
        this.aquariumName = note.getAquarium() != null ? note.getAquarium().getName() : null;
        this.noteDate = note.getNoteDate();
        this.title = note.getTitle();
        this.content = note.getContent();
        this.authorName = note.getAuthorName();
        this.createdAt = note.getCreatedAt();
    }
}
