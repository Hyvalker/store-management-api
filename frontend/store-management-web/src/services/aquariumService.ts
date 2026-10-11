import {api} from './api'
import type {
    Aquarium,
    CreateAquariumRequest,
    WaterParameterTest,
    CreateWaterParameterTestRequest
} from '../types/aquarium'

export async function getAquariumsByUser(userId: number): Promise<Aquarium[]> {
    const response = await api.get<Aquarium[]>(`/aquariums/user/${userId}`)
    return response.data
}

export async function getAquarium(id: number): Promise<Aquarium> {
    const response = await api.get<Aquarium>(`/aquariums/${id}`)
    return response.data
}

export async function createAquarium(data: CreateAquariumRequest): Promise<Aquarium> {
    const response = await api.post<Aquarium>('/aquariums', data)
    return response.data
}

export async function updateAquarium(id: number, data: CreateAquariumRequest): Promise<Aquarium> {
    const response = await api.put<Aquarium>(`/aquariums/${id}`, data)
    return response.data
}

export async function deleteAquarium(id: number): Promise<void> {
    await api.delete(`/aquariums/${id}`)
}

export async function getWaterTests(aquariumId: number): Promise<WaterParameterTest[]> {
    const response = await api.get<WaterParameterTest[]>(`/aquariums/${aquariumId}/tests`)
    return response.data
}

export async function createWaterTest(
    aquariumId: number,
    data: CreateWaterParameterTestRequest
): Promise<WaterParameterTest> {
    const response = await api.post<WaterParameterTest>(`/aquariums/${aquariumId}/tests`, data)
    return response.data
}

export async function updateWaterTest(
    testId: number,
    data: CreateWaterParameterTestRequest
): Promise<WaterParameterTest> {
    const response = await api.put<WaterParameterTest>(`/aquariums/tests/${testId}`, data)
    return response.data
}

export async function deleteWaterTest(testId: number): Promise<void> {
    await api.delete(`/aquariums/tests/${testId}`)
}
