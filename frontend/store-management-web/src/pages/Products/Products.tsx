import {useEffect, useState, useCallback, useMemo} from 'react'
import {useSearchParams} from 'react-router-dom'
import {
    PackagePlus,
    PlusCircle,
    Search,
    Package,
    RefreshCw,
    Fish,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Pencil
} from 'lucide-react'
import {getProducts} from '../../services/productService'
import type {Product} from '../../types/product'
import {matchesSearch} from '../../utils/searchUtils'
import {useAuth} from '../../contexts/AuthContext'
import ReplenishmentForm from './ReplenishmentForm'
import ProductForm from './ProductForm'
import EditProductModal from './EditProductModal'

function Products() {
    const {isAdmin} = useAuth()
    const [searchParams, setSearchParams] = useSearchParams()
    const initialTab = isAdmin && searchParams.get('tab') === 'new' ? 'new' : 'replenish'
    const [activeTab, setActiveTab] = useState<'replenish' | 'new'>(initialTab)

    const [products, setProducts] = useState<Product[]>([])
    const [tableSearch, setTableSearch] = useState('')
    const [typeFilter, setTypeFilter] = useState<'ALL' | 'LIVING' | 'PRODUCT'>('ALL')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)

    // Paginação Profissional
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState<number>(20)

    const loadProducts = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await getProducts()
            setProducts(data)
        } catch {
            setError('Não foi possível carregar os produtos do catálogo.')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadProducts()
    }, [loadProducts])

    // Reseta para página 1 ao alterar busca, filtro ou tamanho da página
    useEffect(() => {
        setCurrentPage(1)
    }, [tableSearch, typeFilter, itemsPerPage])

    function switchTab(tab: 'replenish' | 'new') {
        setActiveTab(tab)
        setSearchParams(tab === 'new' ? {tab: 'new'} : {tab: 'replenish'})
    }

    const livingCount = useMemo(() => products.filter((p) => p.type === 'LIVING').length, [products])
    const productCount = useMemo(() => products.filter((p) => p.type === 'PRODUCT').length, [products])

    const filtered = useMemo(() => {
        return products.filter((p) => {
            if (typeFilter !== 'ALL' && p.type !== typeFilter) {
                return false
            }
            return matchesSearch(p.name, tableSearch, p.barcode)
        })
    }, [products, typeFilter, tableSearch])

    const totalItems = filtered.length
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1
    const validCurrentPage = Math.min(Math.max(currentPage, 1), totalPages)

    const startIndex = totalItems === 0 ? 0 : (validCurrentPage - 1) * itemsPerPage
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
    const paginatedProducts = useMemo(() => {
        return filtered.slice(startIndex, endIndex)
    }, [filtered, startIndex, endIndex])

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Gestão de Produtos & Estoque
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Controle remessas diárias, cadastre novos itens e monitore o catálogo da Bamba Aqua.
                    </p>
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                    <button
                        type="button"
                        onClick={() => switchTab('replenish')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                            activeTab === 'replenish'
                                ? 'bg-white text-sky-700 shadow-xs'
                                : 'text-slate-600 hover:text-slate-900'
                        }`}
                    >
                        <PackagePlus className="h-4 w-4" />
                        <span>Reposição de Estoque</span>
                        <span className="text-[10px] bg-sky-100 text-sky-800 px-1.5 py-0.2 rounded-full font-semibold">
                            Frequente
                        </span>
                    </button>

                    {isAdmin && (
                        <button
                            type="button"
                            onClick={() => switchTab('new')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                activeTab === 'new'
                                    ? 'bg-white text-slate-900 shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            <PlusCircle className="h-4 w-4" />
                            <span>Novo Item no Catálogo</span>
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full font-semibold">
                                Admin
                            </span>
                        </button>
                    )}
                </div>
            </div>

            {/* Active Action Form */}
            <div>
                {activeTab === 'replenish' ? (
                    <ReplenishmentForm onSuccess={loadProducts} />
                ) : (
                    <ProductForm onSuccess={loadProducts} />
                )}
            </div>

            {/* Catalog Table */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-sky-600" />
                        <h2 className="text-base font-bold text-slate-900">
                            Catálogo Completo da Loja
                        </h2>
                        <span className="text-xs bg-slate-100 text-slate-600 font-semibold px-2.5 py-0.5 rounded-full ml-1">
                            {filtered.length} de {products.length} itens
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
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                value={tableSearch}
                                onChange={(e) => setTableSearch(e.target.value)}
                                placeholder="Filtrar por nome ou código..."
                                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-sky-500 focus:outline-hidden transition-all placeholder:text-slate-400"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={loadProducts}
                            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors cursor-pointer"
                            title="Atualizar lista"
                        >
                            <RefreshCw className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {error && (
                    <p className="text-xs text-rose-600 py-4 text-center">{error}</p>
                )}

                {loading ? (
                    <div className="py-12 text-center text-xs text-slate-400">
                        Carregando catálogo...
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-slate-600">
                            <thead className="bg-slate-50 uppercase tracking-wider text-slate-500 border-y border-slate-200/80">
                                <tr>
                                    <th className="py-3 px-4 font-semibold">Produto / Ser-vivo</th>
                                    <th className="py-3 px-4 font-semibold">Tipo</th>
                                    <th className="py-3 px-4 font-semibold">Código</th>
                                    <th className="py-3 px-4 font-semibold text-center">Estoque Atual</th>
                                    <th className="py-3 px-4 font-semibold text-right">Preço Custo</th>
                                    <th className="py-3 px-4 font-semibold text-right">Margem %</th>
                                    <th className="py-3 px-4 font-semibold text-right">Preço Venda</th>
                                    <th className="py-3 px-4 font-semibold text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="py-8 text-center text-slate-400">
                                            Nenhum produto encontrado.
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedProducts.map((p) => (
                                        <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                                            <td className="py-3 px-4 font-semibold text-slate-900">
                                                {p.name}
                                            </td>
                                            <td className="py-3 px-4">
                                                <span
                                                    className={`px-2 py-0.5 rounded-md font-medium text-[11px] ${
                                                        p.type === 'LIVING'
                                                            ? 'bg-blue-50 text-blue-700'
                                                            : 'bg-slate-100 text-slate-700'
                                                    }`}
                                                >
                                                    {p.type === 'LIVING' ? 'Ser-vivo' : 'Produto'}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 font-mono text-slate-400">
                                                {p.barcode || '—'}
                                            </td>
                                            <td className="py-3 px-4 text-center">
                                                <span
                                                    className={`inline-flex px-2 py-0.5 rounded-full font-bold text-[11px] ${
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
                                            <td className="py-3 px-4 text-right text-slate-500 font-mono">
                                                R$ {Number(p.costPrice || 0).toFixed(2)}
                                            </td>
                                            <td className="py-3 px-4 text-right font-medium text-slate-600">
                                                {p.profitMargin != null ? `${Number(p.profitMargin).toFixed(1)}%` : '—'}
                                            </td>
                                            <td className="py-3 px-4 text-right font-bold text-slate-900 font-mono">
                                                R$ {Number(p.salePrice || 0).toFixed(2)}
                                            </td>
                                            <td className="py-3 px-4 text-center">
                                                <button
                                                    type="button"
                                                    onClick={() => setEditingProduct(p)}
                                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-slate-600 hover:text-sky-700 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-sky-200"
                                                    title="Editar este produto / ser-vivo"
                                                >
                                                    <Pencil className="h-3.5 w-3.5 text-sky-600" />
                                                    <span className="font-semibold text-[11px]">Editar</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        {/* Barra de Paginação Profissional */}
                        {totalItems > 0 && (
                            <div className="px-4 py-3 bg-slate-50 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
                                {/* Lado Esquerdo: Estatísticas & Itens Por Página */}
                                <div className="flex items-center gap-4">
                                    <span>
                                        Mostrando{' '}
                                        <strong className="text-slate-900 font-bold">{startIndex + 1}</strong> a{' '}
                                        <strong className="text-slate-900 font-bold">{endIndex}</strong> de{' '}
                                        <strong className="text-slate-900 font-bold">{totalItems}</strong> produtos
                                    </span>

                                    <div className="flex items-center gap-1.5">
                                        <span className="text-slate-500">Exibir:</span>
                                        <select
                                            value={itemsPerPage}
                                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                            className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-hidden focus:border-sky-500"
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
                                        className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronsLeft className="h-4 w-4" />
                                    </button>
                                    <button
                                        type="button"
                                        title="Página anterior"
                                        disabled={validCurrentPage <= 1}
                                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                        className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
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
                                                            className={`min-w-7 h-7 px-2 rounded-lg font-bold text-xs transition-colors ${
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
                                        className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                    <button
                                        type="button"
                                        title="Última página"
                                        disabled={validCurrentPage >= totalPages}
                                        onClick={() => setCurrentPage(totalPages)}
                                        className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronsRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Modal de Edição de Produto & Curadoria Visual */}
            <EditProductModal
                product={editingProduct}
                isOpen={!!editingProduct}
                onClose={() => setEditingProduct(null)}
                onSaved={(updated) => {
                    setProducts((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
                }}
            />
        </div>
    )
}

export default Products
