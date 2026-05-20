package com.hyvalker.storemanagementapi.service;

import com.hyvalker.storemanagementapi.dto.CreateUserRequest;
import com.hyvalker.storemanagementapi.dto.UserResponseDTO;
import com.hyvalker.storemanagementapi.exception.UserNotFoundException;
import com.hyvalker.storemanagementapi.model.User;
import com.hyvalker.storemanagementapi.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserResponseDTO> findAll(){
        return userRepository.findByActiveTrue()
                .stream()
                .map(UserResponseDTO::new)
                .toList();
    }

    public UserResponseDTO create(CreateUserRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setAddress(request.getAddress());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setActive(true);

        User savedUser = userRepository.save(user);

        return new UserResponseDTO(savedUser);
    }

    public Optional<UserResponseDTO> findById(Long id) {
        return userRepository.findById(id)
                .map(UserResponseDTO::new);
    }
    
    public Optional<UserResponseDTO> update(Long id, CreateUserRequest request) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setName(request.getName());
                    user.setEmail(request.getEmail());
                    user.setAddress(request.getAddress());
                    user.setPhoneNumber(request.getPhoneNumber());

                    User savedUser = userRepository.save(user);

                    return new UserResponseDTO(savedUser);
                });
    }

    public void deactivateUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado."));
        user.setActive(false);

        userRepository.save(user);
    }
}
