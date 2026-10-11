import {api} from './api'
import type {DashboardSummary, ProductSalesRanking} from '../types/product'

export async function getDashboardSummary(from: string, to: string): Promise<DashboardSummary> {
    const response = await api.get<DashboardSummary>('/dashboard/summary', {
        params: {from, to}
    })
    return response.data
}

export async function getTopProducts(
    from: string,
    to: string,
    limit: number = 10,
    sortBy: 'quantity' | 'revenue' = 'quantity'
): Promise<ProductSalesRanking[]> {
    const response = await api.get<ProductSalesRanking[]>('/dashboard/top-products', {
        params: {from, to, limit, sortBy}
    })
    return response.data
}
