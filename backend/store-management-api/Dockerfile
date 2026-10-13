# ==========================================
# BAMBA AQUA - Backend Dockerfile
# Multi-stage build com Java 21 (Temurin)
# ==========================================

# Estágio 1: Compilação e empacotamento Maven
FROM maven:3.9.9-eclipse-temurin-21-alpine AS builder

WORKDIR /build

# Cache de dependências Maven
COPY pom.xml ./
RUN mvn dependency:go-offline -B

# Compila o código fonte e gera o jar
COPY src ./src
RUN mvn clean package -DskipTests

# Estágio 2: Runtime leve com JRE 21
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Usuário não-root por segurança
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copia o artefato executável
COPY --from=builder /build/target/store-management-api-*.jar app.jar

# Permissões do usuário
USER appuser

EXPOSE 8080

# Otimizações de memória para contêineres Docker
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
