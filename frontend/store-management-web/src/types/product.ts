export type ProductType = 'LIVING' | 'PRODUCT'

export interface Product {
    id: number
    name: string
    type: ProductType
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
    quantity: number
    costPrice: number
    salePrice?: number
    profitMargin?: number
    barcode: string | null
}

