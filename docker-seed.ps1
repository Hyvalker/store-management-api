# =========================================================================
# BAMBA AQUA - Script para Executar Seed no Conteiner Docker
# Executa a carga completa de operadores, clientes (Marcelo), aquarios,
# testes quimicos e catalogo de produtos/animais dentro do conteiner db.
# =========================================================================

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   BAMBA AQUA - EXECUTANDO SEED NO CONTEINER DOCKER" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

docker compose exec -T db psql -U postgres -d storedb -f /docker-entrypoint-initdb.d/01-init.sql

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "[OK] Seed executado com sucesso no Docker!" -ForegroundColor Green
    Write-Host "Resumo dos dados populados:" -ForegroundColor Yellow
    docker compose exec -T db psql -U postgres -d storedb -c "SELECT 'products' as tabela, count(*) as total from products UNION ALL SELECT 'users', count(*) from users UNION ALL SELECT 'aquariums', count(*) from aquariums UNION ALL SELECT 'orders', count(*) from orders;"
} else {
    Write-Host ""
    Write-Host "[ERRO] Falha ao executar o seed no Docker. Verifique se o conteiner 'db' esta rodando (docker compose ps)." -ForegroundColor Red
}
