/**
 * Utilitários para normalização e busca inteligente no catálogo e sistema.
 * 
 * Permite buscar produtos ignorando acentos (ex: leao -> leão, tubarao -> tubarão),
 * hífens como espaços (ex: "peixe palhaço" -> "Peixe-palhaço") e buscas multitermo
 * sem perder a precisão.
 */

/**
 * Normaliza uma string:
 * - Remove acentos e diacríticos (ã -> a, é -> e, ç -> c)
 * - Converte hífens, sublinhados e barras em espaços
 * - Normaliza para minúsculas e remove espaços extras
 */
export function normalizeSearchTerm(str: string): string {
    if (!str) return ''
    return str
        .normalize('NFD') // Decompõe caracteres em caractere base + diacrítico
        .replace(/[\u0300-\u036f]/g, '') // Remove todos os diacríticos
        .toLowerCase()
        .replace(/[-_/]/g, ' ') // Converte hífens e separadores em espaço
        .replace(/\s+/g, ' ') // Reduz múltiplos espaços a um único espaço
        .trim()
}

/**
 * Avalia se o texto alvo corresponde à pesquisa digitada.
 * - Suporta busca multitermo: se o usuário digitar "peixe palhaco",
 *   ambas as palavras ("peixe" E "palhaco") precisam estar presentes no texto.
 * - Suporta campo adicional (como código de barras).
 */
export function matchesSearch(
    targetText: string,
    query: string,
    additionalField?: string | null
): boolean {
    if (!query || !query.trim()) return true

    const normalizedQuery = normalizeSearchTerm(query)
    if (!normalizedQuery) return true

    // Se houver campo adicional (código de barras) e corresponder diretamente
    if (additionalField) {
        const normalizedField = normalizeSearchTerm(additionalField)
        if (normalizedField.includes(normalizedQuery)) {
            return true
        }
    }

    const normalizedTarget = normalizeSearchTerm(targetText)
    const queryTerms = normalizedQuery.split(' ').filter(Boolean)

    // Todas as palavras da busca precisam estar contidas no texto alvo
    return queryTerms.every((term) => normalizedTarget.includes(term))
}
