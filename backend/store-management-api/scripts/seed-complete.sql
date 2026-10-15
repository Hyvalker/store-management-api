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
CREATE TABLE IF NOT EXISTS store_settings (
    setting_key VARCHAR(100) PRIMARY KEY,
    setting_value TEXT NOT NULL,
    updated_at TIMESTAMP,
    updated_by VARCHAR(100)
);

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
    ('Peixe-palhaço Comum (Amphiprion ocellaris)', 'peixe-palhaço comum (amphiprion ocellaris)', 'LIVING', 'MARINE_FISH', '071_ocellaris_snowflake.jpg', 24, 45.00, 76.50, 70.00, '789000000001', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe-leão (Pterois volitans)', 'peixe-leão (pterois volitans)', 'LIVING', 'MARINE_FISH', NULL, 6, 120.00, 204.00, 70.00, '789000000002', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Blue Tang (Paracanthurus hepatus)', 'blue tang (paracanthurus hepatus)', 'LIVING', 'MARINE_FISH', '076_blue_tang_hepatus.webp', 8, 280.00, 476.00, 70.00, '789000000003', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Yellow Tang (Zebrasoma flavescens)', 'yellow tang (zebrasoma flavescens)', 'LIVING', 'MARINE_FISH', '077_yellow_tang.webp', 4, 650.00, 1105.00, 70.00, '789000000004', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Gramma Loreto', 'gramma loreto', 'LIVING', 'MARINE_FISH', NULL, 10, 110.00, 187.00, 70.00, '789000000005', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Platy Sunset', 'platy sunset', 'LIVING', 'FRESHWATER_FISH', NULL, 45, 4.00, 10.00, 150.00, '789000000006', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Betta Splendens Halfmoon', 'betta splendens halfmoon', 'LIVING', 'FRESHWATER_FISH', NULL, 18, 15.00, 35.00, 133.33, '789000000007', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tetra Neon Cardinal (Paracheirodon axelrodi)', 'tetra neon cardinal (paracheirodon axelrodi)', 'LIVING', 'FRESHWATER_FISH', NULL, 80, 2.50, 7.00, 180.00, '789000000008', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Disco Blue Diamond', 'acará disco blue diamond', 'LIVING', 'FRESHWATER_FISH', '130_acara_disco_blue_diamond.webp', 5, 140.00, 280.00, 100.00, '789000000009', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Corydora Sterbai', 'corydora sterbai', 'LIVING', 'FRESHWATER_FISH', NULL, 22, 12.00, 25.00, 108.33, '789000000010', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Coral Hammer Verde Metálico (Euphyllia ancora)', 'coral hammer verde metálico (euphyllia ancora)', 'LIVING', 'CORAL', NULL, 7, 90.00, 160.00, 77.78, '789000000011', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Coral Frogspawn Ultra Green', 'coral frogspawn ultra green', 'LIVING', 'CORAL', NULL, 5, 140.00, 250.00, 78.57, '789000000012', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Coral Torch Gold Dourado', 'coral torch gold dourado', 'LIVING', 'CORAL', '050_torch_gold_24k_holy_grail.jpg', 3, 350.00, 600.00, 71.43, '789000000013', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Watermelon (Zoanthus sp.)', 'zoanthus watermelon (zoanthus sp.)', 'LIVING', 'CORAL', '003_zoanthus_watermelon.webp', 12, 40.00, 80.00, 100.00, '789000000014', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Bailarino (Lysmata wurdemanni)', 'camarão bailarino (lysmata wurdemanni)', 'LIVING', 'INVERTEBRATE', NULL, 15, 25.00, 50.00, 100.00, '789000000015', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
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
    ('Zoanthus Rasta (Zoanthus sp.)', 'zoanthus rasta (zoanthus sp.)', 'LIVING', 'CORAL', '002_zoanthus_rasta.jpg', 10, 45.00, 95.00, 111.11, '789000000029', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Red Bam Bam (Zoanthus sp.)', 'zoanthus red bam bam (zoanthus sp.)', 'LIVING', 'CORAL', NULL, 8, 50.00, 99.00, 98.00, '789000000030', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Utter Chaos (Zoanthus sp.)', 'zoanthus utter chaos (zoanthus sp.)', 'LIVING', 'CORAL', NULL, 6, 75.00, 145.00, 93.33, '789000000031', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Radioactive Dragon Eye (Zoanthus sp.)', 'zoanthus radioactive dragon eye (zoanthus sp.)', 'LIVING', 'CORAL', NULL, 12, 38.00, 79.00, 107.89, '789000000032', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Sunny D (Zoanthus sp.)', 'zoanthus sunny d (zoanthus sp.)', 'LIVING', 'CORAL', NULL, 7, 48.00, 95.00, 97.92, '789000000033', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Scrambled Eggs (Zoanthus sp.)', 'zoanthus scrambled eggs (zoanthus sp.)', 'LIVING', 'CORAL', '014_zoanthus_scrambled_eggs.webp', 9, 55.00, 110.00, 100.00, '789000000034', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Fire and Ice (Zoanthus sp.)', 'zoanthus fire and ice (zoanthus sp.)', 'LIVING', 'CORAL', '009_zoanthus_fire_and_ice.webp', 8, 42.00, 88.00, 109.52, '789000000035', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Fruit Loops (Zoanthus sp.)', 'zoanthus fruit loops (zoanthus sp.)', 'LIVING', 'CORAL', '007_zoanthus_fruit_loops.jpg', 5, 65.00, 130.00, 100.00, '789000000036', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus King Midas (Zoanthus sp.)', 'zoanthus king midas (zoanthus sp.)', 'LIVING', 'CORAL', NULL, 11, 42.00, 85.00, 102.38, '789000000037', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Blue Hornet (Zoanthus sp.)', 'zoanthus blue hornet (zoanthus sp.)', 'LIVING', 'CORAL', '010_zoanthus_blue_hornet.jpg', 4, 80.00, 160.00, 100.00, '789000000038', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Candy Apple Red (Zoanthus sp.)', 'zoanthus candy apple red (zoanthus sp.)', 'LIVING', 'CORAL', NULL, 5, 85.00, 170.00, 100.00, '789000000039', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Palythoa Captain America (Palythoa sp.)', 'palythoa captain america (palythoa sp.)', 'LIVING', 'CORAL', '018_palythoa_captain_america.webp', 6, 65.00, 135.00, 107.69, '789000000040', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anêmona Bubble Tip Rainbow (Entacmaea quadricolor)', 'anêmona bubble tip rainbow (entacmaea quadricolor)', 'LIVING', 'CORAL', NULL, 4, 180.00, 320.00, 77.78, '789000000041', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anêmona Bubble Tip Green (Entacmaea quadricolor)', 'anêmona bubble tip green (entacmaea quadricolor)', 'LIVING', 'CORAL', NULL, 6, 120.00, 220.00, 83.33, '789000000042', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anêmona Bubble Tip Rose (Entacmaea quadricolor)', 'anêmona bubble tip rose (entacmaea quadricolor)', 'LIVING', 'CORAL', '041_anemona_bta_rose_rainbow.webp', 5, 150.00, 280.00, 86.67, '789000000043', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anêmona Carpet Green (Stichodactyla haddoni)', 'anêmona carpet green (stichodactyla haddoni)', 'LIVING', 'CORAL', NULL, 3, 250.00, 450.00, 80.00, '789000000044', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anêmona Carpet Red (Stichodactyla haddoni)', 'anêmona carpet red (stichodactyla haddoni)', 'LIVING', 'CORAL', NULL, 2, 520.00, 950.00, 82.69, '789000000045', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anêmona Mini Carpet (Stichodactyla tapetum)', 'anêmona mini carpet (stichodactyla tapetum)', 'LIVING', 'CORAL', NULL, 8, 85.00, 165.00, 94.12, '789000000046', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anêmona Sebae (Heteractis crispa)', 'anêmona sebae (heteractis crispa)', 'LIVING', 'CORAL', NULL, 3, 130.00, 240.00, 84.62, '789000000047', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anêmona Passiflora Nacional (Condylactis gigantea)', 'anêmona passiflora nacional (condylactis gigantea)', 'LIVING', 'CORAL', NULL, 10, 35.00, 75.00, 114.29, '789000000048', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Paguro de Patas Amarelas (Clibanarius antillensis)', 'paguro de patas amarelas (clibanarius antillensis)', 'LIVING', 'INVERTEBRATE', NULL, 60, 3.50, 8.00, 128.57, '789000000049', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Paguro Patas Azuis (Calcinus elegans)', 'paguro patas azuis (calcinus elegans)', 'LIVING', 'INVERTEBRATE', NULL, 25, 14.00, 30.00, 114.29, '789000000050', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Paguro Patas Vermelhas (Calcinus tibicen)', 'paguro patas vermelhas (calcinus tibicen)', 'LIVING', 'INVERTEBRATE', NULL, 30, 12.00, 26.00, 116.67, '789000000051', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Turbo Snail (Turbo fluctuosus)', 'turbo snail (turbo fluctuosus)', 'LIVING', 'INVERTEBRATE', NULL, 50, 4.50, 10.00, 122.22, '789000000052', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Strombus Snail (Strombus alatus)', 'strombus snail (strombus alatus)', 'LIVING', 'INVERTEBRATE', NULL, 18, 18.00, 38.00, 111.11, '789000000053', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Orange Snail (Babylonia areolata)', 'orange snail (babylonia areolata)', 'LIVING', 'INVERTEBRATE', NULL, 20, 15.00, 35.00, 133.33, '789000000054', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Nassarius Snail (Nassarius sp.)', 'nassarius snail (nassarius sp.)', 'LIVING', 'INVERTEBRATE', NULL, 35, 6.00, 14.00, 133.33, '789000000055', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cerith Snail (Cerithium sp.)', 'cerith snail (cerithium sp.)', 'LIVING', 'INVERTEBRATE', NULL, 40, 4.00, 9.00, 125.00, '789000000056', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Pepino do Mar (Holothuria atra)', 'pepino do mar (holothuria atra)', 'LIVING', 'INVERTEBRATE', NULL, 8, 30.00, 65.00, 116.67, '789000000057', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Skunk Cleaner (Lysmata amboinensis)', 'camarão skunk cleaner (lysmata amboinensis)', 'LIVING', 'INVERTEBRATE', NULL, 14, 65.00, 125.00, 92.31, '789000000058', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Stenopus Bandado (Stenopus hispidus)', 'camarão stenopus bandado (stenopus hispidus)', 'LIVING', 'INVERTEBRATE', NULL, 12, 45.00, 90.00, 100.00, '789000000059', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Blood Fire Shrimp (Lysmata debelius)', 'camarão blood fire shrimp (lysmata debelius)', 'LIVING', 'INVERTEBRATE', NULL, 6, 120.00, 230.00, 91.67, '789000000060', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Sexy Shrimp (Thor amboinensis)', 'camarão sexy shrimp (thor amboinensis)', 'LIVING', 'INVERTEBRATE', NULL, 15, 28.00, 60.00, 114.29, '789000000061', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Estrela Vermelha Fromia (Fromia indica)', 'estrela vermelha fromia (fromia indica)', 'LIVING', 'INVERTEBRATE', NULL, 7, 60.00, 120.00, 100.00, '789000000062', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Estrela Linckia Azul (Linckia laevigata)', 'estrela linckia azul (linckia laevigata)', 'LIVING', 'INVERTEBRATE', NULL, 5, 85.00, 170.00, 100.00, '789000000063', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ouriço Tuxedo (Mespilia globulus)', 'ouriço tuxedo (mespilia globulus)', 'LIVING', 'INVERTEBRATE', NULL, 10, 42.00, 88.00, 109.52, '789000000064', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Coral Carpet Green (Briareum hamrum)', 'coral carpet green (briareum hamrum)', 'LIVING', 'CORAL', NULL, 15, 45.00, 95.00, 111.11, '789000000065', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Coral Carpet Brown (Clavularia sp.)', 'coral carpet brown (clavularia sp.)', 'LIVING', 'CORAL', NULL, 10, 35.00, 75.00, 114.29, '789000000066', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mushroom Rhodactis Superman (Rhodactis inchoata)', 'mushroom rhodactis superman (rhodactis inchoata)', 'LIVING', 'CORAL', NULL, 8, 75.00, 155.00, 106.67, '789000000067', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Organ Pipe Coral (Tubipora musica)', 'organ pipe coral (tubipora musica)', 'LIVING', 'CORAL', NULL, 6, 60.00, 125.00, 108.33, '789000000068', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Leather Umbrella (Sarcophyton sp.)', 'leather umbrella (sarcophyton sp.)', 'LIVING', 'CORAL', '035_leather_toadstool.webp', 7, 55.00, 115.00, 109.09, '789000000069', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Leather Devil Hand Green (Lobophytum sp.)', 'leather devil hand green (lobophytum sp.)', 'LIVING', 'CORAL', NULL, 6, 60.00, 125.00, 108.33, '789000000070', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Alga Atomic Broccoli (Hypnea pannosa)', 'alga atomic broccoli (hypnea pannosa)', 'LIVING', 'PLANT', NULL, 9, 40.00, 85.00, 112.50, '789000000071', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Plate Coral Green (Fungia sp.)', 'plate coral green (fungia sp.)', 'LIVING', 'CORAL', NULL, 4, 95.00, 195.00, 105.26, '789000000072', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Coral Acropora Green Slimer (Acropora yongei)', 'coral acropora green slimer (acropora yongei)', 'LIVING', 'CORAL', '068_acropora_bali_slimer_valida.png', 8, 80.00, 160.00, 100.00, '789000000073', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Coral Acropora Millepora Rosa (Acropora millepora)', 'coral acropora millepora rosa (acropora millepora)', 'LIVING', 'CORAL', NULL, 5, 95.00, 195.00, 105.26, '789000000074', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Coral Ricordea Florida Laranja (Ricordea florida)', 'coral ricordea florida laranja (ricordea florida)', 'LIVING', 'CORAL', '030_ricordea_florida_orange.jpg', 7, 70.00, 140.00, 100.00, '789000000075', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Duncan Coral (Duncanopsammia axifuga)', 'duncan coral (duncanopsammia axifuga)', 'LIVING', 'CORAL', NULL, 6, 85.00, 175.00, 105.88, '789000000076', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Blastomussa Wellsi Red (Blastomussa wellsi)', 'blastomussa wellsi red (blastomussa wellsi)', 'LIVING', 'CORAL', NULL, 4, 110.00, 220.00, 100.00, '789000000077', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Palhaço Black Ocellaris (Amphiprion ocellaris)', 'palhaço black ocellaris (amphiprion ocellaris)', 'LIVING', 'MARINE_FISH', '070_ocellaris_black_darwin.webp', 12, 65.00, 125.00, 92.31, '789000000078', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Palhaço Snowflake (Amphiprion ocellaris)', 'palhaço snowflake (amphiprion ocellaris)', 'LIVING', 'MARINE_FISH', NULL, 8, 85.00, 165.00, 94.12, '789000000079', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Palhaço Black Storm (Amphiprion ocellaris)', 'palhaço black storm (amphiprion ocellaris)', 'LIVING', 'MARINE_FISH', NULL, 4, 180.00, 350.00, 94.44, '789000000080', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Palhaço Orange Storm (Amphiprion ocellaris)', 'palhaço orange storm (amphiprion ocellaris)', 'LIVING', 'MARINE_FISH', NULL, 4, 220.00, 420.00, 90.91, '789000000081', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Palhaço Picasso (Amphiprion percula)', 'palhaço picasso (amphiprion percula)', 'LIVING', 'MARINE_FISH', NULL, 6, 110.00, 215.00, 95.45, '789000000082', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Palhaço Maroon Faixa Dourada (Premnas epigramma)', 'palhaço maroon faixa dourada (premnas epigramma)', 'LIVING', 'MARINE_FISH', NULL, 5, 70.00, 139.00, 98.57, '789000000083', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Purple Tang (Zebrasoma xanthurum)', 'purple tang (zebrasoma xanthurum)', 'LIVING', 'MARINE_FISH', '226_purple_tang_xanthurum.jpg', 3, 850.00, 1490.00, 75.29, '789000000084', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Powder Blue Tang (Acanthurus leucosternon)', 'powder blue tang (acanthurus leucosternon)', 'LIVING', 'MARINE_FISH', '079_powder_blue_naso_tang.webp', 4, 420.00, 780.00, 85.71, '789000000085', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Sailfin Tang (Zebrasoma veliferum)', 'sailfin tang (zebrasoma veliferum)', 'LIVING', 'MARINE_FISH', '078_sailfin_scopas_tang.webp', 5, 180.00, 340.00, 88.89, '789000000086', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mandarim Verde (Synchiropus splendidus)', 'mandarim verde (synchiropus splendidus)', 'LIVING', 'MARINE_FISH', NULL, 7, 85.00, 165.00, 94.12, '789000000087', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mandarim Vermelho (Synchiropus splendidus var. Red)', 'mandarim vermelho (synchiropus splendidus var. red)', 'LIVING', 'MARINE_FISH', NULL, 5, 110.00, 215.00, 95.45, '789000000088', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Trigger Picasso (Rhinecanthus aculeatus)', 'trigger picasso (rhinecanthus aculeatus)', 'LIVING', 'MARINE_FISH', NULL, 4, 95.00, 185.00, 94.74, '789000000089', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Blênio Macaco Nacional (Scartella cristata)', 'blênio macaco nacional (scartella cristata)', 'LIVING', 'MARINE_FISH', NULL, 10, 20.00, 45.00, 125.00, '789000000090', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Blênio Bicolor (Ecsenius bicolor)', 'blênio bicolor (ecsenius bicolor)', 'LIVING', 'MARINE_FISH', NULL, 8, 65.00, 125.00, 92.31, '789000000091', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Firefish Magnífico (Nemateleotris magnifica)', 'firefish magnífico (nemateleotris magnifica)', 'LIVING', 'MARINE_FISH', NULL, 10, 55.00, 105.00, 90.91, '789000000092', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Firefish Purple (Nemateleotris decora)', 'firefish purple (nemateleotris decora)', 'LIVING', 'MARINE_FISH', NULL, 6, 90.00, 175.00, 94.44, '789000000093', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Foxface Amarelo (Siganus vulpinus)', 'foxface amarelo (siganus vulpinus)', 'LIVING', 'MARINE_FISH', NULL, 5, 140.00, 265.00, 89.29, '789000000094', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cardinal Banggai (Pterapogon kauderni)', 'cardinal banggai (pterapogon kauderni)', 'LIVING', 'MARINE_FISH', NULL, 12, 45.00, 89.00, 97.78, '789000000095', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Green Chromis (Chromis viridis)', 'green chromis (chromis viridis)', 'LIVING', 'MARINE_FISH', NULL, 25, 18.00, 38.00, 111.11, '789000000096', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Goby Yellow Watchman (Cryptocentrus cinctus)', 'goby yellow watchman (cryptocentrus cinctus)', 'LIVING', 'MARINE_FISH', '085_gobies_blennies_watchman.webp', 8, 60.00, 120.00, 100.00, '789000000097', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Bandeira Comum Listrado (Pterophyllum scalare)', 'acará bandeira comum listrado (pterophyllum scalare)', 'LIVING', 'FRESHWATER_FISH', NULL, 20, 10.00, 25.00, 150.00, '789000000098', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tetra Mato Grosso (Hyphessobrycon eques)', 'tetra mato grosso (hyphessobrycon eques)', 'LIVING', 'FRESHWATER_FISH', '116_tetra_mato_grosso.webp', 40, 3.50, 8.50, 142.86, '789000000099', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Corydora Panda (Corydoras panda)', 'corydora panda (corydoras panda)', 'LIVING', 'FRESHWATER_FISH', NULL, 18, 14.00, 30.00, 114.29, '789000000100', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Fantasma Nacional (Palaemonetes argentinus)', 'camarão fantasma nacional (palaemonetes argentinus)', 'LIVING', 'INVERTEBRATE', NULL, 50, 2.00, 6.00, 200.00, '789000000101', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Amano (Caridina multidentata)', 'camarão amano (caridina multidentata)', 'LIVING', 'INVERTEBRATE', NULL, 30, 10.00, 22.00, 120.00, '789000000102', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anubia Lanceolata (Anubias lanceolata)', 'anubia lanceolata (anubias lanceolata)', 'LIVING', 'PLANT', NULL, 15, 18.00, 38.00, 111.11, '789000000103', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Musgo de Java (Taxiphyllum barbieri)', 'musgo de java (taxiphyllum barbieri)', 'LIVING', 'PLANT', '325_musgo_de_java_christmas_flame_marimo.jpg', 25, 12.00, 26.00, 116.67, '789000000104', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Rotala Rotundifolia Verde (Rotala rotundifolia)', 'rotala rotundifolia verde (rotala rotundifolia)', 'LIVING', 'PLANT', NULL, 30, 8.00, 18.00, 125.00, '789000000105', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Sunny Day (Zoanthus sp.)', 'zoanthus sunny day (zoanthus sp.)', 'LIVING', 'CORAL', '001_zoanthus_sunny_day.jpg', 12, 35.00, 75.00, 114.29, '78900000001', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Eagle Eye (Zoanthus sp.)', 'zoanthus eagle eye (zoanthus sp.)', 'LIVING', 'CORAL', '004_zoanthus_eagle_eye.jpg', 12, 35.00, 75.00, 114.29, '78900000002', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Radioactive Green (Zoanthus sp.)', 'zoanthus radioactive green (zoanthus sp.)', 'LIVING', 'CORAL', '005_zoanthus_radioactive_green.jpg', 12, 35.00, 75.00, 114.29, '78900000003', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Bam Bam (Zoanthus sp.)', 'zoanthus bam bam (zoanthus sp.)', 'LIVING', 'CORAL', '006_zoanthus_bam_bam.jpg', 12, 35.00, 75.00, 114.29, '78900000004', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus LA Lakers (Zoanthus sp.)', 'zoanthus la lakers (zoanthus sp.)', 'LIVING', 'CORAL', '008_zoanthus_la_lakers.jpg', 12, 35.00, 75.00, 114.29, '78900000005', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Red Hornet (Zoanthus sp.)', 'zoanthus red hornet (zoanthus sp.)', 'LIVING', 'CORAL', '011_zoanthus_red_hornet.webp', 12, 35.00, 75.00, 114.29, '78900000006', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Purple Hornet (Zoanthus sp.)', 'zoanthus purple hornet (zoanthus sp.)', 'LIVING', 'CORAL', '012_zoanthus_purple_hornet.webp', 12, 35.00, 75.00, 114.29, '78900000007', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Armor of God (Zoanthus sp.)', 'zoanthus armor of god (zoanthus sp.)', 'LIVING', 'CORAL', '013_zoanthus_armor_of_god.webp', 12, 35.00, 75.00, 114.29, '78900000008', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Palythoa Utter Chaos (Palythoa sp.)', 'palythoa utter chaos (palythoa sp.)', 'LIVING', 'CORAL', '015_palythoa_utter_chaos.webp', 12, 35.00, 75.00, 114.29, '78900000009', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Palythoa Nuclear Green (Palythoa sp.)', 'palythoa nuclear green (palythoa sp.)', 'LIVING', 'CORAL', '016_palythoa_nuclear_green.jpg', 12, 35.00, 75.00, 114.29, '78900000010', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Palythoa Purple Death (Palythoa sp.)', 'palythoa purple death (palythoa sp.)', 'LIVING', 'CORAL', '017_palythoa_purple_death.webp', 12, 35.00, 75.00, 114.29, '78900000011', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Palythoa Grandis (Palythoa grandis)', 'palythoa grandis (palythoa grandis)', 'LIVING', 'CORAL', '019_palythoa_grandis.jpg', 12, 35.00, 75.00, 114.29, '78900000012', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Palythoa Cinnamon (Palythoa sp.)', 'palythoa cinnamon (palythoa sp.)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000013', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Palythoa Nirvana (Palythoa sp.)', 'palythoa nirvana (palythoa sp.)', 'LIVING', 'CORAL', '020_palythoa_nirvana.jpg', 12, 35.00, 75.00, 114.29, '78900000014', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Palythoa Pandora (Palythoa sp.)', 'palythoa pandora (palythoa sp.)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000015', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mushroom Discosoma Super Red (Discosoma sp.)', 'mushroom discosoma super red (discosoma sp.)', 'LIVING', 'CORAL', '021_mushroom_discosoma_red.jpg', 12, 35.00, 75.00, 114.29, '78900000016', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mushroom Discosoma Deadpool (Discosoma sp.)', 'mushroom discosoma deadpool (discosoma sp.)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000017', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mushroom Discosoma Superman (Discosoma sp.)', 'mushroom discosoma superman (discosoma sp.)', 'LIVING', 'CORAL', '022_mushroom_discosoma_superman.webp', 12, 35.00, 75.00, 114.29, '78900000018', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mushroom Discosoma Blue (Discosoma sp.)', 'mushroom discosoma blue (discosoma sp.)', 'LIVING', 'CORAL', '023_mushroom_discosoma_blue_purple.jpg', 12, 35.00, 75.00, 114.29, '78900000019', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mushroom Discosoma Purple Spotted (Discosoma sp.)', 'mushroom discosoma purple spotted (discosoma sp.)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000020', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mushroom Discosoma Watermelon (Discosoma sp.)', 'mushroom discosoma watermelon (discosoma sp.)', 'LIVING', 'CORAL', '024_mushroom_discosoma_watermelon.webp', 12, 35.00, 75.00, 114.29, '78900000021', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mushroom Discosoma Metallic Green (Discosoma sp.)', 'mushroom discosoma metallic green (discosoma sp.)', 'LIVING', 'CORAL', '025_mushroom_discosoma_green.jpg', 12, 35.00, 75.00, 114.29, '78900000022', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mushroom Rhodactis Green Hairy (Rhodactis sp.)', 'mushroom rhodactis green hairy (rhodactis sp.)', 'LIVING', 'CORAL', '026_rhodactis_green_hairy.jpg', 12, 35.00, 75.00, 114.29, '78900000023', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mushroom Rhodactis Indonésia (Rhodactis sp.)', 'mushroom rhodactis indonésia (rhodactis sp.)', 'LIVING', 'CORAL', '027_rhodactis_indonesia_superman.jpg', 12, 35.00, 75.00, 114.29, '78900000024', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mushroom Rhodactis Superman (Rhodactis sp.)', 'mushroom rhodactis superman (rhodactis sp.)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000025', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mushroom Rhodactis Bullseye (Rhodactis sp.)', 'mushroom rhodactis bullseye (rhodactis sp.)', 'LIVING', 'CORAL', '028_rhodactis_bullseye.jpg', 12, 35.00, 75.00, 114.29, '78900000026', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mushroom Rhodactis Tonga (Rhodactis sp.)', 'mushroom rhodactis tonga (rhodactis sp.)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000027', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mushroom Rhodactis Bounce OG (Rhodactis sp.)', 'mushroom rhodactis bounce og (rhodactis sp.)', 'LIVING', 'CORAL', '029_rhodactis_bounce.jpg', 12, 35.00, 75.00, 114.29, '78900000028', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mushroom Rhodactis Bounce Sunkist (Rhodactis sp.)', 'mushroom rhodactis bounce sunkist (rhodactis sp.)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000029', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ricordea Florida Laranja (Ricordea florida)', 'ricordea florida laranja (ricordea florida)', 'LIVING', 'CORAL', '030_ricordea_florida_orange.jpg', 12, 35.00, 75.00, 114.29, '78900000030', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ricordea Florida Rainbow (Ricordea florida)', 'ricordea florida rainbow (ricordea florida)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000031', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ricordea Florida Verde (Ricordea florida)', 'ricordea florida verde (ricordea florida)', 'LIVING', 'CORAL', '031_ricordea_florida_green.jpg', 12, 35.00, 75.00, 114.29, '78900000032', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ricordea Yuma Verde (Ricordea yuma)', 'ricordea yuma verde (ricordea yuma)', 'LIVING', 'CORAL', '032_ricordea_yuma_green.jpg', 12, 35.00, 75.00, 114.29, '78900000033', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ricordea Yuma Neon (Ricordea yuma)', 'ricordea yuma neon (ricordea yuma)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000034', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ricordea Yuma Laranja (Ricordea yuma)', 'ricordea yuma laranja (ricordea yuma)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000035', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ricordea Yuma Pink Rainbow (Ricordea yuma)', 'ricordea yuma pink rainbow (ricordea yuma)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000036', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Green Star Polyps Metallic (Pachyclavularia violacea)', 'green star polyps metallic (pachyclavularia violacea)', 'LIVING', 'CORAL', '034_green_star_polyps_gsp.jpg', 12, 35.00, 75.00, 114.29, '78900000037', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Leather Spaghetti (Sinularia flexibilis)', 'leather spaghetti (sinularia flexibilis)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000038', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Leather Finger Verde (Sinularia sp.)', 'leather finger verde (sinularia sp.)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000039', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Leather ORA Green (Sarcophyton sp.)', 'leather ora green (sarcophyton sp.)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000040', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Leather Devil''s Hand (Lobophytum sp.)', 'leather devil''s hand (lobophytum sp.)', 'LIVING', 'CORAL', '036_leather_devils_hand.webp', 12, 35.00, 75.00, 114.29, '78900000041', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Sinularia Verde Neon (Sinularia sp.)', 'sinularia verde neon (sinularia sp.)', 'LIVING', 'CORAL', '037_sinularia_green_neon.jpg', 12, 35.00, 75.00, 114.29, '78900000042', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Sinularia Dura (Sinularia brassica)', 'sinularia dura (sinularia brassica)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000043', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Kenya Tree (Capnella imbricata)', 'kenya tree (capnella imbricata)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000044', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Xênia Pulsante Pom Pom (Xenia umbellata)', 'xênia pulsante pom pom (xenia umbellata)', 'LIVING', 'CORAL', '039_xenia_pulsante.webp', 12, 35.00, 75.00, 114.29, '78900000045', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Xênia Pulsante Giant (Xenia elongata)', 'xênia pulsante giant (xenia elongata)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000046', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cloves Papaya (Clavularia sp.)', 'cloves papaya (clavularia sp.)', 'LIVING', 'CORAL', '040_cloves_papaya_fireworks.webp', 12, 35.00, 75.00, 114.29, '78900000047', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cloves Tricolor (Clavularia sp.)', 'cloves tricolor (clavularia sp.)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000048', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anêmona Bubble Tip Verde (Entacmaea quadricolor)', 'anêmona bubble tip verde (entacmaea quadricolor)', 'LIVING', 'CORAL', '042_anemona_bta_green.webp', 12, 35.00, 75.00, 114.29, '78900000049', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Hammer Bicolor (Fimbriaphyllia ancora)', 'hammer bicolor (fimbriaphyllia ancora)', 'LIVING', 'CORAL', '043_hammer_bicolor.webp', 12, 35.00, 75.00, 114.29, '78900000050', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Hammer Full Green (Fimbriaphyllia ancora)', 'hammer full green (fimbriaphyllia ancora)', 'LIVING', 'CORAL', '044_hammer_full_green.jpg', 12, 35.00, 75.00, 114.29, '78900000051', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Hammer Toxic Splatter (Fimbriaphyllia ancora)', 'hammer toxic splatter (fimbriaphyllia ancora)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000052', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Hammer Verde Ponta Roxa (Fimbriaphyllia ancora)', 'hammer verde ponta roxa (fimbriaphyllia ancora)', 'LIVING', 'CORAL', '045_hammer_purple_tip.jpg', 12, 35.00, 75.00, 114.29, '78900000053', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Hammer Gold (Fimbriaphyllia ancora)', 'hammer gold (fimbriaphyllia ancora)', 'LIVING', 'CORAL', '046_hammer_gold_yellow.jpg', 12, 35.00, 75.00, 114.29, '78900000054', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Hammer Yellow (Fimbriaphyllia ancora)', 'hammer yellow (fimbriaphyllia ancora)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000055', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Frogspawn Verde Ponta Roxa (Fimbriaphyllia divisa)', 'frogspawn verde ponta roxa (fimbriaphyllia divisa)', 'LIVING', 'CORAL', '047_frogspawn_bicolor.jpg', 12, 35.00, 75.00, 114.29, '78900000056', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Frogspawn Full Green (Fimbriaphyllia divisa)', 'frogspawn full green (fimbriaphyllia divisa)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000057', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Octospawn Verde (Fimbriaphyllia paradivisa)', 'octospawn verde (fimbriaphyllia paradivisa)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000058', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Torch Green Tip (Euphyllia glabrescens)', 'torch green tip (euphyllia glabrescens)', 'LIVING', 'CORAL', '049_torch_green_tip.webp', 12, 35.00, 75.00, 114.29, '78900000059', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Torch Metallic Green (Euphyllia glabrescens)', 'torch metallic green (euphyllia glabrescens)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000060', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Torch Black Ponta Verde (Euphyllia glabrescens)', 'torch black ponta verde (euphyllia glabrescens)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000061', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Torch Black Ponta Branca (Euphyllia glabrescens)', 'torch black ponta branca (euphyllia glabrescens)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000062', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Torch Dragon Soul (Euphyllia glabrescens)', 'torch dragon soul (euphyllia glabrescens)', 'LIVING', 'CORAL', '051_torch_dragon_soul_gold.jpg', 12, 35.00, 75.00, 114.29, '78900000063', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Torch Indo Gold (Euphyllia glabrescens)', 'torch indo gold (euphyllia glabrescens)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000064', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Frammer Híbrido (Euphyllia sp.)', 'frammer híbrido (euphyllia sp.)', 'LIVING', 'CORAL', '052_frammer_euphyllia.webp', 12, 35.00, 75.00, 114.29, '78900000065', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Trumpet Kryptonita (Caulastrea sp.)', 'trumpet kryptonita (caulastrea sp.)', 'LIVING', 'CORAL', '053_trumpet_kryptonita.webp', 12, 35.00, 75.00, 114.29, '78900000066', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Trumpet Bicolor (Caulastrea curvata)', 'trumpet bicolor (caulastrea curvata)', 'LIVING', 'CORAL', '054_trumpet_bicolor.jpg', 12, 35.00, 75.00, 114.29, '78900000067', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Trumpet Azul (Caulastrea furcata)', 'trumpet azul (caulastrea furcata)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000068', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Duncan Clássico (Duncanopsammia axifuga)', 'duncan clássico (duncanopsammia axifuga)', 'LIVING', 'CORAL', '055_coral_duncan.webp', 12, 35.00, 75.00, 114.29, '78900000069', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acanthastrea Red (Micromussa lordhowensis)', 'acanthastrea red (micromussa lordhowensis)', 'LIVING', 'CORAL', '056_acanthastrea_red_green.jpg', 12, 35.00, 75.00, 114.29, '78900000070', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acanthastrea Green (Micromussa lordhowensis)', 'acanthastrea green (micromussa lordhowensis)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000071', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acanthastrea Rainbow (Micromussa lordhowensis)', 'acanthastrea rainbow (micromussa lordhowensis)', 'LIVING', 'CORAL', '057_acanthastrea_rainbow.jpg', 12, 35.00, 75.00, 114.29, '78900000072', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acanthastrea Orange Crush (Micromussa lordhowensis)', 'acanthastrea orange crush (micromussa lordhowensis)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000073', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Goniopora Red (Goniopora stokesi)', 'goniopora red (goniopora stokesi)', 'LIVING', 'CORAL', '058_goniopora_red_pink.webp', 12, 35.00, 75.00, 114.29, '78900000074', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Goniopora Pink (Goniopora stokesi)', 'goniopora pink (goniopora stokesi)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000075', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Goniopora Green Neon (Goniopora sp.)', 'goniopora green neon (goniopora sp.)', 'LIVING', 'CORAL', '059_goniopora_green_neon.jpg', 12, 35.00, 75.00, 114.29, '78900000076', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Alveopora Verde (Alveopora tizardi)', 'alveopora verde (alveopora tizardi)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000077', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Blastomussa Wellsi (Blastomussa wellsi)', 'blastomussa wellsi (blastomussa wellsi)', 'LIVING', 'CORAL', '060_blastomussa_favia_chalice.webp', 12, 35.00, 75.00, 114.29, '78900000078', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Favia Dragon Soul (Favia favus)', 'favia dragon soul (favia favus)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000079', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Chalice Hollywood Stunner (Echinopora lamellosa)', 'chalice hollywood stunner (echinopora lamellosa)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000080', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Montipora Capricornis Vermelha (Montipora capricornis)', 'montipora capricornis vermelha (montipora capricornis)', 'LIVING', 'CORAL', '061_montipora_capricornis_red.webp', 12, 35.00, 75.00, 114.29, '78900000081', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Montipora Capricornis Verde (Montipora capricornis)', 'montipora capricornis verde (montipora capricornis)', 'LIVING', 'CORAL', '062_montipora_capricornis_grafted.jpg', 12, 35.00, 75.00, 114.29, '78900000082', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Montipora Capricornis Grafted (Montipora capricornis)', 'montipora capricornis grafted (montipora capricornis)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000083', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Montipora Digitata Forest Fire (Montipora digitata)', 'montipora digitata forest fire (montipora digitata)', 'LIVING', 'CORAL', '063_montipora_digitata_forest_fire.webp', 12, 35.00, 75.00, 114.29, '78900000084', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Montipora Digitata Red (Montipora digitata)', 'montipora digitata red (montipora digitata)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000085', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Montipora Incrustante Superman (Montipora tuberculosa)', 'montipora incrustante superman (montipora tuberculosa)', 'LIVING', 'CORAL', '064_montipora_superman_incrustante.webp', 12, 35.00, 75.00, 114.29, '78900000086', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Montipora Incrustante Sunset (Montipora danae)', 'montipora incrustante sunset (montipora danae)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000087', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Stylophora Milka (Stylophora pistillata)', 'stylophora milka (stylophora pistillata)', 'LIVING', 'CORAL', '065_stylophora_milka.jpg', 12, 35.00, 75.00, 114.29, '78900000088', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Seriatopora Hystrix (Seriatopora hystrix)', 'seriatopora hystrix (seriatopora hystrix)', 'LIVING', 'CORAL', '066_seriatopora_hystrix_pink.jpg', 12, 35.00, 75.00, 114.29, '78900000089', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Seriatopora Caliendrum Verde (Seriatopora caliendrum)', 'seriatopora caliendrum verde (seriatopora caliendrum)', 'LIVING', 'CORAL', '067_seriatopora_caliendrum_green.webp', 12, 35.00, 75.00, 114.29, '78900000090', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Seriatopora Caliendrum Bicolor (Seriatopora caliendrum)', 'seriatopora caliendrum bicolor (seriatopora caliendrum)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000091', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acropora Green Slimer (Acropora yongei)', 'acropora green slimer (acropora yongei)', 'LIVING', 'CORAL', '068_acropora_bali_slimer_valida.png', 12, 35.00, 75.00, 114.29, '78900000092', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acropora Valida Tricolor (Acropora valida)', 'acropora valida tricolor (acropora valida)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000093', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acropora Millepora Azul (Acropora millepora)', 'acropora millepora azul (acropora millepora)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000094', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe-palhaço Darwin Black (Amphiprion ocellaris)', 'peixe-palhaço darwin black (amphiprion ocellaris)', 'LIVING', 'MARINE_FISH', '070_ocellaris_black_darwin.webp', 12, 35.00, 75.00, 114.29, '78900000095', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe-palhaço Snowflake (Amphiprion ocellaris)', 'peixe-palhaço snowflake (amphiprion ocellaris)', 'LIVING', 'MARINE_FISH', '071_ocellaris_snowflake.jpg', 12, 35.00, 75.00, 114.29, '78900000096', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe-palhaço Black Snowflake (Amphiprion ocellaris)', 'peixe-palhaço black snowflake (amphiprion ocellaris)', 'LIVING', 'MARINE_FISH', '072_ocellaris_black_snowflake.png', 12, 35.00, 75.00, 114.29, '78900000097', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe-palhaço Black Ice (Amphiprion ocellaris)', 'peixe-palhaço black ice (amphiprion ocellaris)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000098', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe-palhaço Picasso (Amphiprion percula)', 'peixe-palhaço picasso (amphiprion percula)', 'LIVING', 'MARINE_FISH', '073_ocellaris_picasso_davinci.jpg', 12, 35.00, 75.00, 114.29, '78900000099', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe-palhaço DaVinci (Amphiprion ocellaris)', 'peixe-palhaço davinci (amphiprion ocellaris)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000100', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe-palhaço Gladiator (Amphiprion ocellaris)', 'peixe-palhaço gladiator (amphiprion ocellaris)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000101', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe-palhaço Frostbite (Amphiprion ocellaris)', 'peixe-palhaço frostbite (amphiprion ocellaris)', 'LIVING', 'MARINE_FISH', '074_ocellaris_frostbite_flurry.jpg', 12, 35.00, 75.00, 114.29, '78900000102', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe-palhaço Flurry (Amphiprion ocellaris)', 'peixe-palhaço flurry (amphiprion ocellaris)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000103', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe-palhaço Orange Storm (Amphiprion ocellaris)', 'peixe-palhaço orange storm (amphiprion ocellaris)', 'LIVING', 'MARINE_FISH', '075_ocellaris_storm.webp', 12, 35.00, 75.00, 114.29, '78900000104', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe-palhaço Black Storm (Amphiprion ocellaris)', 'peixe-palhaço black storm (amphiprion ocellaris)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000105', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Scopas Tang (Zebrasoma scopas)', 'scopas tang (zebrasoma scopas)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000106', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Naso Tang (Naso lituratus)', 'naso tang (naso lituratus)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000107', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Royal Gramma (Gramma loreto)', 'royal gramma (gramma loreto)', 'LIVING', 'MARINE_FISH', '080_royal_gramma.webp', 12, 35.00, 75.00, 114.29, '78900000108', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Gramma Brasileiro (Gramma brasiliensis)', 'gramma brasileiro (gramma brasiliensis)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000109', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Firefish Comum (Nemateleotris magnifica)', 'firefish comum (nemateleotris magnifica)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000110', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Six Line Wrasse (Pseudocheilinus hexataenia)', 'six line wrasse (pseudocheilinus hexataenia)', 'LIVING', 'MARINE_FISH', '083_six_line_wrasse.webp', 12, 35.00, 75.00, 114.29, '78900000111', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Yellow Coris Wrasse (Halichoeres chrysus)', 'yellow coris wrasse (halichoeres chrysus)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000112', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Donzela Kupang (Chrysiptera hemicyanea)', 'donzela kupang (chrysiptera hemicyanea)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000113', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Donzela Yellow Tail (Chrysiptera parasema)', 'donzela yellow tail (chrysiptera parasema)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000114', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Blênio Midas (Ecsenius midas)', 'blênio midas (ecsenius midas)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000115', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe Mandarim (Synchiropus splendidus)', 'peixe mandarim (synchiropus splendidus)', 'LIVING', 'MARINE_FISH', '086_peixe_mandarim.webp', 12, 35.00, 75.00, 114.29, '78900000116', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cardinal Pijama (Sphaeramia nematoptera)', 'cardinal pijama (sphaeramia nematoptera)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000117', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Flame Angel (Centropyge loricula)', 'flame angel (centropyge loricula)', 'LIVING', 'MARINE_FISH', '088_anjos_anoes_flame_coral_beauty.webp', 12, 35.00, 75.00, 114.29, '78900000118', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anjo Coral Beauty (Centropyge bispinosa)', 'anjo coral beauty (centropyge bispinosa)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000119', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Limpador Cleaner (Lysmata amboinensis)', 'camarão limpador cleaner (lysmata amboinensis)', 'LIVING', 'MARINE_INVERTEBRATE', '089_camaroes_cleaner_bailarino.webp', 12, 35.00, 75.00, 114.29, '78900000120', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Bailarino (Lysmata boggessi)', 'camarão bailarino (lysmata boggessi)', 'LIVING', 'MARINE_INVERTEBRATE', NULL, 12, 35.00, 75.00, 114.29, '78900000121', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Blood Fire (Lysmata debelius)', 'camarão blood fire (lysmata debelius)', 'LIVING', 'MARINE_INVERTEBRATE', NULL, 12, 35.00, 75.00, 114.29, '78900000122', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mini Paguro Patas Amarelas (Clibanarius tricolor)', 'mini paguro patas amarelas (clibanarius tricolor)', 'LIVING', 'MARINE_INVERTEBRATE', '090_equipe_limpeza_paguro_snail.jpg', 12, 35.00, 75.00, 114.29, '78900000123', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Caracol Turbo Snail (Turbo fluctuosus)', 'caracol turbo snail (turbo fluctuosus)', 'LIVING', 'MARINE_INVERTEBRATE', NULL, 12, 35.00, 75.00, 114.29, '78900000124', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Caracol Nassarius (Nassarius vibex)', 'caracol nassarius (nassarius vibex)', 'LIVING', 'MARINE_INVERTEBRATE', NULL, 12, 35.00, 75.00, 114.29, '78900000125', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Guppy Moscou Full Black (Poecilia reticulata)', 'guppy moscou full black (poecilia reticulata)', 'LIVING', 'FRESHWATER_FISH', '091_guppy_moscou_full_black.webp', 12, 35.00, 75.00, 114.29, '78900000126', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Guppy Moscou Blue (Poecilia reticulata)', 'guppy moscou blue (poecilia reticulata)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000127', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Guppy Tuxedo Half Black Red (Poecilia reticulata)', 'guppy tuxedo half black red (poecilia reticulata)', 'LIVING', 'FRESHWATER_FISH', '092_guppy_tuxedo_half_black.jpg', 12, 35.00, 75.00, 114.29, '78900000128', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Guppy Tuxedo Yellow (Poecilia reticulata)', 'guppy tuxedo yellow (poecilia reticulata)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000129', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Guppy King Cobra (Poecilia reticulata)', 'guppy king cobra (poecilia reticulata)', 'LIVING', 'FRESHWATER_FISH', '093_guppy_cobra_snakeskin.jpg', 12, 35.00, 75.00, 114.29, '78900000130', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Guppy Snakeskin Verde (Poecilia reticulata)', 'guppy snakeskin verde (poecilia reticulata)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000131', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Guppy Dumbo Big Ear (Poecilia reticulata)', 'guppy dumbo big ear (poecilia reticulata)', 'LIVING', 'FRESHWATER_FISH', '094_guppy_dumbo_mosaico.webp', 12, 35.00, 75.00, 114.29, '78900000132', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Guppy Mosaico Red (Poecilia reticulata)', 'guppy mosaico red (poecilia reticulata)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000133', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Guppy Albino Full Red (Poecilia reticulata)', 'guppy albino full red (poecilia reticulata)', 'LIVING', 'FRESHWATER_FISH', '095_guppy_full_red_albino.webp', 12, 35.00, 75.00, 114.29, '78900000134', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Guppy Endler Black Bar (Poecilia wingei)', 'guppy endler black bar (poecilia wingei)', 'LIVING', 'FRESHWATER_FISH', '096_guppy_endler_black_bar.webp', 12, 35.00, 75.00, 114.29, '78900000135', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Guppy Endler Tiger (Poecilia wingei)', 'guppy endler tiger (poecilia wingei)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000136', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Guppy Endler Red Scarlet (Poecilia wingei)', 'guppy endler red scarlet (poecilia wingei)', 'LIVING', 'FRESHWATER_FISH', '097_guppy_endler_red.webp', 12, 35.00, 75.00, 114.29, '78900000137', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Betta Veiltail (Betta splendens)', 'betta veiltail (betta splendens)', 'LIVING', 'FRESHWATER_FISH', '098_betta_veiltail.webp', 12, 35.00, 75.00, 114.29, '78900000138', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Betta Halfmoon (Betta splendens)', 'betta halfmoon (betta splendens)', 'LIVING', 'FRESHWATER_FISH', '099_betta_halfmoon.webp', 12, 35.00, 75.00, 114.29, '78900000139', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Betta Plakat Koi Galaxy (Betta splendens)', 'betta plakat koi galaxy (betta splendens)', 'LIVING', 'FRESHWATER_FISH', '100_betta_plakat_koi_nemo.webp', 12, 35.00, 75.00, 114.29, '78900000140', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Betta Plakat Candy Nemo (Betta splendens)', 'betta plakat candy nemo (betta splendens)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000141', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Betta Dumbo Big Ear (Betta splendens)', 'betta dumbo big ear (betta splendens)', 'LIVING', 'FRESHWATER_FISH', '101_betta_dumbo.webp', 12, 35.00, 75.00, 114.29, '78900000142', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Betta Crowntail (Betta splendens)', 'betta crowntail (betta splendens)', 'LIVING', 'FRESHWATER_FISH', '102_betta_crowntail.webp', 12, 35.00, 75.00, 114.29, '78900000143', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Betta Fêmea Comum (Betta splendens)', 'betta fêmea comum (betta splendens)', 'LIVING', 'FRESHWATER_FISH', '103_betta_femea.webp', 12, 35.00, 75.00, 114.29, '78900000144', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Plati Mickey Mouse (Xiphophorus maculatus)', 'plati mickey mouse (xiphophorus maculatus)', 'LIVING', 'FRESHWATER_FISH', '104_plati_mickey.webp', 12, 35.00, 75.00, 114.29, '78900000145', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Plati Aurora (Xiphophorus maculatus)', 'plati aurora (xiphophorus maculatus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000146', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Plati Wagtail Red (Xiphophorus maculatus)', 'plati wagtail red (xiphophorus maculatus)', 'LIVING', 'FRESHWATER_FISH', '105_plati_wagtail_sangue.webp', 12, 35.00, 75.00, 114.29, '78900000147', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Plati Sangue Coral (Xiphophorus maculatus)', 'plati sangue coral (xiphophorus maculatus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000148', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Plati Balão Red (Xiphophorus maculatus)', 'plati balão red (xiphophorus maculatus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000149', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Espada Sangue Vermelho (Xiphophorus hellerii)', 'espada sangue vermelho (xiphophorus hellerii)', 'LIVING', 'FRESHWATER_FISH', '106_espada_sangue.webp', 12, 35.00, 75.00, 114.29, '78900000150', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Espada Lira Vermelho (Xiphophorus hellerii var. Lyretail)', 'espada lira vermelho (xiphophorus hellerii var. lyretail)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000151', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Espada Kohaku Koi (Xiphophorus hellerii)', 'espada kohaku koi (xiphophorus hellerii)', 'LIVING', 'FRESHWATER_FISH', '107_espada_kohaku_koi.webp', 12, 35.00, 75.00, 114.29, '78900000152', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Espada Verde Selvagem (Xiphophorus hellerii)', 'espada verde selvagem (xiphophorus hellerii)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000153', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Espada Preto Tuxedo (Xiphophorus hellerii)', 'espada preto tuxedo (xiphophorus hellerii)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000154', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Molinésia Negra (Poecilia sphenops)', 'molinésia negra (poecilia sphenops)', 'LIVING', 'FRESHWATER_FISH', '108_molinesia_negra_lira.webp', 12, 35.00, 75.00, 114.29, '78900000155', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Molinésia Negra Lira (Poecilia sphenops var. Lyretail)', 'molinésia negra lira (poecilia sphenops var. lyretail)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000156', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Molinésia Dálmata (Poecilia sphenops)', 'molinésia dálmata (poecilia sphenops)', 'LIVING', 'FRESHWATER_FISH', '109_molinesia_dalmata.jpg', 12, 35.00, 75.00, 114.29, '78900000157', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Molinésia Ouro (Poecilia sphenops)', 'molinésia ouro (poecilia sphenops)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000158', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Molinésia Balão (Poecilia sphenops)', 'molinésia balão (poecilia sphenops)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000159', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Colisa Lália Clássica (Trichogaster lalius)', 'colisa lália clássica (trichogaster lalius)', 'LIVING', 'FRESHWATER_FISH', '110_colisa_lalia_sangue_azul.webp', 12, 35.00, 75.00, 114.29, '78900000160', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Colisa Sangue Red (Trichogaster lalius var. Red)', 'colisa sangue red (trichogaster lalius var. red)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000161', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Colisa Azul Cobalto (Trichogaster lalius var. Cobalt)', 'colisa azul cobalto (trichogaster lalius var. cobalt)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000162', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Colisa Mel (Trichogaster chuna)', 'colisa mel (trichogaster chuna)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000163', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tricogaster Pérola Leeri (Trichopodus leerii)', 'tricogaster pérola leeri (trichopodus leerii)', 'LIVING', 'FRESHWATER_FISH', '111_tricogaster_perola_azul_ouro.jpg', 12, 35.00, 75.00, 114.29, '78900000164', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tricogaster Azul (Trichopodus trichopterus)', 'tricogaster azul (trichopodus trichopterus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000165', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tricogaster Ouro (Trichopodus trichopterus var. Gold)', 'tricogaster ouro (trichopodus trichopterus var. gold)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000166', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Neon Cardinal (Paracheirodon axelrodi)', 'neon cardinal (paracheirodon axelrodi)', 'LIVING', 'FRESHWATER_FISH', '112_neon_cardinal.webp', 12, 35.00, 75.00, 114.29, '78900000167', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Neon Innesi (Paracheirodon innesi)', 'neon innesi (paracheirodon innesi)', 'LIVING', 'FRESHWATER_FISH', '113_neon_innesi_verde_negro.webp', 12, 35.00, 75.00, 114.29, '78900000168', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Neon Verde (Paracheirodon simulans)', 'neon verde (paracheirodon simulans)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000169', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Neon Negro (Hyphessobrycon herbertaxelrodi)', 'neon negro (hyphessobrycon herbertaxelrodi)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000170', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tetra Negro Comum (Gymnocorymbus ternetzi)', 'tetra negro comum (gymnocorymbus ternetzi)', 'LIVING', 'FRESHWATER_FISH', '114_tetra_negro.webp', 12, 35.00, 75.00, 114.29, '78900000171', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tetra Negro Véu (Gymnocorymbus ternetzi var. Longfin)', 'tetra negro véu (gymnocorymbus ternetzi var. longfin)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000172', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tetra White Skirt (Gymnocorymbus ternetzi var. White)', 'tetra white skirt (gymnocorymbus ternetzi var. white)', 'LIVING', 'FRESHWATER_FISH', '115_tetra_white_skirt_color.webp', 12, 35.00, 75.00, 114.29, '78900000173', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tetra Glow Color (Gymnocorymbus ternetzi var. Glow)', 'tetra glow color (gymnocorymbus ternetzi var. glow)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000174', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Rodóstomus Nariz-de-Bêbado (Hemigrammus bleheri)', 'rodóstomus nariz-de-bêbado (hemigrammus bleheri)', 'LIVING', 'FRESHWATER_FISH', '117_rodostomus_nariz_de_bebado.webp', 12, 35.00, 75.00, 114.29, '78900000175', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tetra Foguinho (Hyphessobrycon amandae)', 'tetra foguinho (hyphessobrycon amandae)', 'LIVING', 'FRESHWATER_FISH', '118_tetra_foguinho.jpg', 12, 35.00, 75.00, 114.29, '78900000176', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Paulistinha Comum (Danio rerio)', 'paulistinha comum (danio rerio)', 'LIVING', 'FRESHWATER_FISH', '119_paulistinha_danio.webp', 12, 35.00, 75.00, 114.29, '78900000177', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Paulistinha Véu (Danio rerio var. Longfin)', 'paulistinha véu (danio rerio var. longfin)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000178', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Paulistinha Rosa (Danio rerio var. Rose)', 'paulistinha rosa (danio rerio var. rose)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000179', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Rásbora Arlequim (Trigonostigma heteromorpha)', 'rásbora arlequim (trigonostigma heteromorpha)', 'LIVING', 'FRESHWATER_FISH', '120_rasbora_arlequim.webp', 12, 35.00, 75.00, 114.29, '78900000180', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Rásbora Galaxy CPD (Danio margaritatus)', 'rásbora galaxy cpd (danio margaritatus)', 'LIVING', 'FRESHWATER_FISH', '121_rasbora_galaxy_cpd.webp', 12, 35.00, 75.00, 114.29, '78900000181', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Micro Rásbora Esmeralda (Danio erythromicron)', 'micro rásbora esmeralda (danio erythromicron)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000182', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Barbo Sumatra Comum (Puntigrus tetrazona)', 'barbo sumatra comum (puntigrus tetrazona)', 'LIVING', 'FRESHWATER_FISH', '122_barbo_sumatra_tigre.webp', 12, 35.00, 75.00, 114.29, '78900000183', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Barbo Sumatra Verde (Puntigrus tetrazona var. Green)', 'barbo sumatra verde (puntigrus tetrazona var. green)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000184', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Barbo Sumatra Albino (Puntigrus tetrazona var. Albino)', 'barbo sumatra albino (puntigrus tetrazona var. albino)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000185', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Barbo Cereja (Desmopuntius titteya)', 'barbo cereja (desmopuntius titteya)', 'LIVING', 'FRESHWATER_FISH', '123_barbo_cereja_ouro.webp', 12, 35.00, 75.00, 114.29, '78900000186', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Barbo Ouro (Barbodes semifasciolatus)', 'barbo ouro (barbodes semifasciolatus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000187', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Bandeira Koi (Pterophyllum scalare)', 'acará bandeira koi (pterophyllum scalare)', 'LIVING', 'FRESHWATER_FISH', '124_acara_bandeira_koi.webp', 12, 35.00, 75.00, 114.29, '78900000188', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Bandeira Orange Marble (Pterophyllum scalare)', 'acará bandeira orange marble (pterophyllum scalare)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000189', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Bandeira Mármore (Pterophyllum scalare)', 'acará bandeira mármore (pterophyllum scalare)', 'LIVING', 'FRESHWATER_FISH', '125_acara_bandeira_marmore_zebra.webp', 12, 35.00, 75.00, 114.29, '78900000190', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Bandeira Palhaço (Pterophyllum scalare)', 'acará bandeira palhaço (pterophyllum scalare)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000191', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Bandeira Zebra (Pterophyllum scalare)', 'acará bandeira zebra (pterophyllum scalare)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000192', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Bandeira Black Negro (Pterophyllum scalare)', 'acará bandeira black negro (pterophyllum scalare)', 'LIVING', 'FRESHWATER_FISH', '126_acara_bandeira_negro_pinoy.webp', 12, 35.00, 75.00, 114.29, '78900000193', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Bandeira Fumaça (Pterophyllum scalare)', 'acará bandeira fumaça (pterophyllum scalare)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000194', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Bandeira Pinoy (Pterophyllum scalare)', 'acará bandeira pinoy (pterophyllum scalare)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000195', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Bandeira Ouro (Pterophyllum scalare)', 'acará bandeira ouro (pterophyllum scalare)', 'LIVING', 'FRESHWATER_FISH', '127_acara_bandeira_ouro_albino.webp', 12, 35.00, 75.00, 114.29, '78900000196', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Bandeira Platina (Pterophyllum scalare)', 'acará bandeira platina (pterophyllum scalare)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000197', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Bandeira Albino (Pterophyllum scalare)', 'acará bandeira albino (pterophyllum scalare)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000198', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Disco Azul Turquesa (Symphysodon aequifasciatus)', 'acará disco azul turquesa (symphysodon aequifasciatus)', 'LIVING', 'FRESHWATER_FISH', '128_acara_disco_azul_turquesa.webp', 12, 35.00, 75.00, 114.29, '78900000199', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Disco Cobalt Blue (Symphysodon aequifasciatus)', 'acará disco cobalt blue (symphysodon aequifasciatus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000200', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Disco Pigeon Blood (Symphysodon aequifasciatus)', 'acará disco pigeon blood (symphysodon aequifasciatus)', 'LIVING', 'FRESHWATER_FISH', '129_acara_disco_pigeon_blood.webp', 12, 35.00, 75.00, 114.29, '78900000201', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Disco Red Marlboro (Symphysodon aequifasciatus)', 'acará disco red marlboro (symphysodon aequifasciatus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000202', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Disco Blue Diamond (Symphysodon aequifasciatus)', 'acará disco blue diamond (symphysodon aequifasciatus)', 'LIVING', 'FRESHWATER_FISH', '130_acara_disco_blue_diamond.webp', 12, 35.00, 75.00, 114.29, '78900000203', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Disco White Diamond (Symphysodon aequifasciatus)', 'acará disco white diamond (symphysodon aequifasciatus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000204', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Disco Selvagem Heckel (Symphysodon discus)', 'acará disco selvagem heckel (symphysodon discus)', 'LIVING', 'FRESHWATER_FISH', '131_acara_disco_selvagem.jpg', 12, 35.00, 75.00, 114.29, '78900000205', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Disco Selvagem Verde Tefé (Symphysodon tarzoo)', 'acará disco selvagem verde tefé (symphysodon tarzoo)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000206', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Disco Selvagem Azul (Symphysodon aequifasciatus)', 'acará disco selvagem azul (symphysodon aequifasciatus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000207', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ramirezi Comum (Mikrogeophagus ramirezi)', 'ramirezi comum (mikrogeophagus ramirezi)', 'LIVING', 'FRESHWATER_FISH', '132_ramirezi_comum_alemao.webp', 12, 35.00, 75.00, 114.29, '78900000208', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ramirezi Ouro (Mikrogeophagus ramirezi)', 'ramirezi ouro (mikrogeophagus ramirezi)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000209', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ramirezi Electric Blue (Mikrogeophagus ramirezi)', 'ramirezi electric blue (mikrogeophagus ramirezi)', 'LIVING', 'FRESHWATER_FISH', '133_ramirezi_electric_blue.webp', 12, 35.00, 75.00, 114.29, '78900000210', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ramirezi Black German (Mikrogeophagus ramirezi)', 'ramirezi black german (mikrogeophagus ramirezi)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000211', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Apistogramma Cacatuoides Double Red (Apistogramma cacatuoides)', 'apistogramma cacatuoides double red (apistogramma cacatuoides)', 'LIVING', 'FRESHWATER_FISH', '134_apistogramma_cacatuoides_agassizii.jpg', 12, 35.00, 75.00, 114.29, '78900000212', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Apistogramma Agassizii Fire Red (Apistogramma agassizii)', 'apistogramma agassizii fire red (apistogramma agassizii)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000213', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ciclídeo Yellow Lab Caeruleus (Labidochromis caeruleus)', 'ciclídeo yellow lab caeruleus (labidochromis caeruleus)', 'LIVING', 'FRESHWATER_FISH', '135_ciclideos_malawi_yellow.webp', 12, 35.00, 75.00, 114.29, '78900000214', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ciclídeo Pseudotropheus Socolofi (Chindongo socolofi)', 'ciclídeo pseudotropheus socolofi (chindongo socolofi)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000215', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ciclídeo Aulonocara Firefish (Aulonocara sp.)', 'ciclídeo aulonocara firefish (aulonocara sp.)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000216', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ciclídeo Aulonocara Maleri (Aulonocara baenschi)', 'ciclídeo aulonocara maleri (aulonocara baenschi)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000217', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ciclídeo Aulonocara Eureka (Aulonocara jacobfreibergi)', 'ciclídeo aulonocara eureka (aulonocara jacobfreibergi)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000218', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Oscar Tigre (Astronotus ocellatus)', 'oscar tigre (astronotus ocellatus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000219', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Oscar Red Tiger (Astronotus ocellatus)', 'oscar red tiger (astronotus ocellatus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000220', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Oscar Albino Red Ruby (Astronotus ocellatus)', 'oscar albino red ruby (astronotus ocellatus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000221', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Oscar Bronze (Astronotus ocellatus)', 'oscar bronze (astronotus ocellatus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000222', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Aruanã Prata (Osteoglossum bicirrhosum)', 'aruanã prata (osteoglossum bicirrhosum)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000223', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Polypterus Senegalus (Polypterus senegalus)', 'polypterus senegalus (polypterus senegalus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000224', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tucunaré Amarelo (Cichla ocellaris)', 'tucunaré amarelo (cichla ocellaris)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000225', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Kinguio Cometa Vermelho (Carassius auratus)', 'kinguio cometa vermelho (carassius auratus)', 'LIVING', 'FRESHWATER_FISH', '139_kinguio_cometa_sarasa.webp', 12, 35.00, 75.00, 114.29, '78900000226', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Kinguio Cometa Sarasa (Carassius auratus)', 'kinguio cometa sarasa (carassius auratus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000227', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Kinguio Oranda Red Cap (Carassius auratus)', 'kinguio oranda red cap (carassius auratus)', 'LIVING', 'FRESHWATER_FISH', '140_kinguio_oranda_red_cap.webp', 12, 35.00, 75.00, 114.29, '78900000228', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Kinguio Oranda Cálico (Carassius auratus)', 'kinguio oranda cálico (carassius auratus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000229', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Kinguio Oranda Panda (Carassius auratus)', 'kinguio oranda panda (carassius auratus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000230', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Kinguio Telescópio Black Moor (Carassius auratus)', 'kinguio telescópio black moor (carassius auratus)', 'LIVING', 'FRESHWATER_FISH', '141_kinguio_telescopio_black_moor.jpg', 12, 35.00, 75.00, 114.29, '78900000231', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Kinguio Ranchu Lionhead (Carassius auratus)', 'kinguio ranchu lionhead (carassius auratus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000232', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Coridora Bronze Aeneus (Corydoras aeneus)', 'coridora bronze aeneus (corydoras aeneus)', 'LIVING', 'FRESHWATER_FISH', '142_coridora_bronze_albina.webp', 12, 35.00, 75.00, 114.29, '78900000233', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Coridora Albina (Corydoras aeneus var. Albino)', 'coridora albina (corydoras aeneus var. albino)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000234', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Coridora Pimenta (Corydoras paleatus)', 'coridora pimenta (corydoras paleatus)', 'LIVING', 'FRESHWATER_FISH', '143_coridora_pimenta_schwartzi.webp', 12, 35.00, 75.00, 114.29, '78900000235', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Coridora Schwartzi Tigre (Corydoras schwartzi)', 'coridora schwartzi tigre (corydoras schwartzi)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000236', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Coridora Panda (Corydoras panda)', 'coridora panda (corydoras panda)', 'LIVING', 'FRESHWATER_FISH', '144_coridora_panda_sterbai.webp', 12, 35.00, 75.00, 114.29, '78900000237', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Coridora Sterbai (Corydoras sterbai)', 'coridora sterbai (corydoras sterbai)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000238', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Limpa-Vidro Otocinclus (Otocinclus macrospilus)', 'limpa-vidro otocinclus (otocinclus macrospilus)', 'LIVING', 'FRESHWATER_FISH', '145_limpa_vidro_otocinclus.webp', 12, 35.00, 75.00, 114.29, '78900000239', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Limpa-Vidro Pitbull (Parotocinclus jumbo)', 'limpa-vidro pitbull (parotocinclus jumbo)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000240', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cascudo Ancistrus Comum (Ancistrus cirrhosus)', 'cascudo ancistrus comum (ancistrus cirrhosus)', 'LIVING', 'FRESHWATER_FISH', '146_cascudo_ancistrus_bristlenose.webp', 12, 35.00, 75.00, 114.29, '78900000241', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cascudo Ancistrus Albino Ouro (Ancistrus cirrhosus)', 'cascudo ancistrus albino ouro (ancistrus cirrhosus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000242', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cascudo Ancistrus Super Red (Ancistrus cirrhosus)', 'cascudo ancistrus super red (ancistrus cirrhosus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000243', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cascudo Pepita de Ouro L018 (Baryancistrus xanthellus)', 'cascudo pepita de ouro l018 (baryancistrus xanthellus)', 'LIVING', 'FRESHWATER_FISH', '147_cascudo_pepita_de_ouro_abacaxi.jpg', 12, 35.00, 75.00, 114.29, '78900000244', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cascudo Abacaxi (Megalancistrus parananus)', 'cascudo abacaxi (megalancistrus parananus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000245', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cascudo Comum Plet (Hypostomus plecostomus)', 'cascudo comum plet (hypostomus plecostomus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000246', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Comedor de Alga Siamês SAE (Crossocheilus oblongus)', 'comedor de alga siamês sae (crossocheilus oblongus)', 'LIVING', 'FRESHWATER_FISH', '148_algueiros_labeo_botia_sae.jpg', 12, 35.00, 75.00, 114.29, '78900000247', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Comedor de Alga Chinês CAC (Gyrinocheilus aymonieri)', 'comedor de alga chinês cac (gyrinocheilus aymonieri)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000248', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Labeo Frenatus Red Tail (Epalzeorhynchos frenatum)', 'labeo frenatus red tail (epalzeorhynchos frenatum)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000249', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Bótia Palhaço (Chromobotia macracanthus)', 'bótia palhaço (chromobotia macracanthus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000250', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Bótia Yoyo (Botia almorhae)', 'bótia yoyo (botia almorhae)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000251', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Neocaridina Red Cherry (Neocaridina davidi)', 'camarão neocaridina red cherry (neocaridina davidi)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000252', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Neocaridina Blue Dream (Neocaridina davidi)', 'camarão neocaridina blue dream (neocaridina davidi)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000253', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Neocaridina Yellow (Neocaridina davidi)', 'camarão neocaridina yellow (neocaridina davidi)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000254', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Neocaridina Rili (Neocaridina davidi)', 'camarão neocaridina rili (neocaridina davidi)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000255', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Caramujo Neritina Zebra (Neritina natalensis)', 'caramujo neritina zebra (neritina natalensis)', 'LIVING', 'FRESHWATER_INVERTEBRATE', '150_caramujos_ampularia_neritina.webp', 12, 35.00, 75.00, 114.29, '78900000256', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Caramujo Neritina Mosaico (Neritina virginea)', 'caramujo neritina mosaico (neritina virginea)', 'LIVING', 'FRESHWATER_INVERTEBRATE', NULL, 12, 35.00, 75.00, 114.29, '78900000257', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Caramujo Ampulária Ouro (Pomacea diffusa var. Gold)', 'caramujo ampulária ouro (pomacea diffusa var. gold)', 'LIVING', 'FRESHWATER_INVERTEBRATE', NULL, 12, 35.00, 75.00, 114.29, '78900000258', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Caramujo Ampulária Roxa (Pomacea diffusa var. Purple)', 'caramujo ampulária roxa (pomacea diffusa var. purple)', 'LIVING', 'FRESHWATER_INVERTEBRATE', NULL, 12, 35.00, 75.00, 114.29, '78900000259', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Gorilla Nipples (Zoanthus sp.)', 'zoanthus gorilla nipples (zoanthus sp.)', 'LIVING', 'CORAL', '151_zoanthus_gorilla_nipples.jpg', 12, 35.00, 75.00, 114.29, '78900000260', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Blowpop (Zoanthus sp.)', 'zoanthus blowpop (zoanthus sp.)', 'LIVING', 'CORAL', '152_zoanthus_blowpop.jpg', 12, 35.00, 75.00, 114.29, '78900000261', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Tubbs Blue (Zoanthus sp.)', 'zoanthus tubbs blue (zoanthus sp.)', 'LIVING', 'CORAL', '153_zoanthus_tubbs_blue.jpg', 12, 35.00, 75.00, 114.29, '78900000262', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus AOI Blue (Zoanthus sp.)', 'zoanthus aoi blue (zoanthus sp.)', 'LIVING', 'CORAL', '154_zoanthus_aoi_blue.jpg', 12, 35.00, 75.00, 114.29, '78900000263', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Dragon Eye (Zoanthus sp.)', 'zoanthus dragon eye (zoanthus sp.)', 'LIVING', 'CORAL', '155_zoanthus_dragon_eye.jpg', 12, 35.00, 75.00, 114.29, '78900000264', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Miami Vice (Zoanthus sp.)', 'zoanthus miami vice (zoanthus sp.)', 'LIVING', 'CORAL', '156_zoanthus_miami_vice.jpg', 12, 35.00, 75.00, 114.29, '78900000265', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Gatorade (Zoanthus sp.)', 'zoanthus gatorade (zoanthus sp.)', 'LIVING', 'CORAL', '157_zoanthus_gatorade.webp', 12, 35.00, 75.00, 114.29, '78900000266', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Mohawk (Zoanthus sp.)', 'zoanthus mohawk (zoanthus sp.)', 'LIVING', 'CORAL', '158_zoanthus_mohawk.jpg', 12, 35.00, 75.00, 114.29, '78900000267', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Variable Star (Zoanthus sp.)', 'zoanthus variable star (zoanthus sp.)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000268', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Green Bay Packers (Zoanthus sp.)', 'zoanthus green bay packers (zoanthus sp.)', 'LIVING', 'CORAL', '159_zoanthus_green_bay_packers.png', 12, 35.00, 75.00, 114.29, '78900000269', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Rainbow Infusion (Zoanthus sp.)', 'zoanthus rainbow infusion (zoanthus sp.)', 'LIVING', 'CORAL', '160_zoanthus_rainbow_infusion.jpg', 12, 35.00, 75.00, 114.29, '78900000270', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Kazoo (Zoanthus sp.)', 'zoanthus kazoo (zoanthus sp.)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000271', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Wolverine (Zoanthus sp.)', 'zoanthus wolverine (zoanthus sp.)', 'LIVING', 'CORAL', '161_zoanthus_wolverine.jpg', 12, 35.00, 75.00, 114.29, '78900000272', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Darth Maul (Zoanthus sp.)', 'zoanthus darth maul (zoanthus sp.)', 'LIVING', 'CORAL', '162_zoanthus_darth_maul.jpg', 12, 35.00, 75.00, 114.29, '78900000273', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Everlasting Gobstopper (Zoanthus sp.)', 'zoanthus everlasting gobstopper (zoanthus sp.)', 'LIVING', 'CORAL', '163_zoanthus_gobstopper.jpg', 12, 35.00, 75.00, 114.29, '78900000274', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Magicians (Zoanthus sp.)', 'zoanthus magicians (zoanthus sp.)', 'LIVING', 'CORAL', '164_zoanthus_magicians.jpg', 12, 35.00, 75.00, 114.29, '78900000275', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Palythoa Red People Eater (Palythoa sp.)', 'palythoa red people eater (palythoa sp.)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000276', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Sonic Flare (Zoanthus sp.)', 'zoanthus sonic flare (zoanthus sp.)', 'LIVING', 'CORAL', '165_zoanthus_sonic_flare.jpg', 12, 35.00, 75.00, 114.29, '78900000277', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus White Zombie (Zoanthus sp.)', 'zoanthus white zombie (zoanthus sp.)', 'LIVING', 'CORAL', '166_zoanthus_white_zombie.jpg', 12, 35.00, 75.00, 114.29, '78900000278', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Seduction (Zoanthus sp.)', 'zoanthus seduction (zoanthus sp.)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000279', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Salted Agave (Zoanthus sp.)', 'zoanthus salted agave (zoanthus sp.)', 'LIVING', 'CORAL', '167_zoanthus_salted_agave.webp', 12, 35.00, 75.00, 114.29, '78900000280', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Palythoa Lemon Twist (Palythoa sp.)', 'palythoa lemon twist (palythoa sp.)', 'LIVING', 'CORAL', '168_palythoa_lemon_twist.jpg', 12, 35.00, 75.00, 114.29, '78900000281', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Palythoa Space Chaos (Palythoa sp.)', 'palythoa space chaos (palythoa sp.)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000282', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Little Shop of Horrors (Zoanthus sp.)', 'zoanthus little shop of horrors (zoanthus sp.)', 'LIVING', 'CORAL', '169_zoanthus_little_shop_of_horrors.webp', 12, 35.00, 75.00, 114.29, '78900000283', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Zoanthus Grand Master Glazz GMK (Zoanthus sp.)', 'zoanthus grand master glazz gmk (zoanthus sp.)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000284', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Yellow Polyps (Parazoanthus gracilis)', 'yellow polyps (parazoanthus gracilis)', 'LIVING', 'CORAL', '170_yellow_polyps_parazoanthus.jpg', 12, 35.00, 75.00, 114.29, '78900000285', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Button Polyps Metallic (Protopalythoa sp.)', 'button polyps metallic (protopalythoa sp.)', 'LIVING', 'CORAL', '171_button_polyps_metallic_green.jpeg', 12, 35.00, 75.00, 114.29, '78900000286', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mushroom Discosoma Jawbreaker (Discosoma sp.)', 'mushroom discosoma jawbreaker (discosoma sp.)', 'LIVING', 'CORAL', '172_mushroom_jawbreaker.jpg', 12, 35.00, 75.00, 114.29, '78900000287', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mushroom Magic Carpet (Rhodactis sp.)', 'mushroom magic carpet (rhodactis sp.)', 'LIVING', 'CORAL', '173_mushroom_red_velvet_magic_carpet.webp', 12, 35.00, 75.00, 114.29, '78900000288', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mushroom Red Velvet (Rhodactis sp.)', 'mushroom red velvet (rhodactis sp.)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000289', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mushroom Discosoma Interstellar (Discosoma sp.)', 'mushroom discosoma interstellar (discosoma sp.)', 'LIVING', 'CORAL', '174_mushroom_interstellar_patchwork.jpg', 12, 35.00, 75.00, 114.29, '78900000290', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mushroom Discosoma Patchwork Rainbow (Discosoma sp.)', 'mushroom discosoma patchwork rainbow (discosoma sp.)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000291', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mushroom Discosoma Blue Spotted (Discosoma sp.)', 'mushroom discosoma blue spotted (discosoma sp.)', 'LIVING', 'CORAL', '175_mushroom_blue_spotted.jpg', 12, 35.00, 75.00, 114.29, '78900000292', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mushroom Rhodactis Ultra Superman (Rhodactis sp.)', 'mushroom rhodactis ultra superman (rhodactis sp.)', 'LIVING', 'CORAL', '176_rhodactis_superman_ultra.jpg', 12, 35.00, 75.00, 114.29, '78900000293', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mushroom Rhodactis Frankenstein Bounce (Rhodactis sp.)', 'mushroom rhodactis frankenstein bounce (rhodactis sp.)', 'LIVING', 'CORAL', '177_rhodactis_frankenstein_bounce.jpg', 12, 35.00, 75.00, 114.29, '78900000294', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mushroom Rhodactis Powerball Bounce (Rhodactis sp.)', 'mushroom rhodactis powerball bounce (rhodactis sp.)', 'LIVING', 'CORAL', '178_rhodactis_powerball_bounce.jpg', 12, 35.00, 75.00, 114.29, '78900000295', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mushroom Rhodactis Biohazard Bounce (Rhodactis sp.)', 'mushroom rhodactis biohazard bounce (rhodactis sp.)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000296', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mushroom Rhodactis Toxic Green Bounce (Rhodactis sp.)', 'mushroom rhodactis toxic green bounce (rhodactis sp.)', 'LIVING', 'CORAL', '179_rhodactis_green_bounce.jpg', 12, 35.00, 75.00, 114.29, '78900000297', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ricordea Florida Azul (Ricordea florida)', 'ricordea florida azul (ricordea florida)', 'LIVING', 'CORAL', '180_ricordea_florida_blue.jpg', 12, 35.00, 75.00, 114.29, '78900000298', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ricordea Florida Teal (Ricordea florida)', 'ricordea florida teal (ricordea florida)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000299', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ricordea Yuma Godzilla (Ricordea yuma)', 'ricordea yuma godzilla (ricordea yuma)', 'LIVING', 'CORAL', '181_ricordea_yuma_godzilla.jpg', 12, 35.00, 75.00, 114.29, '78900000300', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ricordea Yuma King Kong (Ricordea yuma)', 'ricordea yuma king kong (ricordea yuma)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000301', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ricordea Yuma Laranja e Roxa (Ricordea yuma)', 'ricordea yuma laranja e roxa (ricordea yuma)', 'LIVING', 'CORAL', '182_ricordea_yuma_orange_purple.jpg', 12, 35.00, 75.00, 114.29, '78900000302', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Leather Finger (Sinularia asterolobata)', 'leather finger (sinularia asterolobata)', 'LIVING', 'CORAL', '183_leather_finger_sinularia.jpg', 12, 35.00, 75.00, 114.29, '78900000303', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Leather Colt (Cladiella sp.)', 'leather colt (cladiella sp.)', 'LIVING', 'CORAL', '184_leather_colt_cladiella.jpg', 12, 35.00, 75.00, 114.29, '78900000304', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Leather Thick Finger (Alcyonium sp.)', 'leather thick finger (alcyonium sp.)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000305', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Blue Sympodium (Sympodium sp.)', 'blue sympodium (sympodium sp.)', 'LIVING', 'CORAL', '185_blue_sympodium.jpg', 12, 35.00, 75.00, 114.29, '78900000306', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Sansibia Azul (Sansibia sp.)', 'sansibia azul (sansibia sp.)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000307', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Pipe Organ Neon Green (Tubipora musica)', 'pipe organ neon green (tubipora musica)', 'LIVING', 'CORAL', '186_pipe_organ_neon_green.jpg', 12, 35.00, 75.00, 114.29, '78900000308', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Pipe Organ Clássico (Tubipora musica)', 'pipe organ clássico (tubipora musica)', 'LIVING', 'CORAL', '187_pipe_organ_white_green.jpg', 12, 35.00, 75.00, 114.29, '78900000309', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anêmona Bubble Tip Acid Wash (Entacmaea quadricolor)', 'anêmona bubble tip acid wash (entacmaea quadricolor)', 'LIVING', 'CORAL', '188_anemona_bta_acid_wash_black_widow.jpg', 12, 35.00, 75.00, 114.29, '78900000310', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anêmona Bubble Tip Black Widow (Entacmaea quadricolor)', 'anêmona bubble tip black widow (entacmaea quadricolor)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000311', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anêmona Carpet Verde (Stichodactyla haddoni)', 'anêmona carpet verde (stichodactyla haddoni)', 'LIVING', 'CORAL', '189_anemona_carpet_haddoni.jpg', 12, 35.00, 75.00, 114.29, '78900000312', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anêmona Carpet Azul (Stichodactyla haddoni)', 'anêmona carpet azul (stichodactyla haddoni)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000313', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anêmona Long Tentacle LTA (Macrodactyla doreensis)', 'anêmona long tentacle lta (macrodactyla doreensis)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000314', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anêmona Condylactis Gigantea (Condylactis gigantea)', 'anêmona condylactis gigantea (condylactis gigantea)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000315', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Torch 24K Gold (Euphyllia glabrescens)', 'torch 24k gold (euphyllia glabrescens)', 'LIVING', 'CORAL', '191_torch_24k_aussie_gold.jpg', 12, 35.00, 75.00, 114.29, '78900000316', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Torch Aussie Gold (Euphyllia glabrescens)', 'torch aussie gold (euphyllia glabrescens)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000317', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Torch Holy Grail (Euphyllia glabrescens)', 'torch holy grail (euphyllia glabrescens)', 'LIVING', 'CORAL', '192_torch_holy_grail_ny_knicks.jpg', 12, 35.00, 75.00, 114.29, '78900000318', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Torch NY Knicks (Euphyllia glabrescens)', 'torch ny knicks (euphyllia glabrescens)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000319', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Torch Hellfire (Euphyllia glabrescens)', 'torch hellfire (euphyllia glabrescens)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000320', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Hammer Laranja (Fimbriaphyllia ancora)', 'hammer laranja (fimbriaphyllia ancora)', 'LIVING', 'CORAL', '193_hammer_orange_rose_gold.jpg', 12, 35.00, 75.00, 114.29, '78900000321', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Hammer Copper (Fimbriaphyllia ancora)', 'hammer copper (fimbriaphyllia ancora)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000322', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Hammer Rose Gold (Fimbriaphyllia ancora)', 'hammer rose gold (fimbriaphyllia ancora)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000323', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Hammer Wall Rosa (Fimbriaphyllia ancora)', 'hammer wall rosa (fimbriaphyllia ancora)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000324', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Hammer Wall Verde (Fimbriaphyllia ancora)', 'hammer wall verde (fimbriaphyllia ancora)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000325', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Hammer Prince of Darkness (Fimbriaphyllia ancora)', 'hammer prince of darkness (fimbriaphyllia ancora)', 'LIVING', 'CORAL', '195_hammer_prince_of_darkness_black.jpg', 12, 35.00, 75.00, 114.29, '78900000326', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Bubble Verde (Plerogyra sinuosa)', 'bubble verde (plerogyra sinuosa)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000327', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Bubble Branco (Plerogyra sinuosa)', 'bubble branco (plerogyra sinuosa)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000328', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Elegance Coral (Catalaphyllia jardinei)', 'elegance coral (catalaphyllia jardinei)', 'LIVING', 'CORAL', '197_elegance_coral_catalaphyllia.jpg', 12, 35.00, 75.00, 114.29, '78900000329', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Plate Laranja (Cycloseris sp.)', 'plate laranja (cycloseris sp.)', 'LIVING', 'CORAL', '198_plate_coral_fungia_orange.jpg', 12, 35.00, 75.00, 114.29, '78900000330', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Plate Verde (Fungia repanda)', 'plate verde (fungia repanda)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000331', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Open Brain Rainbow (Trachyphyllia geoffroyi)', 'open brain rainbow (trachyphyllia geoffroyi)', 'LIVING', 'CORAL', '199_open_brain_trachyphyllia.jpg', 12, 35.00, 75.00, 114.29, '78900000332', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Open Brain Verde (Trachyphyllia geoffroyi)', 'open brain verde (trachyphyllia geoffroyi)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000333', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Lobophyllia Red (Lobophyllia hemprichii)', 'lobophyllia red (lobophyllia hemprichii)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000334', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Lobophyllia Tricolor (Lobophyllia hemprichii)', 'lobophyllia tricolor (lobophyllia hemprichii)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000335', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Scolymia Bleeding Apple (Homophyllia australis)', 'scolymia bleeding apple (homophyllia australis)', 'LIVING', 'CORAL', '201_scolymia_bleeding_apple_war_paint.jpg', 12, 35.00, 75.00, 114.29, '78900000336', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Scolymia War Paint (Homophyllia australis)', 'scolymia war paint (homophyllia australis)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000337', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acanthastrea Echinata Rainbow (Acanthastrea echinata)', 'acanthastrea echinata rainbow (acanthastrea echinata)', 'LIVING', 'CORAL', '202_acanthastrea_echinata_rainbow.jpg', 12, 35.00, 75.00, 114.29, '78900000338', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acanthastrea Echinata Orange Eye (Acanthastrea echinata)', 'acanthastrea echinata orange eye (acanthastrea echinata)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000339', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('War Coral Vermelho e Roxo (Favites pentagona)', 'war coral vermelho e roxo (favites pentagona)', 'LIVING', 'CORAL', '203_favites_war_coral.webp', 12, 35.00, 75.00, 114.29, '78900000340', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Favia Dragon Soul (Favia sp.)', 'favia dragon soul (favia sp.)', 'LIVING', 'CORAL', '204_favia_dragon_soul_lemon_lime.jpg', 12, 35.00, 75.00, 114.29, '78900000341', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Favites Lemon Lime (Favites sp.)', 'favites lemon lime (favites sp.)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000342', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Leptastrea Burning Blood (Leptastrea purpurea)', 'leptastrea burning blood (leptastrea purpurea)', 'LIVING', 'CORAL', '205_leptastrea_burning_platygyra.jpg', 12, 35.00, 75.00, 114.29, '78900000343', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Platygyra Maze Cérebro (Platygyra daedalea)', 'platygyra maze cérebro (platygyra daedalea)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000344', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cyphastrea Meteor Shower (Cyphastrea ocellina)', 'cyphastrea meteor shower (cyphastrea ocellina)', 'LIVING', 'CORAL', '206_cyphastrea_meteor_shower_bizarro.jpg', 12, 35.00, 75.00, 114.29, '78900000345', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cyphastrea Bizarro (Cyphastrea sp.)', 'cyphastrea bizarro (cyphastrea sp.)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000346', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Galaxea Verde (Galaxea fascicularis)', 'galaxea verde (galaxea fascicularis)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000347', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Galaxea Gold (Galaxea fascicularis)', 'galaxea gold (galaxea fascicularis)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000348', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cynarina Lacrymalis Red (Cynarina lacrymalis)', 'cynarina lacrymalis red (cynarina lacrymalis)', 'LIVING', 'CORAL', '208_cynarina_indophyllia_red.jpg', 12, 35.00, 75.00, 114.29, '78900000349', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Indophyllia Macassarensis (Indophyllia macassarensis)', 'indophyllia macassarensis (indophyllia macassarensis)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000350', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Montipora Setosa Laranja (Montipora setosa)', 'montipora setosa laranja (montipora setosa)', 'LIVING', 'CORAL', '209_montipora_setosa_orange.jpg', 12, 35.00, 75.00, 114.29, '78900000351', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Montipora Incrustante Rainbow (Montipora sp.)', 'montipora incrustante rainbow (montipora sp.)', 'LIVING', 'CORAL', '210_montipora_rainbow_incrustante.jpg', 12, 35.00, 75.00, 114.29, '78900000352', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Montipora Incrustante Pokerstar (Montipora tuberculosa)', 'montipora incrustante pokerstar (montipora tuberculosa)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000353', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Montipora Bubblegum Digitata (Montipora digitata)', 'montipora bubblegum digitata (montipora digitata)', 'LIVING', 'CORAL', '211_montipora_bubblegum_digitata.jpg', 12, 35.00, 75.00, 114.29, '78900000354', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Montipora Beach Bum (Montipora sp.)', 'montipora beach bum (montipora sp.)', 'LIVING', 'CORAL', '212_montipora_beach_bum_kung_pao.jpg', 12, 35.00, 75.00, 114.29, '78900000355', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Montipora Kung Pao (Montipora sp.)', 'montipora kung pao (montipora sp.)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000356', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Montipora Phoenix (Montipora sp.)', 'montipora phoenix (montipora sp.)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000357', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Pavona Cactus Verde (Pavona decussata)', 'pavona cactus verde (pavona decussata)', 'LIVING', 'CORAL', '213_pavona_cactus_mint.jpg', 12, 35.00, 75.00, 114.29, '78900000358', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Stylophora Pistillata Pink (Stylophora pistillata)', 'stylophora pistillata pink (stylophora pistillata)', 'LIVING', 'CORAL', '214_stylophora_pink_rainbow.jpg', 12, 35.00, 75.00, 114.29, '78900000359', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Stylophora Rainbow (Stylophora sp.)', 'stylophora rainbow (stylophora sp.)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000360', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Seriatopora Bird of Paradise (Seriatopora guttatus)', 'seriatopora bird of paradise (seriatopora guttatus)', 'LIVING', 'CORAL', '215_seriatopora_bird_of_paradise.jpg', 12, 35.00, 75.00, 114.29, '78900000361', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Pocillopora Damicornis Pink (Pocillopora damicornis)', 'pocillopora damicornis pink (pocillopora damicornis)', 'LIVING', 'CORAL', '216_pocillopora_rainbow_tricolor.jpg', 12, 35.00, 75.00, 114.29, '78900000362', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Pocillopora Damicornis Verde (Pocillopora damicornis)', 'pocillopora damicornis verde (pocillopora damicornis)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000363', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acropora Walt Disney (Acropora tenuis)', 'acropora walt disney (acropora tenuis)', 'LIVING', 'CORAL', '217_acropora_walt_disney_tenuis.jpg', 12, 35.00, 75.00, 114.29, '78900000364', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acropora Homewrecker (Acropora tenuis)', 'acropora homewrecker (acropora tenuis)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000365', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acropora Strawberry Shortcake (Acropora microclados)', 'acropora strawberry shortcake (acropora microclados)', 'LIVING', 'CORAL', '218_acropora_strawberry_shortcake.jpg', 12, 35.00, 75.00, 114.29, '78900000366', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acropora Red Planet (Acropora anthocercis)', 'acropora red planet (acropora anthocercis)', 'LIVING', 'CORAL', '219_acropora_red_planet_millepora.jpg', 12, 35.00, 75.00, 114.29, '78900000367', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acropora Pink Millepora (Acropora millepora)', 'acropora pink millepora (acropora millepora)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000368', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acropora Oregon Tort (Acropora tortuosa)', 'acropora oregon tort (acropora tortuosa)', 'LIVING', 'CORAL', '220_acropora_oregon_tort_miyagi.jpg', 12, 35.00, 75.00, 114.29, '78900000369', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acropora Cali Tort (Acropora tortuosa)', 'acropora cali tort (acropora tortuosa)', 'LIVING', 'CORAL', NULL, 12, 35.00, 75.00, 114.29, '78900000370', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe-Palhaço Clarkii (Amphiprion clarkii)', 'peixe-palhaço clarkii (amphiprion clarkii)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000371', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe-palhaço Tomato (Amphiprion frenatus)', 'peixe-palhaço tomato (amphiprion frenatus)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000372', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe-palhaço Fire Cinela (Amphiprion melanopus)', 'peixe-palhaço fire cinela (amphiprion melanopus)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000373', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe-palhaço Pink Skunk (Amphiprion perideraion)', 'peixe-palhaço pink skunk (amphiprion perideraion)', 'LIVING', 'MARINE_FISH', '223_palhaco_skunk_pink_orange.jpg', 12, 35.00, 75.00, 114.29, '78900000374', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe-palhaço Orange Skunk (Amphiprion sandaracinos)', 'peixe-palhaço orange skunk (amphiprion sandaracinos)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000375', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe-palhaço Maroon (Premnas biaculeatus)', 'peixe-palhaço maroon (premnas biaculeatus)', 'LIVING', 'MARINE_FISH', '224_palhaco_maroon_lightning_gold.png', 12, 35.00, 75.00, 114.29, '78900000376', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe-palhaço Lightning Maroon (Premnas biaculeatus var. Lightning)', 'peixe-palhaço lightning maroon (premnas biaculeatus var. lightning)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000377', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe-palhaço Gold Nugget Maroon (Premnas biaculeatus var. Gold)', 'peixe-palhaço gold nugget maroon (premnas biaculeatus var. gold)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000378', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe-palhaço Sebae (Amphiprion sebae)', 'peixe-palhaço sebae (amphiprion sebae)', 'LIVING', 'MARINE_FISH', '225_palhaco_sebae_polymnus_saddleback.jpg', 12, 35.00, 75.00, 114.29, '78900000379', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe-palhaço Saddleback (Amphiprion polymnus)', 'peixe-palhaço saddleback (amphiprion polymnus)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000380', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Achilles Tang (Acanthurus achilles)', 'achilles tang (acanthurus achilles)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000381', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Sohal Tang (Acanthurus sohal)', 'sohal tang (acanthurus sohal)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000382', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Clown Tang (Acanthurus lineatus)', 'clown tang (acanthurus lineatus)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000383', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Kole Tang Olho Amarelo (Ctenochaetus strigosus)', 'kole tang olho amarelo (ctenochaetus strigosus)', 'LIVING', 'MARINE_FISH', '228_kole_tang_tomini_chevron.jpg', 12, 35.00, 75.00, 114.29, '78900000384', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tomini Tang (Ctenochaetus tominiensis)', 'tomini tang (ctenochaetus tominiensis)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000385', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Foxface Rabbitfish (Siganus vulpinus)', 'foxface rabbitfish (siganus vulpinus)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000386', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Foxface Bicolor (Siganus uspi)', 'foxface bicolor (siganus uspi)', 'LIVING', 'MARINE_FISH', '230_foxface_magnificent_bicolor.jpg', 12, 35.00, 75.00, 114.29, '78900000387', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Foxface Magnificent (Siganus magnificus)', 'foxface magnificent (siganus magnificus)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000388', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Borboleta Copperband (Chelmon rostratus)', 'borboleta copperband (chelmon rostratus)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000389', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Borboleta Heniochus Acuminatus (Heniochus acuminatus)', 'borboleta heniochus acuminatus (heniochus acuminatus)', 'LIVING', 'MARINE_FISH', '232_heniochus_bannerfish_moorish_idol.jpg', 12, 35.00, 75.00, 114.29, '78900000390', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Moorish Idol (Zanclus cornutus)', 'moorish idol (zanclus cornutus)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000391', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anjo Imperador (Pomacanthus imperator)', 'anjo imperador (pomacanthus imperator)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000392', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anjo Koran (Pomacanthus semicirculatus)', 'anjo koran (pomacanthus semicirculatus)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000393', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anjo French (Pomacanthus paru)', 'anjo french (pomacanthus paru)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000394', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anjo Anão Bicolor (Centropyge bicolor)', 'anjo anão bicolor (centropyge bicolor)', 'LIVING', 'MARINE_FISH', '234_anjo_anao_bicolor_cherub.jpg', 12, 35.00, 75.00, 114.29, '78900000395', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anjo Anão Cherub Pigmeu (Centropyge argi)', 'anjo anão cherub pigmeu (centropyge argi)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000396', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anjo Anão Coral Beauty (Centropyge bispinosa)', 'anjo anão coral beauty (centropyge bispinosa)', 'LIVING', 'MARINE_FISH', '235_anjo_coral_beauty_bispinosa.jpg', 12, 35.00, 75.00, 114.29, '78900000397', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anthias Lyretail (Pseudanthias squamipinnis)', 'anthias lyretail (pseudanthias squamipinnis)', 'LIVING', 'MARINE_FISH', '236_anthias_squamipinnis_dispar.jpg', 12, 35.00, 75.00, 114.29, '78900000398', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anthias Dispar (Pseudanthias dispar)', 'anthias dispar (pseudanthias dispar)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000399', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cleaner Wrasse Limpador (Labroides dimidiatus)', 'cleaner wrasse limpador (labroides dimidiatus)', 'LIVING', 'MARINE_FISH', '237_cleaner_wrasse_labroides.jpg', 12, 35.00, 75.00, 114.29, '78900000400', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Melanurus Wrasse (Halichoeres melanurus)', 'melanurus wrasse (halichoeres melanurus)', 'LIVING', 'MARINE_FISH', '238_melanurus_leopard_wrasse.jpg', 12, 35.00, 75.00, 114.29, '78900000401', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Leopard Wrasse (Macropharyngodon meleagris)', 'leopard wrasse (macropharyngodon meleagris)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000402', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Fairy Wrasse Yellow Flanked (Cirrhilabrus lyukyuensis)', 'fairy wrasse yellow flanked (cirrhilabrus lyukyuensis)', 'LIVING', 'MARINE_FISH', '239_fairy_flasher_wrasse_cirrhilabrus.jpg', 12, 35.00, 75.00, 114.29, '78900000403', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Flasher Wrasse McCosker (Paracheilinus mccoskeri)', 'flasher wrasse mccosker (paracheilinus mccoskeri)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000404', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Diamond Watchman Goby (Valenciennea puellaris)', 'diamond watchman goby (valenciennea puellaris)', 'LIVING', 'MARINE_FISH', '240_diamond_goby_valenciennea.jpeg', 12, 35.00, 75.00, 114.29, '78900000405', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Golden Head Sleeper Goby (Valenciennea strigata)', 'golden head sleeper goby (valenciennea strigata)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000406', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Yellow Clown Goby (Gobiodon okinawae)', 'yellow clown goby (gobiodon okinawae)', 'LIVING', 'MARINE_FISH', '241_clown_goby_yellow_citrinus.jpg', 12, 35.00, 75.00, 114.29, '78900000407', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Clown Goby Citrinus (Gobiodon citrinus)', 'clown goby citrinus (gobiodon citrinus)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000408', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Lawnmower Algae Blenny (Salarias fasciatus)', 'lawnmower algae blenny (salarias fasciatus)', 'LIVING', 'MARINE_FISH', '242_lawnmower_algae_blenny_salarias.png', 12, 35.00, 75.00, 114.29, '78900000409', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tailspot Blenny (Ecsenius stigmatura)', 'tailspot blenny (ecsenius stigmatura)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000410', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Flame Hawkfish (Neocirrhites armatus)', 'flame hawkfish (neocirrhites armatus)', 'LIVING', 'MARINE_FISH', '243_flame_longnose_hawkfish.jpg', 12, 35.00, 75.00, 114.29, '78900000411', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Longnose Hawkfish (Oxycirrhites typus)', 'longnose hawkfish (oxycirrhites typus)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000412', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Moreia Snowflake (Echidna nebulosa)', 'moreia snowflake (echidna nebulosa)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000413', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Lionfish Volitans (Pterois volitans)', 'lionfish volitans (pterois volitans)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000414', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Niger Trigger (Odonus niger)', 'niger trigger (odonus niger)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000415', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Firefish Exquisite (Nemateleotris decora var. Exquisite)', 'firefish exquisite (nemateleotris decora var. exquisite)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000416', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Firefish Helfrichi (Nemateleotris helfrichi)', 'firefish helfrichi (nemateleotris helfrichi)', 'LIVING', 'MARINE_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000417', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Arlequim (Hymenocera picta)', 'camarão arlequim (hymenocera picta)', 'LIVING', 'MARINE_INVERTEBRATE', NULL, 12, 35.00, 75.00, 114.29, '78900000418', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Peppermint (Lysmata wurdemanni)', 'camarão peppermint (lysmata wurdemanni)', 'LIVING', 'MARINE_INVERTEBRATE', '247_camarao_peppermint_coral_banded.jpg', 12, 35.00, 75.00, 114.29, '78900000419', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Stenopus Coral Banded (Stenopus hispidus)', 'camarão stenopus coral banded (stenopus hispidus)', 'LIVING', 'MARINE_INVERTEBRATE', NULL, 12, 35.00, 75.00, 114.29, '78900000420', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Caranguejo Esmeralda Mithrax (Mithraculus sculptus)', 'caranguejo esmeralda mithrax (mithraculus sculptus)', 'LIVING', 'MARINE_INVERTEBRATE', '248_caranguejo_esmeralda_mithrax.jpg', 12, 35.00, 75.00, 114.29, '78900000421', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Caranguejo Pom Pom Boxer (Lybia edmondsoni)', 'caranguejo pom pom boxer (lybia edmondsoni)', 'LIVING', 'MARINE_INVERTEBRATE', '249_caranguejo_pom_pom_porcelana.jpg', 12, 35.00, 75.00, 114.29, '78900000422', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Caranguejo Anêmona Porcelana (Neopetrolisthes maculatus)', 'caranguejo anêmona porcelana (neopetrolisthes maculatus)', 'LIVING', 'MARINE_INVERTEBRATE', NULL, 12, 35.00, 75.00, 114.29, '78900000423', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ostra Tridacna Maxima Azul (Tridacna maxima)', 'ostra tridacna maxima azul (tridacna maxima)', 'LIVING', 'MARINE_INVERTEBRATE', '250_tridacna_maxima_crocea_ouriço.jpg', 12, 35.00, 75.00, 114.29, '78900000424', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ostra Tridacna Crocea (Tridacna crocea)', 'ostra tridacna crocea (tridacna crocea)', 'LIVING', 'MARINE_INVERTEBRATE', NULL, 12, 35.00, 75.00, 114.29, '78900000425', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Estrela Vermelha Fromia (Fromia milleporella)', 'estrela vermelha fromia (fromia milleporella)', 'LIVING', 'MARINE_INVERTEBRATE', NULL, 12, 35.00, 75.00, 114.29, '78900000426', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ouriço Pincushion Tuxedo (Mespilia globulus)', 'ouriço pincushion tuxedo (mespilia globulus)', 'LIVING', 'MARINE_INVERTEBRATE', NULL, 12, 35.00, 75.00, 114.29, '78900000427', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Guppy Blue Grass (Poecilia reticulata)', 'guppy blue grass (poecilia reticulata)', 'LIVING', 'FRESHWATER_FISH', '251_guppy_blue_grass_red_grass.png', 12, 35.00, 75.00, 114.29, '78900000428', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Guppy Red Grass (Poecilia reticulata)', 'guppy red grass (poecilia reticulata)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000429', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Guppy Albino Sky Blue (Poecilia reticulata)', 'guppy albino sky blue (poecilia reticulata)', 'LIVING', 'FRESHWATER_FISH', '252_guppy_sky_blue_lazuli.jpg', 12, 35.00, 75.00, 114.29, '78900000430', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Guppy Albino Topaz (Poecilia reticulata)', 'guppy albino topaz (poecilia reticulata)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000431', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Guppy Lazuli (Poecilia reticulata)', 'guppy lazuli (poecilia reticulata)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000432', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Guppy Albino Japan Blue (Poecilia reticulata)', 'guppy albino japan blue (poecilia reticulata)', 'LIVING', 'FRESHWATER_FISH', '253_guppy_japan_blue_dragon_koi.jpg', 12, 35.00, 75.00, 114.29, '78900000433', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Guppy Red Dragon (Poecilia reticulata)', 'guppy red dragon (poecilia reticulata)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000434', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Guppy Koi Tuxedo (Poecilia reticulata)', 'guppy koi tuxedo (poecilia reticulata)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000435', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Betta Mustard Gas (Betta splendens)', 'betta mustard gas (betta splendens)', 'LIVING', 'FRESHWATER_FISH', '254_betta_mustard_gas.jpg', 12, 35.00, 75.00, 114.29, '78900000436', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Betta Black Orchid (Betta splendens)', 'betta black orchid (betta splendens)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000437', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Betta Black Samurai (Betta splendens)', 'betta black samurai (betta splendens)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000438', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Betta Dragon Scale Red (Betta splendens)', 'betta dragon scale red (betta splendens)', 'LIVING', 'FRESHWATER_FISH', '256_betta_dragon_scale_super_red.png', 12, 35.00, 75.00, 114.29, '78900000439', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Betta Dragon Scale Black (Betta splendens)', 'betta dragon scale black (betta splendens)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000440', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Betta Super Red Halfmoon (Betta splendens)', 'betta super red halfmoon (betta splendens)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000441', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Betta Double Tail Dupla Cauda (Betta splendens)', 'betta double tail dupla cauda (betta splendens)', 'LIVING', 'FRESHWATER_FISH', '257_betta_double_tail_rosetail.jpg', 12, 35.00, 75.00, 114.29, '78900000442', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Betta Rosetail Halfmoon (Betta splendens)', 'betta rosetail halfmoon (betta splendens)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000443', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Betta Giant King (Betta splendens var. Giant)', 'betta giant king (betta splendens var. giant)', 'LIVING', 'FRESHWATER_FISH', '258_betta_giant_alien_wild.jpg', 12, 35.00, 75.00, 114.29, '78900000444', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Betta Alien Híbrido (Betta imbellis x splendens)', 'betta alien híbrido (betta imbellis x splendens)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000445', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Plati Tiger Bumblebee (Xiphophorus maculatus)', 'plati tiger bumblebee (xiphophorus maculatus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000446', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Plati Panda (Xiphophorus maculatus)', 'plati panda (xiphophorus maculatus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000447', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Molinésia Velífera Verde (Poecilia velifera)', 'molinésia velífera verde (poecilia velifera)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000448', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Killifish Fundulopanchax Gardneri (Fundulopanchax gardneri)', 'killifish fundulopanchax gardneri (fundulopanchax gardneri)', 'LIVING', 'FRESHWATER_FISH', '260_killifish_gardneri_australe.jpg', 12, 35.00, 75.00, 114.29, '78900000449', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Killifish Aphyosemion Australe Orange (Aphyosemion australe)', 'killifish aphyosemion australe orange (aphyosemion australe)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000450', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tetra Imperador (Nematobrycon palmeri)', 'tetra imperador (nematobrycon palmeri)', 'LIVING', 'FRESHWATER_FISH', '261_tetra_imperador_palmeri.jpg', 12, 35.00, 75.00, 114.29, '78900000451', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tetra Imperador Black (Nematobrycon palmeri var. Black)', 'tetra imperador black (nematobrycon palmeri var. black)', 'LIVING', 'FRESHWATER_FISH', '262_tetra_imperador_black_inpaichthys.jpg', 12, 35.00, 75.00, 114.29, '78900000452', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tetra Kerri Super Blue (Inpaichthys kerri)', 'tetra kerri super blue (inpaichthys kerri)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000453', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tetra Limão (Hyphessobrycon pulchripinnis)', 'tetra limão (hyphessobrycon pulchripinnis)', 'LIVING', 'FRESHWATER_FISH', '263_tetra_limao_pristella.jpg', 12, 35.00, 75.00, 114.29, '78900000454', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tetra Pristella Raio-X (Pristella maxillaris)', 'tetra pristella raio-x (pristella maxillaris)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000455', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tetra Fantasma Negro (Hyphessobrycon megalopterus)', 'tetra fantasma negro (hyphessobrycon megalopterus)', 'LIVING', 'FRESHWATER_FISH', '264_tetra_fantasma_negro_vermelho.jpg', 12, 35.00, 75.00, 114.29, '78900000456', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tetra Fantasma Vermelho (Hyphessobrycon sweglesi)', 'tetra fantasma vermelho (hyphessobrycon sweglesi)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000457', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tetra do Congo (Phenacogrammus interruptus)', 'tetra do congo (phenacogrammus interruptus)', 'LIVING', 'FRESHWATER_FISH', '265_tetra_congo_phenacogrammus.jpg', 12, 35.00, 75.00, 114.29, '78900000458', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tetra Diamante (Moenkhausia pittieri)', 'tetra diamante (moenkhausia pittieri)', 'LIVING', 'FRESHWATER_FISH', '266_tetra_diamante_olho_de_fogo.jpg', 12, 35.00, 75.00, 114.29, '78900000459', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tetra Olho-de-Fogo (Hemigrammus ocellifer)', 'tetra olho-de-fogo (hemigrammus ocellifer)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000460', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tetra Bleeding Heart Coração Sangrento (Hyphessobrycon erythrostigma)', 'tetra bleeding heart coração sangrento (hyphessobrycon erythrostigma)', 'LIVING', 'FRESHWATER_FISH', '267_tetra_rosaceo_ornatus_bleeding_heart.jpg', 12, 35.00, 75.00, 114.29, '78900000461', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tetra Rosáceo (Hyphessobrycon rosaceus)', 'tetra rosáceo (hyphessobrycon rosaceus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000462', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tetra Ornatus Branco (Hyphessobrycon bentosi)', 'tetra ornatus branco (hyphessobrycon bentosi)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000463', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tetra Pinguim (Thayeria boehlkei)', 'tetra pinguim (thayeria boehlkei)', 'LIVING', 'FRESHWATER_FISH', '268_tetra_pinguim_glowlight_buenos_aires.jpg', 12, 35.00, 75.00, 114.29, '78900000464', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tetra Glowlight (Hemigrammus erythrozonus)', 'tetra glowlight (hemigrammus erythrozonus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000465', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tetra Buenos Aires (Hyphessobrycon anisitsi)', 'tetra buenos aires (hyphessobrycon anisitsi)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000466', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe-Lápis Vermelho (Nannostomus beckfordi)', 'peixe-lápis vermelho (nannostomus beckfordi)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000467', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe-Borboleta de Água Doce (Carnegiella strigata)', 'peixe-borboleta de água doce (carnegiella strigata)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000468', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Rásbora Mosquito Chili (Boraras brigittae)', 'rásbora mosquito chili (boraras brigittae)', 'LIVING', 'FRESHWATER_FISH', '270_rasbora_chili_brigittae_espei.jpg', 12, 35.00, 75.00, 114.29, '78900000469', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Rásbora Espei Lambchop (Trigonostigma espei)', 'rásbora espei lambchop (trigonostigma espei)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000470', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Barbo Denisoni Torpedo (Sahyadria denisonii)', 'barbo denisoni torpedo (sahyadria denisonii)', 'LIVING', 'FRESHWATER_FISH', '271_barbo_denisoni_torpedo.jpg', 12, 35.00, 75.00, 114.29, '78900000471', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Barbo Odessa (Pethia padamya)', 'barbo odessa (pethia padamya)', 'LIVING', 'FRESHWATER_FISH', '272_barbo_odessa_tinfoil_conchonius.jpg', 12, 35.00, 75.00, 114.29, '78900000472', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Barbo Rosy Conchonius (Pethia conchonius)', 'barbo rosy conchonius (pethia conchonius)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000473', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Barbo Tinfoil Barbo Prata (Barbonymus schwanenfeldii)', 'barbo tinfoil barbo prata (barbonymus schwanenfeldii)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000474', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tanichthys Neon Chinês Dourado (Tanichthys albonubes var. Gold)', 'tanichthys neon chinês dourado (tanichthys albonubes var. gold)', 'LIVING', 'FRESHWATER_FISH', '273_tanichthys_white_cloud_gold.jpg', 12, 35.00, 75.00, 114.29, '78900000475', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tanichthys Neon Chinês Clássico (Tanichthys albonubes)', 'tanichthys neon chinês clássico (tanichthys albonubes)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000476', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe Arco-Íris Boesemani (Melanotaenia boesemani)', 'peixe arco-íris boesemani (melanotaenia boesemani)', 'LIVING', 'FRESHWATER_FISH', '274_arco_iris_boesemani_praecox.jpg', 12, 35.00, 75.00, 114.29, '78900000477', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe Arco-Íris Neon Praecox (Melanotaenia praecox)', 'peixe arco-íris neon praecox (melanotaenia praecox)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000478', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe Arco-Íris Furcatus (Pseudomugil furcatus)', 'peixe arco-íris furcatus (pseudomugil furcatus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000479', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Bandeira Blue Paraíba (Pterophyllum scalare)', 'acará bandeira blue paraíba (pterophyllum scalare)', 'LIVING', 'FRESHWATER_FISH', '275_acara_bandeira_blue_paraiba_altum.webp', 12, 35.00, 75.00, 114.29, '78900000480', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Bandeira Avatar (Pterophyllum scalare)', 'acará bandeira avatar (pterophyllum scalare)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000481', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Altum Peruano (Pterophyllum scalare)', 'acará altum peruano (pterophyllum scalare)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000482', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Bandeira Gold Marble (Pterophyllum scalare)', 'acará bandeira gold marble (pterophyllum scalare)', 'LIVING', 'FRESHWATER_FISH', '276_acara_bandeira_red_devil_dumerilii.jpg', 12, 35.00, 75.00, 114.29, '78900000483', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Bandeira Red Devil (Pterophyllum scalare)', 'acará bandeira red devil (pterophyllum scalare)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000484', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Bandeira Leopoldi (Pterophyllum leopoldi)', 'acará bandeira leopoldi (pterophyllum leopoldi)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000485', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Disco Red Melon (Symphysodon aequifasciatus)', 'acará disco red melon (symphysodon aequifasciatus)', 'LIVING', 'FRESHWATER_FISH', '277_acara_disco_red_melon_marlboro.jpg', 12, 35.00, 75.00, 114.29, '78900000486', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Disco Red Cover (Symphysodon aequifasciatus)', 'acará disco red cover (symphysodon aequifasciatus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000487', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Disco Snakeskin (Symphysodon aequifasciatus)', 'acará disco snakeskin (symphysodon aequifasciatus)', 'LIVING', 'FRESHWATER_FISH', '278_acara_disco_snake_skin_checkerboard.jpg', 12, 35.00, 75.00, 114.29, '78900000488', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Disco Checkerboard (Symphysodon aequifasciatus)', 'acará disco checkerboard (symphysodon aequifasciatus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000489', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Disco Yellow Crystal (Symphysodon aequifasciatus)', 'acará disco yellow crystal (symphysodon aequifasciatus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000490', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ramirezi Balão Electric Blue (Mikrogeophagus ramirezi)', 'ramirezi balão electric blue (mikrogeophagus ramirezi)', 'LIVING', 'FRESHWATER_FISH', '279_ramirezi_balao_veu.jpg', 12, 35.00, 75.00, 114.29, '78900000491', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ramirezi Balão Gold (Mikrogeophagus ramirezi)', 'ramirezi balão gold (mikrogeophagus ramirezi)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000492', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ramirezi Véu Longfin (Mikrogeophagus ramirezi)', 'ramirezi véu longfin (mikrogeophagus ramirezi)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000493', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ramirezi Boliviano Papilocromis (Mikrogeophagus altispinosus)', 'ramirezi boliviano papilocromis (mikrogeophagus altispinosus)', 'LIVING', 'FRESHWATER_FISH', '280_ramirezi_boliviano_altispinosus.jpg', 12, 35.00, 75.00, 114.29, '78900000494', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Kribensis Comum (Pelvicachromis pulcher)', 'kribensis comum (pelvicachromis pulcher)', 'LIVING', 'FRESHWATER_FISH', '281_kribensis_laetacara_borellii.jpg', 12, 35.00, 75.00, 114.29, '78900000495', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Apistogramma Borellii Opal (Apistogramma borellii)', 'apistogramma borellii opal (apistogramma borellii)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000496', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Laetacara Curviceps Peixe-Bandeira Anão (Laetacara curviceps)', 'laetacara curviceps peixe-bandeira anão (laetacara curviceps)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000497', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Severo Gold (Heros efasciatus)', 'acará severo gold (heros efasciatus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000498', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Severo Red Spotted (Heros efasciatus)', 'acará severo red spotted (heros efasciatus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000499', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Festivum Mesonauta (Mesonauta festivus)', 'acará festivum mesonauta (mesonauta festivus)', 'LIVING', 'FRESHWATER_FISH', '283_acara_festivum_geophagus_joia.jpg', 12, 35.00, 75.00, 114.29, '78900000500', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Geophagus Sveni Tronco (Geophagus sveni)', 'geophagus sveni tronco (geophagus sveni)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000501', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ciclídeo Joia Vermelho (Hemichromis bimaculatus)', 'ciclídeo joia vermelho (hemichromis bimaculatus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000502', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Jack Dempsey Electric Blue (Rocio octofasciata var. Blue)', 'jack dempsey electric blue (rocio octofasciata var. blue)', 'LIVING', 'FRESHWATER_FISH', '284_jack_dempsey_electric_blue_acara.jpg', 12, 35.00, 75.00, 114.29, '78900000503', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Azul Electric Blue (Andinoacara pulcher var. Blue)', 'acará azul electric blue (andinoacara pulcher var. blue)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000504', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ciclídeo Flowerhorn Red Dragon (Amphilophus hybrid)', 'ciclídeo flowerhorn red dragon (amphilophus hybrid)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000505', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Papagaio Blood Parrot (Amphilophus citrinellus x Vieja)', 'acará papagaio blood parrot (amphilophus citrinellus x vieja)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000506', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ciclídeo Frontosa Moba Zaire (Cyphotilapia frontosa)', 'ciclídeo frontosa moba zaire (cyphotilapia frontosa)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000507', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Coridora Julii Leopardo (Corydoras julii)', 'coridora julii leopardo (corydoras julii)', 'LIVING', 'FRESHWATER_FISH', '286_coridora_julii_trilineatus_adolfoi.jpg', 12, 35.00, 75.00, 114.29, '78900000508', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Coridora Trilineatus (Corydoras trilineatus)', 'coridora trilineatus (corydoras trilineatus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000509', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Coridora Adolfoi (Corydoras adolfoi)', 'coridora adolfoi (corydoras adolfoi)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000510', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Coridora Pigmeu Anã (Corydoras pygmaeus)', 'coridora pigmeu anã (corydoras pygmaeus)', 'LIVING', 'FRESHWATER_FISH', '287_coridora_pigmeu_hastatus_habrosus.jpg', 12, 35.00, 75.00, 114.29, '78900000511', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Coridora Hastatus (Corydoras hastatus)', 'coridora hastatus (corydoras hastatus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000512', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Coridora Habrosus (Corydoras habrosus)', 'coridora habrosus (corydoras habrosus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000513', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cascudo Zebra Imperial L046 (Hypancistrus zebra)', 'cascudo zebra imperial l046 (hypancistrus zebra)', 'LIVING', 'FRESHWATER_FISH', '288_cascudo_zebra_imperial_queen_arabesque.jpg', 12, 35.00, 75.00, 114.29, '78900000514', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cascudo Queen Arabesque L260 (Hypancistrus sp.)', 'cascudo queen arabesque l260 (hypancistrus sp.)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000515', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cascudo Panaque Real L190 (Panaque nigrolineatus)', 'cascudo panaque real l190 (panaque nigrolineatus)', 'LIVING', 'FRESHWATER_FISH', '289_cascudo_panaque_real_l190.jpg', 12, 35.00, 75.00, 114.29, '78900000516', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cascudo Bola de Neve L102 (Hypancistrus inspector)', 'cascudo bola de neve l102 (hypancistrus inspector)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000517', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cascudo Melancia L330 (Panaque bathyphilus)', 'cascudo melancia l330 (panaque bathyphilus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000518', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cascudo Vampiro L240 (Leporacanthicus galaxias)', 'cascudo vampiro l240 (leporacanthicus galaxias)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000519', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cascudo Leopardo L114 (Pseudacanthicus leopardus)', 'cascudo leopardo l114 (pseudacanthicus leopardus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000520', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe-Galho Farlowella (Farlowella acus)', 'peixe-galho farlowella (farlowella acus)', 'LIVING', 'FRESHWATER_FISH', '291_farlowella_rineloricaria_whiptail.jpg', 12, 35.00, 75.00, 114.29, '78900000521', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Rineloricaria Red Leliella (Leliella heteroptera)', 'rineloricaria red leliella (leliella heteroptera)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000522', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ituí Cavalo Black Ghost (Apteronotus albifrons)', 'ituí cavalo black ghost (apteronotus albifrons)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000523', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cobrinha Kuhli (Pangio kuhlii)', 'cobrinha kuhli (pangio kuhlii)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000524', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Sewellia Hillstream Butterfly (Sewellia lineolata)', 'sewellia hillstream butterfly (sewellia lineolata)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000525', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Baiacu Anão Pea Puffer (Carinotetraodon travancoricus)', 'baiacu anão pea puffer (carinotetraodon travancoricus)', 'LIVING', 'FRESHWATER_FISH', '293_baiacu_anao_pea_puffer__Colomesus.jpg', 12, 35.00, 75.00, 114.29, '78900000526', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Baiacu Amazônico (Colomesus asellus)', 'baiacu amazônico (colomesus asellus)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000527', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Goby Abelha Bumblebee (Brachygobius doriae)', 'goby abelha bumblebee (brachygobius doriae)', 'LIVING', 'FRESHWATER_FISH', '294_goby_abelha_badis_peixe_vidro.jpg', 12, 35.00, 75.00, 114.29, '78900000528', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Dario Dario Scarlet Badis (Dario dario)', 'dario dario scarlet badis (dario dario)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000529', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe-Vidro Indiano (Parambassis ranga)', 'peixe-vidro indiano (parambassis ranga)', 'LIVING', 'FRESHWATER_FISH', NULL, 12, 35.00, 75.00, 114.29, '78900000530', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Caridina Crystal Red (Caridina logemanni)', 'camarão caridina crystal red (caridina logemanni)', 'LIVING', 'FRESHWATER_INVERTEBRATE', '295_camarao_caridina_crystal_red_crs.jpg', 12, 35.00, 75.00, 114.29, '78900000531', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Caridina Crystal Black (Caridina logemanni)', 'camarão caridina crystal black (caridina logemanni)', 'LIVING', 'FRESHWATER_INVERTEBRATE', '296_camarao_caridina_crystal_black_cbs.jpg', 12, 35.00, 75.00, 114.29, '78900000532', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Caridina Blue Bolt (Caridina cantonensis)', 'camarão caridina blue bolt (caridina cantonensis)', 'LIVING', 'FRESHWATER_INVERTEBRATE', '297_camarao_caridina_blue_bolt_taiwan_bee.jpg', 12, 35.00, 75.00, 114.29, '78900000533', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Caridina King Kong (Caridina cantonensis)', 'camarão caridina king kong (caridina cantonensis)', 'LIVING', 'FRESHWATER_INVERTEBRATE', NULL, 12, 35.00, 75.00, 114.29, '78900000534', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Amano Limpador (Caridina multidentata)', 'camarão amano limpador (caridina multidentata)', 'LIVING', 'FRESHWATER_INVERTEBRATE', '298_camarao_amano_fantasma.jpg', 12, 35.00, 75.00, 114.29, '78900000535', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Fantasma (Macrobrachium jelskii)', 'camarão fantasma (macrobrachium jelskii)', 'LIVING', 'FRESHWATER_INVERTEBRATE', NULL, 12, 35.00, 75.00, 114.29, '78900000536', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Filtrador Bambu (Atyopsis moluccensis)', 'camarão filtrador bambu (atyopsis moluccensis)', 'LIVING', 'FRESHWATER_INVERTEBRATE', '299_camarao_filtrador_bambu_gabonensis.jpg', 12, 35.00, 75.00, 114.29, '78900000537', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Filtrador Africano (Atya gabonensis)', 'camarão filtrador africano (atya gabonensis)', 'LIVING', 'FRESHWATER_INVERTEBRATE', NULL, 12, 35.00, 75.00, 114.29, '78900000538', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Caramujo Helena Assassino (Anentome helena)', 'caramujo helena assassino (anentome helena)', 'LIVING', 'FRESHWATER_INVERTEBRATE', '300_caramujo_assassino_helena_tylomelania.jpg', 12, 35.00, 75.00, 114.29, '78900000539', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Caramujo Coelho Rabbit Laranja (Tylomelania sp.)', 'caramujo coelho rabbit laranja (tylomelania sp.)', 'LIVING', 'FRESHWATER_INVERTEBRATE', NULL, 12, 35.00, 75.00, 114.29, '78900000540', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Macroalga Chaetomorpha Spaghetti (Chaetomorpha linum)', 'macroalga chaetomorpha spaghetti (chaetomorpha linum)', 'LIVING', 'PLANT', '301_alga_chaetomorpha_spaghetti.jpg', 12, 35.00, 75.00, 114.29, '78900000541', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Macroalga Atomic Broccoli (Gracilaria sp.)', 'macroalga atomic broccoli (gracilaria sp.)', 'LIVING', 'PLANT', '302_alga_atomic_broccoli_gracilaria.jpg', 12, 35.00, 75.00, 114.29, '78900000542', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Macroalga Dragon''s Breath (Halymenia durvillei)', 'macroalga dragon''s breath (halymenia durvillei)', 'LIVING', 'PLANT', '303_alga_dragons_breath_halymenia.jpg', 12, 35.00, 75.00, 114.29, '78900000543', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Macroalga Pink Dragon''s Tongue (Halymenia floresia)', 'macroalga pink dragon''s tongue (halymenia floresia)', 'LIVING', 'PLANT', '304_alga_pink_dragons_breath_floresia.jpg', 12, 35.00, 75.00, 114.29, '78900000544', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Macroalga Red Pom Pom (Gracilaria hayi)', 'macroalga red pom pom (gracilaria hayi)', 'LIVING', 'PLANT', '305_alga_pom_pom_gracilaria_hayi.jpg', 12, 35.00, 75.00, 114.29, '78900000545', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Macroalga Red Ogo (Gracilaria parvispora)', 'macroalga red ogo (gracilaria parvispora)', 'LIVING', 'PLANT', '306_alga_red_ogo_gracilaria_parvispora.jpg', 12, 35.00, 75.00, 114.29, '78900000546', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Macroalga Caulerpa Prolifera Folha Lisa (Caulerpa prolifera)', 'macroalga caulerpa prolifera folha lisa (caulerpa prolifera)', 'LIVING', 'PLANT', '307_alga_caulerpa_prolifera_seagrass.jpg', 12, 35.00, 75.00, 114.29, '78900000547', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Macroalga Feather Pena (Caulerpa sertularioides)', 'macroalga feather pena (caulerpa sertularioides)', 'LIVING', 'PLANT', '308_alga_caulerpa_sertularioides_feather.png', 12, 35.00, 75.00, 114.29, '78900000548', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Macroalga Caulerpa Taxifolia (Caulerpa taxifolia)', 'macroalga caulerpa taxifolia (caulerpa taxifolia)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000549', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Macroalga Grape Uva-do-Mar (Caulerpa racemosa)', 'macroalga grape uva-do-mar (caulerpa racemosa)', 'LIVING', 'PLANT', '309_alga_caulerpa_racemosa_grape.png', 12, 35.00, 75.00, 114.29, '78900000550', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Macroalga Caulerpa Lentillifera Caviar Verde (Caulerpa lentillifera)', 'macroalga caulerpa lentillifera caviar verde (caulerpa lentillifera)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000551', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Macroalga Calcária Halimeda (Halimeda incrassata)', 'macroalga calcária halimeda (halimeda incrassata)', 'LIVING', 'PLANT', '310_alga_halimeda_calcarea_money_plant.png', 12, 35.00, 75.00, 114.29, '78900000552', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Macroalga Shaving Brush (Penicillus capitatus)', 'macroalga shaving brush (penicillus capitatus)', 'LIVING', 'PLANT', '311_alga_shaving_brush_mermaids_fan.png', 12, 35.00, 75.00, 114.29, '78900000553', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Macroalga Mermaid''s Fan (Udotea spinulosa)', 'macroalga mermaid''s fan (udotea spinulosa)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000554', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Macroalga Blue Hypnea Iridescente (Hypnea pannosa)', 'macroalga blue hypnea iridescente (hypnea pannosa)', 'LIVING', 'PLANT', '312_alga_blue_hypnea_pannosa.jpg', 12, 35.00, 75.00, 114.29, '78900000555', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Macroalga Red Grape Kelp (Botryocladia occidentalis)', 'macroalga red grape kelp (botryocladia occidentalis)', 'LIVING', 'PLANT', '313_alga_red_grape_botryocladia.jpg', 12, 35.00, 75.00, 114.29, '78900000556', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Macroalga Ulva Alface-do-Mar (Ulva lactuca)', 'macroalga ulva alface-do-mar (ulva lactuca)', 'LIVING', 'PLANT', '314_alga_ulva_sea_lettuce_codium.jpg', 12, 35.00, 75.00, 114.29, '78900000557', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Macroalga Codium Verde (Codium fragile)', 'macroalga codium verde (codium fragile)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000558', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mangue Vermelho Propágulo (Rhizophora mangle)', 'mangue vermelho propágulo (rhizophora mangle)', 'LIVING', 'PLANT', '315_mangue_vermelho_red_mangrove.png', 12, 35.00, 75.00, 114.29, '78900000559', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anubias Nana (Anubias barteri var. nana)', 'anubias nana (anubias barteri var. nana)', 'LIVING', 'PLANT', '316_anubias_nana_clássica.jpg', 12, 35.00, 75.00, 114.29, '78900000560', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anubias Nana Petite (Anubias barteri var. nana ''Petite'')', 'anubias nana petite (anubias barteri var. nana ''petite'')', 'LIVING', 'PLANT', '317_anubias_nana_petite.jpg', 12, 35.00, 75.00, 114.29, '78900000561', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anubias Pangolino (Anubias barteri var. nana ''Pangolino'')', 'anubias pangolino (anubias barteri var. nana ''pangolino'')', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000562', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anubias Barteri Broad Leaf (Anubias barteri var. barteri)', 'anubias barteri broad leaf (anubias barteri var. barteri)', 'LIVING', 'PLANT', '318_anubias_barteri_broad_leaf_lanceolata.jpg', 12, 35.00, 75.00, 114.29, '78900000563', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anubias Barteri Coffeefolia (Anubias barteri var. caladiifolia ''Coffeefolia'')', 'anubias barteri coffeefolia (anubias barteri var. caladiifolia ''coffeefolia'')', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000564', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anubias Lanceolata (Anubias barteri var. glabra)', 'anubias lanceolata (anubias barteri var. glabra)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000565', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anubias Nana Pinto Variegada (Anubias barteri var. nana ''Pinto'')', 'anubias nana pinto variegada (anubias barteri var. nana ''pinto'')', 'LIVING', 'PLANT', '319_anubias_pinto_white_golden.jpg', 12, 35.00, 75.00, 114.29, '78900000566', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Anubias Golden Coin (Anubias barteri var. nana ''Golden Coin'')', 'anubias golden coin (anubias barteri var. nana ''golden coin'')', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000567', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Samambaia de Java Clássica (Microsorum pteropus)', 'samambaia de java clássica (microsorum pteropus)', 'LIVING', 'PLANT', '320_microsorum_pteropus_java_fern.jpg', 12, 35.00, 75.00, 114.29, '78900000568', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Samambaia de Java Narrow Leaf (Microsorum pteropus ''Narrow'')', 'samambaia de java narrow leaf (microsorum pteropus ''narrow'')', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000569', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Microsorum Windelov (Microsorum pteropus ''Windelov'')', 'microsorum windelov (microsorum pteropus ''windelov'')', 'LIVING', 'PLANT', '321_microsorum_windelov_trident.jpg', 12, 35.00, 75.00, 114.29, '78900000570', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Microsorum Trident (Microsorum pteropus ''Trident'')', 'microsorum trident (microsorum pteropus ''trident'')', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000571', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Bucephalandra Green Wavy (Bucephalandra pygmaea ''Wavy Green'')', 'bucephalandra green wavy (bucephalandra pygmaea ''wavy green'')', 'LIVING', 'PLANT', '322_bucephalandra_wavy_green_kedagang.jpg', 12, 35.00, 75.00, 114.29, '78900000572', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Bucephalandra Godzilla (Bucephalandra sp. ''Godzilla'')', 'bucephalandra godzilla (bucephalandra sp. ''godzilla'')', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000573', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Bucephalandra Brownie Ghost (Bucephalandra sp. ''Brownie Ghost'')', 'bucephalandra brownie ghost (bucephalandra sp. ''brownie ghost'')', 'LIVING', 'PLANT', '323_bucephalandra_brownie_ghost_red_mini.jpg', 12, 35.00, 75.00, 114.29, '78900000574', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Bucephalandra Red Mini (Bucephalandra sp. ''Red Mini'')', 'bucephalandra red mini (bucephalandra sp. ''red mini'')', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000575', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Samambaia do Congo Bolbitis (Bolbitis heudelotii)', 'samambaia do congo bolbitis (bolbitis heudelotii)', 'LIVING', 'PLANT', '324_bolbitis_heudelotii_pinnatifida.jpg', 12, 35.00, 75.00, 114.29, '78900000576', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Hygrophila Pinnatifida (Hygrophila pinnatifida)', 'hygrophila pinnatifida (hygrophila pinnatifida)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000577', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Musgo Christmas Moss (Vesicularia montagnei)', 'musgo christmas moss (vesicularia montagnei)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000578', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Musgo Flame Moss (Taxiphyllum alternans)', 'musgo flame moss (taxiphyllum alternans)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000579', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Marimo Ball Alga Musgo (Aegagropila linnaei)', 'marimo ball alga musgo (aegagropila linnaei)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000580', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Elódea Comum Anacharis (Egeria densa)', 'elódea comum anacharis (egeria densa)', 'LIVING', 'PLANT', '326_elodea_egeria_densa_anacharis.jpg', 12, 35.00, 75.00, 114.29, '78900000581', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Elódea Najas (Egeria najas)', 'elódea najas (egeria najas)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000582', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cabomba Verde (Cabomba caroliniana)', 'cabomba verde (cabomba caroliniana)', 'LIVING', 'PLANT', '327_cabomba_verde_aquatica_furcata.jpg', 12, 35.00, 75.00, 114.29, '78900000583', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cabomba Vermelha Furcata (Cabomba furcata)', 'cabomba vermelha furcata (cabomba furcata)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000584', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Rabo-de-Raposa Coontail (Ceratophyllum demersum)', 'rabo-de-raposa coontail (ceratophyllum demersum)', 'LIVING', 'PLANT', '328_rabo_de_raposa_ceratophyllum_demersum.jpg', 12, 35.00, 75.00, 114.29, '78900000585', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ambulia Sessiliflora (Limnophila sessiliflora)', 'ambulia sessiliflora (limnophila sessiliflora)', 'LIVING', 'PLANT', '329_ambulia_limnophila_sessiliflora_myriophyllum.jpg', 12, 35.00, 75.00, 114.29, '78900000586', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Mil-Folhas Verde (Myriophyllum aquaticum)', 'mil-folhas verde (myriophyllum aquaticum)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000587', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Hygrophila Polysperma Comum (Hygrophila polysperma)', 'hygrophila polysperma comum (hygrophila polysperma)', 'LIVING', 'PLANT', '330_hygrophila_polysperma_rosanervig_sunset.jpg', 12, 35.00, 75.00, 114.29, '78900000588', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Hygrophila Polysperma Rosanervig Sunset (Hygrophila polysperma ''Rosanervig'')', 'hygrophila polysperma rosanervig sunset (hygrophila polysperma ''rosanervig'')', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000589', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Hygrophila Corymbosa Rio (Hygrophila corymbosa)', 'hygrophila corymbosa rio (hygrophila corymbosa)', 'LIVING', 'PLANT', '331_hygrophila_corymbosa_rio_siamensis.jpg', 12, 35.00, 75.00, 114.29, '78900000590', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Hygrophila Corymbosa Compacta (Hygrophila corymbosa ''Compact'')', 'hygrophila corymbosa compacta (hygrophila corymbosa ''compact'')', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000591', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Hygrophila Difformis Sinema (Hygrophila difformis)', 'hygrophila difformis sinema (hygrophila difformis)', 'LIVING', 'PLANT', '332_hygrophila_difformis_sinema_samambaia.jpg', 12, 35.00, 75.00, 114.29, '78900000592', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Samambaia d''Água Ceratopteris (Ceratopteris thalictroides)', 'samambaia d''água ceratopteris (ceratopteris thalictroides)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000593', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Bacopa Caroliniana (Bacopa caroliniana)', 'bacopa caroliniana (bacopa caroliniana)', 'LIVING', 'PLANT', '333_bacopa_caroliniana_monnieri.jpg', 12, 35.00, 75.00, 114.29, '78900000594', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Bacopa Monnieri Moneywort (Bacopa monnieri)', 'bacopa monnieri moneywort (bacopa monnieri)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000595', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Rotala Rotundifolia Red (Rotala rotundifolia ''Red'')', 'rotala rotundifolia red (rotala rotundifolia ''red'')', 'LIVING', 'PLANT', '334_rotala_rotundifolia_red_hra_blood_red.jpg', 12, 35.00, 75.00, 114.29, '78900000596', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Rotala Rotundifolia H''ra (Rotala rotundifolia ''Hra'')', 'rotala rotundifolia h''ra (rotala rotundifolia ''hra'')', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000597', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Rotala Blood Red (Rotala rotundifolia ''Blood Red'')', 'rotala blood red (rotala rotundifolia ''blood red'')', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000598', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Rotala Green (Rotala rotundifolia ''Green'')', 'rotala green (rotala rotundifolia ''green'')', 'LIVING', 'PLANT', '335_rotala_green_indica_bonsai_wallichii.jpg', 12, 35.00, 75.00, 114.29, '78900000599', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Rotala Bonsai (Ammannia gracilis ''Bonsai'')', 'rotala bonsai (ammannia gracilis ''bonsai'')', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000600', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Rotala Wallichii Vermelha (Rotala wallichii)', 'rotala wallichii vermelha (rotala wallichii)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000601', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ludwigia Super Red Mini (Ludwigia palustris ''Super Red'')', 'ludwigia super red mini (ludwigia palustris ''super red'')', 'LIVING', 'PLANT', '336_ludwigia_sp_super_red_repens_rubin.jpg', 12, 35.00, 75.00, 114.29, '78900000602', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ludwigia Repens Rubin (Ludwigia repens ''Rubin'')', 'ludwigia repens rubin (ludwigia repens ''rubin'')', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000603', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ludwigia Glandulosa (Ludwigia glandulosa)', 'ludwigia glandulosa (ludwigia glandulosa)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000604', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Alternanthera Reineckii Mini (Alternanthera reineckii ''Mini'')', 'alternanthera reineckii mini (alternanthera reineckii ''mini'')', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000605', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Alternanthera Reineckii Rosanervig (Alternanthera reineckii ''Rosanervig'')', 'alternanthera reineckii rosanervig (alternanthera reineckii ''rosanervig'')', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000606', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Alternanthera Reineckii Rosaefolia (Alternanthera reineckii ''Rosaefolia'')', 'alternanthera reineckii rosaefolia (alternanthera reineckii ''rosaefolia'')', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000607', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Alternanthera Reineckii Lilacina (Alternanthera reineckii ''Lilacina'')', 'alternanthera reineckii lilacina (alternanthera reineckii ''lilacina'')', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000608', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Planta Amazonense Clássica (Echinodorus bleheri)', 'planta amazonense clássica (echinodorus bleheri)', 'LIVING', 'PLANT', '338_echinodorus_amazonense_bleheri.jpg', 12, 35.00, 75.00, 114.29, '78900000609', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Echinodorus Ozelot Red (Echinodorus ''Ozelot Red'')', 'echinodorus ozelot red (echinodorus ''ozelot red'')', 'LIVING', 'PLANT', '339_echinodorus_ozelot_red_rubin_reni.jpg', 12, 35.00, 75.00, 114.29, '78900000610', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Echinodorus Rubin (Echinodorus ''Rubin'')', 'echinodorus rubin (echinodorus ''rubin'')', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000611', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Echinodorus Reni (Echinodorus ''Reni'')', 'echinodorus reni (echinodorus ''reni'')', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000612', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Echinodorus Tenellus Comum (Helanthium tenellum)', 'echinodorus tenellus comum (helanthium tenellum)', 'LIVING', 'PLANT', '340_echinodorus_tenellus_helanthium_amano.jpg', 12, 35.00, 75.00, 114.29, '78900000613', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Echinodorus Tenellus Amano Red (Helanthium tenellum ''Red'')', 'echinodorus tenellus amano red (helanthium tenellum ''red'')', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000614', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Vallisneria Gigantea Americana (Vallisneria americana)', 'vallisneria gigantea americana (vallisneria americana)', 'LIVING', 'PLANT', '341_vallisneria_americana_gigantea_nana.jpg', 12, 35.00, 75.00, 114.29, '78900000615', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Vallisneria Nana Australiana (Vallisneria nana)', 'vallisneria nana australiana (vallisneria nana)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000616', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Vallisneria Saca-Rolhas Spiralis (Vallisneria spiralis ''Tortifolia'')', 'vallisneria saca-rolhas spiralis (vallisneria spiralis ''tortifolia'')', 'LIVING', 'PLANT', '342_vallisneria_spiralis_corkscrew_saca_rolha.jpg', 12, 35.00, 75.00, 114.29, '78900000617', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Sagittaria Subulata Anã (Sagittaria subulata)', 'sagittaria subulata anã (sagittaria subulata)', 'LIVING', 'PLANT', '343_sagittaria_subulata_blyxa_japonica.jpg', 12, 35.00, 75.00, 114.29, '78900000618', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Blyxa Japonica (Blyxa japonica)', 'blyxa japonica (blyxa japonica)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000619', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cryptocoryne Wendtii Brown (Cryptocoryne wendtii ''Brown'')', 'cryptocoryne wendtii brown (cryptocoryne wendtii ''brown'')', 'LIVING', 'PLANT', '344_cryptocoryne_wendtii_brown_tropica_beckettii.jpg', 12, 35.00, 75.00, 114.29, '78900000620', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cryptocoryne Beckettii Petchii (Cryptocoryne beckettii)', 'cryptocoryne beckettii petchii (cryptocoryne beckettii)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000621', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cryptocoryne Wendtii Green (Cryptocoryne wendtii ''Green'')', 'cryptocoryne wendtii green (cryptocoryne wendtii ''green'')', 'LIVING', 'PLANT', '345_cryptocoryne_wendtii_green_parva_balansae.jpg', 12, 35.00, 75.00, 114.29, '78900000622', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cryptocoryne Parva Mini (Cryptocoryne parva)', 'cryptocoryne parva mini (cryptocoryne parva)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000623', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cryptocoryne Balansae Crispatula (Cryptocoryne crispatula var. balansae)', 'cryptocoryne balansae crispatula (cryptocoryne crispatula var. balansae)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000624', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cryptocoryne Pink Flamingo (Cryptocoryne wendtii ''Pink Flamingo'')', 'cryptocoryne pink flamingo (cryptocoryne wendtii ''pink flamingo'')', 'LIVING', 'PLANT', '346_cryptocoryne_pink_flamingo_panther.jpg', 12, 35.00, 75.00, 114.29, '78900000625', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Cryptocoryne Pink Panther (Cryptocoryne spiralis ''Pink Panther'')', 'cryptocoryne pink panther (cryptocoryne spiralis ''pink panther'')', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000626', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Nymphaea Rubra Red Tiger Lotus (Nymphaea zenkeri)', 'nymphaea rubra red tiger lotus (nymphaea zenkeri)', 'LIVING', 'PLANT', '347_nymphaea_rubra_red_tiger_lotus_aponogeton.jpg', 12, 35.00, 75.00, 114.29, '78900000627', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Crinum Calamistratum Ondulada (Crinum calamistratum)', 'crinum calamistratum ondulada (crinum calamistratum)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000628', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Carpete Monte Carlo (Micranthemum tweediei)', 'carpete monte carlo (micranthemum tweediei)', 'LIVING', 'PLANT', '348_monte_carlo_micranthemum_tweediei.jpg', 12, 35.00, 75.00, 114.29, '78900000629', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Carpete Cuba HC (Hemianthus callitrichoides)', 'carpete cuba hc (hemianthus callitrichoides)', 'LIVING', 'PLANT', '349_hemianthus_cuba_hc_glossostigma.jpg', 12, 35.00, 75.00, 114.29, '78900000630', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Carpete Glossostigma Elatinoides (Glossostigma elatinoides)', 'carpete glossostigma elatinoides (glossostigma elatinoides)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000631', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Carpete Eleocharis Minima (Eleocharis minima)', 'carpete eleocharis minima (eleocharis minima)', 'LIVING', 'PLANT', '350_eleocharis_minima_parvula_hairgrass.jpg', 12, 35.00, 75.00, 114.29, '78900000632', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Carpete Eleocharis Vivipara (Eleocharis vivipara)', 'carpete eleocharis vivipara (eleocharis vivipara)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000633', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Staurogyne Repens Rasteira (Staurogyne repens)', 'staurogyne repens rasteira (staurogyne repens)', 'LIVING', 'PLANT', '351_staurogyne_repens_pogostemon_helferi.jpg', 12, 35.00, 75.00, 114.29, '78900000634', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Pogostemon Helferi Downoi (Pogostemon helferi)', 'pogostemon helferi downoi (pogostemon helferi)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000635', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Hydrocotyle Tripartita Trevo Japonês (Hydrocotyle tripartita)', 'hydrocotyle tripartita trevo japonês (hydrocotyle tripartita)', 'LIVING', 'PLANT', '352_hydrocotyle_tripartita_japan_leucocephala.jpg', 12, 35.00, 75.00, 114.29, '78900000636', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Hydrocotyle Leucocephala Trevo Redondo (Hydrocotyle leucocephala)', 'hydrocotyle leucocephala trevo redondo (hydrocotyle leucocephala)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000637', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Grama Brasileira Lilaeopsis (Lilaeopsis brasiliensis)', 'grama brasileira lilaeopsis (lilaeopsis brasiliensis)', 'LIVING', 'PLANT', '353_lilaeopsis_brasiliensis_marsilea_hirsuta.jpg', 12, 35.00, 75.00, 114.29, '78900000638', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Marsilea Hirsuta Trevo Quatro Folhas (Marsilea hirsuta)', 'marsilea hirsuta trevo quatro folhas (marsilea hirsuta)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000639', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Lobelia Cardinalis Comum (Lobelia cardinalis)', 'lobelia cardinalis comum (lobelia cardinalis)', 'LIVING', 'PLANT', '354_lobelia_cardinalis_mini.jpg', 12, 35.00, 75.00, 114.29, '78900000640', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Lobelia Cardinalis Mini (Lobelia cardinalis ''Mini'')', 'lobelia cardinalis mini (lobelia cardinalis ''mini'')', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000641', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Lagenandra Meeboldii Red (Lagenandra meeboldii ''Red'')', 'lagenandra meeboldii red (lagenandra meeboldii ''red'')', 'LIVING', 'PLANT', '355_lagenandra_meeboldii_red_keralensis.jpg', 12, 35.00, 75.00, 114.29, '78900000642', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Lagenandra Keralensis (Lagenandra keralensis)', 'lagenandra keralensis (lagenandra keralensis)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000643', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Planta Flutuante Salvínia Comum (Salvinia auriculata)', 'planta flutuante salvínia comum (salvinia auriculata)', 'LIVING', 'PLANT', '356_salvinia_auriculata_cucullata_minima.jpg', 12, 35.00, 75.00, 114.29, '78900000644', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Planta Flutuante Salvínia Orelha-de-Onça (Salvinia cucullata)', 'planta flutuante salvínia orelha-de-onça (salvinia cucullata)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000645', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Alface d''Água Anã (Pistia stratiotes)', 'alface d''água anã (pistia stratiotes)', 'LIVING', 'PLANT', '357_pistia_stratiotes_alface_dagua_aguape.jpg', 12, 35.00, 75.00, 114.29, '78900000646', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Aguapé Flutuante (Eichhornia crassipes)', 'aguapé flutuante (eichhornia crassipes)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000647', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Phyllanthus Fluitans Flutuante Vermelha (Phyllanthus fluitans)', 'phyllanthus fluitans flutuante vermelha (phyllanthus fluitans)', 'LIVING', 'PLANT', '358_phyllanthus_fluitans_red_root_floater.jpg', 12, 35.00, 75.00, 114.29, '78900000648', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Amazon Frogbit (Limnobium laevigatum)', 'amazon frogbit (limnobium laevigatum)', 'LIVING', 'PLANT', '359_limnobium_laevigatum_amazon_frogbit.jpg', 12, 35.00, 75.00, 114.29, '78900000649', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Amor-de-Peixe Hydrocleys (Hydrocleys nymphoides)', 'amor-de-peixe hydrocleys (hydrocleys nymphoides)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000650', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Lentilha d''Água (Lemna minor)', 'lentilha d''água (lemna minor)', 'LIVING', 'PLANT', '360_lemna_minor_lentilha_dagua_azolla.jpg', 12, 35.00, 75.00, 114.29, '78900000651', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Azolla Flutuante Vermelha (Azolla caroliniana)', 'azolla flutuante vermelha (azolla caroliniana)', 'LIVING', 'PLANT', NULL, 12, 35.00, 75.00, 114.29, '78900000652', true, CURRENT_TIMESTAMP - INTERVAL '40 days');

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

-- Pedido 5: Beatriz Vasconcelos (Zoanthus Watermelon + Artemia Congelada) - PAGO
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
