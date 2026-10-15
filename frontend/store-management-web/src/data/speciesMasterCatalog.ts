// Catálogo Mestre Oficial de Espécies e Morfotipos (Bamba Aqua)
// Gerado automaticamente com desmembramento 1:1 estrito, taxonomia auditada e vínculo de imagens.
// Padrão obrigatório: "Nome Popular (Nome científico)", sem combos e sem repetição de epíteto.
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
    "name": "Zoanthus Sunny Day (Sunny D)",
    "commonName": "Zoanthus Sunny Day",
    "scientificName": "Sunny D",
    "synonyms": [
      "Zoanthus Sunny Day",
      "Zoanthus Sunny Day (Sunny D)",
      "zoa sunny d",
      "sunny day",
      "zoanthus sunny",
      "sunny d"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "001_zoanthus_sunny_day.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "2",
    "name": "Zoanthus Rasta",
    "commonName": "Zoanthus Rasta",
    "scientificName": "Zoanthus Rasta",
    "synonyms": [
      "Zoanthus Rasta",
      "Zoanthus Rasta",
      "zoa rasta",
      "rastas",
      "zoanthus rasta"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "002_zoanthus_rasta.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "3",
    "name": "Zoanthus Watermelon (Melancia)",
    "commonName": "Zoanthus Watermelon",
    "scientificName": "Melancia",
    "synonyms": [
      "Zoanthus Watermelon",
      "Zoanthus Watermelon (Melancia)",
      "zoa watermelon",
      "zoa melancia",
      "whammin watermelon"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "003_zoanthus_watermelon.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "4",
    "name": "Zoanthus Eagle Eye",
    "commonName": "Zoanthus Eagle Eye",
    "scientificName": "Zoanthus Eagle Eye",
    "synonyms": [
      "Zoanthus Eagle Eye",
      "Zoanthus Eagle Eye",
      "zoa eagle eye",
      "olho de aguia",
      "zoanthus eagle eye"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "004_zoanthus_eagle_eye.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "5",
    "name": "Zoanthus Radioactive Green",
    "commonName": "Zoanthus Radioactive Green",
    "scientificName": "Zoanthus Radioactive Green",
    "synonyms": [
      "Zoanthus Radioactive Green",
      "Zoanthus Radioactive Green",
      "zoa radioactive",
      "radioactive dragon eye",
      "green bay packers"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "005_zoanthus_radioactive_green.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "6",
    "name": "Zoanthus Bam Bam (Orange)",
    "commonName": "Zoanthus Bam Bam",
    "scientificName": "Orange",
    "synonyms": [
      "Zoanthus Bam Bam",
      "Zoanthus Bam Bam (Orange)",
      "zoa bam bam",
      "bambam",
      "orange bam bam"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "006_zoanthus_bam_bam.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "7",
    "name": "Zoanthus Fruit Loops",
    "commonName": "Zoanthus Fruit Loops",
    "scientificName": "Zoanthus Fruit Loops",
    "synonyms": [
      "Zoanthus Fruit Loops",
      "Zoanthus Fruit Loops",
      "zoa fruit loops",
      "fruit loop",
      "zoanthus fruit loops"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "007_zoanthus_fruit_loops.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "8",
    "name": "Zoanthus LA Lakers",
    "commonName": "Zoanthus LA Lakers",
    "scientificName": "Zoanthus LA Lakers",
    "synonyms": [
      "Zoanthus LA Lakers",
      "Zoanthus LA Lakers",
      "zoa la lakers",
      "lakers",
      "zoanthus lakers"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "008_zoanthus_la_lakers.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "9",
    "name": "Zoanthus Fire and Ice",
    "commonName": "Zoanthus Fire and Ice",
    "scientificName": "Zoanthus Fire and Ice",
    "synonyms": [
      "Zoanthus Fire and Ice",
      "Zoanthus Fire and Ice",
      "zoa fire and ice",
      "fire & ice",
      "zoanthus fire ice"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "009_zoanthus_fire_and_ice.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "10",
    "name": "Zoanthus Blue Hornet",
    "commonName": "Zoanthus Blue Hornet",
    "scientificName": "Zoanthus Blue Hornet",
    "synonyms": [
      "Zoanthus Blue Hornet",
      "Zoanthus Blue Hornet",
      "zoa blue hornet",
      "hornet azul",
      "blue hornet"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "010_zoanthus_blue_hornet.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "11",
    "name": "Zoanthus Red Hornet",
    "commonName": "Zoanthus Red Hornet",
    "scientificName": "Zoanthus Red Hornet",
    "synonyms": [
      "Zoanthus Red Hornet",
      "Zoanthus Red Hornet",
      "zoa red hornet",
      "hornet vermelho",
      "red hornet"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "011_zoanthus_red_hornet.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "12",
    "name": "Zoanthus Purple Hornet",
    "commonName": "Zoanthus Purple Hornet",
    "scientificName": "Zoanthus Purple Hornet",
    "synonyms": [
      "Zoanthus Purple Hornet",
      "Zoanthus Purple Hornet",
      "zoa purple hornet",
      "hornet roxo",
      "purple hornet"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "012_zoanthus_purple_hornet.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "13",
    "name": "Zoanthus Armor of God (AOG)",
    "commonName": "Zoanthus Armor of God",
    "scientificName": "AOG",
    "synonyms": [
      "Zoanthus Armor of God",
      "Zoanthus Armor of God (AOG)",
      "zoa aog",
      "armor of god",
      "devils armor"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "013_zoanthus_armor_of_god.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "14",
    "name": "Zoanthus Scrambled Eggs (Zoanthus sp.)",
    "commonName": "Zoanthus Scrambled Eggs",
    "scientificName": "Zoanthus sp.",
    "synonyms": [
      "Zoanthus Scrambled Eggs",
      "Zoanthus Scrambled Eggs (Zoanthus sp.)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "014_zoanthus_scrambled_eggs.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "15",
    "name": "Zoanthus King Midas (Zoanthus sp.)",
    "commonName": "Zoanthus King Midas",
    "scientificName": "Zoanthus sp.",
    "synonyms": [
      "Zoanthus King Midas",
      "Zoanthus King Midas (Zoanthus sp.)",
      "zoanthus-king-midas.webp",
      "zoanthus-king-midas.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "zoanthus-king-midas.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "16",
    "name": "Palythoa Utter Chaos",
    "commonName": "Palythoa Utter Chaos",
    "scientificName": "Palythoa Utter Chaos",
    "synonyms": [
      "Palythoa Utter Chaos",
      "Palythoa Utter Chaos",
      "utter chaos",
      "zoa utter chaos",
      "paly utter chaos"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "015_palythoa_utter_chaos.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "Palythoas"
  },
  {
    "id": "17",
    "name": "Palythoa Nuclear Green",
    "commonName": "Palythoa Nuclear Green",
    "scientificName": "Palythoa Nuclear Green",
    "synonyms": [
      "Palythoa Nuclear Green",
      "Palythoa Nuclear Green",
      "paly nuclear green",
      "nuclear green",
      "protopalythoa"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "016_palythoa_nuclear_green.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Palythoas"
  },
  {
    "id": "18",
    "name": "Palythoa Purple Death",
    "commonName": "Palythoa Purple Death",
    "scientificName": "Palythoa Purple Death",
    "synonyms": [
      "Palythoa Purple Death",
      "Palythoa Purple Death",
      "paly purple death",
      "purple death"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "017_palythoa_purple_death.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "Palythoas"
  },
  {
    "id": "19",
    "name": "Palythoa Captain America",
    "commonName": "Palythoa Captain America",
    "scientificName": "Palythoa Captain America",
    "synonyms": [
      "Palythoa Captain America",
      "Palythoa Captain America",
      "paly captain america",
      "capitao america"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "018_palythoa_captain_america.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "Palythoas"
  },
  {
    "id": "20",
    "name": "Palythoa Grandis (Palythoa grandis)",
    "commonName": "Palythoa Grandis",
    "scientificName": "Palythoa grandis",
    "synonyms": [
      "Palythoa Grandis",
      "Palythoa Grandis (Palythoa grandis)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "019_palythoa_grandis.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Palythoas"
  },
  {
    "id": "21",
    "name": "Palythoa Cinnamon (Palythoa sp.)",
    "commonName": "Palythoa Cinnamon",
    "scientificName": "Palythoa sp.",
    "synonyms": [
      "Palythoa Cinnamon",
      "Palythoa Cinnamon (Palythoa sp.)",
      "zoanthus-grandis-cinnamon.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "zoanthus-grandis-cinnamon.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Palythoas"
  },
  {
    "id": "22",
    "name": "Palythoa Nirvana (Palythoa sp.)",
    "commonName": "Palythoa Nirvana",
    "scientificName": "Palythoa sp.",
    "synonyms": [
      "Palythoa Nirvana",
      "Palythoa Nirvana (Palythoa sp.)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "020_palythoa_nirvana.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Palythoas"
  },
  {
    "id": "23",
    "name": "Palythoa Pandora (Palythoa sp.)",
    "commonName": "Palythoa Pandora",
    "scientificName": "Palythoa sp.",
    "synonyms": [
      "Palythoa Pandora",
      "Palythoa Pandora (Palythoa sp.)",
      "palythoa-pandora.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Palythoas"
  },
  {
    "id": "24",
    "name": "Mushroom Discosoma Super Red (Discosoma sp.)",
    "commonName": "Mushroom Discosoma Super Red",
    "scientificName": "Discosoma sp.",
    "synonyms": [
      "Mushroom Discosoma Super Red",
      "Mushroom Discosoma Super Red (Discosoma sp.)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "021_mushroom_discosoma_red.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "25",
    "name": "Mushroom Discosoma Deadpool (Discosoma sp.)",
    "commonName": "Mushroom Discosoma Deadpool",
    "scientificName": "Discosoma sp.",
    "synonyms": [
      "Mushroom Discosoma Deadpool",
      "Mushroom Discosoma Deadpool (Discosoma sp.)",
      "mushroom-deadpool.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "26",
    "name": "Mushroom Discosoma Superman",
    "commonName": "Mushroom Discosoma Superman",
    "scientificName": "Mushroom Discosoma Superman",
    "synonyms": [
      "Mushroom Discosoma Superman",
      "Mushroom Discosoma Superman",
      "mush superman",
      "discosoma superman",
      "red spotted blue"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "022_mushroom_discosoma_superman.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "27",
    "name": "Mushroom Discosoma Blue (Discosoma sp.)",
    "commonName": "Mushroom Discosoma Blue",
    "scientificName": "Discosoma sp.",
    "synonyms": [
      "Mushroom Discosoma Blue",
      "Mushroom Discosoma Blue (Discosoma sp.)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "023_mushroom_discosoma_blue_purple.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "28",
    "name": "Mushroom Discosoma Purple Spotted (Discosoma sp.)",
    "commonName": "Mushroom Discosoma Purple Spotted",
    "scientificName": "Discosoma sp.",
    "synonyms": [
      "Mushroom Discosoma Purple Spotted",
      "Mushroom Discosoma Purple Spotted (Discosoma sp.)",
      "mushroom-purple-spotted.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "29",
    "name": "Mushroom Discosoma Watermelon (Listrado)",
    "commonName": "Mushroom Discosoma Watermelon",
    "scientificName": "Listrado",
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
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "30",
    "name": "Mushroom Discosoma Metallic Green",
    "commonName": "Mushroom Discosoma Metallic Green",
    "scientificName": "Mushroom Discosoma Metallic Green",
    "synonyms": [
      "Mushroom Discosoma Metallic Green",
      "Mushroom Discosoma Metallic Green",
      "mush verde",
      "discosoma green",
      "green mush"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "025_mushroom_discosoma_green.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "31",
    "name": "Mushroom Rhodactis Green Hairy",
    "commonName": "Mushroom Rhodactis Green Hairy",
    "scientificName": "Mushroom Rhodactis Green Hairy",
    "synonyms": [
      "Mushroom Rhodactis Green Hairy",
      "Mushroom Rhodactis Green Hairy",
      "rhodactis hairy",
      "mush peludo",
      "green hairy"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "026_rhodactis_green_hairy.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "32",
    "name": "Mushroom Rhodactis Indonésia (Rhodactis sp.)",
    "commonName": "Mushroom Rhodactis Indonésia",
    "scientificName": "Rhodactis sp.",
    "synonyms": [
      "Mushroom Rhodactis Indonésia",
      "Mushroom Rhodactis Indonésia (Rhodactis sp.)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "027_rhodactis_indonesia_superman.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "33",
    "name": "Mushroom Rhodactis Superman (Rhodactis sp.)",
    "commonName": "Mushroom Rhodactis Superman",
    "scientificName": "Rhodactis sp.",
    "synonyms": [
      "Mushroom Rhodactis Superman",
      "Mushroom Rhodactis Superman (Rhodactis sp.)",
      "rhodactis-superman.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "rhodactis-superman.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "34",
    "name": "Mushroom Rhodactis Bullseye (Rhodactis sp.)",
    "commonName": "Mushroom Rhodactis Bullseye",
    "scientificName": "Rhodactis sp.",
    "synonyms": [
      "Mushroom Rhodactis Bullseye",
      "Mushroom Rhodactis Bullseye (Rhodactis sp.)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "028_rhodactis_bullseye.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "35",
    "name": "Mushroom Rhodactis Tonga (Rhodactis sp.)",
    "commonName": "Mushroom Rhodactis Tonga",
    "scientificName": "Rhodactis sp.",
    "synonyms": [
      "Mushroom Rhodactis Tonga",
      "Mushroom Rhodactis Tonga (Rhodactis sp.)",
      "rhodactis-tonga.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "36",
    "name": "Mushroom Rhodactis Bounce OG (Rhodactis sp.)",
    "commonName": "Mushroom Rhodactis Bounce OG",
    "scientificName": "Rhodactis sp.",
    "synonyms": [
      "Mushroom Rhodactis Bounce OG",
      "Mushroom Rhodactis Bounce OG (Rhodactis sp.)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "029_rhodactis_bounce.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "37",
    "name": "Mushroom Rhodactis Bounce Sunkist (Rhodactis sp.)",
    "commonName": "Mushroom Rhodactis Bounce Sunkist",
    "scientificName": "Rhodactis sp.",
    "synonyms": [
      "Mushroom Rhodactis Bounce Sunkist",
      "Mushroom Rhodactis Bounce Sunkist (Rhodactis sp.)",
      "rhodactis-sunkist-bounce.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "38",
    "name": "Ricordea Florida Laranja (Ricordea florida)",
    "commonName": "Ricordea Florida Laranja",
    "scientificName": "Ricordea florida",
    "synonyms": [
      "Ricordea Florida Laranja",
      "Ricordea Florida Laranja (Ricordea florida)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "030_ricordea_florida_orange.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "39",
    "name": "Ricordea Florida Rainbow (Ricordea florida)",
    "commonName": "Ricordea Florida Rainbow",
    "scientificName": "Ricordea florida",
    "synonyms": [
      "Ricordea Florida Rainbow",
      "Ricordea Florida Rainbow (Ricordea florida)",
      "ricordea-florida-rainbow.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "ricordea-florida-rainbow.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "40",
    "name": "Ricordea Florida Verde (Ricordea florida)",
    "commonName": "Ricordea Florida Verde",
    "scientificName": "Ricordea florida",
    "synonyms": [
      "Ricordea Florida Verde",
      "Ricordea Florida Verde (Ricordea florida)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "031_ricordea_florida_green.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "41",
    "name": "Ricordea Florida Azul (Ricordea florida)",
    "commonName": "Ricordea Florida Azul",
    "scientificName": "Ricordea florida",
    "synonyms": [
      "Ricordea Florida Azul",
      "Ricordea Florida Azul (Ricordea florida)",
      "ricordea-florida-azul.jpg",
      "ricordea-florida-blue.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "ricordea-florida-azul.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "42",
    "name": "Ricordea Yuma Verde (Ricordea yuma)",
    "commonName": "Ricordea Yuma Verde",
    "scientificName": "Ricordea yuma",
    "synonyms": [
      "Ricordea Yuma Verde",
      "Ricordea Yuma Verde (Ricordea yuma)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "032_ricordea_yuma_green.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "43",
    "name": "Ricordea Yuma Neon (Ricordea yuma)",
    "commonName": "Ricordea Yuma Neon",
    "scientificName": "Ricordea yuma",
    "synonyms": [
      "Ricordea Yuma Neon",
      "Ricordea Yuma Neon (Ricordea yuma)",
      "ricordea-yuma-neon.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "44",
    "name": "Ricordea Yuma Laranja (Ricordea yuma)",
    "commonName": "Ricordea Yuma Laranja",
    "scientificName": "Ricordea yuma",
    "synonyms": [
      "Ricordea Yuma Laranja",
      "Ricordea Yuma Laranja (Ricordea yuma)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "033_ricordea_yuma_orange_rainbow.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "45",
    "name": "Ricordea Yuma Pink Rainbow (Ricordea yuma)",
    "commonName": "Ricordea Yuma Pink Rainbow",
    "scientificName": "Ricordea yuma",
    "synonyms": [
      "Ricordea Yuma Pink Rainbow",
      "Ricordea Yuma Pink Rainbow (Ricordea yuma)",
      "ricordea-yuma-pink-rainbow.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "46",
    "name": "Green Star Polyps (GSP Metallic)",
    "commonName": "Green Star Polyps",
    "scientificName": "GSP Metallic",
    "synonyms": [
      "Green Star Polyps",
      "Green Star Polyps (GSP Metallic)",
      "gsp",
      "star polyps",
      "briareum",
      "grama verde"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "034_green_star_polyps_gsp.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "47",
    "name": "Leather Toadstool (Sarcophyton sp.)",
    "commonName": "Leather Toadstool",
    "scientificName": "Sarcophyton sp.",
    "synonyms": [
      "Leather Toadstool",
      "Leather Toadstool (Sarcophyton sp.)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "035_leather_toadstool.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "48",
    "name": "Leather Devil's Hand (Lobophytum sp.)",
    "commonName": "Leather Devil's Hand",
    "scientificName": "Lobophytum sp.",
    "synonyms": [
      "Leather Devil's Hand",
      "Leather Devil's Hand (Lobophytum sp.)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "036_leather_devils_hand.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "49",
    "name": "Sinularia Verde Neon (Sinularia sp.)",
    "commonName": "Sinularia Verde Neon",
    "scientificName": "Sinularia sp.",
    "synonyms": [
      "Sinularia Verde Neon",
      "Sinularia Verde Neon (Sinularia sp.)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "037_sinularia_green_neon.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "50",
    "name": "Sinularia Dura (Sinularia brassica)",
    "commonName": "Sinularia Dura",
    "scientificName": "Sinularia brassica",
    "synonyms": [
      "Sinularia Dura",
      "Sinularia Dura (Sinularia brassica)",
      "sinularia-dura.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "51",
    "name": "Kenya Tree (Árvore do Quênia)",
    "commonName": "Kenya Tree",
    "scientificName": "Árvore do Quênia",
    "synonyms": [
      "Kenya Tree",
      "Kenya Tree (Árvore do Quênia)",
      "kenya tree",
      "arvore do quenia",
      "capnella"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "038_kenya_tree_capnella.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "52",
    "name": "Xênia Pulsante Pom Pom (Xenia umbellata)",
    "commonName": "Xênia Pulsante Pom Pom",
    "scientificName": "Xenia umbellata",
    "synonyms": [
      "Xênia Pulsante Pom Pom",
      "Xênia Pulsante Pom Pom (Xenia umbellata)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "039_xenia_pulsante.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "53",
    "name": "Xênia Pulsante Giant (Xenia elongata)",
    "commonName": "Xênia Pulsante Giant",
    "scientificName": "Xenia elongata",
    "synonyms": [
      "Xênia Pulsante Giant",
      "Xênia Pulsante Giant (Xenia elongata)",
      "xenia-giant-elongata.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "54",
    "name": "Cloves Papaya (Clavularia sp.)",
    "commonName": "Cloves Papaya",
    "scientificName": "Clavularia sp.",
    "synonyms": [
      "Cloves Papaya",
      "Cloves Papaya (Clavularia sp.)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "040_cloves_papaya_fireworks.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "55",
    "name": "Cloves Tricolor (Clavularia sp.)",
    "commonName": "Cloves Tricolor",
    "scientificName": "Clavularia sp.",
    "synonyms": [
      "Cloves Tricolor",
      "Cloves Tricolor (Clavularia sp.)",
      "cloves-tricolor.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "56",
    "name": "Anêmona Bubble Tip Rose (Entacmaea quadricolor var. Rose)",
    "commonName": "Anêmona Bubble Tip Rose",
    "scientificName": "Entacmaea quadricolor var. Rose",
    "synonyms": [
      "Anêmona Bubble Tip Rose",
      "Anêmona Bubble Tip Rose (Entacmaea quadricolor var. Rose)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "041_anemona_bta_rose_rainbow.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "57",
    "name": "Anêmona Bubble Tip Rainbow (Entacmaea quadricolor var. Rainbow)",
    "commonName": "Anêmona Bubble Tip Rainbow",
    "scientificName": "Entacmaea quadricolor var. Rainbow",
    "synonyms": [
      "Anêmona Bubble Tip Rainbow",
      "Anêmona Bubble Tip Rainbow (Entacmaea quadricolor var. Rainbow)",
      "anemona-bubble-tip-rainbow.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "anemona-bubble-tip-rainbow.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "58",
    "name": "Anêmona Bubble Tip Green (GBTA)",
    "commonName": "Anêmona Bubble Tip Green",
    "scientificName": "GBTA",
    "synonyms": [
      "Anêmona Bubble Tip Green",
      "Anêmona Bubble Tip Green (GBTA)",
      "gbta",
      "bubble tip green",
      "anemona verde"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "042_anemona_bta_green.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "59",
    "name": "Coral Hammer Bicolor (Fimbriaphyllia ancora)",
    "commonName": "Coral Hammer Bicolor",
    "scientificName": "Fimbriaphyllia ancora",
    "synonyms": [
      "Coral Hammer Bicolor",
      "Coral Hammer Bicolor (Fimbriaphyllia ancora)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "043_hammer_bicolor.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "Euphylliidae (LPS Nobres)"
  },
  {
    "id": "60",
    "name": "Coral Hammer Full Green (Fimbriaphyllia ancora)",
    "commonName": "Coral Hammer Full Green",
    "scientificName": "Fimbriaphyllia ancora",
    "synonyms": [
      "Coral Hammer Full Green",
      "Coral Hammer Full Green (Fimbriaphyllia ancora)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "044_hammer_full_green.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Euphylliidae (LPS Nobres)"
  },
  {
    "id": "61",
    "name": "Coral Hammer Toxic Splatter (Fimbriaphyllia ancora)",
    "commonName": "Coral Hammer Toxic Splatter",
    "scientificName": "Fimbriaphyllia ancora",
    "synonyms": [
      "Coral Hammer Toxic Splatter",
      "Coral Hammer Toxic Splatter (Fimbriaphyllia ancora)",
      "hammer-toxic-splatter.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Euphylliidae (LPS Nobres)"
  },
  {
    "id": "62",
    "name": "Hammer Purple Tip",
    "commonName": "Hammer Purple Tip",
    "scientificName": "Hammer Purple Tip",
    "synonyms": [
      "Hammer Purple Tip",
      "Hammer Purple Tip",
      "hammer purple",
      "hammer ponta roxa"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "045_hammer_purple_tip.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Euphylliidae (LPS Nobres)"
  },
  {
    "id": "63",
    "name": "Coral Hammer Gold (Fimbriaphyllia ancora)",
    "commonName": "Coral Hammer Gold",
    "scientificName": "Fimbriaphyllia ancora",
    "synonyms": [
      "Coral Hammer Gold",
      "Coral Hammer Gold (Fimbriaphyllia ancora)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "046_hammer_gold_yellow.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Euphylliidae (LPS Nobres)"
  },
  {
    "id": "64",
    "name": "Coral Hammer Yellow (Fimbriaphyllia ancora)",
    "commonName": "Coral Hammer Yellow",
    "scientificName": "Fimbriaphyllia ancora",
    "synonyms": [
      "Coral Hammer Yellow",
      "Coral Hammer Yellow (Fimbriaphyllia ancora)",
      "hammer-yellow.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Euphylliidae (LPS Nobres)"
  },
  {
    "id": "65",
    "name": "Coral Frogspawn Verde Ponta Roxa (Fimbriaphyllia divisa)",
    "commonName": "Coral Frogspawn Verde Ponta Roxa",
    "scientificName": "Fimbriaphyllia divisa",
    "synonyms": [
      "Coral Frogspawn Verde Ponta Roxa",
      "Coral Frogspawn Verde Ponta Roxa (Fimbriaphyllia divisa)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "047_frogspawn_bicolor.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Euphylliidae (LPS Nobres)"
  },
  {
    "id": "66",
    "name": "Coral Frogspawn Full Green (Fimbriaphyllia divisa)",
    "commonName": "Coral Frogspawn Full Green",
    "scientificName": "Fimbriaphyllia divisa",
    "synonyms": [
      "Coral Frogspawn Full Green",
      "Coral Frogspawn Full Green (Fimbriaphyllia divisa)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Euphylliidae (LPS Nobres)"
  },
  {
    "id": "67",
    "name": "Coral Octospawn Verde (Fimbriaphyllia paradivisa)",
    "commonName": "Coral Octospawn Verde",
    "scientificName": "Fimbriaphyllia paradivisa",
    "synonyms": [
      "Coral Octospawn Verde",
      "Coral Octospawn Verde (Fimbriaphyllia paradivisa)",
      "octospawn-coral.jpg",
      "coral-octospawn-verde.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "octospawn-coral.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "68",
    "name": "Coral Torch Green Tip (Euphyllia glabrescens)",
    "commonName": "Coral Torch Green Tip",
    "scientificName": "Euphyllia glabrescens",
    "synonyms": [
      "Coral Torch Green Tip",
      "Coral Torch Green Tip (Euphyllia glabrescens)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "049_torch_green_tip.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "Euphylliidae (LPS Nobres)"
  },
  {
    "id": "69",
    "name": "Coral Torch Metallic Green (Euphyllia glabrescens)",
    "commonName": "Coral Torch Metallic Green",
    "scientificName": "Euphyllia glabrescens",
    "synonyms": [
      "Coral Torch Metallic Green",
      "Coral Torch Metallic Green (Euphyllia glabrescens)",
      "torch-metallic-green.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Euphylliidae (LPS Nobres)"
  },
  {
    "id": "70",
    "name": "Coral Torch Black Ponta Verde (Euphyllia glabrescens)",
    "commonName": "Coral Torch Black Ponta Verde",
    "scientificName": "Euphyllia glabrescens",
    "synonyms": [
      "Coral Torch Black Ponta Verde",
      "Coral Torch Black Ponta Verde (Euphyllia glabrescens)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Euphylliidae (LPS Nobres)"
  },
  {
    "id": "71",
    "name": "Coral Torch Black Ponta Branca (Euphyllia glabrescens)",
    "commonName": "Coral Torch Black Ponta Branca",
    "scientificName": "Euphyllia glabrescens",
    "synonyms": [
      "Coral Torch Black Ponta Branca",
      "Coral Torch Black Ponta Branca (Euphyllia glabrescens)",
      "torch-black-white-tip.jpg",
      "torch-black.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Euphylliidae (LPS Nobres)"
  },
  {
    "id": "72",
    "name": "Coral Torch Dragon Soul (Euphyllia glabrescens)",
    "commonName": "Coral Torch Dragon Soul",
    "scientificName": "Euphyllia glabrescens",
    "synonyms": [
      "Coral Torch Dragon Soul",
      "Coral Torch Dragon Soul (Euphyllia glabrescens)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "051_torch_dragon_soul_gold.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Euphylliidae (LPS Nobres)"
  },
  {
    "id": "73",
    "name": "Coral Torch Indo Gold (Euphyllia glabrescens)",
    "commonName": "Coral Torch Indo Gold",
    "scientificName": "Euphyllia glabrescens",
    "synonyms": [
      "Coral Torch Indo Gold",
      "Coral Torch Indo Gold (Euphyllia glabrescens)",
      "torch-indo-gold.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Euphylliidae (LPS Nobres)"
  },
  {
    "id": "74",
    "name": "Coral Frammer Híbrido (Euphyllia sp. Frammer)",
    "commonName": "Coral Frammer Híbrido",
    "scientificName": "Euphyllia sp. Frammer",
    "synonyms": [
      "Coral Frammer Híbrido",
      "Coral Frammer Híbrido (Euphyllia sp. Frammer)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "052_frammer_euphyllia.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "Euphylliidae (LPS Nobres)"
  },
  {
    "id": "75",
    "name": "Trumpet Kryptonita (Caulastrea)",
    "commonName": "Trumpet Kryptonita",
    "scientificName": "Caulastrea",
    "synonyms": [
      "Trumpet Kryptonita",
      "Trumpet Kryptonita (Caulastrea)",
      "trumpet kryptonita",
      "kriptonita",
      "caulastrea"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "053_trumpet_kryptonita.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "76",
    "name": "Coral Trumpet Bicolor (Caulastrea curvata)",
    "commonName": "Coral Trumpet Bicolor",
    "scientificName": "Caulastrea curvata",
    "synonyms": [
      "Coral Trumpet Bicolor",
      "Coral Trumpet Bicolor (Caulastrea curvata)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "054_trumpet_bicolor.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "77",
    "name": "Coral Trumpet Azul (Caulastrea furcata)",
    "commonName": "Coral Trumpet Azul",
    "scientificName": "Caulastrea furcata",
    "synonyms": [
      "Coral Trumpet Azul",
      "Coral Trumpet Azul (Caulastrea furcata)",
      "trumpet-azul.jpg",
      "trumpet-blue.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "trumpet-blue.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "78",
    "name": "Coral Duncan (Duncanopsammia axifuga)",
    "commonName": "Coral Duncan",
    "scientificName": "Duncanopsammia axifuga",
    "synonyms": [
      "Coral Duncan",
      "Coral Duncan (Duncanopsammia axifuga)",
      "duncan",
      "duncanopsammia",
      "coral duncan"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "055_coral_duncan.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "79",
    "name": "Coral Acanthastrea Red (Micromussa lordhowensis)",
    "commonName": "Coral Acanthastrea Red",
    "scientificName": "Micromussa lordhowensis",
    "synonyms": [
      "Coral Acanthastrea Red",
      "Coral Acanthastrea Red (Micromussa lordhowensis)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "056_acanthastrea_red_green.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "80",
    "name": "Coral Acanthastrea Green (Micromussa lordhowensis)",
    "commonName": "Coral Acanthastrea Green",
    "scientificName": "Micromussa lordhowensis",
    "synonyms": [
      "Coral Acanthastrea Green",
      "Coral Acanthastrea Green (Micromussa lordhowensis)",
      "acanthastrea-micromussa-orange.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "acanthastrea-micromussa-orange.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "81",
    "name": "Coral Acanthastrea Rainbow (Micromussa lordhowensis)",
    "commonName": "Coral Acanthastrea Rainbow",
    "scientificName": "Micromussa lordhowensis",
    "synonyms": [
      "Coral Acanthastrea Rainbow",
      "Coral Acanthastrea Rainbow (Micromussa lordhowensis)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "057_acanthastrea_rainbow.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "82",
    "name": "Coral Acanthastrea Orange Crush (Micromussa lordhowensis)",
    "commonName": "Coral Acanthastrea Orange Crush",
    "scientificName": "Micromussa lordhowensis",
    "synonyms": [
      "Coral Acanthastrea Orange Crush",
      "Coral Acanthastrea Orange Crush (Micromussa lordhowensis)",
      "acanthastrea-orange-crush.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "83",
    "name": "Coral Goniopora Red (Goniopora stokesi)",
    "commonName": "Coral Goniopora Red",
    "scientificName": "Goniopora stokesi",
    "synonyms": [
      "Coral Goniopora Red",
      "Coral Goniopora Red (Goniopora stokesi)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "058_goniopora_red_pink.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "84",
    "name": "Coral Goniopora Pink (Goniopora stokesi)",
    "commonName": "Coral Goniopora Pink",
    "scientificName": "Goniopora stokesi",
    "synonyms": [
      "Coral Goniopora Pink",
      "Coral Goniopora Pink (Goniopora stokesi)",
      "goniopora-pink.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "85",
    "name": "Coral Goniopora Green Neon (Goniopora sp.)",
    "commonName": "Coral Goniopora Green Neon",
    "scientificName": "Goniopora sp.",
    "synonyms": [
      "Coral Goniopora Green Neon",
      "Coral Goniopora Green Neon (Goniopora sp.)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "059_goniopora_green_neon.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "86",
    "name": "Coral Alveopora Verde (Alveopora tizardi)",
    "commonName": "Coral Alveopora Verde",
    "scientificName": "Alveopora tizardi",
    "synonyms": [
      "Coral Alveopora Verde",
      "Coral Alveopora Verde (Alveopora tizardi)",
      "alveopora-verde.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "87",
    "name": "Coral Blastomussa Wellsi (Blastomussa wellsi)",
    "commonName": "Coral Blastomussa Wellsi",
    "scientificName": "Blastomussa wellsi",
    "synonyms": [
      "Coral Blastomussa Wellsi",
      "Coral Blastomussa Wellsi (Blastomussa wellsi)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "060_blastomussa_favia_chalice.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "88",
    "name": "Coral Favia Dragon Soul (Favia favus)",
    "commonName": "Coral Favia Dragon Soul",
    "scientificName": "Favia favus",
    "synonyms": [
      "Coral Favia Dragon Soul",
      "Coral Favia Dragon Soul (Favia favus)",
      "favia-dragon-soul.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "89",
    "name": "Coral Chalice Hollywood Stunner (Echinopora lamellosa)",
    "commonName": "Coral Chalice Hollywood Stunner",
    "scientificName": "Echinopora lamellosa",
    "synonyms": [
      "Coral Chalice Hollywood Stunner",
      "Coral Chalice Hollywood Stunner (Echinopora lamellosa)",
      "chalice-hollywood-stunner.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "90",
    "name": "Montipora Capricornis Vermelha (Prato Red)",
    "commonName": "Montipora Capricornis Vermelha",
    "scientificName": "Prato Red",
    "synonyms": [
      "Montipora Capricornis Vermelha",
      "Montipora Capricornis Vermelha (Prato Red)",
      "montipora prato vermelha",
      "capricornis red"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "061_montipora_capricornis_red.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "SPS (Pólipos Pequenos)"
  },
  {
    "id": "91",
    "name": "Coral Montipora Capricornis Verde (Montipora capricornis)",
    "commonName": "Coral Montipora Capricornis Verde",
    "scientificName": "Montipora capricornis",
    "synonyms": [
      "Coral Montipora Capricornis Verde",
      "Coral Montipora Capricornis Verde (Montipora capricornis)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "062_montipora_capricornis_grafted.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "SPS (Pólipos Pequenos)"
  },
  {
    "id": "92",
    "name": "Coral Montipora Capricornis Grafted (Montipora capricornis)",
    "commonName": "Coral Montipora Capricornis Grafted",
    "scientificName": "Montipora capricornis",
    "synonyms": [
      "Coral Montipora Capricornis Grafted",
      "Coral Montipora Capricornis Grafted (Montipora capricornis)",
      "montipora-grafted.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "SPS (Pólipos Pequenos)"
  },
  {
    "id": "93",
    "name": "Coral Montipora Digitata Forest Fire (Montipora digitata)",
    "commonName": "Coral Montipora Digitata Forest Fire",
    "scientificName": "Montipora digitata",
    "synonyms": [
      "Coral Montipora Digitata Forest Fire",
      "Coral Montipora Digitata Forest Fire (Montipora digitata)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "063_montipora_digitata_forest_fire.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "SPS (Pólipos Pequenos)"
  },
  {
    "id": "94",
    "name": "Coral Montipora Digitata Red (Montipora digitata)",
    "commonName": "Coral Montipora Digitata Red",
    "scientificName": "Montipora digitata",
    "synonyms": [
      "Coral Montipora Digitata Red",
      "Coral Montipora Digitata Red (Montipora digitata)",
      "montipora-digitata-red.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "SPS (Pólipos Pequenos)"
  },
  {
    "id": "95",
    "name": "Coral Montipora Incrustante Superman (Montipora tuberculosa)",
    "commonName": "Coral Montipora Incrustante Superman",
    "scientificName": "Montipora tuberculosa",
    "synonyms": [
      "Coral Montipora Incrustante Superman",
      "Coral Montipora Incrustante Superman (Montipora tuberculosa)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "064_montipora_superman_incrustante.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "SPS (Pólipos Pequenos)"
  },
  {
    "id": "96",
    "name": "Coral Montipora Incrustante Sunset (Montipora danae)",
    "commonName": "Coral Montipora Incrustante Sunset",
    "scientificName": "Montipora danae",
    "synonyms": [
      "Coral Montipora Incrustante Sunset",
      "Coral Montipora Incrustante Sunset (Montipora danae)",
      "montipora-sunset.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "montipora-sunset.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "SPS (Pólipos Pequenos)"
  },
  {
    "id": "97",
    "name": "Stylophora Milka (Roxa)",
    "commonName": "Stylophora Milka",
    "scientificName": "Roxa",
    "synonyms": [
      "Stylophora Milka",
      "Stylophora Milka (Roxa)",
      "stylophora milka",
      "milka",
      "stylophora roxa"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "065_stylophora_milka.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "98",
    "name": "Seriatopora Hystrix (Birdsnest Rosa)",
    "commonName": "Seriatopora Hystrix",
    "scientificName": "Birdsnest Rosa",
    "synonyms": [
      "Seriatopora Hystrix",
      "Seriatopora Hystrix (Birdsnest Rosa)",
      "seriatopora hystrix",
      "birdsnest",
      "ninho de passaro"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "066_seriatopora_hystrix_pink.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "SPS (Pólipos Pequenos)"
  },
  {
    "id": "99",
    "name": "Coral Seriatopora Caliendrum Verde (Seriatopora caliendrum)",
    "commonName": "Coral Seriatopora Caliendrum Verde",
    "scientificName": "Seriatopora caliendrum",
    "synonyms": [
      "Coral Seriatopora Caliendrum Verde",
      "Coral Seriatopora Caliendrum Verde (Seriatopora caliendrum)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "067_seriatopora_caliendrum_green.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "SPS (Pólipos Pequenos)"
  },
  {
    "id": "100",
    "name": "Coral Seriatopora Caliendrum Bicolor (Seriatopora caliendrum)",
    "commonName": "Coral Seriatopora Caliendrum Bicolor",
    "scientificName": "Seriatopora caliendrum",
    "synonyms": [
      "Coral Seriatopora Caliendrum Bicolor",
      "Coral Seriatopora Caliendrum Bicolor (Seriatopora caliendrum)",
      "seriatopora-caliendrum-bicolor.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "SPS (Pólipos Pequenos)"
  },
  {
    "id": "101",
    "name": "Coral Acropora Green Slimer (Acropora yongei)",
    "commonName": "Coral Acropora Green Slimer",
    "scientificName": "Acropora yongei",
    "synonyms": [
      "Coral Acropora Green Slimer",
      "Coral Acropora Green Slimer (Acropora yongei)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "068_acropora_bali_slimer_valida.png",
    "section": "Corais & Anêmonas",
    "familyGroup": "SPS (Pólipos Pequenos)"
  },
  {
    "id": "102",
    "name": "Coral Acropora Valida Tricolor (Acropora valida)",
    "commonName": "Coral Acropora Valida Tricolor",
    "scientificName": "Acropora valida",
    "synonyms": [
      "Coral Acropora Valida Tricolor",
      "Coral Acropora Valida Tricolor (Acropora valida)",
      "acropora-valida.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "acropora-valida.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "SPS (Pólipos Pequenos)"
  },
  {
    "id": "103",
    "name": "Coral Acropora Millepora Azul (Acropora millepora)",
    "commonName": "Coral Acropora Millepora Azul",
    "scientificName": "Acropora millepora",
    "synonyms": [
      "Coral Acropora Millepora Azul",
      "Coral Acropora Millepora Azul (Acropora millepora)",
      "acropora-millepora-blue.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "acropora-millepora-blue.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "SPS (Pólipos Pequenos)"
  },
  {
    "id": "104",
    "name": "Ocellaris Comum (Peixe-Palhaço Laranja)",
    "commonName": "Ocellaris Comum",
    "scientificName": "Peixe-Palhaço Laranja",
    "synonyms": [
      "Ocellaris Comum",
      "Ocellaris Comum (Peixe-Palhaço Laranja)",
      "ocellaris",
      "peixe palhaco",
      "nemo",
      "percula"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "069_ocellaris_comum.webp",
    "section": "Peixes Marinhos",
    "familyGroup": "Palhaços (Amphiprioninae)"
  },
  {
    "id": "105",
    "name": "Ocellaris Black (Darwin)",
    "commonName": "Ocellaris Black",
    "scientificName": "Darwin",
    "synonyms": [
      "Ocellaris Black",
      "Ocellaris Black (Darwin)",
      "ocellaris black",
      "nemo preto",
      "black darwin"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "070_ocellaris_black_darwin.webp",
    "section": "Peixes Marinhos",
    "familyGroup": "Palhaços (Amphiprioninae)"
  },
  {
    "id": "106",
    "name": "Peixe-palhaço Snowflake (Amphiprion ocellaris)",
    "commonName": "Peixe-palhaço Snowflake",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Peixe-palhaço Snowflake",
      "Peixe-palhaço Snowflake (Amphiprion ocellaris)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "071_ocellaris_snowflake.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Palhaços (Amphiprioninae)"
  },
  {
    "id": "107",
    "name": "Peixe-palhaço Black Snowflake (Amphiprion ocellaris)",
    "commonName": "Peixe-palhaço Black Snowflake",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Peixe-palhaço Black Snowflake",
      "Peixe-palhaço Black Snowflake (Amphiprion ocellaris)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "072_ocellaris_black_snowflake.png",
    "section": "Peixes Marinhos",
    "familyGroup": "Palhaços (Amphiprioninae)"
  },
  {
    "id": "108",
    "name": "Peixe-palhaço Black Ice (Amphiprion ocellaris)",
    "commonName": "Peixe-palhaço Black Ice",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Peixe-palhaço Black Ice",
      "Peixe-palhaço Black Ice (Amphiprion ocellaris)",
      "palhaco-black-ice.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-black-ice.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Palhaços (Amphiprioninae)"
  },
  {
    "id": "109",
    "name": "Peixe-palhaço Picasso (Amphiprion percula)",
    "commonName": "Peixe-palhaço Picasso",
    "scientificName": "Amphiprion percula",
    "synonyms": [
      "Peixe-palhaço Picasso",
      "Peixe-palhaço Picasso (Amphiprion percula)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "073_ocellaris_picasso_davinci.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Palhaços (Amphiprioninae)"
  },
  {
    "id": "110",
    "name": "Peixe-palhaço DaVinci (Amphiprion ocellaris)",
    "commonName": "Peixe-palhaço DaVinci",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Peixe-palhaço DaVinci",
      "Peixe-palhaço DaVinci (Amphiprion ocellaris)",
      "palhaco-davinci.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "",
    "section": "Peixes Marinhos",
    "familyGroup": "Palhaços (Amphiprioninae)"
  },
  {
    "id": "111",
    "name": "Peixe-palhaço Gladiator (Amphiprion ocellaris)",
    "commonName": "Peixe-palhaço Gladiator",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Peixe-palhaço Gladiator",
      "Peixe-palhaço Gladiator (Amphiprion ocellaris)",
      "palhaco-black-gladiator.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-black-gladiator.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Palhaços (Amphiprioninae)"
  },
  {
    "id": "112",
    "name": "Peixe-palhaço Frostbite (Amphiprion ocellaris)",
    "commonName": "Peixe-palhaço Frostbite",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Peixe-palhaço Frostbite",
      "Peixe-palhaço Frostbite (Amphiprion ocellaris)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "074_ocellaris_frostbite_flurry.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Palhaços (Amphiprioninae)"
  },
  {
    "id": "113",
    "name": "Peixe-palhaço Flurry (Amphiprion ocellaris)",
    "commonName": "Peixe-palhaço Flurry",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Peixe-palhaço Flurry",
      "Peixe-palhaço Flurry (Amphiprion ocellaris)",
      "palhaco-flurry.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-flurry.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Palhaços (Amphiprioninae)"
  },
  {
    "id": "114",
    "name": "Peixe-palhaço Orange Storm (Amphiprion ocellaris)",
    "commonName": "Peixe-palhaço Orange Storm",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Peixe-palhaço Orange Storm",
      "Peixe-palhaço Orange Storm (Amphiprion ocellaris)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "075_ocellaris_storm.webp",
    "section": "Peixes Marinhos",
    "familyGroup": "Palhaços (Amphiprioninae)"
  },
  {
    "id": "115",
    "name": "Peixe-palhaço Black Storm (Amphiprion ocellaris)",
    "commonName": "Peixe-palhaço Black Storm",
    "scientificName": "Amphiprion ocellaris",
    "synonyms": [
      "Peixe-palhaço Black Storm",
      "Peixe-palhaço Black Storm (Amphiprion ocellaris)",
      "palhaco-black-storm.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-black-storm.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Palhaços (Amphiprioninae)"
  },
  {
    "id": "116",
    "name": "Blue Tang (Paracanthurus hepatus)",
    "commonName": "Blue Tang",
    "scientificName": "Paracanthurus hepatus",
    "synonyms": [
      "Blue Tang",
      "Blue Tang (Paracanthurus hepatus)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "076_blue_tang_hepatus.webp",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões (Acanthuridae)"
  },
  {
    "id": "117",
    "name": "Yellow Tang (Zebrasoma flavescens)",
    "commonName": "Yellow Tang",
    "scientificName": "Zebrasoma flavescens",
    "synonyms": [
      "Yellow Tang",
      "Yellow Tang (Zebrasoma flavescens)",
      "yellow tang",
      "tang amarelo",
      "zebrasoma"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "077_yellow_tang.webp",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões (Acanthuridae)"
  },
  {
    "id": "118",
    "name": "Sailfin Tang (Zebrasoma veliferum)",
    "commonName": "Sailfin Tang",
    "scientificName": "Zebrasoma veliferum",
    "synonyms": [
      "Sailfin Tang",
      "Sailfin Tang (Zebrasoma veliferum)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "078_sailfin_scopas_tang.webp",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões (Acanthuridae)"
  },
  {
    "id": "119",
    "name": "Scopas Tang (Zebrasoma scopas)",
    "commonName": "Scopas Tang",
    "scientificName": "Zebrasoma scopas",
    "synonyms": [
      "Scopas Tang",
      "Scopas Tang (Zebrasoma scopas)",
      "tang-scopas.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "tang-scopas.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões (Acanthuridae)"
  },
  {
    "id": "120",
    "name": "Powder Blue Tang (Acanthurus leucosternon)",
    "commonName": "Powder Blue Tang",
    "scientificName": "Acanthurus leucosternon",
    "synonyms": [
      "Powder Blue Tang",
      "Powder Blue Tang (Acanthurus leucosternon)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "079_powder_blue_naso_tang.webp",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões (Acanthuridae)"
  },
  {
    "id": "121",
    "name": "Naso Tang (Naso lituratus)",
    "commonName": "Naso Tang",
    "scientificName": "Naso lituratus",
    "synonyms": [
      "Naso Tang",
      "Naso Tang (Naso lituratus)",
      "tang-naso-elegans.jpg",
      "tang-naso.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "tang-naso-elegans.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões (Acanthuridae)"
  },
  {
    "id": "122",
    "name": "Royal Gramma (Gramma loreto)",
    "commonName": "Royal Gramma",
    "scientificName": "Gramma loreto",
    "synonyms": [
      "Royal Gramma",
      "Royal Gramma (Gramma loreto)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "080_royal_gramma.webp",
    "section": "Peixes Marinhos",
    "familyGroup": "Geral"
  },
  {
    "id": "123",
    "name": "Gramma Brasileiro (Gramma brasiliensis)",
    "commonName": "Gramma Brasileiro",
    "scientificName": "Gramma brasiliensis",
    "synonyms": [
      "Gramma Brasileiro",
      "Gramma Brasileiro (Gramma brasiliensis)",
      "gramma-brasileiro.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "gramma-brasileiro.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Geral"
  },
  {
    "id": "124",
    "name": "Firefish Comum (Nemateleotris magnifica)",
    "commonName": "Firefish Comum",
    "scientificName": "Nemateleotris magnifica",
    "synonyms": [
      "Firefish Comum",
      "Firefish Comum (Nemateleotris magnifica)",
      "firefish",
      "nemateleotris",
      "fire fish"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "",
    "section": "Peixes Marinhos",
    "familyGroup": "Geral"
  },
  {
    "id": "125",
    "name": "Firefish Purple",
    "commonName": "Firefish Purple",
    "scientificName": "Firefish Purple",
    "synonyms": [
      "Firefish Purple",
      "Firefish Purple",
      "purple firefish",
      "firefish roxo",
      "decora"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "",
    "section": "Peixes Marinhos",
    "familyGroup": "Geral"
  },
  {
    "id": "126",
    "name": "Six Line Wrasse (Pseudocheilinus hexataenia)",
    "commonName": "Six Line Wrasse",
    "scientificName": "Pseudocheilinus hexataenia",
    "synonyms": [
      "Six Line Wrasse",
      "Six Line Wrasse (Pseudocheilinus hexataenia)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "083_six_line_wrasse.webp",
    "section": "Peixes Marinhos",
    "familyGroup": "Bodiões e Wrasses (Labridae)"
  },
  {
    "id": "127",
    "name": "Yellow Coris Wrasse (Halichoeres chrysus)",
    "commonName": "Yellow Coris Wrasse",
    "scientificName": "Halichoeres chrysus",
    "synonyms": [
      "Yellow Coris Wrasse",
      "Yellow Coris Wrasse (Halichoeres chrysus)",
      "wrasse-yellow-coris.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "wrasse-yellow-coris.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Bodiões e Wrasses (Labridae)"
  },
  {
    "id": "128",
    "name": "Donzelas (Kupang, Green Chromis, Yellow Tail)",
    "commonName": "Donzelas",
    "scientificName": "Kupang, Green Chromis, Yellow Tail",
    "synonyms": [
      "Donzelas",
      "Donzelas (Kupang, Green Chromis, Yellow Tail)",
      "kupang",
      "green chromis",
      "yellow tail damsel"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "",
    "section": "Peixes Marinhos",
    "familyGroup": "Geral"
  },
  {
    "id": "129",
    "name": "Goby Yellow Watchman (Cryptocentrus cinctus)",
    "commonName": "Goby Yellow Watchman",
    "scientificName": "Cryptocentrus cinctus",
    "synonyms": [
      "Goby Yellow Watchman",
      "Goby Yellow Watchman (Cryptocentrus cinctus)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "085_gobies_blennies_watchman.webp",
    "section": "Peixes Marinhos",
    "familyGroup": "Gobies e Blênios"
  },
  {
    "id": "130",
    "name": "Blênio Bicolor (Ecsenius bicolor)",
    "commonName": "Blênio Bicolor",
    "scientificName": "Ecsenius bicolor",
    "synonyms": [
      "Blênio Bicolor",
      "Blênio Bicolor (Ecsenius bicolor)",
      "blenio-bicolor.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "blenio-bicolor.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Gobies e Blênios"
  },
  {
    "id": "131",
    "name": "Blênio Midas (Ecsenius midas)",
    "commonName": "Blênio Midas",
    "scientificName": "Ecsenius midas",
    "synonyms": [
      "Blênio Midas",
      "Blênio Midas (Ecsenius midas)",
      "blenio-midas.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "blenio-midas.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Gobies e Blênios"
  },
  {
    "id": "132",
    "name": "Peixe Mandarim (Synchiropus splendidus)",
    "commonName": "Peixe Mandarim",
    "scientificName": "Synchiropus splendidus",
    "synonyms": [
      "Peixe Mandarim",
      "Peixe Mandarim (Synchiropus splendidus)",
      "mandarim",
      "synchiropus",
      "green mandarin"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "086_peixe_mandarim.webp",
    "section": "Peixes Marinhos",
    "familyGroup": "Geral"
  },
  {
    "id": "133",
    "name": "Cardinal Banggai (Pterapogon kauderni)",
    "commonName": "Cardinal Banggai",
    "scientificName": "Pterapogon kauderni",
    "synonyms": [
      "Cardinal Banggai",
      "Cardinal Banggai (Pterapogon kauderni)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "087_cardinal_banggai_pijama.webp",
    "section": "Peixes Marinhos",
    "familyGroup": "Geral"
  },
  {
    "id": "134",
    "name": "Cardinal Pijama (Sphaeramia nematoptera)",
    "commonName": "Cardinal Pijama",
    "scientificName": "Sphaeramia nematoptera",
    "synonyms": [
      "Cardinal Pijama",
      "Cardinal Pijama (Sphaeramia nematoptera)",
      "cardinal-pijama.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "cardinal-pijama.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Geral"
  },
  {
    "id": "135",
    "name": "Flame Angel (Centropyge loricula)",
    "commonName": "Flame Angel",
    "scientificName": "Centropyge loricula",
    "synonyms": [
      "Flame Angel",
      "Flame Angel (Centropyge loricula)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "088_anjos_anoes_flame_coral_beauty.webp",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Anjo (Pomacanthidae)"
  },
  {
    "id": "136",
    "name": "Coral Beauty (Centropyge bispinosa)",
    "commonName": "Coral Beauty",
    "scientificName": "Centropyge bispinosa",
    "synonyms": [
      "Coral Beauty",
      "Coral Beauty (Centropyge bispinosa)",
      "anjo-coral-beauty.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "anjo-coral-beauty.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Geral"
  },
  {
    "id": "137",
    "name": "Camarão Limpador Cleaner (Lysmata amboinensis)",
    "commonName": "Camarão Limpador Cleaner",
    "scientificName": "Lysmata amboinensis",
    "synonyms": [
      "Camarão Limpador Cleaner",
      "Camarão Limpador Cleaner (Lysmata amboinensis)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_INVERTEBRATE",
    "imageSlug": "089_camaroes_cleaner_bailarino.webp",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Equipe de Limpeza & Invertebrados"
  },
  {
    "id": "138",
    "name": "Camarão Bailarino (Lysmata boggessi)",
    "commonName": "Camarão Bailarino",
    "scientificName": "Lysmata boggessi",
    "synonyms": [
      "Camarão Bailarino",
      "Camarão Bailarino (Lysmata boggessi)",
      "camarao-bailarino.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_INVERTEBRATE",
    "imageSlug": "camarao-bailarino.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Equipe de Limpeza & Invertebrados"
  },
  {
    "id": "139",
    "name": "Camarão Blood Fire (Lysmata debelius)",
    "commonName": "Camarão Blood Fire",
    "scientificName": "Lysmata debelius",
    "synonyms": [
      "Camarão Blood Fire",
      "Camarão Blood Fire (Lysmata debelius)",
      "camarao-blood.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_INVERTEBRATE",
    "imageSlug": "camarao-blood.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Equipe de Limpeza & Invertebrados"
  },
  {
    "id": "140",
    "name": "Mini Paguro Patas Amarelas (Clibanarius tricolor)",
    "commonName": "Mini Paguro Patas Amarelas",
    "scientificName": "Clibanarius tricolor",
    "synonyms": [
      "Mini Paguro Patas Amarelas",
      "Mini Paguro Patas Amarelas (Clibanarius tricolor)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_INVERTEBRATE",
    "imageSlug": "090_equipe_limpeza_paguro_snail.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Equipe de Limpeza & Invertebrados"
  },
  {
    "id": "141",
    "name": "Caracol Turbo Snail (Turbo fluctuosus)",
    "commonName": "Caracol Turbo Snail",
    "scientificName": "Turbo fluctuosus",
    "synonyms": [
      "Caracol Turbo Snail",
      "Caracol Turbo Snail (Turbo fluctuosus)",
      "turbo-snail.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_INVERTEBRATE",
    "imageSlug": "turbo-snail.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Geral"
  },
  {
    "id": "142",
    "name": "Caracol Nassarius (Nassarius vibex)",
    "commonName": "Caracol Nassarius",
    "scientificName": "Nassarius vibex",
    "synonyms": [
      "Caracol Nassarius",
      "Caracol Nassarius (Nassarius vibex)",
      "caracol-nassarius.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_INVERTEBRATE",
    "imageSlug": "",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Geral"
  },
  {
    "id": "143",
    "name": "Guppy Moscou Full Black (Poecilia reticulata)",
    "commonName": "Guppy Moscou Full Black",
    "scientificName": "Poecilia reticulata",
    "synonyms": [
      "Guppy Moscou Full Black",
      "Guppy Moscou Full Black (Poecilia reticulata)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "091_guppy_moscou_full_black.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "144",
    "name": "Guppy Moscou Blue (Poecilia reticulata)",
    "commonName": "Guppy Moscou Blue",
    "scientificName": "Poecilia reticulata",
    "synonyms": [
      "Guppy Moscou Blue",
      "Guppy Moscou Blue (Poecilia reticulata)",
      "guppy-moscou-blue.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "145",
    "name": "Guppy Tuxedo Half Black Red (Poecilia reticulata)",
    "commonName": "Guppy Tuxedo Half Black Red",
    "scientificName": "Poecilia reticulata",
    "synonyms": [
      "Guppy Tuxedo Half Black Red",
      "Guppy Tuxedo Half Black Red (Poecilia reticulata)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "092_guppy_tuxedo_half_black.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "146",
    "name": "Guppy Tuxedo Yellow (Poecilia reticulata)",
    "commonName": "Guppy Tuxedo Yellow",
    "scientificName": "Poecilia reticulata",
    "synonyms": [
      "Guppy Tuxedo Yellow",
      "Guppy Tuxedo Yellow (Poecilia reticulata)",
      "guppy-tuxedo-yellow.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "147",
    "name": "Guppy King Cobra (Poecilia reticulata)",
    "commonName": "Guppy King Cobra",
    "scientificName": "Poecilia reticulata",
    "synonyms": [
      "Guppy King Cobra",
      "Guppy King Cobra (Poecilia reticulata)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "093_guppy_cobra_snakeskin.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "148",
    "name": "Guppy Snakeskin Verde (Poecilia reticulata)",
    "commonName": "Guppy Snakeskin Verde",
    "scientificName": "Poecilia reticulata",
    "synonyms": [
      "Guppy Snakeskin Verde",
      "Guppy Snakeskin Verde (Poecilia reticulata)",
      "guppy-snakeskin-green.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "149",
    "name": "Guppy Dumbo Big Ear (Poecilia reticulata)",
    "commonName": "Guppy Dumbo Big Ear",
    "scientificName": "Poecilia reticulata",
    "synonyms": [
      "Guppy Dumbo Big Ear",
      "Guppy Dumbo Big Ear (Poecilia reticulata)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "094_guppy_dumbo_mosaico.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "150",
    "name": "Guppy Mosaico Red (Poecilia reticulata)",
    "commonName": "Guppy Mosaico Red",
    "scientificName": "Poecilia reticulata",
    "synonyms": [
      "Guppy Mosaico Red",
      "Guppy Mosaico Red (Poecilia reticulata)",
      "guppy-mosaico-red.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "151",
    "name": "Guppy Full Red Albino",
    "commonName": "Guppy Full Red Albino",
    "scientificName": "Guppy Full Red Albino",
    "synonyms": [
      "Guppy Full Red Albino",
      "Guppy Full Red Albino",
      "guppy full red",
      "lebiste vermelho",
      "albino red"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "095_guppy_full_red_albino.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "152",
    "name": "Guppy Endler Black Bar (Poecilia wingei)",
    "commonName": "Guppy Endler Black Bar",
    "scientificName": "Poecilia wingei",
    "synonyms": [
      "Guppy Endler Black Bar",
      "Guppy Endler Black Bar (Poecilia wingei)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "096_guppy_endler_black_bar.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "153",
    "name": "Guppy Endler Tiger (Poecilia wingei)",
    "commonName": "Guppy Endler Tiger",
    "scientificName": "Poecilia wingei",
    "synonyms": [
      "Guppy Endler Tiger",
      "Guppy Endler Tiger (Poecilia wingei)",
      "guppy-endler-tiger.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "154",
    "name": "Guppy Endler Red Scarlet (Poecilia wingei)",
    "commonName": "Guppy Endler Red Scarlet",
    "scientificName": "Poecilia wingei",
    "synonyms": [
      "Guppy Endler Red Scarlet",
      "Guppy Endler Red Scarlet (Poecilia wingei)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "097_guppy_endler_red.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "155",
    "name": "Betta Veiltail (Cauda de Véu)",
    "commonName": "Betta Veiltail",
    "scientificName": "Cauda de Véu",
    "synonyms": [
      "Betta Veiltail",
      "Betta Veiltail (Cauda de Véu)",
      "betta comum",
      "betta veu",
      "veiltail",
      "betta macho"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "098_betta_veiltail.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Bettas & Anabantídeos"
  },
  {
    "id": "156",
    "name": "Betta Halfmoon (Meia-Lua 180°)",
    "commonName": "Betta Halfmoon",
    "scientificName": "Meia-Lua 180°",
    "synonyms": [
      "Betta Halfmoon",
      "Betta Halfmoon (Meia-Lua 180°)",
      "betta halfmoon",
      "betta hm",
      "meia lua"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "099_betta_halfmoon.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Bettas & Anabantídeos"
  },
  {
    "id": "157",
    "name": "Betta Plakat Koi Galaxy (Betta splendens)",
    "commonName": "Betta Plakat Koi Galaxy",
    "scientificName": "Betta splendens",
    "synonyms": [
      "Betta Plakat Koi Galaxy",
      "Betta Plakat Koi Galaxy (Betta splendens)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "100_betta_plakat_koi_nemo.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Bettas & Anabantídeos"
  },
  {
    "id": "158",
    "name": "Betta Plakat Candy Nemo (Betta splendens)",
    "commonName": "Betta Plakat Candy Nemo",
    "scientificName": "Betta splendens",
    "synonyms": [
      "Betta Plakat Candy Nemo",
      "Betta Plakat Candy Nemo (Betta splendens)",
      "betta-plakat-candy-nemo.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Bettas & Anabantídeos"
  },
  {
    "id": "159",
    "name": "Betta Dumbo (Big Ear)",
    "commonName": "Betta Dumbo",
    "scientificName": "Big Ear",
    "synonyms": [
      "Betta Dumbo",
      "Betta Dumbo (Big Ear)",
      "betta dumbo",
      "betta orelha de elefante"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "101_betta_dumbo.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Bettas & Anabantídeos"
  },
  {
    "id": "160",
    "name": "Betta Crowntail (Cauda de Coroa)",
    "commonName": "Betta Crowntail",
    "scientificName": "Cauda de Coroa",
    "synonyms": [
      "Betta Crowntail",
      "Betta Crowntail (Cauda de Coroa)",
      "betta crowntail",
      "betta coroa"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "102_betta_crowntail.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Bettas & Anabantídeos"
  },
  {
    "id": "161",
    "name": "Betta Fêmea Comum (Betta splendens)",
    "commonName": "Betta Fêmea Comum",
    "scientificName": "Betta splendens",
    "synonyms": [
      "Betta Fêmea Comum",
      "Betta Fêmea Comum (Betta splendens)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "103_betta_femea.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Bettas & Anabantídeos"
  },
  {
    "id": "162",
    "name": "Plati Mickey Mouse (Xiphophorus maculatus)",
    "commonName": "Plati Mickey Mouse",
    "scientificName": "Xiphophorus maculatus",
    "synonyms": [
      "Plati Mickey Mouse",
      "Plati Mickey Mouse (Xiphophorus maculatus)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "104_plati_mickey.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "163",
    "name": "Plati Aurora (Xiphophorus maculatus)",
    "commonName": "Plati Aurora",
    "scientificName": "Xiphophorus maculatus",
    "synonyms": [
      "Plati Aurora",
      "Plati Aurora (Xiphophorus maculatus)",
      "plati-aurora.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "164",
    "name": "Plati Wagtail Red (Xiphophorus maculatus)",
    "commonName": "Plati Wagtail Red",
    "scientificName": "Xiphophorus maculatus",
    "synonyms": [
      "Plati Wagtail Red",
      "Plati Wagtail Red (Xiphophorus maculatus)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "105_plati_wagtail_sangue.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "165",
    "name": "Plati Sangue Coral (Xiphophorus maculatus)",
    "commonName": "Plati Sangue Coral",
    "scientificName": "Xiphophorus maculatus",
    "synonyms": [
      "Plati Sangue Coral",
      "Plati Sangue Coral (Xiphophorus maculatus)",
      "plati-vermelho-sangue.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "166",
    "name": "Plati Balão Red (Xiphophorus maculatus var. Balão)",
    "commonName": "Plati Balão Red",
    "scientificName": "Xiphophorus maculatus var. Balão",
    "synonyms": [
      "Plati Balão Red",
      "Plati Balão Red (Xiphophorus maculatus var. Balão)",
      "plati-balao.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "167",
    "name": "Espada Sangue Vermelho (Xiphophorus hellerii)",
    "commonName": "Espada Sangue Vermelho",
    "scientificName": "Xiphophorus hellerii",
    "synonyms": [
      "Espada Sangue Vermelho",
      "Espada Sangue Vermelho (Xiphophorus hellerii)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "106_espada_sangue.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "168",
    "name": "Espada Lira Vermelho (Xiphophorus hellerii var. Lyretail)",
    "commonName": "Espada Lira Vermelho",
    "scientificName": "Xiphophorus hellerii var. Lyretail",
    "synonyms": [
      "Espada Lira Vermelho",
      "Espada Lira Vermelho (Xiphophorus hellerii var. Lyretail)",
      "espada-lira.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "169",
    "name": "Espada Kohaku Koi (Xiphophorus hellerii)",
    "commonName": "Espada Kohaku Koi",
    "scientificName": "Xiphophorus hellerii",
    "synonyms": [
      "Espada Kohaku Koi",
      "Espada Kohaku Koi (Xiphophorus hellerii)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "107_espada_kohaku_koi.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "170",
    "name": "Espada Verde Selvagem (Xiphophorus hellerii)",
    "commonName": "Espada Verde Selvagem",
    "scientificName": "Xiphophorus hellerii",
    "synonyms": [
      "Espada Verde Selvagem",
      "Espada Verde Selvagem (Xiphophorus hellerii)",
      "espada-verde.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "171",
    "name": "Espada Preto Tuxedo (Xiphophorus hellerii)",
    "commonName": "Espada Preto Tuxedo",
    "scientificName": "Xiphophorus hellerii",
    "synonyms": [
      "Espada Preto Tuxedo",
      "Espada Preto Tuxedo (Xiphophorus hellerii)",
      "espada-preto.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "172",
    "name": "Molinésia Negra (Poecilia sphenops)",
    "commonName": "Molinésia Negra",
    "scientificName": "Poecilia sphenops",
    "synonyms": [
      "Molinésia Negra",
      "Molinésia Negra (Poecilia sphenops)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "108_molinesia_negra_lira.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "173",
    "name": "Molinésia Negra Lira (Poecilia sphenops var. Lyretail)",
    "commonName": "Molinésia Negra Lira",
    "scientificName": "Poecilia sphenops var. Lyretail",
    "synonyms": [
      "Molinésia Negra Lira",
      "Molinésia Negra Lira (Poecilia sphenops var. Lyretail)",
      "molinesia-negra-lira.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "174",
    "name": "Molinésia Dálmata (Poecilia sphenops)",
    "commonName": "Molinésia Dálmata",
    "scientificName": "Poecilia sphenops",
    "synonyms": [
      "Molinésia Dálmata",
      "Molinésia Dálmata (Poecilia sphenops)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "109_molinesia_dalmata.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "175",
    "name": "Molinésia Ouro (Poecilia sphenops)",
    "commonName": "Molinésia Ouro",
    "scientificName": "Poecilia sphenops",
    "synonyms": [
      "Molinésia Ouro",
      "Molinésia Ouro (Poecilia sphenops)",
      "molinesia-ouro.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "176",
    "name": "Molinésia Balão (Poecilia sphenops var. Balão)",
    "commonName": "Molinésia Balão",
    "scientificName": "Poecilia sphenops var. Balão",
    "synonyms": [
      "Molinésia Balão",
      "Molinésia Balão (Poecilia sphenops var. Balão)",
      "molinesia-balao.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "177",
    "name": "Colisa Lália Clássica (Trichogaster lalius)",
    "commonName": "Colisa Lália Clássica",
    "scientificName": "Trichogaster lalius",
    "synonyms": [
      "Colisa Lália Clássica",
      "Colisa Lália Clássica (Trichogaster lalius)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "110_colisa_lalia_sangue_azul.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "178",
    "name": "Colisa Sangue Red (Trichogaster lalius var. Red)",
    "commonName": "Colisa Sangue Red",
    "scientificName": "Trichogaster lalius var. Red",
    "synonyms": [
      "Colisa Sangue Red",
      "Colisa Sangue Red (Trichogaster lalius var. Red)",
      "colisa-sangue.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "179",
    "name": "Colisa Azul Cobalto (Trichogaster lalius var. Cobalt)",
    "commonName": "Colisa Azul Cobalto",
    "scientificName": "Trichogaster lalius var. Cobalt",
    "synonyms": [
      "Colisa Azul Cobalto",
      "Colisa Azul Cobalto (Trichogaster lalius var. Cobalt)",
      "colisa-azul-cobalto.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "180",
    "name": "Colisa Mel (Trichogaster chuna)",
    "commonName": "Colisa Mel",
    "scientificName": "Trichogaster chuna",
    "synonyms": [
      "Colisa Mel",
      "Colisa Mel (Trichogaster chuna)",
      "colisa-chuna-mel.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "181",
    "name": "Tricogaster Pérola Leeri (Trichopodus leerii)",
    "commonName": "Tricogaster Pérola Leeri",
    "scientificName": "Trichopodus leerii",
    "synonyms": [
      "Tricogaster Pérola Leeri",
      "Tricogaster Pérola Leeri (Trichopodus leerii)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "111_tricogaster_perola_azul_ouro.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "182",
    "name": "Tricogaster Azul (Trichopodus trichopterus)",
    "commonName": "Tricogaster Azul",
    "scientificName": "Trichopodus trichopterus",
    "synonyms": [
      "Tricogaster Azul",
      "Tricogaster Azul (Trichopodus trichopterus)",
      "tricogaster-azul.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "tricogaster-azul.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "183",
    "name": "Tricogaster Ouro (Trichopodus trichopterus var. Gold)",
    "commonName": "Tricogaster Ouro",
    "scientificName": "Trichopodus trichopterus var. Gold",
    "synonyms": [
      "Tricogaster Ouro",
      "Tricogaster Ouro (Trichopodus trichopterus var. Gold)",
      "tricogaster-ouro.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "184",
    "name": "Neon Cardinal (Paracheirodon axelrodi)",
    "commonName": "Neon Cardinal",
    "scientificName": "Paracheirodon axelrodi",
    "synonyms": [
      "Neon Cardinal",
      "Neon Cardinal (Paracheirodon axelrodi)",
      "neon cardinal",
      "tetra cardinal",
      "neon"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "112_neon_cardinal.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "185",
    "name": "Neon Innesi (Paracheirodon innesi)",
    "commonName": "Neon Innesi",
    "scientificName": "Paracheirodon innesi",
    "synonyms": [
      "Neon Innesi",
      "Neon Innesi (Paracheirodon innesi)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "113_neon_innesi_verde_negro.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "186",
    "name": "Neon Verde (Paracheirodon simulans)",
    "commonName": "Neon Verde",
    "scientificName": "Paracheirodon simulans",
    "synonyms": [
      "Neon Verde",
      "Neon Verde (Paracheirodon simulans)",
      "neon-verde-simulans.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "187",
    "name": "Neon Negro (Hyphessobrycon herbertaxelrodi)",
    "commonName": "Neon Negro",
    "scientificName": "Hyphessobrycon herbertaxelrodi",
    "synonyms": [
      "Neon Negro",
      "Neon Negro (Hyphessobrycon herbertaxelrodi)",
      "neon-negro.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "188",
    "name": "Tetra Negro Comum (Gymnocorymbus ternetzi)",
    "commonName": "Tetra Negro Comum",
    "scientificName": "Gymnocorymbus ternetzi",
    "synonyms": [
      "Tetra Negro Comum",
      "Tetra Negro Comum (Gymnocorymbus ternetzi)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "114_tetra_negro.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "189",
    "name": "Tetra Negro Véu (Gymnocorymbus ternetzi var. Longfin)",
    "commonName": "Tetra Negro Véu",
    "scientificName": "Gymnocorymbus ternetzi var. Longfin",
    "synonyms": [
      "Tetra Negro Véu",
      "Tetra Negro Véu (Gymnocorymbus ternetzi var. Longfin)",
      "tetra-negro-veu.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "tetra-negro-veu.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "190",
    "name": "Tetra White Skirt (Gymnocorymbus ternetzi var. White)",
    "commonName": "Tetra White Skirt",
    "scientificName": "Gymnocorymbus ternetzi var. White",
    "synonyms": [
      "Tetra White Skirt",
      "Tetra White Skirt (Gymnocorymbus ternetzi var. White)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "115_tetra_white_skirt_color.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "191",
    "name": "Tetra Glow Color (Gymnocorymbus ternetzi var. Glow)",
    "commonName": "Tetra Glow Color",
    "scientificName": "Gymnocorymbus ternetzi var. Glow",
    "synonyms": [
      "Tetra Glow Color",
      "Tetra Glow Color (Gymnocorymbus ternetzi var. Glow)",
      "tetra-glow.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "192",
    "name": "Tetra Mato Grosso (Hyphessobrycon eques)",
    "commonName": "Tetra Mato Grosso",
    "scientificName": "Hyphessobrycon eques",
    "synonyms": [
      "Tetra Mato Grosso",
      "Tetra Mato Grosso (Hyphessobrycon eques)",
      "mato grosso",
      "tetra mato grosso",
      "serpae"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "116_tetra_mato_grosso.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "193",
    "name": "Rodóstomus Nariz-de-Bêbado (Hemigrammus bleheri)",
    "commonName": "Rodóstomus Nariz-de-Bêbado",
    "scientificName": "Hemigrammus bleheri",
    "synonyms": [
      "Rodóstomus Nariz-de-Bêbado",
      "Rodóstomus Nariz-de-Bêbado (Hemigrammus bleheri)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "117_rodostomus_nariz_de_bebado.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "194",
    "name": "Tetra Foguinho (Ember Tetra)",
    "commonName": "Tetra Foguinho",
    "scientificName": "Ember Tetra",
    "synonyms": [
      "Tetra Foguinho",
      "Tetra Foguinho (Ember Tetra)",
      "tetra foguinho",
      "ember tetra",
      "amandae"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "118_tetra_foguinho.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "195",
    "name": "Paulistinha Comum (Danio rerio)",
    "commonName": "Paulistinha Comum",
    "scientificName": "Danio rerio",
    "synonyms": [
      "Paulistinha Comum",
      "Paulistinha Comum (Danio rerio)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "119_paulistinha_danio.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "196",
    "name": "Paulistinha Véu (Danio rerio var. Longfin)",
    "commonName": "Paulistinha Véu",
    "scientificName": "Danio rerio var. Longfin",
    "synonyms": [
      "Paulistinha Véu",
      "Paulistinha Véu (Danio rerio var. Longfin)",
      "paulistinha-veu.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "197",
    "name": "Paulistinha Rosa (Danio rerio var. Rose)",
    "commonName": "Paulistinha Rosa",
    "scientificName": "Danio rerio var. Rose",
    "synonyms": [
      "Paulistinha Rosa",
      "Paulistinha Rosa (Danio rerio var. Rose)",
      "paulistinha-rosa.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "198",
    "name": "Rásbora Arlequim (T. heteromorpha)",
    "commonName": "Rásbora Arlequim",
    "scientificName": "T. heteromorpha",
    "synonyms": [
      "Rásbora Arlequim",
      "Rásbora Arlequim (T. heteromorpha)",
      "rasbora arlequim",
      "harlequin rasbora"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "120_rasbora_arlequim.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "199",
    "name": "Rásbora Galaxy CPD (Danio margaritatus)",
    "commonName": "Rásbora Galaxy CPD",
    "scientificName": "Danio margaritatus",
    "synonyms": [
      "Rásbora Galaxy CPD",
      "Rásbora Galaxy CPD (Danio margaritatus)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "121_rasbora_galaxy_cpd.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "200",
    "name": "Micro Rásbora Esmeralda (Danio erythromicron)",
    "commonName": "Micro Rásbora Esmeralda",
    "scientificName": "Danio erythromicron",
    "synonyms": [
      "Micro Rásbora Esmeralda",
      "Micro Rásbora Esmeralda (Danio erythromicron)",
      "rasbora-erythromicron.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "201",
    "name": "Barbo Sumatra Comum (Puntigrus tetrazona)",
    "commonName": "Barbo Sumatra Comum",
    "scientificName": "Puntigrus tetrazona",
    "synonyms": [
      "Barbo Sumatra Comum",
      "Barbo Sumatra Comum (Puntigrus tetrazona)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "122_barbo_sumatra_tigre.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "202",
    "name": "Barbo Sumatra Verde (Puntigrus tetrazona var. Green)",
    "commonName": "Barbo Sumatra Verde",
    "scientificName": "Puntigrus tetrazona var. Green",
    "synonyms": [
      "Barbo Sumatra Verde",
      "Barbo Sumatra Verde (Puntigrus tetrazona var. Green)",
      "barbo-sumatra-verde.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "203",
    "name": "Barbo Sumatra Albino (Puntigrus tetrazona var. Albino)",
    "commonName": "Barbo Sumatra Albino",
    "scientificName": "Puntigrus tetrazona var. Albino",
    "synonyms": [
      "Barbo Sumatra Albino",
      "Barbo Sumatra Albino (Puntigrus tetrazona var. Albino)",
      "barbo-sumatra-albino.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "204",
    "name": "Barbo Cereja (Desmopuntius titteya)",
    "commonName": "Barbo Cereja",
    "scientificName": "Desmopuntius titteya",
    "synonyms": [
      "Barbo Cereja",
      "Barbo Cereja (Desmopuntius titteya)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "123_barbo_cereja_ouro.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "205",
    "name": "Barbo Ouro (Barbodes semifasciolatus)",
    "commonName": "Barbo Ouro",
    "scientificName": "Barbodes semifasciolatus",
    "synonyms": [
      "Barbo Ouro",
      "Barbo Ouro (Barbodes semifasciolatus)",
      "barbo-ouro.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "206",
    "name": "Acará Bandeira Koi (Pterophyllum scalare var. Koi)",
    "commonName": "Acará Bandeira Koi",
    "scientificName": "Pterophyllum scalare var. Koi",
    "synonyms": [
      "Acará Bandeira Koi",
      "Acará Bandeira Koi (Pterophyllum scalare var. Koi)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "124_acara_bandeira_koi.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "207",
    "name": "Acará Bandeira Orange Marble (Pterophyllum scalare var. Orange Marble)",
    "commonName": "Acará Bandeira Orange Marble",
    "scientificName": "Pterophyllum scalare var. Orange Marble",
    "synonyms": [
      "Acará Bandeira Orange Marble",
      "Acará Bandeira Orange Marble (Pterophyllum scalare var. Orange Marble)",
      "acara-bandeira-orange-marble.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "208",
    "name": "Acará Bandeira Mármore (Pterophyllum scalare var. Marble)",
    "commonName": "Acará Bandeira Mármore",
    "scientificName": "Pterophyllum scalare var. Marble",
    "synonyms": [
      "Acará Bandeira Mármore",
      "Acará Bandeira Mármore (Pterophyllum scalare var. Marble)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "125_acara_bandeira_marmore_zebra.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "209",
    "name": "Acará Bandeira Palhaço (Pterophyllum scalare var. Clown)",
    "commonName": "Acará Bandeira Palhaço",
    "scientificName": "Pterophyllum scalare var. Clown",
    "synonyms": [
      "Acará Bandeira Palhaço",
      "Acará Bandeira Palhaço (Pterophyllum scalare var. Clown)",
      "acara-bandeira-palhaco.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Palhaços (Amphiprioninae)"
  },
  {
    "id": "210",
    "name": "Acará Bandeira Zebra (Pterophyllum scalare var. Zebra)",
    "commonName": "Acará Bandeira Zebra",
    "scientificName": "Pterophyllum scalare var. Zebra",
    "synonyms": [
      "Acará Bandeira Zebra",
      "Acará Bandeira Zebra (Pterophyllum scalare var. Zebra)",
      "acara-bandeira-comum-listrado.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-bandeira-comum-listrado.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "211",
    "name": "Acará Bandeira Black Negro (Pterophyllum scalare var. Black)",
    "commonName": "Acará Bandeira Black Negro",
    "scientificName": "Pterophyllum scalare var. Black",
    "synonyms": [
      "Acará Bandeira Black Negro",
      "Acará Bandeira Black Negro (Pterophyllum scalare var. Black)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "126_acara_bandeira_negro_pinoy.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "212",
    "name": "Acará Bandeira Fumaça (Pterophyllum scalare var. Smoke)",
    "commonName": "Acará Bandeira Fumaça",
    "scientificName": "Pterophyllum scalare var. Smoke",
    "synonyms": [
      "Acará Bandeira Fumaça",
      "Acará Bandeira Fumaça (Pterophyllum scalare var. Smoke)",
      "acara-bandeira-fumaca.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "213",
    "name": "Acará Bandeira Pinoy (Pterophyllum scalare var. Pinoy)",
    "commonName": "Acará Bandeira Pinoy",
    "scientificName": "Pterophyllum scalare var. Pinoy",
    "synonyms": [
      "Acará Bandeira Pinoy",
      "Acará Bandeira Pinoy (Pterophyllum scalare var. Pinoy)",
      "acara-bandeira-pinoy.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "214",
    "name": "Acará Bandeira Ouro (Pterophyllum scalare var. Gold)",
    "commonName": "Acará Bandeira Ouro",
    "scientificName": "Pterophyllum scalare var. Gold",
    "synonyms": [
      "Acará Bandeira Ouro",
      "Acará Bandeira Ouro (Pterophyllum scalare var. Gold)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "127_acara_bandeira_ouro_albino.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "215",
    "name": "Acará Bandeira Platina (Pterophyllum scalare var. Platinum)",
    "commonName": "Acará Bandeira Platina",
    "scientificName": "Pterophyllum scalare var. Platinum",
    "synonyms": [
      "Acará Bandeira Platina",
      "Acará Bandeira Platina (Pterophyllum scalare var. Platinum)",
      "acara-bandeira-platina.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "216",
    "name": "Acará Bandeira Albino (Pterophyllum scalare var. Albino)",
    "commonName": "Acará Bandeira Albino",
    "scientificName": "Pterophyllum scalare var. Albino",
    "synonyms": [
      "Acará Bandeira Albino",
      "Acará Bandeira Albino (Pterophyllum scalare var. Albino)",
      "acara-bandeira-albino.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "217",
    "name": "Acará Disco Azul Turquesa (Symphysodon aequifasciatus var. Turquoise)",
    "commonName": "Acará Disco Azul Turquesa",
    "scientificName": "Symphysodon aequifasciatus var. Turquoise",
    "synonyms": [
      "Acará Disco Azul Turquesa",
      "Acará Disco Azul Turquesa (Symphysodon aequifasciatus var. Turquoise)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "128_acara_disco_azul_turquesa.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "218",
    "name": "Acará Disco Cobalt Blue (Symphysodon aequifasciatus var. Cobalt)",
    "commonName": "Acará Disco Cobalt Blue",
    "scientificName": "Symphysodon aequifasciatus var. Cobalt",
    "synonyms": [
      "Acará Disco Cobalt Blue",
      "Acará Disco Cobalt Blue (Symphysodon aequifasciatus var. Cobalt)",
      "acara-disco-cobalt-blue.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "219",
    "name": "Acará Disco Pigeon Blood (Symphysodon aequifasciatus var. Pigeon Blood)",
    "commonName": "Acará Disco Pigeon Blood",
    "scientificName": "Symphysodon aequifasciatus var. Pigeon Blood",
    "synonyms": [
      "Acará Disco Pigeon Blood",
      "Acará Disco Pigeon Blood (Symphysodon aequifasciatus var. Pigeon Blood)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "129_acara_disco_pigeon_blood.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "220",
    "name": "Acará Disco Red Marlboro (Symphysodon aequifasciatus var. Marlboro)",
    "commonName": "Acará Disco Red Marlboro",
    "scientificName": "Symphysodon aequifasciatus var. Marlboro",
    "synonyms": [
      "Acará Disco Red Marlboro",
      "Acará Disco Red Marlboro (Symphysodon aequifasciatus var. Marlboro)",
      "acara-disco-red-marlboro.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "221",
    "name": "Acará Disco Blue Diamond (Symphysodon aequifasciatus var. Blue Diamond)",
    "commonName": "Acará Disco Blue Diamond",
    "scientificName": "Symphysodon aequifasciatus var. Blue Diamond",
    "synonyms": [
      "Acará Disco Blue Diamond",
      "Acará Disco Blue Diamond (Symphysodon aequifasciatus var. Blue Diamond)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "130_acara_disco_blue_diamond.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "222",
    "name": "Acará Disco White Diamond (Symphysodon aequifasciatus var. White Diamond)",
    "commonName": "Acará Disco White Diamond",
    "scientificName": "Symphysodon aequifasciatus var. White Diamond",
    "synonyms": [
      "Acará Disco White Diamond",
      "Acará Disco White Diamond (Symphysodon aequifasciatus var. White Diamond)",
      "acara-disco-white-diamond.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "223",
    "name": "Acará Disco Selvagem Heckel (Symphysodon discus)",
    "commonName": "Acará Disco Selvagem Heckel",
    "scientificName": "Symphysodon discus",
    "synonyms": [
      "Acará Disco Selvagem Heckel",
      "Acará Disco Selvagem Heckel (Symphysodon discus)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "131_acara_disco_selvagem.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "224",
    "name": "Acará Disco Selvagem Verde Tefé (Symphysodon tarzoo)",
    "commonName": "Acará Disco Selvagem Verde Tefé",
    "scientificName": "Symphysodon tarzoo",
    "synonyms": [
      "Acará Disco Selvagem Verde Tefé",
      "Acará Disco Selvagem Verde Tefé (Symphysodon tarzoo)",
      "acara-disco-selvagem-verde.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-disco-selvagem-verde.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "225",
    "name": "Acará Disco Selvagem Azul (Symphysodon aequifasciatus)",
    "commonName": "Acará Disco Selvagem Azul",
    "scientificName": "Symphysodon aequifasciatus",
    "synonyms": [
      "Acará Disco Selvagem Azul",
      "Acará Disco Selvagem Azul (Symphysodon aequifasciatus)",
      "acara-disco-selvagem-azul.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-disco-selvagem-azul.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "226",
    "name": "Ramirezi Comum (Mikrogeophagus ramirezi)",
    "commonName": "Ramirezi Comum",
    "scientificName": "Mikrogeophagus ramirezi",
    "synonyms": [
      "Ramirezi Comum",
      "Ramirezi Comum (Mikrogeophagus ramirezi)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "132_ramirezi_comum_alemao.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "227",
    "name": "Ramirezi Ouro (Mikrogeophagus ramirezi var. Gold)",
    "commonName": "Ramirezi Ouro",
    "scientificName": "Mikrogeophagus ramirezi var. Gold",
    "synonyms": [
      "Ramirezi Ouro",
      "Ramirezi Ouro (Mikrogeophagus ramirezi var. Gold)",
      "ramirezi-ouro.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ramirezi-ouro.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "228",
    "name": "Ramirezi Electric Blue (Mikrogeophagus ramirezi var. Electric Blue)",
    "commonName": "Ramirezi Electric Blue",
    "scientificName": "Mikrogeophagus ramirezi var. Electric Blue",
    "synonyms": [
      "Ramirezi Electric Blue",
      "Ramirezi Electric Blue (Mikrogeophagus ramirezi var. Electric Blue)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "133_ramirezi_electric_blue.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "229",
    "name": "Ramirezi Black German (Mikrogeophagus ramirezi var. Black)",
    "commonName": "Ramirezi Black German",
    "scientificName": "Mikrogeophagus ramirezi var. Black",
    "synonyms": [
      "Ramirezi Black German",
      "Ramirezi Black German (Mikrogeophagus ramirezi var. Black)",
      "ramirezi-black.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ramirezi-black.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "230",
    "name": "Apistogramma Cacatuoides Double Red (Apistogramma cacatuoides)",
    "commonName": "Apistogramma Cacatuoides Double Red",
    "scientificName": "Apistogramma cacatuoides",
    "synonyms": [
      "Apistogramma Cacatuoides Double Red",
      "Apistogramma Cacatuoides Double Red (Apistogramma cacatuoides)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "134_apistogramma_cacatuoides_agassizii.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "231",
    "name": "Apistogramma Agassizii Fire Red (Apistogramma agassizii)",
    "commonName": "Apistogramma Agassizii Fire Red",
    "scientificName": "Apistogramma agassizii",
    "synonyms": [
      "Apistogramma Agassizii Fire Red",
      "Apistogramma Agassizii Fire Red (Apistogramma agassizii)",
      "apistogramma-agassizii-double-red.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "apistogramma-agassizii-double-red.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "232",
    "name": "Ciclídeo Yellow Lab Caeruleus (Labidochromis caeruleus)",
    "commonName": "Ciclídeo Yellow Lab Caeruleus",
    "scientificName": "Labidochromis caeruleus",
    "synonyms": [
      "Ciclídeo Yellow Lab Caeruleus",
      "Ciclídeo Yellow Lab Caeruleus (Labidochromis caeruleus)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "135_ciclideos_malawi_yellow.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "233",
    "name": "Ciclídeo Pseudotropheus Socolofi (Chindongo socolofi)",
    "commonName": "Ciclídeo Pseudotropheus Socolofi",
    "scientificName": "Chindongo socolofi",
    "synonyms": [
      "Ciclídeo Pseudotropheus Socolofi",
      "Ciclídeo Pseudotropheus Socolofi (Chindongo socolofi)",
      "ciclideo-pseudotropheus-socolofi.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "ciclideo-pseudotropheus-socolofi.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "234",
    "name": "Aulonocaras (Firefish, Maleri, Eureka)",
    "commonName": "Aulonocaras",
    "scientificName": "Firefish, Maleri, Eureka",
    "synonyms": [
      "Aulonocaras",
      "Aulonocaras (Firefish, Maleri, Eureka)",
      "aulonocara",
      "firefish",
      "maleri yellow",
      "hap"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "136_aulonocaras_malawi.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "235",
    "name": "Oscar (Tigre, Red Tiger, Albino Red Ruby, Bronze)",
    "commonName": "Oscar",
    "scientificName": "Tigre, Red Tiger, Albino Red Ruby, Bronze",
    "synonyms": [
      "Oscar",
      "Oscar (Tigre, Red Tiger, Albino Red Ruby, Bronze)",
      "oscar tigre",
      "oscar albino",
      "astronotus"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "137_oscar_tigre_albino_red_ruby.png",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "236",
    "name": "Peixes Jumbos (Aruanã Prata, Polypterus, Tucunaré)",
    "commonName": "Peixes Jumbos",
    "scientificName": "Aruanã Prata, Polypterus, Tucunaré",
    "synonyms": [
      "Peixes Jumbos",
      "Peixes Jumbos (Aruanã Prata, Polypterus, Tucunaré)",
      "aruana",
      "polypterus",
      "senegalus",
      "tucunare",
      "severo"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "138_peixes_jumbos_aruana_polypterus.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "237",
    "name": "Kinguio Cometa Vermelho (Carassius auratus)",
    "commonName": "Kinguio Cometa Vermelho",
    "scientificName": "Carassius auratus",
    "synonyms": [
      "Kinguio Cometa Vermelho",
      "Kinguio Cometa Vermelho (Carassius auratus)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "139_kinguio_cometa_sarasa.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos (Kinguios & Carpas)"
  },
  {
    "id": "238",
    "name": "Kinguio Cometa Sarasa (Carassius auratus var. Sarasa)",
    "commonName": "Kinguio Cometa Sarasa",
    "scientificName": "Carassius auratus var. Sarasa",
    "synonyms": [
      "Kinguio Cometa Sarasa",
      "Kinguio Cometa Sarasa (Carassius auratus var. Sarasa)",
      "kinguio-cometa-sarasa.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos (Kinguios & Carpas)"
  },
  {
    "id": "239",
    "name": "Kinguio Oranda Red Cap (Carassius auratus var. Red Cap)",
    "commonName": "Kinguio Oranda Red Cap",
    "scientificName": "Carassius auratus var. Red Cap",
    "synonyms": [
      "Kinguio Oranda Red Cap",
      "Kinguio Oranda Red Cap (Carassius auratus var. Red Cap)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "140_kinguio_oranda_red_cap.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos (Kinguios & Carpas)"
  },
  {
    "id": "240",
    "name": "Kinguio Oranda Cálico (Carassius auratus var. Calico)",
    "commonName": "Kinguio Oranda Cálico",
    "scientificName": "Carassius auratus var. Calico",
    "synonyms": [
      "Kinguio Oranda Cálico",
      "Kinguio Oranda Cálico (Carassius auratus var. Calico)",
      "kinguio-oranda-calico.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos (Kinguios & Carpas)"
  },
  {
    "id": "241",
    "name": "Kinguio Oranda Panda (Carassius auratus var. Panda)",
    "commonName": "Kinguio Oranda Panda",
    "scientificName": "Carassius auratus var. Panda",
    "synonyms": [
      "Kinguio Oranda Panda",
      "Kinguio Oranda Panda (Carassius auratus var. Panda)",
      "kinguio-oranda-panda.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos (Kinguios & Carpas)"
  },
  {
    "id": "242",
    "name": "Kinguio Telescópio Black Moor (Carassius auratus var. Black Moor)",
    "commonName": "Kinguio Telescópio Black Moor",
    "scientificName": "Carassius auratus var. Black Moor",
    "synonyms": [
      "Kinguio Telescópio Black Moor",
      "Kinguio Telescópio Black Moor (Carassius auratus var. Black Moor)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "141_kinguio_telescopio_black_moor.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos (Kinguios & Carpas)"
  },
  {
    "id": "243",
    "name": "Kinguio Ranchu Lionhead (Carassius auratus var. Ranchu)",
    "commonName": "Kinguio Ranchu Lionhead",
    "scientificName": "Carassius auratus var. Ranchu",
    "synonyms": [
      "Kinguio Ranchu Lionhead",
      "Kinguio Ranchu Lionhead (Carassius auratus var. Ranchu)",
      "kinguio-ranchu.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "kinguio-ranchu.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciprinídeos (Kinguios & Carpas)"
  },
  {
    "id": "244",
    "name": "Coridora Bronze Aeneus (Corydoras aeneus)",
    "commonName": "Coridora Bronze Aeneus",
    "scientificName": "Corydoras aeneus",
    "synonyms": [
      "Coridora Bronze Aeneus",
      "Coridora Bronze Aeneus (Corydoras aeneus)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "142_coridora_bronze_albina.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras (Callichthyidae)"
  },
  {
    "id": "245",
    "name": "Coridora Albina (Corydoras aeneus var. Albino)",
    "commonName": "Coridora Albina",
    "scientificName": "Corydoras aeneus var. Albino",
    "synonyms": [
      "Coridora Albina",
      "Coridora Albina (Corydoras aeneus var. Albino)",
      "coridora-aeneus.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "coridora-aeneus.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras (Callichthyidae)"
  },
  {
    "id": "246",
    "name": "Coridora Pimenta (Corydoras paleatus)",
    "commonName": "Coridora Pimenta",
    "scientificName": "Corydoras paleatus",
    "synonyms": [
      "Coridora Pimenta",
      "Coridora Pimenta (Corydoras paleatus)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "143_coridora_pimenta_schwartzi.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras (Callichthyidae)"
  },
  {
    "id": "247",
    "name": "Coridora Schwartzi Tigre (Corydoras schwartzi)",
    "commonName": "Coridora Schwartzi Tigre",
    "scientificName": "Corydoras schwartzi",
    "synonyms": [
      "Coridora Schwartzi Tigre",
      "Coridora Schwartzi Tigre (Corydoras schwartzi)",
      "coridora-schwartzi.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras (Callichthyidae)"
  },
  {
    "id": "248",
    "name": "Coridora Panda (Corydoras panda)",
    "commonName": "Coridora Panda",
    "scientificName": "Corydoras panda",
    "synonyms": [
      "Coridora Panda",
      "Coridora Panda (Corydoras panda)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "144_coridora_panda_sterbai.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras (Callichthyidae)"
  },
  {
    "id": "249",
    "name": "Coridora Sterbai (Corydoras sterbai)",
    "commonName": "Coridora Sterbai",
    "scientificName": "Corydoras sterbai",
    "synonyms": [
      "Coridora Sterbai",
      "Coridora Sterbai (Corydoras sterbai)",
      "coridora-sterbai.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "coridora-sterbai.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras (Callichthyidae)"
  },
  {
    "id": "250",
    "name": "Limpa-Vidro Otocinclus (Otocinclus macrospilus)",
    "commonName": "Limpa-Vidro Otocinclus",
    "scientificName": "Otocinclus macrospilus",
    "synonyms": [
      "Limpa-Vidro Otocinclus",
      "Limpa-Vidro Otocinclus (Otocinclus macrospilus)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "145_limpa_vidro_otocinclus.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos & Loricariídeos"
  },
  {
    "id": "251",
    "name": "Limpa-Vidro Pitbull (Parotocinclus jumbo)",
    "commonName": "Limpa-Vidro Pitbull",
    "scientificName": "Parotocinclus jumbo",
    "synonyms": [
      "Limpa-Vidro Pitbull",
      "Limpa-Vidro Pitbull (Parotocinclus jumbo)",
      "limpa-vidro-pitbull.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos & Loricariídeos"
  },
  {
    "id": "252",
    "name": "Cascudo Ancistrus Comum (Ancistrus cirrhosus)",
    "commonName": "Cascudo Ancistrus Comum",
    "scientificName": "Ancistrus cirrhosus",
    "synonyms": [
      "Cascudo Ancistrus Comum",
      "Cascudo Ancistrus Comum (Ancistrus cirrhosus)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "146_cascudo_ancistrus_bristlenose.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos & Loricariídeos"
  },
  {
    "id": "253",
    "name": "Cascudo Ancistrus Albino Ouro (Ancistrus cirrhosus var. Albino)",
    "commonName": "Cascudo Ancistrus Albino Ouro",
    "scientificName": "Ancistrus cirrhosus var. Albino",
    "synonyms": [
      "Cascudo Ancistrus Albino Ouro",
      "Cascudo Ancistrus Albino Ouro (Ancistrus cirrhosus var. Albino)",
      "cascudo-ancistrus-albino.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos & Loricariídeos"
  },
  {
    "id": "254",
    "name": "Cascudo Ancistrus Super Red (Ancistrus cirrhosus var. Super Red)",
    "commonName": "Cascudo Ancistrus Super Red",
    "scientificName": "Ancistrus cirrhosus var. Super Red",
    "synonyms": [
      "Cascudo Ancistrus Super Red",
      "Cascudo Ancistrus Super Red (Ancistrus cirrhosus var. Super Red)",
      "cascudo-ancistrus-super-red.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos & Loricariídeos"
  },
  {
    "id": "255",
    "name": "Cascudo Pepita de Ouro L018 (Baryancistrus xanthellus)",
    "commonName": "Cascudo Pepita de Ouro L018",
    "scientificName": "Baryancistrus xanthellus",
    "synonyms": [
      "Cascudo Pepita de Ouro L018",
      "Cascudo Pepita de Ouro L018 (Baryancistrus xanthellus)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "147_cascudo_pepita_de_ouro_abacaxi.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos & Loricariídeos"
  },
  {
    "id": "256",
    "name": "Cascudo Abacaxi (Megalancistrus parananus)",
    "commonName": "Cascudo Abacaxi",
    "scientificName": "Megalancistrus parananus",
    "synonyms": [
      "Cascudo Abacaxi",
      "Cascudo Abacaxi (Megalancistrus parananus)",
      "cascudo-abacaxi.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "cascudo-abacaxi.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos & Loricariídeos"
  },
  {
    "id": "257",
    "name": "Cascudo Comum Plet (Hypostomus plecostomus)",
    "commonName": "Cascudo Comum Plet",
    "scientificName": "Hypostomus plecostomus",
    "synonyms": [
      "Cascudo Comum Plet",
      "Cascudo Comum Plet (Hypostomus plecostomus)",
      "cascudo-pletomado.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "cascudo-pletomado.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos & Loricariídeos"
  },
  {
    "id": "258",
    "name": "Comedor de Alga Siamês SAE (Crossocheilus oblongus)",
    "commonName": "Comedor de Alga Siamês SAE",
    "scientificName": "Crossocheilus oblongus",
    "synonyms": [
      "Comedor de Alga Siamês SAE",
      "Comedor de Alga Siamês SAE (Crossocheilus oblongus)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "148_algueiros_labeo_botia_sae.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "259",
    "name": "Comedor de Alga Chinês CAC (Gyrinocheilus aymonieri)",
    "commonName": "Comedor de Alga Chinês CAC",
    "scientificName": "Gyrinocheilus aymonieri",
    "synonyms": [
      "Comedor de Alga Chinês CAC",
      "Comedor de Alga Chinês CAC (Gyrinocheilus aymonieri)",
      "comedor-alga-chines.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "260",
    "name": "Labeo Frenatus Red Tail (Epalzeorhynchos frenatum)",
    "commonName": "Labeo Frenatus Red Tail",
    "scientificName": "Epalzeorhynchos frenatum",
    "synonyms": [
      "Labeo Frenatus Red Tail",
      "Labeo Frenatus Red Tail (Epalzeorhynchos frenatum)",
      "labeo-frenatus.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "261",
    "name": "Bótia Palhaço (Chromobotia macracanthus)",
    "commonName": "Bótia Palhaço",
    "scientificName": "Chromobotia macracanthus",
    "synonyms": [
      "Bótia Palhaço",
      "Bótia Palhaço (Chromobotia macracanthus)",
      "botia-palhaco.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Palhaços (Amphiprioninae)"
  },
  {
    "id": "262",
    "name": "Bótia Yoyo (Botia almorhae)",
    "commonName": "Bótia Yoyo",
    "scientificName": "Botia almorhae",
    "synonyms": [
      "Bótia Yoyo",
      "Bótia Yoyo (Botia almorhae)",
      "botia-yoyo.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "263",
    "name": "Camarão Neocaridina (Red Cherry, Blue Dream, Yellow, Rili)",
    "commonName": "Camarão Neocaridina",
    "scientificName": "Red Cherry, Blue Dream, Yellow, Rili",
    "synonyms": [
      "Camarão Neocaridina",
      "Camarão Neocaridina (Red Cherry, Blue Dream, Yellow, Rili)",
      "neocaridina",
      "red cherry",
      "blue dream",
      "red rili"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "149_camarao_neocaridina_red_blue_yellow_rili.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Equipe de Limpeza & Invertebrados"
  },
  {
    "id": "264",
    "name": "Caramujo Neritina Zebra (Neritina natalensis)",
    "commonName": "Caramujo Neritina Zebra",
    "scientificName": "Neritina natalensis",
    "synonyms": [
      "Caramujo Neritina Zebra",
      "Caramujo Neritina Zebra (Neritina natalensis)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_INVERTEBRATE",
    "imageSlug": "150_caramujos_ampularia_neritina.webp",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Equipe de Limpeza & Invertebrados"
  },
  {
    "id": "265",
    "name": "Caramujo Neritina Mosaico (Neritina virginea)",
    "commonName": "Caramujo Neritina Mosaico",
    "scientificName": "Neritina virginea",
    "synonyms": [
      "Caramujo Neritina Mosaico",
      "Caramujo Neritina Mosaico (Neritina virginea)",
      "caracol-neritina-zebra.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_INVERTEBRATE",
    "imageSlug": "caracol-neritina-zebra.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Equipe de Limpeza & Invertebrados"
  },
  {
    "id": "266",
    "name": "Caramujo Ampulária Ouro (Pomacea diffusa var. Gold)",
    "commonName": "Caramujo Ampulária Ouro",
    "scientificName": "Pomacea diffusa var. Gold",
    "synonyms": [
      "Caramujo Ampulária Ouro",
      "Caramujo Ampulária Ouro (Pomacea diffusa var. Gold)",
      "caramujo-ampularia-dourada.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_INVERTEBRATE",
    "imageSlug": "",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Equipe de Limpeza & Invertebrados"
  },
  {
    "id": "267",
    "name": "Caramujo Ampulária Roxa (Pomacea diffusa var. Purple)",
    "commonName": "Caramujo Ampulária Roxa",
    "scientificName": "Pomacea diffusa var. Purple",
    "synonyms": [
      "Caramujo Ampulária Roxa",
      "Caramujo Ampulária Roxa (Pomacea diffusa var. Purple)",
      "caramujo-ampularia-roxa.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_INVERTEBRATE",
    "imageSlug": "",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Equipe de Limpeza & Invertebrados"
  },
  {
    "id": "268",
    "name": "Zoanthus Gorilla Nipples",
    "commonName": "Zoanthus Gorilla Nipples",
    "scientificName": "Zoanthus Gorilla Nipples",
    "synonyms": [
      "Zoanthus Gorilla Nipples",
      "Zoanthus Gorilla Nipples",
      "zoa gorilla nipples",
      "gorilla nipples",
      "zoanthus gorilla"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "151_zoanthus_gorilla_nipples.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "269",
    "name": "Zoanthus Blowpop",
    "commonName": "Zoanthus Blowpop",
    "scientificName": "Zoanthus Blowpop",
    "synonyms": [
      "Zoanthus Blowpop",
      "Zoanthus Blowpop",
      "zoa blowpop",
      "blow pop",
      "zoanthus blowpop"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "152_zoanthus_blowpop.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "270",
    "name": "Zoanthus Tubbs Blue",
    "commonName": "Zoanthus Tubbs Blue",
    "scientificName": "Zoanthus Tubbs Blue",
    "synonyms": [
      "Zoanthus Tubbs Blue",
      "Zoanthus Tubbs Blue",
      "zoa tubbs blue",
      "tubbs blue",
      "zoanthus azul"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "153_zoanthus_tubbs_blue.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "271",
    "name": "Zoanthus AOI Blue (Zoanthus sp.)",
    "commonName": "Zoanthus AOI Blue",
    "scientificName": "Zoanthus sp.",
    "synonyms": [
      "Zoanthus AOI Blue",
      "Zoanthus AOI Blue (Zoanthus sp.)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "154_zoanthus_aoi_blue.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "272",
    "name": "Zoanthus Dragon Eye",
    "commonName": "Zoanthus Dragon Eye",
    "scientificName": "Zoanthus Dragon Eye",
    "synonyms": [
      "Zoanthus Dragon Eye",
      "Zoanthus Dragon Eye",
      "zoa dragon eye",
      "olho de dragao",
      "dragon eye"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "155_zoanthus_dragon_eye.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "273",
    "name": "Zoanthus Miami Vice",
    "commonName": "Zoanthus Miami Vice",
    "scientificName": "Zoanthus Miami Vice",
    "synonyms": [
      "Zoanthus Miami Vice",
      "Zoanthus Miami Vice",
      "zoa miami vice",
      "miami vice",
      "zoanthus miami"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "156_zoanthus_miami_vice.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "274",
    "name": "Zoanthus Gatorade",
    "commonName": "Zoanthus Gatorade",
    "scientificName": "Zoanthus Gatorade",
    "synonyms": [
      "Zoanthus Gatorade",
      "Zoanthus Gatorade",
      "zoa gatorade",
      "gatorade zoa",
      "zoanthus gatorade"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "157_zoanthus_gatorade.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "275",
    "name": "Zoanthus Mohawk (Zoanthus sp.)",
    "commonName": "Zoanthus Mohawk",
    "scientificName": "Zoanthus sp.",
    "synonyms": [
      "Zoanthus Mohawk",
      "Zoanthus Mohawk (Zoanthus sp.)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "158_zoanthus_mohawk.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "276",
    "name": "Zoanthus Variable Star (Zoanthus sp.)",
    "commonName": "Zoanthus Variable Star",
    "scientificName": "Zoanthus sp.",
    "synonyms": [
      "Zoanthus Variable Star",
      "Zoanthus Variable Star (Zoanthus sp.)",
      "zoanthus-variable-star.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "277",
    "name": "Zoanthus Green Bay Packers",
    "commonName": "Zoanthus Green Bay Packers",
    "scientificName": "Zoanthus Green Bay Packers",
    "synonyms": [
      "Zoanthus Green Bay Packers",
      "Zoanthus Green Bay Packers",
      "zoa green bay packers",
      "green bay",
      "packers zoa"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "159_zoanthus_green_bay_packers.png",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "278",
    "name": "Zoanthus Rainbow Infusion (Zoanthus sp.)",
    "commonName": "Zoanthus Rainbow Infusion",
    "scientificName": "Zoanthus sp.",
    "synonyms": [
      "Zoanthus Rainbow Infusion",
      "Zoanthus Rainbow Infusion (Zoanthus sp.)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "160_zoanthus_rainbow_infusion.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "279",
    "name": "Zoanthus Kazoo (Zoanthus sp.)",
    "commonName": "Zoanthus Kazoo",
    "scientificName": "Zoanthus sp.",
    "synonyms": [
      "Zoanthus Kazoo",
      "Zoanthus Kazoo (Zoanthus sp.)",
      "zoanthus-kazoo.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "280",
    "name": "Zoanthus Wolverine",
    "commonName": "Zoanthus Wolverine",
    "scientificName": "Zoanthus Wolverine",
    "synonyms": [
      "Zoanthus Wolverine",
      "Zoanthus Wolverine",
      "zoa wolverine",
      "wolverine zoa",
      "zoanthus wolverine"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "161_zoanthus_wolverine.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "281",
    "name": "Zoanthus Darth Maul",
    "commonName": "Zoanthus Darth Maul",
    "scientificName": "Zoanthus Darth Maul",
    "synonyms": [
      "Zoanthus Darth Maul",
      "Zoanthus Darth Maul",
      "zoa darth maul",
      "darth maul",
      "paly darth maul"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "162_zoanthus_darth_maul.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "282",
    "name": "Zoanthus Everlasting Gobstopper",
    "commonName": "Zoanthus Everlasting Gobstopper",
    "scientificName": "Zoanthus Everlasting Gobstopper",
    "synonyms": [
      "Zoanthus Everlasting Gobstopper",
      "Zoanthus Everlasting Gobstopper",
      "zoa gobstopper",
      "everlasting gobstopper",
      "gobstoppers"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "163_zoanthus_gobstopper.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "283",
    "name": "Zoanthus Magicians (Zoanthus sp.)",
    "commonName": "Zoanthus Magicians",
    "scientificName": "Zoanthus sp.",
    "synonyms": [
      "Zoanthus Magicians",
      "Zoanthus Magicians (Zoanthus sp.)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "164_zoanthus_magicians.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "284",
    "name": "Palythoa Red People Eater (Palythoa sp.)",
    "commonName": "Palythoa Red People Eater",
    "scientificName": "Palythoa sp.",
    "synonyms": [
      "Palythoa Red People Eater",
      "Palythoa Red People Eater (Palythoa sp.)",
      "zoanthus-red-people-eater.jpg",
      "palythoa-red-people-eater.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Palythoas"
  },
  {
    "id": "285",
    "name": "Zoanthus Sonic Flare",
    "commonName": "Zoanthus Sonic Flare",
    "scientificName": "Zoanthus Sonic Flare",
    "synonyms": [
      "Zoanthus Sonic Flare",
      "Zoanthus Sonic Flare",
      "zoa sonic flare",
      "sonic flare",
      "zoanthus sonic"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "165_zoanthus_sonic_flare.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "286",
    "name": "Zoanthus White Zombie (Zoanthus sp.)",
    "commonName": "Zoanthus White Zombie",
    "scientificName": "Zoanthus sp.",
    "synonyms": [
      "Zoanthus White Zombie",
      "Zoanthus White Zombie (Zoanthus sp.)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "166_zoanthus_white_zombie.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "287",
    "name": "Zoanthus Seduction (Zoanthus sp.)",
    "commonName": "Zoanthus Seduction",
    "scientificName": "Zoanthus sp.",
    "synonyms": [
      "Zoanthus Seduction",
      "Zoanthus Seduction (Zoanthus sp.)",
      "zoanthus-seduction.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "288",
    "name": "Zoanthus Salted Agave",
    "commonName": "Zoanthus Salted Agave",
    "scientificName": "Zoanthus Salted Agave",
    "synonyms": [
      "Zoanthus Salted Agave",
      "Zoanthus Salted Agave",
      "zoa salted agave",
      "salted agave",
      "blue agave"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "167_zoanthus_salted_agave.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "289",
    "name": "Palythoa Lemon Twist (Palythoa sp.)",
    "commonName": "Palythoa Lemon Twist",
    "scientificName": "Palythoa sp.",
    "synonyms": [
      "Palythoa Lemon Twist",
      "Palythoa Lemon Twist (Palythoa sp.)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "168_palythoa_lemon_twist.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Palythoas"
  },
  {
    "id": "290",
    "name": "Palythoa Space Chaos (Palythoa sp.)",
    "commonName": "Palythoa Space Chaos",
    "scientificName": "Palythoa sp.",
    "synonyms": [
      "Palythoa Space Chaos",
      "Palythoa Space Chaos (Palythoa sp.)",
      "palythoa-space-chaos.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Palythoas"
  },
  {
    "id": "291",
    "name": "Zoanthus Little Shop of Horrors (Zoanthus sp.)",
    "commonName": "Zoanthus Little Shop of Horrors",
    "scientificName": "Zoanthus sp.",
    "synonyms": [
      "Zoanthus Little Shop of Horrors",
      "Zoanthus Little Shop of Horrors (Zoanthus sp.)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "169_zoanthus_little_shop_of_horrors.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "292",
    "name": "Zoanthus Grand Master Glazz GMK (Zoanthus sp.)",
    "commonName": "Zoanthus Grand Master Glazz GMK",
    "scientificName": "Zoanthus sp.",
    "synonyms": [
      "Zoanthus Grand Master Glazz GMK",
      "Zoanthus Grand Master Glazz GMK (Zoanthus sp.)",
      "zoanthus-gmk.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "293",
    "name": "Yellow Polyps (Parazoanthus gracilis)",
    "commonName": "Yellow Polyps",
    "scientificName": "Parazoanthus gracilis",
    "synonyms": [
      "Yellow Polyps",
      "Yellow Polyps (Parazoanthus gracilis)",
      "yellow polyps",
      "parazoanthus",
      "polipo amarelo"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "170_yellow_polyps_parazoanthus.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Zoanthídeos"
  },
  {
    "id": "294",
    "name": "Button Polyps Metallic (Protopalythoa)",
    "commonName": "Button Polyps Metallic",
    "scientificName": "Protopalythoa",
    "synonyms": [
      "Button Polyps Metallic",
      "Button Polyps Metallic (Protopalythoa)",
      "button polyps",
      "protopalythoa",
      "palythoa verde"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "171_button_polyps_metallic_green.jpeg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Palythoas"
  },
  {
    "id": "295",
    "name": "Mushroom Discosoma Jawbreaker (Tie-Dye)",
    "commonName": "Mushroom Discosoma Jawbreaker",
    "scientificName": "Tie-Dye",
    "synonyms": [
      "Mushroom Discosoma Jawbreaker",
      "Mushroom Discosoma Jawbreaker (Tie-Dye)",
      "jawbreaker",
      "mush jawbreaker",
      "tie dye mushroom"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "172_mushroom_jawbreaker.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "296",
    "name": "Mushroom Magic Carpet (Rhodactis sp.)",
    "commonName": "Mushroom Magic Carpet",
    "scientificName": "Rhodactis sp.",
    "synonyms": [
      "Mushroom Magic Carpet",
      "Mushroom Magic Carpet (Rhodactis sp.)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "173_mushroom_red_velvet_magic_carpet.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "297",
    "name": "Mushroom Red Velvet (Rhodactis sp.)",
    "commonName": "Mushroom Red Velvet",
    "scientificName": "Rhodactis sp.",
    "synonyms": [
      "Mushroom Red Velvet",
      "Mushroom Red Velvet (Rhodactis sp.)",
      "mushroom-red-velvet.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "298",
    "name": "Mushroom Discosoma Interstellar (Discosoma sp.)",
    "commonName": "Mushroom Discosoma Interstellar",
    "scientificName": "Discosoma sp.",
    "synonyms": [
      "Mushroom Discosoma Interstellar",
      "Mushroom Discosoma Interstellar (Discosoma sp.)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "174_mushroom_interstellar_patchwork.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "299",
    "name": "Mushroom Discosoma Patchwork Rainbow (Discosoma sp.)",
    "commonName": "Mushroom Discosoma Patchwork Rainbow",
    "scientificName": "Discosoma sp.",
    "synonyms": [
      "Mushroom Discosoma Patchwork Rainbow",
      "Mushroom Discosoma Patchwork Rainbow (Discosoma sp.)",
      "mushroom-patchwork.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "300",
    "name": "Mushroom Discosoma Blue Spotted",
    "commonName": "Mushroom Discosoma Blue Spotted",
    "scientificName": "Mushroom Discosoma Blue Spotted",
    "synonyms": [
      "Mushroom Discosoma Blue Spotted",
      "Mushroom Discosoma Blue Spotted",
      "blue spotted mushroom",
      "mush pintado azul",
      "discosoma spotted"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "175_mushroom_blue_spotted.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "301",
    "name": "Mushroom Rhodactis Ultra Superman",
    "commonName": "Mushroom Rhodactis Ultra Superman",
    "scientificName": "Mushroom Rhodactis Ultra Superman",
    "synonyms": [
      "Mushroom Rhodactis Ultra Superman",
      "Mushroom Rhodactis Ultra Superman",
      "rhodactis ultra superman",
      "superman rhodactis",
      "mush superman"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "176_rhodactis_superman_ultra.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "302",
    "name": "Mushroom Rhodactis Frankenstein Bounce",
    "commonName": "Mushroom Rhodactis Frankenstein Bounce",
    "scientificName": "Mushroom Rhodactis Frankenstein Bounce",
    "synonyms": [
      "Mushroom Rhodactis Frankenstein Bounce",
      "Mushroom Rhodactis Frankenstein Bounce",
      "frankenstein bounce",
      "bounce frankenstein",
      "mush bounce"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "177_rhodactis_frankenstein_bounce.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "303",
    "name": "Mushroom Rhodactis Powerball Bounce (Rhodactis sp.)",
    "commonName": "Mushroom Rhodactis Powerball Bounce",
    "scientificName": "Rhodactis sp.",
    "synonyms": [
      "Mushroom Rhodactis Powerball Bounce",
      "Mushroom Rhodactis Powerball Bounce (Rhodactis sp.)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "178_rhodactis_powerball_bounce.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "304",
    "name": "Mushroom Rhodactis Biohazard Bounce (Rhodactis sp.)",
    "commonName": "Mushroom Rhodactis Biohazard Bounce",
    "scientificName": "Rhodactis sp.",
    "synonyms": [
      "Mushroom Rhodactis Biohazard Bounce",
      "Mushroom Rhodactis Biohazard Bounce (Rhodactis sp.)",
      "rhodactis-biohazard.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "305",
    "name": "Mushroom Rhodactis Toxic Green Bounce",
    "commonName": "Mushroom Rhodactis Toxic Green Bounce",
    "scientificName": "Mushroom Rhodactis Toxic Green Bounce",
    "synonyms": [
      "Mushroom Rhodactis Toxic Green Bounce",
      "Mushroom Rhodactis Toxic Green Bounce",
      "green bounce",
      "rhodactis bounce verde",
      "toxic bounce"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "179_rhodactis_green_bounce.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "306",
    "name": "Ricordea Florida Azul (Ricordea florida)",
    "commonName": "Ricordea Florida Azul",
    "scientificName": "Ricordea florida",
    "synonyms": [
      "Ricordea Florida Azul",
      "Ricordea Florida Azul (Ricordea florida)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "180_ricordea_florida_blue.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "307",
    "name": "Ricordea Florida Teal (Ricordea florida)",
    "commonName": "Ricordea Florida Teal",
    "scientificName": "Ricordea florida",
    "synonyms": [
      "Ricordea Florida Teal",
      "Ricordea Florida Teal (Ricordea florida)",
      "ricordea-florida-teal.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "308",
    "name": "Ricordea Yuma Godzilla (Ricordea yuma)",
    "commonName": "Ricordea Yuma Godzilla",
    "scientificName": "Ricordea yuma",
    "synonyms": [
      "Ricordea Yuma Godzilla",
      "Ricordea Yuma Godzilla (Ricordea yuma)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "181_ricordea_yuma_godzilla.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "309",
    "name": "Ricordea Yuma King Kong (Ricordea yuma)",
    "commonName": "Ricordea Yuma King Kong",
    "scientificName": "Ricordea yuma",
    "synonyms": [
      "Ricordea Yuma King Kong",
      "Ricordea Yuma King Kong (Ricordea yuma)",
      "ricordea-yuma-king-kong.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "310",
    "name": "Ricordea Yuma Laranja e Roxa (Ricordea yuma)",
    "commonName": "Ricordea Yuma Laranja e Roxa",
    "scientificName": "Ricordea yuma",
    "synonyms": [
      "Ricordea Yuma Laranja e Roxa",
      "Ricordea Yuma Laranja e Roxa (Ricordea yuma)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "182_ricordea_yuma_orange_purple.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Mushrooms & Ricordeas"
  },
  {
    "id": "311",
    "name": "Leather Finger Coral (Sinularia asterolobata)",
    "commonName": "Leather Finger Coral",
    "scientificName": "Sinularia asterolobata",
    "synonyms": [
      "Leather Finger Coral",
      "Leather Finger Coral (Sinularia asterolobata)",
      "finger leather",
      "sinularia finger",
      "leather dedo"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "183_leather_finger_sinularia.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "312",
    "name": "Leather Colt (Cladiella sp.)",
    "commonName": "Leather Colt",
    "scientificName": "Cladiella sp.",
    "synonyms": [
      "Leather Colt",
      "Leather Colt (Cladiella sp.)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "184_leather_colt_cladiella.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "313",
    "name": "Leather Thick Finger (Alcyonium sp.)",
    "commonName": "Leather Thick Finger",
    "scientificName": "Alcyonium sp.",
    "synonyms": [
      "Leather Thick Finger",
      "Leather Thick Finger (Alcyonium sp.)",
      "leather-thick-finger.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "314",
    "name": "Coral Blue Sympodium (Sympodium sp.)",
    "commonName": "Coral Blue Sympodium",
    "scientificName": "Sympodium sp.",
    "synonyms": [
      "Coral Blue Sympodium",
      "Coral Blue Sympodium (Sympodium sp.)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "185_blue_sympodium.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "315",
    "name": "Coral Sansibia Azul (Sansibia sp.)",
    "commonName": "Coral Sansibia Azul",
    "scientificName": "Sansibia sp.",
    "synonyms": [
      "Coral Sansibia Azul",
      "Coral Sansibia Azul (Sansibia sp.)",
      "coral-sansibia.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "316",
    "name": "Pipe Organ Neon Green (Tubipora musica)",
    "commonName": "Pipe Organ Neon Green",
    "scientificName": "Tubipora musica",
    "synonyms": [
      "Pipe Organ Neon Green",
      "Pipe Organ Neon Green (Tubipora musica)",
      "pipe organ",
      "tubipora musica",
      "pipe organ neon"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "186_pipe_organ_neon_green.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "317",
    "name": "Pipe Organ Clássico (Tubipora)",
    "commonName": "Pipe Organ Clássico",
    "scientificName": "Tubipora",
    "synonyms": [
      "Pipe Organ Clássico",
      "Pipe Organ Clássico (Tubipora)",
      "tubipora",
      "pipe organ green",
      "coral orgao"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "187_pipe_organ_white_green.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "318",
    "name": "Anêmona Bubble Tip Acid Wash (Entacmaea quadricolor var. Acid Wash)",
    "commonName": "Anêmona Bubble Tip Acid Wash",
    "scientificName": "Entacmaea quadricolor var. Acid Wash",
    "synonyms": [
      "Anêmona Bubble Tip Acid Wash",
      "Anêmona Bubble Tip Acid Wash (Entacmaea quadricolor var. Acid Wash)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "188_anemona_bta_acid_wash_black_widow.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "319",
    "name": "Anêmona Bubble Tip Black Widow (Entacmaea quadricolor var. Black Widow)",
    "commonName": "Anêmona Bubble Tip Black Widow",
    "scientificName": "Entacmaea quadricolor var. Black Widow",
    "synonyms": [
      "Anêmona Bubble Tip Black Widow",
      "Anêmona Bubble Tip Black Widow (Entacmaea quadricolor var. Black Widow)",
      "anemona-black-widow.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "320",
    "name": "Anêmona Carpet Verde (Stichodactyla haddoni)",
    "commonName": "Anêmona Carpet Verde",
    "scientificName": "Stichodactyla haddoni",
    "synonyms": [
      "Anêmona Carpet Verde",
      "Anêmona Carpet Verde (Stichodactyla haddoni)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "189_anemona_carpet_haddoni.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "321",
    "name": "Anêmona Carpet Azul (Stichodactyla haddoni)",
    "commonName": "Anêmona Carpet Azul",
    "scientificName": "Stichodactyla haddoni",
    "synonyms": [
      "Anêmona Carpet Azul",
      "Anêmona Carpet Azul (Stichodactyla haddoni)",
      "anemona-carpet-azul.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "322",
    "name": "Anêmona Long Tentacle LTA (Macrodactyla doreensis)",
    "commonName": "Anêmona Long Tentacle LTA",
    "scientificName": "Macrodactyla doreensis",
    "synonyms": [
      "Anêmona Long Tentacle LTA",
      "Anêmona Long Tentacle LTA (Macrodactyla doreensis)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "323",
    "name": "Anêmona Condylactis Gigantea (Condylactis gigantea)",
    "commonName": "Anêmona Condylactis Gigantea",
    "scientificName": "Condylactis gigantea",
    "synonyms": [
      "Anêmona Condylactis Gigantea",
      "Anêmona Condylactis Gigantea (Condylactis gigantea)",
      "anemona-condylactis.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "324",
    "name": "Anêmona Sebae (Heteractis crispa)",
    "commonName": "Anêmona Sebae",
    "scientificName": "Heteractis crispa",
    "synonyms": [
      "Anêmona Sebae",
      "Anêmona Sebae (Heteractis crispa)",
      "anemona-sebae.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "anemona-sebae.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "325",
    "name": "Coral Torch 24K Gold (Euphyllia glabrescens)",
    "commonName": "Coral Torch 24K Gold",
    "scientificName": "Euphyllia glabrescens",
    "synonyms": [
      "Coral Torch 24K Gold",
      "Coral Torch 24K Gold (Euphyllia glabrescens)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "191_torch_24k_aussie_gold.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Euphylliidae (LPS Nobres)"
  },
  {
    "id": "326",
    "name": "Coral Torch Aussie Gold (Euphyllia glabrescens)",
    "commonName": "Coral Torch Aussie Gold",
    "scientificName": "Euphyllia glabrescens",
    "synonyms": [
      "Coral Torch Aussie Gold",
      "Coral Torch Aussie Gold (Euphyllia glabrescens)",
      "torch-aussie-gold.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Euphylliidae (LPS Nobres)"
  },
  {
    "id": "327",
    "name": "Coral Torch Holy Grail (Euphyllia glabrescens)",
    "commonName": "Coral Torch Holy Grail",
    "scientificName": "Euphyllia glabrescens",
    "synonyms": [
      "Coral Torch Holy Grail",
      "Coral Torch Holy Grail (Euphyllia glabrescens)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "192_torch_holy_grail_ny_knicks.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Euphylliidae (LPS Nobres)"
  },
  {
    "id": "328",
    "name": "Coral Torch NY Knicks (Euphyllia glabrescens)",
    "commonName": "Coral Torch NY Knicks",
    "scientificName": "Euphyllia glabrescens",
    "synonyms": [
      "Coral Torch NY Knicks",
      "Coral Torch NY Knicks (Euphyllia glabrescens)",
      "torch-ny-knicks.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Euphylliidae (LPS Nobres)"
  },
  {
    "id": "329",
    "name": "Coral Torch Hellfire (Euphyllia glabrescens)",
    "commonName": "Coral Torch Hellfire",
    "scientificName": "Euphyllia glabrescens",
    "synonyms": [
      "Coral Torch Hellfire",
      "Coral Torch Hellfire (Euphyllia glabrescens)",
      "torch-hellfire.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Euphylliidae (LPS Nobres)"
  },
  {
    "id": "330",
    "name": "Coral Hammer Laranja (Fimbriaphyllia ancora)",
    "commonName": "Coral Hammer Laranja",
    "scientificName": "Fimbriaphyllia ancora",
    "synonyms": [
      "Coral Hammer Laranja",
      "Coral Hammer Laranja (Fimbriaphyllia ancora)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "193_hammer_orange_rose_gold.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Euphylliidae (LPS Nobres)"
  },
  {
    "id": "331",
    "name": "Coral Hammer Copper (Fimbriaphyllia ancora)",
    "commonName": "Coral Hammer Copper",
    "scientificName": "Fimbriaphyllia ancora",
    "synonyms": [
      "Coral Hammer Copper",
      "Coral Hammer Copper (Fimbriaphyllia ancora)",
      "hammer-copper.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Euphylliidae (LPS Nobres)"
  },
  {
    "id": "332",
    "name": "Coral Hammer Rose Gold (Fimbriaphyllia ancora)",
    "commonName": "Coral Hammer Rose Gold",
    "scientificName": "Fimbriaphyllia ancora",
    "synonyms": [
      "Coral Hammer Rose Gold",
      "Coral Hammer Rose Gold (Fimbriaphyllia ancora)",
      "hammer-rose-gold.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Euphylliidae (LPS Nobres)"
  },
  {
    "id": "333",
    "name": "Coral Hammer Wall Rosa (Fimbriaphyllia ancora)",
    "commonName": "Coral Hammer Wall Rosa",
    "scientificName": "Fimbriaphyllia ancora",
    "synonyms": [
      "Coral Hammer Wall Rosa",
      "Coral Hammer Wall Rosa (Fimbriaphyllia ancora)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Euphylliidae (LPS Nobres)"
  },
  {
    "id": "334",
    "name": "Coral Hammer Wall Verde (Fimbriaphyllia ancora)",
    "commonName": "Coral Hammer Wall Verde",
    "scientificName": "Fimbriaphyllia ancora",
    "synonyms": [
      "Coral Hammer Wall Verde",
      "Coral Hammer Wall Verde (Fimbriaphyllia ancora)",
      "hammer-wall-green.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Euphylliidae (LPS Nobres)"
  },
  {
    "id": "335",
    "name": "Coral Hammer Prince of Darkness (Fimbriaphyllia ancora)",
    "commonName": "Coral Hammer Prince of Darkness",
    "scientificName": "Fimbriaphyllia ancora",
    "synonyms": [
      "Coral Hammer Prince of Darkness",
      "Coral Hammer Prince of Darkness (Fimbriaphyllia ancora)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "195_hammer_prince_of_darkness_black.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Euphylliidae (LPS Nobres)"
  },
  {
    "id": "336",
    "name": "Coral Bubble Verde (Plerogyra sinuosa)",
    "commonName": "Coral Bubble Verde",
    "scientificName": "Plerogyra sinuosa",
    "synonyms": [
      "Coral Bubble Verde",
      "Coral Bubble Verde (Plerogyra sinuosa)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "337",
    "name": "Coral Bubble Branco (Plerogyra sinuosa)",
    "commonName": "Coral Bubble Branco",
    "scientificName": "Plerogyra sinuosa",
    "synonyms": [
      "Coral Bubble Branco",
      "Coral Bubble Branco (Plerogyra sinuosa)",
      "coral-bubble-white.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "338",
    "name": "Elegance Coral (Catalaphyllia jardinei)",
    "commonName": "Elegance Coral",
    "scientificName": "Catalaphyllia jardinei",
    "synonyms": [
      "Elegance Coral",
      "Elegance Coral (Catalaphyllia jardinei)",
      "elegance coral",
      "catalaphyllia",
      "coral elegance"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "197_elegance_coral_catalaphyllia.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "339",
    "name": "Coral Plate Laranja (Cycloseris sp.)",
    "commonName": "Coral Plate Laranja",
    "scientificName": "Cycloseris sp.",
    "synonyms": [
      "Coral Plate Laranja",
      "Coral Plate Laranja (Cycloseris sp.)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "198_plate_coral_fungia_orange.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "340",
    "name": "Coral Plate Verde (Fungia repanda)",
    "commonName": "Coral Plate Verde",
    "scientificName": "Fungia repanda",
    "synonyms": [
      "Coral Plate Verde",
      "Coral Plate Verde (Fungia repanda)",
      "coral-plate-green.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "341",
    "name": "Coral Open Brain Rainbow (Trachyphyllia geoffroyi)",
    "commonName": "Coral Open Brain Rainbow",
    "scientificName": "Trachyphyllia geoffroyi",
    "synonyms": [
      "Coral Open Brain Rainbow",
      "Coral Open Brain Rainbow (Trachyphyllia geoffroyi)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "199_open_brain_trachyphyllia.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "342",
    "name": "Coral Open Brain Verde (Trachyphyllia geoffroyi)",
    "commonName": "Coral Open Brain Verde",
    "scientificName": "Trachyphyllia geoffroyi",
    "synonyms": [
      "Coral Open Brain Verde",
      "Coral Open Brain Verde (Trachyphyllia geoffroyi)",
      "open-brain-green.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "343",
    "name": "Coral Lobophyllia Red (Lobophyllia hemprichii)",
    "commonName": "Coral Lobophyllia Red",
    "scientificName": "Lobophyllia hemprichii",
    "synonyms": [
      "Coral Lobophyllia Red",
      "Coral Lobophyllia Red (Lobophyllia hemprichii)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "200_lobophyllia_red_tricolor.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "344",
    "name": "Coral Lobophyllia Tricolor (Lobophyllia hemprichii)",
    "commonName": "Coral Lobophyllia Tricolor",
    "scientificName": "Lobophyllia hemprichii",
    "synonyms": [
      "Coral Lobophyllia Tricolor",
      "Coral Lobophyllia Tricolor (Lobophyllia hemprichii)",
      "lobophyllia-tricolor.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "345",
    "name": "Coral Scolymia Bleeding Apple (Homophyllia australis)",
    "commonName": "Coral Scolymia Bleeding Apple",
    "scientificName": "Homophyllia australis",
    "synonyms": [
      "Coral Scolymia Bleeding Apple",
      "Coral Scolymia Bleeding Apple (Homophyllia australis)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "201_scolymia_bleeding_apple_war_paint.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "346",
    "name": "Coral Scolymia War Paint (Homophyllia australis)",
    "commonName": "Coral Scolymia War Paint",
    "scientificName": "Homophyllia australis",
    "synonyms": [
      "Coral Scolymia War Paint",
      "Coral Scolymia War Paint (Homophyllia australis)",
      "scolymia-war-paint.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "347",
    "name": "Coral Acanthastrea Echinata Rainbow (Acanthastrea echinata)",
    "commonName": "Coral Acanthastrea Echinata Rainbow",
    "scientificName": "Acanthastrea echinata",
    "synonyms": [
      "Coral Acanthastrea Echinata Rainbow",
      "Coral Acanthastrea Echinata Rainbow (Acanthastrea echinata)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "202_acanthastrea_echinata_rainbow.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "348",
    "name": "Coral Acanthastrea Echinata Orange Eye (Acanthastrea echinata)",
    "commonName": "Coral Acanthastrea Echinata Orange Eye",
    "scientificName": "Acanthastrea echinata",
    "synonyms": [
      "Coral Acanthastrea Echinata Orange Eye",
      "Coral Acanthastrea Echinata Orange Eye (Acanthastrea echinata)",
      "acanthastrea-orange-eye.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "349",
    "name": "Coral War Vermelho e Roxo (Favites pentagona)",
    "commonName": "Coral War Vermelho e Roxo",
    "scientificName": "Favites pentagona",
    "synonyms": [
      "Coral War Vermelho e Roxo",
      "Coral War Vermelho e Roxo (Favites pentagona)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "203_favites_war_coral.webp",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "350",
    "name": "Coral Favia Dragon Soul (Favia sp.)",
    "commonName": "Coral Favia Dragon Soul",
    "scientificName": "Favia sp.",
    "synonyms": [
      "Coral Favia Dragon Soul",
      "Coral Favia Dragon Soul (Favia sp.)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "204_favia_dragon_soul_lemon_lime.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "351",
    "name": "Coral Favites Lemon Lime (Favites sp.)",
    "commonName": "Coral Favites Lemon Lime",
    "scientificName": "Favites sp.",
    "synonyms": [
      "Coral Favites Lemon Lime",
      "Coral Favites Lemon Lime (Favites sp.)",
      "favites-lemon-lime.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "352",
    "name": "Coral Leptastrea Burning Blood (Leptastrea purpurea)",
    "commonName": "Coral Leptastrea Burning Blood",
    "scientificName": "Leptastrea purpurea",
    "synonyms": [
      "Coral Leptastrea Burning Blood",
      "Coral Leptastrea Burning Blood (Leptastrea purpurea)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "205_leptastrea_burning_platygyra.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "353",
    "name": "Coral Platygyra Maze Cérebro (Platygyra daedalea)",
    "commonName": "Coral Platygyra Maze Cérebro",
    "scientificName": "Platygyra daedalea",
    "synonyms": [
      "Coral Platygyra Maze Cérebro",
      "Coral Platygyra Maze Cérebro (Platygyra daedalea)",
      "platygyra-maze.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "354",
    "name": "Coral Cyphastrea Meteor Shower (Cyphastrea ocellina)",
    "commonName": "Coral Cyphastrea Meteor Shower",
    "scientificName": "Cyphastrea ocellina",
    "synonyms": [
      "Coral Cyphastrea Meteor Shower",
      "Coral Cyphastrea Meteor Shower (Cyphastrea ocellina)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "206_cyphastrea_meteor_shower_bizarro.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "355",
    "name": "Coral Cyphastrea Bizarro (Cyphastrea sp.)",
    "commonName": "Coral Cyphastrea Bizarro",
    "scientificName": "Cyphastrea sp.",
    "synonyms": [
      "Coral Cyphastrea Bizarro",
      "Coral Cyphastrea Bizarro (Cyphastrea sp.)",
      "cyphastrea-bizarro.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "356",
    "name": "Coral Galaxea Verde (Galaxea fascicularis)",
    "commonName": "Coral Galaxea Verde",
    "scientificName": "Galaxea fascicularis",
    "synonyms": [
      "Coral Galaxea Verde",
      "Coral Galaxea Verde (Galaxea fascicularis)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "207_galaxea_green_gold.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "357",
    "name": "Coral Galaxea Gold (Galaxea fascicularis)",
    "commonName": "Coral Galaxea Gold",
    "scientificName": "Galaxea fascicularis",
    "synonyms": [
      "Coral Galaxea Gold",
      "Coral Galaxea Gold (Galaxea fascicularis)",
      "galaxea-gold.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "358",
    "name": "Coral Cynarina Lacrymalis Red (Cynarina lacrymalis)",
    "commonName": "Coral Cynarina Lacrymalis Red",
    "scientificName": "Cynarina lacrymalis",
    "synonyms": [
      "Coral Cynarina Lacrymalis Red",
      "Coral Cynarina Lacrymalis Red (Cynarina lacrymalis)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "208_cynarina_indophyllia_red.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "359",
    "name": "Coral Indophyllia Macassarensis (Indophyllia macassarensis)",
    "commonName": "Coral Indophyllia Macassarensis",
    "scientificName": "Indophyllia macassarensis",
    "synonyms": [
      "Coral Indophyllia Macassarensis",
      "Coral Indophyllia Macassarensis (Indophyllia macassarensis)",
      "indophyllia-macassarensis.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "360",
    "name": "Coral Montipora Setosa Laranja (Montipora setosa)",
    "commonName": "Coral Montipora Setosa Laranja",
    "scientificName": "Montipora setosa",
    "synonyms": [
      "Coral Montipora Setosa Laranja",
      "Coral Montipora Setosa Laranja (Montipora setosa)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "209_montipora_setosa_orange.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "SPS (Pólipos Pequenos)"
  },
  {
    "id": "361",
    "name": "Coral Montipora Incrustante Rainbow (Montipora sp. Rainbow)",
    "commonName": "Coral Montipora Incrustante Rainbow",
    "scientificName": "Montipora sp. Rainbow",
    "synonyms": [
      "Coral Montipora Incrustante Rainbow",
      "Coral Montipora Incrustante Rainbow (Montipora sp. Rainbow)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "210_montipora_rainbow_incrustante.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "SPS (Pólipos Pequenos)"
  },
  {
    "id": "362",
    "name": "Coral Montipora Incrustante Pokerstar (Montipora tuberculosa)",
    "commonName": "Coral Montipora Incrustante Pokerstar",
    "scientificName": "Montipora tuberculosa",
    "synonyms": [
      "Coral Montipora Incrustante Pokerstar",
      "Coral Montipora Incrustante Pokerstar (Montipora tuberculosa)",
      "montipora-pokerstar.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "SPS (Pólipos Pequenos)"
  },
  {
    "id": "363",
    "name": "Montipora Bubblegum Digitata",
    "commonName": "Montipora Bubblegum Digitata",
    "scientificName": "Montipora Bubblegum Digitata",
    "synonyms": [
      "Montipora Bubblegum Digitata",
      "Montipora Bubblegum Digitata",
      "bubblegum digitata",
      "montipora bubblegum",
      "digitata bicolor"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "211_montipora_bubblegum_digitata.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "SPS (Pólipos Pequenos)"
  },
  {
    "id": "364",
    "name": "Coral Montipora Beach Bum (Montipora sp.)",
    "commonName": "Coral Montipora Beach Bum",
    "scientificName": "Montipora sp.",
    "synonyms": [
      "Coral Montipora Beach Bum",
      "Coral Montipora Beach Bum (Montipora sp.)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "212_montipora_beach_bum_kung_pao.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "SPS (Pólipos Pequenos)"
  },
  {
    "id": "365",
    "name": "Coral Montipora Kung Pao (Montipora sp.)",
    "commonName": "Coral Montipora Kung Pao",
    "scientificName": "Montipora sp.",
    "synonyms": [
      "Coral Montipora Kung Pao",
      "Coral Montipora Kung Pao (Montipora sp.)",
      "montipora-kung-pao.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "SPS (Pólipos Pequenos)"
  },
  {
    "id": "366",
    "name": "Coral Montipora Phoenix (Montipora sp.)",
    "commonName": "Coral Montipora Phoenix",
    "scientificName": "Montipora sp.",
    "synonyms": [
      "Coral Montipora Phoenix",
      "Coral Montipora Phoenix (Montipora sp.)",
      "montipora-phoenix.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "SPS (Pólipos Pequenos)"
  },
  {
    "id": "367",
    "name": "Coral Pavona Cactus Verde (Pavona decussata)",
    "commonName": "Coral Pavona Cactus Verde",
    "scientificName": "Pavona decussata",
    "synonyms": [
      "Coral Pavona Cactus Verde",
      "Coral Pavona Cactus Verde (Pavona decussata)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "213_pavona_cactus_mint.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "368",
    "name": "Coral Stylophora Pistillata Pink (Stylophora pistillata)",
    "commonName": "Coral Stylophora Pistillata Pink",
    "scientificName": "Stylophora pistillata",
    "synonyms": [
      "Coral Stylophora Pistillata Pink",
      "Coral Stylophora Pistillata Pink (Stylophora pistillata)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "214_stylophora_pink_rainbow.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "369",
    "name": "Coral Stylophora Rainbow (Stylophora sp.)",
    "commonName": "Coral Stylophora Rainbow",
    "scientificName": "Stylophora sp.",
    "synonyms": [
      "Coral Stylophora Rainbow",
      "Coral Stylophora Rainbow (Stylophora sp.)",
      "stylophora-rainbow.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "370",
    "name": "Seriatopora Bird of Paradise (ORA)",
    "commonName": "Seriatopora Bird of Paradise",
    "scientificName": "ORA",
    "synonyms": [
      "Seriatopora Bird of Paradise",
      "Seriatopora Bird of Paradise (ORA)",
      "bird of paradise",
      "seriatopora bird",
      "birdsnest"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "215_seriatopora_bird_of_paradise.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "SPS (Pólipos Pequenos)"
  },
  {
    "id": "371",
    "name": "Coral Pocillopora Damicornis Pink (Pocillopora damicornis)",
    "commonName": "Coral Pocillopora Damicornis Pink",
    "scientificName": "Pocillopora damicornis",
    "synonyms": [
      "Coral Pocillopora Damicornis Pink",
      "Coral Pocillopora Damicornis Pink (Pocillopora damicornis)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "216_pocillopora_rainbow_tricolor.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "372",
    "name": "Coral Pocillopora Damicornis Verde (Pocillopora damicornis)",
    "commonName": "Coral Pocillopora Damicornis Verde",
    "scientificName": "Pocillopora damicornis",
    "synonyms": [
      "Coral Pocillopora Damicornis Verde",
      "Coral Pocillopora Damicornis Verde (Pocillopora damicornis)",
      "pocillopora-damicornis-verde.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "Geral"
  },
  {
    "id": "373",
    "name": "Coral Acropora Walt Disney (Acropora tenuis)",
    "commonName": "Coral Acropora Walt Disney",
    "scientificName": "Acropora tenuis",
    "synonyms": [
      "Coral Acropora Walt Disney",
      "Coral Acropora Walt Disney (Acropora tenuis)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "217_acropora_walt_disney_tenuis.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "SPS (Pólipos Pequenos)"
  },
  {
    "id": "374",
    "name": "Coral Acropora Homewrecker (Acropora tenuis)",
    "commonName": "Coral Acropora Homewrecker",
    "scientificName": "Acropora tenuis",
    "synonyms": [
      "Coral Acropora Homewrecker",
      "Coral Acropora Homewrecker (Acropora tenuis)",
      "acropora-homewrecker.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "",
    "section": "Corais & Anêmonas",
    "familyGroup": "SPS (Pólipos Pequenos)"
  },
  {
    "id": "375",
    "name": "Acropora Strawberry Shortcake (A. microclados)",
    "commonName": "Acropora Strawberry Shortcake",
    "scientificName": "A. microclados",
    "synonyms": [
      "Acropora Strawberry Shortcake",
      "Acropora Strawberry Shortcake (A. microclados)",
      "strawberry shortcake",
      "ssc acropora",
      "acropora microclados"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "218_acropora_strawberry_shortcake.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "SPS (Pólipos Pequenos)"
  },
  {
    "id": "376",
    "name": "Coral Acropora Red Planet (Acropora anthocercis)",
    "commonName": "Coral Acropora Red Planet",
    "scientificName": "Acropora anthocercis",
    "synonyms": [
      "Coral Acropora Red Planet",
      "Coral Acropora Red Planet (Acropora anthocercis)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "219_acropora_red_planet_millepora.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "SPS (Pólipos Pequenos)"
  },
  {
    "id": "377",
    "name": "Coral Acropora Pink Millepora (Acropora millepora)",
    "commonName": "Coral Acropora Pink Millepora",
    "scientificName": "Acropora millepora",
    "synonyms": [
      "Coral Acropora Pink Millepora",
      "Coral Acropora Pink Millepora (Acropora millepora)",
      "acropora-millepora-rosa.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "acropora-millepora-rosa.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "SPS (Pólipos Pequenos)"
  },
  {
    "id": "378",
    "name": "Coral Acropora Oregon Tort (Acropora tortuosa)",
    "commonName": "Coral Acropora Oregon Tort",
    "scientificName": "Acropora tortuosa",
    "synonyms": [
      "Coral Acropora Oregon Tort",
      "Coral Acropora Oregon Tort (Acropora tortuosa)"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "220_acropora_oregon_tort_miyagi.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "SPS (Pólipos Pequenos)"
  },
  {
    "id": "379",
    "name": "Coral Acropora Cali Tort (Acropora tortuosa)",
    "commonName": "Coral Acropora Cali Tort",
    "scientificName": "Acropora tortuosa",
    "synonyms": [
      "Coral Acropora Cali Tort",
      "Coral Acropora Cali Tort (Acropora tortuosa)",
      "acropora-tortuosa.jpg"
    ],
    "type": "LIVING",
    "subCategory": "CORAL",
    "imageSlug": "acropora-tortuosa.jpg",
    "section": "Corais & Anêmonas",
    "familyGroup": "SPS (Pólipos Pequenos)"
  },
  {
    "id": "380",
    "name": "Peixe-Palhaço Clarkii (Amphiprion clarkii)",
    "commonName": "Peixe-Palhaço Clarkii",
    "scientificName": "Amphiprion clarkii",
    "synonyms": [
      "Peixe-Palhaço Clarkii",
      "Peixe-Palhaço Clarkii (Amphiprion clarkii)",
      "palhaco clarkii",
      "clarkii",
      "amphiprion clarkii"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "221_palhaco_clarkii.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Palhaços (Amphiprioninae)"
  },
  {
    "id": "381",
    "name": "Peixe-palhaço Tomato (Amphiprion frenatus)",
    "commonName": "Peixe-palhaço Tomato",
    "scientificName": "Amphiprion frenatus",
    "synonyms": [
      "Peixe-palhaço Tomato",
      "Peixe-palhaço Tomato (Amphiprion frenatus)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "",
    "section": "Peixes Marinhos",
    "familyGroup": "Palhaços (Amphiprioninae)"
  },
  {
    "id": "382",
    "name": "Peixe-palhaço Fire Cinela (Amphiprion melanopus)",
    "commonName": "Peixe-palhaço Fire Cinela",
    "scientificName": "Amphiprion melanopus",
    "synonyms": [
      "Peixe-palhaço Fire Cinela",
      "Peixe-palhaço Fire Cinela (Amphiprion melanopus)",
      "palhaco-fire-cinela.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "",
    "section": "Peixes Marinhos",
    "familyGroup": "Palhaços (Amphiprioninae)"
  },
  {
    "id": "383",
    "name": "Peixe-palhaço Pink Skunk (Amphiprion perideraion)",
    "commonName": "Peixe-palhaço Pink Skunk",
    "scientificName": "Amphiprion perideraion",
    "synonyms": [
      "Peixe-palhaço Pink Skunk",
      "Peixe-palhaço Pink Skunk (Amphiprion perideraion)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "223_palhaco_skunk_pink_orange.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Palhaços (Amphiprioninae)"
  },
  {
    "id": "384",
    "name": "Peixe-palhaço Orange Skunk (Amphiprion sandaracinos)",
    "commonName": "Peixe-palhaço Orange Skunk",
    "scientificName": "Amphiprion sandaracinos",
    "synonyms": [
      "Peixe-palhaço Orange Skunk",
      "Peixe-palhaço Orange Skunk (Amphiprion sandaracinos)",
      "palhaco-orange-skunk.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "palhaco-orange-skunk.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Palhaços (Amphiprioninae)"
  },
  {
    "id": "385",
    "name": "Peixe-palhaço Maroon (Premnas biaculeatus)",
    "commonName": "Peixe-palhaço Maroon",
    "scientificName": "Premnas biaculeatus",
    "synonyms": [
      "Peixe-palhaço Maroon",
      "Peixe-palhaço Maroon (Premnas biaculeatus)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "224_palhaco_maroon_lightning_gold.png",
    "section": "Peixes Marinhos",
    "familyGroup": "Palhaços (Amphiprioninae)"
  },
  {
    "id": "386",
    "name": "Peixe-palhaço Lightning Maroon (Premnas biaculeatus var. Lightning)",
    "commonName": "Peixe-palhaço Lightning Maroon",
    "scientificName": "Premnas biaculeatus var. Lightning",
    "synonyms": [
      "Peixe-palhaço Lightning Maroon",
      "Peixe-palhaço Lightning Maroon (Premnas biaculeatus var. Lightning)",
      "palhaco-lightning-maroon.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "",
    "section": "Peixes Marinhos",
    "familyGroup": "Palhaços (Amphiprioninae)"
  },
  {
    "id": "387",
    "name": "Peixe-palhaço Gold Nugget Maroon (Premnas biaculeatus var. Gold)",
    "commonName": "Peixe-palhaço Gold Nugget Maroon",
    "scientificName": "Premnas biaculeatus var. Gold",
    "synonyms": [
      "Peixe-palhaço Gold Nugget Maroon",
      "Peixe-palhaço Gold Nugget Maroon (Premnas biaculeatus var. Gold)",
      "palhaco-gold-nugget.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "",
    "section": "Peixes Marinhos",
    "familyGroup": "Palhaços (Amphiprioninae)"
  },
  {
    "id": "388",
    "name": "Peixe-palhaço Sebae (Amphiprion sebae)",
    "commonName": "Peixe-palhaço Sebae",
    "scientificName": "Amphiprion sebae",
    "synonyms": [
      "Peixe-palhaço Sebae",
      "Peixe-palhaço Sebae (Amphiprion sebae)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "225_palhaco_sebae_polymnus_saddleback.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Palhaços (Amphiprioninae)"
  },
  {
    "id": "389",
    "name": "Peixe-palhaço Saddleback (Amphiprion polymnus)",
    "commonName": "Peixe-palhaço Saddleback",
    "scientificName": "Amphiprion polymnus",
    "synonyms": [
      "Peixe-palhaço Saddleback",
      "Peixe-palhaço Saddleback (Amphiprion polymnus)",
      "palhaco-saddleback.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "",
    "section": "Peixes Marinhos",
    "familyGroup": "Palhaços (Amphiprioninae)"
  },
  {
    "id": "390",
    "name": "Purple Tang (Zebrasoma xanthurum)",
    "commonName": "Purple Tang",
    "scientificName": "Zebrasoma xanthurum",
    "synonyms": [
      "Purple Tang",
      "Purple Tang (Zebrasoma xanthurum)",
      "purple tang",
      "xanthurum",
      "tang roxo"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "226_purple_tang_xanthurum.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões (Acanthuridae)"
  },
  {
    "id": "391",
    "name": "Achilles Tang (Acanthurus achilles)",
    "commonName": "Achilles Tang",
    "scientificName": "Acanthurus achilles",
    "synonyms": [
      "Achilles Tang",
      "Achilles Tang (Acanthurus achilles)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "227_achilles_sohal_clown_tang.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões (Acanthuridae)"
  },
  {
    "id": "392",
    "name": "Sohal Tang (Acanthurus sohal)",
    "commonName": "Sohal Tang",
    "scientificName": "Acanthurus sohal",
    "synonyms": [
      "Sohal Tang",
      "Sohal Tang (Acanthurus sohal)",
      "tang-sohal.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões (Acanthuridae)"
  },
  {
    "id": "393",
    "name": "Clown Tang (Acanthurus lineatus)",
    "commonName": "Clown Tang",
    "scientificName": "Acanthurus lineatus",
    "synonyms": [
      "Clown Tang",
      "Clown Tang (Acanthurus lineatus)",
      "tang-lineatus-clown.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões (Acanthuridae)"
  },
  {
    "id": "394",
    "name": "Kole Tang Olho Amarelo (Ctenochaetus strigosus)",
    "commonName": "Kole Tang Olho Amarelo",
    "scientificName": "Ctenochaetus strigosus",
    "synonyms": [
      "Kole Tang Olho Amarelo",
      "Kole Tang Olho Amarelo (Ctenochaetus strigosus)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "228_kole_tang_tomini_chevron.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões (Acanthuridae)"
  },
  {
    "id": "395",
    "name": "Tomini Tang (Ctenochaetus tominiensis)",
    "commonName": "Tomini Tang",
    "scientificName": "Ctenochaetus tominiensis",
    "synonyms": [
      "Tomini Tang",
      "Tomini Tang (Ctenochaetus tominiensis)",
      "tang-tomini.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "",
    "section": "Peixes Marinhos",
    "familyGroup": "Tangs e Cirurgiões (Acanthuridae)"
  },
  {
    "id": "396",
    "name": "Foxface Rabbitfish (Siganus vulpinus)",
    "commonName": "Foxface Rabbitfish",
    "scientificName": "Siganus vulpinus",
    "synonyms": [
      "Foxface Rabbitfish",
      "Foxface Rabbitfish (Siganus vulpinus)",
      "foxface",
      "siganus vulpinus",
      "lo vulpinus"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "",
    "section": "Peixes Marinhos",
    "familyGroup": "Geral"
  },
  {
    "id": "397",
    "name": "Foxface Bicolor (Siganus uspi)",
    "commonName": "Foxface Bicolor",
    "scientificName": "Siganus uspi",
    "synonyms": [
      "Foxface Bicolor",
      "Foxface Bicolor (Siganus uspi)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "230_foxface_magnificent_bicolor.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Geral"
  },
  {
    "id": "398",
    "name": "Foxface Magnificent (Siganus magnificus)",
    "commonName": "Foxface Magnificent",
    "scientificName": "Siganus magnificus",
    "synonyms": [
      "Foxface Magnificent",
      "Foxface Magnificent (Siganus magnificus)",
      "foxface-magnificent.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "",
    "section": "Peixes Marinhos",
    "familyGroup": "Geral"
  },
  {
    "id": "399",
    "name": "Borboleta Copperband (Chelmon rostratus)",
    "commonName": "Borboleta Copperband",
    "scientificName": "Chelmon rostratus",
    "synonyms": [
      "Borboleta Copperband",
      "Borboleta Copperband (Chelmon rostratus)",
      "chelmon",
      "copperband",
      "borboleta copperband"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "",
    "section": "Peixes Marinhos",
    "familyGroup": "Equipe de Limpeza & Invertebrados"
  },
  {
    "id": "400",
    "name": "Borboleta Heniochus Acuminatus (Heniochus acuminatus)",
    "commonName": "Borboleta Heniochus Acuminatus",
    "scientificName": "Heniochus acuminatus",
    "synonyms": [
      "Borboleta Heniochus Acuminatus",
      "Borboleta Heniochus Acuminatus (Heniochus acuminatus)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "232_heniochus_bannerfish_moorish_idol.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Geral"
  },
  {
    "id": "401",
    "name": "Moorish Idol (Zanclus cornutus)",
    "commonName": "Moorish Idol",
    "scientificName": "Zanclus cornutus",
    "synonyms": [
      "Moorish Idol",
      "Moorish Idol (Zanclus cornutus)",
      "moorish-idol.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "",
    "section": "Peixes Marinhos",
    "familyGroup": "Geral"
  },
  {
    "id": "402",
    "name": "Anjo Imperador (Pomacanthus imperator)",
    "commonName": "Anjo Imperador",
    "scientificName": "Pomacanthus imperator",
    "synonyms": [
      "Anjo Imperador",
      "Anjo Imperador (Pomacanthus imperator)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Anjo (Pomacanthidae)"
  },
  {
    "id": "403",
    "name": "Anjo Koran (Pomacanthus semicirculatus)",
    "commonName": "Anjo Koran",
    "scientificName": "Pomacanthus semicirculatus",
    "synonyms": [
      "Anjo Koran",
      "Anjo Koran (Pomacanthus semicirculatus)",
      "anjo-koran.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Anjo (Pomacanthidae)"
  },
  {
    "id": "404",
    "name": "Anjo French (Pomacanthus paru)",
    "commonName": "Anjo French",
    "scientificName": "Pomacanthus paru",
    "synonyms": [
      "Anjo French",
      "Anjo French (Pomacanthus paru)",
      "anjo-french.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Anjo (Pomacanthidae)"
  },
  {
    "id": "405",
    "name": "Anjo Anão Bicolor (Centropyge bicolor)",
    "commonName": "Anjo Anão Bicolor",
    "scientificName": "Centropyge bicolor",
    "synonyms": [
      "Anjo Anão Bicolor",
      "Anjo Anão Bicolor (Centropyge bicolor)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "234_anjo_anao_bicolor_cherub.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Anjo (Pomacanthidae)"
  },
  {
    "id": "406",
    "name": "Anjo Anão Cherub Pigmeu (Centropyge argi)",
    "commonName": "Anjo Anão Cherub Pigmeu",
    "scientificName": "Centropyge argi",
    "synonyms": [
      "Anjo Anão Cherub Pigmeu",
      "Anjo Anão Cherub Pigmeu (Centropyge argi)",
      "anjo-cherub-argi.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Anjo (Pomacanthidae)"
  },
  {
    "id": "407",
    "name": "Anjo Anão Coral Beauty (Centropyge bispinosa)",
    "commonName": "Anjo Anão Coral Beauty",
    "scientificName": "Centropyge bispinosa",
    "synonyms": [
      "Anjo Anão Coral Beauty",
      "Anjo Anão Coral Beauty (Centropyge bispinosa)",
      "coral beauty",
      "centropyge bispinosa",
      "anjo coral beauty"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "235_anjo_coral_beauty_bispinosa.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Peixes-Anjo (Pomacanthidae)"
  },
  {
    "id": "408",
    "name": "Anthias Lyretail (Pseudanthias squamipinnis)",
    "commonName": "Anthias Lyretail",
    "scientificName": "Pseudanthias squamipinnis",
    "synonyms": [
      "Anthias Lyretail",
      "Anthias Lyretail (Pseudanthias squamipinnis)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "236_anthias_squamipinnis_dispar.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Geral"
  },
  {
    "id": "409",
    "name": "Anthias Dispar (Pseudanthias dispar)",
    "commonName": "Anthias Dispar",
    "scientificName": "Pseudanthias dispar",
    "synonyms": [
      "Anthias Dispar",
      "Anthias Dispar (Pseudanthias dispar)",
      "anthias-dispar.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "anthias-dispar.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Geral"
  },
  {
    "id": "410",
    "name": "Cleaner Wrasse Limpador (Labroides dimidiatus)",
    "commonName": "Cleaner Wrasse Limpador",
    "scientificName": "Labroides dimidiatus",
    "synonyms": [
      "Cleaner Wrasse Limpador",
      "Cleaner Wrasse Limpador (Labroides dimidiatus)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "237_cleaner_wrasse_labroides.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Bodiões e Wrasses (Labridae)"
  },
  {
    "id": "411",
    "name": "Melanurus Wrasse (Halichoeres melanurus)",
    "commonName": "Melanurus Wrasse",
    "scientificName": "Halichoeres melanurus",
    "synonyms": [
      "Melanurus Wrasse",
      "Melanurus Wrasse (Halichoeres melanurus)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "238_melanurus_leopard_wrasse.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Bodiões e Wrasses (Labridae)"
  },
  {
    "id": "412",
    "name": "Leopard Wrasse (Macropharyngodon meleagris)",
    "commonName": "Leopard Wrasse",
    "scientificName": "Macropharyngodon meleagris",
    "synonyms": [
      "Leopard Wrasse",
      "Leopard Wrasse (Macropharyngodon meleagris)",
      "wrasse-leopard.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "",
    "section": "Peixes Marinhos",
    "familyGroup": "Bodiões e Wrasses (Labridae)"
  },
  {
    "id": "413",
    "name": "Fairy Wrasse Yellow Flanked (Cirrhilabrus lyukyuensis)",
    "commonName": "Fairy Wrasse Yellow Flanked",
    "scientificName": "Cirrhilabrus lyukyuensis",
    "synonyms": [
      "Fairy Wrasse Yellow Flanked",
      "Fairy Wrasse Yellow Flanked (Cirrhilabrus lyukyuensis)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "239_fairy_flasher_wrasse_cirrhilabrus.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Bodiões e Wrasses (Labridae)"
  },
  {
    "id": "414",
    "name": "Flasher Wrasse McCosker (Paracheilinus mccoskeri)",
    "commonName": "Flasher Wrasse McCosker",
    "scientificName": "Paracheilinus mccoskeri",
    "synonyms": [
      "Flasher Wrasse McCosker",
      "Flasher Wrasse McCosker (Paracheilinus mccoskeri)",
      "wrasse-flasher-mccosker.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "",
    "section": "Peixes Marinhos",
    "familyGroup": "Bodiões e Wrasses (Labridae)"
  },
  {
    "id": "415",
    "name": "Diamond Watchman Goby (Valenciennea puellaris)",
    "commonName": "Diamond Watchman Goby",
    "scientificName": "Valenciennea puellaris",
    "synonyms": [
      "Diamond Watchman Goby",
      "Diamond Watchman Goby (Valenciennea puellaris)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "240_diamond_goby_valenciennea.jpeg",
    "section": "Peixes Marinhos",
    "familyGroup": "Gobies e Blênios"
  },
  {
    "id": "416",
    "name": "Golden Head Sleeper Goby (Valenciennea strigata)",
    "commonName": "Golden Head Sleeper Goby",
    "scientificName": "Valenciennea strigata",
    "synonyms": [
      "Golden Head Sleeper Goby",
      "Golden Head Sleeper Goby (Valenciennea strigata)",
      "goby-golden-head.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "",
    "section": "Peixes Marinhos",
    "familyGroup": "Gobies e Blênios"
  },
  {
    "id": "417",
    "name": "Yellow Clown Goby (Gobiodon okinawae)",
    "commonName": "Yellow Clown Goby",
    "scientificName": "Gobiodon okinawae",
    "synonyms": [
      "Yellow Clown Goby",
      "Yellow Clown Goby (Gobiodon okinawae)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "241_clown_goby_yellow_citrinus.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Gobies e Blênios"
  },
  {
    "id": "418",
    "name": "Clown Goby Citrinus (Gobiodon citrinus)",
    "commonName": "Clown Goby Citrinus",
    "scientificName": "Gobiodon citrinus",
    "synonyms": [
      "Clown Goby Citrinus",
      "Clown Goby Citrinus (Gobiodon citrinus)",
      "goby-citrinus.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "",
    "section": "Peixes Marinhos",
    "familyGroup": "Gobies e Blênios"
  },
  {
    "id": "419",
    "name": "Lawnmower Algae Blenny (Salarias fasciatus)",
    "commonName": "Lawnmower Algae Blenny",
    "scientificName": "Salarias fasciatus",
    "synonyms": [
      "Lawnmower Algae Blenny",
      "Lawnmower Algae Blenny (Salarias fasciatus)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "242_lawnmower_algae_blenny_salarias.png",
    "section": "Peixes Marinhos",
    "familyGroup": "Gobies e Blênios"
  },
  {
    "id": "420",
    "name": "Tailspot Blenny (Ecsenius stigmatura)",
    "commonName": "Tailspot Blenny",
    "scientificName": "Ecsenius stigmatura",
    "synonyms": [
      "Tailspot Blenny",
      "Tailspot Blenny (Ecsenius stigmatura)",
      "blenio-tailspot.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "blenio-tailspot.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Gobies e Blênios"
  },
  {
    "id": "421",
    "name": "Flame Hawkfish (Neocirrhites armatus)",
    "commonName": "Flame Hawkfish",
    "scientificName": "Neocirrhites armatus",
    "synonyms": [
      "Flame Hawkfish",
      "Flame Hawkfish (Neocirrhites armatus)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "243_flame_longnose_hawkfish.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Geral"
  },
  {
    "id": "422",
    "name": "Longnose Hawkfish (Oxycirrhites typus)",
    "commonName": "Longnose Hawkfish",
    "scientificName": "Oxycirrhites typus",
    "synonyms": [
      "Longnose Hawkfish",
      "Longnose Hawkfish (Oxycirrhites typus)",
      "hawkfish-longnose.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "hawkfish-longnose.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Geral"
  },
  {
    "id": "423",
    "name": "Moreia Snowflake (Echidna nebulosa)",
    "commonName": "Moreia Snowflake",
    "scientificName": "Echidna nebulosa",
    "synonyms": [
      "Moreia Snowflake",
      "Moreia Snowflake (Echidna nebulosa)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "",
    "section": "Peixes Marinhos",
    "familyGroup": "Geral"
  },
  {
    "id": "424",
    "name": "Lionfish Volitans (Pterois volitans)",
    "commonName": "Lionfish Volitans",
    "scientificName": "Pterois volitans",
    "synonyms": [
      "Lionfish Volitans",
      "Lionfish Volitans (Pterois volitans)",
      "lionfish-volitans.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "",
    "section": "Peixes Marinhos",
    "familyGroup": "Geral"
  },
  {
    "id": "425",
    "name": "Niger Trigger (Odonus niger)",
    "commonName": "Niger Trigger",
    "scientificName": "Odonus niger",
    "synonyms": [
      "Niger Trigger",
      "Niger Trigger (Odonus niger)",
      "trigger-niger.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "",
    "section": "Peixes Marinhos",
    "familyGroup": "Geral"
  },
  {
    "id": "426",
    "name": "Firefish Exquisite (Nemateleotris decora var. Exquisite)",
    "commonName": "Firefish Exquisite",
    "scientificName": "Nemateleotris decora var. Exquisite",
    "synonyms": [
      "Firefish Exquisite",
      "Firefish Exquisite (Nemateleotris decora var. Exquisite)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "245_exquisite_helfrichi_firefish.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Geral"
  },
  {
    "id": "427",
    "name": "Firefish Helfrichi (Nemateleotris helfrichi)",
    "commonName": "Firefish Helfrichi",
    "scientificName": "Nemateleotris helfrichi",
    "synonyms": [
      "Firefish Helfrichi",
      "Firefish Helfrichi (Nemateleotris helfrichi)",
      "firefish-helfrichi.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_FISH",
    "imageSlug": "firefish-helfrichi.jpg",
    "section": "Peixes Marinhos",
    "familyGroup": "Geral"
  },
  {
    "id": "428",
    "name": "Camarão Arlequim (Hymenocera picta)",
    "commonName": "Camarão Arlequim",
    "scientificName": "Hymenocera picta",
    "synonyms": [
      "Camarão Arlequim",
      "Camarão Arlequim (Hymenocera picta)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_INVERTEBRATE",
    "imageSlug": "",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Equipe de Limpeza & Invertebrados"
  },
  {
    "id": "429",
    "name": "Camarão Sexy Shrimp (Thor amboinensis)",
    "commonName": "Camarão Sexy Shrimp",
    "scientificName": "Thor amboinensis",
    "synonyms": [
      "Camarão Sexy Shrimp",
      "Camarão Sexy Shrimp (Thor amboinensis)",
      "camarao-sexy-shrimp.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_INVERTEBRATE",
    "imageSlug": "",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Equipe de Limpeza & Invertebrados"
  },
  {
    "id": "430",
    "name": "Camarão Peppermint (Lysmata wurdemanni)",
    "commonName": "Camarão Peppermint",
    "scientificName": "Lysmata wurdemanni",
    "synonyms": [
      "Camarão Peppermint",
      "Camarão Peppermint (Lysmata wurdemanni)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_INVERTEBRATE",
    "imageSlug": "247_camarao_peppermint_coral_banded.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Equipe de Limpeza & Invertebrados"
  },
  {
    "id": "431",
    "name": "Camarão Stenopus Coral Banded (Stenopus hispidus)",
    "commonName": "Camarão Stenopus Coral Banded",
    "scientificName": "Stenopus hispidus",
    "synonyms": [
      "Camarão Stenopus Coral Banded",
      "Camarão Stenopus Coral Banded (Stenopus hispidus)",
      "camarao-stenopus.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_INVERTEBRATE",
    "imageSlug": "camarao-stenopus.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Equipe de Limpeza & Invertebrados"
  },
  {
    "id": "432",
    "name": "Caranguejo Esmeralda Mithrax (Mithraculus sculptus)",
    "commonName": "Caranguejo Esmeralda Mithrax",
    "scientificName": "Mithraculus sculptus",
    "synonyms": [
      "Caranguejo Esmeralda Mithrax",
      "Caranguejo Esmeralda Mithrax (Mithraculus sculptus)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_INVERTEBRATE",
    "imageSlug": "248_caranguejo_esmeralda_mithrax.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Geral"
  },
  {
    "id": "433",
    "name": "Caranguejo Pom Pom Boxer (Lybia edmondsoni)",
    "commonName": "Caranguejo Pom Pom Boxer",
    "scientificName": "Lybia edmondsoni",
    "synonyms": [
      "Caranguejo Pom Pom Boxer",
      "Caranguejo Pom Pom Boxer (Lybia edmondsoni)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_INVERTEBRATE",
    "imageSlug": "249_caranguejo_pom_pom_porcelana.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Geral"
  },
  {
    "id": "434",
    "name": "Caranguejo Anêmona Porcelana (Neopetrolisthes maculatus)",
    "commonName": "Caranguejo Anêmona Porcelana",
    "scientificName": "Neopetrolisthes maculatus",
    "synonyms": [
      "Caranguejo Anêmona Porcelana",
      "Caranguejo Anêmona Porcelana (Neopetrolisthes maculatus)",
      "caranguejo-porcelana.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_INVERTEBRATE",
    "imageSlug": "",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Geral"
  },
  {
    "id": "435",
    "name": "Ostra Tridacna Maxima Azul (Tridacna maxima)",
    "commonName": "Ostra Tridacna Maxima Azul",
    "scientificName": "Tridacna maxima",
    "synonyms": [
      "Ostra Tridacna Maxima Azul",
      "Ostra Tridacna Maxima Azul (Tridacna maxima)"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_INVERTEBRATE",
    "imageSlug": "250_tridacna_maxima_crocea_ouriço.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Equipe de Limpeza & Invertebrados"
  },
  {
    "id": "436",
    "name": "Ostra Tridacna Crocea (Tridacna crocea)",
    "commonName": "Ostra Tridacna Crocea",
    "scientificName": "Tridacna crocea",
    "synonyms": [
      "Ostra Tridacna Crocea",
      "Ostra Tridacna Crocea (Tridacna crocea)",
      "tridacna-crocea.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_INVERTEBRATE",
    "imageSlug": "tridacna-crocea.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Equipe de Limpeza & Invertebrados"
  },
  {
    "id": "437",
    "name": "Estrela Vermelha Fromia (Fromia milleporella)",
    "commonName": "Estrela Vermelha Fromia",
    "scientificName": "Fromia milleporella",
    "synonyms": [
      "Estrela Vermelha Fromia",
      "Estrela Vermelha Fromia (Fromia milleporella)",
      "estrela-fromia.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_INVERTEBRATE",
    "imageSlug": "",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Geral"
  },
  {
    "id": "438",
    "name": "Ouriço Pincushion Tuxedo (Mespilia globulus)",
    "commonName": "Ouriço Pincushion Tuxedo",
    "scientificName": "Mespilia globulus",
    "synonyms": [
      "Ouriço Pincushion Tuxedo",
      "Ouriço Pincushion Tuxedo (Mespilia globulus)",
      "ourico-tuxedo.jpg"
    ],
    "type": "LIVING",
    "subCategory": "MARINE_INVERTEBRATE",
    "imageSlug": "ourico-tuxedo.jpg",
    "section": "Invertebrados Marinhos",
    "familyGroup": "Geral"
  },
  {
    "id": "439",
    "name": "Guppy Blue Grass (Poecilia reticulata)",
    "commonName": "Guppy Blue Grass",
    "scientificName": "Poecilia reticulata",
    "synonyms": [
      "Guppy Blue Grass",
      "Guppy Blue Grass (Poecilia reticulata)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "251_guppy_blue_grass_red_grass.png",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "440",
    "name": "Guppy Red Grass (Poecilia reticulata)",
    "commonName": "Guppy Red Grass",
    "scientificName": "Poecilia reticulata",
    "synonyms": [
      "Guppy Red Grass",
      "Guppy Red Grass (Poecilia reticulata)",
      "guppy-red-grass.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "441",
    "name": "Guppy Albino Sky Blue (Poecilia reticulata)",
    "commonName": "Guppy Albino Sky Blue",
    "scientificName": "Poecilia reticulata",
    "synonyms": [
      "Guppy Albino Sky Blue",
      "Guppy Albino Sky Blue (Poecilia reticulata)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "252_guppy_sky_blue_lazuli.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "442",
    "name": "Guppy Albino Topaz (Poecilia reticulata)",
    "commonName": "Guppy Albino Topaz",
    "scientificName": "Poecilia reticulata",
    "synonyms": [
      "Guppy Albino Topaz",
      "Guppy Albino Topaz (Poecilia reticulata)",
      "guppy-albino-topaz.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "443",
    "name": "Guppy Lazuli (Poecilia reticulata)",
    "commonName": "Guppy Lazuli",
    "scientificName": "Poecilia reticulata",
    "synonyms": [
      "Guppy Lazuli",
      "Guppy Lazuli (Poecilia reticulata)",
      "guppy-lazuli.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "444",
    "name": "Guppy Albino Japan Blue (Poecilia reticulata)",
    "commonName": "Guppy Albino Japan Blue",
    "scientificName": "Poecilia reticulata",
    "synonyms": [
      "Guppy Albino Japan Blue",
      "Guppy Albino Japan Blue (Poecilia reticulata)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "253_guppy_japan_blue_dragon_koi.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "445",
    "name": "Guppy Red Dragon (Poecilia reticulata)",
    "commonName": "Guppy Red Dragon",
    "scientificName": "Poecilia reticulata",
    "synonyms": [
      "Guppy Red Dragon",
      "Guppy Red Dragon (Poecilia reticulata)",
      "guppy-red-dragon.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "446",
    "name": "Guppy Koi Tuxedo (Poecilia reticulata)",
    "commonName": "Guppy Koi Tuxedo",
    "scientificName": "Poecilia reticulata",
    "synonyms": [
      "Guppy Koi Tuxedo",
      "Guppy Koi Tuxedo (Poecilia reticulata)",
      "guppy-koi-tuxedo.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "447",
    "name": "Betta Mustard Gas (Betta splendens)",
    "commonName": "Betta Mustard Gas",
    "scientificName": "Betta splendens",
    "synonyms": [
      "Betta Mustard Gas",
      "Betta Mustard Gas (Betta splendens)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "254_betta_mustard_gas.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Bettas & Anabantídeos"
  },
  {
    "id": "448",
    "name": "Betta Black Orchid (Betta splendens)",
    "commonName": "Betta Black Orchid",
    "scientificName": "Betta splendens",
    "synonyms": [
      "Betta Black Orchid",
      "Betta Black Orchid (Betta splendens)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Bettas & Anabantídeos"
  },
  {
    "id": "449",
    "name": "Betta Black Samurai (Betta splendens)",
    "commonName": "Betta Black Samurai",
    "scientificName": "Betta splendens",
    "synonyms": [
      "Betta Black Samurai",
      "Betta Black Samurai (Betta splendens)",
      "betta-black-samurai.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Bettas & Anabantídeos"
  },
  {
    "id": "450",
    "name": "Betta Dragon Scale Red (Betta splendens)",
    "commonName": "Betta Dragon Scale Red",
    "scientificName": "Betta splendens",
    "synonyms": [
      "Betta Dragon Scale Red",
      "Betta Dragon Scale Red (Betta splendens)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "256_betta_dragon_scale_super_red.png",
    "section": "Peixes de Água Doce",
    "familyGroup": "Bettas & Anabantídeos"
  },
  {
    "id": "451",
    "name": "Betta Dragon Scale Black (Betta splendens)",
    "commonName": "Betta Dragon Scale Black",
    "scientificName": "Betta splendens",
    "synonyms": [
      "Betta Dragon Scale Black",
      "Betta Dragon Scale Black (Betta splendens)",
      "betta-dragon-scale-black.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Bettas & Anabantídeos"
  },
  {
    "id": "452",
    "name": "Betta Super Red Halfmoon (Betta splendens)",
    "commonName": "Betta Super Red Halfmoon",
    "scientificName": "Betta splendens",
    "synonyms": [
      "Betta Super Red Halfmoon",
      "Betta Super Red Halfmoon (Betta splendens)",
      "betta-super-red.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Bettas & Anabantídeos"
  },
  {
    "id": "453",
    "name": "Betta Double Tail Dupla Cauda (Betta splendens)",
    "commonName": "Betta Double Tail Dupla Cauda",
    "scientificName": "Betta splendens",
    "synonyms": [
      "Betta Double Tail Dupla Cauda",
      "Betta Double Tail Dupla Cauda (Betta splendens)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "257_betta_double_tail_rosetail.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Bettas & Anabantídeos"
  },
  {
    "id": "454",
    "name": "Betta Rosetail Halfmoon (Betta splendens)",
    "commonName": "Betta Rosetail Halfmoon",
    "scientificName": "Betta splendens",
    "synonyms": [
      "Betta Rosetail Halfmoon",
      "Betta Rosetail Halfmoon (Betta splendens)",
      "betta-rosetail.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Bettas & Anabantídeos"
  },
  {
    "id": "455",
    "name": "Betta Giant King (Betta splendens var. Giant)",
    "commonName": "Betta Giant King",
    "scientificName": "Betta splendens var. Giant",
    "synonyms": [
      "Betta Giant King",
      "Betta Giant King (Betta splendens var. Giant)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "258_betta_giant_alien_wild.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Bettas & Anabantídeos"
  },
  {
    "id": "456",
    "name": "Betta Alien Híbrido (Betta imbellis x splendens)",
    "commonName": "Betta Alien Híbrido",
    "scientificName": "Betta imbellis x splendens",
    "synonyms": [
      "Betta Alien Híbrido",
      "Betta Alien Híbrido (Betta imbellis x splendens)",
      "betta-alien.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Bettas & Anabantídeos"
  },
  {
    "id": "457",
    "name": "Plati Tiger Bumblebee (Xiphophorus maculatus)",
    "commonName": "Plati Tiger Bumblebee",
    "scientificName": "Xiphophorus maculatus",
    "synonyms": [
      "Plati Tiger Bumblebee",
      "Plati Tiger Bumblebee (Xiphophorus maculatus)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "458",
    "name": "Plati Panda (Xiphophorus maculatus)",
    "commonName": "Plati Panda",
    "scientificName": "Xiphophorus maculatus",
    "synonyms": [
      "Plati Panda",
      "Plati Panda (Xiphophorus maculatus)",
      "plati-panda.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "459",
    "name": "Molinésia Velífera Verde (Poecilia velifera)",
    "commonName": "Molinésia Velífera Verde",
    "scientificName": "Poecilia velifera",
    "synonyms": [
      "Molinésia Velífera Verde",
      "Molinésia Velífera Verde (Poecilia velifera)",
      "molinesia-velifera.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "molinesia-velifera.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Poecilídeos (Ovivíparos)"
  },
  {
    "id": "460",
    "name": "Killifish Fundulopanchax Gardneri (Fundulopanchax gardneri)",
    "commonName": "Killifish Fundulopanchax Gardneri",
    "scientificName": "Fundulopanchax gardneri",
    "synonyms": [
      "Killifish Fundulopanchax Gardneri",
      "Killifish Fundulopanchax Gardneri (Fundulopanchax gardneri)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "260_killifish_gardneri_australe.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "461",
    "name": "Killifish Aphyosemion Australe Orange (Aphyosemion australe)",
    "commonName": "Killifish Aphyosemion Australe Orange",
    "scientificName": "Aphyosemion australe",
    "synonyms": [
      "Killifish Aphyosemion Australe Orange",
      "Killifish Aphyosemion Australe Orange (Aphyosemion australe)",
      "killifish-australe.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "462",
    "name": "Tetra Imperador (Nematobrycon palmeri)",
    "commonName": "Tetra Imperador",
    "scientificName": "Nematobrycon palmeri",
    "synonyms": [
      "Tetra Imperador",
      "Tetra Imperador (Nematobrycon palmeri)",
      "tetra imperador",
      "emperor tetra",
      "nematobrycon"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "261_tetra_imperador_palmeri.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "463",
    "name": "Tetra Imperador Black (Nematobrycon palmeri var. Black)",
    "commonName": "Tetra Imperador Black",
    "scientificName": "Nematobrycon palmeri var. Black",
    "synonyms": [
      "Tetra Imperador Black",
      "Tetra Imperador Black (Nematobrycon palmeri var. Black)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "262_tetra_imperador_black_inpaichthys.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "464",
    "name": "Tetra Kerri Super Blue (Inpaichthys kerri)",
    "commonName": "Tetra Kerri Super Blue",
    "scientificName": "Inpaichthys kerri",
    "synonyms": [
      "Tetra Kerri Super Blue",
      "Tetra Kerri Super Blue (Inpaichthys kerri)",
      "tetra-kerri.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "465",
    "name": "Tetra Limão (Hyphessobrycon pulchripinnis)",
    "commonName": "Tetra Limão",
    "scientificName": "Hyphessobrycon pulchripinnis",
    "synonyms": [
      "Tetra Limão",
      "Tetra Limão (Hyphessobrycon pulchripinnis)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "263_tetra_limao_pristella.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "466",
    "name": "Tetra Pristella Raio-X (Pristella maxillaris)",
    "commonName": "Tetra Pristella Raio-X",
    "scientificName": "Pristella maxillaris",
    "synonyms": [
      "Tetra Pristella Raio-X",
      "Tetra Pristella Raio-X (Pristella maxillaris)",
      "tetra-pristella.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "467",
    "name": "Tetra Fantasma Negro (Hyphessobrycon megalopterus)",
    "commonName": "Tetra Fantasma Negro",
    "scientificName": "Hyphessobrycon megalopterus",
    "synonyms": [
      "Tetra Fantasma Negro",
      "Tetra Fantasma Negro (Hyphessobrycon megalopterus)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "264_tetra_fantasma_negro_vermelho.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "468",
    "name": "Tetra Fantasma Vermelho (Hyphessobrycon sweglesi)",
    "commonName": "Tetra Fantasma Vermelho",
    "scientificName": "Hyphessobrycon sweglesi",
    "synonyms": [
      "Tetra Fantasma Vermelho",
      "Tetra Fantasma Vermelho (Hyphessobrycon sweglesi)",
      "tetra-fantasma-vermelho.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "tetra-fantasma-vermelho.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "469",
    "name": "Tetra do Congo (Phenacogrammus interruptus)",
    "commonName": "Tetra do Congo",
    "scientificName": "Phenacogrammus interruptus",
    "synonyms": [
      "Tetra do Congo",
      "Tetra do Congo (Phenacogrammus interruptus)",
      "tetra congo",
      "congo tetra",
      "phenacogrammus"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "265_tetra_congo_phenacogrammus.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "470",
    "name": "Tetra Diamante (Moenkhausia pittieri)",
    "commonName": "Tetra Diamante",
    "scientificName": "Moenkhausia pittieri",
    "synonyms": [
      "Tetra Diamante",
      "Tetra Diamante (Moenkhausia pittieri)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "266_tetra_diamante_olho_de_fogo.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "471",
    "name": "Tetra Olho-de-Fogo (Hemigrammus ocellifer)",
    "commonName": "Tetra Olho-de-Fogo",
    "scientificName": "Hemigrammus ocellifer",
    "synonyms": [
      "Tetra Olho-de-Fogo",
      "Tetra Olho-de-Fogo (Hemigrammus ocellifer)",
      "tetra-olho-de-fogo.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "tetra-olho-de-fogo.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "472",
    "name": "Tetra Bleeding Heart Coração Sangrento (Hyphessobrycon erythrostigma)",
    "commonName": "Tetra Bleeding Heart Coração Sangrento",
    "scientificName": "Hyphessobrycon erythrostigma",
    "synonyms": [
      "Tetra Bleeding Heart Coração Sangrento",
      "Tetra Bleeding Heart Coração Sangrento (Hyphessobrycon erythrostigma)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "267_tetra_rosaceo_ornatus_bleeding_heart.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "473",
    "name": "Tetra Rosáceo (Hyphessobrycon rosaceus)",
    "commonName": "Tetra Rosáceo",
    "scientificName": "Hyphessobrycon rosaceus",
    "synonyms": [
      "Tetra Rosáceo",
      "Tetra Rosáceo (Hyphessobrycon rosaceus)",
      "tetra-rosaceo.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "474",
    "name": "Tetra Ornatus Branco (Hyphessobrycon bentosi)",
    "commonName": "Tetra Ornatus Branco",
    "scientificName": "Hyphessobrycon bentosi",
    "synonyms": [
      "Tetra Ornatus Branco",
      "Tetra Ornatus Branco (Hyphessobrycon bentosi)",
      "tetra-ornatus.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "475",
    "name": "Tetra Pinguim (Thayeria boehlkei)",
    "commonName": "Tetra Pinguim",
    "scientificName": "Thayeria boehlkei",
    "synonyms": [
      "Tetra Pinguim",
      "Tetra Pinguim (Thayeria boehlkei)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "268_tetra_pinguim_glowlight_buenos_aires.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "476",
    "name": "Tetra Glowlight (Hemigrammus erythrozonus)",
    "commonName": "Tetra Glowlight",
    "scientificName": "Hemigrammus erythrozonus",
    "synonyms": [
      "Tetra Glowlight",
      "Tetra Glowlight (Hemigrammus erythrozonus)",
      "tetra-glowlight.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "tetra-glowlight.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "477",
    "name": "Tetra Buenos Aires (Hyphessobrycon anisitsi)",
    "commonName": "Tetra Buenos Aires",
    "scientificName": "Hyphessobrycon anisitsi",
    "synonyms": [
      "Tetra Buenos Aires",
      "Tetra Buenos Aires (Hyphessobrycon anisitsi)",
      "tetra-buenos-aires.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "tetra-buenos-aires.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "478",
    "name": "Peixe-Lápis Vermelho (Nannostomus beckfordi)",
    "commonName": "Peixe-Lápis Vermelho",
    "scientificName": "Nannostomus beckfordi",
    "synonyms": [
      "Peixe-Lápis Vermelho",
      "Peixe-Lápis Vermelho (Nannostomus beckfordi)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "479",
    "name": "Peixe-Borboleta de Água Doce (Carnegiella strigata)",
    "commonName": "Peixe-Borboleta de Água Doce",
    "scientificName": "Carnegiella strigata",
    "synonyms": [
      "Peixe-Borboleta de Água Doce",
      "Peixe-Borboleta de Água Doce (Carnegiella strigata)",
      "peixe-borboleta-carnegiella.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "peixe-borboleta-carnegiella.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "480",
    "name": "Rásbora Mosquito Chili (Boraras brigittae)",
    "commonName": "Rásbora Mosquito Chili",
    "scientificName": "Boraras brigittae",
    "synonyms": [
      "Rásbora Mosquito Chili",
      "Rásbora Mosquito Chili (Boraras brigittae)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "270_rasbora_chili_brigittae_espei.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "481",
    "name": "Rásbora Espei Lambchop (Trigonostigma espei)",
    "commonName": "Rásbora Espei Lambchop",
    "scientificName": "Trigonostigma espei",
    "synonyms": [
      "Rásbora Espei Lambchop",
      "Rásbora Espei Lambchop (Trigonostigma espei)",
      "rasbora-espei.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "rasbora-espei.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "482",
    "name": "Barbo Denisoni Torpedo (Sahyadria denisonii)",
    "commonName": "Barbo Denisoni Torpedo",
    "scientificName": "Sahyadria denisonii",
    "synonyms": [
      "Barbo Denisoni Torpedo",
      "Barbo Denisoni Torpedo (Sahyadria denisonii)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "271_barbo_denisoni_torpedo.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "483",
    "name": "Barbo Odessa (Pethia padamya)",
    "commonName": "Barbo Odessa",
    "scientificName": "Pethia padamya",
    "synonyms": [
      "Barbo Odessa",
      "Barbo Odessa (Pethia padamya)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "272_barbo_odessa_tinfoil_conchonius.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "484",
    "name": "Barbo Rosy Conchonius (Pethia conchonius)",
    "commonName": "Barbo Rosy Conchonius",
    "scientificName": "Pethia conchonius",
    "synonyms": [
      "Barbo Rosy Conchonius",
      "Barbo Rosy Conchonius (Pethia conchonius)",
      "barbo-conchonius.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "485",
    "name": "Barbo Tinfoil Barbo Prata (Barbonymus schwanenfeldii)",
    "commonName": "Barbo Tinfoil Barbo Prata",
    "scientificName": "Barbonymus schwanenfeldii",
    "synonyms": [
      "Barbo Tinfoil Barbo Prata",
      "Barbo Tinfoil Barbo Prata (Barbonymus schwanenfeldii)",
      "barbo-tinfoil.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "486",
    "name": "Tanichthys Neon Chinês Dourado (Tanichthys albonubes var. Gold)",
    "commonName": "Tanichthys Neon Chinês Dourado",
    "scientificName": "Tanichthys albonubes var. Gold",
    "synonyms": [
      "Tanichthys Neon Chinês Dourado",
      "Tanichthys Neon Chinês Dourado (Tanichthys albonubes var. Gold)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "273_tanichthys_white_cloud_gold.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "487",
    "name": "Tanichthys Neon Chinês Clássico (Tanichthys albonubes)",
    "commonName": "Tanichthys Neon Chinês Clássico",
    "scientificName": "Tanichthys albonubes",
    "synonyms": [
      "Tanichthys Neon Chinês Clássico",
      "Tanichthys Neon Chinês Clássico (Tanichthys albonubes)",
      "tanichthys-albonubes.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "488",
    "name": "Peixe Arco-Íris Boesemani (Melanotaenia boesemani)",
    "commonName": "Peixe Arco-Íris Boesemani",
    "scientificName": "Melanotaenia boesemani",
    "synonyms": [
      "Peixe Arco-Íris Boesemani",
      "Peixe Arco-Íris Boesemani (Melanotaenia boesemani)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "274_arco_iris_boesemani_praecox.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "489",
    "name": "Peixe Arco-Íris Neon Praecox (Melanotaenia praecox)",
    "commonName": "Peixe Arco-Íris Neon Praecox",
    "scientificName": "Melanotaenia praecox",
    "synonyms": [
      "Peixe Arco-Íris Neon Praecox",
      "Peixe Arco-Íris Neon Praecox (Melanotaenia praecox)",
      "arco-iris-praecox.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "490",
    "name": "Peixe Arco-Íris Furcatus (Pseudomugil furcatus)",
    "commonName": "Peixe Arco-Íris Furcatus",
    "scientificName": "Pseudomugil furcatus",
    "synonyms": [
      "Peixe Arco-Íris Furcatus",
      "Peixe Arco-Íris Furcatus (Pseudomugil furcatus)",
      "pseudomugil-furcatus.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "491",
    "name": "Acará Bandeira Blue Paraíba (Pterophyllum scalare var. Blue Paraíba)",
    "commonName": "Acará Bandeira Blue Paraíba",
    "scientificName": "Pterophyllum scalare var. Blue Paraíba",
    "synonyms": [
      "Acará Bandeira Blue Paraíba",
      "Acará Bandeira Blue Paraíba (Pterophyllum scalare var. Blue Paraíba)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "275_acara_bandeira_blue_paraiba_altum.webp",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "492",
    "name": "Acará Bandeira Avatar (Pterophyllum scalare var. Avatar)",
    "commonName": "Acará Bandeira Avatar",
    "scientificName": "Pterophyllum scalare var. Avatar",
    "synonyms": [
      "Acará Bandeira Avatar",
      "Acará Bandeira Avatar (Pterophyllum scalare var. Avatar)",
      "acara-bandeira-avatar.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "493",
    "name": "Acará Altum Peruano (Pterophyllum scalare var. Peru Altum)",
    "commonName": "Acará Altum Peruano",
    "scientificName": "Pterophyllum scalare var. Peru Altum",
    "synonyms": [
      "Acará Altum Peruano",
      "Acará Altum Peruano (Pterophyllum scalare var. Peru Altum)",
      "acara-altum-verdadeiro.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-altum-verdadeiro.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "494",
    "name": "Acará Bandeira Gold Marble (Pterophyllum scalare var. Gold Marble)",
    "commonName": "Acará Bandeira Gold Marble",
    "scientificName": "Pterophyllum scalare var. Gold Marble",
    "synonyms": [
      "Acará Bandeira Gold Marble",
      "Acará Bandeira Gold Marble (Pterophyllum scalare var. Gold Marble)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "276_acara_bandeira_red_devil_dumerilii.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "495",
    "name": "Acará Bandeira Red Devil (Pterophyllum scalare var. Red Devil)",
    "commonName": "Acará Bandeira Red Devil",
    "scientificName": "Pterophyllum scalare var. Red Devil",
    "synonyms": [
      "Acará Bandeira Red Devil",
      "Acará Bandeira Red Devil (Pterophyllum scalare var. Red Devil)",
      "acara-bandeira-red-devil.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "496",
    "name": "Acará Bandeira Leopoldi (Pterophyllum leopoldi)",
    "commonName": "Acará Bandeira Leopoldi",
    "scientificName": "Pterophyllum leopoldi",
    "synonyms": [
      "Acará Bandeira Leopoldi",
      "Acará Bandeira Leopoldi (Pterophyllum leopoldi)",
      "acara-bandeira-leopoldi.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "497",
    "name": "Acará Disco Red Melon (Symphysodon aequifasciatus var. Red Melon)",
    "commonName": "Acará Disco Red Melon",
    "scientificName": "Symphysodon aequifasciatus var. Red Melon",
    "synonyms": [
      "Acará Disco Red Melon",
      "Acará Disco Red Melon (Symphysodon aequifasciatus var. Red Melon)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "277_acara_disco_red_melon_marlboro.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "498",
    "name": "Acará Disco Red Cover (Symphysodon aequifasciatus var. Red Cover)",
    "commonName": "Acará Disco Red Cover",
    "scientificName": "Symphysodon aequifasciatus var. Red Cover",
    "synonyms": [
      "Acará Disco Red Cover",
      "Acará Disco Red Cover (Symphysodon aequifasciatus var. Red Cover)",
      "acara-disco-red-cover.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "499",
    "name": "Acará Disco Snakeskin (Symphysodon aequifasciatus var. Snakeskin)",
    "commonName": "Acará Disco Snakeskin",
    "scientificName": "Symphysodon aequifasciatus var. Snakeskin",
    "synonyms": [
      "Acará Disco Snakeskin",
      "Acará Disco Snakeskin (Symphysodon aequifasciatus var. Snakeskin)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "278_acara_disco_snake_skin_checkerboard.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "500",
    "name": "Acará Disco Checkerboard (Symphysodon aequifasciatus var. Checkerboard)",
    "commonName": "Acará Disco Checkerboard",
    "scientificName": "Symphysodon aequifasciatus var. Checkerboard",
    "synonyms": [
      "Acará Disco Checkerboard",
      "Acará Disco Checkerboard (Symphysodon aequifasciatus var. Checkerboard)",
      "acara-disco-checkerboard.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "501",
    "name": "Acará Disco Yellow Crystal (Symphysodon aequifasciatus var. Yellow)",
    "commonName": "Acará Disco Yellow Crystal",
    "scientificName": "Symphysodon aequifasciatus var. Yellow",
    "synonyms": [
      "Acará Disco Yellow Crystal",
      "Acará Disco Yellow Crystal (Symphysodon aequifasciatus var. Yellow)",
      "acara-disco-yellow.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "502",
    "name": "Ramirezi Balão Electric Blue (Mikrogeophagus ramirezi var. Balloon Blue)",
    "commonName": "Ramirezi Balão Electric Blue",
    "scientificName": "Mikrogeophagus ramirezi var. Balloon Blue",
    "synonyms": [
      "Ramirezi Balão Electric Blue",
      "Ramirezi Balão Electric Blue (Mikrogeophagus ramirezi var. Balloon Blue)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "279_ramirezi_balao_veu.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "503",
    "name": "Ramirezi Balão Gold (Mikrogeophagus ramirezi var. Balloon Gold)",
    "commonName": "Ramirezi Balão Gold",
    "scientificName": "Mikrogeophagus ramirezi var. Balloon Gold",
    "synonyms": [
      "Ramirezi Balão Gold",
      "Ramirezi Balão Gold (Mikrogeophagus ramirezi var. Balloon Gold)",
      "ramirezi-balao-gold.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "504",
    "name": "Ramirezi Véu Longfin (Mikrogeophagus ramirezi var. Longfin)",
    "commonName": "Ramirezi Véu Longfin",
    "scientificName": "Mikrogeophagus ramirezi var. Longfin",
    "synonyms": [
      "Ramirezi Véu Longfin",
      "Ramirezi Véu Longfin (Mikrogeophagus ramirezi var. Longfin)",
      "ramirezi-veu.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "505",
    "name": "Ramirezi Boliviano Papilocromis (Mikrogeophagus altispinosus)",
    "commonName": "Ramirezi Boliviano Papilocromis",
    "scientificName": "Mikrogeophagus altispinosus",
    "synonyms": [
      "Ramirezi Boliviano Papilocromis",
      "Ramirezi Boliviano Papilocromis (Mikrogeophagus altispinosus)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "280_ramirezi_boliviano_altispinosus.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "506",
    "name": "Kribensis Comum (Pelvicachromis pulcher)",
    "commonName": "Kribensis Comum",
    "scientificName": "Pelvicachromis pulcher",
    "synonyms": [
      "Kribensis Comum",
      "Kribensis Comum (Pelvicachromis pulcher)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "281_kribensis_laetacara_borellii.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "507",
    "name": "Apistogramma Borellii Opal (Apistogramma borellii)",
    "commonName": "Apistogramma Borellii Opal",
    "scientificName": "Apistogramma borellii",
    "synonyms": [
      "Apistogramma Borellii Opal",
      "Apistogramma Borellii Opal (Apistogramma borellii)",
      "apistogramma-borellii.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "apistogramma-borellii.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "508",
    "name": "Laetacara Curviceps Peixe-Bandeira Anão (Laetacara curviceps)",
    "commonName": "Laetacara Curviceps Peixe-Bandeira Anão",
    "scientificName": "Laetacara curviceps",
    "synonyms": [
      "Laetacara Curviceps Peixe-Bandeira Anão",
      "Laetacara Curviceps Peixe-Bandeira Anão (Laetacara curviceps)",
      "laetacara-curviceps.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "509",
    "name": "Acará Severo Gold (Heros efasciatus var. Gold)",
    "commonName": "Acará Severo Gold",
    "scientificName": "Heros efasciatus var. Gold",
    "synonyms": [
      "Acará Severo Gold",
      "Acará Severo Gold (Heros efasciatus var. Gold)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "510",
    "name": "Acará Severo Red Spotted (Heros efasciatus var. Red Spotted)",
    "commonName": "Acará Severo Red Spotted",
    "scientificName": "Heros efasciatus var. Red Spotted",
    "synonyms": [
      "Acará Severo Red Spotted",
      "Acará Severo Red Spotted (Heros efasciatus var. Red Spotted)",
      "acara-severo-green.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-severo-green.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "511",
    "name": "Acará Festivum Mesonauta (Mesonauta festivus)",
    "commonName": "Acará Festivum Mesonauta",
    "scientificName": "Mesonauta festivus",
    "synonyms": [
      "Acará Festivum Mesonauta",
      "Acará Festivum Mesonauta (Mesonauta festivus)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "283_acara_festivum_geophagus_joia.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "512",
    "name": "Geophagus Sveni Tronco (Geophagus sveni)",
    "commonName": "Geophagus Sveni Tronco",
    "scientificName": "Geophagus sveni",
    "synonyms": [
      "Geophagus Sveni Tronco",
      "Geophagus Sveni Tronco (Geophagus sveni)",
      "acara-geophagus-sveni.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "acara-geophagus-sveni.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "513",
    "name": "Ciclídeo Joia Vermelho (Hemichromis bimaculatus)",
    "commonName": "Ciclídeo Joia Vermelho",
    "scientificName": "Hemichromis bimaculatus",
    "synonyms": [
      "Ciclídeo Joia Vermelho",
      "Ciclídeo Joia Vermelho (Hemichromis bimaculatus)",
      "ciclideo-joia.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "514",
    "name": "Jack Dempsey Electric Blue (Rocio octofasciata var. Blue)",
    "commonName": "Jack Dempsey Electric Blue",
    "scientificName": "Rocio octofasciata var. Blue",
    "synonyms": [
      "Jack Dempsey Electric Blue",
      "Jack Dempsey Electric Blue (Rocio octofasciata var. Blue)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "284_jack_dempsey_electric_blue_acara.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "515",
    "name": "Acará Azul Electric Blue (Andinoacara pulcher var. Blue)",
    "commonName": "Acará Azul Electric Blue",
    "scientificName": "Andinoacara pulcher var. Blue",
    "synonyms": [
      "Acará Azul Electric Blue",
      "Acará Azul Electric Blue (Andinoacara pulcher var. Blue)",
      "acara-azul-eletrico.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "516",
    "name": "Ciclídeo Flowerhorn Red Dragon (Amphilophus hybrid)",
    "commonName": "Ciclídeo Flowerhorn Red Dragon",
    "scientificName": "Amphilophus hybrid",
    "synonyms": [
      "Ciclídeo Flowerhorn Red Dragon",
      "Ciclídeo Flowerhorn Red Dragon (Amphilophus hybrid)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "517",
    "name": "Acará Papagaio Blood Parrot (Amphilophus citrinellus x Vieja)",
    "commonName": "Acará Papagaio Blood Parrot",
    "scientificName": "Amphilophus citrinellus x Vieja",
    "synonyms": [
      "Acará Papagaio Blood Parrot",
      "Acará Papagaio Blood Parrot (Amphilophus citrinellus x Vieja)",
      "acara-papagaio.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "518",
    "name": "Ciclídeo Frontosa Moba Zaire (Cyphotilapia frontosa)",
    "commonName": "Ciclídeo Frontosa Moba Zaire",
    "scientificName": "Cyphotilapia frontosa",
    "synonyms": [
      "Ciclídeo Frontosa Moba Zaire",
      "Ciclídeo Frontosa Moba Zaire (Cyphotilapia frontosa)",
      "ciclideo-frontosa.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Ciclídeos (Americanos e Africanos)"
  },
  {
    "id": "519",
    "name": "Coridora Julii Leopardo (Corydoras julii)",
    "commonName": "Coridora Julii Leopardo",
    "scientificName": "Corydoras julii",
    "synonyms": [
      "Coridora Julii Leopardo",
      "Coridora Julii Leopardo (Corydoras julii)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "286_coridora_julii_trilineatus_adolfoi.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras (Callichthyidae)"
  },
  {
    "id": "520",
    "name": "Coridora Trilineatus (Corydoras trilineatus)",
    "commonName": "Coridora Trilineatus",
    "scientificName": "Corydoras trilineatus",
    "synonyms": [
      "Coridora Trilineatus",
      "Coridora Trilineatus (Corydoras trilineatus)",
      "coridora-trilineatus.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras (Callichthyidae)"
  },
  {
    "id": "521",
    "name": "Coridora Adolfoi (Corydoras adolfoi)",
    "commonName": "Coridora Adolfoi",
    "scientificName": "Corydoras adolfoi",
    "synonyms": [
      "Coridora Adolfoi",
      "Coridora Adolfoi (Corydoras adolfoi)",
      "coridora-adolfoi.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "coridora-adolfoi.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras (Callichthyidae)"
  },
  {
    "id": "522",
    "name": "Coridora Pigmeu Anã (Corydoras pygmaeus)",
    "commonName": "Coridora Pigmeu Anã",
    "scientificName": "Corydoras pygmaeus",
    "synonyms": [
      "Coridora Pigmeu Anã",
      "Coridora Pigmeu Anã (Corydoras pygmaeus)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "287_coridora_pigmeu_hastatus_habrosus.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras (Callichthyidae)"
  },
  {
    "id": "523",
    "name": "Coridora Hastatus (Corydoras hastatus)",
    "commonName": "Coridora Hastatus",
    "scientificName": "Corydoras hastatus",
    "synonyms": [
      "Coridora Hastatus",
      "Coridora Hastatus (Corydoras hastatus)",
      "coridora-ana-hastatus.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "coridora-ana-hastatus.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras (Callichthyidae)"
  },
  {
    "id": "524",
    "name": "Coridora Habrosus (Corydoras habrosus)",
    "commonName": "Coridora Habrosus",
    "scientificName": "Corydoras habrosus",
    "synonyms": [
      "Coridora Habrosus",
      "Coridora Habrosus (Corydoras habrosus)",
      "coridora-ana-habrosus.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "coridora-ana-habrosus.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Coridoras (Callichthyidae)"
  },
  {
    "id": "525",
    "name": "Cascudo Zebra Imperial L046 (Hypancistrus zebra)",
    "commonName": "Cascudo Zebra Imperial L046",
    "scientificName": "Hypancistrus zebra",
    "synonyms": [
      "Cascudo Zebra Imperial L046",
      "Cascudo Zebra Imperial L046 (Hypancistrus zebra)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "288_cascudo_zebra_imperial_queen_arabesque.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos & Loricariídeos"
  },
  {
    "id": "526",
    "name": "Cascudo Queen Arabesque L260 (Hypancistrus sp. L260)",
    "commonName": "Cascudo Queen Arabesque L260",
    "scientificName": "Hypancistrus sp. L260",
    "synonyms": [
      "Cascudo Queen Arabesque L260",
      "Cascudo Queen Arabesque L260 (Hypancistrus sp. L260)",
      "cascudo-queen-arabesque.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos & Loricariídeos"
  },
  {
    "id": "527",
    "name": "Cascudo Panaque Real L190 (Panaque nigrolineatus)",
    "commonName": "Cascudo Panaque Real L190",
    "scientificName": "Panaque nigrolineatus",
    "synonyms": [
      "Cascudo Panaque Real L190",
      "Cascudo Panaque Real L190 (Panaque nigrolineatus)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "289_cascudo_panaque_real_l190.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos & Loricariídeos"
  },
  {
    "id": "528",
    "name": "Cascudo Bola de Neve L102 (Hypancistrus inspector)",
    "commonName": "Cascudo Bola de Neve L102",
    "scientificName": "Hypancistrus inspector",
    "synonyms": [
      "Cascudo Bola de Neve L102",
      "Cascudo Bola de Neve L102 (Hypancistrus inspector)",
      "cascudo-bola-de-neve.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos & Loricariídeos"
  },
  {
    "id": "529",
    "name": "Cascudo Melancia L330 (Panaque bathyphilus)",
    "commonName": "Cascudo Melancia L330",
    "scientificName": "Panaque bathyphilus",
    "synonyms": [
      "Cascudo Melancia L330",
      "Cascudo Melancia L330 (Panaque bathyphilus)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos & Loricariídeos"
  },
  {
    "id": "530",
    "name": "Cascudo Vampiro L240 (Leporacanthicus galaxias)",
    "commonName": "Cascudo Vampiro L240",
    "scientificName": "Leporacanthicus galaxias",
    "synonyms": [
      "Cascudo Vampiro L240",
      "Cascudo Vampiro L240 (Leporacanthicus galaxias)",
      "cascudo-vampiro.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos & Loricariídeos"
  },
  {
    "id": "531",
    "name": "Cascudo Leopardo L114 (Pseudacanthicus leopardus)",
    "commonName": "Cascudo Leopardo L114",
    "scientificName": "Pseudacanthicus leopardus",
    "synonyms": [
      "Cascudo Leopardo L114",
      "Cascudo Leopardo L114 (Pseudacanthicus leopardus)",
      "cascudo-leopardo.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Cascudos & Loricariídeos"
  },
  {
    "id": "532",
    "name": "Peixe-Galho Farlowella (Farlowella acus)",
    "commonName": "Peixe-Galho Farlowella",
    "scientificName": "Farlowella acus",
    "synonyms": [
      "Peixe-Galho Farlowella",
      "Peixe-Galho Farlowella (Farlowella acus)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "291_farlowella_rineloricaria_whiptail.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "533",
    "name": "Rineloricaria Red Leliella (Leliella heteroptera)",
    "commonName": "Rineloricaria Red Leliella",
    "scientificName": "Leliella heteroptera",
    "synonyms": [
      "Rineloricaria Red Leliella",
      "Rineloricaria Red Leliella (Leliella heteroptera)",
      "rineloricaria-red.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "534",
    "name": "Ituí Cavalo Black Ghost (Apteronotus albifrons)",
    "commonName": "Ituí Cavalo Black Ghost",
    "scientificName": "Apteronotus albifrons",
    "synonyms": [
      "Ituí Cavalo Black Ghost",
      "Ituí Cavalo Black Ghost (Apteronotus albifrons)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "535",
    "name": "Cobrinha Kuhli (Pangio kuhlii)",
    "commonName": "Cobrinha Kuhli",
    "scientificName": "Pangio kuhlii",
    "synonyms": [
      "Cobrinha Kuhli",
      "Cobrinha Kuhli (Pangio kuhlii)",
      "cobrinha-kuhli.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "536",
    "name": "Sewellia Hillstream Butterfly (Sewellia lineolata)",
    "commonName": "Sewellia Hillstream Butterfly",
    "scientificName": "Sewellia lineolata",
    "synonyms": [
      "Sewellia Hillstream Butterfly",
      "Sewellia Hillstream Butterfly (Sewellia lineolata)",
      "sewellia-hillstream.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "537",
    "name": "Baiacu Anão Pea Puffer (Carinotetraodon travancoricus)",
    "commonName": "Baiacu Anão Pea Puffer",
    "scientificName": "Carinotetraodon travancoricus",
    "synonyms": [
      "Baiacu Anão Pea Puffer",
      "Baiacu Anão Pea Puffer (Carinotetraodon travancoricus)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "293_baiacu_anao_pea_puffer__Colomesus.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Caracídeos (Tetras e Cardumes)"
  },
  {
    "id": "538",
    "name": "Baiacu Amazônico (Colomesus asellus)",
    "commonName": "Baiacu Amazônico",
    "scientificName": "Colomesus asellus",
    "synonyms": [
      "Baiacu Amazônico",
      "Baiacu Amazônico (Colomesus asellus)",
      "baiacu-amazonico.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "539",
    "name": "Goby Abelha Bumblebee (Brachygobius doriae)",
    "commonName": "Goby Abelha Bumblebee",
    "scientificName": "Brachygobius doriae",
    "synonyms": [
      "Goby Abelha Bumblebee",
      "Goby Abelha Bumblebee (Brachygobius doriae)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "294_goby_abelha_badis_peixe_vidro.jpg",
    "section": "Peixes de Água Doce",
    "familyGroup": "Gobies e Blênios"
  },
  {
    "id": "540",
    "name": "Dario Dario Scarlet Badis (Dario dario)",
    "commonName": "Dario Dario Scarlet Badis",
    "scientificName": "Dario dario",
    "synonyms": [
      "Dario Dario Scarlet Badis",
      "Dario Dario Scarlet Badis (Dario dario)",
      "dario-dario.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "541",
    "name": "Peixe-Vidro Indiano (Parambassis ranga)",
    "commonName": "Peixe-Vidro Indiano",
    "scientificName": "Parambassis ranga",
    "synonyms": [
      "Peixe-Vidro Indiano",
      "Peixe-Vidro Indiano (Parambassis ranga)",
      "peixe-vidro.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_FISH",
    "imageSlug": "",
    "section": "Peixes de Água Doce",
    "familyGroup": "Geral"
  },
  {
    "id": "542",
    "name": "Camarão Caridina Crystal Red (Caridina logemanni var. Crystal Red)",
    "commonName": "Camarão Caridina Crystal Red",
    "scientificName": "Caridina logemanni var. Crystal Red",
    "synonyms": [
      "Camarão Caridina Crystal Red",
      "Camarão Caridina Crystal Red (Caridina logemanni var. Crystal Red)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_INVERTEBRATE",
    "imageSlug": "295_camarao_caridina_crystal_red_crs.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Equipe de Limpeza & Invertebrados"
  },
  {
    "id": "543",
    "name": "Camarão Caridina Crystal Black (Caridina logemanni var. Crystal Black)",
    "commonName": "Camarão Caridina Crystal Black",
    "scientificName": "Caridina logemanni var. Crystal Black",
    "synonyms": [
      "Camarão Caridina Crystal Black",
      "Camarão Caridina Crystal Black (Caridina logemanni var. Crystal Black)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_INVERTEBRATE",
    "imageSlug": "296_camarao_caridina_crystal_black_cbs.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Equipe de Limpeza & Invertebrados"
  },
  {
    "id": "544",
    "name": "Camarão Caridina Blue Bolt (Caridina cantonensis var. Blue Bolt)",
    "commonName": "Camarão Caridina Blue Bolt",
    "scientificName": "Caridina cantonensis var. Blue Bolt",
    "synonyms": [
      "Camarão Caridina Blue Bolt",
      "Camarão Caridina Blue Bolt (Caridina cantonensis var. Blue Bolt)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_INVERTEBRATE",
    "imageSlug": "297_camarao_caridina_blue_bolt_taiwan_bee.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Equipe de Limpeza & Invertebrados"
  },
  {
    "id": "545",
    "name": "Camarão Caridina King Kong (Caridina cantonensis var. King Kong)",
    "commonName": "Camarão Caridina King Kong",
    "scientificName": "Caridina cantonensis var. King Kong",
    "synonyms": [
      "Camarão Caridina King Kong",
      "Camarão Caridina King Kong (Caridina cantonensis var. King Kong)",
      "camarao-king-kong.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_INVERTEBRATE",
    "imageSlug": "",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Equipe de Limpeza & Invertebrados"
  },
  {
    "id": "546",
    "name": "Camarão Amano Limpador (Caridina multidentata)",
    "commonName": "Camarão Amano Limpador",
    "scientificName": "Caridina multidentata",
    "synonyms": [
      "Camarão Amano Limpador",
      "Camarão Amano Limpador (Caridina multidentata)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_INVERTEBRATE",
    "imageSlug": "298_camarao_amano_fantasma.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Equipe de Limpeza & Invertebrados"
  },
  {
    "id": "547",
    "name": "Camarão Fantasma (Macrobrachium jelskii)",
    "commonName": "Camarão Fantasma",
    "scientificName": "Macrobrachium jelskii",
    "synonyms": [
      "Camarão Fantasma",
      "Camarão Fantasma (Macrobrachium jelskii)",
      "camarao-fantasma.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_INVERTEBRATE",
    "imageSlug": "",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Equipe de Limpeza & Invertebrados"
  },
  {
    "id": "548",
    "name": "Camarão Filtrador Bambu (Atyopsis moluccensis)",
    "commonName": "Camarão Filtrador Bambu",
    "scientificName": "Atyopsis moluccensis",
    "synonyms": [
      "Camarão Filtrador Bambu",
      "Camarão Filtrador Bambu (Atyopsis moluccensis)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_INVERTEBRATE",
    "imageSlug": "299_camarao_filtrador_bambu_gabonensis.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Equipe de Limpeza & Invertebrados"
  },
  {
    "id": "549",
    "name": "Camarão Filtrador Africano (Atya gabonensis)",
    "commonName": "Camarão Filtrador Africano",
    "scientificName": "Atya gabonensis",
    "synonyms": [
      "Camarão Filtrador Africano",
      "Camarão Filtrador Africano (Atya gabonensis)",
      "camarao-gabonensis.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_INVERTEBRATE",
    "imageSlug": "",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Equipe de Limpeza & Invertebrados"
  },
  {
    "id": "550",
    "name": "Caramujo Helena Assassino (Anentome helena)",
    "commonName": "Caramujo Helena Assassino",
    "scientificName": "Anentome helena",
    "synonyms": [
      "Caramujo Helena Assassino",
      "Caramujo Helena Assassino (Anentome helena)"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_INVERTEBRATE",
    "imageSlug": "300_caramujo_assassino_helena_tylomelania.jpg",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Equipe de Limpeza & Invertebrados"
  },
  {
    "id": "551",
    "name": "Caramujo Coelho Rabbit Laranja (Tylomelania sp.)",
    "commonName": "Caramujo Coelho Rabbit Laranja",
    "scientificName": "Tylomelania sp.",
    "synonyms": [
      "Caramujo Coelho Rabbit Laranja",
      "Caramujo Coelho Rabbit Laranja (Tylomelania sp.)",
      "caramujo-rabbit.jpg"
    ],
    "type": "LIVING",
    "subCategory": "FRESHWATER_INVERTEBRATE",
    "imageSlug": "",
    "section": "Invertebrados de Água Doce",
    "familyGroup": "Equipe de Limpeza & Invertebrados"
  },
  {
    "id": "552",
    "name": "Macroalga Chaetomorpha Spaghetti (Chaetomorpha linum)",
    "commonName": "Macroalga Chaetomorpha Spaghetti",
    "scientificName": "Chaetomorpha linum",
    "synonyms": [
      "Macroalga Chaetomorpha Spaghetti",
      "Macroalga Chaetomorpha Spaghetti (Chaetomorpha linum)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "301_alga_chaetomorpha_spaghetti.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "553",
    "name": "Macroalga Atomic Broccoli (Gracilaria sp.)",
    "commonName": "Macroalga Atomic Broccoli",
    "scientificName": "Gracilaria sp.",
    "synonyms": [
      "Macroalga Atomic Broccoli",
      "Macroalga Atomic Broccoli (Gracilaria sp.)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "302_alga_atomic_broccoli_gracilaria.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "554",
    "name": "Macroalga Dragon's Breath (Halymenia durvillei)",
    "commonName": "Macroalga Dragon's Breath",
    "scientificName": "Halymenia durvillei",
    "synonyms": [
      "Macroalga Dragon's Breath",
      "Macroalga Dragon's Breath (Halymenia durvillei)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "303_alga_dragons_breath_halymenia.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "555",
    "name": "Macroalga Pink Dragon's Tongue (Halymenia floresia)",
    "commonName": "Macroalga Pink Dragon's Tongue",
    "scientificName": "Halymenia floresia",
    "synonyms": [
      "Macroalga Pink Dragon's Tongue",
      "Macroalga Pink Dragon's Tongue (Halymenia floresia)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "304_alga_pink_dragons_breath_floresia.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "556",
    "name": "Macroalga Red Pom Pom (Gracilaria hayi)",
    "commonName": "Macroalga Red Pom Pom",
    "scientificName": "Gracilaria hayi",
    "synonyms": [
      "Macroalga Red Pom Pom",
      "Macroalga Red Pom Pom (Gracilaria hayi)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "305_alga_pom_pom_gracilaria_hayi.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "557",
    "name": "Macroalga Red Ogo (Gracilaria parvispora)",
    "commonName": "Macroalga Red Ogo",
    "scientificName": "Gracilaria parvispora",
    "synonyms": [
      "Macroalga Red Ogo",
      "Macroalga Red Ogo (Gracilaria parvispora)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "306_alga_red_ogo_gracilaria_parvispora.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "558",
    "name": "Macroalga Caulerpa Prolifera Folha Lisa (Caulerpa prolifera)",
    "commonName": "Macroalga Caulerpa Prolifera Folha Lisa",
    "scientificName": "Caulerpa prolifera",
    "synonyms": [
      "Macroalga Caulerpa Prolifera Folha Lisa",
      "Macroalga Caulerpa Prolifera Folha Lisa (Caulerpa prolifera)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "307_alga_caulerpa_prolifera_seagrass.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "559",
    "name": "Macroalga Feather Pena (Caulerpa sertularioides)",
    "commonName": "Macroalga Feather Pena",
    "scientificName": "Caulerpa sertularioides",
    "synonyms": [
      "Macroalga Feather Pena",
      "Macroalga Feather Pena (Caulerpa sertularioides)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "308_alga_caulerpa_sertularioides_feather.png",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "560",
    "name": "Macroalga Caulerpa Taxifolia (Caulerpa taxifolia)",
    "commonName": "Macroalga Caulerpa Taxifolia",
    "scientificName": "Caulerpa taxifolia",
    "synonyms": [
      "Macroalga Caulerpa Taxifolia",
      "Macroalga Caulerpa Taxifolia (Caulerpa taxifolia)",
      "caulerpa-taxifolia.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "561",
    "name": "Macroalga Grape Uva-do-Mar (Caulerpa racemosa)",
    "commonName": "Macroalga Grape Uva-do-Mar",
    "scientificName": "Caulerpa racemosa",
    "synonyms": [
      "Macroalga Grape Uva-do-Mar",
      "Macroalga Grape Uva-do-Mar (Caulerpa racemosa)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "309_alga_caulerpa_racemosa_grape.png",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "562",
    "name": "Macroalga Caulerpa Lentillifera Caviar Verde (Caulerpa lentillifera)",
    "commonName": "Macroalga Caulerpa Lentillifera Caviar Verde",
    "scientificName": "Caulerpa lentillifera",
    "synonyms": [
      "Macroalga Caulerpa Lentillifera Caviar Verde",
      "Macroalga Caulerpa Lentillifera Caviar Verde (Caulerpa lentillifera)",
      "caulerpa-lentillifera.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "563",
    "name": "Macroalga Calcária Halimeda (Halimeda incrassata)",
    "commonName": "Macroalga Calcária Halimeda",
    "scientificName": "Halimeda incrassata",
    "synonyms": [
      "Macroalga Calcária Halimeda",
      "Macroalga Calcária Halimeda (Halimeda incrassata)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "310_alga_halimeda_calcarea_money_plant.png",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "564",
    "name": "Macroalga Shaving Brush (Penicillus capitatus)",
    "commonName": "Macroalga Shaving Brush",
    "scientificName": "Penicillus capitatus",
    "synonyms": [
      "Macroalga Shaving Brush",
      "Macroalga Shaving Brush (Penicillus capitatus)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "311_alga_shaving_brush_mermaids_fan.png",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "565",
    "name": "Macroalga Mermaid's Fan (Udotea spinulosa)",
    "commonName": "Macroalga Mermaid's Fan",
    "scientificName": "Udotea spinulosa",
    "synonyms": [
      "Macroalga Mermaid's Fan",
      "Macroalga Mermaid's Fan (Udotea spinulosa)",
      "macroalga-udotea.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "566",
    "name": "Macroalga Blue Hypnea Iridescente (Hypnea pannosa)",
    "commonName": "Macroalga Blue Hypnea Iridescente",
    "scientificName": "Hypnea pannosa",
    "synonyms": [
      "Macroalga Blue Hypnea Iridescente",
      "Macroalga Blue Hypnea Iridescente (Hypnea pannosa)",
      "blue hypnea",
      "hypnea pannosa",
      "alga azul",
      "blue ochtodes"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "312_alga_blue_hypnea_pannosa.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "567",
    "name": "Macroalga Red Grape Kelp (Botryocladia occidentalis)",
    "commonName": "Macroalga Red Grape Kelp",
    "scientificName": "Botryocladia occidentalis",
    "synonyms": [
      "Macroalga Red Grape Kelp",
      "Macroalga Red Grape Kelp (Botryocladia occidentalis)",
      "red grape algae",
      "botryocladia",
      "uva vermelha marinha",
      "red grape kelp"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "313_alga_red_grape_botryocladia.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "568",
    "name": "Macroalga Ulva Alface-do-Mar (Ulva lactuca)",
    "commonName": "Macroalga Ulva Alface-do-Mar",
    "scientificName": "Ulva lactuca",
    "synonyms": [
      "Macroalga Ulva Alface-do-Mar",
      "Macroalga Ulva Alface-do-Mar (Ulva lactuca)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "314_alga_ulva_sea_lettuce_codium.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "569",
    "name": "Macroalga Codium Verde (Codium fragile)",
    "commonName": "Macroalga Codium Verde",
    "scientificName": "Codium fragile",
    "synonyms": [
      "Macroalga Codium Verde",
      "Macroalga Codium Verde (Codium fragile)",
      "macroalga-codium.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "570",
    "name": "Mangue Vermelho Propágulo (Rhizophora mangle)",
    "commonName": "Mangue Vermelho Propágulo",
    "scientificName": "Rhizophora mangle",
    "synonyms": [
      "Mangue Vermelho Propágulo",
      "Mangue Vermelho Propágulo (Rhizophora mangle)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "315_mangue_vermelho_red_mangrove.png",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "571",
    "name": "Anubias Nana (Anubias barteri var. nana)",
    "commonName": "Anubias Nana",
    "scientificName": "Anubias barteri var. nana",
    "synonyms": [
      "Anubias Nana",
      "Anubias Nana (Anubias barteri var. nana)",
      "anubias nana",
      "anubia nana",
      "anubias barteri nana",
      "anubia"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "316_anubias_nana_clássica.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "572",
    "name": "Anubias Nana Petite (Anubias barteri var. nana 'Petite')",
    "commonName": "Anubias Nana Petite",
    "scientificName": "Anubias barteri var. nana 'Petite'",
    "synonyms": [
      "Anubias Nana Petite",
      "Anubias Nana Petite (Anubias barteri var. nana 'Petite')"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "317_anubias_nana_petite.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "573",
    "name": "Anubias Pangolino (Anubias barteri var. nana 'Pangolino')",
    "commonName": "Anubias Pangolino",
    "scientificName": "Anubias barteri var. nana 'Pangolino'",
    "synonyms": [
      "Anubias Pangolino",
      "Anubias Pangolino (Anubias barteri var. nana 'Pangolino')",
      "anubias-pangolino.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "574",
    "name": "Anubias Barteri Broad Leaf (Anubias barteri var. barteri)",
    "commonName": "Anubias Barteri Broad Leaf",
    "scientificName": "Anubias barteri var. barteri",
    "synonyms": [
      "Anubias Barteri Broad Leaf",
      "Anubias Barteri Broad Leaf (Anubias barteri var. barteri)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "318_anubias_barteri_broad_leaf_lanceolata.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "575",
    "name": "Anubias Barteri Coffeefolia (Anubias barteri var. caladiifolia 'Coffeefolia')",
    "commonName": "Anubias Barteri Coffeefolia",
    "scientificName": "Anubias barteri var. caladiifolia 'Coffeefolia'",
    "synonyms": [
      "Anubias Barteri Coffeefolia",
      "Anubias Barteri Coffeefolia (Anubias barteri var. caladiifolia 'Coffeefolia')",
      "anubias-coffeefolia.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "576",
    "name": "Anubias Lanceolata (Anubias barteri var. glabra)",
    "commonName": "Anubias Lanceolata",
    "scientificName": "Anubias barteri var. glabra",
    "synonyms": [
      "Anubias Lanceolata",
      "Anubias Lanceolata (Anubias barteri var. glabra)",
      "anubias-lanceolata.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "577",
    "name": "Anubias Nana Pinto Variegada (Anubias barteri var. nana 'Pinto')",
    "commonName": "Anubias Nana Pinto Variegada",
    "scientificName": "Anubias barteri var. nana 'Pinto'",
    "synonyms": [
      "Anubias Nana Pinto Variegada",
      "Anubias Nana Pinto Variegada (Anubias barteri var. nana 'Pinto')"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "319_anubias_pinto_white_golden.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "578",
    "name": "Anubias Golden Coin (Anubias barteri var. nana 'Golden Coin')",
    "commonName": "Anubias Golden Coin",
    "scientificName": "Anubias barteri var. nana 'Golden Coin'",
    "synonyms": [
      "Anubias Golden Coin",
      "Anubias Golden Coin (Anubias barteri var. nana 'Golden Coin')",
      "anubias-golden-coin.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "579",
    "name": "Samambaia de Java Clássica (Microsorum pteropus)",
    "commonName": "Samambaia de Java Clássica",
    "scientificName": "Microsorum pteropus",
    "synonyms": [
      "Samambaia de Java Clássica",
      "Samambaia de Java Clássica (Microsorum pteropus)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "320_microsorum_pteropus_java_fern.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "580",
    "name": "Samambaia de Java Narrow Leaf (Microsorum pteropus 'Narrow')",
    "commonName": "Samambaia de Java Narrow Leaf",
    "scientificName": "Microsorum pteropus 'Narrow'",
    "synonyms": [
      "Samambaia de Java Narrow Leaf",
      "Samambaia de Java Narrow Leaf (Microsorum pteropus 'Narrow')",
      "microsorum-narrow-leaf.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "581",
    "name": "Microsorum Windelov (Microsorum pteropus 'Windelov')",
    "commonName": "Microsorum Windelov",
    "scientificName": "Microsorum pteropus 'Windelov'",
    "synonyms": [
      "Microsorum Windelov",
      "Microsorum Windelov (Microsorum pteropus 'Windelov')"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "321_microsorum_windelov_trident.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "582",
    "name": "Microsorum Trident (Microsorum pteropus 'Trident')",
    "commonName": "Microsorum Trident",
    "scientificName": "Microsorum pteropus 'Trident'",
    "synonyms": [
      "Microsorum Trident",
      "Microsorum Trident (Microsorum pteropus 'Trident')",
      "microsorum-trident.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "583",
    "name": "Bucephalandra Green Wavy (Bucephalandra pygmaea 'Wavy Green')",
    "commonName": "Bucephalandra Green Wavy",
    "scientificName": "Bucephalandra pygmaea 'Wavy Green'",
    "synonyms": [
      "Bucephalandra Green Wavy",
      "Bucephalandra Green Wavy (Bucephalandra pygmaea 'Wavy Green')"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "322_bucephalandra_wavy_green_kedagang.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "584",
    "name": "Bucephalandra Godzilla (Bucephalandra sp. 'Godzilla')",
    "commonName": "Bucephalandra Godzilla",
    "scientificName": "Bucephalandra sp. 'Godzilla'",
    "synonyms": [
      "Bucephalandra Godzilla",
      "Bucephalandra Godzilla (Bucephalandra sp. 'Godzilla')",
      "bucephalandra-godzilla.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "585",
    "name": "Bucephalandra Brownie Ghost (Bucephalandra sp. 'Brownie Ghost')",
    "commonName": "Bucephalandra Brownie Ghost",
    "scientificName": "Bucephalandra sp. 'Brownie Ghost'",
    "synonyms": [
      "Bucephalandra Brownie Ghost",
      "Bucephalandra Brownie Ghost (Bucephalandra sp. 'Brownie Ghost')"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "323_bucephalandra_brownie_ghost_red_mini.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "586",
    "name": "Bucephalandra Red Mini (Bucephalandra sp. 'Red Mini')",
    "commonName": "Bucephalandra Red Mini",
    "scientificName": "Bucephalandra sp. 'Red Mini'",
    "synonyms": [
      "Bucephalandra Red Mini",
      "Bucephalandra Red Mini (Bucephalandra sp. 'Red Mini')",
      "bucephalandra-red-mini.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "587",
    "name": "Samambaia do Congo Bolbitis (Bolbitis heudelotii)",
    "commonName": "Samambaia do Congo Bolbitis",
    "scientificName": "Bolbitis heudelotii",
    "synonyms": [
      "Samambaia do Congo Bolbitis",
      "Samambaia do Congo Bolbitis (Bolbitis heudelotii)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "324_bolbitis_heudelotii_pinnatifida.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "588",
    "name": "Hygrophila Pinnatifida (Hygrophila pinnatifida)",
    "commonName": "Hygrophila Pinnatifida",
    "scientificName": "Hygrophila pinnatifida",
    "synonyms": [
      "Hygrophila Pinnatifida",
      "Hygrophila Pinnatifida (Hygrophila pinnatifida)",
      "hygrophila-pinnatifida.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "589",
    "name": "Musgo de Java (Taxiphyllum barbieri)",
    "commonName": "Musgo de Java",
    "scientificName": "Taxiphyllum barbieri",
    "synonyms": [
      "Musgo de Java",
      "Musgo de Java (Taxiphyllum barbieri)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "325_musgo_de_java_christmas_flame_marimo.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "590",
    "name": "Musgo Christmas Moss (Vesicularia montagnei)",
    "commonName": "Musgo Christmas Moss",
    "scientificName": "Vesicularia montagnei",
    "synonyms": [
      "Musgo Christmas Moss",
      "Musgo Christmas Moss (Vesicularia montagnei)",
      "musgo-christmas.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "musgo-christmas.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "591",
    "name": "Musgo Flame Moss (Taxiphyllum alternans)",
    "commonName": "Musgo Flame Moss",
    "scientificName": "Taxiphyllum alternans",
    "synonyms": [
      "Musgo Flame Moss",
      "Musgo Flame Moss (Taxiphyllum alternans)",
      "musgo-flame.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "592",
    "name": "Marimo Ball Alga Musgo (Aegagropila linnaei)",
    "commonName": "Marimo Ball Alga Musgo",
    "scientificName": "Aegagropila linnaei",
    "synonyms": [
      "Marimo Ball Alga Musgo",
      "Marimo Ball Alga Musgo (Aegagropila linnaei)",
      "marimo-moss-ball.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "593",
    "name": "Elódea Comum Anacharis (Egeria densa)",
    "commonName": "Elódea Comum Anacharis",
    "scientificName": "Egeria densa",
    "synonyms": [
      "Elódea Comum Anacharis",
      "Elódea Comum Anacharis (Egeria densa)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "326_elodea_egeria_densa_anacharis.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "594",
    "name": "Elódea Najas (Egeria najas)",
    "commonName": "Elódea Najas",
    "scientificName": "Egeria najas",
    "synonyms": [
      "Elódea Najas",
      "Elódea Najas (Egeria najas)",
      "elodea-najas.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "595",
    "name": "Cabomba Verde (Cabomba caroliniana)",
    "commonName": "Cabomba Verde",
    "scientificName": "Cabomba caroliniana",
    "synonyms": [
      "Cabomba Verde",
      "Cabomba Verde (Cabomba caroliniana)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "327_cabomba_verde_aquatica_furcata.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "596",
    "name": "Cabomba Vermelha Furcata (Cabomba furcata)",
    "commonName": "Cabomba Vermelha Furcata",
    "scientificName": "Cabomba furcata",
    "synonyms": [
      "Cabomba Vermelha Furcata",
      "Cabomba Vermelha Furcata (Cabomba furcata)",
      "cabomba-vermelha.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "597",
    "name": "Rabo-de-Raposa Coontail (Ceratophyllum demersum)",
    "commonName": "Rabo-de-Raposa Coontail",
    "scientificName": "Ceratophyllum demersum",
    "synonyms": [
      "Rabo-de-Raposa Coontail",
      "Rabo-de-Raposa Coontail (Ceratophyllum demersum)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "328_rabo_de_raposa_ceratophyllum_demersum.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "598",
    "name": "Ambulia Sessiliflora (Limnophila sessiliflora)",
    "commonName": "Ambulia Sessiliflora",
    "scientificName": "Limnophila sessiliflora",
    "synonyms": [
      "Ambulia Sessiliflora",
      "Ambulia Sessiliflora (Limnophila sessiliflora)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "329_ambulia_limnophila_sessiliflora_myriophyllum.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "599",
    "name": "Mil-Folhas Verde (Myriophyllum aquaticum)",
    "commonName": "Mil-Folhas Verde",
    "scientificName": "Myriophyllum aquaticum",
    "synonyms": [
      "Mil-Folhas Verde",
      "Mil-Folhas Verde (Myriophyllum aquaticum)",
      "mil-folhas-verde.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "600",
    "name": "Hygrophila Polysperma Comum (Hygrophila polysperma)",
    "commonName": "Hygrophila Polysperma Comum",
    "scientificName": "Hygrophila polysperma",
    "synonyms": [
      "Hygrophila Polysperma Comum",
      "Hygrophila Polysperma Comum (Hygrophila polysperma)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "330_hygrophila_polysperma_rosanervig_sunset.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "601",
    "name": "Hygrophila Polysperma Rosanervig Sunset (Hygrophila polysperma 'Rosanervig')",
    "commonName": "Hygrophila Polysperma Rosanervig Sunset",
    "scientificName": "Hygrophila polysperma 'Rosanervig'",
    "synonyms": [
      "Hygrophila Polysperma Rosanervig Sunset",
      "Hygrophila Polysperma Rosanervig Sunset (Hygrophila polysperma 'Rosanervig')",
      "hygrophila-sunset.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "602",
    "name": "Hygrophila Corymbosa Rio (Hygrophila corymbosa)",
    "commonName": "Hygrophila Corymbosa Rio",
    "scientificName": "Hygrophila corymbosa",
    "synonyms": [
      "Hygrophila Corymbosa Rio",
      "Hygrophila Corymbosa Rio (Hygrophila corymbosa)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "331_hygrophila_corymbosa_rio_siamensis.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "603",
    "name": "Hygrophila Corymbosa Compacta (Hygrophila corymbosa 'Compact')",
    "commonName": "Hygrophila Corymbosa Compacta",
    "scientificName": "Hygrophila corymbosa 'Compact'",
    "synonyms": [
      "Hygrophila Corymbosa Compacta",
      "Hygrophila Corymbosa Compacta (Hygrophila corymbosa 'Compact')",
      "hygrophila-corymbosa-compacta.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "604",
    "name": "Hygrophila Difformis Sinema (Hygrophila difformis)",
    "commonName": "Hygrophila Difformis Sinema",
    "scientificName": "Hygrophila difformis",
    "synonyms": [
      "Hygrophila Difformis Sinema",
      "Hygrophila Difformis Sinema (Hygrophila difformis)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "332_hygrophila_difformis_sinema_samambaia.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "605",
    "name": "Samambaia d'Água Ceratopteris (Ceratopteris thalictroides)",
    "commonName": "Samambaia d'Água Ceratopteris",
    "scientificName": "Ceratopteris thalictroides",
    "synonyms": [
      "Samambaia d'Água Ceratopteris",
      "Samambaia d'Água Ceratopteris (Ceratopteris thalictroides)",
      "ceratopteris-thalictroides.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "606",
    "name": "Bacopa Caroliniana (Bacopa caroliniana)",
    "commonName": "Bacopa Caroliniana",
    "scientificName": "Bacopa caroliniana",
    "synonyms": [
      "Bacopa Caroliniana",
      "Bacopa Caroliniana (Bacopa caroliniana)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "333_bacopa_caroliniana_monnieri.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "607",
    "name": "Bacopa Monnieri Moneywort (Bacopa monnieri)",
    "commonName": "Bacopa Monnieri Moneywort",
    "scientificName": "Bacopa monnieri",
    "synonyms": [
      "Bacopa Monnieri Moneywort",
      "Bacopa Monnieri Moneywort (Bacopa monnieri)",
      "bacopa-monnieri.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "bacopa-monnieri.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "608",
    "name": "Rotala Rotundifolia Red (Rotala rotundifolia 'Red')",
    "commonName": "Rotala Rotundifolia Red",
    "scientificName": "Rotala rotundifolia 'Red'",
    "synonyms": [
      "Rotala Rotundifolia Red",
      "Rotala Rotundifolia Red (Rotala rotundifolia 'Red')"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "334_rotala_rotundifolia_red_hra_blood_red.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "609",
    "name": "Rotala Rotundifolia H'ra (Rotala rotundifolia 'H\\'ra')",
    "commonName": "Rotala Rotundifolia H'ra",
    "scientificName": "Rotala rotundifolia 'H\\'ra'",
    "synonyms": [
      "Rotala Rotundifolia H'ra",
      "Rotala Rotundifolia H'ra (Rotala rotundifolia 'H\\'ra')",
      "rotala-hra.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "610",
    "name": "Rotala Blood Red (Rotala rotundifolia 'Blood Red')",
    "commonName": "Rotala Blood Red",
    "scientificName": "Rotala rotundifolia 'Blood Red'",
    "synonyms": [
      "Rotala Blood Red",
      "Rotala Blood Red (Rotala rotundifolia 'Blood Red')",
      "rotala-blood-red.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "611",
    "name": "Rotala Green (Rotala rotundifolia 'Green')",
    "commonName": "Rotala Green",
    "scientificName": "Rotala rotundifolia 'Green'",
    "synonyms": [
      "Rotala Green",
      "Rotala Green (Rotala rotundifolia 'Green')"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "335_rotala_green_indica_bonsai_wallichii.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "612",
    "name": "Rotala Bonsai (Ammannia gracilis 'Bonsai')",
    "commonName": "Rotala Bonsai",
    "scientificName": "Ammannia gracilis 'Bonsai'",
    "synonyms": [
      "Rotala Bonsai",
      "Rotala Bonsai (Ammannia gracilis 'Bonsai')",
      "rotala-bonsai.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "613",
    "name": "Rotala Wallichii Vermelha (Rotala wallichii)",
    "commonName": "Rotala Wallichii Vermelha",
    "scientificName": "Rotala wallichii",
    "synonyms": [
      "Rotala Wallichii Vermelha",
      "Rotala Wallichii Vermelha (Rotala wallichii)",
      "rotala-wallichii.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "rotala-wallichii.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Flora e Macroalgas"
  },
  {
    "id": "614",
    "name": "Ludwigia Super Red Mini (Ludwigia palustris 'Super Red')",
    "commonName": "Ludwigia Super Red Mini",
    "scientificName": "Ludwigia palustris 'Super Red'",
    "synonyms": [
      "Ludwigia Super Red Mini",
      "Ludwigia Super Red Mini (Ludwigia palustris 'Super Red')"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "336_ludwigia_sp_super_red_repens_rubin.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "615",
    "name": "Ludwigia Repens Rubin (Ludwigia repens 'Rubin')",
    "commonName": "Ludwigia Repens Rubin",
    "scientificName": "Ludwigia repens 'Rubin'",
    "synonyms": [
      "Ludwigia Repens Rubin",
      "Ludwigia Repens Rubin (Ludwigia repens 'Rubin')",
      "ludwigia-rubin.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "616",
    "name": "Ludwigia Glandulosa (Ludwigia glandulosa)",
    "commonName": "Ludwigia Glandulosa",
    "scientificName": "Ludwigia glandulosa",
    "synonyms": [
      "Ludwigia Glandulosa",
      "Ludwigia Glandulosa (Ludwigia glandulosa)",
      "ludwigia-glandulosa.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "ludwigia-glandulosa.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "617",
    "name": "Alternanthera Reineckii (AR Mini, Rosanervig, Rosaefolia e Lilacina)",
    "commonName": "Alternanthera Reineckii",
    "scientificName": "AR Mini, Rosanervig, Rosaefolia e Lilacina",
    "synonyms": [
      "Alternanthera Reineckii",
      "Alternanthera Reineckii (AR Mini, Rosanervig, Rosaefolia e Lilacina)",
      "alternanthera reineckii",
      "ar mini",
      "reineckii rosanervig",
      "scarlet temple",
      "violacea"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "337_alternanthera_reineckii_mini_rosanervig.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "618",
    "name": "Planta Amazonense Clássica (Echinodorus bleheri)",
    "commonName": "Planta Amazonense Clássica",
    "scientificName": "Echinodorus bleheri",
    "synonyms": [
      "Planta Amazonense Clássica",
      "Planta Amazonense Clássica (Echinodorus bleheri)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "338_echinodorus_amazonense_bleheri.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "619",
    "name": "Echinodorus Ozelot Red (Echinodorus 'Ozelot Red')",
    "commonName": "Echinodorus Ozelot Red",
    "scientificName": "Echinodorus 'Ozelot Red'",
    "synonyms": [
      "Echinodorus Ozelot Red",
      "Echinodorus Ozelot Red (Echinodorus 'Ozelot Red')"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "339_echinodorus_ozelot_red_rubin_reni.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "620",
    "name": "Echinodorus Rubin (Echinodorus 'Rubin')",
    "commonName": "Echinodorus Rubin",
    "scientificName": "Echinodorus 'Rubin'",
    "synonyms": [
      "Echinodorus Rubin",
      "Echinodorus Rubin (Echinodorus 'Rubin')",
      "echinodorus-rubin.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "621",
    "name": "Echinodorus Reni (Echinodorus 'Reni')",
    "commonName": "Echinodorus Reni",
    "scientificName": "Echinodorus 'Reni'",
    "synonyms": [
      "Echinodorus Reni",
      "Echinodorus Reni (Echinodorus 'Reni')",
      "echinodorus-reni.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "622",
    "name": "Echinodorus Tenellus Comum (Helanthium tenellum)",
    "commonName": "Echinodorus Tenellus Comum",
    "scientificName": "Helanthium tenellum",
    "synonyms": [
      "Echinodorus Tenellus Comum",
      "Echinodorus Tenellus Comum (Helanthium tenellum)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "340_echinodorus_tenellus_helanthium_amano.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "623",
    "name": "Echinodorus Tenellus Amano Red (Helanthium tenellum 'Red')",
    "commonName": "Echinodorus Tenellus Amano Red",
    "scientificName": "Helanthium tenellum 'Red'",
    "synonyms": [
      "Echinodorus Tenellus Amano Red",
      "Echinodorus Tenellus Amano Red (Helanthium tenellum 'Red')",
      "echinodorus-tenellus-amano.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "624",
    "name": "Vallisneria Gigantea Americana (Vallisneria americana)",
    "commonName": "Vallisneria Gigantea Americana",
    "scientificName": "Vallisneria americana",
    "synonyms": [
      "Vallisneria Gigantea Americana",
      "Vallisneria Gigantea Americana (Vallisneria americana)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "341_vallisneria_americana_gigantea_nana.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "625",
    "name": "Vallisneria Nana Australiana (Vallisneria nana)",
    "commonName": "Vallisneria Nana Australiana",
    "scientificName": "Vallisneria nana",
    "synonyms": [
      "Vallisneria Nana Australiana",
      "Vallisneria Nana Australiana (Vallisneria nana)",
      "vallisneria-nana.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "626",
    "name": "Vallisneria Saca-Rolhas Spiralis (Vallisneria spiralis 'Tortifolia')",
    "commonName": "Vallisneria Saca-Rolhas Spiralis",
    "scientificName": "Vallisneria spiralis 'Tortifolia'",
    "synonyms": [
      "Vallisneria Saca-Rolhas Spiralis",
      "Vallisneria Saca-Rolhas Spiralis (Vallisneria spiralis 'Tortifolia')"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "342_vallisneria_spiralis_corkscrew_saca_rolha.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "627",
    "name": "Sagittaria Subulata Anã (Sagittaria subulata)",
    "commonName": "Sagittaria Subulata Anã",
    "scientificName": "Sagittaria subulata",
    "synonyms": [
      "Sagittaria Subulata Anã",
      "Sagittaria Subulata Anã (Sagittaria subulata)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "343_sagittaria_subulata_blyxa_japonica.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "628",
    "name": "Blyxa Japonica (Blyxa japonica)",
    "commonName": "Blyxa Japonica",
    "scientificName": "Blyxa japonica",
    "synonyms": [
      "Blyxa Japonica",
      "Blyxa Japonica (Blyxa japonica)",
      "blyxa-japonica.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "629",
    "name": "Cryptocoryne Wendtii Brown (Cryptocoryne wendtii 'Brown')",
    "commonName": "Cryptocoryne Wendtii Brown",
    "scientificName": "Cryptocoryne wendtii 'Brown'",
    "synonyms": [
      "Cryptocoryne Wendtii Brown",
      "Cryptocoryne Wendtii Brown (Cryptocoryne wendtii 'Brown')"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "344_cryptocoryne_wendtii_brown_tropica_beckettii.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "630",
    "name": "Cryptocoryne Beckettii Petchii (Cryptocoryne beckettii)",
    "commonName": "Cryptocoryne Beckettii Petchii",
    "scientificName": "Cryptocoryne beckettii",
    "synonyms": [
      "Cryptocoryne Beckettii Petchii",
      "Cryptocoryne Beckettii Petchii (Cryptocoryne beckettii)",
      "cryptocoryne-beckettii.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "631",
    "name": "Cryptocoryne Wendtii Green (Cryptocoryne wendtii 'Green')",
    "commonName": "Cryptocoryne Wendtii Green",
    "scientificName": "Cryptocoryne wendtii 'Green'",
    "synonyms": [
      "Cryptocoryne Wendtii Green",
      "Cryptocoryne Wendtii Green (Cryptocoryne wendtii 'Green')"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "345_cryptocoryne_wendtii_green_parva_balansae.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "632",
    "name": "Cryptocoryne Parva Mini (Cryptocoryne parva)",
    "commonName": "Cryptocoryne Parva Mini",
    "scientificName": "Cryptocoryne parva",
    "synonyms": [
      "Cryptocoryne Parva Mini",
      "Cryptocoryne Parva Mini (Cryptocoryne parva)",
      "cryptocoryne-parva.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "cryptocoryne-parva.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "633",
    "name": "Cryptocoryne Balansae Crispatula (Cryptocoryne crispatula var. balansae)",
    "commonName": "Cryptocoryne Balansae Crispatula",
    "scientificName": "Cryptocoryne crispatula var. balansae",
    "synonyms": [
      "Cryptocoryne Balansae Crispatula",
      "Cryptocoryne Balansae Crispatula (Cryptocoryne crispatula var. balansae)",
      "cryptocoryne-balansae.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "634",
    "name": "Cryptocoryne Pink Flamingo (Cryptocoryne wendtii 'Pink Flamingo')",
    "commonName": "Cryptocoryne Pink Flamingo",
    "scientificName": "Cryptocoryne wendtii 'Pink Flamingo'",
    "synonyms": [
      "Cryptocoryne Pink Flamingo",
      "Cryptocoryne Pink Flamingo (Cryptocoryne wendtii 'Pink Flamingo')"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "346_cryptocoryne_pink_flamingo_panther.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "635",
    "name": "Cryptocoryne Pink Panther (Cryptocoryne spiralis 'Pink Panther')",
    "commonName": "Cryptocoryne Pink Panther",
    "scientificName": "Cryptocoryne spiralis 'Pink Panther'",
    "synonyms": [
      "Cryptocoryne Pink Panther",
      "Cryptocoryne Pink Panther (Cryptocoryne spiralis 'Pink Panther')",
      "cryptocoryne-pink-panther.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "636",
    "name": "Nymphaea Rubra Red Tiger Lotus (Nymphaea zenkeri)",
    "commonName": "Nymphaea Rubra Red Tiger Lotus",
    "scientificName": "Nymphaea zenkeri",
    "synonyms": [
      "Nymphaea Rubra Red Tiger Lotus",
      "Nymphaea Rubra Red Tiger Lotus (Nymphaea zenkeri)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "347_nymphaea_rubra_red_tiger_lotus_aponogeton.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "637",
    "name": "Crinum Calamistratum Ondulada (Crinum calamistratum)",
    "commonName": "Crinum Calamistratum Ondulada",
    "scientificName": "Crinum calamistratum",
    "synonyms": [
      "Crinum Calamistratum Ondulada",
      "Crinum Calamistratum Ondulada (Crinum calamistratum)",
      "crinum-calamistratum.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "638",
    "name": "Carpete Monte Carlo (Micranthemum tweediei)",
    "commonName": "Carpete Monte Carlo",
    "scientificName": "Micranthemum tweediei",
    "synonyms": [
      "Carpete Monte Carlo",
      "Carpete Monte Carlo (Micranthemum tweediei)",
      "monte carlo",
      "micranthemum",
      "carpete monte carlo",
      "montecarlo"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "348_monte_carlo_micranthemum_tweediei.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "639",
    "name": "Carpete Cuba HC (Hemianthus callitrichoides)",
    "commonName": "Carpete Cuba HC",
    "scientificName": "Hemianthus callitrichoides",
    "synonyms": [
      "Carpete Cuba HC",
      "Carpete Cuba HC (Hemianthus callitrichoides)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "349_hemianthus_cuba_hc_glossostigma.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "640",
    "name": "Carpete Glossostigma Elatinoides (Glossostigma elatinoides)",
    "commonName": "Carpete Glossostigma Elatinoides",
    "scientificName": "Glossostigma elatinoides",
    "synonyms": [
      "Carpete Glossostigma Elatinoides",
      "Carpete Glossostigma Elatinoides (Glossostigma elatinoides)",
      "glossostigma-elatinoides.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "glossostigma-elatinoides.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "641",
    "name": "Carpete Eleocharis Minima (Eleocharis minima)",
    "commonName": "Carpete Eleocharis Minima",
    "scientificName": "Eleocharis minima",
    "synonyms": [
      "Carpete Eleocharis Minima",
      "Carpete Eleocharis Minima (Eleocharis minima)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "350_eleocharis_minima_parvula_hairgrass.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "642",
    "name": "Carpete Eleocharis Vivipara (Eleocharis vivipara)",
    "commonName": "Carpete Eleocharis Vivipara",
    "scientificName": "Eleocharis vivipara",
    "synonyms": [
      "Carpete Eleocharis Vivipara",
      "Carpete Eleocharis Vivipara (Eleocharis vivipara)",
      "eleocharis-vivipara.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "643",
    "name": "Staurogyne Repens Rasteira (Staurogyne repens)",
    "commonName": "Staurogyne Repens Rasteira",
    "scientificName": "Staurogyne repens",
    "synonyms": [
      "Staurogyne Repens Rasteira",
      "Staurogyne Repens Rasteira (Staurogyne repens)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "351_staurogyne_repens_pogostemon_helferi.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "644",
    "name": "Pogostemon Helferi Downoi (Pogostemon helferi)",
    "commonName": "Pogostemon Helferi Downoi",
    "scientificName": "Pogostemon helferi",
    "synonyms": [
      "Pogostemon Helferi Downoi",
      "Pogostemon Helferi Downoi (Pogostemon helferi)",
      "pogostemon-helferi.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "pogostemon-helferi.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "645",
    "name": "Hydrocotyle Tripartita Trevo Japonês (Hydrocotyle tripartita)",
    "commonName": "Hydrocotyle Tripartita Trevo Japonês",
    "scientificName": "Hydrocotyle tripartita",
    "synonyms": [
      "Hydrocotyle Tripartita Trevo Japonês",
      "Hydrocotyle Tripartita Trevo Japonês (Hydrocotyle tripartita)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "352_hydrocotyle_tripartita_japan_leucocephala.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "646",
    "name": "Hydrocotyle Leucocephala Trevo Redondo (Hydrocotyle leucocephala)",
    "commonName": "Hydrocotyle Leucocephala Trevo Redondo",
    "scientificName": "Hydrocotyle leucocephala",
    "synonyms": [
      "Hydrocotyle Leucocephala Trevo Redondo",
      "Hydrocotyle Leucocephala Trevo Redondo (Hydrocotyle leucocephala)",
      "hydrocotyle-leucocephala.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "647",
    "name": "Grama Brasileira Lilaeopsis (Lilaeopsis brasiliensis)",
    "commonName": "Grama Brasileira Lilaeopsis",
    "scientificName": "Lilaeopsis brasiliensis",
    "synonyms": [
      "Grama Brasileira Lilaeopsis",
      "Grama Brasileira Lilaeopsis (Lilaeopsis brasiliensis)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "353_lilaeopsis_brasiliensis_marsilea_hirsuta.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "648",
    "name": "Marsilea Hirsuta Trevo Quatro Folhas (Marsilea hirsuta)",
    "commonName": "Marsilea Hirsuta Trevo Quatro Folhas",
    "scientificName": "Marsilea hirsuta",
    "synonyms": [
      "Marsilea Hirsuta Trevo Quatro Folhas",
      "Marsilea Hirsuta Trevo Quatro Folhas (Marsilea hirsuta)",
      "marsilea-hirsuta.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "649",
    "name": "Lobelia Cardinalis Comum (Lobelia cardinalis)",
    "commonName": "Lobelia Cardinalis Comum",
    "scientificName": "Lobelia cardinalis",
    "synonyms": [
      "Lobelia Cardinalis Comum",
      "Lobelia Cardinalis Comum (Lobelia cardinalis)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "354_lobelia_cardinalis_mini.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "650",
    "name": "Lobelia Cardinalis Mini (Lobelia cardinalis 'Mini')",
    "commonName": "Lobelia Cardinalis Mini",
    "scientificName": "Lobelia cardinalis 'Mini'",
    "synonyms": [
      "Lobelia Cardinalis Mini",
      "Lobelia Cardinalis Mini (Lobelia cardinalis 'Mini')",
      "lobelia-cardinalis-mini.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "651",
    "name": "Lagenandra Meeboldii Red (Lagenandra meeboldii 'Red')",
    "commonName": "Lagenandra Meeboldii Red",
    "scientificName": "Lagenandra meeboldii 'Red'",
    "synonyms": [
      "Lagenandra Meeboldii Red",
      "Lagenandra Meeboldii Red (Lagenandra meeboldii 'Red')"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "355_lagenandra_meeboldii_red_keralensis.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "652",
    "name": "Lagenandra Keralensis (Lagenandra keralensis)",
    "commonName": "Lagenandra Keralensis",
    "scientificName": "Lagenandra keralensis",
    "synonyms": [
      "Lagenandra Keralensis",
      "Lagenandra Keralensis (Lagenandra keralensis)",
      "lagenandra-keralensis.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "653",
    "name": "Planta Flutuante Salvínia Comum (Salvinia auriculata)",
    "commonName": "Planta Flutuante Salvínia Comum",
    "scientificName": "Salvinia auriculata",
    "synonyms": [
      "Planta Flutuante Salvínia Comum",
      "Planta Flutuante Salvínia Comum (Salvinia auriculata)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "356_salvinia_auriculata_cucullata_minima.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "654",
    "name": "Planta Flutuante Salvínia Orelha-de-Onça (Salvinia cucullata)",
    "commonName": "Planta Flutuante Salvínia Orelha-de-Onça",
    "scientificName": "Salvinia cucullata",
    "synonyms": [
      "Planta Flutuante Salvínia Orelha-de-Onça",
      "Planta Flutuante Salvínia Orelha-de-Onça (Salvinia cucullata)",
      "salvinia-cucullata.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "655",
    "name": "Alface d'Água Anã (Pistia stratiotes)",
    "commonName": "Alface d'Água Anã",
    "scientificName": "Pistia stratiotes",
    "synonyms": [
      "Alface d'Água Anã",
      "Alface d'Água Anã (Pistia stratiotes)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "357_pistia_stratiotes_alface_dagua_aguape.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "656",
    "name": "Aguapé Flutuante (Eichhornia crassipes)",
    "commonName": "Aguapé Flutuante",
    "scientificName": "Eichhornia crassipes",
    "synonyms": [
      "Aguapé Flutuante",
      "Aguapé Flutuante (Eichhornia crassipes)",
      "aguape-eichhornia.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "657",
    "name": "Phyllanthus Fluitans Flutuante Vermelha (Phyllanthus fluitans)",
    "commonName": "Phyllanthus Fluitans Flutuante Vermelha",
    "scientificName": "Phyllanthus fluitans",
    "synonyms": [
      "Phyllanthus Fluitans Flutuante Vermelha",
      "Phyllanthus Fluitans Flutuante Vermelha (Phyllanthus fluitans)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "358_phyllanthus_fluitans_red_root_floater.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "658",
    "name": "Amazon Frogbit (Limnobium laevigatum)",
    "commonName": "Amazon Frogbit",
    "scientificName": "Limnobium laevigatum",
    "synonyms": [
      "Amazon Frogbit",
      "Amazon Frogbit (Limnobium laevigatum)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "359_limnobium_laevigatum_amazon_frogbit.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "659",
    "name": "Amor-de-Peixe Hydrocleys (Hydrocleys nymphoides)",
    "commonName": "Amor-de-Peixe Hydrocleys",
    "scientificName": "Hydrocleys nymphoides",
    "synonyms": [
      "Amor-de-Peixe Hydrocleys",
      "Amor-de-Peixe Hydrocleys (Hydrocleys nymphoides)",
      "hydrocleys-nymphoides.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "660",
    "name": "Lentilha d'Água (Lemna minor)",
    "commonName": "Lentilha d'Água",
    "scientificName": "Lemna minor",
    "synonyms": [
      "Lentilha d'Água",
      "Lentilha d'Água (Lemna minor)"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "360_lemna_minor_lentilha_dagua_azolla.jpg",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  },
  {
    "id": "661",
    "name": "Azolla Flutuante Vermelha (Azolla caroliniana)",
    "commonName": "Azolla Flutuante Vermelha",
    "scientificName": "Azolla caroliniana",
    "synonyms": [
      "Azolla Flutuante Vermelha",
      "Azolla Flutuante Vermelha (Azolla caroliniana)",
      "azolla-caroliniana.jpg"
    ],
    "type": "LIVING",
    "subCategory": "PLANT",
    "imageSlug": "",
    "section": "Plantas Aquáticas",
    "familyGroup": "Geral"
  }
]

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

    const allTokensMatch = queryTokens.every(
      (token) =>
        normName.includes(token) ||
        normScientific.includes(token) ||
        normSynonyms.some((s) => s.includes(token))
    )

    if (allTokensMatch) {
      let score = 0
      if (normCommon === cleanQuery) score += 100
      else if (normCommon.startsWith(cleanQuery)) score += 60
      else if (normName.startsWith(cleanQuery)) score += 50
      else if (normCommon.includes(cleanQuery)) score += 30

      if (normSynonyms.some((s) => s === cleanQuery)) score += 50
      else if (normSynonyms.some((s) => s.startsWith(cleanQuery))) score += 40
      else if (normSynonyms.some((s) => s.includes(cleanQuery))) score += 20

      if (normScientific.startsWith(cleanQuery)) score += 35
      else if (normScientific.includes(cleanQuery)) score += 15

      matches.push({ item, score })
    }
  }

  matches.sort((a, b) => b.score - a.score)
  return matches.slice(0, limit).map((m) => m.item)
}
