import {useEffect, useState, useCallback} from 'react'
import type {SubmitEvent} from 'react'
import {Link} from 'react-router-dom'
import {
    Users,
    UserPlus,
    Search,
    Mail,
    Phone,
    MapPin,
    Edit2,
    Trash2,
    CheckCircle2,
    AlertCircle,
    X,
    RefreshCw,
    Fish
} from 'lucide-react'
import {
    getUsers,
    createUser,
    updateUser,
    deleteUser
} from '../../services/userService'
import type {User, CreateUserRequest} from '../../types/user'
import {matchesSearch} from '../../utils/searchUtils'
import {useToast} from '../../contexts/ToastContext'

function Customers() {
    const {toast} = useToast()
    const [customers, setCustomers] = useState<User[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Modal state for Create / Edit
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingCustomer, setEditingCustomer] = useState<User | null>(null)

    // Form inputs
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')

    const [formLoading, setFormLoading] = useState(false)
    const [formError, setFormError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const loadCustomers = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await getUsers()
            setCustomers(data)
        } catch {
            setError('Não foi possível carregar a lista de clientes.')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadCustomers()
    }, [loadCustomers])

    // Filter customers by search term with smart accent and hyphen normalization
    const filteredCustomers = customers.filter((c) => {
        if (!searchTerm.trim()) return true
        return (
            matchesSearch(c.name, searchTerm) ||
            matchesSearch(c.email, searchTerm) ||
            matchesSearch(c.phoneNumber || '', searchTerm) ||
            matchesSearch(c.address || '', searchTerm)
        )
    })

    // Open Modal for New Customer
    function handleOpenNewModal() {
        setEditingCustomer(null)
        setName('')
        setEmail('')
        setPhoneNumber('')
        setAddress('')
        setFormError(null)
        setIsModalOpen(true)
    }

    // Open Modal for Editing Customer
    function handleOpenEditModal(customer: User) {
        setEditingCustomer(customer)
        setName(customer.name)
        setEmail(customer.email)
        setPhoneNumber(customer.phoneNumber || '')
        setAddress(customer.address || '')
        setFormError(null)
        setIsModalOpen(true)
    }

    // Handle Delete / Deactivate Customer
    async function handleDelete(customer: User) {
        const confirmed = window.confirm(
            `Deseja realmente desativar o cliente "${customer.name}"?`
        )
        if (!confirmed) return

        try {
            await deleteUser(customer.id)
            const msg = `Cliente "${customer.name}" desativado com sucesso.`
            setSuccessMessage(msg)
            toast.info(msg, 'Cliente Desativado')
            loadCustomers()
        } catch {
            toast.error('Não foi possível desativar o cliente.', 'Erro ao Desativar')
        }
    }

    // Handle Form Submit (Create or Update)
    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!name.trim() || !email.trim()) {
            setFormError('Nome e E-mail são obrigatórios.')
            return
        }

        setFormLoading(true)
        setFormError(null)

        const payload: CreateUserRequest = {
            name: name.trim(),
            email: email.trim(),
            phoneNumber: phoneNumber.trim() || null,
            address: address.trim() || null,
        }

        try {
            if (editingCustomer) {
                await updateUser(editingCustomer.id, payload)
                const msg = `Cliente "${payload.name}" atualizado com sucesso!`
                setSuccessMessage(msg)
                toast.success(msg, 'Cliente Atualizado')
            } else {
                await createUser(payload)
                const msg = `Cliente "${payload.name}" cadastrado com sucesso!`
                setSuccessMessage(msg)
                toast.success(msg, 'Novo Cliente')
            }

            setIsModalOpen(false)
            loadCustomers()
        } catch {
            const errText = 'Erro ao salvar cliente. Verifique se o e-mail já não está cadastrado.'
            setFormError(errText)
            toast.error(errText, 'Erro no Formulário')
        } finally {
            setFormLoading(false)
        }
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Clientes & Aquaristas
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Gerencie a base de clientes, contatos e histórico de atendimento da Bamba Aqua.
                    </p>
                </div>

                <div className="flex items-center gap-2.5">
                    <button
                        type="button"
                        onClick={loadCustomers}
                        className="p-2.5 text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-xl transition-all shadow-xs"
                        title="Atualizar lista"
                    >
                        <RefreshCw className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={handleOpenNewModal}
                        className="flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                    >
                        <UserPlus className="h-4 w-4" />
                        <span>Novo Cliente</span>
                    </button>
                </div>
            </div>

            {/* Success notification */}
            {successMessage && (
                <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium animate-in fade-in">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                        <span>{successMessage}</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setSuccessMessage(null)}
                        className="text-emerald-700 hover:text-emerald-900 text-sm font-bold"
                    >
                        ✕
                    </button>
                </div>
            )}

            {/* Search and Filters Bar */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar por nome, e-mail, telefone ou endereço..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-100 transition-all placeholder:text-slate-400"
                    />
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-slate-800">{filteredCustomers.length}</span>
                    <span>de {customers.length} clientes encontrados</span>
                </div>
            </div>

            {/* Customers Table / Grid */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                {error && (
                    <div className="p-4 bg-rose-50 text-rose-700 text-xs text-center border-b border-rose-100">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="py-16 text-center text-xs text-slate-400">
                        Carregando lista de clientes...
                    </div>
                ) : filteredCustomers.length === 0 ? (
                    <div className="py-16 text-center text-xs text-slate-400">
                        {customers.length === 0
                            ? 'Nenhum cliente cadastrado ainda. Clique em "+ Novo Cliente" para começar.'
                            : `Nenhum cliente corresponde à busca "${searchTerm}".`}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-slate-600">
                            <thead className="bg-slate-50 uppercase tracking-wider text-slate-500 border-b border-slate-200/80">
                                <tr>
                                    <th className="py-3.5 px-5 font-semibold">Cliente</th>
                                    <th className="py-3.5 px-5 font-semibold">Contato</th>
                                    <th className="py-3.5 px-5 font-semibold">Endereço</th>
                                    <th className="py-3.5 px-4 font-semibold text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredCustomers.map((customer) => {
                                    // Initials for avatar
                                    const initials = customer.name
                                        .split(' ')
                                        .filter(Boolean)
                                        .slice(0, 2)
                                        .map((n) => n[0])
                                        .join('')
                                        .toUpperCase()

                                    return (
                                        <tr key={customer.id} className="hover:bg-slate-50/70 transition-colors">
                                            {/* Name & Avatar */}
                                            <td className="py-3.5 px-5">
                                                <Link
                                                    to={`/customers/${customer.id}`}
                                                    className="flex items-center gap-3 group"
                                                >
                                                    <div className="h-9 w-9 rounded-xl bg-sky-100 group-hover:bg-sky-200 text-sky-800 flex items-center justify-center font-bold text-xs shrink-0 transition-colors">
                                                        {initials || 'C'}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900 group-hover:text-sky-700 text-sm transition-colors">
                                                            {customer.name}
                                                        </p>
                                                        <p className="text-[11px] text-slate-400">
                                                            ID #{customer.id} • Clique para ver aquários
                                                        </p>
                                                    </div>
                                                </Link>
                                            </td>

                                            {/* Contact */}
                                            <td className="py-3.5 px-5 space-y-1">
                                                <div className="flex items-center gap-1.5 text-slate-700">
                                                    <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                                                    <span>{customer.email}</span>
                                                </div>
                                                {customer.phoneNumber && (
                                                    <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
                                                        <Phone className="h-3 w-3 text-slate-400 shrink-0" />
                                                        <span>{customer.phoneNumber}</span>
                                                    </div>
                                                )}
                                            </td>

                                            {/* Address */}
                                            <td className="py-3.5 px-5 max-w-xs">
                                                {customer.address ? (
                                                    <div className="flex items-start gap-1.5 text-slate-600 text-[11px]">
                                                        <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                                                        <span className="truncate">{customer.address}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-slate-400 text-[11px] italic">
                                                        Não informado
                                                    </span>
                                                )}
                                            </td>

                                            {/* Action Buttons */}
                                            <td className="py-3.5 px-4 text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <Link
                                                        to={`/customers/${customer.id}`}
                                                        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200/80 rounded-xl transition-all shadow-2xs mr-1"
                                                        title="Abrir caderno de aquários e parâmetros deste cliente"
                                                    >
                                                        <Fish className="h-3.5 w-3.5 text-sky-600" />
                                                        <span>Aquários & Parâmetros</span>
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleOpenEditModal(customer)}
                                                        className="p-1.5 text-slate-500 hover:text-sky-700 hover:bg-sky-50 rounded-lg transition-colors"
                                                        title="Editar cliente"
                                                    >
                                                        <Edit2 className="h-3.5 w-3.5" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(customer)}
                                                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                                        title="Desativar cliente"
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </button>
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

            {/* Modal: New / Edit Customer */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 border border-slate-200">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-2.5">
                                <div className="h-8 w-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                                    <Users className="h-4 w-4" />
                                </div>
                                <h3 className="text-base font-bold text-slate-900">
                                    {editingCustomer ? 'Editar Cliente' : 'Novo Cliente'}
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {formError && (
                            <div className="flex items-center gap-2 p-3 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs font-medium">
                                <AlertCircle className="h-4 w-4 shrink-0" />
                                <span>{formError}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Nome Completo <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Ex: Carlos Silva"
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-100 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    E-mail <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="carlos.silva@email.com"
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-100 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Telefone / WhatsApp (Opcional)
                                </label>
                                <input
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="(21) 99999-9999"
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-100 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Endereço Completo (Opcional)
                                </label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Rua das Acácias, 123 - Bairro, Cidade - RJ"
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-100 transition-all"
                                />
                            </div>

                            <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={formLoading}
                                    className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm disabled:opacity-50"
                                >
                                    {formLoading
                                        ? 'Salvando...'
                                        : editingCustomer
                                        ? 'Salvar Alterações'
                                        : 'Cadastrar Cliente'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Customers