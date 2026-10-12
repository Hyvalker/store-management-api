import {useEffect, useState, useRef, useCallback, useMemo} from 'react'
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
    Receipt,
    Zap,
    Banknote,
    CreditCard,
    X,
    ChevronRight
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
import {matchesSearch} from '../../utils/searchUtils'
import {useToast} from '../../contexts/ToastContext'

interface CartItem {
    product: Product
    quantity: number
}

function Orders() {
    const {toast} = useToast()
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
    const [customerSearchTerm, setCustomerSearchTerm] = useState('')
    const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false)
    const [highlightedCustomerIndex, setHighlightedCustomerIndex] = useState(0)
    const [walkinName, setWalkinName] = useState('')
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null)
    const [paymentDiscounts, setPaymentDiscounts] = useState<PaymentDiscountSettings>(getPaymentDiscounts())

    // Product Search & Autocomplete
    const [searchTerm, setSearchTerm] = useState('')
    const [highlightedIndex, setHighlightedIndex] = useState(0)
    const [barcodeInput, setBarcodeInput] = useState('')
    const searchInputRef = useRef<HTMLInputElement>(null)
    const customerSearchInputRef = useRef<HTMLInputElement>(null)
    const customerDropdownRef = useRef<HTMLDivElement>(null)

    // Close customer autocomplete dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                customerDropdownRef.current &&
                !customerDropdownRef.current.contains(event.target as Node) &&
                customerSearchInputRef.current &&
                !customerSearchInputRef.current.contains(event.target as Node)
            ) {
                setIsCustomerDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Feedback & Modals
    const [submitting, setSubmitting] = useState(false)
    const [orderSuccess, setOrderSuccess] = useState<string | null>(null)
    const [orderError, setOrderError] = useState<string | null>(null)
    const [viewingOrder, setViewingOrder] = useState<OrderResponse | null>(null)

    // Sales list filtering & quick actions
    const [orderStatusFilter, setOrderStatusFilter] = useState<'ALL' | 'PAID' | 'PENDING' | 'CANCELED'>('ALL')
    const [orderSearchTerm, setOrderSearchTerm] = useState('')
    const [payingOrderId, setPayingOrderId] = useState<number | null>(null)
    const [cancelingOrderId, setCancelingOrderId] = useState<number | null>(null)

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

    // Customer Autocomplete filtering
    const selectedCustomer = useMemo(() => {
        if (!selectedCustomerId) return null
        return customers.find((c) => c.id === selectedCustomerId) || null
    }, [customers, selectedCustomerId])

    const matchingCustomers = useMemo(() => {
        if (!customerSearchTerm.trim()) {
            return customers.slice(0, 10)
        }
        return customers.filter((c) =>
            matchesSearch(c.name, customerSearchTerm, c.email || c.phoneNumber || '')
        )
    }, [customers, customerSearchTerm])

    // Autocomplete filtering with smart accent, hyphen and multi-term normalization
    const matchingProducts = searchTerm.trim()
        ? products.filter((p) => matchesSearch(p.name, searchTerm, p.barcode))
        : []

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
                const msg = `Venda #${created.id} finalizada e PAGA com sucesso! Total: R$ ${finalToPay.toFixed(2)}${paymentDetail}`
                setOrderSuccess(msg)
                toast.success(msg, 'Venda Concluída')
            } else {
                const msg = `Pedido #${created.id} registrado como PENDENTE. Total a pagar: R$ ${finalToPay.toFixed(2)}${paymentDetail}`
                setOrderSuccess(msg)
                toast.info(msg, 'Pedido Registrado')
            }

            // Clear cart & checkout form
            setCart([])
            setWalkinName('')
            setSelectedCustomerId(null)
            setCustomerSearchTerm('')
            setIsCustomerDropdownOpen(false)
            setSelectedPaymentMethod(null)

            // Refresh data (orders & products stock)
            loadInitialData()
        } catch (err: unknown) {
            console.error(err)
            const errorMsg = 'Erro ao finalizar venda. Verifique se há estoque suficiente.'
            setOrderError(errorMsg)
            toast.error(errorMsg, 'Erro no Caixa')
        } finally {
            setSubmitting(false)
        }
    }

    // Filtered orders computation
    const filteredOrders = useMemo(() => {
        return recentOrders.filter((order) => {
            if (orderStatusFilter !== 'ALL' && order.status !== orderStatusFilter) {
                return false
            }
            if (orderSearchTerm.trim()) {
                const term = orderSearchTerm.trim().toLowerCase()
                const idMatch = String(order.id).includes(term) || `#${order.id}`.includes(term)
                const customerMatch = (order.customerName || 'Consumidor Balcão').toLowerCase().includes(term)
                const itemsMatch = order.items?.some((i) =>
                    i.productName.toLowerCase().includes(term)
                )
                if (!idMatch && !customerMatch && !itemsMatch) {
                    return false
                }
            }
            return true
        })
    }, [recentOrders, orderStatusFilter, orderSearchTerm])

    const paidOrdersCount = useMemo(() => recentOrders.filter((o) => o.status === 'PAID').length, [recentOrders])
    const pendingOrdersCount = useMemo(() => recentOrders.filter((o) => o.status === 'PENDING').length, [recentOrders])
    const canceledOrdersCount = useMemo(() => recentOrders.filter((o) => o.status === 'CANCELED').length, [recentOrders])

    // Quick action on orders: Pay
    async function handlePayRecent(orderId: number) {
        setPayingOrderId(orderId)
        try {
            const updated = await payOrder(orderId)
            toast.success(`Pagamento do pedido #${orderId} registrado com sucesso!`, 'Pagamento Recebido')
            if (viewingOrder && viewingOrder.id === orderId) {
                setViewingOrder(updated)
            }
            loadInitialData()
        } catch (err) {
            console.error(err)
            toast.error('Não foi possível registrar o pagamento deste pedido.', 'Erro no Pagamento')
        } finally {
            setPayingOrderId(null)
        }
    }

    // Quick action on orders: Cancel
    async function handleCancelRecent(orderId: number) {
        const confirmed = window.confirm(`Deseja cancelar o pedido #${orderId}? Os itens serão estornados ao estoque.`)
        if (!confirmed) return
        setCancelingOrderId(orderId)
        try {
            const updated = await cancelOrder(orderId)
            toast.info(`Pedido #${orderId} cancelado. Estoque estornado com sucesso.`, 'Pedido Cancelado')
            if (viewingOrder && viewingOrder.id === orderId) {
                setViewingOrder(updated)
            }
            loadInitialData()
        } catch (err) {
            console.error(err)
            toast.error('Não foi possível cancelar o pedido.', 'Erro ao Cancelar')
        } finally {
            setCancelingOrderId(null)
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
                            <div className="space-y-1.5">
                                <label className="block text-[11px] font-medium text-slate-500">
                                    Selecione o Cliente Cadastrado
                                </label>

                                {selectedCustomer ? (
                                    <div className="flex items-center justify-between p-3 bg-sky-50/80 border border-sky-200 rounded-xl animate-in fade-in">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="h-8 w-8 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                                                {selectedCustomer.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs font-bold text-slate-900 truncate flex items-center gap-2">
                                                    <span>{selectedCustomer.name}</span>
                                                    <span className="text-[10px] bg-sky-100 text-sky-800 font-semibold px-1.5 py-0.2 rounded-full">
                                                        #{selectedCustomer.id}
                                                    </span>
                                                </p>
                                                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                                                    {selectedCustomer.email} {selectedCustomer.phoneNumber ? `• ${selectedCustomer.phoneNumber}` : ''}
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedCustomerId(null)
                                                setCustomerSearchTerm('')
                                                setIsCustomerDropdownOpen(true)
                                                setTimeout(() => customerSearchInputRef.current?.focus(), 50)
                                            }}
                                            className="flex items-center gap-1 text-xs text-sky-700 hover:text-sky-900 hover:bg-sky-100 px-2 py-1 rounded-lg transition-colors font-semibold cursor-pointer shrink-0 ml-2"
                                            title="Trocar cliente"
                                        >
                                            <X className="h-3.5 w-3.5" />
                                            <span>Trocar</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                            <input
                                                ref={customerSearchInputRef}
                                                type="text"
                                                value={customerSearchTerm}
                                                onFocus={() => setIsCustomerDropdownOpen(true)}
                                                onChange={(e) => {
                                                    setCustomerSearchTerm(e.target.value)
                                                    setHighlightedCustomerIndex(0)
                                                    setIsCustomerDropdownOpen(true)
                                                }}
                                                onKeyDown={(e) => {
                                                    if (matchingCustomers.length === 0) return

                                                    if (e.key === 'ArrowDown') {
                                                        e.preventDefault()
                                                        setHighlightedCustomerIndex((prev) => (prev + 1) % matchingCustomers.length)
                                                    } else if (e.key === 'ArrowUp') {
                                                        e.preventDefault()
                                                        setHighlightedCustomerIndex((prev) => (prev - 1 + matchingCustomers.length) % matchingCustomers.length)
                                                    } else if (e.key === 'Enter') {
                                                        if (highlightedCustomerIndex >= 0 && highlightedCustomerIndex < matchingCustomers.length) {
                                                            e.preventDefault()
                                                            const picked = matchingCustomers[highlightedCustomerIndex]
                                                            setSelectedCustomerId(picked.id)
                                                            setCustomerSearchTerm('')
                                                            setIsCustomerDropdownOpen(false)
                                                        }
                                                    } else if (e.key === 'Escape') {
                                                        setIsCustomerDropdownOpen(false)
                                                    }
                                                }}
                                                placeholder="Digite o nome, e-mail ou telefone para buscar o cliente..."
                                                className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:border-sky-500 focus:outline-hidden transition-all placeholder:text-slate-400"
                                            />
                                            {customerSearchTerm && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setCustomerSearchTerm('')
                                                        setHighlightedCustomerIndex(0)
                                                    }}
                                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                                                >
                                                    <X className="h-3.5 w-3.5" />
                                                </button>
                                            )}
                                        </div>

                                        {/* Dropdown list */}
                                        {isCustomerDropdownOpen && (
                                            <div
                                                ref={customerDropdownRef}
                                                className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl border border-slate-200 shadow-lg z-30 max-h-60 overflow-y-auto divide-y divide-slate-100"
                                            >
                                                {matchingCustomers.length === 0 ? (
                                                    <div className="p-4 text-center text-xs text-slate-500">
                                                        Nenhum cliente cadastrado encontrado para &quot;{customerSearchTerm}&quot;
                                                    </div>
                                                ) : (
                                                    matchingCustomers.map((c, index) => (
                                                        <button
                                                            key={c.id}
                                                            type="button"
                                                            onMouseEnter={() => setHighlightedCustomerIndex(index)}
                                                            onClick={() => {
                                                                setSelectedCustomerId(c.id)
                                                                setCustomerSearchTerm('')
                                                                setIsCustomerDropdownOpen(false)
                                                            }}
                                                            className={`w-full px-3.5 py-2.5 text-left flex items-center justify-between transition-colors cursor-pointer ${
                                                                index === highlightedCustomerIndex
                                                                    ? 'bg-sky-50 text-sky-950 font-semibold border-l-4 border-sky-600'
                                                                    : 'hover:bg-slate-50 text-slate-800'
                                                            }`}
                                                        >
                                                            <div className="flex items-center gap-2.5 min-w-0">
                                                                <div className="h-7 w-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs shrink-0">
                                                                    {c.name.charAt(0).toUpperCase()}
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <p className="text-xs font-bold text-slate-900 truncate">
                                                                        {c.name}
                                                                    </p>
                                                                    <p className="text-[11px] text-slate-500 truncate">
                                                                        {c.email} {c.phoneNumber ? `• ${c.phoneNumber}` : ''}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <span className="text-[10px] text-sky-600 font-semibold shrink-0 ml-2">
                                                                Selecionar
                                                            </span>
                                                        </button>
                                                    ))
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
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
                                    Vendas da Loja
                                </h3>
                            </div>
                            <span className="text-[11px] font-semibold text-slate-500">
                                {filteredOrders.length} de {recentOrders.length} registros
                            </span>
                        </div>

                        {/* Status Filter Buttons */}
                        <div className="flex flex-wrap items-center gap-1.5">
                            <button
                                type="button"
                                onClick={() => setOrderStatusFilter('ALL')}
                                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                    orderStatusFilter === 'ALL'
                                        ? 'bg-sky-600 text-white shadow-xs'
                                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                Todos ({recentOrders.length})
                            </button>
                            <button
                                type="button"
                                onClick={() => setOrderStatusFilter('PAID')}
                                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                                    orderStatusFilter === 'PAID'
                                        ? 'bg-emerald-600 text-white shadow-xs'
                                        : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                                }`}
                            >
                                <CheckCircle2 className="h-3 w-3" />
                                <span>Pagos ({paidOrdersCount})</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setOrderStatusFilter('PENDING')}
                                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                                    orderStatusFilter === 'PENDING'
                                        ? 'bg-amber-600 text-white shadow-xs'
                                        : pendingOrdersCount > 0
                                        ? 'bg-amber-100 text-amber-900 hover:bg-amber-200 font-black'
                                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                <Clock className="h-3 w-3" />
                                <span>Pendentes ({pendingOrdersCount})</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setOrderStatusFilter('CANCELED')}
                                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                                    orderStatusFilter === 'CANCELED'
                                        ? 'bg-rose-600 text-white shadow-xs'
                                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                <XCircle className="h-3 w-3" />
                                <span>Cancelados ({canceledOrdersCount})</span>
                            </button>
                        </div>

                        {/* Search Input for Orders */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                            <input
                                type="text"
                                value={orderSearchTerm}
                                onChange={(e) => setOrderSearchTerm(e.target.value)}
                                placeholder="Buscar por #ID, cliente ou produto..."
                                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-sky-500 focus:outline-hidden"
                            />
                        </div>

                        {loadingData ? (
                            <div className="py-12 text-center text-xs text-slate-400">
                                Carregando vendas...
                            </div>
                        ) : filteredOrders.length === 0 ? (
                            <div className="py-12 text-center text-xs text-slate-400 space-y-1">
                                <p className="font-semibold text-slate-600">Nenhuma venda encontrada.</p>
                                <p className="text-[11px]">Tente alterar o filtro de status ou o termo de busca.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto space-y-2 pr-1">
                                {filteredOrders.map((order) => {
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
                                            onClick={() => setViewingOrder(order)}
                                            className="p-3 rounded-xl border border-slate-100 hover:border-sky-300 hover:bg-sky-50/40 transition-all cursor-pointer space-y-2 group shadow-2xs"
                                        >
                                            {/* Line 1: Header */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-mono font-black text-xs text-sky-800 bg-sky-100/70 px-2 py-0.5 rounded-md">
                                                        #{order.id}
                                                    </span>
                                                    <span className="text-slate-900 text-xs font-bold truncate max-w-[170px]">
                                                        {order.customerName || 'Consumidor Balcão'}
                                                    </span>
                                                </div>

                                                <span
                                                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                                                        order.status === 'PAID'
                                                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                            : order.status === 'PENDING'
                                                            ? 'bg-amber-50 text-amber-800 border border-amber-300'
                                                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                                                    }`}
                                                >
                                                    {order.status === 'PAID' && (
                                                        <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600" />
                                                    )}
                                                    {order.status === 'PENDING' && (
                                                        <Clock className="h-2.5 w-2.5 text-amber-600" />
                                                    )}
                                                    {order.status === 'CANCELED' && (
                                                        <XCircle className="h-2.5 w-2.5 text-slate-500" />
                                                    )}
                                                    <span>
                                                        {order.status === 'PAID'
                                                            ? 'PAGO'
                                                            : order.status === 'PENDING'
                                                            ? 'PENDENTE'
                                                            : 'CANCELADO'}
                                                    </span>
                                                </span>
                                            </div>

                                            {/* Line 2: Items preview tags */}
                                            <div className="flex flex-wrap gap-1">
                                                {order.items?.slice(0, 3).map((item, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md truncate max-w-[160px]"
                                                    >
                                                        {item.quantity}x {item.productName}
                                                    </span>
                                                ))}
                                                {order.items && order.items.length > 3 && (
                                                    <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md">
                                                        +{order.items.length - 3} itens
                                                    </span>
                                                )}
                                            </div>

                                            {/* Line 3: Footer with date, total and actions */}
                                            <div className="flex items-center justify-between pt-1 border-t border-slate-100/80 text-xs">
                                                <span className="text-[11px] text-slate-400">
                                                    {formattedDate}
                                                </span>

                                                <div className="flex items-center gap-2">
                                                    <span className="font-mono font-black text-slate-900 text-sm">
                                                        R$ {Number(order.totalPrice || 0).toFixed(2)}
                                                    </span>

                                                    {/* Quick actions (stop propagation so card click opens modal) */}
                                                    {order.status === 'PENDING' && (
                                                        <button
                                                            type="button"
                                                            disabled={payingOrderId === order.id}
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                handlePayRecent(order.id)
                                                            }}
                                                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[10px] transition-all cursor-pointer shadow-xs disabled:opacity-50"
                                                        >
                                                            {payingOrderId === order.id ? 'Baixando...' : 'Pagar'}
                                                        </button>
                                                    )}

                                                    <span className="text-sky-600 text-[11px] font-bold group-hover:underline flex items-center gap-0.5">
                                                        Ver itens <ChevronRight className="h-3 w-3" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal: View Full Order Details */}
            {viewingOrder && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
                    <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-base text-slate-900">
                                        Detalhes da Venda #{viewingOrder.id}
                                    </h3>
                                    {viewingOrder.status === 'PAID' && (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                            Pago
                                        </span>
                                    )}
                                    {viewingOrder.status === 'PENDING' && (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300">
                                            <Clock className="h-3.5 w-3.5 text-amber-600" />
                                            Pendente de Pagamento
                                        </span>
                                    )}
                                    {viewingOrder.status === 'CANCELED' && (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                                            <XCircle className="h-3.5 w-3.5" />
                                            Cancelado
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-slate-500">
                                    Realizada em{' '}
                                    {new Date(viewingOrder.createdAt).toLocaleDateString('pt-BR', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}{' '}
                                    • Cliente: {viewingOrder.customerName || 'Consumidor Balcão'}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setViewingOrder(null)}
                                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Items Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] tracking-wider border-y border-slate-100">
                                    <tr>
                                        <th className="py-2.5 px-3">Item / Produto</th>
                                        <th className="py-2.5 px-3 text-center">Quantidade</th>
                                        <th className="py-2.5 px-3 text-right">Preço Unitário</th>
                                        <th className="py-2.5 px-3 text-right">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {viewingOrder.items?.map((item, index) => (
                                        <tr key={index} className="hover:bg-slate-50/50">
                                            <td className="py-3 px-3 font-semibold text-slate-900">
                                                {item.productName}
                                            </td>
                                            <td className="py-3 px-3 text-center text-slate-600 font-medium">
                                                {item.quantity} un.
                                            </td>
                                            <td className="py-3 px-3 text-right font-mono text-slate-600">
                                                R$ {Number(item.unitPrice || 0).toFixed(2)}
                                            </td>
                                            <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                                                R$ {Number(item.subtotal || 0).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="border-t-2 border-slate-200 bg-slate-50/50">
                                        <td colSpan={3} className="py-3 px-3 font-bold text-slate-900 text-right">
                                            Total Geral do Pedido:
                                        </td>
                                        <td className="py-3 px-3 font-black text-slate-900 text-right font-mono text-base">
                                            R$ {Number(viewingOrder.totalPrice || 0).toFixed(2)}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        {/* Status Alert Banner */}
                        {viewingOrder.status === 'PENDING' && (
                            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
                                <div className="flex items-center gap-2 text-amber-800 text-xs font-bold">
                                    <Clock className="h-4 w-4 text-amber-600 shrink-0" />
                                    <span>Pagamento Pendente</span>
                                </div>
                                <p className="text-xs text-amber-700 leading-relaxed">
                                    Este pedido foi registrado no balcão e ainda não foi quitado. Caso o cliente esteja na loja efetuando o pagamento agora, confirme abaixo para liquidar a venda.
                                </p>
                            </div>
                        )}

                        {viewingOrder.status === 'PAID' && (
                            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800 font-medium">
                                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                                <span>Este pedido está totalmente pago e finalizado.</span>
                            </div>
                        )}

                        {/* Modal Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
                            <div>
                                {viewingOrder.status === 'PENDING' && (
                                    <button
                                        type="button"
                                        disabled={cancelingOrderId === viewingOrder.id}
                                        onClick={() => handleCancelRecent(viewingOrder.id)}
                                        className="text-xs text-rose-600 hover:text-rose-700 hover:underline font-semibold cursor-pointer disabled:opacity-50"
                                    >
                                        {cancelingOrderId === viewingOrder.id ? 'Cancelando...' : 'Cancelar este pedido'}
                                    </button>
                                )}
                                {viewingOrder.status === 'PAID' && (
                                    <button
                                        type="button"
                                        disabled={cancelingOrderId === viewingOrder.id}
                                        onClick={() => handleCancelRecent(viewingOrder.id)}
                                        className="text-xs text-slate-400 hover:text-rose-600 hover:underline font-medium cursor-pointer disabled:opacity-50"
                                    >
                                        {cancelingOrderId === viewingOrder.id ? 'Estornando...' : 'Estornar pedido e devolver ao estoque'}
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                <button
                                    type="button"
                                    onClick={() => setViewingOrder(null)}
                                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-semibold cursor-pointer"
                                >
                                    Fechar
                                </button>

                                {viewingOrder.status === 'PENDING' && (
                                    <button
                                        type="button"
                                        disabled={payingOrderId === viewingOrder.id}
                                        onClick={() => handlePayRecent(viewingOrder.id)}
                                        className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                                    >
                                        <CheckCircle2 className="h-4 w-4" />
                                        <span>
                                            {payingOrderId === viewingOrder.id
                                                ? 'Registrando Pagamento...'
                                                : 'Confirmar Pagamento Agora'}
                                        </span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Orders