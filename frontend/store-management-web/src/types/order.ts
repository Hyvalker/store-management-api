export interface CreateOrderItemRequest {
    productId: number
    quantity: number
}

export interface CreateOrderRequest {
    customerId?: number | null
    customerName?: string | null
    items: CreateOrderItemRequest[]
}

export interface OrderItemResponse {
    productId: number
    productName: string
    quantity: number
    unitPrice: number
    subtotal: number
}

export type OrderStatus = 'PENDING' | 'PAID' | 'CANCELED'

export interface OrderResponse {
    id: number
    totalPrice: number
    createdAt: string
    status: OrderStatus
    customerId?: number | null
    customerName?: string | null
    items: OrderItemResponse[]
}
