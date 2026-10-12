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
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;

/** Gestão de operadores (somente ADMIN chega aqui — garantido pelo SecurityConfig). */
@Service
@RequiredArgsConstructor
public class OperatorService {

    private final OperatorRepository operatorRepository;
    private final PasswordEncoder passwordEncoder;

    public List<OperatorResponseDTO> findAll() {
        return operatorRepository.findAllByOrderByActiveDescNameAsc()
                .stream()
                .map(OperatorResponseDTO::new)
                .toList();
    }

    @Transactional
    public OperatorResponseDTO create(CreateOperatorRequest request) {
        String username = normalizeUsername(request.getUsername());

        if (operatorRepository.existsByUsernameIgnoreCase(username)) {
            throw new InvalidOperatorOperationException("Já existe um operador com o usuário \"" + username + "\".");
        }

        Operator operator = new Operator();
        operator.setName(request.getName().trim());
        operator.setUsername(username);
        operator.setPassword(passwordEncoder.encode(request.getPassword())); // salva só o HASH
        operator.setRole(request.getRole());
        operator.setActive(true);

        return new OperatorResponseDTO(operatorRepository.save(operator));
    }

    @Transactional
    public OperatorResponseDTO update(Long id, UpdateOperatorRequest request, Operator current) {
        Operator operator = findEntity(id);

        boolean losesAdminAccess = operator.getRole() == OperatorRole.ADMIN
                && Boolean.TRUE.equals(operator.getActive())
                && (request.getRole() != OperatorRole.ADMIN || !Boolean.TRUE.equals(request.getActive()));

        if (losesAdminAccess) {
            ensureNotSelf(operator, current, "Você não pode remover o seu próprio acesso de administrador.");
            ensureAnotherActiveAdminExists();
        }

        operator.setName(request.getName().trim());
        operator.setRole(request.getRole());
        operator.setActive(request.getActive());

        return new OperatorResponseDTO(operatorRepository.save(operator));
    }

    @Transactional
    public void resetPassword(Long id, ResetPasswordRequest request) {
        Operator operator = findEntity(id);
        operator.setPassword(passwordEncoder.encode(request.getNewPassword()));
        operatorRepository.save(operator);
    }

    @Transactional
    public void deactivate(Long id, Operator current) {
        Operator operator = findEntity(id);

        ensureNotSelf(operator, current, "Você não pode desativar a sua própria conta.");
        if (operator.getRole() == OperatorRole.ADMIN && Boolean.TRUE.equals(operator.getActive())) {
            ensureAnotherActiveAdminExists();
        }

        operator.setActive(false);
        operatorRepository.save(operator);
    }

    // ===================== auxiliares =====================

    private Operator findEntity(Long id) {
        return operatorRepository.findById(id)
                .orElseThrow(() -> new OperatorNotFoundException("Operador não encontrado."));
    }

    private void ensureNotSelf(Operator target, Operator current, String message) {
        if (target.getId().equals(current.getId())) {
            throw new InvalidOperatorOperationException(message);
        }
    }

    /** Garante que o sistema nunca fique sem nenhum administrador ativo (senão ninguém mais gerencia). */
    private void ensureAnotherActiveAdminExists() {
        if (operatorRepository.countByRoleAndActiveTrue(OperatorRole.ADMIN) <= 1) {
            throw new InvalidOperatorOperationException("O sistema precisa ter pelo menos um administrador ativo.");
        }
    }

    private String normalizeUsername(String username) {
        return username.trim().toLowerCase(Locale.ROOT);
    }
}
