package com.hyvalker.storemanagementapi.service;

import com.hyvalker.storemanagementapi.model.SubCategory;
import com.hyvalker.storemanagementapi.model.Type;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.assertj.core.api.Assertions.assertThat;

class TaxonomyClassifierServiceTest {

    private TaxonomyClassifierService classifierService;

    @BeforeEach
    void setUp() {
        classifierService = new TaxonomyClassifierService();
    }

    // ==========================================
    // CLASSIFICAÇÃO DE SERES VIVOS (LIVING)
    // ==========================================

    @Test
    @DisplayName("Deve classificar Corais e Anêmonas corretamente")
    void shouldClassifyCoralsCorrectly() {
        assertThat(classifierService.classifySubCategory("Coral Hammer Gold", Type.LIVING)).isEqualTo(SubCategory.CORAL);
        assertThat(classifierService.classifySubCategory("Torch Dragon Soul", Type.LIVING)).isEqualTo(SubCategory.CORAL);
        assertThat(classifierService.classifySubCategory("Frogspawn Bicolor (Euphyllia)", Type.LIVING)).isEqualTo(SubCategory.CORAL);
        assertThat(classifierService.classifySubCategory("Muda Zoanthus Utter Chaos", Type.LIVING)).isEqualTo(SubCategory.CORAL);
        assertThat(classifierService.classifySubCategory("Anêmona Bubble Tip Rose", Type.LIVING)).isEqualTo(SubCategory.CORAL);
        assertThat(classifierService.classifySubCategory("Acropora Millepora Green", Type.LIVING)).isEqualTo(SubCategory.CORAL);
        assertThat(classifierService.classifySubCategory("Mushroom Ricordea Florida", Type.LIVING)).isEqualTo(SubCategory.CORAL);
    }

    @Test
    @DisplayName("Deve classificar Peixes Marinhos corretamente")
    void shouldClassifyMarineFishCorrectly() {
        assertThat(classifierService.classifySubCategory("Peixe-Palhaço (Amphiprion ocellaris)", Type.LIVING)).isEqualTo(SubCategory.MARINE_FISH);
        assertThat(classifierService.classifySubCategory("Palhaço Ocellaris Storm Black", Type.LIVING)).isEqualTo(SubCategory.MARINE_FISH);
        assertThat(classifierService.classifySubCategory("Yellow Tang (Zebrasoma flavescens)", Type.LIVING)).isEqualTo(SubCategory.MARINE_FISH);
        assertThat(classifierService.classifySubCategory("Blue Tang (Paracanthurus hepatus)", Type.LIVING)).isEqualTo(SubCategory.MARINE_FISH);
        assertThat(classifierService.classifySubCategory("Gramma Loreto", Type.LIVING)).isEqualTo(SubCategory.MARINE_FISH);
        assertThat(classifierService.classifySubCategory("Peixe-Leão (Pterois volitans)", Type.LIVING)).isEqualTo(SubCategory.MARINE_FISH);
        assertThat(classifierService.classifySubCategory("Flame Angel (Centropyge loricula)", Type.LIVING)).isEqualTo(SubCategory.MARINE_FISH);
        assertThat(classifierService.classifySubCategory("Blenio Midas", Type.LIVING)).isEqualTo(SubCategory.MARINE_FISH);
    }

    @Test
    @DisplayName("Deve classificar Peixes de Água Doce corretamente")
    void shouldClassifyFreshwaterFishCorrectly() {
        assertThat(classifierService.classifySubCategory("Tetra Neon Cardinal (Paracheirodon axelrodi)", Type.LIVING)).isEqualTo(SubCategory.FRESHWATER_FISH);
        assertThat(classifierService.classifySubCategory("Acará Disco Blue Diamond", Type.LIVING)).isEqualTo(SubCategory.FRESHWATER_FISH);
        assertThat(classifierService.classifySubCategory("Betta Splendens Halfmoon", Type.LIVING)).isEqualTo(SubCategory.FRESHWATER_FISH);
        assertThat(classifierService.classifySubCategory("Corydora Sterbai", Type.LIVING)).isEqualTo(SubCategory.FRESHWATER_FISH);
        assertThat(classifierService.classifySubCategory("Platy Variatus Red", Type.LIVING)).isEqualTo(SubCategory.FRESHWATER_FISH);
        assertThat(classifierService.classifySubCategory("Rodóstomo (Hemigrammus)", Type.LIVING)).isEqualTo(SubCategory.FRESHWATER_FISH);
        assertThat(classifierService.classifySubCategory("Guppy Moscow Blue", Type.LIVING)).isEqualTo(SubCategory.FRESHWATER_FISH);
        assertThat(classifierService.classifySubCategory("Cascudo Ancistrus Red", Type.LIVING)).isEqualTo(SubCategory.FRESHWATER_FISH);
    }

