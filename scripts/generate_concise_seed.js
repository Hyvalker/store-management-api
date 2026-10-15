const fs = require('fs');
const path = require('path');

const animalsDir = path.resolve(__dirname, '../frontend/store-management-web/public/images/animals');
const diskFiles = new Set(fs.readdirSync(animalsDir));

// 1. Curated List of ~120 products matching user proportions (15-30 per group)
const productsData = [
  // === PEIXES MARINHOS (22) ===
  { id: 1, name: 'Peixe-palhaço Comum (Amphiprion ocellaris)', cost: 45.0, margin: 70.0, price: 76.5, qty: 24, type: 'LIVING', sub: 'MARINE_FISH', img: '069_ocellaris_comum.webp' },
  { id: 2, name: 'Peixe-palhaço Darwin Black (Amphiprion ocellaris)', cost: 65.0, margin: 80.0, price: 117.0, qty: 12, type: 'LIVING', sub: 'MARINE_FISH', img: '070_ocellaris_black_darwin.webp' },
  { id: 3, name: 'Peixe-palhaço Snowflake (Amphiprion ocellaris)', cost: 85.0, margin: 90.0, price: 161.5, qty: 8, type: 'LIVING', sub: 'MARINE_FISH', img: '071_ocellaris_snowflake.jpg' },
  { id: 4, name: 'Peixe-palhaço Black Snowflake (Amphiprion ocellaris)', cost: 110.0, margin: 90.0, price: 209.0, qty: 6, type: 'LIVING', sub: 'MARINE_FISH', img: '072_ocellaris_black_snowflake.png' },
  { id: 5, name: 'Peixe-palhaço Picasso (Amphiprion percula)', cost: 110.0, margin: 95.0, price: 214.5, qty: 6, type: 'LIVING', sub: 'MARINE_FISH', img: '073_ocellaris_picasso_davinci.jpg' },
  { id: 6, name: 'Peixe-palhaço Frostbite (Amphiprion ocellaris)', cost: 130.0, margin: 85.0, price: 240.5, qty: 5, type: 'LIVING', sub: 'MARINE_FISH', img: '074_ocellaris_frostbite_flurry.jpg' },
  { id: 7, name: 'Peixe-palhaço Orange Storm (Amphiprion ocellaris)', cost: 220.0, margin: 90.0, price: 418.0, qty: 4, type: 'LIVING', sub: 'MARINE_FISH', img: '075_ocellaris_storm.webp' },
  { id: 8, name: 'Peixe-palhaço Maroon (Premnas biaculeatus)', cost: 70.0, margin: 95.0, price: 136.5, qty: 7, type: 'LIVING', sub: 'MARINE_FISH', img: null },
  { id: 9, name: 'Blue Tang (Paracanthurus hepatus)', cost: 280.0, margin: 70.0, price: 476.0, qty: 8, type: 'LIVING', sub: 'MARINE_FISH', img: '076_blue_tang_hepatus.webp' },
  { id: 10, name: 'Yellow Tang (Zebrasoma flavescens)', cost: 650.0, margin: 70.0, price: 1105.0, qty: 4, type: 'LIVING', sub: 'MARINE_FISH', img: '077_yellow_tang.webp' },
  { id: 11, name: 'Sailfin Tang (Zebrasoma veliferum)', cost: 180.0, margin: 85.0, price: 333.0, qty: 5, type: 'LIVING', sub: 'MARINE_FISH', img: '078_sailfin_scopas_tang.webp' },
  { id: 12, name: 'Powder Blue Tang (Acanthurus leucosternon)', cost: 420.0, margin: 85.0, price: 777.0, qty: 4, type: 'LIVING', sub: 'MARINE_FISH', img: '079_powder_blue_naso_tang.webp' },
  { id: 13, name: 'Purple Tang (Zebrasoma xanthurum)', cost: 850.0, margin: 75.0, price: 1487.5, qty: 3, type: 'LIVING', sub: 'MARINE_FISH', img: '226_purple_tang_xanthurum.jpg' },
  { id: 14, name: 'Anjo Coral Beauty (Centropyge bispinosa)', cost: 130.0, margin: 80.0, price: 234.0, qty: 6, type: 'LIVING', sub: 'MARINE_FISH', img: '080_flame_angel_coral_beauty.webp' },
  { id: 15, name: 'Flame Angel (Centropyge loricula)', cost: 450.0, margin: 75.0, price: 787.5, qty: 3, type: 'LIVING', sub: 'MARINE_FISH', img: null },
  { id: 16, name: 'Gramma Loreto (Gramma loreto)', cost: 110.0, margin: 70.0, price: 187.0, qty: 10, type: 'LIVING', sub: 'MARINE_FISH', img: '081_gramma_loreto_royal_dottyback.webp' },
  { id: 17, name: 'Foxface Amarelo (Siganus vulpinus)', cost: 140.0, margin: 85.0, price: 259.0, qty: 5, type: 'LIVING', sub: 'MARINE_FISH', img: '084_foxface_rabbitfish.webp' },
  { id: 18, name: 'Goby Yellow Watchman (Cryptocentrus cinctus)', cost: 60.0, margin: 95.0, price: 117.0, qty: 8, type: 'LIVING', sub: 'MARINE_FISH', img: '085_gobies_blennies_watchman.webp' },
  { id: 19, name: 'Blênio Bicolor (Ecsenius bicolor)', cost: 65.0, margin: 90.0, price: 123.5, qty: 8, type: 'LIVING', sub: 'MARINE_FISH', img: null },
  { id: 20, name: 'Firefish Magnífico (Nemateleotris magnifica)', cost: 55.0, margin: 90.0, price: 104.5, qty: 10, type: 'LIVING', sub: 'MARINE_FISH', img: '086_firefish_magnifico_purple.webp' },
  { id: 21, name: 'Firefish Purple (Nemateleotris decora)', cost: 90.0, margin: 90.0, price: 171.0, qty: 6, type: 'LIVING', sub: 'MARINE_FISH', img: null },
  { id: 22, name: 'Green Chromis (Chromis viridis)', cost: 18.0, margin: 110.0, price: 37.8, qty: 25, type: 'LIVING', sub: 'MARINE_FISH', img: null },

  // === CORAIS & ANÊMONAS (24) ===
  { id: 23, name: 'Zoanthus Sunny Day (Zoanthus sp.)', cost: 48.0, margin: 95.0, price: 93.6, qty: 7, type: 'LIVING', sub: 'CORAL', img: '001_zoanthus_sunny_day.jpg' },
  { id: 24, name: 'Zoanthus Rasta (Zoanthus sp.)', cost: 45.0, margin: 110.0, price: 94.5, qty: 10, type: 'LIVING', sub: 'CORAL', img: '002_zoanthus_rasta.jpg' },
  { id: 25, name: 'Zoanthus Watermelon (Zoanthus sp.)', cost: 40.0, margin: 100.0, price: 80.0, qty: 12, type: 'LIVING', sub: 'CORAL', img: '003_zoanthus_watermelon.webp' },
  { id: 26, name: 'Zoanthus Eagle Eye (Zoanthus sp.)', cost: 42.0, margin: 100.0, price: 84.0, qty: 10, type: 'LIVING', sub: 'CORAL', img: '004_zoanthus_eagle_eye.jpg' },
  { id: 27, name: 'Zoanthus Radioactive Green (Zoanthus sp.)', cost: 38.0, margin: 105.0, price: 77.9, qty: 12, type: 'LIVING', sub: 'CORAL', img: '005_zoanthus_radioactive_green.jpg' },
  { id: 28, name: 'Zoanthus Bam Bam (Zoanthus sp.)', cost: 50.0, margin: 98.0, price: 99.0, qty: 8, type: 'LIVING', sub: 'CORAL', img: '006_zoanthus_bam_bam.jpg' },
  { id: 29, name: 'Zoanthus Fruit Loops (Zoanthus sp.)', cost: 65.0, margin: 100.0, price: 130.0, qty: 5, type: 'LIVING', sub: 'CORAL', img: '007_zoanthus_fruit_loops.jpg' },
  { id: 30, name: 'Zoanthus Blue Hornet (Zoanthus sp.)', cost: 80.0, margin: 100.0, price: 160.0, qty: 4, type: 'LIVING', sub: 'CORAL', img: '010_zoanthus_blue_hornet.jpg' },
  { id: 31, name: 'Zoanthus Scrambled Eggs (Zoanthus sp.)', cost: 55.0, margin: 100.0, price: 110.0, qty: 9, type: 'LIVING', sub: 'CORAL', img: '014_zoanthus_scrambled_eggs.webp' },
  { id: 32, name: 'Palythoa Utter Chaos (Palythoa sp.)', cost: 75.0, margin: 95.0, price: 146.25, qty: 6, type: 'LIVING', sub: 'CORAL', img: '016_palythoa_utter_chaos.jpg' },
  { id: 33, name: 'Palythoa Captain America (Palythoa sp.)', cost: 65.0, margin: 105.0, price: 133.25, qty: 6, type: 'LIVING', sub: 'CORAL', img: '018_palythoa_captain_america.webp' },
  { id: 34, name: 'Mushroom Discosoma Superman (Discosoma sp.)', cost: 70.0, margin: 105.0, price: 143.5, qty: 8, type: 'LIVING', sub: 'CORAL', img: '022_mushroom_discosoma_superman.jpg' },
  { id: 35, name: 'Mushroom Rhodactis Green Hairy (Rhodactis sp.)', cost: 50.0, margin: 100.0, price: 100.0, qty: 8, type: 'LIVING', sub: 'CORAL', img: '025_rhodactis_green_hairy.webp' },
  { id: 36, name: 'Ricordea Florida Verde (Ricordea florida)', cost: 60.0, margin: 100.0, price: 120.0, qty: 7, type: 'LIVING', sub: 'CORAL', img: '031_ricordea_florida_green.jpg' },
  { id: 37, name: 'Ricordea Florida Azul (Ricordea florida)', cost: 85.0, margin: 100.0, price: 170.0, qty: 5, type: 'LIVING', sub: 'CORAL', img: '180_ricordea_florida_blue.jpg' },
  { id: 38, name: 'Green Star Polyps Metallic (Pachyclavularia violacea)', cost: 35.0, margin: 115.0, price: 75.25, qty: 15, type: 'LIVING', sub: 'CORAL', img: '034_green_star_polyps_gsp.jpg' },
  { id: 39, name: 'Leather Umbrella (Sarcophyton sp.)', cost: 55.0, margin: 105.0, price: 112.75, qty: 7, type: 'LIVING', sub: 'CORAL', img: '035_leather_toadstool.webp' },
  { id: 40, name: 'Leather Devil\'s Hand (Lobophytum sp.)', cost: 60.0, margin: 105.0, price: 123.0, qty: 6, type: 'LIVING', sub: 'CORAL', img: '036_leather_devils_hand.webp' },
  { id: 41, name: 'Anêmona Bubble Tip Rose (Entacmaea quadricolor)', cost: 150.0, margin: 85.0, price: 277.5, qty: 5, type: 'LIVING', sub: 'CORAL', img: '041_anemona_bta_rose_rainbow.webp' },
  { id: 42, name: 'Hammer Bicolor (Fimbriaphyllia ancora)', cost: 90.0, margin: 80.0, price: 162.0, qty: 7, type: 'LIVING', sub: 'CORAL', img: '043_hammer_bicolor.jpg' },
  { id: 43, name: 'Hammer Gold (Fimbriaphyllia ancora)', cost: 180.0, margin: 80.0, price: 324.0, qty: 4, type: 'LIVING', sub: 'CORAL', img: '046_hammer_gold_yellow.jpg' },
  { id: 44, name: 'Frogspawn Verde Ponta Roxa (Fimbriaphyllia divisa)', cost: 95.0, margin: 80.0, price: 171.0, qty: 6, type: 'LIVING', sub: 'CORAL', img: '047_frogspawn_bicolor.jpg' },
  { id: 45, name: 'Torch Green Tip (Euphyllia glabrescens)', cost: 140.0, margin: 80.0, price: 252.0, qty: 5, type: 'LIVING', sub: 'CORAL', img: '049_torch_green_tip.webp' },
  { id: 46, name: 'Trumpet Kryptonita (Caulastrea sp.)', cost: 50.0, margin: 100.0, price: 100.0, qty: 9, type: 'LIVING', sub: 'CORAL', img: '053_trumpet_kryptonita.webp' },

  // === INVERTEBRADOS MARINHOS & ÁGUA DOCE (18) ===
  { id: 47, name: 'Camarão Bailarino (Lysmata wurdemanni)', cost: 25.0, margin: 100.0, price: 50.0, qty: 15, type: 'LIVING', sub: 'MARINE_INVERTEBRATE', img: '096_camarao_bailarino_cleaner.webp' },
  { id: 48, name: 'Camarão Skunk Cleaner (Lysmata amboinensis)', cost: 65.0, margin: 90.0, price: 123.5, qty: 14, type: 'LIVING', sub: 'MARINE_INVERTEBRATE', img: null },
  { id: 49, name: 'Camarão Stenopus Bandado (Stenopus hispidus)', cost: 45.0, margin: 100.0, price: 90.0, qty: 12, type: 'LIVING', sub: 'MARINE_INVERTEBRATE', img: null },
  { id: 50, name: 'Paguro de Patas Amarelas (Clibanarius antillensis)', cost: 3.5, margin: 130.0, price: 8.0, qty: 60, type: 'LIVING', sub: 'MARINE_INVERTEBRATE', img: null },
  { id: 51, name: 'Paguro Patas Azuis (Calcinus elegans)', cost: 14.0, margin: 115.0, price: 30.1, qty: 25, type: 'LIVING', sub: 'MARINE_INVERTEBRATE', img: null },
  { id: 52, name: 'Turbo Snail (Turbo fluctuosus)', cost: 4.5, margin: 120.0, price: 9.9, qty: 50, type: 'LIVING', sub: 'MARINE_INVERTEBRATE', img: null },
  { id: 53, name: 'Strombus Snail (Strombus alatus)', cost: 18.0, margin: 110.0, price: 37.8, qty: 18, type: 'LIVING', sub: 'MARINE_INVERTEBRATE', img: null },
  { id: 54, name: 'Nassarius Snail (Nassarius sp.)', cost: 6.0, margin: 130.0, price: 13.8, qty: 35, type: 'LIVING', sub: 'MARINE_INVERTEBRATE', img: null },
  { id: 55, name: 'Ouriço Tuxedo (Mespilia globulus)', cost: 42.0, margin: 110.0, price: 88.2, qty: 10, type: 'LIVING', sub: 'MARINE_INVERTEBRATE', img: null },
  { id: 56, name: 'Caranguejo Mithrax Esmeralda (Mithraculus sculptus)', cost: 35.0, margin: 110.0, price: 73.5, qty: 12, type: 'LIVING', sub: 'MARINE_INVERTEBRATE', img: null },
  { id: 57, name: 'Camarão Neocaridina Red Cherry (Neocaridina davidi)', cost: 4.0, margin: 150.0, price: 10.0, qty: 45, type: 'LIVING', sub: 'FRESHWATER_INVERTEBRATE', img: '149_camarao_red_cherry_neocaridina.webp' },
  { id: 58, name: 'Camarão Neocaridina Blue Dream (Neocaridina davidi)', cost: 8.0, margin: 125.0, price: 18.0, qty: 30, type: 'LIVING', sub: 'FRESHWATER_INVERTEBRATE', img: null },
  { id: 59, name: 'Camarão Neocaridina Yellow (Neocaridina davidi)', cost: 7.0, margin: 130.0, price: 16.1, qty: 25, type: 'LIVING', sub: 'FRESHWATER_INVERTEBRATE', img: null },
  { id: 60, name: 'Camarão Amano (Caridina multidentata)', cost: 10.0, margin: 120.0, price: 22.0, qty: 30, type: 'LIVING', sub: 'FRESHWATER_INVERTEBRATE', img: null },
  { id: 61, name: 'Camarão Fantasma Nacional (Palaemonetes argentinus)', cost: 2.0, margin: 200.0, price: 6.0, qty: 50, type: 'LIVING', sub: 'FRESHWATER_INVERTEBRATE', img: null },
  { id: 62, name: 'Caramujo Ampulária Ouro (Pomacea diffusa)', cost: 5.0, margin: 140.0, price: 12.0, qty: 30, type: 'LIVING', sub: 'FRESHWATER_INVERTEBRATE', img: null },
  { id: 63, name: 'Caramujo Neritina Zebra (Neritina natalensis)', cost: 8.0, margin: 125.0, price: 18.0, qty: 35, type: 'LIVING', sub: 'FRESHWATER_INVERTEBRATE', img: null },
  { id: 64, name: 'Caramujo Assassino Helena (Anentome helena)', cost: 9.0, margin: 120.0, price: 19.8, qty: 20, type: 'LIVING', sub: 'FRESHWATER_INVERTEBRATE', img: null },

  // === PEIXES DE ÁGUA DOCE (24) ===
  { id: 65, name: 'Neon Innesi (Paracheirodon innesi)', cost: 2.0, margin: 175.0, price: 5.5, qty: 100, type: 'LIVING', sub: 'FRESHWATER_FISH', img: '113_neon_innesi_verde_negro.webp' },
  { id: 66, name: 'Tetra Cardinal (Paracheirodon axelrodi)', cost: 2.5, margin: 180.0, price: 7.0, qty: 80, type: 'LIVING', sub: 'FRESHWATER_FISH', img: null },
  { id: 67, name: 'Tetra Negro Comum (Gymnocorymbus ternetzi)', cost: 3.0, margin: 150.0, price: 7.5, qty: 50, type: 'LIVING', sub: 'FRESHWATER_FISH', img: '114_tetra_negro.webp' },
  { id: 68, name: 'Tetra Mato Grosso (Hyphessobrycon eques)', cost: 3.5, margin: 145.0, price: 8.5, qty: 40, type: 'LIVING', sub: 'FRESHWATER_FISH', img: '116_tetra_mato_grosso.webp' },
  { id: 69, name: 'Rodóstomus Nariz-de-Bêbado (Hemigrammus bleheri)', cost: 4.0, margin: 150.0, price: 10.0, qty: 45, type: 'LIVING', sub: 'FRESHWATER_FISH', img: '117_rodostomus_nariz_de_bebado.webp' },
  { id: 70, name: 'Tetra Foguinho (Hyphessobrycon amandae)', cost: 4.5, margin: 140.0, price: 10.8, qty: 40, type: 'LIVING', sub: 'FRESHWATER_FISH', img: null },
  { id: 71, name: 'Paulistinha Comum (Danio rerio)', cost: 1.5, margin: 200.0, price: 4.5, qty: 60, type: 'LIVING', sub: 'FRESHWATER_FISH', img: '119_paulistinha_danio.webp' },
  { id: 72, name: 'Rásbora Arlequim (Trigonostigma heteromorpha)', cost: 5.0, margin: 140.0, price: 12.0, qty: 35, type: 'LIVING', sub: 'FRESHWATER_FISH', img: '120_rasbora_arlequim.webp' },
  { id: 73, name: 'Rásbora Galaxy CPD (Danio margaritatus)', cost: 14.0, margin: 115.0, price: 30.1, qty: 25, type: 'LIVING', sub: 'FRESHWATER_FISH', img: '121_rasbora_galaxy_cpd.webp' },
  { id: 74, name: 'Barbo Sumatra Tigre (Puntigrus tetrazona)', cost: 3.5, margin: 145.0, price: 8.5, qty: 40, type: 'LIVING', sub: 'FRESHWATER_FISH', img: '122_barbo_sumatra_tigre.webp' },
  { id: 75, name: 'Barbo Cereja (Desmopuntius titteya)', cost: 4.0, margin: 150.0, price: 10.0, qty: 30, type: 'LIVING', sub: 'FRESHWATER_FISH', img: '123_barbo_cereja_ouro.webp' },
  { id: 76, name: 'Acará Bandeira Koi (Pterophyllum scalare)', cost: 12.0, margin: 130.0, price: 27.6, qty: 20, type: 'LIVING', sub: 'FRESHWATER_FISH', img: '124_acara_bandeira_koi.webp' },
  { id: 77, name: 'Acará Bandeira Mármore (Pterophyllum scalare)', cost: 10.0, margin: 140.0, price: 24.0, qty: 20, type: 'LIVING', sub: 'FRESHWATER_FISH', img: '125_acara_bandeira_marmore_zebra.webp' },
  { id: 78, name: 'Acará Bandeira Black Negro (Pterophyllum scalare)', cost: 14.0, margin: 130.0, price: 32.2, qty: 15, type: 'LIVING', sub: 'FRESHWATER_FISH', img: '126_acara_bandeira_negro_pinoy.webp' },
  { id: 79, name: 'Acará Disco Azul Turquesa (Symphysodon aequifasciatus)', cost: 130.0, margin: 100.0, price: 260.0, qty: 6, type: 'LIVING', sub: 'FRESHWATER_FISH', img: '128_acara_disco_azul_turquesa.webp' },
  { id: 80, name: 'Acará Disco Blue Diamond (Symphysodon aequifasciatus)', cost: 140.0, margin: 100.0, price: 280.0, qty: 5, type: 'LIVING', sub: 'FRESHWATER_FISH', img: '130_acara_disco_blue_diamond.webp' },
  { id: 81, name: 'Ramirezi Comum (Mikrogeophagus ramirezi)', cost: 15.0, margin: 130.0, price: 34.5, qty: 20, type: 'LIVING', sub: 'FRESHWATER_FISH', img: '132_ramirezi_comum_alemao.webp' },
  { id: 82, name: 'Ramirezi Electric Blue (Mikrogeophagus ramirezi)', cost: 25.0, margin: 120.0, price: 55.0, qty: 15, type: 'LIVING', sub: 'FRESHWATER_FISH', img: '133_ramirezi_electric_blue.webp' },
  { id: 83, name: 'Apistogramma Cacatuoides Double Red (Apistogramma cacatuoides)', cost: 28.0, margin: 115.0, price: 60.2, qty: 12, type: 'LIVING', sub: 'FRESHWATER_FISH', img: '134_apistogramma_cacatuoides_agassizii.webp' },
  { id: 84, name: 'Betta Splendens Halfmoon (Betta splendens)', cost: 15.0, margin: 135.0, price: 35.25, qty: 18, type: 'LIVING', sub: 'FRESHWATER_FISH', img: '136_betta_halfmoon_macho.webp' },
  { id: 85, name: 'Kinguio Oranda Red Cap (Carassius auratus)', cost: 35.0, margin: 115.0, price: 75.25, qty: 12, type: 'LIVING', sub: 'FRESHWATER_FISH', img: '140_kinguio_oranda_red_cap.webp' },
  { id: 86, name: 'Coridora Bronze Aeneus (Corydoras aeneus)', cost: 6.0, margin: 135.0, price: 14.1, qty: 30, type: 'LIVING', sub: 'FRESHWATER_FISH', img: '142_coridora_bronze_albina.webp' },
  { id: 87, name: 'Coridora Panda (Corydoras panda)', cost: 14.0, margin: 115.0, price: 30.1, qty: 18, type: 'LIVING', sub: 'FRESHWATER_FISH', img: '144_coridora_panda_sterbai.webp' },
  { id: 88, name: 'Cascudo Ancistrus Comum (Ancistrus cirrhosus)', cost: 15.0, margin: 130.0, price: 34.5, qty: 18, type: 'LIVING', sub: 'FRESHWATER_FISH', img: '146_cascudo_ancistrus_bristlenose.webp' },

  // === PLANTAS AQUÁTICAS (14) ===
  { id: 89, name: 'Anubias Nana (Anubias barteri var. nana)', cost: 18.0, margin: 110.0, price: 37.8, qty: 15, type: 'LIVING', sub: 'PLANT', img: '316_anubias_nana_clássica.jpg' },
  { id: 90, name: 'Anubias Barteri (Anubias barteri)', cost: 22.0, margin: 105.0, price: 45.1, qty: 12, type: 'LIVING', sub: 'PLANT', img: null },
  { id: 91, name: 'Microsorum Pteropus Samambaia de Java (Microsorum pteropus)', cost: 16.0, margin: 115.0, price: 34.4, qty: 14, type: 'LIVING', sub: 'PLANT', img: '320_microsorum_pteropus_java_fern.jpg' },
  { id: 92, name: 'Musgo de Java (Taxiphyllum barbieri)', cost: 12.0, margin: 125.0, price: 27.0, qty: 20, type: 'LIVING', sub: 'PLANT', img: null },
  { id: 93, name: 'Elódea (Egeria densa)', cost: 4.0, margin: 150.0, price: 10.0, qty: 30, type: 'LIVING', sub: 'PLANT', img: '326_elodea_egeria_densa_anacharis.jpg' },
  { id: 94, name: 'Cabomba Verde (Cabomba caroliniana)', cost: 5.0, margin: 140.0, price: 12.0, qty: 25, type: 'LIVING', sub: 'PLANT', img: '327_cabomba_verde_aquatica_furcata.jpg' },
  { id: 95, name: 'Rabo-de-Raposa (Ceratophyllum demersum)', cost: 5.0, margin: 140.0, price: 12.0, qty: 25, type: 'LIVING', sub: 'PLANT', img: '328_rabo_de_raposa_ceratophyllum_demersum.jpg' },
  { id: 96, name: 'Hygrophila Polysperma (Hygrophila polysperma)', cost: 6.0, margin: 135.0, price: 14.1, qty: 25, type: 'LIVING', sub: 'PLANT', img: '330_hygrophila_polysperma_rosanervig_sunset.jpg' },
  { id: 97, name: 'Rotala Rotundifolia (Rotala rotundifolia)', cost: 7.0, margin: 130.0, price: 16.1, qty: 25, type: 'LIVING', sub: 'PLANT', img: '334_rotala_rotundifolia_red_hra_blood_red.jpg' },
  { id: 98, name: 'Ludwigia Super Red (Ludwigia palustris)', cost: 8.0, margin: 125.0, price: 18.0, qty: 20, type: 'LIVING', sub: 'PLANT', img: '336_ludwigia_sp_super_red_repens_rubin.jpg' },
  { id: 99, name: 'Alternanthera Reineckii Mini (Alternanthera reineckii \'Mini\')', cost: 12.0, margin: 120.0, price: 26.4, qty: 15, type: 'LIVING', sub: 'PLANT', img: '337_alternanthera_reineckii_mini_rosanervig.jpg' },
  { id: 100, name: 'Vallisneria Spiralis (Vallisneria spiralis)', cost: 6.0, margin: 135.0, price: 14.1, qty: 25, type: 'LIVING', sub: 'PLANT', img: '342_vallisneria_spiralis_corkscrew_saca_rolha.jpg' },
  { id: 101, name: 'Cryptocoryne Wendtii Brown (Cryptocoryne wendtii)', cost: 10.0, margin: 120.0, price: 22.0, qty: 15, type: 'LIVING', sub: 'PLANT', img: '344_cryptocoryne_wendtii_brown_tropica_beckettii.jpg' },
  { id: 102, name: 'Macroalga Chaetomorpha (Chaetomorpha linum)', cost: 15.0, margin: 120.0, price: 33.0, qty: 15, type: 'LIVING', sub: 'PLANT', img: '301_alga_chaetomorpha_spaghetti.jpg' },

  // === PRODUTOS & SUPRIMENTOS (18) ===
  { id: 103, name: 'Ração Marine Flakes 100g', cost: 25.0, margin: 80.0, price: 45.0, qty: 35, type: 'PRODUCT', sub: 'SUPPLY', img: null },
  { id: 104, name: 'Ração Nori Alga Marinha 50 Folhas', cost: 30.0, margin: 83.33, price: 55.0, qty: 20, type: 'PRODUCT', sub: 'SUPPLY', img: null },
  { id: 105, name: 'Ração Spirulina Wafers Fundo 80g', cost: 22.0, margin: 90.91, price: 42.0, qty: 28, type: 'PRODUCT', sub: 'SUPPLY', img: null },
  { id: 106, name: 'Artemia Salina Congelada 100g', cost: 12.0, margin: 108.33, price: 25.0, qty: 40, type: 'PRODUCT', sub: 'SUPPLY', img: null },
  { id: 107, name: 'Sal Sintético Red Sea Coral Pro 7kg', cost: 160.0, margin: 62.5, price: 260.0, qty: 12, type: 'PRODUCT', sub: 'SUPPLY', img: null },
  { id: 108, name: 'Água Salgada Pronta para TPA (Galão 20L)', cost: 10.0, margin: 180.0, price: 28.0, qty: 50, type: 'PRODUCT', sub: 'SUPPLY', img: null },
  { id: 109, name: 'Teste de Nitrato (NO3) Salifert', cost: 75.0, margin: 73.33, price: 130.0, qty: 9, type: 'PRODUCT', sub: 'SUPPLY', img: null },
  { id: 110, name: 'Teste de Fosfato (PO4) Salifert', cost: 80.0, margin: 75.0, price: 140.0, qty: 8, type: 'PRODUCT', sub: 'SUPPLY', img: null },
  { id: 111, name: 'Teste de pH e KH Tropical', cost: 28.0, margin: 96.43, price: 55.0, qty: 15, type: 'PRODUCT', sub: 'SUPPLY', img: null },
  { id: 112, name: 'Carvão Ativado Especial Reef 500g', cost: 35.0, margin: 85.71, price: 65.0, qty: 25, type: 'PRODUCT', sub: 'SUPPLY', img: null },
  { id: 113, name: 'Condicionador Seachem Prime 100ml', cost: 32.0, margin: 87.5, price: 60.0, qty: 20, type: 'PRODUCT', sub: 'SUPPLY', img: null },
  { id: 114, name: 'Suplemento Bio-Bactérias Stability 250ml', cost: 45.0, margin: 88.89, price: 85.0, qty: 18, type: 'PRODUCT', sub: 'SUPPLY', img: null },
  { id: 115, name: 'Filtro Hang On 500L/h Atman', cost: 80.0, margin: 81.25, price: 145.0, qty: 8, type: 'PRODUCT', sub: 'EQUIPMENT', img: null },
  { id: 116, name: 'Termostato 100W com Protetor', cost: 55.0, margin: 90.91, price: 105.0, qty: 14, type: 'PRODUCT', sub: 'EQUIPMENT', img: null },
  { id: 117, name: 'Termostato 300W com Protetor', cost: 85.0, margin: 88.24, price: 160.0, qty: 10, type: 'PRODUCT', sub: 'EQUIPMENT', img: null },
  { id: 118, name: 'Skimmer Interno Bubble Magus Curve 5', cost: 720.0, margin: 65.28, price: 1190.0, qty: 3, type: 'PRODUCT', sub: 'EQUIPMENT', img: null },
  { id: 119, name: 'Bomba de Circulação Jebao 4000L/h', cost: 210.0, margin: 71.43, price: 360.0, qty: 6, type: 'PRODUCT', sub: 'EQUIPMENT', img: null },
  { id: 120, name: 'Luminária LED Reef Coral Light 60W', cost: 380.0, margin: 78.95, price: 680.0, qty: 4, type: 'PRODUCT', sub: 'EQUIPMENT', img: null }
];

