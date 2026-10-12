import type {SubCategory} from '../types/product'

export interface ItemImageSource {
    name: string
    imageSlug?: string
    subCategory?: SubCategory
    type?: string
}

/**
 * Retorna o caminho da melhor imagem para o produto ou ser vivo.
 * Prioridade:
 * 1. imageSlug direto do produto (se informado)
 * 2. Variação/morfo específico no nome (ex: Storm Black, Snowflake, Picasso)
 * 3. Espécie ou gênero no nome
 * 4. Subcategoria (Coral -> coral-hammer, Peixe Marinho -> ocellaris, etc.)
 * 5. Fallback limpo
 */
export function getAnimalImage(itemOrName: ItemImageSource | string): string {
    const name = typeof itemOrName === 'string' ? itemOrName : itemOrName.name
    const imageSlug = typeof itemOrName === 'object' ? itemOrName.imageSlug : undefined
    const subCategory = typeof itemOrName === 'object' ? itemOrName.subCategory : undefined

    if (imageSlug && imageSlug.trim().length > 0) {
        const slug = imageSlug.trim()
        return slug.includes('.') ? `/images/animals/${slug}` : `/images/animals/${slug}.jpg`
    }

    const norm = (name || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()

    // 1. Morfos e variações específicas
    if (norm.includes('storm') && (norm.includes('palhaco') || norm.includes('ocellaris'))) {
        return '/images/animals/peixe-palhaco-storm-black.jpg'
    }
    if (norm.includes('snowflake') && (norm.includes('palhaco') || norm.includes('ocellaris'))) {
        return '/images/animals/peixe-palhaco-snowflake.jpg'
    }
    if (norm.includes('picasso') && (norm.includes('palhaco') || norm.includes('ocellaris'))) {
        return '/images/animals/peixe-palhaco-picasso.jpg'
    }
    if (norm.includes('palhaco') || norm.includes('ocellaris') || norm.includes('clownfish')) {
        return '/images/animals/peixe-palhaco-ocellaris.jpg'
    }

    // 2. Peixes Marinhos
    if (norm.includes('yellow tang') || norm.includes('flavescens')) {
        return '/images/animals/yellow-tang.jpg'
    }
    if (norm.includes('blue tang') || norm.includes('hepatus')) {
        return '/images/animals/blue-tang.jpg'
    }
    if (norm.includes('leao') || norm.includes('volitans')) {
        return '/images/animals/peixe-leao.jpg'
    }
    if (norm.includes('gramma') || norm.includes('loreto')) {
        return '/images/animals/gramma-loreto.jpg'
    }

    // 3. Corais
    if (norm.includes('hammer')) {
        return '/images/animals/coral-hammer.jpg'
    }
    if (norm.includes('frogspawn')) {
        return '/images/animals/coral-frogspawn.jpg'
    }
    if (norm.includes('torch')) {
        return '/images/animals/coral-torch.jpg'
    }
    if (norm.includes('zoanthus')) {
        return '/images/animals/zoanthus.jpg'
    }

    // 4. Invertebrados
    if (norm.includes('bailarino') || norm.includes('camarao')) {
        return '/images/animals/camarao-bailarino.jpg'
    }

    // 5. Água Doce
    if (norm.includes('neon') || norm.includes('axelrodi') || norm.includes('cardinal')) {
        return '/images/animals/tetra-neon.jpg'
    }
    if (norm.includes('disco') || norm.includes('discus')) {
        return '/images/animals/acara-disco.jpg'
    }
    if (norm.includes('corydora') || norm.includes('sterbai')) {
        return '/images/animals/corydora-sterbai.jpg'
    }
    if (norm.includes('betta')) {
        return '/images/animals/betta-splendens.jpg'
    }
    if (norm.includes('platy')) {
        return '/images/animals/platy.jpg'
    }

    // 6. Fallback por subcategoria se não achar pelo nome
    if (subCategory) {
        switch (subCategory) {
            case 'CORAL':
                return '/images/animals/coral-hammer.jpg'
            case 'INVERTEBRATE':
                return '/images/animals/camarao-bailarino.jpg'
            case 'FRESHWATER_FISH':
                return '/images/animals/tetra-neon.jpg'
            case 'MARINE_FISH':
            case 'OTHER_LIVING':
                return '/images/animals/peixe-palhaco-ocellaris.jpg'
            default:
                break
        }
    }

    // Fallback padrão
    return '/images/animals/peixe-palhaco-ocellaris.jpg'
}

/**
 * Retorna o título amigável em português para cada subcategoria.
 */
export function getSubCategoryLabel(subCategory?: SubCategory | string): string {
    switch (subCategory) {
        case 'CORAL':
            return 'Corais & Anêmonas'
        case 'MARINE_FISH':
            return 'Peixes Marinhos'
        case 'FRESHWATER_FISH':
            return 'Peixes de Água Doce'
        case 'INVERTEBRATE':
            return 'Invertebrados & Equipe de Limpeza'
        case 'PLANT':
            return 'Plantas Aquáticas'
        case 'OTHER_LIVING':
            return 'Outros Seres Vivos'
        case 'EQUIPMENT':
            return 'Equipamentos'
        case 'SUPPLY':
            return 'Suprimentos & Alimentos'
        case 'OTHER_PRODUCT':
            return 'Outros Produtos'
        default:
            return 'Geral'
    }
}
