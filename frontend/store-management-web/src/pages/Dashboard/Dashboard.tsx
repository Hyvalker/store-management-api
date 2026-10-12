import {useEffect, useState, useCallback, useMemo} from 'react'
import {useNavigate} from 'react-router-dom'
import {
    TrendingUp,
    AlertTriangle,
    DollarSign,
    Package,
    Calendar,
    Sparkles,
    CheckCircle2,
    Calculator,
    ArrowUpRight,
    ShieldAlert,
    RefreshCw,
    CheckSquare,
    Square,
    Info,
    BarChart3,
    Table,
    PackagePlus,
    PackageX,
    Search,
    Fish,
    Layers,
    Clock,
    Receipt,
    X,
    Flame,
    ArrowRight,
    Sliders
} from 'lucide-react'
import {getDashboardSummary, getTopProducts} from '../../services/dashboardService'
import {updateProduct, getProduct, getProducts} from '../../services/productService'
import {getOrders} from '../../services/orderService'
import {getCurrentUser} from '../../services/authService'
import {getStockAlertSettings, type StockAlertSettings} from '../../services/settingsService'
import type {DashboardSummary, ProductSalesRanking, Product} from '../../types/product'
import type {OrderResponse} from '../../types/order'
import {matchesSearch} from '../../utils/searchUtils'
import {useToast} from '../../contexts/ToastContext'
import ReplenishmentForm from '../Products/ReplenishmentForm'

interface DilutionItem {
    productId: number
    productName: string
    productType: 'LIVING' | 'PRODUCT'
    currentPrice: number
    projectedSales: number
    projectedRevenue: number
    suggestedPercent: number
    suggestedIncrease: number
    newPrice: number
    totalAmortized: number
    enabled: boolean
}

type DashboardTab = 'overview' | 'stock-alerts' | 'loss-dilution'