// 2. Customers (~15 clients with realistic Brazilian data)
const customersData = [
  { id: 1, name: 'Marcelo Camargo', email: 'marcelo.camargo@email.com', phone: '(21) 98765-4321', addr: 'Av. das Américas, 4200 - Barra da Tijuca, RJ' },
  { id: 2, name: 'Camila Nogueira', email: 'camila.aquarismo@email.com', phone: '(21) 99887-1122', addr: 'Rua Visconde de Pirajá, 305 - Ipanema, RJ' },
  { id: 3, name: 'Rodrigo Albuquerque', email: 'rodrigo.marinho@email.com', phone: '(21) 97123-4567', addr: 'Rua Voluntários da Pátria, 150 - Botafogo, RJ' },
  { id: 4, name: 'Beatriz Vasconcelos', email: 'beatriz.reef@email.com', phone: '(21) 98234-5678', addr: 'Rua Dias Ferreira, 80 - Leblon, RJ' },
  { id: 5, name: 'Lucas Ferraz', email: 'lucas.aquascaping@email.com', phone: '(21) 96345-6789', addr: 'Rua Conde de Bonfim, 440 - Tijuca, RJ' },
  { id: 6, name: 'Juliana Menezes', email: 'juliana.peixes@email.com', phone: '(21) 97456-7890', addr: 'Estrada dos Três Rios, 1200 - Freguesia, RJ' },
  { id: 7, name: 'Felipe Guimarães', email: 'felipe.corais@email.com', phone: '(21) 98567-8901', addr: 'Rua São Clemente, 260 - Botafogo, RJ' },
  { id: 8, name: 'Mariana Silveira', email: 'mariana.silveira@email.com', phone: '(21) 99678-9012', addr: 'Av. Lúcio Costa, 3600 - Barra da Tijuca, RJ' },
  { id: 9, name: 'Gustavo Henrique Rocha', email: 'gustavo.rocha@email.com', phone: '(21) 98112-3344', addr: 'Av. Atlântica, 1800 - Copacabana, RJ' },
  { id: 10, name: 'Patrícia Meireles', email: 'patricia.meireles@email.com', phone: '(21) 99223-4455', addr: 'Rua das Laranjeiras, 320 - Laranjeiras, RJ' },
  { id: 11, name: 'Eduardo Paes Leme', email: 'eduardo.leme@email.com', phone: '(21) 97334-5566', addr: 'Av. das Américas, 15000 - Recreio, RJ' },
  { id: 12, name: 'Renata Vasconcellos', email: 'renata.vasc@email.com', phone: '(21) 98445-6677', addr: 'Praia do Flamengo, 120 - Flamengo, RJ' },
  { id: 13, name: 'Bruno Carvalho', email: 'bruno.carvalho@email.com', phone: '(21) 99556-7788', addr: 'Rua Marquês de São Vicente, 85 - Gávea, RJ' },
  { id: 14, name: 'Larissa Fontes', email: 'larissa.fontes@email.com', phone: '(21) 97667-8899', addr: 'Rua Moreira César, 240 - Icaraí, Niterói, RJ' },
  { id: 15, name: 'Thiago Monte Alegre', email: 'thiago.alegre@email.com', phone: '(21) 98778-9900', addr: 'Estrada da Gávea, 700 - São Conrado, RJ' }
];

