# 🚀 Guia de Docker e Apresentação Remota via Túnel (Bamba Aqua)

Este guia explica como iniciar todo o ecossistema da **Bamba Aqua** com um único comando Docker e como gerar um link público via túnel seguro para demonstrar todas as funcionalidades (catálogo, leitura de parâmetros, ordens de serviço, clientes) para o **Marcelo** em qualquer computador ou smartphone.

---

## 🐳 1. Iniciando o Sistema com Docker

### Pré-requisitos
* Ter o **Docker Desktop** instalado no Windows (ou Docker Engine no Linux/WSL).

### Subir os Contêineres
Na pasta raiz do projeto (`store-management`), execute:

```powershell
docker compose up -d --build
```

O Docker Compose irá:
1. **Subir o banco PostgreSQL (`bamba-aqua-db`)**: Inicializado automaticamente com o schema e o seed completo (`01-init.sql`), contendo os clientes cadastrados (incluindo o Marcelo Camargo), aquários marinhos e plantados, testes de parâmetros químicos reais, produtos e seres vivos com imagens.
2. **Compilar e subir a API (`bamba-aqua-backend`)**: Aplicação Spring Boot (Java 21) pronta e conectada ao banco.
3. **Compilar e subir o Web (`bamba-aqua-frontend`)**: Aplicação React empacotada em um servidor Nginx ultra-rápido na porta `80`.

### Acessos Locais:
* **Frontend Web (Aplicação Principal):** [http://localhost](http://localhost) (ou [http://localhost:80](http://localhost:80))
* **Swagger UI (Documentação da API):** [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html) ou [http://localhost/swagger-ui/](http://localhost/swagger-ui/)
* **Credenciais de Acesso Prontas:**
  * **Administrador:** Usuário `admin` | Senha `admin123`
  * **Operador Balcão:** Usuário `operador` | Senha `operador123`

---

## 🌐 2. Como Gerar o Túnel para Apresentar ao Marcelo

Como o frontend utiliza o **Nginx como Proxy Reverso**, **você só precisa abrir o túnel para a porta 80**! 
O Nginx entrega a aplicação React e encaminha silenciosamente todas as chamadas `/api/...` para o backend dentro do Docker. Isso evita dores de cabeça com CORS, bloqueios de segurança e requisições para `localhost` quebrando no celular do cliente.

### Opção A: Cloudflare Tunnel (Recomendada - Grátis, Rápido e Sem Cadastro)
A Cloudflare oferece o `cloudflared Quick Tunnels`, que gera uma URL com HTTPS confiável instantaneamente.

1. Instale o `cloudflared` (pelo terminal do Windows):
   ```powershell
   winget install --id Cloudflare.cloudflared
   ```
   *(Ou baixe o binário `cloudflared.exe` direto do GitHub da Cloudflare e coloque no seu PATH).*

2. Execute o comando apontando para a porta 80 do Nginx:
   ```powershell
   cloudflared tunnel --url http://localhost:80
   ```

3. O terminal exibirá um link como:
   ```text
   https://random-subdomain-1234.trycloudflare.com
   ```
4. **Envie esse link para o Marcelo**: Ele poderá acessar imediatamente do celular ou computador dele, ver as fotos dos corais e peixes, os testes de parâmetros de água e interagir com o sistema sem nenhuma barreira!

---

### Opção B: Ngrok (Muito Popular)
1. Instale o ngrok (`winget install ngrok.ngrok` ou baixe do site oficial).
2. Se já tiver conta autenticada, execute:
   ```powershell
   ngrok http 80
   ```
3. Copie o link público `https://xxxx.ngrok-free.app` e envie para o Marcelo.

---

### Opção C: Localtunnel (Via Node / npx sem instalar nada)
Se tiver Node instalado na máquina:
```powershell
npx localtunnel --port 80
```
O terminal gerará a URL `https://xxxx.loca.lt`.

---

## 🛠 3. Comandos Úteis do Dia a Dia

* **Verificar se todos os contêineres estão saudáveis:**
  ```powershell
  docker compose ps
  ```

* **Acompanhar os logs do backend em tempo real:**
  ```powershell
  docker compose logs -f backend
  ```

* **Executar ou resetar o seed de dados no banco do Docker a qualquer momento:**
  ```powershell
  ./docker-seed.ps1
  ```

* **Parar os contêineres:**
  ```powershell
  docker compose down
  ```

* **Resetar completamente os dados do banco (remover volumes para recriar do zero):**
  ```powershell
  docker compose down -v
  docker compose up -d --build
  ```
