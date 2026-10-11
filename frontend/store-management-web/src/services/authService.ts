export interface CurrentUser {
    id?: number
    name: string
    role: string
    email?: string
}

const AUTH_USER_KEY = 'bamba_aqua_current_user'

const DEFAULT_USER: CurrentUser = {
    name: 'Admin',
    role: 'Administrador / Gerente',
    email: 'admin@bambaaqua.com.br'
}

export function getCurrentUser(): CurrentUser {
    const saved = localStorage.getItem(AUTH_USER_KEY)
    if (!saved) return DEFAULT_USER
    try {
        const parsed = JSON.parse(saved)
        return parsed && parsed.name ? {...DEFAULT_USER, ...parsed} : DEFAULT_USER
    } catch {
        return DEFAULT_USER
    }
}

export function setCurrentUser(user: CurrentUser): void {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
}

export function getCurrentUserName(): string {
    return getCurrentUser().name || 'Admin'
}
