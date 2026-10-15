package com.hyvalker.storemanagementapi.model;

public enum SubCategory {
    CORAL("Corais & Anêmonas"),
    MARINE_FISH("Peixes Marinhos"),
    FRESHWATER_FISH("Peixes de Água Doce"),
    MARINE_INVERTEBRATE("Invertebrados Marinhos"),
    FRESHWATER_INVERTEBRATE("Invertebrados de Água Doce"),
    INVERTEBRATE("Invertebrados & Equipe de Limpeza"),
    PLANT("Plantas Aquáticas"),
    OTHER_LIVING("Outros Seres Vivos"),
    EQUIPMENT("Equipamentos"),
    SUPPLY("Suprimentos & Alimentos"),
    OTHER_PRODUCT("Outros Produtos");

    private final String description;

    SubCategory(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
