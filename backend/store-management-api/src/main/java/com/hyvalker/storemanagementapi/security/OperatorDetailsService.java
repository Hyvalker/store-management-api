package com.hyvalker.storemanagementapi.security;

import com.hyvalker.storemanagementapi.repository.OperatorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Ensina o Spring Security a buscar um operador pelo username.
 *
 * <p>É usado em dois momentos:</p>
 * <ul>
 *     <li>No <b>login</b>: o {@code AuthenticationManager} chama este método, recebe o operador com o
 *     hash da senha e compara com a senha digitada usando o {@code PasswordEncoder} (BCrypt).</li>
 *     <li>Em <b>cada requisição</b>: o {@link JwtAuthenticationFilter} recarrega o operador para
 *     confirmar que ele continua ativo e com o papel atualizado.</li>
 * </ul>
 */
@Service
@RequiredArgsConstructor
public class OperatorDetailsService implements UserDetailsService {

    private final OperatorRepository operatorRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return operatorRepository.findByUsernameIgnoreCase(username.trim())
                .orElseThrow(() -> new UsernameNotFoundException("Operador não encontrado: " + username));
    }
}
