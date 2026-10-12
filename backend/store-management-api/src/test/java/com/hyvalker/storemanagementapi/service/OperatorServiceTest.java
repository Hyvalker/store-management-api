package com.hyvalker.storemanagementapi.service;

import com.hyvalker.storemanagementapi.dto.CreateOperatorRequest;
import com.hyvalker.storemanagementapi.dto.OperatorResponseDTO;
import com.hyvalker.storemanagementapi.dto.ResetPasswordRequest;
import com.hyvalker.storemanagementapi.dto.UpdateOperatorRequest;
import com.hyvalker.storemanagementapi.exception.InvalidOperatorOperationException;
import com.hyvalker.storemanagementapi.exception.OperatorNotFoundException;
import com.hyvalker.storemanagementapi.model.Operator;
import com.hyvalker.storemanagementapi.model.OperatorRole;
import com.hyvalker.storemanagementapi.repository.OperatorRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OperatorServiceTest {

    @Mock
    private OperatorRepository operatorRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private OperatorService operatorService;

    private Operator createOperator(Long id, String name, String username, OperatorRole role, boolean active) {
        Operator op = new Operator();
        op.setId(id);
        op.setName(name);
        op.setUsername(username);
        op.setPassword("$2a$10$encodedHash");
        op.setRole(role);
        op.setActive(active);
        return op;
    }

    @Test
    @DisplayName("Deve listar todos os operadores ordenados")
    void shouldFindAllOperators() {
        Operator op1 = createOperator(1L, "Admin", "admin", OperatorRole.ADMIN, true);
        Operator op2 = createOperator(2L, "Marcelo", "marcelo", OperatorRole.OPERATOR, true);

        when(operatorRepository.findAllByOrderByActiveDescNameAsc()).thenReturn(List.of(op1, op2));

        List<OperatorResponseDTO> result = operatorService.findAll();

        assertThat(result).hasSize(2);
        assertThat(result.get(0).getUsername()).isEqualTo("admin");
        assertThat(result.get(1).getUsername()).isEqualTo("marcelo");
    }

    // ==========================================
    // CREATE OPERATOR TESTS
    // ==========================================

    @Test
    @DisplayName("Deve criar operador com sucesso e codificar a senha")
    void shouldCreateOperatorSuccessfully() {
        CreateOperatorRequest request = new CreateOperatorRequest();
        request.setName("Novo Atendente");
        request.setUsername(" Atendente1 ");
        request.setPassword("senha123");
        request.setRole(OperatorRole.OPERATOR);

        when(operatorRepository.existsByUsernameIgnoreCase("atendente1")).thenReturn(false);
        when(passwordEncoder.encode("senha123")).thenReturn("$2a$10$senhaCodificada");
        when(operatorRepository.save(any(Operator.class))).thenAnswer(invocation -> {
            Operator saved = invocation.getArgument(0);
            saved.setId(10L);
            return saved;
        });

        OperatorResponseDTO response = operatorService.create(request);

        assertThat(response).isNotNull();
        assertThat(response.getId()).isEqualTo(10L);
        assertThat(response.getUsername()).isEqualTo("atendente1");
        assertThat(response.getRole()).isEqualTo(OperatorRole.OPERATOR);
        assertThat(response.getActive()).isTrue();
        verify(passwordEncoder).encode("senha123");
        verify(operatorRepository).save(any(Operator.class));
    }

    @Test
    @DisplayName("Deve falhar ao criar operador com username duplicado")
    void shouldFailWhenUsernameAlreadyExists() {
        CreateOperatorRequest request = new CreateOperatorRequest();
        request.setName("Outro Admin");
        request.setUsername("admin");
        request.setPassword("123456");
        request.setRole(OperatorRole.ADMIN);

        when(operatorRepository.existsByUsernameIgnoreCase("admin")).thenReturn(true);

        assertThatThrownBy(() -> operatorService.create(request))
                .isInstanceOf(InvalidOperatorOperationException.class)
                .hasMessageContaining("Já existe um operador com o usuário");

        verify(operatorRepository, never()).save(any());
    }

    // ==========================================
    // UPDATE OPERATOR TESTS
    // ==========================================

    @Test
    @DisplayName("Deve atualizar operador com sucesso")
    void shouldUpdateOperatorSuccessfully() {
        Operator target = createOperator(2L, "Nome Antigo", "operador", OperatorRole.OPERATOR, true);
        Operator currentAdmin = createOperator(1L, "Admin Chefe", "admin", OperatorRole.ADMIN, true);

        UpdateOperatorRequest request = new UpdateOperatorRequest();
        request.setName("Nome Novo");
        request.setRole(OperatorRole.ADMIN);
        request.setActive(true);

        when(operatorRepository.findById(2L)).thenReturn(Optional.of(target));
        when(operatorRepository.save(target)).thenReturn(target);

        OperatorResponseDTO response = operatorService.update(2L, request, currentAdmin);

        assertThat(response.getName()).isEqualTo("Nome Novo");
        assertThat(response.getRole()).isEqualTo(OperatorRole.ADMIN);
        verify(operatorRepository).save(target);
    }

    @Test
    @DisplayName("Deve impedir que o administrador remova seu próprio papel de administrador")
    void shouldPreventAdminFromDemotingSelf() {
        Operator admin = createOperator(1L, "Admin Chefe", "admin", OperatorRole.ADMIN, true);

        UpdateOperatorRequest request = new UpdateOperatorRequest();
        request.setName("Admin Chefe");
        request.setRole(OperatorRole.OPERATOR); // tentando rebaixar a si mesmo
        request.setActive(true);

        when(operatorRepository.findById(1L)).thenReturn(Optional.of(admin));

        assertThatThrownBy(() -> operatorService.update(1L, request, admin))
                .isInstanceOf(InvalidOperatorOperationException.class)
                .hasMessageContaining("Você não pode remover o seu próprio acesso");
    }

    @Test
    @DisplayName("Deve impedir rebaixar o único administrador ativo do sistema")
    void shouldPreventDemotingLastActiveAdmin() {
        Operator targetAdmin = createOperator(2L, "Segundo Admin", "admin2", OperatorRole.ADMIN, true);
        Operator currentAdmin = createOperator(1L, "Admin Principal", "admin1", OperatorRole.ADMIN, true);

        UpdateOperatorRequest request = new UpdateOperatorRequest();
        request.setName("Segundo Admin");
        request.setRole(OperatorRole.OPERATOR);
        request.setActive(true);

        when(operatorRepository.findById(2L)).thenReturn(Optional.of(targetAdmin));
        when(operatorRepository.countByRoleAndActiveTrue(OperatorRole.ADMIN)).thenReturn(1L);

        assertThatThrownBy(() -> operatorService.update(2L, request, currentAdmin))
                .isInstanceOf(InvalidOperatorOperationException.class)
                .hasMessageContaining("O sistema precisa ter pelo menos um administrador ativo");
    }

    // ==========================================
    // DEACTIVATE OPERATOR TESTS
    // ==========================================

    @Test
    @DisplayName("Deve impedir que o operador desative a sua própria conta")
    void shouldPreventSelfDeactivation() {
        Operator admin = createOperator(1L, "Admin", "admin", OperatorRole.ADMIN, true);

        when(operatorRepository.findById(1L)).thenReturn(Optional.of(admin));

        assertThatThrownBy(() -> operatorService.deactivate(1L, admin))
                .isInstanceOf(InvalidOperatorOperationException.class)
                .hasMessageContaining("Você não pode desativar a sua própria conta");
    }

    @Test
    @DisplayName("Deve desativar operador comum com sucesso")
    void shouldDeactivateOperatorSuccessfully() {
        Operator target = createOperator(2L, "Operador Comum", "op", OperatorRole.OPERATOR, true);
        Operator admin = createOperator(1L, "Admin", "admin", OperatorRole.ADMIN, true);

        when(operatorRepository.findById(2L)).thenReturn(Optional.of(target));
        when(operatorRepository.save(target)).thenReturn(target);

        operatorService.deactivate(2L, admin);

        assertThat(target.getActive()).isFalse();
        verify(operatorRepository).save(target);
    }

    // ==========================================
    // RESET PASSWORD TESTS
    // ==========================================

    @Test
    @DisplayName("Deve resetar senha de operador e codificar a nova senha")
    void shouldResetPasswordSuccessfully() {
        Operator operator = createOperator(5L, "Alguém", "alguem", OperatorRole.OPERATOR, true);

        ResetPasswordRequest request = new ResetPasswordRequest();
        request.setNewPassword("novasenha123");

        when(operatorRepository.findById(5L)).thenReturn(Optional.of(operator));
        when(passwordEncoder.encode("novasenha123")).thenReturn("$2a$10$hashNova");

        operatorService.resetPassword(5L, request);

        assertThat(operator.getPassword()).isEqualTo("$2a$10$hashNova");
        verify(operatorRepository).save(operator);
    }

    @Test
    @DisplayName("Deve falhar ao buscar operador inexistente")
    void shouldFailWhenOperatorNotFound() {
        when(operatorRepository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> operatorService.resetPassword(999L, new ResetPasswordRequest()))
                .isInstanceOf(OperatorNotFoundException.class);
    }
}