// 3. Aquariums (25 aquariums: every client has >=1, several have 2, 2 clients have 3)
const aquariumsData = [
  // Cliente 1 (Marcelo) - 3 aquários (2 marinhos, 1 doce)
  { id: 1, user_id: 1, name: 'Reef dos Sonhos 350L', type: 'MARINE', vol: 350, desc: 'Aquário marinho misto com corais SPS (Acroporas) e LPS (Torches), substrato de aragonita viva e sump de 100L com skimmer potente.' },
  { id: 2, user_id: 1, name: 'Nano Quarentena 50L', type: 'MARINE', vol: 50, desc: 'Aquário hospital e quarentena para aclimatação segura de novos peixes antes da entrada no reef principal.' },
  { id: 3, user_id: 1, name: 'Plantado Takashi Amano 120L', type: 'FRESHWATER', vol: 120, desc: 'Aquário plantado no estilo Nature Aquarium com rochas Seiryu Stone, carpete Eleocharis e cardume de Rásboras Galaxy.' },

  // Cliente 2 (Camila) - 2 aquários (2 doces)
  { id: 4, user_id: 2, name: 'Plantado Amazônico High-Tech 240L', type: 'FRESHWATER', vol: 240, desc: 'Aquário plantado densamente povoado com CO2 pressurizado, substrato fértil Amazônia, cardume de Neons e casal de Acarás Disco.' },
  { id: 5, user_id: 2, name: 'Nano Camarões Neocaridina 40L', type: 'FRESHWATER', vol: 40, desc: 'Aquário dedicado à criação e reprodução de camarões Neocaridina Red Cherry e musgos de Java.' },

  // Cliente 3 (Rodrigo) - 1 aquário (marinho)
  { id: 6, user_id: 3, name: 'Reef Marinho 500L', type: 'MARINE', vol: 500, desc: 'Aquário marinho focado em cirurgiões (Yellow Tang, Blue Tang, Purple Tang), corais moles e colônias gigantes de Zoanthus.' },

  // Cliente 4 (Beatriz) - 2 aquários (1 marinho, 1 doce)
  { id: 7, user_id: 4, name: 'Nano Coral Garden 80L', type: 'MARINE', vol: 80, desc: 'Aquário de corais focado em Euphyllias (Hammer, Frogspawn, Torch) com iluminação LED espectro azul actínico.' },
  { id: 8, user_id: 4, name: 'Aquário Comunitário Jumbo 450L', type: 'FRESHWATER', vol: 450, desc: 'Aquário com filtragem canister potente abrigando casal de Oscars Tigre e cascudos Ancistrus.' },

  // Cliente 5 (Lucas) - 1 aquário (doce)
  { id: 9, user_id: 5, name: 'Biótopo Asiático Betta & Corys 90L', type: 'FRESHWATER', vol: 90, desc: 'Aquário com troncos tratados, folhas de amendoeira, plantas low-tech (Microsorum e Anubias) e Betta Halfmoon.' },

  // Cliente 6 (Juliana) - 2 aquários (2 marinhos)
  { id: 10, user_id: 6, name: 'Reef Predadores 400L', type: 'MARINE', vol: 400, desc: 'Aquário marinho temático com rochas vivas abrigando Peixe-leão e moreia.' },
  { id: 11, user_id: 6, name: 'Nano Marinho Softs 60L', type: 'MARINE', vol: 60, desc: 'Nano reef elegante com casal de Peixe-palhaço Ocellaris e colônias de Zoanthus coloridos.' },

  // Cliente 7 (Felipe) - 1 aquário (marinho)
  { id: 12, user_id: 7, name: 'Reef Misto 200L', type: 'MARINE', vol: 200, desc: 'Aquário com corais LPS variados, equipe de limpeza completa e casal de palhaços Snowflake.' },

  // Cliente 8 (Mariana) - 2 aquários (2 doces)
  { id: 13, user_id: 8, name: 'Aquário Comunitário Tetras 100L', type: 'FRESHWATER', vol: 100, desc: 'Comunitário com cardume de Neons Cardinais, Rodóstomus e plantas Vallisnerias.' },
  { id: 14, user_id: 8, name: 'Plantado Low-Tech Anubias 60L', type: 'FRESHWATER', vol: 60, desc: 'Aquário com iluminação suave, troncos com Anubias e Musgo de Java e peixes Paulistinhas.' },

  // Cliente 9 (Gustavo) - 2 aquários (2 marinhos)
  { id: 15, user_id: 9, name: 'Reef Acroporas SPS 300L', type: 'MARINE', vol: 300, desc: 'Reef focado em corais duros SPS com parâmetros ultra-estáveis e circulação forte.' },
  { id: 16, user_id: 9, name: 'Nano Frag Tank 70L', type: 'MARINE', vol: 70, desc: 'Aquário raso para desenvolvimento de mudas de corais e quarentena de invertebrados.' },

  // Cliente 10 (Patrícia) - 1 aquário (doce)
  { id: 17, user_id: 10, name: 'Aquário Kinguios & Lagos 280L', type: 'FRESHWATER', vol: 280, desc: 'Aquário com água fria e oxigenação abundante para Kinguios Oranda e Cometa.' },

  // Cliente 11 (Eduardo) - 1 aquário (marinho)
  { id: 18, user_id: 11, name: 'Reef Marinho Red Sea 250L', type: 'MARINE', vol: 250, desc: 'Aquário plug-and-play de alta performance com corais Hammers e peixes cirurgiões.' },

  // Cliente 12 (Renata) - 2 aquários (1 doce, 1 marinho)
  { id: 19, user_id: 12, name: 'Aquário Plantado Holandês 180L', type: 'FRESHWATER', vol: 180, desc: 'Aquário com plantas vermelhas exuberantes (Rotalas, Ludwigias, Alternantheras) e cardumes vibrantes.' },
  { id: 20, user_id: 12, name: 'Nano Reef Office 45L', type: 'MARINE', vol: 45, desc: 'Nano reef minimalista de mesa com iluminação LED azul e casal de palhaços Darwin Black.' },

  // Cliente 13 (Bruno) - 1 aquário (doce)
  { id: 21, user_id: 13, name: 'Biótopo Ciclídeos Lago Malawi 320L', type: 'FRESHWATER', vol: 320, desc: 'Aquário de água dura e alcalina com rochas calcárias para ciclídeos africanos.' },

  // Cliente 14 (Larissa) - 1 aquário (marinho)
  { id: 22, user_id: 14, name: 'Reef Cubo 100L', type: 'MARINE', vol: 100, desc: 'Cubo marinho 50x50x50 com corais moles, Zoas e peixes Blênio e Firefish.' },

  // Cliente 15 (Thiago) - 3 aquários (2 marinhos, 1 doce)
  { id: 23, user_id: 15, name: 'Reef Oceânico Península 600L', type: 'MARINE', vol: 600, desc: 'Península gigante visível dos 3 lados com corais raros, Tangs havaianos e peixes anjos.' },
  { id: 24, user_id: 15, name: 'Aquário Lago Tanganyika 200L', type: 'FRESHWATER', vol: 200, desc: 'Aquário de ciclídeos conchícolas do Tanganyika com conchas de Neothauma.' },
  { id: 25, user_id: 15, name: 'Nano Marinho Pico Reef 30L', type: 'MARINE', vol: 30, desc: 'Pico reef ultra-compacto com corais Ricordea e camarão Sexy Shrimp.' }
];

