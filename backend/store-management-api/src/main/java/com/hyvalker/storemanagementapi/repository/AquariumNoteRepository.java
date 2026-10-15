package com.hyvalker.storemanagementapi.repository;

import com.hyvalker.storemanagementapi.model.AquariumNote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AquariumNoteRepository extends JpaRepository<AquariumNote, Long> {
    List<AquariumNote> findByAquariumIdOrderByNoteDateDesc(Long aquariumId);
    long countByAquariumId(Long aquariumId);

    @org.springframework.data.jpa.repository.Modifying
    @org.springframework.data.jpa.repository.Query("DELETE FROM AquariumNote n WHERE n.aquarium.id = :aquariumId")
    void deleteByAquariumId(@org.springframework.data.repository.query.Param("aquariumId") Long aquariumId);
}
