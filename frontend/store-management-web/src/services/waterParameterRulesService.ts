import type {AquariumType, WaterParameterTest} from '../types/aquarium'
import {api} from './api'

export type WaterParameterKey =
    | 'ph'
    | 'temperature'
    | 'salinity'
    | 'ammonia'
    | 'nitrite'
    | 'nitrate'
    | 'phosphate'
    | 'kh'
    | 'gh'
    | 'calcium'
    | 'magnesium'
    | 'silicate'

export type ParameterStatus =
    | 'IDEAL'
    | 'WARNING_LOW'
    | 'CRITICAL_LOW'
    | 'WARNING_HIGH'
    | 'CRITICAL_HIGH'
    | 'DISABLED'

export interface ParameterThresholdRule {
    key: WaterParameterKey
    label: string
    shortLabel: string
    unit: string
    enabled: boolean
    isUpperOnly?: boolean // Para amônia, nitrito, silicato onde 0 é ideal
    idealMin: number
    idealMax: number
    warningLow?: number
    criticalLow?: number
    warningHigh?: number
    criticalHigh?: number
    step: number
    description: string
}

export type AquariumParameterRules = Record<WaterParameterKey, ParameterThresholdRule>

export interface WaterParameterSettings {
    MARINE: AquariumParameterRules
    FRESHWATER: AquariumParameterRules
}

const STORAGE_KEY = 'bamba_aqua_water_parameter_rules'

