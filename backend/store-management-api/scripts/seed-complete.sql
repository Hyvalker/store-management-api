-- =========================================================================
-- BAMBA AQUA - Script de Carga Completa para Testes (UTF-8)
-- Limpa e popula:
-- 1. Operadores do Sistema (admin e operador)
-- 2. Clientes (Aquaristas)
-- 3. Aquários dos Clientes (Marinhos e Água Doce)
-- 4. Testes Químicos de Parâmetros de Água & Diagnósticos
-- 5. Anotações Técnicas e Histórico dos Aquários
-- 6. Produtos & Seres Vivos do Catálogo
-- 7. Histórico de Pedidos (Pagos, Pendentes e Cancelados)
-- 8. Movimentações de Estoque e Perdas Biológicas
-- =========================================================================

-- 0. GARANTIA DAS COLUNAS DE TAXONOMIA E IMAGEM
ALTER TABLE products ADD COLUMN IF NOT EXISTS sub_category VARCHAR(50);
ALTER TABLE products ADD COLUMN IF NOT EXISTS image_slug VARCHAR(100);

-- 1. LIMPEZA TOTAL COM REINÍCIO DOS IDS
TRUNCATE TABLE
    aquarium_notes,
    water_parameter_tests,
    aquariums,
    order_items,
    orders,
    stock_movements,
    products,
    operators,
    users
RESTART IDENTITY CASCADE;

-- 2. OPERADORES DO SISTEMA (LOGIN & ACESSO)
-- admin: senha 'admin123' | operador: senha 'operador123' (ambos com hash BCrypt)
INSERT INTO operators (name, username, password, role, active, created_at, last_login_at)
VALUES
    ('Administrador', 'admin', '$2a$10$eBiRH3UtmWhVxKb9ggPJ..DuwIoUOn.TawJuDG1AjpeQT8F5g892W', 'ADMIN', true, CURRENT_TIMESTAMP - INTERVAL '30 days', CURRENT_TIMESTAMP - INTERVAL '1 hour'),
    ('Operador Balcão', 'operador', '$2a$10$nPGStEtaqdX/gb7PchDXgOJXVC8T3hdKKnEL954.OdyHMjyeVITbG', 'OPERATOR', true, CURRENT_TIMESTAMP - INTERVAL '30 days', CURRENT_TIMESTAMP - INTERVAL '3 hours');

-- 3. CADASTRO DE CLIENTES (AQUARISTAS)
INSERT INTO users (name, email, phone_number, address, active)
VALUES
    ('Marcelo Camargo', 'marcelo.camargo@email.com', '(21) 98765-4321', 'Av. das Américas, 4200 - Barra da Tijuca, RJ', true),
    ('Camila Nogueira', 'camila.aquarismo@email.com', '(21) 99887-1122', 'Rua Visconde de Pirajá, 305 - Ipanema, RJ', true),
    ('Rodrigo Albuquerque', 'rodrigo.marinho@email.com', '(21) 97123-4567', 'Rua Voluntários da Pátria, 150 - Botafogo, RJ', true),
    ('Beatriz Vasconcelos', 'beatriz.reef@email.com', '(21) 98234-5678', 'Rua Dias Ferreira, 80 - Leblon, RJ', true),
    ('Lucas Ferraz', 'lucas.aquascaping@email.com', '(21) 96345-6789', 'Rua Conde de Bonfim, 440 - Tijuca, RJ', true),
    ('Juliana Menezes', 'juliana.peixes@email.com', '(21) 97456-7890', 'Estrada dos Três Rios, 1200 - Freguesia, RJ', true),
    ('Felipe Guimarães', 'felipe.corais@email.com', '(21) 98567-8901', 'Rua São Clemente, 260 - Botafogo, RJ', true),
    ('Mariana Silveira', 'mariana.silveira@email.com', '(21) 99678-9012', 'Av. Lúcio Costa, 3600 - Barra da Tijuca, RJ', true);

-- 4. AQUÁRIOS DOS CLIENTES
INSERT INTO aquariums (user_id, name, type, volume_liters, description, created_at)
VALUES
    -- Marcelo Camargo (Cliente 1)
    (1, 'Reef dos Sonhos 350L', 'MARINE', 350.0, 'Aquário marinho misto com corais SPS (Acroporas) e LPS (Torches), substrato de aragonita viva e sump de 100L com skimmer potente.', CURRENT_TIMESTAMP - INTERVAL '60 days'),
    (1, 'Nano Quarentena 50L', 'MARINE', 50.0, 'Aquário hospital e quarentena para aclimatação segura de novos peixes antes da entrada no aquário principal.', CURRENT_TIMESTAMP - INTERVAL '40 days'),

    -- Camila Nogueira (Cliente 2)
    (2, 'Plantado Amazônico High-Tech', 'FRESHWATER', 240.0, 'Aquário plantado densamente povoado com CO2 pressurizado, substrato fértil Amazônia, cardume de Neons e casal de Acarás Disco.', CURRENT_TIMESTAMP - INTERVAL '50 days'),

    -- Rodrigo Albuquerque (Cliente 3)
    (3, 'Reef Marinho 500L', 'MARINE', 500.0, 'Aquário marinho focado em cirurgiões (Yellow Tang, Blue Tang), corais moles e colônias gigantes de Zoanthus.', CURRENT_TIMESTAMP - INTERVAL '45 days'),

    -- Beatriz Vasconcelos (Cliente 4)
    (4, 'Nano Coral Garden 80L', 'MARINE', 80.0, 'Aquário de corais focado em Euphyllias (Hammer, Frogspawn, Torch) com iluminação LED espectro azul actinico.', CURRENT_TIMESTAMP - INTERVAL '35 days'),

    -- Lucas Ferraz (Cliente 5)
    (5, 'Biótopo Asiático Betta & Corys', 'FRESHWATER', 90.0, 'Aquário com troncos tratados, folhas de amendoeira, plantas low-tech (Microsorum e Anubias) e Betta Halfmoon.', CURRENT_TIMESTAMP - INTERVAL '25 days'),

    -- Felipe Guimarães (Cliente 7)
    (6, 'Reef Predadores 400L', 'MARINE', 400.0, 'Aquário marinho temático com rochas vivas abrigando Peixe-leão e moreia.', CURRENT_TIMESTAMP - INTERVAL '20 days');

