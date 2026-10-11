import {api} from './api'
import type {User, CreateUserRequest} from '../types/user'

export async function getUsers(): Promise<User[]> {
    const response = await api.get<User[]>('/users')
    return response.data
}

export async function getUser(id: number): Promise<User> {
    const response = await api.get<User>(`/users/${id}`)
    return response.data
}

export async function createUser(data: CreateUserRequest): Promise<User> {
    const response = await api.post<User>('/users', data)
    return response.data
}

export async function updateUser(id: number, data: CreateUserRequest): Promise<User> {
    const response = await api.put<User>(`/users/${id}`, data)
    return response.data
}

export async function deleteUser(id: number): Promise<void> {
    await api.delete(`/users/${id}`)
}
