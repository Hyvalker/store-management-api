#!/bin/bash
# =========================================================================
# BAMBA AQUA - Script para Executar Seed no Contêiner Docker (Bash)
# =========================================================================

echo "=========================================================="
echo "   BAMBA AQUA • EXECUTANDO SEED NO CONTÊINER DOCKER"
echo "=========================================================="

docker compose exec -T db psql -U postgres -d storedb -f /docker-entrypoint-initdb.d/01-init.sql

if [ $? -eq 0 ]; then
    echo ""
    echo "✔ Seed executado com sucesso no Docker!"
    docker compose exec -T db psql -U postgres -d storedb -c "SELECT 'products' as tabela, count(*) as total from products UNION ALL SELECT 'users', count(*) from users UNION ALL SELECT 'aquariums', count(*) from aquariums UNION ALL SELECT 'orders', count(*) from orders;"
else
    echo ""
    echo "✖ Falha ao executar o seed no Docker. Verifique se o contêiner 'db' está rodando."
fi
