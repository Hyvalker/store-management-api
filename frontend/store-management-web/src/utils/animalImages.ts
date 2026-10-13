import type {SubCategory} from '../types/product'
import {searchMasterSpecies} from '../data/speciesMasterCatalog'
import {EXISTING_ANIMAL_IMAGES} from './existingAnimalImages'

export interface ItemImageSource {
    name: string
    imageSlug?: string | null
    subCategory?: SubCategory
    type?: string
}

/**
 * Valida se o arquivo de imagem realmente existe no diretório public/images/animals/.
 * Se o arquivo não estiver salvo no disco, retorna null para garantir que o encarte
 * nunca tente carregar um recurso inexistente ou quebre a exportação em JPEG.
 */
function verifyImageExists(pathOrSlug?: string | null): string | null {
    if (!pathOrSlug) return null
    let filename = pathOrSlug.trim()
    if (filename.startsWith('/images/animals/')) {
        filename = filename.slice('/images/animals/'.length)
    }
    const cleanFilename = filename.includes('.') ? filename : `${filename}.jpg`
    if (EXISTING_ANIMAL_IMAGES.has(cleanFilename)) {
        return `/images/animals/${cleanFilename}`
    }
    return null
}

/**
 * Retorna o caminho da imagem verificada para o produto ou ser vivo.
 * Retorna null se não houver foto oficial comprovada para o item,
 * garantindo que nenhum produto sem foto receba uma imagem incorreta.
 */