    @Test
    @DisplayName("Deve classificar Invertebrados e Equipe de Limpeza corretamente")
    void shouldClassifyInvertebratesCorrectly() {
        assertThat(classifierService.classifySubCategory("Camarão Bailarino (Lysmata wurdemanni)", Type.LIVING)).isEqualTo(SubCategory.INVERTEBRATE);
        assertThat(classifierService.classifySubCategory("Stenopus hispidus", Type.LIVING)).isEqualTo(SubCategory.INVERTEBRATE);
        assertThat(classifierService.classifySubCategory("Paguro Patas Azuis (Clibanarius tricolor)", Type.LIVING)).isEqualTo(SubCategory.INVERTEBRATE);
        assertThat(classifierService.classifySubCategory("Turbo Snail", Type.LIVING)).isEqualTo(SubCategory.INVERTEBRATE);
        assertThat(classifierService.classifySubCategory("Neritina Zebra", Type.LIVING)).isEqualTo(SubCategory.INVERTEBRATE);
        assertThat(classifierService.classifySubCategory("Estrela do Mar Vermelha", Type.LIVING)).isEqualTo(SubCategory.INVERTEBRATE);
    }

    @Test
    @DisplayName("Deve classificar Plantas Aquáticas corretamente")
    void shouldClassifyPlantsCorrectly() {
        assertThat(classifierService.classifySubCategory("Anúbia Nana", Type.LIVING)).isEqualTo(SubCategory.PLANT);
        assertThat(classifierService.classifySubCategory("Valisnéria Gigantea", Type.LIVING)).isEqualTo(SubCategory.PLANT);
        assertThat(classifierService.classifySubCategory("Musgo de Java", Type.LIVING)).isEqualTo(SubCategory.PLANT);
        assertThat(classifierService.classifySubCategory("Bucephalandra Wavy Green", Type.LIVING)).isEqualTo(SubCategory.PLANT);
    }

    // ==========================================
    // CLASSIFICAÇÃO DE PRODUTOS (PRODUCT)
    // ==========================================

    @Test
    @DisplayName("Deve classificar Equipamentos corretamente")
    void shouldClassifyEquipmentCorrectly() {
        assertThat(classifierService.classifySubCategory("Skimmer Curve 5", Type.PRODUCT)).isEqualTo(SubCategory.EQUIPMENT);
        assertThat(classifierService.classifySubCategory("Filtro Hang On HF-400", Type.PRODUCT)).isEqualTo(SubCategory.EQUIPMENT);
        assertThat(classifierService.classifySubCategory("Filtro Canister Atman", Type.PRODUCT)).isEqualTo(SubCategory.EQUIPMENT);
        assertThat(classifierService.classifySubCategory("Termostato 100W com Aquecedor", Type.PRODUCT)).isEqualTo(SubCategory.EQUIPMENT);
        assertThat(classifierService.classifySubCategory("Bomba Wave Maker Jebao", Type.PRODUCT)).isEqualTo(SubCategory.EQUIPMENT);
        assertThat(classifierService.classifySubCategory("Luminária LED Marinho 60cm", Type.PRODUCT)).isEqualTo(SubCategory.EQUIPMENT);
        assertThat(classifierService.classifySubCategory("Refratômetro Óptico de Salinidade", Type.PRODUCT)).isEqualTo(SubCategory.EQUIPMENT);
    }

