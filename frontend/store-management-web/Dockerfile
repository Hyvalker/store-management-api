# ==========================================
# BAMBA AQUA - Frontend Dockerfile
# Multi-stage build com Node 22 e Nginx Alpine
# ==========================================

# Estágio 1: Build da aplicação React/Vite
FROM node:22-alpine AS builder

WORKDIR /app

# Cache de dependências npm
COPY package.json package-lock.json ./
RUN npm ci

# Copia código-fonte
COPY . .

# Variável de ambiente em tempo de build
# Com /api, todas as requisições usam o mesmo domínio/túnel e passam pelo Nginx
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL

# Compila o frontend para a pasta dist
RUN npm run build

# Estágio 2: Servidor Nginx ultra-leve
FROM nginx:1.27-alpine

# Substitui configuração padrão do Nginx
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia artefatos estáticos compilados (HTML, CSS, JS e imagens de /public)
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
