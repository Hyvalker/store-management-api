package com.hyvalker.storemanagementapi.service;

import com.hyvalker.storemanagementapi.dto.ChangePasswordRequest;
import com.hyvalker.storemanagementapi.dto.LoginRequest;
import com.hyvalker.storemanagementapi.dto.LoginResponseDTO;
import com.hyvalker.storemanagementapi.exception.InvalidOperatorOperationException;
import com.hyvalker.storemanagementapi.exception.OperatorNotFoundException;
import com.hyvalker.storemanagementapi.model.Operator;
import com.hyvalker.storemanagementapi.model.OperatorRole;
import com.hyvalker.storemanagementapi.repository.OperatorRepository;
import com.hyvalker.storemanagementapi.security.JwtService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private OperatorRepository operatorRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthService authService;

    private Operator createOperator(Long id, String username, OperatorRole role, boolean active) {
        Operator op = new Operator();
        op.setId(id);
        op.setName("Test Operator");
        op.setUsername(username);
        op.setPassword("$2a$10$encodedHash");
        op.setRole(role);
        op.setActive(active);
        return op;
    }

    // ==========================================
    // LOGIN TESTS
    // ==========================================

    @Test
    @DisplayName("Deve realizar login com sucesso, atualizar último login e retornar JWT")
    void shouldLoginSuccessfully() {
        Operator operator = createOperator(1L, "admin", OperatorRole.ADMIN, true);

        LoginRequest request = new LoginRequest();
        request.setUsername("admin");
        request.setPassword("admin123");

        Authentication authentication = mock(Authentication.class);
        when(authentication.getPrincipal()).thenReturn(operator);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(authentication);
        when(operatorRepository.save(operator)).thenReturn(operator);
        when(jwtService.generateToken(operator)).thenReturn("jwt.token.mock");
        when(jwtService.getExpirationMs()).thenReturn(43200000L);

        LoginResponseDTO response = authService.login(request);

        assertThat(response).isNotNull();
        assertThat(response.getToken()).isEqualTo("jwt.token.mock");
        assertThat(response.getTokenType()).isEqualTo("Bearer");
        assertThat(response.getOperator().getUsername()).isEqualTo("admin");
        assertThat(operator.getLastLoginAt()).isNotNull();
        verify(operatorRepository).save(operator);
    }

    @Test
    @DisplayName("Deve propagar BadCredentialsException quando senha estiver incorreta")
    void shouldFailWhenCredentialsAreInvalid() {
        LoginRequest request = new LoginRequest();
        request.setUsername("admin");
        request.setPassword("wrongpassword");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new BadCredentialsException("Usuário ou senha incorretos"));

        assertThatThrownBy(() -> authService.login(request))
                .isInstanceOf(BadCredentialsException.class)
                .hasMessageContaining("incorretos");

        verifyNoInteractions(jwtService);
        verify(operatorRepository, never()).save(any());
    }

    @Test
    @DisplayName("Deve falhar com DisabledException quando operador estiver desativado")
    void shouldFailWhenOperatorIsDisabled() {
        LoginRequest request = new LoginRequest();
        request.setUsername("inativo");
        request.setPassword("123456");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new DisabledException("Usuário inativo"));

        assertThatThrownBy(() -> authService.login(request))
                .isInstanceOf(DisabledException.class);

        verifyNoInteractions(jwtService);
    }

    // ==========================================
    // CHANGE PASSWORD TESTS
    // ==========================================

    @Test
    @DisplayName("Deve alterar senha própria com sucesso quando senha atual estiver correta")
    void shouldChangeOwnPasswordSuccessfully() {
        Operator operator = createOperator(1L, "operador", OperatorRole.OPERATOR, true);

        ChangePasswordRequest request = new ChangePasswordRequest();
        request.setCurrentPassword("senhaAntiga123");
        request.setNewPassword("novaSenha456");

        when(operatorRepository.findById(1L)).thenReturn(Optional.of(operator));
        when(passwordEncoder.matches("senhaAntiga123", operator.getPassword())).thenReturn(true);
        when(passwordEncoder.matches("novaSenha456", operator.getPassword())).thenReturn(false);
        when(passwordEncoder.encode("novaSenha456")).thenReturn("$2a$10$novaHashCodificada");

        authService.changeOwnPassword(operator, request);

        assertThat(operator.getPassword()).isEqualTo("$2a$10$novaHashCodificada");
        verify(operatorRepository).save(operator);
    }

    @Test
    @DisplayName("Deve falhar ao alterar senha se a senha atual estiver incorreta")
    void shouldFailWhenCurrentPasswordDoesNotMatch() {
        Operator operator = createOperator(1L, "operador", OperatorRole.OPERATOR, true);

        ChangePasswordRequest request = new ChangePasswordRequest();
        request.setCurrentPassword("senhaErrada");
        request.setNewPassword("novaSenha456");

        when(operatorRepository.findById(1L)).thenReturn(Optional.of(operator));
        when(passwordEncoder.matches("senhaErrada", operator.getPassword())).thenReturn(false);

        assertThatThrownBy(() -> authService.changeOwnPassword(operator, request))
                .isInstanceOf(InvalidOperatorOperationException.class)
                .hasMessageContaining("A senha atual está incorreta");

        verify(passwordEncoder, never()).encode(any());
        verify(operatorRepository, never()).save(any());
    }

    @Test
    @DisplayName("Deve falhar se a nova senha for idêntica à senha atual")
    void shouldFailWhenNewPasswordIsSameAsCurrent() {
        Operator operator = createOperator(1L, "operador", OperatorRole.OPERATOR, true);

        ChangePasswordRequest request = new ChangePasswordRequest();
        request.setCurrentPassword("mesmaSenha123");
        request.setNewPassword("mesmaSenha123");

        when(operatorRepository.findById(1L)).thenReturn(Optional.of(operator));
        when(passwordEncoder.matches("mesmaSenha123", operator.getPassword())).thenReturn(true);

        assertThatThrownBy(() -> authService.changeOwnPassword(operator, request))
                .isInstanceOf(InvalidOperatorOperationException.class)
                .hasMessageContaining("A nova senha deve ser diferente da atual");
    }

    @Test
    @DisplayName("Deve lançar OperatorNotFoundException se operador não for encontrado")
    void shouldThrowExceptionWhenOperatorNotFound() {
        Operator operator = createOperator(999L, "fantasma", OperatorRole.OPERATOR, true);
        ChangePasswordRequest request = new ChangePasswordRequest();

        when(operatorRepository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> authService.changeOwnPassword(operator, request))
                .isInstanceOf(OperatorNotFoundException.class);
    }
}
