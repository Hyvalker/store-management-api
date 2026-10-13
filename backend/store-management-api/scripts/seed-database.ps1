# =========================================================================
# BAMBA AQUA - Script de Execução de Seed do Banco de Dados PostgreSQL
# Popula mais de 100 espécies de seres vivos (Zoanthus, Anêmonas, Invertebrados,
# Peixes Marinhos, Corais, Água Doce) e produtos para testes completos.
# =========================================================================

$ErrorActionPreference = "Stop"

$psqlPath = "C:\Program Files\PostgreSQL\18\bin\psql.exe"
if (-not (Test-Path $psqlPath)) {
    # Tentar encontrar psql no PATH ou outras versões
    $psqlCmd = Get-Command psql -ErrorAction SilentlyContinue
    if ($null -ne $psqlCmd) {
        $psqlPath = $psqlCmd.Source
    } else {
        Write-Error "PostgreSQL (psql.exe) não foi encontrado no caminho padrão ($psqlPath)."
        exit 1
    }
}

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$sqlFile = Join-Path $scriptDir "seed-complete.sql"

if (-not (Test-Path $sqlFile)) {
    Write-Error "Arquivo SQL não encontrado: $sqlFile"
    exit 1
}

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   BAMBA AQUA • EXECUTANDO SEED COMPLETO DO BANCO DE DADOS" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "PostgreSQL: $psqlPath"
Write-Host "Banco: storedb (porta 5432)"
Write-Host "Arquivo: $sqlFile"
Write-Host ""

$env:PGPASSWORD = "Ft22N*644p"

try {
    & $psqlPath -h localhost -p 5432 -U postgres -d storedb -f $sqlFile --quiet
    
    Write-Host "----------------------------------------------------------" -ForegroundColor Green
    Write-Host " Seed executado com SUCESSO!" -ForegroundColor Green
    Write-Host "----------------------------------------------------------" -ForegroundColor Green

    # Consulta rápida de conferência
    & $psqlPath -h localhost -p 5432 -U postgres -d storedb -c "SELECT sub_category, COUNT(*) as total_itens FROM products GROUP BY sub_category ORDER BY total_itens DESC;"
}
catch {
    Write-Error "Erro ao executar o seed: $_"
}
finally {
    $env:PGPASSWORD = $null
}
