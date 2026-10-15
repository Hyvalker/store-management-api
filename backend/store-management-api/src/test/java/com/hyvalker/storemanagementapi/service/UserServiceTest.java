package com.hyvalker.storemanagementapi.service;

import com.hyvalker.storemanagementapi.dto.CreateUserRequest;
import com.hyvalker.storemanagementapi.dto.UserResponseDTO;
import com.hyvalker.storemanagementapi.exception.UserNotFoundException;
import com.hyvalker.storemanagementapi.model.User;
import com.hyvalker.storemanagementapi.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    @DisplayName("Deve cadastrar cliente com sucesso e normalizar o e-mail em minúsculas")
    void shouldCreateUserSuccessfullyWithNormalizedEmail() {
        CreateUserRequest request = new CreateUserRequest();
        request.setName("  João Silva  ");
        request.setEmail("  Joao.Silva@Gmail.COM  ");
        request.setAddress("Rua A, 100");
        request.setPhoneNumber("(11) 99999-9999");

        when(userRepository.existsByEmailIgnoreCase("joao.silva@gmail.com")).thenReturn(false);
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User user = invocation.getArgument(0);
            user.setId(1L);
            return user;
        });

        UserResponseDTO response = userService.create(request);

        assertThat(response).isNotNull();
        assertThat(response.getId()).isEqualTo(1L);
        assertThat(response.getName()).isEqualTo("João Silva");
        assertThat(response.getEmail()).isEqualTo("joao.silva@gmail.com");

        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());
        User savedUser = userCaptor.getValue();
        assertThat(savedUser.getEmail()).isEqualTo("joao.silva@gmail.com");
        assertThat(savedUser.getActive()).isTrue();
    }

    @Test
    @DisplayName("Deve falhar ao criar cliente quando e-mail já existe")
    void shouldFailToCreateUserWhenEmailAlreadyExists() {
        CreateUserRequest request = new CreateUserRequest();
        request.setName("Carlos Souza");
        request.setEmail("carlos@email.com");
        request.setAddress("Rua B, 200");
        request.setPhoneNumber("(11) 88888-8888");

        when(userRepository.existsByEmailIgnoreCase("carlos@email.com")).thenReturn(true);

        assertThatThrownBy(() -> userService.create(request))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Já existe um cliente cadastrado com o e-mail: carlos@email.com");

        verify(userRepository, never()).save(any());
    }

    @Test
    @DisplayName("Deve falhar ao criar cliente quando e-mail é nulo ou em branco")
    void shouldFailToCreateUserWhenEmailIsBlank() {
        CreateUserRequest request = new CreateUserRequest();
        request.setName("Ana Lima");
        request.setEmail("   ");

        assertThatThrownBy(() -> userService.create(request))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("O e-mail do cliente é obrigatório.");

        verify(userRepository, never()).save(any());
    }

    @Test
    @DisplayName("Deve atualizar cliente com sucesso quando o e-mail pertence ao mesmo cliente")
    void shouldUpdateUserSuccessfullyWhenEmailBelongsToSameUser() {
        User existingUser = new User();
        existingUser.setId(10L);
        existingUser.setName("Maria Santos");
        existingUser.setEmail("maria@email.com");
        existingUser.setAddress("Rua Antiga, 50");
        existingUser.setPhoneNumber("(21) 91111-1111");
        existingUser.setActive(true);

        CreateUserRequest updateRequest = new CreateUserRequest();
        updateRequest.setName("Maria Santos Atualizada");
        updateRequest.setEmail("maria@email.com");
        updateRequest.setAddress("Rua Nova, 150");
        updateRequest.setPhoneNumber("(21) 92222-2222");

        when(userRepository.findById(10L)).thenReturn(Optional.of(existingUser));
        when(userRepository.existsByEmailIgnoreCaseAndIdNot("maria@email.com", 10L)).thenReturn(false);
        when(userRepository.save(existingUser)).thenReturn(existingUser);

        Optional<UserResponseDTO> response = userService.update(10L, updateRequest);

        assertThat(response).isPresent();
        assertThat(response.get().getName()).isEqualTo("Maria Santos Atualizada");
        assertThat(response.get().getAddress()).isEqualTo("Rua Nova, 150");
        verify(userRepository).save(existingUser);
    }

    @Test
    @DisplayName("Deve falhar ao atualizar cliente se o novo e-mail já pertencer a outro usuário")
    void shouldFailToUpdateUserWhenEmailBelongsToAnotherUser() {
        User existingUser = new User();
        existingUser.setId(10L);
        existingUser.setName("Maria Santos");
        existingUser.setEmail("maria@email.com");

        CreateUserRequest updateRequest = new CreateUserRequest();
        updateRequest.setName("Maria Santos");
        updateRequest.setEmail("outro.usuario@email.com");

        when(userRepository.findById(10L)).thenReturn(Optional.of(existingUser));
        when(userRepository.existsByEmailIgnoreCaseAndIdNot("outro.usuario@email.com", 10L)).thenReturn(true);

        assertThatThrownBy(() -> userService.update(10L, updateRequest))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Já existe um cliente cadastrado com o e-mail: outro.usuario@email.com");

        verify(userRepository, never()).save(any());
    }

    @Test
    @DisplayName("Deve retornar Optional.empty ao tentar atualizar usuário inexistente")
    void shouldReturnEmptyWhenUpdatingNonExistentUser() {
        CreateUserRequest updateRequest = new CreateUserRequest();
        updateRequest.setName("Fantasma");
        updateRequest.setEmail("fantasma@email.com");

        when(userRepository.findById(999L)).thenReturn(Optional.empty());

        Optional<UserResponseDTO> response = userService.update(999L, updateRequest);

        assertThat(response).isEmpty();
        verify(userRepository, never()).save(any());
    }

    @Test
    @DisplayName("Deve listar apenas usuários ativos")
    void shouldListOnlyActiveUsers() {
        User u1 = new User();
        u1.setId(1L);
        u1.setName("User 1");
        u1.setEmail("u1@email.com");
        u1.setActive(true);

        User u2 = new User();
        u2.setId(2L);
        u2.setName("User 2");
        u2.setEmail("u2@email.com");
        u2.setActive(true);

        when(userRepository.findByActiveTrue()).thenReturn(List.of(u1, u2));

        List<UserResponseDTO> result = userService.findAll();

        assertThat(result).hasSize(2);
        assertThat(result.get(0).getName()).isEqualTo("User 1");
        assertThat(result.get(1).getName()).isEqualTo("User 2");
    }

    @Test
    @DisplayName("Deve buscar usuário por ID com sucesso")
    void shouldFindUserById() {
        User u = new User();
        u.setId(5L);
        u.setName("Marcos");
        u.setEmail("marcos@email.com");
        u.setActive(true);

        when(userRepository.findById(5L)).thenReturn(Optional.of(u));

        Optional<UserResponseDTO> result = userService.findById(5L);

        assertThat(result).isPresent();
        assertThat(result.get().getName()).isEqualTo("Marcos");
    }

    @Test
    @DisplayName("Deve desativar usuário com sucesso (soft-delete)")
    void shouldDeactivateUserSuccessfully() {
        User u = new User();
        u.setId(7L);
        u.setName("Fernanda");
        u.setEmail("fernanda@email.com");
        u.setActive(true);

        when(userRepository.findById(7L)).thenReturn(Optional.of(u));
        when(userRepository.save(u)).thenReturn(u);

        userService.deactivateUser(7L);

        assertThat(u.getActive()).isFalse();
        verify(userRepository).save(u);
    }

    @Test
    @DisplayName("Deve falhar ao desativar usuário inexistente")
    void shouldFailToDeactivateNonExistentUser() {
        when(userRepository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userService.deactivateUser(999L))
                .isInstanceOf(UserNotFoundException.class)
                .hasMessageContaining("Usuário não encontrado.");

        verify(userRepository, never()).save(any());
    }

    @Test
    @DisplayName("Deve reativar usuário desativado com sucesso")
    void shouldReactivateUserSuccessfully() {
        User u = new User();
        u.setId(8L);
        u.setName("Roberto");
        u.setEmail("roberto@email.com");
        u.setActive(false);

        when(userRepository.findById(8L)).thenReturn(Optional.of(u));
        when(userRepository.save(u)).thenReturn(u);

        UserResponseDTO response = userService.reactivateUser(8L);

        assertThat(u.getActive()).isTrue();
        assertThat(response.getActive()).isTrue();
        verify(userRepository).save(u);
    }

    @Test
    @DisplayName("Deve falhar ao reativar usuário que já está ativo")
    void shouldFailToReactivateAlreadyActiveUser() {
        User u = new User();
        u.setId(9L);
        u.setName("Aline");
        u.setEmail("aline@email.com");
        u.setActive(true);

        when(userRepository.findById(9L)).thenReturn(Optional.of(u));

        assertThatThrownBy(() -> userService.reactivateUser(9L))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("O cliente já está ativo.");

        verify(userRepository, never()).save(any());
    }

    @Test
    @DisplayName("Deve listar todos os usuários incluindo inativos quando solicitado")
    void shouldListAllUsersIncludingInactive() {
        User u1 = new User();
        u1.setId(1L);
        u1.setActive(true);

        User u2 = new User();
        u2.setId(2L);
        u2.setActive(false);

        when(userRepository.findAll()).thenReturn(List.of(u1, u2));

        List<UserResponseDTO> result = userService.findAll(true);

        assertThat(result).hasSize(2);
        verify(userRepository).findAll();
    }
}
