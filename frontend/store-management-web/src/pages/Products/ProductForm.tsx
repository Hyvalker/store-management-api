import {useState} from 'react'
import type {SubmitEvent} from 'react'
import {
    PlusCircle,
    CheckCircle2,
    AlertCircle,
    Percent,
    DollarSign,
    Layers
} from 'lucide-react'
import {createProduct} from '../../services/productService'
import type {CreateProductRequest, ProductType} from '../../types/product'

interface ProductFormProps {
    onSuccess?: () => void
}

function ProductForm({onSuccess}: ProductFormProps) {
    const [name, setName] = useState('')
    const [type, setType] = useState<ProductType>('PRODUCT')
    const [quantity, setQuantity] = useState('')
    const [costPrice, setCostPrice] = useState('')
    const [salePrice, setSalePrice] = useState('')
    const [profitMargin, setProfitMargin] = useState('')
    const [barcode, setBarcode] = useState('')

    const [lastEditedPriceField, setLastEditedPriceField] = useState<
        'salePrice' | 'profitMargin' | null
    >(null)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault()

        setLoading(true)
        setError(null)
        setSuccess(false)

        try {
            const data: CreateProductRequest = {
                name: name.trim(),
                type,
                quantity: Number(quantity),
                costPrice: Number(costPrice),
                barcode: barcode.trim() || null,
            }

            if (lastEditedPriceField === 'salePrice') {
                data.salePrice = Number(salePrice)
            }

            if (lastEditedPriceField === 'profitMargin') {
                data.profitMargin = Number(profitMargin)
            }

            await createProduct(data)

            setSuccess(true)

            setName('')
            setType('PRODUCT')
            setQuantity('')
            setCostPrice('')
            setSalePrice('')
            setProfitMargin('')
            setBarcode('')
            setLastEditedPriceField(null)

            if (onSuccess) {
                onSuccess()
            }
        } catch (err: unknown) {
            console.error(err)
            setError(
                'Não foi possível cadastrar o produto. Verifique se o nome já existe no catálogo.'
            )
        } finally {
            setLoading(false)
        }
    }

    function handleCostPriceChange(value: string) {
        setCostPrice(value)
        const cost = Number(value)
        if (!cost || cost <= 0) return

        if (lastEditedPriceField === 'salePrice' && salePrice) {
            const sale = Number(salePrice)
            const margin = ((sale - cost) / cost) * 100
            setProfitMargin(margin.toFixed(2))
        } else if (lastEditedPriceField === 'profitMargin' && profitMargin) {
            const margin = Number(profitMargin)
            const sale = cost * (1 + margin / 100)
            setSalePrice(sale.toFixed(2))
        }
    }

    function handleSalePriceChange(value: string) {
        setSalePrice(value)
        setLastEditedPriceField('salePrice')

        const cost = Number(costPrice)
        const sale = Number(value)
        if (!cost || cost <= 0 || !sale || sale < 0) return

        const margin = ((sale - cost) / cost) * 100
        setProfitMargin(margin.toFixed(2))
    }

    function handleProfitMarginChange(value: string) {
        setProfitMargin(value)
        setLastEditedPriceField('profitMargin')

        const cost = Number(costPrice)
        const margin = Number(value)
        if (!cost || cost <= 0 || !margin || margin < 0) return

        const sale = cost * (1 + margin / 100)
        setSalePrice(sale.toFixed(2))
    }

    const calculatedProfitReais =
        costPrice && salePrice && Number(salePrice) > Number(costPrice)
            ? (Number(salePrice) - Number(costPrice)).toFixed(2)
            : null

    return (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <PlusCircle className="h-5 w-5" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-900">
                        Novo Produto no Catálogo
                    </h2>
                    <p className="text-xs text-slate-500">
                        Use este formulário para adicionar itens ou seres vivos que ainda não existiam na loja.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Bloco 1: Identificação */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <label htmlFor="new-name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Nome Completo do Item <span className="text-rose-500">*</span>
                        </label>
                        <input
                            id="new-name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ex.: Peixe-palhaço (Amphiprion ocellaris) ou Ração Marine 100g"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all font-medium placeholder:text-slate-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="new-type" className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Classificação / Tipo <span className="text-rose-500">*</span>
                        </label>
                        <select
                            id="new-type"
                            value={type}
                            onChange={(e) => setType(e.target.value as ProductType)}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all font-medium"
                        >
                            <option value="PRODUCT">Produto (Ração, Equipamento, Sal)</option>
                            <option value="LIVING">Ser-vivo (Peixe, Coral, Invertebrado)</option>
                        </select>
                    </div>
                </div>

                {/* Bloco 2: Código e Quantidade Inicial */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="new-barcode" className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Código de Barras ou Identificador (Opcional)
                        </label>
                        <input
                            id="new-barcode"
                            type="text"
                            value={barcode}
                            onChange={(e) => setBarcode(e.target.value)}
                            placeholder="Ex: 7891234567890"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all font-mono placeholder:text-slate-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="new-quantity" className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Quantidade Inicial em Estoque <span className="text-rose-500">*</span>
                        </label>
                        <input
                            id="new-quantity"
                            type="number"
                            min="0"
                            required
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder="Ex: 15"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all font-semibold"
                        />
                    </div>
                </div>

                {/* Bloco 3: Preços e Margem (Card Financeiro) */}
                <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        <Layers className="h-4 w-4 text-sky-600" />
                        <span>Precificação & Margem de Lucro</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="new-cost" className="block text-xs font-semibold text-slate-700 mb-1.5">
                                Preço de Custo Unitário <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                                    R$
                                </span>
                                <input
                                    id="new-cost"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    required
                                    value={costPrice}
                                    onChange={(e) => handleCostPriceChange(e.target.value)}
                                    placeholder="0,00"
                                    className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all font-semibold"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="new-margin" className="block text-xs font-semibold text-slate-700 mb-1.5">
                                Margem de Lucro Desejada (%)
                            </label>
                            <div className="relative">
                                <input
                                    id="new-margin"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={profitMargin}
                                    onChange={(e) => handleProfitMarginChange(e.target.value)}
                                    placeholder="Ex: 85"
                                    className="w-full px-3.5 py-2.5 pr-8 bg-white border border-slate-300 rounded-xl text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all font-semibold"
                                />
                                <Percent className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="new-sale" className="block text-xs font-bold text-sky-700 mb-1.5">
                                Preço Final de Venda
                            </label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-sky-700">
                                    R$
                                </span>
                                <input
                                    id="new-sale"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={salePrice}
                                    onChange={(e) => handleSalePriceChange(e.target.value)}
                                    placeholder="0,00"
                                    className="w-full pl-9 pr-3.5 py-2.5 bg-sky-50/50 border-2 border-sky-500 rounded-xl text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 transition-all font-bold text-slate-900"
                                />
                            </div>
                        </div>
                    </div>

                    {calculatedProfitReais && (
                        <div className="p-3 bg-emerald-50 border border-emerald-200/80 rounded-xl flex items-center justify-between text-xs text-emerald-900">
                            <span className="flex items-center gap-1.5 font-medium">
                                <DollarSign className="h-4 w-4 text-emerald-700" />
                                Lucro Bruto Estimado por Unidade:
                            </span>
                            <span className="font-bold text-sm text-emerald-900">
                                R$ {calculatedProfitReais} ({profitMargin}%)
                            </span>
                        </div>
                    )}
                </div>

                {error && (
                    <div className="flex items-center gap-2 p-3 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs font-medium">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {success && (
                    <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-medium">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        <span>Produto cadastrado com sucesso no catálogo!</span>
                    </div>
                )}

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm disabled:opacity-50"
                    >
                        <PlusCircle className="h-4 w-4" />
                        <span>{loading ? 'Cadastrando...' : 'Cadastrar Produto no Catálogo'}</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ProductForm