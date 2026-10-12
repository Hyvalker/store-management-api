import {useEffect, useState, useRef, useMemo, useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import {
    ScanBarcode,
    Search,
    PackagePlus,
    ShoppingCart,
    Fish,
    Layers,
    Package,
    CheckCircle2,
    AlertCircle,
    RefreshCw,
    X,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight
} from 'lucide-react'
import {getProducts} from '../../services/productService'
import type {Product} from '../../types/product'
import {matchesSearch} from '../../utils/searchUtils'

function Home() {
    const navigate = useNavigate()
    const [products, setProducts] = useState<Product[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [highlightedIndex, setHighlightedIndex] = useState<number>(0)
    const [loading, setLoading] = useState(true)
    const [typeFilter, setTypeFilter] = useState<'ALL' | 'LIVING' | 'PRODUCT'>('ALL')
    const [tableSearch, setTableSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState<number>(20)
    const searchInputRef = useRef<HTMLInputElement>(null)

    const loadProducts = useCallback(async () => {
        setLoading(true)
        try {
            const data = await getProducts()
            setProducts(data)
        } catch (err) {
            console.error('Erro ao carregar catálogo', err)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadProducts()
    }, [loadProducts])

    // Reseta para página 1 ao alterar busca na tabela, filtro de tipo ou tamanho da página
    useEffect(() => {
        setCurrentPage(1)
    }, [tableSearch, typeFilter, itemsPerPage])

    // Category counts
    const livingCount = useMemo(() => products.filter((p) => p.type === 'LIVING').length, [products])
    const productCount = useMemo(() => products.filter((p) => p.type === 'PRODUCT').length, [products])

    // Quick lookup logic with type filter & accent-insensitive search
    const filteredProducts = useMemo(() => {
        if (!searchTerm.trim()) return []
        return products.filter((p) => {
            if (typeFilter !== 'ALL' && p.type !== typeFilter) {
                return false
            }
            return matchesSearch(p.name, searchTerm, p.barcode)
        })
    }, [products, searchTerm, typeFilter])

    const anyCategoryMatches = useMemo(() => {
        if (!searchTerm.trim() || typeFilter === 'ALL' || filteredProducts.length > 0) return 0
        return products.filter((p) => matchesSearch(p.name, searchTerm, p.barcode)).length
    }, [products, searchTerm, typeFilter, filteredProducts.length])

    // Filtered items for quick catalog table
    const filteredCatalog = useMemo(() => {
        return products.filter((p) => {
            if (typeFilter !== 'ALL' && p.type !== typeFilter) {
                return false
            }
            if (!tableSearch.trim()) return true
            return matchesSearch(p.name, tableSearch, p.barcode)
        })
    }, [products, typeFilter, tableSearch])

    const totalItems = filteredCatalog.length
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1
    const validCurrentPage = Math.min(Math.max(currentPage, 1), totalPages)
    const startIndex = totalItems === 0 ? 0 : (validCurrentPage - 1) * itemsPerPage
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
    const paginatedCatalog = useMemo(() => {
        return filteredCatalog.slice(startIndex, endIndex)
    }, [filteredCatalog, startIndex, endIndex])

    function handleSelect(product: Product) {
        setSelectedProduct(product)
        setSearchTerm('')
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Top Operational Banner */}
            <div className="bg-gradient-to-r from-slate-900 to-sky-950 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-1">
                        <Fish className="h-4 w-4" />
                        <span>Balcão de Atendimento • Bamba Aqua</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Consulta Rápida & Operações
                    </h1>
                    <p className="text-slate-300 text-sm mt-1">
                        Consulte preços e estoque na hora para o cliente ou acesse os atalhos operacionais.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                    <button
                        onClick={() => navigate('/orders')}
                        className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm"
                    >
                        <ShoppingCart className="h-4 w-4" />
                        <span>Nova Venda</span>
                    </button>
                    <button
                        onClick={() => navigate('/products?tab=replenish')}
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all backdrop-blur-xs"
                    >
                        <PackagePlus className="h-4 w-4" />
                        <span>Reposição de Estoque</span>
                    </button>
                </div>
            </div>

            {/* Quick Price & Stock Lookup - Customer Friendly */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 text-slate-800">
                        <ScanBarcode className="h-5 w-5 text-sky-600" />
                        <h2 className="text-base font-semibold text-slate-800">
                            Consultar Preço & Estoque no Balcão
                        </h2>
                    </div>

                    {/* Filter selector */}
                    <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                        <button
                            type="button"
                            onClick={() => {
                                setTypeFilter('ALL')
                                setHighlightedIndex(0)
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                typeFilter === 'ALL'
                                    ? 'bg-white text-sky-700 shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            Todos ({products.length})
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setTypeFilter('LIVING')
                                setHighlightedIndex(0)
                            }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                typeFilter === 'LIVING'
                                    ? 'bg-white text-sky-700 shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            <Fish className="h-3.5 w-3.5 text-sky-600" />
                            <span>Seres Vivos ({livingCount})</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setTypeFilter('PRODUCT')
                                setHighlightedIndex(0)
                            }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                typeFilter === 'PRODUCT'
                                    ? 'bg-white text-sky-700 shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            <Package className="h-3.5 w-3.5 text-slate-500" />
                            <span>Produtos Secos ({productCount})</span>
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                        ref={searchInputRef}
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                            setHighlightedIndex(0)
                        }}
                        onKeyDown={(e) => {
                            if (filteredProducts.length === 0) return

                            if (e.key === 'ArrowDown') {
                                e.preventDefault()
                                setHighlightedIndex((prev) => (prev + 1) % filteredProducts.length)
                            } else if (e.key === 'ArrowUp') {
                                e.preventDefault()
                                setHighlightedIndex((prev) => (prev - 1 + filteredProducts.length) % filteredProducts.length)
                            } else if (e.key === 'Enter') {
                                if (highlightedIndex >= 0 && highlightedIndex < filteredProducts.length) {
                                    e.preventDefault()
                                    handleSelect(filteredProducts[highlightedIndex])
                                    setHighlightedIndex(0)
                                }
                            } else if (e.key === 'Escape') {
                                setSearchTerm('')
                                setHighlightedIndex(0)
                            }
                        }}
                        placeholder="Bipe o código de barras ou digite o nome do peixe/produto..."
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-base focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all placeholder:text-slate-400"
                    />

                    {/* Autocomplete Dropdown */}
                    {searchTerm.trim().length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-slate-200 shadow-lg z-20 max-h-72 overflow-y-auto divide-y divide-slate-100">
                            {filteredProducts.length === 0 ? (
                                <div className="p-4 text-center text-sm text-slate-500">
                                    <p>
                                        Nenhum item encontrado para &quot;{searchTerm}&quot;
                                        {typeFilter !== 'ALL' && (
                                            <span className="font-semibold text-slate-700">
                                                {' '}em {typeFilter === 'LIVING' ? 'Seres Vivos' : 'Produtos Secos'}
                                            </span>
                                        )}
                                    </p>
                                    {anyCategoryMatches > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setTypeFilter('ALL')
                                                setHighlightedIndex(0)
                                            }}
                                            className="mt-2 text-xs font-semibold text-sky-600 hover:text-sky-800 underline cursor-pointer"
                                        >
                                            Buscar em todas as categorias ({anyCategoryMatches} encontrado{anyCategoryMatches > 1 ? 's' : ''})
                                        </button>
                                    )}
                                </div>
                            ) : (
                                filteredProducts.slice(0, 8).map((p, index) => (
                                    <button
                                        key={p.id}
                                        type="button"
                                        onMouseEnter={() => setHighlightedIndex(index)}
                                        onClick={() => {
                                            handleSelect(p)
                                            setHighlightedIndex(0)
                                        }}
                                        className={`w-full px-4 py-3 text-left flex items-center justify-between transition-colors ${
                                            index === highlightedIndex
                                                ? 'bg-sky-100 text-sky-950 font-semibold border-l-4 border-sky-600'
                                                : 'hover:bg-sky-50 text-slate-800'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs">
                                                {p.type === 'LIVING' ? 'V' : 'P'}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-800">
                                                    {p.name}
                                                </p>
                                                <p className="text-xs text-slate-600">
                                                    {p.barcode || 'Sem código'} • {p.type === 'LIVING' ? 'Ser-vivo' : 'Produto'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-slate-900">
                                                R$ {Number(p.salePrice || 0).toFixed(2)}
                                            </p>
                                            <span
                                                className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                                                    p.quantity > 0
                                                        ? 'bg-emerald-50 text-emerald-800'
                                                        : 'bg-rose-50 text-rose-800'
                                                }`}
                                            >
                                                {p.quantity} em estoque
                                            </span>
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>
                    )}
                </div>

                {/* Selected Product Spotlight Card */}
                {selectedProduct && (
                    <div className="mt-5 p-5 bg-gradient-to-r from-sky-50 to-indigo-50/50 rounded-xl border border-sky-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in duration-200">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-xs">
                                {selectedProduct.type === 'LIVING' ? (
                                    <Fish className="h-6 w-6" />
                                ) : (
                                    <Layers className="h-6 w-6" />
                                )}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-lg font-bold text-slate-900">
                                        {selectedProduct.name}
                                    </h3>
                                    <span className="text-xs px-2 py-0.5 rounded-md font-medium bg-white text-slate-600 border border-slate-200">
                                        {selectedProduct.type === 'LIVING' ? 'Ser-vivo' : 'Produto'}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    Cód: {selectedProduct.barcode || 'Não cadastrado'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <p className="text-xs text-slate-500 font-medium">Estoque Disponível</p>
                                <div className="flex items-center gap-1.5 justify-end">
                                    {selectedProduct.quantity > 0 ? (
                                        <>
                                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                            <span className="text-base font-bold text-slate-800">
                                                {selectedProduct.quantity} un.
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <AlertCircle className="h-4 w-4 text-rose-500" />
                                            <span className="text-base font-bold text-rose-600">
                                                Esgotado
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="h-10 w-px bg-slate-200 hidden md:block" />

                            <div className="bg-white px-5 py-2.5 rounded-xl border border-sky-200 shadow-xs text-right">
                                <p className="text-[11px] font-semibold uppercase tracking-wider text-sky-600">
                                    Preço ao Consumidor
                                </p>
                                <p className="text-2xl font-black text-slate-900">
                                    R$ {Number(selectedProduct.salePrice || 0).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Quick Catalog Overview */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-sky-600" />
                        <div>
                            <h2 className="text-base font-bold text-slate-900">
                                Catálogo Rápido da Loja
                            </h2>
                            <p className="text-xs text-slate-500">
                                Visualização direta dos produtos e estoque sem exposição de custos. Clique para consultar.
                            </p>
                        </div>
                        <span className="text-xs bg-slate-100 text-slate-600 font-semibold px-2.5 py-0.5 rounded-full ml-1">
                            {filteredCatalog.length} de {products.length} itens
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                        {/* Type Filter Buttons */}
                        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                            <button
                                type="button"
                                onClick={() => setTypeFilter('ALL')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    typeFilter === 'ALL'
                                        ? 'bg-white text-sky-700 shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                Todos ({products.length})
                            </button>
                            <button
                                type="button"
                                onClick={() => setTypeFilter('LIVING')}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    typeFilter === 'LIVING'
                                        ? 'bg-white text-sky-700 shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                <Fish className="h-3.5 w-3.5 text-sky-600" />
                                <span>Seres Vivos ({livingCount})</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setTypeFilter('PRODUCT')}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    typeFilter === 'PRODUCT'
                                        ? 'bg-white text-sky-700 shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                <Package className="h-3.5 w-3.5 text-slate-500" />
                                <span>Produtos Secos ({productCount})</span>
                            </button>
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full sm:w-60">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                value={tableSearch}
                                onChange={(e) => setTableSearch(e.target.value)}
                                placeholder="Filtrar tabela..."
                                className="w-full pl-9 pr-8 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-sky-500 focus:outline-hidden transition-all placeholder:text-slate-400"
                            />
                            {tableSearch && (
                                <button
                                    type="button"
                                    onClick={() => setTableSearch('')}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={loadProducts}
                            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors cursor-pointer"
                            title="Atualizar catálogo"
                        >
                            <RefreshCw className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="py-12 text-center text-sm text-slate-400">
                        Carregando produtos...
                    </div>
                ) : filteredCatalog.length === 0 ? (
                    <div className="py-12 text-center text-slate-500 text-sm space-y-2">
                        <p>Nenhum item encontrado com os filtros selecionados.</p>
                        {(typeFilter !== 'ALL' || tableSearch) && (
                            <button
                                type="button"
                                onClick={() => {
                                    setTypeFilter('ALL')
                                    setTableSearch('')
                                }}
                                className="text-xs text-sky-600 font-semibold hover:underline cursor-pointer"
                            >
                                Limpar filtros
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-600">
                                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 border-y border-slate-200/80">
                                    <tr>
                                        <th className="py-3 px-4 font-semibold">Produto / Ser-vivo</th>
                                        <th className="py-3 px-4 font-semibold">Tipo</th>
                                        <th className="py-3 px-4 font-semibold">Cód. Barras</th>
                                        <th className="py-3 px-4 font-semibold text-center">Status Estoque</th>
                                        <th className="py-3 px-4 font-semibold text-right">Preço de Venda</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {paginatedCatalog.map((p) => {
                                        const isSelected = selectedProduct?.id === p.id
                                        return (
                                            <tr
                                                key={p.id}
                                                onClick={() => handleSelect(p)}
                                                className={`transition-colors cursor-pointer ${
                                                    isSelected
                                                        ? 'bg-sky-50 text-sky-950 font-medium border-l-4 border-sky-600'
                                                        : 'hover:bg-slate-50/80'
                                                }`}
                                                title="Clique para consultar e destacar no balcão"
                                            >
                                                <td className="py-3.5 px-4 font-medium text-slate-900 flex items-center gap-2">
                                                    {p.type === 'LIVING' ? (
                                                        <Fish className="h-4 w-4 text-sky-600 shrink-0" />
                                                    ) : (
                                                        <Package className="h-4 w-4 text-slate-400 shrink-0" />
                                                    )}
                                                    <span>{p.name}</span>
                                                </td>
                                                <td className="py-3.5 px-4 text-xs">
                                                    <span
                                                        className={`px-2 py-0.5 rounded-md font-medium ${
                                                            p.type === 'LIVING'
                                                                ? 'bg-blue-50 text-blue-700'
                                                                : 'bg-slate-100 text-slate-700'
                                                        }`}
                                                    >
                                                        {p.type === 'LIVING' ? 'Ser-vivo' : 'Produto'}
                                                    </span>
                                                </td>
                                                <td className="py-3.5 px-4 text-xs text-slate-400 font-mono">
                                                    {p.barcode || '—'}
                                                </td>
                                                <td className="py-3.5 px-4 text-center">
                                                    <span
                                                        className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                                                            p.quantity > 5
                                                                ? 'bg-emerald-50 text-emerald-700'
                                                                : p.quantity > 0
                                                                ? 'bg-amber-50 text-amber-700'
                                                                : 'bg-rose-50 text-rose-700'
                                                        }`}
                                                    >
                                                        {p.quantity} un.
                                                    </span>
                                                </td>
                                                <td className="py-3.5 px-4 text-right font-bold text-slate-900">
                                                    R$ {Number(p.salePrice || 0).toFixed(2)}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Barra de Paginação Profissional */}
                        {totalItems > 0 && (
                            <div className="px-4 py-3 bg-slate-50 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 rounded-b-xl">
                                {/* Lado Esquerdo: Estatísticas & Itens Por Página */}
                                <div className="flex flex-wrap items-center gap-3">
                                    <span>
                                        Mostrando <strong className="text-slate-900 font-bold">{startIndex + 1}</strong> a{' '}
                                        <strong className="text-slate-900 font-bold">{endIndex}</strong> de{' '}
                                        <strong className="text-slate-900 font-bold">{totalItems}</strong> produtos
                                        {typeFilter !== 'ALL' && (
                                            <span className="text-slate-500 font-normal">
                                                {' '}({typeFilter === 'LIVING' ? 'Seres Vivos' : 'Produtos Secos'})
                                            </span>
                                        )}
                                    </span>

                                    <div className="flex items-center gap-1.5">
                                        <span className="text-slate-500">Exibir:</span>
                                        <select
                                            value={itemsPerPage}
                                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                            className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-hidden focus:border-sky-500 cursor-pointer"
                                        >
                                            <option value={10}>10</option>
                                            <option value={20}>20</option>
                                            <option value={50}>50</option>
                                            <option value={100}>100</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Lado Direito: Navegação de Páginas */}
                                <div className="flex items-center gap-1">
                                    <button
                                        type="button"
                                        title="Primeira página"
                                        disabled={validCurrentPage <= 1}
                                        onClick={() => setCurrentPage(1)}
                                        className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                    >
                                        <ChevronsLeft className="h-4 w-4" />
                                    </button>
                                    <button
                                        type="button"
                                        title="Página anterior"
                                        disabled={validCurrentPage <= 1}
                                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                        className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>

                                    {/* Botões Numéricos com Ellipsis */}
                                    <div className="flex items-center gap-1 px-1">
                                        {Array.from({length: totalPages}, (_, i) => i + 1)
                                            .filter((p) => {
                                                return (
                                                    p === 1 ||
                                                    p === totalPages ||
                                                    Math.abs(p - validCurrentPage) <= 1
                                                )
                                            })
                                            .map((p, idx, arr) => {
                                                const prevPage = arr[idx - 1]
                                                const showEllipsis = prevPage && p - prevPage > 1

                                                return (
                                                    <span key={p} className="flex items-center gap-1">
                                                        {showEllipsis && (
                                                            <span className="px-1 text-slate-400">...</span>
                                                        )}
                                                        <button
                                                            type="button"
                                                            onClick={() => setCurrentPage(p)}
                                                            className={`min-w-7 h-7 px-2 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                                                                p === validCurrentPage
                                                                    ? 'bg-sky-600 text-white shadow-xs'
                                                                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                                                            }`}
                                                        >
                                                            {p}
                                                        </button>
                                                    </span>
                                                )
                                            })}
                                    </div>

                                    <button
                                        type="button"
                                        title="Próxima página"
                                        disabled={validCurrentPage >= totalPages}
                                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                        className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                    <button
                                        type="button"
                                        title="Última página"
                                        disabled={validCurrentPage >= totalPages}
                                        onClick={() => setCurrentPage(totalPages)}
                                        className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                    >
                                        <ChevronsRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Home
