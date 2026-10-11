package com.hyvalker.storemanagementapi.repository;

import com.hyvalker.storemanagementapi.model.Aquarium;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AquariumRepository extends JpaRepository<Aquarium, Long> {
    List<Aquarium> findByUserIdOrderByCreatedAtDesc(Long userId);
    long countByUserId(Long userId);
}
