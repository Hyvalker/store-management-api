INSERT INTO products (
    name,
    normalized_name,
    type,
    quantity,
    cost_price,
    sale_price,
    profit_margin,
    barcode,
    active,
    created_at
)
VALUES
    (
        'Peixe-palhaço (Amphiprion ocellaris)',
        'peixe-palhaço (amphiprion ocellaris)',
        'LIVING',
        10,
        50.00,
        85.00,
        70.00,
        '789000000001',
        true,
        CURRENT_TIMESTAMP
    ),
    (
        'Peixe-leão (Pterois volitans)',
        'peixe-leão (pterois volitans)',
        'LIVING',
        5,
        120.00,
        204.00,
        70.00,
        '789000000002',
        true,
        CURRENT_TIMESTAMP
    ),
    (
        'Coral Hammer (Euphyllia ancora)',
        'coral hammer (euphyllia ancora)',
        'LIVING',
        8,
        90.00,
        153.00,
        70.00,
        '789000000003',
        true,
        CURRENT_TIMESTAMP
    ),
    (
        'Ração Marinha 100g',
        'ração marinha 100g',
        'PRODUCT',
        20,
        25.00,
        42.50,
        70.00,
        '789000000004',
        true,
        CURRENT_TIMESTAMP
    ),
    (
        'Filtro Hang On 500L/h',
        'filtro hang on 500l/h',
        'PRODUCT',
        6,
        80.00,
        136.00,
        70.00,
        '789000000005',
        true,
        CURRENT_TIMESTAMP
    ),
    (
        'Termostato 100W',
        'termostato 100w',
        'PRODUCT',
        10,
        60.00,
        102.00,
        70.00,
        NULL,
        true,
        CURRENT_TIMESTAMP
    );