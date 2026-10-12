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
INSERT INTO products (name, normalized_name, type, quantity, cost_price, sale_price, profit_margin, barcode, active, created_at)
VALUES
    -- Seres Vivos Marinhos
    ('Peixe-palhaço Ocellaris (Amphiprion ocellaris)', 'peixe-palhaço ocellaris (amphiprion ocellaris)', 'LIVING', 24, 45.00, 76.50, 70.00, '789000000001', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Peixe-leão (Pterois volitans)', 'peixe-leão (pterois volitans)', 'LIVING', 6, 120.00, 204.00, 70.00, '789000000002', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Blue Tang (Paracanthurus hepatus)', 'blue tang (paracanthurus hepatus)', 'LIVING', 8, 280.00, 476.00, 70.00, '789000000003', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Yellow Tang (Zebrasoma flavescens)', 'yellow tang (zebrasoma flavescens)', 'LIVING', 4, 650.00, 1105.00, 70.00, '789000000004', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Gramma Loreto', 'gramma loreto', 'LIVING', 10, 110.00, 187.00, 70.00, '789000000005', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),

    -- Seres Vivos Água Doce
    ('Platy Sunset', 'platy sunset', 'LIVING', 45, 4.00, 10.00, 150.00, '789000000006', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Betta Splendens Halfmoon', 'betta splendens halfmoon', 'LIVING', 18, 15.00, 35.00, 133.33, '789000000007', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Tetra Neon Cardinal (Paracheirodon axelrodi)', 'tetra neon cardinal (paracheirodon axelrodi)', 'LIVING', 80, 2.50, 7.00, 180.00, '789000000008', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Acará Disco Blue Diamond', 'acará disco blue diamond', 'LIVING', 5, 140.00, 280.00, 100.00, '789000000009', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Corydora Sterbai', 'corydora sterbai', 'LIVING', 22, 12.00, 25.00, 108.33, '789000000010', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),

    -- Corais e Invertebrados
    ('Coral Hammer Verde Metálico (Euphyllia ancora)', 'coral hammer verde metálico (euphyllia ancora)', 'LIVING', 7, 90.00, 160.00, 77.78, '789000000011', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Coral Frogspawn Ultra Green', 'coral frogspawn ultra green', 'LIVING', 5, 140.00, 250.00, 78.57, '789000000012', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Coral Torch Gold Dourado', 'coral torch gold dourado', 'LIVING', 3, 350.00, 600.00, 71.43, '789000000013', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Muda Zoanthus Watermelon', 'muda zoanthus watermelon', 'LIVING', 12, 40.00, 80.00, 100.00, '789000000014', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Camarão Bailarino (Lysmata wurdemanni)', 'camarão bailarino (lysmata wurdemanni)', 'LIVING', 15, 25.00, 50.00, 100.00, '789000000015', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),

    -- Rações e Nutrição
    ('Ração Marine Flakes 100g', 'ração marine flakes 100g', 'PRODUCT', 35, 25.00, 45.00, 80.00, '789000000016', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ração Nori Alga Marinha 50 Folhas', 'ração nori alga marinha 50 folhas', 'PRODUCT', 20, 30.00, 55.00, 83.33, '789000000017', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Ração Spirulina Wafers Fundo 80g', 'ração spirulina wafers fundo 80g', 'PRODUCT', 28, 22.00, 42.00, 90.91, '789000000018', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Artemia Salina Congelada 100g', 'artemia salina congelada 100g', 'PRODUCT', 40, 12.00, 25.00, 108.33, '789000000019', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),

    -- Sais e Químicos
    ('Sal Sintético Red Sea Coral Pro 7kg', 'sal sintético red sea coral pro 7kg', 'PRODUCT', 12, 160.00, 260.00, 62.50, '789000000020', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Água Salgada Pronta para TPA (Galão 20L)', 'água salgada pronta para tpa (galão 20l)', 'PRODUCT', 50, 10.00, 28.00, 180.00, '789000000021', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Teste de Nitrato (NO3) Salifert', 'teste de nitrato (no3) salifert', 'PRODUCT', 9, 75.00, 130.00, 73.33, '789000000022', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Teste de Fosfato (PO4) Salifert', 'teste de fosfato (po4) salifert', 'PRODUCT', 8, 80.00, 140.00, 75.00, '789000000023', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Carvão Ativado Especial Reef 500g', 'carvão ativado especial reef 500g', 'PRODUCT', 25, 35.00, 65.00, 85.71, '789000000024', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),

    -- Equipamentos
    ('Filtro Hang On 500L/h Atman', 'filtro hang on 500l/h atman', 'PRODUCT', 8, 80.00, 145.00, 81.25, '789000000025', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Termostato 100W com Protetor', 'termostato 100w com protetor', 'PRODUCT', 14, 55.00, 105.00, 90.91, '789000000026', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Skimmer Interno Bubble Magus Curve 5', 'skimmer interno bubble magus curve 5', 'PRODUCT', 3, 720.00, 1190.00, 65.28, '789000000027', true, CURRENT_TIMESTAMP - INTERVAL '40 days'),
    ('Bomba de Circulação Jebao 4000L/h', 'bomba de circulação jebao 4000l/h', 'PRODUCT', 6, 210.00, 360.00, 71.43, '789000000028', true, CURRENT_TIMESTAMP - INTERVAL '40 days');

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
