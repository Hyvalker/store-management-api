package com.hyvalker.storemanagementapi.service;

import com.hyvalker.storemanagementapi.model.SubCategory;
import com.hyvalker.storemanagementapi.model.Type;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

/**
 * Serviço de inteligência taxonômica e classificação automática de produtos e seres vivos.
 * Identifica a subcategoria e o melhor slug de imagem representativa com base no nome
 * popular ou científico do item, sem exigir esforço extra do operador de caixa/loja.
 */
@Service
public class TaxonomyClassifierService {

    private static final List<String> CORAL_KEYWORDS = Arrays.asList(
            "coral", "hammer", "torch", "frogspawn", "zoanthus", "zoanthid", "acropora", "montipora",
            "millepora", "chalice", "favia", "favites", "duncan", "duncanopsammia", "goniopora",
            "alveopora", "ricordea", "mush", "mushroom", "rhodactis", "discosoma", "leather",
            "sarcophyton", "lobophytum", "sinularia", "kenya tree", "capnella", "blastomussa",
            "acanthastrea", "acan lord", "micromussa", "euphyllia", "bubble coral", "plerogyra", "catalaphyllia",
            "elegance coral", "sun coral", "tubastraea", "anemona", "anemone", "bubble tip",
            "bbt", "passiflora", "condylactis", "carpet", "haddoni", "carpet anemone"
    );

    private static final List<String> INVERTEBRATE_KEYWORDS = Arrays.asList(
            "camarao", "bailarino", "stenopus", "pistola", "pepino", "estrela", "ofiuro",
            "ourico", "paguro", "ermitao", "caracol", "snail", "turbo snail", "neritina",
            "ampularia", "clibanarius", "calcinus", "lysmata", "alpheus", "mithrax",
            "caranguejo", "tridacna", "polvo", "cleaner shrimp", "camarao-bailarino"
    );

    private static final List<String> MARINE_FISH_KEYWORDS = Arrays.asList(
            "palhaco", "palhacinho", "ocellaris", "percula", "maroon", "premnas", "clownfish",
            "tang", "cirurgiao", "hepatus", "blue tang", "yellow tang", "sailfin", "naso",
            "sohal", "achilles", "kole", "scopas", "desjardini", "leao", "volitans", "dendrochirus",
            "lionfish", "gramma", "loreto", "anjo", "imperador", "flame angel", "centropyge",
            "french angel", "queen angel", "pomacanthus", "blenio", "blenny", "salarias", "midas",
            "bicolor", "goby", "gobio", "watchman", "cryptocentrus", "firefish", "nemateleotris",
            "magnifica", "dartfish", "wrasse", "halichoeres", "pseudocheilinus", "melanurus",
            "sixline", "anthias", "pseudanthias", "mandarim", "synchiropus", "borboleta",
            "copperband", "chelmon", "chaetodon", "cardinal pijama", "banggai", "pterapogon",
            "kauderni", "foxface", "siganus", "damselfish", "donzela", "chromis", "green chromis",
            "boxfish", "peixe cofre", "canthigaster", "baiacu", "moreia", "moray", "echidna"
    );

    private static final List<String> PLANT_KEYWORDS = Arrays.asList(
            "planta", "anubia", "valisneria", "vallisneria", "elodea", "higrofila", "hygrophila",
            "musgo", "java moss", "bucephalandra", "eleocharis", "amazonense", "echinodorus",
            "cryptocoryne", "ludwigia", "cabomba", "ninfeia", "nymphaea", "microsorum",
            "samambaia", "glossostigma", "monte carlo"
    );