-- 5. TESTES DE PARÂMETROS QUÍMICOS DA ÁGUA
INSERT INTO water_parameter_tests (aquarium_id, test_date, ph, ammonia, nitrite, nitrate, phosphate, kh, gh, salinity, calcium, magnesium, temperature, silicate, client_report, diagnosis_notes, created_at)
VALUES
    -- Aquário 1 (Marcelo Camargo - Reef 350L) - Teste recente excelente
    (1, CURRENT_TIMESTAMP - INTERVAL '2 days', 8.3, 0.0, 0.0, 5.0, 0.03, 8.5, NULL, 1.025, 430.0, 1380.0, 25.5, 0.0,
     'Corais expandindo pólipos com vitalidade máxima. Peixes ativos e comendo com voracidade.',
     'Parâmetros ideais para corais SPS e LPS. Relação nitrato/fosfato equilibrada (Redfield). Manter a rotina de dosagem do Balling e TPA quinzenal com água deionizada.',
     CURRENT_TIMESTAMP - INTERVAL '2 days'),

    -- Aquário 1 (Marcelo Camargo - Reef 350L) - Teste há 20 dias (leve desvio anterior)
    (1, CURRENT_TIMESTAMP - INTERVAL '20 days', 8.1, 0.0, 0.0, 18.0, 0.10, 7.8, NULL, 1.024, 410.0, 1310.0, 26.0, 0.1,
     'Surgimento discreto de diatomáceas e algas filamentosas no vidro traseiro.',
     'Fosfato e nitrato acima do nível de segurança. Orientada troca do refil de carvão ativado e adição temporária de resina removedora de fosfato.',
     CURRENT_TIMESTAMP - INTERVAL '20 days'),

    -- Aquário 3 (Camila Nogueira - Plantado 240L) - Teste de água doce
    (3, CURRENT_TIMESTAMP - INTERVAL '4 days', 6.6, 0.0, 0.0, 10.0, 0.6, 3.0, 5.0, NULL, NULL, NULL, 28.0, NULL,
     'Plantas fazendo pearling intenso à tarde. Discos nadando tranquilos.',
     'Água doce ácida e mole ideal para peixes amazônicos e absorção de micronutrientes pelas plantas. Manter fertilização de ferro e potássio.',
     CURRENT_TIMESTAMP - INTERVAL '4 days'),

    -- Aquário 4 (Rodrigo Albuquerque - Reef 500L) - Alerta de salinidade/amônia leve
    (4, CURRENT_TIMESTAMP - INTERVAL '6 days', 8.1, 0.03, 0.0, 25.0, 0.15, 9.2, NULL, 1.027, 450.0, 1400.0, 25.8, NULL,
     'Água um pouco opaca após introdução de nova rocha e peixe.',
     'Leve pico de amônia e salinidade um pouco alta (1.027). Recomenda-se reposição de 15L com água doce RO/DI para baixar densidade para 1.025 e aplicação de bio-bactérias.',
     CURRENT_TIMESTAMP - INTERVAL '6 days'),

    -- Aquário 5 (Beatriz Vasconcelos - Nano 80L)
    (5, CURRENT_TIMESTAMP - INTERVAL '8 days', 8.2, 0.0, 0.0, 8.0, 0.04, 8.0, NULL, 1.025, 420.0, 1340.0, 25.2, 0.0,
     'Torches e hammers com coloração viva e abrindo completamente.',
     'Equilíbrio iônico e alcalinidade estáveis. Nenhum ajuste corretivo necessário.',
     CURRENT_TIMESTAMP - INTERVAL '8 days'),

    -- Aquário 6 (Lucas Ferraz - Betta 90L)
    (6, CURRENT_TIMESTAMP - INTERVAL '10 days', 7.0, 0.0, 0.0, 5.0, 0.2, 4.0, 6.0, NULL, NULL, NULL, 26.5, NULL,
     'Betta muito ativo construindo ninho de bolhas na superfície.',
     'Condições da água neutra e límpida com taninos adequados. Excelente saúde do exemplar.',
     CURRENT_TIMESTAMP - INTERVAL '10 days');

-- 6. ANOTAÇÕES TÉCNICAS E HISTÓRICO DE ATENDIMENTO
INSERT INTO aquarium_notes (aquarium_id, note_date, title, content, author_name, created_at)
VALUES
    (1, CURRENT_TIMESTAMP - INTERVAL '2 days', 'Avaliação Periódica do Reef', 'Realizada checagem visual dos corais duros. Acropora millepora apresentando crescimento nas pontas. Skimmer limpo e regulado.', 'Marcelo (Bamba Aqua)', CURRENT_TIMESTAMP - INTERVAL '2 days'),
    (1, CURRENT_TIMESTAMP - INTERVAL '18 days', 'Instalação de Bomba Dosadora', 'Cliente adquiriu dosadora Jebao 4 canais. Programada para dosar Kh, Cálcio e Magnésio de hora em hora.', 'Atendente Balcão', CURRENT_TIMESTAMP - INTERVAL '18 days'),
    (3, CURRENT_TIMESTAMP - INTERVAL '5 days', 'Poda Geral e Adubação', 'Poda das Rotalas e replantio das mudas. Inseridas pastilhas de NPK no substrato próximo às raízes das espadas amazônicas.', 'Marcelo (Bamba Aqua)', CURRENT_TIMESTAMP - INTERVAL '5 days'),
    (4, CURRENT_TIMESTAMP - INTERVAL '7 days', 'Calibração de Refratômetro Óptico', 'Cliente trouxe o refratômetro para aferição na loja. Calibrado com líquido de referência 35ppt.', 'Atendente Balcão', CURRENT_TIMESTAMP - INTERVAL '7 days'),
    (5, CURRENT_TIMESTAMP - INTERVAL '9 days', 'Aclimatação de Coral Torch Gold', 'Realizado banho profilático com dip coral antes da colagem na rocha matriz.', 'Marcelo (Bamba Aqua)', CURRENT_TIMESTAMP - INTERVAL '9 days'),
    (6, CURRENT_TIMESTAMP - INTERVAL '12 days', 'Troca Parcial e Adição de Folhas de Amendoeira', 'Realizada TPA de 25% com água tratada com Prime e adicionadas 2 folhas secas de catappa para liberar taninos benéficos.', 'Lucas Ferraz', CURRENT_TIMESTAMP - INTERVAL '12 days');