export function getAnimalImage(itemOrName: ItemImageSource | string): string | null {
    const name = typeof itemOrName === 'string' ? itemOrName : itemOrName.name
    const imageSlug = typeof itemOrName === 'object' ? itemOrName.imageSlug : undefined

    if (!name || name.trim().length < 2) return null

    const norm = name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()

    // 1. Morfos específicos de Storm (EcoReef) com prioridade máxima
    if (norm.includes('orange storm') || (norm.includes('storm') && norm.includes('orange'))) {
        return verifyImageExists('palhaco-orange-storm.jpg')
    }
    if (norm.includes('snow storm') || (norm.includes('storm') && norm.includes('snow') && !norm.includes('flake'))) {
        return verifyImageExists('palhaco-snow-storm.jpg')
    }
    if (norm.includes('mocha storm') || (norm.includes('storm') && norm.includes('mocha'))) {
        return verifyImageExists('palhaco-mocha-storm.jpg')
    }
    if (norm.includes('black storm') || (norm.includes('storm') && norm.includes('black'))) {
        return verifyImageExists('palhaco-black-storm.jpg')
    }

    // 2. imageSlug direto informado no cadastro (sanitizado contra fallbacks legados)
    if (imageSlug && imageSlug.trim().length > 0) {
        const slug = imageSlug.trim()
        const isClownSlug = slug.includes('palhaco') || slug.includes('ocellaris')
        const isClownName = norm.includes('palhaco') || norm.includes('clown') || norm.includes('ocellaris') || norm.includes('percula')
        if (!isClownSlug || isClownName) {
            const verified = verifyImageExists(slug)
            if (verified) return verified
        }
    }

    // 3. Consulta pelo Catálogo Mestre de Espécies (correspondência estrita de identidade)
    const masterMatches = searchMasterSpecies(name, 1)
    if (masterMatches.length > 0) {
        const best = masterMatches[0]
        const normBestName = best.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
        const normBestCommon = best.commonName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
        const normSynonyms = (best.synonyms || []).map((s) =>
            s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
        )

        const matchesIdentity =
            norm === normBestName ||
            norm === normBestCommon ||
            norm.includes(normBestCommon) ||
            normSynonyms.some((syn) => norm === syn || norm.includes(syn))

        if (matchesIdentity) {
            const verified = verifyImageExists(best.imageSlug)
            if (verified) return verified
        }
    }

    // 4. Outros morfos certificados
    if (norm.includes('snowflake')) {
        if (norm.includes('maroon')) return verifyImageExists('palhaco-maroon-snowflake.jpg')
        if (norm.includes('black')) return verifyImageExists('palhaco-black-snowflake.jpg')
        return verifyImageExists('palhaco-snowflake.jpg')
    }
    if (norm.includes('picasso')) return verifyImageExists('palhaco-premium-picasso.jpg')
    if (norm.includes('lightning')) return verifyImageExists('palhaco-maroon-lightning.jpg')
    if (norm.includes('golden nugget')) return verifyImageExists('palhaco-maroon-golden-nugget.jpg')
    if (norm.includes('goldstripe') || norm.includes('gold stripe')) return verifyImageExists('palhaco-maroon-goldstripe.jpg')
    if (norm.includes('maroon')) return verifyImageExists('palhaco-maroon-espinho.jpg')
    if (norm.includes('black ocellaris')) return verifyImageExists('palhaco-black-ocellaris.jpg')
    if (norm.includes('true percula')) return verifyImageExists('palhaco-percula-true.jpg')

    // Peixe palhaço comum somente se o nome indicar especificamente
    if (
        norm.includes('palhaco ocellaris') ||
        norm.includes('palhaco comum') ||
        norm.includes('peixe palhaco') ||
        norm.includes('peixe-palhaco')
    ) {
        return verifyImageExists('palhaco-ocellaris-comum.jpg')
    }

    // 5. Cirurgiões / Tangs Marinhos
    if (norm.includes('blue tang') || norm.includes('hepatus')) {
        return verifyImageExists('tang-hepatus.jpg')
    }
    if (norm.includes('yellow tang') || norm.includes('flavescens')) {
        return verifyImageExists('tang-amarelo.jpg')
    }
    if (norm.includes('purple') && norm.includes('tang')) {
        return verifyImageExists('tang-purple.jpg')
    }
    if (norm.includes('powder blue')) {
        return verifyImageExists('tang-powder-blue.jpg')
    }
    if (norm.includes('leao') || norm.includes('volitans')) {
        return verifyImageExists('peixe-leao.jpg')
    }
    if (norm.includes('gramma') || norm.includes('loreto')) {
        return verifyImageExists('gramma-loreto.jpg')
    }

    // 6. Invertebrados
    if (norm.includes('bailarino') || norm.includes('wurdemanni')) {
        return verifyImageExists('camarao-bailarino-comedor-de-aiptasia.jpg')
    }
    if (norm.includes('cleaner') || norm.includes('amboinensis')) {
        return verifyImageExists('camarao-skunk-cleaner.jpg')
    }
    if (norm.includes('stenopus')) {
        return verifyImageExists('camarao-stenopus.jpg')
    }

    // 7. Corais
    if (norm.includes('hammer') || norm.includes('ancora')) {
        return verifyImageExists('hammer-coral-branching.jpg')
    }
    if (norm.includes('frogspawn') || norm.includes('divisa')) {
        return verifyImageExists('frogspawn-coral-green.jpg')
    }
    if (norm.includes('torch') || norm.includes('glabrescens')) {
        return verifyImageExists('torch-coral-green-tip.jpg')
    }
    if (norm.includes('zoanthus')) {
        return verifyImageExists('zoanthus-grandis-cinnamon.jpg')
    }

    // 8. Peixes de Água Doce
    if (norm.includes('cardinal') || (norm.includes('neon') && !norm.includes('goby'))) {
        return verifyImageExists('tetra-neon-cardinal.jpg')
    }
    if (norm.includes('disco') || norm.includes('discus')) {
        return verifyImageExists('acara-disco-selvagem-azul.jpg')
    }
    if (norm.includes('coridora') || norm.includes('corydora') || norm.includes('sterbai')) {
        return verifyImageExists('coridora-sterbai.jpg')
    }
    if (norm.includes('betta')) {
        return verifyImageExists('betta-splendens.jpg')
    }
    if (norm.includes('platy')) {
        return verifyImageExists('platy-variatus-arco-iris.jpg')
    }

    // NENHUMA correspondência comprovada ou arquivo ausente: retorna null
    return null
}

/**
 * Retorna o título amigável em português para cada subcategoria.
 */
export function getSubCategoryLabel(subCategory?: SubCategory | string): string {
    switch (subCategory) {
        case 'MARINE_FISH':
            return 'Peixes Marinhos'
        case 'CORAL':
            return 'Corais & Anêmonas'
        case 'INVERTEBRATE':
            return 'Invertebrados & Equipe de Limpeza'
        case 'FRESHWATER_FISH':
            return 'Peixes de Água Doce'
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
