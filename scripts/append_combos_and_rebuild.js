const fs = require('fs');
const path = require('path');

const additionalCombos = {
  // === CORAIS TIER 1 & 2 ===
  '050_torch_black': [
    { name: 'Coral Torch Black Ponta Verde (Euphyllia glabrescens)', common: 'Coral Torch Black Ponta Verde', sci: 'Euphyllia glabrescens', isPrimary: true },
    { name: 'Coral Torch Black Ponta Branca (Euphyllia glabrescens)', common: 'Coral Torch Black Ponta Branca', sci: 'Euphyllia glabrescens', candidates: ['torch-black-white-tip.jpg', 'torch-black.jpg'] }
  ],
  '154_zoanthus_aoi_blue': [
    { name: 'Zoanthus AOI Blue (Zoanthus sp.)', common: 'Zoanthus AOI Blue', sci: 'Zoanthus sp.', isPrimary: true }
  ],
  '158_zoanthus_mohawk': [
    { name: 'Zoanthus Mohawk (Zoanthus sp.)', common: 'Zoanthus Mohawk', sci: 'Zoanthus sp.', isPrimary: true },
    { name: 'Zoanthus Variable Star (Zoanthus sp.)', common: 'Zoanthus Variable Star', sci: 'Zoanthus sp.', candidates: ['zoanthus-variable-star.jpg'] }
  ],
  '160_zoanthus_rainbow_infusion': [
    { name: 'Zoanthus Rainbow Infusion (Zoanthus sp.)', common: 'Zoanthus Rainbow Infusion', sci: 'Zoanthus sp.', isPrimary: true },
    { name: 'Zoanthus Kazoo (Zoanthus sp.)', common: 'Zoanthus Kazoo', sci: 'Zoanthus sp.', candidates: ['zoanthus-kazoo.jpg'] }
  ],
  '164_zoanthus_magicians': [
    { name: 'Zoanthus Magicians (Zoanthus sp.)', common: 'Zoanthus Magicians', sci: 'Zoanthus sp.', isPrimary: true },
    { name: 'Palythoa Red People Eater (Palythoa sp.)', common: 'Palythoa Red People Eater', sci: 'Palythoa sp.', candidates: ['zoanthus-red-people-eater.jpg', 'palythoa-red-people-eater.jpg'] }
  ],
  '166_zoanthus_white_zombie': [
    { name: 'Zoanthus White Zombie (Zoanthus sp.)', common: 'Zoanthus White Zombie', sci: 'Zoanthus sp.', isPrimary: true },
    { name: 'Zoanthus Seduction (Zoanthus sp.)', common: 'Zoanthus Seduction', sci: 'Zoanthus sp.', candidates: ['zoanthus-seduction.jpg'] }
  ],
  '168_palythoa_lemon_twist': [
    { name: 'Palythoa Lemon Twist (Palythoa sp.)', common: 'Palythoa Lemon Twist', sci: 'Palythoa sp.', isPrimary: true },
    { name: 'Palythoa Space Chaos (Palythoa sp.)', common: 'Palythoa Space Chaos', sci: 'Palythoa sp.', candidates: ['palythoa-space-chaos.jpg'] }
  ],
  '169_zoanthus_little_shop_of_horrors': [
    { name: 'Zoanthus Little Shop of Horrors (Zoanthus sp.)', common: 'Zoanthus Little Shop of Horrors', sci: 'Zoanthus sp.', isPrimary: true },
    { name: 'Zoanthus Grand Master Glazz GMK (Zoanthus sp.)', common: 'Zoanthus Grand Master Glazz GMK', sci: 'Zoanthus sp.', candidates: ['zoanthus-gmk.jpg'] }
  ],
  '173_mushroom_red_velvet_magic_carpet': [
    { name: 'Mushroom Magic Carpet (Rhodactis sp.)', common: 'Mushroom Magic Carpet', sci: 'Rhodactis sp.', isPrimary: true },
    { name: 'Mushroom Red Velvet (Rhodactis sp.)', common: 'Mushroom Red Velvet', sci: 'Rhodactis sp.', candidates: ['mushroom-red-velvet.jpg'] }
  ],
  '174_mushroom_interstellar_patchwork': [
    { name: 'Mushroom Discosoma Interstellar (Discosoma sp.)', common: 'Mushroom Discosoma Interstellar', sci: 'Discosoma sp.', isPrimary: true },
    { name: 'Mushroom Discosoma Patchwork Rainbow (Discosoma sp.)', common: 'Mushroom Discosoma Patchwork Rainbow', sci: 'Discosoma sp.', candidates: ['mushroom-patchwork.jpg'] }
  ],
  '178_rhodactis_powerball_bounce': [
    { name: 'Mushroom Rhodactis Powerball Bounce (Rhodactis sp.)', common: 'Mushroom Rhodactis Powerball Bounce', sci: 'Rhodactis sp.', isPrimary: true },
    { name: 'Mushroom Rhodactis Biohazard Bounce (Rhodactis sp.)', common: 'Mushroom Rhodactis Biohazard Bounce', sci: 'Rhodactis sp.', candidates: ['rhodactis-biohazard.jpg'] }
  ],
  '180_ricordea_florida_blue': [
    { name: 'Ricordea Florida Azul (Ricordea florida)', common: 'Ricordea Florida Azul', sci: 'Ricordea florida', isPrimary: true },
    { name: 'Ricordea Florida Teal (Ricordea florida)', common: 'Ricordea Florida Teal', sci: 'Ricordea florida', candidates: ['ricordea-florida-teal.jpg'] }
  ],
  '181_ricordea_yuma_godzilla': [
    { name: 'Ricordea Yuma Godzilla (Ricordea yuma)', common: 'Ricordea Yuma Godzilla', sci: 'Ricordea yuma', isPrimary: true },
    { name: 'Ricordea Yuma King Kong (Ricordea yuma)', common: 'Ricordea Yuma King Kong', sci: 'Ricordea yuma', candidates: ['ricordea-yuma-king-kong.jpg'] }
  ],
  '182_ricordea_yuma_orange_purple': [
    { name: 'Ricordea Yuma Laranja e Roxa (Ricordea yuma)', common: 'Ricordea Yuma Laranja e Roxa', sci: 'Ricordea yuma', isPrimary: true }
  ],
  '184_leather_colt_cladiella': [
    { name: 'Leather Colt (Cladiella sp.)', common: 'Leather Colt', sci: 'Cladiella sp.', isPrimary: true },
    { name: 'Leather Thick Finger (Alcyonium sp.)', common: 'Leather Thick Finger', sci: 'Alcyonium sp.', candidates: ['leather-thick-finger.jpg'] }
  ],
  '185_blue_sympodium': [
    { name: 'Coral Blue Sympodium (Sympodium sp.)', common: 'Coral Blue Sympodium', sci: 'Sympodium sp.', isPrimary: true },
    { name: 'Coral Sansibia Azul (Sansibia sp.)', common: 'Coral Sansibia Azul', sci: 'Sansibia sp.', candidates: ['coral-sansibia.jpg'] }
  ],
  '188_anemona_bta_acid_wash_black_widow': [
    { name: 'Anêmona Bubble Tip Acid Wash (Entacmaea quadricolor var. Acid Wash)', common: 'Anêmona Bubble Tip Acid Wash', sci: 'Entacmaea quadricolor var. Acid Wash', isPrimary: true },
    { name: 'Anêmona Bubble Tip Black Widow (Entacmaea quadricolor var. Black Widow)', common: 'Anêmona Bubble Tip Black Widow', sci: 'Entacmaea quadricolor var. Black Widow', candidates: ['anemona-black-widow.jpg'] }
  ],
  '189_anemona_carpet_haddoni': [
    { name: 'Anêmona Carpet Verde (Stichodactyla haddoni)', common: 'Anêmona Carpet Verde', sci: 'Stichodactyla haddoni', isPrimary: true },
    { name: 'Anêmona Carpet Azul (Stichodactyla haddoni)', common: 'Anêmona Carpet Azul', sci: 'Stichodactyla haddoni', candidates: ['anemona-carpet-azul.jpg'] }
  ],
  '190_anemona_long_tentacle_doreensis': [
    { name: 'Anêmona Long Tentacle LTA (Macrodactyla doreensis)', common: 'Anêmona Long Tentacle LTA', sci: 'Macrodactyla doreensis', isPrimary: true },
    { name: 'Anêmona Condylactis Gigantea (Condylactis gigantea)', common: 'Anêmona Condylactis Gigantea', sci: 'Condylactis gigantea', candidates: ['anemona-condylactis.jpg'] },
    { name: 'Anêmona Sebae (Heteractis crispa)', common: 'Anêmona Sebae', sci: 'Heteractis crispa', candidates: ['anemona-sebae.jpg'] }
  ],
  '191_torch_24k_aussie_gold': [
    { name: 'Coral Torch 24K Gold (Euphyllia glabrescens)', common: 'Coral Torch 24K Gold', sci: 'Euphyllia glabrescens', isPrimary: true },
    { name: 'Coral Torch Aussie Gold (Euphyllia glabrescens)', common: 'Coral Torch Aussie Gold', sci: 'Euphyllia glabrescens', candidates: ['torch-aussie-gold.jpg'] }
  ],
  '192_torch_holy_grail_ny_knicks': [
    { name: 'Coral Torch Holy Grail (Euphyllia glabrescens)', common: 'Coral Torch Holy Grail', sci: 'Euphyllia glabrescens', isPrimary: true },
    { name: 'Coral Torch NY Knicks (Euphyllia glabrescens)', common: 'Coral Torch NY Knicks', sci: 'Euphyllia glabrescens', candidates: ['torch-ny-knicks.jpg'] },
    { name: 'Coral Torch Hellfire (Euphyllia glabrescens)', common: 'Coral Torch Hellfire', sci: 'Euphyllia glabrescens', candidates: ['torch-hellfire.jpg'] }
  ],
  '193_hammer_orange_rose_gold': [
    { name: 'Coral Hammer Laranja (Fimbriaphyllia ancora)', common: 'Coral Hammer Laranja', sci: 'Fimbriaphyllia ancora', isPrimary: true },
    { name: 'Coral Hammer Copper (Fimbriaphyllia ancora)', common: 'Coral Hammer Copper', sci: 'Fimbriaphyllia ancora', candidates: ['hammer-copper.jpg'] },
    { name: 'Coral Hammer Rose Gold (Fimbriaphyllia ancora)', common: 'Coral Hammer Rose Gold', sci: 'Fimbriaphyllia ancora', candidates: ['hammer-rose-gold.jpg'] }
  ],
  '194_hammer_wall_ancora_pink': [
    { name: 'Coral Hammer Wall Rosa (Fimbriaphyllia ancora)', common: 'Coral Hammer Wall Rosa', sci: 'Fimbriaphyllia ancora', isPrimary: true },
    { name: 'Coral Hammer Wall Verde (Fimbriaphyllia ancora)', common: 'Coral Hammer Wall Verde', sci: 'Fimbriaphyllia ancora', candidates: ['hammer-wall-green.jpg'] }
  ],
  '195_hammer_prince_of_darkness_black': [
    { name: 'Coral Hammer Prince of Darkness (Fimbriaphyllia ancora)', common: 'Coral Hammer Prince of Darkness', sci: 'Fimbriaphyllia ancora', isPrimary: true }
  ],
  '196_bubble_coral_plerogyra': [
    { name: 'Coral Bubble Verde (Plerogyra sinuosa)', common: 'Coral Bubble Verde', sci: 'Plerogyra sinuosa', isPrimary: true },
    { name: 'Coral Bubble Branco (Plerogyra sinuosa)', common: 'Coral Bubble Branco', sci: 'Plerogyra sinuosa', candidates: ['coral-bubble-white.jpg'] }
  ],
  '198_plate_coral_fungia_orange': [
    { name: 'Coral Plate Laranja (Cycloseris sp.)', common: 'Coral Plate Laranja', sci: 'Cycloseris sp.', isPrimary: true },
    { name: 'Coral Plate Verde (Fungia repanda)', common: 'Coral Plate Verde', sci: 'Fungia repanda', candidates: ['coral-plate-green.jpg'] }
  ],
  '199_open_brain_trachyphyllia': [
    { name: 'Coral Open Brain Rainbow (Trachyphyllia geoffroyi)', common: 'Coral Open Brain Rainbow', sci: 'Trachyphyllia geoffroyi', isPrimary: true },
    { name: 'Coral Open Brain Verde (Trachyphyllia geoffroyi)', common: 'Coral Open Brain Verde', sci: 'Trachyphyllia geoffroyi', candidates: ['open-brain-green.jpg'] }
  ],
  '203_favites_war_coral': [
    { name: 'Coral War Vermelho e Roxo (Favites pentagona)', common: 'Coral War Vermelho e Roxo', sci: 'Favites pentagona', isPrimary: true }
  ],

  // === FLORA E MACROALGAS (TIER 3) ===
  '301_alga_chaetomorpha_spaghetti': [
    { name: 'Macroalga Chaetomorpha Spaghetti (Chaetomorpha linum)', common: 'Macroalga Chaetomorpha Spaghetti', sci: 'Chaetomorpha linum', isPrimary: true, subCategory: 'PLANT' }
  ],
  '302_alga_atomic_broccoli_gracilaria': [
    { name: 'Macroalga Atomic Broccoli (Gracilaria sp.)', common: 'Macroalga Atomic Broccoli', sci: 'Gracilaria sp.', isPrimary: true, subCategory: 'PLANT' }
  ],
  '303_alga_dragons_breath_halymenia': [
    { name: 'Macroalga Dragon\'s Breath (Halymenia durvillei)', common: 'Macroalga Dragon\'s Breath', sci: 'Halymenia durvillei', isPrimary: true, subCategory: 'PLANT' }
  ],
  '304_alga_pink_dragons_breath_floresia': [
    { name: 'Macroalga Pink Dragon\'s Tongue (Halymenia floresia)', common: 'Macroalga Pink Dragon\'s Tongue', sci: 'Halymenia floresia', isPrimary: true, subCategory: 'PLANT' }
  ],
  '305_alga_pom_pom_gracilaria_hayi': [
    { name: 'Macroalga Red Pom Pom (Gracilaria hayi)', common: 'Macroalga Red Pom Pom', sci: 'Gracilaria hayi', isPrimary: true, subCategory: 'PLANT' }
  ],
  '306_alga_red_ogo_gracilaria_parvispora': [
    { name: 'Macroalga Red Ogo (Gracilaria parvispora)', common: 'Macroalga Red Ogo', sci: 'Gracilaria parvispora', isPrimary: true, subCategory: 'PLANT' }
  ],
  '307_alga_caulerpa_prolifera_seagrass': [
    { name: 'Macroalga Caulerpa Prolifera Folha Lisa (Caulerpa prolifera)', common: 'Macroalga Caulerpa Prolifera Folha Lisa', sci: 'Caulerpa prolifera', isPrimary: true, subCategory: 'PLANT' }
  ],
  '308_alga_caulerpa_sertularioides_feather': [
    { name: 'Macroalga Feather Pena (Caulerpa sertularioides)', common: 'Macroalga Feather Pena', sci: 'Caulerpa sertularioides', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Macroalga Caulerpa Taxifolia (Caulerpa taxifolia)', common: 'Macroalga Caulerpa Taxifolia', sci: 'Caulerpa taxifolia', candidates: ['caulerpa-taxifolia.jpg'], subCategory: 'PLANT' }
  ],
  '309_alga_caulerpa_racemosa_grape': [
    { name: 'Macroalga Grape Uva-do-Mar (Caulerpa racemosa)', common: 'Macroalga Grape Uva-do-Mar', sci: 'Caulerpa racemosa', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Macroalga Caulerpa Lentillifera Caviar Verde (Caulerpa lentillifera)', common: 'Macroalga Caulerpa Lentillifera Caviar Verde', sci: 'Caulerpa lentillifera', candidates: ['caulerpa-lentillifera.jpg'], subCategory: 'PLANT' }
  ],
  '310_alga_halimeda_calcarea_money_plant': [
    { name: 'Macroalga Calcária Halimeda (Halimeda incrassata)', common: 'Macroalga Calcária Halimeda', sci: 'Halimeda incrassata', isPrimary: true, subCategory: 'PLANT' }
  ],
  '311_alga_shaving_brush_mermaids_fan': [
    { name: 'Macroalga Shaving Brush (Penicillus capitatus)', common: 'Macroalga Shaving Brush', sci: 'Penicillus capitatus', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Macroalga Mermaid\'s Fan (Udotea spinulosa)', common: 'Macroalga Mermaid\'s Fan', sci: 'Udotea spinulosa', candidates: ['macroalga-udotea.jpg'], subCategory: 'PLANT' }
  ],
  '314_alga_ulva_sea_lettuce_codium': [
    { name: 'Macroalga Ulva Alface-do-Mar (Ulva lactuca)', common: 'Macroalga Ulva Alface-do-Mar', sci: 'Ulva lactuca', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Macroalga Codium Verde (Codium fragile)', common: 'Macroalga Codium Verde', sci: 'Codium fragile', candidates: ['macroalga-codium.jpg'], subCategory: 'PLANT' }
  ],
  '315_mangue_vermelho_red_mangrove': [
    { name: 'Mangue Vermelho Propágulo (Rhizophora mangle)', common: 'Mangue Vermelho Propágulo', sci: 'Rhizophora mangle', isPrimary: true, subCategory: 'PLANT' }
  ],
  '317_anubias_nana_petite': [
    { name: 'Anubias Nana Petite (Anubias barteri var. nana \'Petite\')', common: 'Anubias Nana Petite', sci: 'Anubias barteri var. nana \'Petite\'', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Anubias Pangolino (Anubias barteri var. nana \'Pangolino\')', common: 'Anubias Pangolino', sci: 'Anubias barteri var. nana \'Pangolino\'', candidates: ['anubias-pangolino.jpg'], subCategory: 'PLANT' }
  ],
  '318_anubias_barteri_broad_leaf_lanceolata': [
    { name: 'Anubias Barteri Broad Leaf (Anubias barteri var. barteri)', common: 'Anubias Barteri Broad Leaf', sci: 'Anubias barteri var. barteri', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Anubias Barteri Coffeefolia (Anubias barteri var. caladiifolia \'Coffeefolia\')', common: 'Anubias Barteri Coffeefolia', sci: 'Anubias barteri var. caladiifolia \'Coffeefolia\'', candidates: ['anubias-coffeefolia.jpg'], subCategory: 'PLANT' },
    { name: 'Anubias Lanceolata (Anubias barteri var. glabra)', common: 'Anubias Lanceolata', sci: 'Anubias barteri var. glabra', candidates: ['anubias-lanceolata.jpg'], subCategory: 'PLANT' }
  ],
  '319_anubias_pinto_white_golden': [
    { name: 'Anubias Nana Pinto Variegada (Anubias barteri var. nana \'Pinto\')', common: 'Anubias Nana Pinto Variegada', sci: 'Anubias barteri var. nana \'Pinto\'', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Anubias Golden Coin (Anubias barteri var. nana \'Golden Coin\')', common: 'Anubias Golden Coin', sci: 'Anubias barteri var. nana \'Golden Coin\'', candidates: ['anubias-golden-coin.jpg'], subCategory: 'PLANT' }
  ],
  '320_microsorum_pteropus_java_fern': [
    { name: 'Samambaia de Java Clássica (Microsorum pteropus)', common: 'Samambaia de Java Clássica', sci: 'Microsorum pteropus', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Samambaia de Java Narrow Leaf (Microsorum pteropus \'Narrow\')', common: 'Samambaia de Java Narrow Leaf', sci: 'Microsorum pteropus \'Narrow\'', candidates: ['microsorum-narrow-leaf.jpg'], subCategory: 'PLANT' }
  ],
  '321_microsorum_windelov_trident': [
    { name: 'Microsorum Windelov (Microsorum pteropus \'Windelov\')', common: 'Microsorum Windelov', sci: 'Microsorum pteropus \'Windelov\'', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Microsorum Trident (Microsorum pteropus \'Trident\')', common: 'Microsorum Trident', sci: 'Microsorum pteropus \'Trident\'', candidates: ['microsorum-trident.jpg'], subCategory: 'PLANT' }
  ],
  '322_bucephalandra_wavy_green_kedagang': [
    { name: 'Bucephalandra Green Wavy (Bucephalandra pygmaea \'Wavy Green\')', common: 'Bucephalandra Green Wavy', sci: 'Bucephalandra pygmaea \'Wavy Green\'', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Bucephalandra Godzilla (Bucephalandra sp. \'Godzilla\')', common: 'Bucephalandra Godzilla', sci: 'Bucephalandra sp. \'Godzilla\'', candidates: ['bucephalandra-godzilla.jpg'], subCategory: 'PLANT' }
  ],
  '323_bucephalandra_brownie_ghost_red_mini': [
    { name: 'Bucephalandra Brownie Ghost (Bucephalandra sp. \'Brownie Ghost\')', common: 'Bucephalandra Brownie Ghost', sci: 'Bucephalandra sp. \'Brownie Ghost\'', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Bucephalandra Red Mini (Bucephalandra sp. \'Red Mini\')', common: 'Bucephalandra Red Mini', sci: 'Bucephalandra sp. \'Red Mini\'', candidates: ['bucephalandra-red-mini.jpg'], subCategory: 'PLANT' }
  ],
  '324_bolbitis_heudelotii_pinnatifida': [
    { name: 'Samambaia do Congo Bolbitis (Bolbitis heudelotii)', common: 'Samambaia do Congo Bolbitis', sci: 'Bolbitis heudelotii', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Hygrophila Pinnatifida (Hygrophila pinnatifida)', common: 'Hygrophila Pinnatifida', sci: 'Hygrophila pinnatifida', candidates: ['hygrophila-pinnatifida.jpg'], subCategory: 'PLANT' }
  ],
  '325_musgo_de_java_christmas_flame_marimo': [
    { name: 'Musgo de Java (Taxiphyllum barbieri)', common: 'Musgo de Java', sci: 'Taxiphyllum barbieri', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Musgo Christmas Moss (Vesicularia montagnei)', common: 'Musgo Christmas Moss', sci: 'Vesicularia montagnei', candidates: ['musgo-christmas.jpg'], subCategory: 'PLANT' },
    { name: 'Musgo Flame Moss (Taxiphyllum alternans)', common: 'Musgo Flame Moss', sci: 'Taxiphyllum alternans', candidates: ['musgo-flame.jpg'], subCategory: 'PLANT' },
    { name: 'Marimo Ball Alga Musgo (Aegagropila linnaei)', common: 'Marimo Ball Alga Musgo', sci: 'Aegagropila linnaei', candidates: ['marimo-moss-ball.jpg'], subCategory: 'PLANT' }
  ],
  '326_elodea_egeria_densa_anacharis': [
    { name: 'Elódea Comum Anacharis (Egeria densa)', common: 'Elódea Comum Anacharis', sci: 'Egeria densa', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Elódea Najas (Egeria najas)', common: 'Elódea Najas', sci: 'Egeria najas', candidates: ['elodea-najas.jpg'], subCategory: 'PLANT' }
  ],
  '327_cabomba_verde_aquatica_furcata': [
    { name: 'Cabomba Verde (Cabomba caroliniana)', common: 'Cabomba Verde', sci: 'Cabomba caroliniana', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Cabomba Vermelha Furcata (Cabomba furcata)', common: 'Cabomba Vermelha Furcata', sci: 'Cabomba furcata', candidates: ['cabomba-vermelha.jpg'], subCategory: 'PLANT' }
  ],
  '328_rabo_de_raposa_ceratophyllum_demersum': [
    { name: 'Rabo-de-Raposa Coontail (Ceratophyllum demersum)', common: 'Rabo-de-Raposa Coontail', sci: 'Ceratophyllum demersum', isPrimary: true, subCategory: 'PLANT' }
  ],
  '329_ambulia_limnophila_sessiliflora_myriophyllum': [
    { name: 'Ambulia Sessiliflora (Limnophila sessiliflora)', common: 'Ambulia Sessiliflora', sci: 'Limnophila sessiliflora', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Mil-Folhas Verde (Myriophyllum aquaticum)', common: 'Mil-Folhas Verde', sci: 'Myriophyllum aquaticum', candidates: ['mil-folhas-verde.jpg'], subCategory: 'PLANT' }
  ],
  '330_hygrophila_polysperma_rosanervig_sunset': [
    { name: 'Hygrophila Polysperma Comum (Hygrophila polysperma)', common: 'Hygrophila Polysperma Comum', sci: 'Hygrophila polysperma', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Hygrophila Polysperma Rosanervig Sunset (Hygrophila polysperma \'Rosanervig\')', common: 'Hygrophila Polysperma Rosanervig Sunset', sci: 'Hygrophila polysperma \'Rosanervig\'', candidates: ['hygrophila-sunset.jpg'], subCategory: 'PLANT' }
  ],
  '331_hygrophila_corymbosa_rio_siamensis': [
    { name: 'Hygrophila Corymbosa Rio (Hygrophila corymbosa)', common: 'Hygrophila Corymbosa Rio', sci: 'Hygrophila corymbosa', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Hygrophila Corymbosa Compacta (Hygrophila corymbosa \'Compact\')', common: 'Hygrophila Corymbosa Compacta', sci: 'Hygrophila corymbosa \'Compact\'', candidates: ['hygrophila-corymbosa-compacta.jpg'], subCategory: 'PLANT' }
  ],
  '332_hygrophila_difformis_sinema_samambaia': [
    { name: 'Hygrophila Difformis Sinema (Hygrophila difformis)', common: 'Hygrophila Difformis Sinema', sci: 'Hygrophila difformis', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Samambaia d\'Água Ceratopteris (Ceratopteris thalictroides)', common: 'Samambaia d\'Água Ceratopteris', sci: 'Ceratopteris thalictroides', candidates: ['ceratopteris-thalictroides.jpg'], subCategory: 'PLANT' }
  ],
  '333_bacopa_caroliniana_monnieri': [
    { name: 'Bacopa Caroliniana (Bacopa caroliniana)', common: 'Bacopa Caroliniana', sci: 'Bacopa caroliniana', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Bacopa Monnieri Moneywort (Bacopa monnieri)', common: 'Bacopa Monnieri Moneywort', sci: 'Bacopa monnieri', candidates: ['bacopa-monnieri.jpg'], subCategory: 'PLANT' }
  ],
  '334_rotala_rotundifolia_red_hra_blood_red': [
    { name: 'Rotala Rotundifolia Red (Rotala rotundifolia \'Red\')', common: 'Rotala Rotundifolia Red', sci: 'Rotala rotundifolia \'Red\'', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Rotala Rotundifolia H\'ra (Rotala rotundifolia \'H\\\'ra\')', common: 'Rotala Rotundifolia H\'ra', sci: 'Rotala rotundifolia \'H\\\'ra\'', candidates: ['rotala-hra.jpg'], subCategory: 'PLANT' },
    { name: 'Rotala Blood Red (Rotala rotundifolia \'Blood Red\')', common: 'Rotala Blood Red', sci: 'Rotala rotundifolia \'Blood Red\'', candidates: ['rotala-blood-red.jpg'], subCategory: 'PLANT' }
  ],
  '335_rotala_green_indica_bonsai_wallichii': [
    { name: 'Rotala Green (Rotala rotundifolia \'Green\')', common: 'Rotala Green', sci: 'Rotala rotundifolia \'Green\'', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Rotala Bonsai (Ammannia gracilis \'Bonsai\')', common: 'Rotala Bonsai', sci: 'Ammannia gracilis \'Bonsai\'', candidates: ['rotala-bonsai.jpg'], subCategory: 'PLANT' },
    { name: 'Rotala Wallichii Vermelha (Rotala wallichii)', common: 'Rotala Wallichii Vermelha', sci: 'Rotala wallichii', candidates: ['rotala-wallichii.jpg'], subCategory: 'PLANT' }
  ],
  '336_ludwigia_sp_super_red_repens_rubin': [
    { name: 'Ludwigia Super Red Mini (Ludwigia palustris \'Super Red\')', common: 'Ludwigia Super Red Mini', sci: 'Ludwigia palustris \'Super Red\'', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Ludwigia Repens Rubin (Ludwigia repens \'Rubin\')', common: 'Ludwigia Repens Rubin', sci: 'Ludwigia repens \'Rubin\'', candidates: ['ludwigia-rubin.jpg'], subCategory: 'PLANT' },
    { name: 'Ludwigia Glandulosa (Ludwigia glandulosa)', common: 'Ludwigia Glandulosa', sci: 'Ludwigia glandulosa', candidates: ['ludwigia-glandulosa.jpg'], subCategory: 'PLANT' }
  ],
  '338_echinodorus_amazonense_bleheri': [
    { name: 'Planta Amazonense Clássica (Echinodorus bleheri)', common: 'Planta Amazonense Clássica', sci: 'Echinodorus bleheri', isPrimary: true, subCategory: 'PLANT' }
  ],
  '339_echinodorus_ozelot_red_rubin_reni': [
    { name: 'Echinodorus Ozelot Red (Echinodorus \'Ozelot Red\')', common: 'Echinodorus Ozelot Red', sci: 'Echinodorus \'Ozelot Red\'', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Echinodorus Rubin (Echinodorus \'Rubin\')', common: 'Echinodorus Rubin', sci: 'Echinodorus \'Rubin\'', candidates: ['echinodorus-rubin.jpg'], subCategory: 'PLANT' },
    { name: 'Echinodorus Reni (Echinodorus \'Reni\')', common: 'Echinodorus Reni', sci: 'Echinodorus \'Reni\'', candidates: ['echinodorus-reni.jpg'], subCategory: 'PLANT' }
  ],
  '340_echinodorus_tenellus_helanthium_amano': [
    { name: 'Echinodorus Tenellus Comum (Helanthium tenellum)', common: 'Echinodorus Tenellus Comum', sci: 'Helanthium tenellum', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Echinodorus Tenellus Amano Red (Helanthium tenellum \'Red\')', common: 'Echinodorus Tenellus Amano Red', sci: 'Helanthium tenellum \'Red\'', candidates: ['echinodorus-tenellus-amano.jpg'], subCategory: 'PLANT' }
  ],
  '341_vallisneria_americana_gigantea_nana': [
    { name: 'Vallisneria Gigantea Americana (Vallisneria americana)', common: 'Vallisneria Gigantea Americana', sci: 'Vallisneria americana', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Vallisneria Nana Australiana (Vallisneria nana)', common: 'Vallisneria Nana Australiana', sci: 'Vallisneria nana', candidates: ['vallisneria-nana.jpg'], subCategory: 'PLANT' }
  ],
  '342_vallisneria_spiralis_corkscrew_saca_rolha': [
    { name: 'Vallisneria Saca-Rolhas Spiralis (Vallisneria spiralis \'Tortifolia\')', common: 'Vallisneria Saca-Rolhas Spiralis', sci: 'Vallisneria spiralis \'Tortifolia\'', isPrimary: true, subCategory: 'PLANT' }
  ],
  '343_sagittaria_subulata_blyxa_japonica': [
    { name: 'Sagittaria Subulata Anã (Sagittaria subulata)', common: 'Sagittaria Subulata Anã', sci: 'Sagittaria subulata', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Blyxa Japonica (Blyxa japonica)', common: 'Blyxa Japonica', sci: 'Blyxa japonica', candidates: ['blyxa-japonica.jpg'], subCategory: 'PLANT' }
  ],
  '344_cryptocoryne_wendtii_brown_tropica_beckettii': [
    { name: 'Cryptocoryne Wendtii Brown (Cryptocoryne wendtii \'Brown\')', common: 'Cryptocoryne Wendtii Brown', sci: 'Cryptocoryne wendtii \'Brown\'', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Cryptocoryne Beckettii Petchii (Cryptocoryne beckettii)', common: 'Cryptocoryne Beckettii Petchii', sci: 'Cryptocoryne beckettii', candidates: ['cryptocoryne-beckettii.jpg'], subCategory: 'PLANT' }
  ],
  '345_cryptocoryne_wendtii_green_parva_balansae': [
    { name: 'Cryptocoryne Wendtii Green (Cryptocoryne wendtii \'Green\')', common: 'Cryptocoryne Wendtii Green', sci: 'Cryptocoryne wendtii \'Green\'', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Cryptocoryne Parva Mini (Cryptocoryne parva)', common: 'Cryptocoryne Parva Mini', sci: 'Cryptocoryne parva', candidates: ['cryptocoryne-parva.jpg'], subCategory: 'PLANT' },
    { name: 'Cryptocoryne Balansae Crispatula (Cryptocoryne crispatula var. balansae)', common: 'Cryptocoryne Balansae Crispatula', sci: 'Cryptocoryne crispatula var. balansae', candidates: ['cryptocoryne-balansae.jpg'], subCategory: 'PLANT' }
  ],
  '346_cryptocoryne_pink_flamingo_panther': [
    { name: 'Cryptocoryne Pink Flamingo (Cryptocoryne wendtii \'Pink Flamingo\')', common: 'Cryptocoryne Pink Flamingo', sci: 'Cryptocoryne wendtii \'Pink Flamingo\'', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Cryptocoryne Pink Panther (Cryptocoryne spiralis \'Pink Panther\')', common: 'Cryptocoryne Pink Panther', sci: 'Cryptocoryne spiralis \'Pink Panther\'', candidates: ['cryptocoryne-pink-panther.jpg'], subCategory: 'PLANT' }
  ],
  '347_nymphaea_rubra_red_tiger_lotus_aponogeton': [
    { name: 'Nymphaea Rubra Red Tiger Lotus (Nymphaea zenkeri)', common: 'Nymphaea Rubra Red Tiger Lotus', sci: 'Nymphaea zenkeri', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Crinum Calamistratum Ondulada (Crinum calamistratum)', common: 'Crinum Calamistratum Ondulada', sci: 'Crinum calamistratum', candidates: ['crinum-calamistratum.jpg'], subCategory: 'PLANT' }
  ],
  '349_hemianthus_cuba_hc_glossostigma': [
    { name: 'Carpete Cuba HC (Hemianthus callitrichoides)', common: 'Carpete Cuba HC', sci: 'Hemianthus callitrichoides', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Carpete Glossostigma Elatinoides (Glossostigma elatinoides)', common: 'Carpete Glossostigma Elatinoides', sci: 'Glossostigma elatinoides', candidates: ['glossostigma-elatinoides.jpg'], subCategory: 'PLANT' }
  ],
  '350_eleocharis_minima_parvula_hairgrass': [
    { name: 'Carpete Eleocharis Minima (Eleocharis minima)', common: 'Carpete Eleocharis Minima', sci: 'Eleocharis minima', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Carpete Eleocharis Vivipara (Eleocharis vivipara)', common: 'Carpete Eleocharis Vivipara', sci: 'Eleocharis vivipara', candidates: ['eleocharis-vivipara.jpg'], subCategory: 'PLANT' }
  ],
  '351_staurogyne_repens_pogostemon_helferi': [
    { name: 'Staurogyne Repens Rasteira (Staurogyne repens)', common: 'Staurogyne Repens Rasteira', sci: 'Staurogyne repens', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Pogostemon Helferi Downoi (Pogostemon helferi)', common: 'Pogostemon Helferi Downoi', sci: 'Pogostemon helferi', candidates: ['pogostemon-helferi.jpg'], subCategory: 'PLANT' }
  ],
  '352_hydrocotyle_tripartita_japan_leucocephala': [
    { name: 'Hydrocotyle Tripartita Trevo Japonês (Hydrocotyle tripartita)', common: 'Hydrocotyle Tripartita Trevo Japonês', sci: 'Hydrocotyle tripartita', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Hydrocotyle Leucocephala Trevo Redondo (Hydrocotyle leucocephala)', common: 'Hydrocotyle Leucocephala Trevo Redondo', sci: 'Hydrocotyle leucocephala', candidates: ['hydrocotyle-leucocephala.jpg'], subCategory: 'PLANT' }
  ],
  '353_lilaeopsis_brasiliensis_marsilea_hirsuta': [
    { name: 'Grama Brasileira Lilaeopsis (Lilaeopsis brasiliensis)', common: 'Grama Brasileira Lilaeopsis', sci: 'Lilaeopsis brasiliensis', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Marsilea Hirsuta Trevo Quatro Folhas (Marsilea hirsuta)', common: 'Marsilea Hirsuta Trevo Quatro Folhas', sci: 'Marsilea hirsuta', candidates: ['marsilea-hirsuta.jpg'], subCategory: 'PLANT' }
  ],
  '354_lobelia_cardinalis_mini': [
    { name: 'Lobelia Cardinalis Comum (Lobelia cardinalis)', common: 'Lobelia Cardinalis Comum', sci: 'Lobelia cardinalis', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Lobelia Cardinalis Mini (Lobelia cardinalis \'Mini\')', common: 'Lobelia Cardinalis Mini', sci: 'Lobelia cardinalis \'Mini\'', candidates: ['lobelia-cardinalis-mini.jpg'], subCategory: 'PLANT' }
  ],
  '355_lagenandra_meeboldii_red_keralensis': [
    { name: 'Lagenandra Meeboldii Red (Lagenandra meeboldii \'Red\')', common: 'Lagenandra Meeboldii Red', sci: 'Lagenandra meeboldii \'Red\'', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Lagenandra Keralensis (Lagenandra keralensis)', common: 'Lagenandra Keralensis', sci: 'Lagenandra keralensis', candidates: ['lagenandra-keralensis.jpg'], subCategory: 'PLANT' }
  ],
  '356_salvinia_auriculata_cucullata_minima': [
    { name: 'Planta Flutuante Salvínia Comum (Salvinia auriculata)', common: 'Planta Flutuante Salvínia Comum', sci: 'Salvinia auriculata', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Planta Flutuante Salvínia Orelha-de-Onça (Salvinia cucullata)', common: 'Planta Flutuante Salvínia Orelha-de-Onça', sci: 'Salvinia cucullata', candidates: ['salvinia-cucullata.jpg'], subCategory: 'PLANT' }
  ],
  '357_pistia_stratiotes_alface_dagua_aguape': [
    { name: 'Alface d\'Água Anã (Pistia stratiotes)', common: 'Alface d\'Água Anã', sci: 'Pistia stratiotes', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Aguapé Flutuante (Eichhornia crassipes)', common: 'Aguapé Flutuante', sci: 'Eichhornia crassipes', candidates: ['aguape-eichhornia.jpg'], subCategory: 'PLANT' }
  ],
  '358_phyllanthus_fluitans_red_root_floater': [
    { name: 'Phyllanthus Fluitans Flutuante Vermelha (Phyllanthus fluitans)', common: 'Phyllanthus Fluitans Flutuante Vermelha', sci: 'Phyllanthus fluitans', isPrimary: true, subCategory: 'PLANT' }
  ],
  '359_limnobium_laevigatum_amazon_frogbit': [
    { name: 'Amazon Frogbit (Limnobium laevigatum)', common: 'Amazon Frogbit', sci: 'Limnobium laevigatum', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Amor-de-Peixe Hydrocleys (Hydrocleys nymphoides)', common: 'Amor-de-Peixe Hydrocleys', sci: 'Hydrocleys nymphoides', candidates: ['hydrocleys-nymphoides.jpg'], subCategory: 'PLANT' }
  ],
  '360_lemna_minor_lentilha_dagua_azolla': [
    { name: 'Lentilha d\'Água (Lemna minor)', common: 'Lentilha d\'Água', sci: 'Lemna minor', isPrimary: true, subCategory: 'PLANT' },
    { name: 'Azolla Flutuante Vermelha (Azolla caroliniana)', common: 'Azolla Flutuante Vermelha', sci: 'Azolla caroliniana', candidates: ['azolla-caroliniana.jpg'], subCategory: 'PLANT' }
  ]
};

const file = path.resolve(__dirname, 'build_curated_catalog.js');
let content = fs.readFileSync(file, 'utf8');

const marker = "    { name: 'Caramujo Coelho Rabbit Laranja (Tylomelania sp.)', common: 'Caramujo Coelho Rabbit Laranja', sci: 'Tylomelania sp.', candidates: ['caramujo-rabbit.jpg'], subCategory: 'FRESHWATER_INVERTEBRATE' }\n  ]\n};";

if (!content.includes(marker)) {
  console.error('Marker not found!');
  process.exit(1);
}

const serialized = Object.entries(additionalCombos).map(([k, v]) => {
  return '  \'' + k + '\': ' + JSON.stringify(v, null, 4).replace(/\n/g, '\n  ');
}).join(',\n');

const replacement = "    { name: 'Caramujo Coelho Rabbit Laranja (Tylomelania sp.)', common: 'Caramujo Coelho Rabbit Laranja', sci: 'Tylomelania sp.', candidates: ['caramujo-rabbit.jpg'], subCategory: 'FRESHWATER_INVERTEBRATE' }\n  ],\n" + serialized + "\n};";

const newContent = content.replace(marker, replacement);
fs.writeFileSync(file, newContent, 'utf8');
console.log('Successfully updated scripts/build_curated_catalog.js with all 83 missing combo mappings!');
