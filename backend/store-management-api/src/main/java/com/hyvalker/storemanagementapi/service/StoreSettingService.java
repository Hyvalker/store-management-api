package com.hyvalker.storemanagementapi.service;

import com.hyvalker.storemanagementapi.dto.StoreSettingDTO;
import com.hyvalker.storemanagementapi.model.StoreSetting;
import com.hyvalker.storemanagementapi.repository.StoreSettingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StoreSettingService {

    private final StoreSettingRepository storeSettingRepository;

    public List<StoreSettingDTO> findAll() {
        return storeSettingRepository.findAll()
                .stream()
                .map(StoreSettingDTO::new)
                .toList();
    }

    public Map<String, String> findAllAsMap() {
        return storeSettingRepository.findAll()
                .stream()
                .collect(Collectors.toMap(StoreSetting::getKey, StoreSetting::getValue));
    }

    public Optional<StoreSettingDTO> findByKey(String key) {
        if (key == null) return Optional.empty();
        return storeSettingRepository.findById(key.trim().toUpperCase())
                .map(StoreSettingDTO::new);
    }

    @Transactional
    public StoreSettingDTO saveSetting(String key, String value, String updatedBy) {
        if (key == null || key.isBlank()) {
            throw new IllegalArgumentException("A chave da configuração é obrigatória.");
        }
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("O valor da configuração não pode estar vazio.");
        }

        String normalizedKey = key.trim().toUpperCase();

        StoreSetting setting = storeSettingRepository.findById(normalizedKey)
                .orElseGet(() -> {
                    StoreSetting s = new StoreSetting();
                    s.setKey(normalizedKey);
                    return s;
                });

        setting.setValue(value);
        setting.setUpdatedAt(LocalDateTime.now());
        setting.setUpdatedBy(updatedBy != null ? updatedBy : "system");

        StoreSetting saved = storeSettingRepository.save(setting);
        return new StoreSettingDTO(saved);
    }
}
