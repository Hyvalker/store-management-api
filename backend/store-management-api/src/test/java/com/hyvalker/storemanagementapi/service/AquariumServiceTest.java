package com.hyvalker.storemanagementapi.service;

import com.hyvalker.storemanagementapi.dto.AquariumResponseDTO;
import com.hyvalker.storemanagementapi.dto.CreateAquariumRequest;
import com.hyvalker.storemanagementapi.exception.UserNotFoundException;
import com.hyvalker.storemanagementapi.model.Aquarium;
import com.hyvalker.storemanagementapi.model.AquariumType;
import com.hyvalker.storemanagementapi.model.User;
import com.hyvalker.storemanagementapi.repository.AquariumNoteRepository;
import com.hyvalker.storemanagementapi.repository.AquariumRepository;
import com.hyvalker.storemanagementapi.repository.UserRepository;
import com.hyvalker.storemanagementapi.repository.WaterParameterTestRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AquariumServiceTest {

    @Mock
    private AquariumRepository aquariumRepository;

    @Mock
    private WaterParameterTestRepository testRepository;

    @Mock
    private AquariumNoteRepository noteRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AquariumService aquariumService;

    @Test
    @DisplayName("Deve excluir aquário e deletar em cascata medições e anotações vinculadas")
    void shouldDeleteAquariumAndCascadeDeleteTestsAndNotes() {
        Long aquariumId = 1L;
        when(aquariumRepository.existsById(aquariumId)).thenReturn(true);

        aquariumService.delete(aquariumId);

        verify(testRepository, times(1)).deleteByAquariumId(aquariumId);
        verify(noteRepository, times(1)).deleteByAquariumId(aquariumId);
        verify(aquariumRepository, times(1)).deleteById(aquariumId);
    }

    @Test
    @DisplayName("Deve falhar ao tentar excluir aquário inexistente")
    void shouldFailToDeleteNonExistentAquarium() {
        Long aquariumId = 99L;
        when(aquariumRepository.existsById(aquariumId)).thenReturn(false);

        assertThatThrownBy(() -> aquariumService.delete(aquariumId))
                .isInstanceOf(com.hyvalker.storemanagementapi.exception.AquariumNotFoundException.class)
                .hasMessageContaining("Aquário não encontrado");

        verify(testRepository, never()).deleteByAquariumId(any());
        verify(noteRepository, never()).deleteByAquariumId(any());
        verify(aquariumRepository, never()).deleteById(any());
    }

    @Test
    @DisplayName("Deve criar aquário com sucesso")
    void shouldCreateAquariumSuccessfully() {
        User user = new User();
        user.setId(5L);
        user.setName("João Aquarista");

        CreateAquariumRequest request = new CreateAquariumRequest();
        request.setUserId(5L);
        request.setName("Reef Principal");
        request.setType(AquariumType.MARINE);
        request.setVolumeLiters(300.0);
        request.setDescription("Aquário com SPS e LPS");

        when(userRepository.findById(5L)).thenReturn(Optional.of(user));
        when(aquariumRepository.save(any(Aquarium.class))).thenAnswer(invocation -> {
            Aquarium a = invocation.getArgument(0);
            a.setId(10L);
            return a;
        });

        AquariumResponseDTO response = aquariumService.create(request);

        assertThat(response.getId()).isEqualTo(10L);
        assertThat(response.getName()).isEqualTo("Reef Principal");
        assertThat(response.getType()).isEqualTo(AquariumType.MARINE);
        assertThat(response.getVolumeLiters()).isEqualTo(300.0);
        verify(aquariumRepository).save(any(Aquarium.class));
    }

    @Test
    @DisplayName("Deve falhar ao criar aquário para usuário inexistente")
    void shouldFailToCreateAquariumWhenUserNotFound() {
        CreateAquariumRequest request = new CreateAquariumRequest();
        request.setUserId(999L);
        request.setName("Aquário Teste");

        when(userRepository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> aquariumService.create(request))
                .isInstanceOf(UserNotFoundException.class)
                .hasMessageContaining("Cliente não encontrado");
    }

    @Test
    @DisplayName("Deve falhar ao criar aquário para usuário inativo")
    void shouldFailToCreateAquariumWhenUserIsInactive() {
        User inactiveUser = new User();
        inactiveUser.setId(50L);
        inactiveUser.setName("Carlos Inativo");
        inactiveUser.setActive(false);

        CreateAquariumRequest request = new CreateAquariumRequest();
        request.setUserId(50L);
        request.setName("Plantado");

        when(userRepository.findById(50L)).thenReturn(Optional.of(inactiveUser));

        assertThatThrownBy(() -> aquariumService.create(request))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Não é possível cadastrar aquário para um cliente inativo");

        verify(aquariumRepository, never()).save(any());
    }

    @Test
    @DisplayName("Deve buscar aquário por ID trazendo contagem de testes e anotações")
    void shouldFindByIdWithCounts() {
        Aquarium aquarium = new Aquarium();
        aquarium.setId(20L);
        aquarium.setName("Nano Reef");
        aquarium.setType(AquariumType.MARINE);

        when(aquariumRepository.findById(20L)).thenReturn(Optional.of(aquarium));
        when(testRepository.countByAquariumId(20L)).thenReturn(8L);
        when(noteRepository.countByAquariumId(20L)).thenReturn(3L);

        AquariumResponseDTO response = aquariumService.findById(20L);

        assertThat(response.getId()).isEqualTo(20L);
        assertThat(response.getTestsCount()).isEqualTo(8L);
        assertThat(response.getNotesCount()).isEqualTo(3L);
    }

    @Test
    @DisplayName("Deve atualizar aquário preservando a contagem de medições e anotações")
    void shouldUpdateAquariumPreservingTestsAndNotesCounts() {
        Aquarium existing = new Aquarium();
        existing.setId(30L);
        existing.setName("Aquário Original");
        existing.setType(AquariumType.FRESHWATER);
        existing.setVolumeLiters(150.0);

        CreateAquariumRequest request = new CreateAquariumRequest();
        request.setName("Aquário Plantado Renovado");
        request.setType(AquariumType.FRESHWATER);
        request.setVolumeLiters(180.0);
        request.setDescription("Plantado High Tech");

        when(aquariumRepository.findById(30L)).thenReturn(Optional.of(existing));
        when(aquariumRepository.save(existing)).thenReturn(existing);
        when(testRepository.countByAquariumId(30L)).thenReturn(12L);
        when(noteRepository.countByAquariumId(30L)).thenReturn(7L);

        AquariumResponseDTO response = aquariumService.update(30L, request);

        assertThat(response).isNotNull();
        assertThat(response.getName()).isEqualTo("Aquário Plantado Renovado");
        assertThat(response.getVolumeLiters()).isEqualTo(180.0);
        assertThat(response.getTestsCount()).isEqualTo(12L);
        assertThat(response.getNotesCount()).isEqualTo(7L);
    }

    @Test
    @DisplayName("Deve falhar ao criar medição sem aquariumId")
    void shouldFailToCreateTestWhenAquariumIdIsNull() {
        com.hyvalker.storemanagementapi.dto.CreateWaterParameterTestRequest req = new com.hyvalker.storemanagementapi.dto.CreateWaterParameterTestRequest();
        req.setAquariumId(null);

        assertThatThrownBy(() -> aquariumService.createTest(req))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("O ID do aquário é obrigatório");
    }

    @Test
    @DisplayName("Deve falhar ao criar anotação sem aquariumId")
    void shouldFailToCreateNoteWhenAquariumIdIsNull() {
        com.hyvalker.storemanagementapi.dto.CreateAquariumNoteRequest req = new com.hyvalker.storemanagementapi.dto.CreateAquariumNoteRequest();
        req.setAquariumId(null);

        assertThatThrownBy(() -> aquariumService.createNote(req))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("O ID do aquário é obrigatório");
    }

    @Test
    @DisplayName("Deve falhar com AquariumNotFoundException ao buscar aquário inexistente por ID")
    void shouldThrowAquariumNotFoundExceptionWhenAquariumDoesNotExist() {
        when(aquariumRepository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> aquariumService.findById(999L))
                .isInstanceOf(com.hyvalker.storemanagementapi.exception.AquariumNotFoundException.class)
                .hasMessageContaining("Aquário não encontrado com ID: 999");
    }

    @Test
    @DisplayName("Deve falhar com AquariumNotFoundException ao atualizar aquário inexistente")
    void shouldThrowAquariumNotFoundExceptionWhenUpdatingNonExistentAquarium() {
        CreateAquariumRequest req = new CreateAquariumRequest();
        req.setName("Novo Nome");

        when(aquariumRepository.findById(888L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> aquariumService.update(888L, req))
                .isInstanceOf(com.hyvalker.storemanagementapi.exception.AquariumNotFoundException.class)
                .hasMessageContaining("Aquário não encontrado com ID: 888");
    }

    @Test
    @DisplayName("Deve falhar ao criar teste de água quando o cliente dono do aquário está inativo")
    void shouldFailToCreateTestWhenCustomerIsInactive() {
        User inactiveUser = new User();
        inactiveUser.setId(10L);
        inactiveUser.setActive(false);

        Aquarium aquarium = new Aquarium();
        aquarium.setId(1L);
        aquarium.setUser(inactiveUser);

        com.hyvalker.storemanagementapi.dto.CreateWaterParameterTestRequest req = new com.hyvalker.storemanagementapi.dto.CreateWaterParameterTestRequest();
        req.setAquariumId(1L);

        when(aquariumRepository.findById(1L)).thenReturn(Optional.of(aquarium));

        assertThatThrownBy(() -> aquariumService.createTest(req))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Não é possível registrar parâmetros de água para um cliente inativo.");
    }

    @Test
    @DisplayName("Deve falhar ao criar anotação quando o cliente dono do aquário está inativo")
    void shouldFailToCreateNoteWhenCustomerIsInactive() {
        User inactiveUser = new User();
        inactiveUser.setId(10L);
        inactiveUser.setActive(false);

        Aquarium aquarium = new Aquarium();
        aquarium.setId(1L);
        aquarium.setUser(inactiveUser);

        com.hyvalker.storemanagementapi.dto.CreateAquariumNoteRequest req = new com.hyvalker.storemanagementapi.dto.CreateAquariumNoteRequest();
        req.setAquariumId(1L);

        when(aquariumRepository.findById(1L)).thenReturn(Optional.of(aquarium));

        assertThatThrownBy(() -> aquariumService.createNote(req))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Não é possível adicionar anotações para um cliente inativo.");
    }
}
