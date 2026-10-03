import {api} from './api'
import type {CreateProductRequest, Product} from '../types/product'

export async function getProducts(): Promise<Product[]> {
    const response = await api.get<Product[]>('/products')

    return response.data
}

export async function getProduction(id: number): Promise<Product> {
    const response = await api.get<Product>(`/products/${id}`)

    return response.data
}

export async function createProduct (
    data: CreateProductRequest,
): Promise<Product> {
    const response = await api.post<Product>('/products', data)

    return response.data
}