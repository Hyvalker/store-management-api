import {api} from './api'
import type {CreateOrderRequest, OrderResponse} from '../types/order'

export async function getOrders(): Promise<OrderResponse[]> {
    const response = await api.get<OrderResponse[]>('/orders')
    return response.data
}

export async function getOrder(id: number): Promise<OrderResponse> {
    const response = await api.get<OrderResponse>(`/orders/${id}`)
    return response.data
}

export async function createOrder(data: CreateOrderRequest): Promise<OrderResponse> {
    const response = await api.post<OrderResponse>('/orders', data)
    return response.data
}

export async function payOrder(id: number): Promise<OrderResponse> {
    const response = await api.patch<OrderResponse>(`/orders/${id}/pay`)
    return response.data
}

export async function cancelOrder(id: number): Promise<OrderResponse> {
    const response = await api.patch<OrderResponse>(`/orders/${id}/cancel`)
    return response.data
}
