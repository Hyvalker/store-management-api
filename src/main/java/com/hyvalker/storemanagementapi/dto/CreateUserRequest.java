package com.hyvalker.storemanagementapi.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateUserRequest {

    @NotBlank (message = "O nome não pode estar em branco.")
    private String name;

    @NotBlank (message = "O e-mail não pode estar em branco.")
    @Email (message = "E-mail inválido.")
    private String email;

    @NotBlank (message = "O endereço não pode estar em branco.")
    private String address;

    @NotBlank (message = "O número do celular não pode estar em branco.")
    private String phoneNumber;

}
