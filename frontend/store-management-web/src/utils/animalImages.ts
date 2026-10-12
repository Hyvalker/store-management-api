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

    // 1. Morfos de Peixe-Palhaço (EcoReef)
    if (norm.includes('storm')) {
        if (norm.includes('orange')) return '/images/animals/palhaco-orange-storm.jpg'
        if (norm.includes('snow')) return '/images/animals/palhaco-snow-storm.jpg'
        if (norm.includes('mocha')) return '/images/animals/palhaco-mocha-storm.jpg'
        return '/images/animals/palhaco-black-storm.jpg'
    }
    if (norm.includes('snowflake')) {
        if (norm.includes('maroon')) return '/images/animals/palhaco-maroon-snowflake.jpg'
        return '/images/animals/palhaco-snowflake.jpg'
    }
    if (norm.includes('picasso')) return '/images/animals/palhaco-premium-picasso.jpg'
    if (norm.includes('lightning')) return '/images/animals/palhaco-maroon-lightning.jpg'
    if (norm.includes('nugget')) return '/images/animals/palhaco-maroon-golden-nugget.jpg'
    if (norm.includes('maroon')) return '/images/animals/palhaco-maroon-espinho.jpg'
    if (norm.includes('black ocellaris')) return '/images/animals/palhaco-black-ocellaris.jpg'
    if (norm.includes('palhaco') || norm.includes('ocellaris') || norm.includes('clownfish')) {
        return '/images/animals/palhaco-ocellaris-comum.jpg'
    }

    // 2. Cirurgiões / Tangs Marinhos
    if (norm.includes('blue tang') || norm.includes('hepatus')) {
        return '/images/animals/tang-hepatus.jpg'
    }
    if (norm.includes('yellow tang') || norm.includes('flavescens')) {
        return '/images/animals/tang-amarelo.jpg'
    }
    if (norm.includes('purple') && norm.includes('tang')) {
        return '/images/animals/tang-purple.jpg'
    }
    if (norm.includes('powder blue')) {
        return '/images/animals/tang-powder-blue.jpg'
    }
    if (norm.includes('leao') || norm.includes('volitans')) {
        return '/images/animals/peixe-leao.jpg'
    }
    if (norm.includes('gramma') || norm.includes('loreto')) {
        return '/images/animals/gramma-loreto.jpg'
    }

    // 3. Invertebrados (Camarões e Equipe de Limpeza)
    if (norm.includes('bailarino') || norm.includes('wurdemanni')) {
        return '/images/animals/camarao-bailarino-comedor-de-aiptasia.jpg'
    }
    if (norm.includes('cleaner') || norm.includes('amboinensis')) {
        return '/images/animals/camarao-skunk-cleaner.jpg'
    }
    if (norm.includes('stenopus')) {
        return '/images/animals/camarao-stenopus.jpg'
    }

    // 4. Corais
    if (norm.includes('hammer') || norm.includes('ancora')) {
        return '/images/animals/hammer-coral-branching.jpg'
    }
    if (norm.includes('frogspawn') || norm.includes('divisa')) {
        return '/images/animals/frogspawn-coral-green.jpg'
    }
    if (norm.includes('torch') || norm.includes('glabrescens')) {
        return '/images/animals/torch-coral-green-tip.jpg'
    }
    if (norm.includes('zoanthus')) {
        return '/images/animals/zoanthus-grandis-cinnamon.jpg'
    }

    // 5. Peixes de Água Doce
    if (norm.includes('cardinal') || (norm.includes('neon') && !norm.includes('goby'))) {
        return '/images/animals/tetra-neon-cardinal.jpg'
    }
    if (norm.includes('disco') || norm.includes('discus')) {
        return '/images/animals/acara-disco-selvagem-azul.jpg'
    }
    if (norm.includes('coridora') || norm.includes('corydora') || norm.includes('sterbai')) {
        return '/images/animals/coridora-sterbai.jpg'
    }
    if (norm.includes('betta')) {
        return '/images/animals/betta-splendens.jpg'
    }
    if (norm.includes('platy')) {
        return '/images/animals/platy-variatus-arco-iris.jpg'
    }

    // 6. Fallback limpo por subcategoria (somente se não bater por nenhuma espécie)
    if (subCategory) {
        switch (subCategory) {
            case 'CORAL':
                return '/images/animals/hammer-coral-branching.jpg'
            case 'INVERTEBRATE':
                return '/images/animals/camarao-bailarino-comedor-de-aiptasia.jpg'
            case 'FRESHWATER_FISH':
                return '/images/animals/tetra-neon-cardinal.jpg'
            case 'MARINE_FISH':
                return '/images/animals/tang-hepatus.jpg'
            default:
                break
        }
    }

    return '/images/animals/palhaco-ocellaris-comum.jpg'
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
