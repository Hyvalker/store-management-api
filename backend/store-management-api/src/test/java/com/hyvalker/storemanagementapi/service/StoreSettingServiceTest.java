package com.hyvalker.storemanagementapi.service;

import com.hyvalker.storemanagementapi.dto.StoreSettingDTO;
import com.hyvalker.storemanagementapi.model.StoreSetting;
import com.hyvalker.storemanagementapi.repository.StoreSettingRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StoreSettingServiceTest {

    @Mock
    private StoreSettingRepository storeSettingRepository;

    @InjectMocks
    private StoreSettingService storeSettingService;

    @Test
    @DisplayName("Deve listar todas as configurações em formato Map")
    void shouldFindAllSettingsAsMap() {
        StoreSetting s1 = new StoreSetting("PAYMENT_DISCOUNTS", "{\"pix\":10}", LocalDateTime.now(), "admin");
        StoreSetting s2 = new StoreSetting("STOCK_ALERTS", "{\"criticalStockThreshold\":2}", LocalDateTime.now(), "admin");

        when(storeSettingRepository.findAll()).thenReturn(List.of(s1, s2));

        Map<String, String> map = storeSettingService.findAllAsMap();

        assertThat(map).hasSize(2);
        assertThat(map.get("PAYMENT_DISCOUNTS")).isEqualTo("{\"pix\":10}");
        assertThat(map.get("STOCK_ALERTS")).isEqualTo("{\"criticalStockThreshold\":2}");
    }

    @Test
    @DisplayName("Deve buscar configuração por chave normalizada")
    void shouldFindSettingByKey() {
        StoreSetting s = new StoreSetting("PAYMENT_DISCOUNTS", "{\"pix\":10}", LocalDateTime.now(), "admin");

        when(storeSettingRepository.findById("PAYMENT_DISCOUNTS")).thenReturn(Optional.of(s));

        Optional<StoreSettingDTO> result = storeSettingService.findByKey("payment_discounts");

        assertThat(result).isPresent();
        assertThat(result.get().getKey()).isEqualTo("PAYMENT_DISCOUNTS");
        assertThat(result.get().getValue()).isEqualTo("{\"pix\":10}");
    }

    @Test
    @DisplayName("Deve criar nova configuração quando chave ainda não existir")
    void shouldCreateNewSetting() {
        when(storeSettingRepository.findById("NEW_KEY")).thenReturn(Optional.empty());
        when(storeSettingRepository.save(any(StoreSetting.class))).thenAnswer(inv -> inv.getArgument(0));

        StoreSettingDTO result = storeSettingService.saveSetting("new_key", "{\"enabled\":true}", "gerente");

        assertThat(result).isNotNull();
        assertThat(result.getKey()).isEqualTo("NEW_KEY");
        assertThat(result.getValue()).isEqualTo("{\"enabled\":true}");
        assertThat(result.getUpdatedBy()).isEqualTo("gerente");
        verify(storeSettingRepository).save(any(StoreSetting.class));
    }

    @Test
    @DisplayName("Deve atualizar configuração existente")
    void shouldUpdateExistingSetting() {
        StoreSetting existing = new StoreSetting("PAYMENT_DISCOUNTS", "{\"pix\":5}", LocalDateTime.now().minusDays(1), "antigo");

        when(storeSettingRepository.findById("PAYMENT_DISCOUNTS")).thenReturn(Optional.of(existing));
        when(storeSettingRepository.save(existing)).thenReturn(existing);

        StoreSettingDTO result = storeSettingService.saveSetting("PAYMENT_DISCOUNTS", "{\"pix\":12}", "admin");

        assertThat(result.getValue()).isEqualTo("{\"pix\":12}");
        assertThat(result.getUpdatedBy()).isEqualTo("admin");
        verify(storeSettingRepository).save(existing);
    }

    @Test
    @DisplayName("Deve falhar ao salvar configuração com chave vazia")
    void shouldFailWhenKeyIsBlank() {
        assertThatThrownBy(() -> storeSettingService.saveSetting("   ", "{}", "admin"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("A chave da configuração é obrigatória");

        verify(storeSettingRepository, never()).save(any());
    }

    @Test
    @DisplayName("Deve falhar ao salvar configuração com valor vazio")
    void shouldFailWhenValueIsBlank() {
        assertThatThrownBy(() -> storeSettingService.saveSetting("KEY", "   ", "admin"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("O valor da configuração não pode estar vazio");

        verify(storeSettingRepository, never()).save(any());
    }
}