-- 7. CADASTRO DE PRODUTOS E SERES VIVOS DA BAMBA AQUA
INSERT INTO products (name, normalized_name, type, sub_category, image_slug, quantity, cost_price, sale_price, profit_margin, barcode, active, created_at)
VALUES
    ('Peixe-palhaço Ocellaris (Amphiprion ocellaris)', 'peixe-palhaço ocellaris (amphiprion ocellaris)', 'LIVING', 'MARINE_FISH', 'palhaco-ocellaris-comum.jpg', 24, 45.00, 76.50, 70.00, '789000000001', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe-leão (Pterois volitans)', 'peixe-leão (pterois volitans)', 'LIVING', 'MARINE_FISH', 'peixe-leao.jpg', 6, 120.00, 204.00, 70.00, '789000000002', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Blue Tang (Paracanthurus hepatus)', 'blue tang (paracanthurus hepatus)', 'LIVING', 'MARINE_FISH', 'tang-hepatus.jpg', 8, 280.00, 476.00, 70.00, '789000000003', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Yellow Tang (Zebrasoma flavescens)', 'yellow tang (zebrasoma flavescens)', 'LIVING', 'MARINE_FISH', 'tang-amarelo.jpg', 4, 650.00, 1105.00, 70.00, '789000000004', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Gramma Loreto', 'gramma loreto', 'LIVING', 'MARINE_FISH', 'gramma-loreto.jpg', 10, 110.00, 187.00, 70.00, '789000000005', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Platy Sunset', 'platy sunset', 'LIVING', 'FRESHWATER_FISH', 'platy-variatus-arco-iris.jpg', 45, 4.00, 10.00, 150.00, '789000000006', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Betta Splendens Halfmoon', 'betta splendens halfmoon', 'LIVING', 'FRESHWATER_FISH', 'betta-splendens.jpg', 18, 15.00, 35.00, 133.33, '789000000007', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tetra Neon Cardinal (Paracheirodon axelrodi)', 'tetra neon cardinal (paracheirodon axelrodi)', 'LIVING', 'FRESHWATER_FISH', 'tetra-neon-cardinal.jpg', 80, 2.50, 7.00, 180.00, '789000000008', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Disco Blue Diamond', 'acará disco blue diamond', 'LIVING', 'FRESHWATER_FISH', 'acara-disco-selvagem-azul.jpg', 5, 140.00, 280.00, 100.00, '789000000009', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Corydora Sterbai', 'corydora sterbai', 'LIVING', 'FRESHWATER_FISH', 'coridora-sterbai.jpg', 22, 12.00, 25.00, 108.33, '789000000010', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Coral Hammer Verde Metálico (Euphyllia ancora)', 'coral hammer verde metálico (euphyllia ancora)', 'LIVING', 'CORAL', 'hammer-coral-toxic-green.jpg', 7, 90.00, 160.00, 77.78, '789000000011', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Coral Frogspawn Ultra Green', 'coral frogspawn ultra green', 'LIVING', 'CORAL', 'frogspawn-coral-green.jpg', 5, 140.00, 250.00, 78.57, '789000000012', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Coral Torch Gold Dourado', 'coral torch gold dourado', 'LIVING', 'CORAL', 'torch-coral-24k-gold.jpg', 3, 350.00, 600.00, 71.43, '789000000013', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Muda Zoanthus Watermelon', 'muda zoanthus watermelon', 'LIVING', 'CORAL', 'zoanthus-watermelon.webp', 12, 40.00, 80.00, 100.00, '789000000014', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Bailarino (Lysmata wurdemanni)', 'camarão bailarino (lysmata wurdemanni)', 'LIVING', 'INVERTEBRATE', 'camarao-bailarino-comedor-de-aiptasia.jpg', 15, 25.00, 50.00, 100.00, '789000000015', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ração Marine Flakes 100g', 'ração marine flakes 100g', 'PRODUCT', 'SUPPLY', NULL, 35, 25.00, 45.00, 80.00, '789000000016', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ração Nori Alga Marinha 50 Folhas', 'ração nori alga marinha 50 folhas', 'PRODUCT', 'SUPPLY', NULL, 20, 30.00, 55.00, 83.33, '789000000017', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ração Spirulina Wafers Fundo 80g', 'ração spirulina wafers fundo 80g', 'PRODUCT', 'SUPPLY', NULL, 28, 22.00, 42.00, 90.91, '789000000018', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Artemia Salina Congelada 100g', 'artemia salina congelada 100g', 'PRODUCT', 'SUPPLY', NULL, 40, 12.00, 25.00, 108.33, '789000000019', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Sal Sintético Red Sea Coral Pro 7kg', 'sal sintético red sea coral pro 7kg', 'PRODUCT', 'SUPPLY', NULL, 12, 160.00, 260.00, 62.50, '789000000020', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Água Salgada Pronta para TPA (Galão 20L)', 'água salgada pronta para tpa (galão 20l)', 'PRODUCT', 'SUPPLY', NULL, 50, 10.00, 28.00, 180.00, '789000000021', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Teste de Nitrato (NO3) Salifert', 'teste de nitrato (no3) salifert', 'PRODUCT', 'SUPPLY', NULL, 9, 75.00, 130.00, 73.33, '789000000022', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Teste de Fosfato (PO4) Salifert', 'teste de fosfato (po4) salifert', 'PRODUCT', 'SUPPLY', NULL, 8, 80.00, 140.00, 75.00, '789000000023', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Carvão Ativado Especial Reef 500g', 'carvão ativado especial reef 500g', 'PRODUCT', 'SUPPLY', NULL, 25, 35.00, 65.00, 85.71, '789000000024', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Filtro Hang On 500L/h Atman', 'filtro hang on 500l/h atman', 'PRODUCT', 'EQUIPMENT', NULL, 8, 80.00, 145.00, 81.25, '789000000025', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Termostato 100W com Protetor', 'termostato 100w com protetor', 'PRODUCT', 'EQUIPMENT', NULL, 14, 55.00, 105.00, 90.91, '789000000026', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Skimmer Interno Bubble Magus Curve 5', 'skimmer interno bubble magus curve 5', 'PRODUCT', 'EQUIPMENT', NULL, 3, 720.00, 1190.00, 65.28, '789000000027', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Bomba de Circulação Jebao 4000L/h', 'bomba de circulação jebao 4000l/h', 'PRODUCT', 'EQUIPMENT', NULL, 6, 210.00, 360.00, 71.43, '789000000028', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Muda Zoanthus Rasta (Zoanthus sp.)', 'muda zoanthus rasta (zoanthus sp.)', 'LIVING', 'CORAL', 'zoanthus-rasta.webp', 10, 45.00, 95.00, 111.11, '789000000029', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Muda Zoanthus Red Bam Bam (Zoanthus sp.)', 'muda zoanthus red bam bam (zoanthus sp.)', 'LIVING', 'CORAL', 'zoanthus-red-bam-bam.webp', 8, 50.00, 99.00, 98.00, '789000000030', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Muda Zoanthus Utter Chaos (Zoanthus sp.)', 'muda zoanthus utter chaos (zoanthus sp.)', 'LIVING', 'CORAL', 'zoanthus-utter-chaos.webp', 6, 75.00, 145.00, 93.33, '789000000031', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Muda Zoanthus Radioactive Dragon Eye (Zoanthus sp.)', 'muda zoanthus radioactive dragon eye (zoanthus sp.)', 'LIVING', 'CORAL', 'zoanthus-radioactive-dragon-eye.webp', 12, 38.00, 79.00, 107.89, '789000000032', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Muda Zoanthus Sunny D (Zoanthus sp.)', 'muda zoanthus sunny d (zoanthus sp.)', 'LIVING', 'CORAL', 'zoanthus-sunny-d.webp', 7, 48.00, 95.00, 97.92, '789000000033', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Muda Zoanthus Scrambled Eggs (Zoanthus sp.)', 'muda zoanthus scrambled eggs (zoanthus sp.)', 'LIVING', 'CORAL', 'zoanthus-scrambled-eggs.webp', 9, 55.00, 110.00, 100.00, '789000000034', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Muda Zoanthus Fire and Ice (Zoanthus sp.)', 'muda zoanthus fire and ice (zoanthus sp.)', 'LIVING', 'CORAL', 'zoanthus-fire-and-ice.webp', 8, 42.00, 88.00, 109.52, '789000000035', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Muda Zoanthus Fruit Loops (Zoanthus sp.)', 'muda zoanthus fruit loops (zoanthus sp.)', 'LIVING', 'CORAL', 'zoanthus-fruit-loops.webp', 5, 65.00, 130.00, 100.00, '789000000036', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Muda Zoanthus King Midas (Zoanthus sp.)', 'muda zoanthus king midas (zoanthus sp.)', 'LIVING', 'CORAL', 'zoanthus-king-midas.webp', 11, 42.00, 85.00, 102.38, '789000000037', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Muda Zoanthus Blue Hornet (Zoanthus sp.)', 'muda zoanthus blue hornet (zoanthus sp.)', 'LIVING', 'CORAL', 'zoanthus-blue-hornet.webp', 4, 80.00, 160.00, 100.00, '789000000038', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Muda Zoanthus Candy Apple Red (Zoanthus sp.)', 'muda zoanthus candy apple red (zoanthus sp.)', 'LIVING', 'CORAL', 'zoanthus-candy-apple-red.webp', 5, 85.00, 170.00, 100.00, '789000000039', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Muda Palythoa Captain America (Palythoa sp.)', 'muda palythoa captain america (palythoa sp.)', 'LIVING', 'CORAL', 'palythoa-captain-america.webp', 6, 65.00, 135.00, 107.69, '789000000040', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anêmona Bubble Tip Rainbow (Entacmaea quadricolor)', 'anêmona bubble tip rainbow (entacmaea quadricolor)', 'LIVING', 'CORAL', 'anemona-bubble-tip-rainbow.jpg', 4, 180.00, 320.00, 77.78, '789000000041', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anêmona Bubble Tip Green (Entacmaea quadricolor)', 'anêmona bubble tip green (entacmaea quadricolor)', 'LIVING', 'CORAL', 'anemona-bubble-tip-green.jpg', 6, 120.00, 220.00, 83.33, '789000000042', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anêmona Bubble Tip Rose (Entacmaea quadricolor)', 'anêmona bubble tip rose (entacmaea quadricolor)', 'LIVING', 'CORAL', 'anemona-bubble-tip-rose.jpg', 5, 150.00, 280.00, 86.67, '789000000043', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anêmona Carpet Green (Stichodactyla haddoni)', 'anêmona carpet green (stichodactyla haddoni)', 'LIVING', 'CORAL', 'anemona-carpet-green.jpg', 3, 250.00, 450.00, 80.00, '789000000044', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anêmona Carpet Red (Stichodactyla haddoni)', 'anêmona carpet red (stichodactyla haddoni)', 'LIVING', 'CORAL', 'anemona-carpet-red.jpg', 2, 520.00, 950.00, 82.69, '789000000045', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anêmona Mini Carpet (Stichodactyla tapetum)', 'anêmona mini carpet (stichodactyla tapetum)', 'LIVING', 'CORAL', 'anemona-mini-carpet.jpg', 8, 85.00, 165.00, 94.12, '789000000046', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anêmona Sebae (Heteractis crispa)', 'anêmona sebae (heteractis crispa)', 'LIVING', 'CORAL', 'anemona-sebae.jpg', 3, 130.00, 240.00, 84.62, '789000000047', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anêmona Passiflora Nacional (Condylactis gigantea)', 'anêmona passiflora nacional (condylactis gigantea)', 'LIVING', 'CORAL', 'anemona-passiflora-nacional.jpg', 10, 35.00, 75.00, 114.29, '789000000048', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Paguro de Patas Amarelas (Clibanarius antillensis)', 'paguro de patas amarelas (clibanarius antillensis)', 'LIVING', 'INVERTEBRATE', 'paguro-pata-amarela.jpg', 60, 3.50, 8.00, 128.57, '789000000049', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Paguro Patas Azuis (Calcinus elegans)', 'paguro patas azuis (calcinus elegans)', 'LIVING', 'INVERTEBRATE', 'paguro-pata-azul.jpg', 25, 14.00, 30.00, 114.29, '789000000050', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Paguro Patas Vermelhas (Calcinus tibicen)', 'paguro patas vermelhas (calcinus tibicen)', 'LIVING', 'INVERTEBRATE', 'paguro-pata-vermelha.jpg', 30, 12.00, 26.00, 116.67, '789000000051', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Turbo Snail (Turbo fluctuosus)', 'turbo snail (turbo fluctuosus)', 'LIVING', 'INVERTEBRATE', 'turbo-snail.jpg', 50, 4.50, 10.00, 122.22, '789000000052', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Strombus Snail (Strombus alatus)', 'strombus snail (strombus alatus)', 'LIVING', 'INVERTEBRATE', 'strombus-snail.jpg', 18, 18.00, 38.00, 111.11, '789000000053', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Orange Snail (Babylonia areolata)', 'orange snail (babylonia areolata)', 'LIVING', 'INVERTEBRATE', 'orange-snail.jpg', 20, 15.00, 35.00, 133.33, '789000000054', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Nassarius Snail (Nassarius sp.)', 'nassarius snail (nassarius sp.)', 'LIVING', 'INVERTEBRATE', 'nassarius-snail.jpg', 35, 6.00, 14.00, 133.33, '789000000055', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cerith Snail (Cerithium sp.)', 'cerith snail (cerithium sp.)', 'LIVING', 'INVERTEBRATE', 'cerith-snail.jpg', 40, 4.00, 9.00, 125.00, '789000000056', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Pepino do Mar (Holothuria atra)', 'pepino do mar (holothuria atra)', 'LIVING', 'INVERTEBRATE', 'pepino-do-mar.jpg', 8, 30.00, 65.00, 116.67, '789000000057', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Skunk Cleaner (Lysmata amboinensis)', 'camarão skunk cleaner (lysmata amboinensis)', 'LIVING', 'INVERTEBRATE', 'camarao-skunk-cleaner.jpg', 14, 65.00, 125.00, 92.31, '789000000058', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Stenopus Bandado (Stenopus hispidus)', 'camarão stenopus bandado (stenopus hispidus)', 'LIVING', 'INVERTEBRATE', 'camarao-stenopus.jpg', 12, 45.00, 90.00, 100.00, '789000000059', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Blood Fire Shrimp (Lysmata debelius)', 'camarão blood fire shrimp (lysmata debelius)', 'LIVING', 'INVERTEBRATE', 'camarao-blood.jpg', 6, 120.00, 230.00, 91.67, '789000000060', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Sexy Shrimp (Thor amboinensis)', 'camarão sexy shrimp (thor amboinensis)', 'LIVING', 'INVERTEBRATE', 'camarao-sexy.jpg', 15, 28.00, 60.00, 114.29, '789000000061', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Estrela Vermelha Fromia (Fromia indica)', 'estrela vermelha fromia (fromia indica)', 'LIVING', 'INVERTEBRATE', 'estrela-vermelha-fromia.jpg', 7, 60.00, 120.00, 100.00, '789000000062', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Estrela Linckia Azul (Linckia laevigata)', 'estrela linckia azul (linckia laevigata)', 'LIVING', 'INVERTEBRATE', 'estrela-linckia-azul.jpg', 5, 85.00, 170.00, 100.00, '789000000063', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ouriço Tuxedo (Mespilia globulus)', 'ouriço tuxedo (mespilia globulus)', 'LIVING', 'INVERTEBRATE', 'ourico-tuxedo.jpg', 10, 42.00, 88.00, 109.52, '789000000064', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Coral Carpet Green (Briareum hamrum)', 'coral carpet green (briareum hamrum)', 'LIVING', 'CORAL', 'coral-carpet-green.jpg', 15, 45.00, 95.00, 111.11, '789000000065', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Coral Carpet Brown (Clavularia sp.)', 'coral carpet brown (clavularia sp.)', 'LIVING', 'CORAL', 'coral-carpet-brown.jpg', 10, 35.00, 75.00, 114.29, '789000000066', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mushroom Rhodactis Superman (Rhodactis inchoata)', 'mushroom rhodactis superman (rhodactis inchoata)', 'LIVING', 'CORAL', 'rhodactis-superman.jpg', 8, 75.00, 155.00, 106.67, '789000000067', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Organ Pipe Coral (Tubipora musica)', 'organ pipe coral (tubipora musica)', 'LIVING', 'CORAL', 'organ-pipe-coral.jpg', 6, 60.00, 125.00, 108.33, '789000000068', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Leather Umbrella (Sarcophyton sp.)', 'leather umbrella (sarcophyton sp.)', 'LIVING', 'CORAL', 'leather-umbrella.jpg', 7, 55.00, 115.00, 109.09, '789000000069', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Leather Devil Hand Green (Lobophytum sp.)', 'leather devil hand green (lobophytum sp.)', 'LIVING', 'CORAL', 'leather-devil-hand-green.jpg', 6, 60.00, 125.00, 108.33, '789000000070', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Alga Atomic Broccoli (Hypnea pannosa)', 'alga atomic broccoli (hypnea pannosa)', 'LIVING', 'PLANT', 'alga-atomic-broccoli.png', 9, 40.00, 85.00, 112.50, '789000000071', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Plate Coral Green (Fungia sp.)', 'plate coral green (fungia sp.)', 'LIVING', 'CORAL', 'plate-coral-green.jpg', 4, 95.00, 195.00, 105.26, '789000000072', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Coral Acropora Green Slimer (Acropora yongei)', 'coral acropora green slimer (acropora yongei)', 'LIVING', 'CORAL', 'acropora-green-slimer.jpg', 8, 80.00, 160.00, 100.00, '789000000073', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Coral Acropora Millepora Rosa (Acropora millepora)', 'coral acropora millepora rosa (acropora millepora)', 'LIVING', 'CORAL', 'acropora-millepora-rosa.jpg', 5, 95.00, 195.00, 105.26, '789000000074', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Coral Ricordea Florida Laranja (Ricordea florida)', 'coral ricordea florida laranja (ricordea florida)', 'LIVING', 'CORAL', 'ricordea-florida-laranja.jpg', 7, 70.00, 140.00, 100.00, '789000000075', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Duncan Coral (Duncanopsammia axifuga)', 'duncan coral (duncanopsammia axifuga)', 'LIVING', 'CORAL', 'duncan-coral.jpg', 6, 85.00, 175.00, 105.88, '789000000076', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Blastomussa Wellsi Red (Blastomussa wellsi)', 'blastomussa wellsi red (blastomussa wellsi)', 'LIVING', 'CORAL', 'blastomussa-wellsi-red.jpg', 4, 110.00, 220.00, 100.00, '789000000077', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Palhaço Black Ocellaris (Amphiprion ocellaris)', 'palhaço black ocellaris (amphiprion ocellaris)', 'LIVING', 'MARINE_FISH', 'palhaco-black-ocellaris.jpg', 12, 65.00, 125.00, 92.31, '789000000078', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Palhaço Snowflake (Amphiprion ocellaris)', 'palhaço snowflake (amphiprion ocellaris)', 'LIVING', 'MARINE_FISH', 'palhaco-snowflake.jpg', 8, 85.00, 165.00, 94.12, '789000000079', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Palhaço Black Storm (Amphiprion ocellaris)', 'palhaço black storm (amphiprion ocellaris)', 'LIVING', 'MARINE_FISH', 'palhaco-black-storm.jpg', 4, 180.00, 350.00, 94.44, '789000000080', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Palhaço Orange Storm (Amphiprion ocellaris)', 'palhaço orange storm (amphiprion ocellaris)', 'LIVING', 'MARINE_FISH', 'palhaco-orange-storm.jpg', 4, 220.00, 420.00, 90.91, '789000000081', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Palhaço Picasso (Amphiprion percula)', 'palhaço picasso (amphiprion percula)', 'LIVING', 'MARINE_FISH', 'peixe-palhaco-picasso.jpg', 6, 110.00, 215.00, 95.45, '789000000082', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Palhaço Maroon Faixa Dourada (Premnas epigramma)', 'palhaço maroon faixa dourada (premnas epigramma)', 'LIVING', 'MARINE_FISH', 'palhaco-maroon-goldstripe.jpg', 5, 70.00, 139.00, 98.57, '789000000083', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Purple Tang (Zebrasoma xanthurum)', 'purple tang (zebrasoma xanthurum)', 'LIVING', 'MARINE_FISH', 'tang-purple.jpg', 3, 850.00, 1490.00, 75.29, '789000000084', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Powder Blue Tang (Acanthurus leucosternon)', 'powder blue tang (acanthurus leucosternon)', 'LIVING', 'MARINE_FISH', 'tang-powder-blue.jpg', 4, 420.00, 780.00, 85.71, '789000000085', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Sailfin Tang (Zebrasoma veliferum)', 'sailfin tang (zebrasoma veliferum)', 'LIVING', 'MARINE_FISH', 'tang-sailfin.jpg', 5, 180.00, 340.00, 88.89, '789000000086', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mandarim Verde (Synchiropus splendidus)', 'mandarim verde (synchiropus splendidus)', 'LIVING', 'MARINE_FISH', 'mandarim-verde.jpg', 7, 85.00, 165.00, 94.12, '789000000087', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mandarim Vermelho (Synchiropus splendidus var. Red)', 'mandarim vermelho (synchiropus splendidus var. red)', 'LIVING', 'MARINE_FISH', 'mandarim-vermelho.jpg', 5, 110.00, 215.00, 95.45, '789000000088', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Trigger Picasso (Rhinecanthus aculeatus)', 'trigger picasso (rhinecanthus aculeatus)', 'LIVING', 'MARINE_FISH', 'trigger-picasso.jpg', 4, 95.00, 185.00, 94.74, '789000000089', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Blênio Macaco Nacional (Scartella cristata)', 'blênio macaco nacional (scartella cristata)', 'LIVING', 'MARINE_FISH', 'blenio-macaco-nacional.jpg', 10, 20.00, 45.00, 125.00, '789000000090', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Blênio Bicolor (Ecsenius bicolor)', 'blênio bicolor (ecsenius bicolor)', 'LIVING', 'MARINE_FISH', 'blenio-bicolor.jpg', 8, 65.00, 125.00, 92.31, '789000000091', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Firefish Magnífico (Nemateleotris magnifica)', 'firefish magnífico (nemateleotris magnifica)', 'LIVING', 'MARINE_FISH', 'firefish-magnifico.jpg', 10, 55.00, 105.00, 90.91, '789000000092', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Firefish Purple (Nemateleotris decora)', 'firefish purple (nemateleotris decora)', 'LIVING', 'MARINE_FISH', 'firefish-purple.jpg', 6, 90.00, 175.00, 94.44, '789000000093', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Foxface Amarelo (Siganus vulpinus)', 'foxface amarelo (siganus vulpinus)', 'LIVING', 'MARINE_FISH', 'yellow-foxface.jpg', 5, 140.00, 265.00, 89.29, '789000000094', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cardinal Banggai (Pterapogon kauderni)', 'cardinal banggai (pterapogon kauderni)', 'LIVING', 'MARINE_FISH', 'cardinal-banggai.jpg', 12, 45.00, 89.00, 97.78, '789000000095', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Green Chromis (Chromis viridis)', 'green chromis (chromis viridis)', 'LIVING', 'MARINE_FISH', 'green-chromis.jpg', 25, 18.00, 38.00, 111.11, '789000000096', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Goby Yellow Watchman (Cryptocentrus cinctus)', 'goby yellow watchman (cryptocentrus cinctus)', 'LIVING', 'MARINE_FISH', 'goby-yellow-watchman.jpg', 8, 60.00, 120.00, 100.00, '789000000097', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Bandeira Comum Listrado (Pterophyllum scalare)', 'acará bandeira comum listrado (pterophyllum scalare)', 'LIVING', 'FRESHWATER_FISH', 'acara-bandeira-comum-listrado.jpg', 20, 10.00, 25.00, 150.00, '789000000098', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tetra Mato Grosso (Hyphessobrycon eques)', 'tetra mato grosso (hyphessobrycon eques)', 'LIVING', 'FRESHWATER_FISH', 'tetra-mato-grosso.jpg', 40, 3.50, 8.50, 142.86, '789000000099', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Corydora Panda (Corydoras panda)', 'corydora panda (corydoras panda)', 'LIVING', 'FRESHWATER_FISH', 'coridora-panda.jpg', 18, 14.00, 30.00, 114.29, '789000000100', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Fantasma Nacional (Palaemonetes argentinus)', 'camarão fantasma nacional (palaemonetes argentinus)', 'LIVING', 'INVERTEBRATE', 'camarao-fantasma-nacional.jpg', 50, 2.00, 6.00, 200.00, '789000000101', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Amano (Caridina multidentata)', 'camarão amano (caridina multidentata)', 'LIVING', 'INVERTEBRATE', 'camarao-amano.jpg', 30, 10.00, 22.00, 120.00, '789000000102', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anubia Lanceolata (Anubias lanceolata)', 'anubia lanceolata (anubias lanceolata)', 'LIVING', 'PLANT', 'anubia-lanceolata.jpg', 15, 18.00, 38.00, 111.11, '789000000103', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Musgo de Java (Taxiphyllum barbieri)', 'musgo de java (taxiphyllum barbieri)', 'LIVING', 'PLANT', 'musgo-de-java.jpg', 25, 12.00, 26.00, 116.67, '789000000104', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Rotala Rotundifolia Verde (Rotala rotundifolia)', 'rotala rotundifolia verde (rotala rotundifolia)', 'LIVING', 'PLANT', 'rotala-rotundifolia-verde.jpg', 30, 8.00, 18.00, 125.00, '789000000105', true, CURRENT_TIMESTAMP - INTERVAL '40 days');

