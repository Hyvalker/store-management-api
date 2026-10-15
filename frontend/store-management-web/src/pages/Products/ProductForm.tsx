import {useState, useRef, useEffect} from 'react'
import type {SubmitEvent, KeyboardEvent} from 'react'
import {
    PlusCircle,
    CheckCircle2,
    AlertCircle,
    Percent,
    DollarSign,
    Layers,
    Sparkles,
    Check
} from 'lucide-react'
import {createProduct} from '../../services/productService'
import type {CreateProductRequest, ProductType} from '../../types/product'
import {searchMasterSpecies, type MasterSpecies} from '../../data/speciesMasterCatalog'
import {getSubCategoryLabel} from '../../utils/animalImages'
import {useToast} from '../../contexts/ToastContext'

interface ProductFormProps {
    onSuccess?: () => void
}

function ProductForm({onSuccess}: ProductFormProps) {
    const {toast} = useToast()
    const [name, setName] = useState('')
    const [type, setType] = useState<ProductType>('PRODUCT')
    const [quantity, setQuantity] = useState('')
    const [costPrice, setCostPrice] = useState('')
    const [salePrice, setSalePrice] = useState('')
    const [profitMargin, setProfitMargin] = useState('')
    const [barcode, setBarcode] = useState('')

    // Catálogo Mestre e Autocomplete
    const [speciesSuggestions, setSpeciesSuggestions] = useState<MasterSpecies[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [selectedSpecies, setSelectedSpecies] = useState<MasterSpecies | null>(null)
    const [highlightedIndex, setHighlightedIndex] = useState(0)
    const suggestionsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(evt: MouseEvent) {
            if (suggestionsRef.current && !suggestionsRef.current.contains(evt.target as Node)) {
                setShowSuggestions(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    function handleNameChange(val: string) {
        setName(val)
        if (selectedSpecies && val !== selectedSpecies.name) {
            setSelectedSpecies(null)
        }
        if (val.trim().length >= 2) {
            const results = searchMasterSpecies(val, 8)
            setSpeciesSuggestions(results)
            setShowSuggestions(results.length > 0)
            setHighlightedIndex(0)
        } else {
            setSpeciesSuggestions([])
            setShowSuggestions(false)
        }
    }

    function handleSelectSpecies(sp: MasterSpecies) {
        setName(sp.name)
        setType('LIVING')
        setSelectedSpecies(sp)
        setShowSuggestions(false)
        toast.info(
            `Espécie selecionada: ${sp.commonName} (${getSubCategoryLabel(sp.subCategory)})`,
            'Catálogo Mestre'
        )
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (!showSuggestions || speciesSuggestions.length === 0) return

        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setHighlightedIndex((prev) => (prev + 1) % speciesSuggestions.length)
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setHighlightedIndex(
                (prev) => (prev - 1 + speciesSuggestions.length) % speciesSuggestions.length
            )
        } else if (e.key === 'Enter') {
            if (showSuggestions && speciesSuggestions[highlightedIndex]) {
                e.preventDefault()
                handleSelectSpecies(speciesSuggestions[highlightedIndex])
            }
        } else if (e.key === 'Escape') {
            setShowSuggestions(false)
        }
    }

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
            // Auto-resolução da espécie pelo catálogo mestre se o operador digitou o nome diretamente
            const matchedSpecies = selectedSpecies || searchMasterSpecies(name.trim(), 1)[0]
            const resolvedType = matchedSpecies ? matchedSpecies.type : type
            const resolvedSubCategory = matchedSpecies?.subCategory || (type === 'LIVING' ? 'OTHER_LIVING' : undefined)
            const resolvedImageSlug = matchedSpecies?.imageSlug

            const data: CreateProductRequest = {
                name: name.trim(),
                type: resolvedType,
                quantity: Number(quantity),
                costPrice: Number(costPrice),
                barcode: barcode.trim() || null,
                subCategory: resolvedSubCategory,
                imageSlug: resolvedImageSlug,
            }

            const cost = Number(costPrice)
            if (cost === 0) {
                // Para custo zero o backend exige apenas preço de venda
                data.salePrice = Number(salePrice || 0)
            } else if (lastEditedPriceField === 'salePrice' && salePrice && Number(salePrice) >= 0) {
                data.salePrice = Number(salePrice)
            } else if (profitMargin && Number(profitMargin) >= 0) {
                data.profitMargin = Number(profitMargin)
            } else if (salePrice && Number(salePrice) >= 0) {
                data.salePrice = Number(salePrice)
            }

            await createProduct(data)

            setSuccess(true)
            toast.success(`"${data.name}" cadastrado com sucesso no catálogo!`, 'Novo Produto')

            setName('')
            setType('PRODUCT')
            setSelectedSpecies(null)
            setSpeciesSuggestions([])
            setShowSuggestions(false)
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
            const data = (err as {response?: {data?: {message?: string; error?: string}}})?.response?.data
            const backendMsg = data?.message || data?.error || null
            const errorMsg =
                backendMsg ||
                'Não foi possível cadastrar o produto. Verifique se o nome já existe no catálogo.'
            setError(errorMsg)
            toast.error(errorMsg, 'Erro no Cadastro')
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
                    <div className="md:col-span-2 relative" ref={suggestionsRef}>
                        <div className="flex items-center justify-between mb-1.5">
                            <label htmlFor="new-name" className="block text-xs font-semibold text-slate-700">
                                Nome Completo do Item <span className="text-rose-500">*</span>
                            </label>
                            <span className="text-[10px] text-slate-600 flex items-center gap-1 font-medium">
                                <Sparkles className="h-3 w-3 text-amber-500" />
                                Sugestões do Catálogo Mestre ativas
                            </span>
                        </div>

                        <div className="relative">
                            <input
                                id="new-name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => handleNameChange(e.target.value)}
                                onKeyDown={handleKeyDown}
                                onFocus={() => {
                                    if (name.trim().length >= 2 && speciesSuggestions.length > 0) {
                                        setShowSuggestions(true)
                                    }
                                }}
                                placeholder="Digite para buscar ex.: 'Storm Black', 'Discus', 'Zoanthus', 'Ração'..."
                                autoComplete="off"
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all font-medium placeholder:text-slate-400"
                            />

                            {/* Dropdown de Autocomplete */}
                            {showSuggestions && speciesSuggestions.length > 0 && (
                                <div className="absolute z-50 left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden max-h-72 overflow-y-auto">
                                    <div className="px-3 py-1.5 bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                                        <span>Sugestões da Base de Espécies</span>
                                        <span>Pressione Enter para selecionar</span>
                                    </div>
                                    <div className="divide-y divide-slate-50">
                                        {speciesSuggestions.map((sp, idx) => (
                                            <button
                                                key={sp.id}
                                                type="button"
                                                onClick={() => handleSelectSpecies(sp)}
                                                onMouseEnter={() => setHighlightedIndex(idx)}
                                                className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between transition-colors ${
                                                    idx === highlightedIndex
                                                        ? 'bg-amber-500/10 text-slate-900'
                                                        : 'hover:bg-slate-50 text-slate-700'
                                                }`}
                                            >
                                                <div className="flex flex-col pr-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-bold text-slate-900">
                                                            {sp.commonName}
                                                        </span>
                                                        <span className="text-[11px] italic text-slate-500">
                                                            ({sp.scientificName})
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                                                        <span>{sp.familyGroup} • {sp.section}</span>
                                                        {sp.synonyms && sp.synonyms.length > 0 && (
                                                            <span className="text-slate-400 italic">
                                                                (ou: {sp.synonyms.slice(0, 2).join(', ')})
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200/60">
                                                    {getSubCategoryLabel(sp.subCategory)}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Badge de Reconhecimento */}
                        {selectedSpecies && (
                            <div className="mt-2 p-2 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-xs text-emerald-800">
                                <div className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-emerald-600" />
                                    <span>
                                        <strong>Espécie Oficial Reconhecida:</strong> {selectedSpecies.commonName} •{' '}
                                        {getSubCategoryLabel(selectedSpecies.subCategory)}
                                    </span>
                                </div>
                                <span className="text-[11px] text-emerald-700 font-mono">
                                    Imagem: {selectedSpecies.imageSlug}
                                </span>
                            </div>
                        )}
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