// 4. Notes & Water Parameter Tests
const notesData = [
  { id: 1, aqua_id: 1, author: 'Marcelo (Bamba Aqua)', title: 'Avaliação Periódica do Reef', content: 'Realizada checagem visual dos corais duros. Acropora millepora apresentando crescimento nas pontas. Skimmer limpo e regulado.' },
  { id: 2, aqua_id: 1, author: 'Atendente Balcão', title: 'Instalação de Bomba Dosadora', content: 'Cliente adquiriu dosadora Jebao 4 canais. Programada para dosar Kh, Cálcio e Magnésio de hora em hora.' },
  { id: 3, aqua_id: 4, author: 'Marcelo (Bamba Aqua)', title: 'Poda Geral e Adubação', content: 'Poda das Rotalas e replantio das mudas. Inseridas pastilhas de NPK no substrato próximo às raízes.' },
  { id: 4, aqua_id: 6, author: 'Atendente Balcão', title: 'Calibração de Refratômetro Óptico', content: 'Cliente trouxe o refratômetro para aferição na loja. Calibrado com líquido de referência 35ppt.' },
  { id: 5, aqua_id: 7, author: 'Marcelo (Bamba Aqua)', title: 'Aclimatação de Coral Torch Gold', content: 'Realizado banho profilático com dip coral antes da colagem na rocha matriz.' },
  { id: 6, aqua_id: 9, author: 'Lucas Ferraz', title: 'Troca Parcial e Adição de Folhas de Amendoeira', content: 'Realizada TPA de 25% com água tratada com Prime e adicionadas 2 folhas secas de catappa.' }
];

