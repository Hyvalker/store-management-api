import {useState, useEffect, useCallback} from 'react'
import type {SubmitEvent} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {
    ArrowLeft,
    Phone,
    Mail,
    MapPin,
    Fish,
    Plus,
    Calendar,
    Copy,
    Check,
    Trash2,
    Edit3,
    AlertCircle,
    CheckCircle2,
    Activity,
    Droplets,
    MessageSquare,
    Stethoscope,
    BookOpen,
    ShoppingBag,
    Receipt,
    Clock,
    XCircle,
    DollarSign,
    Eye,
    RefreshCw,
    X
} from 'lucide-react'
import {getUser} from '../../services/userService'
import {getCurrentUser} from '../../services/authService'
import {
    getAquariumsByUser,
    createAquarium,
    updateAquarium,
    deleteAquarium,
    getWaterTests,
    createWaterTest,
    updateWaterTest,
    deleteWaterTest,
    getAquariumNotes,
    createAquariumNote,
    updateAquariumNote,
    deleteAquariumNote
} from '../../services/aquariumService'
import {getOrdersByCustomer, payOrder, cancelOrder} from '../../services/orderService'
import type {User} from '../../types/user'
import type {
    Aquarium,
    CreateAquariumRequest,
    WaterParameterTest,
    CreateWaterParameterTestRequest,
    AquariumType,
    AquariumNote,
    CreateAquariumNoteRequest
} from '../../types/aquarium'
import type {OrderResponse} from '../../types/order'
import {useToast} from '../../contexts/ToastContext'

