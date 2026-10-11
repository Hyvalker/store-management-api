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
    RotateCcw
} from 'lucide-react'
import {
    getPaymentDiscounts,
    savePaymentDiscounts,
    type PaymentDiscountSettings
} from '../../services/settingsService'

function Settings() {
    const [discounts, setDiscounts] = useState<PaymentDiscountSettings>({
        pix: 10,
        money: 5,
        debit: 0,
        credit: 0,
    })

    const [savedSuccess, setSavedSuccess] = useState(false)

    useEffect(() => {
        setDiscounts(getPaymentDiscounts())
    }, [])

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        savePaymentDiscounts(discounts)
        setSavedSuccess(true)
        setTimeout(() => setSavedSuccess(false), 4000)
    }

    function handleResetDefaults() {
        const defaults: PaymentDiscountSettings = {
            pix: 10,
            money: 5,
            debit: 0,
            credit: 0,
        }
        setDiscounts(defaults)
        savePaymentDiscounts(defaults)
        setSavedSuccess(true)
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
                            className="flex items-center gap-2 px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                        >
                            <Save className="h-4 w-4" />
                            <span>Salvar Configurações de Desconto</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Settings
