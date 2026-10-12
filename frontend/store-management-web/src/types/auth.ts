export type OperatorRole = 'ADMIN' | 'OPERATOR'

export interface Operator {
    id: number
    name: string
    username: string
    role: OperatorRole
    active: boolean
    createdAt?: string
    lastLoginAt?: string | null
}

export interface LoginResponse {
    token: string
    tokenType: string
    expiresIn: number
    operator: Operator
}

export interface LoginCredentials {
    username: string
    password: string
}

export interface CreateOperatorData {
    name: string
    username: string
    password: string
    role: OperatorRole
}

export interface UpdateOperatorData {
    name: string
    role: OperatorRole
    active: boolean
}
