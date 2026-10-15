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

        const cleanNorm = norm
            .replace(/\b(muda|mudas)\b/g, '')
            .replace(/[()[\].,/-]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
        const normalizedCompound = cleanNorm.replace(/\bbambam\b/g, 'bam bam')

        const matchesIdentity =
            norm === normBestName ||
            norm === normBestCommon ||
            cleanNorm === normBestCommon ||
            normalizedCompound === normBestCommon ||
            norm.startsWith(normBestCommon) ||
            cleanNorm.startsWith(normBestCommon) ||
            normalizedCompound.startsWith(normBestCommon) ||
            (normBestCommon.length >= 5 && (norm.includes(normBestCommon) || cleanNorm.includes(normBestCommon) || normalizedCompound.includes(normBestCommon))) ||
            normSynonyms.some((syn) => {
                if (norm === syn || cleanNorm === syn || normalizedCompound === syn) return true
                if (syn.length >= 4) {
                    const escaped = syn.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
                    const regex = new RegExp(`(^|\\s)${escaped}(\\s|$)`)
                    return regex.test(norm) || regex.test(cleanNorm) || regex.test(normalizedCompound)
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
        (norm.includes('palhaco ocellaris') ||
        norm.includes('palhaco comum') ||
        norm.includes('peixe palhaco') ||
        norm.includes('peixe-palhaco')) &&
        !norm.includes('black') &&
        !norm.includes('mocha') &&
        !norm.includes('flurry') &&
        !norm.includes('storm') &&
        !norm.includes('frostbite') &&
        !norm.includes('snowflake') &&
        !norm.includes('picasso') &&
        !norm.includes('platinum') &&
        !norm.includes('domino') &&
        !norm.includes('gladiator') &&
        !norm.includes('misbar')
    ) {
        return verifyImageExists('palhaco-ocellaris-comum.jpg')
    }

    // 5. Cirurgiões / Tangs Marinhos
    if (norm.includes('blue tang') || norm.includes('hepatus')) {
        return verifyImageExists('blue-tang.jpg')
    }
    if (norm.includes('yellow tang') || norm.includes('flavescens')) {
        return verifyImageExists('yellow-tang.jpg')
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
        return verifyImageExists('camarao-bailarino.jpg')
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
        return null // Fotos antigas vermelhas foram descartadas
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
            return null // Descartada (morfotipo incorreto)
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
    // Green Star Polyps (GSP) & Carpet Corals
    if (norm.includes('green star polyps') || /\bgsp\b/.test(norm)) {
        return verifyImageExists('green-star-polyps.jpg')
    }
    if (norm.includes('coral carpet green') || (norm.includes('carpet green') && !norm.includes('anemon'))) {
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

    // Rhodactis, Discosoma, Ricordea & Cogumelos
    if (norm.includes('ricordea')) {
        if (norm.includes('laranj') || norm.includes('orange')) return verifyImageExists('ricordea-florida-laranja.jpg')
        if (norm.includes('azul') || norm.includes('blue')) return verifyImageExists('ricordea-florida-azul.jpg')
        if (norm.includes('rainbow') || norm.includes('arco iris') || norm.includes('arco-iris')) return verifyImageExists('ricordea-florida-rainbow.jpg')
        if (norm.includes('yuma') && (norm.includes('ros') || norm.includes('pink'))) return verifyImageExists('ricordea-yuma-rosa.jpg')
        if (norm.includes('yuma') && (norm.includes('verd') || norm.includes('green'))) return verifyImageExists('ricordea-yuma-verde.jpg')
        return verifyImageExists('ricordea-florida-rainbow.jpg') || verifyImageExists('ricordea-florida-azul.jpg')
    }
    if (norm.includes('superman') && (norm.includes('rhodactis') || norm.includes('mushroom') || norm.includes('cogumelo') || norm.includes('discosoma'))) {
        return verifyImageExists('rhodactis-superman.jpg') || verifyImageExists('mushroom-rhodactis-superman.jpg')
    }
    if (norm.includes('st thomas') || norm.includes('st. thomas')) {
        return verifyImageExists('mushroom-rhodactis-st-thomas.jpg')
    }

    // Zoanthus & Palythoa Morphs
    if (norm.includes('rasta') || norm.includes('rastafari')) {
        return verifyImageExists('zoanthus-rasta.webp') || verifyImageExists('zoanthus-rastafari.webp')
    }
    if (norm.includes('bam bam') || norm.includes('bambam')) {
        return verifyImageExists('zoanthus-red-bam-bam.webp') || verifyImageExists('zoanthus-bam-bam.webp')
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
    if (norm.includes('eagle eye')) {
        return verifyImageExists('004_zoanthus_eagle_eye.jpg') || verifyImageExists('zoanthus-eagle-eye.webp')
    }
    if (norm.includes('la lakers') || norm.includes('lakers')) {
        return verifyImageExists('008_zoanthus_la_lakers.jpg')
    }
    if (norm.includes('purple hornet')) {
        return verifyImageExists('012_zoanthus_purple_hornet.webp')
    }
    if (norm.includes('armor of god') || /\baog\b/.test(norm)) {
        return verifyImageExists('013_zoanthus_armor_of_god.webp')
    }
    if (norm.includes('nuclear green')) {
        return verifyImageExists('016_palythoa_nuclear_green.jpg')
    }
    if (norm.includes('purple death')) {
        return verifyImageExists('017_palythoa_purple_death.webp')
    }
    if (norm.includes('nirvana') || norm.includes('pandora')) {
        return verifyImageExists('020_palythoa_nirvana.jpg')
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
            return verifyImageExists('plate-coral-purple.jpg') || verifyImageExists('plate-coral.jpg')
        }
        return verifyImageExists('plate-coral.jpg')
    }

    // Blastomussa
    if (norm.includes('blastomussa') || norm.includes('blasto')) {
        if (norm.includes('merletti') || norm.includes('green') || norm.includes('verd')) {
            return verifyImageExists('blastomussa-merletti-green.jpg')
        }
        if (norm.includes('wellsi') || norm.includes('red') || norm.includes('vermelh')) {
            return verifyImageExists('blastomussa-wellsi-red.jpg')
        }
        return verifyImageExists('blastomussa-wellsi-red.jpg')
    }

    // Hammer Coral
    if (norm.includes('hammer') || norm.includes('ancora') || norm.includes('martelo')) {
        if (norm.includes('toxic') || norm.includes('green') || norm.includes('verd')) {
            return verifyImageExists('hammer-coral-toxic-green.jpg') || verifyImageExists('hammer-coral-branching.jpg')
        }
        if (norm.includes('gold') || norm.includes('dourad') || norm.includes('ouro')) {
            return verifyImageExists('hammer-coral-gold.jpg') || verifyImageExists('hammer-coral-branching.jpg')
        }
        if (norm.includes('orange') || norm.includes('laranj')) {
            return verifyImageExists('hammer-coral-orange.jpg') || verifyImageExists('hammer-coral-branching.jpg')
        }
        return verifyImageExists('hammer-coral-branching.jpg') || verifyImageExists('coral-hammer.jpg')
    }

    // Frogspawn Coral, Octospawn & Frammer
    if (norm.includes('frammer')) {
        return verifyImageExists('frogspawn-coral-bicolor.jpg')
    }
    if (norm.includes('octospawn')) {
        return verifyImageExists('octospawn-coral.jpg') || verifyImageExists('frogspawn-coral-green.jpg')
    }
    if (norm.includes('frogspawn') || norm.includes('frogspan') || norm.includes('divisa')) {
        if (norm.includes('bicolor') || norm.includes('ponta roxa') || norm.includes('purple')) {
            return verifyImageExists('frogspawn-coral-bicolor.jpg') || verifyImageExists('frogspawn-coral-green.jpg')
        }
        return verifyImageExists('frogspawn-coral-green.jpg') || verifyImageExists('coral-frogspawn.jpg')
    }

    // Torch Coral
    if (norm.includes('torch') || norm.includes('glabrescens') || norm.includes('tocha')) {
        if (norm.includes('dragon soul')) {
            return verifyImageExists('torch-coral-dragon-soul.jpg')
        }
        if (norm.includes('24k') || norm.includes('24 k') || norm.includes('gold') || norm.includes('dourad') || norm.includes('ouro')) {
            return verifyImageExists('torch-coral-24k-gold.jpg') || verifyImageExists('torch-coral-gold.jpg')
        }
        if (norm.includes('black') || norm.includes('negro') || norm.includes('preto')) {
            return verifyImageExists('torch-coral-black-torch.jpg')
        }
        if (norm.includes('green tip') || norm.includes('ponta verde')) {
            return verifyImageExists('torch-coral-green-tip.jpg')
        }
        return verifyImageExists('torch-coral-dragon-soul.jpg') || verifyImageExists('coral-torch.jpg')
    }

    // Montiporas
    if (norm.includes('montipora')) {
        if (norm.includes('forest fire')) return verifyImageExists('montipora-digitata-forest-fire.jpg')
        if (norm.includes('sunset')) return verifyImageExists('montipora-sunset.jpg')
        if (norm.includes('spongodes')) return verifyImageExists('montipora-spongodes.jpg')
        if (norm.includes('cap') || norm.includes('prato') || norm.includes('capricornis')) return verifyImageExists('montipora-cap.jpg')
        if (norm.includes('digitata')) {
            if (norm.includes('laranj') || norm.includes('orange')) return verifyImageExists('montipora-digitata-orange.jpg')
            if (norm.includes('verd') || norm.includes('green')) return verifyImageExists('montipora-digitata-green.jpg')
            return verifyImageExists('montipora-digitata-forest-fire.jpg')
        }
        return verifyImageExists('montipora-cap.jpg') || verifyImageExists('montipora-spongodes.jpg')
    }

    // Outros LPS / SPS
    if (norm.includes('stylophora') || norm.includes('milka')) {
        return verifyImageExists('stylophora-milka.jpg')
    }
    if (norm.includes('chalice') || norm.includes('hollywood stunner')) {
        if (norm.includes('miami hurricane')) return verifyImageExists('chalice-coral-miami-hurricane.jpg')
        return verifyImageExists('chalice-coral-hollywood-stunner.jpg')
    }
    if (norm.includes('favia') || norm.includes('war coral')) {
        return verifyImageExists('favia-war-coral.jpg')
    }
    if (norm.includes('trumpet') || norm.includes('caulastrea')) {
        if (norm.includes('blue') || norm.includes('azul')) return verifyImageExists('trumpet-blue.jpg')
        return verifyImageExists('trumpet-bicolor.jpg')
    }
    if (norm.includes('duncan') || norm.includes('duncanopsammia')) {
        return verifyImageExists('duncan-coral.jpg')
    }

    if (norm.includes('cinnamon') || norm.includes('zoanthus grandis')) {
        return null
    }

    // 8. Peixes de Água Doce
    // Kinguios
    if (norm.includes('kinguio') || norm.includes('goldfish') || norm.includes('peixe dourado')) {
        if (norm.includes('cometa')) return verifyImageExists('kinguio-cometa.jpg')
        if (norm.includes('oranda')) return verifyImageExists('kinguio-oranda.jpg')
        if (norm.includes('telescop')) return verifyImageExists('kinguio-telescopio.jpg')
        if (norm.includes('ranchu') || norm.includes('lionhead') || norm.includes('cabeca de leao')) return verifyImageExists('kinguio-ranchu.jpg')
        if (norm.includes('perola') || norm.includes('pearlscale')) return verifyImageExists('kinguio-perola.jpg')
        return verifyImageExists('kinguio-cometa.jpg')
    }

    // Tetras
    if (norm.includes('cardinal') || norm.includes('axelrodi')) {
        return verifyImageExists('tetra-neon-cardinal.jpg')
    }
    if (norm.includes('neon negro') || norm.includes('black neon')) {
        return verifyImageExists('tetra-neon-negro.jpg')
    }
    if (norm.includes('neon verde') || norm.includes('green neon') || norm.includes('simulans')) {
        return verifyImageExists('tetra-neon-verde.jpg')
    }
    if (norm.includes('innesi') || norm.includes('neon verdadeiro') || (norm.includes('neon') && !norm.includes('goby') && !norm.includes('tetra'))) {
        return verifyImageExists('tetra-neon-innesi.jpg')
    }
    if (norm.includes('mato grosso') || norm.includes('eques')) {
        return verifyImageExists('tetra-mato-grosso.jpg')
    }
    if (norm.includes('tetra negro') || norm.includes('black skirt') || norm.includes('ternetzi')) {
        return verifyImageExists('tetra-negro.jpg')
    }
    if (norm.includes('tetra fogo') || norm.includes('foguinho') || norm.includes('amandae')) {
        return verifyImageExists('tetra-fogo.jpg')
    }
    if (norm.includes('glowlight') || norm.includes('erythrozonus')) {
        return verifyImageExists('tetra-glowlight.jpg')
    }
    if (norm.includes('tetra imperador') || norm.includes('palmeri')) {
        return verifyImageExists('tetra-imperador.jpg')
    }
    if (norm.includes('tetra limao') || norm.includes('pulchripinnis')) {
        return verifyImageExists('tetra-limao.jpg')
    }
    if (norm.includes('fantasma negro') || norm.includes('megalopterus')) {
        return verifyImageExists('tetra-fantasma-negro.jpg')
    }
    if (norm.includes('fantasma vermelho') || norm.includes('sweglesi') || norm.includes('rosaceo') || norm.includes('rosy tetra')) {
        return verifyImageExists('tetra-fantasma-vermelho.jpg')
    }
    if (norm.includes('pristela') || norm.includes('pristella')) {
        return verifyImageExists('tetra-pristela.jpg')
    }
    if (norm.includes('olho de fogo') || norm.includes('ocellifer')) {
        return verifyImageExists('tetra-olho-de-fogo.jpg')
    }
    if (norm.includes('tetra cobre') || norm.includes('hasemania nana')) {
        return verifyImageExists('tetra-cobre.jpg')
    }
    if (norm.includes('buenos aires') || norm.includes('anisitsi')) {
        return verifyImageExists('tetra-buenos-aires.jpg')
    }
    if (norm.includes('tetra congo') || norm.includes('phenacogrammus')) {
        return verifyImageExists('tetra-congo.jpg')
    }
    if (norm.includes('diamante') || norm.includes('pittieri')) {
        return verifyImageExists('tetra-diamante.jpg')
    }

    // Coridoras
    if (norm.includes('coridora') || norm.includes('corydora') || norm.includes('corydoras')) {
        if (norm.includes('sterbai')) return verifyImageExists('coridora-sterbai.jpg')
        if (norm.includes('aeneus') || norm.includes('bronze') || norm.includes('albina')) return verifyImageExists('coridora-aeneus.jpg')
        if (norm.includes('paleatus') || norm.includes('marmorada')) return verifyImageExists('coridora-paleatus.jpg')
        if (norm.includes('panda')) return verifyImageExists('coridora-panda.jpg')
        if (norm.includes('julii') || norm.includes('juli')) return verifyImageExists('coridora-julii.jpg')
        if (norm.includes('adolfoi')) return verifyImageExists('coridora-adolfoi.jpg')
        if (norm.includes('duplicareus')) return verifyImageExists('coridora-duplicareus.jpg')
        if (norm.includes('elegans')) return verifyImageExists('coridora-elegans.jpg')
        if (norm.includes('melini')) return verifyImageExists('coridora-melini.jpg')
        if (norm.includes('metae')) return verifyImageExists('coridora-metae.jpg')
        if (norm.includes('similis')) return verifyImageExists('coridora-similis.jpg')
        if (norm.includes('arqueada') || norm.includes('arcuatus')) return verifyImageExists('coridora-arqueada.jpg')
        if (norm.includes('pygmaeus') || norm.includes('pigmeu')) return verifyImageExists('coridora-ana-pygmaeus.jpg')
        if (norm.includes('habrosus')) return verifyImageExists('coridora-ana-habrosus.jpg')
        if (norm.includes('hastatus')) return verifyImageExists('coridora-ana-hastatus.jpg')
        return verifyImageExists('coridora-sterbai.jpg') || verifyImageExists('coridora-aeneus.jpg')
    }

    // Danios / Paulistinhas
    if (norm.includes('paulistinha') || norm.includes('danio rerio') || norm.includes('glofish')) {
        return verifyImageExists('danio-rerio.jpg')
    }

    // Bettas
    if (norm.includes('betta')) {
        return verifyImageExists('betta-splendens.jpg')
    }

    // Platies, Espadas & Molinésias
    if (norm.includes('platy') || norm.includes('plati')) {
        if (norm.includes('variatus') || norm.includes('arco-iris') || norm.includes('rainbow')) {
            return verifyImageExists('platy-variatus-arco-iris.jpg')
        }
        return verifyImageExists('platy.jpg')
    }
    if (norm.includes('espada') || norm.includes('hellerii')) {
        return verifyImageExists('espada-verde-selvagem.jpg')
    }
    if (norm.includes('molinesia') || norm.includes('molly') || norm.includes('velifera') || norm.includes('latipinna')) {
        return verifyImageExists('molinesia-velifera.jpg')
    }

    // Colisas e Tricogasters
    if (norm.includes('colisa')) {
        if (norm.includes('chuna') || norm.includes('mel')) return verifyImageExists('colisa-chuna.jpg')
        if (norm.includes('fasciata')) return verifyImageExists('colisa-fasciata.jpg')
        return verifyImageExists('colisa-lalia.jpg')
    }
    if (norm.includes('tricogaster') || norm.includes('trichogaster') || norm.includes('trichopodus')) {
        if (norm.includes('leeri') || norm.includes('perola')) return verifyImageExists('tricogaster-leeri.jpg')
        if (norm.includes('beijador') || norm.includes('temminckii')) return verifyImageExists('tricogaster-beijador.jpg')
        return verifyImageExists('tricogaster-azul.jpg')
    }

    // Ciclídeos / Acarás / Discos / Oscars / Ramirezis
    if (norm.includes('disco') || norm.includes('discus')) {
        return verifyImageExists('acara-disco.jpg')
    }
    if (norm.includes('oscar') || norm.includes('astronotus')) {
        if (norm.includes('bronze')) return verifyImageExists('peixe-oscar-bronze.jpg')
        return verifyImageExists('peixe-oscar-tigre.jpg')
    }
    if (norm.includes('ramirezi') || norm.includes('mikrogeophagus')) {
        if (norm.includes('boliviano') || norm.includes('altispinosus')) return verifyImageExists('ramirezi-boliviano.jpg')
        return verifyImageExists('ramirezi-comum-alemao.jpg')
    }
    if (norm.includes('geophagus')) {
        if (norm.includes('sveni')) return verifyImageExists('acara-geophagus-sveni.jpg')
        if (norm.includes('surinamensis')) return verifyImageExists('acara-geophagus-surinamensis.jpg')
        return verifyImageExists('acara-geophagus-brasiliensis.jpg')
    }

    // Limpadores / Invertebrados
    if (norm.includes('otocinclus') || norm.includes('limpa vidro') || norm.includes('limpa-vidro')) {
        if (norm.includes('cocama')) return verifyImageExists('otocinclus-cocama.jpg')
        return verifyImageExists('otocinclus-comum.jpg')
    }
    if (norm.includes('neritina')) {
        if (norm.includes('zebra')) return verifyImageExists('caracol-neritina-zebra.jpg')
        if (norm.includes('red onion') || norm.includes('cebola')) return verifyImageExists('caracol-neritina-red-onion.jpg')
        if (norm.includes('sun') || norm.includes('solar')) return verifyImageExists('caracol-neritina-sun.jpg')
        if (norm.includes('black helmet') || norm.includes('capacete')) return verifyImageExists('caracol-neritina-black-helmet.jpg')
        if (norm.includes('punctata')) return verifyImageExists('caracol-neritina-punctata.jpg')
        return verifyImageExists('caracol-neritina-zebra.jpg')
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