export const DEFAULT_WATER_PARAMETER_SETTINGS: WaterParameterSettings = {
    MARINE: {
        salinity: {
            key: 'salinity',
            label: 'Salinidade / Densidade',
            shortLabel: 'Salinidade',
            unit: 'g/cm³',
            enabled: true,
            idealMin: 1.024,
            idealMax: 1.026,
            warningLow: 1.023,
            criticalLow: 1.021,
            warningHigh: 1.027,
            criticalHigh: 1.028,
            step: 0.001,
            description: 'Densidade da água marinha (refratômetro). Faixa de recife ideal entre 1.024 e 1.026 (33 a 35 ppt).'
        },
        ph: {
            key: 'ph',
            label: 'pH (Potencial Hidrogeniônico)',
            shortLabel: 'pH',
            unit: '',
            enabled: true,
            idealMin: 8.10,
            idealMax: 8.40,
            warningLow: 7.90,
            criticalLow: 7.80,
            warningHigh: 8.50,
            criticalHigh: 8.60,
            step: 0.05,
            description: 'Em aquário marinho o pH deve ser estritamente alcalino estável. Abaixo de 7.8 afeta gravemente os corais.'
        },
        kh: {
            key: 'kh',
            label: 'Reserva Alcalina (KH)',
            shortLabel: 'KH',
            unit: 'dKH',
            enabled: true,
            idealMin: 7.5,
            idealMax: 9.5,
            warningLow: 6.8,
            criticalLow: 6.2,
            warningHigh: 10.5,
            criticalHigh: 11.5,
            step: 0.1,
            description: 'Fundamental para estabilidade do pH e calcificação dos corais. Quedas repentinas provocam necrose tecidual (RTN).'
        },
        calcium: {
            key: 'calcium',
            label: 'Cálcio (Ca)',
            shortLabel: 'Cálcio',
            unit: 'ppm',
            enabled: true,
            idealMin: 410,
            idealMax: 450,
            warningLow: 380,
            criticalLow: 350,
            warningHigh: 480,
            criticalHigh: 510,
            step: 5,
            description: 'Elemento estrutural consumido por corais duros e algas calcárias em equilíbrio com a reserva alcalina.'
        },
        magnesium: {
            key: 'magnesium',
            label: 'Magnésio (Mg)',
            shortLabel: 'Magnésio',
            unit: 'ppm',
            enabled: true,
            idealMin: 1300,
            idealMax: 1420,
            warningLow: 1240,
            criticalLow: 1180,
            warningHigh: 1480,
            criticalHigh: 1550,
            step: 10,
            description: 'Mantém o cálcio e carbonatos em solução química, impedindo precipitação espontânea de carbonato de cálcio.'
        },
        temperature: {
            key: 'temperature',
            label: 'Temperatura',
            shortLabel: 'Temp',
            unit: '°C',
            enabled: true,
            idealMin: 25.0,
            idealMax: 26.8,
            warningLow: 24.0,
            criticalLow: 23.0,
            warningHigh: 27.5,
            criticalHigh: 28.5,
            step: 0.5,
            description: 'Oscilações bruscas causam branqueamento nos corais e baixa imunidade em peixes marinhos.'
        },
        nitrate: {
            key: 'nitrate',
            label: 'Nitrato (NO₃)',
            shortLabel: 'Nitrato',
            unit: 'ppm',
            enabled: true,
            idealMin: 2.0,
            idealMax: 10.0,
            warningLow: 0.5,
            criticalLow: 0.0,
            warningHigh: 20.0,
            criticalHigh: 40.0,
            step: 0.5,
            description: 'Nutriente orgânico para zooxantelas. Zerado pode causar dinoflagelados; acima de 20 ppm gera surtos de algas.'
        },
        phosphate: {
            key: 'phosphate',
            label: 'Fosfato (PO₄)',
            shortLabel: 'Fosfato',
            unit: 'ppm',
            enabled: true,
            idealMin: 0.02,
            idealMax: 0.08,
            warningLow: 0.01,
            criticalLow: 0.00,
            warningHigh: 0.12,
            criticalHigh: 0.25,
            step: 0.01,
            description: 'Abaixo de 0.02 desnutre os corais; acima de 0.10 bloqueia a calcificação esquelética e alimenta algas nocivas.'
        },
        ammonia: {
            key: 'ammonia',
            label: 'Amônia Total (NH₃)',
            shortLabel: 'Amônia',
            unit: 'ppm',
            enabled: true,
            isUpperOnly: true,
            idealMin: 0.00,
            idealMax: 0.00,
            warningHigh: 0.05,
            criticalHigh: 0.25,
            step: 0.05,
            description: 'Composto altamente tóxico para brânquias e tecidos. Deve ser indetectável em aquários ciclados.'
        },
        nitrite: {
            key: 'nitrite',
            label: 'Nitrito (NO₂)',
            shortLabel: 'Nitrito',
            unit: 'ppm',
            enabled: true,
            isUpperOnly: true,
            idealMin: 0.00,
            idealMax: 0.00,
            warningHigh: 0.05,
            criticalHigh: 0.20,
            step: 0.05,
            description: 'Subproduto tóxico intermediário do ciclo do nitrogênio. Deve ser nulo.'
        },
        silicate: {
            key: 'silicate',
            label: 'Silicato (SiO₂)',
            shortLabel: 'Silicato',
            unit: 'ppm',
            enabled: true,
            isUpperOnly: true,
            idealMin: 0.00,
            idealMax: 0.20,
            warningHigh: 0.50,
            criticalHigh: 1.00,
            step: 0.1,
            description: 'Proveniente de água de reposição saturada. Alimenta surtos de diatomáceas marrons nas rochas e substrato.'
        },
        gh: {
            key: 'gh',
            label: 'Dureza Geral (GH)',
            shortLabel: 'GH',
            unit: 'dGH',
            enabled: false,
            idealMin: 7,
            idealMax: 12,
            step: 1,
            description: 'Geralmente não aplicável em marinho (substituído pela medição isolada de Cálcio e Magnésio).'
        }
    },
    FRESHWATER: {
        temperature: {
            key: 'temperature',
            label: 'Temperatura',
            shortLabel: 'Temp',
            unit: '°C',
            enabled: true,
            idealMin: 24.0,
            idealMax: 28.0,
            warningLow: 22.5,
            criticalLow: 21.0,
            warningHigh: 29.0,
            criticalHigh: 31.0,
            step: 0.5,
            description: 'Faixa térmica recomendada para a grande maioria dos peixes e plantas tropicais de água doce.'
        },
        ammonia: {
            key: 'ammonia',
            label: 'Amônia Total (NH₃)',
            shortLabel: 'Amônia',
            unit: 'ppm',
            enabled: true,
            isUpperOnly: true,
            idealMin: 0.00,
            idealMax: 0.00,
            warningHigh: 0.05,
            criticalHigh: 0.50,
            step: 0.05,
            description: 'Extremamente tóxica para peixes ornamentais de água doce. Deve ser 0 ppm.'
        },
        nitrite: {
            key: 'nitrite',
            label: 'Nitrito (NO₂)',
            shortLabel: 'Nitrito',
            unit: 'ppm',
            enabled: true,
            isUpperOnly: true,
            idealMin: 0.00,
            idealMax: 0.00,
            warningHigh: 0.05,
            criticalHigh: 0.50,
            step: 0.05,
            description: 'Interfere na respiração e transporte de oxigênio no sangue dos peixes. Deve ser 0 ppm.'
        },
        nitrate: {
            key: 'nitrate',
            label: 'Nitrato (NO₃)',
            shortLabel: 'Nitrato',
            unit: 'ppm',
            enabled: true,
            isUpperOnly: true,
            idealMin: 0.0,
            idealMax: 20.0,
            warningHigh: 35.0,
            criticalHigh: 50.0,
            step: 1.0,
            description: 'Em aquários plantados é nutriente essencial até 20 ppm; acima de 35 ppm causa algas e estresse na fauna.'
        },
        phosphate: {
            key: 'phosphate',
            label: 'Fosfato (PO₄)',
            shortLabel: 'Fosfato',
            unit: 'ppm',
            enabled: true,
            isUpperOnly: true,
            idealMin: 0.1,
            idealMax: 1.0,
            warningHigh: 2.0,
            criticalHigh: 4.0,
            step: 0.1,
            description: 'Em plantados mantém a proporção de Redfield. Em excesso, provoca algas verdes e peteca.'
        },
        ph: {
            key: 'ph',
            label: 'pH (Potencial Hidrogeniônico)',
            shortLabel: 'pH',
            unit: '',
            enabled: false, // Desativado por padrão conforme requisito
            idealMin: 6.4,
            idealMax: 7.5,
            warningLow: 6.0,
            criticalLow: 5.5,
            warningHigh: 7.8,
            criticalHigh: 8.2,
            step: 0.1,
            description: 'Desativado por padrão porque água doce varia conforme a fauna (Discos = 6.2; Ciclídeos Africanos = 8.2). Pode ser ativado pelo operador.'
        },
        kh: {
            key: 'kh',
            label: 'Reserva Alcalina (KH)',
            shortLabel: 'KH',
            unit: 'dKH',
            enabled: false, // Desativado por padrão
            idealMin: 2,
            idealMax: 6,
            warningLow: 1,
            criticalLow: 0.5,
            warningHigh: 8,
            criticalHigh: 12,
            step: 0.5,
            description: 'Desativado por padrão pois depende do tipo de aquário doce (amazônico requer água mole; ciclídeos requerem tamponamento).'
        },
        gh: {
            key: 'gh',
            label: 'Dureza Geral (GH)',
            shortLabel: 'GH',
            unit: 'dGH',
            enabled: false, // Desativado por padrão
            idealMin: 3,
            idealMax: 10,
            warningLow: 2,
            criticalLow: 1,
            warningHigh: 14,
            criticalHigh: 20,
            step: 1,
            description: 'Dureza total da água doce. Desativado por padrão para flexibilidade de cada biótopo.'
        },
        salinity: {
            key: 'salinity',
            label: 'Salinidade',
            shortLabel: 'Salinidade',
            unit: '',
            enabled: false,
            idealMin: 1.000,
            idealMax: 1.000,
            step: 0.001,
            description: 'Não aplicável para aquários de água doce.'
        },
        calcium: {
            key: 'calcium',
            label: 'Cálcio (Ca)',
            shortLabel: 'Cálcio',
            unit: 'ppm',
            enabled: false,
            idealMin: 20,
            idealMax: 60,
            step: 5,
            description: 'Normalmente não monitorado individualmente em água doce comunitária.'
        },
        magnesium: {
            key: 'magnesium',
            label: 'Magnésio (Mg)',
            shortLabel: 'Magnésio',
            unit: 'ppm',
            enabled: false,
            idealMin: 5,
            idealMax: 25,
            step: 5,
            description: 'Monitorado apenas em plantados avançados com fertilização de micronutrientes.'
        },
        silicate: {
            key: 'silicate',
            label: 'Silicato (SiO₂)',
            shortLabel: 'Silicato',
            unit: 'ppm',
            enabled: false,
            idealMin: 0,
            idealMax: 2,
            step: 0.5,
            description: 'Raramente problemático em água doce.'
        }
    }
}

