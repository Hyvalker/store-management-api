package com.hyvalker.storemanagementapi.repository;

import com.hyvalker.storemanagementapi.model.Operator;
import com.hyvalker.storemanagementapi.model.OperatorRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OperatorRepository extends JpaRepository<Operator, Long> {

    Optional<Operator> findByUsernameIgnoreCase(String username);

    boolean existsByUsernameIgnoreCase(String username);

    /** Usado para impedir que o último administrador ativo seja removido/rebaixado. */
    long countByRoleAndActiveTrue(OperatorRole role);

    List<Operator> findAllByOrderByActiveDescNameAsc();
}