-- 8. REGISTRO DE PERDAS BIOLÓGICAS (LOSS) PARA O DASHBOARD E AUDITORIA
INSERT INTO stock_movements (product_id, quantity, cost_price, sale_price, profit_margin, reason, type, created_at)
VALUES
    (12, 1, 140.00, 250.00, 78.57, 'Morte biológica - choque de temperatura no coral Frogspawn', 'LOSS', CURRENT_TIMESTAMP - INTERVAL '12 days'),
    (3, 1, 280.00, 476.00, 70.00, 'Morte biológica - infecção parasitária por Oodinium no Blue Tang', 'LOSS', CURRENT_TIMESTAMP - INTERVAL '18 days'),
    (1, 2, 45.00, 76.50, 70.00, 'Morte na quarentena pós-chegada de importação', 'LOSS', CURRENT_TIMESTAMP - INTERVAL '25 days');

-- 9. HISTÓRICO REALISTA DE PEDIDOS (PAGOS, PENDENTES E CANCELADOS)
-- Pedido 1: Marcelo Camargo (Água Salgada + Ração) - PAGO
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (101.00, CURRENT_TIMESTAMP - INTERVAL '28 days', 'PAID', 1, NULL);
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (2, 28.00, 10.00, 56.00, 1, 21),
    (1, 45.00, 25.00, 45.00, 1, 16);