    @Test
    @DisplayName("Deve classificar Suprimentos e Alimentos corretamente")
    void shouldClassifySuppliesCorrectly() {
        assertThat(classifierService.classifySubCategory("Ração Tropical Discus Gran", Type.PRODUCT)).isEqualTo(SubCategory.SUPPLY);
        assertThat(classifierService.classifySubCategory("Sal Sintético Red Sea Coral Pro", Type.PRODUCT)).isEqualTo(SubCategory.SUPPLY);
        assertThat(classifierService.classifySubCategory("Teste de pH e Reserva Alcalina", Type.PRODUCT)).isEqualTo(SubCategory.SUPPLY);
        assertThat(classifierService.classifySubCategory("Condicionador Seachem Prime 250ml", Type.PRODUCT)).isEqualTo(SubCategory.SUPPLY);
        assertThat(classifierService.classifySubCategory("Bactérias Nitrificantes Stability", Type.PRODUCT)).isEqualTo(SubCategory.SUPPLY);
        assertThat(classifierService.classifySubCategory("Carvão Ativado Purigen", Type.PRODUCT)).isEqualTo(SubCategory.SUPPLY);
    }

    // ==========================================
    // RESOLUÇÃO DE IMAGENS E MORFOS
    // ==========================================

    @ParameterizedTest
    @CsvSource({
            "'Palhaço Ocellaris Storm Black', 'peixe-palhaco-storm-black.jpg'",
            "'Peixe Palhaço Snowflake', 'peixe-palhaco-snowflake.jpg'",
            "'Palhaço Picasso Bicolor', 'peixe-palhaco-picasso.jpg'",
            "'Peixe Palhaço Ocellaris', 'peixe-palhaco-ocellaris.jpg'",
            "'Yellow Tang Flavescens', 'yellow-tang.jpg'",
            "'Blue Tang Hepatus', 'blue-tang.jpg'",
            "'Peixe Leão Volitans', 'peixe-leao.jpg'",
            "'Coral Hammer Gold', 'coral-hammer.jpg'",
            "'Coral Frogspawn Verde', 'coral-frogspawn.jpg'",
            "'Coral Torch Dragon', 'coral-torch.jpg'",
            "'Camarão Bailarino', 'camarao-bailarino.jpg'",
            "'Tetra Neon Cardinal', 'tetra-neon.jpg'",
            "'Acará Disco Diamante', 'acara-disco.jpg'",
            "'Corydora Sterbai', 'corydora-sterbai.jpg'",
            "'Betta Splendens', 'betta-splendens.jpg'",
            "'Platy Sunset', 'platy.jpg'"
    })
    @DisplayName("Deve resolver o slug de imagem ideal para nomes e variações específicas")
    void shouldResolveImageSlugCorrectly(String productName, String expectedSlug) {
        SubCategory subCategory = classifierService.classifySubCategory(productName, Type.LIVING);
        String resolvedSlug = classifierService.resolveImageSlug(productName, subCategory);

        assertThat(resolvedSlug).isEqualTo(expectedSlug);
    }

    @Test
    @DisplayName("Deve lidar com nomes nulos, vazios ou desconhecidos com segurança")
    void shouldHandleNullAndUnknownSafely() {
        assertThat(classifierService.classifySubCategory(null, Type.LIVING)).isEqualTo(SubCategory.OTHER_LIVING);
        assertThat(classifierService.classifySubCategory("", Type.PRODUCT)).isEqualTo(SubCategory.OTHER_PRODUCT);
        assertThat(classifierService.classifySubCategory("Item Desconhecido XYZ", Type.LIVING)).isEqualTo(SubCategory.OTHER_LIVING);
        assertThat(classifierService.classifySubCategory("Item Desconhecido XYZ", Type.PRODUCT)).isEqualTo(SubCategory.OTHER_PRODUCT);

        assertThat(classifierService.resolveImageSlug(null, SubCategory.CORAL)).isEqualTo("coral-hammer.jpg");
        assertThat(classifierService.resolveImageSlug(null, SubCategory.MARINE_FISH)).isEqualTo("peixe-palhaco-ocellaris.jpg");
    }
}
