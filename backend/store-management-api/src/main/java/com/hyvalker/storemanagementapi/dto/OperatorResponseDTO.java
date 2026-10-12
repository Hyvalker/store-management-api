package com.hyvalker.storemanagementapi.dto;

import com.hyvalker.storemanagementapi.model.Operator;
import com.hyvalker.storemanagementapi.model.OperatorRole;
import lombok.Getter;

import java.time.LocalDateTime;

/** Representação pública de um operador. Note que a senha (hash) NUNCA é exposta. */
@Getter
public class OperatorResponseDTO {

    private final Long id;
    private final String name;
    private final String username;
    private final OperatorRole role;
    private final Boolean active;
    private final LocalDateTime createdAt;
    private final LocalDateTime lastLoginAt;

    public OperatorResponseDTO(Operator operator) {
        this.id = operator.getId();
        this.name = operator.getName();
        this.username = operator.getUsername();
        this.role = operator.getRole();
        this.active = operator.getActive();
        this.createdAt = operator.getCreatedAt();
        this.lastLoginAt = operator.getLastLoginAt();
    }
}