/**
 * Carrega as regras de parâmetros de água personalizadas pelo operador,
 * com fallback completo para os padrões biológicos caso não exista configuração prévia.
 */
export function getWaterParameterRules(): WaterParameterSettings {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return DEFAULT_WATER_PARAMETER_SETTINGS

    try {
        const parsed = JSON.parse(saved)
        // Mesclar recursivamente para garantir integridade caso novas chaves sejam adicionadas
        const merged: WaterParameterSettings = {
            MARINE: {...DEFAULT_WATER_PARAMETER_SETTINGS.MARINE},
            FRESHWATER: {...DEFAULT_WATER_PARAMETER_SETTINGS.FRESHWATER}
        }

        if (parsed.MARINE) {
            Object.keys(DEFAULT_WATER_PARAMETER_SETTINGS.MARINE).forEach((k) => {
                const key = k as WaterParameterKey
                if (parsed.MARINE[key]) {
                    merged.MARINE[key] = {
                        ...DEFAULT_WATER_PARAMETER_SETTINGS.MARINE[key],
                        ...parsed.MARINE[key]
                    }
                }
            })
        }

        if (parsed.FRESHWATER) {
            Object.keys(DEFAULT_WATER_PARAMETER_SETTINGS.FRESHWATER).forEach((k) => {
                const key = k as WaterParameterKey
                if (parsed.FRESHWATER[key]) {
                    merged.FRESHWATER[key] = {
                        ...DEFAULT_WATER_PARAMETER_SETTINGS.FRESHWATER[key],
                        ...parsed.FRESHWATER[key]
                    }
                }
            })
        }

        return merged
    } catch {
        return DEFAULT_WATER_PARAMETER_SETTINGS
    }
}