-- Pedido 2: Camila Nogueira (Peixe-palhaço + Sal) - PAGO
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (336.50, CURRENT_TIMESTAMP - INTERVAL '26 days', 'PAID', 2, NULL);
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (1, 76.50, 45.00, 76.50, 2, 1),
    (1, 260.00, 160.00, 260.00, 2, 20);

-- Pedido 3: Balcão Avulso (Platys + Ração de Fundo) - PAGO
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (102.00, CURRENT_TIMESTAMP - INTERVAL '24 days', 'PAID', NULL, 'Carlos Balcão');
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (6, 10.00, 4.00, 60.00, 3, 6),
    (1, 42.00, 22.00, 42.00, 3, 18);

-- Pedido 4: Rodrigo Albuquerque (Coral Hammer + Teste Nitrato) - PAGO
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (290.00, CURRENT_TIMESTAMP - INTERVAL '22 days', 'PAID', 3, NULL);
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (1, 160.00, 90.00, 160.00, 4, 11),
    (1, 130.00, 75.00, 130.00, 4, 22);

-- Pedido 5: Beatriz Vasconcelos (Muda Zoanthus + Artemia Congelada) - PAGO
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (130.00, CURRENT_TIMESTAMP - INTERVAL '20 days', 'PAID', 4, NULL);
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (1, 80.00, 40.00, 80.00, 5, 14),
    (2, 25.00, 12.00, 50.00, 5, 19);

