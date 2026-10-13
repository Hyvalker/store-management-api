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
    if (EXISTING_ANIMAL_IMAGES.has(filename)) {
        return `/images/animals/${filename}`
    }
    if (!filename.includes('.')) {
        if (EXISTING_ANIMAL_IMAGES.has(`${filename}.jpg`)) {
            return `/images/animals/${filename}.jpg`
        }
        if (EXISTING_ANIMAL_IMAGES.has(`${filename}.webp`)) {
            return `/images/animals/${filename}.webp`
        }
        if (EXISTING_ANIMAL_IMAGES.has(`${filename}.png`)) {
            return `/images/animals/${filename}.png`
        }
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
            norm.startsWith(normBestCommon) ||
            (normBestCommon.length >= 5 && norm.includes(normBestCommon)) ||
            normSynonyms.some((syn) => {
                if (norm === syn) return true
                if (syn.length >= 4) {
                    const escaped = syn.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
                    const regex = new RegExp(`(^|\\s)${escaped}(\\s|$)`)
                    return regex.test(norm)
                }
                return false
            })

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

    // 7. Corais, Anêmonas e Macroalgas (Morfos Específicos & Cultivares)
    // Macroalga / Alga Atomic Broccoli
    if (norm.includes('atomic') && (norm.includes('brocol') || norm.includes('broccoli') || norm.includes('alga') || norm.includes('leather'))) {
        return verifyImageExists('alga-atomic-broccoli.png') || verifyImageExists('alga-atomic-broccoli.jpg') || verifyImageExists('leather-atomic-brocolis.jpg')
    }

    // Anêmonas Bubble Tip (BTA)
    if (norm.includes('bubble tip') || norm.includes('bubbletip') || norm.includes('bubble-tip') || (norm.includes('anemon') && (norm.includes('bta') || norm.includes('bolha')))) {
        if (norm.includes('rainbow') || norm.includes('arco-iris') || norm.includes('arco iris')) {
            return verifyImageExists('anemona-bubble-tip-rainbow.jpg')
        }
        if (norm.includes('green') || norm.includes('verd')) {
            return verifyImageExists('anemona-bubble-tip-green.jpg')
        }
        if (norm.includes('rose') || norm.includes('rosa') || norm.includes('vermelh') || norm.includes('red') || norm.includes('rbta') || norm.includes('black widow')) {
            return verifyImageExists('anemona-bubble-tip-rose.jpg')
        }
        if (norm.includes('sunburst')) {
            return verifyImageExists('anemona-bubble-tip-sunburst.jpg')
        }
        return verifyImageExists('anemona-bubble-tip-rose.jpg')
    }

    // Carpet Anemones
    if (norm.includes('mini carpet')) {
        return verifyImageExists('anemona-mini-carpet.jpg')
    }
    if (norm.includes('carpet red') || (norm.includes('carpet') && (norm.includes('vermelh') || norm.includes('red')))) {
        return verifyImageExists('anemona-carpet-red.jpg')
    }
    if (norm.includes('coral carpet green') || (norm.includes('carpet green') && !norm.includes('anemon')) || norm.includes('green star polyps') || /\bgsp\b/.test(norm)) {
        return verifyImageExists('coral-carpet-green.jpg')
    }
    if (norm.includes('coral carpet brown') || norm.includes('carpet brown')) {
        return verifyImageExists('coral-carpet-brown.jpg')
    }
    if (norm.includes('carpet green') || (norm.includes('carpet') && norm.includes('verd'))) {
        return verifyImageExists('anemona-carpet-green.jpg')
    }
    if (norm.includes('anemona carpet') || (norm.includes('anemona') && norm.includes('haddoni'))) {
        return verifyImageExists('anemona-carpet-green.jpg')
    }

    // Rhodactis Superman & Outros Cogumelos
    if (norm.includes('superman') && (norm.includes('rhodactis') || norm.includes('mushroom') || norm.includes('cogumelo'))) {
        return verifyImageExists('rhodactis-superman.jpg')
    }
    if (norm.includes('st thomas') || norm.includes('st. thomas')) {
        return verifyImageExists('mushroom-rhodactis-st-thomas.jpg')
    }

    // Zoanthus & Palythoa Morphs
    if (norm.includes('rasta') || norm.includes('rastafari')) {
        return verifyImageExists('zoanthus-rastafari.webp')
    }
    if (norm.includes('bam bam') || norm.includes('bambam')) {
        return verifyImageExists('zoanthus-red-bam-bam.webp')
    }
    if (norm.includes('utter chaos')) {
        return verifyImageExists('zoanthus-utter-chaos.webp')
    }
    if (norm.includes('dragon eye') || norm.includes('radioactive')) {
        return verifyImageExists('zoanthus-radioactive-dragon-eye.webp')
    }
    if (norm.includes('sunny d') || norm.includes('sunny delight')) {
        return verifyImageExists('zoanthus-sunny-d.webp')
    }
    if (norm.includes('scrambled egg')) {
        return verifyImageExists('zoanthus-scrambled-eggs.webp')
    }
    if (norm.includes('fire and ice') || norm.includes('fire & ice')) {
        return verifyImageExists('zoanthus-fire-and-ice.webp')
    }
    if (norm.includes('fruit loop')) {
        return verifyImageExists('zoanthus-fruit-loops.webp')
    }
    if (norm.includes('king midas')) {
        return verifyImageExists('zoanthus-king-midas.webp')
    }
    if (norm.includes('captain america')) {
        return verifyImageExists('palythoa-captain-america.webp')
    }
    if (norm.includes('watermelon')) {
        return verifyImageExists('zoanthus-watermelon.webp')
    }
    if (norm.includes('blue hornet')) {
        return verifyImageExists('zoanthus-blue-hornet.webp')
    }
    if (norm.includes('candy apple')) {
        return verifyImageExists('zoanthus-candy-apple-red.webp')
    }

    // Leather Corals
    if (norm.includes('leather umbrella') || norm.includes('umbrella') || norm.includes('toadstool') || norm.includes('guarda-chuva')) {
        return verifyImageExists('leather-umbrella.jpg')
    }
    if (norm.includes('devil hand') || norm.includes('devils hand') || norm.includes('mao do diabo') || norm.includes('lobophytum')) {
        return verifyImageExists('leather-devil-hand-green.jpg')
    }
    if (norm.includes('leather lettuce') || norm.includes('sinularia dura') || norm.includes('couro alface')) {
        return verifyImageExists('leather-lettuce.jpg')
    }

    // Plate Coral (Fungia)
    if (norm.includes('plate') || norm.includes('fungia')) {
        if (norm.includes('purple') || norm.includes('rox')) {
            return verifyImageExists('plate-coral-purple.jpg')
        }
        return verifyImageExists('plate-coral-green.jpg')
    }

    // Blastomussa
    if (norm.includes('blastomussa') || norm.includes('blasto')) {
        if (norm.includes('merletti') || (norm.includes('green') && !norm.includes('wellsi'))) {
            return verifyImageExists('blastomussa-merletti-green.jpg')
        }
        return verifyImageExists('blastomussa-wellsi-red.jpg')
    }

    // Hammer Coral
    if (norm.includes('hammer') || norm.includes('ancora') || norm.includes('martelo')) {
        if (norm.includes('toxic') || norm.includes('metalic') || norm.includes('green') || norm.includes('verd')) {
            return verifyImageExists('hammer-coral-toxic-green.jpg')
        }
        if (norm.includes('gold') || norm.includes('dourad') || norm.includes('ouro')) {
            return verifyImageExists('hammer-coral-gold.jpg')
        }
        if (norm.includes('orange') || norm.includes('laranj')) {
            return verifyImageExists('hammer-coral-orange.jpg')
        }
        return verifyImageExists('hammer-coral-branching.jpg')
    }

    // Frogspawn Coral
    if (norm.includes('frogspawn') || norm.includes('frogspan') || norm.includes('divisa')) {
        if (norm.includes('bicolor')) {
            return verifyImageExists('frogspawn-coral-bicolor.jpg')
        }
        return verifyImageExists('frogspawn-coral-green.jpg')
    }

    // Torch Coral
    if (norm.includes('torch') || norm.includes('glabrescens') || norm.includes('tocha')) {
        if (norm.includes('gold') || norm.includes('dourad') || norm.includes('ouro') || norm.includes('24k') || norm.includes('dragon soul')) {
            return verifyImageExists('torch-coral-24k-gold.jpg')
        }
        if (norm.includes('holy grail')) {
            return verifyImageExists('torch-coral-holy-grail.jpg')
        }
        if (norm.includes('black')) {
            return verifyImageExists('torch-coral-black-torch.jpg')
        }
        return verifyImageExists('torch-coral-green-tip.jpg')
    }

    if (norm.includes('cinnamon') || norm.includes('zoanthus grandis')) {
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
