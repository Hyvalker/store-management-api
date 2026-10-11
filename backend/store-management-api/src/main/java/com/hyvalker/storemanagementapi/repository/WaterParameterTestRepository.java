package com.hyvalker.storemanagementapi.repository;

import com.hyvalker.storemanagementapi.model.WaterParameterTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WaterParameterTestRepository extends JpaRepository<WaterParameterTest, Long> {
    List<WaterParameterTest> findByAquariumIdOrderByTestDateDesc(Long aquariumId);
    long countByAquariumId(Long aquariumId);
}