function Dashboard() {
    const {toast} = useToast()
    const currentUser = getCurrentUser()

    // Dashboard main tab state
    const [activeTab, setActiveTab] = useState<DashboardTab>('overview')

    // Date filter state (default: last 30 days)
    const [preset, setPreset] = useState<'7' | '30' | 'month' | '90'>('30')
    const [startDate, setStartDate] = useState(() => {
        const d = new Date()
        d.setDate(d.getDate() - 30)
        return d.toISOString().split('T')[0]
    })
    const [endDate, setEndDate] = useState(() => {
        return new Date().toISOString().split('T')[0]
    })

    // Ranking options
    const [topLimit, setTopLimit] = useState<number>(10)
    const [sortBy, setSortBy] = useState<'quantity' | 'revenue'>('quantity')
    const [rankingViewMode, setRankingViewMode] = useState<'chart' | 'table'>('chart')

    // Data state
    const [summary, setSummary] = useState<DashboardSummary | null>(null)
    const [topProducts, setTopProducts] = useState<ProductSalesRanking[]>([])
    const [allProducts, setAllProducts] = useState<Product[]>([])
    const [allOrders, setAllOrders] = useState<OrderResponse[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [hoveredDay, setHoveredDay] = useState<{
        date: string
        label: string
        revenue: number
        ordersCount: number
    } | null>(null)

    // Stock Alerts Filter & Threshold State (Configurable in Settings)
    const navigate = useNavigate()
    const [stockAlertSettings, setStockAlertSettings] = useState<StockAlertSettings>(() => getStockAlertSettings())
    const [stockAlertFilter, setStockAlertFilter] = useState<'ALL' | 'OUT' | 'CRITICAL' | 'LOW'>('ALL')
    const [stockTypeFilter, setStockTypeFilter] = useState<'ALL' | 'LIVING' | 'PRODUCT'>('ALL')
    const [stockSearchTerm, setStockSearchTerm] = useState('')

    // Quick Replenishment Modal State
    const [replenishModalProduct, setReplenishModalProduct] = useState<Product | null>(null)

    // Loss Dilution Simulator state
    const [lossDescription, setLossDescription] = useState('')
    const [lossAmount, setLossAmount] = useState('')
    const [recoveryDays, setRecoveryDays] = useState('30')
    const [dilutionProductsCount, setDilutionProductsCount] = useState<number>(5)
    const [dilutionCategory, setDilutionCategory] = useState<'ALL' | 'PRODUCT' | 'LIVING'>('ALL')
    const [roundingStep, setRoundingStep] = useState<'5cents' | '10cents' | 'none'>('5cents')
    const [simulationResults, setSimulationResults] = useState<DilutionItem[] | null>(null)
    const [simulating, setSimulating] = useState(false)
    const [applyingChanges, setApplyingChanges] = useState(false)
    const [applySuccessMessage, setApplySuccessMessage] = useState<string | null>(null)

    // Primary Data Loader
    const fetchData = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const fromIso = `${startDate}T00:00:00`
            const toIso = `${endDate}T23:59:59`

            const [summaryData, rankingData, productsData, ordersData] = await Promise.all([
                getDashboardSummary(fromIso, toIso).catch(() => null),
                getTopProducts(fromIso, toIso, topLimit, sortBy).catch(() => []),
                getProducts().catch(() => []),
                getOrders().catch(() => [])
            ])

            setSummary(summaryData)
            setTopProducts(rankingData)
            setAllProducts(productsData)
            setAllOrders(ordersData)
            setStockAlertSettings(getStockAlertSettings())
        } catch {
            setError('Não foi possível carregar as métricas do painel.')
        } finally {
            setLoading(false)
        }
    }, [startDate, endDate, topLimit, sortBy])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    // Handle preset buttons
    function handlePresetChange(selected: '7' | '30' | 'month' | '90') {
        setPreset(selected)
        const today = new Date()
        const end = today.toISOString().split('T')[0]
        const start = new Date()

        if (selected === '7') {
            start.setDate(today.getDate() - 7)
        } else if (selected === '30') {
            start.setDate(today.getDate() - 30)
        } else if (selected === '90') {
            start.setDate(today.getDate() - 90)
        } else if (selected === 'month') {
            start.setDate(1)
        }

        setStartDate(start.toISOString().split('T')[0])
        setEndDate(end)
    }

    // ==========================================
    // COMPUTED METRICS & CHARTS DATA
    // ==========================================

    // Daily Sales Timeline data for the interactive chart
    const dailySalesData = useMemo(() => {
        if (!allOrders || allOrders.length === 0) return []

        const paidOrders = allOrders.filter((o) => {
            if (o.status !== 'PAID' || !o.createdAt) return false
            const datePart = o.createdAt.split('T')[0]
            return datePart >= startDate && datePart <= endDate
        })

        const dayMap = new Map<string, {date: string; label: string; revenue: number; ordersCount: number}>()

        const start = new Date(startDate + 'T00:00:00')
        const end = new Date(endDate + 'T23:59:59')
        const diffDays = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)))

        if (diffDays <= 35) {
            const curr = new Date(start)
            while (curr <= end) {
                const dateStr = curr.toISOString().split('T')[0]
                const dayOfWeek = curr.toLocaleDateString('pt-BR', {weekday: 'short'}).replace('.', '')
                const dayMonth = curr.toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit'})
                dayMap.set(dateStr, {
                    date: dateStr,
                    label: `${dayOfWeek}, ${dayMonth}`,
                    revenue: 0,
                    ordersCount: 0
                })
                curr.setDate(curr.getDate() + 1)
            }
        }

        for (const order of paidOrders) {
            const dateStr = order.createdAt.split('T')[0]
            const existing = dayMap.get(dateStr)
            if (existing) {
                existing.revenue += Number(order.totalPrice || 0)
                existing.ordersCount += 1
            } else {
                const d = new Date(dateStr + 'T00:00:00')
                const dayOfWeek = d.toLocaleDateString('pt-BR', {weekday: 'short'}).replace('.', '')
                const dayMonth = d.toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit'})
                dayMap.set(dateStr, {
                    date: dateStr,
                    label: `${dayOfWeek}, ${dayMonth}`,
                    revenue: Number(order.totalPrice || 0),
                    ordersCount: 1
                })
            }
        }

        return Array.from(dayMap.values()).sort((a, b) => a.date.localeCompare(b.date))
    }, [allOrders, startDate, endDate])

    const maxDailyRevenue = useMemo(() => {
        return Math.max(1, ...dailySalesData.map((d) => d.revenue))
    }, [dailySalesData])

    const peakDay = useMemo(() => {
        if (dailySalesData.length === 0) return null
        return dailySalesData.reduce((max, d) => (d.revenue > max.revenue ? d : max), dailySalesData[0])
    }, [dailySalesData])

    const paidOrdersInPeriodCount = useMemo(() => {
        return dailySalesData.reduce((acc, d) => acc + d.ordersCount, 0)
    }, [dailySalesData])

    const averageTicket = useMemo(() => {
        const totalRev = Number(summary?.revenue || 0)
        return paidOrdersInPeriodCount > 0 ? totalRev / paidOrdersInPeriodCount : 0
    }, [summary, paidOrdersInPeriodCount])

    // Living vs Product revenue breakdown
    const categoryBreakdown = useMemo(() => {
        if (!allOrders || !allProducts || allOrders.length === 0) {
            return {livingRevenue: 0, productRevenue: 0, livingPercent: 50, productPercent: 50}
        }

        const prodMap = new Map<number, Product>(allProducts.map((p) => [p.id, p]))
        const paidOrders = allOrders.filter((o) => {
            if (o.status !== 'PAID' || !o.createdAt) return false
            const datePart = o.createdAt.split('T')[0]
            return datePart >= startDate && datePart <= endDate
        })

        let livingRev = 0
        let prodRev = 0

        for (const order of paidOrders) {
            for (const item of order.items) {
                const prod = prodMap.get(item.productId)
                const itemSubtotal = Number(item.subtotal || item.quantity * item.unitPrice || 0)
                if (prod?.type === 'LIVING') {
                    livingRev += itemSubtotal
                } else {
                    prodRev += itemSubtotal
                }
            }
        }

        const total = livingRev + prodRev
        const livingPercent = total > 0 ? (livingRev / total) * 100 : 50
        const productPercent = total > 0 ? (prodRev / total) * 100 : 50

        return {
            livingRevenue: livingRev,
            productRevenue: prodRev,
            livingPercent,
            productPercent
        }
    }, [allOrders, allProducts, startDate, endDate])

    // Pending Orders count & total in store
    const pendingOrders = useMemo(() => {
        return (allOrders || []).filter((o) => o.status === 'PENDING')
    }, [allOrders])

    const totalPendingAmount = useMemo(() => {
        return pendingOrders.reduce((acc, o) => acc + Number(o.totalPrice || 0), 0)
    }, [pendingOrders])

    // Stock Alert Lists (Esgotado, Crítico e Baixo Estoque)
    const outOfStockProducts = useMemo(() => {
        return (allProducts || []).filter((p) => p.active && Number(p.quantity || 0) <= 0)
    }, [allProducts])

    const criticalStockProducts = useMemo(() => {
        return (allProducts || []).filter(
            (p) =>
                p.active &&
                Number(p.quantity || 0) > 0 &&
                Number(p.quantity || 0) <= stockAlertSettings.criticalStockThreshold
        )
    }, [allProducts, stockAlertSettings.criticalStockThreshold])

    const lowStockProducts = useMemo(() => {
        return (allProducts || []).filter(
            (p) =>
                p.active &&
                Number(p.quantity || 0) > stockAlertSettings.criticalStockThreshold &&
                Number(p.quantity || 0) <= stockAlertSettings.lowStockThreshold
        )
    }, [allProducts, stockAlertSettings.criticalStockThreshold, stockAlertSettings.lowStockThreshold])

    const allAlertProducts = useMemo(() => {
        return [...outOfStockProducts, ...criticalStockProducts, ...lowStockProducts]
    }, [outOfStockProducts, criticalStockProducts, lowStockProducts])

    const filteredAlertProducts = useMemo(() => {
        return allAlertProducts.filter((p) => {
            const qty = Number(p.quantity || 0)
            if (stockAlertFilter === 'OUT' && qty > 0) return false
            if (stockAlertFilter === 'CRITICAL' && (qty <= 0 || qty > stockAlertSettings.criticalStockThreshold)) return false
            if (stockAlertFilter === 'LOW' && (qty <= stockAlertSettings.criticalStockThreshold || qty > stockAlertSettings.lowStockThreshold)) return false

            if (stockTypeFilter === 'LIVING' && p.type !== 'LIVING') return false
            if (stockTypeFilter === 'PRODUCT' && p.type !== 'PRODUCT') return false

            if (stockSearchTerm.trim() && !matchesSearch(p.name, stockSearchTerm, p.barcode)) {
                return false
            }

            return true
        })
    }, [allAlertProducts, stockAlertFilter, stockTypeFilter, stockSearchTerm, stockAlertSettings])

    // Max ranking value for top selling horizontal bar chart
    const maxRankingVal = useMemo(() => {
        if (!topProducts || topProducts.length === 0) return 1
        return Math.max(
            1,
            ...topProducts.map((p) => (sortBy === 'quantity' ? Number(p.quantitySold) : Number(p.revenue)))
        )
    }, [topProducts, sortBy])

    // ==========================================
    // LOSS DILUTION SIMULATOR LOGIC
    // ==========================================
    function calculateDilutionItems(
        baseItems: DilutionItem[],
        loss: number,
        rounding: '5cents' | '10cents' | 'none'
    ): DilutionItem[] {
        const activeItems = baseItems.filter((i) => i.enabled)
        const totalActiveRevenue = activeItems.reduce((acc, i) => acc + i.projectedRevenue, 0)

        if (totalActiveRevenue <= 0 || loss <= 0) {
            return baseItems.map((item) => ({
                ...item,
                suggestedPercent: 0,
                suggestedIncrease: 0,
                newPrice: item.currentPrice,
                totalAmortized: 0,
            }))
        }

        const uniformMultiplier = loss / totalActiveRevenue
        const uniformPercent = uniformMultiplier * 100

        return baseItems.map((item) => {
            if (!item.enabled) {
                return {
                    ...item,
                    suggestedPercent: 0,
                    suggestedIncrease: 0,
                    newPrice: item.currentPrice,
                    totalAmortized: 0,
                }
            }

            const rawIncrease = item.currentPrice * uniformMultiplier
            let roundedIncrease: number

            if (rounding === '5cents') {
                roundedIncrease = Math.max(0.05, Math.round(rawIncrease * 20) / 20)
            } else if (rounding === '10cents') {
                roundedIncrease = Math.max(0.1, Math.round(rawIncrease * 10) / 10)
            } else {
                roundedIncrease = Math.max(0.01, Number(rawIncrease.toFixed(2)))
            }

            const newPrice = Number((item.currentPrice + roundedIncrease).toFixed(2))
            const totalAmort = Number((roundedIncrease * item.projectedSales).toFixed(2))

            return {
                ...item,
                suggestedPercent: Number(uniformPercent.toFixed(2)),
                suggestedIncrease: Number(roundedIncrease.toFixed(2)),
                newPrice,
                totalAmortized: totalAmort,
            }
        })
    }

    async function handleSimulateDilution() {
        const loss = Number(lossAmount)
        const days = Number(recoveryDays)
        if (!loss || loss <= 0 || !days || days <= 0) {
            alert('Por favor, informe um valor de perda válido e o período em dias.')
            return
        }

        if (topProducts.length === 0) {
            alert('Não há produtos com histórico de vendas no período para calcular a diluição.')
            return
        }

        setSimulating(true)
        try {
            const productMap = new Map<number, Product>(allProducts.map((p) => [p.id, p]))

            let eligibleRankings = topProducts.map((p) => {
                const prod = productMap.get(p.productId)
                const prodType: 'LIVING' | 'PRODUCT' = prod?.type || 'PRODUCT'
                const currentCataloguePrice =
                    prod?.salePrice && Number(prod.salePrice) > 0
                        ? Number(prod.salePrice)
                        : p.quantitySold > 0
                          ? Number(p.revenue) / Number(p.quantitySold)
                          : 1

                return {
                    ...p,
                    productType: prodType,
                    currentCataloguePrice,
                }
            })

            if (dilutionCategory === 'LIVING') {
                eligibleRankings = eligibleRankings.filter((p) => p.productType === 'LIVING')
            } else if (dilutionCategory === 'PRODUCT') {
                eligibleRankings = eligibleRankings.filter((p) => p.productType === 'PRODUCT')
            }

            if (eligibleRankings.length === 0) {
                alert(
                    `Nenhum item do tipo "${
                        dilutionCategory === 'LIVING' ? 'Ser-vivo' : 'Produto/Seco'
                    }" encontrado no ranking de vendas para o período selecionado.`
                )
                return
            }

            const targetProducts = eligibleRankings.slice(0, dilutionProductsCount)

            const filterDaysRange = Math.max(
                1,
                Math.round(
                    (new Date(endDate).getTime() - new Date(startDate).getTime()) /
                        (1000 * 60 * 60 * 24)
                )
            )

            const initialItems: DilutionItem[] = targetProducts.map((p) => {
                const dailyRate = Math.max(0.1, Number(p.quantitySold) / filterDaysRange)
                const projectedSales = Math.max(1, Math.round(dailyRate * days))
                const currentPrice = Number(p.currentCataloguePrice.toFixed(2))
                const projectedRevenue = currentPrice * projectedSales

                return {
                    productId: p.productId,
                    productName: p.productName,
                    productType: p.productType,
                    currentPrice,
                    projectedSales,
                    projectedRevenue,
                    suggestedPercent: 0,
                    suggestedIncrease: 0,
                    newPrice: currentPrice,
                    totalAmortized: 0,
                    enabled: true,
                }
            })

            const calculated = calculateDilutionItems(initialItems, loss, roundingStep)
            setSimulationResults(calculated)
            setApplySuccessMessage(null)
        } catch (err) {
            console.error(err)
            alert('Erro ao calcular simulação de diluição.')
        } finally {
            setSimulating(false)
        }
    }

    function handleToggleItem(productId: number) {
        if (!simulationResults) return
        const loss = Number(lossAmount)
        const updated = simulationResults.map((item) =>
            item.productId === productId ? {...item, enabled: !item.enabled} : item
        )
        const recalculated = calculateDilutionItems(updated, loss, roundingStep)
        setSimulationResults(recalculated)
    }

    function handleRoundingChange(newStep: '5cents' | '10cents' | 'none') {
        setRoundingStep(newStep)
        if (simulationResults) {
            const loss = Number(lossAmount)
            const recalculated = calculateDilutionItems(simulationResults, loss, newStep)
            setSimulationResults(recalculated)
        }
    }

    async function handleApplyIncreases() {
        if (!simulationResults) return
        const activeItems = simulationResults.filter((i) => i.enabled && i.suggestedIncrease > 0)
        if (activeItems.length === 0) {
            alert('Nenhum produto ativo com aumento sugerido para aplicar.')
            return
        }

        const confirmed = window.confirm(
            `Deseja realmente aplicar o aumento de preço proporcional nos ${activeItems.length} produtos selecionados?`
        )
        if (!confirmed) return

        setApplyingChanges(true)
        setApplySuccessMessage(null)
        try {
            for (const item of activeItems) {
                const product = await getProduct(item.productId)
                const newSale = item.newPrice

                await updateProduct(item.productId, {
                    name: product.name,
                    type: product.type,
                    costPrice: Number(product.costPrice),
                    salePrice: newSale,
                    profitMargin: undefined,
                    barcode: product.barcode,
                })
            }

            const msg = `Preços atualizados com sucesso no catálogo! A perda foi diluída proporcionalmente em ${activeItems.length} produtos.`
            setApplySuccessMessage(msg)
            toast.success(msg, 'Preços Atualizados')
            setSimulationResults(null)
            setLossAmount('')
            setLossDescription('')
            fetchData()
        } catch (err) {
            console.error(err)
            toast.error('Ocorreu um erro ao atualizar os preços de alguns produtos.', 'Erro na Atualização')
        } finally {
            setApplyingChanges(false)
        }
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-16">
            {/* Top Header & Security Banner */}
            <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-1">
                        <ShieldAlert className="h-4 w-4" />
                        <span>Painel Gerencial Bamba Aqua • {currentUser.name}</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Centro de Gestão & Indicadores
                    </h1>
                    <p className="text-slate-400 text-xs mt-1">
                        Acompanhe faturamento, gráficos de giro, alertas preventivos de estoque e compensação inteligente.
                    </p>
                </div>

                {/* Period Controls */}
                <div className="flex flex-wrap items-center gap-2 bg-slate-800 p-1.5 rounded-xl border border-slate-700">
                    <button
                        type="button"
                        onClick={() => handlePresetChange('7')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            preset === '7' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                        }`}
                    >
                        7 dias
                    </button>
                    <button
                        type="button"
                        onClick={() => handlePresetChange('30')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            preset === '30' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                        }`}
                    >
                        30 dias
                    </button>
                    <button
                        type="button"
                        onClick={() => handlePresetChange('month')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            preset === 'month' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                        }`}
                    >
                        Este Mês
                    </button>
                    <button
                        type="button"
                        onClick={() => handlePresetChange('90')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            preset === '90' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                        }`}
                    >
                        90 dias
                    </button>

                    <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block" />

                    <div className="flex items-center gap-1.5 text-xs text-slate-300">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="bg-slate-900 border border-slate-700 rounded-md px-2 py-1 text-[11px] text-white focus:outline-hidden"
                        />
                        <span>até</span>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="bg-slate-900 border border-slate-700 rounded-md px-2 py-1 text-[11px] text-white focus:outline-hidden"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={fetchData}
                        className="p-1.5 text-slate-400 hover:text-white rounded-md transition-colors cursor-pointer"
                        title="Recarregar dados"
                    >
                        <RefreshCw className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-medium">
                    {error}
                </div>
            )}

            {/* Financial & Operational KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. Faturamento */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                    <div className="flex items-center justify-between text-slate-500 mb-2">
                        <span className="text-xs font-medium">Faturamento no Período</span>
                        <DollarSign className="h-4 w-4 text-emerald-600" />
                    </div>
                    <p className="text-2xl font-black text-slate-900">
                        R$ {summary ? Number(summary.revenue || 0).toFixed(2) : '0,00'}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                        {paidOrdersInPeriodCount} venda(s) quitada(s) no período
                    </p>
                </div>

                {/* 2. Lucro Bruto */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                    <div className="flex items-center justify-between text-slate-500 mb-2">
                        <span className="text-xs font-medium">Lucro Bruto Estimado</span>
                        <TrendingUp className="h-4 w-4 text-sky-600" />
                    </div>
                    <p className="text-2xl font-black text-sky-700">
                        R$ {summary ? Number(summary.grossProfit || 0).toFixed(2) : '0,00'}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                        Margem: {summary && summary.revenue > 0 ? ((summary.grossProfit / summary.revenue) * 100).toFixed(1) : '0'}% sobre vendas
                    </p>
                </div>

                {/* 3. Ticket Médio */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                    <div className="flex items-center justify-between text-slate-500 mb-2">
                        <span className="text-xs font-medium">Ticket Médio por Venda</span>
                        <Receipt className="h-4 w-4 text-indigo-600" />
                    </div>
                    <p className="text-2xl font-black text-slate-900">
                        R$ {averageTicket.toFixed(2)}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                        Média gasta por transação
                    </p>
                </div>

                {/* 4. Alerta de Estoque Crítico (Card com Ação Direta) */}
                <div
                    onClick={() => setActiveTab('stock-alerts')}
                    className={`p-5 rounded-2xl border shadow-xs transition-all cursor-pointer relative group ${
                        allAlertProducts.length > 0
                            ? 'bg-rose-50/60 border-rose-300 hover:border-rose-400 hover:bg-rose-50'
                            : 'bg-white border-slate-200/80 hover:border-slate-300'
                    }`}
                >
                    <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-bold ${allAlertProducts.length > 0 ? 'text-rose-800' : 'text-slate-500'}`}>
                            Estoque Crítico / Ruptura
                        </span>
                        {allAlertProducts.length > 0 ? (
                            <span className="flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                            </span>
                        ) : (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        )}
                    </div>
                    <p className={`text-2xl font-black ${allAlertProducts.length > 0 ? 'text-rose-700' : 'text-slate-900'}`}>
                        {allAlertProducts.length === 1 ? '1 item' : `${allAlertProducts.length} itens`}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                        <p className={`text-[11px] ${allAlertProducts.length > 0 ? 'text-rose-700 font-medium' : 'text-slate-400'}`}>
                            {outOfStockProducts.length > 0
                                ? `${outOfStockProducts.length} esgotado(s) • ${criticalStockProducts.length} crítico(s)`
                                : allAlertProducts.length > 0
                                ? `${criticalStockProducts.length} crítico(s) • ${lowStockProducts.length} baixo(s)`
                                : 'Estoque saudável'}
                        </p>
                        <span className="text-[10px] text-rose-600 font-bold group-hover:underline flex items-center gap-0.5">
                            Ver alertas <ArrowRight className="h-3 w-3" />
                        </span>
                    </div>
                </div>
            </div>

            {/* Dashboard Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
                <button
                    type="button"
                    onClick={() => setActiveTab('overview')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activeTab === 'overview'
                            ? 'bg-sky-600 text-white shadow-xs'
                            : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                    }`}
                >
                    <BarChart3 className="h-4 w-4" />
                    <span>Visão Geral & Gráficos</span>
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab('stock-alerts')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activeTab === 'stock-alerts'
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                    }`}
                >
                    <AlertTriangle className="h-4 w-4" />
                    <span>Central de Alertas de Estoque</span>
                    {allAlertProducts.length > 0 && (
                        <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                activeTab === 'stock-alerts'
                                    ? 'bg-rose-500 text-white'
                                    : 'bg-rose-100 text-rose-700'
                            }`}
                        >
                            {allAlertProducts.length}
                        </span>
                    )}
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab('loss-dilution')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activeTab === 'loss-dilution'
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                    }`}
                >
                    <Calculator className="h-4 w-4" />
                    <span>Amortizador de Perdas</span>
                </button>
            </div>

            {/* ======================================================== */}
            {/* TAB 1: VISÃO GERAL & GRÁFICOS INTERATIVOS                */}
            {/* ======================================================== */}
            {activeTab === 'overview' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                    {/* Top Row: Daily Sales Trend Chart + Quick Distribution Panel */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Daily Sales Bar Chart (Span 2 cols) */}
                        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="h-4 w-4 text-sky-600" />
                                        <h2 className="text-sm font-bold text-slate-900">
                                            Evolução de Faturamento Diário
                                        </h2>
                                    </div>
                                    <p className="text-[11px] text-slate-400 mt-0.5">
                                        Distribuição de vendas no período selecionado ({startDate} até {endDate})
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    {hoveredDay ? (
                                        <div className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-xl text-xs font-semibold shadow-md animate-in fade-in zoom-in-95">
                                            <Calendar className="h-3.5 w-3.5 text-sky-400" />
                                            <span className="font-bold text-slate-200">{hoveredDay.label}:</span>
                                            <span className="text-emerald-400 font-mono font-black">
                                                R$ {hoveredDay.revenue.toFixed(2)}
                                            </span>
                                            <span className="text-slate-400 text-[11px]">
                                                ({hoveredDay.ordersCount} {hoveredDay.ordersCount === 1 ? 'venda' : 'vendas'})
                                            </span>
                                        </div>
                                    ) : peakDay && peakDay.revenue > 0 ? (
                                        <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg text-xs font-medium">
                                            <Flame className="h-3.5 w-3.5 text-emerald-600" />
                                            <span>
                                                Pico: <strong>R$ {peakDay.revenue.toFixed(2)}</strong> ({peakDay.label})
                                            </span>
                                        </div>
                                    ) : null}
                                </div>
                            </div>

                            {/* Daily Bar Chart Visualization */}
                            {dailySalesData.length === 0 || maxDailyRevenue <= 1 ? (
                                <div className="py-16 text-center text-xs text-slate-400">
                                    Nenhuma venda quitada no período selecionado para traçar o gráfico.
                                </div>
                            ) : (
                                <div className="space-y-3 pt-2">
                                    {/* Chart Columns container */}
                                    <div className="flex items-end gap-1.5 sm:gap-2 h-48 pt-12 pb-2 px-1 border-b border-slate-100 relative">
                                        {dailySalesData.map((d, index) => {
                                            const heightPct = Math.min(100, Math.max(4, (d.revenue / maxDailyRevenue) * 100))
                                            const isPeak = peakDay && peakDay.date === d.date && d.revenue > 0
                                            const isNearLeft = index < 3
                                            const isNearRight = index > dailySalesData.length - 4
                                            const tooltipAlign = isNearLeft
                                                ? 'left-0'
                                                : isNearRight
                                                ? 'right-0'
                                                : 'left-1/2 -translate-x-1/2'

                                            return (
                                                <div
                                                    key={d.date}
                                                    onMouseEnter={() => setHoveredDay(d)}
                                                    onMouseLeave={() => setHoveredDay(null)}
                                                    className="flex-1 min-w-[12px] max-w-[42px] h-full flex flex-col items-center justify-end group relative cursor-pointer"
                                                >
                                                    {/* Tooltip on hover */}
                                                    <div
                                                        className={`absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center bg-slate-900 text-white text-[10px] py-1.5 px-2.5 rounded-xl shadow-2xl z-30 pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-95 ${tooltipAlign}`}
                                                    >
                                                        <span className="font-bold text-slate-200">{d.label}</span>
                                                        <span className="text-emerald-400 font-mono font-black text-xs">
                                                            R$ {d.revenue.toFixed(2)}
                                                        </span>
                                                        <span className="text-slate-400 text-[10px]">
                                                            {d.ordersCount} {d.ordersCount === 1 ? 'venda' : 'vendas'}
                                                        </span>
                                                    </div>

                                                    {/* Bar element */}
                                                    <div
                                                        style={{height: `${heightPct}%`}}
                                                        className={`w-full rounded-t-lg transition-all duration-300 ${
                                                            isPeak
                                                                ? 'bg-gradient-to-t from-emerald-600 to-teal-400 shadow-sm group-hover:brightness-110'
                                                                : d.revenue > 0
                                                                ? 'bg-gradient-to-t from-sky-600 to-sky-400 group-hover:from-sky-500 group-hover:to-sky-300'
                                                                : 'bg-slate-100 group-hover:bg-slate-200'
                                                        }`}
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>

                                    {/* X-axis indicators */}
                                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium px-1">
                                        <span>{dailySalesData[0]?.label}</span>
                                        <span>Média Diária: R$ {(Number(summary?.revenue || 0) / Math.max(1, dailySalesData.length)).toFixed(2)}</span>
                                        <span>{dailySalesData[dailySalesData.length - 1]?.label}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Side Panel: Category Breakdown & Store Pending Orders */}
                        <div className="space-y-4">
                            {/* Living vs Product Ratio */}
                            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
                                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <Layers className="h-4 w-4 text-indigo-600" />
                                        <h3 className="text-xs font-bold text-slate-900">
                                            Seres Vivos vs Produtos
                                        </h3>
                                    </div>
                                    <span className="text-[10px] text-slate-400">Distribuição</span>
                                </div>

                                <div className="space-y-3">
                                    {/* Progress Bar */}
                                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                                        <div
                                            style={{width: `${categoryBreakdown.livingPercent}%`}}
                                            className="bg-indigo-600 transition-all duration-500"
                                            title={`Seres Vivos: ${categoryBreakdown.livingPercent.toFixed(1)}%`}
                                        />
                                        <div
                                            style={{width: `${categoryBreakdown.productPercent}%`}}
                                            className="bg-emerald-500 transition-all duration-500"
                                            title={`Produtos Secos: ${categoryBreakdown.productPercent.toFixed(1)}%`}
                                        />
                                    </div>

                                    {/* Legend items */}
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-100">
                                            <div className="flex items-center gap-1.5 text-indigo-900 font-bold text-[11px] mb-1">
                                                <Fish className="h-3.5 w-3.5 text-indigo-600" />
                                                <span>Seres Vivos</span>
                                            </div>
                                            <p className="text-sm font-black text-indigo-950 font-mono">
                                                R$ {categoryBreakdown.livingRevenue.toFixed(2)}
                                            </p>
                                            <p className="text-[10px] text-indigo-700 font-medium mt-0.5">
                                                {categoryBreakdown.livingPercent.toFixed(1)}% do faturamento
                                            </p>
                                        </div>

                                        <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                                            <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-[11px] mb-1">
                                                <Package className="h-3.5 w-3.5 text-emerald-600" />
                                                <span>Produtos Secos</span>
                                            </div>
                                            <p className="text-sm font-black text-emerald-950 font-mono">
                                                R$ {categoryBreakdown.productRevenue.toFixed(2)}
                                            </p>
                                            <p className="text-[10px] text-emerald-700 font-medium mt-0.5">
                                                {categoryBreakdown.productPercent.toFixed(1)}% do faturamento
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Store Pending Orders Summary */}
                            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-amber-600" />
                                        <h3 className="text-xs font-bold text-slate-900">
                                            Contas a Receber na Loja
                                        </h3>
                                    </div>
                                    {pendingOrders.length > 0 && (
                                        <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                                            {pendingOrders.length} pendente(s)
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xl font-black text-slate-900 font-mono">
                                            R$ {totalPendingAmount.toFixed(2)}
                                        </p>
                                        <p className="text-[11px] text-slate-400 mt-0.5">
                                            {pendingOrders.length > 0
                                                ? 'Reservas e pedidos aguardando quitação'
                                                : 'Nenhum pedido pendente na loja'}
                                        </p>
                                    </div>
                                    <span className="p-2.5 rounded-xl bg-amber-50 text-amber-700 font-bold text-xs">
                                        {pendingOrders.length}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section: Top Products Ranking (Visual Horizontal Bar Chart vs Table) */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                            <div>
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 text-sky-600" />
                                    <h2 className="text-sm font-bold text-slate-900">
                                        Ranking dos Produtos Mais Vendidos
                                    </h2>
                                </div>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    Visualização gráfica de giro por unidades ou por faturamento gerado.
                                </p>
                            </div>

                            {/* View & Sort Controls */}
                            <div className="flex flex-wrap items-center gap-2">
                                {/* Chart vs Table Toggle */}
                                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                                    <button
                                        type="button"
                                        onClick={() => setRankingViewMode('chart')}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                            rankingViewMode === 'chart'
                                                ? 'bg-white text-sky-700 shadow-xs'
                                                : 'text-slate-600 hover:text-slate-900'
                                        }`}
                                    >
                                        <BarChart3 className="h-3.5 w-3.5" />
                                        <span>Gráfico</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setRankingViewMode('table')}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                            rankingViewMode === 'table'
                                                ? 'bg-white text-sky-700 shadow-xs'
                                                : 'text-slate-600 hover:text-slate-900'
                                        }`}
                                    >
                                        <Table className="h-3.5 w-3.5" />
                                        <span>Tabela</span>
                                    </button>
                                </div>

                                {/* Sort Toggle */}
                                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                                    <button
                                        type="button"
                                        onClick={() => setSortBy('quantity')}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                            sortBy === 'quantity'
                                                ? 'bg-white text-sky-700 shadow-xs'
                                                : 'text-slate-600 hover:text-slate-900'
                                        }`}
                                    >
                                        Por Volume (Unidades)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSortBy('revenue')}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                            sortBy === 'revenue'
                                                ? 'bg-white text-sky-700 shadow-xs'
                                                : 'text-slate-600 hover:text-slate-900'
                                        }`}
                                    >
                                        Por Faturamento (R$)
                                    </button>
                                </div>

                                {/* Limit Selector */}
                                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                                    <select
                                        value={topLimit}
                                        onChange={(e) => setTopLimit(Number(e.target.value))}
                                        className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-800 focus:outline-hidden"
                                    >
                                        <option value={5}>Top 5</option>
                                        <option value={10}>Top 10</option>
                                        <option value={20}>Top 20</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <div className="py-12 text-center text-xs text-slate-400">
                                Carregando dados de giro...
                            </div>
                        ) : topProducts.length === 0 ? (
                            <div className="py-12 text-center text-xs text-slate-400">
                                Nenhuma venda registrada no período selecionado.
                            </div>
                        ) : rankingViewMode === 'chart' ? (
                            /* Visual Horizontal Bar Chart */
                            <div className="space-y-3">
                                {topProducts.map((p, index) => {
                                    const val = sortBy === 'quantity' ? p.quantitySold : Number(p.revenue)
                                    const percentWidth = Math.min(100, Math.max(8, (val / maxRankingVal) * 100))
                                    const avgPrice = p.quantitySold > 0 ? (Number(p.revenue) / p.quantitySold).toFixed(2) : '0.00'

                                    return (
                                        <div
                                            key={p.productId}
                                            className="p-3 rounded-xl bg-slate-50/60 border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all space-y-2"
                                        >
                                            <div className="flex items-center justify-between gap-3 text-xs">
                                                <div className="flex items-center gap-2.5 min-w-0">
                                                    <span
                                                        className={`inline-flex items-center justify-center h-6 w-6 rounded-full font-black text-xs shrink-0 ${
                                                            index === 0
                                                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                                                : index === 1
                                                                ? 'bg-slate-200 text-slate-700 border border-slate-300'
                                                                : index === 2
                                                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                                                : 'bg-white text-slate-500 border border-slate-200'
                                                        }`}
                                                    >
                                                        #{index + 1}
                                                    </span>
                                                    <span className="font-bold text-slate-900 truncate">
                                                        {p.productName}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-4 shrink-0 font-mono">
                                                    <span className="text-slate-500 text-[11px]">
                                                        Méd: R$ {avgPrice}
                                                    </span>
                                                    <span className="font-black text-slate-900 text-sm">
                                                        {sortBy === 'quantity'
                                                            ? `${p.quantitySold} un.`
                                                            : `R$ ${Number(p.revenue).toFixed(2)}`}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Progress bar visual comparison */}
                                            <div className="w-full h-2.5 bg-slate-200/70 rounded-full overflow-hidden">
                                                <div
                                                    style={{width: `${percentWidth}%`}}
                                                    className={`h-full rounded-full transition-all duration-500 ${
                                                        index === 0
                                                            ? 'bg-gradient-to-r from-amber-500 to-amber-400'
                                                            : sortBy === 'quantity'
                                                            ? 'bg-gradient-to-r from-sky-600 to-indigo-600'
                                                            : 'bg-gradient-to-r from-emerald-600 to-teal-500'
                                                    }`}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            /* Detailed Table Mode */
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs text-slate-600">
                                    <thead className="bg-slate-50 uppercase tracking-wider text-slate-500 border-y border-slate-200/80">
                                        <tr>
                                            <th className="py-3 px-4 font-semibold text-center w-14">#</th>
                                            <th className="py-3 px-4 font-semibold">Produto / Ser-vivo</th>
                                            <th className="py-3 px-4 font-semibold text-center">Unidades Vendidas</th>
                                            <th className="py-3 px-4 font-semibold text-right">Receita Gerada</th>
                                            <th className="py-3 px-4 font-semibold text-right">Preço Médio Praticado</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {topProducts.map((p, index) => {
                                            const avgPrice =
                                                p.quantitySold > 0
                                                    ? (Number(p.revenue) / Number(p.quantitySold)).toFixed(2)
                                                    : '0.00'
                                            return (
                                                <tr key={p.productId} className="hover:bg-slate-50/80 transition-colors">
                                                    <td className="py-3 px-4 text-center">
                                                        <span
                                                            className={`inline-flex items-center justify-center h-6 w-6 rounded-full font-bold text-xs ${
                                                                index === 0
                                                                    ? 'bg-amber-100 text-amber-800'
                                                                    : index === 1
                                                                    ? 'bg-slate-200 text-slate-700'
                                                                    : index === 2
                                                                    ? 'bg-amber-50 text-amber-700'
                                                                    : 'text-slate-400'
                                                            }`}
                                                        >
                                                            {index + 1}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 font-semibold text-slate-900">
                                                        {p.productName}
                                                    </td>
                                                    <td className="py-3 px-4 text-center">
                                                        <span className="font-bold text-slate-800 bg-sky-50 text-sky-700 px-2.5 py-0.5 rounded-full">
                                                            {p.quantitySold} un.
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 text-right font-bold text-slate-900 font-mono">
                                                        R$ {Number(p.revenue || 0).toFixed(2)}
                                                    </td>
                                                    <td className="py-3 px-4 text-right text-slate-500 font-mono">
                                                        R$ {avgPrice}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ======================================================== */}
            {/* TAB 2: CENTRAL DE ALERTAS DE ESTOQUE CRÍTICO            */}
            {/* ======================================================== */}
            {activeTab === 'stock-alerts' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                    {/* Summary Cards of Stock Alerts */}
                    {/* Top KPI row of alerts */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                            <div className="flex items-center justify-between text-slate-500 mb-1">
                                <span className="text-xs font-semibold">Total em Alerta</span>
                                <AlertTriangle className="h-4 w-4 text-rose-600" />
                            </div>
                            <p className="text-2xl font-black text-rose-700">
                                {allAlertProducts.length}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                                Precisam de atenção ou reposição
                            </p>
                        </div>

                        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                            <div className="flex items-center justify-between text-slate-500 mb-1">
                                <span className="text-xs font-semibold">Esgotados (Ruptura)</span>
                                <PackageX className="h-4 w-4 text-rose-600" />
                            </div>
                            <p className="text-2xl font-black text-rose-600">
                                {outOfStockProducts.length}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                                Estoque zerado (0 unidades)
                            </p>
                        </div>

                        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                            <div className="flex items-center justify-between text-slate-500 mb-1">
                                <span className="text-xs font-semibold">Nível Crítico</span>
                                <AlertTriangle className="h-4 w-4 text-red-600" />
                            </div>
                            <p className="text-2xl font-black text-red-600">
                                {criticalStockProducts.length}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                                Entre 1 e {stockAlertSettings.criticalStockThreshold} un. (urgente)
                            </p>
                        </div>

                        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                            <div className="flex items-center justify-between text-slate-500 mb-1">
                                <span className="text-xs font-semibold">Estoque Baixo</span>
                                <Package className="h-4 w-4 text-amber-500" />
                            </div>
                            <p className="text-2xl font-black text-amber-700">
                                {lowStockProducts.length}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                                Entre {stockAlertSettings.criticalStockThreshold + 1} e {stockAlertSettings.lowStockThreshold} un. (atenção)
                            </p>
                        </div>
                    </div>

                    {/* Filter & Search Bar */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                            {/* Status Filter */}
                            <button
                                type="button"
                                onClick={() => setStockAlertFilter('ALL')}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                    stockAlertFilter === 'ALL'
                                        ? 'bg-rose-600 text-white shadow-xs'
                                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                Todos ({allAlertProducts.length})
                            </button>
                            <button
                                type="button"
                                onClick={() => setStockAlertFilter('OUT')}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                    stockAlertFilter === 'OUT'
                                        ? 'bg-rose-600 text-white shadow-xs'
                                        : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
                                }`}
                            >
                                Esgotados ({outOfStockProducts.length})
                            </button>
                            <button
                                type="button"
                                onClick={() => setStockAlertFilter('CRITICAL')}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                    stockAlertFilter === 'CRITICAL'
                                        ? 'bg-red-600 text-white shadow-xs'
                                        : 'bg-red-50 text-red-800 hover:bg-red-100'
                                }`}
                            >
                                Críticos ({criticalStockProducts.length})
                            </button>
                            <button
                                type="button"
                                onClick={() => setStockAlertFilter('LOW')}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                    stockAlertFilter === 'LOW'
                                        ? 'bg-amber-600 text-white shadow-xs'
                                        : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                                }`}
                            >
                                Baixo Estoque ({lowStockProducts.length})
                            </button>

                            <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block" />

                            {/* Type Filter */}
                            <select
                                value={stockTypeFilter}
                                onChange={(e) => setStockTypeFilter(e.target.value as 'ALL' | 'LIVING' | 'PRODUCT')}
                                className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-700 focus:outline-hidden"
                            >
                                <option value="ALL">Todas Categorias</option>
                                <option value="LIVING">Seres Vivos (Peixes & Corais)</option>
                                <option value="PRODUCT">Produtos Secos & Equipamentos</option>
                            </select>

                            {/* Settings Info Badge */}
                            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs text-slate-600">
                                <Sliders className="h-3.5 w-3.5 text-slate-400" />
                                <span>
                                    Critérios: Crítico ≤ <strong className="text-red-600">{stockAlertSettings.criticalStockThreshold} un.</strong> • Baixo ≤ <strong className="text-amber-600">{stockAlertSettings.lowStockThreshold} un.</strong>
                                </span>
                                <button
                                    type="button"
                                    onClick={() => navigate('/settings')}
                                    className="text-[11px] font-bold text-sky-600 hover:text-sky-800 hover:underline ml-1 cursor-pointer"
                                    title="Alterar parâmetros nas Configurações da Loja"
                                >
                                    Configurar
                                </button>
                            </div>
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full lg:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                            <input
                                type="text"
                                value={stockSearchTerm}
                                onChange={(e) => setStockSearchTerm(e.target.value)}
                                placeholder="Buscar produto crítico..."
                                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-rose-500 focus:outline-hidden"
                            />
                        </div>
                    </div>

                    {/* Stock Alert Items Table */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                        {filteredAlertProducts.length === 0 ? (
                            <div className="py-16 text-center space-y-2">
                                <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
                                <p className="text-sm font-bold text-slate-800">
                                    Nenhum produto em nível crítico com os filtros selecionados!
                                </p>
                                <p className="text-xs text-slate-400">
                                    O estoque para estes critérios está devidamente abastecido.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200/80">
                                        <tr>
                                            <th className="py-3 px-4">Status de Alerta</th>
                                            <th className="py-3 px-4">Produto</th>
                                            <th className="py-3 px-4">Tipo</th>
                                            <th className="py-3 px-4 text-center">Estoque Atual</th>
                                            <th className="py-3 px-4 text-right">Custo / Venda</th>
                                            <th className="py-3 px-4 text-right">Ação Imediata</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filteredAlertProducts.map((p) => {
                                            const qty = Number(p.quantity || 0)
                                            const isOut = qty <= 0
                                            const isCritical = qty > 0 && qty <= stockAlertSettings.criticalStockThreshold
                                            return (
                                                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                                                    <td className="py-3.5 px-4">
                                                        {isOut ? (
                                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
                                                                <PackageX className="h-3 w-3" />
                                                                Esgotado (0)
                                                            </span>
                                                        ) : isCritical ? (
                                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-100 text-red-800 border border-red-300">
                                                                <AlertTriangle className="h-3 w-3" />
                                                                Crítico ({qty} un.)
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                                                                <Package className="h-3 w-3" />
                                                                Baixo ({qty} un.)
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="py-3.5 px-4">
                                                        <div>
                                                            <p className="font-bold text-slate-900">{p.name}</p>
                                                            {p.barcode && (
                                                                <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                                                                    Código: {p.barcode}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="py-3.5 px-4">
                                                        <span
                                                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                                                                p.type === 'LIVING'
                                                                    ? 'bg-sky-50 text-sky-800 border border-sky-200'
                                                                    : 'bg-slate-100 text-slate-700'
                                                            }`}
                                                        >
                                                            {p.type === 'LIVING' ? <Fish className="h-3 w-3" /> : <Layers className="h-3 w-3" />}
                                                            {p.type === 'LIVING' ? 'Ser-vivo' : 'Produto'}
                                                        </span>
                                                    </td>
                                                    <td className="py-3.5 px-4 text-center">
                                                        <div className="inline-flex flex-col items-center">
                                                            <span className={`font-black font-mono text-sm ${isOut ? 'text-rose-600' : isCritical ? 'text-red-700' : 'text-amber-700'}`}>
                                                                {qty} un.
                                                            </span>
                                                            <div className="w-16 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                                                                    <div
                                                                        style={{
                                                                            width: isOut ? '0%' : `${Math.min(100, (qty / stockAlertSettings.lowStockThreshold) * 100)}%`
                                                                        }}
                                                                        className={`h-full ${isOut ? 'bg-transparent' : isCritical ? 'bg-red-500' : 'bg-amber-500'}`}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                    <td className="py-3.5 px-4 text-right font-mono">
                                                        <p className="font-bold text-slate-900">
                                                            R$ {Number(p.salePrice || 0).toFixed(2)}
                                                        </p>
                                                        <p className="text-[10px] text-slate-400">
                                                            Custo: R$ {Number(p.costPrice || 0).toFixed(2)}
                                                        </p>
                                                    </td>
                                                    <td className="py-3.5 px-4 text-right">
                                                        <button
                                                            type="button"
                                                            onClick={() => setReplenishModalProduct(p)}
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                                                        >
                                                            <PackagePlus className="h-3.5 w-3.5" />
                                                            <span>Repor Estoque</span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ======================================================== */}
            {/* TAB 3: AMORTIZADOR DE PERDAS BIOLÓGICAS (COMPENSAÇÃO)     */}
            {/* ======================================================== */}
            {activeTab === 'loss-dilution' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                    <div className="bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 rounded-2xl p-6 text-white border border-sky-800/50 shadow-md">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
                            <div>
                                <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
                                    <Calculator className="h-4 w-4" />
                                    <span>Compensação Inteligente de Perdas Biológicas</span>
                                </div>
                                <h2 className="text-lg font-bold">
                                    Simulador de Amortização de Perdas no Giro
                                </h2>
                                <p className="text-xs text-slate-300 mt-0.5 max-w-2xl">
                                    Se um peixe ou coral morrer, defina o valor e prazo: o sistema projeta o aumento de poucos centavos nos itens mais vendidos para diluir o prejuízo.
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-[11px] bg-sky-500/20 text-sky-300 border border-sky-400/30 px-3 py-1 rounded-full font-semibold">
                                    Algoritmo Proporcional
                                </span>
                            </div>
                        </div>

                        {/* Simulation Inputs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-xs">
                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1">
                                    Item Perdido (Descrição)
                                </label>
                                <input
                                    type="text"
                                    value={lossDescription}
                                    onChange={(e) => setLossDescription(e.target.value)}
                                    placeholder="Ex: Coral Frogspawn 3 bocas"
                                    className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-hidden"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1">
                                    Valor do Prejuízo a Diluir (R$) *
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-mono font-bold">
                                        R$
                                    </span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={lossAmount}
                                        onChange={(e) => setLossAmount(e.target.value)}
                                        placeholder="0,00"
                                        className="w-full pl-9 pr-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-white placeholder:text-slate-500 font-mono font-bold focus:border-sky-400 focus:outline-hidden"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1">
                                    Prazo de Recuperação (Dias) *
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={recoveryDays}
                                    onChange={(e) => setRecoveryDays(e.target.value)}
                                    placeholder="30"
                                    className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-white placeholder:text-slate-500 font-mono font-bold focus:border-sky-400 focus:outline-hidden"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1">
                                    Quantidade de Itens de Giro
                                </label>
                                <select
                                    value={dilutionProductsCount}
                                    onChange={(e) => setDilutionProductsCount(Number(e.target.value))}
                                    className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-white focus:border-sky-400 focus:outline-hidden"
                                >
                                    <option value={3}>Top 3 Mais Vendidos</option>
                                    <option value={5}>Top 5 Mais Vendidos</option>
                                    <option value={10}>Top 10 Mais Vendidos</option>
                                    <option value={15}>Top 15 Mais Vendidos</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1">
                                    Categoria Alvo
                                </label>
                                <select
                                    value={dilutionCategory}
                                    onChange={(e) => setDilutionCategory(e.target.value as 'ALL' | 'PRODUCT' | 'LIVING')}
                                    className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-white focus:border-sky-400 focus:outline-hidden"
                                >
                                    <option value="ALL">Todos os Produtos (Secos e Seres Vivos)</option>
                                    <option value="PRODUCT">Apenas Produtos Secos (Equipamentos/Rações)</option>
                                    <option value="LIVING">Apenas Seres Vivos (Peixes/Corais)</option>
                                </select>
                            </div>

                            <div className="flex items-end">
                                <button
                                    type="button"
                                    disabled={simulating || !lossAmount || Number(lossAmount) <= 0}
                                    onClick={handleSimulateDilution}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold rounded-lg transition-all shadow-md disabled:opacity-50 cursor-pointer"
                                >
                                    <Sparkles className="h-4 w-4" />
                                    <span>{simulating ? 'Calculando...' : 'Calcular Diluição Proporcional'}</span>
                                </button>
                            </div>
                        </div>

                        {/* Simulation Results Table */}
                        {simulationResults && (
                            <div className="mt-6 space-y-4 animate-in fade-in">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700">
                                    <div>
                                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                            <span>Projeção de Repasse Proporcional no Giro</span>
                                            <span className="text-[11px] font-normal text-slate-400">
                                                (Prazo: {recoveryDays} dias)
                                            </span>
                                        </h3>
                                        <p className="text-xs text-slate-400 mt-0.5">
                                            Aumento proporcional baseado no faturamento projetado de cada item. Desmarque itens que não deseja alterar.
                                        </p>
                                    </div>

                                    {/* Rounding Step Selector */}
                                    <div className="flex items-center gap-1.5 text-xs text-slate-300">
                                        <span className="text-[11px] text-slate-400">Arredondamento:</span>
                                        <div className="inline-flex rounded-lg bg-slate-800 p-0.5 border border-slate-700">
                                            <button
                                                type="button"
                                                onClick={() => handleRoundingChange('5cents')}
                                                className={`px-2 py-1 text-[11px] rounded-md font-semibold transition-all cursor-pointer ${
                                                    roundingStep === '5cents'
                                                        ? 'bg-sky-500 text-slate-950 font-bold'
                                                        : 'text-slate-300 hover:text-white'
                                                }`}
                                            >
                                                5 em 5 centavos
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleRoundingChange('10cents')}
                                                className={`px-2 py-1 text-[11px] rounded-md font-semibold transition-all cursor-pointer ${
                                                    roundingStep === '10cents'
                                                        ? 'bg-sky-500 text-slate-950 font-bold'
                                                        : 'text-slate-300 hover:text-white'
                                                }`}
                                            >
                                                10 em 10 centavos
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleRoundingChange('none')}
                                                className={`px-2 py-1 text-[11px] rounded-md font-semibold transition-all cursor-pointer ${
                                                    roundingStep === 'none'
                                                        ? 'bg-sky-500 text-slate-950 font-bold'
                                                        : 'text-slate-300 hover:text-white'
                                                }`}
                                            >
                                                Exato
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead className="text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-700">
                                            <tr>
                                                <th className="py-2.5 px-3 text-center w-12">Ativo</th>
                                                <th className="py-2.5 px-3">Produto Selecionado</th>
                                                <th className="py-2.5 px-3 text-center">Tipo</th>
                                                <th className="py-2.5 px-3 text-right">Preço Atual</th>
                                                <th className="py-2.5 px-3 text-center">Giro Estimado</th>
                                                <th className="py-2.5 px-3 text-right">Aumento Sugerido</th>
                                                <th className="py-2.5 px-3 text-right">Novo Preço</th>
                                                <th className="py-2.5 px-3 text-right">Amortização</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-800 text-slate-200">
                                            {simulationResults.map((item) => (
                                                <tr
                                                    key={item.productId}
                                                    className={`hover:bg-white/5 transition-colors ${
                                                        !item.enabled ? 'opacity-40' : ''
                                                    }`}
                                                >
                                                    <td className="py-3 px-3 text-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleToggleItem(item.productId)}
                                                            className="text-sky-400 hover:text-sky-300 cursor-pointer"
                                                        >
                                                            {item.enabled ? (
                                                                <CheckSquare className="h-4 w-4" />
                                                            ) : (
                                                                <Square className="h-4 w-4 text-slate-500" />
                                                            )}
                                                        </button>
                                                    </td>
                                                    <td className="py-3 px-3 font-semibold text-white">
                                                        {item.productName}
                                                    </td>
                                                    <td className="py-3 px-3 text-center">
                                                        <span
                                                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                                                item.productType === 'LIVING'
                                                                    ? 'bg-sky-500/20 text-sky-300'
                                                                    : 'bg-indigo-500/20 text-indigo-300'
                                                            }`}
                                                        >
                                                            {item.productType === 'LIVING' ? 'Ser-vivo' : 'Produto'}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-3 text-right font-mono">
                                                        R$ {item.currentPrice.toFixed(2)}
                                                    </td>
                                                    <td className="py-3 px-3 text-center font-mono text-slate-300">
                                                        {item.projectedSales} un.
                                                    </td>
                                                    <td className="py-3 px-3 text-right font-mono font-bold text-emerald-400">
                                                        + R$ {item.suggestedIncrease.toFixed(2)}{' '}
                                                        <span className="text-[10px] font-normal text-slate-400">
                                                            ({item.suggestedPercent.toFixed(1)}%)
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-3 text-right font-mono font-bold text-white bg-white/5 rounded-lg">
                                                        R$ {item.newPrice.toFixed(2)}
                                                    </td>
                                                    <td className="py-3 px-3 text-right font-mono text-sky-300 font-semibold">
                                                        R$ {item.totalAmortized.toFixed(2)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Action buttons and info */}
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-700">
                                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                                        <Info className="h-4 w-4 text-sky-400 shrink-0" />
                                        <span>
                                            Ao aplicar, os preços de venda dos {simulationResults.filter((i) => i.enabled).length} produtos marcados serão atualizados no catálogo.
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setSimulationResults(null)}
                                            className="px-3 py-1.5 text-xs text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                                        >
                                            Descartar
                                        </button>
                                        <button
                                            type="button"
                                            disabled={applyingChanges || simulationResults.filter((i) => i.enabled).length === 0}
                                            onClick={handleApplyIncreases}
                                            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl transition-all disabled:opacity-50 cursor-pointer shadow-md"
                                        >
                                            <ArrowUpRight className="h-4 w-4" />
                                            <span>
                                                {applyingChanges
                                                    ? 'Aplicando Ajustes...'
                                                    : `Aplicar Aumentos (${simulationResults.filter((i) => i.enabled).length} itens)`}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {applySuccessMessage && (
                            <div className="mt-4 p-3 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 rounded-xl text-xs flex items-center gap-2 font-medium">
                                <CheckCircle2 className="h-4 w-4 shrink-0" />
                                <span>{applySuccessMessage}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Quick Replenishment Modal */}
            {replenishModalProduct && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
                    <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <div className="flex items-center gap-2">
                                <PackagePlus className="h-5 w-5 text-sky-600" />
                                <div>
                                    <h3 className="font-bold text-sm text-slate-900">
                                        Repor Estoque de Emergência
                                    </h3>
                                    <p className="text-[11px] text-slate-500">
                                        Entrada de nova remessa para sanar estoque crítico
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setReplenishModalProduct(null)}
                                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <ReplenishmentForm
                            initialProduct={replenishModalProduct}
                            onSuccess={() => {
                                setReplenishModalProduct(null)
                                fetchData()
                                toast.success('Estoque reposto com sucesso!', 'Reposição Concluída')
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard