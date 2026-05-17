# Store Management API - Sistema de Gestão para Loja de Aquarismo

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Java](https://img.shields.io/badge/Java-21-blue)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-Backend-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![Maven](https://img.shields.io/badge/Maven-Build-red)

## 1. Visão Geral e a Dor

O **Store Management API** é uma aplicação backend desenvolvida para apoiar a gestão operacional de uma loja de aquarismo, centralizando o controle de produtos, estoque, usuários/clientes e pedidos.

Lojas pequenas muitas vezes controlam vendas, estoque e informações de clientes de forma manual, usando planilhas, anotações ou sistemas genéricos que não consideram as necessidades específicas do negócio. Em uma loja de aquarismo, esse problema é ainda mais relevante, porque os produtos podem variar entre alimentos, condicionadores de água, equipamentos, itens para aquários de água doce e salgada, além de haver necessidade futura de registrar informações específicas dos clientes e seus aquários.

### O que está sendo resolvido?

O projeto resolve a necessidade de um backend estruturado para:

- Cadastrar e consultar produtos;
- Controlar quantidade em estoque;
- Registrar usuários/clientes;
- Criar pedidos com múltiplos itens;
- Calcular automaticamente subtotais e valor total do pedido;
- Atualizar o estoque automaticamente após uma venda;
- Organizar a base para futuras funcionalidades específicas do mercado de aquarismo.

### Quem sofre com esse problema?

O principal público afetado são pequenos negócios de aquarismo que precisam controlar produtos, vendas e clientes de forma mais confiável, mas não possuem um sistema próprio adaptado à realidade da loja.

Também são impactados os atendentes e responsáveis pela operação, que precisam consultar produtos, registrar vendas e evitar erros como venda de itens sem estoque disponível.

### Por que isso importa para produto/negócio?

Um sistema de gestão bem estruturado reduz erros operacionais, melhora o controle de estoque e cria uma base de dados útil para decisões comerciais.

Com dados organizados, a loja pode futuramente identificar produtos mais vendidos, clientes recorrentes, categorias com maior saída, necessidades de reposição e oportunidades de venda associadas ao tipo de aquário de cada cliente.

---

## 2. Arquitetura e Decisões Técnicas

O projeto foi estruturado com uma arquitetura em camadas, separando responsabilidades entre **Controller**, **Service**, **Repository**, **Model/Entity** e **DTOs**.

Essa separação facilita manutenção, testes, evolução do sistema e clareza na regra de negócio.

| Camada | Escolha | Por que escolhi isso? | Alternativa considerada | Nota de impacto |
|---|---|---|---|---|
| Front-end | Ainda não implementado | O foco inicial do projeto é construir uma API backend sólida antes de criar a interface. | React, Angular ou HTML/CSS/JS puro | Permite validar primeiro as regras de negócio e os endpoints principais. |
| Back-end | Java 21 + Spring Boot | Java com Spring Boot oferece robustez, organização em camadas, ecossistema maduro e boa aderência a aplicações corporativas. | Node.js, Python, .NET | Boa escalabilidade, forte comunidade, facilidade de integração com banco relacional e padrão usado no mercado backend. |
| Banco de dados | PostgreSQL | O domínio possui entidades relacionais, como produtos, pedidos, itens de pedido e usuários. PostgreSQL garante consistência, integridade e suporte a transações. | MySQL, SQLite, MongoDB | Melhor controle transacional e modelagem relacional adequada para pedidos e estoque. |
| API / Integração | REST | REST é simples, amplamente utilizado e adequado para comunicação entre frontend, backend e ferramentas externas. | GraphQL, gRPC | Facilita testes com Postman, documentação futura com Swagger e integração com diferentes clientes. |
| Persistência | Spring Data JPA + Hibernate | Reduz boilerplate de acesso ao banco e permite mapear entidades Java para tabelas relacionais de forma produtiva. | JDBC puro, MyBatis | Aumenta produtividade e mantém o código mais limpo para operações CRUD e relacionamentos. |
| Build e dependências | Maven | Gerencia dependências, ciclo de build e padroniza a estrutura do projeto. | Gradle | Facilita execução, empacotamento e manutenção por outros desenvolvedores. |
| IA / Dados | Não aplicável nesta versão inicial | O projeto ainda está focado na estrutura operacional da loja. Futuramente, os dados gerados podem apoiar relatórios e sugestões comerciais. | OpenAI, modelos preditivos, dashboards analíticos | Possibilidade futura de análise de produtos mais vendidos, clientes recorrentes e previsão de reposição de estoque. |

### Organização principal do backend

O projeto segue a separação:

```text
Controller -> Service -> Repository -> Database
Controller: recebe as requisições HTTP e retorna as respostas da API.
Service: concentra as regras de negócio.
Repository: faz a comunicação com o banco de dados.
Entity/Model: representa as tabelas e relações do domínio.
DTOs: definem objetos específicos para entrada e saída de dados, evitando acoplamento direto entre requisições externas e entidades internas.
```
## 3. Demonstração

Demo rápida: ainda não disponível.

Atualmente, a aplicação está em desenvolvimento local e os principais fluxos estão sendo testados via Postman.

Fluxos já disponíveis na API:

Cadastro de produtos;
Listagem de produtos;
Consulta de produto por ID;
Atualização de produto;
Remoção/desativação de produto;
Cadastro de usuários/clientes;
Listagem de usuários/clientes;
Criação de pedidos com múltiplos itens;
Cálculo automático do total do pedido;
Atualização automática do estoque ao criar um pedido.

Observação: o deploy e/ou vídeo demonstrativo serão adicionados em uma etapa futura do projeto.

## 4. Destaque de Engenharia / "The Hard Part"

Um dos pontos mais importantes do projeto é a criação de pedidos com múltiplos itens, validação de estoque e atualização automática da quantidade disponível dos produtos.

Esse fluxo exige mais do que um CRUD simples, porque envolve regra de negócio, relacionamento entre entidades, cálculo de valores e consistência transacional.
```java
@Transactional
public OrderResponseDTO createOrder(CreateOrderRequest request) {
    if (request.getItems() == null || request.getItems().isEmpty()) {
        throw new InvalidOrderException("O pedido deve ter pelo menos um item.");
    }

    Order order = new Order();

    order.setCreatedAt(LocalDateTime.now());
    order.setTotalPrice(BigDecimal.ZERO);
    order.setStatus(OrderStatus.PENDING);

    for (CreateOrderItemRequest itemRequest : request.getItems()) {
        Product product = productRepository.findById(itemRequest.getProductId())
                .orElseThrow(() -> new ProductNotFoundException(
                        "Produto com id " + itemRequest.getProductId() + " não encontrado."));

        if (product.getQuantity() == null) {
            throw new InvalidOrderException("Produto sem estoque definido: " + product.getName());
        }

        if (product.getQuantity() < itemRequest.getQuantity()) {
            throw new InsufficientStockException("Estoque insuficiente para o produto: " + product.getName());
        }

        if (product.getPrice() == null) {
            throw new InvalidOrderException("Produto sem preço definido: " + product.getName());
        }

        OrderItem orderItem = new OrderItem();

        orderItem.setOrder(order);
        orderItem.setProduct(product);
        orderItem.setQuantity(itemRequest.getQuantity());
        orderItem.setUnitPrice(product.getPrice());

        BigDecimal subtotal = product.getPrice()
                .multiply(BigDecimal.valueOf(itemRequest.getQuantity()));

        orderItem.setSubtotal(subtotal);

        order.getItems().add(orderItem);

        order.setTotalPrice(order.getTotalPrice().add(subtotal));

        product.setQuantity(product.getQuantity() - itemRequest.getQuantity());
    }

    Order savedOrder = orderRepository.save(order);

    return new OrderResponseDTO(savedOrder);
}
```
Por que esse trecho é relevante?

Esse fluxo concentra uma regra essencial do negócio: uma venda só pode ser registrada se houver estoque suficiente.

Além disso, o método:

Valida se o pedido possui itens;
Busca cada produto no banco;
Verifica disponibilidade em estoque;
Calcula subtotal por item;
Calcula o valor total do pedido;
Atualiza a quantidade restante de cada produto;
Relaciona Order, OrderItem e Product;
Usa @Transactional para garantir consistência da operação.
Impacto da solução

O uso de transação evita que o sistema registre um pedido parcialmente caso ocorra erro durante o processo. Isso é importante porque o pedido e a baixa no estoque precisam ser tratados como uma única operação de negócio.

## 5. Insights e Valor de Negócio

O projeto cria uma base operacional para transformar dados da loja em decisões práticas.

Para produto

A API permite construir uma interface futura onde o usuário da loja poderá cadastrar produtos, consultar estoque, registrar vendas e acompanhar pedidos de forma centralizada.

Com a evolução do sistema, também será possível adicionar funcionalidades específicas para aquarismo, como cadastro do tipo de aquário do cliente, volume em litros, fauna, parâmetros de água e histórico de testes.

Para negócio

O sistema pode gerar valor ao:

Reduzir erros manuais no controle de estoque;
Evitar venda de produtos indisponíveis;
Centralizar dados de produtos e clientes;
Organizar o histórico de pedidos;
Apoiar decisões de reposição de estoque;
Permitir visão futura sobre produtos mais vendidos e categorias mais relevantes.
Para dados / IA

Embora a versão atual ainda não implemente IA, os dados gerados pela API podem futuramente responder perguntas como:

Quais produtos têm maior saída?
Quais categorias vendem mais?
Quais produtos precisam de reposição com maior frequência?
Quais clientes compram de forma recorrente?
Existe relação entre tipo de aquário e produtos mais comprados?
Quais itens poderiam ser recomendados com base no perfil do cliente?

Esses dados podem servir como base para dashboards, relatórios gerenciais ou modelos simples de recomendação.

## 6. Instruções de Instalação e Uso
Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

Java 21;
Maven;
PostgreSQL;
Git;
Uma ferramenta para testar APIs, como Postman ou Insomnia.
### 1. Clone o repositório
```text
git clone https://github.com/Hyvalker/store-management-api.git
```
```text
cd store-management-api
```
### 2. Instale as dependências

O projeto utiliza Maven. Para baixar dependências e compilar:
```text
mvn clean install
```
### 3. Configure o banco de dados

Crie um banco PostgreSQL para o projeto.

Exemplo:

CREATE DATABASE store_management;

Depois, configure o arquivo de propriedades da aplicação.

O projeto mantém um arquivo de exemplo para facilitar a configuração:

src/main/resources/application-example.properties

Crie um arquivo real chamado:

src/main/resources/application.properties

E configure suas credenciais locais:

spring.datasource.url=jdbc:postgresql://localhost:5432/store_management
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

Observação: o arquivo application.properties real não deve ser versionado com credenciais sensíveis.

### 4. Execute a aplicação

Pelo Maven:

mvn spring-boot:run

Ou diretamente pela IDE, executando a classe principal do projeto.

Por padrão, a API roda em:

http://localhost:8080

Caso o projeto esteja configurado com outra porta no application.properties, use a porta definida no arquivo.

Uso

Abaixo estão alguns fluxos principais da API.

Produtos

Criar produto:

POST /products

Exemplo de corpo da requisição:

{
  "name": "Algae Cleaner",
  "description": "Produto para controle de algas em aquários",
  "quantity": 10,
  "price": 18.70,
  "category": "WATERCONDITIONER"
}

Listar produtos:

GET /products

Buscar produto por ID:

GET /products/{id}

Atualizar produto:

PUT /products/{id}

Remover/desativar produto:

DELETE /products/{id}
Usuários / Clientes

Criar usuário:

POST /users

Exemplo de corpo da requisição:

{
  "name": "Cliente Exemplo",
  "email": "cliente@email.com",
  "address": "Rua Exemplo, 123",
  "phoneNumber": "21999999999"
}

Listar usuários:

GET /users

Buscar usuário por ID:

GET /users/{id}

Atualizar usuário:

PUT /users/{id}

Remover usuário:

DELETE /users/{id}
Pedidos

Criar pedido:

POST /orders

Exemplo de corpo da requisição:

{
  "items": [
    {
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 3,
      "quantity": 1
    }
  ]
}

Exemplo de resposta esperada:

{
  "id": 10,
  "createdAt": "2026-05-12T20:41:32.760156697",
  "status": "PENDING",
  "totalPrice": 37.40,
  "items": [
    {
      "productId": 7,
      "productName": "Algae Cleaner",
      "quantity": 2,
      "unitPrice": 18.70,
      "subtotal": 37.40
    }
  ]
}

Listar pedidos:

GET /orders

Buscar pedido por ID:

GET /orders/{id}

## 7. Roadmap / Próximos Passos

### Melhorias imediatas

- Melhorar tratamento global de exceções;
- Padronizar respostas de erro da API;
- Criar DTOs de resposta para evitar exposição direta das entidades;
- Melhorar regras de remoção/desativação de produtos;
- Revisar nomes de métodos e endpoints para maior clareza;
- Documentar endpoints com Swagger/OpenAPI.

### Refatoração ou arquitetura de longo prazo

- Implementar autenticação e autorização com Spring Security;
- Criar controle de usuários com roles, como administrador e atendente;
- Criar filtros de busca por nome, categoria e disponibilidade em estoque;
- Criar paginação nas listagens;
- Separar melhor os DTOs de entrada e saída;
- Implementar testes unitários e de integração;
- Preparar ambiente com Docker Compose para aplicação e banco de dados.

### Funcionalidades futuras de produto

- Cadastro de clientes com informações específicas de aquarismo;
- Registro do tipo de aquário: água doce ou marinho;
- Registro de volume do aquário em litros;
- Cadastro de fauna do aquário;
- Histórico de testes de água;
- Relatórios de vendas;
- Alertas de baixo estoque;
- Dashboard administrativo;
- Front-end web para operação da loja.

### Monitoração, testes, métricas ou automação

- Testes unitários para services;
- Testes de integração para controllers;
- Pipeline CI/CD com GitHub Actions;
- Deploy em ambiente cloud;
- Logs estruturados;
- Métricas básicas de uso da API;
- Monitoramento de erros em produção.
  
## 8. Observações sobre o preenchimento do desafio

Este README segue o padrão proposto para o desafio técnico DEV+ e será atualizado conforme a evolução do projeto.

O objetivo desta aplicação é demonstrar não apenas a implementação de endpoints, mas também decisões de arquitetura, modelagem de domínio, regras de negócio e visão de produto aplicada a um cenário real de gestão de loja.
