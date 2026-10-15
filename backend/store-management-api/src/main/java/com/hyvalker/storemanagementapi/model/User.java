package com.hyvalker.storemanagementapi.model;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "users", indexes = {
        @Index(name = "idx_users_active", columnList = "active")
})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    private String address;
    private String phoneNumber;

    private Boolean active = true;
}
