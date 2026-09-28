$ErrorActionPreference = "Stop"

$baseUrl = "http://localhost:8080"

function Invoke-Api {
    param (
        [string]$Method,
        [string]$Uri,
        [object]$Body = $null
    )

    $params = @{
        Method      = $Method
        Uri         = $Uri
        ErrorAction = "Stop"
    }

    if ($null -ne $Body) {
        $params.ContentType = "application/json"
        $params.Body = $Body | ConvertTo-Json -Depth 10
    }

    return Invoke-RestMethod @params
}

function Get-ProductByBarcode {
    param (
        [array]$Products,
        [string]$Barcode
    )

    $product = $Products | Where-Object {
        $_.barcode -eq $Barcode
    } | Select-Object -First 1

    if ($null -eq $product) {
        throw "Product with barcode '$Barcode' was not found."
    }

    return $product
}

Write-Host ""
Write-Host "========================================="
Write-Host " Starting API test scenario"
Write-Host "========================================="
Write-Host ""

# ---------------------------------------------------------
# 1. Load products created by seed.sql
# ---------------------------------------------------------

Write-Host "[1/8] Loading seeded products..."

$products = Invoke-Api `
    -Method "GET" `
    -Uri "$baseUrl/products"

$clownfish = Get-ProductByBarcode `
    -Products $products `
    -Barcode "789000000001"

$lionfish = Get-ProductByBarcode `
    -Products $products `
    -Barcode "789000000002"

$food = Get-ProductByBarcode `
    -Products $products `
    -Barcode "789000000004"

$filter = Get-ProductByBarcode `
    -Products $products `
    -Barcode "789000000005"

$heater = $products | Where-Object {
    $_.name -eq "Termostato 100W"
} | Select-Object -First 1

if ($null -eq $heater) {
    throw "Product 'Termostato 100W' was not found."
}

Write-Host "  Clownfish:  ID $($clownfish.id)"
Write-Host "  Lionfish:   ID $($lionfish.id)"
Write-Host "  Food:       ID $($food.id)"
Write-Host "  Filter:     ID $($filter.id)"
Write-Host "  Heater:     ID $($heater.id)"

# ---------------------------------------------------------
# 2. Stock entry
# ---------------------------------------------------------

Write-Host ""
Write-Host "[2/8] Creating stock entry..."

$stockEntry = Invoke-Api `
    -Method "POST" `
    -Uri "$baseUrl/products/stock-entry" `
    -Body @{
        productId   = $clownfish.id
        quantity    = 5
        costPrice   = 55.00
        profitMargin = 70.00
    }

Write-Host "  Added 5 units of $($clownfish.name)."

# ---------------------------------------------------------
# 3. Stock loss
# ---------------------------------------------------------

Write-Host ""
Write-Host "[3/8] Creating stock loss..."

$stockLoss = Invoke-Api `
    -Method "POST" `
    -Uri "$baseUrl/products/stock-loss" `
    -Body @{
        productId = $lionfish.id
        quantity  = 1
        reason    = "Test scenario - animal loss"
    }

Write-Host "  Lost 1 unit of $($lionfish.name)."

# ---------------------------------------------------------
# 4. Create PENDING order
# ---------------------------------------------------------

Write-Host ""
Write-Host "[4/8] Creating pending order..."

$pendingOrder = Invoke-Api `
    -Method "POST" `
    -Uri "$baseUrl/orders" `
    -Body @{
        items = @(
            @{
                productId = $clownfish.id
                quantity  = 2
            },
            @{
                productId = $food.id
                quantity  = 2
            }
        )
    }

Write-Host "  Pending order created: ID $($pendingOrder.id)"

# ---------------------------------------------------------
# 5. Create and PAY an order
# ---------------------------------------------------------

Write-Host ""
Write-Host "[5/8] Creating and paying an order..."

$paidOrder = Invoke-Api `
    -Method "POST" `
    -Uri "$baseUrl/orders" `
    -Body @{
        items = @(
            @{
                productId = $filter.id
                quantity  = 1
            },
            @{
                productId = $heater.id
                quantity  = 1
            }
        )
    }

$paidOrderId = $paidOrder.id

Invoke-Api `
    -Method "PATCH" `
    -Uri "$baseUrl/orders/$paidOrderId/pay"

Write-Host "  Order $paidOrderId paid successfully."

# ---------------------------------------------------------
# 6. Create another PAID order
# ---------------------------------------------------------

Write-Host ""
Write-Host "[6/8] Creating another paid order..."

$paidOrderToCancel = Invoke-Api `
    -Method "POST" `
    -Uri "$baseUrl/orders" `
    -Body @{
        items = @(
            @{
                productId = $clownfish.id
                quantity  = 1
            },
            @{
                productId = $lionfish.id
                quantity  = 1
            }
        )
    }

$paidOrderToCancelId = $paidOrderToCancel.id

Invoke-Api `
    -Method "PATCH" `
    -Uri "$baseUrl/orders/$paidOrderToCancelId/pay"

Write-Host "  Order $paidOrderToCancelId paid successfully."

# ---------------------------------------------------------
# 7. Cancel PAID order
# ---------------------------------------------------------

Write-Host ""
Write-Host "[7/8] Canceling paid order..."

Invoke-Api `
    -Method "PATCH" `
    -Uri "$baseUrl/orders/$paidOrderToCancelId/cancel"

Write-Host "  Order $paidOrderToCancelId canceled."
Write-Host "  Stock should have been returned."
Write-Host "  RETURN movements should have been created."

# ---------------------------------------------------------
# 8. Create and cancel a PENDING order
# ---------------------------------------------------------

Write-Host ""
Write-Host "[8/8] Creating and canceling pending order..."

$pendingOrderToCancel = Invoke-Api `
    -Method "POST" `
    -Uri "$baseUrl/orders" `
    -Body @{
        items = @(
            @{
                productId = $food.id
                quantity  = 1
            }
        )
    }

$pendingOrderToCancelId = $pendingOrderToCancel.id

Invoke-Api `
    -Method "PATCH" `
    -Uri "$baseUrl/orders/$pendingOrderToCancelId/cancel"

Write-Host "  Pending order $pendingOrderToCancelId canceled."
Write-Host "  No stock movement should have been created."

Write-Host ""
Write-Host "========================================="
Write-Host " Test scenario completed successfully."
Write-Host "========================================="
Write-Host ""