import React, {createContext, useContext, useState, useEffect, useCallback} from 'react'
import type {Operator, LoginCredentials} from '../types/auth'
import {
    getStoredOperator,
    getStoredToken,
    login as apiLogin,
    logout as apiLogout,
    fetchMe
} from '../services/authService'

interface AuthContextValue {
    operator: Operator | null
    token: string | null
    isAuthenticated: boolean
    isAdmin: boolean
    isOperator: boolean
    loading: boolean
    login: (credentials: LoginCredentials) => Promise<void>
    logout: () => void
    refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({children}: {children: React.ReactNode}) {
    const [operator, setOperator] = useState<Operator | null>(() => getStoredOperator())
    const [token, setToken] = useState<string | null>(() => getStoredToken())
    const [loading, setLoading] = useState<boolean>(true)

    // Sincroniza dados do operador com o backend ao iniciar (se houver token)
    useEffect(() => {
        let isMounted = true

        async function initAuth() {
            const currentToken = getStoredToken()
            if (currentToken) {
                try {
                    const freshOperator = await fetchMe()
                    if (isMounted) {
                        setOperator(freshOperator)
                        setToken(currentToken)
                    }
                } catch {
                    // Se falhar (ex: token expirado enquanto o app estava fechado), limpa
                    if (isMounted) {
                        setOperator(null)
                        setToken(null)
                    }
                }
            } else {
                setOperator(null)
                setToken(null)
            }
            if (isMounted) {
                setLoading(false)
            }
        }

        initAuth()

        // Ouve evento disparado pelo interceptor do Axios ao receber 401
        function handleUnauthorized() {
            setOperator(null)
            setToken(null)
        }

        window.addEventListener('auth:unauthorized', handleUnauthorized)
        return () => {
            isMounted = false
            window.removeEventListener('auth:unauthorized', handleUnauthorized)
        }
    }, [])

    const login = useCallback(async (credentials: LoginCredentials) => {
        const response = await apiLogin(credentials)
        setToken(response.token)
        setOperator(response.operator)
    }, [])

    const logout = useCallback(() => {
        apiLogout()
        setToken(null)
        setOperator(null)
    }, [])

    const refreshProfile = useCallback(async () => {
        try {
            const fresh = await fetchMe()
            setOperator(fresh)
        } catch (err) {
            console.error('Falha ao atualizar perfil do operador:', err)
        }
    }, [])

    const isAuthenticated = !!token && !!operator && Boolean(operator.active)
    const isAdmin = isAuthenticated && operator?.role === 'ADMIN'
    const isOperator = isAuthenticated && operator?.role === 'OPERATOR'

    return (
        <AuthContext.Provider
            value={{
                operator,
                token,
                isAuthenticated,
                isAdmin,
                isOperator,
                loading,
                login,
                logout,
                refreshProfile
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth deve ser utilizado dentro de um AuthProvider')
    }
    return context
}
