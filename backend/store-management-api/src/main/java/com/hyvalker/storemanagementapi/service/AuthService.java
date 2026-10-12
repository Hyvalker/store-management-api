package com.hyvalker.storemanagementapi.service;

import com.hyvalker.storemanagementapi.dto.ChangePasswordRequest;
import com.hyvalker.storemanagementapi.dto.LoginRequest;
import com.hyvalker.storemanagementapi.dto.LoginResponseDTO;
import com.hyvalker.storemanagementapi.dto.OperatorResponseDTO;
import com.hyvalker.storemanagementapi.exception.InvalidOperatorOperationException;
import com.hyvalker.storemanagementapi.exception.OperatorNotFoundException;
import com.hyvalker.storemanagementapi.model.Operator;
import com.hyvalker.storemanagementapi.repository.OperatorRepository;
import com.hyvalker.storemanagementapi.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final OperatorRepository operatorRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    /**
     * Fluxo de login:
     * <ol>
     *     <li>Entrega usuário+senha ao {@link AuthenticationManager}.</li>
     *     <li>Ele chama o OperatorDetailsService (busca no banco) e o BCrypt (compara a senha).</li>
     *     <li>Se a senha estiver errada, lança BadCredentialsException (vira 401 no GlobalExceptionHandler).
     *     Se o operador estiver desativado, lança DisabledException (também 401).</li>
     *     <li>Se deu certo, gera o token JWT e devolve para o front guardar.</li>
     * </ol>
     */
    @Transactional
    public LoginResponseDTO login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername().trim(), request.getPassword()));

        Operator operator = (Operator) authentication.getPrincipal();
        operator.setLastLoginAt(LocalDateTime.now());
        Operator saved = operatorRepository.save(operator);

        String token = jwtService.generateToken(saved);

        return new LoginResponseDTO(
                token,
                "Bearer",
                jwtService.getExpirationMs() / 1000,
                new OperatorResponseDTO(saved));
    }

    public OperatorResponseDTO me(Operator current) {
        return new OperatorResponseDTO(current);
    }

    @Transactional
    public void changeOwnPassword(Operator current, ChangePasswordRequest request) {
        Operator operator = operatorRepository.findById(current.getId())
                .orElseThrow(() -> new OperatorNotFoundException("Operador não encontrado."));

        // passwordEncoder.matches(senhaDigitada, hashSalvo) -> refaz o hash e compara
        if (!passwordEncoder.matches(request.getCurrentPassword(), operator.getPassword())) {
            throw new InvalidOperatorOperationException("A senha atual está incorreta.");
        }
        if (passwordEncoder.matches(request.getNewPassword(), operator.getPassword())) {
            throw new InvalidOperatorOperationException("A nova senha deve ser diferente da atual.");
        }

        operator.setPassword(passwordEncoder.encode(request.getNewPassword()));
        operatorRepository.save(operator);
    }
}