    private static final List<String> FRESHWATER_FISH_KEYWORDS = Arrays.asList(
            "tetra", "neon", "cardinal", "rodostomo", "mato grosso", "paulistinha", "danio",
            "glowlight", "phantom", "betta", "disco", "discus", "symphysodon", "acara",
            "bandeira", "pterophyllum", "corydora", "coridora", "sterbai", "paleatus", "aeneus",
            "cascudo", "pleco", "hypostomus", "ancistrus", "otocinclus", "oto", "guppy",
            "lebiste", "platy", "espada", "molinesia", "molly", "ciclideo", "ramirezi",
            "kribensis", "colisa", "tricogaster", "oscar", "astronotus", "frontosa",
            "aulonocara", "labidochromis", "yellow prince", "zebra", "barbo", "sumatra",
            "conchonius", "tuvira", "dourado", "kinguio", "carpa", "koi", "carassius",
            "mocinha", "peixe corda", "polypterus"
    );

    private static final List<String> EQUIPMENT_KEYWORDS = Arrays.asList(
            "skimmer", "filtro", "canister", "hang on", "termostato", "aquecedor", "bomba",
            "wave maker", "wavemaker", "recalque", "sb1000", "sb2000", "luminaria", "calha led",
            "led", "iluminacao", "refratometro", "densimetro", "termoregulador", "termometro",
            "deionizador", "osmose", "ro/di", "clarificador", "uv", "alimentador", "controlador",
            "co2", "cilindro", "difusor", "aquario", "beteira", "vidro"
    );

    private static final List<String> SUPPLY_KEYWORDS = Arrays.asList(
            "racao", "alimento", "flocos", "granulado", "spirulina", "artemia", "noris",
            "sal marinho", "sal sintetico", "teste", "reagente", "fita", "suplemento",
            "condicionador", "prime", "stability", "pristine", "stress coat", "aquasafe",
            "bacterias", "special blend", "thera p", "remedio", "medicamento", "ictio",
            "melafix", "pimafix", "alcon", "seachem", "carvao", "carvao ativado", "purigen",
            "ceramica", "midia", "siporax", "matrix", "substrato", "areia", "aragonita",
            "basalto", "fertilizante", "flourish", "tamponador", "buffer", "kh", "gh",
            "calcio", "magnesio"
    );

    /**
     * Classifica automaticamente a subcategoria com base no nome e no tipo base (LIVING ou PRODUCT).
     */
    public SubCategory classifySubCategory(String name, Type type) {
        if (type == null) {
            type = Type.LIVING;
        }

        if (name == null || name.isBlank()) {
            return type == Type.LIVING ? SubCategory.OTHER_LIVING : SubCategory.OTHER_PRODUCT;
        }

        String norm = normalize(name);

        if (type == Type.LIVING) {
            // 1. Corais & Anêmonas
            if (matchesAny(norm, CORAL_KEYWORDS)) {
                return SubCategory.CORAL;
            }

            // 2. Invertebrados / Equipe de Limpeza
            if (matchesAny(norm, INVERTEBRATE_KEYWORDS)) {
                return SubCategory.INVERTEBRATE;
            }

            // 3. Peixes Marinhos
            if (matchesAny(norm, MARINE_FISH_KEYWORDS)) {
                return SubCategory.MARINE_FISH;
            }

            // 4. Plantas Aquáticas
            if (matchesAny(norm, PLANT_KEYWORDS)) {
                return SubCategory.PLANT;
            }

            // 5. Peixes de Água Doce
            if (matchesAny(norm, FRESHWATER_FISH_KEYWORDS)) {
                return SubCategory.FRESHWATER_FISH;
            }

            // Dicas contextuais
            if (norm.contains("marinho") || norm.contains("marinha") || norm.contains("salgad")) {
                return SubCategory.MARINE_FISH;
            }
            if (norm.contains("doce") || norm.contains("plantad")) {
                return SubCategory.FRESHWATER_FISH;
            }

            return SubCategory.OTHER_LIVING;
        } else {
            // type == Type.PRODUCT
            if (matchesAny(norm, EQUIPMENT_KEYWORDS)) {
                return SubCategory.EQUIPMENT;
            }

            if (matchesAny(norm, SUPPLY_KEYWORDS)) {
                return SubCategory.SUPPLY;
            }

            return SubCategory.OTHER_PRODUCT;
        }
    }

