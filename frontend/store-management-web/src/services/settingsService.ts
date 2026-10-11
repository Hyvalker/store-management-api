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