const waterTestsData = [
  { id: 1, aqua_id: 1, nh3: 0, ca: 430, cl_rep: 'Corais expandindo pólipos com vitalidade máxima. Peixes ativos e comendo.', diag: 'Parâmetros ideais para corais SPS e LPS. Manter rotina de dosagem Balling e TPA quinzenal.', gh: null, kh: 8.5, mg: 1380, no3: 5, no2: 0, ph: 8.3, po4: 0.03, sal: 1.025, si: 0, temp: 25.5 },
  { id: 2, aqua_id: 4, nh3: 0, ca: null, cl_rep: 'Plantas fazendo pearling intenso à tarde. Discos nadando tranquilos.', diag: 'Água doce ácida e mole ideal para peixes amazônicos. Manter fertilização de ferro e potássio.', gh: 5, kh: 3, mg: null, no3: 10, no2: 0, ph: 6.6, po4: 0.6, sal: null, si: null, temp: 28.0 },
  { id: 3, aqua_id: 6, nh3: 0.02, ca: 440, cl_rep: 'Água um pouco turva após introdução de nova rocha.', diag: 'Leve pico de amônia. Aplicar Stability por 3 dias e manter skimmer úmido.', gh: null, kh: 9.0, mg: 1390, no3: 20, no2: 0, ph: 8.1, po4: 0.12, sal: 1.026, si: 0.1, temp: 25.8 },
  { id: 4, aqua_id: 7, nh3: 0, ca: 420, cl_rep: 'Torches e hammers com coloração viva e abrindo completamente.', diag: 'Equilíbrio iônico e alcalinidade estáveis. Nenhum ajuste corretivo necessário.', gh: null, kh: 8.0, mg: 1340, no3: 8, no2: 0, ph: 8.2, po4: 0.04, sal: 1.025, si: 0, temp: 25.2 },
  { id: 5, aqua_id: 9, nh3: 0, ca: null, cl_rep: 'Betta muito ativo construindo ninho de bolhas na superfície.', diag: 'Condições da água neutra e límpida com taninos adequados. Excelente saúde.', gh: 6, kh: 4, mg: null, no3: 5, no2: 0, ph: 7.0, po4: 0.2, sal: null, si: null, temp: 26.5 },
  { id: 6, aqua_id: 15, nh3: 0, ca: 440, cl_rep: 'SPS com pontas de crescimento nítidas em branco e lilás.', diag: 'Excelente consumo de cálcio e carbonatos. Elevar levemente a dosagem da bomba.', gh: null, kh: 8.2, mg: 1360, no3: 3, no2: 0, ph: 8.3, po4: 0.02, sal: 1.025, si: 0, temp: 25.0 }
];

