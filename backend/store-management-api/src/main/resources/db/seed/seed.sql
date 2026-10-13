-- =========================================================================
-- BAMBA AQUA - Seed Básico de Produtos
-- =========================================================================

INSERT INTO products (
    name,
    normalized_name,
    type,
    sub_category,
    image_slug,
    quantity,
    cost_price,
    sale_price,
    profit_margin,
    barcode,
    active,
    created_at
)
VALUES
    ('Peixe-palhaço Ocellaris (Amphiprion ocellaris)', 'peixe-palhaço ocellaris (amphiprion ocellaris)', 'LIVING', 'MARINE_FISH', 'palhaco-ocellaris-comum.jpg', 24, 45.00, 76.50, 70.00, '789000000001', true, CURRENT_TIMESTAMP),
    ('Peixe-leão (Pterois volitans)', 'peixe-leão (pterois volitans)', 'LIVING', 'MARINE_FISH', 'peixe-leao.jpg', 6, 120.00, 204.00, 70.00, '789000000002', true, CURRENT_TIMESTAMP),
    ('Blue Tang (Paracanthurus hepatus)', 'blue tang (paracanthurus hepatus)', 'LIVING', 'MARINE_FISH', 'tang-hepatus.jpg', 8, 280.00, 476.00, 70.00, '789000000003', true, CURRENT_TIMESTAMP),
    ('Yellow Tang (Zebrasoma flavescens)', 'yellow tang (zebrasoma flavescens)', 'LIVING', 'MARINE_FISH', 'tang-amarelo.jpg', 4, 650.00, 1105.00, 70.00, '789000000004', true, CURRENT_TIMESTAMP),
    ('Coral Hammer Verde Metálico (Euphyllia ancora)', 'coral hammer verde metálico (euphyllia ancora)', 'LIVING', 'CORAL', 'hammer-coral-branching.jpg', 7, 90.00, 160.00, 77.78, '789000000011', true, CURRENT_TIMESTAMP),
    ('Muda Zoanthus Rasta (Zoanthus sp.)', 'muda zoanthus rasta (zoanthus sp.)', 'LIVING', 'CORAL', 'zoanthus-rasta.webp', 10, 45.00, 95.00, 111.11, '789000000029', true, CURRENT_TIMESTAMP),
    ('Muda Zoanthus Red Bam Bam (Zoanthus sp.)', 'muda zoanthus red bam bam (zoanthus sp.)', 'LIVING', 'CORAL', 'zoanthus-red-bam-bam.webp', 8, 50.00, 99.00, 98.00, '789000000030', true, CURRENT_TIMESTAMP),
    ('Anêmona Carpet Green (Stichodactyla haddoni)', 'anêmona carpet green (stichodactyla haddoni)', 'LIVING', 'CORAL', 'anemona-carpet-green.jpg', 3, 250.00, 450.00, 80.00, '789000000044', true, CURRENT_TIMESTAMP),
    ('Paguro de Patas Amarelas (Clibanarius antillensis)', 'paguro de patas amarelas (clibanarius antillensis)', 'LIVING', 'INVERTEBRATE', 'paguro-pata-amarela.jpg', 60, 3.50, 8.00, 128.57, '789000000049', true, CURRENT_TIMESTAMP),
    ('Turbo Snail (Turbo fluctuosus)', 'turbo snail (turbo fluctuosus)', 'LIVING', 'INVERTEBRATE', 'turbo-snail.jpg', 50, 4.50, 10.00, 122.22, '789000000052', true, CURRENT_TIMESTAMP),
    ('Ração Marine Flakes 100g', 'ração marine flakes 100g', 'PRODUCT', 'SUPPLY', NULL, 35, 25.00, 45.00, 80.00, '789000000016', true, CURRENT_TIMESTAMP),
    ('Filtro Hang On 500L/h Atman', 'filtro hang on 500l/h atman', 'PRODUCT', 'EQUIPMENT', NULL, 8, 80.00, 145.00, 81.25, '789000000025', true, CURRENT_TIMESTAMP);