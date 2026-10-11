import {useEffect, useState, useCallback} from 'react'
import {useSearchParams} from 'react-router-dom'
import {
    PackagePlus,
    PlusCircle,
    Search,
    Package,
    RefreshCw
} from 'lucide-react'
import {getProducts} from '../../services/productService'
import type {Product} from '../../types/product'
import ReplenishmentForm from './ReplenishmentForm'
import ProductForm from './ProductForm'

function Products() {
    const [searchParams, setSearchParams] = useSearchParams()
    const initialTab = searchParams.get('tab') === 'new' ? 'new' : 'replenish'
    const [activeTab, setActiveTab] = useState<'replenish' | 'new'>(initialTab)

    const [products, setProducts] = useState<Product[]>([])
    const [tableSearch, setTableSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

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

    function switchTab(tab: 'replenish' | 'new') {
        setActiveTab(tab)
        setSearchParams(tab === 'new' ? {tab: 'new'} : {tab: 'replenish'})
    }

    const filtered = products.filter((p) => {
        const query = tableSearch.toLowerCase()
        return (
            p.name.toLowerCase().includes(query) ||
            (p.barcode && p.barcode.toLowerCase().includes(query))
        )
    })

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

                    <button
                        type="button"
                        onClick={() => switchTab('new')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                            activeTab === 'new'
                                ? 'bg-white text-slate-900 shadow-xs'
                                : 'text-slate-600 hover:text-slate-900'
                        }`}
                    >
                        <PlusCircle className="h-4 w-4" />
                        <span>Novo Item no Catálogo</span>
                    </button>
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
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-sky-600" />
                        <h2 className="text-base font-bold text-slate-900">
                            Catálogo Completo da Loja
                        </h2>
                        <span className="text-xs bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-full ml-1">
                            {products.length} itens
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                value={tableSearch}
                                onChange={(e) => setTableSearch(e.target.value)}
                                placeholder="Filtrar tabela por nome ou cód..."
                                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-100 transition-all placeholder:text-slate-400"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={loadProducts}
                            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
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
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="py-8 text-center text-slate-400">
                                            Nenhum produto encontrado.
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map((p) => (
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
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Products