const API_WATER_RULES_KEY = 'WATER_PARAMETER_RULES'

export async function fetchWaterParameterRules(): Promise<WaterParameterSettings> {
    try {
        const response = await api.get<{key: string; value: string}>(`/settings/${API_WATER_RULES_KEY}`)
        if (response.data && response.data.value) {
            localStorage.setItem(STORAGE_KEY, response.data.value)
        }
    } catch {
        // Fallback gracioso para localStorage
    }
    return getWaterParameterRules()
}

export async function saveWaterParameterRules(settings: WaterParameterSettings): Promise<void> {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    try {
        await api.put(`/settings/${API_WATER_RULES_KEY}`, {
            value: JSON.stringify(settings)
        })
    } catch (e) {
        console.warn('Falha ao sincronizar parâmetros de água com o servidor, mantido em cache local:', e)
    }
}

export async function resetWaterParameterRules(): Promise<WaterParameterSettings> {
    localStorage.removeItem(STORAGE_KEY)
    try {
        await api.put(`/settings/${API_WATER_RULES_KEY}`, {
            value: JSON.stringify(DEFAULT_WATER_PARAMETER_SETTINGS)
        })
    } catch (e) {
        console.warn('Falha ao resetar parâmetros de água no servidor:', e)
    }
    return DEFAULT_WATER_PARAMETER_SETTINGS
}

export interface EvaluationResult {
    status: ParameterStatus
    rule: ParameterThresholdRule
    value: number
    label: string
    shortLabel: string
    unit: string
    tag: string
    message: string
    badgeClass: string
    borderClass: string
    textClass: string
    bgClass: string
    iconType: 'check' | 'arrow-down' | 'arrow-up' | 'warning' | 'critical' | 'none'
    targetRangeText: string
}

/**
 * Avalia um valor numérico contra a regra configurada para o tipo de aquário.
 */