// 5. Orders and Order Items (~18 realistic orders)
const ordersData = [
  { id: 1, user_id: 1, anon: null, status: 'PAID', total: 104.5, items: [{ prod: 108, qty: 2, price: 28.0, cost: 10.0 }, { prod: 103, qty: 1, price: 45.0, cost: 25.0 }] },
  { id: 2, user_id: 2, anon: null, status: 'PAID', total: 336.5, items: [{ prod: 1, qty: 1, price: 76.5, cost: 45.0 }, { prod: 107, qty: 1, price: 260.0, cost: 160.0 }] },
  { id: 3, user_id: null, anon: 'Carlos Balcão', status: 'PAID', total: 97.0, items: [{ prod: 65, qty: 10, price: 5.5, cost: 2.0 }, { prod: 105, qty: 1, price: 42.0, cost: 22.0 }] },
  { id: 4, user_id: 3, anon: null, status: 'PAID', total: 292.0, items: [{ prod: 42, qty: 1, price: 162.0, cost: 90.0 }, { prod: 109, qty: 1, price: 130.0, cost: 75.0 }] },
  { id: 5, user_id: 4, anon: null, status: 'PAID', total: 130.0, items: [{ prod: 25, qty: 1, price: 80.0, cost: 40.0 }, { prod: 47, qty: 1, price: 50.0, cost: 25.0 }] },
  { id: 6, user_id: null, anon: 'Cliente Anônimo', status: 'PAID', total: 105.0, items: [{ prod: 116, qty: 1, price: 105.0, cost: 55.0 }] },
  { id: 7, user_id: 5, anon: null, status: 'PAID', total: 140.0, items: [{ prod: 110, qty: 1, price: 140.0, cost: 80.0 }] },
  { id: 8, user_id: 7, anon: null, status: 'PAID', total: 648.0, items: [{ prod: 43, qty: 2, price: 324.0, cost: 180.0 }] },
  { id: 9, user_id: null, anon: 'Thiago Balcão', status: 'PAID', total: 100.0, items: [{ prod: 46, qty: 1, price: 100.0, cost: 50.0 }] },
  { id: 10, user_id: 8, anon: null, status: 'PAID', total: 521.0, items: [{ prod: 9, qty: 1, price: 476.0, cost: 280.0 }, { prod: 103, qty: 1, price: 45.0, cost: 25.0 }] },
  { id: 11, user_id: 6, anon: null, status: 'PAID', total: 145.0, items: [{ prod: 115, qty: 1, price: 145.0, cost: 80.0 }] },
  { id: 12, user_id: null, anon: 'André', status: 'PAID', total: 203.0, items: [{ prod: 1, qty: 2, price: 76.5, cost: 45.0 }, { prod: 47, qty: 1, price: 50.0, cost: 25.0 }] },
  { id: 13, user_id: 9, anon: null, status: 'PAID', total: 476.0, items: [{ prod: 9, qty: 1, price: 476.0, cost: 280.0 }] },
  { id: 14, user_id: 11, anon: null, status: 'PAID', total: 259.0, items: [{ prod: 17, qty: 1, price: 259.0, cost: 140.0 }] },
  { id: 15, user_id: 12, anon: null, status: 'PAID', total: 187.0, items: [{ prod: 16, qty: 1, price: 187.0, cost: 110.0 }] },
  { id: 16, user_id: 15, anon: null, status: 'PAID', total: 1487.5, items: [{ prod: 13, qty: 1, price: 1487.5, cost: 850.0 }] },
  { id: 17, user_id: 13, anon: null, status: 'PENDING', total: 205.0, items: [{ prod: 76, qty: 5, price: 27.6, cost: 12.0 }, { prod: 112, qty: 1, price: 65.0, cost: 35.0 }] },
  { id: 18, user_id: null, anon: 'Cliente Balcão - João', status: 'PENDING', total: 150.0, items: [{ prod: 114, qty: 1, price: 85.0, cost: 45.0 }, { prod: 112, qty: 1, price: 65.0, cost: 35.0 }] },
  { id: 19, user_id: 4, anon: null, status: 'CANCELED', total: 1190.0, items: [{ prod: 118, qty: 1, price: 1190.0, cost: 720.0 }] },
  { id: 20, user_id: null, anon: 'Pedro Silveira', status: 'CANCELED', total: 1105.0, items: [{ prod: 10, qty: 1, price: 1105.0, cost: 650.0 }] }
];

// 6. Stock Movements
const stockMovementsData = [
  { id: 1, prod: 44, type: 'LOSS', qty: 1, cost: 95.0, margin: 80.0, sale: 171.0, reason: 'Morte biológica - choque de temperatura no coral Frogspawn' },
  { id: 2, prod: 9, type: 'LOSS', qty: 1, cost: 280.0, margin: 70.0, sale: 476.0, reason: 'Morte biológica - infecção parasitária por Oodinium no Blue Tang' },
  { id: 3, prod: 1, type: 'LOSS', qty: 2, cost: 45.0, margin: 70.0, sale: 76.5, reason: 'Morte na quarentena pós-chegada de importação' },
  { id: 4, prod: 118, type: 'RETURN', qty: 1, cost: 720.0, margin: 65.28, sale: 1190.0, reason: 'Devolução/Estorno por cancelamento do Pedido #19' },
  { id: 5, prod: 10, type: 'RETURN', qty: 1, cost: 650.0, margin: 70.0, sale: 1105.0, reason: 'Devolução/Estorno por cancelamento do Pedido #20' }
];

// Helper to escape SQL strings
function esc(str) {
  if (str === null || str === undefined) return 'NULL';
  return `'${String(str).replace(/'/g, "''")}'`;
}

