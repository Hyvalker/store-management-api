import {useState, useEffect, useRef} from 'react'
import {toJpeg} from 'html-to-image'
import {
    Download,
    Sparkles,
    Trash2,
    Search,
    Fish,
    Sliders,
    Layers,
    Share2,
    Info,
    RefreshCw
} from 'lucide-react'
import {getProducts} from '../../services/productService'
import {getPaymentDiscounts} from '../../services/settingsService'
import {getAnimalImage} from '../../utils/animalImages'
import type {Product} from '../../types/product'
import {matchesSearch} from '../../utils/searchUtils'
import {useToast} from '../../contexts/ToastContext'

interface EncarteItem {
    id: number
    name: string
    salePrice: number
    quantity: number
    image: string
}

function Encarte() {
    const {toast} = useToast()
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedItems, setSelectedItems] = useState<EncarteItem[]>([])

    // Search & Autocomplete
    const [searchTerm, setSearchTerm] = useState('')
    const [highlightedIndex, setHighlightedIndex] = useState(0)

    // Catalog custom options
    const [catalogTitle, setCatalogTitle] = useState('DISPONÍVEIS NA LOJA')
    const [catalogSubtitle, setCatalogSubtitle] = useState('Consulte disponibilidade • WhatsApp Bamba Aqua')
    const [cardPriceLabel, setCardPriceLabel] = useState<'cartao' | 'parcelado'>('cartao')
    const [numInstallments, setNumInstallments] = useState(10)
    const [pixDiscountPercent, setPixDiscountPercent] = useState(10)
    const [isExporting, setIsExporting] = useState(false)

    const catalogRef = useRef<HTMLDivElement>(null)
    const searchInputRef = useRef<HTMLInputElement>(null)

    async function loadData() {
        setLoading(true)
        try {
            const discounts = getPaymentDiscounts()
            setPixDiscountPercent(discounts.pix || 10)

            const prods = await getProducts()
            setProducts(prods)

            // Initial preselection: all LIVING animals with stock > 0
            const livingWithStock = prods
                .filter((p) => p.type === 'LIVING' && p.quantity > 0)
                .map((p) => ({
                    id: p.id,
                    name: p.name,
                    salePrice: Number(p.salePrice || 0),
                    quantity: p.quantity,
                    image: getAnimalImage(p.name),
                }))

            // If found living animals, pre-select up to 9 for a quick instant preview
            if (livingWithStock.length > 0) {
                setSelectedItems(livingWithStock.slice(0, 9))
            }
        } catch (err) {
            console.error('Erro ao carregar produtos para encarte', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    // Select all living animals with stock
    function handleSelectAllLiving() {
        const allLiving = products
            .filter((p) => p.type === 'LIVING' && p.quantity > 0)
            .map((p) => ({
                id: p.id,
                name: p.name,
                salePrice: Number(p.salePrice || 0),
                quantity: p.quantity,
                image: getAnimalImage(p.name),
            }))

        setSelectedItems(allLiving)
    }

    // Add specific product from search
    function handleAddItem(product: Product) {
        if (selectedItems.some((item) => item.id === product.id)) {
            setSearchTerm('')
            return
        }

        const newItem: EncarteItem = {
            id: product.id,
            name: product.name,
            salePrice: Number(product.salePrice || 0),
            quantity: product.quantity,
            image: getAnimalImage(product.name),
        }

        setSelectedItems((prev) => [...prev, newItem])
        setSearchTerm('')
        setHighlightedIndex(0)
    }

    // Remove single item
    function handleRemoveItem(productId: number) {
        setSelectedItems((prev) => prev.filter((item) => item.id !== productId))
    }

    // Clear all
    function handleClearAll() {
        setSelectedItems([])
    }

    // Autocomplete filter with smart accent, hyphen and multi-word normalization
    const matchingProducts = searchTerm.trim()
        ? products.filter((p) => matchesSearch(p.name, searchTerm, p.barcode))
        : []

    // Calculate discounted PIX price
    function getPixPrice(price: number): string {
        const disc = (price * (100 - pixDiscountPercent)) / 100
        return disc.toFixed(2).replace('.', ',')
    }

    function getCardPrice(price: number): string {
        return price.toFixed(2).replace('.', ',')
    }

    // Export to JPEG
    async function handleExportJpeg() {
        if (!catalogRef.current || selectedItems.length === 0) return

        setIsExporting(true)
        try {
            // Small pause to ensure rendering stabilizes
            await new Promise((r) => setTimeout(r, 150))

            const dataUrl = await toJpeg(catalogRef.current, {
                quality: 0.95,
                pixelRatio: 2,
                backgroundColor: '#0c1022',
            })

            const link = document.createElement('a')
            const dateStr = new Date().toISOString().slice(0, 10)
            link.download = `bamba-aqua-encarte-${dateStr}.jpg`
            link.href = dataUrl
            link.click()

            toast.success('Encarte gerado e baixado com sucesso em alta resolução!', 'Catálogo Exportado')
        } catch (err) {
            console.error('Falha ao exportar encarte:', err)
            toast.error('Não foi possível gerar a imagem do encarte. Tente novamente.', 'Erro ao Exportar')
        } finally {
            setIsExporting(false)
        }
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
                        <Share2 className="h-6 w-6 text-sky-600" />
                        <span>Gerador de Encarte & Catálogo WhatsApp</span>
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Crie imagens profissionais com os animais da loja para envio no WhatsApp, Stories e redes sociais.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        disabled={isExporting || selectedItems.length === 0}
                        onClick={handleExportJpeg}
                        className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md disabled:opacity-50 cursor-pointer"
                    >
                        {isExporting ? (
                            <>
                                <RefreshCw className="h-4 w-4 animate-spin" />
                                <span>Gerando Imagem...</span>
                            </>
                        ) : (
                            <>
                                <Download className="h-4 w-4" />
                                <span>Baixar Imagem JPEG ({selectedItems.length} itens)</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Main Layout: Configuration & Selection Left / Real-Time Encarte Preview Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Control Panel (5 Cols) */}
                <div className="lg:col-span-5 space-y-4">
                    {/* Action Bar: Quick Select */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                                <Fish className="h-4 w-4 text-sky-600" />
                                Seleção dos Animais
                            </span>
                            <span className="text-xs text-sky-700 font-semibold bg-sky-50 px-2 py-0.5 rounded-full">
                                {selectedItems.length} selecionados
                            </span>
                        </div>

                        {/* Quick Action Buttons */}
                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={handleSelectAllLiving}
                                className="flex-1 min-w-[170px] flex items-center justify-center gap-2 px-3 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-xl transition-all shadow-xs"
                            >
                                <Sparkles className="h-3.5 w-3.5" />
                                <span>Todos os Seres Vivos</span>
                            </button>

                            <button
                                type="button"
                                onClick={handleClearAll}
                                disabled={selectedItems.length === 0}
                                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl transition-all disabled:opacity-40"
                            >
                                Limpar
                            </button>
                        </div>

                        {/* Autocomplete Search */}
                        <div className="relative">
                            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                Adicionar Animal Avulso (Autocomplete)
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                <input
                                    ref={searchInputRef}
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
                                            setHighlightedIndex(
                                                (prev) => (prev - 1 + matchingProducts.length) % matchingProducts.length
                                            )
                                        } else if (e.key === 'Enter') {
                                            e.preventDefault()
                                            if (highlightedIndex >= 0 && highlightedIndex < matchingProducts.length) {
                                                handleAddItem(matchingProducts[highlightedIndex])
                                            }
                                        } else if (e.key === 'Escape') {
                                            setSearchTerm('')
                                        }
                                    }}
                                    placeholder="Digite ex: 'palhaço', 'coral', 'tang'..."
                                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-sky-500 focus:outline-hidden"
                                />
                            </div>

                            {/* Autocomplete Dropdown */}
                            {searchTerm.trim().length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-slate-200 shadow-xl z-30 max-h-52 overflow-y-auto divide-y divide-slate-100">
                                    {matchingProducts.length === 0 ? (
                                        <div className="p-3 text-center text-xs text-slate-400">
                                            Nenhum animal ou produto encontrado.
                                        </div>
                                    ) : (
                                        matchingProducts.slice(0, 8).map((p, index) => {
                                            const isAlreadyAdded = selectedItems.some((item) => item.id === p.id)
                                            return (
                                                <button
                                                    key={p.id}
                                                    type="button"
                                                    onMouseEnter={() => setHighlightedIndex(index)}
                                                    onClick={() => handleAddItem(p)}
                                                    disabled={isAlreadyAdded}
                                                    className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs transition-colors ${
                                                        isAlreadyAdded
                                                            ? 'opacity-50 cursor-not-allowed bg-slate-50'
                                                            : index === highlightedIndex
                                                            ? 'bg-sky-50 text-sky-950 font-semibold'
                                                            : 'hover:bg-slate-50 text-slate-800'
                                                    }`}
                                                >
                                                    <div>
                                                        <p className="font-semibold">{p.name}</p>
                                                        <p className="text-[10px] text-slate-500">
                                                            {p.type === 'LIVING' ? 'Ser-vivo' : 'Produto'} • Estoque: {p.quantity} un.
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="font-mono font-bold text-slate-900">
                                                            R$ {Number(p.salePrice || 0).toFixed(2)}
                                                        </span>
                                                        {isAlreadyAdded && (
                                                            <span className="block text-[9px] text-emerald-600 font-bold">
                                                                Já adicionado
                                                            </span>
                                                        )}
                                                    </div>
                                                </button>
                                            )
                                        })
                                    )}
                                </div>
                            )}
                        </div>

                        {/* List of Selected Items to Manage */}
                        <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                            {selectedItems.length === 0 ? (
                                <div className="p-4 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                                    Nenhum animal selecionado. Clique em &quot;Todos os Seres Vivos&quot; ou busque acima.
                                </div>
                            ) : (
                                selectedItems.map((item, idx) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                                    >
                                        <div className="flex items-center gap-2 min-w-0">
                                            <span className="text-[10px] text-slate-400 font-mono font-bold w-4">
                                                {idx + 1}.
                                            </span>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="h-7 w-7 rounded-md object-cover border border-slate-300 shrink-0"
                                            />
                                            <div className="truncate">
                                                <p className="font-semibold text-slate-800 truncate">{item.name}</p>
                                                <p className="text-[10px] text-slate-500 font-mono">
                                                    R$ {item.salePrice.toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                                            title="Remover do encarte"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Customization Options Card */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
                        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-800">
                            <Sliders className="h-4 w-4 text-sky-600" />
                            <span>Opções de Exibição do Encarte</span>
                        </div>

                        <div className="space-y-3 text-xs">
                            <div>
                                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                    Título do Topo
                                </label>
                                <input
                                    type="text"
                                    value={catalogTitle}
                                    onChange={(e) => setCatalogTitle(e.target.value)}
                                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:bg-white focus:border-sky-500 focus:outline-hidden"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                    Subtítulo / Contato
                                </label>
                                <input
                                    type="text"
                                    value={catalogSubtitle}
                                    onChange={(e) => setCatalogSubtitle(e.target.value)}
                                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-sky-500 focus:outline-hidden"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                        Desconto PIX (%)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={pixDiscountPercent}
                                        onChange={(e) => setPixDiscountPercent(Number(e.target.value))}
                                        className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold font-mono focus:bg-white focus:border-sky-500 focus:outline-hidden"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                        Formato no Cartão
                                    </label>
                                    <select
                                        value={cardPriceLabel}
                                        onChange={(e) =>
                                            setCardPriceLabel(e.target.value as 'cartao' | 'parcelado')
                                        }
                                        className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:bg-white focus:border-sky-500 focus:outline-hidden"
                                    >
                                        <option value="cartao">Cartão R$ XX,XX</option>
                                        <option value="parcelado">Parcelado sem juros</option>
                                    </select>
                                </div>
                            </div>

                            {cardPriceLabel === 'parcelado' && (
                                <div>
                                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                        Número de Parcelas Sem Juros
                                    </label>
                                    <select
                                        value={numInstallments}
                                        onChange={(e) => setNumInstallments(Number(e.target.value))}
                                        className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:bg-white focus:border-sky-500 focus:outline-hidden"
                                    >
                                        <option value={3}>3x sem juros</option>
                                        <option value={6}>6x sem juros</option>
                                        <option value={10}>10x sem juros</option>
                                        <option value={12}>12x sem juros</option>
                                    </select>
                                </div>
                            )}
                        </div>

                        <div className="p-3 bg-sky-50 text-sky-800 rounded-xl text-[11px] flex items-start gap-2">
                            <Info className="h-4 w-4 shrink-0 text-sky-600 mt-0.5" />
                            <span>
                                As fotos exibidas vêm salvas localmente no sistema para garantir carregamento instantâneo e exportação limpa em alta resolução para envio no WhatsApp.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Encarte Visual Canvas Preview (7 Cols) */}
                <div className="lg:col-span-7 space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                            <Layers className="h-4 w-4 text-sky-600" />
                            Visualização Real do Encarte (Pronto para WhatsApp)
                        </span>
                        <span className="text-[11px] text-slate-400">
                            Fundo Navy Escuro • Badges Âmbar
                        </span>
                    </div>

                    {/* Canvas Container that gets downloaded */}
                    <div className="overflow-x-auto rounded-2xl shadow-xl border border-slate-800">
                        <div
                            ref={catalogRef}
                            style={{backgroundColor: '#0c1022'}}
                            className="w-full min-w-[580px] p-6 text-white"
                        >
                            {/* Catalog Header Banner */}
                            <div className="text-center pb-6 mb-6 border-b border-slate-800/80">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-[11px] font-bold tracking-widest uppercase mb-1.5">
                                    <Fish className="h-3 w-3" />
                                    <span>BAMBA AQUA</span>
                                </div>
                                <h2 className="text-xl font-black tracking-wide text-white uppercase">
                                    {catalogTitle || 'DISPONÍVEIS NA LOJA'}
                                </h2>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    {catalogSubtitle || 'Consulte disponibilidade'}
                                </p>
                            </div>

                            {/* Grid of Animals - 3 Columns matching reference */}
                            {loading ? (
                                <div className="py-20 text-center text-slate-500 text-xs">
                                    Carregando animais do estoque...
                                </div>
                            ) : selectedItems.length === 0 ? (
                                <div className="py-20 text-center text-slate-500 text-xs">
                                    Nenhum item selecionado para o encarte.
                                </div>
                            ) : (
                                <div className="grid grid-cols-3 gap-4">
                                    {selectedItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex flex-col items-center bg-[#070a16] rounded-2xl p-2.5 border border-slate-800/80 shadow-md transition-all"
                                        >
                                            {/* Photo Container */}
                                            <div className="w-full aspect-4/3 rounded-xl overflow-hidden bg-slate-900 border border-slate-800/50 mb-2.5 flex items-center justify-center">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    crossOrigin="anonymous"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            {/* Amber / Orange Badge matching the user reference */}
                                            <div
                                                style={{backgroundColor: '#f39c12'}}
                                                className="w-full py-2 px-1.5 rounded-xl text-center text-slate-950 font-bold shadow-xs flex flex-col justify-center"
                                            >
                                                <p className="text-[11px] font-black leading-tight truncate px-1 text-slate-950">
                                                    {item.name}
                                                </p>
                                                <p className="text-[11px] font-bold text-slate-950 mt-0.5">
                                                    Pix: R$ {getPixPrice(item.salePrice)}
                                                </p>
                                                <p className="text-[10px] font-semibold text-slate-900/90 leading-tight">
                                                    {cardPriceLabel === 'parcelado'
                                                        ? `${numInstallments}x sem juros: R$ ${(
                                                              item.salePrice / numInstallments
                                                          )
                                                              .toFixed(2)
                                                              .replace('.', ',')}`
                                                        : `Cartão: R$ ${getCardPrice(item.salePrice)}`}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Catalog Footer */}
                            <div className="pt-6 mt-6 border-t border-slate-800/80 text-center text-[10px] text-slate-400 flex items-center justify-between">
                                <span className="font-semibold text-slate-400">
                                    Bamba Aqua • Qualidade em Aquarismo
                                </span>
                                <span className="text-slate-400">
                                    Atualizado em {new Date().toLocaleDateString('pt-BR')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Encarte
