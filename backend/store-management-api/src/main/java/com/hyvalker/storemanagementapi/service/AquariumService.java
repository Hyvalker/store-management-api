package com.hyvalker.storemanagementapi.service;

import com.hyvalker.storemanagementapi.dto.AquariumResponseDTO;
import com.hyvalker.storemanagementapi.dto.CreateAquariumRequest;
import com.hyvalker.storemanagementapi.dto.CreateWaterParameterTestRequest;
import com.hyvalker.storemanagementapi.dto.WaterParameterTestResponseDTO;
import com.hyvalker.storemanagementapi.exception.UserNotFoundException;
import com.hyvalker.storemanagementapi.model.Aquarium;
import com.hyvalker.storemanagementapi.model.User;
import com.hyvalker.storemanagementapi.model.WaterParameterTest;
import com.hyvalker.storemanagementapi.repository.AquariumRepository;
import com.hyvalker.storemanagementapi.repository.UserRepository;
import com.hyvalker.storemanagementapi.repository.WaterParameterTestRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AquariumService {

    private final AquariumRepository aquariumRepository;
    private final WaterParameterTestRepository testRepository;
    private final UserRepository userRepository;

    public AquariumService(AquariumRepository aquariumRepository,
                           WaterParameterTestRepository testRepository,
                           UserRepository userRepository) {
        this.aquariumRepository = aquariumRepository;
        this.testRepository = testRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<AquariumResponseDTO> findByUserId(Long userId) {
        return aquariumRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(a -> new AquariumResponseDTO(a, testRepository.countByAquariumId(a.getId())))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public AquariumResponseDTO findById(Long id) {
        Aquarium aquarium = aquariumRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Aquário não encontrado com ID: " + id));
        long count = testRepository.countByAquariumId(id);
        return new AquariumResponseDTO(aquarium, count);
    }

    @Transactional
    public AquariumResponseDTO create(CreateAquariumRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new UserNotFoundException("Cliente não encontrado com ID: " + request.getUserId()));

        Aquarium aquarium = new Aquarium();
        aquarium.setUser(user);
        aquarium.setName(request.getName());
        aquarium.setType(request.getType() != null ? request.getType() : com.hyvalker.storemanagementapi.model.AquariumType.MARINE);
        aquarium.setVolumeLiters(request.getVolumeLiters());
        aquarium.setDescription(request.getDescription());
        aquarium.setCreatedAt(LocalDateTime.now());

        Aquarium saved = aquariumRepository.save(aquarium);
        return new AquariumResponseDTO(saved, 0);
    }

    @Transactional
    public AquariumResponseDTO update(Long id, CreateAquariumRequest request) {
        Aquarium aquarium = aquariumRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Aquário não encontrado com ID: " + id));

        aquarium.setName(request.getName());
        if (request.getType() != null) {
            aquarium.setType(request.getType());
        }
        aquarium.setVolumeLiters(request.getVolumeLiters());
        aquarium.setDescription(request.getDescription());

        Aquarium saved = aquariumRepository.save(aquarium);
        long count = testRepository.countByAquariumId(id);
        return new AquariumResponseDTO(saved, count);
    }

    @Transactional
    public void delete(Long id) {
        if (!aquariumRepository.existsById(id)) {
            throw new IllegalArgumentException("Aquário não encontrado com ID: " + id);
        }
        aquariumRepository.deleteById(id);
    }

    // --- Water Parameter Tests ---

    @Transactional(readOnly = true)
    public List<WaterParameterTestResponseDTO> findTestsByAquariumId(Long aquariumId) {
        return testRepository.findByAquariumIdOrderByTestDateDesc(aquariumId)
                .stream()
                .map(WaterParameterTestResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public WaterParameterTestResponseDTO createTest(CreateWaterParameterTestRequest request) {
        Aquarium aquarium = aquariumRepository.findById(request.getAquariumId())
                .orElseThrow(() -> new IllegalArgumentException("Aquário não encontrado com ID: " + request.getAquariumId()));

        WaterParameterTest test = new WaterParameterTest();
        test.setAquarium(aquarium);
        test.setTestDate(request.getTestDate() != null ? request.getTestDate() : LocalDateTime.now());
        test.setPh(request.getPh());
        test.setAmmonia(request.getAmmonia());
        test.setNitrite(request.getNitrite());
        test.setNitrate(request.getNitrate());
        test.setPhosphate(request.getPhosphate());
        test.setKh(request.getKh());
        test.setGh(request.getGh());
        test.setSalinity(request.getSalinity());
        test.setCalcium(request.getCalcium());
        test.setMagnesium(request.getMagnesium());
        test.setTemperature(request.getTemperature());
        test.setSilicate(request.getSilicate());
        test.setClientReport(request.getClientReport());
        test.setDiagnosisNotes(request.getDiagnosisNotes());
        test.setCreatedAt(LocalDateTime.now());

        WaterParameterTest saved = testRepository.save(test);
        return new WaterParameterTestResponseDTO(saved);
    }

    @Transactional
    public WaterParameterTestResponseDTO updateTest(Long testId, CreateWaterParameterTestRequest request) {
        WaterParameterTest test = testRepository.findById(testId)
                .orElseThrow(() -> new IllegalArgumentException("Registro de medição não encontrado com ID: " + testId));

        if (request.getTestDate() != null) {
            test.setTestDate(request.getTestDate());
        }
        test.setPh(request.getPh());
        test.setAmmonia(request.getAmmonia());
        test.setNitrite(request.getNitrite());
        test.setNitrate(request.getNitrate());
        test.setPhosphate(request.getPhosphate());
        test.setKh(request.getKh());
        test.setGh(request.getGh());
        test.setSalinity(request.getSalinity());
        test.setCalcium(request.getCalcium());
        test.setMagnesium(request.getMagnesium());
        test.setTemperature(request.getTemperature());
        test.setSilicate(request.getSilicate());
        test.setClientReport(request.getClientReport());
        test.setDiagnosisNotes(request.getDiagnosisNotes());

        WaterParameterTest saved = testRepository.save(test);
        return new WaterParameterTestResponseDTO(saved);
    }

    @Transactional
    public void deleteTest(Long testId) {
        if (!testRepository.existsById(testId)) {
            throw new IllegalArgumentException("Registro de medição não encontrado com ID: " + testId);
        }
        testRepository.deleteById(testId);
    }
}
