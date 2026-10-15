import {api} from './api'
import type {CreateOrderRequest, OrderResponse} from '../types/order'

export interface GetOrdersParams {
    customerId?: number
    from?: string
    to?: string
}

export async function getOrders(params?: GetOrdersParams): Promise<OrderResponse[]> {
    const response = await api.get<OrderResponse[]>('/orders', { params })
    return response.data
}

export async function getOrder(id: number): Promise<OrderResponse> {
    const response = await api.get<OrderResponse>(`/orders/${id}`)
    return response.data
}

export async function getOrdersByCustomer(customerId: number, params?: Omit<GetOrdersParams, 'customerId'>): Promise<OrderResponse[]> {
    const response = await api.get<OrderResponse[]>('/orders', {
        params: { customerId, ...params }
    })
    return response.data
}

export async function createOrder(data: CreateOrderRequest): Promise<OrderResponse> {
    const response = await api.post<OrderResponse>('/orders', data)
    return response.data
}

export async function payOrder(id: number, paymentMethod?: string): Promise<OrderResponse> {
    const params = paymentMethod ? { paymentMethod } : {}
    const response = await api.patch<OrderResponse>(`/orders/${id}/pay`, null, { params })
    return response.data
}

export async function cancelOrder(id: number): Promise<OrderResponse> {
    const response = await api.patch<OrderResponse>(`/orders/${id}/cancel`)
    return response.data
}
