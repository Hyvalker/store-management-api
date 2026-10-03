package com.hyvalker.storemanagementapi.dto;

import com.hyvalker.storemanagementapi.model.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class UserResponseDTO {

    @Schema(description = "ID único do usuário.", example = "1")
    private Long id;

    @Schema(description = "Nome completo do usuário.", example = "João Silva.")
    private String name;

    @Schema(description = "E-mail do usuário.", example = "joao.silva@email.com")
    private String email;

    @Schema(description = "Endereço do usuário.", example = "Rua das Acácias, 123")
    private String address;

    @Schema(description = "Número de celular do usuário.", example = "(21) 99999-9999")
    private String phoneNumber;

    public UserResponseDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.address = user.getAddress();
        this.phoneNumber = user.getPhoneNumber();
    }
}