// Generate the SQL script content
function buildSqlScript() {
  let sql = `--
-- PostgreSQL database dump (Store Management - Bamba Aqua Test Seed)
-- Limpo, conciso e representativo (~120 produtos, 15 clientes, 25 aquários, vendas de teste)
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.aquariums DROP CONSTRAINT IF EXISTS fkuvp1qq8kuuw967s2ib5utfsu;
ALTER TABLE IF EXISTS ONLY public.order_items DROP CONSTRAINT IF EXISTS fkocimc7dtr037rh4ls4l95nlfi;
ALTER TABLE IF EXISTS ONLY public.stock_movements DROP CONSTRAINT IF EXISTS fkjcaag8ogfjxpwmqypi1wfdaog;
ALTER TABLE IF EXISTS ONLY public.aquarium_notes DROP CONSTRAINT IF EXISTS fkdrxlsnw4rp9br6iwvsqfrmnn4;
ALTER TABLE IF EXISTS ONLY public.order_items DROP CONSTRAINT IF EXISTS fkbioxgbv59vetrxe0ejfubep1w;
ALTER TABLE IF EXISTS ONLY public.water_parameter_tests DROP CONSTRAINT IF EXISTS fk3p53w5t50o01f20e0hnoneobx;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS fk32ql8ubntj5uh44ph9659tiih;
ALTER TABLE IF EXISTS ONLY public.water_parameter_tests DROP CONSTRAINT IF EXISTS water_parameter_tests_pkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS uk63qdij7q2our6df3mhhmh1yxj;
ALTER TABLE IF EXISTS ONLY public.operators DROP CONSTRAINT IF EXISTS uk58mmd0h2pguuodlu4exjjib85;
ALTER TABLE IF EXISTS ONLY public.stock_movements DROP CONSTRAINT IF EXISTS stock_movements_pkey;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_pkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_pkey;
ALTER TABLE IF EXISTS ONLY public.order_items DROP CONSTRAINT IF EXISTS order_items_pkey;
ALTER TABLE IF EXISTS ONLY public.operators DROP CONSTRAINT IF EXISTS operators_pkey;
ALTER TABLE IF EXISTS ONLY public.aquariums DROP CONSTRAINT IF EXISTS aquariums_pkey;
ALTER TABLE IF EXISTS ONLY public.aquarium_notes DROP CONSTRAINT IF EXISTS aquarium_notes_pkey;
DROP TABLE IF EXISTS public.water_parameter_tests;
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.stock_movements;
DROP TABLE IF EXISTS public.products;
DROP TABLE IF EXISTS public.orders;
DROP TABLE IF EXISTS public.order_items;
DROP TABLE IF EXISTS public.operators;
DROP TABLE IF EXISTS public.aquariums;
DROP TABLE IF EXISTS public.aquarium_notes;
DROP TABLE IF EXISTS public.store_settings;

SET default_tablespace = '';
SET default_table_access_method = heap;

CREATE TABLE public.aquarium_notes (
    id bigint NOT NULL,
    author_name character varying(255),
    content text NOT NULL,
    created_at timestamp(6) without time zone,
    note_date timestamp(6) without time zone NOT NULL,
    title character varying(255),
    aquarium_id bigint NOT NULL
);

ALTER TABLE public.aquarium_notes ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.aquarium_notes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE public.aquariums (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone,
    description text,
    name character varying(255) NOT NULL,
    type character varying(255) NOT NULL,
    volume_liters double precision,
    user_id bigint NOT NULL,
    CONSTRAINT aquariums_type_check CHECK (((type)::text = ANY ((ARRAY['MARINE'::character varying, 'FRESHWATER'::character varying])::text[])))
);

ALTER TABLE public.aquariums ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.aquariums_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE public.operators (
    id bigint NOT NULL,
    active boolean NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    last_login_at timestamp(6) without time zone,
    name character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(20) NOT NULL,
    username character varying(30) NOT NULL,
    CONSTRAINT operators_role_check CHECK (((role)::text = ANY ((ARRAY['ADMIN'::character varying, 'OPERATOR'::character varying])::text[])))
);

ALTER TABLE public.operators ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.operators_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE public.order_items (
    id bigint NOT NULL,
    quantity integer,
    subtotal numeric(38,2),
    unit_cost numeric(38,2),
    unit_price numeric(38,2),
    order_id bigint,
    product_id bigint
);

ALTER TABLE public.order_items ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.order_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE public.orders (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone,
    status character varying(255),
    total_price numeric(38,2),
    unregistered_customer_name character varying(255),
    user_id bigint,
    CONSTRAINT orders_status_check CHECK (((status)::text = ANY ((ARRAY['PAID'::character varying, 'PENDING'::character varying, 'CANCELED'::character varying])::text[])))
);

ALTER TABLE public.orders ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE public.products (
    id bigint NOT NULL,
    active boolean,
    barcode character varying(255),
    cost_price numeric(38,2),
    created_at timestamp(6) without time zone,
    name character varying(255),
    profit_margin numeric(38,2),
    quantity integer,
    sale_price numeric(38,2),
    type character varying(255),
    normalized_name character varying(255) NOT NULL,
    image_slug character varying(255),
    sub_category character varying(255),
    CONSTRAINT products_sub_category_check CHECK (((sub_category)::text = ANY ((ARRAY['CORAL'::character varying, 'MARINE_FISH'::character varying, 'FRESHWATER_FISH'::character varying, 'MARINE_INVERTEBRATE'::character varying, 'FRESHWATER_INVERTEBRATE'::character varying, 'INVERTEBRATE'::character varying, 'PLANT'::character varying, 'OTHER_LIVING'::character varying, 'EQUIPMENT'::character varying, 'SUPPLY'::character varying, 'OTHER_PRODUCT'::character varying])::text[]))),
    CONSTRAINT products_type_check CHECK (((type)::text = ANY ((ARRAY['LIVING'::character varying, 'PRODUCT'::character varying])::text[])))
);

ALTER TABLE public.products ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE public.stock_movements (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone,
    quantity integer,
    type character varying(255),
    product_id bigint NOT NULL,
    cost_price numeric(38,2),
    profit_margin numeric(38,2),
    sale_price numeric(38,2),
    reason character varying(255),
    CONSTRAINT stock_movements_type_check CHECK (((type)::text = ANY ((ARRAY['ENTRY'::character varying, 'SALE'::character varying, 'LOSS'::character varying, 'RETURN'::character varying])::text[])))
);

ALTER TABLE public.stock_movements ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.stock_movements_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE public.users (
    id bigint NOT NULL,
    active boolean,
    address character varying(255),
    email character varying(255),
    name character varying(255),
    phone_number character varying(255)
);

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE public.water_parameter_tests (
    id bigint NOT NULL,
    ammonia double precision,
    calcium double precision,
    client_report text,
    created_at timestamp(6) without time zone,
    diagnosis_notes text,
    gh double precision,
    kh double precision,
    magnesium double precision,
    nitrate double precision,
    nitrite double precision,
    ph double precision,
    phosphate double precision,
    salinity double precision,
    silicate double precision,
    temperature double precision,
    test_date timestamp(6) without time zone NOT NULL,
    aquarium_id bigint NOT NULL
);

ALTER TABLE public.water_parameter_tests ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.water_parameter_tests_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE public.store_settings (
    setting_key character varying(100) NOT NULL,
    setting_value text NOT NULL,
    updated_at timestamp(6) without time zone,
    updated_by character varying(100),
    CONSTRAINT store_settings_pkey PRIMARY KEY (setting_key)
);

-- DATA INSERTS --

-- 1. Operators
INSERT INTO public.operators VALUES (1, true, '2026-09-12 23:34:02.971216', '2026-10-15 20:00:00.000000', 'Administrador', '$2a$10$eBiRH3UtmWhVxKb9ggPJ..DuwIoUOn.TawJuDG1AjpeQT8F5g892W', 'ADMIN', 'admin');
INSERT INTO public.operators VALUES (2, true, '2026-09-12 23:34:02.971216', '2026-10-15 19:30:00.000000', 'Marcelo Camargo (Balcão)', '$2a$10$nPGStEtaqdX/gb7PchDXgOJXVC8T3hdKKnEL954.OdyHMjyeVITbG', 'OPERATOR', 'operador');

-- 2. Users (Clientes)
`;

  customersData.forEach(c => {
    sql += `INSERT INTO public.users VALUES (${c.id}, true, ${esc(c.addr)}, ${esc(c.email)}, ${esc(c.name)}, ${esc(c.phone)});\n`;
  });

  sql += `\n-- 3. Aquariums\n`;
  aquariumsData.forEach(a => {
    sql += `INSERT INTO public.aquariums VALUES (${a.id}, '2026-09-01 10:00:00.000000', ${esc(a.desc)}, ${esc(a.name)}, ${esc(a.type)}, ${a.vol}, ${a.user_id});\n`;
  });

  sql += `\n-- 4. Aquarium Notes\n`;
  notesData.forEach(n => {
    sql += `INSERT INTO public.aquarium_notes VALUES (${n.id}, ${esc(n.author)}, ${esc(n.content)}, '2026-10-10 14:00:00.000000', '2026-10-10 14:00:00.000000', ${esc(n.title)}, ${n.aqua_id});\n`;
  });

  sql += `\n-- 5. Water Parameter Tests\n`;
  waterTestsData.forEach(w => {
    sql += `INSERT INTO public.water_parameter_tests VALUES (${w.id}, ${w.nh3}, ${w.ca !== null ? w.ca : 'NULL'}, ${esc(w.cl_rep)}, '2026-10-12 11:00:00.000000', ${esc(w.diag)}, ${w.gh !== null ? w.gh : 'NULL'}, ${w.kh}, ${w.mg !== null ? w.mg : 'NULL'}, ${w.no3}, ${w.no2}, ${w.ph}, ${w.po4}, ${w.sal !== null ? w.sal : 'NULL'}, ${w.si !== null ? w.si : 'NULL'}, ${w.temp}, '2026-10-12 11:00:00.000000', ${w.aqua_id});\n`;
  });

  sql += `\n-- 6. Products (~120 itens limpos e representativos)\n`;
  productsData.forEach(p => {
    const barcode = `78900000${String(p.id).padStart(4, '0')}`;
    const normalizedName = p.name.toLowerCase().trim();
    const imageSlug = p.img && diskFiles.has(p.img) ? esc(p.img) : 'NULL';
    sql += `INSERT INTO public.products VALUES (${p.id}, true, ${esc(barcode)}, ${p.cost.toFixed(2)}, '2026-09-01 12:00:00.000000', ${esc(p.name)}, ${p.margin.toFixed(2)}, ${p.qty}, ${p.price.toFixed(2)}, ${esc(p.type)}, ${esc(normalizedName)}, ${imageSlug}, ${esc(p.sub)});\n`;
  });

  sql += `\n-- 7. Orders and Order Items\n`;
  let orderItemId = 1;
  ordersData.forEach(o => {
    const userIdVal = o.user_id !== null ? o.user_id : 'NULL';
    const anonVal = o.anon !== null ? esc(o.anon) : 'NULL';
    sql += `INSERT INTO public.orders VALUES (${o.id}, '2026-10-01 14:30:00.000000', ${esc(o.status)}, ${o.total.toFixed(2)}, ${anonVal}, ${userIdVal});\n`;
  });

  sql += `\n-- Order Items\n`;
  ordersData.forEach(o => {
    o.items.forEach(it => {
      const subtotal = it.qty * it.price;
      sql += `INSERT INTO public.order_items VALUES (${orderItemId++}, ${it.qty}, ${subtotal.toFixed(2)}, ${it.cost.toFixed(2)}, ${it.price.toFixed(2)}, ${o.id}, ${it.prod});\n`;
    });
  });

  sql += `\n-- 8. Stock Movements\n`;
  stockMovementsData.forEach(s => {
    sql += `INSERT INTO public.stock_movements VALUES (${s.id}, '2026-10-05 16:00:00.000000', ${s.qty}, ${esc(s.type)}, ${s.prod}, ${s.cost.toFixed(2)}, ${s.margin.toFixed(2)}, ${s.sale.toFixed(2)}, ${esc(s.reason)});\n`;
  });

  sql += `\n-- 9. Store Settings\n`;
  sql += `INSERT INTO public.store_settings (setting_key, setting_value, updated_at, updated_by) VALUES ('card_fee_percent', '3.5', '2026-10-15 12:00:00.000000', 'admin') ON CONFLICT (setting_key) DO NOTHING;\n`;
  sql += `INSERT INTO public.store_settings (setting_key, setting_value, updated_at, updated_by) VALUES ('pix_discount_percent', '5.0', '2026-10-15 12:00:00.000000', 'admin') ON CONFLICT (setting_key) DO NOTHING;\n`;
  sql += `INSERT INTO public.store_settings (setting_key, setting_value, updated_at, updated_by) VALUES ('low_stock_threshold', '5', '2026-10-15 12:00:00.000000', 'admin') ON CONFLICT (setting_key) DO NOTHING;\n`;
  sql += `INSERT INTO public.store_settings (setting_key, setting_value, updated_at, updated_by) VALUES ('critical_stock_threshold', '2', '2026-10-15 12:00:00.000000', 'admin') ON CONFLICT (setting_key) DO NOTHING;\n`;

  // Sequences
  sql += `\n-- Sequences\n`;
  sql += `SELECT pg_catalog.setval('public.aquarium_notes_id_seq', ${notesData.length}, true);\n`;
  sql += `SELECT pg_catalog.setval('public.aquariums_id_seq', ${aquariumsData.length}, true);\n`;
  sql += `SELECT pg_catalog.setval('public.operators_id_seq', 2, true);\n`;
  sql += `SELECT pg_catalog.setval('public.order_items_id_seq', ${orderItemId - 1}, true);\n`;
  sql += `SELECT pg_catalog.setval('public.orders_id_seq', ${ordersData.length}, true);\n`;
  sql += `SELECT pg_catalog.setval('public.products_id_seq', ${productsData.length}, true);\n`;
  sql += `SELECT pg_catalog.setval('public.stock_movements_id_seq', ${stockMovementsData.length}, true);\n`;
  sql += `SELECT pg_catalog.setval('public.users_id_seq', ${customersData.length}, true);\n`;
  sql += `SELECT pg_catalog.setval('public.water_parameter_tests_id_seq', ${waterTestsData.length}, true);\n`;

  // Constraints & Foreign Keys
  sql += `\n-- Constraints & Foreign Keys\n`;
  sql += `ALTER TABLE ONLY public.aquarium_notes ADD CONSTRAINT aquarium_notes_pkey PRIMARY KEY (id);\n`;
  sql += `ALTER TABLE ONLY public.aquariums ADD CONSTRAINT aquariums_pkey PRIMARY KEY (id);\n`;
  sql += `ALTER TABLE ONLY public.operators ADD CONSTRAINT operators_pkey PRIMARY KEY (id);\n`;
  sql += `ALTER TABLE ONLY public.order_items ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);\n`;
  sql += `ALTER TABLE ONLY public.orders ADD CONSTRAINT orders_pkey PRIMARY KEY (id);\n`;
  sql += `ALTER TABLE ONLY public.products ADD CONSTRAINT products_pkey PRIMARY KEY (id);\n`;
  sql += `ALTER TABLE ONLY public.stock_movements ADD CONSTRAINT stock_movements_pkey PRIMARY KEY (id);\n`;
  sql += `ALTER TABLE ONLY public.operators ADD CONSTRAINT uk58mmd0h2pguuodlu4exjjib85 UNIQUE (username);\n`;
  sql += `ALTER TABLE ONLY public.products ADD CONSTRAINT uk63qdij7q2our6df3mhhmh1yxj UNIQUE (normalized_name);\n`;
  sql += `ALTER TABLE ONLY public.users ADD CONSTRAINT users_pkey PRIMARY KEY (id);\n`;
  sql += `ALTER TABLE ONLY public.water_parameter_tests ADD CONSTRAINT water_parameter_tests_pkey PRIMARY KEY (id);\n`;

  sql += `ALTER TABLE ONLY public.orders ADD CONSTRAINT fk32ql8ubntj5uh44ph9659tiih FOREIGN KEY (user_id) REFERENCES public.users(id);\n`;
  sql += `ALTER TABLE ONLY public.water_parameter_tests ADD CONSTRAINT fk3p53w5t50o01f20e0hnoneobx FOREIGN KEY (aquarium_id) REFERENCES public.aquariums(id);\n`;
  sql += `ALTER TABLE ONLY public.order_items ADD CONSTRAINT fkbioxgbv59vetrxe0ejfubep1w FOREIGN KEY (order_id) REFERENCES public.orders(id);\n`;
  sql += `ALTER TABLE ONLY public.aquarium_notes ADD CONSTRAINT fkdrxlsnw4rp9br6iwvsqfrmnn4 FOREIGN KEY (aquarium_id) REFERENCES public.aquariums(id);\n`;
  sql += `ALTER TABLE ONLY public.stock_movements ADD CONSTRAINT fkjcaag8ogfjxpwmqypi1wfdaog FOREIGN KEY (product_id) REFERENCES public.products(id);\n`;
  sql += `ALTER TABLE ONLY public.order_items ADD CONSTRAINT fkocimc7dtr037rh4ls4l95nlfi FOREIGN KEY (product_id) REFERENCES public.products(id);\n`;
  sql += `ALTER TABLE ONLY public.aquariums ADD CONSTRAINT fkuvp1qq8kuuw967s2ib5utfsu FOREIGN KEY (user_id) REFERENCES public.users(id);\n`;

  return sql;
}

const finalSql = buildSqlScript();
const initSqlPath = path.resolve(__dirname, '../docker/initdb/01-init.sql');
const seedCompleteSqlPath = path.resolve(__dirname, '../backend/store-management-api/scripts/seed-complete.sql');

fs.writeFileSync(initSqlPath, finalSql, 'utf8');
fs.writeFileSync(seedCompleteSqlPath, finalSql, 'utf8');

console.log('SUCCESS: Written clean concise test seeds (120 products, 15 clients, 25 aquariums, 20 orders)');
console.log(`- ${initSqlPath}`);
console.log(`- ${seedCompleteSqlPath}`);
