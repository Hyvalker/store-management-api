import {useState, useEffect, useRef} from 'react'
import type {SubmitEvent} from 'react'
import {
    ScanBarcode,
    Search,
    PackagePlus,
    CheckCircle2,
    AlertCircle,
    Percent,
    DollarSign,
    Fish,
    Layers
} from 'lucide-react'
import {createStockEntry, getProducts, getProductByBarcode} from '../../services/productService'
import type {Product, CreateStockEntryRequest} from '../../types/product'

interface ReplenishmentFormProps {
    onSuccess?: () => void
}

function ReplenishmentForm({onSuccess}: ReplenishmentFormProps) {
    const [products, setProducts] = useState<Product[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [barcodeInput, setBarcodeInput] = useState('')
    const [highlightedIndex, setHighlightedIndex] = useState<number>(0)

    // Form inputs - leave empty initially as requested by user
    const [quantity, setQuantity] = useState('')
    const [costPrice, setCostPrice] = useState('')
    const [salePrice, setSalePrice] = useState('')
    const [profitMargin, setProfitMargin] = useState('')

    const [lastEditedPriceField, setLastEditedPriceField] = useState<
        'salePrice' | 'profitMargin' | null
    >(null)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const autocompleteRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        async function load() {
            try {
                const list = await getProducts()
                setProducts(list)
            } catch (err) {
                console.error(err)
            }
        }
        load()
    }, [])

    // Autocomplete filtering
    const matchingProducts = products.filter((p) => {
        if (!searchTerm.trim()) return false
        return p.name.toLowerCase().includes(searchTerm.toLowerCase())
    })

    // Barcode quick search
    async function handleBarcodeSearch(code: string) {
        if (!code.trim()) return
        setError(null)
        try {
            const found = await getProductByBarcode(code.trim())
            if (found) {
                setSelectedProduct(found)
                setBarcodeInput('')
                setSearchTerm('')
            }
        } catch {
            setError(`Nenhum produto ativo encontrado com o código "${code}".`)
        }
    }

    // Bidirectional Calculation (preserved exactly as requested)
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

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!selectedProduct) {
            setError('Selecione um produto para dar entrada.')
            return
        }
        if (!quantity || Number(quantity) <= 0) {
            setError('Informe uma quantidade válida maior que zero.')
            return
        }
        if (!costPrice || Number(costPrice) < 0) {
            setError('Informe o preço de custo da remessa.')
            return
        }

        setLoading(true)
        setError(null)
        setSuccessMessage(null)

        try {
            const payload: CreateStockEntryRequest = {
                productId: selectedProduct.id,
                quantity: Number(quantity),
                costPrice: Number(costPrice),
            }

            if (salePrice && Number(salePrice) >= 0) {
                payload.salePrice = Number(salePrice)
            }
            if (profitMargin && Number(profitMargin) >= 0) {
                payload.profitMargin = Number(profitMargin)
            }

            const updated = await createStockEntry(payload)

            setSuccessMessage(
                `Entrada de ${quantity} un. realizada com sucesso para "${updated.name}"! Novo estoque: ${updated.quantity} un.`
            )

            // Reset fields
            setSelectedProduct(null)
            setQuantity('')
            setCostPrice('')
            setSalePrice('')
            setProfitMargin('')
            setLastEditedPriceField(null)

            if (onSuccess) {
                onSuccess()
            }
        } catch (err: unknown) {
            console.error(err)
            setError('Não foi possível registrar a entrada de estoque. Verifique os dados.')
        } finally {
            setLoading(false)
        }
    }

    // Profit in R$ calculation preview
    const calculatedProfitReais =
        costPrice && salePrice && Number(salePrice) > Number(costPrice)
            ? (Number(salePrice) - Number(costPrice)).toFixed(2)
            : null

    return (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                    <PackagePlus className="h-5 w-5" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-900">
                        Entrada de Estoque / Remessas
                    </h2>
                    <p className="text-xs text-slate-500">
                        Reposição diária para produtos que já existem na loja.
                    </p>
                </div>
            </div>

            {/* Product Selector Section */}
            {!selectedProduct ? (
                <div className="space-y-4 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Search by Name with Autocomplete */}
                        <div className="relative" ref={autocompleteRef}>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                Buscar por Nome (Autocomplete)
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value)
                                        setHighlightedIndex(0)
                                    }}
                                    onKeyDown={(e) => {
                                        if (matchingProducts.length === 0) return

                                        if (e.key === 'ArrowDown') {
                                            e.preventDefault()
                                            setHighlightedIndex((prev) => (prev + 1) % matchingProducts.length)
                                        } else if (e.key === 'ArrowUp') {
                                            e.preventDefault()
                                            setHighlightedIndex((prev) => (prev - 1 + matchingProducts.length) % matchingProducts.length)
                                        } else if (e.key === 'Enter') {
                                            if (highlightedIndex >= 0 && highlightedIndex < matchingProducts.length) {
                                                e.preventDefault()
                                                const chosen = matchingProducts[highlightedIndex]
                                                setSelectedProduct(chosen)
                                                setSearchTerm('')
                                                setHighlightedIndex(0)
                                            }
                                        } else if (e.key === 'Escape') {
                                            setSearchTerm('')
                                            setHighlightedIndex(0)
                                        }
                                    }}
                                    placeholder="Digite ex: 'palha', 'coral', 'racao'..."
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all placeholder:text-slate-400"
                                />
                            </div>

                            {/* Dropdown list */}
                            {matchingProducts.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-slate-200 shadow-xl z-30 max-h-60 overflow-y-auto divide-y divide-slate-100">
                                    {matchingProducts.slice(0, 8).map((p, index) => (
                                        <button
                                            key={p.id}
                                            type="button"
                                            onMouseEnter={() => setHighlightedIndex(index)}
                                            onClick={() => {
                                                setSelectedProduct(p)
                                                setSearchTerm('')
                                                setHighlightedIndex(0)
                                            }}
                                            className={`w-full px-4 py-2.5 text-left flex items-center justify-between text-xs transition-colors ${
                                                index === highlightedIndex
                                                    ? 'bg-sky-100 text-sky-950 font-semibold border-l-4 border-sky-600'
                                                    : 'hover:bg-sky-50 text-slate-800'
                                            }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold">
                                                    {p.name}
                                                </span>
                                                <span className="text-[10px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                                                    {p.type === 'LIVING' ? 'Ser-vivo' : 'Produto'}
                                                </span>
                                            </div>
                                            <span className="text-slate-600 font-medium">
                                                Estoque: {p.quantity} un.
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Search by Barcode */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                Ou bipe o Código de Barras
                            </label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <ScanBarcode className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input
                                        type="text"
                                        value={barcodeInput}
                                        onChange={(e) => setBarcodeInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault()
                                                handleBarcodeSearch(barcodeInput)
                                            }
                                        }}
                                        placeholder="Passe a leitora aqui..."
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all font-mono placeholder:text-slate-400"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleBarcodeSearch(barcodeInput)}
                                    className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-medium transition-all"
                                >
                                    Buscar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                /* Selected Product Banner */
                <div className="mb-6 p-4 rounded-xl bg-sky-50/80 border border-sky-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-sky-600 text-white flex items-center justify-center">
                            {selectedProduct.type === 'LIVING' ? (
                                <Fish className="h-5 w-5" />
                            ) : (
                                <Layers className="h-5 w-5" />
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-sm font-bold text-slate-900">
                                    {selectedProduct.name}
                                </h3>
                                <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-white text-sky-700 border border-sky-200">
                                    {selectedProduct.type === 'LIVING' ? 'Ser-vivo' : 'Produto'}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Estoque atual: <strong className="text-slate-800">{selectedProduct.quantity} un.</strong> • Cód: {selectedProduct.barcode || 'Sem código'}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setSelectedProduct(null)}
                        className="text-xs font-semibold text-sky-700 hover:text-sky-900 px-3 py-1.5 rounded-lg hover:bg-sky-100 transition-colors"
                    >
                        Trocar Produto
                    </button>
                </div>
            )}

            {/* Entry Form */}
            {selectedProduct && (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Qtd Recebida */}
                        <div>
                            <label htmlFor="replenish-qty" className="block text-xs font-semibold text-slate-700 mb-1.5">
                                Qtd. Recebida <span className="text-rose-500">*</span>
                            </label>
                            <input
                                id="replenish-qty"
                                type="number"
                                min="1"
                                required
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="Ex: 10"
                                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all font-semibold"
                            />
                        </div>

                        {/* Preço de Custo (vazio inicialmente) */}
                        <div>
                            <label htmlFor="replenish-cost" className="block text-xs font-semibold text-slate-700 mb-1.5">
                                Preço de Custo (R$) <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                                    R$
                                </span>
                                <input
                                    id="replenish-cost"
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

                        {/* Margem de Lucro % (calcula ou é calculada) */}
                        <div>
                            <label htmlFor="replenish-margin" className="block text-xs font-semibold text-slate-700 mb-1.5">
                                Margem de Lucro (%)
                            </label>
                            <div className="relative">
                                <input
                                    id="replenish-margin"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={profitMargin}
                                    onChange={(e) => handleProfitMarginChange(e.target.value)}
                                    placeholder="Ex: 80"
                                    className="w-full px-3.5 py-2.5 pr-8 bg-white border border-slate-300 rounded-xl text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all font-semibold"
                                />
                                <Percent className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                            </div>
                        </div>

                        {/* Preço de Venda Final */}
                        <div>
                            <label htmlFor="replenish-sale" className="block text-xs font-bold text-sky-700 mb-1.5">
                                Preço de Venda (R$)
                            </label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-sky-700">
                                    R$
                                </span>
                                <input
                                    id="replenish-sale"
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

                    {/* Real-time Profit Preview Card */}
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

                    {/* Messages */}
                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs font-medium">
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {successMessage && (
                        <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-medium">
                            <CheckCircle2 className="h-4 w-4 shrink-0" />
                            <span>{successMessage}</span>
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={() => setSelectedProduct(null)}
                            className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm disabled:opacity-50"
                        >
                            <PackagePlus className="h-4 w-4" />
                            <span>{loading ? 'Salvando...' : 'Confirmar Entrada no Estoque'}</span>
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default ReplenishmentForm