-- Pedido 6: Balcão Avulso (Tetras Neon - Venda de Volume) - PAGO
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (105.00, CURRENT_TIMESTAMP - INTERVAL '18 days', 'PAID', NULL, 'Cliente Anônimo');
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (15, 7.00, 2.50, 105.00, 6, 8);

-- Pedido 7: Lucas Ferraz (Betta Halfmoon + Termostato) - PAGO
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (140.00, CURRENT_TIMESTAMP - INTERVAL '16 days', 'PAID', 5, NULL);
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (1, 35.00, 15.00, 35.00, 7, 7),
    (1, 105.00, 55.00, 105.00, 7, 26);

-- Pedido 8: Felipe Guimarães (Torch Gold + Água Salgada) - PAGO
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (656.00, CURRENT_TIMESTAMP - INTERVAL '14 days', 'PAID', 7, NULL);
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (1, 600.00, 350.00, 600.00, 8, 13),
    (2, 28.00, 10.00, 56.00, 8, 21);

-- Pedido 9: Balcão Avulso (Ração Marine Flakes + Nori) - PAGO
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (100.00, CURRENT_TIMESTAMP - INTERVAL '12 days', 'PAID', NULL, 'Thiago Balcão');
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (1, 45.00, 25.00, 45.00, 9, 16),
    (1, 55.00, 30.00, 55.00, 9, 17);

