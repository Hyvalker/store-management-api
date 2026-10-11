import {useEffect, useState, useCallback} from 'react'
import {
    TrendingUp,
    AlertTriangle,
    DollarSign,
    Package,
    Calendar,
    Sparkles,
    CheckCircle2,
    SlidersHorizontal,
    Calculator,
    ArrowUpRight,
    ShieldAlert,
    RefreshCw
} from 'lucide-react'
import {getDashboardSummary, getTopProducts} from '../../services/dashboardService'
import {updateProduct, getProduct} from '../../services/productService'
import type {DashboardSummary, ProductSalesRanking} from '../../types/product'

interface DilutionItem {
    productId: number
    productName: string
    projectedSales: number
    suggestedIncrease: number
    totalAmortized: number
}

function Dashboard() {
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

    // Data state
    const [summary, setSummary] = useState<DashboardSummary | null>(null)
    const [topProducts, setTopProducts] = useState<ProductSalesRanking[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Loss Dilution Simulator state
    const [lossDescription, setLossDescription] = useState('')
    const [lossAmount, setLossAmount] = useState('')
    const [recoveryDays, setRecoveryDays] = useState('30')
    const [dilutionProductsCount, setDilutionProductsCount] = useState<number>(3)
    const [simulationResults, setSimulationResults] = useState<DilutionItem[] | null>(null)
    const [applyingChanges, setApplyingChanges] = useState(false)
    const [applySuccessMessage, setApplySuccessMessage] = useState<string | null>(null)

    const fetchData = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const fromIso = `${startDate}T00:00:00`
            const toIso = `${endDate}T23:59:59`

            const [summaryData, rankingData] = await Promise.all([
                getDashboardSummary(fromIso, toIso).catch(() => null),
                getTopProducts(fromIso, toIso, topLimit, sortBy).catch(() => [])
            ])

            setSummary(summaryData)
            setTopProducts(rankingData)
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

    // Run Loss Compensation Simulation
    function handleSimulateDilution() {
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

        // Selected top N items for dilution
        const targetProducts = topProducts.slice(0, dilutionProductsCount)

        // Calculate sales velocity (sales per day based on current date range)
        const filterDaysRange = Math.max(
            1,
            Math.round(
                (new Date(endDate).getTime() - new Date(startDate).getTime()) /
                    (1000 * 60 * 60 * 24)
            )
        )

        // Project expected sales in the recovery timeframe
        let totalProjectedVolume = 0
        const itemsWithVelocity = targetProducts.map((p) => {
            const dailyRate = Math.max(0.1, Number(p.quantitySold) / filterDaysRange)
            const projected = Math.max(1, Math.round(dailyRate * days))
            totalProjectedVolume += projected
            return {
                ...p,
                projected,
            }
        })

        // Distribute loss proportionally by volume
        // increase = (loss / totalProjectedVolume)
        const uniformIncrease = loss / totalProjectedVolume

        const calculatedItems: DilutionItem[] = itemsWithVelocity.map((item) => {
            // Round nicely to 2 decimals or 10-cent steps
            let roundedIncrease = Math.round(uniformIncrease * 20) / 20 // 5-cent step
            if (roundedIncrease < 0.1) roundedIncrease = 0.1

            const totalAmort = Number((roundedIncrease * item.projected).toFixed(2))
            return {
                productId: item.productId,
                productName: item.productName,
                projectedSales: item.projected,
                suggestedIncrease: Number(roundedIncrease.toFixed(2)),
                totalAmortized: totalAmort,
            }
        })

        setSimulationResults(calculatedItems)
        setApplySuccessMessage(null)
    }

    // Apply suggested price increases directly into the database
    async function handleApplyIncreases() {
        if (!simulationResults) return
        const confirmed = window.confirm(
            `Deseja realmente aplicar o aumento de preço sugerido em ${simulationResults.length} produtos?`
        )
        if (!confirmed) return

        setApplyingChanges(true)
        setApplySuccessMessage(null)
        try {
            for (const item of simulationResults) {
                const product = await getProduct(item.productId)
                const currentSale = Number(product.salePrice || 0)
                const newSale = Number((currentSale + item.suggestedIncrease).toFixed(2))

                // Calculate new margin based on current cost
                let newMargin = product.profitMargin || 0
                if (product.costPrice && Number(product.costPrice) > 0) {
                    newMargin = ((newSale - Number(product.costPrice)) / Number(product.costPrice)) * 100
                }

                await updateProduct(item.productId, {
                    name: product.name,
                    type: product.type,
                    costPrice: Number(product.costPrice),
                    salePrice: newSale,
                    profitMargin: Number(newMargin.toFixed(2)),
                    barcode: product.barcode,
                })
            }

            setApplySuccessMessage(
                'Preços atualizados com sucesso no catálogo! A perda foi diluída nos produtos de maior saída.'
            )
            setSimulationResults(null)
            setLossAmount('')
            setLossDescription('')
            fetchData()
        } catch (err) {
            console.error(err)
            alert('Ocorreu um erro ao atualizar os preços de alguns produtos.')
        } finally {
            setApplyingChanges(false)
        }
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Top Security Banner */}
            <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-1">
                        <ShieldAlert className="h-4 w-4" />
                        <span>Área Restrita do Lojista • Marcelo</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Painel Gerencial Bamba Aqua
                    </h1>
                    <p className="text-slate-400 text-xs mt-1">
                        Análise de faturamento, giro de itens e ferramenta de compensação de perdas biológicas.
                    </p>
                </div>

                {/* Date Controls */}
                <div className="flex flex-wrap items-center gap-2 bg-slate-800 p-1.5 rounded-xl border border-slate-700">
                    <button
                        type="button"
                        onClick={() => handlePresetChange('7')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            preset === '7' ? 'bg-sky-600 text-white' : 'text-slate-300 hover:text-white'
                        }`}
                    >
                        7 dias
                    </button>
                    <button
                        type="button"
                        onClick={() => handlePresetChange('30')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            preset === '30' ? 'bg-sky-600 text-white' : 'text-slate-300 hover:text-white'
                        }`}
                    >
                        30 dias
                    </button>
                    <button
                        type="button"
                        onClick={() => handlePresetChange('month')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            preset === 'month' ? 'bg-sky-600 text-white' : 'text-slate-300 hover:text-white'
                        }`}
                    >
                        Este Mês
                    </button>
                    <button
                        type="button"
                        onClick={() => handlePresetChange('90')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            preset === '90' ? 'bg-sky-600 text-white' : 'text-slate-300 hover:text-white'
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
                        className="p-1.5 text-slate-400 hover:text-white rounded-md transition-colors"
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

            {/* Financial Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                    <div className="flex items-center justify-between text-slate-500 mb-2">
                        <span className="text-xs font-medium">Faturamento no Período</span>
                        <DollarSign className="h-4 w-4 text-emerald-600" />
                    </div>
                    <p className="text-2xl font-black text-slate-900">
                        R$ {summary ? Number(summary.revenue || 0).toFixed(2) : '0,00'}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">Total de vendas pagas</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                    <div className="flex items-center justify-between text-slate-500 mb-2">
                        <span className="text-xs font-medium">Lucro Bruto Estimado</span>
                        <TrendingUp className="h-4 w-4 text-sky-600" />
                    </div>
                    <p className="text-2xl font-black text-sky-700">
                        R$ {summary ? Number(summary.grossProfit || 0).toFixed(2) : '0,00'}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">Receita menos custo de mercadorias</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                    <div className="flex items-center justify-between text-slate-500 mb-2">
                        <span className="text-xs font-medium">Perdas Registradas</span>
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                    </div>
                    <p className="text-2xl font-black text-amber-600">
                        R$ {summary ? Number(summary.lossCost || 0).toFixed(2) : '0,00'}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">Custo de mortes/perdas no período</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                    <div className="flex items-center justify-between text-slate-500 mb-2">
                        <span className="text-xs font-medium">Patrimônio em Estoque</span>
                        <Package className="h-4 w-4 text-indigo-600" />
                    </div>
                    <p className="text-2xl font-black text-slate-900">
                        R$ {summary ? Number(summary.inventorySaleValue || 0).toFixed(2) : '0,00'}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                        Custo: R$ {summary ? Number(summary.inventoryCostValue || 0).toFixed(2) : '0,00'}
                    </p>
                </div>
            </div>

            {/* Special Section: Loss Dilution Simulator (O pedido do Marcelo) */}
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
                            Algoritmo de Diluição
                        </span>
                    </div>
                </div>

                {/* Simulation Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-xs">
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
                            Valor da Perda (R$) <span className="text-rose-400">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                                R$
                            </span>
                            <input
                                type="number"
                                min="1"
                                step="0.01"
                                value={lossAmount}
                                onChange={(e) => setLossAmount(e.target.value)}
                                placeholder="Ex: 500.00"
                                className="w-full pl-9 pr-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-white font-bold placeholder:text-slate-500 focus:border-sky-400 focus:outline-hidden"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                            Prazo de Recuperação Desejado
                        </label>
                        <select
                            value={recoveryDays}
                            onChange={(e) => setRecoveryDays(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-white focus:border-sky-400 focus:outline-hidden"
                        >
                            <option value="15">15 dias (Rápido)</option>
                            <option value="30">30 dias (Recomendado)</option>
                            <option value="60">60 dias (Diluição Suave)</option>
                            <option value="90">90 dias (Longo Prazo)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                            Diluir Entre Quantos Itens?
                        </label>
                        <select
                            value={dilutionProductsCount}
                            onChange={(e) => setDilutionProductsCount(Number(e.target.value))}
                            className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-white focus:border-sky-400 focus:outline-hidden"
                        >
                            <option value={3}>Top 3 produtos mais vendidos</option>
                            <option value={5}>Top 5 produtos mais vendidos</option>
                            <option value={10}>Top 10 produtos mais vendidos</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end mt-4">
                    <button
                        type="button"
                        onClick={handleSimulateDilution}
                        className="flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-sm"
                    >
                        <Sparkles className="h-4 w-4" />
                        <span>Simular Projeção de Compensação</span>
                    </button>
                </div>

                {/* Simulation Result Presentation */}
                {simulationResults && (
                    <div className="mt-5 p-5 bg-slate-800/90 rounded-xl border border-sky-400/40 animate-in fade-in duration-200 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700 pb-3">
                            <div>
                                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                    <span>Proposta de Diluição para Recuperar R$ {Number(lossAmount).toFixed(2)}</span>
                                    <span className="text-[11px] text-sky-400 font-normal">
                                        em {recoveryDays} dias
                                    </span>
                                </h3>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    Baseado no ritmo diário de vendas dos seus itens de maior saída:
                                </p>
                            </div>

                            <div className="text-right">
                                <span className="text-[11px] text-slate-400">Total Previsto:</span>
                                <p className="text-base font-black text-emerald-400">
                                    R${' '}
                                    {simulationResults
                                        .reduce((acc, i) => acc + i.totalAmortized, 0)
                                        .toFixed(2)}
                                </p>
                            </div>
                        </div>

                        {/* Projection Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs text-slate-300">
                                <thead className="border-b border-slate-700 text-slate-400 uppercase text-[10px] tracking-wider">
                                    <tr>
                                        <th className="py-2 px-3">Produto Selecionado</th>
                                        <th className="py-2 px-3 text-center">Vendas Esperadas ({recoveryDays}d)</th>
                                        <th className="py-2 px-3 text-right">Acréscimo Sugerido</th>
                                        <th className="py-2 px-3 text-right">Previsão Amortizada</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/50">
                                    {simulationResults.map((item) => (
                                        <tr key={item.productId} className="hover:bg-slate-700/30">
                                            <td className="py-2.5 px-3 font-semibold text-white">
                                                {item.productName}
                                            </td>
                                            <td className="py-2.5 px-3 text-center text-slate-400">
                                                ~{item.projectedSales} un.
                                            </td>
                                            <td className="py-2.5 px-3 text-right font-bold text-sky-400">
                                                + R$ {item.suggestedIncrease.toFixed(2)}
                                            </td>
                                            <td className="py-2.5 px-3 text-right font-bold text-emerald-400">
                                                R$ {item.totalAmortized.toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-700">
                            <p className="text-[11px] text-slate-400">
                                Ao aplicar, os preços de venda dos produtos acima serão aumentados automaticamente no catálogo.
                            </p>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setSimulationResults(null)}
                                    className="px-3 py-1.5 text-xs text-slate-400 hover:text-white rounded-lg transition-colors"
                                >
                                    Descartar
                                </button>
                                <button
                                    type="button"
                                    disabled={applyingChanges}
                                    onClick={handleApplyIncreases}
                                    className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl transition-all disabled:opacity-50"
                                >
                                    <ArrowUpRight className="h-4 w-4" />
                                    <span>
                                        {applyingChanges
                                            ? 'Aplicando Ajustes...'
                                            : 'Aplicar Aumentos no Catálogo'}
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

            {/* Ranking of Top Selling Products Section */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                    <div>
                        <div className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-sky-600" />
                            <h2 className="text-base font-bold text-slate-900">
                                Ranking dos Produtos Mais Vendidos
                            </h2>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Identifique os produtos de maior giro para precificação e amortização de perdas.
                        </p>
                    </div>

                    {/* Ranking Controls */}
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Sort Toggle */}
                        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                            <button
                                type="button"
                                onClick={() => setSortBy('quantity')}
                                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                                    sortBy === 'quantity'
                                        ? 'bg-white text-sky-700 shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                Por Unidades (Volume)
                            </button>
                            <button
                                type="button"
                                onClick={() => setSortBy('revenue')}
                                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
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
                            <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
                            <span>Mostrar:</span>
                            <select
                                value={topLimit}
                                onChange={(e) => setTopLimit(Number(e.target.value))}
                                className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-800 focus:outline-hidden"
                            >
                                <option value={3}>Top 3</option>
                                <option value={5}>Top 5</option>
                                <option value={10}>Top 10</option>
                                <option value={20}>Top 20</option>
                                <option value={50}>Top 50</option>
                            </select>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="py-12 text-center text-xs text-slate-400">
                        Carregando ranking de vendas...
                    </div>
                ) : topProducts.length === 0 ? (
                    <div className="py-12 text-center text-xs text-slate-400">
                        Nenhuma venda registrada no período selecionado ({startDate} até {endDate}).
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-slate-600">
                            <thead className="bg-slate-50 uppercase tracking-wider text-slate-500 border-y border-slate-200/80">
                                <tr>
                                    <th className="py-3 px-4 font-semibold text-center w-14">#</th>
                                    <th className="py-3 px-4 font-semibold">Produto / Ser-vivo</th>
                                    <th className="py-3 px-4 font-semibold text-center">
                                        Unidades Vendidas
                                    </th>
                                    <th className="py-3 px-4 font-semibold text-right">
                                        Receita Gerada
                                    </th>
                                    <th className="py-3 px-4 font-semibold text-right">
                                        Preço Médio Praticado
                                    </th>
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
    )
}

export default Dashboard