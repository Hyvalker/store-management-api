import {api} from './api'

export interface PaymentDiscountSettings {
    pix: number
    money: number
    debit: number
    credit: number
}

const SETTINGS_KEY = 'bamba_aqua_payment_discounts'
const API_DISCOUNTS_KEY = 'PAYMENT_DISCOUNTS'

const DEFAULT_SETTINGS: PaymentDiscountSettings = {
    pix: 10,
    money: 5,
    debit: 0,
    credit: 0,
}

export function getPaymentDiscounts(): PaymentDiscountSettings {
    const saved = localStorage.getItem(SETTINGS_KEY)
    if (!saved) return DEFAULT_SETTINGS
    try {
        return {...DEFAULT_SETTINGS, ...JSON.parse(saved)}
    } catch {
        return DEFAULT_SETTINGS
    }
}

export async function fetchPaymentDiscounts(): Promise<PaymentDiscountSettings> {
    try {
        const response = await api.get<{key: string; value: string}>(`/settings/${API_DISCOUNTS_KEY}`)
        if (response.data && response.data.value) {
            const parsed = JSON.parse(response.data.value)
            const settings = {...DEFAULT_SETTINGS, ...parsed}
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
            return settings
        }
    } catch {
        // Fallback to local
    }
    return getPaymentDiscounts()
}

export async function savePaymentDiscounts(settings: PaymentDiscountSettings): Promise<void> {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
    try {
        await api.put(`/settings/${API_DISCOUNTS_KEY}`, {
            value: JSON.stringify(settings)
        })
    } catch (e) {
        console.warn('Falha ao sincronizar descontos com o servidor, mantido em cache local:', e)
    }
}

export interface StockAlertSettings {
    criticalStockThreshold: number // default: 2 (<= 2 is critical)
    lowStockThreshold: number      // default: 5 (<= 5 is low)
}

const STOCK_ALERTS_KEY = 'bamba_aqua_stock_alerts_settings'
const API_STOCK_ALERTS_KEY = 'STOCK_ALERTS'

const DEFAULT_STOCK_ALERT_SETTINGS: StockAlertSettings = {
    criticalStockThreshold: 2,
    lowStockThreshold: 5,
}

export function getStockAlertSettings(): StockAlertSettings {
    const saved = localStorage.getItem(STOCK_ALERTS_KEY)
    if (!saved) return DEFAULT_STOCK_ALERT_SETTINGS
    try {
        const parsed = JSON.parse(saved)
        return {
            criticalStockThreshold: Math.max(1, Number(parsed.criticalStockThreshold ?? DEFAULT_STOCK_ALERT_SETTINGS.criticalStockThreshold)),
            lowStockThreshold: Math.max(1, Number(parsed.lowStockThreshold ?? DEFAULT_STOCK_ALERT_SETTINGS.lowStockThreshold)),
        }
    } catch {
        return DEFAULT_STOCK_ALERT_SETTINGS
    }
}

export async function fetchStockAlertSettings(): Promise<StockAlertSettings> {
    try {
        const response = await api.get<{key: string; value: string}>(`/settings/${API_STOCK_ALERTS_KEY}`)
        if (response.data && response.data.value) {
            const parsed = JSON.parse(response.data.value)
            const settings: StockAlertSettings = {
                criticalStockThreshold: Math.max(1, Number(parsed.criticalStockThreshold ?? DEFAULT_STOCK_ALERT_SETTINGS.criticalStockThreshold)),
                lowStockThreshold: Math.max(1, Number(parsed.lowStockThreshold ?? DEFAULT_STOCK_ALERT_SETTINGS.lowStockThreshold)),
            }
            localStorage.setItem(STOCK_ALERTS_KEY, JSON.stringify(settings))
            return settings
        }
    } catch {
        // Fallback to local
    }
    return getStockAlertSettings()
}

export async function saveStockAlertSettings(settings: StockAlertSettings): Promise<void> {
    localStorage.setItem(STOCK_ALERTS_KEY, JSON.stringify(settings))
    try {
        await api.put(`/settings/${API_STOCK_ALERTS_KEY}`, {
            value: JSON.stringify(settings)
        })
    } catch (e) {
        console.warn('Falha ao sincronizar alertas de estoque com o servidor, mantido em cache local:', e)
    }
}

/**
 * Carrega todas as configurações do servidor e sincroniza no cache local (localStorage)
 */
export async function syncAllStoreSettings(): Promise<void> {
    try {
        const response = await api.get<Record<string, string>>('/settings')
        if (response.data) {
            if (response.data[API_DISCOUNTS_KEY]) {
                localStorage.setItem(SETTINGS_KEY, response.data[API_DISCOUNTS_KEY])
            }
            if (response.data[API_STOCK_ALERTS_KEY]) {
                localStorage.setItem(STOCK_ALERTS_KEY, response.data[API_STOCK_ALERTS_KEY])
            }
            if (response.data['WATER_PARAMETER_RULES']) {
                localStorage.setItem('bamba_aqua_water_parameter_rules', response.data['WATER_PARAMETER_RULES'])
            }
        }
    } catch {
        // Fallback gracioso para localStorage caso o servidor esteja temporariamente inalcançável
    }
}