-- Pedido 10: Mariana Silveira (Blue Tang + Ração Marine) - PAGO
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (521.00, CURRENT_TIMESTAMP - INTERVAL '10 days', 'PAID', 8, NULL);
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (1, 476.00, 280.00, 476.00, 10, 3),
    (1, 45.00, 25.00, 45.00, 10, 16);

-- Pedido 11: Juliana Menezes (Platys + Carvão Ativado) - PAGO
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (145.00, CURRENT_TIMESTAMP - INTERVAL '8 days', 'PAID', 6, NULL);
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (8, 10.00, 4.00, 80.00, 11, 6),
    (1, 65.00, 35.00, 65.00, 11, 24);

-- Pedido 12: Balcão Avulso (Peixes-palhaço casal + Camarão) - PAGO
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (203.00, CURRENT_TIMESTAMP - INTERVAL '6 days', 'PAID', NULL, 'André');
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (2, 76.50, 45.00, 153.00, 12, 1),
    (1, 50.00, 25.00, 50.00, 12, 15);

-- Pedido 13: Rodrigo Albuquerque (Filtro Hang On) - PAGO
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (145.00, CURRENT_TIMESTAMP - INTERVAL '4 days', 'PAID', 3, NULL);
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (1, 145.00, 80.00, 145.00, 13, 25);

