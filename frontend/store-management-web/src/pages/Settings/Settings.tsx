import {useState, useEffect, useCallback} from 'react'
import type {SubmitEvent} from 'react'
import {
    Sliders,
    CheckCircle2,
    Save,
    CreditCard,
    Banknote,
    Zap,
    RotateCcw,
    AlertTriangle,
    Package,
    Shield,
    Users,
    UserPlus,
    KeyRound,
    UserCheck,
    UserX,
    Lock,
    Eye,
    EyeOff,
    Loader2
} from 'lucide-react'
import {
    getPaymentDiscounts,
    fetchPaymentDiscounts,
    savePaymentDiscounts,
    getStockAlertSettings,
    fetchStockAlertSettings,
    saveStockAlertSettings,
    type PaymentDiscountSettings,
    type StockAlertSettings
} from '../../services/settingsService'
import {
    getOperators,
    createOperator,
    resetOperatorPassword,
    deactivateOperator,
    changeOwnPassword
} from '../../services/authService'
import {useAuth} from '../../contexts/AuthContext'
import {useToast} from '../../contexts/ToastContext'
import type {Operator, OperatorRole} from '../../types/auth'
import {WaterParametersSettingsCard} from '../../components/settings/WaterParametersSettingsCard'

function Settings() {
    const {toast} = useToast()
    const {operator: currentOperator, isAdmin} = useAuth()

    const [discounts, setDiscounts] = useState<PaymentDiscountSettings>({
        pix: 10,
        money: 5,
        debit: 0,
        credit: 0,
    })

    const [stockAlerts, setStockAlerts] = useState<StockAlertSettings>({
        criticalStockThreshold: 2,
        lowStockThreshold: 5,
    })

    const [savedSuccess, setSavedSuccess] = useState(false)

    // ===================== Gestão de Senha Pessoal =====================
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [savingPassword, setSavingPassword] = useState(false)

    // ===================== Gestão de Operadores (ADMIN) =====================
    const [operatorsList, setOperatorsList] = useState<Operator[]>([])
    const [loadingOperators, setLoadingOperators] = useState(false)
    const [showNewOperatorModal, setShowNewOperatorModal] = useState(false)
    const [newOpName, setNewOpName] = useState('')
    const [newOpUsername, setNewOpUsername] = useState('')
    const [newOpPassword, setNewOpPassword] = useState('')
    const [newOpRole, setNewOpRole] = useState<OperatorRole>('OPERATOR')
    const [savingNewOp, setSavingNewOp] = useState(false)

    // Redefinição de senha de outro operador
    const [resettingOp, setResettingOp] = useState<Operator | null>(null)
    const [resetNewPassword, setResetNewPassword] = useState('')
    const [savingReset, setSavingReset] = useState(false)

    const loadOperators = useCallback(async () => {
        if (!isAdmin) return
        setLoadingOperators(true)
        try {
            const data = await getOperators()
            setOperatorsList(data)
        } catch {
            toast.error('Não foi possível carregar a lista de operadores.', 'Erro')
        } finally {
            setLoadingOperators(false)
        }
    }, [isAdmin, toast])

    useEffect(() => {
        setDiscounts(getPaymentDiscounts())
        setStockAlerts(getStockAlertSettings())

        fetchPaymentDiscounts().then(setDiscounts)
        fetchStockAlertSettings().then(setStockAlerts)

        if (isAdmin) {
            loadOperators()
        }
    }, [isAdmin, loadOperators])

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        await savePaymentDiscounts(discounts)
        setSavedSuccess(true)
        toast.success('Regras de desconto por forma de pagamento salvas e sincronizadas!', 'Configuração Salva')
        setTimeout(() => setSavedSuccess(false), 4000)
    }

    async function handleSaveStockAlerts() {
        const crit = Math.max(1, Number(stockAlerts.criticalStockThreshold || 2))
        const low = Math.max(crit + 1, Number(stockAlerts.lowStockThreshold || 5))
        const validated: StockAlertSettings = {
            criticalStockThreshold: crit,
            lowStockThreshold: low,
        }
        setStockAlerts(validated)
        await saveStockAlertSettings(validated)
        setSavedSuccess(true)
        toast.success(
            `Parâmetros de estoque salvos (Crítico: ≤ ${crit} un. | Baixo: ≤ ${low} un.)! Sincronizados com o servidor.`,
            'Alertas de Estoque Salvos'
        )
        setTimeout(() => setSavedSuccess(false), 4000)
    }

    async function handleResetDefaults() {
        const defaults: PaymentDiscountSettings = {
            pix: 10,
            money: 5,
            debit: 0,
            credit: 0,
        }
        const defaultStockAlerts: StockAlertSettings = {
            criticalStockThreshold: 2,
            lowStockThreshold: 5,
        }
        setDiscounts(defaults)
        setStockAlerts(defaultStockAlerts)
        await savePaymentDiscounts(defaults)
        await saveStockAlertSettings(defaultStockAlerts)
        setSavedSuccess(true)
        toast.info('Padrões de descontos e alertas de estoque restaurados e sincronizados.', 'Padrões Restaurados')
        setTimeout(() => setSavedSuccess(false), 4000)
    }

    async function handleChangeMyPassword(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (newPassword.length < 6) {
            toast.warning('A nova senha deve ter no mínimo 6 caracteres.', 'Senha Curta')
            return
        }
        if (newPassword !== confirmPassword) {
            toast.error('A confirmação da senha não coincide com a nova senha.', 'Senhas Diferentes')
            return
        }

        setSavingPassword(true)
        try {
            await changeOwnPassword(currentPassword, newPassword)
            toast.success('Sua senha foi alterada com sucesso!', 'Senha Atualizada')
            setCurrentPassword('')
            setNewPassword('')
            setConfirmPassword('')
        } catch (err: unknown) {
            let msg = 'Erro ao alterar a senha. Verifique a senha atual.'
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosErr = err as {response?: {data?: {error?: string}}}
                if (axiosErr.response?.data?.error) {
                    msg = axiosErr.response.data.error
                }
            }
            toast.error(msg, 'Erro ao Alterar Senha')
        } finally {
            setSavingPassword(false)
        }
    }

    async function handleCreateOperator(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const userTrim = newOpUsername.trim().toLowerCase()
        if (!newOpName.trim() || !userTrim || !newOpPassword) {
            toast.warning('Preencha todos os campos do operador.', 'Campos Obrigatórios')
            return
        }
        if (newOpPassword.length < 6) {
            toast.warning('A senha inicial deve ter pelo menos 6 caracteres.', 'Senha Curta')
            return
        }

        setSavingNewOp(true)
        try {
            const created = await createOperator({
                name: newOpName.trim(),
                username: userTrim,
                password: newOpPassword,
                role: newOpRole
            })
            toast.success(`Operador "${created.name}" (@${created.username}) cadastrado com sucesso!`, 'Operador Criado')
            setShowNewOperatorModal(false)
            setNewOpName('')
            setNewOpUsername('')
            setNewOpPassword('')
            setNewOpRole('OPERATOR')
            loadOperators()
        } catch (err: unknown) {
            let msg = 'Não foi possível cadastrar o operador.'
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosErr = err as {response?: {data?: {error?: string}}}
                if (axiosErr.response?.data?.error) {
                    msg = axiosErr.response.data.error
                }
            }
            toast.error(msg, 'Erro no Cadastro')
        } finally {
            setSavingNewOp(false)
        }
    }

    async function handleDeactivateOperator(op: Operator) {
        if (op.id === currentOperator?.id) {
            toast.warning('Você não pode desativar o seu próprio usuário logado.', 'Ação Bloqueada')
            return
        }
        if (!window.confirm(`Deseja realmente desativar o operador "${op.name}" (@${op.username})? Ele perderá acesso ao sistema imediatamente.`)) {
            return
        }

        try {
            await deactivateOperator(op.id)
            toast.info(`Operador "${op.name}" foi desativado.`, 'Operador Desativado')
            loadOperators()
        } catch (err: unknown) {
            let msg = 'Não foi possível desativar o operador.'
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosErr = err as {response?: {data?: {error?: string}}}
                if (axiosErr.response?.data?.error) {
                    msg = axiosErr.response.data.error
                }
            }
            toast.error(msg, 'Erro')
        }
    }

    async function handleConfirmResetPassword(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!resettingOp) return
        if (resetNewPassword.length < 6) {
            toast.warning('A nova senha deve ter no mínimo 6 caracteres.', 'Senha Curta')
            return
        }

        setSavingReset(true)
        try {
            await resetOperatorPassword(resettingOp.id, resetNewPassword)
            toast.success(`Senha de "${resettingOp.name}" redefinida com sucesso!`, 'Senha Redefinida')
            setResettingOp(null)
            setResetNewPassword('')
        } catch {
            toast.error('Não foi possível redefinir a senha do operador.', 'Erro')
        } finally {
            setSavingReset(false)
        }
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Configurações da Loja & Segurança
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Gerencie as regras comerciais, alertas de estoque e controle de operadores da Bamba Aqua.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleResetDefaults}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl transition-all shadow-xs cursor-pointer"
                >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Restaurar Padrões Comerciais</span>
                </button>
            </div>

            {savedSuccess && (
                <div className="flex items-center gap-2 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium animate-in fade-in">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                    <span>Configurações salvas com sucesso! Já estão valendo em todo o sistema.</span>
                </div>
            )}

            {/* Discount Configuration Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <div className="h-10 w-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                        <Sliders className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-slate-900">
                            Descontos por Forma de Pagamento
                        </h2>
                        <p className="text-xs text-slate-500">
                            Defina a porcentagem de desconto para cada método. Aplicado automaticamente no Caixa e no Catálogo de Ofertas.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* PIX */}
                        <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-200/80 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-teal-900 flex items-center gap-1.5">
                                    <Zap className="h-4 w-4 text-teal-600" />
                                    PIX
                                </span>
                                <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded-full">
                                    Mais Vantajoso
                                </span>
                            </div>
                            <div className="flex items-center gap-2 pt-1">
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.5"
                                    value={discounts.pix}
                                    onChange={(e) => setDiscounts({...discounts, pix: Number(e.target.value)})}
                                    className="w-full px-3 py-2 bg-white border border-teal-300 rounded-lg text-sm font-bold text-teal-900 focus:outline-hidden focus:ring-2 focus:ring-teal-200"
                                />
                                <span className="text-xs font-bold text-teal-800">%</span>
                            </div>
                        </div>

                        {/* Dinheiro */}
                        <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                                    <Banknote className="h-4 w-4 text-emerald-600" />
                                    Dinheiro Espécie
                                </span>
                            </div>
                            <div className="flex items-center gap-2 pt-1">
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.5"
                                    value={discounts.money}
                                    onChange={(e) => setDiscounts({...discounts, money: Number(e.target.value)})}
                                    className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-lg text-sm font-bold text-emerald-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-200"
                                />
                                <span className="text-xs font-bold text-emerald-800">%</span>
                            </div>
                        </div>

                        {/* Débito */}
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                    <CreditCard className="h-4 w-4 text-slate-500" />
                                    Cartão Débito
                                </span>
                            </div>
                            <div className="flex items-center gap-2 pt-1">
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.5"
                                    value={discounts.debit}
                                    onChange={(e) => setDiscounts({...discounts, debit: Number(e.target.value)})}
                                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-200"
                                />
                                <span className="text-xs font-bold text-slate-700">%</span>
                            </div>
                        </div>

                        {/* Crédito */}
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                    <CreditCard className="h-4 w-4 text-slate-500" />
                                    Cartão Crédito
                                </span>
                            </div>
                            <div className="flex items-center gap-2 pt-1">
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.5"
                                    value={discounts.credit}
                                    onChange={(e) => setDiscounts({...discounts, credit: Number(e.target.value)})}
                                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-200"
                                />
                                <span className="text-xs font-bold text-slate-700">%</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-3 border-t border-slate-100">
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                        >
                            <Save className="h-4 w-4" />
                            <span>Salvar Configurações de Desconto</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Stock Alerts Thresholds Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <div className="h-10 w-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                        <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-slate-900">
                            Parâmetros de Alerta de Estoque
                        </h2>
                        <p className="text-xs text-slate-500">
                            Defina os limites de unidades para que os itens sejam classificados como Estoque Crítico ou Estoque Baixo no Dashboard.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Critical */}
                    <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200/80 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                                <AlertTriangle className="h-4 w-4 text-rose-600" />
                                Nível Crítico (Urgente)
                            </span>
                            <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full">
                                Alerta Vermelho
                            </span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                            Itens com estoque entre 1 e este valor são marcados com <strong>prioridade máxima de reposição</strong>.
                        </p>
                        <div className="flex items-center gap-3 pt-1">
                            <label className="text-xs font-semibold text-slate-700 whitespace-nowrap">
                                Limite (≤ un.):
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="50"
                                value={stockAlerts.criticalStockThreshold}
                                onChange={(e) =>
                                    setStockAlerts({
                                        ...stockAlerts,
                                        criticalStockThreshold: Math.max(1, Number(e.target.value))
                                    })
                                }
                                className="w-24 px-3 py-1.5 bg-white border border-rose-300 rounded-lg text-sm font-bold text-rose-900 focus:outline-hidden focus:ring-2 focus:ring-rose-200"
                            />
                            <span className="text-xs text-slate-500 font-medium">unidades</span>
                        </div>
                    </div>

                    {/* Low */}
                    <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                                <Package className="h-4 w-4 text-amber-600" />
                                Estoque Baixo (Atenção)
                            </span>
                            <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                                Alerta Amarelo
                            </span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                            Itens com estoque acima do nível crítico, mas menor ou igual a este valor entram em <strong>atenção de reposição</strong>.
                        </p>
                        <div className="flex items-center gap-3 pt-1">
                            <label className="text-xs font-semibold text-slate-700 whitespace-nowrap">
                                Limite (≤ un.):
                            </label>
                            <input
                                type="number"
                                min={stockAlerts.criticalStockThreshold + 1}
                                max="100"
                                value={stockAlerts.lowStockThreshold}
                                onChange={(e) =>
                                    setStockAlerts({
                                        ...stockAlerts,
                                        lowStockThreshold: Math.max(stockAlerts.criticalStockThreshold + 1, Number(e.target.value))
                                    })
                                }
                                className="w-24 px-3 py-1.5 bg-white border border-amber-300 rounded-lg text-sm font-bold text-amber-900 focus:outline-hidden focus:ring-2 focus:ring-amber-200"
                            />
                            <span className="text-xs text-slate-500 font-medium">unidades</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <button
                        type="button"
                        onClick={handleSaveStockAlerts}
                        className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                    >
                        <Save className="h-3.5 w-3.5" />
                        <span>Salvar Limites de Estoque</span>
                    </button>
                </div>
            </div>

            {/* Water Parameters Alerts & Thresholds Card */}
            <WaterParametersSettingsCard />

            {/* Change My Password Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <div className="h-10 w-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                        <KeyRound className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-slate-900">
                            Alterar Minha Senha de Acesso
                        </h2>
                        <p className="text-xs text-slate-500">
                            Atualize a sua senha pessoal de operador ({currentOperator?.name} - @{currentOperator?.username}).
                        </p>
                    </div>
                </div>

                <form onSubmit={handleChangeMyPassword} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Senha Atual
                            </label>
                            <input
                                type={showPass ? 'text' : 'password'}
                                required
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Digite sua senha atual"
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-violet-500 focus:outline-hidden"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Nova Senha (mín. 6 dígitos)
                            </label>
                            <input
                                type={showPass ? 'text' : 'password'}
                                required
                                minLength={6}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Nova senha segura"
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-violet-500 focus:outline-hidden"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Confirmar Nova Senha
                            </label>
                            <input
                                type={showPass ? 'text' : 'password'}
                                required
                                minLength={6}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Repita a nova senha"
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-violet-500 focus:outline-hidden"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                        <button
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
                        >
                            {showPass ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                            <span>{showPass ? 'Ocultar senhas' : 'Exibir senhas digitadas'}</span>
                        </button>

                        <button
                            type="submit"
                            disabled={savingPassword}
                            className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer disabled:opacity-60"
                        >
                            {savingPassword ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="h-4 w-4" />
                            )}
                            <span>Salvar Nova Senha</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Operator Management Card (ADMIN ONLY) */}
            {isAdmin && (
                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                                <Users className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                                    <span>Gestão de Operadores do Sistema</span>
                                    <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded-full">
                                        Administração
                                    </span>
                                </h2>
                                <p className="text-xs text-slate-500">
                                    Controle quem tem acesso à loja, defina funções (ADMIN ou OPERADOR) e redefina senhas.
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowNewOperatorModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                        >
                            <UserPlus className="h-4 w-4" />
                            <span>Novo Operador</span>
                        </button>
                    </div>

                    {/* Operators List Table */}
                    {loadingOperators ? (
                        <div className="py-8 flex flex-col items-center justify-center gap-2 text-slate-400">
                            <Loader2 className="h-6 w-6 animate-spin text-sky-600" />
                            <p className="text-xs">Carregando operadores...</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead>
                                    <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                                        <th className="py-2.5 px-3">Operador</th>
                                        <th className="py-2.5 px-3">Login / Usuário</th>
                                        <th className="py-2.5 px-3">Função / Papel</th>
                                        <th className="py-2.5 px-3">Status</th>
                                        <th className="py-2.5 px-3">Último Acesso</th>
                                        <th className="py-2.5 px-3 text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {operatorsList.map((op) => {
                                        const isMe = op.id === currentOperator?.id
                                        return (
                                            <tr key={op.id} className="hover:bg-slate-50/60 transition-colors">
                                                <td className="py-3 px-3">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="h-7 w-7 rounded-lg bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-xs">
                                                            {op.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <span className="font-bold text-slate-900 block">
                                                                {op.name}
                                                            </span>
                                                            {isMe && (
                                                                <span className="text-[10px] text-sky-600 font-semibold block leading-none">
                                                                    (Você)
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-3 font-mono font-medium text-slate-700">
                                                    @{op.username}
                                                </td>
                                                <td className="py-3 px-3">
                                                    {op.role === 'ADMIN' ? (
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                                                            <Shield className="h-3 w-3 text-emerald-600" />
                                                            <span>ADMINISTRADOR</span>
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-semibold">
                                                            <span>OPERADOR BALCÃO</span>
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-3 px-3">
                                                    {op.active ? (
                                                        <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                                                            <UserCheck className="h-3.5 w-3.5 text-emerald-600" />
                                                            <span>Ativo</span>
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 text-rose-600 font-semibold text-[11px]">
                                                            <UserX className="h-3.5 w-3.5 text-rose-500" />
                                                            <span>Desativado</span>
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-3 px-3 text-slate-500 text-[11px]">
                                                    {op.lastLoginAt
                                                        ? new Date(op.lastLoginAt).toLocaleString('pt-BR', {
                                                              day: '2-digit',
                                                              month: '2-digit',
                                                              year: '2-digit',
                                                              hour: '2-digit',
                                                              minute: '2-digit'
                                                          })
                                                        : 'Nunca logou'}
                                                </td>
                                                <td className="py-3 px-3 text-right">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <button
                                                            type="button"
                                                            onClick={() => setResettingOp(op)}
                                                            className="p-1.5 text-slate-500 hover:text-sky-700 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                                                            title="Redefinir senha deste operador"
                                                        >
                                                            <Lock className="h-3.5 w-3.5" />
                                                        </button>

                                                        {op.active && !isMe && (
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDeactivateOperator(op)}
                                                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                                                title="Desativar operador"
                                                            >
                                                                <UserX className="h-3.5 w-3.5" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {/* Modal: Novo Operador */}
            {showNewOperatorModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in">
                    <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <div className="flex items-center gap-2.5">
                                <div className="h-9 w-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                                    <UserPlus className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900">
                                        Cadastrar Novo Operador
                                    </h3>
                                    <p className="text-[11px] text-slate-500">
                                        Crie um login para um funcionário ou sócio.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleCreateOperator} className="space-y-4 text-xs">
                            <div>
                                <label className="block font-semibold text-slate-700 mb-1">
                                    Nome Completo
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={newOpName}
                                    onChange={(e) => setNewOpName(e.target.value)}
                                    placeholder="Ex: Carlos Eduardo"
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-semibold text-slate-700 mb-1">
                                        Login / Usuário
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={newOpUsername}
                                        onChange={(e) => setNewOpUsername(e.target.value)}
                                        placeholder="ex: carlos"
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold text-slate-700 mb-1">
                                        Função / Papel
                                    </label>
                                    <select
                                        value={newOpRole}
                                        onChange={(e) => setNewOpRole(e.target.value as OperatorRole)}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                                    >
                                        <option value="OPERATOR">Operador Balcão</option>
                                        <option value="ADMIN">Administrador</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block font-semibold text-slate-700 mb-1">
                                    Senha Inicial (mín. 6 dígitos)
                                </label>
                                <input
                                    type="password"
                                    required
                                    minLength={6}
                                    value={newOpPassword}
                                    onChange={(e) => setNewOpPassword(e.target.value)}
                                    placeholder="Digite a senha provisória"
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-hidden"
                                />
                                <p className="text-[10px] text-slate-400 mt-1">
                                    O operador poderá alterar esta senha depois pelo perfil dele.
                                </p>
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setShowNewOperatorModal(false)}
                                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold cursor-pointer"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={savingNewOp}
                                    className="flex items-center gap-1.5 px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold transition-all shadow-xs cursor-pointer disabled:opacity-60"
                                >
                                    {savingNewOp && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                                    <span>Criar Operador</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Redefinir Senha de Operador */}
            {resettingOp && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in">
                    <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
                        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                            <div className="h-8 w-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                <KeyRound className="h-4 w-4" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-900">
                                    Redefinir Senha
                                </h3>
                                <p className="text-[11px] text-slate-500">
                                    Operador: {resettingOp.name} (@{resettingOp.username})
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleConfirmResetPassword} className="space-y-4 text-xs">
                            <div>
                                <label className="block font-semibold text-slate-700 mb-1">
                                    Nova Senha (mín. 6 dígitos)
                                </label>
                                <input
                                    type="password"
                                    autoFocus
                                    required
                                    minLength={6}
                                    value={resetNewPassword}
                                    onChange={(e) => setResetNewPassword(e.target.value)}
                                    placeholder="Digite a nova senha"
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-hidden"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setResettingOp(null)
                                        setResetNewPassword('')
                                    }}
                                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold cursor-pointer"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={savingReset}
                                    className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold transition-all shadow-xs cursor-pointer disabled:opacity-60"
                                >
                                    {savingReset && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                                    <span>Salvar Nova Senha</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Settings
