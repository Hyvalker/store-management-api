import {useState, useEffect, useRef, useMemo} from 'react'
import {toJpeg} from 'html-to-image'
import {jsPDF} from 'jspdf'
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
    Package,
    FileText,
    ChevronLeft,
    ChevronRight,
    Image as ImageIcon,
    Eye
} from 'lucide-react'
import {getProducts} from '../../services/productService'
import {getPaymentDiscounts} from '../../services/settingsService'
import {getAnimalImage, getSubCategoryLabel} from '../../utils/animalImages'
import type {Product, SubCategory, ProductType} from '../../types/product'
import {matchesSearch} from '../../utils/searchUtils'
import {useToast} from '../../contexts/ToastContext'

export interface CatalogItem {
    id: number
    name: string
    salePrice: number
    quantity: number
    image?: string | null
    subCategory?: SubCategory
    type?: ProductType
}

const CATEGORY_ORDER: SubCategory[] = [
    'CORAL',
    'MARINE_FISH',
    'FRESHWATER_FISH',
    'INVERTEBRATE',
    'PLANT',
    'OTHER_LIVING',
    'EQUIPMENT',
    'SUPPLY',
    'OTHER_PRODUCT',
]

function Catalog() {
    const {toast} = useToast()
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedItems, setSelectedItems] = useState<CatalogItem[]>([])

    // Search & Autocomplete
    const [searchTerm, setSearchTerm] = useState('')
    const [highlightedIndex, setHighlightedIndex] = useState(0)

    // Catalog custom options
    const [catalogTitle, setCatalogTitle] = useState('DISPONÍVEIS NA LOJA')
    const [catalogSubtitle, setCatalogSubtitle] = useState('Consulte disponibilidade • WhatsApp Bamba Aqua')
    const [cardPriceLabel, setCardPriceLabel] = useState<'card' | 'installments'>('card')
    const [numInstallments, setNumInstallments] = useState(10)
    const [pixDiscountPercent, setPixDiscountPercent] = useState(10)
    const [groupByCategory, setGroupByCategory] = useState(false)
    const [itemsPerPage, setItemsPerPage] = useState<number>(9)
    const [activePreviewPage, setActivePreviewPage] = useState<number>(0)
    const [viewMode, setViewMode] = useState<'single' | 'all'>('single')
    const [isExporting, setIsExporting] = useState(false)

    const searchInputRef = useRef<HTMLInputElement>(null)
    const offscreenPageRefs = useRef<(HTMLDivElement | null)[]>([])

    function toCatalogItem(p: Product): CatalogItem {
        return {
            id: p.id,
            name: p.name,
            salePrice: Number(p.salePrice || 0),
            quantity: p.quantity,
            image: getAnimalImage({
                name: p.name,
                imageSlug: p.imageSlug,
                subCategory: p.subCategory,
                type: p.type,
            }),
            subCategory: p.subCategory,
            type: p.type,
        }
    }

    // Sorted items respecting category order when groupByCategory is true
    const sortedSelectedItems = useMemo(() => {
        if (!groupByCategory) return selectedItems
        return [...selectedItems].sort((a, b) => {
            const indexA = CATEGORY_ORDER.indexOf(a.subCategory as SubCategory)
            const indexB = CATEGORY_ORDER.indexOf(b.subCategory as SubCategory)
            const posA = indexA === -1 ? 999 : indexA
            const posB = indexB === -1 ? 999 : indexB
            return posA - posB
        })
    }, [groupByCategory, selectedItems])

    // Chunk items into fixed-size pages (e.g., 9 items per A4 page)
    const pages = useMemo(() => {
        if (sortedSelectedItems.length === 0) return []
        const result: CatalogItem[][] = []
        for (let i = 0; i < sortedSelectedItems.length; i += itemsPerPage) {
            result.push(sortedSelectedItems.slice(i, i + itemsPerPage))
        }
        return result
    }, [sortedSelectedItems, itemsPerPage])

    // Adjust active page if items were removed
    useEffect(() => {
        if (activePreviewPage >= pages.length && pages.length > 0) {
            setActivePreviewPage(pages.length - 1)
        }
    }, [pages.length, activePreviewPage])

    async function loadData() {
        setLoading(true)
        try {
            const discounts = getPaymentDiscounts()
            setPixDiscountPercent(discounts.pix || 10)

            const prods = await getProducts()
            setProducts(prods)
            // Catálogo inicia 100% vazio conforme solicitação
        } catch (err) {
            console.error('Erro ao carregar produtos para catálogo', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    // Selecionar todos os seres vivos com estoque e agrupar automaticamente por categoria
    function handleSelectAllLiving() {
        const allLiving = products
            .filter((p) => p.type === 'LIVING' && p.quantity > 0)
            .map(toCatalogItem)

        setSelectedItems(allLiving)
        setGroupByCategory(true)
        setActivePreviewPage(0)
    }

    // Selecionar por subcategoria específica
    function handleSelectSubCategory(subCategory: SubCategory) {
        const filtered = products
            .filter((p) => p.subCategory === subCategory && p.quantity > 0)
            .map(toCatalogItem)

        setSelectedItems(filtered)
        setGroupByCategory(false)
        setActivePreviewPage(0)
    }

    // Selecionar todos os equipamentos e insumos com estoque
    function handleSelectAllProducts() {
        const allProducts = products
            .filter((p) => p.type === 'PRODUCT' && p.quantity > 0)
            .map(toCatalogItem)

        setSelectedItems(allProducts)
        setGroupByCategory(true)
        setActivePreviewPage(0)
    }

    // Add specific product from search
    function handleAddItem(product: Product) {
        if (selectedItems.some((item) => item.id === product.id)) {
            setSearchTerm('')
            return
        }

        const newItem = toCatalogItem(product)
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
        setActivePreviewPage(0)
    }

    // Autocomplete filter with smart search
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

    function renderCatalogCard(item: CatalogItem) {
        return (
            <div
                key={item.id}
                className="flex flex-col items-center bg-[#070a16] rounded-2xl p-2.5 border border-slate-800/80 shadow-md transition-all"
            >
                {/* Photo Container */}
                <div className="w-full aspect-4/3 rounded-xl overflow-hidden bg-slate-900 border border-slate-800/50 mb-2 flex items-center justify-center">
                    {item.image ? (
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = 'none'
                            }}
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-slate-950/80">
                            {item.type === 'PRODUCT' ? (
                                <Package className="h-7 w-7 text-slate-500 mb-1" />
                            ) : (
                                <Fish className="h-7 w-7 text-slate-500 mb-1" />
                            )}
                            <p className="text-[10px] font-bold text-slate-300 line-clamp-2 px-1 leading-tight">
                                {item.name}
                            </p>
                            <span className="text-[9px] text-amber-500/80 mt-1 uppercase tracking-wider font-semibold">
                                (Sem foto)
                            </span>
                        </div>
                    )}
                </div>

                {/* Amber / Orange Badge */}
                <div
                    style={{backgroundColor: '#f39c12'}}
                    className="w-full py-2 px-1.5 rounded-xl text-center text-slate-950 font-bold shadow-xs flex flex-col justify-center"
                >
                    <p className="text-[11px] font-black leading-tight truncate px-1 text-slate-950">
                        {item.name}
                    </p>
                    <p className="text-[12px] font-black text-slate-950 mt-0.5">
                        Pix: R$ {getPixPrice(item.salePrice)}
                    </p>
                    <p className="text-[10px] font-semibold text-slate-900/90 leading-tight">
                        {cardPriceLabel === 'installments'
                            ? `${numInstallments}x sem juros: R$ ${(
                                  item.salePrice / numInstallments
                              )
                                  .toFixed(2)
                                  .replace('.', ',')}`
                            : `Cartão: R$ ${getCardPrice(item.salePrice)}`}
                    </p>
                </div>
            </div>
        )
    }

    function renderPageContent(pageItems: CatalogItem[]) {
        if (!groupByCategory) {
            return (
                <div className="grid grid-cols-3 gap-3">
                    {pageItems.map(renderCatalogCard)}
                </div>
            )
        }

        const map = new Map<string, CatalogItem[]>()
        pageItems.forEach((item) => {
            const cat = item.subCategory || 'OTHER_LIVING'
            if (!map.has(cat)) map.set(cat, [])
            map.get(cat)!.push(item)
        })

        const cats = Array.from(map.keys()).sort((a, b) => {
            const indexA = CATEGORY_ORDER.indexOf(a as SubCategory)
            const indexB = CATEGORY_ORDER.indexOf(b as SubCategory)
            return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB)
        })

        return (
            <div className="space-y-4">
                {cats.map((catKey) => {
                    const catItems = map.get(catKey) || []
                    return (
                        <div key={catKey}>
                            <div className="flex items-center gap-2 mb-2 pb-1 border-b border-slate-800/80">
                                <span className="text-[11px] font-black uppercase tracking-wider text-amber-400">
                                    {getSubCategoryLabel(catKey)}
                                </span>
                                <span className="text-[10px] text-slate-400 font-semibold">
                                    ({catItems.length} {catItems.length === 1 ? 'item' : 'itens'})
                                </span>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {catItems.map(renderCatalogCard)}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    function renderSinglePage(pageItems: CatalogItem[], pageIndex: number, isOffscreen = false) {
        return (
            <div
                key={pageIndex}
                ref={(el) => {
                    if (isOffscreen) {
                        offscreenPageRefs.current[pageIndex] = el
                    }
                }}
                style={{
                    backgroundColor: '#0c1022',
                    width: '740px',
                    minHeight: '1046px',
                }}
                className="p-6 text-white flex flex-col justify-between rounded-2xl shadow-2xl border border-slate-800 mx-auto"
            >
                <div>
                    {/* Header Banner */}
                    <div className="text-center pb-4 mb-4 border-b border-slate-800/80">
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

                    {/* Content */}
                    {renderPageContent(pageItems)}
                </div>

                {/* Footer with Page Pagination */}
                <div className="pt-4 mt-6 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center justify-between">
                    <span className="font-semibold text-slate-400">
                        Bamba Aqua • Qualidade em Aquarismo
                    </span>
                    <span className="font-bold text-amber-400 font-mono text-xs px-2.5 py-0.5 bg-amber-500/10 rounded-full border border-amber-500/20">
                        Página {pageIndex + 1} de {pages.length}
                    </span>
                    <span className="text-slate-400">
                        Atualizado em {new Date().toLocaleDateString('pt-BR')}
                    </span>
                </div>
            </div>
        )
    }

    // Export entire catalog as Multi-Page PDF
    async function handleExportPdf() {
        if (selectedItems.length === 0 || pages.length === 0) return

        setIsExporting(true)
        try {
            toast.info(
                `Preparando catálogo em PDF com ${pages.length} página(s)...`,
                'Exportando PDF'
            )
            await new Promise((r) => setTimeout(r, 250))

            // Ensure all offscreen images are decoded
            const offscreenElements = offscreenPageRefs.current
            for (const el of offscreenElements) {
                if (!el) continue
                const images = el.querySelectorAll('img')
                await Promise.all(
                    Array.from(images).map((img) => {
                        if (img.complete && img.naturalHeight !== 0) return Promise.resolve()
                        return img.decode().catch(() => Promise.resolve())
                    })
                )
            }

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            })

            for (let i = 0; i < pages.length; i++) {
                const el = offscreenPageRefs.current[i]
                if (!el) continue

                const dataUrl = await toJpeg(el, {
                    quality: 0.95,
                    pixelRatio: 2,
                    backgroundColor: '#0c1022',
                    cacheBust: false,
                })

                if (i > 0) pdf.addPage()
                // A4 dimensions: 210 x 297 mm
                pdf.addImage(dataUrl, 'JPEG', 0, 0, 210, 297, undefined, 'FAST')
            }

            const dateStr = new Date().toISOString().slice(0, 10)
            pdf.save(`bamba-aqua-catalogo-${dateStr}.pdf`)

            toast.success(
                `Catálogo PDF baixado com sucesso (${pages.length} páginas padronizadas A4)!`,
                'PDF Concluído'
            )
        } catch (err: unknown) {
            console.error('Falha ao exportar catálogo em PDF:', err)
            const errorMsg = err instanceof Error ? err.message : String(err)
            toast.error(
                `Não foi possível gerar o catálogo em PDF (${errorMsg}). Tente novamente.`,
                'Erro ao Exportar PDF'
            )
        } finally {
            setIsExporting(false)
        }
    }

    // Export currently selected preview page as JPEG
    async function handleExportCurrentPageJpeg() {
        if (selectedItems.length === 0 || pages.length === 0) return

        setIsExporting(true)
        try {
            await new Promise((r) => setTimeout(r, 200))
            const el = offscreenPageRefs.current[activePreviewPage]
            if (!el) return

            const images = el.querySelectorAll('img')
            await Promise.all(
                Array.from(images).map((img) => {
                    if (img.complete && img.naturalHeight !== 0) return Promise.resolve()
                    return img.decode().catch(() => Promise.resolve())
                })
            )

            const dataUrl = await toJpeg(el, {
                quality: 0.95,
                pixelRatio: 2,
                backgroundColor: '#0c1022',
                cacheBust: false,
            })

            const link = document.createElement('a')
            const dateStr = new Date().toISOString().slice(0, 10)
            link.download = `bamba-aqua-catalogo-${dateStr}-pagina-${activePreviewPage + 1}.jpg`
            link.href = dataUrl
            link.click()

            toast.success(
                `Imagem da Página ${activePreviewPage + 1} baixada em alta resolução!`,
                'Imagem Exportada'
            )
        } catch (err: unknown) {
            console.error('Falha ao exportar imagem:', err)
            const errorMsg = err instanceof Error ? err.message : String(err)
            toast.error(`Não foi possível gerar a imagem (${errorMsg}).`, 'Erro ao Exportar')
        } finally {
            setIsExporting(false)
        }
    }

    // Export all pages as individual JPEGs
    async function handleExportAllPagesJpeg() {
        if (selectedItems.length === 0 || pages.length === 0) return

        setIsExporting(true)
        try {
            toast.info(`Baixando ${pages.length} imagem(ns)...`, 'Exportando Imagens')
            await new Promise((r) => setTimeout(r, 200))

            const dateStr = new Date().toISOString().slice(0, 10)
            for (let i = 0; i < pages.length; i++) {
                const el = offscreenPageRefs.current[i]
                if (!el) continue

                const dataUrl = await toJpeg(el, {
                    quality: 0.95,
                    pixelRatio: 2,
                    backgroundColor: '#0c1022',
                    cacheBust: false,
                })

                const link = document.createElement('a')
                link.download = `bamba-aqua-catalogo-${dateStr}-pagina-${i + 1}.jpg`
                link.href = dataUrl
                link.click()

                await new Promise((r) => setTimeout(r, 300))
            }

            toast.success(
                `Todas as ${pages.length} páginas foram baixadas em imagens individuais!`,
                'Imagens Exportadas'
            )
        } catch (err: unknown) {
            console.error('Falha ao exportar imagens:', err)
            const errorMsg = err instanceof Error ? err.message : String(err)
            toast.error(`Não foi possível baixar as imagens (${errorMsg}).`, 'Erro ao Exportar')
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
                        <span>Catálogo & Encarte de Ofertas</span>
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Gere catálogos em formato padrão PDF (multi-páginas A4) ou imagens otimizadas para envio nítido no WhatsApp.
                    </p>
                </div>

                {/* Primary Export Actions */}
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        disabled={isExporting || selectedItems.length === 0}
                        onClick={handleExportPdf}
                        className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md disabled:opacity-50 cursor-pointer"
                        title="Baixar todo o catálogo em formato PDF padrão A4 com páginas numeradas"
                    >
                        <FileText className="h-4 w-4" />
                        <span>Baixar PDF ({pages.length} {pages.length === 1 ? 'pág' : 'págs'})</span>
                    </button>

                    <button
                        type="button"
                        disabled={isExporting || selectedItems.length === 0}
                        onClick={handleExportCurrentPageJpeg}
                        className="flex items-center gap-2 px-3.5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all shadow-md disabled:opacity-50 cursor-pointer"
                        title="Baixar imagem JPEG da página atualmente visualizada"
                    >
                        <ImageIcon className="h-4 w-4" />
                        <span>Baixar JPEG (Pág. {activePreviewPage + 1})</span>
                    </button>

                    {pages.length > 1 && (
                        <button
                            type="button"
                            disabled={isExporting || selectedItems.length === 0}
                            onClick={handleExportAllPagesJpeg}
                            className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                            title="Baixar todas as páginas como imagens individuais separadas"
                        >
                            <Download className="h-3.5 w-3.5" />
                            <span>Todas em JPEG</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Main Layout: Configuration Left / Paged Preview Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Control Panel (5 Cols) */}
                <div className="lg:col-span-5 space-y-4">
                    {/* Action Bar: Quick Select */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                                <Layers className="h-4 w-4 text-sky-600" />
                                Seleção dos Itens do Catálogo
                            </span>
                            <span className="text-xs text-sky-700 font-semibold bg-sky-50 px-2 py-0.5 rounded-full">
                                {selectedItems.length} selecionados ({pages.length} pág{pages.length === 1 ? '' : 's'})
                            </span>
                        </div>

                        {/* Quick Action Buttons */}
                        <div className="space-y-2.5">
                            <div className="flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={handleSelectAllLiving}
                                    className="flex-1 min-w-[130px] flex items-center justify-center gap-1.5 px-3 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-xl transition-all shadow-xs cursor-pointer"
                                    title="Adicionar todos os seres vivos com estoque positivo"
                                >
                                    <Sparkles className="h-3.5 w-3.5 shrink-0" />
                                    <span>Todos os Seres Vivos</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={handleSelectAllProducts}
                                    className="flex-1 min-w-[110px] flex items-center justify-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-all shadow-xs cursor-pointer"
                                    title="Adicionar todos os produtos e equipamentos com estoque positivo"
                                >
                                    <Package className="h-3.5 w-3.5 shrink-0" />
                                    <span>Produtos</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={handleClearAll}
                                    disabled={selectedItems.length === 0}
                                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl transition-all disabled:opacity-40 cursor-pointer"
                                    title="Limpar seleção atual"
                                >
                                    Limpar
                                </button>
                            </div>

                            {/* Subcategory Filter Pills */}
                            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                                    Filtrar:
                                </span>
                                <button
                                    type="button"
                                    onClick={() => handleSelectSubCategory('CORAL')}
                                    className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/60 rounded-lg text-[11px] font-medium transition-all cursor-pointer"
                                    title="Adicionar somente corais com estoque positivo"
                                >
                                    🪸 Corais
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSelectSubCategory('MARINE_FISH')}
                                    className="px-2.5 py-1 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 border border-cyan-200/60 rounded-lg text-[11px] font-medium transition-all cursor-pointer"
                                    title="Adicionar somente peixes marinhos com estoque positivo"
                                >
                                    🐠 Marinhos
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSelectSubCategory('FRESHWATER_FISH')}
                                    className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/60 rounded-lg text-[11px] font-medium transition-all cursor-pointer"
                                    title="Adicionar somente peixes de água doce com estoque positivo"
                                >
                                    🐟 Água Doce
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSelectSubCategory('INVERTEBRATE')}
                                    className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200/60 rounded-lg text-[11px] font-medium transition-all cursor-pointer"
                                    title="Adicionar somente invertebrados com estoque positivo"
                                >
                                    🦐 Invertebrados
                                </button>
                            </div>
                        </div>

                        {/* Autocomplete Search */}
                        <div className="relative">
                            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                Adicionar Item Avulso (Autocomplete)
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
                                                    className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
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
                                    Nenhum item selecionado. Clique em &quot;Todos os Seres Vivos&quot; ou busque acima.
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
                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="h-7 w-7 rounded-md object-cover border border-slate-300 shrink-0"
                                                />
                                            ) : (
                                                <div className="h-7 w-7 rounded-md bg-slate-200 border border-slate-300 flex items-center justify-center shrink-0 text-slate-400">
                                                    {item.type === 'PRODUCT' ? (
                                                        <Package className="h-3.5 w-3.5" />
                                                    ) : (
                                                        <Fish className="h-3.5 w-3.5" />
                                                    )}
                                                </div>
                                            )}
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
                                            className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                                            title="Remover do catálogo"
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
                            <span>Opções de Formatação & Encarte</span>
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
                                            setCardPriceLabel(e.target.value as 'card' | 'installments')
                                        }
                                        className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:bg-white focus:border-sky-500 focus:outline-hidden"
                                    >
                                        <option value="card">Cartão R$ XX,XX</option>
                                        <option value="installments">Parcelado sem juros</option>
                                    </select>
                                </div>
                            </div>

                            {cardPriceLabel === 'installments' && (
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

                            {/* Items per Page selector */}
                            <div>
                                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                                    Itens por Página de PDF (Semear Páginas)
                                </label>
                                <select
                                    value={itemsPerPage}
                                    onChange={(e) => {
                                        setItemsPerPage(Number(e.target.value))
                                        setActivePreviewPage(0)
                                    }}
                                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:bg-white focus:border-sky-500 focus:outline-hidden"
                                >
                                    <option value={6}>6 itens por página (3x2 - Destaque Ampliado)</option>
                                    <option value={9}>9 itens por página (3x3 - Padrão Ideal A4)</option>
                                    <option value={12}>12 itens por página (3x4 - Mais Compacto)</option>
                                </select>
                            </div>

                            {/* Group by category toggle */}
                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-semibold text-slate-800">
                                        Agrupar por Categorias
                                    </p>
                                    <p className="text-[10px] text-slate-500">
                                        Divide em seções (Corais, Marinhos, Água Doce, etc.)
                                    </p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={groupByCategory}
                                        onChange={(e) => setGroupByCategory(e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-600"></div>
                                </label>
                            </div>
                        </div>

                        <div className="p-3 bg-sky-50 text-sky-800 rounded-xl text-[11px] flex items-start gap-2">
                            <Info className="h-4 w-4 shrink-0 text-sky-600 mt-0.5" />
                            <span>
                                O catálogo gera páginas padronizadas na proporção A4. Ao enviar o PDF pelo WhatsApp, os preços e nomes permanecem 100% nítidos sem perda de compressão.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Catalog Visual Canvas Preview (7 Cols) */}
                <div className="lg:col-span-7 space-y-3">
                    {/* Preview Controls Bar */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-3 shadow-xs flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                                <Layers className="h-4 w-4 text-sky-600" />
                                Páginas do Encarte
                            </span>
                            {pages.length > 0 && (
                                <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">
                                    {pages.length} página{pages.length === 1 ? '' : 's'}
                                </span>
                            )}
                        </div>

                        {pages.length > 1 && (
                            <div className="flex items-center gap-2">
                                {/* Page switcher */}
                                {viewMode === 'single' && (
                                    <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs">
                                        <button
                                            type="button"
                                            disabled={activePreviewPage === 0}
                                            onClick={() => setActivePreviewPage((prev) => Math.max(0, prev - 1))}
                                            className="p-1 text-slate-600 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                                            title="Página Anterior"
                                        >
                                            <ChevronLeft className="h-3.5 w-3.5" />
                                        </button>
                                        <span className="px-2 font-bold font-mono text-slate-800 text-[11px]">
                                            {activePreviewPage + 1} / {pages.length}
                                        </span>
                                        <button
                                            type="button"
                                            disabled={activePreviewPage === pages.length - 1}
                                            onClick={() =>
                                                setActivePreviewPage((prev) =>
                                                    Math.min(pages.length - 1, prev + 1)
                                                )
                                            }
                                            className="p-1 text-slate-600 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                                            title="Próxima Página"
                                        >
                                            <ChevronRight className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                )}

                                {/* Mode toggle: Single page vs All pages */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setViewMode((prev) => (prev === 'single' ? 'all' : 'single'))
                                    }
                                    className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
                                >
                                    <Eye className="h-3 w-3" />
                                    <span>{viewMode === 'single' ? 'Ver Todas' : 'Página a Página'}</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Canvas Container that gets displayed */}
                    <div className="overflow-x-auto rounded-2xl shadow-xl border border-slate-800 p-2 bg-slate-950">
                        {loading ? (
                            <div className="py-24 text-center text-slate-500 text-xs">
                                Carregando dados do estoque...
                            </div>
                        ) : selectedItems.length === 0 ? (
                            <div className="py-24 text-center text-slate-500 text-xs">
                                Nenhum item selecionado para o catálogo. Clique em &quot;Todos os Seres Vivos&quot; ou use a busca para semear as páginas.
                            </div>
                        ) : viewMode === 'single' ? (
                            <div className="py-2">
                                {renderSinglePage(pages[activePreviewPage] || [], activePreviewPage, false)}
                            </div>
                        ) : (
                            <div className="space-y-6 py-2">
                                {pages.map((pItems, idx) => (
                                    <div key={idx}>
                                        <div className="text-center pb-2 text-[10px] uppercase font-bold tracking-widest text-slate-500">
                                            — Folha {idx + 1} de {pages.length} —
                                        </div>
                                        {renderSinglePage(pItems, idx, false)}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Hidden Offscreen Container: Pre-renders ALL pages at exact A4 proportions for 100% reliable capture */}
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    left: '-9999px',
                    top: 0,
                    pointerEvents: 'none',
                    opacity: 1,
                }}
            >
                {pages.map((pItems, idx) => renderSinglePage(pItems, idx, true))}
            </div>
        </div>
    )
}

export default Catalog