export function evaluateParameter(
    aquariumType: AquariumType,
    paramKey: WaterParameterKey,
    value: number | null | undefined,
    customSettings?: WaterParameterSettings
): EvaluationResult | null {
    if (value === undefined || value === null || isNaN(value)) {
        return null
    }

    const settings = customSettings || getWaterParameterRules()
    const rules = aquariumType === 'MARINE' ? settings.MARINE : settings.FRESHWATER
    const rule = rules[paramKey]

    if (!rule) return null

    const unitSuffix = rule.unit ? ` ${rule.unit}` : ''

    // Se o parâmetro estiver desativado para esse tipo de aquário
    if (!rule.enabled) {
        return {
            status: 'DISABLED',
            rule,
            value,
            label: rule.label,
            shortLabel: rule.shortLabel,
            unit: rule.unit,
            tag: 'Informativo',
            message: 'Alerta desativado para este tipo de aquário.',
            badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
            borderClass: 'border-slate-200',
            textClass: 'text-slate-800',
            bgClass: 'bg-white',
            iconType: 'none',
            targetRangeText: 'Sem faixa restritiva'
        }
    }

    // Regras unilaterais (onde 0 é ideal, só alerta para cima, ex: amônia, nitrito)
    if (rule.isUpperOnly) {
        const critHigh = rule.criticalHigh !== undefined ? rule.criticalHigh : rule.idealMax
        const warnHigh = rule.warningHigh !== undefined ? rule.warningHigh : rule.idealMax

        if (value > critHigh) {
            return {
                status: 'CRITICAL_HIGH',
                rule,
                value,
                label: rule.label,
                shortLabel: rule.shortLabel,
                unit: rule.unit,
                tag: 'Crítico: Muito Alto!',
                message: `${rule.shortLabel} está perigosamente elevado (${value}${unitSuffix}). Risco iminente de toxicidade!`,
                badgeClass: 'bg-rose-100 text-rose-900 border-rose-300 ring-1 ring-rose-400',
                borderClass: 'border-rose-400',
                textClass: 'text-rose-700',
                bgClass: 'bg-rose-50/90',
                iconType: 'critical',
                targetRangeText: `Ideal: ≤ ${rule.idealMax}${unitSuffix}`
            }
        }

        if (value > warnHigh) {
            return {
                status: 'WARNING_HIGH',
                rule,
                value,
                label: rule.label,
                shortLabel: rule.shortLabel,
                unit: rule.unit,
                tag: 'Alerta: Elevado',
                message: `${rule.shortLabel} acima do esperado (${value}${unitSuffix}). Requer atenção e monitoramento.`,
                badgeClass: 'bg-orange-50 text-orange-800 border-orange-200',
                borderClass: 'border-orange-300',
                textClass: 'text-orange-700',
                bgClass: 'bg-orange-50/50',
                iconType: 'arrow-up',
                targetRangeText: `Ideal: ≤ ${rule.idealMax}${unitSuffix}`
            }
        }

        return {
            status: 'IDEAL',
            rule,
            value,
            label: rule.label,
            shortLabel: rule.shortLabel,
            unit: rule.unit,
            tag: 'Ideal (Zerado)',
            message: `${rule.shortLabel} dentro da faixa de segurança ideal.`,
            badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
            borderClass: 'border-emerald-300',
            textClass: 'text-emerald-700',
            bgClass: 'bg-emerald-50/40',
            iconType: 'check',
            targetRangeText: `Ideal: ≤ ${rule.idealMax}${unitSuffix}`
        }
    }

    // Regras bilaterais com graduação (Crítico Baixo, Alerta Baixo, Ideal, Alerta Alto, Crítico Alto)
    const critLow = rule.criticalLow !== undefined ? rule.criticalLow : rule.idealMin
    const warnLow = rule.warningLow !== undefined ? rule.warningLow : rule.idealMin
    const warnHigh = rule.warningHigh !== undefined ? rule.warningHigh : rule.idealMax
    const critHigh = rule.criticalHigh !== undefined ? rule.criticalHigh : rule.idealMax

    const targetRangeText = `Ideal: ${rule.idealMin} a ${rule.idealMax}${unitSuffix}`

    if (value < critLow) {
        return {
            status: 'CRITICAL_LOW',
            rule,
            value,
            label: rule.label,
            shortLabel: rule.shortLabel,
            unit: rule.unit,
            tag: 'Crítico: Muito Baixo!',
            message: `${rule.shortLabel} está perigosamente baixo (${value}${unitSuffix}). Abaixo de ${critLow}${unitSuffix}!`,
            badgeClass: 'bg-rose-100 text-rose-900 border-rose-300 ring-1 ring-rose-400',
            borderClass: 'border-rose-400',
            textClass: 'text-rose-700',
            bgClass: 'bg-rose-50/90',
            iconType: 'critical',
            targetRangeText
        }
    }

    if (value < warnLow) {
        return {
            status: 'WARNING_LOW',
            rule,
            value,
            label: rule.label,
            shortLabel: rule.shortLabel,
            unit: rule.unit,
            tag: 'Atenção: Abaixo do Ideal',
            message: `${rule.shortLabel} está ligeiramente baixo (${value}${unitSuffix}). Recomenda-se ajuste gradual.`,
            badgeClass: 'bg-amber-50 text-amber-900 border-amber-200',
            borderClass: 'border-amber-300',
            textClass: 'text-amber-700',
            bgClass: 'bg-amber-50/50',
            iconType: 'arrow-down',
            targetRangeText
        }
    }

    if (value > critHigh) {
        return {
            status: 'CRITICAL_HIGH',
            rule,
            value,
            label: rule.label,
            shortLabel: rule.shortLabel,
            unit: rule.unit,
            tag: 'Crítico: Muito Alto!',
            message: `${rule.shortLabel} está perigosamente alto (${value}${unitSuffix}). Acima de ${critHigh}${unitSuffix}!`,
            badgeClass: 'bg-red-100 text-red-900 border-red-300 ring-1 ring-red-400',
            borderClass: 'border-red-400',
            textClass: 'text-red-700',
            bgClass: 'bg-red-50/90',
            iconType: 'critical',
            targetRangeText
        }
    }

    if (value > warnHigh) {
        return {
            status: 'WARNING_HIGH',
            rule,
            value,
            label: rule.label,
            shortLabel: rule.shortLabel,
            unit: rule.unit,
            tag: 'Atenção: Acima do Ideal',
            message: `${rule.shortLabel} está ligeiramente alto (${value}${unitSuffix}). Recomenda-se ajuste.`,
            badgeClass: 'bg-orange-50 text-orange-900 border-orange-200',
            borderClass: 'border-orange-300',
            textClass: 'text-orange-700',
            bgClass: 'bg-orange-50/50',
            iconType: 'arrow-up',
            targetRangeText
        }
    }

    // Dentro da faixa ideal
    return {
        status: 'IDEAL',
        rule,
        value,
        label: rule.label,
        shortLabel: rule.shortLabel,
        unit: rule.unit,
        tag: 'Ideal (Perfeito)',
        message: `${rule.shortLabel} está excelente e dentro da janela ideal.`,
        badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        borderClass: 'border-emerald-300',
        textClass: 'text-emerald-700',
        bgClass: 'bg-emerald-50/40',
        iconType: 'check',
        targetRangeText
    }
}

