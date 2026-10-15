// Catálogo Mestre de Espécies e Morfotipos para Aquarismo no Brasil
// Atualizado e auditado com padrão oficial: "Nome Popular (Nome científico)", sem barras ou aglomerações.
// Inclui morfos comerciais certificados (EcoReef, etc.) e sinônimos indexados para busca rápida.
import type { SubCategory } from '../types/product'

export interface MasterSpecies {
  id: string
  name: string
  commonName: string
  scientificName: string
  synonyms?: string[]
  type: 'LIVING'
  subCategory: SubCategory
  imageSlug: string
  section: string
  familyGroup: string
}

export const SPECIES_MASTER_CATALOG: MasterSpecies[] = [
  {
    "id": "1",
    "name": "Yellow Tang (Zebrasoma flavescens)",
    "commonName": "Yellow Tang",
    "scientificName": "Zebrasoma flavescens",
    "synonyms": [
      "Tang Amarelo",
      "yellow tang",
      "tang amarelo",
      "zebrasoma",
      "Yellow Tang (Zebrasoma flavescens)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "077_yellow_tang.webp",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões"
  },
  {
    "id": "2",
    "name": "Blue Tang (Paracanthurus hepatus)",
    "commonName": "Blue Tang",
    "scientificName": "Paracanthurus hepatus",
    "synonyms": [
      "Tang Hepatus",
      "Regal Tang",
      "hepatus",
      "blue tang",
      "dory",
      "paracanthurus",
      "Blue Tang / Hepatus (\"Dory\")"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "076_blue_tang_hepatus.webp",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões"
  },
  {
    "id": "3",
    "name": "Tang Desjardine (Zebrasoma desjardinii)",
    "commonName": "Tang Desjardine",
    "scientificName": "Zebrasoma desjardinii",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "tang-desjardine.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões"
  },
  {
    "id": "4",
    "name": "Tang Sailfin (Zebrasoma veliferum)",
    "commonName": "Tang Sailfin",
    "scientificName": "Zebrasoma veliferum",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "tang-sailfin.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões"
  },
  {
    "id": "5",
    "name": "Tang Scopas (Zebrasoma scopas)",
    "commonName": "Tang Scopas",
    "scientificName": "Zebrasoma scopas",
    "synonyms": [
      "sailfin tang",
      "desjardinii",
      "scopas tang",
      "Sailfin Tang / Scopas Tang"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "078_sailfin_scopas_tang.webp",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões"
  },
  {
    "id": "6",
    "name": "Purple Tang (Zebrasoma xanthurum)",
    "commonName": "Purple Tang",
    "scientificName": "Zebrasoma xanthurum",
    "synonyms": [
      "Tang Purple",
      "Roxo"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "tang-purple.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões"
  },
  {
    "id": "7",
    "name": "Gem Tang (Zebrasoma gemmatum)",
    "commonName": "Gem Tang",
    "scientificName": "Zebrasoma gemmatum",
    "synonyms": [
      "Tang Gem",
      "Gemmatum"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "tang-gem.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões"
  },
  {
    "id": "8",
    "name": "Powder Blue Tang (Acanthurus leucosternon)",
    "commonName": "Powder Blue Tang",
    "scientificName": "Acanthurus leucosternon",
    "synonyms": [
      "Tang Powder Blue",
      "Azul Pó",
      "powder blue",
      "leucosternon",
      "naso tang",
      "Powder Blue Tang / Naso Tang"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "079_powder_blue_naso_tang.webp",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões"
  },
  {
    "id": "9",
    "name": "Tang Powder Brown (Acanthurus japonicus)",
    "commonName": "Tang Powder Brown",
    "scientificName": "Acanthurus japonicus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "tang-powder-brown.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões"
  },
  {
    "id": "10",
    "name": "Tang Achilles (Acanthurus achilles)",
    "commonName": "Tang Achilles",
    "scientificName": "Acanthurus achilles",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "tang-achilles.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões"
  },
  {
    "id": "11",
    "name": "Tang Convict (Acanthurus triostegus)",
    "commonName": "Tang Convict",
    "scientificName": "Acanthurus triostegus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "tang-convict.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões"
  },
  {
    "id": "12",
    "name": "Cirurgião Bahiano (Acanthurus bahianus)",
    "commonName": "Cirurgião Bahiano",
    "scientificName": "Acanthurus bahianus",
    "synonyms": [
      "Tang Bahianus"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "tang-bahianus.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões"
  },
  {
    "id": "13",
    "name": "Tang Cirurgião Azul Nacional (Acanthurus coeruleus)",
    "commonName": "Tang Cirurgião Azul Nacional",
    "scientificName": "Acanthurus coeruleus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "tang-cirurgiao-azul-nacional.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões"
  },
  {
    "id": "14",
    "name": "Tang Yellow Mimic Chocolate (Acanthurus pyroferus)",
    "commonName": "Tang Yellow Mimic Chocolate",
    "scientificName": "Acanthurus pyroferus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "tang-yellow-mimic-chocolate.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões"
  },
  {
    "id": "15",
    "name": "Blonde Naso Tang (Naso elegans)",
    "commonName": "Blonde Naso Tang",
    "scientificName": "Naso elegans",
    "synonyms": [
      "Tang Naso Elegans",
      "Blonde Naso"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "tang-naso-elegans.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões"
  },
  {
    "id": "16",
    "name": "Tang Naso Lituratus (Naso lituratus)",
    "commonName": "Tang Naso Lituratus",
    "scientificName": "Naso lituratus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "tang-naso-lituratus.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões"
  },
  {
    "id": "17",
    "name": "Vlamingi Tang (Naso vlamingii)",
    "commonName": "Vlamingi Tang",
    "scientificName": "Naso vlamingii",
    "synonyms": [
      "Tang Naso Vlamingi",
      "Blue Spotted"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "tang-naso-vlamingi.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões"
  },
  {
    "id": "18",
    "name": "Tang Bristletooth Tomini (Ctenochaetus tominiensis)",
    "commonName": "Tang Bristletooth Tomini",
    "scientificName": "Ctenochaetus tominiensis",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "tang-bristletooth-tomini.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões"
  },
  {
    "id": "19",
    "name": "Tang Bristletooth Kole (Ctenochaetus strigosus)",
    "commonName": "Tang Bristletooth Kole",
    "scientificName": "Ctenochaetus strigosus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "tang-bristletooth-kole.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões"
  },
  {
    "id": "20",
    "name": "Tang Two Spot Bristletooth (Ctenochaetus binotatus)",
    "commonName": "Tang Two Spot Bristletooth",
    "scientificName": "Ctenochaetus binotatus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "tang-two-spot-bristletooth.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões"
  },
  {
    "id": "21",
    "name": "Tang Chevron (Ctenochaetus hawaiiensis)",
    "commonName": "Tang Chevron",
    "scientificName": "Ctenochaetus hawaiiensis",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "tang-chevron.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões"
  },
  {
    "id": "22",
    "name": "Palhaço Ocellaris Comum (Amphiprion ocellaris)",
    "commonName": "Palhaço Ocellaris Comum",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Palhaço Comum",
      "Peixe Palhaço",
      "Nemo",
      "ocellaris",
      "peixe palhaco",
      "nemo",
      "percula",
      "Ocellaris Comum (Peixe-Palhaço Laranja)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "069_ocellaris_comum.webp",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Morfotipos"
  },
  {
    "id": "23",
    "name": "Palhaço Black Ocellaris (Amphiprion ocellaris)",
    "commonName": "Palhaço Black Ocellaris",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Preto",
      "Palhaço Preto",
      "Black Ocellaris",
      "ocellaris black",
      "nemo preto",
      "black darwin",
      "Ocellaris Black (Darwin)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "070_ocellaris_black_darwin.webp",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Morfotipos"
  },
  {
    "id": "24",
    "name": "Palhaço Snowflake (Amphiprion ocellaris)",
    "commonName": "Palhaço Snowflake",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Snowflake Ocellaris",
      "Floco de Neve",
      "ocellaris snowflake",
      "snowflake clown",
      "Ocellaris Snowflake"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "071_ocellaris_snowflake.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Morfotipos"
  },
  {
    "id": "25",
    "name": "Palhaço Black Snowflake (Amphiprion ocellaris)",
    "commonName": "Palhaço Black Snowflake",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Black Snow",
      "Floco Negro",
      "black snowflake",
      "black ice",
      "phantom",
      "Ocellaris Black Snowflake / Black Ice"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "072_ocellaris_black_snowflake.png",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Morfotipos"
  },
  {
    "id": "26",
    "name": "Palhaço Black Storm (Amphiprion ocellaris)",
    "commonName": "Palhaço Black Storm",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Storm Black",
      "Tempestade Negra",
      "Black Storm Ocellaris"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-black-storm.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Morfotipos"
  },
  {
    "id": "27",
    "name": "Palhaço Snow Storm (Amphiprion ocellaris)",
    "commonName": "Palhaço Snow Storm",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Snow Storm Ocellaris",
      "Tempestade de Neve"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-snow-storm.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Morfotipos"
  },
  {
    "id": "28",
    "name": "Palhaço Frostbite (Amphiprion ocellaris)",
    "commonName": "Palhaço Frostbite",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Frostbite Ocellaris",
      "frostbite",
      "flurry",
      "wyoming white",
      "Ocellaris Frostbite / Flurry"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "074_ocellaris_frostbite_flurry.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Morfotipos"
  },
  {
    "id": "29",
    "name": "Palhaço DaVinci (Amphiprion ocellaris)",
    "commonName": "Palhaço DaVinci",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-fancy-gladiator.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Morfotipos"
  },
  {
    "id": "30",
    "name": "Palhaço Gladiator (Amphiprion ocellaris)",
    "commonName": "Palhaço Gladiator",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-fancy-gladiator.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Morfotipos"
  },
  {
    "id": "31",
    "name": "Palhaço Midnight (Amphiprion ocellaris)",
    "commonName": "Palhaço Midnight",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-black-extreme-misbar.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Morfotipos"
  },
  {
    "id": "32",
    "name": "Palhaço Wyoming White (Amphiprion ocellaris)",
    "commonName": "Palhaço Wyoming White",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Wyoming White Ocellaris"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-wyoming-white.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Morfotipos"
  },
  {
    "id": "33",
    "name": "Palhaço Domino (Amphiprion ocellaris)",
    "commonName": "Palhaço Domino",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Domino Ocellaris",
      "Black Domino"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-domino.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Morfotipos"
  },
  {
    "id": "34",
    "name": "Palhaço Flurry (Amphiprion ocellaris)",
    "commonName": "Palhaço Flurry",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-flurry.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Morfotipos"
  },
  {
    "id": "35",
    "name": "Palhaço Mocha (Amphiprion ocellaris)",
    "commonName": "Palhaço Mocha",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-mocha.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Morfotipos"
  },
  {
    "id": "36",
    "name": "Palhaço Picasso (Amphiprion percula)",
    "commonName": "Palhaço Picasso",
    "scientificName": "Amphiprion percula",
    "synonyms": [
      "ocellaris picasso",
      "davinci",
      "gladiator",
      "Ocellaris Picasso / DaVinci / Gladiator"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "073_ocellaris_picasso_davinci.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Morfotipos"
  },
  {
    "id": "37",
    "name": "Palhaço Platinum (Amphiprion percula)",
    "commonName": "Palhaço Platinum",
    "scientificName": "Amphiprion percula",
    "synonyms": [
      "Platinum Percula",
      "Percula Branco Platina"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-platinum.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Morfotipos"
  },
  {
    "id": "38",
    "name": "Palhaço True Percula (Amphiprion percula)",
    "commonName": "Palhaço True Percula",
    "scientificName": "Amphiprion percula",
    "synonyms": [
      "Percula Verdadeiro",
      "Percula Comum"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-percula-true.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Morfotipos"
  },
  {
    "id": "39",
    "name": "Palhaço Onyx Percula (Amphiprion percula)",
    "commonName": "Palhaço Onyx Percula",
    "scientificName": "Amphiprion percula",
    "synonyms": [
      "Percula Onyx",
      "Onyx"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-onyx-percula.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Morfotipos"
  },
  {
    "id": "40",
    "name": "Palhaço Clarkii True (Amphiprion clarkii)",
    "commonName": "Palhaço Clarkii True",
    "scientificName": "Amphiprion clarkii",
    "synonyms": [
      "flame angel",
      "coral beauty",
      "centropyge",
      "Anjos Anões (Flame Angel / Coral Beauty)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "088_anjos_anoes_flame_coral_beauty.webp",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Morfotipos"
  },
  {
    "id": "41",
    "name": "Palhaço Tomato (Amphiprion frenatus)",
    "commonName": "Palhaço Tomato",
    "scientificName": "Amphiprion frenatus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-tomato.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Morfotipos"
  },
  {
    "id": "42",
    "name": "Palhaço Maroon Espinho (Premnas biaculeatus)",
    "commonName": "Palhaço Maroon Espinho",
    "scientificName": "Premnas biaculeatus",
    "synonyms": [
      "Faixa Branca",
      "Maroon Comum",
      "Spinecheek Clownfish"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-maroon-espinho.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Morfotipos"
  },
  {
    "id": "43",
    "name": "Palhaço Maroon Faixa Dourada (Premnas epigramma)",
    "commonName": "Palhaço Maroon Faixa Dourada",
    "scientificName": "Premnas epigramma",
    "synonyms": [
      "Gold Stripe"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-maroon-goldstripe.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Morfotipos"
  },
  {
    "id": "44",
    "name": "Palhaço Maroon Lightning (Premnas biaculeatus)",
    "commonName": "Palhaço Maroon Lightning",
    "scientificName": "Premnas biaculeatus",
    "synonyms": [
      "Lightning Maroon",
      "Palhaço Relâmpago"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-maroon-lightning.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Morfotipos"
  },
  {
    "id": "45",
    "name": "Palhaço Pink Skunk (Amphiprion perideraion)",
    "commonName": "Palhaço Pink Skunk",
    "scientificName": "Amphiprion perideraion",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-pink-skunk.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Morfotipos"
  },
  {
    "id": "46",
    "name": "Palhaço Orange Skunk (Amphiprion sandaracinos)",
    "commonName": "Palhaço Orange Skunk",
    "scientificName": "Amphiprion sandaracinos",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-orange-skunk.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Morfotipos"
  },
  {
    "id": "47",
    "name": "Palhaço Sebae (Amphiprion sebae)",
    "commonName": "Palhaço Sebae",
    "scientificName": "Amphiprion sebae",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-sebae.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Morfotipos"
  },
  {
    "id": "48",
    "name": "Anjo Coral Beauty (Centropyge bispinosa)",
    "commonName": "Anjo Coral Beauty",
    "scientificName": "Centropyge bispinosa",
    "synonyms": [
      "cardinal banggai",
      "banggai",
      "cardinal pijama",
      "Cardinal Banggai & Cardinal Pijama"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "087_cardinal_banggai_pijama.webp",
    "section": "Peixes Marinhos",
    "familyGroup": "Anjos Anões e Grandes Anjos"
  },
  {
    "id": "49",
    "name": "Anjo Bicolor (Centropyge bicolor)",
    "commonName": "Anjo Bicolor",
    "scientificName": "Centropyge bicolor",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "anjo-bicolor.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Anjos Anões e Grandes Anjos"
  },
  {
    "id": "50",
    "name": "Flame Angel (Centropyge loricula)",
    "commonName": "Flame Angel",
    "scientificName": "Centropyge loricula",
    "synonyms": [
      "Anjo Flame",
      "royal gramma",
      "gramma loreto",
      "gramma",
      "Royal Gramma / Gramma Brasiliensis"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "080_royal_gramma.webp",
    "section": "Peixes Marinhos",
    "familyGroup": "Anjos Anões e Grandes Anjos"
  },
  {
    "id": "51",
    "name": "Anjo Potteri (Centropyge potteri)",
    "commonName": "Anjo Potteri",
    "scientificName": "Centropyge potteri",
    "synonyms": [
      "firefish",
      "nemateleotris",
      "fire fish",
      "Firefish Comum (Nemateleotris magnifica)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "081_firefish_magnifica.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Anjos Anões e Grandes Anjos"
  },
  {
    "id": "52",
    "name": "Anjo Eibli (Centropyge eibli)",
    "commonName": "Anjo Eibli",
    "scientificName": "Centropyge eibli",
    "synonyms": [
      "purple firefish",
      "firefish roxo",
      "decora",
      "Firefish Purple"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "082_purple_firefish.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Anjos Anões e Grandes Anjos"
  },
  {
    "id": "53",
    "name": "Anjo Halfblack (Centropyge vrolikii)",
    "commonName": "Anjo Halfblack",
    "scientificName": "Centropyge vrolikii",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "anjo-halfblack.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Anjos Anões e Grandes Anjos"
  },
  {
    "id": "54",
    "name": "Anjo Lemonpeel (Centropyge flavissima)",
    "commonName": "Anjo Lemonpeel",
    "scientificName": "Centropyge flavissima",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "anjo-lemonpeel.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Anjos Anões e Grandes Anjos"
  },
  {
    "id": "55",
    "name": "Anjo Fisheri (Centropyge fisheri)",
    "commonName": "Anjo Fisheri",
    "scientificName": "Centropyge fisheri",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "anjo-fisheri.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Anjos Anões e Grandes Anjos"
  },
  {
    "id": "56",
    "name": "Anjo Centropyge Nacional (Centropyge aurantonotus)",
    "commonName": "Anjo Centropyge Nacional",
    "scientificName": "Centropyge aurantonotus",
    "synonyms": [
      "Ciliaris Anão"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "anjo-centropyge-nacional.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Anjos Anões e Grandes Anjos"
  },
  {
    "id": "57",
    "name": "Peixe-Anjo Francês (Pomacanthus paru)",
    "commonName": "Peixe-Anjo Francês",
    "scientificName": "Pomacanthus paru",
    "synonyms": [
      "Anjo Paru Nacional"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "anjo-frances.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Anjos Anões e Grandes Anjos"
  },
  {
    "id": "58",
    "name": "Peixe-Anjo Rainha (Holacanthus ciliaris)",
    "commonName": "Peixe-Anjo Rainha",
    "scientificName": "Holacanthus ciliaris",
    "synonyms": [
      "Anjo Ciliaris",
      "Rainha"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "anjo-ciliaris.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Anjos Anões e Grandes Anjos"
  },
  {
    "id": "59",
    "name": "Anjo Tricolor (Holacanthus tricolor)",
    "commonName": "Anjo Tricolor",
    "scientificName": "Holacanthus tricolor",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "anjo-tricolor.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Anjos Anões e Grandes Anjos"
  },
  {
    "id": "60",
    "name": "Anjo Passer (Holacanthus passer)",
    "commonName": "Anjo Passer",
    "scientificName": "Holacanthus passer",
    "synonyms": [
      "Rei"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "anjo-passer.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Anjos Anões e Grandes Anjos"
  },
  {
    "id": "61",
    "name": "Anjo Imperador (Pomacanthus imperator)",
    "commonName": "Anjo Imperador",
    "scientificName": "Pomacanthus imperator",
    "synonyms": [
      "Imperator"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "anjo-imperador.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Anjos Anões e Grandes Anjos"
  },
  {
    "id": "62",
    "name": "Anjo Semicirculatus (Pomacanthus semicirculatus)",
    "commonName": "Anjo Semicirculatus",
    "scientificName": "Pomacanthus semicirculatus",
    "synonyms": [
      "Koran"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "anjo-semicirculatus.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Anjos Anões e Grandes Anjos"
  },
  {
    "id": "63",
    "name": "Anjo Annularis (Pomacanthus annularis)",
    "commonName": "Anjo Annularis",
    "scientificName": "Pomacanthus annularis",
    "synonyms": [
      "Blue Ring"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "anjo-annularis.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Anjos Anões e Grandes Anjos"
  },
  {
    "id": "64",
    "name": "Anjo Asfur (Pomacanthus asfur)",
    "commonName": "Anjo Asfur",
    "scientificName": "Pomacanthus asfur",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "anjo-asfur.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Anjos Anões e Grandes Anjos"
  },
  {
    "id": "65",
    "name": "Anjo Maculosus (Pomacanthus maculosus)",
    "commonName": "Anjo Maculosus",
    "scientificName": "Pomacanthus maculosus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "anjo-maculosus.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Anjos Anões e Grandes Anjos"
  },
  {
    "id": "66",
    "name": "Anjo Singapore (Chaetodontoplus mesoleucus)",
    "commonName": "Anjo Singapore",
    "scientificName": "Chaetodontoplus mesoleucus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "anjo-singapore.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Anjos Anões e Grandes Anjos"
  },
  {
    "id": "67",
    "name": "Anjo Lamarck (Genicanthus lamarck)",
    "commonName": "Anjo Lamarck",
    "scientificName": "Genicanthus lamarck",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "anjo-lamarck.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Anjos Anões e Grandes Anjos"
  },
  {
    "id": "68",
    "name": "Anjo Bellus (Genicanthus bellus)",
    "commonName": "Anjo Bellus",
    "scientificName": "Genicanthus bellus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "anjo-bellus.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Anjos Anões e Grandes Anjos"
  },
  {
    "id": "69",
    "name": "Anjo Wantanabei (Genicanthus wantanabei)",
    "commonName": "Anjo Wantanabei",
    "scientificName": "Genicanthus wantanabei",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "anjo-wantanabei.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Anjos Anões e Grandes Anjos"
  },
  {
    "id": "70",
    "name": "Borboleta Copperband (Chelmon rostratus)",
    "commonName": "Borboleta Copperband",
    "scientificName": "Chelmon rostratus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "borboleta-copperband.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Borboletas"
  },
  {
    "id": "71",
    "name": "Borboleta Auriga (Chaetodon auriga)",
    "commonName": "Borboleta Auriga",
    "scientificName": "Chaetodon auriga",
    "synonyms": [
      "Threadfin",
      "watchman goby",
      "bicolor blenny",
      "midas blenny",
      "Gobies & Blennies (Watchman / Bicolor / Midas)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "085_gobies_blennies_watchman.webp",
    "section": "Peixes Marinhos",
    "familyGroup": "Borboletas"
  },
  {
    "id": "72",
    "name": "Borboleta Heniochus Brown (Heniochus acuminatus)",
    "commonName": "Borboleta Heniochus Brown",
    "scientificName": "Heniochus acuminatus",
    "synonyms": [
      "Falso Idolo"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "borboleta-heniochus-brown.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Borboletas"
  },
  {
    "id": "73",
    "name": "Borboleta Heniochus Varius (Heniochus varius)",
    "commonName": "Borboleta Heniochus Varius",
    "scientificName": "Heniochus varius",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "borboleta-heniochus-varius.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Borboletas"
  },
  {
    "id": "74",
    "name": "Borboleta Kleins (Chaetodon kleinii)",
    "commonName": "Borboleta Kleins",
    "scientificName": "Chaetodon kleinii",
    "synonyms": [
      "Sunburst",
      "mandarim",
      "synchiropus",
      "green mandarin",
      "Peixe Mandarim (Synchiropus splendidus)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "086_peixe_mandarim.webp",
    "section": "Peixes Marinhos",
    "familyGroup": "Borboletas"
  },
  {
    "id": "75",
    "name": "Borboleta Racoon (Chaetodon lunula)",
    "commonName": "Borboleta Racoon",
    "scientificName": "Chaetodon lunula",
    "synonyms": [
      "Guaxinim"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "borboleta-racoon.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Borboletas"
  },
  {
    "id": "76",
    "name": "Borboleta Rafflesi (Chaetodon rafflesii)",
    "commonName": "Borboleta Rafflesi",
    "scientificName": "Chaetodon rafflesii",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "borboleta-rafflesi.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Borboletas"
  },
  {
    "id": "77",
    "name": "Borboleta Striatus (Chaetodon striatus)",
    "commonName": "Borboleta Striatus",
    "scientificName": "Chaetodon striatus",
    "synonyms": [
      "Borboleta Nacional Listrado"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "borboleta-striatus.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Borboletas"
  },
  {
    "id": "78",
    "name": "Borboleta Ocellatus (Chaetodon ocellatus)",
    "commonName": "Borboleta Ocellatus",
    "scientificName": "Chaetodon ocellatus",
    "synonyms": [
      "Borboleta Nacional Ocelado"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "borboleta-ocellatus.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Borboletas"
  },
  {
    "id": "79",
    "name": "Borboleta Sedentarius (Chaetodon sedentarius)",
    "commonName": "Borboleta Sedentarius",
    "scientificName": "Chaetodon sedentarius",
    "synonyms": [
      "Borboleta dos Recifes"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "borboleta-sedentarius.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Borboletas"
  },
  {
    "id": "80",
    "name": "Borboleta Teardrop (Chaetodon unimaculatus)",
    "commonName": "Borboleta Teardrop",
    "scientificName": "Chaetodon unimaculatus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "borboleta-teardrop.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Borboletas"
  },
  {
    "id": "81",
    "name": "Borboleta Yellow Longnose (Forcipiger flavissimus)",
    "commonName": "Borboleta Yellow Longnose",
    "scientificName": "Forcipiger flavissimus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "borboleta-yellow-longnose.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Borboletas"
  },
  {
    "id": "82",
    "name": "Green Chromis (Chromis viridis)",
    "commonName": "Green Chromis",
    "scientificName": "Chromis viridis",
    "synonyms": [
      "Donzela Verde"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "green-chromis.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Donzelas e Cromis"
  },
  {
    "id": "83",
    "name": "Chromis Blue Reef (Chromis cyanea)",
    "commonName": "Chromis Blue Reef",
    "scientificName": "Chromis cyanea",
    "synonyms": [
      "Azul do Caribe"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "chromis-blue-reef.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Donzelas e Cromis"
  },
  {
    "id": "84",
    "name": "Donzela Blue Devil (Chrysiptera cyanea)",
    "commonName": "Donzela Blue Devil",
    "scientificName": "Chrysiptera cyanea",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "donzela-blue-devil.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Donzelas e Cromis"
  },
  {
    "id": "85",
    "name": "Donzela Blue Devil Orange Tail (Chrysiptera cyanea)",
    "commonName": "Donzela Blue Devil Orange Tail",
    "scientificName": "Chrysiptera cyanea",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "donzela-blue-devil-orange-tail.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Donzelas e Cromis"
  },
  {
    "id": "86",
    "name": "Donzela Yellow Tail (Chrysiptera parasema)",
    "commonName": "Donzela Yellow Tail",
    "scientificName": "Chrysiptera parasema",
    "synonyms": [
      "Cauda Amarela"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "donzela-yellow-tail.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Donzelas e Cromis"
  },
  {
    "id": "87",
    "name": "Donzela Kupang (Chrysiptera hemicyanea)",
    "commonName": "Donzela Kupang",
    "scientificName": "Chrysiptera hemicyanea",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "donzela-kupang.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Donzelas e Cromis"
  },
  {
    "id": "88",
    "name": "Donzela Talbot (Chrysiptera talboti)",
    "commonName": "Donzela Talbot",
    "scientificName": "Chrysiptera talboti",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "donzela-talbot.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Donzelas e Cromis"
  },
  {
    "id": "89",
    "name": "Donzela Dominó (Dascyllus trimaculatus)",
    "commonName": "Donzela Dominó",
    "scientificName": "Dascyllus trimaculatus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "donzela-domino.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Donzelas e Cromis"
  },
  {
    "id": "90",
    "name": "Donzela Três Faixas (Dascyllus aruanus)",
    "commonName": "Donzela Três Faixas",
    "scientificName": "Dascyllus aruanus",
    "synonyms": [
      "Humbug"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "donzela-tres-faixas.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Donzelas e Cromis"
  },
  {
    "id": "91",
    "name": "Donzela Quatro Faixas (Dascyllus melanurus)",
    "commonName": "Donzela Quatro Faixas",
    "scientificName": "Dascyllus melanurus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "donzela-quatro-faixas.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Donzelas e Cromis"
  },
  {
    "id": "92",
    "name": "Donzela Neon Velvet (Neoglyphidodon oxyodon)",
    "commonName": "Donzela Neon Velvet",
    "scientificName": "Neoglyphidodon oxyodon",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "donzela-neon-velvet.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Donzelas e Cromis"
  },
  {
    "id": "93",
    "name": "Donzela Yellow Belly Neon (Pomacentrus auriventris)",
    "commonName": "Donzela Yellow Belly Neon",
    "scientificName": "Pomacentrus auriventris",
    "synonyms": [
      "kupang",
      "green chromis",
      "yellow tail damsel",
      "Donzelas (Kupang, Green Chromis, Yellow Tail)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "084_donzelas_blue_devil.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Donzelas e Cromis"
  },
  {
    "id": "94",
    "name": "Donzela Amarela Nacional (Stegastes variabilis)",
    "commonName": "Donzela Amarela Nacional",
    "scientificName": "Stegastes variabilis",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "donzela-amarela-nacional.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Donzelas e Cromis"
  },
  {
    "id": "95",
    "name": "Donzela Jóia (Microspathodon chrysurus)",
    "commonName": "Donzela Jóia",
    "scientificName": "Microspathodon chrysurus",
    "synonyms": [
      "Jewel Damselfish"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "donzela-joia.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Donzelas e Cromis"
  },
  {
    "id": "96",
    "name": "Blênio Lawnmower (Salarias fasciatus)",
    "commonName": "Blênio Lawnmower",
    "scientificName": "Salarias fasciatus",
    "synonyms": [
      "Rock Algae"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "blenio-lawnmower.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Blênios, Gobies e Peixes Simbióticos"
  },
  {
    "id": "97",
    "name": "Blênio Bicolor (Ecsenius bicolor)",
    "commonName": "Blênio Bicolor",
    "scientificName": "Ecsenius bicolor",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "blenio-bicolor.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Blênios, Gobies e Peixes Simbióticos"
  },
  {
    "id": "98",
    "name": "Blênio Midas (Ecsenius midas)",
    "commonName": "Blênio Midas",
    "scientificName": "Ecsenius midas",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "blenio-midas.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Blênios, Gobies e Peixes Simbióticos"
  },
  {
    "id": "99",
    "name": "Blênio Tailspot (Ecsenius stigmatura)",
    "commonName": "Blênio Tailspot",
    "scientificName": "Ecsenius stigmatura",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "blenio-tailspot.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Blênios, Gobies e Peixes Simbióticos"
  },
  {
    "id": "100",
    "name": "Blênio Starry (Salarias ramosus)",
    "commonName": "Blênio Starry",
    "scientificName": "Salarias ramosus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "blenio-starry.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Blênios, Gobies e Peixes Simbióticos"
  },
  {
    "id": "101",
    "name": "Blênio Macaco Nacional (Scartella cristata)",
    "commonName": "Blênio Macaco Nacional",
    "scientificName": "Scartella cristata",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "blenio-macaco-nacional.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Blênios, Gobies e Peixes Simbióticos"
  },
  {
    "id": "102",
    "name": "Yellow Watchman Goby (Cryptocentrus cinctus)",
    "commonName": "Yellow Watchman Goby",
    "scientificName": "Cryptocentrus cinctus",
    "synonyms": [
      "Goby Yellow Watchman",
      "Góbio Amarelo Vigia",
      "Watchman Amarelo"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "goby-yellow-watchman.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Blênios, Gobies e Peixes Simbióticos"
  },
  {
    "id": "103",
    "name": "Goby Gray Watchman (Cryptocentrus sp.)",
    "commonName": "Goby Gray Watchman",
    "scientificName": "Cryptocentrus sp.",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "goby-gray-watchman.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Blênios, Gobies e Peixes Simbióticos"
  },
  {
    "id": "104",
    "name": "Diamond Watchman Goby (Valenciennea puellaris)",
    "commonName": "Diamond Watchman Goby",
    "scientificName": "Valenciennea puellaris",
    "synonyms": [
      "Goby Diamond Watchman",
      "Valenciennea"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "goby-diamond-watchman.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Blênios, Gobies e Peixes Simbióticos"
  },
  {
    "id": "105",
    "name": "Goby Sleeper Banded (Amblygobius phalaena)",
    "commonName": "Goby Sleeper Banded",
    "scientificName": "Amblygobius phalaena",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "goby-sleeper-banded.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Blênios, Gobies e Peixes Simbióticos"
  },
  {
    "id": "106",
    "name": "Goby Orange Spotted (Amblyeleotris guttata)",
    "commonName": "Goby Orange Spotted",
    "scientificName": "Amblyeleotris guttata",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "goby-orange-spotted.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Blênios, Gobies e Peixes Simbióticos"
  },
  {
    "id": "107",
    "name": "Goby Steinitz (Amblyeleotris steinitzi)",
    "commonName": "Goby Steinitz",
    "scientificName": "Amblyeleotris steinitzi",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "goby-steinitz.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Blênios, Gobies e Peixes Simbióticos"
  },
  {
    "id": "108",
    "name": "Yasha Goby (Stonogobiops yasha)",
    "commonName": "Yasha Goby",
    "scientificName": "Stonogobiops yasha",
    "synonyms": [
      "Goby Yasha",
      "White Ray"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "goby-yasha.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Blênios, Gobies e Peixes Simbióticos"
  },
  {
    "id": "109",
    "name": "Goby Hi Fin Red Banded (Stonogobiops nematodes)",
    "commonName": "Goby Hi Fin Red Banded",
    "scientificName": "Stonogobiops nematodes",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "goby-hi-fin-red-banded.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Blênios, Gobies e Peixes Simbióticos"
  },
  {
    "id": "110",
    "name": "Twin Spot Goby (Signigobius biocellatus)",
    "commonName": "Twin Spot Goby",
    "scientificName": "Signigobius biocellatus",
    "synonyms": [
      "Goby Twin Spot",
      "Two Spot"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "goby-twin-spot.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Blênios, Gobies e Peixes Simbióticos"
  },
  {
    "id": "111",
    "name": "Goby Yellow Clown (Gobiodon okinawae)",
    "commonName": "Goby Yellow Clown",
    "scientificName": "Gobiodon okinawae",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "goby-yellow-clown.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Blênios, Gobies e Peixes Simbióticos"
  },
  {
    "id": "112",
    "name": "Green Clown Goby (Gobiodon histrio)",
    "commonName": "Green Clown Goby",
    "scientificName": "Gobiodon histrio",
    "synonyms": [
      "Goby Green Clown",
      "Lined"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "goby-green-clown.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Blênios, Gobies e Peixes Simbióticos"
  },
  {
    "id": "113",
    "name": "Góbio Neon Amarelo (Elacatinus figaro)",
    "commonName": "Góbio Neon Amarelo",
    "scientificName": "Elacatinus figaro",
    "synonyms": [
      "Neon Goby Amarelo Nacional",
      "Yellow Neon Goby",
      "Neon Figaro"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "neon-goby-amarelo-nacional.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Blênios, Gobies e Peixes Simbióticos"
  },
  {
    "id": "114",
    "name": "Góbio Neon Azul (Elacatinus oceanops)",
    "commonName": "Góbio Neon Azul",
    "scientificName": "Elacatinus oceanops",
    "synonyms": [
      "Neon Goby Azul",
      "Blue Neon Goby",
      "Neon Oceanops"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "neon-goby-azul.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Blênios, Gobies e Peixes Simbióticos"
  },
  {
    "id": "115",
    "name": "Neon Goby Nariz Vermelho (Elacatinus puncticulatus)",
    "commonName": "Neon Goby Nariz Vermelho",
    "scientificName": "Elacatinus puncticulatus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "neon-goby-nariz-vermelho.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Blênios, Gobies e Peixes Simbióticos"
  },
  {
    "id": "116",
    "name": "Royal Gramma (Gramma loreto)",
    "commonName": "Royal Gramma",
    "scientificName": "Gramma loreto",
    "synonyms": [
      "Gramma Loreto"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "gramma-loreto.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Anthias e Grammas"
  },
  {
    "id": "117",
    "name": "Gramma Brasileiro (Gramma brasiliensis)",
    "commonName": "Gramma Brasileiro",
    "scientificName": "Gramma brasiliensis",
    "synonyms": [
      "Loreto Nacional"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "gramma-brasileiro.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Anthias e Grammas"
  },
  {
    "id": "118",
    "name": "Anthias Lyretail Fêmea (Pseudanthias squamipinnis)",
    "commonName": "Anthias Lyretail Fêmea",
    "scientificName": "Pseudanthias squamipinnis",
    "synonyms": [
      "Macho"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "anthias-lyretail-femea.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Anthias e Grammas"
  },
  {
    "id": "119",
    "name": "Anthias Dispar (Pseudanthias dispar)",
    "commonName": "Anthias Dispar",
    "scientificName": "Pseudanthias dispar",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "anthias-dispar.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Anthias e Grammas"
  },
  {
    "id": "120",
    "name": "Anthias Bartletts (Pseudanthias bartlettorum)",
    "commonName": "Anthias Bartletts",
    "scientificName": "Pseudanthias bartlettorum",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "anthias-bartletts.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Anthias e Grammas"
  },
  {
    "id": "121",
    "name": "Anthias Evansi (Pseudanthias evansi)",
    "commonName": "Anthias Evansi",
    "scientificName": "Pseudanthias evansi",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "anthias-evansi.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Anthias e Grammas"
  },
  {
    "id": "122",
    "name": "Anthias Bimaculatus (Pseudanthias bimaculatus)",
    "commonName": "Anthias Bimaculatus",
    "scientificName": "Pseudanthias bimaculatus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "anthias-bimaculatus.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Anthias e Grammas"
  },
  {
    "id": "123",
    "name": "Anthias Sunburst (Serranocirrhitus latus)",
    "commonName": "Anthias Sunburst",
    "scientificName": "Serranocirrhitus latus",
    "synonyms": [
      "Fathead"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "anthias-sunburst.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Anthias e Grammas"
  },
  {
    "id": "124",
    "name": "Six Line Wrasse (Pseudocheilinus hexataenia)",
    "commonName": "Six Line Wrasse",
    "scientificName": "Pseudocheilinus hexataenia",
    "synonyms": [
      "Wrasse Six Line",
      "Seis Linhas"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "wrasse-six-line.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Bodiões e Wrasses"
  },
  {
    "id": "125",
    "name": "Wrasse Four Line (Pseudocheilinus tetrataenia)",
    "commonName": "Wrasse Four Line",
    "scientificName": "Pseudocheilinus tetrataenia",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "wrasse-four-line.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Bodiões e Wrasses"
  },
  {
    "id": "126",
    "name": "Cleaner Wrasse (Labroides dimidiatus)",
    "commonName": "Cleaner Wrasse",
    "scientificName": "Labroides dimidiatus",
    "synonyms": [
      "Wrasse Cleaner",
      "Limpador"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "wrasse-cleaner.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Bodiões e Wrasses"
  },
  {
    "id": "127",
    "name": "Yellow Coris Wrasse (Halichoeres chrysus)",
    "commonName": "Yellow Coris Wrasse",
    "scientificName": "Halichoeres chrysus",
    "synonyms": [
      "Wrasse Yellow Coris",
      "Canarinho"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "wrasse-yellow-coris.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Bodiões e Wrasses"
  },
  {
    "id": "128",
    "name": "Wrasse Green Coris (Halichoeres chloropterus)",
    "commonName": "Wrasse Green Coris",
    "scientificName": "Halichoeres chloropterus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "wrasse-green-coris.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Bodiões e Wrasses"
  },
  {
    "id": "129",
    "name": "Red Coris Wrasse (Coris gaimard)",
    "commonName": "Red Coris Wrasse",
    "scientificName": "Coris gaimard",
    "synonyms": [
      "Wrasse Red Coris",
      "Palhaço"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "wrasse-red-coris.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Bodiões e Wrasses"
  },
  {
    "id": "130",
    "name": "Wrasse Carpenters Flasher (Paracheilinus carpenteri)",
    "commonName": "Wrasse Carpenters Flasher",
    "scientificName": "Paracheilinus carpenteri",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "wrasse-carpenters-flasher.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Bodiões e Wrasses"
  },
  {
    "id": "131",
    "name": "Wrasse McCoskers Flasher (Paracheilinus mccoskeri)",
    "commonName": "Wrasse McCoskers Flasher",
    "scientificName": "Paracheilinus mccoskeri",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "wrasse-mccoskers-flasher.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Bodiões e Wrasses"
  },
  {
    "id": "132",
    "name": "Wrasse Blue Side Fairy (Cirrhilabrus cyanopleura)",
    "commonName": "Wrasse Blue Side Fairy",
    "scientificName": "Cirrhilabrus cyanopleura",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "wrasse-blue-side-fairy.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Bodiões e Wrasses"
  },
  {
    "id": "133",
    "name": "Wrasse Orange Back Fairy (Cirrhilabrus aurantidorsalis)",
    "commonName": "Wrasse Orange Back Fairy",
    "scientificName": "Cirrhilabrus aurantidorsalis",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "wrasse-orange-back-fairy.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Bodiões e Wrasses"
  },
  {
    "id": "134",
    "name": "Wrasse Solar (Cirrhilabrus solorensis)",
    "commonName": "Wrasse Solar",
    "scientificName": "Cirrhilabrus solorensis",
    "synonyms": [
      "Red-Eyed"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "wrasse-solar.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Bodiões e Wrasses"
  },
  {
    "id": "135",
    "name": "Wrasse Lubbocks Fairy (Cirrhilabrus lubbocki)",
    "commonName": "Wrasse Lubbocks Fairy",
    "scientificName": "Cirrhilabrus lubbocki",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "wrasse-lubbocks-fairy.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Bodiões e Wrasses"
  },
  {
    "id": "136",
    "name": "Wrasse Exquisite Fairy (Cirrhilabrus exquisitus)",
    "commonName": "Wrasse Exquisite Fairy",
    "scientificName": "Cirrhilabrus exquisitus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "wrasse-exquisite-fairy.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Bodiões e Wrasses"
  },
  {
    "id": "137",
    "name": "Wrasse Melanurus (Halichoeres melanurus)",
    "commonName": "Wrasse Melanurus",
    "scientificName": "Halichoeres melanurus",
    "synonyms": [
      "six line",
      "sixline wrasse",
      "yellow coris",
      "Six Line Wrasse / Yellow Coris"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "083_six_line_wrasse.webp",
    "section": "Peixes Marinhos",
    "familyGroup": "Bodiões e Wrasses"
  },
  {
    "id": "138",
    "name": "Wrasse Ornatus (Halichoeres ornatissimus)",
    "commonName": "Wrasse Ornatus",
    "scientificName": "Halichoeres ornatissimus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "wrasse-ornatus.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Bodiões e Wrasses"
  },
  {
    "id": "139",
    "name": "Wrasse Cyanocephalus (Halichoeres cyanocephalus)",
    "commonName": "Wrasse Cyanocephalus",
    "scientificName": "Halichoeres cyanocephalus",
    "synonyms": [
      "Bodião Nacional"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "wrasse-cyanocephalus.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Bodiões e Wrasses"
  },
  {
    "id": "140",
    "name": "Wrasse Poeyi Verde (Halichoeres poeyi)",
    "commonName": "Wrasse Poeyi Verde",
    "scientificName": "Halichoeres poeyi",
    "synonyms": [
      "Bodião Verde Nacional"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "wrasse-poeyi-verde.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Bodiões e Wrasses"
  },
  {
    "id": "141",
    "name": "Wrasse Radiatus (Halichoeres radiatus)",
    "commonName": "Wrasse Radiatus",
    "scientificName": "Halichoeres radiatus",
    "synonyms": [
      "Bodião Papagaio"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "wrasse-radiatus.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Bodiões e Wrasses"
  },
  {
    "id": "142",
    "name": "Wrasse Rufus (Bodianus rufus)",
    "commonName": "Wrasse Rufus",
    "scientificName": "Bodianus rufus",
    "synonyms": [
      "Bodião Espanhol"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "wrasse-rufus.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Bodiões e Wrasses"
  },
  {
    "id": "143",
    "name": "Wrasse Dianas Hogfish (Bodianus diana)",
    "commonName": "Wrasse Dianas Hogfish",
    "scientificName": "Bodianus diana",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "wrasse-dianas-hogfish.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Bodiões e Wrasses"
  },
  {
    "id": "144",
    "name": "Wrasse Thalassoma Lunare (Thalassoma lunare)",
    "commonName": "Wrasse Thalassoma Lunare",
    "scientificName": "Thalassoma lunare",
    "synonyms": [
      "Bodião Lunar"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "wrasse-thalassoma-lunare.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Bodiões e Wrasses"
  },
  {
    "id": "145",
    "name": "Cardinal Banggai (Pterapogon kauderni)",
    "commonName": "Cardinal Banggai",
    "scientificName": "Pterapogon kauderni",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "cardinal-banggai.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Cardinais, Dartfish e Dottybacks"
  },
  {
    "id": "146",
    "name": "Cardinal Pijama (Sphaeramia nematoptera)",
    "commonName": "Cardinal Pijama",
    "scientificName": "Sphaeramia nematoptera",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "cardinal-pijama.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Cardinais, Dartfish e Dottybacks"
  },
  {
    "id": "147",
    "name": "Cardinal Red Spot (Apogon parvulus)",
    "commonName": "Cardinal Red Spot",
    "scientificName": "Apogon parvulus",
    "synonyms": [
      "Laranja"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "cardinal-red-spot.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Cardinais, Dartfish e Dottybacks"
  },
  {
    "id": "148",
    "name": "Cardinal Ring Tailed (Apogon aureus)",
    "commonName": "Cardinal Ring Tailed",
    "scientificName": "Apogon aureus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "cardinal-ring-tailed.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Cardinais, Dartfish e Dottybacks"
  },
  {
    "id": "149",
    "name": "Firefish Magnífico (Nemateleotris magnifica)",
    "commonName": "Firefish Magnífico",
    "scientificName": "Nemateleotris magnifica",
    "synonyms": [
      "Red Firefish"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "firefish-magnifico.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Cardinais, Dartfish e Dottybacks"
  },
  {
    "id": "150",
    "name": "Firefish Purple (Nemateleotris decora)",
    "commonName": "Firefish Purple",
    "scientificName": "Nemateleotris decora",
    "synonyms": [
      "Roxo"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "firefish-purple.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Cardinais, Dartfish e Dottybacks"
  },
  {
    "id": "151",
    "name": "Firefish Helfrichi (Nemateleotris helfrichi)",
    "commonName": "Firefish Helfrichi",
    "scientificName": "Nemateleotris helfrichi",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "firefish-helfrichi.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Cardinais, Dartfish e Dottybacks"
  },
  {
    "id": "152",
    "name": "Scissortail Dartfish (Ptereleotris evides)",
    "commonName": "Scissortail Dartfish",
    "scientificName": "Ptereleotris evides",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "scissortail-dartfish.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Cardinais, Dartfish e Dottybacks"
  },
  {
    "id": "153",
    "name": "Zebra Dartfish (Ptereleotris zebra)",
    "commonName": "Zebra Dartfish",
    "scientificName": "Ptereleotris zebra",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "zebra-dartfish.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Cardinais, Dartfish e Dottybacks"
  },
  {
    "id": "154",
    "name": "Orchid Dottyback (Pseudochromis fridmani)",
    "commonName": "Orchid Dottyback",
    "scientificName": "Pseudochromis fridmani",
    "synonyms": [
      "Dottyback Fridmani",
      "Orchid",
      "Fridmani"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "dottyback-fridmani.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Cardinais, Dartfish e Dottybacks"
  },
  {
    "id": "155",
    "name": "Dottyback Bicolor (Pictichromis paccagnellae)",
    "commonName": "Dottyback Bicolor",
    "scientificName": "Pictichromis paccagnellae",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "dottyback-bicolor.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Cardinais, Dartfish e Dottybacks"
  },
  {
    "id": "156",
    "name": "Dottyback Porphyrea (Pictichromis porphyrea)",
    "commonName": "Dottyback Porphyrea",
    "scientificName": "Pictichromis porphyrea",
    "synonyms": [
      "Magenta"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "dottyback-porphyrea.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Cardinais, Dartfish e Dottybacks"
  },
  {
    "id": "157",
    "name": "Dottyback Diadema (Pictichromis diadema)",
    "commonName": "Dottyback Diadema",
    "scientificName": "Pictichromis diadema",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "dottyback-diadema.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Cardinais, Dartfish e Dottybacks"
  },
  {
    "id": "158",
    "name": "Neon Arabian Dottyback (Pseudochromis aldabraensis)",
    "commonName": "Neon Arabian Dottyback",
    "scientificName": "Pseudochromis aldabraensis",
    "synonyms": [
      "Dottyback Aldabraense",
      "Neon"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "dottyback-aldabraense.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Cardinais, Dartfish e Dottybacks"
  },
  {
    "id": "159",
    "name": "Dottyback Splendid (Manonichthys splendens)",
    "commonName": "Dottyback Splendid",
    "scientificName": "Manonichthys splendens",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "dottyback-splendid.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Cardinais, Dartfish e Dottybacks"
  },
  {
    "id": "160",
    "name": "Dottyback Sunrise (Pseudochromis flavivertex)",
    "commonName": "Dottyback Sunrise",
    "scientificName": "Pseudochromis flavivertex",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "dottyback-sunrise.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Cardinais, Dartfish e Dottybacks"
  },
  {
    "id": "161",
    "name": "Mandarim Verde (Synchiropus splendidus)",
    "commonName": "Mandarim Verde",
    "scientificName": "Synchiropus splendidus",
    "synonyms": [
      "Green Mandarin"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "mandarim-verde.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Dragonets, Foxfaces, Triggers, Hawkfish e Miscelânea"
  },
  {
    "id": "162",
    "name": "Mandarim Vermelho (Synchiropus splendidus var. Red)",
    "commonName": "Mandarim Vermelho",
    "scientificName": "Synchiropus splendidus var. Red",
    "synonyms": [
      "Red Mandarin"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "mandarim-vermelho.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Dragonets, Foxfaces, Triggers, Hawkfish e Miscelânea"
  },
  {
    "id": "163",
    "name": "Mandarim Spotted (Synchiropus picturatus)",
    "commonName": "Mandarim Spotted",
    "scientificName": "Synchiropus picturatus",
    "synonyms": [
      "Pintado"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "mandarim-spotted.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Dragonets, Foxfaces, Triggers, Hawkfish e Miscelânea"
  },
  {
    "id": "164",
    "name": "Scooter Blenny (Synchiropus ocellatus)",
    "commonName": "Scooter Blenny",
    "scientificName": "Synchiropus ocellatus",
    "synonyms": [
      "Dragonet Ocelado"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "scooter-blenny.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Dragonets, Foxfaces, Triggers, Hawkfish e Miscelânea"
  },
  {
    "id": "165",
    "name": "Red Scooter Dragonet (Synchiropus stellatus)",
    "commonName": "Red Scooter Dragonet",
    "scientificName": "Synchiropus stellatus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "red-scooter-dragonet.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Dragonets, Foxfaces, Triggers, Hawkfish e Miscelânea"
  },
  {
    "id": "166",
    "name": "Yellow Foxface (Siganus vulpinus)",
    "commonName": "Yellow Foxface",
    "scientificName": "Siganus vulpinus",
    "synonyms": [
      "Peixe Coelho"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "yellow-foxface.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Dragonets, Foxfaces, Triggers, Hawkfish e Miscelânea"
  },
  {
    "id": "167",
    "name": "One Spot Foxface (Siganus unimaculatus)",
    "commonName": "One Spot Foxface",
    "scientificName": "Siganus unimaculatus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "one-spot-foxface.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Dragonets, Foxfaces, Triggers, Hawkfish e Miscelânea"
  },
  {
    "id": "168",
    "name": "Magnificent Foxface (Siganus magnificus)",
    "commonName": "Magnificent Foxface",
    "scientificName": "Siganus magnificus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "magnificent-foxface.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Dragonets, Foxfaces, Triggers, Hawkfish e Miscelânea"
  },
  {
    "id": "169",
    "name": "Blue Lined Foxface (Siganus doliatus)",
    "commonName": "Blue Lined Foxface",
    "scientificName": "Siganus doliatus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "blue-lined-foxface.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Dragonets, Foxfaces, Triggers, Hawkfish e Miscelânea"
  },
  {
    "id": "170",
    "name": "Double Bar Foxface (Siganus virgatus)",
    "commonName": "Double Bar Foxface",
    "scientificName": "Siganus virgatus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "double-bar-foxface.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Dragonets, Foxfaces, Triggers, Hawkfish e Miscelânea"
  },
  {
    "id": "171",
    "name": "Hawkfish Longnose (Oxycirrhites typus)",
    "commonName": "Hawkfish Longnose",
    "scientificName": "Oxycirrhites typus",
    "synonyms": [
      "Narigudo"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "hawkfish-longnose.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Dragonets, Foxfaces, Triggers, Hawkfish e Miscelânea"
  },
  {
    "id": "172",
    "name": "Hawkfish Falco (Cirrhitichthys falco)",
    "commonName": "Hawkfish Falco",
    "scientificName": "Cirrhitichthys falco",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "hawkfish-falco.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Dragonets, Foxfaces, Triggers, Hawkfish e Miscelânea"
  },
  {
    "id": "173",
    "name": "Hawkfish Spotted (Cirrhitichthys aprinus)",
    "commonName": "Hawkfish Spotted",
    "scientificName": "Cirrhitichthys aprinus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "hawkfish-spotted.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Dragonets, Foxfaces, Triggers, Hawkfish e Miscelânea"
  },
  {
    "id": "174",
    "name": "Hawkfish Flame (Neocirrhites armatus)",
    "commonName": "Hawkfish Flame",
    "scientificName": "Neocirrhites armatus",
    "synonyms": [
      "Fogo"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "hawkfish-flame.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Dragonets, Foxfaces, Triggers, Hawkfish e Miscelânea"
  },
  {
    "id": "175",
    "name": "Hawkfish Freckled (Paracirrhites forsteri)",
    "commonName": "Hawkfish Freckled",
    "scientificName": "Paracirrhites forsteri",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "hawkfish-freckled.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Dragonets, Foxfaces, Triggers, Hawkfish e Miscelânea"
  },
  {
    "id": "176",
    "name": "Trigger Picasso (Rhinecanthus aculeatus)",
    "commonName": "Trigger Picasso",
    "scientificName": "Rhinecanthus aculeatus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "trigger-picasso.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Dragonets, Foxfaces, Triggers, Hawkfish e Miscelânea"
  },
  {
    "id": "177",
    "name": "Trigger Bursa (Rhinecanthus verrucosus)",
    "commonName": "Trigger Bursa",
    "scientificName": "Rhinecanthus verrucosus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "trigger-bursa.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Dragonets, Foxfaces, Triggers, Hawkfish e Miscelânea"
  },
  {
    "id": "178",
    "name": "Trigger Odonus Niger (Odonus niger)",
    "commonName": "Trigger Odonus Niger",
    "scientificName": "Odonus niger",
    "synonyms": [
      "Gatilho Preto"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "trigger-odonus-niger.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Dragonets, Foxfaces, Triggers, Hawkfish e Miscelânea"
  },
  {
    "id": "179",
    "name": "Trigger Blue Throat (Xanthichthys auromarginatus)",
    "commonName": "Trigger Blue Throat",
    "scientificName": "Xanthichthys auromarginatus",
    "synonyms": [
      "Garganta Azul"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "trigger-blue-throat.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Dragonets, Foxfaces, Triggers, Hawkfish e Miscelânea"
  },
  {
    "id": "180",
    "name": "Trigger Clown (Balistoides conspicillum)",
    "commonName": "Trigger Clown",
    "scientificName": "Balistoides conspicillum",
    "synonyms": [
      "Palhaço"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "trigger-clown.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Dragonets, Foxfaces, Triggers, Hawkfish e Miscelânea"
  },
  {
    "id": "181",
    "name": "Baiacu Canthigaster Valentini (Canthigaster valentini)",
    "commonName": "Baiacu Canthigaster Valentini",
    "scientificName": "Canthigaster valentini",
    "synonyms": [
      "Saddle"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "baiacu-canthigaster-valentini.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Dragonets, Foxfaces, Triggers, Hawkfish e Miscelânea"
  },
  {
    "id": "182",
    "name": "Baiacu Blue Spotted (Canthigaster solandri)",
    "commonName": "Baiacu Blue Spotted",
    "scientificName": "Canthigaster solandri",
    "synonyms": [
      "Canthigaster Solandri"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "baiacu-blue-spotted.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Dragonets, Foxfaces, Triggers, Hawkfish e Miscelânea"
  },
  {
    "id": "183",
    "name": "Baiacu Espinho Diodon (Diodon holocanthus)",
    "commonName": "Baiacu Espinho Diodon",
    "scientificName": "Diodon holocanthus",
    "synonyms": [
      "Spiny Puffer"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "baiacu-espinho-diodon.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Dragonets, Foxfaces, Triggers, Hawkfish e Miscelânea"
  },
  {
    "id": "184",
    "name": "Peixe Coelheiro (Acreichthys tomentosus)",
    "commonName": "Peixe Coelheiro",
    "scientificName": "Acreichthys tomentosus",
    "synonyms": [
      "Comedor de Aiptasia"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "peixe-coelheiro.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Dragonets, Foxfaces, Triggers, Hawkfish e Miscelânea"
  },
  {
    "id": "185",
    "name": "Orange Spotted Filefish (Oxymonacanthus longirostris)",
    "commonName": "Orange Spotted Filefish",
    "scientificName": "Oxymonacanthus longirostris",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "orange-spotted-filefish.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Dragonets, Foxfaces, Triggers, Hawkfish e Miscelânea"
  },
  {
    "id": "186",
    "name": "Zanclus Cornutus (Zanclus cornutus)",
    "commonName": "Zanclus Cornutus",
    "scientificName": "Zanclus cornutus",
    "synonyms": [
      "Moorish Idol"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "zanclus-cornutus.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Dragonets, Foxfaces, Triggers, Hawkfish e Miscelânea"
  },
  {
    "id": "187",
    "name": "Equetus Lanceolatus (Equetus lanceolatus)",
    "commonName": "Equetus Lanceolatus",
    "scientificName": "Equetus lanceolatus",
    "synonyms": [
      "Anteninha Nacional"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "equetus-lanceolatus.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Dragonets, Foxfaces, Triggers, Hawkfish e Miscelânea"
  },
  {
    "id": "188",
    "name": "Salema (Anisotremus virginicus)",
    "commonName": "Salema",
    "scientificName": "Anisotremus virginicus",
    "synonyms": [
      "Anisotremus",
      "xenia pulsante",
      "pom pom xenia",
      "xenia",
      "Xênia Pulsante (Pom Pom / Giant)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "039_xenia_pulsante.webp",
    "section": "Peixes Marinhos",
    "familyGroup": "Dragonets, Foxfaces, Triggers, Hawkfish e Miscelânea"
  },
  {
    "id": "189",
    "name": "Dragon Pipefish (Corythoichthys haematopterus)",
    "commonName": "Dragon Pipefish",
    "scientificName": "Corythoichthys haematopterus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "dragon-pipefish.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Dragonets, Foxfaces, Triggers, Hawkfish e Miscelânea"
  },
  {
    "id": "190",
    "name": "Green Star Polyps (Briareum violaceum)",
    "commonName": "Green Star Polyps",
    "scientificName": "Briareum violaceum",
    "synonyms": [
      "GSP Metálico",
      "gsp",
      "star polyps",
      "briareum",
      "grama verde",
      "Green Star Polyps (GSP Metallic)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "034_green_star_polyps_gsp.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Moles / Soft Corals"
  },
  {
    "id": "191",
    "name": "Xênia Pompom Pulsante (Xenia umbellata)",
    "commonName": "Xênia Pompom Pulsante",
    "scientificName": "Xenia umbellata",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "xenia-pompom-pulsante.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Moles / Soft Corals"
  },
  {
    "id": "192",
    "name": "Xênia Giant (Anthelia sp.)",
    "commonName": "Xênia Giant",
    "scientificName": "Anthelia sp.",
    "synonyms": [
      "Blue Anthelia",
      "cloves papaya",
      "clavularia",
      "fireworks cloves",
      "Cloves Papaya / Tricolor (Clavularia)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "040_cloves_papaya_fireworks.webp",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Moles / Soft Corals"
  },
  {
    "id": "193",
    "name": "Cloves Brown (Clavularia sp.)",
    "commonName": "Cloves Brown",
    "scientificName": "Clavularia sp.",
    "synonyms": [
      "Cravo Marrom"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "cloves-brown.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Moles / Soft Corals"
  },
  {
    "id": "194",
    "name": "Cloves Lemon Drops (Clavularia sp.)",
    "commonName": "Cloves Lemon Drops",
    "scientificName": "Clavularia sp.",
    "synonyms": [
      "Cravo Laranja Dourado"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "cloves-lemon-drops.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Moles / Soft Corals"
  },
  {
    "id": "195",
    "name": "Cloves Japonica Rainbow (Clavularia sp.)",
    "commonName": "Cloves Japonica Rainbow",
    "scientificName": "Clavularia sp.",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "cloves-japonica-rainbow.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Moles / Soft Corals"
  },
  {
    "id": "196",
    "name": "Leather Umbrella (Sarcophyton sp.)",
    "commonName": "Leather Umbrella",
    "scientificName": "Sarcophyton sp.",
    "synonyms": [
      "Couro Cogumelo",
      "Leather Umbrella",
      "Couro Guarda Chuva",
      "Toadstool Leather"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "leather-umbrella.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Moles / Soft Corals"
  },
  {
    "id": "197",
    "name": "Leather Japanese Green (Sarcophyton sp.)",
    "commonName": "Leather Japanese Green",
    "scientificName": "Sarcophyton sp.",
    "synonyms": [
      "Sarcophyton Verde Japonês",
      "leather umbrella",
      "toadstool",
      "sarcophyton",
      "Leather Toadstool / Guarda-Chuva"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "035_leather_toadstool.webp",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Moles / Soft Corals"
  },
  {
    "id": "198",
    "name": "Leather Devil Hand Green (Lobophytum sp.)",
    "commonName": "Leather Devil Hand Green",
    "scientificName": "Lobophytum sp.",
    "synonyms": [
      "Mão do Diabo",
      "Leather Devil Hand Green",
      "Leather Devils Hand Green",
      "Devil's Hand",
      "Devils Hand"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "leather-devil-hand-green.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Moles / Soft Corals"
  },
  {
    "id": "199",
    "name": "Leather Colt (Cladiella sp.)",
    "commonName": "Leather Colt",
    "scientificName": "Cladiella sp.",
    "synonyms": [
      "Árvore de Couro",
      "devils hand",
      "mao do diabo",
      "lobophytum",
      "Leather Devil's Hand / Lobophytum"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "036_leather_devils_hand.webp",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Moles / Soft Corals"
  },
  {
    "id": "200",
    "name": "Leather Lettuce (Sinularia dura)",
    "commonName": "Leather Lettuce",
    "scientificName": "Sinularia dura",
    "synonyms": [
      "Couro Alface"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "leather-lettuce.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Moles / Soft Corals"
  },
  {
    "id": "201",
    "name": "Leather Atomic Brócolis (Capnella sp.)",
    "commonName": "Leather Atomic Brócolis",
    "scientificName": "Capnella sp.",
    "synonyms": [
      "Árvore Kenya Verde"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "leather-atomic-brocolis.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Moles / Soft Corals"
  },
  {
    "id": "202",
    "name": "Kenya Tree (Capnella imbricata)",
    "commonName": "Kenya Tree",
    "scientificName": "Capnella imbricata",
    "synonyms": [
      "Árvore do Quênia Comum"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "kenya-tree.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Moles / Soft Corals"
  },
  {
    "id": "203",
    "name": "Yellow Polyps (Parazoanthus gracilis)",
    "commonName": "Yellow Polyps",
    "scientificName": "Parazoanthus gracilis",
    "synonyms": [
      "Pólipos Amarelos",
      "kenya tree",
      "arvore do quenia",
      "capnella",
      "Kenya Tree (Árvore do Quênia)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "038_kenya_tree_capnella.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Moles / Soft Corals"
  },
  {
    "id": "204",
    "name": "Organ Pipe Coral (Tubipora musica)",
    "commonName": "Organ Pipe Coral",
    "scientificName": "Tubipora musica",
    "synonyms": [
      "Tubipora"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "organ-pipe-coral.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Moles / Soft Corals"
  },
  {
    "id": "205",
    "name": "Mushroom Blue (Discosoma sp.)",
    "commonName": "Mushroom Blue",
    "scientificName": "Discosoma sp.",
    "synonyms": [
      "Azul Metálico"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "mushroom-blue.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Mushrooms e Ricordeas"
  },
  {
    "id": "206",
    "name": "Mushroom Red (Discosoma sp.)",
    "commonName": "Mushroom Red",
    "scientificName": "Discosoma sp.",
    "synonyms": [
      "Vermelho Rubi"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "mushroom-red.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Mushrooms e Ricordeas"
  },
  {
    "id": "207",
    "name": "Mushroom Green Spotted (Discosoma sp.)",
    "commonName": "Mushroom Green Spotted",
    "scientificName": "Discosoma sp.",
    "synonyms": [
      "Verde Pintado"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "mushroom-green-spotted.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Mushrooms e Ricordeas"
  },
  {
    "id": "208",
    "name": "Mushroom Green Tonga (Discosoma sp.)",
    "commonName": "Mushroom Green Tonga",
    "scientificName": "Discosoma sp.",
    "synonyms": [
      "mush verde",
      "discosoma green",
      "green mush",
      "Mushroom Discosoma Metallic Green"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "025_mushroom_discosoma_green.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Mushrooms e Ricordeas"
  },
  {
    "id": "209",
    "name": "Mushroom Striated (Discosoma sp.)",
    "commonName": "Mushroom Striated",
    "scientificName": "Discosoma sp.",
    "synonyms": [
      "Listrado Marrom e Azul",
      "mush azul",
      "mush roxo",
      "discosoma blue",
      "purple mush",
      "Mushroom Discosoma Blue / Purple Spotted"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "023_mushroom_discosoma_blue_purple.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Mushrooms e Ricordeas"
  },
  {
    "id": "210",
    "name": "Mushroom Jawbreaker (Discosoma sp. var. Jawbreaker)",
    "commonName": "Mushroom Jawbreaker",
    "scientificName": "Discosoma sp. var. Jawbreaker",
    "synonyms": [
      "mush superman",
      "discosoma superman",
      "red spotted blue",
      "Mushroom Discosoma Superman"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "022_mushroom_discosoma_superman.webp",
    "section": "Corais e Anêmonas",
    "familyGroup": "Mushrooms e Ricordeas"
  },
  {
    "id": "211",
    "name": "Mushroom Rhodactis Green Hair (Rhodactis sp.)",
    "commonName": "Mushroom Rhodactis Green Hair",
    "scientificName": "Rhodactis sp.",
    "synonyms": [
      "Peludo Verde",
      "rhodactis hairy",
      "mush peludo",
      "green hairy",
      "Mushroom Rhodactis Green Hairy"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "026_rhodactis_green_hairy.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Mushrooms e Ricordeas"
  },
  {
    "id": "212",
    "name": "Mushroom Rhodactis Orange (Rhodactis sp.)",
    "commonName": "Mushroom Rhodactis Orange",
    "scientificName": "Rhodactis sp.",
    "synonyms": [
      "Laranja",
      "rhodactis bullseye",
      "rhodactis laranja",
      "tequila",
      "Mushroom Rhodactis Bullseye / Tonga"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "028_rhodactis_bullseye.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Mushrooms e Ricordeas"
  },
  {
    "id": "213",
    "name": "Mushroom Rhodactis Super Green (Rhodactis sp.)",
    "commonName": "Mushroom Rhodactis Super Green",
    "scientificName": "Rhodactis sp.",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "mushroom-rhodactis-super-green.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Mushrooms e Ricordeas"
  },
  {
    "id": "214",
    "name": "Mushroom Rhodactis St. Thomas (Rhodactis sanctithomae)",
    "commonName": "Mushroom Rhodactis St. Thomas",
    "scientificName": "Rhodactis sanctithomae",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "mushroom-rhodactis-st-thomas.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Mushrooms e Ricordeas"
  },
  {
    "id": "215",
    "name": "Ricordea Florida Laranja (Ricordea florida)",
    "commonName": "Ricordea Florida Laranja",
    "scientificName": "Ricordea florida",
    "synonyms": [
      "mush red",
      "discosoma vermelho",
      "deadpool mush",
      "Mushroom Discosoma Super Red / Deadpool",
      "ricordea florida",
      "ricordea laranja",
      "rainbow",
      "Ricordea Florida Laranja / Rainbow"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "030_ricordea_florida_orange.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Mushrooms e Ricordeas"
  },
  {
    "id": "216",
    "name": "Ricordea Florida Azul (Ricordea florida)",
    "commonName": "Ricordea Florida Azul",
    "scientificName": "Ricordea florida",
    "synonyms": [
      "Verde",
      "ricordea verde",
      "ricordea azul",
      "florida green",
      "Ricordea Florida Verde / Azul"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "031_ricordea_florida_green.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Mushrooms e Ricordeas"
  },
  {
    "id": "217",
    "name": "Ricordea Florida Rainbow (Ricordea florida)",
    "commonName": "Ricordea Florida Rainbow",
    "scientificName": "Ricordea florida",
    "synonyms": [
      "Arco-Íris"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "ricordea-florida-rainbow.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Mushrooms e Ricordeas"
  },
  {
    "id": "218",
    "name": "Ricordea Yuma Rosa (Ricordea yuma)",
    "commonName": "Ricordea Yuma Rosa",
    "scientificName": "Ricordea yuma",
    "synonyms": [
      "Laranja",
      "yuma orange",
      "yuma pink",
      "ricordea yuma laranja",
      "Ricordea Yuma Orange / Pink Rainbow"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "033_ricordea_yuma_orange_rainbow.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Mushrooms e Ricordeas"
  },
  {
    "id": "219",
    "name": "Ricordea Yuma Verde (Ricordea yuma)",
    "commonName": "Ricordea Yuma Verde",
    "scientificName": "Ricordea yuma",
    "synonyms": [
      "ricordea yuma",
      "yuma green",
      "yuma verde",
      "Ricordea Yuma Green / Neon"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "032_ricordea_yuma_green.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Mushrooms e Ricordeas"
  },
  {
    "id": "220",
    "name": "Zoanthus Fire and Ice (Zoanthus sp.)",
    "commonName": "Zoanthus Fire and Ice",
    "scientificName": "Zoanthus sp.",
    "synonyms": [
      "zoa fire and ice",
      "fire & ice",
      "zoanthus fire ice",
      "Zoanthus Fire and Ice"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "009_zoanthus_fire_and_ice.webp",
    "section": "Corais e Anêmonas",
    "familyGroup": "Zoanthus e Palythoas"
  },
  {
    "id": "221",
    "name": "Zoanthus Radioactive Dragon Eye (Zoanthus sp.)",
    "commonName": "Zoanthus Radioactive Dragon Eye",
    "scientificName": "Zoanthus sp.",
    "synonyms": [
      "Verde Radioativo",
      "Dragon Eye",
      "zoa radioactive",
      "radioactive dragon eye",
      "green bay packers",
      "Zoanthus Radioactive Green"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "005_zoanthus_radioactive_green.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Zoanthus e Palythoas"
  },
  {
    "id": "222",
    "name": "Zoanthus Rasta (Zoanthus sp.)",
    "commonName": "Zoanthus Rasta",
    "scientificName": "Zoanthus sp.",
    "synonyms": [
      "Rastafari",
      "Rastas",
      "zoa rasta",
      "rastas",
      "zoanthus rasta",
      "Zoanthus Rasta"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "002_zoanthus_rasta.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Zoanthus e Palythoas"
  },
  {
    "id": "223",
    "name": "Zoanthus King Midas (Zoanthus sp.)",
    "commonName": "Zoanthus King Midas",
    "scientificName": "Zoanthus sp.",
    "synonyms": [
      "Ouro",
      "zoa scrambled eggs",
      "king midas",
      "zoa amarelo",
      "Zoanthus Scrambled Eggs / King Midas"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "014_zoanthus_scrambled_eggs.webp",
    "section": "Corais e Anêmonas",
    "familyGroup": "Zoanthus e Palythoas"
  },
  {
    "id": "224",
    "name": "Zoanthus Utter Chaos (Zoanthus sp.)",
    "commonName": "Zoanthus Utter Chaos",
    "scientificName": "Zoanthus sp.",
    "synonyms": [
      "utter chaos",
      "zoa utter chaos",
      "paly utter chaos",
      "Palythoa Utter Chaos"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "015_palythoa_utter_chaos.webp",
    "section": "Corais e Anêmonas",
    "familyGroup": "Zoanthus e Palythoas"
  },
  {
    "id": "225",
    "name": "Zoanthus Watermelon (Zoanthus sp.)",
    "commonName": "Zoanthus Watermelon",
    "scientificName": "Zoanthus sp.",
    "synonyms": [
      "Melancia",
      "Whammin Watermelon",
      "zoa watermelon",
      "zoa melancia",
      "whammin watermelon",
      "Zoanthus Watermelon (Melancia)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "003_zoanthus_watermelon.webp",
    "section": "Corais e Anêmonas",
    "familyGroup": "Zoanthus e Palythoas"
  },
  {
    "id": "226",
    "name": "Zoanthus Scrambled Eggs (Zoanthus sp.)",
    "commonName": "Zoanthus Scrambled Eggs",
    "scientificName": "Zoanthus sp.",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "zoanthus-scrambled-eggs.webp",
    "section": "Corais e Anêmonas",
    "familyGroup": "Zoanthus e Palythoas"
  },
  {
    "id": "227",
    "name": "Zoanthus Superman (Zoanthus sp.)",
    "commonName": "Zoanthus Superman",
    "scientificName": "Zoanthus sp.",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "zoanthus-superman.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Zoanthus e Palythoas"
  },
  {
    "id": "228",
    "name": "Zoanthus Baby Black Blue (Zoanthus sp.)",
    "commonName": "Zoanthus Baby Black Blue",
    "scientificName": "Zoanthus sp.",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "zoanthus-baby-black-blue.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Zoanthus e Palythoas"
  },
  {
    "id": "229",
    "name": "Zoanthus White Zombie (Zoanthus sp.)",
    "commonName": "Zoanthus White Zombie",
    "scientificName": "Zoanthus sp.",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "zoanthus-white-zombie.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Zoanthus e Palythoas"
  },
  {
    "id": "230",
    "name": "Zoanthus Rainbow Hornet (Zoanthus sp.)",
    "commonName": "Zoanthus Rainbow Hornet",
    "scientificName": "Zoanthus sp.",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "zoanthus-rainbow-hornet.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Zoanthus e Palythoas"
  },
  {
    "id": "231",
    "name": "Zoanthus Blue Hornet (Zoanthus sp.)",
    "commonName": "Zoanthus Blue Hornet",
    "scientificName": "Zoanthus sp.",
    "synonyms": [
      "zoa blue hornet",
      "hornet azul",
      "blue hornet",
      "Zoanthus Blue Hornet"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "010_zoanthus_blue_hornet.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Zoanthus e Palythoas"
  },
  {
    "id": "232",
    "name": "Zoanthus Red Hornet (Zoanthus sp.)",
    "commonName": "Zoanthus Red Hornet",
    "scientificName": "Zoanthus sp.",
    "synonyms": [
      "zoa red hornet",
      "hornet vermelho",
      "red hornet",
      "Zoanthus Red Hornet"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "011_zoanthus_red_hornet.webp",
    "section": "Corais e Anêmonas",
    "familyGroup": "Zoanthus e Palythoas"
  },
  {
    "id": "233",
    "name": "Zoanthus Sunny D (Zoanthus sp.)",
    "commonName": "Zoanthus Sunny D",
    "scientificName": "Zoanthus sp.",
    "synonyms": [
      "Sunny Delight",
      "zoa sunny d",
      "sunny day",
      "zoanthus sunny",
      "sunny d",
      "Zoanthus Sunny Day (Sunny D)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "001_zoanthus_sunny_day.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Zoanthus e Palythoas"
  },
  {
    "id": "234",
    "name": "Zoanthus Grandis Cinnamon (Zoanthus gigantus)",
    "commonName": "Zoanthus Grandis Cinnamon",
    "scientificName": "Zoanthus gigantus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "zoanthus-grandis-cinnamon.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Zoanthus e Palythoas"
  },
  {
    "id": "235",
    "name": "Zoanthus Fruit Loops (Zoanthus sp.)",
    "commonName": "Zoanthus Fruit Loops",
    "scientificName": "Zoanthus sp.",
    "synonyms": [
      "zoa fruit loops",
      "fruit loop",
      "zoanthus fruit loops",
      "Zoanthus Fruit Loops"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "007_zoanthus_fruit_loops.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Zoanthus e Palythoas"
  },
  {
    "id": "236",
    "name": "Palythoa Grandis (Palythoa grandis)",
    "commonName": "Palythoa Grandis",
    "scientificName": "Palythoa grandis",
    "synonyms": [
      "Pólipo Gigante",
      "paly grandis",
      "cinnamon polyp",
      "sunburn grandis",
      "Palythoa Grandis / Cinnamon"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "019_palythoa_grandis.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Zoanthus e Palythoas"
  },
  {
    "id": "237",
    "name": "Palythoa God of Armor (Palythoa sp.)",
    "commonName": "Palythoa God of Armor",
    "scientificName": "Palythoa sp.",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "palythoa-god-of-armor.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Zoanthus e Palythoas"
  },
  {
    "id": "238",
    "name": "Palythoa Mind Blowing (Palythoa sp.)",
    "commonName": "Palythoa Mind Blowing",
    "scientificName": "Palythoa sp.",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "palythoa-mind-blowing.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Zoanthus e Palythoas"
  },
  {
    "id": "239",
    "name": "Palythoa Captain America (Palythoa sp.)",
    "commonName": "Palythoa Captain America",
    "scientificName": "Palythoa sp.",
    "synonyms": [
      "paly captain america",
      "capitao america",
      "Palythoa Captain America"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "018_palythoa_captain_america.webp",
    "section": "Corais e Anêmonas",
    "familyGroup": "Zoanthus e Palythoas"
  },
  {
    "id": "240",
    "name": "Palythoa Green Nucler (Palythoa sp.)",
    "commonName": "Palythoa Green Nucler",
    "scientificName": "Palythoa sp.",
    "synonyms": [
      "Verde Radioativo"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "palythoa-green-nucler.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Zoanthus e Palythoas"
  },
  {
    "id": "241",
    "name": "Torch Coral Holy Grail (Euphyllia glabrescens)",
    "commonName": "Torch Coral Holy Grail",
    "scientificName": "Euphyllia glabrescens",
    "synonyms": [
      "Tocha Santo Graal"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "torch-coral-holy-grail.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "242",
    "name": "Torch Coral Dragon Soul (Euphyllia glabrescens)",
    "commonName": "Torch Coral Dragon Soul",
    "scientificName": "Euphyllia glabrescens",
    "synonyms": [
      "Alma de Dragão",
      "torch gold",
      "dragon soul",
      "torch 24k",
      "hellfire",
      "Torch Dragon Soul / Indo Gold / 24k"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "051_torch_dragon_soul_gold.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "243",
    "name": "Torch Coral 24k Gold (Euphyllia glabrescens)",
    "commonName": "Torch Coral 24k Gold",
    "scientificName": "Euphyllia glabrescens",
    "synonyms": [
      "Tocha Ouro",
      "Coral Torch Gold Dourado",
      "Torch Gold Dourado",
      "Torch Gold",
      "Coral Torch Gold",
      "Torch Dourado",
      "Torch 24k Gold",
      "black torch",
      "torch preto",
      "euphyllia glabrescens",
      "Torch Black (Ponta Verde/Branca)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "050_torch_gold_24k_holy_grail.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "244",
    "name": "Torch Coral Green Tip (Euphyllia glabrescens)",
    "commonName": "Torch Coral Green Tip",
    "scientificName": "Euphyllia glabrescens",
    "synonyms": [
      "Ponta Verde",
      "torch green",
      "euphyllia torch",
      "torch verde",
      "Torch Green Tip / Metallic Green"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "049_torch_green_tip.webp",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "245",
    "name": "Torch Coral Black Torch (Euphyllia glabrescens)",
    "commonName": "Torch Coral Black Torch",
    "scientificName": "Euphyllia glabrescens",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "torch-coral-black-torch.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "246",
    "name": "Hammer Coral Toxic Green (Fimbriaphyllia ancora)",
    "commonName": "Hammer Coral Toxic Green",
    "scientificName": "Fimbriaphyllia ancora",
    "synonyms": [
      "Martelo Verde",
      "Coral Hammer Verde Metálico",
      "Hammer Verde Metálico",
      "Martelo Verde Metálico",
      "Hammer Toxic Green",
      "Coral Hammer Verde Metalico",
      "hammer green",
      "hammer verde",
      "hammer splatter",
      "Hammer Full Green / Toxic Splatter"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "044_hammer_full_green.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "247",
    "name": "Hammer Coral Gold (Fimbriaphyllia ancora)",
    "commonName": "Hammer Coral Gold",
    "scientificName": "Fimbriaphyllia ancora",
    "synonyms": [
      "Martelo Dourado",
      "hammer gold",
      "hammer dourado",
      "hammer yellow",
      "Hammer Gold / Yellow"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "046_hammer_gold_yellow.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "248",
    "name": "Hammer Coral Orange (Fimbriaphyllia ancora)",
    "commonName": "Hammer Coral Orange",
    "scientificName": "Fimbriaphyllia ancora",
    "synonyms": [
      "Martelo Laranja"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "hammer-coral-orange.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "249",
    "name": "Hammer Coral Branching (Fimbriaphyllia paraancora)",
    "commonName": "Hammer Coral Branching",
    "scientificName": "Fimbriaphyllia paraancora",
    "synonyms": [
      "Martelo Ramo",
      "hammer bicolor",
      "euphyllia hammer",
      "martelo bicolor",
      "Hammer Bicolor (Euphyllia/Fimbriaphyllia)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "043_hammer_bicolor.webp",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "250",
    "name": "Frogspawn Coral Bicolor (Euphyllia divisa)",
    "commonName": "Frogspawn Coral Bicolor",
    "scientificName": "Euphyllia divisa",
    "synonyms": [
      "Ponta Roxa",
      "frogspawn",
      "frog bicolor",
      "frog ponta roxa",
      "Frogspawn Green c/ Ponta Roxa / Bicolor"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "047_frogspawn_bicolor.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "251",
    "name": "Frogspawn Coral Green (Euphyllia divisa)",
    "commonName": "Frogspawn Coral Green",
    "scientificName": "Euphyllia divisa",
    "synonyms": [
      "Verde",
      "Coral Frogspawn Ultra Green",
      "Frogspawn Ultra Green",
      "Coral Frogspan Ultra Green",
      "Frogspan Ultra Green",
      "frog green",
      "octospawn",
      "frog verde",
      "Frogspawn Full Green / Octospawn"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "048_frogspawn_green.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "252",
    "name": "Octospawn Coral (Euphyllia yaeyamaensis)",
    "commonName": "Octospawn Coral",
    "scientificName": "Euphyllia yaeyamaensis",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "octospawn-coral.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "253",
    "name": "Duncan Coral (Duncanopsammia axifuga)",
    "commonName": "Duncan Coral",
    "scientificName": "Duncanopsammia axifuga",
    "synonyms": [
      "Duncanopsammia"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "duncan-coral.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "254",
    "name": "Trumpet Kryptonita (Caulastraea furcata)",
    "commonName": "Trumpet Kryptonita",
    "scientificName": "Caulastraea furcata",
    "synonyms": [
      "Trompete Verde Neon",
      "trumpet kryptonita",
      "kriptonita",
      "caulastrea",
      "Trumpet Kryptonita (Caulastrea)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "053_trumpet_kryptonita.webp",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "255",
    "name": "Trumpet Blue (Caulastraea echinulata)",
    "commonName": "Trumpet Blue",
    "scientificName": "Caulastraea echinulata",
    "synonyms": [
      "Trompete Azul Claro"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "trumpet-blue.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "256",
    "name": "Trumpet Bicolor (Caulastraea furcata)",
    "commonName": "Trumpet Bicolor",
    "scientificName": "Caulastraea furcata",
    "synonyms": [
      "trumpet bicolor",
      "caulastrea furcata",
      "Trumpet Bicolor / Azul"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "054_trumpet_bicolor.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "257",
    "name": "Acanthastrea Micromussa Lordhowensis Rainbow (Micromussa lordhowensis)",
    "commonName": "Acanthastrea Micromussa Lordhowensis Rainbow",
    "scientificName": "Micromussa lordhowensis",
    "synonyms": [
      "duncan",
      "duncanopsammia",
      "coral duncan",
      "Coral Duncan (Duncanopsammia axifuga)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "055_coral_duncan.webp",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "258",
    "name": "Acanthastrea Micromussa Orange (Micromussa lordhowensis)",
    "commonName": "Acanthastrea Micromussa Orange",
    "scientificName": "Micromussa lordhowensis",
    "synonyms": [
      "Laranja",
      "acan rainbow",
      "acan laranja",
      "acanthastrea lord",
      "Acanthastrea Rainbow / Orange Crush"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "057_acanthastrea_rainbow.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "259",
    "name": "Acanthastrea Micromussa Ultra Red (Micromussa lordhowensis)",
    "commonName": "Acanthastrea Micromussa Ultra Red",
    "scientificName": "Micromussa lordhowensis",
    "synonyms": [
      "Vermelha",
      "acan red",
      "acanthastrea",
      "micromussa",
      "Acanthastrea / Micromussa Red & Green"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "056_acanthastrea_red_green.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "260",
    "name": "Blastomussa Wellsi Red (Blastomussa wellsi)",
    "commonName": "Blastomussa Wellsi Red",
    "scientificName": "Blastomussa wellsi",
    "synonyms": [
      "Vermelha",
      "Blastomussa Wellsi Red",
      "Blastomussa Red",
      "Crimson Blastomussa",
      "Ironman Blastomussa"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "blastomussa-wellsi-red.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "261",
    "name": "Blastomussa Merletti Green (Blastomussa merletti)",
    "commonName": "Blastomussa Merletti Green",
    "scientificName": "Blastomussa merletti",
    "synonyms": [
      "blastomussa",
      "favia dragon soul",
      "chalice",
      "Blastomussa / Favia / Chalice"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "060_blastomussa_favia_chalice.webp",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "262",
    "name": "Goniopora Rainbow (Goniopora sp.)",
    "commonName": "Goniopora Rainbow",
    "scientificName": "Goniopora sp.",
    "synonyms": [
      "Arco-Íris"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "goniopora-rainbow.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "263",
    "name": "Goniopora Red (Goniopora sp.)",
    "commonName": "Goniopora Red",
    "scientificName": "Goniopora sp.",
    "synonyms": [
      "Vermelha",
      "goniopora red",
      "goniopora vermelha",
      "goniopora rosa",
      "Goniopora Red / Pink (Centro Azul)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "058_goniopora_red_pink.webp",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "264",
    "name": "Goniopora Green (Goniopora sp.)",
    "commonName": "Goniopora Green",
    "scientificName": "Goniopora sp.",
    "synonyms": [
      "Verde",
      "goniopora green",
      "goniopora verde",
      "alveopora",
      "Goniopora Green Neon / Alveopora"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "059_goniopora_green_neon.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "265",
    "name": "Alveopora Mint Green (Alveopora sp.)",
    "commonName": "Alveopora Mint Green",
    "scientificName": "Alveopora sp.",
    "synonyms": [
      "Menta"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "alveopora-mint-green.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "266",
    "name": "Chalice Coral Purple (Echinophyllia sp.)",
    "commonName": "Chalice Coral Purple",
    "scientificName": "Echinophyllia sp.",
    "synonyms": [
      "Cálice Roxo"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "chalice-coral-purple.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "267",
    "name": "Chalice Coral Hollywood Stunner (Echinopora lamellosa)",
    "commonName": "Chalice Coral Hollywood Stunner",
    "scientificName": "Echinopora lamellosa",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "chalice-coral-hollywood-stunner.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "268",
    "name": "Chalice Coral Yellow Eyes (Echinophyllia sp.)",
    "commonName": "Chalice Coral Yellow Eyes",
    "scientificName": "Echinophyllia sp.",
    "synonyms": [
      "Olhos Dourados"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "chalice-coral-yellow-eyes.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "269",
    "name": "Chalice Coral Miami Hurricane (Echinophyllia aspera)",
    "commonName": "Chalice Coral Miami Hurricane",
    "scientificName": "Echinophyllia aspera",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "chalice-coral-miami-hurricane.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "270",
    "name": "Favia War Coral (Favites pentagona)",
    "commonName": "Favia War Coral",
    "scientificName": "Favites pentagona",
    "synonyms": [
      "Coral de Guerra"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "favia-war-coral.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "271",
    "name": "Favia Dragon Soul (Favia sp.)",
    "commonName": "Favia Dragon Soul",
    "scientificName": "Favia sp.",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "favia-dragon-soul.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "272",
    "name": "Plate Coral Green (Fungia sp.)",
    "commonName": "Plate Coral Green",
    "scientificName": "Fungia sp.",
    "synonyms": [
      "Prato Verde",
      "Plate Coral Green",
      "Plate Coral",
      "Coral Plate"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "plate-coral-green.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "273",
    "name": "Plate Coral Purple (Heliofungia actiniformis)",
    "commonName": "Plate Coral Purple",
    "scientificName": "Heliofungia actiniformis",
    "synonyms": [
      "Prato Roxo Ponta Azul"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "plate-coral-purple.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "274",
    "name": "Scolymia Australis Bleeding Apple (Homophyllia australis)",
    "commonName": "Scolymia Australis Bleeding Apple",
    "scientificName": "Homophyllia australis",
    "synonyms": [
      "Maçã Sangrenta"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "scolymia-australis-bleeding-apple.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "275",
    "name": "Scolymia Australis Warpaint (Homophyllia australis)",
    "commonName": "Scolymia Australis Warpaint",
    "scientificName": "Homophyllia australis",
    "synonyms": [
      "Pintura de Guerra"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "scolymia-australis-warpaint.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "276",
    "name": "Acanthophyllia Deshayesiana (Acanthophyllia deshayesiana)",
    "commonName": "Acanthophyllia Deshayesiana",
    "scientificName": "Acanthophyllia deshayesiana",
    "synonyms": [
      "Donut Coral"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "acanthophyllia-deshayesiana.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "277",
    "name": "Cynarina Lacrymalis (Cynarina lacrymalis)",
    "commonName": "Cynarina Lacrymalis",
    "scientificName": "Cynarina lacrymalis",
    "synonyms": [
      "Botão Vermelho"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "cynarina-lacrymalis.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "278",
    "name": "Plerogyra Sinuosa (Plerogyra sinuosa)",
    "commonName": "Plerogyra Sinuosa",
    "scientificName": "Plerogyra sinuosa",
    "synonyms": [
      "Coral Bolha",
      "Bubble Coral"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "plerogyra-sinuosa.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "279",
    "name": "Pavona Cactus Green (Pavona cactus)",
    "commonName": "Pavona Cactus Green",
    "scientificName": "Pavona cactus",
    "synonyms": [
      "Pavona Cacto Verde"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "pavona-cactus-green.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "280",
    "name": "Hydnophora Green (Hydnophora rigida)",
    "commonName": "Hydnophora Green",
    "scientificName": "Hydnophora rigida",
    "synonyms": [
      "Chifre Verde"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "hydnophora-green.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "281",
    "name": "Montipora Digitata Orange (Montipora digitata)",
    "commonName": "Montipora Digitata Orange",
    "scientificName": "Montipora digitata",
    "synonyms": [
      "Laranja"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "montipora-digitata-orange.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros SPS"
  },
  {
    "id": "282",
    "name": "Montipora Digitata Green (Montipora digitata)",
    "commonName": "Montipora Digitata Green",
    "scientificName": "Montipora digitata",
    "synonyms": [
      "Verde"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "montipora-digitata-green.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros SPS"
  },
  {
    "id": "283",
    "name": "Montipora Digitata Forest Fire (Montipora digitata)",
    "commonName": "Montipora Digitata Forest Fire",
    "scientificName": "Montipora digitata",
    "synonyms": [
      "montipora digitata",
      "forest fire",
      "bubblegum",
      "Montipora Digitata Red / Forest Fire"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "063_montipora_digitata_forest_fire.webp",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros SPS"
  },
  {
    "id": "284",
    "name": "Montipora Cap (Montipora capricornis)",
    "commonName": "Montipora Cap",
    "scientificName": "Montipora capricornis",
    "synonyms": [
      "Prato Vermelha",
      "montipora prato vermelha",
      "capricornis red",
      "Montipora Capricornis Vermelha (Prato Red)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "061_montipora_capricornis_red.webp",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros SPS"
  },
  {
    "id": "285",
    "name": "Montipora Setosa (Montipora setosa)",
    "commonName": "Montipora Setosa",
    "scientificName": "Montipora setosa",
    "synonyms": [
      "Laranja Encarnado"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "montipora-setosa.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros SPS"
  },
  {
    "id": "286",
    "name": "Montipora Spongodes (Montipora spongodes)",
    "commonName": "Montipora Spongodes",
    "scientificName": "Montipora spongodes",
    "synonyms": [
      "Verde e Marrom"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "montipora-spongodes.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros SPS"
  },
  {
    "id": "287",
    "name": "Montipora Sunset (Montipora tuberculosa)",
    "commonName": "Montipora Sunset",
    "scientificName": "Montipora tuberculosa",
    "synonyms": [
      "Pôr do Sol",
      "montipora superman",
      "montipora sunset",
      "rainbow",
      "Montipora Incrustante (Superman / Sunset)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "064_montipora_superman_incrustante.webp",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros SPS"
  },
  {
    "id": "288",
    "name": "Acropora Green Slimer (Acropora yongei)",
    "commonName": "Acropora Green Slimer",
    "scientificName": "Acropora yongei",
    "synonyms": [
      "acropora",
      "bali slimer",
      "valida tricolor",
      "millepora",
      "Acropora (Bali Slimer / Valida / Millepora)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "068_acropora_bali_slimer_valida.png",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros SPS"
  },
  {
    "id": "289",
    "name": "Acropora Millepora Rosa (Acropora millepora)",
    "commonName": "Acropora Millepora Rosa",
    "scientificName": "Acropora millepora",
    "synonyms": [
      "Pink Mille"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "acropora-millepora-rosa.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros SPS"
  },
  {
    "id": "290",
    "name": "Acropora Millepora Blue (Acropora millepora)",
    "commonName": "Acropora Millepora Blue",
    "scientificName": "Acropora millepora",
    "synonyms": [
      "Azul"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "acropora-millepora-blue.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros SPS"
  },
  {
    "id": "291",
    "name": "Acropora Tenuis Blue Sky (Acropora tenuis)",
    "commonName": "Acropora Tenuis Blue Sky",
    "scientificName": "Acropora tenuis",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "acropora-tenuis-blue-sky.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros SPS"
  },
  {
    "id": "292",
    "name": "Acropora Tortuosa (Acropora tortuosa)",
    "commonName": "Acropora Tortuosa",
    "scientificName": "Acropora tortuosa",
    "synonyms": [
      "Oregon Tort"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "acropora-tortuosa.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros SPS"
  },
  {
    "id": "293",
    "name": "Acropora Valida (Acropora valida)",
    "commonName": "Acropora Valida",
    "scientificName": "Acropora valida",
    "synonyms": [
      "Tri-Color Valida"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "acropora-valida.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros SPS"
  },
  {
    "id": "294",
    "name": "Acropora Formosa (Acropora formosa)",
    "commonName": "Acropora Formosa",
    "scientificName": "Acropora formosa",
    "synonyms": [
      "Staghorn Azul",
      "seriatopora hystrix",
      "birdsnest",
      "ninho de passaro",
      "Seriatopora Hystrix (Birdsnest Rosa)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "066_seriatopora_hystrix_pink.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros SPS"
  },
  {
    "id": "295",
    "name": "Seriatopora Hystrix (Seriatopora hystrix)",
    "commonName": "Seriatopora Hystrix",
    "scientificName": "Seriatopora hystrix",
    "synonyms": [
      "Ninho de Pássaro Rosa"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "seriatopora-hystrix.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros SPS"
  },
  {
    "id": "296",
    "name": "Seriatopora Bird of Paradise (Seriatopora guttatus)",
    "commonName": "Seriatopora Bird of Paradise",
    "scientificName": "Seriatopora guttatus",
    "synonyms": [
      "Pássaro do Paraíso"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "seriatopora-bird-of-paradise.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros SPS"
  },
  {
    "id": "297",
    "name": "Stylophora Milka (Stylophora pistillata)",
    "commonName": "Stylophora Milka",
    "scientificName": "Stylophora pistillata",
    "synonyms": [
      "Estilófora Roxa",
      "stylophora milka",
      "milka",
      "stylophora roxa",
      "Stylophora Milka (Roxa)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "065_stylophora_milka.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros SPS"
  },
  {
    "id": "298",
    "name": "Pocillopora Damicornis Green (Pocillopora damicornis)",
    "commonName": "Pocillopora Damicornis Green",
    "scientificName": "Pocillopora damicornis",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "pocillopora-damicornis-green.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros SPS"
  },
  {
    "id": "299",
    "name": "Anêmona Bubble Tip Rose (Entacmaea quadricolor)",
    "commonName": "Anêmona Bubble Tip Rose",
    "scientificName": "Entacmaea quadricolor",
    "synonyms": [
      "Ponta de Bolha Rosa",
      "Bubble Tip Rose",
      "Bubbletip Rose",
      "Anêmona Bubbletip Rose",
      "Rose BTA",
      "RBTA"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "anemona-bubble-tip-rose.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Anêmonas Marinhas"
  },
  {
    "id": "300",
    "name": "Anêmona Bubble Tip Rainbow (Entacmaea quadricolor)",
    "commonName": "Anêmona Bubble Tip Rainbow",
    "scientificName": "Entacmaea quadricolor",
    "synonyms": [
      "Arco-Íris",
      "Bubble Tip Rainbow",
      "Bubbletip Rainbow",
      "Anêmona Bubbletip Rainbow",
      "Rainbow BTA",
      "anemona bta",
      "rbta",
      "bubble tip rose",
      "rainbow",
      "Anêmona Bubble Tip Rose / Rainbow (RBTA)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "041_anemona_bta_rose_rainbow.webp",
    "section": "Corais e Anêmonas",
    "familyGroup": "Anêmonas Marinhas"
  },
  {
    "id": "301",
    "name": "Anêmona Bubble Tip Green (Entacmaea quadricolor)",
    "commonName": "Anêmona Bubble Tip Green",
    "scientificName": "Entacmaea quadricolor",
    "synonyms": [
      "Verde Metálica",
      "Bubble Tip Green",
      "Bubbletip Green",
      "Anêmona Bubbletip Green",
      "Green BTA",
      "gbta",
      "bubble tip green",
      "anemona verde",
      "Anêmona Bubble Tip Green (GBTA)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "042_anemona_bta_green.webp",
    "section": "Corais e Anêmonas",
    "familyGroup": "Anêmonas Marinhas"
  },
  {
    "id": "302",
    "name": "Anêmona Bubble Tip Sunburst (Entacmaea quadricolor)",
    "commonName": "Anêmona Bubble Tip Sunburst",
    "scientificName": "Entacmaea quadricolor",
    "synonyms": [
      "Colorado Sunburst"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "anemona-bubble-tip-sunburst.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Anêmonas Marinhas"
  },
  {
    "id": "303",
    "name": "Anêmona Carpet (Stichodactyla haddoni)",
    "commonName": "Anêmona Carpet",
    "scientificName": "Stichodactyla haddoni",
    "synonyms": [
      "Haddoni Verde",
      "Carpet Green"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "anemona-carpet-green.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Anêmonas Marinhas"
  },
  {
    "id": "304",
    "name": "Anêmona Sebae (Heteractis crispa)",
    "commonName": "Anêmona Sebae",
    "scientificName": "Heteractis crispa",
    "synonyms": [
      "Heteractis Crispa"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "anemona-sebae.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Anêmonas Marinhas"
  },
  {
    "id": "305",
    "name": "Anêmona Magnífica (Heteractis magnifica)",
    "commonName": "Anêmona Magnífica",
    "scientificName": "Heteractis magnifica",
    "synonyms": [
      "Heteractis Magnifica"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "anemona-magnifica.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Anêmonas Marinhas"
  },
  {
    "id": "306",
    "name": "Anêmona Passiflora Nacional (Condylactis gigantea)",
    "commonName": "Anêmona Passiflora Nacional",
    "scientificName": "Condylactis gigantea",
    "synonyms": [
      "Condylactis Gigantea"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "anemona-passiflora-nacional.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Anêmonas Marinhas"
  },
  {
    "id": "307",
    "name": "Anêmona Rock Flower (Phymanthus crucifer)",
    "commonName": "Anêmona Rock Flower",
    "scientificName": "Phymanthus crucifer",
    "synonyms": [
      "Flor das Rochas"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "anemona-rock-flower.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Anêmonas Marinhas"
  },
  {
    "id": "308",
    "name": "Camarão Bailarino Comedor de Aiptasia (Lysmata wurdemanni)",
    "commonName": "Camarão Bailarino Comedor de Aiptasia",
    "scientificName": "Lysmata wurdemanni",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "camarao-bailarino-comedor-de-aiptasia.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Camarões e Caranguejos Ornamentais e Limpeza"
  },
  {
    "id": "309",
    "name": "Camarão Skunk Cleaner (Lysmata amboinensis)",
    "commonName": "Camarão Skunk Cleaner",
    "scientificName": "Lysmata amboinensis",
    "synonyms": [
      "Limpador Listrado"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "camarao-skunk-cleaner.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Camarões e Caranguejos Ornamentais e Limpeza"
  },
  {
    "id": "310",
    "name": "Camarão Blood (Lysmata debelius)",
    "commonName": "Camarão Blood",
    "scientificName": "Lysmata debelius",
    "synonyms": [
      "Fogo",
      "Blood Shrimp"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "camarao-blood.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Camarões e Caranguejos Ornamentais e Limpeza"
  },
  {
    "id": "311",
    "name": "Camarão Stenopus (Stenopus hispidus)",
    "commonName": "Camarão Stenopus",
    "scientificName": "Stenopus hispidus",
    "synonyms": [
      "Palhaço Barbeiro"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "camarao-stenopus.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Camarões e Caranguejos Ornamentais e Limpeza"
  },
  {
    "id": "312",
    "name": "Camarão Stenopus Gold (Stenopus scutellatus)",
    "commonName": "Camarão Stenopus Gold",
    "scientificName": "Stenopus scutellatus",
    "synonyms": [
      "Barbeiro Dourado",
      "camarao cleaner",
      "camarao bailarino",
      "blood shrimp",
      "Camarões (Cleaner, Bailarino e Blood Shrimp)"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "089_camaroes_cleaner_bailarino.webp",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Camarões e Caranguejos Ornamentais e Limpeza"
  },
  {
    "id": "313",
    "name": "Camarão Sexy (Thor amboinensis)",
    "commonName": "Camarão Sexy",
    "scientificName": "Thor amboinensis",
    "synonyms": [
      "Anêmona Dançante"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "camarao-sexy.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Camarões e Caranguejos Ornamentais e Limpeza"
  },
  {
    "id": "314",
    "name": "Camarão Pistola Tigre (Alpheus bellulus)",
    "commonName": "Camarão Pistola Tigre",
    "scientificName": "Alpheus bellulus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "camarao-pistola-tigre.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Camarões e Caranguejos Ornamentais e Limpeza"
  },
  {
    "id": "315",
    "name": "Camarão Pistola Randalli (Alpheus randalli)",
    "commonName": "Camarão Pistola Randalli",
    "scientificName": "Alpheus randalli",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "camarao-pistola-randalli.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Camarões e Caranguejos Ornamentais e Limpeza"
  },
  {
    "id": "316",
    "name": "Caranguejo Mithrax (Mithraculus sculptus)",
    "commonName": "Caranguejo Mithrax",
    "scientificName": "Mithraculus sculptus",
    "synonyms": [
      "Mitrax Comedor de Bolhas"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "caranguejo-mithrax.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Camarões e Caranguejos Ornamentais e Limpeza"
  },
  {
    "id": "317",
    "name": "Caranguejo Aranha (Stenorhynchus seticornis)",
    "commonName": "Caranguejo Aranha",
    "scientificName": "Stenorhynchus seticornis",
    "synonyms": [
      "Stenorhynchus"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "caranguejo-aranha.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Camarões e Caranguejos Ornamentais e Limpeza"
  },
  {
    "id": "318",
    "name": "Caranguejo Porcelana Anêmona (Neopetrolisthes maculatus)",
    "commonName": "Caranguejo Porcelana Anêmona",
    "scientificName": "Neopetrolisthes maculatus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "caranguejo-porcelana-anemona.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Camarões e Caranguejos Ornamentais e Limpeza"
  },
  {
    "id": "319",
    "name": "Mini Paguro (Clibanarius tricolor)",
    "commonName": "Mini Paguro",
    "scientificName": "Clibanarius tricolor",
    "synonyms": [
      "Hermitão Tricolor"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "mini-paguro.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Camarões e Caranguejos Ornamentais e Limpeza"
  },
  {
    "id": "320",
    "name": "Mini Paguro Antillensis Nacional (Clibanarius antillensis)",
    "commonName": "Mini Paguro Antillensis Nacional",
    "scientificName": "Clibanarius antillensis",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "mini-paguro-antillensis-nacional.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Camarões e Caranguejos Ornamentais e Limpeza"
  },
  {
    "id": "321",
    "name": "Paguro Pata Amarela (Calcinus tibicen)",
    "commonName": "Paguro Pata Amarela",
    "scientificName": "Calcinus tibicen",
    "synonyms": [
      "Calcinus Tibicen"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "paguro-pata-amarela.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Camarões e Caranguejos Ornamentais e Limpeza"
  },
  {
    "id": "322",
    "name": "Paguro Pata Azul (Calcinus elegans)",
    "commonName": "Paguro Pata Azul",
    "scientificName": "Calcinus elegans",
    "synonyms": [
      "Blue Leg Hermit"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "paguro-pata-azul.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Camarões e Caranguejos Ornamentais e Limpeza"
  },
  {
    "id": "323",
    "name": "Paguro Pata Vermelha (Paguristes cadenati)",
    "commonName": "Paguro Pata Vermelha",
    "scientificName": "Paguristes cadenati",
    "synonyms": [
      "Scarlet Hermit"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "paguro-pata-vermelha.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Camarões e Caranguejos Ornamentais e Limpeza"
  },
  {
    "id": "324",
    "name": "Pagurão Petrochirus Diogenes (Petrochirus diogenes)",
    "commonName": "Pagurão Petrochirus Diogenes",
    "scientificName": "Petrochirus diogenes",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "pagurao-petrochirus-diogenes.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Camarões e Caranguejos Ornamentais e Limpeza"
  },
  {
    "id": "325",
    "name": "Turbo Snail (Turbo fluctuosus)",
    "commonName": "Turbo Snail",
    "scientificName": "Turbo fluctuosus",
    "synonyms": [
      "Caracol Turbo Limpa Vidro",
      "paguro",
      "mini paguro",
      "turbo snail",
      "nish snail",
      "Equipe de Limpeza (Mini Paguro & Snails)"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "090_equipe_limpeza_paguro_snail.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Moluscos, Equinodermos e Equipe de Limpeza Recifal"
  },
  {
    "id": "326",
    "name": "Strombus Snail (Strombus alatus)",
    "commonName": "Strombus Snail",
    "scientificName": "Strombus alatus",
    "synonyms": [
      "Concha Limpa Substrato"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "strombus-snail.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Moluscos, Equinodermos e Equipe de Limpeza Recifal"
  },
  {
    "id": "327",
    "name": "Nassarius Snail (Nassarius vibex)",
    "commonName": "Nassarius Snail",
    "scientificName": "Nassarius vibex",
    "synonyms": [
      "Concha Enterradora"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "nassarius-snail.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Moluscos, Equinodermos e Equipe de Limpeza Recifal"
  },
  {
    "id": "328",
    "name": "Orange Snail (Babylonia sp.)",
    "commonName": "Orange Snail",
    "scientificName": "Babylonia sp.",
    "synonyms": [
      "Babylonia"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "orange-snail.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Moluscos, Equinodermos e Equipe de Limpeza Recifal"
  },
  {
    "id": "329",
    "name": "Cerith Snail (Cerithium atratum)",
    "commonName": "Cerith Snail",
    "scientificName": "Cerithium atratum",
    "synonyms": [
      "Caracol Cerith"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "cerith-snail.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Moluscos, Equinodermos e Equipe de Limpeza Recifal"
  },
  {
    "id": "330",
    "name": "Concha Flame Scallop (Lima scabra)",
    "commonName": "Concha Flame Scallop",
    "scientificName": "Lima scabra",
    "synonyms": [
      "Mexilhão Chama"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "concha-flame-scallop.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Moluscos, Equinodermos e Equipe de Limpeza Recifal"
  },
  {
    "id": "331",
    "name": "Tridacna Maxima (Tridacna maxima)",
    "commonName": "Tridacna Maxima",
    "scientificName": "Tridacna maxima",
    "synonyms": [
      "Ostra Gigante Azul"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "tridacna-maxima.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Moluscos, Equinodermos e Equipe de Limpeza Recifal"
  },
  {
    "id": "332",
    "name": "Tridacna Crocea (Tridacna crocea)",
    "commonName": "Tridacna Crocea",
    "scientificName": "Tridacna crocea",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "tridacna-crocea.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Moluscos, Equinodermos e Equipe de Limpeza Recifal"
  },
  {
    "id": "333",
    "name": "Estrela Sand Cleaner (Archaster typicus)",
    "commonName": "Estrela Sand Cleaner",
    "scientificName": "Archaster typicus",
    "synonyms": [
      "Limpadora de Areia"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "estrela-sand-cleaner.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Moluscos, Equinodermos e Equipe de Limpeza Recifal"
  },
  {
    "id": "334",
    "name": "Estrela Linckia Azul (Linckia laevigata)",
    "commonName": "Estrela Linckia Azul",
    "scientificName": "Linckia laevigata",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "estrela-linckia-azul.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Moluscos, Equinodermos e Equipe de Limpeza Recifal"
  },
  {
    "id": "335",
    "name": "Estrela Vermelha Fromia (Fromia indica)",
    "commonName": "Estrela Vermelha Fromia",
    "scientificName": "Fromia indica",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "estrela-vermelha-fromia.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Moluscos, Equinodermos e Equipe de Limpeza Recifal"
  },
  {
    "id": "336",
    "name": "Estrela Chocolate Chip (Protoreaster nodosus)",
    "commonName": "Estrela Chocolate Chip",
    "scientificName": "Protoreaster nodosus",
    "synonyms": [
      "Biscoito"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "estrela-chocolate-chip.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Moluscos, Equinodermos e Equipe de Limpeza Recifal"
  },
  {
    "id": "337",
    "name": "Ofiúro Tigre (Ophiolepis superba)",
    "commonName": "Ofiúro Tigre",
    "scientificName": "Ophiolepis superba",
    "synonyms": [
      "Serpent Star Listrada"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "ofiuro-tigre.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Moluscos, Equinodermos e Equipe de Limpeza Recifal"
  },
  {
    "id": "338",
    "name": "Ofiúro Preto (Ophiocoma echinata)",
    "commonName": "Ofiúro Preto",
    "scientificName": "Ophiocoma echinata",
    "synonyms": [
      "Ofiúro Espinhoso"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "ofiuro-preto.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Moluscos, Equinodermos e Equipe de Limpeza Recifal"
  },
  {
    "id": "339",
    "name": "Ouriço Satélite (Eucidaris tribuloides)",
    "commonName": "Ouriço Satélite",
    "scientificName": "Eucidaris tribuloides",
    "synonyms": [
      "Lápis",
      "betta comum",
      "betta veu",
      "veiltail",
      "betta macho",
      "Betta Veiltail (Cauda de Véu)"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "098_betta_veiltail.webp",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Moluscos, Equinodermos e Equipe de Limpeza Recifal"
  },
  {
    "id": "340",
    "name": "Ouriço Preto de Espinho Longo (Diadema setosum)",
    "commonName": "Ouriço Preto de Espinho Longo",
    "scientificName": "Diadema setosum",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "ourico-preto-de-espinho-longo.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Moluscos, Equinodermos e Equipe de Limpeza Recifal"
  },
  {
    "id": "341",
    "name": "Ouriço Tuxedo (Mespilia globulus)",
    "commonName": "Ouriço Tuxedo",
    "scientificName": "Mespilia globulus",
    "synonyms": [
      "Colecionador Azul"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "ourico-tuxedo.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Moluscos, Equinodermos e Equipe de Limpeza Recifal"
  },
  {
    "id": "342",
    "name": "Pepino do Mar (Holothuria atra)",
    "commonName": "Pepino do Mar",
    "scientificName": "Holothuria atra",
    "synonyms": [
      "Holotúria Limpadora",
      "disco selvagem",
      "disco heckel",
      "symphysodon",
      "Acará Disco Selvagem (Heckel / Verde / Azul)"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "131_acara_disco_selvagem.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Moluscos, Equinodermos e Equipe de Limpeza Recifal"
  },
  {
    "id": "343",
    "name": "Tetra Neon Cardinal (Paracheirodon axelrodi)",
    "commonName": "Tetra Neon Cardinal",
    "scientificName": "Paracheirodon axelrodi",
    "synonyms": [
      "neon cardinal",
      "tetra cardinal",
      "neon",
      "Neon Cardinal (Paracheirodon axelrodi)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "112_neon_cardinal.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Tetras e Pequenos Caracídeos"
  },
  {
    "id": "344",
    "name": "Tetra Neon Innesi (Paracheirodon innesi)",
    "commonName": "Tetra Neon Innesi",
    "scientificName": "Paracheirodon innesi",
    "synonyms": [
      "Neon Comum",
      "neon innesi",
      "neon verde",
      "simulans",
      "neon negro",
      "Neon Innesi / Neon Verde / Neon Negro"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "113_neon_innesi_verde_negro.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Tetras e Pequenos Caracídeos"
  },
  {
    "id": "345",
    "name": "Tetra Neon Negro (Hyphessobrycon herbertaxelrodi)",
    "commonName": "Tetra Neon Negro",
    "scientificName": "Hyphessobrycon herbertaxelrodi",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "tetra-neon-negro.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Tetras e Pequenos Caracídeos"
  },
  {
    "id": "346",
    "name": "Tetra Neon Verde (Paracheirodon simulans)",
    "commonName": "Tetra Neon Verde",
    "scientificName": "Paracheirodon simulans",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "tetra-neon-verde.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Tetras e Pequenos Caracídeos"
  },
  {
    "id": "347",
    "name": "Rodóstomus (Hemigrammus bleheri)",
    "commonName": "Rodóstomus",
    "scientificName": "Hemigrammus bleheri",
    "synonyms": [
      "Tetra Bêbado",
      "rodostomus",
      "nariz de bebado",
      "rummy nose",
      "Rodóstomus / Nariz-de-Bêbado"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "117_rodostomus_nariz_de_bebado.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Tetras e Pequenos Caracídeos"
  },
  {
    "id": "348",
    "name": "Tetra Mato Grosso (Hyphessobrycon eques)",
    "commonName": "Tetra Mato Grosso",
    "scientificName": "Hyphessobrycon eques",
    "synonyms": [
      "mato grosso",
      "tetra mato grosso",
      "serpae",
      "Tetra Mato Grosso (Hyphessobrycon eques)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "116_tetra_mato_grosso.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Tetras e Pequenos Caracídeos"
  },
  {
    "id": "349",
    "name": "Tetra Mato Grosso Véu (Hyphessobrycon eques var. Longfin)",
    "commonName": "Tetra Mato Grosso Véu",
    "scientificName": "Hyphessobrycon eques var. Longfin",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "tetra-mato-grosso-veu.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Tetras e Pequenos Caracídeos"
  },
  {
    "id": "350",
    "name": "Tetra Negro (Gymnocorymbus ternetzi)",
    "commonName": "Tetra Negro",
    "scientificName": "Gymnocorymbus ternetzi",
    "synonyms": [
      "Viuvinha",
      "tetra negro",
      "tetra preto",
      "viuvinha",
      "Tetra Negro Comum & Véu"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "114_tetra_negro.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Tetras e Pequenos Caracídeos"
  },
  {
    "id": "351",
    "name": "Tetra Negro Véu (Gymnocorymbus ternetzi var. Longfin)",
    "commonName": "Tetra Negro Véu",
    "scientificName": "Gymnocorymbus ternetzi var. Longfin",
    "synonyms": [
      "Viuvinha Véu",
      "tetra branco",
      "white skirt",
      "tetra color",
      "Tetra White Skirt / Tetra Color"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "115_tetra_white_skirt_color.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Tetras e Pequenos Caracídeos"
  },
  {
    "id": "352",
    "name": "Tetra Glowlight (Hemigrammus erythrozonus)",
    "commonName": "Tetra Glowlight",
    "scientificName": "Hemigrammus erythrozonus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "tetra-glowlight.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Tetras e Pequenos Caracídeos"
  },
  {
    "id": "353",
    "name": "Tetra Buenos Aires (Psalidodon anisitsi)",
    "commonName": "Tetra Buenos Aires",
    "scientificName": "Psalidodon anisitsi",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "tetra-buenos-aires.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Tetras e Pequenos Caracídeos"
  },
  {
    "id": "354",
    "name": "Tetra Imperador (Nematobrycon palmeri)",
    "commonName": "Tetra Imperador",
    "scientificName": "Nematobrycon palmeri",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "tetra-imperador.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Tetras e Pequenos Caracídeos"
  },
  {
    "id": "355",
    "name": "Tetra Imperador Black (Nematobrycon palmeri var. Black)",
    "commonName": "Tetra Imperador Black",
    "scientificName": "Nematobrycon palmeri var. Black",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "tetra-imperador-black.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Tetras e Pequenos Caracídeos"
  },
  {
    "id": "356",
    "name": "Tetra Fogo (Hyphessobrycon amandae)",
    "commonName": "Tetra Fogo",
    "scientificName": "Hyphessobrycon amandae",
    "synonyms": [
      "Ember Tetra",
      "tetra foguinho",
      "ember tetra",
      "amandae",
      "Tetra Foguinho (Ember Tetra)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "118_tetra_foguinho.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Tetras e Pequenos Caracídeos"
  },
  {
    "id": "357",
    "name": "Tetra Limão (Hyphessobrycon pulchripinnis)",
    "commonName": "Tetra Limão",
    "scientificName": "Hyphessobrycon pulchripinnis",
    "synonyms": [
      "Lemon Tetra"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "tetra-limao.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Tetras e Pequenos Caracídeos"
  },
  {
    "id": "358",
    "name": "Tetra Fantasma Negro (Hyphessobrycon megalopterus)",
    "commonName": "Tetra Fantasma Negro",
    "scientificName": "Hyphessobrycon megalopterus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "tetra-fantasma-negro.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Tetras e Pequenos Caracídeos"
  },
  {
    "id": "359",
    "name": "Tetra Fantasma Vermelho (Hyphessobrycon sweglesi)",
    "commonName": "Tetra Fantasma Vermelho",
    "scientificName": "Hyphessobrycon sweglesi",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "tetra-fantasma-vermelho.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Tetras e Pequenos Caracídeos"
  },
  {
    "id": "360",
    "name": "Tetra Pristela (Pristella maxillaris)",
    "commonName": "Tetra Pristela",
    "scientificName": "Pristella maxillaris",
    "synonyms": [
      "X-Ray Tetra"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "tetra-pristela.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Tetras e Pequenos Caracídeos"
  },
  {
    "id": "361",
    "name": "Tetra Pristela Dourada (Pristella maxillaris var. Gold)",
    "commonName": "Tetra Pristela Dourada",
    "scientificName": "Pristella maxillaris var. Gold",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "tetra-pristela-dourada.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Tetras e Pequenos Caracídeos"
  },
  {
    "id": "362",
    "name": "Tetra Olho de Fogo (Hemigrammus ocellifer)",
    "commonName": "Tetra Olho de Fogo",
    "scientificName": "Hemigrammus ocellifer",
    "synonyms": [
      "Head and Taillight"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "tetra-olho-de-fogo.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Tetras e Pequenos Caracídeos"
  },
  {
    "id": "363",
    "name": "Tetra Cobre (Hasemania nana)",
    "commonName": "Tetra Cobre",
    "scientificName": "Hasemania nana",
    "synonyms": [
      "Silvertip"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "tetra-cobre.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Tetras e Pequenos Caracídeos"
  },
  {
    "id": "364",
    "name": "Tetra Diamante (Moenkhausia pittieri)",
    "commonName": "Tetra Diamante",
    "scientificName": "Moenkhausia pittieri",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "tetra-diamante.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Tetras e Pequenos Caracídeos"
  },
  {
    "id": "365",
    "name": "Tetra Red Phantom (Hyphessobrycon erythrostigma)",
    "commonName": "Tetra Red Phantom",
    "scientificName": "Hyphessobrycon erythrostigma",
    "synonyms": [
      "Rubrostigma"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "tetra-red-phantom.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Tetras e Pequenos Caracídeos"
  },
  {
    "id": "366",
    "name": "Tetra Congo (Phenacogrammus interruptus)",
    "commonName": "Tetra Congo",
    "scientificName": "Phenacogrammus interruptus",
    "synonyms": [
      "Alestes Congolês"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "tetra-congo.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Tetras e Pequenos Caracídeos"
  },
  {
    "id": "367",
    "name": "Peixe Borboleta Carnegiella (Carnegiella strigata)",
    "commonName": "Peixe Borboleta Carnegiella",
    "scientificName": "Carnegiella strigata",
    "synonyms": [
      "Peixe Machado Mármore"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-borboleta-carnegiella.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Tetras e Pequenos Caracídeos"
  },
  {
    "id": "368",
    "name": "Peixe Borboleta Gasteropelecus (Gasteropelecus sternicla)",
    "commonName": "Peixe Borboleta Gasteropelecus",
    "scientificName": "Gasteropelecus sternicla",
    "synonyms": [
      "Peixe Machado Prata"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-borboleta-gasteropelecus.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Tetras e Pequenos Caracídeos"
  },
  {
    "id": "369",
    "name": "Peixe Lápis Tricolor (Nannostomus beckfordi)",
    "commonName": "Peixe Lápis Tricolor",
    "scientificName": "Nannostomus beckfordi",
    "synonyms": [
      "Nannostomus Beckfordi"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-lapis-tricolor.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Tetras e Pequenos Caracídeos"
  },
  {
    "id": "370",
    "name": "Peixe Lápis Vermelho (Nannostomus mortenthaleri)",
    "commonName": "Peixe Lápis Vermelho",
    "scientificName": "Nannostomus mortenthaleri",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-lapis-vermelho.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Tetras e Pequenos Caracídeos"
  },
  {
    "id": "371",
    "name": "Acará Disco Selvagem Heckel (Symphysodon discus)",
    "commonName": "Acará Disco Selvagem Heckel",
    "scientificName": "Symphysodon discus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-disco-selvagem-heckel.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Acarás Disco e Morfotipos"
  },
  {
    "id": "372",
    "name": "Acará Disco Selvagem Azul (Symphysodon aequifasciatus)",
    "commonName": "Acará Disco Selvagem Azul",
    "scientificName": "Symphysodon aequifasciatus",
    "synonyms": [
      "Tefé"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-disco-selvagem-azul.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Acarás Disco e Morfotipos"
  },
  {
    "id": "373",
    "name": "Acará Disco Selvagem Verde (Symphysodon aequifasciatus)",
    "commonName": "Acará Disco Selvagem Verde",
    "scientificName": "Symphysodon aequifasciatus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-disco-selvagem-verde.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Acarás Disco e Morfotipos"
  },
  {
    "id": "374",
    "name": "Acará Disco Blue Diamond (Symphysodon sp. var. Blue Diamond)",
    "commonName": "Acará Disco Blue Diamond",
    "scientificName": "Symphysodon sp. var. Blue Diamond",
    "synonyms": [
      "Diamante Azul"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-disco-blue-diamond.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Acarás Disco e Morfotipos"
  },
  {
    "id": "375",
    "name": "Acará Disco Pigeon Blood (Symphysodon sp. var. Pigeon Blood)",
    "commonName": "Acará Disco Pigeon Blood",
    "scientificName": "Symphysodon sp. var. Pigeon Blood",
    "synonyms": [
      "Sangue de Pombo"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-disco-pigeon-blood.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Acarás Disco e Morfotipos"
  },
  {
    "id": "376",
    "name": "Acará Disco Red Melon (Symphysodon sp. var. Red Melon)",
    "commonName": "Acará Disco Red Melon",
    "scientificName": "Symphysodon sp. var. Red Melon",
    "synonyms": [
      "Melão Vermelho"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-disco-red-melon.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Acarás Disco e Morfotipos"
  },
  {
    "id": "377",
    "name": "Acará Disco Snake Skin (Symphysodon sp. var. Snake Skin)",
    "commonName": "Acará Disco Snake Skin",
    "scientificName": "Symphysodon sp. var. Snake Skin",
    "synonyms": [
      "Pele de Cobra"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-disco-snake-skin.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Acarás Disco e Morfotipos"
  },
  {
    "id": "378",
    "name": "Acará Disco Leopard Skin (Symphysodon sp. var. Leopard)",
    "commonName": "Acará Disco Leopard Skin",
    "scientificName": "Symphysodon sp. var. Leopard",
    "synonyms": [
      "Leopardo"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-disco-leopard-skin.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Acarás Disco e Morfotipos"
  },
  {
    "id": "379",
    "name": "Acará Disco Turquoise (Symphysodon sp. var. Brilliant Turquoise)",
    "commonName": "Acará Disco Turquoise",
    "scientificName": "Symphysodon sp. var. Brilliant Turquoise",
    "synonyms": [
      "Turquesa Brilhante"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-disco-turquoise.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Acarás Disco e Morfotipos"
  },
  {
    "id": "380",
    "name": "Acará Disco Cobalt (Symphysodon sp. var. Cobalt Blue)",
    "commonName": "Acará Disco Cobalt",
    "scientificName": "Symphysodon sp. var. Cobalt Blue",
    "synonyms": [
      "Azul Cobalto"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-disco-cobalt.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Acarás Disco e Morfotipos"
  },
  {
    "id": "381",
    "name": "Acará Disco Albino White Diamond (Symphysodon sp. var. Albino White)",
    "commonName": "Acará Disco Albino White Diamond",
    "scientificName": "Symphysodon sp. var. Albino White",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-disco-albino-white-diamond.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Acarás Disco e Morfotipos"
  },
  {
    "id": "382",
    "name": "Acará Disco Albino Golden (Symphysodon sp. var. Albino Golden)",
    "commonName": "Acará Disco Albino Golden",
    "scientificName": "Symphysodon sp. var. Albino Golden",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-disco-albino-golden.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Acarás Disco e Morfotipos"
  },
  {
    "id": "383",
    "name": "Acará Disco Fire Red (Symphysodon sp. var. Fire Red)",
    "commonName": "Acará Disco Fire Red",
    "scientificName": "Symphysodon sp. var. Fire Red",
    "synonyms": [
      "Vermelho Fogo"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-disco-fire-red.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Acarás Disco e Morfotipos"
  },
  {
    "id": "384",
    "name": "Acará Disco White Butterfly (Symphysodon sp. var. White Butterfly)",
    "commonName": "Acará Disco White Butterfly",
    "scientificName": "Symphysodon sp. var. White Butterfly",
    "synonyms": [
      "Borboleta Branca"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-disco-white-butterfly.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Acarás Disco e Morfotipos"
  },
  {
    "id": "385",
    "name": "Acará Disco Marlboro Red (Symphysodon sp. var. Marlboro Red)",
    "commonName": "Acará Disco Marlboro Red",
    "scientificName": "Symphysodon sp. var. Marlboro Red",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-disco-marlboro-red.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Acarás Disco e Morfotipos"
  },
  {
    "id": "386",
    "name": "Acará Bandeira Comum Listrado (Pterophyllum scalare)",
    "commonName": "Acará Bandeira Comum Listrado",
    "scientificName": "Pterophyllum scalare",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-bandeira-comum-listrado.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Acarás Bandeira e Morfotipos"
  },
  {
    "id": "387",
    "name": "Acará Bandeira Marmorato (Pterophyllum scalare var. Marble)",
    "commonName": "Acará Bandeira Marmorato",
    "scientificName": "Pterophyllum scalare var. Marble",
    "synonyms": [
      "Marble"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-bandeira-marmorato.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Acarás Bandeira e Morfotipos"
  },
  {
    "id": "388",
    "name": "Acará Bandeira Black (Pterophyllum scalare var. Black)",
    "commonName": "Acará Bandeira Black",
    "scientificName": "Pterophyllum scalare var. Black",
    "synonyms": [
      "Preto Puro"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-bandeira-black.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Acarás Bandeira e Morfotipos"
  },
  {
    "id": "389",
    "name": "Acará Bandeira Ouro (Pterophyllum scalare var. Gold)",
    "commonName": "Acará Bandeira Ouro",
    "scientificName": "Pterophyllum scalare var. Gold",
    "synonyms": [
      "Golden",
      "bandeira marmore",
      "bandeira palhaco",
      "zebra",
      "Acará Bandeira Mármore / Palhaço / Zebra"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "125_acara_bandeira_marmore_zebra.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Acarás Bandeira e Morfotipos"
  },
  {
    "id": "390",
    "name": "Acará Bandeira Albino (Pterophyllum scalare var. Albino)",
    "commonName": "Acará Bandeira Albino",
    "scientificName": "Pterophyllum scalare var. Albino",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-bandeira-albino.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Acarás Bandeira e Morfotipos"
  },
  {
    "id": "391",
    "name": "Acará Bandeira Palhaço (Pterophyllum scalare var. Koi)",
    "commonName": "Acará Bandeira Palhaço",
    "scientificName": "Pterophyllum scalare var. Koi",
    "synonyms": [
      "Koi Tricolor",
      "bandeira koi",
      "acara bandeira koi",
      "orange marble",
      "Acará Bandeira Koi / Orange Marble"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "124_acara_bandeira_koi.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Acarás Bandeira e Morfotipos"
  },
  {
    "id": "392",
    "name": "Acará Bandeira Blue (Pterophyllum scalare var. Pinoy Blue)",
    "commonName": "Acará Bandeira Blue",
    "scientificName": "Pterophyllum scalare var. Pinoy Blue",
    "synonyms": [
      "Azul Pinoy",
      "bandeira negro",
      "bandeira fumaca",
      "pinoy",
      "Acará Bandeira Negro / Fumaça / Pinoy"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "126_acara_bandeira_negro_pinoy.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Acarás Bandeira e Morfotipos"
  },
  {
    "id": "393",
    "name": "Acará Bandeira Smokey (Pterophyllum scalare var. Smokey)",
    "commonName": "Acará Bandeira Smokey",
    "scientificName": "Pterophyllum scalare var. Smokey",
    "synonyms": [
      "Fumê",
      "bandeira ouro",
      "bandeira platina",
      "albino",
      "Acará Bandeira Ouro / Platina / Albino"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "127_acara_bandeira_ouro_albino.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Acarás Bandeira e Morfotipos"
  },
  {
    "id": "394",
    "name": "Acará Bandeira Véu Marmorato (Pterophyllum scalare var. Longfin Marble)",
    "commonName": "Acará Bandeira Véu Marmorato",
    "scientificName": "Pterophyllum scalare var. Longfin Marble",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-bandeira-veu-marmorato.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Acarás Bandeira e Morfotipos"
  },
  {
    "id": "395",
    "name": "Acará Bandeira Véu Preto (Pterophyllum scalare var. Longfin Black)",
    "commonName": "Acará Bandeira Véu Preto",
    "scientificName": "Pterophyllum scalare var. Longfin Black",
    "synonyms": [
      "disco turquesa",
      "blue turquoise",
      "disco azul",
      "Acará Disco Azul Turquesa / Cobalt"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "128_acara_disco_azul_turquesa.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Acarás Bandeira e Morfotipos"
  },
  {
    "id": "396",
    "name": "Acará Bandeira Véu Branco (Pterophyllum scalare var. Longfin White)",
    "commonName": "Acará Bandeira Véu Branco",
    "scientificName": "Pterophyllum scalare var. Longfin White",
    "synonyms": [
      "disco pigeon",
      "pigeon blood",
      "red marlboro",
      "Acará Disco Pigeon Blood / Red Marlboro"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "129_acara_disco_pigeon_blood.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Acarás Bandeira e Morfotipos"
  },
  {
    "id": "397",
    "name": "Acará Bandeira Selvagem Santa Isabel (Pterophyllum scalare var. Santa Isabel)",
    "commonName": "Acará Bandeira Selvagem Santa Isabel",
    "scientificName": "Pterophyllum scalare var. Santa Isabel",
    "synonyms": [
      "disco blue diamond",
      "white diamond",
      "Acará Disco Blue Diamond / White Diamond"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "130_acara_disco_blue_diamond.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Acarás Bandeira e Morfotipos"
  },
  {
    "id": "398",
    "name": "Acará Bandeira Dantum Albino (Pterophyllum sp. var. Dantum Albino)",
    "commonName": "Acará Bandeira Dantum Albino",
    "scientificName": "Pterophyllum sp. var. Dantum Albino",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-bandeira-dantum-albino.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Acarás Bandeira e Morfotipos"
  },
  {
    "id": "399",
    "name": "Acará Altum Verdadeiro (Pterophyllum altum)",
    "commonName": "Acará Altum Verdadeiro",
    "scientificName": "Pterophyllum altum",
    "synonyms": [
      "Altum do Orinoco"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-altum-verdadeiro.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Acarás Bandeira e Morfotipos"
  },
  {
    "id": "400",
    "name": "Ramirezi Comum Alemão (Mikrogeophagus ramirezi)",
    "commonName": "Ramirezi Comum Alemão",
    "scientificName": "Mikrogeophagus ramirezi",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ramirezi-comum-alemao.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Anões Sul-Americanos"
  },
  {
    "id": "401",
    "name": "Ramirezi Electric Blue (Mikrogeophagus ramirezi var. Electric Blue)",
    "commonName": "Ramirezi Electric Blue",
    "scientificName": "Mikrogeophagus ramirezi var. Electric Blue",
    "synonyms": [
      "Azul Elétrico",
      "ramirezi electric blue",
      "electric blue",
      "black ram",
      "Ramirezi Electric Blue & Black Ram"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "133_ramirezi_electric_blue.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Anões Sul-Americanos"
  },
  {
    "id": "402",
    "name": "Ramirezi Ouro (Mikrogeophagus ramirezi var. Gold)",
    "commonName": "Ramirezi Ouro",
    "scientificName": "Mikrogeophagus ramirezi var. Gold",
    "synonyms": [
      "Golden Ram"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ramirezi-ouro.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Anões Sul-Americanos"
  },
  {
    "id": "403",
    "name": "Ramirezi Black (Mikrogeophagus ramirezi var. Black)",
    "commonName": "Ramirezi Black",
    "scientificName": "Mikrogeophagus ramirezi var. Black",
    "synonyms": [
      "Preto"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ramirezi-black.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Anões Sul-Americanos"
  },
  {
    "id": "404",
    "name": "Ramirezi Balão (Mikrogeophagus ramirezi var. Balloon)",
    "commonName": "Ramirezi Balão",
    "scientificName": "Mikrogeophagus ramirezi var. Balloon",
    "synonyms": [
      "Balloon Ram"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ramirezi-balao.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Anões Sul-Americanos"
  },
  {
    "id": "405",
    "name": "Ramirezi Balão Electric Blue (Mikrogeophagus ramirezi var. Balloon Electric Blue)",
    "commonName": "Ramirezi Balão Electric Blue",
    "scientificName": "Mikrogeophagus ramirezi var. Balloon Electric Blue",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ramirezi-balao-electric-blue.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Anões Sul-Americanos"
  },
  {
    "id": "406",
    "name": "Ramirezi Boliviano (Mikrogeophagus altispinosus)",
    "commonName": "Ramirezi Boliviano",
    "scientificName": "Mikrogeophagus altispinosus",
    "synonyms": [
      "Altispinosus",
      "apistogramma",
      "cacatuoides",
      "agassizii",
      "Apistogramma (Cacatuoides & Agassizii)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "134_apistogramma_cacatuoides_agassizii.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Anões Sul-Americanos"
  },
  {
    "id": "407",
    "name": "Apistogramma Cacatuoides Triple Red (Apistogramma cacatuoides)",
    "commonName": "Apistogramma Cacatuoides Triple Red",
    "scientificName": "Apistogramma cacatuoides",
    "synonyms": [
      "Triplo Vermelho"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "apistogramma-cacatuoides-triple-red.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Anões Sul-Americanos"
  },
  {
    "id": "408",
    "name": "Apistogramma Cacatuoides Double Red (Apistogramma cacatuoides)",
    "commonName": "Apistogramma Cacatuoides Double Red",
    "scientificName": "Apistogramma cacatuoides",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "apistogramma-cacatuoides-double-red.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Anões Sul-Americanos"
  },
  {
    "id": "409",
    "name": "Apistogramma Cacatuoides Orange Flash (Apistogramma cacatuoides)",
    "commonName": "Apistogramma Cacatuoides Orange Flash",
    "scientificName": "Apistogramma cacatuoides",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "apistogramma-cacatuoides-orange-flash.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Anões Sul-Americanos"
  },
  {
    "id": "410",
    "name": "Apistogramma Agassizii Fire Red (Apistogramma agassizii var. Fire Red)",
    "commonName": "Apistogramma Agassizii Fire Red",
    "scientificName": "Apistogramma agassizii var. Fire Red",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "apistogramma-agassizii-fire-red.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Anões Sul-Americanos"
  },
  {
    "id": "411",
    "name": "Apistogramma Agassizii Double Red (Apistogramma agassizii)",
    "commonName": "Apistogramma Agassizii Double Red",
    "scientificName": "Apistogramma agassizii",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "apistogramma-agassizii-double-red.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Anões Sul-Americanos"
  },
  {
    "id": "412",
    "name": "Apistogramma Borellii (Apistogramma borellii)",
    "commonName": "Apistogramma Borellii",
    "scientificName": "Apistogramma borellii",
    "synonyms": [
      "Opal Blue"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "apistogramma-borellii.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Anões Sul-Americanos"
  },
  {
    "id": "413",
    "name": "Apistogramma Macmasteri Red Neck (Apistogramma macmasteri)",
    "commonName": "Apistogramma Macmasteri Red Neck",
    "scientificName": "Apistogramma macmasteri",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "apistogramma-macmasteri-red-neck.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Anões Sul-Americanos"
  },
  {
    "id": "414",
    "name": "Apistogramma Panduro (Apistogramma panduro)",
    "commonName": "Apistogramma Panduro",
    "scientificName": "Apistogramma panduro",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "apistogramma-panduro.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Anões Sul-Americanos"
  },
  {
    "id": "415",
    "name": "Apistogramma Nijsseni (Apistogramma nijsseni)",
    "commonName": "Apistogramma Nijsseni",
    "scientificName": "Apistogramma nijsseni",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "apistogramma-nijsseni.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Anões Sul-Americanos"
  },
  {
    "id": "416",
    "name": "Apistogramma Viejita (Apistogramma viejita)",
    "commonName": "Apistogramma Viejita",
    "scientificName": "Apistogramma viejita",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "apistogramma-viejita.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Anões Sul-Americanos"
  },
  {
    "id": "417",
    "name": "Apistogramma Hongsloi (Apistogramma hongsloi)",
    "commonName": "Apistogramma Hongsloi",
    "scientificName": "Apistogramma hongsloi",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "apistogramma-hongsloi.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Anões Sul-Americanos"
  },
  {
    "id": "418",
    "name": "Apistogramma Trifasciata (Apistogramma trifasciata)",
    "commonName": "Apistogramma Trifasciata",
    "scientificName": "Apistogramma trifasciata",
    "synonyms": [
      "ramirezi",
      "german blue ram",
      "ramirezi ouro",
      "Ramirezi Comum (Alemão) & Ouro"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "132_ramirezi_comum_alemao.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Anões Sul-Americanos"
  },
  {
    "id": "419",
    "name": "Nannacara Anomala (Nannacara anomala)",
    "commonName": "Nannacara Anomala",
    "scientificName": "Nannacara anomala",
    "synonyms": [
      "Olho Dourado"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "nannacara-anomala.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Anões Sul-Americanos"
  },
  {
    "id": "420",
    "name": "Acará Severo Gold (Heros efasciatus var. Gold)",
    "commonName": "Acará Severo Gold",
    "scientificName": "Heros efasciatus var. Gold",
    "synonyms": [
      "Dourado"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-severo-gold.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Grandes Ciclídeos Americanos e Ciclídeos de Porte Médio"
  },
  {
    "id": "421",
    "name": "Acará Severo Green (Heros efasciatus)",
    "commonName": "Acará Severo Green",
    "scientificName": "Heros efasciatus",
    "synonyms": [
      "Verde"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-severo-green.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Grandes Ciclídeos Americanos e Ciclídeos de Porte Médio"
  },
  {
    "id": "422",
    "name": "Acará Severo Red Spotted (Heros sp. var. Red Spotted)",
    "commonName": "Acará Severo Red Spotted",
    "scientificName": "Heros sp. var. Red Spotted",
    "synonyms": [
      "Vermelho Pontilhado"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-severo-red-spotted.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Grandes Ciclídeos Americanos e Ciclídeos de Porte Médio"
  },
  {
    "id": "423",
    "name": "Acará Geophagus Brasiliensis (Geophagus brasiliensis)",
    "commonName": "Acará Geophagus Brasiliensis",
    "scientificName": "Geophagus brasiliensis",
    "synonyms": [
      "Cará Nacional"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-geophagus-brasiliensis.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Grandes Ciclídeos Americanos e Ciclídeos de Porte Médio"
  },
  {
    "id": "424",
    "name": "Acará Geophagus Tapajós Red Head (Geophagus sp. Red Head Tapajos)",
    "commonName": "Acará Geophagus Tapajós Red Head",
    "scientificName": "Geophagus sp. Red Head Tapajos",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-geophagus-tapajos-red-head.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Grandes Ciclídeos Americanos e Ciclídeos de Porte Médio"
  },
  {
    "id": "425",
    "name": "Acará Geophagus Surinamensis (Geophagus surinamensis)",
    "commonName": "Acará Geophagus Surinamensis",
    "scientificName": "Geophagus surinamensis",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-geophagus-surinamensis.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Grandes Ciclídeos Americanos e Ciclídeos de Porte Médio"
  },
  {
    "id": "426",
    "name": "Acará Geophagus Sveni (Geophagus sveni)",
    "commonName": "Acará Geophagus Sveni",
    "scientificName": "Geophagus sveni",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-geophagus-sveni.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Grandes Ciclídeos Americanos e Ciclídeos de Porte Médio"
  },
  {
    "id": "427",
    "name": "Acará Uaru Amphiacanthoides (Uaru amphiacanthoides)",
    "commonName": "Acará Uaru Amphiacanthoides",
    "scientificName": "Uaru amphiacanthoides",
    "synonyms": [
      "Uaru Selvagem"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-uaru-amphiacanthoides.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Grandes Ciclídeos Americanos e Ciclídeos de Porte Médio"
  },
  {
    "id": "428",
    "name": "Acará Krobia (Mesonauta festivus)",
    "commonName": "Acará Krobia",
    "scientificName": "Mesonauta festivus",
    "synonyms": [
      "Acará Festivo"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-krobia.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Grandes Ciclídeos Americanos e Ciclídeos de Porte Médio"
  },
  {
    "id": "429",
    "name": "Acará Boca de Fogo (Thorichthys meeki)",
    "commonName": "Acará Boca de Fogo",
    "scientificName": "Thorichthys meeki",
    "synonyms": [
      "Firemouth"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-boca-de-fogo.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Grandes Ciclídeos Americanos e Ciclídeos de Porte Médio"
  },
  {
    "id": "430",
    "name": "Ciclídeo Convicto (Amatitlania nigrofasciata)",
    "commonName": "Ciclídeo Convicto",
    "scientificName": "Amatitlania nigrofasciata",
    "synonyms": [
      "Zebra Americano"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-convicto.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Grandes Ciclídeos Americanos e Ciclídeos de Porte Médio"
  },
  {
    "id": "431",
    "name": "Ciclídeo Convicto Albino (Amatitlania nigrofasciata var. Albino)",
    "commonName": "Ciclídeo Convicto Albino",
    "scientificName": "Amatitlania nigrofasciata var. Albino",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-convicto-albino.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Grandes Ciclídeos Americanos e Ciclídeos de Porte Médio"
  },
  {
    "id": "432",
    "name": "Ciclídeo Salvini (Trichromis salvini)",
    "commonName": "Ciclídeo Salvini",
    "scientificName": "Trichromis salvini",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-salvini.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Grandes Ciclídeos Americanos e Ciclídeos de Porte Médio"
  },
  {
    "id": "433",
    "name": "Ciclídeo Jack Dempsey (Rocio octofasciata)",
    "commonName": "Ciclídeo Jack Dempsey",
    "scientificName": "Rocio octofasciata",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-jack-dempsey.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Grandes Ciclídeos Americanos e Ciclídeos de Porte Médio"
  },
  {
    "id": "434",
    "name": "Ciclídeo Jack Dempsey Electric Blue (Rocio octofasciata var. Electric Blue)",
    "commonName": "Ciclídeo Jack Dempsey Electric Blue",
    "scientificName": "Rocio octofasciata var. Electric Blue",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-jack-dempsey-electric-blue.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Grandes Ciclídeos Americanos e Ciclídeos de Porte Médio"
  },
  {
    "id": "435",
    "name": "Ciclídeo Texas Blue (Herichthys carpintis)",
    "commonName": "Ciclídeo Texas Blue",
    "scientificName": "Herichthys carpintis",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-texas-blue.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Grandes Ciclídeos Americanos e Ciclídeos de Porte Médio"
  },
  {
    "id": "436",
    "name": "Ciclídeo Green Terror (Andinoacara rivulatus)",
    "commonName": "Ciclídeo Green Terror",
    "scientificName": "Andinoacara rivulatus",
    "synonyms": [
      "Terror Verde"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-green-terror.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Grandes Ciclídeos Americanos e Ciclídeos de Porte Médio"
  },
  {
    "id": "437",
    "name": "Ciclídeo Papagaio Vermelho (Cichlasoma híbrido)",
    "commonName": "Ciclídeo Papagaio Vermelho",
    "scientificName": "Cichlasoma híbrido",
    "synonyms": [
      "Red Parrot"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-papagaio-vermelho.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Grandes Ciclídeos Americanos e Ciclídeos de Porte Médio"
  },
  {
    "id": "438",
    "name": "Ciclídeo Papagaio Amarelo (Cichlasoma híbrido)",
    "commonName": "Ciclídeo Papagaio Amarelo",
    "scientificName": "Cichlasoma híbrido",
    "synonyms": [
      "Yellow Parrot"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-papagaio-amarelo.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Grandes Ciclídeos Americanos e Ciclídeos de Porte Médio"
  },
  {
    "id": "439",
    "name": "Ciclídeo Papagaio Polar Blue (Amatitlania híbrido)",
    "commonName": "Ciclídeo Papagaio Polar Blue",
    "scientificName": "Amatitlania híbrido",
    "synonyms": [
      "Parrot Mini"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-papagaio-polar-blue.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Grandes Ciclídeos Americanos e Ciclídeos de Porte Médio"
  },
  {
    "id": "440",
    "name": "Ciclídeo Flowerhorn Red Dragon (Cichlasoma híbrido var. Red Dragon)",
    "commonName": "Ciclídeo Flowerhorn Red Dragon",
    "scientificName": "Cichlasoma híbrido var. Red Dragon",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-flowerhorn-red-dragon.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Grandes Ciclídeos Americanos e Ciclídeos de Porte Médio"
  },
  {
    "id": "441",
    "name": "Peixe Oscar Tigre (Astronotus ocellatus)",
    "commonName": "Peixe Oscar Tigre",
    "scientificName": "Astronotus ocellatus",
    "synonyms": [
      "Red Tiger",
      "oscar tigre",
      "oscar albino",
      "astronotus",
      "Oscar (Tigre, Red Tiger, Albino Red Ruby, Bronze)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "137_oscar_tigre_albino_red_ruby.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Grandes Ciclídeos Americanos e Ciclídeos de Porte Médio"
  },
  {
    "id": "442",
    "name": "Peixe Oscar Albino Tigre (Astronotus ocellatus var. Albino Tiger)",
    "commonName": "Peixe Oscar Albino Tigre",
    "scientificName": "Astronotus ocellatus var. Albino Tiger",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-oscar-albino-tigre.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Grandes Ciclídeos Americanos e Ciclídeos de Porte Médio"
  },
  {
    "id": "443",
    "name": "Peixe Oscar Red (Astronotus ocellatus var. Red)",
    "commonName": "Peixe Oscar Red",
    "scientificName": "Astronotus ocellatus var. Red",
    "synonyms": [
      "Vermelho Rubi"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-oscar-red.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Grandes Ciclídeos Americanos e Ciclídeos de Porte Médio"
  },
  {
    "id": "444",
    "name": "Peixe Oscar Bronze (Astronotus ocellatus)",
    "commonName": "Peixe Oscar Bronze",
    "scientificName": "Astronotus ocellatus",
    "synonyms": [
      "Comum"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-oscar-bronze.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Grandes Ciclídeos Americanos e Ciclídeos de Porte Médio"
  },
  {
    "id": "445",
    "name": "Peixe Oscar Albino Red (Astronotus ocellatus var. Albino Red)",
    "commonName": "Peixe Oscar Albino Red",
    "scientificName": "Astronotus ocellatus var. Albino Red",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-oscar-albino-red.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Grandes Ciclídeos Americanos e Ciclídeos de Porte Médio"
  },
  {
    "id": "446",
    "name": "Ciclídeo Amarelo do Malawi (Labidochromis caeruleus)",
    "commonName": "Ciclídeo Amarelo do Malawi",
    "scientificName": "Labidochromis caeruleus",
    "synonyms": [
      "Labidochromis Caeruleus"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-amarelo-do-malawi.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "447",
    "name": "Ciclídeo Melanochromis Auratus (Melanochromis auratus)",
    "commonName": "Ciclídeo Melanochromis Auratus",
    "scientificName": "Melanochromis auratus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-melanochromis-auratus.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "448",
    "name": "Ciclídeo Pseudotropheus Demasoni Pombo (Chindongo demasoni)",
    "commonName": "Ciclídeo Pseudotropheus Demasoni Pombo",
    "scientificName": "Chindongo demasoni",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-pseudotropheus-demasoni-pombo.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "449",
    "name": "Ciclídeo Pseudotropheus Saulosi (Chindongo saulosi)",
    "commonName": "Ciclídeo Pseudotropheus Saulosi",
    "scientificName": "Chindongo saulosi",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-pseudotropheus-saulosi.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "450",
    "name": "Ciclídeo Pseudotropheus Acei (Pseudotropheus sp. Acei)",
    "commonName": "Ciclídeo Pseudotropheus Acei",
    "scientificName": "Pseudotropheus sp. Acei",
    "synonyms": [
      "Cauda Amarela"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-pseudotropheus-acei.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "451",
    "name": "Ciclídeo Pseudotropheus Socolofi (Chindongo socolofi)",
    "commonName": "Ciclídeo Pseudotropheus Socolofi",
    "scientificName": "Chindongo socolofi",
    "synonyms": [
      "Azul Gelo"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-pseudotropheus-socolofi.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "452",
    "name": "Ciclídeo Pseudotropheus Crabro (Pseudotropheus crabro)",
    "commonName": "Ciclídeo Pseudotropheus Crabro",
    "scientificName": "Pseudotropheus crabro",
    "synonyms": [
      "Peixe Camaleão"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-pseudotropheus-crabro.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "453",
    "name": "Ciclídeo Labeotropheus Fuelleborni (Labeotropheus fuelleborni)",
    "commonName": "Ciclídeo Labeotropheus Fuelleborni",
    "scientificName": "Labeotropheus fuelleborni",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-labeotropheus-fuelleborni.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "454",
    "name": "Ciclídeo Metriaclima Estherae (Maylandia estherae)",
    "commonName": "Ciclídeo Metriaclima Estherae",
    "scientificName": "Maylandia estherae",
    "synonyms": [
      "Red Zebra"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-metriaclima-estherae.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "455",
    "name": "Ciclídeo Metriaclima Callainos (Maylandia callainos)",
    "commonName": "Ciclídeo Metriaclima Callainos",
    "scientificName": "Maylandia callainos",
    "synonyms": [
      "Cobalt Zebra"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-metriaclima-callainos.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "456",
    "name": "Ciclídeo Nimbochromis Venustus (Nimbochromis venustus)",
    "commonName": "Ciclídeo Nimbochromis Venustus",
    "scientificName": "Nimbochromis venustus",
    "synonyms": [
      "Girafa"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-nimbochromis-venustus.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "457",
    "name": "Ciclídeo Nimbochromis Livingstonii (Nimbochromis livingstonii)",
    "commonName": "Ciclídeo Nimbochromis Livingstonii",
    "scientificName": "Nimbochromis livingstonii",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-nimbochromis-livingstonii.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "458",
    "name": "Ciclídeo Dimidiochromis Compressiceps (Dimidiochromis compressiceps)",
    "commonName": "Ciclídeo Dimidiochromis Compressiceps",
    "scientificName": "Dimidiochromis compressiceps",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-dimidiochromis-compressiceps.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "459",
    "name": "Ciclídeo Sciaenochromis Fryeri (Sciaenochromis fryeri)",
    "commonName": "Ciclídeo Sciaenochromis Fryeri",
    "scientificName": "Sciaenochromis fryeri",
    "synonyms": [
      "Electric Blue Ahli"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-sciaenochromis-fryeri.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "460",
    "name": "Ciclídeo Cyrtocara Moorii (Cyrtocara moorii)",
    "commonName": "Ciclídeo Cyrtocara Moorii",
    "scientificName": "Cyrtocara moorii",
    "synonyms": [
      "Golfinho do Malawi"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-cyrtocara-moorii.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "461",
    "name": "Ciclídeo Aulonocara Firefish (Aulonocara sp. Firefish)",
    "commonName": "Ciclídeo Aulonocara Firefish",
    "scientificName": "Aulonocara sp. Firefish",
    "synonyms": [
      "Vermelho Fogo"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-aulonocara-firefish.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "462",
    "name": "Ciclídeo Aulonocara OB (Aulonocara sp. OB)",
    "commonName": "Ciclídeo Aulonocara OB",
    "scientificName": "Aulonocara sp. OB",
    "synonyms": [
      "Marmorato"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-aulonocara-ob.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "463",
    "name": "Ciclídeo Aulonocara Baenschi (Aulonocara baenschi)",
    "commonName": "Ciclídeo Aulonocara Baenschi",
    "scientificName": "Aulonocara baenschi",
    "synonyms": [
      "Amarelo Benga",
      "aulonocara",
      "firefish",
      "maleri yellow",
      "hap",
      "Aulonocaras (Firefish, Maleri, Eureka)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "136_aulonocaras_malawi.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "464",
    "name": "Ciclídeo Aulonocara Stuartgranti (Aulonocara stuartgranti)",
    "commonName": "Ciclídeo Aulonocara Stuartgranti",
    "scientificName": "Aulonocara stuartgranti",
    "synonyms": [
      "Cobue"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-aulonocara-stuartgranti.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "465",
    "name": "Ciclídeo Aulonocara Eureka (Aulonocara jacobfreibergi)",
    "commonName": "Ciclídeo Aulonocara Eureka",
    "scientificName": "Aulonocara jacobfreibergi",
    "synonyms": [
      "Red Peacock"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-aulonocara-eureka.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "466",
    "name": "Ciclídeo Frontosa Burundi (Cyphotilapia frontosa)",
    "commonName": "Ciclídeo Frontosa Burundi",
    "scientificName": "Cyphotilapia frontosa",
    "synonyms": [
      "6 Faixas"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-frontosa-burundi.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "467",
    "name": "Ciclídeo Frontosa Blue Zaire (Cyphotilapia gibberosa)",
    "commonName": "Ciclídeo Frontosa Blue Zaire",
    "scientificName": "Cyphotilapia gibberosa",
    "synonyms": [
      "Moba"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-frontosa-blue-zaire.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "468",
    "name": "Ciclídeo Altolamprologus Calvus Black (Altolamprologus calvus)",
    "commonName": "Ciclídeo Altolamprologus Calvus Black",
    "scientificName": "Altolamprologus calvus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-altolamprologus-calvus-black.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "469",
    "name": "Ciclídeo Altolamprologus Compressiceps Gold (Altolamprologus compressiceps)",
    "commonName": "Ciclídeo Altolamprologus Compressiceps Gold",
    "scientificName": "Altolamprologus compressiceps",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-altolamprologus-compressiceps-gold.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "470",
    "name": "Ciclídeo Neolamprologus Leleupi (Neolamprologus leleupi)",
    "commonName": "Ciclídeo Neolamprologus Leleupi",
    "scientificName": "Neolamprologus leleupi",
    "synonyms": [
      "Amarelo Limão"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-neolamprologus-leleupi.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "471",
    "name": "Ciclídeo Neolamprologus Brichardi (Neolamprologus brichardi)",
    "commonName": "Ciclídeo Neolamprologus Brichardi",
    "scientificName": "Neolamprologus brichardi",
    "synonyms": [
      "Princesa de Burundi",
      "guppy tuxedo",
      "half black",
      "hb red",
      "hb pastel",
      "Guppy Tuxedo / Half Black (HB Red/Yellow)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "092_guppy_tuxedo_half_black.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "472",
    "name": "Ciclídeo Julidochromis Marlieri (Julidochromis marlieri)",
    "commonName": "Ciclídeo Julidochromis Marlieri",
    "scientificName": "Julidochromis marlieri",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-julidochromis-marlieri.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "473",
    "name": "Ciclídeo Julidochromis Regani (Julidochromis regani)",
    "commonName": "Ciclídeo Julidochromis Regani",
    "scientificName": "Julidochromis regani",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-julidochromis-regani.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "474",
    "name": "Ciclídeo Conchicola Neolamprologus Multifasciatus (Neolamprologus multifasciatus)",
    "commonName": "Ciclídeo Conchicola Neolamprologus Multifasciatus",
    "scientificName": "Neolamprologus multifasciatus",
    "synonyms": [
      "guppy cobra",
      "snakeskin",
      "king cobra",
      "japan blue",
      "Guppy Cobra / Snakeskin (King Cobra)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "093_guppy_cobra_snakeskin.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "475",
    "name": "Ciclídeo Conchicola Neolamprologus Similis (Neolamprologus similis)",
    "commonName": "Ciclídeo Conchicola Neolamprologus Similis",
    "scientificName": "Neolamprologus similis",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-conchicola-neolamprologus-similis.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "476",
    "name": "Ciclídeo Conchicola Neolamprologus Brevis (Neolamprologus brevis)",
    "commonName": "Ciclídeo Conchicola Neolamprologus Brevis",
    "scientificName": "Neolamprologus brevis",
    "synonyms": [
      "guppy dumbo",
      "big ear",
      "guppy mosaico",
      "Guppy Dumbo (Big Ear) / Mosaico"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "094_guppy_dumbo_mosaico.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "477",
    "name": "Ciclídeo Conchicola Lamprologus Ocellatus Gold (Lamprologus ocellatus)",
    "commonName": "Ciclídeo Conchicola Lamprologus Ocellatus Gold",
    "scientificName": "Lamprologus ocellatus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-conchicola-lamprologus-ocellatus-gold.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos Africanos dos Lagos Malawi e Tanganyika"
  },
  {
    "id": "478",
    "name": "Guppy (Poecilia reticulata var. Full Black)",
    "commonName": "Guppy",
    "scientificName": "Poecilia reticulata var. Full Black",
    "synonyms": [
      "Lebiste Full Black",
      "Preto Puro",
      "guppy moscou",
      "lebiste black",
      "full black",
      "Guppy Moscou (Full Black / Azul)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "091_guppy_moscou_full_black.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "479",
    "name": "Guppy (Poecilia reticulata var. Albino Full Red)",
    "commonName": "Guppy",
    "scientificName": "Poecilia reticulata var. Albino Full Red",
    "synonyms": [
      "Lebiste Albino Full Red",
      "guppy full red",
      "lebiste vermelho",
      "albino red",
      "Guppy Full Red Albino"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "095_guppy_full_red_albino.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "480",
    "name": "Guppy (Poecilia reticulata var. Blue Moscow)",
    "commonName": "Guppy",
    "scientificName": "Poecilia reticulata var. Blue Moscow",
    "synonyms": [
      "Lebiste Blue Moscow",
      "Azul Moscou"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "guppy.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "481",
    "name": "Guppy (Poecilia reticulata var. Dumbo Ear Red)",
    "commonName": "Guppy",
    "scientificName": "Poecilia reticulata var. Dumbo Ear Red",
    "synonyms": [
      "Lebiste Dumbo Ear Red Tail",
      "paulistinha",
      "danio rerio",
      "zebra danio",
      "Paulistinha (Comum, Véu e Rosa)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "119_paulistinha_danio.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "482",
    "name": "Guppy (Poecilia reticulata var. Red Cobra)",
    "commonName": "Guppy",
    "scientificName": "Poecilia reticulata var. Red Cobra",
    "synonyms": [
      "Lebiste Red Cobra",
      "Pele de Cobra",
      "rasbora arlequim",
      "harlequin rasbora",
      "Rásbora Arlequim (T. heteromorpha)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "120_rasbora_arlequim.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "483",
    "name": "Guppy (Poecilia reticulata var. Green Cobra)",
    "commonName": "Guppy",
    "scientificName": "Poecilia reticulata var. Green Cobra",
    "synonyms": [
      "Lebiste Green Cobra",
      "rasbora galaxy",
      "cpd",
      "margaritatus",
      "kubotai",
      "Rásbora Galaxy (CPD) & Neon Verde"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "121_rasbora_galaxy_cpd.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "484",
    "name": "Guppy (Poecilia reticulata var. Dragon Head)",
    "commonName": "Guppy",
    "scientificName": "Poecilia reticulata var. Dragon Head",
    "synonyms": [
      "Lebiste Dragon Head"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "guppy.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "485",
    "name": "Guppy (Poecilia reticulata var. Red Tuxedo)",
    "commonName": "Guppy",
    "scientificName": "Poecilia reticulata var. Red Tuxedo",
    "synonyms": [
      "Lebiste Tuxedo Red"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "guppy.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "486",
    "name": "Guppy (Poecilia reticulata var. Santa Maria)",
    "commonName": "Guppy",
    "scientificName": "Poecilia reticulata var. Santa Maria",
    "synonyms": [
      "Lebiste Santa Maria Bleeding Heart",
      "plati mickey",
      "platy mickey",
      "aurora mickey",
      "Plati Mickey Mouse / Aurora"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "104_plati_mickey.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "487",
    "name": "Guppy (Poecilia wingei var. Yellow Tiger)",
    "commonName": "Guppy",
    "scientificName": "Poecilia wingei var. Yellow Tiger",
    "synonyms": [
      "Lebiste Yellow Tiger Endler"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "guppy.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "488",
    "name": "Guppy (Poecilia wingei)",
    "commonName": "Guppy",
    "scientificName": "Poecilia wingei",
    "synonyms": [
      "Lebiste Endler Comum Classe N",
      "endler",
      "endler black bar",
      "poecilia wingei",
      "Guppy Endler Rainbow Black Bar / Tiger",
      "plati wagtail",
      "plati sangue",
      "plati balao",
      "Plati Wagtail / Sangue / Coral (e Balão)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "105_plati_wagtail_sangue.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "489",
    "name": "Platy Mickey Mouse Vermelho (Xiphophorus maculatus var. Red Mickey)",
    "commonName": "Platy Mickey Mouse Vermelho",
    "scientificName": "Xiphophorus maculatus var. Red Mickey",
    "synonyms": [
      "endler red",
      "endler vermelho",
      "scarlet endler",
      "Guppy Endler Red / Scarlet"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "097_guppy_endler_red.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "490",
    "name": "Platy Mickey Mouse Amarelo (Xiphophorus maculatus var. Yellow Mickey)",
    "commonName": "Platy Mickey Mouse Amarelo",
    "scientificName": "Xiphophorus maculatus var. Yellow Mickey",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "platy-mickey-mouse-amarelo.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "491",
    "name": "Platy Coral (Xiphophorus maculatus var. Coral Red)",
    "commonName": "Platy Coral",
    "scientificName": "Xiphophorus maculatus var. Coral Red",
    "synonyms": [
      "Vermelho Sólido"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "platy-coral.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "492",
    "name": "Platy Tuxedo Preto e Vermelho (Xiphophorus maculatus var. Tuxedo)",
    "commonName": "Platy Tuxedo Preto e Vermelho",
    "scientificName": "Xiphophorus maculatus var. Tuxedo",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "platy-tuxedo-preto-e-vermelho.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "493",
    "name": "Platy Variatus Arco-Íris (Xiphophorus variatus)",
    "commonName": "Platy Variatus Arco-Íris",
    "scientificName": "Xiphophorus variatus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "platy-variatus-arco-iris.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "494",
    "name": "Platy Ouro (Xiphophorus maculatus var. Marigold)",
    "commonName": "Platy Ouro",
    "scientificName": "Xiphophorus maculatus var. Marigold",
    "synonyms": [
      "Marigold",
      "espada sangue",
      "espada vermelho",
      "xiphophorus",
      "Espada Sangue / Vermelho (e Lira)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "106_espada_sangue.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "495",
    "name": "Platy Panda Preto e Branco (Xiphophorus maculatus var. Panda)",
    "commonName": "Platy Panda Preto e Branco",
    "scientificName": "Xiphophorus maculatus var. Panda",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "platy-panda-preto-e-branco.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "496",
    "name": "Espada Sangue (Xiphophorus hellerii var. Red)",
    "commonName": "Espada Sangue",
    "scientificName": "Xiphophorus hellerii var. Red",
    "synonyms": [
      "Vermelho Intenso"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "espada-sangue.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "497",
    "name": "Espada Kohaku (Xiphophorus hellerii var. Kohaku)",
    "commonName": "Espada Kohaku",
    "scientificName": "Xiphophorus hellerii var. Kohaku",
    "synonyms": [
      "Branco e Laranja",
      "espada koi",
      "espada kohaku",
      "espada verde",
      "ananas",
      "Espada Kohaku (Koi) / Verde / Preto"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "107_espada_kohaku_koi.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "498",
    "name": "Espada Verde Selvagem (Xiphophorus hellerii)",
    "commonName": "Espada Verde Selvagem",
    "scientificName": "Xiphophorus hellerii",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "espada-verde-selvagem.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "499",
    "name": "Espada Wagtail (Xiphophorus hellerii var. Wagtail)",
    "commonName": "Espada Wagtail",
    "scientificName": "Xiphophorus hellerii var. Wagtail",
    "synonyms": [
      "Nadadeiras Pretas"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "espada-wagtail.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "500",
    "name": "Espada Tuxedo (Xiphophorus hellerii var. Tuxedo)",
    "commonName": "Espada Tuxedo",
    "scientificName": "Xiphophorus hellerii var. Tuxedo",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "espada-tuxedo.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "501",
    "name": "Espada Cauda de Lira Vermelho (Xiphophorus hellerii var. Lyretail)",
    "commonName": "Espada Cauda de Lira Vermelho",
    "scientificName": "Xiphophorus hellerii var. Lyretail",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "espada-cauda-de-lira-vermelho.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "502",
    "name": "Espada Albino Olho Vermelho (Xiphophorus hellerii var. Albino)",
    "commonName": "Espada Albino Olho Vermelho",
    "scientificName": "Xiphophorus hellerii var. Albino",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "espada-albino-olho-vermelho.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "503",
    "name": "Molinésia Negra (Poecilia sphenops var. Black)",
    "commonName": "Molinésia Negra",
    "scientificName": "Poecilia sphenops var. Black",
    "synonyms": [
      "Black Molly",
      "molinesia preta",
      "black molly",
      "molinesia negra",
      "Molinésia Negra (Black Molly / Lira)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "108_molinesia_negra_lira.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "504",
    "name": "Molinésia Negra Cauda de Lira (Poecilia sphenops var. Black Lyretail)",
    "commonName": "Molinésia Negra Cauda de Lira",
    "scientificName": "Poecilia sphenops var. Black Lyretail",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "molinesia-negra-cauda-de-lira.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "505",
    "name": "Molinésia Dálmata (Poecilia sphenops var. Dalmatian)",
    "commonName": "Molinésia Dálmata",
    "scientificName": "Poecilia sphenops var. Dalmatian",
    "synonyms": [
      "Pintada",
      "molinesia dalmata",
      "molinesia ouro",
      "balao",
      "Molinésia Dálmata / Ouro / Balão"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "109_molinesia_dalmata.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "506",
    "name": "Molinésia Dálmata Cauda de Lira (Poecilia sphenops var. Dalmatian Lyretail)",
    "commonName": "Molinésia Dálmata Cauda de Lira",
    "scientificName": "Poecilia sphenops var. Dalmatian Lyretail",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "molinesia-dalmata-cauda-de-lira.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "507",
    "name": "Molinésia Branca (Poecilia sphenops var. Silver)",
    "commonName": "Molinésia Branca",
    "scientificName": "Poecilia sphenops var. Silver",
    "synonyms": [
      "Prata",
      "Silver"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "molinesia-branca.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "508",
    "name": "Molinésia Ouro (Poecilia sphenops var. Gold)",
    "commonName": "Molinésia Ouro",
    "scientificName": "Poecilia sphenops var. Gold",
    "synonyms": [
      "Dourada"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "molinesia-ouro.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "509",
    "name": "Molinésia Balão Negra (Poecilia sphenops var. Balloon Black)",
    "commonName": "Molinésia Balão Negra",
    "scientificName": "Poecilia sphenops var. Balloon Black",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "molinesia-balao-negra.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "510",
    "name": "Molinésia Balão Dálmata (Poecilia sphenops var. Balloon Dalmatian)",
    "commonName": "Molinésia Balão Dálmata",
    "scientificName": "Poecilia sphenops var. Balloon Dalmatian",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "molinesia-balao-dalmata.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "511",
    "name": "Molinésia Balão Ouro (Poecilia sphenops var. Balloon Gold)",
    "commonName": "Molinésia Balão Ouro",
    "scientificName": "Poecilia sphenops var. Balloon Gold",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "molinesia-balao-ouro.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "512",
    "name": "Molinésia Velífera (Poecilia velifera)",
    "commonName": "Molinésia Velífera",
    "scientificName": "Poecilia velifera",
    "synonyms": [
      "Barbatana Gigante"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "molinesia-velifera.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Vivíparos e Poecilídeos"
  },
  {
    "id": "513",
    "name": "Cascudo Ancistrus Comum Marrom (Ancistrus sp.)",
    "commonName": "Cascudo Ancistrus Comum Marrom",
    "scientificName": "Ancistrus sp.",
    "synonyms": [
      "ancistrus",
      "cascudo ancistrus",
      "bristlenose",
      "Cascudo Ancistrus (Comum, Albino/Ouro e Red)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "146_cascudo_ancistrus_bristlenose.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos Nobres"
  },
  {
    "id": "514",
    "name": "Cascudo Ancistrus Albino (Ancistrus sp. var. Albino)",
    "commonName": "Cascudo Ancistrus Albino",
    "scientificName": "Ancistrus sp. var. Albino",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "cascudo-ancistrus-albino.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos Nobres"
  },
  {
    "id": "515",
    "name": "Cascudo Ancistrus Super Red (Ancistrus sp. var. Super Red)",
    "commonName": "Cascudo Ancistrus Super Red",
    "scientificName": "Ancistrus sp. var. Super Red",
    "synonyms": [
      "Vermelho Puro"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "cascudo-ancistrus-super-red.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos Nobres"
  },
  {
    "id": "516",
    "name": "Cascudo Ancistrus Calico (Ancistrus sp. var. Calico)",
    "commonName": "Cascudo Ancistrus Calico",
    "scientificName": "Ancistrus sp. var. Calico",
    "synonyms": [
      "Manchado"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "cascudo-ancistrus-calico.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos Nobres"
  },
  {
    "id": "517",
    "name": "Cascudo Ancistrus Véu Marrom (Ancistrus sp. var. Longfin Brown)",
    "commonName": "Cascudo Ancistrus Véu Marrom",
    "scientificName": "Ancistrus sp. var. Longfin Brown",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "cascudo-ancistrus-veu-marrom.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos Nobres"
  },
  {
    "id": "518",
    "name": "Cascudo Ancistrus Véu Albino (Ancistrus sp. var. Longfin Albino)",
    "commonName": "Cascudo Ancistrus Véu Albino",
    "scientificName": "Ancistrus sp. var. Longfin Albino",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "cascudo-ancistrus-veu-albino.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos Nobres"
  },
  {
    "id": "519",
    "name": "Cascudo Ancistrus Véu Super Red (Ancistrus sp. var. Longfin Super Red)",
    "commonName": "Cascudo Ancistrus Véu Super Red",
    "scientificName": "Ancistrus sp. var. Longfin Super Red",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "cascudo-ancistrus-veu-super-red.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos Nobres"
  },
  {
    "id": "520",
    "name": "Cascudo Zebra Brasileiro L046 (Hypancistrus zebra)",
    "commonName": "Cascudo Zebra Brasileiro L046",
    "scientificName": "Hypancistrus zebra",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "cascudo-zebra-brasileiro-l046.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos Nobres"
  },
  {
    "id": "521",
    "name": "Cascudo Pepita de Ouro L018 (Baryancistrus xanthellus)",
    "commonName": "Cascudo Pepita de Ouro L018",
    "scientificName": "Baryancistrus xanthellus",
    "synonyms": [
      "Gold Nugget",
      "cascudo comum",
      "cascudo abacaxi",
      "pepita de ouro",
      "Cascudo Comum / Abacaxi / Pepita de Ouro (L018)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "147_cascudo_pepita_de_ouro_abacaxi.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos Nobres"
  },
  {
    "id": "522",
    "name": "Cascudo Bola de Neve L102 (Hypancistrus inspector)",
    "commonName": "Cascudo Bola de Neve L102",
    "scientificName": "Hypancistrus inspector",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "cascudo-bola-de-neve-l102.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos Nobres"
  },
  {
    "id": "523",
    "name": "Cascudo Grammicus L260 (Hypancistrus sp. L260)",
    "commonName": "Cascudo Grammicus L260",
    "scientificName": "Hypancistrus sp. L260",
    "synonyms": [
      "Queen Arabesque"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "cascudo-grammicus-l260.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos Nobres"
  },
  {
    "id": "524",
    "name": "Cascudo Tigre Real L066 (Hypancistrus sp. L066)",
    "commonName": "Cascudo Tigre Real L066",
    "scientificName": "Hypancistrus sp. L066",
    "synonyms": [
      "King Tiger"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "cascudo-tigre-real-l066.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos Nobres"
  },
  {
    "id": "525",
    "name": "Cascudo Tigre L002 (Panaqolus maccus)",
    "commonName": "Cascudo Tigre L002",
    "scientificName": "Panaqolus maccus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "cascudo-tigre-l002.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos Nobres"
  },
  {
    "id": "526",
    "name": "Cascudo Flash L204 (Panaqolus albivermis)",
    "commonName": "Cascudo Flash L204",
    "scientificName": "Panaqolus albivermis",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "cascudo-flash-l204.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos Nobres"
  },
  {
    "id": "527",
    "name": "Cascudo Leopardo L114 (Pseudacanthicus leopardus)",
    "commonName": "Cascudo Leopardo L114",
    "scientificName": "Pseudacanthicus leopardus",
    "synonyms": [
      "Red Fin"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "cascudo-leopardo-l114.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos Nobres"
  },
  {
    "id": "528",
    "name": "Cascudo Titânio L273 (Pseudacanthicus sp. L273)",
    "commonName": "Cascudo Titânio L273",
    "scientificName": "Pseudacanthicus sp. L273",
    "synonyms": [
      "Red Titanic"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "cascudo-titanio-l273.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos Nobres"
  },
  {
    "id": "529",
    "name": "Cascudo Melancia L330 (Panaque bathyphilus)",
    "commonName": "Cascudo Melancia L330",
    "scientificName": "Panaque bathyphilus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "cascudo-melancia-l330.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos Nobres"
  },
  {
    "id": "530",
    "name": "Cascudo Real L190 (Panaque nigrolineatus)",
    "commonName": "Cascudo Real L190",
    "scientificName": "Panaque nigrolineatus",
    "synonyms": [
      "Royal Pleco"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "cascudo-real-l190.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos Nobres"
  },
  {
    "id": "531",
    "name": "Cascudo Pletomado (Parotocinclus jumbo)",
    "commonName": "Cascudo Pletomado",
    "scientificName": "Parotocinclus jumbo",
    "synonyms": [
      "Pitbull Pleco"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "cascudo-pletomado.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos Nobres"
  },
  {
    "id": "532",
    "name": "Cascudo Comum Hypostomus (Hypostomus plecostomus)",
    "commonName": "Cascudo Comum Hypostomus",
    "scientificName": "Hypostomus plecostomus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "cascudo-comum-hypostomus.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos Nobres"
  },
  {
    "id": "533",
    "name": "Cascudo Abacaxi (Pterygoplichthys pardalis)",
    "commonName": "Cascudo Abacaxi",
    "scientificName": "Pterygoplichthys pardalis",
    "synonyms": [
      "Pterygoplichthys"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "cascudo-abacaxi.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos Nobres"
  },
  {
    "id": "534",
    "name": "Cascudo Abacaxi Albino (Pterygoplichthys pardalis var. Albino)",
    "commonName": "Cascudo Abacaxi Albino",
    "scientificName": "Pterygoplichthys pardalis var. Albino",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "cascudo-abacaxi-albino.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos Nobres"
  },
  {
    "id": "535",
    "name": "Coridora Paleatus (Corydoras paleatus)",
    "commonName": "Coridora Paleatus",
    "scientificName": "Corydoras paleatus",
    "synonyms": [
      "Coridora Pimenta",
      "coridora pimenta",
      "coridora schwartzi",
      "tigre",
      "Coridora Pimenta (Paleatus) & Schwartzi (Tigre)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "143_coridora_pimenta_schwartzi.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras e Loricariídeos Limpadores"
  },
  {
    "id": "536",
    "name": "Coridora Paleatus Albina (Corydoras paleatus var. Albino)",
    "commonName": "Coridora Paleatus Albina",
    "scientificName": "Corydoras paleatus var. Albino",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "coridora-paleatus-albina.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras e Loricariídeos Limpadores"
  },
  {
    "id": "537",
    "name": "Coridora Paleatus Véu (Corydoras paleatus var. Longfin)",
    "commonName": "Coridora Paleatus Véu",
    "scientificName": "Corydoras paleatus var. Longfin",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "coridora-paleatus-veu.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras e Loricariídeos Limpadores"
  },
  {
    "id": "538",
    "name": "Coridora Aeneus (Corydoras aeneus)",
    "commonName": "Coridora Aeneus",
    "scientificName": "Corydoras aeneus",
    "synonyms": [
      "Bronze",
      "coridora bronze",
      "coridora albina",
      "aeneus",
      "Coridora Bronze (Aeneus) & Albina"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "142_coridora_bronze_albina.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras e Loricariídeos Limpadores"
  },
  {
    "id": "539",
    "name": "Coridora Aeneus Albina (Corydoras aeneus var. Albino)",
    "commonName": "Coridora Aeneus Albina",
    "scientificName": "Corydoras aeneus var. Albino",
    "synonyms": [
      "Ouro"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "coridora-aeneus-albina.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras e Loricariídeos Limpadores"
  },
  {
    "id": "540",
    "name": "Coridora Aeneus Black Venezuela (Corydoras sp. Black Venezuela)",
    "commonName": "Coridora Aeneus Black Venezuela",
    "scientificName": "Corydoras sp. Black Venezuela",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "coridora-aeneus-black-venezuela.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras e Loricariídeos Limpadores"
  },
  {
    "id": "541",
    "name": "Coridora Julii (Corydoras julii)",
    "commonName": "Coridora Julii",
    "scientificName": "Corydoras julii",
    "synonyms": [
      "Falsa Julii Pintada"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "coridora-julii.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras e Loricariídeos Limpadores"
  },
  {
    "id": "542",
    "name": "Coridora Sterbai (Corydoras sterbai)",
    "commonName": "Coridora Sterbai",
    "scientificName": "Corydoras sterbai",
    "synonyms": [
      "Cauda Laranja"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "coridora-sterbai.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras e Loricariídeos Limpadores"
  },
  {
    "id": "543",
    "name": "Coridora Panda (Corydoras panda)",
    "commonName": "Coridora Panda",
    "scientificName": "Corydoras panda",
    "synonyms": [
      "coridora panda",
      "coridora sterbai",
      "julii",
      "Coridora Panda & Coridora Sterbai"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "144_coridora_panda_sterbai.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras e Loricariídeos Limpadores"
  },
  {
    "id": "544",
    "name": "Coridora Panda Véu (Corydoras panda var. Longfin)",
    "commonName": "Coridora Panda Véu",
    "scientificName": "Corydoras panda var. Longfin",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "coridora-panda-veu.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras e Loricariídeos Limpadores"
  },
  {
    "id": "545",
    "name": "Coridora Adolfoi (Corydoras adolfoi)",
    "commonName": "Coridora Adolfoi",
    "scientificName": "Corydoras adolfoi",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "coridora-adolfoi.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras e Loricariídeos Limpadores"
  },
  {
    "id": "546",
    "name": "Coridora Duplicareus (Corydoras duplicareus)",
    "commonName": "Coridora Duplicareus",
    "scientificName": "Corydoras duplicareus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "coridora-duplicareus.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras e Loricariídeos Limpadores"
  },
  {
    "id": "547",
    "name": "Coridora Melini (Corydoras melini)",
    "commonName": "Coridora Melini",
    "scientificName": "Corydoras melini",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "coridora-melini.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras e Loricariídeos Limpadores"
  },
  {
    "id": "548",
    "name": "Coridora Metae (Corydoras metae)",
    "commonName": "Coridora Metae",
    "scientificName": "Corydoras metae",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "coridora-metae.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras e Loricariídeos Limpadores"
  },
  {
    "id": "549",
    "name": "Coridora Arqueada (Corydoras arcuatus)",
    "commonName": "Coridora Arqueada",
    "scientificName": "Corydoras arcuatus",
    "synonyms": [
      "Arcuatus"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "coridora-arqueada.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras e Loricariídeos Limpadores"
  },
  {
    "id": "550",
    "name": "Coridora Elegans (Corydoras elegans)",
    "commonName": "Coridora Elegans",
    "scientificName": "Corydoras elegans",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "coridora-elegans.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras e Loricariídeos Limpadores"
  },
  {
    "id": "551",
    "name": "Coridora Similis (Corydoras similis)",
    "commonName": "Coridora Similis",
    "scientificName": "Corydoras similis",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "coridora-similis.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras e Loricariídeos Limpadores"
  },
  {
    "id": "552",
    "name": "Coridora Anã Pygmaeus (Corydoras pygmaeus)",
    "commonName": "Coridora Anã Pygmaeus",
    "scientificName": "Corydoras pygmaeus",
    "synonyms": [
      "Pigmêa"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "coridora-ana-pygmaeus.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras e Loricariídeos Limpadores"
  },
  {
    "id": "553",
    "name": "Coridora Anã Habrosus (Corydoras habrosus)",
    "commonName": "Coridora Anã Habrosus",
    "scientificName": "Corydoras habrosus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "coridora-ana-habrosus.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras e Loricariídeos Limpadores"
  },
  {
    "id": "554",
    "name": "Coridora Anã Hastatus (Corydoras hastatus)",
    "commonName": "Coridora Anã Hastatus",
    "scientificName": "Corydoras hastatus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "coridora-ana-hastatus.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras e Loricariídeos Limpadores"
  },
  {
    "id": "555",
    "name": "Otocinclus Comum (Otocinclus vestitus)",
    "commonName": "Otocinclus Comum",
    "scientificName": "Otocinclus vestitus",
    "synonyms": [
      "Limpa Vidro Nacional",
      "limpa vidro",
      "otocinclus",
      "oto",
      "parotocinclus",
      "Limpa-Vidro (Otocinclus & Parotocinclus)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "145_limpa_vidro_otocinclus.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras e Loricariídeos Limpadores"
  },
  {
    "id": "556",
    "name": "Otocinclus Negro (Hisonotus leucofrenatus)",
    "commonName": "Otocinclus Negro",
    "scientificName": "Hisonotus leucofrenatus",
    "synonyms": [
      "Limpa Vidro Preto"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "otocinclus-negro.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras e Loricariídeos Limpadores"
  },
  {
    "id": "557",
    "name": "Otocinclus Cocama (Otocinclus cocama)",
    "commonName": "Otocinclus Cocama",
    "scientificName": "Otocinclus cocama",
    "synonyms": [
      "Limpa Vidro Zebra"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "otocinclus-cocama.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras e Loricariídeos Limpadores"
  },
  {
    "id": "558",
    "name": "Comedor de Alga Siamês (Crossocheilus oblongus)",
    "commonName": "Comedor de Alga Siamês",
    "scientificName": "Crossocheilus oblongus",
    "synonyms": [
      "SAE"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "comedor-de-alga-siames.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras e Loricariídeos Limpadores"
  },
  {
    "id": "559",
    "name": "Comedor de Alga Chinês (Gyrinocheilus aymonieri)",
    "commonName": "Comedor de Alga Chinês",
    "scientificName": "Gyrinocheilus aymonieri",
    "synonyms": [
      "CAE"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "comedor-de-alga-chines.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras e Loricariídeos Limpadores"
  },
  {
    "id": "560",
    "name": "Comedor de Alga Chinês Albino (Gyrinocheilus aymonieri var. Gold)",
    "commonName": "Comedor de Alga Chinês Albino",
    "scientificName": "Gyrinocheilus aymonieri var. Gold",
    "synonyms": [
      "Golden CAE"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "comedor-de-alga-chines-albino.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras e Loricariídeos Limpadores"
  },
  {
    "id": "561",
    "name": "Peixe Raposa Voadora (Epalzeorhynchos kalopterus)",
    "commonName": "Peixe Raposa Voadora",
    "scientificName": "Epalzeorhynchos kalopterus",
    "synonyms": [
      "Flying Fox"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-raposa-voadora.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras e Loricariídeos Limpadores"
  },
  {
    "id": "562",
    "name": "Rasbora Arlequim (Trigonostigma heteromorpha)",
    "commonName": "Rasbora Arlequim",
    "scientificName": "Trigonostigma heteromorpha",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "rasbora-arlequim.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos, Rasboras e Barbus"
  },
  {
    "id": "563",
    "name": "Rasbora Espei (Trigonostigma espei)",
    "commonName": "Rasbora Espei",
    "scientificName": "Trigonostigma espei",
    "synonyms": [
      "Lambchop"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "rasbora-espei.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos, Rasboras e Barbus"
  },
  {
    "id": "564",
    "name": "Rasbora Hengeli (Trigonostigma hengeli)",
    "commonName": "Rasbora Hengeli",
    "scientificName": "Trigonostigma hengeli",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "rasbora-hengeli.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos, Rasboras e Barbus"
  },
  {
    "id": "565",
    "name": "Rasbora Galaxy (Danio margaritatus)",
    "commonName": "Rasbora Galaxy",
    "scientificName": "Danio margaritatus",
    "synonyms": [
      "Pérola Celestial"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "rasbora-galaxy.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos, Rasboras e Barbus"
  },
  {
    "id": "566",
    "name": "Rasbora Mosquito (Boraras brigittae)",
    "commonName": "Rasbora Mosquito",
    "scientificName": "Boraras brigittae",
    "synonyms": [
      "Boraras Brigittae"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "rasbora-mosquito.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos, Rasboras e Barbus"
  },
  {
    "id": "567",
    "name": "Rasbora Anã (Boraras maculatus)",
    "commonName": "Rasbora Anã",
    "scientificName": "Boraras maculatus",
    "synonyms": [
      "Boraras Maculatus"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "rasbora-ana.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos, Rasboras e Barbus"
  },
  {
    "id": "568",
    "name": "Rasbora Tesourinha (Rasbora trilineata)",
    "commonName": "Rasbora Tesourinha",
    "scientificName": "Rasbora trilineata",
    "synonyms": [
      "Scissortail"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "rasbora-tesourinha.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos, Rasboras e Barbus"
  },
  {
    "id": "569",
    "name": "Danio Rerio (Danio rerio)",
    "commonName": "Danio Rerio",
    "scientificName": "Danio rerio",
    "synonyms": [
      "Paulistinha Zebra"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "danio-rerio.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos, Rasboras e Barbus"
  },
  {
    "id": "570",
    "name": "Danio Rerio Véu (Danio rerio var. Longfin)",
    "commonName": "Danio Rerio Véu",
    "scientificName": "Danio rerio var. Longfin",
    "synonyms": [
      "Paulistinha Véu"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "danio-rerio-veu.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos, Rasboras e Barbus"
  },
  {
    "id": "571",
    "name": "Danio GloFish Rosa (Danio rerio var. GloFish Pink)",
    "commonName": "Danio GloFish Rosa",
    "scientificName": "Danio rerio var. GloFish Pink",
    "synonyms": [
      "Paulistinha Glow Rosa"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "danio-glofish-rosa.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos, Rasboras e Barbus"
  },
  {
    "id": "572",
    "name": "Danio GloFish Verde (Danio rerio var. GloFish Green)",
    "commonName": "Danio GloFish Verde",
    "scientificName": "Danio rerio var. GloFish Green",
    "synonyms": [
      "Paulistinha Glow Verde"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "danio-glofish-verde.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos, Rasboras e Barbus"
  },
  {
    "id": "573",
    "name": "Danio GloFish Azul (Danio rerio var. GloFish Blue)",
    "commonName": "Danio GloFish Azul",
    "scientificName": "Danio rerio var. GloFish Blue",
    "synonyms": [
      "Paulistinha Glow Azul"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "danio-glofish-azul.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos, Rasboras e Barbus"
  },
  {
    "id": "574",
    "name": "Danio Pérola (Danio albolineatus)",
    "commonName": "Danio Pérola",
    "scientificName": "Danio albolineatus",
    "synonyms": [
      "Pearl Danio"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "danio-perola.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos, Rasboras e Barbus"
  },
  {
    "id": "575",
    "name": "Danio Gigante (Devario aequipinnatus)",
    "commonName": "Danio Gigante",
    "scientificName": "Devario aequipinnatus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "danio-gigante.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos, Rasboras e Barbus"
  },
  {
    "id": "576",
    "name": "Barbo Sumatra (Puntigrus tetrazona)",
    "commonName": "Barbo Sumatra",
    "scientificName": "Puntigrus tetrazona",
    "synonyms": [
      "Tigre",
      "barbo sumatra",
      "barbo tigre",
      "sumatra verde",
      "Barbo Sumatra / Tigre (Comum, Verde e Albino)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "122_barbo_sumatra_tigre.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos, Rasboras e Barbus"
  },
  {
    "id": "577",
    "name": "Barbo Sumatra Verde (Puntigrus tetrazona var. Green)",
    "commonName": "Barbo Sumatra Verde",
    "scientificName": "Puntigrus tetrazona var. Green",
    "synonyms": [
      "Green Moss"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "barbo-sumatra-verde.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos, Rasboras e Barbus"
  },
  {
    "id": "578",
    "name": "Barbo Sumatra Albino (Puntigrus tetrazona var. Albino)",
    "commonName": "Barbo Sumatra Albino",
    "scientificName": "Puntigrus tetrazona var. Albino",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "barbo-sumatra-albino.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos, Rasboras e Barbus"
  },
  {
    "id": "579",
    "name": "Barbo Ouro (Barbodes semifasciolatus var. Gold)",
    "commonName": "Barbo Ouro",
    "scientificName": "Barbodes semifasciolatus var. Gold",
    "synonyms": [
      "Schubert"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "barbo-ouro.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos, Rasboras e Barbus"
  },
  {
    "id": "580",
    "name": "Barbo Titteya (Rohanella titteya)",
    "commonName": "Barbo Titteya",
    "scientificName": "Rohanella titteya",
    "synonyms": [
      "Cereja",
      "barbo cereja",
      "cherry barb",
      "barbo ouro",
      "Barbo Cereja & Barbo Ouro"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "123_barbo_cereja_ouro.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos, Rasboras e Barbus"
  },
  {
    "id": "581",
    "name": "Barbo Cereja Albino (Rohanella titteya var. Albino)",
    "commonName": "Barbo Cereja Albino",
    "scientificName": "Rohanella titteya var. Albino",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "barbo-cereja-albino.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos, Rasboras e Barbus"
  },
  {
    "id": "582",
    "name": "Barbo Rosado (Pethia conchonius)",
    "commonName": "Barbo Rosado",
    "scientificName": "Pethia conchonius",
    "synonyms": [
      "Rosy Barb"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "barbo-rosado.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos, Rasboras e Barbus"
  },
  {
    "id": "583",
    "name": "Barbo Rosado Véu (Pethia conchonius var. Longfin)",
    "commonName": "Barbo Rosado Véu",
    "scientificName": "Pethia conchonius var. Longfin",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "barbo-rosado-veu.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos, Rasboras e Barbus"
  },
  {
    "id": "584",
    "name": "Barbo Denisoni (Sahyadria denisonii)",
    "commonName": "Barbo Denisoni",
    "scientificName": "Sahyadria denisonii",
    "synonyms": [
      "Torpedo Roxo"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "barbo-denisoni.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos, Rasboras e Barbus"
  },
  {
    "id": "585",
    "name": "Peixe Cobitídeo Dojo (Pangio kuhlii)",
    "commonName": "Peixe Cobitídeo Dojo",
    "scientificName": "Pangio kuhlii",
    "synonyms": [
      "Kuhli Loach",
      "Cobrinha"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-cobitideo-dojo.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos, Rasboras e Barbus"
  },
  {
    "id": "586",
    "name": "Peixe Dojo Oriental (Misgurnus anguillicaudatus)",
    "commonName": "Peixe Dojo Oriental",
    "scientificName": "Misgurnus anguillicaudatus",
    "synonyms": [
      "Weather Loach"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-dojo-oriental.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos, Rasboras e Barbus"
  },
  {
    "id": "587",
    "name": "Peixe Bótia Palhaço (Chromobotia macracanthus)",
    "commonName": "Peixe Bótia Palhaço",
    "scientificName": "Chromobotia macracanthus",
    "synonyms": [
      "sae",
      "cac",
      "labeo bicolor",
      "botia yoyo",
      "palhaco",
      "Algueiros e Bótias (SAE, CAC, Labeo, Bótia Yoyo/Palhaço)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "148_algueiros_labeo_botia_sae.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos, Rasboras e Barbus"
  },
  {
    "id": "588",
    "name": "Peixe Bótia Yoyo (Botia almorhae)",
    "commonName": "Peixe Bótia Yoyo",
    "scientificName": "Botia almorhae",
    "synonyms": [
      "Almora"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-botia-yoyo.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos, Rasboras e Barbus"
  },
  {
    "id": "589",
    "name": "Peixe Bótia Striata (Botia striata)",
    "commonName": "Peixe Bótia Striata",
    "scientificName": "Botia striata",
    "synonyms": [
      "Zebra"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-botia-striata.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos, Rasboras e Barbus"
  },
  {
    "id": "590",
    "name": "Peixe Bótia Sidthimunki (Ambastaia sidthimunki)",
    "commonName": "Peixe Bótia Sidthimunki",
    "scientificName": "Ambastaia sidthimunki",
    "synonyms": [
      "Anã"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-botia-sidthimunki.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos, Rasboras e Barbus"
  },
  {
    "id": "591",
    "name": "Peixe Bótia Modesta (Yasuhikotakia modesta)",
    "commonName": "Peixe Bótia Modesta",
    "scientificName": "Yasuhikotakia modesta",
    "synonyms": [
      "Azul"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-botia-modesta.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos, Rasboras e Barbus"
  },
  {
    "id": "592",
    "name": "Betta Splendens Halfmoon (Betta splendens var. Halfmoon)",
    "commonName": "Betta Splendens Halfmoon",
    "scientificName": "Betta splendens var. Halfmoon",
    "synonyms": [
      "Meia Lua",
      "betta halfmoon",
      "betta hm",
      "meia lua",
      "Betta Halfmoon (Meia-Lua 180°)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "099_betta_halfmoon.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Anabantídeos"
  },
  {
    "id": "593",
    "name": "Betta Splendens Crowntail (Betta splendens var. Crowntail)",
    "commonName": "Betta Splendens Crowntail",
    "scientificName": "Betta splendens var. Crowntail",
    "synonyms": [
      "Cauda de Coroa",
      "betta crowntail",
      "betta coroa",
      "Betta Crowntail (Cauda de Coroa)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "102_betta_crowntail.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Anabantídeos"
  },
  {
    "id": "594",
    "name": "Betta Splendens Plakat Tradicional (Betta splendens var. Plakat)",
    "commonName": "Betta Splendens Plakat Tradicional",
    "scientificName": "Betta splendens var. Plakat",
    "synonyms": [
      "Cauda Curta"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "betta-splendens-plakat-tradicional.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Anabantídeos"
  },
  {
    "id": "595",
    "name": "Betta Splendens Plakat Koi Galaxy (Betta splendens var. Koi Galaxy)",
    "commonName": "Betta Splendens Plakat Koi Galaxy",
    "scientificName": "Betta splendens var. Koi Galaxy",
    "synonyms": [
      "betta koi",
      "betta nemo",
      "betta galaxy",
      "plakat",
      "Betta Plakat Koi Galaxy / Candy Nemo"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "100_betta_plakat_koi_nemo.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Anabantídeos"
  },
  {
    "id": "596",
    "name": "Betta Splendens Plakat Nemo (Betta splendens var. Nemo)",
    "commonName": "Betta Splendens Plakat Nemo",
    "scientificName": "Betta splendens var. Nemo",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "betta-splendens-plakat-nemo.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Anabantídeos"
  },
  {
    "id": "597",
    "name": "Betta Splendens Plakat Samurai Black (Betta splendens var. Black Samurai)",
    "commonName": "Betta Splendens Plakat Samurai Black",
    "scientificName": "Betta splendens var. Black Samurai",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "betta-splendens-plakat-samurai-black.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Anabantídeos"
  },
  {
    "id": "598",
    "name": "Betta Splendens Plakat Copper (Betta splendens var. Copper)",
    "commonName": "Betta Splendens Plakat Copper",
    "scientificName": "Betta splendens var. Copper",
    "synonyms": [
      "Cobre"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "betta-splendens-plakat-copper.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Anabantídeos"
  },
  {
    "id": "599",
    "name": "Betta Splendens Dumbo Ear (Betta splendens var. Dumbo Ear)",
    "commonName": "Betta Splendens Dumbo Ear",
    "scientificName": "Betta splendens var. Dumbo Ear",
    "synonyms": [
      "Orelha de Elefante",
      "betta dumbo",
      "betta orelha de elefante",
      "Betta Dumbo (Big Ear)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "101_betta_dumbo.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Anabantídeos"
  },
  {
    "id": "600",
    "name": "Betta Splendens Super Delta (Betta splendens var. Super Delta)",
    "commonName": "Betta Splendens Super Delta",
    "scientificName": "Betta splendens var. Super Delta",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "betta-splendens-super-delta.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Anabantídeos"
  },
  {
    "id": "601",
    "name": "Betta Splendens Double Tail (Betta splendens var. Double Tail)",
    "commonName": "Betta Splendens Double Tail",
    "scientificName": "Betta splendens var. Double Tail",
    "synonyms": [
      "Cauda Dupla"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "betta-splendens-double-tail.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Anabantídeos"
  },
  {
    "id": "602",
    "name": "Betta Splendens Fêmea Halfmoon (Betta splendens var. Female Halfmoon)",
    "commonName": "Betta Splendens Fêmea Halfmoon",
    "scientificName": "Betta splendens var. Female Halfmoon",
    "synonyms": [
      "betta femea",
      "femea de betta",
      "Betta Fêmea (Comunitário / Sororidade)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "103_betta_femea.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Anabantídeos"
  },
  {
    "id": "603",
    "name": "Betta Splendens Fêmea Plakat (Betta splendens var. Female Plakat)",
    "commonName": "Betta Splendens Fêmea Plakat",
    "scientificName": "Betta splendens var. Female Plakat",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "betta-splendens-femea-plakat.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Anabantídeos"
  },
  {
    "id": "604",
    "name": "Colisa Lalia (Trichogaster lalius)",
    "commonName": "Colisa Lalia",
    "scientificName": "Trichogaster lalius",
    "synonyms": [
      "Colisa Anã Macho",
      "colisa lalia",
      "colisa sangue",
      "colisa azul",
      "mel",
      "Colisa Lália / Sangue / Azul / Mel"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "110_colisa_lalia_sangue_azul.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Anabantídeos"
  },
  {
    "id": "605",
    "name": "Colisa Lalia Azul Cobalto (Trichogaster lalius var. Cobalt Blue)",
    "commonName": "Colisa Lalia Azul Cobalto",
    "scientificName": "Trichogaster lalius var. Cobalt Blue",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "colisa-lalia-azul-cobalto.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Anabantídeos"
  },
  {
    "id": "606",
    "name": "Colisa Lalia Vermelha (Trichogaster lalius var. Sunset)",
    "commonName": "Colisa Lalia Vermelha",
    "scientificName": "Trichogaster lalius var. Sunset",
    "synonyms": [
      "Sunset"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "colisa-lalia-vermelha.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Anabantídeos"
  },
  {
    "id": "607",
    "name": "Colisa Lalia Neon (Trichogaster lalius var. Neon)",
    "commonName": "Colisa Lalia Neon",
    "scientificName": "Trichogaster lalius var. Neon",
    "synonyms": [
      "Arco-Íris"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "colisa-lalia-neon.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Anabantídeos"
  },
  {
    "id": "608",
    "name": "Colisa Chuna (Trichogaster chuna)",
    "commonName": "Colisa Chuna",
    "scientificName": "Trichogaster chuna",
    "synonyms": [
      "Colisa Mel"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "colisa-chuna.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Anabantídeos"
  },
  {
    "id": "609",
    "name": "Colisa Fasciata (Trichogaster fasciata)",
    "commonName": "Colisa Fasciata",
    "scientificName": "Trichogaster fasciata",
    "synonyms": [
      "Listrada Gigante"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "colisa-fasciata.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Anabantídeos"
  },
  {
    "id": "610",
    "name": "Tricogaster Leeri (Trichopodus leerii)",
    "commonName": "Tricogaster Leeri",
    "scientificName": "Trichopodus leerii",
    "synonyms": [
      "Pérola",
      "tricogaster",
      "tricogaster azul",
      "ouro",
      "perola",
      "Tricogaster (Azul, Ouro e Pérola Leeri)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "111_tricogaster_perola_azul_ouro.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Anabantídeos"
  },
  {
    "id": "611",
    "name": "Tricogaster Azul (Trichopodus trichopterus)",
    "commonName": "Tricogaster Azul",
    "scientificName": "Trichopodus trichopterus",
    "synonyms": [
      "Três Pintas"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "tricogaster-azul.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Anabantídeos"
  },
  {
    "id": "612",
    "name": "Tricogaster Amarelo (Trichopodus trichopterus var. Gold)",
    "commonName": "Tricogaster Amarelo",
    "scientificName": "Trichopodus trichopterus var. Gold",
    "synonyms": [
      "Ouro"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "tricogaster-amarelo.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Anabantídeos"
  },
  {
    "id": "613",
    "name": "Tricogaster Cosby (Trichopodus trichopterus var. Cosby)",
    "commonName": "Tricogaster Cosby",
    "scientificName": "Trichopodus trichopterus var. Cosby",
    "synonyms": [
      "Marmorato"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "tricogaster-cosby.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Anabantídeos"
  },
  {
    "id": "614",
    "name": "Tricogaster Albino (Trichopodus trichopterus var. Albino)",
    "commonName": "Tricogaster Albino",
    "scientificName": "Trichopodus trichopterus var. Albino",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "tricogaster-albino.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Anabantídeos"
  },
  {
    "id": "615",
    "name": "Tricogaster Beijador (Helostoma temminckii)",
    "commonName": "Tricogaster Beijador",
    "scientificName": "Helostoma temminckii",
    "synonyms": [
      "Kissing Gourami"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "tricogaster-beijador.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Anabantídeos"
  },
  {
    "id": "616",
    "name": "Peixe Paraíso Azul (Macropodus opercularis)",
    "commonName": "Peixe Paraíso Azul",
    "scientificName": "Macropodus opercularis",
    "synonyms": [
      "Macropodus"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-paraiso-azul.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Anabantídeos"
  },
  {
    "id": "617",
    "name": "Peixe Paraíso Albino (Macropodus opercularis var. Albino)",
    "commonName": "Peixe Paraíso Albino",
    "scientificName": "Macropodus opercularis var. Albino",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-paraiso-albino.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Anabantídeos"
  },
  {
    "id": "618",
    "name": "Aruanã Prata Amazônica (Osteoglossum bicirrhosum)",
    "commonName": "Aruanã Prata Amazônica",
    "scientificName": "Osteoglossum bicirrhosum",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "aruana-prata-amazonica.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Peixes Primitivos, Predadores Jumbos e Outros de Água Doce"
  },
  {
    "id": "619",
    "name": "Aruanã Negra (Osteoglossum ferreirai)",
    "commonName": "Aruanã Negra",
    "scientificName": "Osteoglossum ferreirai",
    "synonyms": [
      "Black Arowana",
      "labidochromis yellow",
      "demasoni",
      "saulosi",
      "mbuna",
      "Ciclídeos Africanos Malawi (Yellow & Mbunas)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "135_ciclideos_malawi_yellow.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Peixes Primitivos, Predadores Jumbos e Outros de Água Doce"
  },
  {
    "id": "620",
    "name": "Peixe Polypteru Senegalus (Polypterus senegalus)",
    "commonName": "Peixe Polypteru Senegalus",
    "scientificName": "Polypterus senegalus",
    "synonyms": [
      "Dinossauro"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-polypteru-senegalus.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Peixes Primitivos, Predadores Jumbos e Outros de Água Doce"
  },
  {
    "id": "621",
    "name": "Peixe Polypteru Senegalus Albino (Polypterus senegalus var. Albino)",
    "commonName": "Peixe Polypteru Senegalus Albino",
    "scientificName": "Polypterus senegalus var. Albino",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-polypteru-senegalus-albino.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Peixes Primitivos, Predadores Jumbos e Outros de Água Doce"
  },
  {
    "id": "622",
    "name": "Peixe Polypteru Endlicheri (Polypterus endlicheri)",
    "commonName": "Peixe Polypteru Endlicheri",
    "scientificName": "Polypterus endlicheri",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-polypteru-endlicheri.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Peixes Primitivos, Predadores Jumbos e Outros de Água Doce"
  },
  {
    "id": "623",
    "name": "Peixe Polypteru Ornatipinnis (Polypterus ornatipinnis)",
    "commonName": "Peixe Polypteru Ornatipinnis",
    "scientificName": "Polypterus ornatipinnis",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-polypteru-ornatipinnis.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Peixes Primitivos, Predadores Jumbos e Outros de Água Doce"
  },
  {
    "id": "624",
    "name": "Peixe Polypteru Delhezi (Polypterus delhezi)",
    "commonName": "Peixe Polypteru Delhezi",
    "scientificName": "Polypterus delhezi",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-polypteru-delhezi.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Peixes Primitivos, Predadores Jumbos e Outros de Água Doce"
  },
  {
    "id": "625",
    "name": "Peixe Faca Fantasma Negro (Apteronotus albifrons)",
    "commonName": "Peixe Faca Fantasma Negro",
    "scientificName": "Apteronotus albifrons",
    "synonyms": [
      "Black Ghost"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-faca-fantasma-negro.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Peixes Primitivos, Predadores Jumbos e Outros de Água Doce"
  },
  {
    "id": "626",
    "name": "Peixe Faca Palhaço (Chitala ornata)",
    "commonName": "Peixe Faca Palhaço",
    "scientificName": "Chitala ornata",
    "synonyms": [
      "Clown Knife"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-faca-palhaco.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Peixes Primitivos, Predadores Jumbos e Outros de Água Doce"
  },
  {
    "id": "627",
    "name": "Peixe Faca Palhaço Albino (Chitala ornata var. Albino)",
    "commonName": "Peixe Faca Palhaço Albino",
    "scientificName": "Chitala ornata var. Albino",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-faca-palhaco-albino.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Peixes Primitivos, Predadores Jumbos e Outros de Água Doce"
  },
  {
    "id": "628",
    "name": "Peixe Lepisosteus (Lepisosteus oculatus)",
    "commonName": "Peixe Lepisosteus",
    "scientificName": "Lepisosteus oculatus",
    "synonyms": [
      "Gar Manchado",
      "Boca de Jacaré"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-lepisosteus.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Peixes Primitivos, Predadores Jumbos e Outros de Água Doce"
  },
  {
    "id": "629",
    "name": "Peixe Pangasius (Pangasianodon hypophthalmus)",
    "commonName": "Peixe Pangasius",
    "scientificName": "Pangasianodon hypophthalmus",
    "synonyms": [
      "Tubarão Martelo de Água Doce"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-pangasius.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Peixes Primitivos, Predadores Jumbos e Outros de Água Doce"
  },
  {
    "id": "630",
    "name": "Peixe Pangasius Albino (Pangasianodon hypophthalmus var. Albino)",
    "commonName": "Peixe Pangasius Albino",
    "scientificName": "Pangasianodon hypophthalmus var. Albino",
    "synonyms": [
      "aruana",
      "polypterus",
      "senegalus",
      "tucunare",
      "severo",
      "Peixes Jumbos (Aruanã Prata, Polypterus, Tucunaré)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "138_peixes_jumbos_aruana_polypterus.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Peixes Primitivos, Predadores Jumbos e Outros de Água Doce"
  },
  {
    "id": "631",
    "name": "Peixe Pirarara Amazônica (Phractocephalus hemioliopterus)",
    "commonName": "Peixe Pirarara Amazônica",
    "scientificName": "Phractocephalus hemioliopterus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-pirarara-amazonica.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Peixes Primitivos, Predadores Jumbos e Outros de Água Doce"
  },
  {
    "id": "632",
    "name": "Peixe Pintado (Pseudoplatystoma corruscans)",
    "commonName": "Peixe Pintado",
    "scientificName": "Pseudoplatystoma corruscans",
    "synonyms": [
      "Surubim"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-pintado.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Peixes Primitivos, Predadores Jumbos e Outros de Água Doce"
  },
  {
    "id": "633",
    "name": "Peixe Cachara (Pseudoplatystoma fasciatum)",
    "commonName": "Peixe Cachara",
    "scientificName": "Pseudoplatystoma fasciatum",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-cachara.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Peixes Primitivos, Predadores Jumbos e Outros de Água Doce"
  },
  {
    "id": "634",
    "name": "Peixe Bitinga (Zungaro zungaro)",
    "commonName": "Peixe Bitinga",
    "scientificName": "Zungaro zungaro",
    "synonyms": [
      "Jaú"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-bitinga.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Peixes Primitivos, Predadores Jumbos e Outros de Água Doce"
  },
  {
    "id": "635",
    "name": "Peixe Baiacu Anão de Água Doce (Carinotetraodon travancoricus)",
    "commonName": "Peixe Baiacu Anão de Água Doce",
    "scientificName": "Carinotetraodon travancoricus",
    "synonyms": [
      "Pea Puffer"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-baiacu-anao-de-agua-doce.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Peixes Primitivos, Predadores Jumbos e Outros de Água Doce"
  },
  {
    "id": "636",
    "name": "Peixe Baiacu Amazônico (Colomesus asellus)",
    "commonName": "Peixe Baiacu Amazônico",
    "scientificName": "Colomesus asellus",
    "synonyms": [
      "Colomesus"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-baiacu-amazonico.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Peixes Primitivos, Predadores Jumbos e Outros de Água Doce"
  },
  {
    "id": "637",
    "name": "Peixe Agulha de Água Doce (Potamorrhaphis guianensis)",
    "commonName": "Peixe Agulha de Água Doce",
    "scientificName": "Potamorrhaphis guianensis",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-agulha-de-agua-doce.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Peixes Primitivos, Predadores Jumbos e Outros de Água Doce"
  },
  {
    "id": "638",
    "name": "Arraia Motoro Nacional (Potamotrygon motoro)",
    "commonName": "Arraia Motoro Nacional",
    "scientificName": "Potamotrygon motoro",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "arraia-motoro-nacional.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Peixes Primitivos, Predadores Jumbos e Outros de Água Doce"
  },
  {
    "id": "639",
    "name": "Arraia Black Diamond (Potamotrygon leopoldi var. Black Diamond)",
    "commonName": "Arraia Black Diamond",
    "scientificName": "Potamotrygon leopoldi var. Black Diamond",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "arraia-black-diamond.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Peixes Primitivos, Predadores Jumbos e Outros de Água Doce"
  },
  {
    "id": "640",
    "name": "Peixe Arco-Íris Boesemani (Melanotaenia boesemani)",
    "commonName": "Peixe Arco-Íris Boesemani",
    "scientificName": "Melanotaenia boesemani",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-arco-iris-boesemani.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Peixes Primitivos, Predadores Jumbos e Outros de Água Doce"
  },
  {
    "id": "641",
    "name": "Peixe Arco-Íris Neon (Melanotaenia praecox)",
    "commonName": "Peixe Arco-Íris Neon",
    "scientificName": "Melanotaenia praecox",
    "synonyms": [
      "Praecox"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-arco-iris-neon.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Peixes Primitivos, Predadores Jumbos e Outros de Água Doce"
  },
  {
    "id": "642",
    "name": "Peixe Arco-Íris Vermelho (Glossolepis incisus)",
    "commonName": "Peixe Arco-Íris Vermelho",
    "scientificName": "Glossolepis incisus",
    "synonyms": [
      "Glossolepis Incisus"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-arco-iris-vermelho.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Peixes Primitivos, Predadores Jumbos e Outros de Água Doce"
  },
  {
    "id": "643",
    "name": "Peixe Arco-Íris Parkinsoni (Melanotaenia parkinsoni)",
    "commonName": "Peixe Arco-Íris Parkinsoni",
    "scientificName": "Melanotaenia parkinsoni",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-arco-iris-parkinsoni.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Peixes Primitivos, Predadores Jumbos e Outros de Água Doce"
  },
  {
    "id": "644",
    "name": "Killifish Nothobranchius Rachovii (Nothobranchius rachovii)",
    "commonName": "Killifish Nothobranchius Rachovii",
    "scientificName": "Nothobranchius rachovii",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "killifish-nothobranchius-rachovii.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Peixes Primitivos, Predadores Jumbos e Outros de Água Doce"
  },
  {
    "id": "645",
    "name": "Killifish Nothobranchius Guentheri (Nothobranchius guentheri)",
    "commonName": "Killifish Nothobranchius Guentheri",
    "scientificName": "Nothobranchius guentheri",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "killifish-nothobranchius-guentheri.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Peixes Primitivos, Predadores Jumbos e Outros de Água Doce"
  },
  {
    "id": "646",
    "name": "Killifish Aphyosemion Australe Ouro (Aphyosemion australe var. Gold)",
    "commonName": "Killifish Aphyosemion Australe Ouro",
    "scientificName": "Aphyosemion australe var. Gold",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "killifish-aphyosemion-australe-ouro.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Peixes Primitivos, Predadores Jumbos e Outros de Água Doce"
  },
  {
    "id": "647",
    "name": "Camarão Red Cherry (Neocaridina davidi var. Red Cherry)",
    "commonName": "Camarão Red Cherry",
    "scientificName": "Neocaridina davidi var. Red Cherry",
    "synonyms": [
      "Cereja Vermelho",
      "neocaridina",
      "red cherry",
      "blue dream",
      "red rili",
      "Camarão Neocaridina (Red Cherry, Blue Dream, Yellow, Rili)"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "149_camarao_neocaridina_red_blue_yellow_rili.webp",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Camarões Neocaridina e Seleções de Cores"
  },
  {
    "id": "648",
    "name": "Camarão Red Sakura (Neocaridina davidi var. Red Sakura)",
    "commonName": "Camarão Red Sakura",
    "scientificName": "Neocaridina davidi var. Red Sakura",
    "synonyms": [
      "Vermelho Intenso"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "camarao-red-sakura.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Camarões Neocaridina e Seleções de Cores"
  },
  {
    "id": "649",
    "name": "Camarão Bloody Mary (Neocaridina davidi var. Bloody Mary)",
    "commonName": "Camarão Bloody Mary",
    "scientificName": "Neocaridina davidi var. Bloody Mary",
    "synonyms": [
      "Vermelho Profundo"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "camarao-bloody-mary.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Camarões Neocaridina e Seleções de Cores"
  },
  {
    "id": "650",
    "name": "Camarão Blue Dream (Neocaridina davidi var. Blue Dream)",
    "commonName": "Camarão Blue Dream",
    "scientificName": "Neocaridina davidi var. Blue Dream",
    "synonyms": [
      "Azul Sonho"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "camarao-blue-dream.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Camarões Neocaridina e Seleções de Cores"
  },
  {
    "id": "651",
    "name": "Camarão Blue Velvet (Neocaridina davidi var. Blue Velvet)",
    "commonName": "Camarão Blue Velvet",
    "scientificName": "Neocaridina davidi var. Blue Velvet",
    "synonyms": [
      "Azul Veludo"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "camarao-blue-velvet.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Camarões Neocaridina e Seleções de Cores"
  },
  {
    "id": "652",
    "name": "Camarão Yellow Goldenback (Neocaridina davidi var. Yellow Goldenback)",
    "commonName": "Camarão Yellow Goldenback",
    "scientificName": "Neocaridina davidi var. Yellow Goldenback",
    "synonyms": [
      "Amarelo Faixa Ouro"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "camarao-yellow-goldenback.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Camarões Neocaridina e Seleções de Cores"
  },
  {
    "id": "653",
    "name": "Camarão Orange Sunkist (Neocaridina davidi var. Orange)",
    "commonName": "Camarão Orange Sunkist",
    "scientificName": "Neocaridina davidi var. Orange",
    "synonyms": [
      "Laranja"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "camarao-orange-sunkist.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Camarões Neocaridina e Seleções de Cores"
  },
  {
    "id": "654",
    "name": "Camarão Black Rose (Neocaridina davidi var. Black Rose)",
    "commonName": "Camarão Black Rose",
    "scientificName": "Neocaridina davidi var. Black Rose",
    "synonyms": [
      "Rosa Negra"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "camarao-black-rose.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Camarões Neocaridina e Seleções de Cores"
  },
  {
    "id": "655",
    "name": "Camarão Green Jade (Neocaridina davidi var. Green Jade)",
    "commonName": "Camarão Green Jade",
    "scientificName": "Neocaridina davidi var. Green Jade",
    "synonyms": [
      "Jade Verde"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "camarao-green-jade.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Camarões Neocaridina e Seleções de Cores"
  },
  {
    "id": "656",
    "name": "Camarão Red Rili (Neocaridina davidi var. Red Rili)",
    "commonName": "Camarão Red Rili",
    "scientificName": "Neocaridina davidi var. Red Rili",
    "synonyms": [
      "Vermelho Bicolor Transparente"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "camarao-red-rili.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Camarões Neocaridina e Seleções de Cores"
  },
  {
    "id": "657",
    "name": "Camarão Blue Rili (Neocaridina davidi var. Blue Rili)",
    "commonName": "Camarão Blue Rili",
    "scientificName": "Neocaridina davidi var. Blue Rili",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "camarao-blue-rili.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Camarões Neocaridina e Seleções de Cores"
  },
  {
    "id": "658",
    "name": "Camarão Carbon Rili (Neocaridina davidi var. Carbon Rili)",
    "commonName": "Camarão Carbon Rili",
    "scientificName": "Neocaridina davidi var. Carbon Rili",
    "synonyms": [
      "Preto Rili"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "camarao-carbon-rili.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Camarões Neocaridina e Seleções de Cores"
  },
  {
    "id": "659",
    "name": "Camarão Snowball (Neocaridina zhangjiajiensis var. White)",
    "commonName": "Camarão Snowball",
    "scientificName": "Neocaridina zhangjiajiensis var. White",
    "synonyms": [
      "Bola de Neve"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "camarao-snowball.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Camarões Neocaridina e Seleções de Cores"
  },
  {
    "id": "660",
    "name": "Camarão Crystal Red (Caridina logemanni var. Crystal Red)",
    "commonName": "Camarão Crystal Red",
    "scientificName": "Caridina logemanni var. Crystal Red",
    "synonyms": [
      "CRS Grau S",
      "SS"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "camarao-crystal-red.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Camarões Caridina e Outros Camarões Ornamentais"
  },
  {
    "id": "661",
    "name": "Camarão Crystal Black (Caridina logemanni var. Crystal Black)",
    "commonName": "Camarão Crystal Black",
    "scientificName": "Caridina logemanni var. Crystal Black",
    "synonyms": [
      "CBS Grau S",
      "SS"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "camarao-crystal-black.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Camarões Caridina e Outros Camarões Ornamentais"
  },
  {
    "id": "662",
    "name": "Camarão Taiwan Bee King Kong (Caridina sp. var. King Kong)",
    "commonName": "Camarão Taiwan Bee King Kong",
    "scientificName": "Caridina sp. var. King Kong",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "camarao-taiwan-bee-king-kong.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Camarões Caridina e Outros Camarões Ornamentais"
  },
  {
    "id": "663",
    "name": "Camarão Taiwan Bee Red Ruby (Caridina sp. var. Red Ruby)",
    "commonName": "Camarão Taiwan Bee Red Ruby",
    "scientificName": "Caridina sp. var. Red Ruby",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "camarao-taiwan-bee-red-ruby.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Camarões Caridina e Outros Camarões Ornamentais"
  },
  {
    "id": "664",
    "name": "Camarão Taiwan Bee Blue Bolt (Caridina sp. var. Blue Bolt)",
    "commonName": "Camarão Taiwan Bee Blue Bolt",
    "scientificName": "Caridina sp. var. Blue Bolt",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "camarao-taiwan-bee-blue-bolt.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Camarões Caridina e Outros Camarões Ornamentais"
  },
  {
    "id": "665",
    "name": "Camarão Amano (Caridina multidentata)",
    "commonName": "Camarão Amano",
    "scientificName": "Caridina multidentata",
    "synonyms": [
      "Comedor de Alga Japonês"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "camarao-amano.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Camarões Caridina e Outros Camarões Ornamentais"
  },
  {
    "id": "666",
    "name": "Camarão Fantasma Nacional (Macrobrachium jelskii)",
    "commonName": "Camarão Fantasma Nacional",
    "scientificName": "Macrobrachium jelskii",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "camarao-fantasma-nacional.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Camarões Caridina e Outros Camarões Ornamentais"
  },
  {
    "id": "667",
    "name": "Camarão Pitu (Macrobrachium carcinus)",
    "commonName": "Camarão Pitu",
    "scientificName": "Macrobrachium carcinus",
    "synonyms": [
      "Macrobrachium"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "camarao-pitu.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Camarões Caridina e Outros Camarões Ornamentais"
  },
  {
    "id": "668",
    "name": "Caracol Neritina Zebra (Neritina natalensis)",
    "commonName": "Caracol Neritina Zebra",
    "scientificName": "Neritina natalensis",
    "synonyms": [
      "ampularia",
      "neritina",
      "ramshorn",
      "caramujo",
      "Caramujos (Ampulária Ouro/Roxa e Neritina Zebra/Mosaico)"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "150_caramujos_ampularia_neritina.webp",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Caracóis e Moluscos de Água Doce"
  },
  {
    "id": "669",
    "name": "Caracol Neritina Punctata (Neritina punctulata)",
    "commonName": "Caracol Neritina Punctata",
    "scientificName": "Neritina punctulata",
    "synonyms": [
      "Pintada"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "caracol-neritina-punctata.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Caracóis e Moluscos de Água Doce"
  },
  {
    "id": "670",
    "name": "Caracol Neritina Red Onion (Vittina semiconica)",
    "commonName": "Caracol Neritina Red Onion",
    "scientificName": "Vittina semiconica",
    "synonyms": [
      "Cebola Roxa"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "caracol-neritina-red-onion.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Caracóis e Moluscos de Água Doce"
  },
  {
    "id": "671",
    "name": "Caracol Neritina Sun (Clithon corona)",
    "commonName": "Caracol Neritina Sun",
    "scientificName": "Clithon corona",
    "synonyms": [
      "Ouriço Chifruda"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "caracol-neritina-sun.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Caracóis e Moluscos de Água Doce"
  },
  {
    "id": "672",
    "name": "Caracol Neritina Black Helmet (Neritina pulligera)",
    "commonName": "Caracol Neritina Black Helmet",
    "scientificName": "Neritina pulligera",
    "synonyms": [
      "Capacete Preto"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "caracol-neritina-black-helmet.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Caracóis e Moluscos de Água Doce"
  },
  {
    "id": "673",
    "name": "Caracol Helena (Anentome helena)",
    "commonName": "Caracol Helena",
    "scientificName": "Anentome helena",
    "synonyms": [
      "Comedor de Caracol Praga"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "caracol-helena.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Caracóis e Moluscos de Água Doce"
  },
  {
    "id": "674",
    "name": "Ampulária Dourada (Pomacea diffusa var. Gold)",
    "commonName": "Ampulária Dourada",
    "scientificName": "Pomacea diffusa var. Gold",
    "synonyms": [
      "Pomacea Dourada"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "ampularia-dourada.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Caracóis e Moluscos de Água Doce"
  },
  {
    "id": "675",
    "name": "Ampulária Azul (Pomacea diffusa var. Blue)",
    "commonName": "Ampulária Azul",
    "scientificName": "Pomacea diffusa var. Blue",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "ampularia-azul.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Caracóis e Moluscos de Água Doce"
  },
  {
    "id": "676",
    "name": "Ampulária Roxa (Pomacea diffusa var. Purple)",
    "commonName": "Ampulária Roxa",
    "scientificName": "Pomacea diffusa var. Purple",
    "synonyms": [
      "Marfim"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "ampularia-roxa.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Caracóis e Moluscos de Água Doce"
  },
  {
    "id": "677",
    "name": "Caracol Planorbis Vermelho (Planorbarius corneus var. Red)",
    "commonName": "Caracol Planorbis Vermelho",
    "scientificName": "Planorbarius corneus var. Red",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "caracol-planorbis-vermelho.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Caracóis e Moluscos de Água Doce"
  },
  {
    "id": "678",
    "name": "Caracol Melanóide (Melanoides tuberculata)",
    "commonName": "Caracol Melanóide",
    "scientificName": "Melanoides tuberculata",
    "synonyms": [
      "Caracol Trombeta do Substrato"
    ],
    "type": "LIVING",
    "subCategory": "INVERTEBRATE",
    "imageSlug": "caracol-melanoide.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Caracóis e Moluscos de Água Doce"
  },
  {
    "id": "679",
    "name": "Anubia Nana (Anubias barteri var. nana)",
    "commonName": "Anubia Nana",
    "scientificName": "Anubias barteri var. nana",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "anubia-nana.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Epífitas: Anubias e Bucephalandras"
  },
  {
    "id": "680",
    "name": "Anubia Nana Petite (Anubias barteri var. nana 'Petite')",
    "commonName": "Anubia Nana Petite",
    "scientificName": "Anubias barteri var. nana 'Petite'",
    "synonyms": [
      "Anã Pequena"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "anubia-nana-petite.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Epífitas: Anubias e Bucephalandras"
  },
  {
    "id": "681",
    "name": "Anubia Barteri Comum (Anubias barteri var. barteri)",
    "commonName": "Anubia Barteri Comum",
    "scientificName": "Anubias barteri var. barteri",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "anubia-barteri-comum.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Epífitas: Anubias e Bucephalandras"
  },
  {
    "id": "682",
    "name": "Anubia Coffeefolia (Anubias barteri var. coffeefolia)",
    "commonName": "Anubia Coffeefolia",
    "scientificName": "Anubias barteri var. coffeefolia",
    "synonyms": [
      "Folha de Café"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "anubia-coffeefolia.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Epífitas: Anubias e Bucephalandras"
  },
  {
    "id": "683",
    "name": "Anubia Congensis (Anubias heterophylla)",
    "commonName": "Anubia Congensis",
    "scientificName": "Anubias heterophylla",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "anubia-congensis.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Epífitas: Anubias e Bucephalandras"
  },
  {
    "id": "684",
    "name": "Anubia Gracilis (Anubias gracilis)",
    "commonName": "Anubia Gracilis",
    "scientificName": "Anubias gracilis",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "anubia-gracilis.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Epífitas: Anubias e Bucephalandras"
  },
  {
    "id": "685",
    "name": "Anubia Lanceolata (Anubias lanceolata)",
    "commonName": "Anubia Lanceolata",
    "scientificName": "Anubias lanceolata",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "anubia-lanceolata.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Epífitas: Anubias e Bucephalandras"
  },
  {
    "id": "686",
    "name": "Anubia Golden (Anubias barteri var. nana 'Golden')",
    "commonName": "Anubia Golden",
    "scientificName": "Anubias barteri var. nana 'Golden'",
    "synonyms": [
      "Dourada"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "anubia-golden.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Epífitas: Anubias e Bucephalandras"
  },
  {
    "id": "687",
    "name": "Anubia White (Anubias barteri var. nana 'White')",
    "commonName": "Anubia White",
    "scientificName": "Anubias barteri var. nana 'White'",
    "synonyms": [
      "Albina Pinto"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "anubia-white.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Epífitas: Anubias e Bucephalandras"
  },
  {
    "id": "688",
    "name": "Bucephalandra Wavy Green (Bucephalandra sp. 'Wavy Green')",
    "commonName": "Bucephalandra Wavy Green",
    "scientificName": "Bucephalandra sp. 'Wavy Green'",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "bucephalandra-wavy-green.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Epífitas: Anubias e Bucephalandras"
  },
  {
    "id": "689",
    "name": "Bucephalandra Deep Purple (Bucephalandra sp. 'Deep Purple')",
    "commonName": "Bucephalandra Deep Purple",
    "scientificName": "Bucephalandra sp. 'Deep Purple'",
    "synonyms": [
      "Roxa"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "bucephalandra-deep-purple.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Epífitas: Anubias e Bucephalandras"
  },
  {
    "id": "690",
    "name": "Bucephalandra Kedagang (Bucephalandra sp. 'Kedagang')",
    "commonName": "Bucephalandra Kedagang",
    "scientificName": "Bucephalandra sp. 'Kedagang'",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "bucephalandra-kedagang.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Epífitas: Anubias e Bucephalandras"
  },
  {
    "id": "691",
    "name": "Bucephalandra Red Mini (Bucephalandra sp. 'Red Mini')",
    "commonName": "Bucephalandra Red Mini",
    "scientificName": "Bucephalandra sp. 'Red Mini'",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "bucephalandra-red-mini.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Epífitas: Anubias e Bucephalandras"
  },
  {
    "id": "692",
    "name": "Bucephalandra Godzilla (Bucephalandra sp. 'Godzilla')",
    "commonName": "Bucephalandra Godzilla",
    "scientificName": "Bucephalandra sp. 'Godzilla'",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "bucephalandra-godzilla.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Epífitas: Anubias e Bucephalandras"
  },
  {
    "id": "693",
    "name": "Musgo de Java (Taxiphyllum barbieri)",
    "commonName": "Musgo de Java",
    "scientificName": "Taxiphyllum barbieri",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "musgo-de-java.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Musgos, Hepáticas e Fetos / Samambaias Aquáticas"
  },
  {
    "id": "694",
    "name": "Musgo Christmas (Vesicularia montagnei)",
    "commonName": "Musgo Christmas",
    "scientificName": "Vesicularia montagnei",
    "synonyms": [
      "Árvore de Natal"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "musgo-christmas.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Musgos, Hepáticas e Fetos / Samambaias Aquáticas"
  },
  {
    "id": "695",
    "name": "Musgo Fênix (Fissidens fontanus)",
    "commonName": "Musgo Fênix",
    "scientificName": "Fissidens fontanus",
    "synonyms": [
      "Phoenix Moss"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "musgo-fenix.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Musgos, Hepáticas e Fetos / Samambaias Aquáticas"
  },
  {
    "id": "696",
    "name": "Musgo Weeping (Vesicularia ferriei)",
    "commonName": "Musgo Weeping",
    "scientificName": "Vesicularia ferriei",
    "synonyms": [
      "Chorão"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "musgo-weeping.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Musgos, Hepáticas e Fetos / Samambaias Aquáticas"
  },
  {
    "id": "697",
    "name": "Musgo Taiwan (Taxiphyllum alternans)",
    "commonName": "Musgo Taiwan",
    "scientificName": "Taxiphyllum alternans",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "musgo-taiwan.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Musgos, Hepáticas e Fetos / Samambaias Aquáticas"
  },
  {
    "id": "698",
    "name": "Musgo Flame (Taxiphyllum sp. 'Flame')",
    "commonName": "Musgo Flame",
    "scientificName": "Taxiphyllum sp. 'Flame'",
    "synonyms": [
      "Chama"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "musgo-flame.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Musgos, Hepáticas e Fetos / Samambaias Aquáticas"
  },
  {
    "id": "699",
    "name": "Musgo Spiky (Taxiphyllum sp. 'Spiky')",
    "commonName": "Musgo Spiky",
    "scientificName": "Taxiphyllum sp. 'Spiky'",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "musgo-spiky.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Musgos, Hepáticas e Fetos / Samambaias Aquáticas"
  },
  {
    "id": "700",
    "name": "Hepática Riccia Fluitans (Riccia fluitans)",
    "commonName": "Hepática Riccia Fluitans",
    "scientificName": "Riccia fluitans",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "hepatica-riccia-fluitans.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Musgos, Hepáticas e Fetos / Samambaias Aquáticas"
  },
  {
    "id": "701",
    "name": "Hepática Monosolenium Tenerum (Monosolenium tenerum)",
    "commonName": "Hepática Monosolenium Tenerum",
    "scientificName": "Monosolenium tenerum",
    "synonyms": [
      "Pellia"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "hepatica-monosolenium-tenerum.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Musgos, Hepáticas e Fetos / Samambaias Aquáticas"
  },
  {
    "id": "702",
    "name": "Microsorum Pteropus (Microsorum pteropus)",
    "commonName": "Microsorum Pteropus",
    "scientificName": "Microsorum pteropus",
    "synonyms": [
      "Feto de Java Comum"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "microsorum-pteropus.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Musgos, Hepáticas e Fetos / Samambaias Aquáticas"
  },
  {
    "id": "703",
    "name": "Microsorum Windelov (Microsorum pteropus var. 'Windelov')",
    "commonName": "Microsorum Windelov",
    "scientificName": "Microsorum pteropus var. 'Windelov'",
    "synonyms": [
      "Feto de Java Crespo"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "microsorum-windelov.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Musgos, Hepáticas e Fetos / Samambaias Aquáticas"
  },
  {
    "id": "704",
    "name": "Microsorum Narrow Leaf (Microsorum pteropus var. 'Narrow')",
    "commonName": "Microsorum Narrow Leaf",
    "scientificName": "Microsorum pteropus var. 'Narrow'",
    "synonyms": [
      "Folha Estreita"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "microsorum-narrow-leaf.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Musgos, Hepáticas e Fetos / Samambaias Aquáticas"
  },
  {
    "id": "705",
    "name": "Microsorum Trident (Microsorum pteropus var. 'Trident')",
    "commonName": "Microsorum Trident",
    "scientificName": "Microsorum pteropus var. 'Trident'",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "microsorum-trident.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Musgos, Hepáticas e Fetos / Samambaias Aquáticas"
  },
  {
    "id": "706",
    "name": "Samambaia Africana (Bolbitis heudelotii)",
    "commonName": "Samambaia Africana",
    "scientificName": "Bolbitis heudelotii",
    "synonyms": [
      "Bolbitis Heudelotii"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "samambaia-africana.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Musgos, Hepáticas e Fetos / Samambaias Aquáticas"
  },
  {
    "id": "707",
    "name": "Samambaia d'Água (Ceratopteris thalictroides)",
    "commonName": "Samambaia d'Água",
    "scientificName": "Ceratopteris thalictroides",
    "synonyms": [
      "Ceratopteris"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "samambaia-d-agua.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Musgos, Hepáticas e Fetos / Samambaias Aquáticas"
  },
  {
    "id": "708",
    "name": "Rotala Rotundifolia Verde (Rotala rotundifolia)",
    "commonName": "Rotala Rotundifolia Verde",
    "scientificName": "Rotala rotundifolia",
    "synonyms": [
      "Rosa"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "rotala-rotundifolia-verde.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Caule e Fundo de Crescimento Rápido"
  },
  {
    "id": "709",
    "name": "Rotala Rotundifolia Red (Rotala rotundifolia var. 'Colorata')",
    "commonName": "Rotala Rotundifolia Red",
    "scientificName": "Rotala rotundifolia var. 'Colorata'",
    "synonyms": [
      "Vermelha"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "rotala-rotundifolia-red.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Caule e Fundo de Crescimento Rápido"
  },
  {
    "id": "710",
    "name": "Rotala Macrandra (Rotala macrandra)",
    "commonName": "Rotala Macrandra",
    "scientificName": "Rotala macrandra",
    "synonyms": [
      "Vermelha Gigante"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "rotala-macrandra.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Caule e Fundo de Crescimento Rápido"
  },
  {
    "id": "711",
    "name": "Rotala H'Ra (Rotala sp. 'H'Ra')",
    "commonName": "Rotala H'Ra",
    "scientificName": "Rotala sp. 'H'Ra'",
    "synonyms": [
      "Laranja e Rosa"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "rotala-h-ra.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Caule e Fundo de Crescimento Rápido"
  },
  {
    "id": "712",
    "name": "Rotala Wallichii (Rotala wallichii)",
    "commonName": "Rotala Wallichii",
    "scientificName": "Rotala wallichii",
    "synonyms": [
      "Ramos Finos"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "rotala-wallichii.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Caule e Fundo de Crescimento Rápido"
  },
  {
    "id": "713",
    "name": "Ludwigia Repens (Ludwigia repens)",
    "commonName": "Ludwigia Repens",
    "scientificName": "Ludwigia repens",
    "synonyms": [
      "Rasteira"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "ludwigia-repens.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Caule e Fundo de Crescimento Rápido"
  },
  {
    "id": "714",
    "name": "Ludwigia Repens Rubin (Ludwigia repens 'Rubin')",
    "commonName": "Ludwigia Repens Rubin",
    "scientificName": "Ludwigia repens 'Rubin'",
    "synonyms": [
      "Rubi Escuro"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "ludwigia-repens-rubin.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Caule e Fundo de Crescimento Rápido"
  },
  {
    "id": "715",
    "name": "Ludwigia Palustris Red (Ludwigia palustris var. 'Super Red')",
    "commonName": "Ludwigia Palustris Red",
    "scientificName": "Ludwigia palustris var. 'Super Red'",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "ludwigia-palustris-red.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Caule e Fundo de Crescimento Rápido"
  },
  {
    "id": "716",
    "name": "Ludwigia Arcuata (Ludwigia arcuata)",
    "commonName": "Ludwigia Arcuata",
    "scientificName": "Ludwigia arcuata",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "ludwigia-arcuata.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Caule e Fundo de Crescimento Rápido"
  },
  {
    "id": "717",
    "name": "Ludwigia Glandulosa (Ludwigia glandulosa)",
    "commonName": "Ludwigia Glandulosa",
    "scientificName": "Ludwigia glandulosa",
    "synonyms": [
      "Peruensis"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "ludwigia-glandulosa.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Caule e Fundo de Crescimento Rápido"
  },
  {
    "id": "718",
    "name": "Higrófila Polysperma (Hygrophila polysperma)",
    "commonName": "Higrófila Polysperma",
    "scientificName": "Hygrophila polysperma",
    "synonyms": [
      "Rosa"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "higrofila-polysperma.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Caule e Fundo de Crescimento Rápido"
  },
  {
    "id": "719",
    "name": "Higrófila Difformis (Hygrophila difformis)",
    "commonName": "Higrófila Difformis",
    "scientificName": "Hygrophila difformis",
    "synonyms": [
      "Sinapse Aquática"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "higrofila-difformis.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Caule e Fundo de Crescimento Rápido"
  },
  {
    "id": "720",
    "name": "Higrófila Corymbosa (Hygrophila corymbosa)",
    "commonName": "Higrófila Corymbosa",
    "scientificName": "Hygrophila corymbosa",
    "synonyms": [
      "Estrita"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "higrofila-corymbosa.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Caule e Fundo de Crescimento Rápido"
  },
  {
    "id": "721",
    "name": "Higrófila Pinnatifida (Hygrophila pinnatifida)",
    "commonName": "Higrófila Pinnatifida",
    "scientificName": "Hygrophila pinnatifida",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "higrofila-pinnatifida.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Caule e Fundo de Crescimento Rápido"
  },
  {
    "id": "722",
    "name": "Bacopa Monnieri (Bacopa monnieri)",
    "commonName": "Bacopa Monnieri",
    "scientificName": "Bacopa monnieri",
    "synonyms": [
      "Moeda"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "bacopa-monnieri.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Caule e Fundo de Crescimento Rápido"
  },
  {
    "id": "723",
    "name": "Bacopa Caroliniana (Bacopa caroliniana)",
    "commonName": "Bacopa Caroliniana",
    "scientificName": "Bacopa caroliniana",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "bacopa-caroliniana.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Caule e Fundo de Crescimento Rápido"
  },
  {
    "id": "724",
    "name": "Cabomba Caroliniana (Cabomba caroliniana)",
    "commonName": "Cabomba Caroliniana",
    "scientificName": "Cabomba caroliniana",
    "synonyms": [
      "Verde"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "cabomba-caroliniana.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Caule e Fundo de Crescimento Rápido"
  },
  {
    "id": "725",
    "name": "Cabomba Furcata (Cabomba furcata)",
    "commonName": "Cabomba Furcata",
    "scientificName": "Cabomba furcata",
    "synonyms": [
      "Vermelha"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "cabomba-furcata.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Caule e Fundo de Crescimento Rápido"
  },
  {
    "id": "726",
    "name": "Elodea Densa (Egeria densa)",
    "commonName": "Elodea Densa",
    "scientificName": "Egeria densa",
    "synonyms": [
      "Egeria Densa"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "elodea-densa.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Caule e Fundo de Crescimento Rápido"
  },
  {
    "id": "727",
    "name": "Rabos de Raposa (Ceratophyllum demersum)",
    "commonName": "Rabos de Raposa",
    "scientificName": "Ceratophyllum demersum",
    "synonyms": [
      "Ceratophyllum Demersum"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "rabos-de-raposa.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Caule e Fundo de Crescimento Rápido"
  },
  {
    "id": "728",
    "name": "Myriophyllum Tuberculatum (Myriophyllum tuberculatum)",
    "commonName": "Myriophyllum Tuberculatum",
    "scientificName": "Myriophyllum tuberculatum",
    "synonyms": [
      "Pinheirinho Vermelho"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "myriophyllum-tuberculatum.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Caule e Fundo de Crescimento Rápido"
  },
  {
    "id": "729",
    "name": "Myriophyllum Mattogrossense (Myriophyllum mattogrossense)",
    "commonName": "Myriophyllum Mattogrossense",
    "scientificName": "Myriophyllum mattogrossense",
    "synonyms": [
      "Pinheirinho Verde"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "myriophyllum-mattogrossense.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Caule e Fundo de Crescimento Rápido"
  },
  {
    "id": "730",
    "name": "Heteranthera Zosterifolia (Heteranthera zosterifolia)",
    "commonName": "Heteranthera Zosterifolia",
    "scientificName": "Heteranthera zosterifolia",
    "synonyms": [
      "Estrela d'Água"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "heteranthera-zosterifolia.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Caule e Fundo de Crescimento Rápido"
  },
  {
    "id": "731",
    "name": "Ammania Gracilis (Ammannia gracilis)",
    "commonName": "Ammania Gracilis",
    "scientificName": "Ammannia gracilis",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "ammania-gracilis.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Caule e Fundo de Crescimento Rápido"
  },
  {
    "id": "732",
    "name": "Amazonense Clássica (Echinodorus bleheri)",
    "commonName": "Amazonense Clássica",
    "scientificName": "Echinodorus bleheri",
    "synonyms": [
      "Espada Amazônica"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "amazonense-classica.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Roseta, Fundo e Substrato Fértil"
  },
  {
    "id": "733",
    "name": "Echinodorus Ozelot Red (Echinodorus 'Ozelot Red')",
    "commonName": "Echinodorus Ozelot Red",
    "scientificName": "Echinodorus 'Ozelot Red'",
    "synonyms": [
      "Manchada"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "echinodorus-ozelot-red.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Roseta, Fundo e Substrato Fértil"
  },
  {
    "id": "734",
    "name": "Echinodorus Ozelot Green (Echinodorus 'Ozelot Green')",
    "commonName": "Echinodorus Ozelot Green",
    "scientificName": "Echinodorus 'Ozelot Green'",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "echinodorus-ozelot-green.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Roseta, Fundo e Substrato Fértil"
  },
  {
    "id": "735",
    "name": "Echinodorus Red Diamond (Echinodorus 'Red Diamond')",
    "commonName": "Echinodorus Red Diamond",
    "scientificName": "Echinodorus 'Red Diamond'",
    "synonyms": [
      "Diamante Vermelho"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "echinodorus-red-diamond.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Roseta, Fundo e Substrato Fértil"
  },
  {
    "id": "736",
    "name": "Echinodorus Reni (Echinodorus 'Reni')",
    "commonName": "Echinodorus Reni",
    "scientificName": "Echinodorus 'Reni'",
    "synonyms": [
      "Vermelha Anã"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "echinodorus-reni.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Roseta, Fundo e Substrato Fértil"
  },
  {
    "id": "737",
    "name": "Echinodorus Tenellus (Helanthium tenellum)",
    "commonName": "Echinodorus Tenellus",
    "scientificName": "Helanthium tenellum",
    "synonyms": [
      "Graminha de Fundo"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "echinodorus-tenellus.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Roseta, Fundo e Substrato Fértil"
  },
  {
    "id": "738",
    "name": "Echinodorus Quadricostatus (Helanthium quadricostatus)",
    "commonName": "Echinodorus Quadricostatus",
    "scientificName": "Helanthium quadricostatus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "echinodorus-quadricostatus.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Roseta, Fundo e Substrato Fértil"
  },
  {
    "id": "739",
    "name": "Cryptocoryne Wendtii Brown (Cryptocoryne wendtii 'Brown')",
    "commonName": "Cryptocoryne Wendtii Brown",
    "scientificName": "Cryptocoryne wendtii 'Brown'",
    "synonyms": [
      "Marrom"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "cryptocoryne-wendtii-brown.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Roseta, Fundo e Substrato Fértil"
  },
  {
    "id": "740",
    "name": "Cryptocoryne Wendtii Green (Cryptocoryne wendtii 'Green')",
    "commonName": "Cryptocoryne Wendtii Green",
    "scientificName": "Cryptocoryne wendtii 'Green'",
    "synonyms": [
      "Verde"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "cryptocoryne-wendtii-green.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Roseta, Fundo e Substrato Fértil"
  },
  {
    "id": "741",
    "name": "Cryptocoryne Wendtii Tropica (Cryptocoryne wendtii 'Tropica')",
    "commonName": "Cryptocoryne Wendtii Tropica",
    "scientificName": "Cryptocoryne wendtii 'Tropica'",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "cryptocoryne-wendtii-tropica.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Roseta, Fundo e Substrato Fértil"
  },
  {
    "id": "742",
    "name": "Cryptocoryne Parva (Cryptocoryne parva)",
    "commonName": "Cryptocoryne Parva",
    "scientificName": "Cryptocoryne parva",
    "synonyms": [
      "Cripto Anã"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "cryptocoryne-parva.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Roseta, Fundo e Substrato Fértil"
  },
  {
    "id": "743",
    "name": "Cryptocoryne Lucens (Cryptocoryne x willisii 'Lucens')",
    "commonName": "Cryptocoryne Lucens",
    "scientificName": "Cryptocoryne x willisii 'Lucens'",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "cryptocoryne-lucens.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Roseta, Fundo e Substrato Fértil"
  },
  {
    "id": "744",
    "name": "Cryptocoryne Albida Brown (Cryptocoryne albida 'Brown')",
    "commonName": "Cryptocoryne Albida Brown",
    "scientificName": "Cryptocoryne albida 'Brown'",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "cryptocoryne-albida-brown.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Roseta, Fundo e Substrato Fértil"
  },
  {
    "id": "745",
    "name": "Cryptocoryne Balansae (Cryptocoryne crispatula var. balansae)",
    "commonName": "Cryptocoryne Balansae",
    "scientificName": "Cryptocoryne crispatula var. balansae",
    "synonyms": [
      "Folha Frisada"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "cryptocoryne-balansae.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Roseta, Fundo e Substrato Fértil"
  },
  {
    "id": "746",
    "name": "Valisneria Spiralis (Vallisneria spiralis)",
    "commonName": "Valisneria Spiralis",
    "scientificName": "Vallisneria spiralis",
    "synonyms": [
      "Fita Espiralada"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "valisneria-spiralis.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Roseta, Fundo e Substrato Fértil"
  },
  {
    "id": "747",
    "name": "Valisneria Gigantea (Vallisneria americana)",
    "commonName": "Valisneria Gigantea",
    "scientificName": "Vallisneria americana",
    "synonyms": [
      "Fita Gigante"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "valisneria-gigantea.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Roseta, Fundo e Substrato Fértil"
  },
  {
    "id": "748",
    "name": "Valisneria Nana (Vallisneria nana)",
    "commonName": "Valisneria Nana",
    "scientificName": "Vallisneria nana",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "valisneria-nana.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Roseta, Fundo e Substrato Fértil"
  },
  {
    "id": "749",
    "name": "Valisneria Tortifolia (Vallisneria torta)",
    "commonName": "Valisneria Tortifolia",
    "scientificName": "Vallisneria torta",
    "synonyms": [
      "Saca-Rolha"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "valisneria-tortifolia.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Roseta, Fundo e Substrato Fértil"
  },
  {
    "id": "750",
    "name": "Eleocharis Parvula (Eleocharis parvula)",
    "commonName": "Eleocharis Parvula",
    "scientificName": "Eleocharis parvula",
    "synonyms": [
      "Cabelo de Anjo Carpete"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "eleocharis-parvula.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Carpete, Flutuantes e Bulbos Aquáticos"
  },
  {
    "id": "751",
    "name": "Eleocharis Acicularis (Eleocharis acicularis 'Mini')",
    "commonName": "Eleocharis Acicularis",
    "scientificName": "Eleocharis acicularis 'Mini'",
    "synonyms": [
      "Mini Hairgrass"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "eleocharis-acicularis.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Carpete, Flutuantes e Bulbos Aquáticos"
  },
  {
    "id": "752",
    "name": "Micranthemum Monte Carlo (Micranthemum tweediei 'Monte Carlo')",
    "commonName": "Micranthemum Monte Carlo",
    "scientificName": "Micranthemum tweediei 'Monte Carlo'",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "micranthemum-monte-carlo.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Carpete, Flutuantes e Bulbos Aquáticos"
  },
  {
    "id": "753",
    "name": "Hemianthus Callitrichoides Cuba (Hemianthus callitrichoides)",
    "commonName": "Hemianthus Callitrichoides Cuba",
    "scientificName": "Hemianthus callitrichoides",
    "synonyms": [
      "Carpete Cuba"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "hemianthus-callitrichoides-cuba.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Carpete, Flutuantes e Bulbos Aquáticos"
  },
  {
    "id": "754",
    "name": "Glossostigma Elatinoides (Glossostigma elatinoides)",
    "commonName": "Glossostigma Elatinoides",
    "scientificName": "Glossostigma elatinoides",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "glossostigma-elatinoides.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Carpete, Flutuantes e Bulbos Aquáticos"
  },
  {
    "id": "755",
    "name": "Staurogyne Repens (Staurogyne repens)",
    "commonName": "Staurogyne Repens",
    "scientificName": "Staurogyne repens",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "staurogyne-repens.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Carpete, Flutuantes e Bulbos Aquáticos"
  },
  {
    "id": "756",
    "name": "Pogostemon Helferi (Pogostemon helferi)",
    "commonName": "Pogostemon Helferi",
    "scientificName": "Pogostemon helferi",
    "synonyms": [
      "Estrela de Carpete"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "pogostemon-helferi.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Carpete, Flutuantes e Bulbos Aquáticos"
  },
  {
    "id": "757",
    "name": "Hydrocotyle Tripartita (Hydrocotyle tripartita)",
    "commonName": "Hydrocotyle Tripartita",
    "scientificName": "Hydrocotyle tripartita",
    "synonyms": [
      "Trevo do Japão"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "hydrocotyle-tripartita.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Carpete, Flutuantes e Bulbos Aquáticos"
  },
  {
    "id": "758",
    "name": "Lilaeopsis Brasiliensis (Lilaeopsis brasiliensis)",
    "commonName": "Lilaeopsis Brasiliensis",
    "scientificName": "Lilaeopsis brasiliensis",
    "synonyms": [
      "Micro-Espada Carpete"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "lilaeopsis-brasiliensis.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Carpete, Flutuantes e Bulbos Aquáticos"
  },
  {
    "id": "759",
    "name": "Alface d'Água (Pistia stratiotes)",
    "commonName": "Alface d'Água",
    "scientificName": "Pistia stratiotes",
    "synonyms": [
      "Flor de Lótus Flutuante"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "alface-d-agua.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Carpete, Flutuantes e Bulbos Aquáticos"
  },
  {
    "id": "760",
    "name": "Salvínia Auriculata (Salvinia auriculata)",
    "commonName": "Salvínia Auriculata",
    "scientificName": "Salvinia auriculata",
    "synonyms": [
      "Orelha de Onça"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "salvinia-auriculata.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Carpete, Flutuantes e Bulbos Aquáticos"
  },
  {
    "id": "761",
    "name": "Lentilha d'Água (Lemna minor)",
    "commonName": "Lentilha d'Água",
    "scientificName": "Lemna minor",
    "synonyms": [
      "Lemna Minor"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "lentilha-d-agua.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Carpete, Flutuantes e Bulbos Aquáticos"
  },
  {
    "id": "762",
    "name": "Phyllanthus Fluitans (Phyllanthus fluitans)",
    "commonName": "Phyllanthus Fluitans",
    "scientificName": "Phyllanthus fluitans",
    "synonyms": [
      "Trevo Vermelho Flutuante"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "phyllanthus-fluitans.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Carpete, Flutuantes e Bulbos Aquáticos"
  },
  {
    "id": "763",
    "name": "Limnobium Laevigatum (Limnobium laevigatum)",
    "commonName": "Limnobium Laevigatum",
    "scientificName": "Limnobium laevigatum",
    "synonyms": [
      "Espelho d'Água"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "limnobium-laevigatum.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Carpete, Flutuantes e Bulbos Aquáticos"
  },
  {
    "id": "764",
    "name": "Nymphaea Lotus Red (Nymphaea lotus var. 'Red')",
    "commonName": "Nymphaea Lotus Red",
    "scientificName": "Nymphaea lotus var. 'Red'",
    "synonyms": [
      "Lótus Vermelha Tigrada"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "nymphaea-lotus-red.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Carpete, Flutuantes e Bulbos Aquáticos"
  },
  {
    "id": "765",
    "name": "Nymphaea Lotus Green (Nymphaea lotus var. 'Green')",
    "commonName": "Nymphaea Lotus Green",
    "scientificName": "Nymphaea lotus var. 'Green'",
    "synonyms": [
      "Lótus Verde"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "nymphaea-lotus-green.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Carpete, Flutuantes e Bulbos Aquáticos"
  },
  {
    "id": "766",
    "name": "Aponogeton Madagascariensis (Aponogeton madagascariensis)",
    "commonName": "Aponogeton Madagascariensis",
    "scientificName": "Aponogeton madagascariensis",
    "synonyms": [
      "Planta Renda"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "aponogeton-madagascariensis.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Carpete, Flutuantes e Bulbos Aquáticos"
  },
  {
    "id": "767",
    "name": "Aponogeton Crispus (Aponogeton crispus)",
    "commonName": "Aponogeton Crispus",
    "scientificName": "Aponogeton crispus",
    "synonyms": [],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "aponogeton-crispus.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Carpete, Flutuantes e Bulbos Aquáticos"
  },
  {
    "id": "768",
    "name": "Crino Aquático (Crinum calamistratum)",
    "commonName": "Crino Aquático",
    "scientificName": "Crinum calamistratum",
    "synonyms": [
      "Crinum Calamistratum"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "crino-aquatico.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Plantas de Carpete, Flutuantes e Bulbos Aquáticos"
  },
  {
    "id": "769",
    "name": "Palhaço Misbar (Amphiprion ocellaris)",
    "commonName": "Palhaço Misbar",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Ocellaris Misbar",
      "Palhaço Faixa Quebrada"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-misbar.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Donzelas"
  },
  {
    "id": "770",
    "name": "Palhaço Naked (Amphiprion ocellaris)",
    "commonName": "Palhaço Naked",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Ocellaris Naked",
      "Palhaço Sem Listras"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-naked.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Donzelas"
  },
  {
    "id": "771",
    "name": "Palhaço Naked Extreme Misbar (Amphiprion ocellaris)",
    "commonName": "Palhaço Naked Extreme Misbar",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Naked Extreme Misbar"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-naked-extreme-misbar.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Donzelas"
  },
  {
    "id": "772",
    "name": "Palhaço Black Ice (Amphiprion ocellaris)",
    "commonName": "Palhaço Black Ice",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Black Ice Ocellaris",
      "Gelo Negro"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-black-ice.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Donzelas"
  },
  {
    "id": "773",
    "name": "Palhaço Premium Snowflake (Amphiprion ocellaris)",
    "commonName": "Palhaço Premium Snowflake",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Premium Snowflake"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-premium-snowflake.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Donzelas"
  },
  {
    "id": "774",
    "name": "Palhaço Extreme Snowflake (Amphiprion ocellaris)",
    "commonName": "Palhaço Extreme Snowflake",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Extreme Snowflake"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-extreme-snowflake.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Donzelas"
  },
  {
    "id": "775",
    "name": "Palhaço Fancy Gladiator (Amphiprion ocellaris)",
    "commonName": "Palhaço Fancy Gladiator",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Gladiator",
      "Fancy Gladiator"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-fancy-gladiator.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Donzelas"
  },
  {
    "id": "776",
    "name": "Palhaço Orange Storm (Amphiprion ocellaris)",
    "commonName": "Palhaço Orange Storm",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Storm Laranja",
      "Orange Storm Ocellaris",
      "orange storm",
      "black storm",
      "mocha storm",
      "Ocellaris Storm (Orange / Black Storm)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "075_ocellaris_storm.webp",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Donzelas"
  },
  {
    "id": "777",
    "name": "Palhaço Black Misbar (Amphiprion ocellaris)",
    "commonName": "Palhaço Black Misbar",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Black Ocellaris Misbar"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-black-misbar.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Donzelas"
  },
  {
    "id": "778",
    "name": "Palhaço Black Extreme Misbar (Amphiprion ocellaris)",
    "commonName": "Palhaço Black Extreme Misbar",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Black Extreme Misbar"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-black-extreme-misbar.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Donzelas"
  },
  {
    "id": "779",
    "name": "Palhaço Chocolate (Amphiprion ocellaris)",
    "commonName": "Palhaço Chocolate",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Ocellaris Chocolate",
      "Mocha"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-chocolate.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Donzelas"
  },
  {
    "id": "780",
    "name": "Palhaço Premium Black Snow (Amphiprion ocellaris)",
    "commonName": "Palhaço Premium Black Snow",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Premium Black Snow"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-premium-black-snow.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Donzelas"
  },
  {
    "id": "781",
    "name": "Palhaço Extreme Black Snow (Amphiprion ocellaris)",
    "commonName": "Palhaço Extreme Black Snow",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Extreme Black Snow"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-extreme-black-snow.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Donzelas"
  },
  {
    "id": "782",
    "name": "Palhaço Black Gladiator (Amphiprion ocellaris)",
    "commonName": "Palhaço Black Gladiator",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Black Gladiator"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-black-gladiator.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Donzelas"
  },
  {
    "id": "783",
    "name": "Palhaço Mocha Storm (Amphiprion ocellaris)",
    "commonName": "Palhaço Mocha Storm",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Mocha Storm Ocellaris"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-mocha-storm.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Donzelas"
  },
  {
    "id": "784",
    "name": "Palhaço Photon (Amphiprion ocellaris)",
    "commonName": "Palhaço Photon",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Photon Ocellaris"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-photon.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Donzelas"
  },
  {
    "id": "785",
    "name": "Palhaço Caramel (Amphiprion ocellaris)",
    "commonName": "Palhaço Caramel",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Caramel Ocellaris"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-caramel.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Donzelas"
  },
  {
    "id": "786",
    "name": "Palhaço Black Stubby (Amphiprion ocellaris)",
    "commonName": "Palhaço Black Stubby",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Black Stubby"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-black-stubby.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Donzelas"
  },
  {
    "id": "787",
    "name": "Palhaço Percula Misbar (Amphiprion percula)",
    "commonName": "Palhaço Percula Misbar",
    "scientificName": "Amphiprion percula",
    "synonyms": [
      "Percula Misbar"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-percula-misbar.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Donzelas"
  },
  {
    "id": "788",
    "name": "Palhaço Premium Picasso (Amphiprion percula)",
    "commonName": "Palhaço Premium Picasso",
    "scientificName": "Amphiprion percula",
    "synonyms": [
      "Picasso Premium",
      "Percula Picasso"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-premium-picasso.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Donzelas"
  },
  {
    "id": "789",
    "name": "Palhaço Extreme Picasso (Amphiprion percula)",
    "commonName": "Palhaço Extreme Picasso",
    "scientificName": "Amphiprion percula",
    "synonyms": [
      "Picasso Extremo",
      "Extreme Picasso"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-extreme-picasso.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Donzelas"
  },
  {
    "id": "790",
    "name": "Palhaço Maroon Goldstripe (Premnas biaculeatus)",
    "commonName": "Palhaço Maroon Goldstripe",
    "scientificName": "Premnas biaculeatus",
    "synonyms": [
      "Maroon Faixa de Ouro",
      "Gold Stripe Maroon"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-maroon-goldstripe.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Donzelas"
  },
  {
    "id": "791",
    "name": "Palhaço Maroon Snowflake (Premnas biaculeatus)",
    "commonName": "Palhaço Maroon Snowflake",
    "scientificName": "Premnas biaculeatus",
    "synonyms": [
      "Snowflake Maroon"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-maroon-snowflake.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Donzelas"
  },
  {
    "id": "792",
    "name": "Palhaço Maroon Golden Nugget (Premnas biaculeatus)",
    "commonName": "Palhaço Maroon Golden Nugget",
    "scientificName": "Premnas biaculeatus",
    "synonyms": [
      "Golden Nugget Maroon",
      "Pepita de Ouro"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-maroon-golden-nugget.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Donzelas"
  },
  {
    "id": "793",
    "name": "Palhaço Maroon Lightning Papua (Premnas biaculeatus)",
    "commonName": "Palhaço Maroon Lightning Papua",
    "scientificName": "Premnas biaculeatus",
    "synonyms": [
      "Lightning Papua Maroon"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-maroon-lightning-papua.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Palhaço e Donzelas"
  },
  {
    "id": "794",
    "name": "Kamoharai Blennie (Meiacanthus kamoharai)",
    "commonName": "Kamoharai Blennie",
    "scientificName": "Meiacanthus kamoharai",
    "synonyms": [
      "Blênio Kamoharai"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "blenio-kamoharai.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Pseudochromis e Dottybacks"
  },
  {
    "id": "795",
    "name": "Striped Blennie (Meiacanthus grammistes)",
    "commonName": "Striped Blennie",
    "scientificName": "Meiacanthus grammistes",
    "synonyms": [
      "Blênio Listrado"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "blenio-grammistes.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Pseudochromis e Dottybacks"
  },
  {
    "id": "796",
    "name": "Blue-Striped Dottyback (Pseudochromis springeri)",
    "commonName": "Blue-Striped Dottyback",
    "scientificName": "Pseudochromis springeri",
    "synonyms": [
      "Dottyback Springer",
      "Springer Dottyback"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "dottyback-springeri.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Pseudochromis e Dottybacks"
  },
  {
    "id": "797",
    "name": "Anêmona Carpet Green (Stichodactyla haddoni)",
    "commonName": "Anêmona Carpet Green",
    "scientificName": "Stichodactyla haddoni",
    "synonyms": [
      "Carpet Green",
      "Haddon Green",
      "Anêmona Tapete Verde",
      "Anemona Carpet Green",
      "Anêmona Carpet Green",
      "Haddoni Green"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "anemona-carpet-green.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Anêmonas Marinhas"
  },
  {
    "id": "798",
    "name": "Anêmona Carpet Red (Stichodactyla haddoni)",
    "commonName": "Anêmona Carpet Red",
    "scientificName": "Stichodactyla haddoni",
    "synonyms": [
      "Carpet Red",
      "Haddon Red",
      "Anêmona Tapete Vermelha",
      "Red Carpet"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "anemona-carpet-red.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Anêmonas Marinhas"
  },
  {
    "id": "799",
    "name": "Anêmona Mini Carpet (Stichodactyla tapetum)",
    "commonName": "Anêmona Mini Carpet",
    "scientificName": "Stichodactyla tapetum",
    "synonyms": [
      "Mini Carpet",
      "Mini Tapete",
      "Maxi Mini"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "anemona-mini-carpet.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Anêmonas Marinhas"
  },
  {
    "id": "800",
    "name": "Coral Carpet Green (Briareum hamrum)",
    "commonName": "Coral Carpet Green",
    "scientificName": "Briareum hamrum",
    "synonyms": [
      "Carpet Green",
      "GSP",
      "Green Star Polyps",
      "Pachyclavularia violacea",
      "Coral Carpet Green",
      "Carpet Green Coral"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "coral-carpet-green.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Soft e Pólipos Estrela"
  },
  {
    "id": "801",
    "name": "Coral Carpet Brown (Clavularia sp.)",
    "commonName": "Coral Carpet Brown",
    "scientificName": "Clavularia sp.",
    "synonyms": [
      "Carpet Brown",
      "Brown Star Polyps",
      "Clavularia Brown",
      "Coral Carpet Brown",
      "Carpet Brown Coral"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "coral-carpet-brown.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Soft e Pólipos Estrela"
  },
  {
    "id": "802",
    "name": "Mushroom Rhodactis Superman (Rhodactis inchoata)",
    "commonName": "Mushroom Rhodactis Superman",
    "scientificName": "Rhodactis inchoata",
    "synonyms": [
      "Rhodactis Superman",
      "Superman Mushroom",
      "Bullseye Mushroom",
      "Rhodactis Azul e Vermelho",
      "Mushroom Rhodactis Superman",
      "rhodactis indonesia",
      "rhodactis superman",
      "rhodactis bicolor",
      "Mushroom Rhodactis Indonésia / Superman"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "027_rhodactis_indonesia_superman.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Mushrooms e Corallimorphs"
  },
  {
    "id": "803",
    "name": "Zoanthus Red Bam Bam (Zoanthus sp.)",
    "commonName": "Zoanthus Red Bam Bam",
    "scientificName": "Zoanthus sp.",
    "synonyms": [
      "Red Bam Bam",
      "Bam Bam",
      "Bam Bam Orange",
      "zoa bam bam",
      "bambam",
      "orange bam bam",
      "Zoanthus Bam Bam (Orange)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "006_zoanthus_bam_bam.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Zoanthus e Palythoas"
  },
  {
    "id": "804",
    "name": "Zoanthus Candy Apple Red (Zoanthus sp.)",
    "commonName": "Zoanthus Candy Apple Red",
    "scientificName": "Zoanthus sp.",
    "synonyms": [
      "Candy Apple Red"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "zoanthus-candy-apple-red.webp",
    "section": "Corais e Anêmonas",
    "familyGroup": "Zoanthus e Palythoas"
  },
  {
    "id": "805",
    "name": "Alga Atomic Broccoli (Hypnea pannosa)",
    "commonName": "Alga Atomic Broccoli",
    "scientificName": "Hypnea pannosa",
    "synonyms": [
      "Atomic Broccoli",
      "Alga Atomic Brocolli",
      "Macroalga Atomic Broccoli",
      "Atomic Brocolli",
      "Alga Vermelha Ornamental",
      "Hypnea Atomic Broccoli"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "alga-atomic-broccoli.png",
    "section": "Plantas e Macroalgas",
    "familyGroup": "Macroalgas Marinhas"
  },
  {
    "id": "190-METALLIC",
    "name": "Green Star Polyps Metallic (Briareum violaceum)",
    "commonName": "Green Star Polyps Metallic",
    "scientificName": "Briareum violaceum",
    "synonyms": [
      "GSP Metallic",
      "Green Star Polyps Metálico",
      "GSP Metálico",
      "GSP Ultra Metallic",
      "Green Star Polyps Ultra Green"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "034_green_star_polyps_gsp.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Moles / Soft Corals"
  },
  {
    "id": "190-LONG-TENTACLES",
    "name": "Green Star Polyps Long Tentacles (Briareum violaceum)",
    "commonName": "Green Star Polyps Long Tentacles",
    "scientificName": "Briareum violaceum",
    "synonyms": [
      "GSP Long Tentacles",
      "Green Star Polyps Cabelo Longo",
      "GSP Cabelo Longo",
      "Green Star Polyps Long Polyp",
      "GSP Long Polyp"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "034_green_star_polyps_gsp.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Moles / Soft Corals"
  },
  {
    "id": "806",
    "name": "Zoanthus Eagle Eye (Zoanthus sp.)",
    "commonName": "Zoanthus Eagle Eye",
    "scientificName": "Zoanthus sp.",
    "synonyms": [
      "Zoanthus Eagle Eye",
      "zoa eagle eye",
      "olho de aguia",
      "zoanthus eagle eye"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "004_zoanthus_eagle_eye.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Moles / Soft Corals"
  },
  {
    "id": "807",
    "name": "Zoanthus LA Lakers (Zoanthus sp.)",
    "commonName": "Zoanthus LA Lakers",
    "scientificName": "Zoanthus sp.",
    "synonyms": [
      "Zoanthus LA Lakers",
      "zoa la lakers",
      "lakers",
      "zoanthus lakers"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "008_zoanthus_la_lakers.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Moles / Soft Corals"
  },
  {
    "id": "808",
    "name": "Zoanthus Purple Hornet (Zoanthus sp.)",
    "commonName": "Zoanthus Purple Hornet",
    "scientificName": "Zoanthus sp.",
    "synonyms": [
      "Zoanthus Purple Hornet",
      "zoa purple hornet",
      "hornet roxo",
      "purple hornet"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "012_zoanthus_purple_hornet.webp",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Moles / Soft Corals"
  },
  {
    "id": "809",
    "name": "Zoanthus Armor of God (Zoanthus sp.)",
    "commonName": "Zoanthus Armor of God (AOG)",
    "scientificName": "Zoanthus sp.",
    "synonyms": [
      "Zoanthus Armor of God (AOG)",
      "zoa aog",
      "armor of god",
      "devils armor"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "013_zoanthus_armor_of_god.webp",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Moles / Soft Corals"
  },
  {
    "id": "810",
    "name": "Palythoa Nuclear Green (Palythoa sp.)",
    "commonName": "Palythoa Nuclear Green",
    "scientificName": "Palythoa sp.",
    "synonyms": [
      "Palythoa Nuclear Green",
      "paly nuclear green",
      "nuclear green",
      "protopalythoa"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "016_palythoa_nuclear_green.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Moles / Soft Corals"
  },
  {
    "id": "811",
    "name": "Palythoa Purple Death (Palythoa sp.)",
    "commonName": "Palythoa Purple Death",
    "scientificName": "Palythoa sp.",
    "synonyms": [
      "Palythoa Purple Death",
      "paly purple death",
      "purple death"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "017_palythoa_purple_death.webp",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Moles / Soft Corals"
  },
  {
    "id": "812",
    "name": "Palythoa Nirvana (Palythoa sp.)",
    "commonName": "Palythoa Nirvana",
    "scientificName": "Palythoa sp.",
    "synonyms": [
      "Palythoa Nirvana",
      "Palythoa Nirvana / Pandora",
      "paly nirvana",
      "paly pandora",
      "zoa nirvana"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "020_palythoa_nirvana.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Moles / Soft Corals"
  },
  {
    "id": "813",
    "name": "Mushroom Discosoma Watermelon (Discosoma sp.)",
    "commonName": "Mushroom Discosoma Watermelon",
    "scientificName": "Discosoma sp.",
    "synonyms": [
      "Mushroom Discosoma Watermelon",
      "Mushroom Discosoma Watermelon (Listrado)",
      "mush melancia",
      "discosoma striped",
      "mush listrado"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "024_mushroom_discosoma_watermelon.webp",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Moles / Soft Corals"
  },
  {
    "id": "814",
    "name": "Mushroom Rhodactis Bounce Sunkist (Rhodactis sp.)",
    "commonName": "Mushroom Rhodactis Bounce Sunkist",
    "scientificName": "Rhodactis sp.",
    "synonyms": [
      "Mushroom Rhodactis Bounce Sunkist",
      "Mushroom Rhodactis Bounce (OG / Sunkist)",
      "bounce mushroom",
      "sunkist bounce",
      "og bounce"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "029_rhodactis_bounce.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Moles / Soft Corals"
  },
  {
    "id": "815",
    "name": "Sinularia Green Neon (Sinularia dura)",
    "commonName": "Sinularia Green Neon",
    "scientificName": "Sinularia dura",
    "synonyms": [
      "Sinularia Green Neon",
      "Sinularia Green Neon / Dura",
      "sinularia",
      "sinularia green",
      "sinularia dura"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "037_sinularia_green_neon.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Moles / Soft Corals"
  },
  {
    "id": "816",
    "name": "Hammer Coral Purple Tip (Fimbriaphyllia ancora var. Purple Tip)",
    "commonName": "Hammer Coral Purple Tip",
    "scientificName": "Fimbriaphyllia ancora var. Purple Tip",
    "synonyms": [
      "Hammer Coral Purple Tip",
      "Hammer Purple Tip",
      "hammer purple",
      "hammer ponta roxa"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "045_hammer_purple_tip.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "817",
    "name": "Frammer Coral (Fimbriaphyllia sp.)",
    "commonName": "Frammer Coral",
    "scientificName": "Fimbriaphyllia sp.",
    "synonyms": [
      "Frammer Coral",
      "Frammer (Híbrido Frog/Hammer)",
      "frammer",
      "euphyllia frammer"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "052_frammer_euphyllia.webp",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros LPS"
  },
  {
    "id": "818",
    "name": "Montipora Grafted Cap (Montipora capricornis var. Grafted)",
    "commonName": "Montipora Grafted Cap",
    "scientificName": "Montipora capricornis var. Grafted",
    "synonyms": [
      "Montipora Grafted Cap",
      "Montipora Capricornis Verde / Grafted",
      "montipora prato verde",
      "capricornis green",
      "grafted"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "062_montipora_capricornis_grafted.jpg",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros SPS"
  },
  {
    "id": "819",
    "name": "Seriatopora Caliendrum Green (Seriatopora caliendrum)",
    "commonName": "Seriatopora Caliendrum Green",
    "scientificName": "Seriatopora caliendrum",
    "synonyms": [
      "Seriatopora Caliendrum Green",
      "Seriatopora Caliendrum (Green / Bicolor)",
      "seriatopora caliendrum",
      "caliendrum green"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "067_seriatopora_caliendrum_green.webp",
    "section": "Corais e Anêmonas",
    "familyGroup": "Corais Duros SPS"
  },
  {
    "id": "820",
    "name": "Kinguio Cometa (Carassius auratus var. Comet)",
    "commonName": "Kinguio Cometa",
    "scientificName": "Carassius auratus var. Comet",
    "synonyms": [
      "Kinguio Cometa",
      "Kinguio Cometa & Sarasa",
      "kinguio cometa",
      "sarasa",
      "peixe japones"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "139_kinguio_cometa_sarasa.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Kinguios e Carpas"
  },
  {
    "id": "821",
    "name": "Kinguio Oranda Red Cap (Carassius auratus var. Oranda Red Cap)",
    "commonName": "Kinguio Oranda Red Cap",
    "scientificName": "Carassius auratus var. Oranda Red Cap",
    "synonyms": [
      "Kinguio Oranda Red Cap",
      "Kinguio Oranda (Red Cap / Calico / Panda)",
      "kinguio oranda",
      "red cap",
      "oranda tricolor"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "140_kinguio_oranda_red_cap.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Kinguios e Carpas"
  },
  {
    "id": "822",
    "name": "Kinguio Telescópio Black Moor (Carassius auratus var. Telescope Black Moor)",
    "commonName": "Kinguio Telescópio Black Moor",
    "scientificName": "Carassius auratus var. Telescope Black Moor",
    "synonyms": [
      "Kinguio Telescópio Black Moor",
      "Kinguio Telescópio (Black Moor) & Ranchu",
      "kinguio telescopio",
      "black moor",
      "ranchu",
      "perola"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "141_kinguio_telescopio_black_moor.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Kinguios e Carpas"
  },
  {
    "id": "823",
    "name": "Kinguio Ranchu (Carassius auratus var. Ranchu)",
    "commonName": "Kinguio Ranchu",
    "scientificName": "Carassius auratus var. Ranchu",
    "synonyms": [
      "Kinguio Ranchu",
      "Lionhead Goldfish",
      "Cabeça de Leão",
      "Ranchu"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "kinguio-ranchu.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Kinguios e Carpas"
  },
  {
    "id": "824",
    "name": "Kinguio Pérola (Carassius auratus var. Pearlscale)",
    "commonName": "Kinguio Pérola",
    "scientificName": "Carassius auratus var. Pearlscale",
    "synonyms": [
      "Kinguio Pérola",
      "Pearlscale Goldfish",
      "Pérola Escama"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "kinguio-perola.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Kinguios e Carpas"
  }
] as const

/**
 * Busca inteligente na base de espécies pelo nome comum, científico, morfotipos ou sinônimos.
 */
export function searchMasterSpecies(query: string, limit = 8): MasterSpecies[] {
  if (!query || query.trim().length < 2) return []

  const cleanQuery = query
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

  const queryTokens = cleanQuery.split(/\s+/).filter(Boolean)

  const matches: { item: MasterSpecies; score: number }[] = []

  for (const item of SPECIES_MASTER_CATALOG) {
    const normName = item.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    const normCommon = item.commonName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    const normScientific = item.scientificName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    const normSynonyms = (item.synonyms || []).map((s) =>
      s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    )

    // Todos os tokens devem bater em algum dos campos (nome, científico ou sinônimos)
    const allTokensMatch = queryTokens.every(
      (token) =>
        normName.includes(token) ||
        normScientific.includes(token) ||
        normSynonyms.some((s) => s.includes(token))
    )

    if (allTokensMatch) {
      let score = 0
      // Match exato ou de início no nome popular tem prioridade máxima
      if (normCommon === cleanQuery) score += 100
      else if (normCommon.startsWith(cleanQuery)) score += 60
      else if (normName.startsWith(cleanQuery)) score += 50
      else if (normCommon.includes(cleanQuery)) score += 30

      // Match em sinônimos
      if (normSynonyms.some((s) => s === cleanQuery)) score += 50
      else if (normSynonyms.some((s) => s.startsWith(cleanQuery))) score += 40
      else if (normSynonyms.some((s) => s.includes(cleanQuery))) score += 20

      // Match científico
      if (normScientific.startsWith(cleanQuery)) score += 35
      else if (normScientific.includes(cleanQuery)) score += 15

      matches.push({ item, score })
    }
  }

  matches.sort((a, b) => b.score - a.score)
  return matches.slice(0, limit).map((m) => m.item)
}
