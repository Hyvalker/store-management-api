export interface PaymentDiscountSettings {
    pix: number
    money: number
    debit: number
    credit: number
}

const SETTINGS_KEY = 'bamba_aqua_payment_discounts'

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

export function savePaymentDiscounts(settings: PaymentDiscountSettings): void {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}

export interface StockAlertSettings {
    criticalStockThreshold: number // default: 2 (<= 2 is critical)
    lowStockThreshold: number      // default: 5 (<= 5 is low)
}

const STOCK_ALERTS_KEY = 'bamba_aqua_stock_alerts_settings'

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

export function saveStockAlertSettings(settings: StockAlertSettings): void {
    localStorage.setItem(STOCK_ALERTS_KEY, JSON.stringify(settings))
}
