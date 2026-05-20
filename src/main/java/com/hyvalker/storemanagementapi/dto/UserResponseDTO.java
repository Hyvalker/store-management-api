package com.hyvalker.storemanagementapi.dto;

import com.hyvalker.storemanagementapi.model.User;
import lombok.Data;

@Data
public class UserResponseDTO {


    private Long id;
    private String name;
    private String email;
    private String address;
    private String phoneNumber;

    public UserResponseDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.address = user.getAddress();
        this.phoneNumber = user.getPhoneNumber();
    }
}
