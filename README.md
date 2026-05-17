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
