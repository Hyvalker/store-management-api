import {Waves, CircleDot, LogOut, Shield, User as UserIcon} from 'lucide-react'
import {useAuth} from '../../contexts/AuthContext'
import {useToast} from '../../contexts/ToastContext'

function Header() {
    const {operator, isAdmin, logout} = useAuth()
    const {toast} = useToast()

    function handleLogout() {
        if (window.confirm('Deseja realmente encerrar a sessão?')) {
            logout()
            toast.info('Sessão encerrada com sucesso.', 'Até logo!')
        }
    }

    return (
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-slate-800">
                    <Waves className="h-5 w-5 text-sky-600" />
                    <span className="text-sm font-semibold text-slate-800">
                        Bamba Aqua
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="text-xs text-slate-600 hidden sm:inline">
                        Aquarismo Marinho & Água Doce
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {/* System Status Indicator */}
                <div className="hidden md:flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800 border border-emerald-200/60">
                    <CircleDot className="h-3 w-3 text-emerald-700 animate-pulse" />
                    <span>Sistema Operacional</span>
                </div>

                {/* Operator Identity & Logout */}
                {operator && (
                    <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
                        <div className="flex items-center gap-2 px-2.5 py-1 bg-slate-50 border border-slate-200/80 rounded-xl text-xs">
                            <div className="h-6 w-6 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                                {isAdmin ? <Shield className="h-3.5 w-3.5" /> : <UserIcon className="h-3.5 w-3.5" />}
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="font-bold text-slate-800 leading-tight text-[11px]">
                                    {operator.name}
                                </span>
                                <span className="text-[9px] font-semibold text-sky-700 leading-none">
                                    {isAdmin ? 'ADMINISTRADOR' : 'OPERADOR BALCÃO'}
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Encerrar sessão (Logout)"
                        >
                            <LogOut className="h-4 w-4" />
                        </button>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header