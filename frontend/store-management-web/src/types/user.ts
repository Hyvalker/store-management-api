export interface User {
    id: number
    name: string
    email: string
    address?: string | null
    phoneNumber?: string | null
}

export interface CreateUserRequest {
    name: string
    email: string
    address?: string | null
    phoneNumber?: string | null
}
