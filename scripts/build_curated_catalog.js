const fs = require('fs');
const path = require('path');

const ANIMALS_DIR = path.resolve(__dirname, '../frontend/store-management-web/public/images/animals');
const existingFiles = fs.readdirSync(ANIMALS_DIR);
const existingFilesSet = new Set(existingFiles);

const t1 = JSON.parse(fs.readFileSync('C:/Users/hyva/Downloads/Argon Tier 1/catalogo_150_imagens_curadas.json', 'utf8'));
const t2 = JSON.parse(fs.readFileSync('C:/Users/hyva/Downloads/Argon Tier 2/catalogo_tier2_151_a_300.json', 'utf8'));
const t3 = JSON.parse(fs.readFileSync('C:/Users/hyva/Downloads/Argon Tier 3/catalogo_flora_301_a_360.json', 'utf8'));

const allRaw = [...t1, ...t2, ...t3];

// Helper to find exact file from candidates list
function findVerifiedCandidate(candidates = []) {
  for (const c of candidates) {
    if (existingFilesSet.has(c)) return c;
    const match = existingFiles.find(f => f.toLowerCase() === c.toLowerCase());
    if (match) return match;
  }
  return null;
}

// Dissection map with strict candidate files for fallbacks
const COMBO_MAP = {
  // === TIER 1 SOFT CORALS & LPS ===
  '014_zoanthus_scrambled_eggs': [
    { name: 'Zoanthus Scrambled Eggs (Zoanthus sp.)', common: 'Zoanthus Scrambled Eggs', sci: 'Zoanthus sp.', isPrimary: true },
    { name: 'Zoanthus King Midas (Zoanthus sp.)', common: 'Zoanthus King Midas', sci: 'Zoanthus sp.', candidates: ['zoanthus-king-midas.webp', 'zoanthus-king-midas.jpg'] }
  ],
  '019_palythoa_grandis': [
    { name: 'Palythoa Grandis (Palythoa grandis)', common: 'Palythoa Grandis', sci: 'Palythoa grandis', isPrimary: true },
    { name: 'Palythoa Cinnamon (Palythoa sp.)', common: 'Palythoa Cinnamon', sci: 'Palythoa sp.', candidates: ['zoanthus-grandis-cinnamon.jpg'] }
  ],
  '020_palythoa_nirvana': [
    { name: 'Palythoa Nirvana (Palythoa sp.)', common: 'Palythoa Nirvana', sci: 'Palythoa sp.', isPrimary: true },
    { name: 'Palythoa Pandora (Palythoa sp.)', common: 'Palythoa Pandora', sci: 'Palythoa sp.', candidates: ['palythoa-pandora.jpg'] }
  ],
  '021_mushroom_discosoma_red': [
    { name: 'Mushroom Discosoma Super Red (Discosoma sp.)', common: 'Mushroom Discosoma Super Red', sci: 'Discosoma sp.', isPrimary: true },
    { name: 'Mushroom Discosoma Deadpool (Discosoma sp.)', common: 'Mushroom Discosoma Deadpool', sci: 'Discosoma sp.', candidates: ['mushroom-deadpool.jpg'] }
  ],
  '023_mushroom_discosoma_blue_purple': [
    { name: 'Mushroom Discosoma Blue (Discosoma sp.)', common: 'Mushroom Discosoma Blue', sci: 'Discosoma sp.', isPrimary: true },
    { name: 'Mushroom Discosoma Purple Spotted (Discosoma sp.)', common: 'Mushroom Discosoma Purple Spotted', sci: 'Discosoma sp.', candidates: ['mushroom-purple-spotted.jpg'] }
  ],
  '027_rhodactis_indonesia_superman': [
    { name: 'Mushroom Rhodactis Indonésia (Rhodactis sp.)', common: 'Mushroom Rhodactis Indonésia', sci: 'Rhodactis sp.', isPrimary: true },
    { name: 'Mushroom Rhodactis Superman (Rhodactis sp.)', common: 'Mushroom Rhodactis Superman', sci: 'Rhodactis sp.', candidates: ['rhodactis-superman.jpg'] }
  ],
  '028_rhodactis_bullseye': [
    { name: 'Mushroom Rhodactis Bullseye (Rhodactis sp.)', common: 'Mushroom Rhodactis Bullseye', sci: 'Rhodactis sp.', isPrimary: true },
    { name: 'Mushroom Rhodactis Tonga (Rhodactis sp.)', common: 'Mushroom Rhodactis Tonga', sci: 'Rhodactis sp.', candidates: ['rhodactis-tonga.jpg'] }
  ],
  '029_rhodactis_bounce': [
    { name: 'Mushroom Rhodactis Bounce OG (Rhodactis sp.)', common: 'Mushroom Rhodactis Bounce OG', sci: 'Rhodactis sp.', isPrimary: true },
    { name: 'Mushroom Rhodactis Bounce Sunkist (Rhodactis sp.)', common: 'Mushroom Rhodactis Bounce Sunkist', sci: 'Rhodactis sp.', candidates: ['rhodactis-sunkist-bounce.jpg'] }
  ],
  '030_ricordea_florida_orange': [
    { name: 'Ricordea Florida Laranja (Ricordea florida)', common: 'Ricordea Florida Laranja', sci: 'Ricordea florida', isPrimary: true },
    { name: 'Ricordea Florida Rainbow (Ricordea florida)', common: 'Ricordea Florida Rainbow', sci: 'Ricordea florida', candidates: ['ricordea-florida-rainbow.jpg'] }
  ],
  '031_ricordea_florida_green': [
    { name: 'Ricordea Florida Verde (Ricordea florida)', common: 'Ricordea Florida Verde', sci: 'Ricordea florida', isPrimary: true },
    { name: 'Ricordea Florida Azul (Ricordea florida)', common: 'Ricordea Florida Azul', sci: 'Ricordea florida', candidates: ['ricordea-florida-azul.jpg', 'ricordea-florida-blue.jpg'] }
  ],
  '032_ricordea_yuma_green': [
    { name: 'Ricordea Yuma Verde (Ricordea yuma)', common: 'Ricordea Yuma Verde', sci: 'Ricordea yuma', isPrimary: true },
    { name: 'Ricordea Yuma Neon (Ricordea yuma)', common: 'Ricordea Yuma Neon', sci: 'Ricordea yuma', candidates: ['ricordea-yuma-neon.jpg'] }
  ],
  '033_ricordea_yuma_orange_rainbow': [
    { name: 'Ricordea Yuma Laranja (Ricordea yuma)', common: 'Ricordea Yuma Laranja', sci: 'Ricordea yuma', isPrimary: true },
    { name: 'Ricordea Yuma Pink Rainbow (Ricordea yuma)', common: 'Ricordea Yuma Pink Rainbow', sci: 'Ricordea yuma', candidates: ['ricordea-yuma-pink-rainbow.jpg'] }
  ],
  '035_leather_toadstool': [
    { name: 'Leather Toadstool (Sarcophyton sp.)', common: 'Leather Toadstool', sci: 'Sarcophyton sp.', isPrimary: true }
  ],
  '036_leather_devils_hand': [
    { name: 'Leather Devil\'s Hand (Lobophytum sp.)', common: 'Leather Devil\'s Hand', sci: 'Lobophytum sp.', isPrimary: true }
  ],
  '037_sinularia_green_neon': [
    { name: 'Sinularia Verde Neon (Sinularia sp.)', common: 'Sinularia Verde Neon', sci: 'Sinularia sp.', isPrimary: true },
    { name: 'Sinularia Dura (Sinularia brassica)', common: 'Sinularia Dura', sci: 'Sinularia brassica', candidates: ['sinularia-dura.jpg'] }
  ],
  '039_xenia_pulsante': [
    { name: 'Xênia Pulsante Pom Pom (Xenia umbellata)', common: 'Xênia Pulsante Pom Pom', sci: 'Xenia umbellata', isPrimary: true },
    { name: 'Xênia Pulsante Giant (Xenia elongata)', common: 'Xênia Pulsante Giant', sci: 'Xenia elongata', candidates: ['xenia-giant-elongata.jpg'] }
  ],
  '040_cloves_papaya_fireworks': [
    { name: 'Cloves Papaya (Clavularia sp.)', common: 'Cloves Papaya', sci: 'Clavularia sp.', isPrimary: true },
    { name: 'Cloves Tricolor (Clavularia sp.)', common: 'Cloves Tricolor', sci: 'Clavularia sp.', candidates: ['cloves-tricolor.jpg'] }
  ],
  '041_anemona_bta_rose_rainbow': [
    { name: 'Anêmona Bubble Tip Rose (Entacmaea quadricolor var. Rose)', common: 'Anêmona Bubble Tip Rose', sci: 'Entacmaea quadricolor var. Rose', isPrimary: true },
    { name: 'Anêmona Bubble Tip Rainbow (Entacmaea quadricolor var. Rainbow)', common: 'Anêmona Bubble Tip Rainbow', sci: 'Entacmaea quadricolor var. Rainbow', candidates: ['anemona-bubble-tip-rainbow.jpg'] }
  ],
  '043_hammer_bicolor': [
    { name: 'Coral Hammer Bicolor (Fimbriaphyllia ancora)', common: 'Coral Hammer Bicolor', sci: 'Fimbriaphyllia ancora', isPrimary: true }
  ],
  '044_hammer_full_green': [
    { name: 'Coral Hammer Full Green (Fimbriaphyllia ancora)', common: 'Coral Hammer Full Green', sci: 'Fimbriaphyllia ancora', isPrimary: true },
    { name: 'Coral Hammer Toxic Splatter (Fimbriaphyllia ancora)', common: 'Coral Hammer Toxic Splatter', sci: 'Fimbriaphyllia ancora', candidates: ['hammer-toxic-splatter.jpg'] }
  ],
  '046_hammer_gold_yellow': [
    { name: 'Coral Hammer Gold (Fimbriaphyllia ancora)', common: 'Coral Hammer Gold', sci: 'Fimbriaphyllia ancora', isPrimary: true },
    { name: 'Coral Hammer Yellow (Fimbriaphyllia ancora)', common: 'Coral Hammer Yellow', sci: 'Fimbriaphyllia ancora', candidates: ['hammer-yellow.jpg'] }
  ],
  '047_frogspawn_bicolor': [
    { name: 'Coral Frogspawn Verde Ponta Roxa (Fimbriaphyllia divisa)', common: 'Coral Frogspawn Verde Ponta Roxa', sci: 'Fimbriaphyllia divisa', isPrimary: true }
  ],
  '048_frogspawn_octospawn_green': [
    { name: 'Coral Frogspawn Full Green (Fimbriaphyllia divisa)', common: 'Coral Frogspawn Full Green', sci: 'Fimbriaphyllia divisa', isPrimary: true },
    { name: 'Coral Octospawn Verde (Fimbriaphyllia paradivisa)', common: 'Coral Octospawn Verde', sci: 'Fimbriaphyllia paradivisa', candidates: ['octospawn-coral.jpg', 'coral-octospawn-verde.jpg'] }
  ],
  '049_torch_green_tip': [
    { name: 'Coral Torch Green Tip (Euphyllia glabrescens)', common: 'Coral Torch Green Tip', sci: 'Euphyllia glabrescens', isPrimary: true },
    { name: 'Coral Torch Metallic Green (Euphyllia glabrescens)', common: 'Coral Torch Metallic Green', sci: 'Euphyllia glabrescens', candidates: ['torch-metallic-green.jpg'] }
  ],
  '051_torch_dragon_soul_gold': [
    { name: 'Coral Torch Dragon Soul (Euphyllia glabrescens)', common: 'Coral Torch Dragon Soul', sci: 'Euphyllia glabrescens', isPrimary: true },
    { name: 'Coral Torch Indo Gold (Euphyllia glabrescens)', common: 'Coral Torch Indo Gold', sci: 'Euphyllia glabrescens', candidates: ['torch-indo-gold.jpg'] }
  ],
  '052_frammer_euphyllia': [
    { name: 'Coral Frammer Híbrido (Euphyllia sp. Frammer)', common: 'Coral Frammer Híbrido', sci: 'Euphyllia sp. Frammer', isPrimary: true }
  ],
  '054_trumpet_bicolor': [
    { name: 'Coral Trumpet Bicolor (Caulastrea curvata)', common: 'Coral Trumpet Bicolor', sci: 'Caulastrea curvata', isPrimary: true },
    { name: 'Coral Trumpet Azul (Caulastrea furcata)', common: 'Coral Trumpet Azul', sci: 'Caulastrea furcata', candidates: ['trumpet-azul.jpg', 'trumpet-blue.jpg'] }
  ],
  '056_acanthastrea_red_green': [
    { name: 'Coral Acanthastrea Red (Micromussa lordhowensis)', common: 'Coral Acanthastrea Red', sci: 'Micromussa lordhowensis', isPrimary: true },
    { name: 'Coral Acanthastrea Green (Micromussa lordhowensis)', common: 'Coral Acanthastrea Green', sci: 'Micromussa lordhowensis', candidates: ['acanthastrea-micromussa-orange.jpg'] }
  ],
  '057_acanthastrea_rainbow': [
    { name: 'Coral Acanthastrea Rainbow (Micromussa lordhowensis)', common: 'Coral Acanthastrea Rainbow', sci: 'Micromussa lordhowensis', isPrimary: true },
    { name: 'Coral Acanthastrea Orange Crush (Micromussa lordhowensis)', common: 'Coral Acanthastrea Orange Crush', sci: 'Micromussa lordhowensis', candidates: ['acanthastrea-orange-crush.jpg'] }
  ],
  '058_goniopora_red_pink': [
    { name: 'Coral Goniopora Red (Goniopora stokesi)', common: 'Coral Goniopora Red', sci: 'Goniopora stokesi', isPrimary: true },
    { name: 'Coral Goniopora Pink (Goniopora stokesi)', common: 'Coral Goniopora Pink', sci: 'Goniopora stokesi', candidates: ['goniopora-pink.jpg'] }
  ],
  '059_goniopora_green_neon': [
    { name: 'Coral Goniopora Green Neon (Goniopora sp.)', common: 'Coral Goniopora Green Neon', sci: 'Goniopora sp.', isPrimary: true },
    { name: 'Coral Alveopora Verde (Alveopora tizardi)', common: 'Coral Alveopora Verde', sci: 'Alveopora tizardi', candidates: ['alveopora-verde.jpg'] }
  ],
  '060_blastomussa_favia_chalice': [
    { name: 'Coral Blastomussa Wellsi (Blastomussa wellsi)', common: 'Coral Blastomussa Wellsi', sci: 'Blastomussa wellsi', isPrimary: true },
    { name: 'Coral Favia Dragon Soul (Favia favus)', common: 'Coral Favia Dragon Soul', sci: 'Favia favus', candidates: ['favia-dragon-soul.jpg'] },
    { name: 'Coral Chalice Hollywood Stunner (Echinopora lamellosa)', common: 'Coral Chalice Hollywood Stunner', sci: 'Echinopora lamellosa', candidates: ['chalice-hollywood-stunner.jpg'] }
  ],
  '062_montipora_capricornis_grafted': [
    { name: 'Coral Montipora Capricornis Verde (Montipora capricornis)', common: 'Coral Montipora Capricornis Verde', sci: 'Montipora capricornis', isPrimary: true },
    { name: 'Coral Montipora Capricornis Grafted (Montipora capricornis)', common: 'Coral Montipora Capricornis Grafted', sci: 'Montipora capricornis', candidates: ['montipora-grafted.jpg'] }
  ],
  '063_montipora_digitata_forest_fire': [
    { name: 'Coral Montipora Digitata Forest Fire (Montipora digitata)', common: 'Coral Montipora Digitata Forest Fire', sci: 'Montipora digitata', isPrimary: true },
    { name: 'Coral Montipora Digitata Red (Montipora digitata)', common: 'Coral Montipora Digitata Red', sci: 'Montipora digitata', candidates: ['montipora-digitata-red.jpg'] }
  ],
  '064_montipora_superman_incrustante': [
    { name: 'Coral Montipora Incrustante Superman (Montipora tuberculosa)', common: 'Coral Montipora Incrustante Superman', sci: 'Montipora tuberculosa', isPrimary: true },
    { name: 'Coral Montipora Incrustante Sunset (Montipora danae)', common: 'Coral Montipora Incrustante Sunset', sci: 'Montipora danae', candidates: ['montipora-sunset.jpg'] }
  ],
  '067_seriatopora_caliendrum_green': [
    { name: 'Coral Seriatopora Caliendrum Verde (Seriatopora caliendrum)', common: 'Coral Seriatopora Caliendrum Verde', sci: 'Seriatopora caliendrum', isPrimary: true },
    { name: 'Coral Seriatopora Caliendrum Bicolor (Seriatopora caliendrum)', common: 'Coral Seriatopora Caliendrum Bicolor', sci: 'Seriatopora caliendrum', candidates: ['seriatopora-caliendrum-bicolor.jpg'] }
  ],
  '068_acropora_bali_slimer_valida': [
    { name: 'Coral Acropora Green Slimer (Acropora yongei)', common: 'Coral Acropora Green Slimer', sci: 'Acropora yongei', isPrimary: true },
    { name: 'Coral Acropora Valida Tricolor (Acropora valida)', common: 'Coral Acropora Valida Tricolor', sci: 'Acropora valida', candidates: ['acropora-valida.jpg'] },
    { name: 'Coral Acropora Millepora Azul (Acropora millepora)', common: 'Coral Acropora Millepora Azul', sci: 'Acropora millepora', candidates: ['acropora-millepora-blue.jpg'] }
  ],

  // === TIER 1 PEIXES MARINHOS ===
  '071_ocellaris_snowflake': [
    { name: 'Peixe-palhaço Snowflake (Amphiprion ocellaris)', common: 'Peixe-palhaço Snowflake', sci: 'Amphiprion ocellaris', isPrimary: true }
  ],
  '072_ocellaris_black_snowflake': [
    { name: 'Peixe-palhaço Black Snowflake (Amphiprion ocellaris)', common: 'Peixe-palhaço Black Snowflake', sci: 'Amphiprion ocellaris', isPrimary: true },
    { name: 'Peixe-palhaço Black Ice (Amphiprion ocellaris)', common: 'Peixe-palhaço Black Ice', sci: 'Amphiprion ocellaris', candidates: ['palhaco-black-ice.jpg'] }
  ],
  '073_ocellaris_picasso_davinci': [
    { name: 'Peixe-palhaço Picasso (Amphiprion percula)', common: 'Peixe-palhaço Picasso', sci: 'Amphiprion percula', isPrimary: true },
    { name: 'Peixe-palhaço DaVinci (Amphiprion ocellaris)', common: 'Peixe-palhaço DaVinci', sci: 'Amphiprion ocellaris', candidates: ['palhaco-davinci.jpg'] },
    { name: 'Peixe-palhaço Gladiator (Amphiprion ocellaris)', common: 'Peixe-palhaço Gladiator', sci: 'Amphiprion ocellaris', candidates: ['palhaco-black-gladiator.jpg'] }
  ],
  '074_ocellaris_frostbite_flurry': [
    { name: 'Peixe-palhaço Frostbite (Amphiprion ocellaris)', common: 'Peixe-palhaço Frostbite', sci: 'Amphiprion ocellaris', isPrimary: true },
    { name: 'Peixe-palhaço Flurry (Amphiprion ocellaris)', common: 'Peixe-palhaço Flurry', sci: 'Amphiprion ocellaris', candidates: ['palhaco-flurry.jpg'] }
  ],
  '075_ocellaris_storm': [
    { name: 'Peixe-palhaço Orange Storm (Amphiprion ocellaris)', common: 'Peixe-palhaço Orange Storm', sci: 'Amphiprion ocellaris', isPrimary: true },
    { name: 'Peixe-palhaço Black Storm (Amphiprion ocellaris)', common: 'Peixe-palhaço Black Storm', sci: 'Amphiprion ocellaris', candidates: ['palhaco-black-storm.jpg'] }
  ],
  '076_blue_tang_hepatus': [
    { name: 'Blue Tang (Paracanthurus hepatus)', common: 'Blue Tang', sci: 'Paracanthurus hepatus', isPrimary: true }
  ],
  '078_sailfin_scopas_tang': [
    { name: 'Sailfin Tang (Zebrasoma veliferum)', common: 'Sailfin Tang', sci: 'Zebrasoma veliferum', isPrimary: true },
    { name: 'Scopas Tang (Zebrasoma scopas)', common: 'Scopas Tang', sci: 'Zebrasoma scopas', candidates: ['tang-scopas.jpg'] }
  ],
  '079_powder_blue_naso_tang': [
    { name: 'Powder Blue Tang (Acanthurus leucosternon)', common: 'Powder Blue Tang', sci: 'Acanthurus leucosternon', isPrimary: true },
    { name: 'Naso Tang (Naso lituratus)', common: 'Naso Tang', sci: 'Naso lituratus', candidates: ['tang-naso-elegans.jpg', 'tang-naso.jpg'] }
  ],
  '080_royal_gramma': [
    { name: 'Royal Gramma (Gramma loreto)', common: 'Royal Gramma', sci: 'Gramma loreto', isPrimary: true },
    { name: 'Gramma Brasileiro (Gramma brasiliensis)', common: 'Gramma Brasileiro', sci: 'Gramma brasiliensis', candidates: ['gramma-brasileiro.jpg'] }
  ],
  '083_six_line_wrasse': [
    { name: 'Six Line Wrasse (Pseudocheilinus hexataenia)', common: 'Six Line Wrasse', sci: 'Pseudocheilinus hexataenia', isPrimary: true },
    { name: 'Yellow Coris Wrasse (Halichoeres chrysus)', common: 'Yellow Coris Wrasse', sci: 'Halichoeres chrysus', candidates: ['wrasse-yellow-coris.jpg'] }
  ],
  '085_gobies_blennies_watchman': [
    { name: 'Goby Yellow Watchman (Cryptocentrus cinctus)', common: 'Goby Yellow Watchman', sci: 'Cryptocentrus cinctus', isPrimary: true },
    { name: 'Blênio Bicolor (Ecsenius bicolor)', common: 'Blênio Bicolor', sci: 'Ecsenius bicolor', candidates: ['blenio-bicolor.jpg'] },
    { name: 'Blênio Midas (Ecsenius midas)', common: 'Blênio Midas', sci: 'Ecsenius midas', candidates: ['blenio-midas.jpg'] }
  ],
  '087_cardinal_banggai_pijama': [
    { name: 'Cardinal Banggai (Pterapogon kauderni)', common: 'Cardinal Banggai', sci: 'Pterapogon kauderni', isPrimary: true },
    { name: 'Cardinal Pijama (Sphaeramia nematoptera)', common: 'Cardinal Pijama', sci: 'Sphaeramia nematoptera', candidates: ['cardinal-pijama.jpg'] }
  ],
  '088_anjos_anoes_flame_coral_beauty': [
    { name: 'Flame Angel (Centropyge loricula)', common: 'Flame Angel', sci: 'Centropyge loricula', isPrimary: true },
    { name: 'Coral Beauty (Centropyge bispinosa)', common: 'Coral Beauty', sci: 'Centropyge bispinosa', candidates: ['anjo-coral-beauty.jpg'] }
  ],
  '089_camaroes_cleaner_bailarino': [
    { name: 'Camarão Limpador Cleaner (Lysmata amboinensis)', common: 'Camarão Limpador Cleaner', sci: 'Lysmata amboinensis', isPrimary: true, subCategory: 'MARINE_INVERTEBRATE' },
    { name: 'Camarão Bailarino (Lysmata boggessi)', common: 'Camarão Bailarino', sci: 'Lysmata boggessi', candidates: ['camarao-bailarino.jpg'], subCategory: 'MARINE_INVERTEBRATE' },
    { name: 'Camarão Blood Fire (Lysmata debelius)', common: 'Camarão Blood Fire', sci: 'Lysmata debelius', candidates: ['camarao-blood.jpg'], subCategory: 'MARINE_INVERTEBRATE' }
  ],
  '090_equipe_limpeza_paguro_snail': [
    { name: 'Mini Paguro Patas Amarelas (Clibanarius tricolor)', common: 'Mini Paguro Patas Amarelas', sci: 'Clibanarius tricolor', isPrimary: true, subCategory: 'MARINE_INVERTEBRATE' },
    { name: 'Caracol Turbo Snail (Turbo fluctuosus)', common: 'Caracol Turbo Snail', sci: 'Turbo fluctuosus', candidates: ['turbo-snail.jpg'], subCategory: 'MARINE_INVERTEBRATE' },
    { name: 'Caracol Nassarius (Nassarius vibex)', common: 'Caracol Nassarius', sci: 'Nassarius vibex', candidates: ['caracol-nassarius.jpg'], subCategory: 'MARINE_INVERTEBRATE' }
  ],

  // === TIER 1 PEIXES DE ÁGUA DOCE ===
  '091_guppy_moscou_full_black': [
    { name: 'Guppy Moscou Full Black (Poecilia reticulata)', common: 'Guppy Moscou Full Black', sci: 'Poecilia reticulata', isPrimary: true },
    { name: 'Guppy Moscou Blue (Poecilia reticulata)', common: 'Guppy Moscou Blue', sci: 'Poecilia reticulata', candidates: ['guppy-moscou-blue.jpg'] }
  ],
  '092_guppy_tuxedo_half_black': [
    { name: 'Guppy Tuxedo Half Black Red (Poecilia reticulata)', common: 'Guppy Tuxedo Half Black Red', sci: 'Poecilia reticulata', isPrimary: true },
    { name: 'Guppy Tuxedo Yellow (Poecilia reticulata)', common: 'Guppy Tuxedo Yellow', sci: 'Poecilia reticulata', candidates: ['guppy-tuxedo-yellow.jpg'] }
  ],
  '093_guppy_cobra_snakeskin': [
    { name: 'Guppy King Cobra (Poecilia reticulata)', common: 'Guppy King Cobra', sci: 'Poecilia reticulata', isPrimary: true },
    { name: 'Guppy Snakeskin Verde (Poecilia reticulata)', common: 'Guppy Snakeskin Verde', sci: 'Poecilia reticulata', candidates: ['guppy-snakeskin-green.jpg'] }
  ],
  '094_guppy_dumbo_mosaico': [
    { name: 'Guppy Dumbo Big Ear (Poecilia reticulata)', common: 'Guppy Dumbo Big Ear', sci: 'Poecilia reticulata', isPrimary: true },
    { name: 'Guppy Mosaico Red (Poecilia reticulata)', common: 'Guppy Mosaico Red', sci: 'Poecilia reticulata', candidates: ['guppy-mosaico-red.jpg'] }
  ],
  '096_guppy_endler_black_bar': [
    { name: 'Guppy Endler Black Bar (Poecilia wingei)', common: 'Guppy Endler Black Bar', sci: 'Poecilia wingei', isPrimary: true },
    { name: 'Guppy Endler Tiger (Poecilia wingei)', common: 'Guppy Endler Tiger', sci: 'Poecilia wingei', candidates: ['guppy-endler-tiger.jpg'] }
  ],
  '097_guppy_endler_red': [
    { name: 'Guppy Endler Red Scarlet (Poecilia wingei)', common: 'Guppy Endler Red Scarlet', sci: 'Poecilia wingei', isPrimary: true }
  ],
  '100_betta_plakat_koi_nemo': [
    { name: 'Betta Plakat Koi Galaxy (Betta splendens)', common: 'Betta Plakat Koi Galaxy', sci: 'Betta splendens', isPrimary: true },
    { name: 'Betta Plakat Candy Nemo (Betta splendens)', common: 'Betta Plakat Candy Nemo', sci: 'Betta splendens', candidates: ['betta-plakat-candy-nemo.jpg'] }
  ],
  '103_betta_femea': [
    { name: 'Betta Fêmea Comum (Betta splendens)', common: 'Betta Fêmea Comum', sci: 'Betta splendens', isPrimary: true }
  ],
  '104_plati_mickey': [
    { name: 'Plati Mickey Mouse (Xiphophorus maculatus)', common: 'Plati Mickey Mouse', sci: 'Xiphophorus maculatus', isPrimary: true },
    { name: 'Plati Aurora (Xiphophorus maculatus)', common: 'Plati Aurora', sci: 'Xiphophorus maculatus', candidates: ['plati-aurora.jpg'] }
  ],
  '105_plati_wagtail_sangue': [
    { name: 'Plati Wagtail Red (Xiphophorus maculatus)', common: 'Plati Wagtail Red', sci: 'Xiphophorus maculatus', isPrimary: true },
    { name: 'Plati Sangue Coral (Xiphophorus maculatus)', common: 'Plati Sangue Coral', sci: 'Xiphophorus maculatus', candidates: ['plati-vermelho-sangue.jpg'] },
    { name: 'Plati Balão Red (Xiphophorus maculatus var. Balão)', common: 'Plati Balão Red', sci: 'Xiphophorus maculatus var. Balão', candidates: ['plati-balao.jpg'] }
  ],
  '106_espada_sangue': [
    { name: 'Espada Sangue Vermelho (Xiphophorus hellerii)', common: 'Espada Sangue Vermelho', sci: 'Xiphophorus hellerii', isPrimary: true },
    { name: 'Espada Lira Vermelho (Xiphophorus hellerii var. Lyretail)', common: 'Espada Lira Vermelho', sci: 'Xiphophorus hellerii var. Lyretail', candidates: ['espada-lira.jpg'] }
  ],
  '107_espada_kohaku_koi': [
    { name: 'Espada Kohaku Koi (Xiphophorus hellerii)', common: 'Espada Kohaku Koi', sci: 'Xiphophorus hellerii', isPrimary: true },
    { name: 'Espada Verde Selvagem (Xiphophorus hellerii)', common: 'Espada Verde Selvagem', sci: 'Xiphophorus hellerii', candidates: ['espada-verde.jpg'] },
    { name: 'Espada Preto Tuxedo (Xiphophorus hellerii)', common: 'Espada Preto Tuxedo', sci: 'Xiphophorus hellerii', candidates: ['espada-preto.jpg'] }
  ],
  '108_molinesia_negra_lira': [
    { name: 'Molinésia Negra (Poecilia sphenops)', common: 'Molinésia Negra', sci: 'Poecilia sphenops', isPrimary: true },
    { name: 'Molinésia Negra Lira (Poecilia sphenops var. Lyretail)', common: 'Molinésia Negra Lira', sci: 'Poecilia sphenops var. Lyretail', candidates: ['molinesia-negra-lira.jpg'] }
  ],
  '109_molinesia_dalmata': [
    { name: 'Molinésia Dálmata (Poecilia sphenops)', common: 'Molinésia Dálmata', sci: 'Poecilia sphenops', isPrimary: true },
    { name: 'Molinésia Ouro (Poecilia sphenops)', common: 'Molinésia Ouro', sci: 'Poecilia sphenops', candidates: ['molinesia-ouro.jpg'] },
    { name: 'Molinésia Balão (Poecilia sphenops var. Balão)', common: 'Molinésia Balão', sci: 'Poecilia sphenops var. Balão', candidates: ['molinesia-balao.jpg'] }
  ],
  '110_colisa_lalia_sangue_azul': [
    { name: 'Colisa Lália Clássica (Trichogaster lalius)', common: 'Colisa Lália Clássica', sci: 'Trichogaster lalius', isPrimary: true },
    { name: 'Colisa Sangue Red (Trichogaster lalius var. Red)', common: 'Colisa Sangue Red', sci: 'Trichogaster lalius var. Red', candidates: ['colisa-sangue.jpg'] },
    { name: 'Colisa Azul Cobalto (Trichogaster lalius var. Cobalt)', common: 'Colisa Azul Cobalto', sci: 'Trichogaster lalius var. Cobalt', candidates: ['colisa-azul-cobalto.jpg'] },
    { name: 'Colisa Mel (Trichogaster chuna)', common: 'Colisa Mel', sci: 'Trichogaster chuna', candidates: ['colisa-chuna-mel.jpg'] }
  ],
  '111_tricogaster_perola_azul_ouro': [
    { name: 'Tricogaster Pérola Leeri (Trichopodus leerii)', common: 'Tricogaster Pérola Leeri', sci: 'Trichopodus leerii', isPrimary: true },
    { name: 'Tricogaster Azul (Trichopodus trichopterus)', common: 'Tricogaster Azul', sci: 'Trichopodus trichopterus', candidates: ['tricogaster-azul.jpg'] },
    { name: 'Tricogaster Ouro (Trichopodus trichopterus var. Gold)', common: 'Tricogaster Ouro', sci: 'Trichopodus trichopterus var. Gold', candidates: ['tricogaster-ouro.jpg'] }
  ],
  '113_neon_innesi_verde_negro': [
    { name: 'Neon Innesi (Paracheirodon innesi)', common: 'Neon Innesi', sci: 'Paracheirodon innesi', isPrimary: true },
    { name: 'Neon Verde (Paracheirodon simulans)', common: 'Neon Verde', sci: 'Paracheirodon simulans', candidates: ['neon-verde-simulans.jpg'] },
    { name: 'Neon Negro (Hyphessobrycon herbertaxelrodi)', common: 'Neon Negro', sci: 'Hyphessobrycon herbertaxelrodi', candidates: ['neon-negro.jpg'] }
  ],
  '114_tetra_negro': [
    { name: 'Tetra Negro Comum (Gymnocorymbus ternetzi)', common: 'Tetra Negro Comum', sci: 'Gymnocorymbus ternetzi', isPrimary: true },
    { name: 'Tetra Negro Véu (Gymnocorymbus ternetzi var. Longfin)', common: 'Tetra Negro Véu', sci: 'Gymnocorymbus ternetzi var. Longfin', candidates: ['tetra-negro-veu.jpg'] }
  ],
  '115_tetra_white_skirt_color': [
    { name: 'Tetra White Skirt (Gymnocorymbus ternetzi var. White)', common: 'Tetra White Skirt', sci: 'Gymnocorymbus ternetzi var. White', isPrimary: true },
    { name: 'Tetra Glow Color (Gymnocorymbus ternetzi var. Glow)', common: 'Tetra Glow Color', sci: 'Gymnocorymbus ternetzi var. Glow', candidates: ['tetra-glow.jpg'] }
  ],
  '117_rodostomus_nariz_de_bebado': [
    { name: 'Rodóstomus Nariz-de-Bêbado (Hemigrammus bleheri)', common: 'Rodóstomus Nariz-de-Bêbado', sci: 'Hemigrammus bleheri', isPrimary: true }
  ],
  '119_paulistinha_danio': [
    { name: 'Paulistinha Comum (Danio rerio)', common: 'Paulistinha Comum', sci: 'Danio rerio', isPrimary: true },
    { name: 'Paulistinha Véu (Danio rerio var. Longfin)', common: 'Paulistinha Véu', sci: 'Danio rerio var. Longfin', candidates: ['paulistinha-veu.jpg'] },
    { name: 'Paulistinha Rosa (Danio rerio var. Rose)', common: 'Paulistinha Rosa', sci: 'Danio rerio var. Rose', candidates: ['paulistinha-rosa.jpg'] }
  ],
  '121_rasbora_galaxy_cpd': [
    { name: 'Rásbora Galaxy CPD (Danio margaritatus)', common: 'Rásbora Galaxy CPD', sci: 'Danio margaritatus', isPrimary: true },
    { name: 'Micro Rásbora Esmeralda (Danio erythromicron)', common: 'Micro Rásbora Esmeralda', sci: 'Danio erythromicron', candidates: ['rasbora-erythromicron.jpg'] }
  ],
  '122_barbo_sumatra_tigre': [
    { name: 'Barbo Sumatra Comum (Puntigrus tetrazona)', common: 'Barbo Sumatra Comum', sci: 'Puntigrus tetrazona', isPrimary: true },
    { name: 'Barbo Sumatra Verde (Puntigrus tetrazona var. Green)', common: 'Barbo Sumatra Verde', sci: 'Puntigrus tetrazona var. Green', candidates: ['barbo-sumatra-verde.jpg'] },
    { name: 'Barbo Sumatra Albino (Puntigrus tetrazona var. Albino)', common: 'Barbo Sumatra Albino', sci: 'Puntigrus tetrazona var. Albino', candidates: ['barbo-sumatra-albino.jpg'] }
  ],
  '123_barbo_cereja_ouro': [
    { name: 'Barbo Cereja (Desmopuntius titteya)', common: 'Barbo Cereja', sci: 'Desmopuntius titteya', isPrimary: true },
    { name: 'Barbo Ouro (Barbodes semifasciolatus)', common: 'Barbo Ouro', sci: 'Barbodes semifasciolatus', candidates: ['barbo-ouro.jpg'] }
  ],
  '124_acara_bandeira_koi': [
    { name: 'Acará Bandeira Koi (Pterophyllum scalare var. Koi)', common: 'Acará Bandeira Koi', sci: 'Pterophyllum scalare var. Koi', isPrimary: true },
    { name: 'Acará Bandeira Orange Marble (Pterophyllum scalare var. Orange Marble)', common: 'Acará Bandeira Orange Marble', sci: 'Pterophyllum scalare var. Orange Marble', candidates: ['acara-bandeira-orange-marble.jpg'] }
  ],
  '125_acara_bandeira_marmore_zebra': [
    { name: 'Acará Bandeira Mármore (Pterophyllum scalare var. Marble)', common: 'Acará Bandeira Mármore', sci: 'Pterophyllum scalare var. Marble', isPrimary: true },
    { name: 'Acará Bandeira Palhaço (Pterophyllum scalare var. Clown)', common: 'Acará Bandeira Palhaço', sci: 'Pterophyllum scalare var. Clown', candidates: ['acara-bandeira-palhaco.jpg'] },
    { name: 'Acará Bandeira Zebra (Pterophyllum scalare var. Zebra)', common: 'Acará Bandeira Zebra', sci: 'Pterophyllum scalare var. Zebra', candidates: ['acara-bandeira-comum-listrado.jpg'] }
  ],
  '126_acara_bandeira_negro_pinoy': [
    { name: 'Acará Bandeira Black Negro (Pterophyllum scalare var. Black)', common: 'Acará Bandeira Black Negro', sci: 'Pterophyllum scalare var. Black', isPrimary: true },
    { name: 'Acará Bandeira Fumaça (Pterophyllum scalare var. Smoke)', common: 'Acará Bandeira Fumaça', sci: 'Pterophyllum scalare var. Smoke', candidates: ['acara-bandeira-fumaca.jpg'] },
    { name: 'Acará Bandeira Pinoy (Pterophyllum scalare var. Pinoy)', common: 'Acará Bandeira Pinoy', sci: 'Pterophyllum scalare var. Pinoy', candidates: ['acara-bandeira-pinoy.jpg'] }
  ],
  '127_acara_bandeira_ouro_albino': [
    { name: 'Acará Bandeira Ouro (Pterophyllum scalare var. Gold)', common: 'Acará Bandeira Ouro', sci: 'Pterophyllum scalare var. Gold', isPrimary: true },
    { name: 'Acará Bandeira Platina (Pterophyllum scalare var. Platinum)', common: 'Acará Bandeira Platina', sci: 'Pterophyllum scalare var. Platinum', candidates: ['acara-bandeira-platina.jpg'] },
    { name: 'Acará Bandeira Albino (Pterophyllum scalare var. Albino)', common: 'Acará Bandeira Albino', sci: 'Pterophyllum scalare var. Albino', candidates: ['acara-bandeira-albino.jpg'] }
  ],
  '128_acara_disco_azul_turquesa': [
    { name: 'Acará Disco Azul Turquesa (Symphysodon aequifasciatus var. Turquoise)', common: 'Acará Disco Azul Turquesa', sci: 'Symphysodon aequifasciatus var. Turquoise', isPrimary: true },
    { name: 'Acará Disco Cobalt Blue (Symphysodon aequifasciatus var. Cobalt)', common: 'Acará Disco Cobalt Blue', sci: 'Symphysodon aequifasciatus var. Cobalt', candidates: ['acara-disco-cobalt-blue.jpg'] }
  ],
  '129_acara_disco_pigeon_blood': [
    { name: 'Acará Disco Pigeon Blood (Symphysodon aequifasciatus var. Pigeon Blood)', common: 'Acará Disco Pigeon Blood', sci: 'Symphysodon aequifasciatus var. Pigeon Blood', isPrimary: true },
    { name: 'Acará Disco Red Marlboro (Symphysodon aequifasciatus var. Marlboro)', common: 'Acará Disco Red Marlboro', sci: 'Symphysodon aequifasciatus var. Marlboro', candidates: ['acara-disco-red-marlboro.jpg'] }
  ],
  '130_acara_disco_blue_diamond': [
    { name: 'Acará Disco Blue Diamond (Symphysodon aequifasciatus var. Blue Diamond)', common: 'Acará Disco Blue Diamond', sci: 'Symphysodon aequifasciatus var. Blue Diamond', isPrimary: true },
    { name: 'Acará Disco White Diamond (Symphysodon aequifasciatus var. White Diamond)', common: 'Acará Disco White Diamond', sci: 'Symphysodon aequifasciatus var. White Diamond', candidates: ['acara-disco-white-diamond.jpg'] }
  ],
  '131_acara_disco_selvagem': [
    { name: 'Acará Disco Selvagem Heckel (Symphysodon discus)', common: 'Acará Disco Selvagem Heckel', sci: 'Symphysodon discus', isPrimary: true },
    { name: 'Acará Disco Selvagem Verde Tefé (Symphysodon tarzoo)', common: 'Acará Disco Selvagem Verde Tefé', sci: 'Symphysodon tarzoo', candidates: ['acara-disco-selvagem-verde.jpg'] },
    { name: 'Acará Disco Selvagem Azul (Symphysodon aequifasciatus)', common: 'Acará Disco Selvagem Azul', sci: 'Symphysodon aequifasciatus', candidates: ['acara-disco-selvagem-azul.jpg'] }
  ],
  '132_ramirezi_comum_alemao': [
    { name: 'Ramirezi Comum (Mikrogeophagus ramirezi)', common: 'Ramirezi Comum', sci: 'Mikrogeophagus ramirezi', isPrimary: true },
    { name: 'Ramirezi Ouro (Mikrogeophagus ramirezi var. Gold)', common: 'Ramirezi Ouro', sci: 'Mikrogeophagus ramirezi var. Gold', candidates: ['ramirezi-ouro.jpg'] }
  ],
  '133_ramirezi_electric_blue': [
    { name: 'Ramirezi Electric Blue (Mikrogeophagus ramirezi var. Electric Blue)', common: 'Ramirezi Electric Blue', sci: 'Mikrogeophagus ramirezi var. Electric Blue', isPrimary: true },
    { name: 'Ramirezi Black German (Mikrogeophagus ramirezi var. Black)', common: 'Ramirezi Black German', sci: 'Mikrogeophagus ramirezi var. Black', candidates: ['ramirezi-black.jpg'] }
  ],
  '134_apistogramma_cacatuoides_agassizii': [
    { name: 'Apistogramma Cacatuoides Double Red (Apistogramma cacatuoides)', common: 'Apistogramma Cacatuoides Double Red', sci: 'Apistogramma cacatuoides', isPrimary: true },
    { name: 'Apistogramma Agassizii Fire Red (Apistogramma agassizii)', common: 'Apistogramma Agassizii Fire Red', sci: 'Apistogramma agassizii', candidates: ['apistogramma-agassizii-double-red.jpg'] }
  ],
  '135_ciclideos_malawi_yellow': [
    { name: 'Ciclídeo Yellow Lab Caeruleus (Labidochromis caeruleus)', common: 'Ciclídeo Yellow Lab Caeruleus', sci: 'Labidochromis caeruleus', isPrimary: true },
    { name: 'Ciclídeo Pseudotropheus Socolofi (Chindongo socolofi)', common: 'Ciclídeo Pseudotropheus Socolofi', sci: 'Chindongo socolofi', candidates: ['ciclideo-pseudotropheus-socolofi.jpg'] }
  ],
  '139_kinguio_cometa_sarasa': [
    { name: 'Kinguio Cometa Vermelho (Carassius auratus)', common: 'Kinguio Cometa Vermelho', sci: 'Carassius auratus', isPrimary: true },
    { name: 'Kinguio Cometa Sarasa (Carassius auratus var. Sarasa)', common: 'Kinguio Cometa Sarasa', sci: 'Carassius auratus var. Sarasa', candidates: ['kinguio-cometa-sarasa.jpg'] }
  ],
  '140_kinguio_oranda_red_cap': [
    { name: 'Kinguio Oranda Red Cap (Carassius auratus var. Red Cap)', common: 'Kinguio Oranda Red Cap', sci: 'Carassius auratus var. Red Cap', isPrimary: true },
    { name: 'Kinguio Oranda Cálico (Carassius auratus var. Calico)', common: 'Kinguio Oranda Cálico', sci: 'Carassius auratus var. Calico', candidates: ['kinguio-oranda-calico.jpg'] },
    { name: 'Kinguio Oranda Panda (Carassius auratus var. Panda)', common: 'Kinguio Oranda Panda', sci: 'Carassius auratus var. Panda', candidates: ['kinguio-oranda-panda.jpg'] }
  ],
  '141_kinguio_telescopio_black_moor': [
    { name: 'Kinguio Telescópio Black Moor (Carassius auratus var. Black Moor)', common: 'Kinguio Telescópio Black Moor', sci: 'Carassius auratus var. Black Moor', isPrimary: true },
    { name: 'Kinguio Ranchu Lionhead (Carassius auratus var. Ranchu)', common: 'Kinguio Ranchu Lionhead', sci: 'Carassius auratus var. Ranchu', candidates: ['kinguio-ranchu.jpg'] }
  ],
  '142_coridora_bronze_albina': [
    { name: 'Coridora Bronze Aeneus (Corydoras aeneus)', common: 'Coridora Bronze Aeneus', sci: 'Corydoras aeneus', isPrimary: true },
    { name: 'Coridora Albina (Corydoras aeneus var. Albino)', common: 'Coridora Albina', sci: 'Corydoras aeneus var. Albino', candidates: ['coridora-aeneus.jpg'] }
  ],
  '143_coridora_pimenta_schwartzi': [
    { name: 'Coridora Pimenta (Corydoras paleatus)', common: 'Coridora Pimenta', sci: 'Corydoras paleatus', isPrimary: true },
    { name: 'Coridora Schwartzi Tigre (Corydoras schwartzi)', common: 'Coridora Schwartzi Tigre', sci: 'Corydoras schwartzi', candidates: ['coridora-schwartzi.jpg'] }
  ],
  '144_coridora_panda_sterbai': [
    { name: 'Coridora Panda (Corydoras panda)', common: 'Coridora Panda', sci: 'Corydoras panda', isPrimary: true },
    { name: 'Coridora Sterbai (Corydoras sterbai)', common: 'Coridora Sterbai', sci: 'Corydoras sterbai', candidates: ['coridora-sterbai.jpg'] }
  ],
  '145_limpa_vidro_otocinclus': [
    { name: 'Limpa-Vidro Otocinclus (Otocinclus macrospilus)', common: 'Limpa-Vidro Otocinclus', sci: 'Otocinclus macrospilus', isPrimary: true },
    { name: 'Limpa-Vidro Pitbull (Parotocinclus jumbo)', common: 'Limpa-Vidro Pitbull', sci: 'Parotocinclus jumbo', candidates: ['limpa-vidro-pitbull.jpg'] }
  ],
  '146_cascudo_ancistrus_bristlenose': [
    { name: 'Cascudo Ancistrus Comum (Ancistrus cirrhosus)', common: 'Cascudo Ancistrus Comum', sci: 'Ancistrus cirrhosus', isPrimary: true },
    { name: 'Cascudo Ancistrus Albino Ouro (Ancistrus cirrhosus var. Albino)', common: 'Cascudo Ancistrus Albino Ouro', sci: 'Ancistrus cirrhosus var. Albino', candidates: ['cascudo-ancistrus-albino.jpg'] },
    { name: 'Cascudo Ancistrus Super Red (Ancistrus cirrhosus var. Super Red)', common: 'Cascudo Ancistrus Super Red', sci: 'Ancistrus cirrhosus var. Super Red', candidates: ['cascudo-ancistrus-super-red.jpg'] }
  ],
  '147_cascudo_pepita_de_ouro_abacaxi': [
    { name: 'Cascudo Pepita de Ouro L018 (Baryancistrus xanthellus)', common: 'Cascudo Pepita de Ouro L018', sci: 'Baryancistrus xanthellus', isPrimary: true },
    { name: 'Cascudo Abacaxi (Megalancistrus parananus)', common: 'Cascudo Abacaxi', sci: 'Megalancistrus parananus', candidates: ['cascudo-abacaxi.jpg'] },
    { name: 'Cascudo Comum Plet (Hypostomus plecostomus)', common: 'Cascudo Comum Plet', sci: 'Hypostomus plecostomus', candidates: ['cascudo-pletomado.jpg'] }
  ],
  '148_algueiros_labeo_botia_sae': [
    { name: 'Comedor de Alga Siamês SAE (Crossocheilus oblongus)', common: 'Comedor de Alga Siamês SAE', sci: 'Crossocheilus oblongus', isPrimary: true },
    { name: 'Comedor de Alga Chinês CAC (Gyrinocheilus aymonieri)', common: 'Comedor de Alga Chinês CAC', sci: 'Gyrinocheilus aymonieri', candidates: ['comedor-alga-chines.jpg'] },
    { name: 'Labeo Frenatus Red Tail (Epalzeorhynchos frenatum)', common: 'Labeo Frenatus Red Tail', sci: 'Epalzeorhynchos frenatum', candidates: ['labeo-frenatus.jpg'] },
    { name: 'Bótia Palhaço (Chromobotia macracanthus)', common: 'Bótia Palhaço', sci: 'Chromobotia macracanthus', candidates: ['botia-palhaco.jpg'] },
    { name: 'Bótia Yoyo (Botia almorhae)', common: 'Bótia Yoyo', sci: 'Botia almorhae', candidates: ['botia-yoyo.jpg'] }
  ],
  '150_caramujos_ampularia_neritina': [
    { name: 'Caramujo Neritina Zebra (Neritina natalensis)', common: 'Caramujo Neritina Zebra', sci: 'Neritina natalensis', isPrimary: true, subCategory: 'FRESHWATER_INVERTEBRATE' },
    { name: 'Caramujo Neritina Mosaico (Neritina virginea)', common: 'Caramujo Neritina Mosaico', sci: 'Neritina virginea', candidates: ['caracol-neritina-zebra.jpg'], subCategory: 'FRESHWATER_INVERTEBRATE' },
    { name: 'Caramujo Ampulária Ouro (Pomacea diffusa var. Gold)', common: 'Caramujo Ampulária Ouro', sci: 'Pomacea diffusa var. Gold', candidates: ['caramujo-ampularia-dourada.jpg'], subCategory: 'FRESHWATER_INVERTEBRATE' },
    { name: 'Caramujo Ampulária Roxa (Pomacea diffusa var. Purple)', common: 'Caramujo Ampulária Roxa', sci: 'Pomacea diffusa var. Purple', candidates: ['caramujo-ampularia-roxa.jpg'], subCategory: 'FRESHWATER_INVERTEBRATE' }
  ],

  // === TIER 2 CORALS & FISH COMBOS ===
  '200_lobophyllia_red_tricolor': [
    { name: 'Coral Lobophyllia Red (Lobophyllia hemprichii)', common: 'Coral Lobophyllia Red', sci: 'Lobophyllia hemprichii', isPrimary: true },
    { name: 'Coral Lobophyllia Tricolor (Lobophyllia hemprichii)', common: 'Coral Lobophyllia Tricolor', sci: 'Lobophyllia hemprichii', candidates: ['lobophyllia-tricolor.jpg'] }
  ],
  '201_scolymia_bleeding_apple_war_paint': [
    { name: 'Coral Scolymia Bleeding Apple (Homophyllia australis)', common: 'Coral Scolymia Bleeding Apple', sci: 'Homophyllia australis', isPrimary: true },
    { name: 'Coral Scolymia War Paint (Homophyllia australis)', common: 'Coral Scolymia War Paint', sci: 'Homophyllia australis', candidates: ['scolymia-war-paint.jpg'] }
  ],
  '202_acanthastrea_echinata_rainbow': [
    { name: 'Coral Acanthastrea Echinata Rainbow (Acanthastrea echinata)', common: 'Coral Acanthastrea Echinata Rainbow', sci: 'Acanthastrea echinata', isPrimary: true },
    { name: 'Coral Acanthastrea Echinata Orange Eye (Acanthastrea echinata)', common: 'Coral Acanthastrea Echinata Orange Eye', sci: 'Acanthastrea echinata', candidates: ['acanthastrea-orange-eye.jpg'] }
  ],
  '204_favia_dragon_soul_lemon_lime': [
    { name: 'Coral Favia Dragon Soul (Favia sp.)', common: 'Coral Favia Dragon Soul', sci: 'Favia sp.', isPrimary: true },
    { name: 'Coral Favites Lemon Lime (Favites sp.)', common: 'Coral Favites Lemon Lime', sci: 'Favites sp.', candidates: ['favites-lemon-lime.jpg'] }
  ],
  '205_leptastrea_burning_platygyra': [
    { name: 'Coral Leptastrea Burning Blood (Leptastrea purpurea)', common: 'Coral Leptastrea Burning Blood', sci: 'Leptastrea purpurea', isPrimary: true },
    { name: 'Coral Platygyra Maze Cérebro (Platygyra daedalea)', common: 'Coral Platygyra Maze Cérebro', sci: 'Platygyra daedalea', candidates: ['platygyra-maze.jpg'] }
  ],
  '206_cyphastrea_meteor_shower_bizarro': [
    { name: 'Coral Cyphastrea Meteor Shower (Cyphastrea ocellina)', common: 'Coral Cyphastrea Meteor Shower', sci: 'Cyphastrea ocellina', isPrimary: true },
    { name: 'Coral Cyphastrea Bizarro (Cyphastrea sp.)', common: 'Coral Cyphastrea Bizarro', sci: 'Cyphastrea sp.', candidates: ['cyphastrea-bizarro.jpg'] }
  ],
  '207_galaxea_green_gold': [
    { name: 'Coral Galaxea Verde (Galaxea fascicularis)', common: 'Coral Galaxea Verde', sci: 'Galaxea fascicularis', isPrimary: true },
    { name: 'Coral Galaxea Gold (Galaxea fascicularis)', common: 'Coral Galaxea Gold', sci: 'Galaxea fascicularis', candidates: ['galaxea-gold.jpg'] }
  ],
  '208_cynarina_indophyllia_red': [
    { name: 'Coral Cynarina Lacrymalis Red (Cynarina lacrymalis)', common: 'Coral Cynarina Lacrymalis Red', sci: 'Cynarina lacrymalis', isPrimary: true },
    { name: 'Coral Indophyllia Macassarensis (Indophyllia macassarensis)', common: 'Coral Indophyllia Macassarensis', sci: 'Indophyllia macassarensis', candidates: ['indophyllia-macassarensis.jpg'] }
  ],
  '209_montipora_setosa_orange': [
    { name: 'Coral Montipora Setosa Laranja (Montipora setosa)', common: 'Coral Montipora Setosa Laranja', sci: 'Montipora setosa', isPrimary: true }
  ],
  '210_montipora_rainbow_incrustante': [
    { name: 'Coral Montipora Incrustante Rainbow (Montipora sp. Rainbow)', common: 'Coral Montipora Incrustante Rainbow', sci: 'Montipora sp. Rainbow', isPrimary: true },
    { name: 'Coral Montipora Incrustante Pokerstar (Montipora tuberculosa)', common: 'Coral Montipora Incrustante Pokerstar', sci: 'Montipora tuberculosa', candidates: ['montipora-pokerstar.jpg'] }
  ],
  '212_montipora_beach_bum_kung_pao': [
    { name: 'Coral Montipora Beach Bum (Montipora sp.)', common: 'Coral Montipora Beach Bum', sci: 'Montipora sp.', isPrimary: true },
    { name: 'Coral Montipora Kung Pao (Montipora sp.)', common: 'Coral Montipora Kung Pao', sci: 'Montipora sp.', candidates: ['montipora-kung-pao.jpg'] },
    { name: 'Coral Montipora Phoenix (Montipora sp.)', common: 'Coral Montipora Phoenix', sci: 'Montipora sp.', candidates: ['montipora-phoenix.jpg'] }
  ],
  '213_pavona_cactus_mint': [
    { name: 'Coral Pavona Cactus Verde (Pavona decussata)', common: 'Coral Pavona Cactus Verde', sci: 'Pavona decussata', isPrimary: true }
  ],
  '214_stylophora_pink_rainbow': [
    { name: 'Coral Stylophora Pistillata Pink (Stylophora pistillata)', common: 'Coral Stylophora Pistillata Pink', sci: 'Stylophora pistillata', isPrimary: true },
    { name: 'Coral Stylophora Rainbow (Stylophora sp.)', common: 'Coral Stylophora Rainbow', sci: 'Stylophora sp.', candidates: ['stylophora-rainbow.jpg'] }
  ],
  '216_pocillopora_rainbow_tricolor': [
    { name: 'Coral Pocillopora Damicornis Pink (Pocillopora damicornis)', common: 'Coral Pocillopora Damicornis Pink', sci: 'Pocillopora damicornis', isPrimary: true },
    { name: 'Coral Pocillopora Damicornis Verde (Pocillopora damicornis)', common: 'Coral Pocillopora Damicornis Verde', sci: 'Pocillopora damicornis', candidates: ['pocillopora-damicornis-verde.jpg'] }
  ],
  '217_acropora_walt_disney_tenuis': [
    { name: 'Coral Acropora Walt Disney (Acropora tenuis)', common: 'Coral Acropora Walt Disney', sci: 'Acropora tenuis', isPrimary: true },
    { name: 'Coral Acropora Homewrecker (Acropora tenuis)', common: 'Coral Acropora Homewrecker', sci: 'Acropora tenuis', candidates: ['acropora-homewrecker.jpg'] }
  ],
  '219_acropora_red_planet_millepora': [
    { name: 'Coral Acropora Red Planet (Acropora anthocercis)', common: 'Coral Acropora Red Planet', sci: 'Acropora anthocercis', isPrimary: true },
    { name: 'Coral Acropora Pink Millepora (Acropora millepora)', common: 'Coral Acropora Pink Millepora', sci: 'Acropora millepora', candidates: ['acropora-millepora-rosa.jpg'] }
  ],
  '220_acropora_oregon_tort_miyagi': [
    { name: 'Coral Acropora Oregon Tort (Acropora tortuosa)', common: 'Coral Acropora Oregon Tort', sci: 'Acropora tortuosa', isPrimary: true },
    { name: 'Coral Acropora Cali Tort (Acropora tortuosa)', common: 'Coral Acropora Cali Tort', sci: 'Acropora tortuosa', candidates: ['acropora-tortuosa.jpg'] }
  ],
  '222_palhaco_tomato_frenatus': [
    { name: 'Peixe-palhaço Tomato (Amphiprion frenatus)', common: 'Peixe-palhaço Tomato', sci: 'Amphiprion frenatus', isPrimary: true },
    { name: 'Peixe-palhaço Fire Cinela (Amphiprion melanopus)', common: 'Peixe-palhaço Fire Cinela', sci: 'Amphiprion melanopus', candidates: ['palhaco-fire-cinela.jpg'] }
  ],
  '223_palhaco_skunk_pink_orange': [
    { name: 'Peixe-palhaço Pink Skunk (Amphiprion perideraion)', common: 'Peixe-palhaço Pink Skunk', sci: 'Amphiprion perideraion', isPrimary: true },
    { name: 'Peixe-palhaço Orange Skunk (Amphiprion sandaracinos)', common: 'Peixe-palhaço Orange Skunk', sci: 'Amphiprion sandaracinos', candidates: ['palhaco-orange-skunk.jpg'] }
  ],
  '224_palhaco_maroon_lightning_gold': [
    { name: 'Peixe-palhaço Maroon (Premnas biaculeatus)', common: 'Peixe-palhaço Maroon', sci: 'Premnas biaculeatus', isPrimary: true },
    { name: 'Peixe-palhaço Lightning Maroon (Premnas biaculeatus var. Lightning)', common: 'Peixe-palhaço Lightning Maroon', sci: 'Premnas biaculeatus var. Lightning', candidates: ['palhaco-lightning-maroon.jpg'] },
    { name: 'Peixe-palhaço Gold Nugget Maroon (Premnas biaculeatus var. Gold)', common: 'Peixe-palhaço Gold Nugget Maroon', sci: 'Premnas biaculeatus var. Gold', candidates: ['palhaco-gold-nugget.jpg'] }
  ],
  '225_palhaco_sebae_polymnus_saddleback': [
    { name: 'Peixe-palhaço Sebae (Amphiprion sebae)', common: 'Peixe-palhaço Sebae', sci: 'Amphiprion sebae', isPrimary: true },
    { name: 'Peixe-palhaço Saddleback (Amphiprion polymnus)', common: 'Peixe-palhaço Saddleback', sci: 'Amphiprion polymnus', candidates: ['palhaco-saddleback.jpg'] }
  ],
  '227_achilles_sohal_clown_tang': [
    { name: 'Achilles Tang (Acanthurus achilles)', common: 'Achilles Tang', sci: 'Acanthurus achilles', isPrimary: true },
    { name: 'Sohal Tang (Acanthurus sohal)', common: 'Sohal Tang', sci: 'Acanthurus sohal', candidates: ['tang-sohal.jpg'] },
    { name: 'Clown Tang (Acanthurus lineatus)', common: 'Clown Tang', sci: 'Acanthurus lineatus', candidates: ['tang-lineatus-clown.jpg'] }
  ],
  '228_kole_tang_tomini_chevron': [
    { name: 'Kole Tang Olho Amarelo (Ctenochaetus strigosus)', common: 'Kole Tang Olho Amarelo', sci: 'Ctenochaetus strigosus', isPrimary: true },
    { name: 'Tomini Tang (Ctenochaetus tominiensis)', common: 'Tomini Tang', sci: 'Ctenochaetus tominiensis', candidates: ['tang-tomini.jpg'] }
  ],
  '230_foxface_magnificent_bicolor': [
    { name: 'Foxface Bicolor (Siganus uspi)', common: 'Foxface Bicolor', sci: 'Siganus uspi', isPrimary: true },
    { name: 'Foxface Magnificent (Siganus magnificus)', common: 'Foxface Magnificent', sci: 'Siganus magnificus', candidates: ['foxface-magnificent.jpg'] }
  ],
  '232_heniochus_bannerfish_moorish_idol': [
    { name: 'Borboleta Heniochus Acuminatus (Heniochus acuminatus)', common: 'Borboleta Heniochus Acuminatus', sci: 'Heniochus acuminatus', isPrimary: true },
    { name: 'Moorish Idol (Zanclus cornutus)', common: 'Moorish Idol', sci: 'Zanclus cornutus', candidates: ['moorish-idol.jpg'] }
  ],
  '233_anjo_imperador_pomacanthus': [
    { name: 'Anjo Imperador (Pomacanthus imperator)', common: 'Anjo Imperador', sci: 'Pomacanthus imperator', isPrimary: true },
    { name: 'Anjo Koran (Pomacanthus semicirculatus)', common: 'Anjo Koran', sci: 'Pomacanthus semicirculatus', candidates: ['anjo-koran.jpg'] },
    { name: 'Anjo French (Pomacanthus paru)', common: 'Anjo French', sci: 'Pomacanthus paru', candidates: ['anjo-french.jpg'] }
  ],
  '234_anjo_anao_bicolor_cherub': [
    { name: 'Anjo Anão Bicolor (Centropyge bicolor)', common: 'Anjo Anão Bicolor', sci: 'Centropyge bicolor', isPrimary: true },
    { name: 'Anjo Anão Cherub Pigmeu (Centropyge argi)', common: 'Anjo Anão Cherub Pigmeu', sci: 'Centropyge argi', candidates: ['anjo-cherub-argi.jpg'] }
  ],
  '236_anthias_squamipinnis_dispar': [
    { name: 'Anthias Lyretail (Pseudanthias squamipinnis)', common: 'Anthias Lyretail', sci: 'Pseudanthias squamipinnis', isPrimary: true },
    { name: 'Anthias Dispar (Pseudanthias dispar)', common: 'Anthias Dispar', sci: 'Pseudanthias dispar', candidates: ['anthias-dispar.jpg'] }
  ],
  '237_cleaner_wrasse_labroides': [
    { name: 'Cleaner Wrasse Limpador (Labroides dimidiatus)', common: 'Cleaner Wrasse Limpador', sci: 'Labroides dimidiatus', isPrimary: true }
  ],
  '238_melanurus_leopard_wrasse': [
    { name: 'Melanurus Wrasse (Halichoeres melanurus)', common: 'Melanurus Wrasse', sci: 'Halichoeres melanurus', isPrimary: true },
    { name: 'Leopard Wrasse (Macropharyngodon meleagris)', common: 'Leopard Wrasse', sci: 'Macropharyngodon meleagris', candidates: ['wrasse-leopard.jpg'] }
  ],
  '239_fairy_flasher_wrasse_cirrhilabrus': [
    { name: 'Fairy Wrasse Yellow Flanked (Cirrhilabrus lyukyuensis)', common: 'Fairy Wrasse Yellow Flanked', sci: 'Cirrhilabrus lyukyuensis', isPrimary: true },
    { name: 'Flasher Wrasse McCosker (Paracheilinus mccoskeri)', common: 'Flasher Wrasse McCosker', sci: 'Paracheilinus mccoskeri', candidates: ['wrasse-flasher-mccosker.jpg'] }
  ],
  '240_diamond_goby_valenciennea': [
    { name: 'Diamond Watchman Goby (Valenciennea puellaris)', common: 'Diamond Watchman Goby', sci: 'Valenciennea puellaris', isPrimary: true },
    { name: 'Golden Head Sleeper Goby (Valenciennea strigata)', common: 'Golden Head Sleeper Goby', sci: 'Valenciennea strigata', candidates: ['goby-golden-head.jpg'] }
  ],
  '241_clown_goby_yellow_citrinus': [
    { name: 'Yellow Clown Goby (Gobiodon okinawae)', common: 'Yellow Clown Goby', sci: 'Gobiodon okinawae', isPrimary: true },
    { name: 'Clown Goby Citrinus (Gobiodon citrinus)', common: 'Clown Goby Citrinus', sci: 'Gobiodon citrinus', candidates: ['goby-citrinus.jpg'] }
  ],
  '242_lawnmower_algae_blenny_salarias': [
    { name: 'Lawnmower Algae Blenny (Salarias fasciatus)', common: 'Lawnmower Algae Blenny', sci: 'Salarias fasciatus', isPrimary: true },
    { name: 'Tailspot Blenny (Ecsenius stigmatura)', common: 'Tailspot Blenny', sci: 'Ecsenius stigmatura', candidates: ['blenio-tailspot.jpg'] }
  ],
  '243_flame_longnose_hawkfish': [
    { name: 'Flame Hawkfish (Neocirrhites armatus)', common: 'Flame Hawkfish', sci: 'Neocirrhites armatus', isPrimary: true },
    { name: 'Longnose Hawkfish (Oxycirrhites typus)', common: 'Longnose Hawkfish', sci: 'Oxycirrhites typus', candidates: ['hawkfish-longnose.jpg'] }
  ],
  '244_moreia_snowflake_lionfish_trigger': [
    { name: 'Moreia Snowflake (Echidna nebulosa)', common: 'Moreia Snowflake', sci: 'Echidna nebulosa', isPrimary: true },
    { name: 'Lionfish Volitans (Pterois volitans)', common: 'Lionfish Volitans', sci: 'Pterois volitans', candidates: ['lionfish-volitans.jpg'] },
    { name: 'Niger Trigger (Odonus niger)', common: 'Niger Trigger', sci: 'Odonus niger', candidates: ['trigger-niger.jpg'] }
  ],
  '245_exquisite_helfrichi_firefish': [
    { name: 'Firefish Exquisite (Nemateleotris decora var. Exquisite)', common: 'Firefish Exquisite', sci: 'Nemateleotris decora var. Exquisite', isPrimary: true },
    { name: 'Firefish Helfrichi (Nemateleotris helfrichi)', common: 'Firefish Helfrichi', sci: 'Nemateleotris helfrichi', candidates: ['firefish-helfrichi.jpg'] }
  ],
  '246_camarao_arlequim_sexy_shrimp': [
    { name: 'Camarão Arlequim (Hymenocera picta)', common: 'Camarão Arlequim', sci: 'Hymenocera picta', isPrimary: true, subCategory: 'MARINE_INVERTEBRATE' },
    { name: 'Camarão Sexy Shrimp (Thor amboinensis)', common: 'Camarão Sexy Shrimp', sci: 'Thor amboinensis', candidates: ['camarao-sexy-shrimp.jpg'], subCategory: 'MARINE_INVERTEBRATE' }
  ],
  '247_camarao_peppermint_coral_banded': [
    { name: 'Camarão Peppermint (Lysmata wurdemanni)', common: 'Camarão Peppermint', sci: 'Lysmata wurdemanni', isPrimary: true, subCategory: 'MARINE_INVERTEBRATE' },
    { name: 'Camarão Stenopus Coral Banded (Stenopus hispidus)', common: 'Camarão Stenopus Coral Banded', sci: 'Stenopus hispidus', candidates: ['camarao-stenopus.jpg'], subCategory: 'MARINE_INVERTEBRATE' }
  ],
  '248_caranguejo_esmeralda_mithrax': [
    { name: 'Caranguejo Esmeralda Mithrax (Mithraculus sculptus)', common: 'Caranguejo Esmeralda Mithrax', sci: 'Mithraculus sculptus', isPrimary: true, subCategory: 'MARINE_INVERTEBRATE' }
  ],
  '249_caranguejo_pom_pom_porcelana': [
    { name: 'Caranguejo Pom Pom Boxer (Lybia edmondsoni)', common: 'Caranguejo Pom Pom Boxer', sci: 'Lybia edmondsoni', isPrimary: true, subCategory: 'MARINE_INVERTEBRATE' },
    { name: 'Caranguejo Anêmona Porcelana (Neopetrolisthes maculatus)', common: 'Caranguejo Anêmona Porcelana', sci: 'Neopetrolisthes maculatus', candidates: ['caranguejo-porcelana.jpg'], subCategory: 'MARINE_INVERTEBRATE' }
  ],
  '250_tridacna_maxima_crocea_ouriço': [
    { name: 'Ostra Tridacna Maxima Azul (Tridacna maxima)', common: 'Ostra Tridacna Maxima Azul', sci: 'Tridacna maxima', isPrimary: true, subCategory: 'MARINE_INVERTEBRATE' },
    { name: 'Ostra Tridacna Crocea (Tridacna crocea)', common: 'Ostra Tridacna Crocea', sci: 'Tridacna crocea', candidates: ['tridacna-crocea.jpg'], subCategory: 'MARINE_INVERTEBRATE' },
    { name: 'Estrela Vermelha Fromia (Fromia milleporella)', common: 'Estrela Vermelha Fromia', sci: 'Fromia milleporella', candidates: ['estrela-fromia.jpg'], subCategory: 'MARINE_INVERTEBRATE' },
    { name: 'Ouriço Pincushion Tuxedo (Mespilia globulus)', common: 'Ouriço Pincushion Tuxedo', sci: 'Mespilia globulus', candidates: ['ourico-tuxedo.jpg'], subCategory: 'MARINE_INVERTEBRATE' }
  ],

  // === TIER 2 ÁGUA DOCE ===
  '251_guppy_blue_grass_red_grass': [
    { name: 'Guppy Blue Grass (Poecilia reticulata)', common: 'Guppy Blue Grass', sci: 'Poecilia reticulata', isPrimary: true },
    { name: 'Guppy Red Grass (Poecilia reticulata)', common: 'Guppy Red Grass', sci: 'Poecilia reticulata', candidates: ['guppy-red-grass.jpg'] }
  ],
  '252_guppy_sky_blue_lazuli': [
    { name: 'Guppy Albino Sky Blue (Poecilia reticulata)', common: 'Guppy Albino Sky Blue', sci: 'Poecilia reticulata', isPrimary: true },
    { name: 'Guppy Albino Topaz (Poecilia reticulata)', common: 'Guppy Albino Topaz', sci: 'Poecilia reticulata', candidates: ['guppy-albino-topaz.jpg'] },
    { name: 'Guppy Lazuli (Poecilia reticulata)', common: 'Guppy Lazuli', sci: 'Poecilia reticulata', candidates: ['guppy-lazuli.jpg'] }
  ],
  '253_guppy_japan_blue_dragon_koi': [
    { name: 'Guppy Albino Japan Blue (Poecilia reticulata)', common: 'Guppy Albino Japan Blue', sci: 'Poecilia reticulata', isPrimary: true },
    { name: 'Guppy Red Dragon (Poecilia reticulata)', common: 'Guppy Red Dragon', sci: 'Poecilia reticulata', candidates: ['guppy-red-dragon.jpg'] },
    { name: 'Guppy Koi Tuxedo (Poecilia reticulata)', common: 'Guppy Koi Tuxedo', sci: 'Poecilia reticulata', candidates: ['guppy-koi-tuxedo.jpg'] }
  ],
  '254_betta_mustard_gas': [
    { name: 'Betta Mustard Gas (Betta splendens)', common: 'Betta Mustard Gas', sci: 'Betta splendens', isPrimary: true }
  ],
  '255_betta_black_orchid_samurai': [
    { name: 'Betta Black Orchid (Betta splendens)', common: 'Betta Black Orchid', sci: 'Betta splendens', isPrimary: true },
    { name: 'Betta Black Samurai (Betta splendens)', common: 'Betta Black Samurai', sci: 'Betta splendens', candidates: ['betta-black-samurai.jpg'] }
  ],
  '256_betta_dragon_scale_super_red': [
    { name: 'Betta Dragon Scale Red (Betta splendens)', common: 'Betta Dragon Scale Red', sci: 'Betta splendens', isPrimary: true },
    { name: 'Betta Dragon Scale Black (Betta splendens)', common: 'Betta Dragon Scale Black', sci: 'Betta splendens', candidates: ['betta-dragon-scale-black.jpg'] },
    { name: 'Betta Super Red Halfmoon (Betta splendens)', common: 'Betta Super Red Halfmoon', sci: 'Betta splendens', candidates: ['betta-super-red.jpg'] }
  ],
  '257_betta_double_tail_rosetail': [
    { name: 'Betta Double Tail Dupla Cauda (Betta splendens)', common: 'Betta Double Tail Dupla Cauda', sci: 'Betta splendens', isPrimary: true },
    { name: 'Betta Rosetail Halfmoon (Betta splendens)', common: 'Betta Rosetail Halfmoon', sci: 'Betta splendens', candidates: ['betta-rosetail.jpg'] }
  ],
  '258_betta_giant_alien_wild': [
    { name: 'Betta Giant King (Betta splendens var. Giant)', common: 'Betta Giant King', sci: 'Betta splendens var. Giant', isPrimary: true },
    { name: 'Betta Alien Híbrido (Betta imbellis x splendens)', common: 'Betta Alien Híbrido', sci: 'Betta imbellis x splendens', candidates: ['betta-alien.jpg'] }
  ],
  '259_plati_panda_bumblebee_tuxedo': [
    { name: 'Plati Tiger Bumblebee (Xiphophorus maculatus)', common: 'Plati Tiger Bumblebee', sci: 'Xiphophorus maculatus', isPrimary: true },
    { name: 'Plati Panda (Xiphophorus maculatus)', common: 'Plati Panda', sci: 'Xiphophorus maculatus', candidates: ['plati-panda.jpg'] },
    { name: 'Molinésia Velífera Verde (Poecilia velifera)', common: 'Molinésia Velífera Verde', sci: 'Poecilia velifera', candidates: ['molinesia-velifera.jpg'] }
  ],
  '260_killifish_gardneri_australe': [
    { name: 'Killifish Fundulopanchax Gardneri (Fundulopanchax gardneri)', common: 'Killifish Fundulopanchax Gardneri', sci: 'Fundulopanchax gardneri', isPrimary: true },
    { name: 'Killifish Aphyosemion Australe Orange (Aphyosemion australe)', common: 'Killifish Aphyosemion Australe Orange', sci: 'Aphyosemion australe', candidates: ['killifish-australe.jpg'] }
  ],
  '262_tetra_imperador_black_inpaichthys': [
    { name: 'Tetra Imperador Black (Nematobrycon palmeri var. Black)', common: 'Tetra Imperador Black', sci: 'Nematobrycon palmeri var. Black', isPrimary: true },
    { name: 'Tetra Kerri Super Blue (Inpaichthys kerri)', common: 'Tetra Kerri Super Blue', sci: 'Inpaichthys kerri', candidates: ['tetra-kerri.jpg'] }
  ],
  '263_tetra_limao_pristella': [
    { name: 'Tetra Limão (Hyphessobrycon pulchripinnis)', common: 'Tetra Limão', sci: 'Hyphessobrycon pulchripinnis', isPrimary: true },
    { name: 'Tetra Pristella Raio-X (Pristella maxillaris)', common: 'Tetra Pristella Raio-X', sci: 'Pristella maxillaris', candidates: ['tetra-pristella.jpg'] }
  ],
  '264_tetra_fantasma_negro_vermelho': [
    { name: 'Tetra Fantasma Negro (Hyphessobrycon megalopterus)', common: 'Tetra Fantasma Negro', sci: 'Hyphessobrycon megalopterus', isPrimary: true },
    { name: 'Tetra Fantasma Vermelho (Hyphessobrycon sweglesi)', common: 'Tetra Fantasma Vermelho', sci: 'Hyphessobrycon sweglesi', candidates: ['tetra-fantasma-vermelho.jpg'] }
  ],
  '266_tetra_diamante_olho_de_fogo': [
    { name: 'Tetra Diamante (Moenkhausia pittieri)', common: 'Tetra Diamante', sci: 'Moenkhausia pittieri', isPrimary: true },
    { name: 'Tetra Olho-de-Fogo (Hemigrammus ocellifer)', common: 'Tetra Olho-de-Fogo', sci: 'Hemigrammus ocellifer', candidates: ['tetra-olho-de-fogo.jpg'] }
  ],
  '267_tetra_rosaceo_ornatus_bleeding_heart': [
    { name: 'Tetra Bleeding Heart Coração Sangrento (Hyphessobrycon erythrostigma)', common: 'Tetra Bleeding Heart Coração Sangrento', sci: 'Hyphessobrycon erythrostigma', isPrimary: true },
    { name: 'Tetra Rosáceo (Hyphessobrycon rosaceus)', common: 'Tetra Rosáceo', sci: 'Hyphessobrycon rosaceus', candidates: ['tetra-rosaceo.jpg'] },
    { name: 'Tetra Ornatus Branco (Hyphessobrycon bentosi)', common: 'Tetra Ornatus Branco', sci: 'Hyphessobrycon bentosi', candidates: ['tetra-ornatus.jpg'] }
  ],
  '268_tetra_pinguim_glowlight_buenos_aires': [
    { name: 'Tetra Pinguim (Thayeria boehlkei)', common: 'Tetra Pinguim', sci: 'Thayeria boehlkei', isPrimary: true },
    { name: 'Tetra Glowlight (Hemigrammus erythrozonus)', common: 'Tetra Glowlight', sci: 'Hemigrammus erythrozonus', candidates: ['tetra-glowlight.jpg'] },
    { name: 'Tetra Buenos Aires (Hyphessobrycon anisitsi)', common: 'Tetra Buenos Aires', sci: 'Hyphessobrycon anisitsi', candidates: ['tetra-buenos-aires.jpg'] }
  ],
  '269_peixe_lapis_borboleta_carnegiella': [
    { name: 'Peixe-Lápis Vermelho (Nannostomus beckfordi)', common: 'Peixe-Lápis Vermelho', sci: 'Nannostomus beckfordi', isPrimary: true },
    { name: 'Peixe-Borboleta de Água Doce (Carnegiella strigata)', common: 'Peixe-Borboleta de Água Doce', sci: 'Carnegiella strigata', candidates: ['peixe-borboleta-carnegiella.jpg'] }
  ],
  '270_rasbora_chili_brigittae_espei': [
    { name: 'Rásbora Mosquito Chili (Boraras brigittae)', common: 'Rásbora Mosquito Chili', sci: 'Boraras brigittae', isPrimary: true },
    { name: 'Rásbora Espei Lambchop (Trigonostigma espei)', common: 'Rásbora Espei Lambchop', sci: 'Trigonostigma espei', candidates: ['rasbora-espei.jpg'] }
  ],
  '271_barbo_denisoni_torpedo': [
    { name: 'Barbo Denisoni Torpedo (Sahyadria denisonii)', common: 'Barbo Denisoni Torpedo', sci: 'Sahyadria denisonii', isPrimary: true }
  ],
  '272_barbo_odessa_tinfoil_conchonius': [
    { name: 'Barbo Odessa (Pethia padamya)', common: 'Barbo Odessa', sci: 'Pethia padamya', isPrimary: true },
    { name: 'Barbo Rosy Conchonius (Pethia conchonius)', common: 'Barbo Rosy Conchonius', sci: 'Pethia conchonius', candidates: ['barbo-conchonius.jpg'] },
    { name: 'Barbo Tinfoil Barbo Prata (Barbonymus schwanenfeldii)', common: 'Barbo Tinfoil Barbo Prata', sci: 'Barbonymus schwanenfeldii', candidates: ['barbo-tinfoil.jpg'] }
  ],
  '273_tanichthys_white_cloud_gold': [
    { name: 'Tanichthys Neon Chinês Dourado (Tanichthys albonubes var. Gold)', common: 'Tanichthys Neon Chinês Dourado', sci: 'Tanichthys albonubes var. Gold', isPrimary: true },
    { name: 'Tanichthys Neon Chinês Clássico (Tanichthys albonubes)', common: 'Tanichthys Neon Chinês Clássico', sci: 'Tanichthys albonubes', candidates: ['tanichthys-albonubes.jpg'] }
  ],
  '274_arco_iris_boesemani_praecox': [
    { name: 'Peixe Arco-Íris Boesemani (Melanotaenia boesemani)', common: 'Peixe Arco-Íris Boesemani', sci: 'Melanotaenia boesemani', isPrimary: true },
    { name: 'Peixe Arco-Íris Neon Praecox (Melanotaenia praecox)', common: 'Peixe Arco-Íris Neon Praecox', sci: 'Melanotaenia praecox', candidates: ['arco-iris-praecox.jpg'] },
    { name: 'Peixe Arco-Íris Furcatus (Pseudomugil furcatus)', common: 'Peixe Arco-Íris Furcatus', sci: 'Pseudomugil furcatus', candidates: ['pseudomugil-furcatus.jpg'] }
  ],
  '275_acara_bandeira_blue_paraiba_altum': [
    { name: 'Acará Bandeira Blue Paraíba (Pterophyllum scalare var. Blue Paraíba)', common: 'Acará Bandeira Blue Paraíba', sci: 'Pterophyllum scalare var. Blue Paraíba', isPrimary: true },
    { name: 'Acará Bandeira Avatar (Pterophyllum scalare var. Avatar)', common: 'Acará Bandeira Avatar', sci: 'Pterophyllum scalare var. Avatar', candidates: ['acara-bandeira-avatar.jpg'] },
    { name: 'Acará Altum Peruano (Pterophyllum scalare var. Peru Altum)', common: 'Acará Altum Peruano', sci: 'Pterophyllum scalare var. Peru Altum', candidates: ['acara-altum-verdadeiro.jpg'] }
  ],
  '276_acara_bandeira_red_devil_dumerilii': [
    { name: 'Acará Bandeira Gold Marble (Pterophyllum scalare var. Gold Marble)', common: 'Acará Bandeira Gold Marble', sci: 'Pterophyllum scalare var. Gold Marble', isPrimary: true },
    { name: 'Acará Bandeira Red Devil (Pterophyllum scalare var. Red Devil)', common: 'Acará Bandeira Red Devil', sci: 'Pterophyllum scalare var. Red Devil', candidates: ['acara-bandeira-red-devil.jpg'] },
    { name: 'Acará Bandeira Leopoldi (Pterophyllum leopoldi)', common: 'Acará Bandeira Leopoldi', sci: 'Pterophyllum leopoldi', candidates: ['acara-bandeira-leopoldi.jpg'] }
  ],
  '277_acara_disco_red_melon_marlboro': [
    { name: 'Acará Disco Red Melon (Symphysodon aequifasciatus var. Red Melon)', common: 'Acará Disco Red Melon', sci: 'Symphysodon aequifasciatus var. Red Melon', isPrimary: true },
    { name: 'Acará Disco Red Cover (Symphysodon aequifasciatus var. Red Cover)', common: 'Acará Disco Red Cover', sci: 'Symphysodon aequifasciatus var. Red Cover', candidates: ['acara-disco-red-cover.jpg'] }
  ],
  '278_acara_disco_snake_skin_checkerboard': [
    { name: 'Acará Disco Snakeskin (Symphysodon aequifasciatus var. Snakeskin)', common: 'Acará Disco Snakeskin', sci: 'Symphysodon aequifasciatus var. Snakeskin', isPrimary: true },
    { name: 'Acará Disco Checkerboard (Symphysodon aequifasciatus var. Checkerboard)', common: 'Acará Disco Checkerboard', sci: 'Symphysodon aequifasciatus var. Checkerboard', candidates: ['acara-disco-checkerboard.jpg'] },
    { name: 'Acará Disco Yellow Crystal (Symphysodon aequifasciatus var. Yellow)', common: 'Acará Disco Yellow Crystal', sci: 'Symphysodon aequifasciatus var. Yellow', candidates: ['acara-disco-yellow.jpg'] }
  ],
  '279_ramirezi_balao_veu': [
    { name: 'Ramirezi Balão Electric Blue (Mikrogeophagus ramirezi var. Balloon Blue)', common: 'Ramirezi Balão Electric Blue', sci: 'Mikrogeophagus ramirezi var. Balloon Blue', isPrimary: true },
    { name: 'Ramirezi Balão Gold (Mikrogeophagus ramirezi var. Balloon Gold)', common: 'Ramirezi Balão Gold', sci: 'Mikrogeophagus ramirezi var. Balloon Gold', candidates: ['ramirezi-balao-gold.jpg'] },
    { name: 'Ramirezi Véu Longfin (Mikrogeophagus ramirezi var. Longfin)', common: 'Ramirezi Véu Longfin', sci: 'Mikrogeophagus ramirezi var. Longfin', candidates: ['ramirezi-veu.jpg'] }
  ],
  '280_ramirezi_boliviano_altispinosus': [
    { name: 'Ramirezi Boliviano Papilocromis (Mikrogeophagus altispinosus)', common: 'Ramirezi Boliviano Papilocromis', sci: 'Mikrogeophagus altispinosus', isPrimary: true }
  ],
  '281_kribensis_laetacara_borellii': [
    { name: 'Kribensis Comum (Pelvicachromis pulcher)', common: 'Kribensis Comum', sci: 'Pelvicachromis pulcher', isPrimary: true },
    { name: 'Apistogramma Borellii Opal (Apistogramma borellii)', common: 'Apistogramma Borellii Opal', sci: 'Apistogramma borellii', candidates: ['apistogramma-borellii.jpg'] },
    { name: 'Laetacara Curviceps Peixe-Bandeira Anão (Laetacara curviceps)', common: 'Laetacara Curviceps Peixe-Bandeira Anão', sci: 'Laetacara curviceps', candidates: ['laetacara-curviceps.jpg'] }
  ],
  '282_acara_severo_gold_red_spotted': [
    { name: 'Acará Severo Gold (Heros efasciatus var. Gold)', common: 'Acará Severo Gold', sci: 'Heros efasciatus var. Gold', isPrimary: true },
    { name: 'Acará Severo Red Spotted (Heros efasciatus var. Red Spotted)', common: 'Acará Severo Red Spotted', sci: 'Heros efasciatus var. Red Spotted', candidates: ['acara-severo-green.jpg'] }
  ],
  '283_acara_festivum_geophagus_joia': [
    { name: 'Acará Festivum Mesonauta (Mesonauta festivus)', common: 'Acará Festivum Mesonauta', sci: 'Mesonauta festivus', isPrimary: true },
    { name: 'Geophagus Sveni Tronco (Geophagus sveni)', common: 'Geophagus Sveni Tronco', sci: 'Geophagus sveni', candidates: ['acara-geophagus-sveni.jpg'] },
    { name: 'Ciclídeo Joia Vermelho (Hemichromis bimaculatus)', common: 'Ciclídeo Joia Vermelho', sci: 'Hemichromis bimaculatus', candidates: ['ciclideo-joia.jpg'] }
  ],
  '284_jack_dempsey_electric_blue_acara': [
    { name: 'Jack Dempsey Electric Blue (Rocio octofasciata var. Blue)', common: 'Jack Dempsey Electric Blue', sci: 'Rocio octofasciata var. Blue', isPrimary: true },
    { name: 'Acará Azul Electric Blue (Andinoacara pulcher var. Blue)', common: 'Acará Azul Electric Blue', sci: 'Andinoacara pulcher var. Blue', candidates: ['acara-azul-eletrico.jpg'] }
  ],
  '285_flowerhorn_papagaio_frontosa': [
    { name: 'Ciclídeo Flowerhorn Red Dragon (Amphilophus hybrid)', common: 'Ciclídeo Flowerhorn Red Dragon', sci: 'Amphilophus hybrid', isPrimary: true },
    { name: 'Acará Papagaio Blood Parrot (Amphilophus citrinellus x Vieja)', common: 'Acará Papagaio Blood Parrot', sci: 'Amphilophus citrinellus x Vieja', candidates: ['acara-papagaio.jpg'] },
    { name: 'Ciclídeo Frontosa Moba Zaire (Cyphotilapia frontosa)', common: 'Ciclídeo Frontosa Moba Zaire', sci: 'Cyphotilapia frontosa', candidates: ['ciclideo-frontosa.jpg'] }
  ],
  '286_coridora_julii_trilineatus_adolfoi': [
    { name: 'Coridora Julii Leopardo (Corydoras julii)', common: 'Coridora Julii Leopardo', sci: 'Corydoras julii', isPrimary: true },
    { name: 'Coridora Trilineatus (Corydoras trilineatus)', common: 'Coridora Trilineatus', sci: 'Corydoras trilineatus', candidates: ['coridora-trilineatus.jpg'] },
    { name: 'Coridora Adolfoi (Corydoras adolfoi)', common: 'Coridora Adolfoi', sci: 'Corydoras adolfoi', candidates: ['coridora-adolfoi.jpg'] }
  ],
  '287_coridora_pigmeu_hastatus_habrosus': [
    { name: 'Coridora Pigmeu Anã (Corydoras pygmaeus)', common: 'Coridora Pigmeu Anã', sci: 'Corydoras pygmaeus', isPrimary: true },
    { name: 'Coridora Hastatus (Corydoras hastatus)', common: 'Coridora Hastatus', sci: 'Corydoras hastatus', candidates: ['coridora-ana-hastatus.jpg'] },
    { name: 'Coridora Habrosus (Corydoras habrosus)', common: 'Coridora Habrosus', sci: 'Corydoras habrosus', candidates: ['coridora-ana-habrosus.jpg'] }
  ],
  '288_cascudo_zebra_imperial_queen_arabesque': [
    { name: 'Cascudo Zebra Imperial L046 (Hypancistrus zebra)', common: 'Cascudo Zebra Imperial L046', sci: 'Hypancistrus zebra', isPrimary: true },
    { name: 'Cascudo Queen Arabesque L260 (Hypancistrus sp. L260)', common: 'Cascudo Queen Arabesque L260', sci: 'Hypancistrus sp. L260', candidates: ['cascudo-queen-arabesque.jpg'] }
  ],
  '289_cascudo_panaque_real_l190': [
    { name: 'Cascudo Panaque Real L190 (Panaque nigrolineatus)', common: 'Cascudo Panaque Real L190', sci: 'Panaque nigrolineatus', isPrimary: true },
    { name: 'Cascudo Bola de Neve L102 (Hypancistrus inspector)', common: 'Cascudo Bola de Neve L102', sci: 'Hypancistrus inspector', candidates: ['cascudo-bola-de-neve.jpg'] }
  ],
  '290_cascudo_melancia_l330_vampiro': [
    { name: 'Cascudo Melancia L330 (Panaque bathyphilus)', common: 'Cascudo Melancia L330', sci: 'Panaque bathyphilus', isPrimary: true },
    { name: 'Cascudo Vampiro L240 (Leporacanthicus galaxias)', common: 'Cascudo Vampiro L240', sci: 'Leporacanthicus galaxias', candidates: ['cascudo-vampiro.jpg'] },
    { name: 'Cascudo Leopardo L114 (Pseudacanthicus leopardus)', common: 'Cascudo Leopardo L114', sci: 'Pseudacanthicus leopardus', candidates: ['cascudo-leopardo.jpg'] }
  ],
  '291_farlowella_rineloricaria_whiptail': [
    { name: 'Peixe-Galho Farlowella (Farlowella acus)', common: 'Peixe-Galho Farlowella', sci: 'Farlowella acus', isPrimary: true },
    { name: 'Rineloricaria Red Leliella (Leliella heteroptera)', common: 'Rineloricaria Red Leliella', sci: 'Leliella heteroptera', candidates: ['rineloricaria-red.jpg'] }
  ],
  '292_itui_cavalo_kuhli_hillstream': [
    { name: 'Ituí Cavalo Black Ghost (Apteronotus albifrons)', common: 'Ituí Cavalo Black Ghost', sci: 'Apteronotus albifrons', isPrimary: true },
    { name: 'Cobrinha Kuhli (Pangio kuhlii)', common: 'Cobrinha Kuhli', sci: 'Pangio kuhlii', candidates: ['cobrinha-kuhli.jpg'] },
    { name: 'Sewellia Hillstream Butterfly (Sewellia lineolata)', common: 'Sewellia Hillstream Butterfly', sci: 'Sewellia lineolata', candidates: ['sewellia-hillstream.jpg'] }
  ],
  '293_baiacu_anao_pea_puffer__Colomesus': [
    { name: 'Baiacu Anão Pea Puffer (Carinotetraodon travancoricus)', common: 'Baiacu Anão Pea Puffer', sci: 'Carinotetraodon travancoricus', isPrimary: true },
    { name: 'Baiacu Amazônico (Colomesus asellus)', common: 'Baiacu Amazônico', sci: 'Colomesus asellus', candidates: ['baiacu-amazonico.jpg'] }
  ],
  '294_goby_abelha_badis_peixe_vidro': [
    { name: 'Goby Abelha Bumblebee (Brachygobius doriae)', common: 'Goby Abelha Bumblebee', sci: 'Brachygobius doriae', isPrimary: true },
    { name: 'Dario Dario Scarlet Badis (Dario dario)', common: 'Dario Dario Scarlet Badis', sci: 'Dario dario', candidates: ['dario-dario.jpg'] },
    { name: 'Peixe-Vidro Indiano (Parambassis ranga)', common: 'Peixe-Vidro Indiano', sci: 'Parambassis ranga', candidates: ['peixe-vidro.jpg'] }
  ],
  '295_camarao_caridina_crystal_red_crs': [
    { name: 'Camarão Caridina Crystal Red (Caridina logemanni var. Crystal Red)', common: 'Camarão Caridina Crystal Red', sci: 'Caridina logemanni var. Crystal Red', isPrimary: true, subCategory: 'FRESHWATER_INVERTEBRATE' }
  ],
  '296_camarao_caridina_crystal_black_cbs': [
    { name: 'Camarão Caridina Crystal Black (Caridina logemanni var. Crystal Black)', common: 'Camarão Caridina Crystal Black', sci: 'Caridina logemanni var. Crystal Black', isPrimary: true, subCategory: 'FRESHWATER_INVERTEBRATE' }
  ],
  '297_camarao_caridina_blue_bolt_taiwan_bee': [
    { name: 'Camarão Caridina Blue Bolt (Caridina cantonensis var. Blue Bolt)', common: 'Camarão Caridina Blue Bolt', sci: 'Caridina cantonensis var. Blue Bolt', isPrimary: true, subCategory: 'FRESHWATER_INVERTEBRATE' },
    { name: 'Camarão Caridina King Kong (Caridina cantonensis var. King Kong)', common: 'Camarão Caridina King Kong', sci: 'Caridina cantonensis var. King Kong', candidates: ['camarao-king-kong.jpg'], subCategory: 'FRESHWATER_INVERTEBRATE' }
  ],
  '298_camarao_amano_fantasma': [
    { name: 'Camarão Amano Limpador (Caridina multidentata)', common: 'Camarão Amano Limpador', sci: 'Caridina multidentata', isPrimary: true, subCategory: 'FRESHWATER_INVERTEBRATE' },
    { name: 'Camarão Fantasma (Macrobrachium jelskii)', common: 'Camarão Fantasma', sci: 'Macrobrachium jelskii', candidates: ['camarao-fantasma.jpg'], subCategory: 'FRESHWATER_INVERTEBRATE' }
  ],
  '299_camarao_filtrador_bambu_gabonensis': [
    { name: 'Camarão Filtrador Bambu (Atyopsis moluccensis)', common: 'Camarão Filtrador Bambu', sci: 'Atyopsis moluccensis', isPrimary: true, subCategory: 'FRESHWATER_INVERTEBRATE' },
    { name: 'Camarão Filtrador Africano (Atya gabonensis)', common: 'Camarão Filtrador Africano', sci: 'Atya gabonensis', candidates: ['camarao-gabonensis.jpg'], subCategory: 'FRESHWATER_INVERTEBRATE' }
  ],
  '300_caramujo_assassino_helena_tylomelania': [
    { name: 'Caramujo Helena Assassino (Anentome helena)', common: 'Caramujo Helena Assassino', sci: 'Anentome helena', isPrimary: true, subCategory: 'FRESHWATER_INVERTEBRATE' },
    { name: 'Caramujo Coelho Rabbit Laranja (Tylomelania sp.)', common: 'Caramujo Coelho Rabbit Laranja', sci: 'Tylomelania sp.', candidates: ['caramujo-rabbit.jpg'], subCategory: 'FRESHWATER_INVERTEBRATE' }
  ],
  '050_torch_black': [
      {
          "name": "Coral Torch Black Ponta Verde (Euphyllia glabrescens)",
          "common": "Coral Torch Black Ponta Verde",
          "sci": "Euphyllia glabrescens",
          "isPrimary": true
      },
      {
          "name": "Coral Torch Black Ponta Branca (Euphyllia glabrescens)",
          "common": "Coral Torch Black Ponta Branca",
          "sci": "Euphyllia glabrescens",
          "candidates": [
              "torch-black-white-tip.jpg",
              "torch-black.jpg"
          ]
      }
  ],
  '154_zoanthus_aoi_blue': [
      {
          "name": "Zoanthus AOI Blue (Zoanthus sp.)",
          "common": "Zoanthus AOI Blue",
          "sci": "Zoanthus sp.",
          "isPrimary": true
      }
  ],
  '158_zoanthus_mohawk': [
      {
          "name": "Zoanthus Mohawk (Zoanthus sp.)",
          "common": "Zoanthus Mohawk",
          "sci": "Zoanthus sp.",
          "isPrimary": true
      },
      {
          "name": "Zoanthus Variable Star (Zoanthus sp.)",
          "common": "Zoanthus Variable Star",
          "sci": "Zoanthus sp.",
          "candidates": [
              "zoanthus-variable-star.jpg"
          ]
      }
  ],
  '160_zoanthus_rainbow_infusion': [
      {
          "name": "Zoanthus Rainbow Infusion (Zoanthus sp.)",
          "common": "Zoanthus Rainbow Infusion",
          "sci": "Zoanthus sp.",
          "isPrimary": true
      },
      {
          "name": "Zoanthus Kazoo (Zoanthus sp.)",
          "common": "Zoanthus Kazoo",
          "sci": "Zoanthus sp.",
          "candidates": [
              "zoanthus-kazoo.jpg"
          ]
      }
  ],
  '164_zoanthus_magicians': [
      {
          "name": "Zoanthus Magicians (Zoanthus sp.)",
          "common": "Zoanthus Magicians",
          "sci": "Zoanthus sp.",
          "isPrimary": true
      },
      {
          "name": "Palythoa Red People Eater (Palythoa sp.)",
          "common": "Palythoa Red People Eater",
          "sci": "Palythoa sp.",
          "candidates": [
              "zoanthus-red-people-eater.jpg",
              "palythoa-red-people-eater.jpg"
          ]
      }
  ],
  '166_zoanthus_white_zombie': [
      {
          "name": "Zoanthus White Zombie (Zoanthus sp.)",
          "common": "Zoanthus White Zombie",
          "sci": "Zoanthus sp.",
          "isPrimary": true
      },
      {
          "name": "Zoanthus Seduction (Zoanthus sp.)",
          "common": "Zoanthus Seduction",
          "sci": "Zoanthus sp.",
          "candidates": [
              "zoanthus-seduction.jpg"
          ]
      }
  ],
  '168_palythoa_lemon_twist': [
      {
          "name": "Palythoa Lemon Twist (Palythoa sp.)",
          "common": "Palythoa Lemon Twist",
          "sci": "Palythoa sp.",
          "isPrimary": true
      },
      {
          "name": "Palythoa Space Chaos (Palythoa sp.)",
          "common": "Palythoa Space Chaos",
          "sci": "Palythoa sp.",
          "candidates": [
              "palythoa-space-chaos.jpg"
          ]
      }
  ],
  '169_zoanthus_little_shop_of_horrors': [
      {
          "name": "Zoanthus Little Shop of Horrors (Zoanthus sp.)",
          "common": "Zoanthus Little Shop of Horrors",
          "sci": "Zoanthus sp.",
          "isPrimary": true
      },
      {
          "name": "Zoanthus Grand Master Glazz GMK (Zoanthus sp.)",
          "common": "Zoanthus Grand Master Glazz GMK",
          "sci": "Zoanthus sp.",
          "candidates": [
              "zoanthus-gmk.jpg"
          ]
      }
  ],
  '173_mushroom_red_velvet_magic_carpet': [
      {
          "name": "Mushroom Magic Carpet (Rhodactis sp.)",
          "common": "Mushroom Magic Carpet",
          "sci": "Rhodactis sp.",
          "isPrimary": true
      },
      {
          "name": "Mushroom Red Velvet (Rhodactis sp.)",
          "common": "Mushroom Red Velvet",
          "sci": "Rhodactis sp.",
          "candidates": [
              "mushroom-red-velvet.jpg"
          ]
      }
  ],
  '174_mushroom_interstellar_patchwork': [
      {
          "name": "Mushroom Discosoma Interstellar (Discosoma sp.)",
          "common": "Mushroom Discosoma Interstellar",
          "sci": "Discosoma sp.",
          "isPrimary": true
      },
      {
          "name": "Mushroom Discosoma Patchwork Rainbow (Discosoma sp.)",
          "common": "Mushroom Discosoma Patchwork Rainbow",
          "sci": "Discosoma sp.",
          "candidates": [
              "mushroom-patchwork.jpg"
          ]
      }
  ],
  '178_rhodactis_powerball_bounce': [
      {
          "name": "Mushroom Rhodactis Powerball Bounce (Rhodactis sp.)",
          "common": "Mushroom Rhodactis Powerball Bounce",
          "sci": "Rhodactis sp.",
          "isPrimary": true
      },
      {
          "name": "Mushroom Rhodactis Biohazard Bounce (Rhodactis sp.)",
          "common": "Mushroom Rhodactis Biohazard Bounce",
          "sci": "Rhodactis sp.",
          "candidates": [
              "rhodactis-biohazard.jpg"
          ]
      }
  ],
  '180_ricordea_florida_blue': [
      {
          "name": "Ricordea Florida Azul (Ricordea florida)",
          "common": "Ricordea Florida Azul",
          "sci": "Ricordea florida",
          "isPrimary": true
      },
      {
          "name": "Ricordea Florida Teal (Ricordea florida)",
          "common": "Ricordea Florida Teal",
          "sci": "Ricordea florida",
          "candidates": [
              "ricordea-florida-teal.jpg"
          ]
      }
  ],
  '181_ricordea_yuma_godzilla': [
      {
          "name": "Ricordea Yuma Godzilla (Ricordea yuma)",
          "common": "Ricordea Yuma Godzilla",
          "sci": "Ricordea yuma",
          "isPrimary": true
      },
      {
          "name": "Ricordea Yuma King Kong (Ricordea yuma)",
          "common": "Ricordea Yuma King Kong",
          "sci": "Ricordea yuma",
          "candidates": [
              "ricordea-yuma-king-kong.jpg"
          ]
      }
  ],
  '182_ricordea_yuma_orange_purple': [
      {
          "name": "Ricordea Yuma Laranja e Roxa (Ricordea yuma)",
          "common": "Ricordea Yuma Laranja e Roxa",
          "sci": "Ricordea yuma",
          "isPrimary": true
      }
  ],
  '184_leather_colt_cladiella': [
      {
          "name": "Leather Colt (Cladiella sp.)",
          "common": "Leather Colt",
          "sci": "Cladiella sp.",
          "isPrimary": true
      },
      {
          "name": "Leather Thick Finger (Alcyonium sp.)",
          "common": "Leather Thick Finger",
          "sci": "Alcyonium sp.",
          "candidates": [
              "leather-thick-finger.jpg"
          ]
      }
  ],
  '185_blue_sympodium': [
      {
          "name": "Coral Blue Sympodium (Sympodium sp.)",
          "common": "Coral Blue Sympodium",
          "sci": "Sympodium sp.",
          "isPrimary": true
      },
      {
          "name": "Coral Sansibia Azul (Sansibia sp.)",
          "common": "Coral Sansibia Azul",
          "sci": "Sansibia sp.",
          "candidates": [
              "coral-sansibia.jpg"
          ]
      }
  ],
  '188_anemona_bta_acid_wash_black_widow': [
      {
          "name": "Anêmona Bubble Tip Acid Wash (Entacmaea quadricolor var. Acid Wash)",
          "common": "Anêmona Bubble Tip Acid Wash",
          "sci": "Entacmaea quadricolor var. Acid Wash",
          "isPrimary": true
      },
      {
          "name": "Anêmona Bubble Tip Black Widow (Entacmaea quadricolor var. Black Widow)",
          "common": "Anêmona Bubble Tip Black Widow",
          "sci": "Entacmaea quadricolor var. Black Widow",
          "candidates": [
              "anemona-black-widow.jpg"
          ]
      }
  ],
  '189_anemona_carpet_haddoni': [
      {
          "name": "Anêmona Carpet Verde (Stichodactyla haddoni)",
          "common": "Anêmona Carpet Verde",
          "sci": "Stichodactyla haddoni",
          "isPrimary": true
      },
      {
          "name": "Anêmona Carpet Azul (Stichodactyla haddoni)",
          "common": "Anêmona Carpet Azul",
          "sci": "Stichodactyla haddoni",
          "candidates": [
              "anemona-carpet-azul.jpg"
          ]
      }
  ],
  '190_anemona_long_tentacle_doreensis': [
      {
          "name": "Anêmona Long Tentacle LTA (Macrodactyla doreensis)",
          "common": "Anêmona Long Tentacle LTA",
          "sci": "Macrodactyla doreensis",
          "isPrimary": true
      },
      {
          "name": "Anêmona Condylactis Gigantea (Condylactis gigantea)",
          "common": "Anêmona Condylactis Gigantea",
          "sci": "Condylactis gigantea",
          "candidates": [
              "anemona-condylactis.jpg"
          ]
      },
      {
          "name": "Anêmona Sebae (Heteractis crispa)",
          "common": "Anêmona Sebae",
          "sci": "Heteractis crispa",
          "candidates": [
              "anemona-sebae.jpg"
          ]
      }
  ],
  '191_torch_24k_aussie_gold': [
      {
          "name": "Coral Torch 24K Gold (Euphyllia glabrescens)",
          "common": "Coral Torch 24K Gold",
          "sci": "Euphyllia glabrescens",
          "isPrimary": true
      },
      {
          "name": "Coral Torch Aussie Gold (Euphyllia glabrescens)",
          "common": "Coral Torch Aussie Gold",
          "sci": "Euphyllia glabrescens",
          "candidates": [
              "torch-aussie-gold.jpg"
          ]
      }
  ],
  '192_torch_holy_grail_ny_knicks': [
      {
          "name": "Coral Torch Holy Grail (Euphyllia glabrescens)",
          "common": "Coral Torch Holy Grail",
          "sci": "Euphyllia glabrescens",
          "isPrimary": true
      },
      {
          "name": "Coral Torch NY Knicks (Euphyllia glabrescens)",
          "common": "Coral Torch NY Knicks",
          "sci": "Euphyllia glabrescens",
          "candidates": [
              "torch-ny-knicks.jpg"
          ]
      },
      {
          "name": "Coral Torch Hellfire (Euphyllia glabrescens)",
          "common": "Coral Torch Hellfire",
          "sci": "Euphyllia glabrescens",
          "candidates": [
              "torch-hellfire.jpg"
          ]
      }
  ],
  '193_hammer_orange_rose_gold': [
      {
          "name": "Coral Hammer Laranja (Fimbriaphyllia ancora)",
          "common": "Coral Hammer Laranja",
          "sci": "Fimbriaphyllia ancora",
          "isPrimary": true
      },
      {
          "name": "Coral Hammer Copper (Fimbriaphyllia ancora)",
          "common": "Coral Hammer Copper",
          "sci": "Fimbriaphyllia ancora",
          "candidates": [
              "hammer-copper.jpg"
          ]
      },
      {
          "name": "Coral Hammer Rose Gold (Fimbriaphyllia ancora)",
          "common": "Coral Hammer Rose Gold",
          "sci": "Fimbriaphyllia ancora",
          "candidates": [
              "hammer-rose-gold.jpg"
          ]
      }
  ],
  '194_hammer_wall_ancora_pink': [
      {
          "name": "Coral Hammer Wall Rosa (Fimbriaphyllia ancora)",
          "common": "Coral Hammer Wall Rosa",
          "sci": "Fimbriaphyllia ancora",
          "isPrimary": true
      },
      {
          "name": "Coral Hammer Wall Verde (Fimbriaphyllia ancora)",
          "common": "Coral Hammer Wall Verde",
          "sci": "Fimbriaphyllia ancora",
          "candidates": [
              "hammer-wall-green.jpg"
          ]
      }
  ],
  '195_hammer_prince_of_darkness_black': [
      {
          "name": "Coral Hammer Prince of Darkness (Fimbriaphyllia ancora)",
          "common": "Coral Hammer Prince of Darkness",
          "sci": "Fimbriaphyllia ancora",
          "isPrimary": true
      }
  ],
  '196_bubble_coral_plerogyra': [
      {
          "name": "Coral Bubble Verde (Plerogyra sinuosa)",
          "common": "Coral Bubble Verde",
          "sci": "Plerogyra sinuosa",
          "isPrimary": true
      },
      {
          "name": "Coral Bubble Branco (Plerogyra sinuosa)",
          "common": "Coral Bubble Branco",
          "sci": "Plerogyra sinuosa",
          "candidates": [
              "coral-bubble-white.jpg"
          ]
      }
  ],
  '198_plate_coral_fungia_orange': [
      {
          "name": "Coral Plate Laranja (Cycloseris sp.)",
          "common": "Coral Plate Laranja",
          "sci": "Cycloseris sp.",
          "isPrimary": true
      },
      {
          "name": "Coral Plate Verde (Fungia repanda)",
          "common": "Coral Plate Verde",
          "sci": "Fungia repanda",
          "candidates": [
              "coral-plate-green.jpg"
          ]
      }
  ],
  '199_open_brain_trachyphyllia': [
      {
          "name": "Coral Open Brain Rainbow (Trachyphyllia geoffroyi)",
          "common": "Coral Open Brain Rainbow",
          "sci": "Trachyphyllia geoffroyi",
          "isPrimary": true
      },
      {
          "name": "Coral Open Brain Verde (Trachyphyllia geoffroyi)",
          "common": "Coral Open Brain Verde",
          "sci": "Trachyphyllia geoffroyi",
          "candidates": [
              "open-brain-green.jpg"
          ]
      }
  ],
  '203_favites_war_coral': [
      {
          "name": "Coral War Vermelho e Roxo (Favites pentagona)",
          "common": "Coral War Vermelho e Roxo",
          "sci": "Favites pentagona",
          "isPrimary": true
      }
  ],
  '301_alga_chaetomorpha_spaghetti': [
      {
          "name": "Macroalga Chaetomorpha Spaghetti (Chaetomorpha linum)",
          "common": "Macroalga Chaetomorpha Spaghetti",
          "sci": "Chaetomorpha linum",
          "isPrimary": true,
          "subCategory": "PLANT"
      }
  ],
  '302_alga_atomic_broccoli_gracilaria': [
      {
          "name": "Macroalga Atomic Broccoli (Gracilaria sp.)",
          "common": "Macroalga Atomic Broccoli",
          "sci": "Gracilaria sp.",
          "isPrimary": true,
          "subCategory": "PLANT"
      }
  ],
  '303_alga_dragons_breath_halymenia': [
      {
          "name": "Macroalga Dragon's Breath (Halymenia durvillei)",
          "common": "Macroalga Dragon's Breath",
          "sci": "Halymenia durvillei",
          "isPrimary": true,
          "subCategory": "PLANT"
      }
  ],
  '304_alga_pink_dragons_breath_floresia': [
      {
          "name": "Macroalga Pink Dragon's Tongue (Halymenia floresia)",
          "common": "Macroalga Pink Dragon's Tongue",
          "sci": "Halymenia floresia",
          "isPrimary": true,
          "subCategory": "PLANT"
      }
  ],
  '305_alga_pom_pom_gracilaria_hayi': [
      {
          "name": "Macroalga Red Pom Pom (Gracilaria hayi)",
          "common": "Macroalga Red Pom Pom",
          "sci": "Gracilaria hayi",
          "isPrimary": true,
          "subCategory": "PLANT"
      }
  ],
  '306_alga_red_ogo_gracilaria_parvispora': [
      {
          "name": "Macroalga Red Ogo (Gracilaria parvispora)",
          "common": "Macroalga Red Ogo",
          "sci": "Gracilaria parvispora",
          "isPrimary": true,
          "subCategory": "PLANT"
      }
  ],
  '307_alga_caulerpa_prolifera_seagrass': [
      {
          "name": "Macroalga Caulerpa Prolifera Folha Lisa (Caulerpa prolifera)",
          "common": "Macroalga Caulerpa Prolifera Folha Lisa",
          "sci": "Caulerpa prolifera",
          "isPrimary": true,
          "subCategory": "PLANT"
      }
  ],
  '308_alga_caulerpa_sertularioides_feather': [
      {
          "name": "Macroalga Feather Pena (Caulerpa sertularioides)",
          "common": "Macroalga Feather Pena",
          "sci": "Caulerpa sertularioides",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Macroalga Caulerpa Taxifolia (Caulerpa taxifolia)",
          "common": "Macroalga Caulerpa Taxifolia",
          "sci": "Caulerpa taxifolia",
          "candidates": [
              "caulerpa-taxifolia.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '309_alga_caulerpa_racemosa_grape': [
      {
          "name": "Macroalga Grape Uva-do-Mar (Caulerpa racemosa)",
          "common": "Macroalga Grape Uva-do-Mar",
          "sci": "Caulerpa racemosa",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Macroalga Caulerpa Lentillifera Caviar Verde (Caulerpa lentillifera)",
          "common": "Macroalga Caulerpa Lentillifera Caviar Verde",
          "sci": "Caulerpa lentillifera",
          "candidates": [
              "caulerpa-lentillifera.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '310_alga_halimeda_calcarea_money_plant': [
      {
          "name": "Macroalga Calcária Halimeda (Halimeda incrassata)",
          "common": "Macroalga Calcária Halimeda",
          "sci": "Halimeda incrassata",
          "isPrimary": true,
          "subCategory": "PLANT"
      }
  ],
  '311_alga_shaving_brush_mermaids_fan': [
      {
          "name": "Macroalga Shaving Brush (Penicillus capitatus)",
          "common": "Macroalga Shaving Brush",
          "sci": "Penicillus capitatus",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Macroalga Mermaid's Fan (Udotea spinulosa)",
          "common": "Macroalga Mermaid's Fan",
          "sci": "Udotea spinulosa",
          "candidates": [
              "macroalga-udotea.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '314_alga_ulva_sea_lettuce_codium': [
      {
          "name": "Macroalga Ulva Alface-do-Mar (Ulva lactuca)",
          "common": "Macroalga Ulva Alface-do-Mar",
          "sci": "Ulva lactuca",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Macroalga Codium Verde (Codium fragile)",
          "common": "Macroalga Codium Verde",
          "sci": "Codium fragile",
          "candidates": [
              "macroalga-codium.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '315_mangue_vermelho_red_mangrove': [
      {
          "name": "Mangue Vermelho Propágulo (Rhizophora mangle)",
          "common": "Mangue Vermelho Propágulo",
          "sci": "Rhizophora mangle",
          "isPrimary": true,
          "subCategory": "PLANT"
      }
  ],
  '317_anubias_nana_petite': [
      {
          "name": "Anubias Nana Petite (Anubias barteri var. nana 'Petite')",
          "common": "Anubias Nana Petite",
          "sci": "Anubias barteri var. nana 'Petite'",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Anubias Pangolino (Anubias barteri var. nana 'Pangolino')",
          "common": "Anubias Pangolino",
          "sci": "Anubias barteri var. nana 'Pangolino'",
          "candidates": [
              "anubias-pangolino.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '318_anubias_barteri_broad_leaf_lanceolata': [
      {
          "name": "Anubias Barteri Broad Leaf (Anubias barteri var. barteri)",
          "common": "Anubias Barteri Broad Leaf",
          "sci": "Anubias barteri var. barteri",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Anubias Barteri Coffeefolia (Anubias barteri var. caladiifolia 'Coffeefolia')",
          "common": "Anubias Barteri Coffeefolia",
          "sci": "Anubias barteri var. caladiifolia 'Coffeefolia'",
          "candidates": [
              "anubias-coffeefolia.jpg"
          ],
          "subCategory": "PLANT"
      },
      {
          "name": "Anubias Lanceolata (Anubias barteri var. glabra)",
          "common": "Anubias Lanceolata",
          "sci": "Anubias barteri var. glabra",
          "candidates": [
              "anubias-lanceolata.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '319_anubias_pinto_white_golden': [
      {
          "name": "Anubias Nana Pinto Variegada (Anubias barteri var. nana 'Pinto')",
          "common": "Anubias Nana Pinto Variegada",
          "sci": "Anubias barteri var. nana 'Pinto'",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Anubias Golden Coin (Anubias barteri var. nana 'Golden Coin')",
          "common": "Anubias Golden Coin",
          "sci": "Anubias barteri var. nana 'Golden Coin'",
          "candidates": [
              "anubias-golden-coin.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '320_microsorum_pteropus_java_fern': [
      {
          "name": "Samambaia de Java Clássica (Microsorum pteropus)",
          "common": "Samambaia de Java Clássica",
          "sci": "Microsorum pteropus",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Samambaia de Java Narrow Leaf (Microsorum pteropus 'Narrow')",
          "common": "Samambaia de Java Narrow Leaf",
          "sci": "Microsorum pteropus 'Narrow'",
          "candidates": [
              "microsorum-narrow-leaf.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '321_microsorum_windelov_trident': [
      {
          "name": "Microsorum Windelov (Microsorum pteropus 'Windelov')",
          "common": "Microsorum Windelov",
          "sci": "Microsorum pteropus 'Windelov'",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Microsorum Trident (Microsorum pteropus 'Trident')",
          "common": "Microsorum Trident",
          "sci": "Microsorum pteropus 'Trident'",
          "candidates": [
              "microsorum-trident.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '322_bucephalandra_wavy_green_kedagang': [
      {
          "name": "Bucephalandra Green Wavy (Bucephalandra pygmaea 'Wavy Green')",
          "common": "Bucephalandra Green Wavy",
          "sci": "Bucephalandra pygmaea 'Wavy Green'",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Bucephalandra Godzilla (Bucephalandra sp. 'Godzilla')",
          "common": "Bucephalandra Godzilla",
          "sci": "Bucephalandra sp. 'Godzilla'",
          "candidates": [
              "bucephalandra-godzilla.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '323_bucephalandra_brownie_ghost_red_mini': [
      {
          "name": "Bucephalandra Brownie Ghost (Bucephalandra sp. 'Brownie Ghost')",
          "common": "Bucephalandra Brownie Ghost",
          "sci": "Bucephalandra sp. 'Brownie Ghost'",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Bucephalandra Red Mini (Bucephalandra sp. 'Red Mini')",
          "common": "Bucephalandra Red Mini",
          "sci": "Bucephalandra sp. 'Red Mini'",
          "candidates": [
              "bucephalandra-red-mini.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '324_bolbitis_heudelotii_pinnatifida': [
      {
          "name": "Samambaia do Congo Bolbitis (Bolbitis heudelotii)",
          "common": "Samambaia do Congo Bolbitis",
          "sci": "Bolbitis heudelotii",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Hygrophila Pinnatifida (Hygrophila pinnatifida)",
          "common": "Hygrophila Pinnatifida",
          "sci": "Hygrophila pinnatifida",
          "candidates": [
              "hygrophila-pinnatifida.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '325_musgo_de_java_christmas_flame_marimo': [
      {
          "name": "Musgo de Java (Taxiphyllum barbieri)",
          "common": "Musgo de Java",
          "sci": "Taxiphyllum barbieri",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Musgo Christmas Moss (Vesicularia montagnei)",
          "common": "Musgo Christmas Moss",
          "sci": "Vesicularia montagnei",
          "candidates": [
              "musgo-christmas.jpg"
          ],
          "subCategory": "PLANT"
      },
      {
          "name": "Musgo Flame Moss (Taxiphyllum alternans)",
          "common": "Musgo Flame Moss",
          "sci": "Taxiphyllum alternans",
          "candidates": [
              "musgo-flame.jpg"
          ],
          "subCategory": "PLANT"
      },
      {
          "name": "Marimo Ball Alga Musgo (Aegagropila linnaei)",
          "common": "Marimo Ball Alga Musgo",
          "sci": "Aegagropila linnaei",
          "candidates": [
              "marimo-moss-ball.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '326_elodea_egeria_densa_anacharis': [
      {
          "name": "Elódea Comum Anacharis (Egeria densa)",
          "common": "Elódea Comum Anacharis",
          "sci": "Egeria densa",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Elódea Najas (Egeria najas)",
          "common": "Elódea Najas",
          "sci": "Egeria najas",
          "candidates": [
              "elodea-najas.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '327_cabomba_verde_aquatica_furcata': [
      {
          "name": "Cabomba Verde (Cabomba caroliniana)",
          "common": "Cabomba Verde",
          "sci": "Cabomba caroliniana",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Cabomba Vermelha Furcata (Cabomba furcata)",
          "common": "Cabomba Vermelha Furcata",
          "sci": "Cabomba furcata",
          "candidates": [
              "cabomba-vermelha.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '328_rabo_de_raposa_ceratophyllum_demersum': [
      {
          "name": "Rabo-de-Raposa Coontail (Ceratophyllum demersum)",
          "common": "Rabo-de-Raposa Coontail",
          "sci": "Ceratophyllum demersum",
          "isPrimary": true,
          "subCategory": "PLANT"
      }
  ],
  '329_ambulia_limnophila_sessiliflora_myriophyllum': [
      {
          "name": "Ambulia Sessiliflora (Limnophila sessiliflora)",
          "common": "Ambulia Sessiliflora",
          "sci": "Limnophila sessiliflora",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Mil-Folhas Verde (Myriophyllum aquaticum)",
          "common": "Mil-Folhas Verde",
          "sci": "Myriophyllum aquaticum",
          "candidates": [
              "mil-folhas-verde.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '330_hygrophila_polysperma_rosanervig_sunset': [
      {
          "name": "Hygrophila Polysperma Comum (Hygrophila polysperma)",
          "common": "Hygrophila Polysperma Comum",
          "sci": "Hygrophila polysperma",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Hygrophila Polysperma Rosanervig Sunset (Hygrophila polysperma 'Rosanervig')",
          "common": "Hygrophila Polysperma Rosanervig Sunset",
          "sci": "Hygrophila polysperma 'Rosanervig'",
          "candidates": [
              "hygrophila-sunset.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '331_hygrophila_corymbosa_rio_siamensis': [
      {
          "name": "Hygrophila Corymbosa Rio (Hygrophila corymbosa)",
          "common": "Hygrophila Corymbosa Rio",
          "sci": "Hygrophila corymbosa",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Hygrophila Corymbosa Compacta (Hygrophila corymbosa 'Compact')",
          "common": "Hygrophila Corymbosa Compacta",
          "sci": "Hygrophila corymbosa 'Compact'",
          "candidates": [
              "hygrophila-corymbosa-compacta.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '332_hygrophila_difformis_sinema_samambaia': [
      {
          "name": "Hygrophila Difformis Sinema (Hygrophila difformis)",
          "common": "Hygrophila Difformis Sinema",
          "sci": "Hygrophila difformis",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Samambaia d'Água Ceratopteris (Ceratopteris thalictroides)",
          "common": "Samambaia d'Água Ceratopteris",
          "sci": "Ceratopteris thalictroides",
          "candidates": [
              "ceratopteris-thalictroides.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '333_bacopa_caroliniana_monnieri': [
      {
          "name": "Bacopa Caroliniana (Bacopa caroliniana)",
          "common": "Bacopa Caroliniana",
          "sci": "Bacopa caroliniana",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Bacopa Monnieri Moneywort (Bacopa monnieri)",
          "common": "Bacopa Monnieri Moneywort",
          "sci": "Bacopa monnieri",
          "candidates": [
              "bacopa-monnieri.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '334_rotala_rotundifolia_red_hra_blood_red': [
      {
          "name": "Rotala Rotundifolia Red (Rotala rotundifolia 'Red')",
          "common": "Rotala Rotundifolia Red",
          "sci": "Rotala rotundifolia 'Red'",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Rotala Rotundifolia H'ra (Rotala rotundifolia 'H\\'ra')",
          "common": "Rotala Rotundifolia H'ra",
          "sci": "Rotala rotundifolia 'H\\'ra'",
          "candidates": [
              "rotala-hra.jpg"
          ],
          "subCategory": "PLANT"
      },
      {
          "name": "Rotala Blood Red (Rotala rotundifolia 'Blood Red')",
          "common": "Rotala Blood Red",
          "sci": "Rotala rotundifolia 'Blood Red'",
          "candidates": [
              "rotala-blood-red.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '335_rotala_green_indica_bonsai_wallichii': [
      {
          "name": "Rotala Green (Rotala rotundifolia 'Green')",
          "common": "Rotala Green",
          "sci": "Rotala rotundifolia 'Green'",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Rotala Bonsai (Ammannia gracilis 'Bonsai')",
          "common": "Rotala Bonsai",
          "sci": "Ammannia gracilis 'Bonsai'",
          "candidates": [
              "rotala-bonsai.jpg"
          ],
          "subCategory": "PLANT"
      },
      {
          "name": "Rotala Wallichii Vermelha (Rotala wallichii)",
          "common": "Rotala Wallichii Vermelha",
          "sci": "Rotala wallichii",
          "candidates": [
              "rotala-wallichii.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '336_ludwigia_sp_super_red_repens_rubin': [
      {
          "name": "Ludwigia Super Red Mini (Ludwigia palustris 'Super Red')",
          "common": "Ludwigia Super Red Mini",
          "sci": "Ludwigia palustris 'Super Red'",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Ludwigia Repens Rubin (Ludwigia repens 'Rubin')",
          "common": "Ludwigia Repens Rubin",
          "sci": "Ludwigia repens 'Rubin'",
          "candidates": [
              "ludwigia-rubin.jpg"
          ],
          "subCategory": "PLANT"
      },
      {
          "name": "Ludwigia Glandulosa (Ludwigia glandulosa)",
          "common": "Ludwigia Glandulosa",
          "sci": "Ludwigia glandulosa",
          "candidates": [
              "ludwigia-glandulosa.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '338_echinodorus_amazonense_bleheri': [
      {
          "name": "Planta Amazonense Clássica (Echinodorus bleheri)",
          "common": "Planta Amazonense Clássica",
          "sci": "Echinodorus bleheri",
          "isPrimary": true,
          "subCategory": "PLANT"
      }
  ],
  '339_echinodorus_ozelot_red_rubin_reni': [
      {
          "name": "Echinodorus Ozelot Red (Echinodorus 'Ozelot Red')",
          "common": "Echinodorus Ozelot Red",
          "sci": "Echinodorus 'Ozelot Red'",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Echinodorus Rubin (Echinodorus 'Rubin')",
          "common": "Echinodorus Rubin",
          "sci": "Echinodorus 'Rubin'",
          "candidates": [
              "echinodorus-rubin.jpg"
          ],
          "subCategory": "PLANT"
      },
      {
          "name": "Echinodorus Reni (Echinodorus 'Reni')",
          "common": "Echinodorus Reni",
          "sci": "Echinodorus 'Reni'",
          "candidates": [
              "echinodorus-reni.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '340_echinodorus_tenellus_helanthium_amano': [
      {
          "name": "Echinodorus Tenellus Comum (Helanthium tenellum)",
          "common": "Echinodorus Tenellus Comum",
          "sci": "Helanthium tenellum",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Echinodorus Tenellus Amano Red (Helanthium tenellum 'Red')",
          "common": "Echinodorus Tenellus Amano Red",
          "sci": "Helanthium tenellum 'Red'",
          "candidates": [
              "echinodorus-tenellus-amano.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '341_vallisneria_americana_gigantea_nana': [
      {
          "name": "Vallisneria Gigantea Americana (Vallisneria americana)",
          "common": "Vallisneria Gigantea Americana",
          "sci": "Vallisneria americana",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Vallisneria Nana Australiana (Vallisneria nana)",
          "common": "Vallisneria Nana Australiana",
          "sci": "Vallisneria nana",
          "candidates": [
              "vallisneria-nana.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '342_vallisneria_spiralis_corkscrew_saca_rolha': [
      {
          "name": "Vallisneria Saca-Rolhas Spiralis (Vallisneria spiralis 'Tortifolia')",
          "common": "Vallisneria Saca-Rolhas Spiralis",
          "sci": "Vallisneria spiralis 'Tortifolia'",
          "isPrimary": true,
          "subCategory": "PLANT"
      }
  ],
  '343_sagittaria_subulata_blyxa_japonica': [
      {
          "name": "Sagittaria Subulata Anã (Sagittaria subulata)",
          "common": "Sagittaria Subulata Anã",
          "sci": "Sagittaria subulata",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Blyxa Japonica (Blyxa japonica)",
          "common": "Blyxa Japonica",
          "sci": "Blyxa japonica",
          "candidates": [
              "blyxa-japonica.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '344_cryptocoryne_wendtii_brown_tropica_beckettii': [
      {
          "name": "Cryptocoryne Wendtii Brown (Cryptocoryne wendtii 'Brown')",
          "common": "Cryptocoryne Wendtii Brown",
          "sci": "Cryptocoryne wendtii 'Brown'",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Cryptocoryne Beckettii Petchii (Cryptocoryne beckettii)",
          "common": "Cryptocoryne Beckettii Petchii",
          "sci": "Cryptocoryne beckettii",
          "candidates": [
              "cryptocoryne-beckettii.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '345_cryptocoryne_wendtii_green_parva_balansae': [
      {
          "name": "Cryptocoryne Wendtii Green (Cryptocoryne wendtii 'Green')",
          "common": "Cryptocoryne Wendtii Green",
          "sci": "Cryptocoryne wendtii 'Green'",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Cryptocoryne Parva Mini (Cryptocoryne parva)",
          "common": "Cryptocoryne Parva Mini",
          "sci": "Cryptocoryne parva",
          "candidates": [
              "cryptocoryne-parva.jpg"
          ],
          "subCategory": "PLANT"
      },
      {
          "name": "Cryptocoryne Balansae Crispatula (Cryptocoryne crispatula var. balansae)",
          "common": "Cryptocoryne Balansae Crispatula",
          "sci": "Cryptocoryne crispatula var. balansae",
          "candidates": [
              "cryptocoryne-balansae.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '346_cryptocoryne_pink_flamingo_panther': [
      {
          "name": "Cryptocoryne Pink Flamingo (Cryptocoryne wendtii 'Pink Flamingo')",
          "common": "Cryptocoryne Pink Flamingo",
          "sci": "Cryptocoryne wendtii 'Pink Flamingo'",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Cryptocoryne Pink Panther (Cryptocoryne spiralis 'Pink Panther')",
          "common": "Cryptocoryne Pink Panther",
          "sci": "Cryptocoryne spiralis 'Pink Panther'",
          "candidates": [
              "cryptocoryne-pink-panther.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '347_nymphaea_rubra_red_tiger_lotus_aponogeton': [
      {
          "name": "Nymphaea Rubra Red Tiger Lotus (Nymphaea zenkeri)",
          "common": "Nymphaea Rubra Red Tiger Lotus",
          "sci": "Nymphaea zenkeri",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Crinum Calamistratum Ondulada (Crinum calamistratum)",
          "common": "Crinum Calamistratum Ondulada",
          "sci": "Crinum calamistratum",
          "candidates": [
              "crinum-calamistratum.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '349_hemianthus_cuba_hc_glossostigma': [
      {
          "name": "Carpete Cuba HC (Hemianthus callitrichoides)",
          "common": "Carpete Cuba HC",
          "sci": "Hemianthus callitrichoides",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Carpete Glossostigma Elatinoides (Glossostigma elatinoides)",
          "common": "Carpete Glossostigma Elatinoides",
          "sci": "Glossostigma elatinoides",
          "candidates": [
              "glossostigma-elatinoides.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '350_eleocharis_minima_parvula_hairgrass': [
      {
          "name": "Carpete Eleocharis Minima (Eleocharis minima)",
          "common": "Carpete Eleocharis Minima",
          "sci": "Eleocharis minima",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Carpete Eleocharis Vivipara (Eleocharis vivipara)",
          "common": "Carpete Eleocharis Vivipara",
          "sci": "Eleocharis vivipara",
          "candidates": [
              "eleocharis-vivipara.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '351_staurogyne_repens_pogostemon_helferi': [
      {
          "name": "Staurogyne Repens Rasteira (Staurogyne repens)",
          "common": "Staurogyne Repens Rasteira",
          "sci": "Staurogyne repens",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Pogostemon Helferi Downoi (Pogostemon helferi)",
          "common": "Pogostemon Helferi Downoi",
          "sci": "Pogostemon helferi",
          "candidates": [
              "pogostemon-helferi.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '352_hydrocotyle_tripartita_japan_leucocephala': [
      {
          "name": "Hydrocotyle Tripartita Trevo Japonês (Hydrocotyle tripartita)",
          "common": "Hydrocotyle Tripartita Trevo Japonês",
          "sci": "Hydrocotyle tripartita",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Hydrocotyle Leucocephala Trevo Redondo (Hydrocotyle leucocephala)",
          "common": "Hydrocotyle Leucocephala Trevo Redondo",
          "sci": "Hydrocotyle leucocephala",
          "candidates": [
              "hydrocotyle-leucocephala.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '353_lilaeopsis_brasiliensis_marsilea_hirsuta': [
      {
          "name": "Grama Brasileira Lilaeopsis (Lilaeopsis brasiliensis)",
          "common": "Grama Brasileira Lilaeopsis",
          "sci": "Lilaeopsis brasiliensis",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Marsilea Hirsuta Trevo Quatro Folhas (Marsilea hirsuta)",
          "common": "Marsilea Hirsuta Trevo Quatro Folhas",
          "sci": "Marsilea hirsuta",
          "candidates": [
              "marsilea-hirsuta.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '354_lobelia_cardinalis_mini': [
      {
          "name": "Lobelia Cardinalis Comum (Lobelia cardinalis)",
          "common": "Lobelia Cardinalis Comum",
          "sci": "Lobelia cardinalis",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Lobelia Cardinalis Mini (Lobelia cardinalis 'Mini')",
          "common": "Lobelia Cardinalis Mini",
          "sci": "Lobelia cardinalis 'Mini'",
          "candidates": [
              "lobelia-cardinalis-mini.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '355_lagenandra_meeboldii_red_keralensis': [
      {
          "name": "Lagenandra Meeboldii Red (Lagenandra meeboldii 'Red')",
          "common": "Lagenandra Meeboldii Red",
          "sci": "Lagenandra meeboldii 'Red'",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Lagenandra Keralensis (Lagenandra keralensis)",
          "common": "Lagenandra Keralensis",
          "sci": "Lagenandra keralensis",
          "candidates": [
              "lagenandra-keralensis.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '356_salvinia_auriculata_cucullata_minima': [
      {
          "name": "Planta Flutuante Salvínia Comum (Salvinia auriculata)",
          "common": "Planta Flutuante Salvínia Comum",
          "sci": "Salvinia auriculata",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Planta Flutuante Salvínia Orelha-de-Onça (Salvinia cucullata)",
          "common": "Planta Flutuante Salvínia Orelha-de-Onça",
          "sci": "Salvinia cucullata",
          "candidates": [
              "salvinia-cucullata.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '357_pistia_stratiotes_alface_dagua_aguape': [
      {
          "name": "Alface d'Água Anã (Pistia stratiotes)",
          "common": "Alface d'Água Anã",
          "sci": "Pistia stratiotes",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Aguapé Flutuante (Eichhornia crassipes)",
          "common": "Aguapé Flutuante",
          "sci": "Eichhornia crassipes",
          "candidates": [
              "aguape-eichhornia.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '358_phyllanthus_fluitans_red_root_floater': [
      {
          "name": "Phyllanthus Fluitans Flutuante Vermelha (Phyllanthus fluitans)",
          "common": "Phyllanthus Fluitans Flutuante Vermelha",
          "sci": "Phyllanthus fluitans",
          "isPrimary": true,
          "subCategory": "PLANT"
      }
  ],
  '359_limnobium_laevigatum_amazon_frogbit': [
      {
          "name": "Amazon Frogbit (Limnobium laevigatum)",
          "common": "Amazon Frogbit",
          "sci": "Limnobium laevigatum",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Amor-de-Peixe Hydrocleys (Hydrocleys nymphoides)",
          "common": "Amor-de-Peixe Hydrocleys",
          "sci": "Hydrocleys nymphoides",
          "candidates": [
              "hydrocleys-nymphoides.jpg"
          ],
          "subCategory": "PLANT"
      }
  ],
  '360_lemna_minor_lentilha_dagua_azolla': [
      {
          "name": "Lentilha d'Água (Lemna minor)",
          "common": "Lentilha d'Água",
          "sci": "Lemna minor",
          "isPrimary": true,
          "subCategory": "PLANT"
      },
      {
          "name": "Azolla Flutuante Vermelha (Azolla caroliniana)",
          "common": "Azolla Flutuante Vermelha",
          "sci": "Azolla caroliniana",
          "candidates": [
              "azolla-caroliniana.jpg"
          ],
          "subCategory": "PLANT"
      }
  ]
};

// SubCategory inference based on block & name
function inferSubCategory(item, bloco) {
  if (item.subCategory) return item.subCategory;
  const b = bloco.toLowerCase();
  if (b.includes('corais')) return 'CORAL';
  if (b.includes('marinho')) return 'MARINE_FISH';
  if (b.includes('peixes') && (b.includes('marinho') || b.includes('bloco 3'))) return 'MARINE_FISH';
  if (b.includes('plantas') || b.includes('flora')) return 'PLANT';
  if (b.includes('água doce') || b.includes('bloco 4')) return 'FRESHWATER_FISH';
  return 'OTHER_LIVING';
}

function inferSection(subCategory) {
  switch (subCategory) {
    case 'CORAL': return 'Corais & Anêmonas';
    case 'MARINE_FISH': return 'Peixes Marinhos';
    case 'FRESHWATER_FISH': return 'Peixes de Água Doce';
    case 'MARINE_INVERTEBRATE': return 'Invertebrados Marinhos';
    case 'FRESHWATER_INVERTEBRATE': return 'Invertebrados de Água Doce';
    case 'PLANT': return 'Plantas Aquáticas';
    default: return 'Seres Vivos';
  }
}

function inferFamily(name, subCat) {
  const n = name.toLowerCase();
  if (n.includes('zoanthus')) return 'Zoanthídeos';
  if (n.includes('palythoa')) return 'Palythoas';
  if (n.includes('mushroom') || n.includes('discosoma') || n.includes('rhodactis') || n.includes('ricordea')) return 'Mushrooms & Ricordeas';
  if (n.includes('hammer') || n.includes('torch') || n.includes('frogspawn') || n.includes('frammer')) return 'Euphylliidae (LPS Nobres)';
  if (n.includes('acropora') || n.includes('montipora') || n.includes('seriatopora')) return 'SPS (Pólipos Pequenos)';
  if (n.includes('palhaço') || n.includes('ocellaris')) return 'Palhaços (Amphiprioninae)';
  if (n.includes('tang')) return 'Tangs e Cirurgiões (Acanthuridae)';
  if (n.includes('anjo') || n.includes('angel')) return 'Peixes-Anjo (Pomacanthidae)';
  if (n.includes('wrasse')) return 'Bodiões e Wrasses (Labridae)';
  if (n.includes('goby') || n.includes('blênio') || n.includes('blenny')) return 'Gobies e Blênios';
  if (n.includes('guppy') || n.includes('endler') || n.includes('plati') || n.includes('espada') || n.includes('molinésia')) return 'Poecilídeos (Ovivíparos)';
  if (n.includes('betta')) return 'Bettas & Anabantídeos';
  if (n.includes('tetra') || n.includes('neon') || n.includes('rodóstomus')) return 'Caracídeos (Tetras e Cardumes)';
  if (n.includes('acará') || n.includes('disco') || n.includes('ramirezi') || n.includes('apistogramma') || n.includes('ciclídeo')) return 'Ciclídeos (Americanos e Africanos)';
  if (n.includes('coridora')) return 'Coridoras (Callichthyidae)';
  if (n.includes('cascudo') || n.includes('ancistrus') || n.includes('limpa-vidro')) return 'Cascudos & Loricariídeos';
  if (n.includes('kinguio')) return 'Ciprinídeos (Kinguios & Carpas)';
  if (n.includes('camarão') || n.includes('caramujo') || n.includes('ostra') || n.includes('paguro')) return 'Equipe de Limpeza & Invertebrados';
  if (n.includes('alga') || n.includes('anubias') || n.includes('rotala') || n.includes('musgo')) return 'Flora e Macroalgas';
  return 'Geral';
}

const curatedSpecies = [];
const auditLog = [];

const cleanSlug = s => s.trim().replace(/\s+/g, '_');

let speciesIdCounter = 1;

for (const raw of allRaw) {
  const safeSlug = cleanSlug(raw.slug);
  const combos = COMBO_MAP[safeSlug];

  if (combos && combos.length > 0) {
    // Has explicit dissection
    for (const child of combos) {
      const subCat = child.subCategory || inferSubCategory(child, raw.bloco);
      let assignedSlug = '';
      let auditSource = 'NO_IMAGE_PLACEHOLDER';
      let auditDetail = 'Sem imagem representativa confirmada';

      if (child.isPrimary) {
        // Find Argon file on disk
        const argonFile = existingFiles.find(f => f.startsWith(safeSlug + '.'));
        if (argonFile) {
          assignedSlug = argonFile;
          auditSource = 'ARGON_CURATED_PRIMARY';
          auditDetail = `Imagem oficial curada do Argon (${argonFile})`;
        } else {
          auditSource = 'ARGON_CURATED_PRIMARY_MISSING_FILE';
          auditDetail = `URL Argon falhou ou arquivo pendente (${safeSlug})`;
        }
      } else {
        // Search old repository strictly via candidates list
        const match = findVerifiedCandidate(child.candidates || []);
        if (match) {
          assignedSlug = match;
          auditSource = 'EXISTING_REPOSITORY_FALLBACK';
          auditDetail = `Foto reaproveitada do banco existente (${match})`;
        } else {
          assignedSlug = '';
          auditSource = 'NO_IMAGE_PLACEHOLDER';
          auditDetail = 'Card sem foto / fallback elegante SVG';
        }
      }

      curatedSpecies.push({
        id: String(speciesIdCounter++),
        name: child.name,
        commonName: child.common,
        scientificName: child.sci,
        synonyms: [child.common, child.name, ...(child.candidates || [])],
        type: 'LIVING',
        subCategory: subCat,
        imageSlug: assignedSlug,
        section: inferSection(subCat),
        familyGroup: inferFamily(child.name, subCat)
      });

      auditLog.push({
        id: String(speciesIdCounter - 1),
        name: child.name,
        source: auditSource,
        slot: raw.slot,
        detail: auditDetail,
        subCategory: subCat,
        imageFile: assignedSlug || 'Nenhum (Fallback Card SVG)'
      });
    }
  } else {
    // Single species or flora without combo
    let name = raw.nome.trim();
    // Parse scientific name if present
    let common = name;
    let sci = '';
    const m = name.match(/^(.*?)\s*\((.*?)\)$/);
    if (m) {
      common = m[1].trim();
      sci = m[2].trim();
    } else {
      sci = common;
    }

    // Clean common name from forbidden repetition
    if (common.toLowerCase().startsWith('peixe-palhaço ocellaris')) {
      common = common.replace(/peixe-palhaço ocellaris/i, 'Peixe-palhaço Comum');
      name = `${common} (${sci})`;
    }

    const subCat = inferSubCategory({ name }, raw.bloco);
    const argonFile = existingFiles.find(f => f.startsWith(safeSlug + '.'));
    let assignedSlug = '';
    let auditSource = 'NO_IMAGE_PLACEHOLDER';
    let auditDetail = '';

    if (argonFile) {
      assignedSlug = argonFile;
      auditSource = 'ARGON_CURATED_PRIMARY';
      auditDetail = `Imagem oficial curada do Argon (${argonFile})`;
    } else {
      auditSource = 'NO_IMAGE_PLACEHOLDER';
      auditDetail = 'Card sem foto / fallback elegante SVG';
    }

    curatedSpecies.push({
      id: String(speciesIdCounter++),
      name,
      commonName: common,
      scientificName: sci,
      synonyms: [common, name, ...(raw.keywords || [])],
      type: 'LIVING',
      subCategory: subCat,
      imageSlug: assignedSlug,
      section: inferSection(subCat),
      familyGroup: inferFamily(name, subCat)
    });

    auditLog.push({
      id: String(speciesIdCounter - 1),
      name,
      source: auditSource,
      slot: raw.slot,
      detail: auditDetail,
      subCategory: subCat,
      imageFile: assignedSlug || 'Nenhum (Fallback Card SVG)'
    });
  }
}

console.log('Total species generated:', curatedSpecies.length);

const primaryCount = auditLog.filter(x => x.source.startsWith('ARGON')).length;
const fallbackCount = auditLog.filter(x => x.source === 'EXISTING_REPOSITORY_FALLBACK').length;
const placeholderCount = auditLog.filter(x => x.source === 'NO_IMAGE_PLACEHOLDER').length;

console.log(`Summary: Primary (Argon)=${primaryCount}, Fallbacks=${fallbackCount}, Placeholders=${placeholderCount}`);

// Write curated_fallback_log.json
fs.writeFileSync(
  path.resolve(__dirname, '../curated_fallback_log.json'),
  JSON.stringify(auditLog, null, 2),
  'utf8'
);

// Write AUDIT_FALLBACK_REPORT.md
let md = `# Relatório de Auditoria de Curadoria e Desmembramento de Espécies

Data da Curadoria: ${new Date().toISOString().slice(0, 10)}
Total de Seres Vivos Mapeados: **${curatedSpecies.length}**

### Resumo Executivo:
* **Fotos Oficiais Argon (Primárias / Isoladas)**: ${primaryCount}
* **Morfotipos Desmembrados c/ Fallback Genuíno do Banco Antigo**: ${fallbackCount}
* **Morfotipos Novos sem Foto (Fallback Card SVG Elegante)**: ${placeholderCount}

---

## 1. Morfotipos Desmembrados com Fotos Validadas do Repositório Antigo (${fallbackCount} itens)
> [!NOTE]
> Estes morfotipos foram separados dos combos do Argon e receberam imagens legítimas e comprovadas do nosso repositório. O Marcelo e o administrador podem validar ou trocar qualquer foto pelo botão de edição de produto.

| ID | Morfotipo / Espécie | Subcategoria | Arquivo de Imagem Vinculado | Slot de Origem |
| :--- | :--- | :--- | :--- | :--- |
`;

for (const it of auditLog.filter(x => x.source === 'EXISTING_REPOSITORY_FALLBACK')) {
  md += `| ${it.id} | **${it.name}** | \`${it.subCategory}\` | \`${it.imageFile}\` | ${it.slot} |\n`;
}

md += `\n---

## 2. Morfotipos Desmembrados Sem Foto (Placeholder SVG Card Elegante - ${placeholderCount} itens)
> [!TIP]
> Seguindo a Regra de Ouro da Taxonomia: **é preferível exibir um card estilizado sem foto do que exibir a foto do peixe errado**. O operador da loja (Marcelo) tem total autonomia para subir uma foto pelo botão **Editar Produto** a qualquer momento.

| ID | Morfotipo / Espécie | Subcategoria | Slot de Origem |
| :--- | :--- | :--- | :--- |
`;

for (const it of auditLog.filter(x => x.source === 'NO_IMAGE_PLACEHOLDER')) {
  md += `| ${it.id} | **${it.name}** | \`${it.subCategory}\` | ${it.slot} |\n`;
}

fs.writeFileSync(path.resolve(__dirname, '../AUDIT_FALLBACK_REPORT.md'), md, 'utf8');

// Write speciesMasterCatalog.ts
let tsCatalog = `// Catálogo Mestre Oficial de Espécies e Morfotipos (Bamba Aqua)
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

export const SPECIES_MASTER_CATALOG: MasterSpecies[] = ${JSON.stringify(curatedSpecies, null, 2)}

export function searchMasterSpecies(query: string, limit = 8): MasterSpecies[] {
  if (!query || query.trim().length < 2) return []

  const cleanQuery = query
    .normalize('NFD')
    .replace(/[\\u0300-\\u036f]/g, '')
    .toLowerCase()
    .trim()

  const queryTokens = cleanQuery.split(/\\s+/).filter(Boolean)
  const matches: { item: MasterSpecies; score: number }[] = []

  for (const item of SPECIES_MASTER_CATALOG) {
    const normName = item.name.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase()
    const normCommon = item.commonName.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase()
    const normScientific = item.scientificName.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase()
    const normSynonyms = (item.synonyms || []).map((s) =>
      s.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase()
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
`;

fs.writeFileSync(
  path.resolve(__dirname, '../frontend/store-management-web/src/data/speciesMasterCatalog.ts'),
  tsCatalog,
  'utf8'
);

// Write existingAnimalImages.ts
const existingImagesTs = `/**
 * Lista estática de imagens verificadas que existem no diretório public/images/animals/.
 * Autogerado para garantir zero falsos positivos no encarte e nos cards de produtos.
 */
export const EXISTING_ANIMAL_IMAGES: ReadonlySet<string> = new Set(${JSON.stringify([...existingFilesSet], null, 2)});
`;

fs.writeFileSync(
  path.resolve(__dirname, '../frontend/store-management-web/src/utils/existingAnimalImages.ts'),
  existingImagesTs,
  'utf8'
);

console.log('SUCCESS: Written strictly-verified speciesMasterCatalog.ts, existingAnimalImages.ts, curated_fallback_log.json, AUDIT_FALLBACK_REPORT.md');
