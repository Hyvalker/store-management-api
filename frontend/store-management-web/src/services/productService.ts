import {api} from './api'
import type {
    CreateProductRequest,
    CreateStockEntryRequest,
    Product,
    UpdateProductRequest
} from '../types/product'

export async function getProducts(): Promise<Product[]> {
    const response = await api.get<Product[]>('/products')
    return response.data
}

export async function getProduct(id: number): Promise<Product> {
    const response = await api.get<Product>(`/products/${id}`)
    return response.data
}

export async function createProduct(data: CreateProductRequest): Promise<Product> {
    const response = await api.post<Product>('/products', data)
    return response.data
}

export async function createStockEntry(data: CreateStockEntryRequest): Promise<Product> {
    const response = await api.post<Product>('/products/stock-entry', data)
    return response.data
}

export async function searchProducts(name: string): Promise<Product[]> {
    const response = await api.get<Product[]>('/products/search', {
        params: {name}
    })
    return response.data
}

export async function getProductByBarcode(barcode: string): Promise<Product> {
    const response = await api.get<Product>(`/products/barcode/${encodeURIComponent(barcode)}`)
    return response.data
}

export async function updateProduct(id: number, data: UpdateProductRequest): Promise<Product> {
    const response = await api.put<Product>(`/products/${id}`, data)
    return response.data
}