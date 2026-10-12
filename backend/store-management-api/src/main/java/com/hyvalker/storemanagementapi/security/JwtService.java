package com.hyvalker.storemanagementapi.security;

import com.hyvalker.storemanagementapi.model.Operator;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Date;

/**
 * Responsável por GERAR e VALIDAR tokens JWT.
 *
 * <p>Um JWT tem 3 partes separadas por ponto: {@code header.payload.assinatura}</p>
 * <ul>
 *     <li><b>header</b>: algoritmo usado (HS256).</li>
 *     <li><b>payload</b>: os "claims" — dados como username, role e data de expiração.
 *     É apenas Base64, ou seja, <u>qualquer um consegue ler</u>. Nunca coloque senha aqui.</li>
 *     <li><b>assinatura</b>: HMAC-SHA256 de header+payload usando a chave secreta do servidor.
 *     Se alguém alterar o payload (ex.: trocar "OPERATOR" por "ADMIN"), a assinatura deixa de
 *     bater e o token é rejeitado. Por isso a chave secreta NUNCA pode vazar.</li>
 * </ul>
 */
@Service
public class JwtService {

    private static final String ISSUER = "bamba-aqua-api";

    private final SecretKey signingKey;
    private final long expirationMs;

    public JwtService(@Value("${security.jwt.secret}") String base64Secret,
                      @Value("${security.jwt.expiration-ms:43200000}") long expirationMs) {
        byte[] keyBytes = Decoders.BASE64.decode(base64Secret);
        if (keyBytes.length < 32) {
            // HS256 exige no mínimo 256 bits (32 bytes) de chave.
            throw new IllegalStateException(
                    "security.jwt.secret precisa ter pelo menos 32 bytes (256 bits) em Base64.");
        }
        this.signingKey = Keys.hmacShaKeyFor(keyBytes);
        this.expirationMs = expirationMs;
    }

    /** Cria um token assinado para o operador que acabou de fazer login. */
    public String generateToken(Operator operator) {
        Instant now = Instant.now();

        return Jwts.builder()
                .subject(operator.getUsername())          // "sub": quem é o dono do token
                .claim("operatorId", operator.getId())
                .claim("name", operator.getName())
                .claim("role", operator.getRole().name()) // apenas informativo para o front
                .issuer(ISSUER)                           // "iss": quem emitiu
                .issuedAt(Date.from(now))                 // "iat": quando foi emitido
                .expiration(Date.from(now.plusMillis(expirationMs))) // "exp": quando expira
                .signWith(signingKey)                     // assina com HMAC-SHA256
                .compact();
    }

    /**
     * Valida a assinatura, o emissor e a expiração do token e devolve o username (subject).
     *
     * @throws JwtException se o token for inválido, adulterado ou expirado
     *                      (ExpiredJwtException é uma subclasse de JwtException).
     */
    public String extractUsername(String token) {
        return parseClaims(token).getSubject();
    }

    public long getExpirationMs() {
        return expirationMs;
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(signingKey)
                .requireIssuer(ISSUER)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
