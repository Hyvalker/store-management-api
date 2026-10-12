import {useState, useEffect} from 'react'
import type {SubmitEvent} from 'react'
import {
    Sliders,
    Percent,
    CheckCircle2,
    Save,
    CreditCard,
    Banknote,
    Zap,
    RotateCcw,
    User as UserIcon,
    AlertTriangle,
    Package
} from 'lucide-react'
import {
    getPaymentDiscounts,
    savePaymentDiscounts,
    getStockAlertSettings,
    saveStockAlertSettings,
    type PaymentDiscountSettings,
    type StockAlertSettings
} from '../../services/settingsService'
import {getCurrentUser, setCurrentUser} from '../../services/authService'
import {useToast} from '../../contexts/ToastContext'

function Settings() {
    const {toast} = useToast()
    const [discounts, setDiscounts] = useState<PaymentDiscountSettings>({
        pix: 10,
        money: 5,
        debit: 0,
        credit: 0,
    })

    const [stockAlerts, setStockAlerts] = useState<StockAlertSettings>({
        criticalStockThreshold: 2,
        lowStockThreshold: 5,
    })

    const [savedSuccess, setSavedSuccess] = useState(false)
    const [operatorName, setOperatorName] = useState('Admin')
    const [operatorRole, setOperatorRole] = useState('Gerente da Loja')

    useEffect(() => {
        setDiscounts(getPaymentDiscounts())
        setStockAlerts(getStockAlertSettings())
        const user = getCurrentUser()
        setOperatorName(user.name)
        setOperatorRole(user.role)
    }, [])

    function handleSaveOperator() {
        const updatedName = operatorName.trim() || 'Admin'
        setCurrentUser({
            name: updatedName,
            role: operatorRole.trim() || 'Gerente da Loja'
        })
        setSavedSuccess(true)
        toast.success(`Perfil do operador salvo como "${updatedName}".`, 'Operador Atualizado')
        setTimeout(() => setSavedSuccess(false), 4000)
    }

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        savePaymentDiscounts(discounts)
        setSavedSuccess(true)
        toast.success('Regras de desconto por forma de pagamento salvas!', 'Configuração Salva')
        setTimeout(() => setSavedSuccess(false), 4000)
    }

    function handleSaveStockAlerts() {
        const crit = Math.max(1, Number(stockAlerts.criticalStockThreshold || 2))
        const low = Math.max(crit + 1, Number(stockAlerts.lowStockThreshold || 5))
        const validated: StockAlertSettings = {
            criticalStockThreshold: crit,
            lowStockThreshold: low,
        }
        setStockAlerts(validated)
        saveStockAlertSettings(validated)
        setSavedSuccess(true)
        toast.success(
            `Parâmetros de estoque salvos (Crítico: ≤ ${crit} un. | Baixo: ≤ ${low} un.)! Já aplicados no Dashboard.`,
            'Alertas de Estoque Salvos'
        )
        setTimeout(() => setSavedSuccess(false), 4000)
    }

    function handleResetDefaults() {
        const defaults: PaymentDiscountSettings = {
            pix: 10,
            money: 5,
            debit: 0,
            credit: 0,
        }
        const defaultStockAlerts: StockAlertSettings = {
            criticalStockThreshold: 2,
            lowStockThreshold: 5,
        }
        setDiscounts(defaults)
        setStockAlerts(defaultStockAlerts)
        savePaymentDiscounts(defaults)
        saveStockAlertSettings(defaultStockAlerts)
        setSavedSuccess(true)
        toast.info('Padrões de descontos e alertas de estoque restaurados.', 'Padrões Restaurados')
        setTimeout(() => setSavedSuccess(false), 4000)
    }

    // Sample simulation values based on R$ 100,00
    const sampleBase = 100
    const samplePix = (sampleBase * (1 - (discounts.pix || 0) / 100)).toFixed(2)
    const sampleMoney = (sampleBase * (1 - (discounts.money || 0) / 100)).toFixed(2)
    const sampleDebit = (sampleBase * (1 - (discounts.debit || 0) / 100)).toFixed(2)
    const sampleCredit = (sampleBase * (1 - (discounts.credit || 0) / 100)).toFixed(2)

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Configurações da Loja
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Gerencie as regras comerciais, descontos de pagamento e parâmetros da Bamba Aqua.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleResetDefaults}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl transition-all shadow-xs"
                >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Restaurar Padrões</span>
                </button>
            </div>

            {savedSuccess && (
                <div className="flex items-center gap-2 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium animate-in fade-in">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                    <span>Configurações de desconto salvas com sucesso! Já estão valendo no Caixa e no Encarte.</span>
                </div>
            )}

            {/* Discount Configuration Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <div className="h-10 w-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                        <Sliders className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-slate-900">
                            Descontos por Forma de Pagamento
                        </h2>
                        <p className="text-xs text-slate-500">
                            Defina a porcentagem de desconto para cada método. Se deixar em 0%, o cliente pagará o valor integral.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* PIX */}
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                    <Zap className="h-3.5 w-3.5 text-emerald-600" />
                                    PIX
                                </span>
                                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full font-bold">
                                    Recomendado
                                </span>
                            </div>
                            <div className="relative">
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.5"
                                    value={discounts.pix}
                                    onChange={(e) =>
                                        setDiscounts({...discounts, pix: Number(e.target.value)})
                                    }
                                    className="w-full px-3 py-2 pr-8 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-900 focus:border-sky-500 focus:outline-hidden"
                                />
                                <Percent className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                            </div>
                            <p className="text-[10px] text-slate-500">
                                Desconto instantâneo à vista
                            </p>
                        </div>

                        {/* Dinheiro */}
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                    <Banknote className="h-3.5 w-3.5 text-green-600" />
                                    Dinheiro (Espécie)
                                </span>
                            </div>
                            <div className="relative">
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.5"
                                    value={discounts.money}
                                    onChange={(e) =>
                                        setDiscounts({...discounts, money: Number(e.target.value)})
                                    }
                                    className="w-full px-3 py-2 pr-8 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-900 focus:border-sky-500 focus:outline-hidden"
                                />
                                <Percent className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                            </div>
                            <p className="text-[10px] text-slate-500">
                                Pagamento em cédulas no balcão
                            </p>
                        </div>

                        {/* Cartão de Débito */}
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                    <CreditCard className="h-3.5 w-3.5 text-sky-600" />
                                    Cartão de Débito
                                </span>
                            </div>
                            <div className="relative">
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.5"
                                    value={discounts.debit}
                                    onChange={(e) =>
                                        setDiscounts({...discounts, debit: Number(e.target.value)})
                                    }
                                    className="w-full px-3 py-2 pr-8 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-900 focus:border-sky-500 focus:outline-hidden"
                                />
                                <Percent className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                            </div>
                            <p className="text-[10px] text-slate-500">
                                Tarifa de máquina de débito
                            </p>
                        </div>

                        {/* Cartão de Crédito */}
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                    <CreditCard className="h-3.5 w-3.5 text-indigo-600" />
                                    Cartão de Crédito
                                </span>
                            </div>
                            <div className="relative">
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.5"
                                    value={discounts.credit}
                                    onChange={(e) =>
                                        setDiscounts({...discounts, credit: Number(e.target.value)})
                                    }
                                    className="w-full px-3 py-2 pr-8 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-900 focus:border-sky-500 focus:outline-hidden"
                                />
                                <Percent className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                            </div>
                            <p className="text-[10px] text-slate-500">
                                Crédito à vista ou parcelado
                            </p>
                        </div>
                    </div>

                    {/* Real-time simulation preview box */}
                    <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200 space-y-2">
                        <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wider">
                            Demonstração em Tempo Real (Para uma venda de R$ 100,00):
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                            <div className="bg-white p-2.5 rounded-lg border border-sky-100">
                                <span className="text-[10px] text-slate-500 block">PIX (-{discounts.pix}%)</span>
                                <span className="font-bold text-emerald-600 text-sm">R$ {samplePix}</span>
                            </div>
                            <div className="bg-white p-2.5 rounded-lg border border-sky-100">
                                <span className="text-[10px] text-slate-500 block">Dinheiro (-{discounts.money}%)</span>
                                <span className="font-bold text-green-700 text-sm">R$ {sampleMoney}</span>
                            </div>
                            <div className="bg-white p-2.5 rounded-lg border border-sky-100">
                                <span className="text-[10px] text-slate-500 block">Débito (-{discounts.debit}%)</span>
                                <span className="font-bold text-slate-800 text-sm">R$ {sampleDebit}</span>
                            </div>
                            <div className="bg-white p-2.5 rounded-lg border border-sky-100">
                                <span className="text-[10px] text-slate-500 block">Crédito (-{discounts.credit}%)</span>
                                <span className="font-bold text-slate-800 text-sm">R$ {sampleCredit}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-3 border-t border-slate-100">
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                        >
                            <Save className="h-4 w-4" />
                            <span>Salvar Configurações de Desconto</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Stock Alerts Thresholds Configuration Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <div className="h-10 w-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                        <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-slate-900">
                            Parâmetros de Alerta de Estoque
                        </h2>
                        <p className="text-xs text-slate-500">
                            Defina os limites de unidades para que os itens sejam classificados como Estoque Crítico ou Estoque Baixo na Central de Alertas do Dashboard.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Critical Threshold */}
                    <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200/80 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                                <AlertTriangle className="h-4 w-4 text-rose-600" />
                                Nível Crítico (Urgente)
                            </span>
                            <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full">
                                Alerta Vermelho
                            </span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                            Itens com estoque maior que zero e menor ou igual a este valor são marcados com <strong>prioridade máxima de reposição</strong>.
                        </p>
                        <div className="flex items-center gap-3 pt-1">
                            <label className="text-xs font-semibold text-slate-700 whitespace-nowrap">
                                Limite (≤ un.):
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="50"
                                value={stockAlerts.criticalStockThreshold}
                                onChange={(e) =>
                                    setStockAlerts({
                                        ...stockAlerts,
                                        criticalStockThreshold: Math.max(1, Number(e.target.value))
                                    })
                                }
                                className="w-24 px-3 py-1.5 bg-white border border-rose-300 rounded-lg text-sm font-bold text-rose-900 focus:outline-hidden focus:ring-2 focus:ring-rose-200"
                            />
                            <span className="text-xs text-slate-500 font-medium">unidades</span>
                        </div>
                    </div>

                    {/* Low Stock Threshold */}
                    <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                                <Package className="h-4 w-4 text-amber-600" />
                                Estoque Baixo (Atenção)
                            </span>
                            <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                                Alerta Amarelo
                            </span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                            Itens com estoque acima do nível crítico, mas menor ou igual a este valor entram em <strong>atenção de reposição preventiva</strong>.
                        </p>
                        <div className="flex items-center gap-3 pt-1">
                            <label className="text-xs font-semibold text-slate-700 whitespace-nowrap">
                                Limite (≤ un.):
                            </label>
                            <input
                                type="number"
                                min={stockAlerts.criticalStockThreshold + 1}
                                max="100"
                                value={stockAlerts.lowStockThreshold}
                                onChange={(e) =>
                                    setStockAlerts({
                                        ...stockAlerts,
                                        lowStockThreshold: Math.max(stockAlerts.criticalStockThreshold + 1, Number(e.target.value))
                                    })
                                }
                                className="w-24 px-3 py-1.5 bg-white border border-amber-300 rounded-lg text-sm font-bold text-amber-900 focus:outline-hidden focus:ring-2 focus:ring-amber-200"
                            />
                            <span className="text-xs text-slate-500 font-medium">unidades</span>
                        </div>
                    </div>
                </div>

                {/* Visual Scale Explanation */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
                    <p className="text-xs font-bold text-slate-700">
                        Como a classificação funcionará no Dashboard:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-[11px]">
                        <div className="p-2 rounded-lg bg-white border border-slate-200 flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-slate-900 shrink-0" />
                            <span><strong>0 un:</strong> Esgotado</span>
                        </div>
                        <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-rose-600 shrink-0" />
                            <span><strong>1 a {stockAlerts.criticalStockThreshold} un:</strong> Crítico</span>
                        </div>
                        <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shrink-0" />
                            <span><strong>{stockAlerts.criticalStockThreshold + 1} a {stockAlerts.lowStockThreshold} un:</strong> Baixo</span>
                        </div>
                        <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
                            <span><strong>&gt; {stockAlerts.lowStockThreshold} un:</strong> Seguro</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <button
                        type="button"
                        onClick={handleSaveStockAlerts}
                        className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                    >
                        <Save className="h-3.5 w-3.5" />
                        <span>Salvar Limites de Estoque</span>
                    </button>
                </div>
            </div>

            {/* Operator Profile Management (Future-ready for Auth) */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                        <UserIcon className="h-4 w-4 text-sky-600" />
                        <span>Identificação do Operador / Usuário Ativo</span>
                    </div>
                    <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full">
                        Pronto para Autenticação / Auth
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                            Nome de Exibição no Sistema
                        </label>
                        <input
                            type="text"
                            value={operatorName}
                            onChange={(e) => setOperatorName(e.target.value)}
                            placeholder="Ex: Admin"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                        />
                        <p className="text-[10px] text-slate-400 mt-1">
                            Este nome aparecerá no menu lateral, nos laudos técnicos do WhatsApp e no painel restrito.
                        </p>
                    </div>

                    <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                            Cargo / Função
                        </label>
                        <input
                            type="text"
                            value={operatorRole}
                            onChange={(e) => setOperatorRole(e.target.value)}
                            placeholder="Ex: Gerente da Loja"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <button
                        type="button"
                        onClick={handleSaveOperator}
                        className="flex items-center gap-2 px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                    >
                        <Save className="h-3.5 w-3.5" />
                        <span>Salvar Nome do Operador</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Settings
