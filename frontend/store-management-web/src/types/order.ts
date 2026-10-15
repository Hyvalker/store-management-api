export interface CreateOrderItemRequest {
    productId: number
    quantity: number
}

export type PaymentMethod = 'PIX' | 'MONEY' | 'DEBIT' | 'CREDIT'

export interface CreateOrderRequest {
    customerId?: number | null
    customerName?: string | null
    items: CreateOrderItemRequest[]
    discountPercentage?: number | null
    paymentMethod?: PaymentMethod | null
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
    subtotalPrice?: number
    discountPercentage?: number
    discountAmount?: number
    totalPrice: number
    paymentMethod?: PaymentMethod | null
    createdAt: string
    status: OrderStatus
    customerId?: number | null
    customerName?: string | null
    items: OrderItemResponse[]
}
