package com.hyvalker.storemanagementapi.service;

import com.hyvalker.storemanagementapi.dto.CreateUserRequest;
import com.hyvalker.storemanagementapi.dto.UserResponseDTO;
import com.hyvalker.storemanagementapi.exception.UserNotFoundException;
import com.hyvalker.storemanagementapi.model.User;
import com.hyvalker.storemanagementapi.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserResponseDTO> findAll() {
        return findAll(false);
    }

    public List<UserResponseDTO> findAll(boolean includeInactive) {
        List<User> list = includeInactive ? userRepository.findAll() : userRepository.findByActiveTrue();
        return list.stream()
                .map(UserResponseDTO::new)
                .toList();
    }

    @Transactional
    public UserResponseDTO create(CreateUserRequest request) {
        String normalizedEmail = request.getEmail() != null ? request.getEmail().trim().toLowerCase() : null;
        if (normalizedEmail == null || normalizedEmail.isBlank()) {
            throw new IllegalArgumentException("O e-mail do cliente é obrigatório.");
        }
        if (userRepository.existsByEmailIgnoreCase(normalizedEmail)) {
            throw new IllegalArgumentException("Já existe um cliente cadastrado com o e-mail: " + request.getEmail().trim());
        }

        User user = new User();
        user.setName(request.getName() != null ? request.getName().trim() : null);
        user.setEmail(normalizedEmail);
        user.setAddress(request.getAddress() != null ? request.getAddress().trim() : null);
        user.setPhoneNumber(request.getPhoneNumber() != null ? request.getPhoneNumber().trim() : null);
        user.setActive(true);

        User savedUser = userRepository.save(user);

        return new UserResponseDTO(savedUser);
    }

    public Optional<UserResponseDTO> findById(Long id) {
        return userRepository.findById(id)
                .map(UserResponseDTO::new);
    }
    
    @Transactional
    public Optional<UserResponseDTO> update(Long id, CreateUserRequest request) {
        return userRepository.findById(id)
                .map(user -> {
                    String normalizedEmail = request.getEmail() != null ? request.getEmail().trim().toLowerCase() : null;
                    if (normalizedEmail == null || normalizedEmail.isBlank()) {
                        throw new IllegalArgumentException("O e-mail do cliente é obrigatório.");
                    }
                    if (userRepository.existsByEmailIgnoreCaseAndIdNot(normalizedEmail, id)) {
                        throw new IllegalArgumentException("Já existe um cliente cadastrado com o e-mail: " + request.getEmail().trim());
                    }

                    user.setName(request.getName() != null ? request.getName().trim() : null);
                    user.setEmail(normalizedEmail);
                    user.setAddress(request.getAddress() != null ? request.getAddress().trim() : null);
                    user.setPhoneNumber(request.getPhoneNumber() != null ? request.getPhoneNumber().trim() : null);

                    User savedUser = userRepository.save(user);

                    return new UserResponseDTO(savedUser);
                });
    }

    @Transactional
    public void deactivateUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado."));
        user.setActive(false);

        userRepository.save(user);
    }

    @Transactional
    public UserResponseDTO reactivateUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado."));

        if (Boolean.TRUE.equals(user.getActive())) {
            throw new IllegalArgumentException("O cliente já está ativo.");
        }

        user.setActive(true);
        User savedUser = userRepository.save(user);
        return new UserResponseDTO(savedUser);
    }
}
