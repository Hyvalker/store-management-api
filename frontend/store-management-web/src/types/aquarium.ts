export type AquariumType = 'MARINE' | 'FRESHWATER'

export interface Aquarium {
    id: number
    userId: number
    userName?: string
    name: string
    type: AquariumType
    volumeLiters?: number
    description?: string
    createdAt: string
    testsCount: number
}

export interface CreateAquariumRequest {
    userId: number
    name: string
    type: AquariumType
    volumeLiters?: number
    description?: string
}

export interface WaterParameterTest {
    id: number
    aquariumId: number
    aquariumName?: string
    testDate: string
    ph?: number
    ammonia?: number
    nitrite?: number
    nitrate?: number
    phosphate?: number
    kh?: number
    gh?: number
    salinity?: number
    calcium?: number
    magnesium?: number
    temperature?: number
    silicate?: number
    clientReport?: string
    diagnosisNotes?: string
    createdAt: string
}

export interface CreateWaterParameterTestRequest {
    aquariumId?: number
    testDate?: string
    ph?: number
    ammonia?: number
    nitrite?: number
    nitrate?: number
    phosphate?: number
    kh?: number
    gh?: number
    salinity?: number
    calcium?: number
    magnesium?: number
    temperature?: number
    silicate?: number
    clientReport?: string
    diagnosisNotes?: string
}