-- Pedido 14: Camila Nogueira (Tetras Neon + Corydoras) - PAGO
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (145.00, CURRENT_TIMESTAMP - INTERVAL '2 days', 'PAID', 2, NULL);
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (10, 7.00, 2.50, 70.00, 14, 8),
    (3, 25.00, 12.00, 75.00, 14, 10);

-- Pedido 15: Marcelo Camargo (Coral Hammer) - PENDENTE (Para simular checkout na hora)
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (205.00, CURRENT_TIMESTAMP - INTERVAL '3 hours', 'PENDING', 1, NULL);
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (1, 160.00, 90.00, 160.00, 15, 11),
    (1, 45.00, 25.00, 45.00, 15, 16);

-- Pedido 16: Balcão Avulso (Termostato + Ração) - PENDENTE
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (150.00, CURRENT_TIMESTAMP - INTERVAL '1 hour', 'PENDING', NULL, 'Cliente Balcão - João');
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (1, 105.00, 55.00, 105.00, 16, 26),
    (1, 45.00, 25.00, 45.00, 16, 16);

-- Pedido 17: Beatriz Vasconcelos (Skimmer Interno) - CANCELADO (Exemplo de pedido cancelado com histórico)
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (1190.00, CURRENT_TIMESTAMP - INTERVAL '15 days', 'CANCELED', 4, NULL);
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (1, 1190.00, 720.00, 1190.00, 17, 27);
INSERT INTO stock_movements (product_id, quantity, cost_price, sale_price, profit_margin, reason, type, created_at)
VALUES 
    (27, 1, 720.00, 1190.00, 65.28, 'Devolução/Estorno por cancelamento do Pedido #17', 'RETURN', CURRENT_TIMESTAMP - INTERVAL '15 days');

-- Pedido 18: Balcão Avulso (Yellow Tang) - CANCELADO (Exemplo de cancelamento com devolução de animal)
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (1105.00, CURRENT_TIMESTAMP - INTERVAL '7 days', 'CANCELED', NULL, 'Pedro Silveira');
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (1, 1105.00, 650.00, 1105.00, 18, 4);
INSERT INTO stock_movements (product_id, quantity, cost_price, sale_price, profit_margin, reason, type, created_at)
VALUES 
    (4, 1, 650.00, 1105.00, 70.00, 'Devolução/Estorno por cancelamento do Pedido #18', 'RETURN', CURRENT_TIMESTAMP - INTERVAL '7 days');

-- FIM DO SCRIPT
