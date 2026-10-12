# Project Architecture, Security and UX Standards

Diretrizes e padrões arquiteturais consolidados para o projeto Store Management:

## 1. Padrão de Nomenclatura e Idiomas
- **Código em Inglês (Developer-facing)**:
  - Todas as entidades, modelos, DTOs, controllers, services, repositories, tabelas de banco de dados, colunas, variáveis, funções, tipos TypeScript, rotas e nomes de componentes/arquivos **DEVEM ser nomeados estritamente em inglês** (ex: `CatalogItem`, `cardPriceLabel`, `installments`, `costPrice`, `/catalog`, etc.).
- **Interface em Português Brasileiro (User-facing)**:
  - Todos os textos visíveis ao usuário final na interface (labels, botões, títulos de páginas, modais, opções de seleção e notificações toast) **DEVEM ser redigidos em português brasileiro**, proporcionando clareza operacional para o lojista e clientes.

## 2. Segurança em Builds de Produção
- Qualquer facilidade de desenvolvimento (como botões de login rápido, dados de teste ou credenciais demo) **DEVE** ser estritamente encapsulada com `{import.meta.env.DEV && ( ... )}` no frontend para ser eliminada no build final (*dead-code elimination*).
- Nunca commitar valores reais de senhas, chaves JWT ou credenciais no repositório. O arquivo `application.properties` e arquivos `.env` devem permanecer no `.gitignore`.
- Variáveis de ambiente configuráveis devem ser mantidas no `application-example.properties` e `.env.example`.

## 3. Centralização de Configurações
- Parâmetros globais de negócio (como limites de estoque baixo e crítico, taxas de desconto de pagamentos PIX/Cartão, etc.) **DEVEM ser configurados centralizadamente na página de Configurações** pelo administrador.
- Telas de visualização e operação (como Dashboard, Balcão/Vendas e Catálogo de Ofertas) apenas **consomem** essas configurações salvas, sem criar formulários de configuração soltos fora da aba central.

## 4. Padrão de Autocomplete e Filtros de Busca
- Ao implementar seletores e autocompletes de clientes ou produtos (especialmente na tela de vendas/PDV), o campo deve permitir digitação fluida pelo usuário, mostrando o texto digitado e filtrando dinamicamente a lista de resultados com o utilitário `matchesSearch`.
- Não utilizar `<select>` estático que apenas pula o foco sem filtrar ou eliminar as opções não correspondentes.
- Telas com listagem de produtos ou catálogo (como Catálogo de Ofertas, Balcão e Produtos) devem oferecer distinção clara ou filtro entre "Produtos" e "Animais / Seres Vivos" (`LIVING` vs `PRODUCT`).

## 5. Controle de Acesso e Permissões (RBAC)
- O sistema opera com perfis `ADMIN` e `OPERATOR`.
- **Ações Administrativas**: Cancelamento/estorno de pedidos, desativação de clientes, cadastro de novos itens no catálogo e gestão de operadores são exclusivas do perfil `ADMIN`.
- **Proteção em Duas Camadas**:
  - No Backend: Endpoints protegidos com anotações `@PreAuthorize("hasRole('ADMIN')")`.
  - No Frontend: Elementos visuais restritos usando o hook `useAuth()` (`isAdmin`).
- **Regras de Integridade de Operadores**:
  - O sistema nunca pode permitir a desativação ou rebaixamento do **último administrador ativo**.
  - O usuário logado nunca pode desativar a própria conta ou remover o seu próprio acesso de administrador.

## 6. Rastreabilidade e Transações de Estoque
- Pedidos criados nascem em status `PENDING` e não baixam estoque até que o pagamento seja confirmado (`PAID`).
- Ao pagar um pedido (`PAID`), a baixa é aplicada e uma movimentação do tipo `SALE` é gerada.
- Ao cancelar um pedido em status `PAID`, os itens são devolvidos ao estoque e uma movimentação do tipo `RETURN` é gerada.
- Toda entrada, perda, venda ou devolução deve gerar registro na entidade `StockMovement` para auditoria contínua.