function CustomerDetail() {
    const {toast} = useToast()
    const {id} = useParams<{id: string}>()
    const navigate = useNavigate()
    const customerId = Number(id)

    const currentUser = getCurrentUser()

    // Data States
    const [customer, setCustomer] = useState<User | null>(null)
    const [aquariums, setAquariums] = useState<Aquarium[]>([])
    const [selectedAquarium, setSelectedAquarium] = useState<Aquarium | null>(null)
    const [activeTab, setActiveTab] = useState<'parameters' | 'notes'>('parameters')
    const [tests, setTests] = useState<WaterParameterTest[]>([])
    const [notes, setNotes] = useState<AquariumNote[]>([])
    const [loadingCustomer, setLoadingCustomer] = useState(true)
    const [loadingTests, setLoadingTests] = useState(false)
    const [loadingNotes, setLoadingNotes] = useState(false)
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    // Aquarium Modal State
    const [isAquariumModalOpen, setIsAquariumModalOpen] = useState(false)
    const [editingAquarium, setEditingAquarium] = useState<Aquarium | null>(null)
    const [aqName, setAqName] = useState('')
    const [aqType, setAqType] = useState<AquariumType>('MARINE')
    const [aqVolume, setAqVolume] = useState<string>('')
    const [aqDescription, setAqDescription] = useState('')
    const [submittingAquarium, setSubmittingAquarium] = useState(false)

    // Test Modal State
    const [isTestModalOpen, setIsTestModalOpen] = useState(false)
    const [editingTest, setEditingTest] = useState<WaterParameterTest | null>(null)
    const [testDate, setTestDate] = useState('')
    const [testPh, setTestPh] = useState('')
    const [testAmmonia, setTestAmmonia] = useState('')
    const [testNitrite, setTestNitrite] = useState('')
    const [testNitrate, setTestNitrate] = useState('')
    const [testPhosphate, setTestPhosphate] = useState('')
    const [testKh, setTestKh] = useState('')
    const [testGh, setTestGh] = useState('')
    const [testSalinity, setTestSalinity] = useState('')
    const [testCalcium, setTestCalcium] = useState('')
    const [testMagnesium, setTestMagnesium] = useState('')
    const [testTemperature, setTestTemperature] = useState('')
    const [testSilicate, setTestSilicate] = useState('')
    const [testClientReport, setTestClientReport] = useState('')
    const [testDiagnosisNotes, setTestDiagnosisNotes] = useState('')
    const [submittingTest, setSubmittingTest] = useState(false)

    // General Aquarium Note Modal State
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false)
    const [editingNote, setEditingNote] = useState<AquariumNote | null>(null)
    const [noteDate, setNoteDate] = useState('')
    const [noteTitle, setNoteTitle] = useState('')
    const [noteContent, setNoteContent] = useState('')
    const [submittingNote, setSubmittingNote] = useState(false)

    // Navigation between Aquariums and Orders
    const [activeSection, setActiveSection] = useState<'aquariums' | 'orders'>('aquariums')

    // Customer Orders States
    const [customerOrders, setCustomerOrders] = useState<OrderResponse[]>([])
    const [loadingOrders, setLoadingOrders] = useState(false)
    const [orderStatusFilter, setOrderStatusFilter] = useState<'ALL' | 'PENDING' | 'PAID' | 'CANCELED'>('ALL')
    const [selectedOrderDetails, setSelectedOrderDetails] = useState<OrderResponse | null>(null)
    const [payingOrderId, setPayingOrderId] = useState<number | null>(null)
    const [cancelingOrderId, setCancelingOrderId] = useState<number | null>(null)

    // WhatsApp / Clipboard Copy states
    const [copiedTestId, setCopiedTestId] = useState<number | null>(null)
    const [copiedNoteId, setCopiedNoteId] = useState<number | null>(null)

    // Helper for notification (local state + floating global toast)
    const notify = (msg: string, isError: boolean = false) => {
        if (isError) {
            setErrorMessage(msg)
            toast.error(msg)
            setTimeout(() => setErrorMessage(null), 4000)
        } else {
            setFeedbackMessage(msg)
            toast.success(msg)
            setTimeout(() => setFeedbackMessage(null), 4000)
        }
    }

    const loadCustomerOrders = useCallback(async () => {
        if (!customerId) return
        setLoadingOrders(true)
        try {
            const list = await getOrdersByCustomer(customerId)
            setCustomerOrders(list.sort((a, b) => b.id - a.id))
        } catch {
            notify('Erro ao carregar histórico de pedidos do cliente.', true)
        } finally {
            setLoadingOrders(false)
        }
    }, [customerId])

    useEffect(() => {
        loadCustomerOrders()
    }, [loadCustomerOrders])

    async function handlePayCustomerOrder(orderId: number) {
        setPayingOrderId(orderId)
        try {
            const updated = await payOrder(orderId)
            toast.success(`Pagamento do pedido #${orderId} confirmado com sucesso!`, 'Pagamento Recebido')
            setCustomerOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)))
            if (selectedOrderDetails?.id === orderId) {
                setSelectedOrderDetails(updated)
            }
        } catch {
            toast.error('Não foi possível registrar o pagamento deste pedido.', 'Erro no Pagamento')
        } finally {
            setPayingOrderId(null)
        }
    }

    async function handleCancelCustomerOrder(orderId: number) {
        const confirmed = window.confirm(
            `Deseja realmente cancelar o pedido #${orderId}? Os itens voltarão para o estoque.`
        )
        if (!confirmed) return

        setCancelingOrderId(orderId)
        try {
            const updated = await cancelOrder(orderId)
            toast.info(`Pedido #${orderId} cancelado. Estoque estornado com sucesso.`, 'Pedido Cancelado')
            setCustomerOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)))
            if (selectedOrderDetails?.id === orderId) {
                setSelectedOrderDetails(updated)
            }
        } catch {
            toast.error('Não foi possível cancelar o pedido.', 'Erro ao Cancelar')
        } finally {
            setCancelingOrderId(null)
        }
    }

    const pendingOrdersCount = customerOrders.filter((o) => o.status === 'PENDING').length
    const paidOrdersCount = customerOrders.filter((o) => o.status === 'PAID').length
    const totalPaidAmount = customerOrders
        .filter((o) => o.status === 'PAID')
        .reduce((acc, o) => acc + Number(o.totalPrice || 0), 0)
    const totalPendingAmount = customerOrders
        .filter((o) => o.status === 'PENDING')
        .reduce((acc, o) => acc + Number(o.totalPrice || 0), 0)

    const filteredOrders = customerOrders.filter((o) => {
        if (orderStatusFilter === 'ALL') return true
        return o.status === orderStatusFilter
    })

    const loadCustomerData = useCallback(async () => {
        if (!customerId) return
        setLoadingCustomer(true)
        try {
            const [custData, aqList] = await Promise.all([
                getUser(customerId),
                getAquariumsByUser(customerId)
            ])
            setCustomer(custData)
            setAquariums(aqList)
            if (aqList.length > 0 && !selectedAquarium) {
                setSelectedAquarium(aqList[0])
            }
        } catch {
            notify('Erro ao carregar dados do cliente ou aquários.', true)
        } finally {
            setLoadingCustomer(false)
        }
    }, [customerId, selectedAquarium])

    useEffect(() => {
        loadCustomerData()
    }, [loadCustomerData])

    const loadTestsForAquarium = useCallback(async (aquariumId: number) => {
        setLoadingTests(true)
        try {
            const data = await getWaterTests(aquariumId)
            setTests(data)
        } catch {
            notify('Erro ao carregar medições do aquário.', true)
        } finally {
            setLoadingTests(false)
        }
    }, [])

    const loadNotesForAquarium = useCallback(async (aquariumId: number) => {
        setLoadingNotes(true)
        try {
            const data = await getAquariumNotes(aquariumId)
            setNotes(data)
        } catch {
            notify('Erro ao carregar anotações do aquário.', true)
        } finally {
            setLoadingNotes(false)
        }
    }, [])

    useEffect(() => {
        if (selectedAquarium) {
            loadTestsForAquarium(selectedAquarium.id)
            loadNotesForAquarium(selectedAquarium.id)
        } else {
            setTests([])
            setNotes([])
        }
    }, [selectedAquarium, loadTestsForAquarium, loadNotesForAquarium])

    // --- Aquarium CRUD ---
    function openCreateAquariumModal() {
        setEditingAquarium(null)
        setAqName('')
        setAqType('MARINE')
        setAqVolume('')
        setAqDescription('')
        setIsAquariumModalOpen(true)
    }

    function openEditAquariumModal(aq: Aquarium) {
        setEditingAquarium(aq)
        setAqName(aq.name)
        setAqType(aq.type)
        setAqVolume(aq.volumeLiters ? String(aq.volumeLiters) : '')
        setAqDescription(aq.description || '')
        setIsAquariumModalOpen(true)
    }

    async function handleSaveAquarium(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!aqName.trim()) {
            notify('O nome do aquário é obrigatório.', true)
            return
        }

        setSubmittingAquarium(true)
        try {
            const payload: CreateAquariumRequest = {
                userId: customerId,
                name: aqName.trim(),
                type: aqType,
                volumeLiters: aqVolume ? Number(aqVolume) : undefined,
                description: aqDescription.trim() || undefined
            }

            if (editingAquarium) {
                const updated = await updateAquarium(editingAquarium.id, payload)
                setAquariums((prev) => prev.map((a) => (a.id === updated.id ? updated : a)))
                setSelectedAquarium(updated)
                notify('Aquário atualizado com sucesso!')
            } else {
                const created = await createAquarium(payload)
                setAquariums((prev) => [created, ...prev])
                setSelectedAquarium(created)
                notify('Aquário cadastrado com sucesso!')
            }
            setIsAquariumModalOpen(false)
        } catch {
            notify('Erro ao salvar aquário.', true)
        } finally {
            setSubmittingAquarium(false)
        }
    }

    async function handleDeleteAquarium(aqId: number) {
        const confirmed = window.confirm(
            'Deseja realmente excluir este aquário e todas as suas medições de parâmetros?'
        )
        if (!confirmed) return

        try {
            await deleteAquarium(aqId)
            const remaining = aquariums.filter((a) => a.id !== aqId)
            setAquariums(remaining)
            setSelectedAquarium(remaining.length > 0 ? remaining[0] : null)
            notify('Aquário removido com sucesso.')
        } catch {
            notify('Erro ao excluir aquário.', true)
        }
    }

    // --- Tests CRUD ---
    function openCreateTestModal() {
        setEditingTest(null)
        // Default to local datetime (YYYY-MM-DDTHH:mm)
        const now = new Date()
        const localIso = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 16)

        setTestDate(localIso)
        setTestPh('')
        setTestAmmonia('')
        setTestNitrite('')
        setTestNitrate('')
        setTestPhosphate('')
        setTestKh('')
        setTestGh('')
        setTestSalinity(selectedAquarium?.type === 'MARINE' ? '1.025' : '')
        setTestCalcium('')
        setTestMagnesium('')
        setTestTemperature('25.5')
        setTestSilicate('')
        setTestClientReport('')
        setTestDiagnosisNotes('')
        setIsTestModalOpen(true)
    }

    function openEditTestModal(test: WaterParameterTest) {
        setEditingTest(test)
        const dt = test.testDate ? test.testDate.slice(0, 16) : ''
        setTestDate(dt)
        setTestPh(test.ph !== undefined && test.ph !== null ? String(test.ph) : '')
        setTestAmmonia(test.ammonia !== undefined && test.ammonia !== null ? String(test.ammonia) : '')
        setTestNitrite(test.nitrite !== undefined && test.nitrite !== null ? String(test.nitrite) : '')
        setTestNitrate(test.nitrate !== undefined && test.nitrate !== null ? String(test.nitrate) : '')
        setTestPhosphate(test.phosphate !== undefined && test.phosphate !== null ? String(test.phosphate) : '')
        setTestKh(test.kh !== undefined && test.kh !== null ? String(test.kh) : '')
        setTestGh(test.gh !== undefined && test.gh !== null ? String(test.gh) : '')
        setTestSalinity(test.salinity !== undefined && test.salinity !== null ? String(test.salinity) : '')
        setTestCalcium(test.calcium !== undefined && test.calcium !== null ? String(test.calcium) : '')
        setTestMagnesium(test.magnesium !== undefined && test.magnesium !== null ? String(test.magnesium) : '')
        setTestTemperature(test.temperature !== undefined && test.temperature !== null ? String(test.temperature) : '')
        setTestSilicate(test.silicate !== undefined && test.silicate !== null ? String(test.silicate) : '')
        setTestClientReport(test.clientReport || '')
        setTestDiagnosisNotes(test.diagnosisNotes || '')
        setIsTestModalOpen(true)
    }

    async function handleSaveTest(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!selectedAquarium) return

        setSubmittingTest(true)
        try {
            const payload: CreateWaterParameterTestRequest = {
                aquariumId: selectedAquarium.id,
                testDate: testDate ? `${testDate}:00` : undefined,
                ph: testPh ? Number(testPh) : undefined,
                ammonia: testAmmonia ? Number(testAmmonia) : undefined,
                nitrite: testNitrite ? Number(testNitrite) : undefined,
                nitrate: testNitrate ? Number(testNitrate) : undefined,
                phosphate: testPhosphate ? Number(testPhosphate) : undefined,
                kh: testKh ? Number(testKh) : undefined,
                gh: testGh ? Number(testGh) : undefined,
                salinity: testSalinity ? Number(testSalinity) : undefined,
                calcium: testCalcium ? Number(testCalcium) : undefined,
                magnesium: testMagnesium ? Number(testMagnesium) : undefined,
                temperature: testTemperature ? Number(testTemperature) : undefined,
                silicate: testSilicate ? Number(testSilicate) : undefined,
                clientReport: testClientReport.trim() || undefined,
                diagnosisNotes: testDiagnosisNotes.trim() || undefined
            }

            if (editingTest) {
                const updated = await updateWaterTest(editingTest.id, payload)
                setTests((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
                notify('Medição atualizada com sucesso!')
            } else {
                const created = await createWaterTest(selectedAquarium.id, payload)
                setTests((prev) => [created, ...prev])
                // Update test count locally
                setSelectedAquarium((prev) =>
                    prev ? {...prev, testsCount: prev.testsCount + 1} : null
                )
                notify('Nova medição registrada com sucesso!')
            }
            setIsTestModalOpen(false)
        } catch {
            notify('Erro ao salvar medição.', true)
        } finally {
            setSubmittingTest(false)
        }
    }

    async function handleDeleteTest(testId: number) {
        const confirmed = window.confirm('Deseja excluir este registro de medição?')
        if (!confirmed) return

        try {
            await deleteWaterTest(testId)
            setTests((prev) => prev.filter((t) => t.id !== testId))
            setSelectedAquarium((prev) =>
                prev ? {...prev, testsCount: Math.max(0, prev.testsCount - 1)} : null
            )
            notify('Medição removida.')
        } catch {
            notify('Erro ao excluir medição.', true)
        }
    }

    // Format & Copy Report to WhatsApp
    function copyReportToClipboard(t: WaterParameterTest) {
        if (!customer || !selectedAquarium) return

        const formattedDate = new Date(t.testDate).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })

        const paramsList: string[] = []
        if (t.ph !== undefined && t.ph !== null) paramsList.push(`• pH: ${t.ph}`)
        if (t.temperature !== undefined && t.temperature !== null) paramsList.push(`• Temperatura: ${t.temperature}°C`)
        if (t.salinity !== undefined && t.salinity !== null) paramsList.push(`• Salinidade / Densidade: ${t.salinity}`)
        if (t.ammonia !== undefined && t.ammonia !== null) paramsList.push(`• Amônia (NH3): ${t.ammonia} ppm`)
        if (t.nitrite !== undefined && t.nitrite !== null) paramsList.push(`• Nitrito (NO2): ${t.nitrite} ppm`)
        if (t.nitrate !== undefined && t.nitrate !== null) paramsList.push(`• Nitrato (NO3): ${t.nitrate} ppm`)
        if (t.phosphate !== undefined && t.phosphate !== null) paramsList.push(`• Fosfato (PO4): ${t.phosphate} ppm`)
        if (t.kh !== undefined && t.kh !== null) paramsList.push(`• KH: ${t.kh} dKH`)
        if (t.gh !== undefined && t.gh !== null) paramsList.push(`• GH: ${t.gh} dGH`)
        if (t.calcium !== undefined && t.calcium !== null) paramsList.push(`• Cálcio (Ca): ${t.calcium} ppm`)
        if (t.magnesium !== undefined && t.magnesium !== null) paramsList.push(`• Magnésio (Mg): ${t.magnesium} ppm`)
        if (t.silicate !== undefined && t.silicate !== null) paramsList.push(`• Silicato (SiO2): ${t.silicate} ppm`)

        let text = `🌊 *LAUDO TÉCNICO DE PARÂMETROS - BAMBA AQUA*\n`
        text += `👤 *Cliente:* ${customer.name}\n`
        text += `🐠 *Aquário:* ${selectedAquarium.name} (${selectedAquarium.type === 'MARINE' ? 'Marinho' : 'Água Doce'}${selectedAquarium.volumeLiters ? ` • ${selectedAquarium.volumeLiters}L` : ''})\n`
        text += `📅 *Data do Teste:* ${formattedDate}\n\n`

        if (t.clientReport) {
            text += `📝 *Relato Inicial:* ${t.clientReport}\n\n`
        }

        text += `🧪 *Parâmetros Medidos:*\n`
        text += paramsList.join('\n') + `\n\n`

        if (t.diagnosisNotes) {
            const operator = currentUser.name || 'Admin'
            text += `🩺 *Diagnóstico e Recomendações (${operator}):*\n${t.diagnosisNotes}\n\n`
        }

        text += `Qualquer dúvida estamos à disposição na loja! 🐠✨`

        navigator.clipboard.writeText(text)
        setCopiedTestId(t.id)
        notify('Laudo copiado! Agora é só colar no WhatsApp do cliente.')
        setTimeout(() => setCopiedTestId(null), 3000)
    }

    // --- General Aquarium Notes CRUD ---
    function openCreateNoteModal() {
        setEditingNote(null)
        const now = new Date()
        const localIso = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 16)
        setNoteDate(localIso)
        setNoteTitle('')
        setNoteContent('')
        setIsNoteModalOpen(true)
    }

    function openEditNoteModal(note: AquariumNote) {
        setEditingNote(note)
        const dt = note.noteDate ? note.noteDate.slice(0, 16) : ''
        setNoteDate(dt)
        setNoteTitle(note.title || '')
        setNoteContent(note.content || '')
        setIsNoteModalOpen(true)
    }

    async function handleSaveNote(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!selectedAquarium) return
        if (!noteContent.trim()) {
            notify('O conteúdo da anotação é obrigatório.', true)
            return
        }

        setSubmittingNote(true)
        try {
            const payload: CreateAquariumNoteRequest = {
                aquariumId: selectedAquarium.id,
                noteDate: noteDate ? `${noteDate}:00` : undefined,
                title: noteTitle.trim() || undefined,
                content: noteContent.trim(),
                authorName: currentUser.name || 'Admin'
            }

            if (editingNote) {
                const updated = await updateAquariumNote(editingNote.id, payload)
                setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)))
                notify('Anotação atualizada com sucesso!')
            } else {
                const created = await createAquariumNote(selectedAquarium.id, payload)
                setNotes((prev) => [created, ...prev])
                setSelectedAquarium((prev) =>
                    prev ? {...prev, notesCount: (prev.notesCount || 0) + 1} : null
                )
                setAquariums((prev) =>
                    prev.map((a) =>
                        a.id === selectedAquarium.id
                            ? {...a, notesCount: (a.notesCount || 0) + 1}
                            : a
                    )
                )
                notify('Anotação registrada no diário do aquário!')
            }
            setIsNoteModalOpen(false)
        } catch {
            notify('Erro ao salvar anotação.', true)
        } finally {
            setSubmittingNote(false)
        }
    }

    async function handleDeleteNote(noteId: number) {
        const confirmed = window.confirm('Deseja excluir esta anotação do diário?')
        if (!confirmed) return

        try {
            await deleteAquariumNote(noteId)
            setNotes((prev) => prev.filter((n) => n.id !== noteId))
            setSelectedAquarium((prev) =>
                prev ? {...prev, notesCount: Math.max(0, (prev.notesCount || 1) - 1)} : null
            )
            setAquariums((prev) =>
                prev.map((a) =>
                    a.id === selectedAquarium?.id
                        ? {...a, notesCount: Math.max(0, (a.notesCount || 1) - 1)}
                        : a
                )
            )
            notify('Anotação removida com sucesso.')
        } catch {
            notify('Erro ao excluir anotação.', true)
        }
    }

    function copyNoteToClipboard(n: AquariumNote) {
        if (!customer || !selectedAquarium) return

        const formattedDate = new Date(n.noteDate).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })

        let text = `📝 *DIÁRIO DO AQUÁRIO - BAMBA AQUA*\n`
        text += `👤 *Cliente:* ${customer.name}\n`
        text += `🐠 *Aquário:* ${selectedAquarium.name} (${selectedAquarium.type === 'MARINE' ? 'Marinho' : 'Água Doce'}${selectedAquarium.volumeLiters ? ` • ${selectedAquarium.volumeLiters}L` : ''})\n`
        text += `📅 *Data:* ${formattedDate}\n`
        if (n.authorName) {
            text += `✍️ *Registrado por:* ${n.authorName}\n`
        }
        if (n.title) {
            text += `📌 *Assunto:* ${n.title}\n`
        }
        text += `\n${n.content}\n\n`
        text += `Qualquer dúvida estamos à disposição! 🐠✨`

        navigator.clipboard.writeText(text)
        setCopiedNoteId(n.id)
        notify('Anotação copiada para a área de transferência!')
        setTimeout(() => setCopiedNoteId(null), 3000)
    }

    if (loadingCustomer) {
        return (
            <div className="py-20 text-center text-xs text-slate-400">
                Carregando ficha do cliente...
            </div>
        )
    }

    if (!customer) {
        return (
            <div className="text-center py-20 space-y-3">
                <AlertCircle className="h-10 w-10 text-rose-500 mx-auto" />
                <p className="text-sm font-bold text-slate-800">Cliente não encontrado.</p>
                <button
                    onClick={() => navigate('/customers')}
                    className="text-xs text-sky-600 font-semibold hover:underline"
                >
                    Voltar para lista de clientes
                </button>
            </div>
        )
    }

    const cleanPhone = customer.phoneNumber ? customer.phoneNumber.replace(/\D/g, '') : ''

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-16">
            {/* Navigation & Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => navigate('/customers')}
                        className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-xs"
                        title="Voltar para Clientes"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </button>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                {customer.name}
                            </h1>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                                Cliente #{customer.id}
                            </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Caderno Técnico • Histórico de Aquários & Auditoria de Parâmetros
                        </p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-2">
                    {cleanPhone && (
                        <a
                            href={`https://wa.me/55${cleanPhone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-all shadow-xs"
                        >
                            <Phone className="h-3.5 w-3.5" />
                            <span>Abrir WhatsApp</span>
                        </a>
                    )}
                </div>
            </div>

            {/* Notifications */}
            {feedbackMessage && (
                <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-medium animate-in fade-in">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{feedbackMessage}</span>
                </div>
            )}

            {errorMessage && (
                <div className="flex items-center gap-2 p-3 bg-rose-50 text-rose-800 border border-rose-200 rounded-xl text-xs font-medium animate-in fade-in">
                    <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                    <span>{errorMessage}</span>
                </div>
            )}

            {/* Customer Details Pill Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="flex items-center gap-2.5 text-slate-600 p-2 rounded-xl bg-slate-50">
                        <Mail className="h-4 w-4 text-sky-600 shrink-0" />
                        <span className="truncate">{customer.email || 'E-mail não informado'}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-600 p-2 rounded-xl bg-slate-50">
                        <Phone className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>{customer.phoneNumber || 'Telefone não informado'}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-600 p-2 rounded-xl bg-slate-50">
                        <MapPin className="h-4 w-4 text-rose-600 shrink-0" />
                        <span className="truncate">{customer.address || 'Endereço não informado'}</span>
                    </div>
                </div>
            </div>

            {/* Main Section Navigation Switcher */}
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
                <button
                    type="button"
                    onClick={() => setActiveSection('aquariums')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        activeSection === 'aquariums'
                            ? 'bg-sky-600 text-white shadow-xs'
                            : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                    }`}
                >
                    <Fish className="h-4 w-4" />
                    <span>Aquários & Caderno Técnico</span>
                    <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                            activeSection === 'aquariums'
                                ? 'bg-sky-500 text-white'
                                : 'bg-slate-100 text-slate-700'
                        }`}
                    >
                        {aquariums.length}
                    </span>
                </button>

                <button
                    type="button"
                    onClick={() => setActiveSection('orders')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        activeSection === 'orders'
                            ? 'bg-sky-600 text-white shadow-xs'
                            : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                    }`}
                >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Histórico de Compras & Pedidos</span>
                    <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                            activeSection === 'orders'
                                ? 'bg-sky-500 text-white'
                                : 'bg-slate-100 text-slate-700'
                        }`}
                    >
                        {customerOrders.length}
                    </span>
                    {pendingOrdersCount > 0 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-white font-bold animate-pulse">
                            {pendingOrdersCount} pendente{pendingOrdersCount > 1 ? 's' : ''}
                        </span>
                    )}
                </button>
            </div>

            {/* Section 1: Aquários & Caderno Técnico */}
            {activeSection === 'aquariums' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                    {/* Aquariums Selector Tabs */}
                    <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                        <Fish className="h-4 w-4 text-sky-600" />
                        <span>Aquários do Cliente ({aquariums.length})</span>
                    </div>

                    <button
                        type="button"
                        onClick={openCreateAquariumModal}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                    >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Cadastrar Novo Aquário</span>
                    </button>
                </div>

                {aquariums.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center space-y-3">
                        <Fish className="h-10 w-10 text-slate-400 mx-auto" />
                        <div>
                            <p className="text-sm font-bold text-slate-800">
                                Nenhum aquário cadastrado para este cliente.
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                                Cadastre o primeiro aquário para começar a registrar medições de água e diagnósticos.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={openCreateAquariumModal}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-xl text-xs font-bold hover:bg-sky-700 transition-colors"
                        >
                            <Plus className="h-3.5 w-3.5" />
                            <span>Cadastrar Primeiro Aquário</span>
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {aquariums.map((aq) => {
                            const isSelected = selectedAquarium?.id === aq.id
                            return (
                                <div
                                    key={aq.id}
                                    onClick={() => setSelectedAquarium(aq)}
                                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                                        isSelected
                                            ? 'bg-sky-50/80 border-sky-500 ring-2 ring-sky-200 shadow-xs'
                                            : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50'
                                    }`}
                                >
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span
                                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                                    aq.type === 'MARINE'
                                                        ? 'bg-sky-100 text-sky-800'
                                                        : 'bg-emerald-100 text-emerald-800'
                                                }`}
                                            >
                                                {aq.type === 'MARINE' ? 'Marinho Reef' : 'Água Doce'}
                                            </span>

                                            <div className="flex items-center gap-1">
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        openEditAquariumModal(aq)
                                                    }}
                                                    className="p-1 text-slate-400 hover:text-sky-600 rounded-md transition-colors"
                                                    title="Editar aquário"
                                                >
                                                    <Edit3 className="h-3.5 w-3.5" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleDeleteAquarium(aq.id)
                                                    }}
                                                    className="p-1 text-slate-400 hover:text-rose-600 rounded-md transition-colors"
                                                    title="Excluir aquário"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-sm text-slate-900 leading-tight">
                                                {aq.name}
                                            </h3>
                                            <p className="text-xs text-slate-500 font-medium mt-0.5">
                                                {aq.volumeLiters ? `${aq.volumeLiters} Litros` : 'Volume não informado'}
                                            </p>
                                        </div>

                                        {aq.description && (
                                            <p className="text-[11px] text-slate-600 line-clamp-2 bg-slate-50/70 p-2 rounded-lg border border-slate-100">
                                                {aq.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                                        <div className="flex items-center gap-2 text-slate-500 font-medium">
                                            <span>{aq.testsCount} {aq.testsCount === 1 ? 'medição' : 'medições'}</span>
                                            <span>•</span>
                                            <span>{aq.notesCount || 0} {(aq.notesCount || 0) === 1 ? 'anotação' : 'anotações'}</span>
                                        </div>
                                        {isSelected && (
                                            <span className="font-bold text-sky-700 flex items-center gap-1">
                                                <span>Visualizando</span>
                                                <Check className="h-3 w-3" />
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* Active Aquarium Section: Tabs for Parameters vs General Journal Notes */}
            {selectedAquarium && (
                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
                    {/* Header of Active Aquarium */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                        <div>
                            <div className="flex items-center gap-2">
                                <Fish className="h-5 w-5 text-sky-600" />
                                <h2 className="text-base font-bold text-slate-900">
                                    {selectedAquarium.name}
                                </h2>
                                <span
                                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                        selectedAquarium.type === 'MARINE'
                                            ? 'bg-sky-100 text-sky-800'
                                            : 'bg-emerald-100 text-emerald-800'
                                    }`}
                                >
                                    {selectedAquarium.type === 'MARINE' ? 'Marinho Reef' : 'Água Doce'}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">
                                {selectedAquarium.volumeLiters ? `${selectedAquarium.volumeLiters} Litros` : 'Volume não informado'}
                                {selectedAquarium.description ? ` • ${selectedAquarium.description}` : ''}
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            {activeTab === 'parameters' ? (
                                <button
                                    type="button"
                                    onClick={openCreateTestModal}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                                >
                                    <Plus className="h-4 w-4" />
                                    <span>Registrar Nova Medição</span>
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={openCreateNoteModal}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                                >
                                    <Plus className="h-4 w-4" />
                                    <span>Nova Anotação no Caderno</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Section Switcher Tabs */}
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                        <button
                            type="button"
                            onClick={() => setActiveTab('parameters')}
                            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                                activeTab === 'parameters'
                                    ? 'bg-slate-900 text-white shadow-xs'
                                    : 'text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                            <Activity className="h-3.5 w-3.5 text-emerald-400" />
                            <span>Auditoria de Parâmetros ({tests.length})</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('notes')}
                            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                                activeTab === 'notes'
                                    ? 'bg-slate-900 text-white shadow-xs'
                                    : 'text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                            <BookOpen className="h-3.5 w-3.5 text-sky-400" />
                            <span>Caderno de Anotações & Diário ({notes.length})</span>
                        </button>
                    </div>

                    {/* Tab 1: Water Parameter Tests */}
                    {activeTab === 'parameters' && (
                        <div>
                            {loadingTests ? (
                                <div className="py-12 text-center text-xs text-slate-400">
                                    Carregando medições...
                                </div>
                            ) : tests.length === 0 ? (
                                <div className="py-12 text-center space-y-2">
                                    <Droplets className="h-8 w-8 text-slate-300 mx-auto" />
                                    <p className="text-xs font-semibold text-slate-700">
                                        Nenhuma medição registrada para este aquário ainda.
                                    </p>
                                    <p className="text-[11px] text-slate-400 max-w-md mx-auto">
                                        Clique em &quot;Registrar Nova Medição&quot; para anotar os níveis de pH, Nitrato, Fosfato, KH, Salinidade e o diagnóstico do operador.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {tests.map((t) => {
                                        const formattedDate = new Date(t.testDate).toLocaleDateString('pt-BR', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })

                                        return (
                                            <div
                                                key={t.id}
                                                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all space-y-4 shadow-xs"
                                            >
                                                {/* Test Header */}
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4 text-sky-600" />
                                                        <span className="text-xs font-bold text-slate-900 font-mono">
                                                            {formattedDate}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => copyReportToClipboard(t)}
                                                            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
                                                            title="Copiar laudo formatado para enviar no WhatsApp"
                                                        >
                                                            {copiedTestId === t.id ? (
                                                                <>
                                                                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                                                                    <span>Copiado!</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Copy className="h-3.5 w-3.5" />
                                                                    <span>Copiar p/ WhatsApp</span>
                                                                </>
                                                            )}
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => openEditTestModal(t)}
                                                            className="p-1.5 text-slate-400 hover:text-sky-600 rounded-lg hover:bg-slate-100 transition-colors"
                                                            title="Editar medição"
                                                        >
                                                            <Edit3 className="h-3.5 w-3.5" />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => handleDeleteTest(t.id)}
                                                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
                                                            title="Excluir medição"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Client Report (Relato do cliente) if filled */}
                                                {t.clientReport && (
                                                    <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs space-y-1">
                                                        <div className="flex items-center gap-1.5 font-bold text-amber-900 text-[11px] uppercase tracking-wider">
                                                            <MessageSquare className="h-3.5 w-3.5 text-amber-600" />
                                                            <span>Relato do Cliente</span>
                                                        </div>
                                                        <p className="text-amber-950 font-medium">
                                                            &quot;{t.clientReport}&quot;
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Parameters Grid: Badges */}
                                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 text-xs">
                                                    {t.ph !== undefined && t.ph !== null && (
                                                        <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                                                            <span className="text-[10px] text-slate-400 block font-semibold">pH</span>
                                                            <span className="text-sm font-bold text-slate-900 font-mono">{t.ph}</span>
                                                        </div>
                                                    )}
                                                    {t.temperature !== undefined && t.temperature !== null && (
                                                        <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                                                            <span className="text-[10px] text-slate-400 block font-semibold">Temperatura</span>
                                                            <span className="text-sm font-bold text-slate-900 font-mono">{t.temperature}°C</span>
                                                        </div>
                                                    )}
                                                    {t.salinity !== undefined && t.salinity !== null && (
                                                        <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                                                            <span className="text-[10px] text-slate-400 block font-semibold">Salinidade</span>
                                                            <span className="text-sm font-bold text-slate-900 font-mono">{t.salinity}</span>
                                                        </div>
                                                    )}
                                                    {t.ammonia !== undefined && t.ammonia !== null && (
                                                        <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                                                            <span className="text-[10px] text-slate-400 block font-semibold">Amônia (NH₃)</span>
                                                            <span className={`text-sm font-bold font-mono ${t.ammonia > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                                                                {t.ammonia} ppm
                                                            </span>
                                                        </div>
                                                    )}
                                                    {t.nitrite !== undefined && t.nitrite !== null && (
                                                        <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                                                            <span className="text-[10px] text-slate-400 block font-semibold">Nitrito (NO₂)</span>
                                                            <span className={`text-sm font-bold font-mono ${t.nitrite > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                                                                {t.nitrite} ppm
                                                            </span>
                                                        </div>
                                                    )}
                                                    {t.nitrate !== undefined && t.nitrate !== null && (
                                                        <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                                                            <span className="text-[10px] text-slate-400 block font-semibold">Nitrato (NO₃)</span>
                                                            <span className="text-sm font-bold text-slate-900 font-mono">{t.nitrate} ppm</span>
                                                        </div>
                                                    )}
                                                    {t.phosphate !== undefined && t.phosphate !== null && (
                                                        <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                                                            <span className="text-[10px] text-slate-400 block font-semibold">Fosfato (PO₄)</span>
                                                            <span className="text-sm font-bold text-slate-900 font-mono">{t.phosphate} ppm</span>
                                                        </div>
                                                    )}
                                                    {t.kh !== undefined && t.kh !== null && (
                                                        <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                                                            <span className="text-[10px] text-slate-400 block font-semibold">Reserva (KH)</span>
                                                            <span className="text-sm font-bold text-slate-900 font-mono">{t.kh} dKH</span>
                                                        </div>
                                                    )}
                                                    {t.gh !== undefined && t.gh !== null && (
                                                        <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                                                            <span className="text-[10px] text-slate-400 block font-semibold">Dureza (GH)</span>
                                                            <span className="text-sm font-bold text-slate-900 font-mono">{t.gh} dGH</span>
                                                        </div>
                                                    )}
                                                    {t.calcium !== undefined && t.calcium !== null && (
                                                        <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                                                            <span className="text-[10px] text-slate-400 block font-semibold">Cálcio (Ca)</span>
                                                            <span className="text-sm font-bold text-slate-900 font-mono">{t.calcium} ppm</span>
                                                        </div>
                                                    )}
                                                    {t.magnesium !== undefined && t.magnesium !== null && (
                                                        <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                                                            <span className="text-[10px] text-slate-400 block font-semibold">Magnésio (Mg)</span>
                                                            <span className="text-sm font-bold text-slate-900 font-mono">{t.magnesium} ppm</span>
                                                        </div>
                                                    )}
                                                    {t.silicate !== undefined && t.silicate !== null && (
                                                        <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                                                            <span className="text-[10px] text-slate-400 block font-semibold">Silicato (SiO₂)</span>
                                                            <span className="text-sm font-bold text-slate-900 font-mono">{t.silicate} ppm</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Diagnosis & Recommendations Notes if filled */}
                                                {t.diagnosisNotes && (
                                                    <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs space-y-1">
                                                        <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-[11px] uppercase tracking-wider">
                                                            <Stethoscope className="h-3.5 w-3.5 text-emerald-600" />
                                                            <span>Diagnóstico & Recomendações ({currentUser.name || 'Admin'})</span>
                                                        </div>
                                                        <p className="text-emerald-950 whitespace-pre-line font-medium">
                                                            {t.diagnosisNotes}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Tab 2: General Aquarium Notes & Journal */}
                    {activeTab === 'notes' && (
                        <div>
                            {loadingNotes ? (
                                <div className="py-12 text-center text-xs text-slate-400">
                                    Carregando anotações do diário...
                                </div>
                            ) : notes.length === 0 ? (
                                <div className="py-12 text-center space-y-3">
                                    <BookOpen className="h-8 w-8 text-slate-300 mx-auto" />
                                    <div>
                                        <p className="text-xs font-semibold text-slate-700">
                                            Nenhuma anotação geral registrada para este aquário ainda.
                                        </p>
                                        <p className="text-[11px] text-slate-400 max-w-md mx-auto mt-1">
                                            Use este espaço como um caderno de bordo para registrar manutenções preventivas, troca de lâmpadas/mídias, introdução de novos peixes e corais, relatos do cliente ou qualquer observação do dia a dia.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={openCreateNoteModal}
                                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-sky-600 text-white rounded-xl text-xs font-bold hover:bg-sky-700 transition-colors shadow-xs"
                                    >
                                        <Plus className="h-3.5 w-3.5" />
                                        <span>Escrever Primeira Anotação</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {notes.map((n) => {
                                        const formattedDate = new Date(n.noteDate).toLocaleDateString('pt-BR', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })

                                        return (
                                            <div
                                                key={n.id}
                                                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all space-y-3 shadow-xs"
                                            >
                                                {/* Note Header */}
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <Calendar className="h-4 w-4 text-sky-600" />
                                                        <span className="text-xs font-bold text-slate-900 font-mono">
                                                            {formattedDate}
                                                        </span>
                                                        {n.authorName && (
                                                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                                                                Por: {n.authorName}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => copyNoteToClipboard(n)}
                                                            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-colors"
                                                            title="Copiar anotação para área de transferência / WhatsApp"
                                                        >
                                                            {copiedNoteId === n.id ? (
                                                                <>
                                                                    <Check className="h-3.5 w-3.5 text-sky-600" />
                                                                    <span>Copiado!</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Copy className="h-3.5 w-3.5" />
                                                                    <span>Copiar p/ WhatsApp</span>
                                                                </>
                                                            )}
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => openEditNoteModal(n)}
                                                            className="p-1.5 text-slate-400 hover:text-sky-600 rounded-lg hover:bg-slate-100 transition-colors"
                                                            title="Editar anotação"
                                                        >
                                                            <Edit3 className="h-3.5 w-3.5" />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => handleDeleteNote(n.id)}
                                                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
                                                            title="Excluir anotação"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Note Title if present */}
                                                {n.title && (
                                                    <h4 className="font-bold text-sm text-slate-900">
                                                        {n.title}
                                                    </h4>
                                                )}

                                                {/* Note Body */}
                                                <div className="p-3.5 bg-white border border-slate-200/80 rounded-xl text-xs text-slate-800 whitespace-pre-line leading-relaxed">
                                                    {n.content}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
                </div>
            )}

            {/* Section 2: Histórico de Compras & Pedidos do Cliente */}
            {activeSection === 'orders' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                    {/* Financial Summary & KPI Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                            <div className="flex items-center justify-between text-slate-500 mb-2">
                                <span className="text-xs font-medium">Total em Compras Pagas</span>
                                <DollarSign className="h-4 w-4 text-emerald-600" />
                            </div>
                            <p className="text-2xl font-black text-slate-900">
                                R$ {totalPaidAmount.toFixed(2)}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-1">
                                {paidOrdersCount} compra(s) quitada(s)
                            </p>
                        </div>

                        <div
                            className={`p-5 rounded-2xl border shadow-xs transition-all ${
                                pendingOrdersCount > 0
                                    ? 'bg-amber-50/50 border-amber-300'
                                    : 'bg-white border-slate-200/80'
                            }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span
                                    className={`text-xs font-semibold ${
                                        pendingOrdersCount > 0 ? 'text-amber-800' : 'text-slate-500'
                                    }`}
                                >
                                    Pendente de Pagamento
                                </span>
                                <Clock
                                    className={`h-4 w-4 ${
                                        pendingOrdersCount > 0 ? 'text-amber-600' : 'text-slate-400'
                                    }`}
                                />
                            </div>
                            <p
                                className={`text-2xl font-black ${
                                    pendingOrdersCount > 0 ? 'text-amber-700' : 'text-slate-900'
                                }`}
                            >
                                R$ {totalPendingAmount.toFixed(2)}
                            </p>
                            <p
                                className={`text-[11px] mt-1 ${
                                    pendingOrdersCount > 0 ? 'text-amber-700 font-medium' : 'text-slate-400'
                                }`}
                            >
                                {pendingOrdersCount > 0
                                    ? `${pendingOrdersCount} pedido(s) aguardando quitação`
                                    : 'Nenhum valor pendente'}
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                            <div className="flex items-center justify-between text-slate-500 mb-2">
                                <span className="text-xs font-medium">Total de Pedidos</span>
                                <ShoppingBag className="h-4 w-4 text-sky-600" />
                            </div>
                            <p className="text-2xl font-black text-slate-900">
                                {customerOrders.length}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-1">
                                Pedidos registrados no histórico
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                            <div className="flex items-center justify-between text-slate-500 mb-2">
                                <span className="text-xs font-medium">Ticket Médio</span>
                                <Receipt className="h-4 w-4 text-indigo-600" />
                            </div>
                            <p className="text-2xl font-black text-slate-900">
                                R$ {paidOrdersCount > 0 ? (totalPaidAmount / paidOrdersCount).toFixed(2) : '0,00'}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-1">
                                Média por pedido pago
                            </p>
                        </div>
                    </div>

                    {/* Filter Bar & Controls */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-1.5">
                            <button
                                type="button"
                                onClick={() => setOrderStatusFilter('ALL')}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                    orderStatusFilter === 'ALL'
                                        ? 'bg-sky-600 text-white shadow-xs'
                                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                Todos ({customerOrders.length})
                            </button>
                            <button
                                type="button"
                                onClick={() => setOrderStatusFilter('PENDING')}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                                    orderStatusFilter === 'PENDING'
                                        ? 'bg-amber-600 text-white shadow-xs'
                                        : pendingOrdersCount > 0
                                        ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                <Clock className="h-3.5 w-3.5" />
                                <span>Pendentes ({pendingOrdersCount})</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setOrderStatusFilter('PAID')}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                                    orderStatusFilter === 'PAID'
                                        ? 'bg-emerald-600 text-white shadow-xs'
                                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                <span>Pagos ({paidOrdersCount})</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setOrderStatusFilter('CANCELED')}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                                    orderStatusFilter === 'CANCELED'
                                        ? 'bg-slate-700 text-white shadow-xs'
                                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                <XCircle className="h-3.5 w-3.5" />
                                <span>Cancelados ({customerOrders.filter((o) => o.status === 'CANCELED').length})</span>
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={loadCustomerOrders}
                            disabled={loadingOrders}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl font-semibold transition-all self-end sm:self-auto cursor-pointer"
                            title="Recarregar pedidos"
                        >
                            <RefreshCw className={`h-3.5 w-3.5 ${loadingOrders ? 'animate-spin' : ''}`} />
                            <span>Atualizar</span>
                        </button>
                    </div>

                    {/* Orders List */}
                    {loadingOrders ? (
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center text-slate-400 text-xs">
                            Carregando histórico de pedidos...
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center space-y-2">
                            <ShoppingBag className="h-10 w-10 text-slate-400 mx-auto" />
                            <p className="text-sm font-bold text-slate-800">
                                Nenhum pedido encontrado.
                            </p>
                            <p className="text-xs text-slate-500">
                                {customerOrders.length === 0
                                    ? 'Este cliente ainda não possui compras registradas. Vendas realizadas no caixa associadas a este cliente aparecerão aqui.'
                                    : 'Não há pedidos para o filtro selecionado.'}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredOrders.map((order) => {
                                const isPending = order.status === 'PENDING'
                                const isPaid = order.status === 'PAID'
                                const isCanceled = order.status === 'CANCELED'
                                const orderDate = new Date(order.createdAt).toLocaleDateString('pt-BR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })

                                return (
                                    <div
                                        key={order.id}
                                        className={`bg-white rounded-2xl border p-5 shadow-xs transition-all space-y-4 ${
                                            isPending
                                                ? 'border-amber-300 hover:border-amber-400'
                                                : isPaid
                                                ? 'border-slate-200/80 hover:border-slate-300'
                                                : 'border-slate-200 bg-slate-50/50 opacity-75'
                                        }`}
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm font-black text-slate-900 tracking-tight">
                                                    Pedido #{order.id}
                                                </span>
                                                <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                                    {orderDate}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {isPaid && (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                                        Pago
                                                    </span>
                                                )}
                                                {isPending && (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300">
                                                        <Clock className="h-3.5 w-3.5 text-amber-600" />
                                                        Pendente de Pagamento
                                                    </span>
                                                )}
                                                {isCanceled && (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                                                        <XCircle className="h-3.5 w-3.5" />
                                                        Cancelado
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Items preview and Total */}
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="space-y-1.5 flex-1">
                                                <span className="text-[10px] text-slate-400 uppercase font-semibold">
                                                    Itens do Pedido ({order.items.reduce((acc, i) => acc + i.quantity, 0)} unidades):
                                                </span>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {order.items.map((item, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="inline-flex items-center gap-1 text-xs bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-lg text-slate-700 font-medium"
                                                        >
                                                            <strong className="text-slate-900">{item.quantity}x</strong>
                                                            <span>{item.productName}</span>
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="text-left md:text-right shrink-0">
                                                <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                                                    Valor Total
                                                </span>
                                                <span className="text-xl font-black text-slate-900">
                                                    R$ {Number(order.totalPrice || 0).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Action buttons */}
                                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
                                            <button
                                                type="button"
                                                onClick={() => setSelectedOrderDetails(order)}
                                                className="flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-800 hover:underline cursor-pointer"
                                            >
                                                <Eye className="h-3.5 w-3.5" />
                                                <span>Ver Itens & Detalhes ({order.items.length} itens)</span>
                                            </button>

                                            {isPending && (
                                                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                                    <button
                                                        type="button"
                                                        disabled={cancelingOrderId === order.id}
                                                        onClick={() => handleCancelCustomerOrder(order.id)}
                                                        className="px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-xl font-semibold transition-all disabled:opacity-50 cursor-pointer"
                                                    >
                                                        Cancelar Pedido
                                                    </button>
                                                    <button
                                                        type="button"
                                                        disabled={payingOrderId === order.id}
                                                        onClick={() => handlePayCustomerOrder(order.id)}
                                                        className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                                                    >
                                                        <CheckCircle2 className="h-4 w-4" />
                                                        <span>
                                                            {payingOrderId === order.id
                                                                ? 'Confirmando...'
                                                                : 'Confirmar Pagamento'}
                                                        </span>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* Modal: Cadastrar / Editar Aquário */}
            {isAquariumModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                                <Fish className="h-4 w-4 text-sky-600" />
                                <span>{editingAquarium ? 'Editar Aquário' : 'Novo Aquário do Cliente'}</span>
                            </h3>
                            <button
                                type="button"
                                onClick={() => setIsAquariumModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                            >
                                Fechar
                            </button>
                        </div>

                        <form onSubmit={handleSaveAquarium} className="space-y-4 text-xs">
                            <div>
                                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                    Nome / Identificação do Aquário *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={aqName}
                                    onChange={(e) => setAqName(e.target.value)}
                                    placeholder="Ex: Reef Principal da Sala, Nano Betta do Quarto..."
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-sky-500 focus:outline-hidden font-medium"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                        Tipo de Aquário
                                    </label>
                                    <select
                                        value={aqType}
                                        onChange={(e) => setAqType(e.target.value as AquariumType)}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-sky-500 focus:outline-hidden font-medium"
                                    >
                                        <option value="MARINE">Marinho (Reef/Fish Only)</option>
                                        <option value="FRESHWATER">Água Doce (Plantado/Comunitário)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                        Volume em Litros
                                    </label>
                                    <input
                                        type="number"
                                        step="1"
                                        min="1"
                                        value={aqVolume}
                                        onChange={(e) => setAqVolume(e.target.value)}
                                        placeholder="Ex: 300"
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-sky-500 focus:outline-hidden font-medium"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                    Equipamentos & Setup Geral (Opcional)
                                </label>
                                <textarea
                                    rows={3}
                                    value={aqDescription}
                                    onChange={(e) => setAqDescription(e.target.value)}
                                    placeholder="Ex: Skimmer Curve 7, luminária Hydra 32, substrato Samoa Pink, montado em Jan/2024..."
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-sky-500 focus:outline-hidden font-medium resize-none"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setIsAquariumModalOpen(false)}
                                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={submittingAquarium}
                                    className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold disabled:opacity-50"
                                >
                                    {submittingAquarium ? 'Salvando...' : 'Salvar Aquário'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Registrar Nova Medição de Parâmetros */}
            {isTestModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in overflow-y-auto">
                    <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <div>
                                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                                    <Activity className="h-4 w-4 text-emerald-600" />
                                    <span>
                                        {editingTest ? 'Editar Medição de Água' : 'Nova Medição de Parâmetros'}
                                    </span>
                                </h3>
                                <p className="text-[11px] text-slate-500">
                                    Aquário: {selectedAquarium?.name} ({selectedAquarium?.type === 'MARINE' ? 'Marinho' : 'Água Doce'})
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsTestModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                            >
                                Fechar
                            </button>
                        </div>

                        <form onSubmit={handleSaveTest} className="space-y-4 text-xs">
                            {/* Date input */}
                            <div>
                                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                    Data e Hora da Medição
                                </label>
                                <input
                                    type="datetime-local"
                                    required
                                    value={testDate}
                                    onChange={(e) => setTestDate(e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-sky-500 focus:outline-hidden font-mono font-medium"
                                />
                            </div>

                            {/* Client Report */}
                            <div>
                                <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                                    <MessageSquare className="h-3.5 w-3.5 text-amber-600" />
                                    <span>Relato do Cliente / Motivo da Consulta (Opcional)</span>
                                </label>
                                <textarea
                                    rows={2}
                                    value={testClientReport}
                                    onChange={(e) => setTestClientReport(e.target.value)}
                                    placeholder="Ex: Cliente notou água esbranquiçada e peixes respirando na superfície após colocar nova rocha..."
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-sky-500 focus:outline-hidden font-medium resize-none"
                                />
                            </div>

                            {/* Parameters Grid */}
                            <div className="space-y-3 pt-2 border-t border-slate-100">
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                                        <Droplets className="h-3.5 w-3.5 text-sky-600" />
                                        <span>Níveis dos Parâmetros Medidos</span>
                                    </span>
                                    <span className="text-[10px] text-slate-400">
                                        Preencha apenas o que mediu hoje (campos opcionais)
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                    {/* pH */}
                                    <div>
                                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">
                                            pH
                                        </label>
                                        <input
                                            type="number"
                                            step="0.05"
                                            placeholder="Ex: 8.2"
                                            value={testPh}
                                            onChange={(e) => setTestPh(e.target.value)}
                                            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold focus:bg-white focus:border-sky-500 focus:outline-hidden"
                                        />
                                    </div>

                                    {/* Salinidade */}
                                    <div>
                                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">
                                            Salinidade / Densidade
                                        </label>
                                        <input
                                            type="number"
                                            step="0.001"
                                            placeholder="Ex: 1.025 ou 35"
                                            value={testSalinity}
                                            onChange={(e) => setTestSalinity(e.target.value)}
                                            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold focus:bg-white focus:border-sky-500 focus:outline-hidden"
                                        />
                                    </div>

                                    {/* Temperatura */}
                                    <div>
                                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">
                                            Temperatura (°C)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            placeholder="Ex: 25.5"
                                            value={testTemperature}
                                            onChange={(e) => setTestTemperature(e.target.value)}
                                            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold focus:bg-white focus:border-sky-500 focus:outline-hidden"
                                        />
                                    </div>

                                    {/* Amônia */}
                                    <div>
                                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">
                                            Amônia NH₃ (ppm)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            placeholder="Ex: 0.0"
                                            value={testAmmonia}
                                            onChange={(e) => setTestAmmonia(e.target.value)}
                                            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold focus:bg-white focus:border-sky-500 focus:outline-hidden"
                                        />
                                    </div>

                                    {/* Nitrito */}
                                    <div>
                                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">
                                            Nitrito NO₂ (ppm)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            placeholder="Ex: 0.0"
                                            value={testNitrite}
                                            onChange={(e) => setTestNitrite(e.target.value)}
                                            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold focus:bg-white focus:border-sky-500 focus:outline-hidden"
                                        />
                                    </div>

                                    {/* Nitrato */}
                                    <div>
                                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">
                                            Nitrato NO₃ (ppm)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            placeholder="Ex: 5.0"
                                            value={testNitrate}
                                            onChange={(e) => setTestNitrate(e.target.value)}
                                            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold focus:bg-white focus:border-sky-500 focus:outline-hidden"
                                        />
                                    </div>

                                    {/* Fosfato */}
                                    <div>
                                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">
                                            Fosfato PO₄ (ppm)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            placeholder="Ex: 0.03"
                                            value={testPhosphate}
                                            onChange={(e) => setTestPhosphate(e.target.value)}
                                            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold focus:bg-white focus:border-sky-500 focus:outline-hidden"
                                        />
                                    </div>

                                    {/* KH */}
                                    <div>
                                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">
                                            Reserva Alcalina KH (dKH)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            placeholder="Ex: 8.5"
                                            value={testKh}
                                            onChange={(e) => setTestKh(e.target.value)}
                                            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold focus:bg-white focus:border-sky-500 focus:outline-hidden"
                                        />
                                    </div>

                                    {/* GH */}
                                    <div>
                                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">
                                            Dureza Geral GH (dGH)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.5"
                                            placeholder="Ex: 6.0"
                                            value={testGh}
                                            onChange={(e) => setTestGh(e.target.value)}
                                            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold focus:bg-white focus:border-sky-500 focus:outline-hidden"
                                        />
                                    </div>

                                    {/* Cálcio */}
                                    <div>
                                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">
                                            Cálcio Ca (ppm)
                                        </label>
                                        <input
                                            type="number"
                                            step="5"
                                            placeholder="Ex: 430"
                                            value={testCalcium}
                                            onChange={(e) => setTestCalcium(e.target.value)}
                                            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold focus:bg-white focus:border-sky-500 focus:outline-hidden"
                                        />
                                    </div>

                                    {/* Magnésio */}
                                    <div>
                                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">
                                            Magnésio Mg (ppm)
                                        </label>
                                        <input
                                            type="number"
                                            step="10"
                                            placeholder="Ex: 1350"
                                            value={testMagnesium}
                                            onChange={(e) => setTestMagnesium(e.target.value)}
                                            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold focus:bg-white focus:border-sky-500 focus:outline-hidden"
                                        />
                                    </div>

                                    {/* Silicato */}
                                    <div>
                                        <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">
                                            Silicato SiO₂ (ppm)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.05"
                                            placeholder="Ex: 0.1"
                                            value={testSilicate}
                                            onChange={(e) => setTestSilicate(e.target.value)}
                                            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold focus:bg-white focus:border-sky-500 focus:outline-hidden"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Diagnosis & Recommendations */}
                            <div className="pt-2 border-t border-slate-100">
                                <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                                    <Stethoscope className="h-3.5 w-3.5 text-emerald-600" />
                                    <span>Diagnóstico & Recomendações ({currentUser.name || 'Admin'}) (Opcional)</span>
                                </label>
                                <textarea
                                    rows={3}
                                    value={testDiagnosisNotes}
                                    onChange={(e) => setTestDiagnosisNotes(e.target.value)}
                                    placeholder="Ex: Nitrato elevado (20 ppm). Recomendada troca parcial de 20%, sifonagem do substrato e dosagem de bactérias. Retornar em 7 dias para novo teste."
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-sky-500 focus:outline-hidden font-medium resize-none"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setIsTestModalOpen(false)}
                                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={submittingTest}
                                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold disabled:opacity-50"
                                >
                                    {submittingTest ? 'Salvando...' : 'Salvar Medição'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Cadastrar / Editar Anotação Geral do Aquário */}
            {isNoteModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <div>
                                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                                    <BookOpen className="h-4 w-4 text-sky-600" />
                                    <span>
                                        {editingNote ? 'Editar Anotação do Caderno' : 'Nova Anotação no Caderno'}
                                    </span>
                                </h3>
                                <p className="text-[11px] text-slate-500">
                                    Aquário: {selectedAquarium?.name}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsNoteModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                            >
                                Fechar
                            </button>
                        </div>

                        <form onSubmit={handleSaveNote} className="space-y-4 text-xs">
                            <div>
                                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                    Data e Hora da Anotação *
                                </label>
                                <input
                                    type="datetime-local"
                                    required
                                    value={noteDate}
                                    onChange={(e) => setNoteDate(e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-sky-500 focus:outline-hidden font-mono font-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                    Título / Assunto (Opcional)
                                </label>
                                <input
                                    type="text"
                                    value={noteTitle}
                                    onChange={(e) => setNoteTitle(e.target.value)}
                                    placeholder="Ex: Troca de carvão ativado, Adição de Palhaço Picasso, Manutenção na bomba..."
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-sky-500 focus:outline-hidden font-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                    Conteúdo da Anotação / Observações Gerais *
                                </label>
                                <textarea
                                    rows={5}
                                    required
                                    value={noteContent}
                                    onChange={(e) => setNoteContent(e.target.value)}
                                    placeholder="Escreva livremente qualquer relato, manutenção realizada, orientações passadas ao cliente ou eventos no aquário..."
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-sky-500 focus:outline-hidden font-medium resize-none leading-relaxed"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setIsNoteModalOpen(false)}
                                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={submittingNote}
                                    className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold disabled:opacity-50"
                                >
                                    {submittingNote ? 'Salvando...' : 'Salvar Anotação'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Detalhes Completos do Pedido */}
            {selectedOrderDetails && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
                    <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-base text-slate-900">
                                        Pedido #{selectedOrderDetails.id}
                                    </h3>
                                    {selectedOrderDetails.status === 'PAID' && (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                            Pago
                                        </span>
                                    )}
                                    {selectedOrderDetails.status === 'PENDING' && (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300">
                                            <Clock className="h-3.5 w-3.5 text-amber-600" />
                                            Pendente de Pagamento
                                        </span>
                                    )}
                                    {selectedOrderDetails.status === 'CANCELED' && (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                                            <XCircle className="h-3.5 w-3.5" />
                                            Cancelado
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-slate-500">
                                    Realizado em{' '}
                                    {new Date(selectedOrderDetails.createdAt).toLocaleDateString('pt-BR', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}{' '}
                                    • Cliente: {customer.name}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setSelectedOrderDetails(null)}
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
                                    {selectedOrderDetails.items.map((item, index) => (
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
                                            R$ {Number(selectedOrderDetails.totalPrice || 0).toFixed(2)}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        {/* Status Alert Banner */}
                        {selectedOrderDetails.status === 'PENDING' && (
                            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
                                <div className="flex items-center gap-2 text-amber-800 text-xs font-bold">
                                    <Clock className="h-4 w-4 text-amber-600 shrink-0" />
                                    <span>Pagamento Pendente</span>
                                </div>
                                <p className="text-xs text-amber-700 leading-relaxed">
                                    O cliente reservou ou realizou este pedido e ele ainda não foi baixado como pago.
                                    Caso o cliente esteja na loja efetuando o pagamento agora, confirme abaixo para liquidar a venda.
                                </p>
                            </div>
                        )}

                        {selectedOrderDetails.status === 'PAID' && (
                            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800 font-medium">
                                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                                <span>Este pedido está totalmente pago e finalizado.</span>
                            </div>
                        )}

                        {/* Modal Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
                            <div>
                                {selectedOrderDetails.status === 'PENDING' && (
                                    <button
                                        type="button"
                                        disabled={cancelingOrderId === selectedOrderDetails.id}
                                        onClick={() => handleCancelCustomerOrder(selectedOrderDetails.id)}
                                        className="text-xs text-rose-600 hover:text-rose-700 hover:underline font-semibold cursor-pointer"
                                    >
                                        Cancelar este pedido
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                <button
                                    type="button"
                                    onClick={() => setSelectedOrderDetails(null)}
                                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-semibold cursor-pointer"
                                >
                                    Fechar
                                </button>

                                {selectedOrderDetails.status === 'PENDING' && (
                                    <button
                                        type="button"
                                        disabled={payingOrderId === selectedOrderDetails.id}
                                        onClick={() => handlePayCustomerOrder(selectedOrderDetails.id)}
                                        className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                                    >
                                        <CheckCircle2 className="h-4 w-4" />
                                        <span>
                                            {payingOrderId === selectedOrderDetails.id
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

export default CustomerDetail
