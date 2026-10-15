export type ProductType = 'LIVING' | 'PRODUCT'

export type SubCategory =
    | 'CORAL'
    | 'MARINE_FISH'
    | 'FRESHWATER_FISH'
    | 'MARINE_INVERTEBRATE'
    | 'FRESHWATER_INVERTEBRATE'
    | 'INVERTEBRATE'
    | 'PLANT'
    | 'OTHER_LIVING'
    | 'EQUIPMENT'
    | 'SUPPLY'
    | 'OTHER_PRODUCT'

export interface Product {
    id: number
    name: string
    type: ProductType
    subCategory?: SubCategory
    imageSlug?: string
    quantity: number
    costPrice: number
    salePrice: number
    profitMargin: number | null
    barcode: string | null
    active: boolean
}

export interface CreateProductRequest {
    name: string
    type: ProductType
    subCategory?: SubCategory
    imageSlug?: string
    quantity: number
    costPrice: number
    salePrice?: number
    profitMargin?: number
    barcode: string | null
}

export interface CreateStockEntryRequest {
    productId: number
    quantity: number
    costPrice: number
    salePrice?: number
    profitMargin?: number
}

export interface UpdateProductRequest {
    name: string
    type: ProductType
    subCategory?: SubCategory
    imageSlug?: string
    costPrice: number
    salePrice?: number
    profitMargin?: number
    barcode?: string | null
}

export interface ProductSalesRanking {
    productId: number
    productName: string
    quantitySold: number
    revenue: number
}

export interface DashboardSummary {
    revenue: number
    salesCost: number
    grossProfit: number
    lossCost: number
    lossSalesValue: number
    inventoryCostValue: number
    inventorySaleValue: number
}
