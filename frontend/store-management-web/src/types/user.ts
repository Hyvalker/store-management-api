export interface User {
    id: number
    name: string
    email: string
    address?: string | null
    phoneNumber?: string | null
    active?: boolean
}

export interface CreateUserRequest {
    name: string
    email: string
    address?: string | null
    phoneNumber?: string | null
}
