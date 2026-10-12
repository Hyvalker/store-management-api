import React, {useState, useEffect} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import {
    Fish,
    Lock,
    User as UserIcon,
    ArrowRight,
    Loader2,
    Eye,
    EyeOff,
    AlertCircle,
    ShieldCheck,
    Clock
} from 'lucide-react'
import {useAuth} from '../../contexts/AuthContext'
import {useToast} from '../../contexts/ToastContext'

function Login() {
    const {login, isAuthenticated} = useAuth()
    const {toast} = useToast()
    const navigate = useNavigate()
    const location = useLocation()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    // Detecta se veio de sessão expirada
    const searchParams = new URLSearchParams(location.search)
    const isExpired = searchParams.get('expired') === '1'

    // Destino após login bem-sucedido
    const fromPath = (location.state as {from?: {pathname: string}} | null)?.from?.pathname || '/'

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/', {replace: true})
        }
    }, [isAuthenticated, navigate])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const userTrim = username.trim()
        if (!userTrim) {
            setErrorMessage('Por favor, informe seu usuário de acesso.')
            return
        }
        if (!password) {
            setErrorMessage('Por favor, digite sua senha.')
            return
        }

        setIsSubmitting(true)
        setErrorMessage(null)

        try {
            await login({
                username: userTrim,
                password
            })
            toast.success(`Bem-vindo ao sistema da Bamba Aqua!`, 'Login Efetuado')
            navigate(fromPath, {replace: true})
        } catch (err: unknown) {
            console.error('Falha na autenticação:', err)
            let msg = 'Não foi possível efetuar o login. Verifique seus dados.'
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosErr = err as {response?: {data?: {error?: string}; status?: number}}
                if (axiosErr.response?.data?.error) {
                    msg = axiosErr.response.data.error
                } else if (axiosErr.response?.status === 401) {
                    msg = 'Usuário ou senha incorretos.'
                } else if (axiosErr.response?.status === 0 || !axiosErr.response) {
                    msg = 'Não foi possível conectar ao servidor. Verifique se o backend está em execução.'
                }
            }
            setErrorMessage(msg)
        } finally {
            setIsSubmitting(false)
        }
    }

    function fillDemoCredentials(u: string, p: string) {
        setUsername(u)
        setPassword(p)
        setErrorMessage(null)
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-sky-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                {/* Brand Logo & Header */}
                <div className="text-center mb-8 space-y-2">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-xl shadow-sky-600/30 border border-sky-400/30 mb-2">
                        <Fish className="h-8 w-8" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                        Bamba Aqua
                    </h1>
                    <p className="text-xs text-sky-200/80 font-medium">
                        Sistema Integrado de Gestão & Balcão de Vendas
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 space-y-6">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">
                            Acessar o Sistema
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Digite suas credenciais de operador para entrar.
                        </p>
                    </div>

                    {/* Expiration Notice */}
                    {isExpired && (
                        <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl flex items-center gap-2.5 text-xs text-amber-800">
                            <Clock className="h-4 w-4 shrink-0 text-amber-600" />
                            <span>Sua sessão expirou por inatividade. Faça login novamente para continuar.</span>
                        </div>
                    )}

                    {/* Error Notice */}
                    {errorMessage && (
                        <div className="p-3 bg-rose-50 border border-rose-200/80 rounded-xl flex items-start gap-2.5 text-xs text-rose-800 animate-in fade-in">
                            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
                            <div className="leading-relaxed">
                                <span className="font-semibold">Erro ao entrar: </span>
                                {errorMessage}
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Username Field */}
                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-slate-700">
                                Usuário / Login
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <UserIcon className="h-4 w-4" />
                                </div>
                                <input
                                    type="text"
                                    autoFocus
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Ex: admin ou operador"
                                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sky-500 focus:outline-hidden focus:ring-3 focus:ring-sky-500/15 transition-all"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label className="block text-xs font-semibold text-slate-700">
                                    Senha
                                </label>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <Lock className="h-4 w-4" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Digite sua senha"
                                    className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sky-500 focus:outline-hidden focus:ring-3 focus:ring-sky-500/15 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                                    title={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-bold shadow-md shadow-sky-600/20 hover:shadow-sky-600/30 transition-all cursor-pointer disabled:opacity-60"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>Entrando...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Entrar no Sistema</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Quick Access Credentials Pill (Apenas em ambiente de desenvolvimento) */}
                    {import.meta.env.DEV && (
                        <div className="pt-3 border-t border-slate-100">
                            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 mb-2">
                                <ShieldCheck className="h-3.5 w-3.5 text-sky-600" />
                                <span>Ambiente Dev: Credenciais Padrão (Oculto em Produção)</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[11px]">
                                <button
                                    type="button"
                                    onClick={() => fillDemoCredentials('admin', 'admin123')}
                                    className="p-2 rounded-xl bg-slate-50 hover:bg-sky-50 hover:border-sky-200 border border-slate-200 text-left transition-colors cursor-pointer"
                                >
                                    <span className="block font-bold text-slate-800">Admin</span>
                                    <span className="text-[10px] text-slate-600 block">admin / admin123</span>
                                    <span className="text-[9px] text-emerald-800 font-bold block mt-0.5">Acesso Completo</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => fillDemoCredentials('operador', 'operador123')}
                                    className="p-2 rounded-xl bg-slate-50 hover:bg-sky-50 hover:border-sky-200 border border-slate-200 text-left transition-colors cursor-pointer"
                                >
                                    <span className="block font-bold text-slate-800">Operador</span>
                                    <span className="text-[10px] text-slate-600 block">operador / operador123</span>
                                    <span className="text-[9px] text-sky-800 font-bold block mt-0.5">Caixa & Balcão</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Security Badge */}
                <div className="text-center mt-6 text-xs text-sky-200/60 flex items-center justify-center gap-1.5">
                    <Lock className="h-3.5 w-3.5" />
                    <span>Autenticação protegida por JWT & Spring Security</span>
                </div>
            </div>
        </div>
    )
}

export default Login
