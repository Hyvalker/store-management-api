<#
.SYNOPSIS
    Script para resetar e semear o banco de dados da Bamba Aqua com dados completos de teste.
.DESCRIPTION
    Executa a limpeza das tabelas e insere 28 produtos, 8 clientes, histórico de vendas de 30 dias e perdas biológicas.
#>

param(
    [string]$Password = $env:PGPASSWORD
)

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   BAMBA AQUA - RESET E CARGA COMPLETA DO BANCO DE DADOS   " -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

$psqlPath = "C:\Program Files\PostgreSQL\18\bin\psql.exe"
if (-not (Test-Path $psqlPath)) {
    $found = Get-Command psql -ErrorAction SilentlyContinue
    if ($found) {
        $psqlPath = $found.Source
    } else {
        Write-Error "Não foi possível encontrar o psql.exe. Verifique a instalação do PostgreSQL."
        exit 1
    }
}

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$sqlFile = Join-Path $scriptDir "seed-complete.sql"

if (-not (Test-Path $sqlFile)) {
    Write-Error "Arquivo seed-complete.sql não encontrado em: $sqlFile"
    exit 1
}

if (-not $Password) {
    $Password = Read-Host "Digite a senha do PostgreSQL (postgres)"
}

Write-Host "[1/3] Configurando credenciais e codificação UTF-8..." -ForegroundColor Gray
$env:PGPASSWORD = $Password
$env:PGCLIENTENCODING = "UTF8"

Write-Host "[2/3] Executando carga em 'storedb'..." -ForegroundColor Cyan
& $psqlPath -U postgres -d storedb -f $sqlFile

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "[3/3] Sucesso! Banco de dados resetado e semeado com:" -ForegroundColor Green
    Write-Host "  • 28 Produtos & Seres Vivos (Marinhos, Água Doce, Corais, Equipamentos)" -ForegroundColor White
    Write-Host "  • 8 Clientes cadastrados com e-mails e telefones" -ForegroundColor White
    Write-Host "  • 7 Aquários vinculados com litragem e especificações" -ForegroundColor White
    Write-Host "  • 6 Testes de parâmetros com diagnósticos e 6 Anotações" -ForegroundColor White
    Write-Host "  • 18 Pedidos históricos (Pagos, Pendentes e Cancelados)" -ForegroundColor White
    Write-Host "  • Movimentações de estoque e perdas biológicas registradas" -ForegroundColor White
    Write-Host ""
    Write-Host "Tudo pronto para testar o PDV, Produtos, Aquários e Dashboard!" -ForegroundColor Yellow
} else {
    Write-Error "Ocorreu um erro ao executar o script SQL."
}