    /**
     * Resolve o melhor slug de arquivo de imagem com base na especificidade do nome e subcategoria.
     * Suporta morfos e padrões especiais (ex: Storm Black, Snowflake, etc.).
     */
    public String resolveImageSlug(String name, SubCategory subCategory) {
        if (name == null || name.isBlank()) {
            return defaultImageFor(subCategory);
        }

        String norm = normalize(name);

        // 1. Morfos e variações específicas de Peixe-Palhaço
        if (norm.contains("storm") && (norm.contains("palhaco") || norm.contains("ocellaris"))) {
            return "peixe-palhaco-storm-black.jpg";
        }
        if (norm.contains("snowflake") && (norm.contains("palhaco") || norm.contains("ocellaris"))) {
            return "peixe-palhaco-snowflake.jpg";
        }
        if (norm.contains("picasso") && (norm.contains("palhaco") || norm.contains("ocellaris"))) {
            return "peixe-palhaco-picasso.jpg";
        }
        if (norm.contains("palhaco") || norm.contains("ocellaris") || norm.contains("clownfish")) {
            return "peixe-palhaco-ocellaris.jpg";
        }

        // 2. Espécies Marinhas clássicas
        if (norm.contains("yellow tang") || norm.contains("flavescens")) {
            return "yellow-tang.jpg";
        }
        if (norm.contains("blue tang") || norm.contains("hepatus")) {
            return "blue-tang.jpg";
        }
        if (norm.contains("leao") || norm.contains("volitans")) {
            return "peixe-leao.jpg";
        }
        if (norm.contains("gramma") || norm.contains("loreto")) {
            return "gramma-loreto.jpg";
        }

        // 3. Corais clássicos
        if (norm.contains("hammer")) {
            return "coral-hammer.jpg";
        }
        if (norm.contains("frogspawn")) {
            return "coral-frogspawn.jpg";
        }
        if (norm.contains("torch")) {
            return "coral-torch.jpg";
        }
        if (norm.contains("zoanthus")) {
            return "zoanthus.jpg";
        }

        // 4. Invertebrados
        if (norm.contains("bailarino") || norm.contains("camarao")) {
            return "camarao-bailarino.jpg";
        }

        // 5. Água Doce
        if (norm.contains("neon") || norm.contains("axelrodi") || norm.contains("cardinal")) {
            return "tetra-neon.jpg";
        }
        if (norm.contains("disco") || norm.contains("discus")) {
            return "acara-disco.jpg";
        }
        if (norm.contains("corydora") || norm.contains("sterbai")) {
            return "corydora-sterbai.jpg";
        }
        if (norm.contains("betta") || norm.contains("splendens")) {
            return "betta-splendens.jpg";
        }
        if (norm.contains("platy")) {
            return "platy.jpg";
        }

        return defaultImageFor(subCategory);
    }

    private String defaultImageFor(SubCategory subCategory) {
        if (subCategory == null) {
            return "peixe-palhaco-ocellaris.jpg";
        }
        return switch (subCategory) {
            case CORAL -> "coral-hammer.jpg";
            case INVERTEBRATE -> "camarao-bailarino.jpg";
            case FRESHWATER_FISH -> "tetra-neon.jpg";
            case MARINE_FISH, OTHER_LIVING -> "peixe-palhaco-ocellaris.jpg";
            default -> null;
        };
    }

    private boolean matchesAny(String text, List<String> keywords) {
        String padded = " " + text + " ";
        String[] words = text.split(" ");

        for (String keyword : keywords) {
            if (keyword.contains(" ")) {
                if (padded.contains(" " + keyword + " ") || text.contains(keyword)) {
                    return true;
                }
            } else {
                if (padded.contains(" " + keyword + " ")) {
                    return true;
                }
                if (keyword.length() >= 5) {
                    for (String word : words) {
                        if (word.startsWith(keyword) || (word.endsWith("s") && word.substring(0, word.length() - 1).equals(keyword))) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    private String normalize(String input) {
        if (input == null) return "";
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9\\s-]", " ")
                .replaceAll("\\s+", " ")
                .trim();
        return normalized;
    }
}
