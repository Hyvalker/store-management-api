package com.hyvalker.storemanagementapi.config;

import com.hyvalker.storemanagementapi.model.Operator;
import com.hyvalker.storemanagementapi.model.OperatorRole;
import com.hyvalker.storemanagementapi.repository.OperatorRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Inicializador de dados padrão na inicialização do sistema.
 *
 * <p>Se a tabela de operadores estiver vazia (primeira execução), cria automaticamente:
 * <ul>
 *     <li><b>admin</b> (senha: {@code admin123}) - papel {@code ADMIN}</li>
 *     <li><b>operador</b> (senha: {@code operador123}) - papel {@code OPERATOR}</li>
 * </ul>
 * Isso permite que a loja consiga fazer o primeiro login sem precisar rodar comandos SQL manuais.</p>
 */
@Configuration
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final OperatorRepository operatorRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (operatorRepository.count() == 0) {
            log.info("Nenhum operador encontrado no banco de dados. Criando operadores padrão...");

            Operator admin = new Operator();
            admin.setName("Administrador");
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(OperatorRole.ADMIN);
            admin.setActive(true);
            operatorRepository.save(admin);

            Operator operator = new Operator();
            operator.setName("Operador Balcão");
            operator.setUsername("operador");
            operator.setPassword(passwordEncoder.encode("operador123"));
            operator.setRole(OperatorRole.OPERATOR);
            operator.setActive(true);
            operatorRepository.save(operator);

            log.info("Operadores padrão criados com sucesso: 'admin' (senha: admin123) e 'operador' (senha: operador123)");
        }
    }
}