export interface TestOverallEvaluation {
    totalEvaluated: number
    idealCount: number
    warningCount: number
    criticalCount: number
    hasCritical: boolean
    hasWarning: boolean
    evaluations: EvaluationResult[]
    criticalItems: EvaluationResult[]
    warningItems: EvaluationResult[]
}

/**
 * Avalia todos os parâmetros de uma medição de uma vez só,
 * gerando contagens e listas de itens que requerem atenção.
 */
export function evaluateTest(
    aquariumType: AquariumType,
    test: WaterParameterTest,
    customSettings?: WaterParameterSettings
): TestOverallEvaluation {
    const keys: WaterParameterKey[] = [
        'ph',
        'temperature',
        'salinity',
        'ammonia',
        'nitrite',
        'nitrate',
        'phosphate',
        'kh',
        'gh',
        'calcium',
        'magnesium',
        'silicate'
    ]

    const evals: EvaluationResult[] = []

    keys.forEach((k) => {
        const val = test[k]
        const res = evaluateParameter(aquariumType, k, val, customSettings)
        if (res && res.status !== 'DISABLED') {
            evals.push(res)
        }
    })

    const criticalItems = evals.filter((e) => e.status === 'CRITICAL_LOW' || e.status === 'CRITICAL_HIGH')
    const warningItems = evals.filter((e) => e.status === 'WARNING_LOW' || e.status === 'WARNING_HIGH')
    const idealCount = evals.filter((e) => e.status === 'IDEAL').length

    return {
        totalEvaluated: evals.length,
        idealCount,
        warningCount: warningItems.length,
        criticalCount: criticalItems.length,
        hasCritical: criticalItems.length > 0,
        hasWarning: warningItems.length > 0,
        evaluations: evals,
        criticalItems,
        warningItems
    }
}
