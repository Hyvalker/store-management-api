$ErrorActionPreference = "Stop"

$psql = "C:\Program Files\PostgreSQL\18\bin\psql.exe"

$database = "storedb"
$user = "postgres"
$dbHost = "localhost"
$port = "5432"

Write-Host "Cleaning database..."

& $psql `
    -v ON_ERROR_STOP=1 `
    -h $dbHost `
    -p $port `
    -U $user `
    -d $database `
    -f "src/main/resources/db/seed/clean.sql"

if ($LASTEXITCODE -ne 0) {
    throw "Database cleaning failed."
}

Write-Host "Seeding database..."

& $psql `
    -v ON_ERROR_STOP=1 `
    -h $dbHost `
    -p $port `
    -U $user `
    -d $database `
    -f "src/main/resources/db/seed/seed.sql"

if ($LASTEXITCODE -ne 0) {
    throw "Database seeding failed."
}

Write-Host ""
Write-Host "Database reset and seeded successfully."