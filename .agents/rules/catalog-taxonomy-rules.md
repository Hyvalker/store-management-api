# Regras Estritas de Nomenclatura, Taxonomia e Imagens para IAs (Store Management)

Este documento é a **DIRETRIZ MANDATÓRIA** para qualquer inteligência artificial ou desenvolvedor que manipule o Catálogo Mestre (`speciesMasterCatalog.ts`), o banco de dados (`products`), o gerador de catálogos (`Catalog.tsx`) ou os serviços de taxonomia.

---

## 1. Fórmula Universal e Obrigatória de Nomenclatura

Todo ser vivo cadastrado no sistema **DEVE** seguir impreterivelmente a fórmula:

$$\text{Nome Popular Base} + \text{ Variação ou Morfotipo} + \text{ (Nome Científico)}$$

### Exemplos Válidos e Oficiais:
* `Peixe-palhaço Comum (Amphiprion ocellaris)`
* `Peixe-palhaço Storm Black (Amphiprion ocellaris)`
* `Peixe-palhaço Maroon (Premnas biaculeatus)`
* `Ramirezi Comum (Mikrogeophagus ramirezi)`
* `Ramirezi Black German (Mikrogeophagus ramirezi var. Black)`
* `Ramirezi Ouro (Mikrogeophagus ramirezi var. Gold)`
* `Barbo Sumatra (Puntigrus tetrazona)`
* `Barbo Cereja (Desmopuntius titteya)`
* `Oscar Tigre (Astronotus ocellatus)`
* `Oscar Albino Red Ruby (Astronotus ocellatus var. Albino)`
* `Zoanthus Scrambled Eggs (Zoanthus sp.)`
* `Zoanthus King Midas (Zoanthus sp.)`
* `Coral Hammer Verde Metálico (Fimbriaphyllia ancora)`

---

## 2. Violações Proibidas e Inaceitáveis

### ❌ PROIBIDO 1: Repetir epíteto científico dentro do nome popular
* **ERRADO**: `Peixe-palhaço Ocellaris (Amphiprion ocellaris)`
* **MOTIVO**: "Ocellaris" é o epíteto da espécie em latim. O nome popular correto no aquarismo brasileiro é "Peixe-palhaço Comum", "Peixe-palhaço Laranja" ou o morfotipo de seleção ("Snowflake", "Picasso", "Storm").

### ❌ PROIBIDO 2: Combos ou Agrupamentos de Morfotipos
* **ERRADO**: `Ramirezi Comum (Alemão) & Ouro`
* **ERRADO**: `Zoanthus Scrambled Eggs / King Midas`
* **ERRADO**: `Tetra Negro Comum & Véu`
* **ERRADO**: `Kinguio Telescópio (Black Moor) & Ranchu`
* **ERRADO**: `Coridora Panda & Coridora Sterbai`
* **MOTIVO**: Em controle de estoque e catálogo comercial, **cada morfotipo é um produto único**. Eles possuem preços de custo diferentes, preços de venda diferentes, estoques separados e aparências visuais distintas. NUNCA use `/`, `&`, `+` ou vírgulas para juntar animais distintos em um mesmo produto. Cada um deve ser um item individual.

### ❌ PROIBIDO 3: Nomes de Categorias como Produtos
* **ERRADO**: `Anjos Anões`, `Peixes Jumbos`, `Equipe de Limpeza`, `Gobies & Blennies`.
* **MOTIVO**: Nomes genéricos de categoria não representam nenhum espécime biológico. O produto deve ser sempre a espécie/morfotipo real (ex: `Flame Angel (Centropyge loricula)`, `Aruanã Prata (Osteoglossum bicirrhosum)`).

---

## 3. Subcategorias Taxonômicas Oficiais

O sistema opera com separação rigorosa entre ambiente marinho e água doce:

| Subcategoria | Identificador Técnico | Descrição e Exemplos |
| :--- | :--- | :--- |
| **Peixes Marinhos** | `MARINE_FISH` | Palhaços, Tangs, Anjos, Blênios, Gobies, Wrasses, Mandarins |
| **Peixes de Água Doce** | `FRESHWATER_FISH` | Tetras, Discos, Bandeiras, Ramirezis, Kinguios, Coridoras, Bettas, Oscars |
| **Corais & Anêmonas** | `CORAL` | Zoanthus, Palithoas, Hammers, Torches, Acroporas, Montiporas, Anêmonas |
| **Invertebrados Marinhos** | `MARINE_INVERTEBRATE` | Camarão Bailarino, Paguro de Patas Amarelas, Turbo Snail, Estrela do Mar |
| **Invertebrados Água Doce** | `FRESHWATER_INVERTEBRATE`| Camarões Neocaridina (Red Cherry, Blue Dream), Ampulária, Neritina Zebra |
| **Plantas Aquáticas** | `PLANT` | Anúbias, Rotalas, Musgos de Java, Cryptocorynes, Higrófilas |
| **Equipamentos** | `EQUIPMENT` | Filtros, Termostatos, Skimmers, Bombas, Iluminação |
| **Suprimentos** | `SUPPLY` | Rações, Testes Químicos, Sal Marinho, Condicionadores |

---

## 4. Regras de Imagens de Animais

1. **Fotografia Real de Alta Qualidade**: Toda imagem deve ser uma foto real de aquário, focada e representativa da coloração daquele morfotipo específico. Proibido desenhos, ilustrações amadoras ou fotos borradas.
2. **Vínculo 1:1 Direto**: Cada morfotipo possui seu próprio slug no catálogo mestre (`imageSlug`).
3. **Regra de Ouro do Fallback**:
   * Se um morfotipo **não possui foto cadastrada**, o sistema **NUNCA DEVE TENTAR ADIVINHAR OU EXIBIR FOTO DE OUTRO PEIXE**.
   * O sistema deve renderizar o card elegante e estilizado com o ícone da subcategoria e o nome da espécie destacado.
   * Não exibir foto é infinitamente melhor do que exibir a foto do peixe errado.

---

## 5. Autonomia da Loja & Curadoria

1. O operador da loja (Marcelo) tem total autonomia para **fazer upload de foto** para qualquer produto (novo ou existente).
2. As fotos enviadas pelo lojista ficam armazenadas no escopo da loja, sem sobrescrever o catálogo de terceiros.
3. O administrador da plataforma pode inspecionar e aprovar fotos curadas pela loja para promovê-las ao Catálogo Mestre Global.
