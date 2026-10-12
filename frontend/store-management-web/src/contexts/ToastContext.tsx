import React, {createContext, useContext, useState, useCallback} from 'react'
import {CheckCircle2, AlertCircle, Info, AlertTriangle, X} from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface ToastItem {
    id: string
    type: ToastType
    message: string
    title?: string
}

interface ToastContextValue {
    toast: {
        success: (message: string, title?: string) => void
        error: (message: string, title?: string) => void
        info: (message: string, title?: string) => void
        warning: (message: string, title?: string) => void
    }
    removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export function ToastProvider({children}: {children: React.ReactNode}) {
    const [toasts, setToasts] = useState<ToastItem[]>([])

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }, [])

    const addToast = useCallback((type: ToastType, message: string, title?: string) => {
        const id = Math.random().toString(36).substring(2, 9) + Date.now().toString(36)
        const newToast: ToastItem = {id, type, message, title}

        setToasts((prev) => [...prev, newToast])

        // Auto remove after 4.2 seconds
        setTimeout(() => {
            removeToast(id)
        }, 8000)
    }, [removeToast])

    const toast = {
        success: useCallback((message: string, title?: string) => addToast('success', message, title), [addToast]),
        error: useCallback((message: string, title?: string) => addToast('error', message, title), [addToast]),
        info: useCallback((message: string, title?: string) => addToast('info', message, title), [addToast]),
        warning: useCallback((message: string, title?: string) => addToast('warning', message, title), [addToast]),
    }

    return (
        <ToastContext.Provider value={{toast, removeToast}}>
            {children}
            {/* Floating Toast Notification Container */}
            <div
                aria-live="polite"
                className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
            >
                {toasts.map((item) => (
                    <div
                        key={item.id}
                        className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl shadow-lg border backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-3 fade-in ${
                            item.type === 'success'
                                ? 'bg-white border-emerald-200 text-slate-800 shadow-emerald-500/10'
                                : item.type === 'error'
                                ? 'bg-white border-rose-200 text-slate-800 shadow-rose-500/10'
                                : item.type === 'warning'
                                ? 'bg-white border-amber-200 text-slate-800 shadow-amber-500/10'
                                : 'bg-white border-sky-200 text-slate-800 shadow-sky-500/10'
                        }`}
                    >
                        <div className="shrink-0 mt-0.5">
                            {item.type === 'success' && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
                            {item.type === 'error' && <AlertCircle className="h-5 w-5 text-rose-600" />}
                            {item.type === 'warning' && <AlertTriangle className="h-5 w-5 text-amber-600" />}
                            {item.type === 'info' && <Info className="h-5 w-5 text-sky-600" />}
                        </div>

                        <div className="flex-1 min-w-0 pr-1">
                            {item.title && (
                                <h4 className="text-xs font-bold text-slate-900 tracking-tight mb-0.5">
                                    {item.title}
                                </h4>
                            )}
                            <p className="text-xs text-slate-600 leading-relaxed break-words">
                                {item.message}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => removeToast(item.id)}
                            className="shrink-0 p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                            title="Fechar"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast deve ser utilizado dentro de um ToastProvider')
    }
    return context
}
