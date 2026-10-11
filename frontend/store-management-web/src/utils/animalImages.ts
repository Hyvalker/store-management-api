export function getAnimalImage(productName: string): string {
    const norm = productName.toLowerCase()

    if (norm.includes('palhaço') || norm.includes('ocellaris') || norm.includes('palhaco')) {
        return '/images/animals/peixe-palhaco-ocellaris.jpg'
    }
    if (norm.includes('leão') || norm.includes('leao') || norm.includes('volitans')) {
        return '/images/animals/peixe-leao.jpg'
    }
    if (norm.includes('blue tang') || norm.includes('hepatus')) {
        return '/images/animals/blue-tang.jpg'
    }
    if (norm.includes('yellow tang') || norm.includes('flavescens')) {
        return '/images/animals/yellow-tang.jpg'
    }
    if (norm.includes('gramma') || norm.includes('loreto')) {
        return '/images/animals/gramma-loreto.jpg'
    }
    if (norm.includes('platy')) {
        return '/images/animals/platy.jpg'
    }
    if (norm.includes('betta')) {
        return '/images/animals/betta-splendens.jpg'
    }
    if (norm.includes('neon') || norm.includes('axelrodi')) {
        return '/images/animals/tetra-neon.jpg'
    }
    if (norm.includes('disco') || norm.includes('discus')) {
        return '/images/animals/acara-disco.jpg'
    }
    if (norm.includes('corydora') || norm.includes('sterbai')) {
        return '/images/animals/corydora-sterbai.jpg'
    }
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
    if (norm.includes('bailarino') || norm.includes('camarão') || norm.includes('camarao')) {
        return '/images/animals/camarao-bailarino.jpg'
    }

    // Default clean ocean fallback
    return '/images/animals/peixe-palhaco-ocellaris.jpg'
}
