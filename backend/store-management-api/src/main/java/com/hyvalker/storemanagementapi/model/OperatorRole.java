package com.hyvalker.storemanagementapi.model;

/**
 * Papéis (roles) que um operador do sistema pode ter.
 *
 * <p>No Spring Security, um papel vira uma "authority" com o prefixo {@code ROLE_}.
 * Ou seja, {@code ADMIN} é tratado internamente como {@code ROLE_ADMIN}, e é isso que
 * as regras {@code hasRole("ADMIN")} verificam.</p>
 */
public enum OperatorRole {

    /** Dono/gerente: acesso total, incluindo painel gerencial, configurações, preços e estornos. */
    ADMIN,

    /** Funcionário de balcão: vende, recebe pagamentos, repõe estoque e atende clientes. */
    OPERATOR
}
