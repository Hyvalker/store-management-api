package com.hyvalker.storemanagementapi.exception;

/**
 * Regra de negócio violada na gestão de operadores/autenticação, por exemplo:
 * usuário já existente, tentar desativar a si mesmo, remover o último ADMIN ou senha atual incorreta.
 */
public class InvalidOperatorOperationException extends RuntimeException {
    public InvalidOperatorOperationException(String message) {
        super(message);
    }
}
