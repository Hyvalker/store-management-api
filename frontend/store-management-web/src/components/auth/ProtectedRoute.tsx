import React from 'react'
import {Navigate, useLocation, Link} from 'react-router-dom'
import {ShieldAlert, ArrowLeft, Loader2} from 'lucide-react'
import {useAuth} from '../../contexts/AuthContext'
import type {OperatorRole} from '../../types/auth'

interface ProtectedRouteProps {
    children?: React.ReactNode
    requiredRole?: OperatorRole
}

export function ProtectedRoute({children, requiredRole}: ProtectedRouteProps) {
    const {isAuthenticated, isAdmin, loading, operator} = useAuth()
    const location = useLocation()

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="h-8 w-8 text-sky-600 animate-spin" />
                    <p className="text-xs text-slate-500 font-medium">Verificando credenciais...</p>
                </div>
            </div>
        )
    }

    if (!isAuthenticated) {
        // Redireciona para o login e salva para onde o usuário queria ir
        return <Navigate to="/login" state={{from: location}} replace />
    }

    if (requiredRole === 'ADMIN' && !isAdmin) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm text-center space-y-4">
                    <div className="mx-auto h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200/60">
                        <ShieldAlert className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">
                            Acesso Restrito ao Administrador
                        </h2>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                            Esta área contém informações financeiras e configurações restritas.
                            Seu operador atual (<strong className="text-slate-700">{operator?.name}</strong>)
                            possui perfil de <span className="font-semibold text-sky-700">Operador de Balcão</span>.
                        </p>
                    </div>

                    <div className="pt-2">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span>Voltar para o Balcão / Início</span>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return <>{children}</>
}
