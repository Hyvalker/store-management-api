import {api} from './api'
import type {
    Operator,
    LoginCredentials,
    LoginResponse,
    CreateOperatorData,
    UpdateOperatorData
} from '../types/auth'

const TOKEN_KEY = 'bamba_aqua_token'
const OPERATOR_KEY = 'bamba_aqua_operator'

// ===================== Gestão de Token e Sessão =====================

export function getStoredToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
}

export function getStoredOperator(): Operator | null {
    const raw = localStorage.getItem(OPERATOR_KEY)
    if (!raw) return null
    try {
        return JSON.parse(raw) as Operator
    } catch {
        return null
    }
}

export function setAuthSession(token: string, operator: Operator): void {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(OPERATOR_KEY, JSON.stringify(operator))
}

export function clearAuthSession(): void {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(OPERATOR_KEY)
}

export function isAuthenticated(): boolean {
    return !!getStoredToken()
}

// ===================== Endpoints de Autenticação =====================

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', credentials)
    const data = response.data
    setAuthSession(data.token, data.operator)
    return data
}

export async function logout(): Promise<void> {
    clearAuthSession()
}

export async function fetchMe(): Promise<Operator> {
    const response = await api.get<Operator>('/auth/me')
    const operator = response.data
    // Mantém os dados locais sincronizados com os dados atualizados do servidor
    const token = getStoredToken()
    if (token) {
        setAuthSession(token, operator)
    }
    return operator
}

export async function changeOwnPassword(currentPassword: string, newPassword: string): Promise<void> {
    await api.patch('/auth/me/password', {
        currentPassword,
        newPassword
    })
}

// ===================== Gestão de Operadores (ADMIN) =====================

export async function getOperators(): Promise<Operator[]> {
    const response = await api.get<Operator[]>('/operators')
    return response.data
}

export async function createOperator(data: CreateOperatorData): Promise<Operator> {
    const response = await api.post<Operator>('/operators', data)
    return response.data
}

export async function updateOperator(id: number, data: UpdateOperatorData): Promise<Operator> {
    const response = await api.put<Operator>(`/operators/${id}`, data)
    return response.data
}

export async function resetOperatorPassword(id: number, newPassword: string): Promise<void> {
    await api.patch(`/operators/${id}/password`, {newPassword})
}

export async function deactivateOperator(id: number): Promise<void> {
    await api.delete(`/operators/${id}`)
}

// ===================== Compatibilidade com Código Legado =====================

export interface CurrentUser {
    id?: number
    name: string
    role: string
    username?: string
}

export function getCurrentUser(): CurrentUser {
    const op = getStoredOperator()
    if (op) {
        return {
            id: op.id,
            name: op.name,
            username: op.username,
            role: op.role === 'ADMIN' ? 'Administrador / Gerente' : 'Operador de Caixa'
        }
    }
    return {
        name: 'Operador',
        role: 'Operador'
    }
}

export function getCurrentUserName(): string {
    return getCurrentUser().name || 'Operador'
}
