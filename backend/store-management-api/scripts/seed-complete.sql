-- =========================================================================
-- BAMBA AQUA - Script de Carga Completa para Testes (UTF-8)
-- Limpa e popula Produtos, Clientes, Movimentações, Perdas e Pedidos
-- =========================================================================

-- 1. LIMPEZA TOTAL COM REINÍCIO DOS IDS
TRUNCATE TABLE
    order_items,
    orders,
    stock_movements,
    products,
    users
RESTART IDENTITY CASCADE;

-- 2. CADASTRO DE CLIENTES (AQUARISTAS)
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

-- 3. CADASTRO DE PRODUTOS E SERES VIVOS DA BAMBA AQUA
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

-- 4. REGISTRO DE PERDAS BIOLÓGICAS (LOSS) PARA O DASHBOARD E SIMULADOR
INSERT INTO stock_movements (product_id, quantity, cost_price, sale_price, profit_margin, reason, type, created_at)
VALUES
    (12, 1, 140.00, 250.00, 78.57, 'Morte biológica - choque de temperatura no coral Frogspawn', 'LOSS', CURRENT_TIMESTAMP - INTERVAL '12 days'),
    (3, 1, 280.00, 476.00, 70.00, 'Morte biológica - infecção parasitária por Oodinium no Blue Tang', 'LOSS', CURRENT_TIMESTAMP - INTERVAL '18 days'),
    (1, 2, 45.00, 76.50, 70.00, 'Morte na quarentena pós-chegada de importação', 'LOSS', CURRENT_TIMESTAMP - INTERVAL '25 days');

-- 5. HISTÓRICO REALISTA DE VENDAS (ORDERS & ORDER_ITEMS) DISTRIBUÍDOS NOS ÚLTIMOS 30 DIAS
-- Venda 1: Marcelo Camargo (Água Salgada + Ração) - PAGA
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (101.00, CURRENT_TIMESTAMP - INTERVAL '28 days', 'PAID', 1, NULL);
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (2, 28.00, 10.00, 56.00, 1, 21),
    (1, 45.00, 25.00, 45.00, 1, 16);

-- Venda 2: Camila Nogueira (Peixe-palhaço + Sal) - PAGA
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (336.50, CURRENT_TIMESTAMP - INTERVAL '26 days', 'PAID', 2, NULL);
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (1, 76.50, 45.00, 76.50, 2, 1),
    (1, 260.00, 160.00, 260.00, 2, 20);

-- Venda 3: Balcão Avulso (Platys + Ração de Fundo) - PAGA
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (102.00, CURRENT_TIMESTAMP - INTERVAL '24 days', 'PAID', NULL, 'Carlos Balcão');
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (6, 10.00, 4.00, 60.00, 3, 6),
    (1, 42.00, 22.00, 42.00, 3, 18);

-- Venda 4: Rodrigo Albuquerque (Coral Hammer + Teste Nitrato) - PAGA
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (290.00, CURRENT_TIMESTAMP - INTERVAL '22 days', 'PAID', 3, NULL);
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (1, 160.00, 90.00, 160.00, 4, 11),
    (1, 130.00, 75.00, 130.00, 4, 22);

-- Venda 5: Beatriz Vasconcelos (Muda Zoanthus + Artemia Congelada) - PAGA
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (130.00, CURRENT_TIMESTAMP - INTERVAL '20 days', 'PAID', 4, NULL);
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (1, 80.00, 40.00, 80.00, 5, 14),
    (2, 25.00, 12.00, 50.00, 5, 19);

-- Venda 6: Balcão Avulso (Tetras Neon - Venda de Volume) - PAGA
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (105.00, CURRENT_TIMESTAMP - INTERVAL '18 days', 'PAID', NULL, 'Cliente Anônimo');
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (15, 7.00, 2.50, 105.00, 6, 8);

-- Venda 7: Lucas Ferraz (Betta Halfmoon + Termostato) - PAGA
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (140.00, CURRENT_TIMESTAMP - INTERVAL '16 days', 'PAID', 5, NULL);
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (1, 35.00, 15.00, 35.00, 7, 7),
    (1, 105.00, 55.00, 105.00, 7, 26);

-- Venda 8: Felipe Guimarães (Torch Gold + Água Salgada) - PAGA
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (656.00, CURRENT_TIMESTAMP - INTERVAL '14 days', 'PAID', 7, NULL);
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (1, 600.00, 350.00, 600.00, 8, 13),
    (2, 28.00, 10.00, 56.00, 8, 21);

-- Venda 9: Balcão Avulso (Ração Marine Flakes + Nori) - PAGA
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (100.00, CURRENT_TIMESTAMP - INTERVAL '12 days', 'PAID', NULL, 'Thiago Balcão');
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (1, 45.00, 25.00, 45.00, 9, 16),
    (1, 55.00, 30.00, 55.00, 9, 17);

-- Venda 10: Mariana Silveira (Blue Tang + Ração Marine) - PAGA
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (521.00, CURRENT_TIMESTAMP - INTERVAL '10 days', 'PAID', 8, NULL);
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (1, 476.00, 280.00, 476.00, 10, 3),
    (1, 45.00, 25.00, 45.00, 10, 16);

-- Venda 11: Juliana Menezes (Platys + Carvão Ativado) - PAGA
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (145.00, CURRENT_TIMESTAMP - INTERVAL '8 days', 'PAID', 6, NULL);
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (8, 10.00, 4.00, 80.00, 11, 6),
    (1, 65.00, 35.00, 65.00, 11, 24);

-- Venda 12: Balcão Avulso (Peixes-palhaço casal + Camarão) - PAGA
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (203.00, CURRENT_TIMESTAMP - INTERVAL '6 days', 'PAID', NULL, 'André');
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (2, 76.50, 45.00, 153.00, 12, 1),
    (1, 50.00, 25.00, 50.00, 12, 15);

-- Venda 13: Rodrigo Albuquerque (Filtro Hang On) - PAGA
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (145.00, CURRENT_TIMESTAMP - INTERVAL '4 days', 'PAID', 3, NULL);
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (1, 145.00, 80.00, 145.00, 13, 25);

-- Venda 14: Camila Nogueira (Tetras Neon + Corydoras) - PAGA
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (145.00, CURRENT_TIMESTAMP - INTERVAL '2 days', 'PAID', 2, NULL);
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (10, 7.00, 2.50, 70.00, 14, 8),
    (3, 25.00, 12.00, 75.00, 14, 10);

-- Venda 15: Pedido Pendente para teste de checkout no balcão
INSERT INTO orders (total_price, created_at, status, user_id, unregistered_customer_name)
VALUES (205.00, CURRENT_TIMESTAMP - INTERVAL '3 hours', 'PENDING', 1, NULL);
INSERT INTO order_items (quantity, unit_price, unit_cost, subtotal, order_id, product_id)
VALUES 
    (1, 160.00, 90.00, 160.00, 15, 11),
    (1, 45.00, 25.00, 45.00, 15, 16);

-- FIM DO SCRIPT
