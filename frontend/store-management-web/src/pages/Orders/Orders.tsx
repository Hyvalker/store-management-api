import {useEffect, useState, useRef, useCallback} from 'react'
import {
    ShoppingCart,
    Search,
    ScanBarcode,
    Trash2,
    Plus,
    Minus,
    CheckCircle2,
    Clock,
    XCircle,
    User as UserIcon,
    AlertCircle,
    DollarSign,
    RefreshCw,
    Eye,
    Receipt,
    Zap,
    Banknote,
    CreditCard
} from 'lucide-react'
import {getPaymentDiscounts, type PaymentDiscountSettings} from '../../services/settingsService'
import {getProducts} from '../../services/productService'
import {getUsers} from '../../services/userService'
import {
    createOrder,
    payOrder,
    cancelOrder,
    getOrders
} from '../../services/orderService'
import type {Product} from '../../types/product'
import type {User} from '../../types/user'
import type {OrderResponse, CreateOrderRequest} from '../../types/order'

interface CartItem {
    product: Product
    quantity: number
}

function Orders() {
    // Products & Customers data
    const [products, setProducts] = useState<Product[]>([])
    const [customers, setCustomers] = useState<User[]>([])
    const [recentOrders, setRecentOrders] = useState<OrderResponse[]>([])
    const [loadingData, setLoadingData] = useState(true)

    // POS / Cart State
    type PaymentMethod = 'pix' | 'money' | 'debit' | 'credit'
    const [cart, setCart] = useState<CartItem[]>([])
    const [customerType, setCustomerType] = useState<'walkin' | 'registered'>('walkin')
    const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null)
    const [walkinName, setWalkinName] = useState('')
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null)
    const [paymentDiscounts, setPaymentDiscounts] = useState<PaymentDiscountSettings>(getPaymentDiscounts())

    // Product Search & Autocomplete
    const [searchTerm, setSearchTerm] = useState('')
    const [highlightedIndex, setHighlightedIndex] = useState(0)
    const [barcodeInput, setBarcodeInput] = useState('')
    const searchInputRef = useRef<HTMLInputElement>(null)

    // Feedback & Modals
    const [submitting, setSubmitting] = useState(false)
    const [orderSuccess, setOrderSuccess] = useState<string | null>(null)
    const [orderError, setOrderError] = useState<string | null>(null)
    const [viewingOrder, setViewingOrder] = useState<OrderResponse | null>(null)

    const loadInitialData = useCallback(async () => {
        setLoadingData(true)
        setPaymentDiscounts(getPaymentDiscounts())
        try {
            const [prods, custs, ords] = await Promise.all([
                getProducts().catch(() => []),
                getUsers().catch(() => []),
                getOrders().catch(() => [])
            ])
            setProducts(prods)
            setCustomers(custs)
            // Sort recent orders descending by ID
            setRecentOrders(ords.sort((a, b) => b.id - a.id))
        } catch (err) {
            console.error('Erro ao carregar dados do PDV', err)
        } finally {
            setLoadingData(false)
        }
    }, [])

    useEffect(() => {
        loadInitialData()
    }, [loadInitialData])

    // Autocomplete filtering
    const matchingProducts = products.filter((p) => {
        if (!searchTerm.trim()) return false
        const query = searchTerm.toLowerCase()
        return (
            p.name.toLowerCase().includes(query) ||
            (p.barcode && p.barcode.toLowerCase().includes(query))
        )
    })

    // Add product to cart
    function addToCart(product: Product) {
        setCart((prev) => {
            const existing = prev.find((item) => item.product.id === product.id)
            if (existing) {
                return prev.map((item) =>
                    item.product.id === product.id
                        ? {...item, quantity: item.quantity + 1}
                        : item
                )
            }
            return [...prev, {product, quantity: 1}]
        })
        setSearchTerm('')
        setHighlightedIndex(0)
        setBarcodeInput('')
    }

    // Update quantity
    function updateQuantity(productId: number, newQty: number) {
        if (newQty <= 0) {
            removeFromCart(productId)
            return
        }
        setCart((prev) =>
            prev.map((item) =>
                item.product.id === productId ? {...item, quantity: newQty} : item
            )
        )
    }

    function removeFromCart(productId: number) {
        setCart((prev) => prev.filter((item) => item.product.id !== productId))
    }

    // Barcode quick enter
    function handleBarcodeSubmit() {
        if (!barcodeInput.trim()) return
        const found = products.find(
            (p) => p.barcode && p.barcode.trim() === barcodeInput.trim()
        )
        if (found) {
            addToCart(found)
            setBarcodeInput('')
            setOrderError(null)
        } else {
            setOrderError(`Produto com código de barras "${barcodeInput}" não encontrado.`)
        }
    }

    // Cart totals & Discounts
    const cartTotal = cart.reduce(
        (acc, item) => acc + Number(item.product.salePrice || 0) * item.quantity,
        0
    )

    const activeDiscountPercent = selectedPaymentMethod
        ? paymentDiscounts[selectedPaymentMethod] || 0
        : 0
    const discountAmount = (cartTotal * activeDiscountPercent) / 100
    const finalToPay = Math.max(0, cartTotal - discountAmount)

    const paymentLabels: Record<PaymentMethod, string> = {
        pix: 'PIX',
        money: 'Dinheiro',
        debit: 'Débito',
        credit: 'Crédito',
    }

    // Checkout: Create Order
    async function handleCheckout(asPaid: boolean = true) {
        if (cart.length === 0) {
            setOrderError('Adicione pelo menos um produto ao carrinho.')
            return
        }

        setSubmitting(true)
        setOrderError(null)
        setOrderSuccess(null)

        try {
            const payload: CreateOrderRequest = {
                customerId: customerType === 'registered' ? selectedCustomerId : null,
                customerName:
                    customerType === 'walkin' && walkinName.trim()
                        ? walkinName.trim()
                        : null,
                items: cart.map((i) => ({
                    productId: i.product.id,
                    quantity: i.quantity,
                })),
            }

            // 1. Create order
            const created = await createOrder(payload)

            // 2. If user chose "Paid" directly, trigger payOrder
            const paymentDetail =
                selectedPaymentMethod && activeDiscountPercent > 0
                    ? ` (${paymentLabels[selectedPaymentMethod]} c/ ${activeDiscountPercent}% OFF)`
                    : selectedPaymentMethod
                    ? ` (${paymentLabels[selectedPaymentMethod]})`
                    : ''

            if (asPaid) {
                await payOrder(created.id)
                setOrderSuccess(
                    `Venda #${created.id} finalizada e PAGA com sucesso! Total: R$ ${finalToPay.toFixed(2)}${paymentDetail}`
                )
            } else {
                setOrderSuccess(
                    `Pedido #${created.id} registrado como PENDENTE. Total a pagar: R$ ${finalToPay.toFixed(2)}${paymentDetail}`
                )
            }

            // Clear cart
            setCart([])
            setWalkinName('')
            setSelectedCustomerId(null)
            setSelectedPaymentMethod(null)

            // Refresh data (orders & products stock)
            loadInitialData()
        } catch (err: unknown) {
            console.error(err)
            setOrderError('Erro ao finalizar venda. Verifique se há estoque suficiente.')
        } finally {
            setSubmitting(false)
        }
    }

    // Quick action on recent orders: Pay
    async function handlePayRecent(orderId: number) {
        try {
            await payOrder(orderId)
            loadInitialData()
        } catch (err) {
            console.error(err)
            alert('Não foi possível registrar o pagamento deste pedido.')
        }
    }

    // Quick action on recent orders: Cancel
    async function handleCancelRecent(orderId: number) {
        const confirmed = window.confirm(`Deseja cancelar o pedido #${orderId}? O estoque será devolvido.`)
        if (!confirmed) return
        try {
            await cancelOrder(orderId)
            loadInitialData()
        } catch (err) {
            console.error(err)
            alert('Não foi possível cancelar o pedido.')
        }
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Frente de Caixa & Vendas (PDV)
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Registre vendas rápidas no balcão da Bamba Aqua, controle pagamentos e gerencie pedidos.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={loadInitialData}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl transition-all shadow-xs"
                >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Atualizar Dados</span>
                </button>
            </div>

            {/* Main Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column: Caixa / Montagem da Venda (7 cols) */}
                <div className="lg:col-span-7 space-y-5">
                    {/* Customer Selection Card */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                                <UserIcon className="h-4 w-4 text-sky-600" />
                                <span>Identificação do Cliente</span>
                            </div>

                            {/* Type Switcher */}
                            <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
                                <button
                                    type="button"
                                    onClick={() => setCustomerType('walkin')}
                                    className={`px-3 py-1 rounded-md transition-all ${
                                        customerType === 'walkin'
                                            ? 'bg-white text-slate-900 shadow-xs'
                                            : 'text-slate-600 hover:text-slate-900'
                                    }`}
                                >
                                    Consumidor Balcão
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setCustomerType('registered')}
                                    className={`px-3 py-1 rounded-md transition-all ${
                                        customerType === 'registered'
                                            ? 'bg-white text-sky-700 shadow-xs'
                                            : 'text-slate-600 hover:text-slate-900'
                                    }`}
                                >
                                    Cliente Cadastrado
                                </button>
                            </div>
                        </div>

                        {customerType === 'walkin' ? (
                            <div>
                                <label className="block text-[11px] font-medium text-slate-500 mb-1">
                                    Nome do Cliente no Balcão (Opcional - Pressione Enter se não quiser preencher)
                                </label>
                                <input
                                    type="text"
                                    value={walkinName}
                                    onChange={(e) => setWalkinName(e.target.value)}
                                    placeholder="Ex: Roberto do aquário marinho"
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-sky-500 focus:outline-hidden"
                                />
                            </div>
                        ) : (
                            <div>
                                <label className="block text-[11px] font-medium text-slate-500 mb-1">
                                    Selecione o Cliente Cadastrado
                                </label>
                                <select
                                    value={selectedCustomerId || ''}
                                    onChange={(e) =>
                                        setSelectedCustomerId(
                                            e.target.value ? Number(e.target.value) : null
                                        )
                                    }
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                                >
                                    <option value="">Selecione um cliente cadastrado...</option>
                                    {customers.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name} ({c.email})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    {/* Product Search & Barcode Card */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {/* Autocomplete Search */}
                            <div className="relative">
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                    Adicionar por Nome (Autocomplete)
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
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
                                                setHighlightedIndex(
                                                    (prev) => (prev + 1) % matchingProducts.length
                                                )
                                            } else if (e.key === 'ArrowUp') {
                                                e.preventDefault()
                                                setHighlightedIndex(
                                                    (prev) =>
                                                        (prev - 1 + matchingProducts.length) %
                                                        matchingProducts.length
                                                )
                                            } else if (e.key === 'Enter') {
                                                if (
                                                    highlightedIndex >= 0 &&
                                                    highlightedIndex < matchingProducts.length
                                                ) {
                                                    e.preventDefault()
                                                    addToCart(matchingProducts[highlightedIndex])
                                                }
                                            } else if (e.key === 'Escape') {
                                                setSearchTerm('')
                                                setHighlightedIndex(0)
                                            }
                                        }}
                                        placeholder="Digite ex: 'palha', 'coral'..."
                                        className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all placeholder:text-slate-400"
                                    />
                                </div>

                                {/* Dropdown */}
                                {searchTerm.trim().length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-slate-200 shadow-xl z-30 max-h-56 overflow-y-auto divide-y divide-slate-100">
                                        {matchingProducts.length === 0 ? (
                                            <div className="p-3 text-center text-xs text-slate-400">
                                                Nenhum item encontrado.
                                            </div>
                                        ) : (
                                            matchingProducts.slice(0, 8).map((p, index) => (
                                                <button
                                                    key={p.id}
                                                    type="button"
                                                    onMouseEnter={() => setHighlightedIndex(index)}
                                                    onClick={() => addToCart(p)}
                                                    className={`w-full px-3 py-2.5 text-left flex items-center justify-between text-xs transition-colors ${
                                                        index === highlightedIndex
                                                            ? 'bg-sky-100 text-sky-950 font-semibold border-l-4 border-sky-600'
                                                            : 'hover:bg-sky-50 text-slate-800'
                                                    }`}
                                                >
                                                    <div>
                                                        <p className="font-semibold">{p.name}</p>
                                                        <p className="text-[10px] text-slate-500">
                                                            {p.type === 'LIVING' ? 'Ser-vivo' : 'Produto'} • Estoque: {p.quantity} un.
                                                        </p>
                                                    </div>
                                                    <span className="font-bold text-slate-900 font-mono">
                                                        R$ {Number(p.salePrice || 0).toFixed(2)}
                                                    </span>
                                                </button>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Barcode Scanner */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                    Ou passe a Leitora (Código de Barras)
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
                                                    handleBarcodeSubmit()
                                                }
                                            }}
                                            placeholder="Bipe aqui..."
                                            className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:bg-white focus:border-sky-500 focus:outline-hidden"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleBarcodeSubmit}
                                        className="px-3 py-2 bg-slate-900 text-white rounded-xl text-xs font-medium hover:bg-slate-800 transition-colors"
                                    >
                                        Adicionar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cart Items Table */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <div className="flex items-center gap-2">
                                <ShoppingCart className="h-4 w-4 text-sky-600" />
                                <h3 className="text-sm font-bold text-slate-900">
                                    Itens no Carrinho ({cart.reduce((a, b) => a + b.quantity, 0)} itens)
                                </h3>
                            </div>

                            {cart.length > 0 && (
                                <button
                                    type="button"
                                    onClick={() => setCart([])}
                                    className="text-[11px] text-rose-600 hover:text-rose-800 font-semibold"
                                >
                                    Esvaziar Carrinho
                                </button>
                            )}
                        </div>

                        {cart.length === 0 ? (
                            <div className="py-12 text-center text-xs text-slate-400">
                                Nenhum produto no carrinho. Busque acima ou bipe o código de barras para começar a venda.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs text-slate-600">
                                    <thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500">
                                        <tr>
                                            <th className="py-2.5 px-3">Produto</th>
                                            <th className="py-2.5 px-3 text-right">Unitário</th>
                                            <th className="py-2.5 px-3 text-center">Quantidade</th>
                                            <th className="py-2.5 px-3 text-right">Subtotal</th>
                                            <th className="py-2.5 px-2 text-center w-8"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {cart.map((item) => {
                                            const subtotal =
                                                Number(item.product.salePrice || 0) * item.quantity
                                            const isLowStock = item.quantity > item.product.quantity
                                            return (
                                                <tr key={item.product.id} className="hover:bg-slate-50/50">
                                                    <td className="py-3 px-3">
                                                        <p className="font-semibold text-slate-900">
                                                            {item.product.name}
                                                        </p>
                                                        <span className="text-[10px] text-slate-400">
                                                            Estoque: {item.product.quantity} un.
                                                        </span>
                                                        {isLowStock && (
                                                            <p className="text-[10px] font-bold text-rose-600">
                                                                Atenção: Qtd maior que o estoque atual!
                                                            </p>
                                                        )}
                                                    </td>
                                                    <td className="py-3 px-3 text-right font-mono text-slate-600">
                                                        R$ {Number(item.product.salePrice || 0).toFixed(2)}
                                                    </td>
                                                    <td className="py-3 px-3">
                                                        <div className="flex items-center justify-center gap-1.5">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    updateQuantity(
                                                                        item.product.id,
                                                                        item.quantity - 1
                                                                    )
                                                                }
                                                                className="h-6 w-6 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold"
                                                            >
                                                                <Minus className="h-3 w-3" />
                                                            </button>
                                                            <input
                                                                type="number"
                                                                min="1"
                                                                value={item.quantity}
                                                                onChange={(e) =>
                                                                    updateQuantity(
                                                                        item.product.id,
                                                                        Number(e.target.value)
                                                                    )
                                                                }
                                                                className="w-12 text-center py-0.5 bg-slate-50 border border-slate-200 rounded text-xs font-bold"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    updateQuantity(
                                                                        item.product.id,
                                                                        item.quantity + 1
                                                                    )
                                                                }
                                                                className="h-6 w-6 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold"
                                                            >
                                                                <Plus className="h-3 w-3" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                                                        R$ {subtotal.toFixed(2)}
                                                    </td>
                                                    <td className="py-3 px-2 text-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeFromCart(item.product.id)}
                                                            className="text-slate-400 hover:text-rose-600 transition-colors"
                                                            title="Remover item"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Totals & Finalize Buttons */}
                        {cart.length > 0 && (
                            <div className="pt-4 border-t border-slate-100 space-y-4">
                                {/* Payment Method Selection with Configured Discounts */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                            Forma de Pagamento (Desconto Automático)
                                        </label>
                                        <span className="text-[11px] text-slate-500 font-medium">
                                            Clique para selecionar ou desmarcar
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                        {(
                                            [
                                                {id: 'pix', label: 'PIX', icon: Zap, rate: paymentDiscounts.pix},
                                                {id: 'money', label: 'Dinheiro', icon: Banknote, rate: paymentDiscounts.money},
                                                {id: 'debit', label: 'Débito', icon: CreditCard, rate: paymentDiscounts.debit},
                                                {id: 'credit', label: 'Crédito', icon: CreditCard, rate: paymentDiscounts.credit},
                                            ] as const
                                        ).map((pm) => {
                                            const Icon = pm.icon
                                            const isSelected = selectedPaymentMethod === pm.id
                                            return (
                                                <button
                                                    key={pm.id}
                                                    type="button"
                                                    onClick={() =>
                                                        setSelectedPaymentMethod((prev) =>
                                                            prev === pm.id ? null : pm.id
                                                        )
                                                    }
                                                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                                                        isSelected
                                                            ? 'border-sky-600 bg-sky-50/80 shadow-xs ring-2 ring-sky-200'
                                                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100/80'
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between w-full mb-1">
                                                        <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
                                                            <Icon
                                                                className={`h-3.5 w-3.5 ${
                                                                    isSelected ? 'text-sky-600' : 'text-slate-500'
                                                                }`}
                                                            />
                                                            <span>{pm.label}</span>
                                                        </div>
                                                        <input
                                                            type="checkbox"
                                                            checked={isSelected}
                                                            readOnly
                                                            className="h-3.5 w-3.5 rounded text-sky-600 focus:ring-sky-500 pointer-events-none"
                                                        />
                                                    </div>
                                                    <div className="flex items-center justify-between text-[11px]">
                                                        {pm.rate > 0 ? (
                                                            <span className="font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-md">
                                                                -{pm.rate}% OFF
                                                            </span>
                                                        ) : (
                                                            <span className="text-slate-500 font-medium">Integral</span>
                                                        )}
                                                    </div>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Summary & Calculation */}
                                <div className="p-4 bg-sky-50/70 border border-sky-200 rounded-xl space-y-2">
                                    <div className="flex items-center justify-between text-xs text-slate-600">
                                        <span>Subtotal dos itens:</span>
                                        <span className="font-mono font-medium">R$ {cartTotal.toFixed(2)}</span>
                                    </div>

                                    {selectedPaymentMethod && activeDiscountPercent > 0 && (
                                        <div className="flex items-center justify-between text-xs text-emerald-700 font-semibold border-b border-sky-200 pb-2">
                                            <span>
                                                Desconto {paymentLabels[selectedPaymentMethod]} (-{activeDiscountPercent}%):
                                            </span>
                                            <span className="font-mono">- R$ {discountAmount.toFixed(2)}</span>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between pt-1">
                                        <div>
                                            <p className="text-[11px] font-bold uppercase tracking-wider text-sky-900">
                                                Total a Pagar
                                            </p>
                                            <p className="text-xs text-sky-700">
                                                {customerType === 'registered' && selectedCustomerId
                                                    ? `Cliente: ${
                                                          customers.find((c) => c.id === selectedCustomerId)
                                                              ?.name
                                                      }`
                                                    : walkinName
                                                    ? `Consumidor: ${walkinName}`
                                                    : 'Consumidor Balcão'}
                                                {selectedPaymentMethod && ` • ${paymentLabels[selectedPaymentMethod]}`}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            {selectedPaymentMethod && activeDiscountPercent > 0 && (
                                                <p className="text-[11px] text-slate-600 line-through font-mono">
                                                    R$ {cartTotal.toFixed(2)}
                                                </p>
                                            )}
                                            <p className="text-3xl font-black text-slate-900 font-mono">
                                                R$ {finalToPay.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {orderError && (
                                    <div className="flex items-center gap-2 p-3 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs font-medium">
                                        <AlertCircle className="h-4 w-4 shrink-0" />
                                        <span>{orderError}</span>
                                    </div>
                                )}

                                {orderSuccess && (
                                    <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-medium">
                                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                                        <span>{orderSuccess}</span>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        disabled={submitting}
                                        onClick={() => handleCheckout(false)}
                                        className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition-all disabled:opacity-50"
                                    >
                                        <Clock className="h-4 w-4" />
                                        <span>Salvar como Pendente</span>
                                    </button>

                                    <button
                                        type="button"
                                        disabled={submitting}
                                        onClick={() => handleCheckout(true)}
                                        className="flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all shadow-sm disabled:opacity-50"
                                    >
                                        <DollarSign className="h-4 w-4" />
                                        <span>
                                            {submitting
                                                ? 'Processando...'
                                                : `Concluir Venda (R$ ${finalToPay.toFixed(2)})`}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Vendas Recentes & Status (5 cols) */}
                <div className="lg:col-span-5 space-y-4">
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <div className="flex items-center gap-2">
                                <Receipt className="h-4 w-4 text-sky-600" />
                                <h3 className="text-sm font-bold text-slate-900">
                                    Últimas Vendas da Loja
                                </h3>
                            </div>
                            <span className="text-[11px] font-semibold text-slate-500">
                                {recentOrders.length} registros
                            </span>
                        </div>

                        {loadingData ? (
                            <div className="py-12 text-center text-xs text-slate-400">
                                Carregando vendas...
                            </div>
                        ) : recentOrders.length === 0 ? (
                            <div className="py-12 text-center text-xs text-slate-400">
                                Nenhuma venda registrada ainda.
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                                {recentOrders.slice(0, 15).map((order) => {
                                    const formattedDate = new Date(order.createdAt).toLocaleDateString(
                                        'pt-BR',
                                        {
                                            day: '2-digit',
                                            month: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        }
                                    )

                                    return (
                                        <div
                                            key={order.id}
                                            className="py-3 px-1 flex flex-col gap-2 hover:bg-slate-50/50 transition-colors"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-slate-900 text-xs">
                                                        #{order.id}
                                                    </span>
                                                    <span className="text-slate-400 text-[11px]">•</span>
                                                    <span className="text-slate-600 text-xs font-medium">
                                                        {order.customerName || 'Consumidor Balcão'}
                                                    </span>
                                                </div>

                                                <span
                                                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                                                        order.status === 'PAID'
                                                            ? 'bg-emerald-50 text-emerald-700'
                                                            : order.status === 'PENDING'
                                                            ? 'bg-amber-50 text-amber-700'
                                                            : 'bg-rose-50 text-rose-700'
                                                    }`}
                                                >
                                                    {order.status === 'PAID' && (
                                                        <CheckCircle2 className="h-2.5 w-2.5" />
                                                    )}
                                                    {order.status === 'PENDING' && (
                                                        <Clock className="h-2.5 w-2.5" />
                                                    )}
                                                    {order.status === 'CANCELED' && (
                                                        <XCircle className="h-2.5 w-2.5" />
                                                    )}
                                                    {order.status === 'PAID'
                                                        ? 'PAGO'
                                                        : order.status === 'PENDING'
                                                        ? 'PENDENTE'
                                                        : 'CANCELADO'}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-slate-400 text-[11px]">
                                                    {formattedDate} • {order.items?.length || 0} itens
                                                </span>
                                                <span className="font-bold text-slate-900 font-mono">
                                                    R$ {Number(order.totalPrice || 0).toFixed(2)}
                                                </span>
                                            </div>

                                            {/* Action buttons */}
                                            <div className="flex items-center justify-end gap-2 pt-1">
                                                <button
                                                    type="button"
                                                    onClick={() => setViewingOrder(order)}
                                                    className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
                                                    title="Ver itens do pedido"
                                                >
                                                    <Eye className="h-3.5 w-3.5" />
                                                </button>

                                                {order.status === 'PENDING' && (
                                                    <>
                                                        <button
                                                            type="button"
                                                            onClick={() => handlePayRecent(order.id)}
                                                            className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold rounded-md text-[10px] transition-colors"
                                                        >
                                                            Pagar
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleCancelRecent(order.id)}
                                                            className="px-2.5 py-1 bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-700 font-bold rounded-md text-[10px] transition-colors"
                                                        >
                                                            Cancelar
                                                        </button>
                                                    </>
                                                )}

                                                {order.status === 'PAID' && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleCancelRecent(order.id)}
                                                        className="px-2 py-0.5 text-slate-400 hover:text-rose-600 font-medium text-[10px] transition-colors"
                                                        title="Estornar pedido e devolver ao estoque"
                                                    >
                                                        Estornar
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal: View Order Details */}
            {viewingOrder && (
                <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <div>
                                <h3 className="text-base font-bold text-slate-900">
                                    Detalhes do Pedido #{viewingOrder.id}
                                </h3>
                                <p className="text-xs text-slate-500">
                                    Cliente: {viewingOrder.customerName || 'Consumidor Balcão'}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setViewingOrder(null)}
                                className="text-slate-400 hover:text-slate-700 font-bold text-sm"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-2 max-h-60 overflow-y-auto divide-y divide-slate-100 text-xs">
                            {viewingOrder.items?.map((item, idx) => (
                                <div key={idx} className="pt-2 flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-slate-800">
                                            {item.productName}
                                        </p>
                                        <p className="text-slate-400 text-[11px]">
                                            {item.quantity}x de R$ {Number(item.unitPrice || 0).toFixed(2)}
                                        </p>
                                    </div>
                                    <span className="font-bold text-slate-900 font-mono">
                                        R$ {Number(item.subtotal || 0).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                            <span className="text-xs font-semibold text-slate-500">Total Pago:</span>
                            <span className="text-lg font-black text-slate-900 font-mono">
                                R$ {Number(viewingOrder.totalPrice || 0).toFixed(2)}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={() => setViewingOrder(null)}
                            className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Orders