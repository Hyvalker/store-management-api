package com.hyvalker.storemanagementapi.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

/**
 * Operador do sistema (quem faz login): o dono da loja ou um funcionário de balcão.
 *
 * <p>Não confundir com {@link User}, que representa os <b>clientes</b> da loja.</p>
 *
 * <p>Esta classe implementa {@link UserDetails}, que é o "contrato" que o Spring Security
 * usa para entender quem é o usuário: qual o login, qual a senha (hash), quais permissões
 * ele tem e se a conta está ativa. Assim o Spring Security consegue autenticar um
 * {@code Operator} diretamente.</p>
 */
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "operators")
public class Operator implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Nome de exibição (ex.: "Carlos Silva"). */
    @Column(nullable = false, length = 100)
    private String name;

    /** Login usado na tela de entrada. Sempre armazenado em minúsculas. */
    @Column(nullable = false, unique = true, length = 30)
    private String username;

    /**
     * Hash BCrypt da senha. NUNCA a senha em texto puro.
     * Ex.: "$2a$10$N9qo8uLOickgx2ZMRZoMye..."
     */
    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private OperatorRole role;

    @Column(nullable = false)
    private Boolean active = true;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime lastLoginAt;

    @PrePersist
    void prePersist() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }

    // ===================== Contrato UserDetails =====================

    /**
     * Converte o papel do operador em uma "authority" do Spring Security.
     * ADMIN -> ROLE_ADMIN | OPERATOR -> ROLE_OPERATOR
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    /** Operadores desativados não conseguem fazer login nem usar tokens antigos. */
    @Override
    public boolean isEnabled() {
        return Boolean.TRUE.equals(active);
    }

    // getUsername() e getPassword() são gerados pelo Lombok (@Getter) e satisfazem o contrato.
    // isAccountNonExpired/isAccountNonLocked/isCredentialsNonExpired já retornam true por padrão.
}
