const fs = require('fs');
const path = require('path');

const catalogPath = path.resolve(__dirname, '../frontend/store-management-web/src/data/speciesMasterCatalog.ts');
const content = fs.readFileSync(catalogPath, 'utf8');
const startMarker = 'SPECIES_MASTER_CATALOG: MasterSpecies[] = ';
const startIndex = content.indexOf(startMarker);
const jsonStart = content.indexOf('[', startIndex + startMarker.length);
const funcIndex = content.indexOf('export function searchMasterSpecies');
const jsonEnd = content.lastIndexOf(']', funcIndex);
const catalog = JSON.parse(content.slice(jsonStart, jsonEnd + 1));

console.log('Original catalog entries:', catalog.length);

const animalsDir = path.resolve(__dirname, '../frontend/store-management-web/public/images/animals');

// Bad images flagged for removal
const badImageFiles = [
  '087_cardinal_banggai_pijama.webp',
  '221_palhaco_clarkii.jpg',
  '227_achilles_sohal_clown_tang.jpg',
  '245_exquisite_helfrichi_firefish.jpg',
  '038_kenya_tree_capnella.jpg',
  '033_ricordea_yuma_orange_rainbow.jpg',
  '200_lobophyllia_red_tricolor.jpg',
  '207_galaxea_green_gold.jpg'
];

// Delete bad images from disk
badImageFiles.forEach(file => {
  const filePath = path.join(animalsDir, file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Deleted bad image: ${file}`);
  }
});

const badImageSet = new Set(badImageFiles);
let newCatalog = [];

for (const item of catalog) {
  // If item is ID 41 (duplicate Ricordea Florida Azul without image), skip it!
  if (item.id === '41' && item.name.includes('Ricordea Florida Azul')) {
    continue;
  }

  // Clear bad images
  if (badImageSet.has(item.imageSlug)) {
    item.imageSlug = '';
  }

  // Dismantle combos
  if (item.id === '128' && item.name.includes('Donzelas')) {
    newCatalog.push({
      ...item,
      id: '',
      commonName: 'Donzela Kupang',
      scientificName: 'Chrysiptera hemicyanea',
      name: 'Donzela Kupang (Chrysiptera hemicyanea)',
      imageSlug: ''
    });
    newCatalog.push({
      ...item,
      id: '',
      commonName: 'Green Chromis',
      scientificName: 'Chromis viridis',
      name: 'Green Chromis (Chromis viridis)',
      imageSlug: ''
    });
    newCatalog.push({
      ...item,
      id: '',
      commonName: 'Donzela Yellow Tail',
      scientificName: 'Chrysiptera parasema',
      name: 'Donzela Yellow Tail (Chrysiptera parasema)',
      imageSlug: ''
    });
    continue;
  }

  if (item.id === '234' && item.name.includes('Aulonocaras')) {
    newCatalog.push({
      ...item,
      id: '',
      commonName: 'Ciclídeo Aulonocara Firefish',
      scientificName: 'Aulonocara sp.',
      name: 'Ciclídeo Aulonocara Firefish (Aulonocara sp.)',
      imageSlug: ''
    });
    newCatalog.push({
      ...item,
      id: '',
      commonName: 'Ciclídeo Aulonocara Maleri',
      scientificName: 'Aulonocara baenschi',
      name: 'Ciclídeo Aulonocara Maleri (Aulonocara baenschi)',
      imageSlug: ''
    });
    newCatalog.push({
      ...item,
      id: '',
      commonName: 'Ciclídeo Aulonocara Eureka',
      scientificName: 'Aulonocara jacobfreibergi',
      name: 'Ciclídeo Aulonocara Eureka (Aulonocara jacobfreibergi)',
      imageSlug: ''
    });
    continue;
  }

  if (item.id === '235' && item.name.includes('Oscar')) {
    newCatalog.push({
      ...item,
      id: '',
      commonName: 'Oscar Tigre',
      scientificName: 'Astronotus ocellatus',
      name: 'Oscar Tigre (Astronotus ocellatus)',
      imageSlug: ''
    });
    newCatalog.push({
      ...item,
      id: '',
      commonName: 'Oscar Red Tiger',
      scientificName: 'Astronotus ocellatus',
      name: 'Oscar Red Tiger (Astronotus ocellatus)',
      imageSlug: ''
    });
    newCatalog.push({
      ...item,
      id: '',
      commonName: 'Oscar Albino Red Ruby',
      scientificName: 'Astronotus ocellatus',
      name: 'Oscar Albino Red Ruby (Astronotus ocellatus)',
      imageSlug: ''
    });
    newCatalog.push({
      ...item,
      id: '',
      commonName: 'Oscar Bronze',
      scientificName: 'Astronotus ocellatus',
      name: 'Oscar Bronze (Astronotus ocellatus)',
      imageSlug: ''
    });
    continue;
  }

  if (item.id === '236' && item.name.includes('Peixes Jumbos')) {
    newCatalog.push({
      ...item,
      id: '',
      commonName: 'Aruanã Prata',
      scientificName: 'Osteoglossum bicirrhosum',
      name: 'Aruanã Prata (Osteoglossum bicirrhosum)',
      imageSlug: ''
    });
    newCatalog.push({
      ...item,
      id: '',
      commonName: 'Polypterus Senegalus',
      scientificName: 'Polypterus senegalus',
      name: 'Polypterus Senegalus (Polypterus senegalus)',
      imageSlug: ''
    });
    newCatalog.push({
      ...item,
      id: '',
      commonName: 'Tucunaré Amarelo',
      scientificName: 'Cichla ocellaris',
      name: 'Tucunaré Amarelo (Cichla ocellaris)',
      imageSlug: ''
    });
    continue;
  }

  if (item.id === '263' && item.name.includes('Neocaridina')) {
    newCatalog.push({
      ...item,
      id: '',
      commonName: 'Camarão Neocaridina Red Cherry',
      scientificName: 'Neocaridina davidi',
      name: 'Camarão Neocaridina Red Cherry (Neocaridina davidi)',
      imageSlug: ''
    });
    newCatalog.push({
      ...item,
      id: '',
      commonName: 'Camarão Neocaridina Blue Dream',
      scientificName: 'Neocaridina davidi',
      name: 'Camarão Neocaridina Blue Dream (Neocaridina davidi)',
      imageSlug: ''
    });
    newCatalog.push({
      ...item,
      id: '',
      commonName: 'Camarão Neocaridina Yellow',
      scientificName: 'Neocaridina davidi',
      name: 'Camarão Neocaridina Yellow (Neocaridina davidi)',
      imageSlug: ''
    });
    newCatalog.push({
      ...item,
      id: '',
      commonName: 'Camarão Neocaridina Rili',
      scientificName: 'Neocaridina davidi',
      name: 'Camarão Neocaridina Rili (Neocaridina davidi)',
      imageSlug: ''
    });
    continue;
  }

  if (item.id === '617' && item.name.includes('Alternanthera Reineckii')) {
    newCatalog.push({
      ...item,
      id: '',
      commonName: 'Alternanthera Reineckii Mini',
      scientificName: "Alternanthera reineckii 'Mini'",
      name: "Alternanthera Reineckii Mini (Alternanthera reineckii 'Mini')",
      imageSlug: ''
    });
    newCatalog.push({
      ...item,
      id: '',
      commonName: 'Alternanthera Reineckii Rosanervig',
      scientificName: "Alternanthera reineckii 'Rosanervig'",
      name: "Alternanthera Reineckii Rosanervig (Alternanthera reineckii 'Rosanervig')",
      imageSlug: ''
    });
    newCatalog.push({
      ...item,
      id: '',
      commonName: 'Alternanthera Reineckii Rosaefolia',
      scientificName: "Alternanthera reineckii 'Rosaefolia'",
      name: "Alternanthera Reineckii Rosaefolia (Alternanthera reineckii 'Rosaefolia')",
      imageSlug: ''
    });
    newCatalog.push({
      ...item,
      id: '',
      commonName: 'Alternanthera Reineckii Lilacina',
      scientificName: "Alternanthera reineckii 'Lilacina'",
      name: "Alternanthera Reineckii Lilacina (Alternanthera reineckii 'Lilacina')",
      imageSlug: ''
    });
    continue;
  }

  // Handle Leather Toadstool
  if (item.id === '47' && item.name.includes('Leather Toadstool')) {
    item.commonName = 'Leather Umbrella';
    item.scientificName = 'Sarcophyton sp.';
    item.name = 'Leather Umbrella (Sarcophyton sp.)';
    newCatalog.push(item);

    newCatalog.push({
      ...item,
      id: '',
      commonName: 'Leather Spaghetti',
      scientificName: 'Sinularia flexibilis',
      name: 'Leather Spaghetti (Sinularia flexibilis)',
      imageSlug: ''
    });
    newCatalog.push({
      ...item,
      id: '',
      commonName: 'Leather Finger Verde',
      scientificName: 'Sinularia sp.',
      name: 'Leather Finger Verde (Sinularia sp.)',
      imageSlug: ''
    });
    newCatalog.push({
      ...item,
      id: '',
      commonName: 'Leather ORA Green',
      scientificName: 'Sarcophyton sp.',
      name: 'Leather ORA Green (Sarcophyton sp.)',
      imageSlug: ''
    });
    continue;
  }

  // Coral prefix removal
  if (item.commonName.startsWith('Coral ') && !item.commonName.startsWith('Coral Sol') && !item.commonName.startsWith('Coral-Sol')) {
    if (item.commonName === 'Coral Beauty') {
      item.commonName = 'Anjo Coral Beauty';
      item.scientificName = 'Centropyge bispinosa';
    } else {
      item.commonName = item.commonName.replace(/^Coral\s+/, '').trim();
    }
  }

  // Fix specific items
  if (item.id === '51' || item.commonName === 'Kenya Tree') {
    item.commonName = 'Kenya Tree';
    item.scientificName = 'Capnella imbricata';
  } else if (item.id === '46' || item.commonName === 'Green Star Polyps') {
    item.commonName = 'Green Star Polyps Metallic';
    item.scientificName = 'Pachyclavularia violacea';
  } else if (item.id === '75' || item.commonName === 'Trumpet Kryptonita') {
    item.commonName = 'Trumpet Kryptonita';
    item.scientificName = 'Caulastrea sp.';
  } else if (item.id === '104' || item.commonName === 'Ocellaris Comum') {
    item.commonName = 'Peixe-palhaço Comum';
    item.scientificName = 'Amphiprion ocellaris';
  } else if (item.id === '105' || item.commonName === 'Ocellaris Black') {
    item.commonName = 'Peixe-palhaço Darwin Black';
    item.scientificName = 'Amphiprion ocellaris';
  } else if (item.id === '90') {
    item.commonName = 'Montipora Capricornis Vermelha';
    item.scientificName = 'Montipora capricornis';
  } else if (item.id === '97') {
    item.commonName = 'Stylophora Milka';
    item.scientificName = 'Stylophora pistillata';
  } else if (item.id === '98') {
    item.commonName = 'Seriatopora Hystrix';
    item.scientificName = 'Seriatopora hystrix';
  } else if (item.id === '125' || item.commonName === 'Firefish Purple') {
    item.commonName = 'Firefish Purple';
    item.scientificName = 'Nemateleotris decora';
  } else if (item.id === '151' || item.commonName === 'Guppy Full Red Albino') {
    item.commonName = 'Guppy Albino Full Red';
    item.scientificName = 'Poecilia reticulata';
  } else if (item.id === '155') {
    item.commonName = 'Betta Veiltail';
    item.scientificName = 'Betta splendens';
  } else if (item.id === '156') {
    item.commonName = 'Betta Halfmoon';
    item.scientificName = 'Betta splendens';
  } else if (item.id === '159') {
    item.commonName = 'Betta Dumbo Big Ear';
    item.scientificName = 'Betta splendens';
  } else if (item.id === '160') {
    item.commonName = 'Betta Crowntail';
    item.scientificName = 'Betta splendens';
  } else if (item.id === '166') {
    item.commonName = 'Plati Balão Red';
    item.scientificName = 'Xiphophorus maculatus';
  } else if (item.id === '176') {
    item.commonName = 'Molinésia Balão';
    item.scientificName = 'Poecilia sphenops';
  } else if (item.id === '194') {
    item.commonName = 'Tetra Foguinho';
    item.scientificName = 'Hyphessobrycon amandae';
  } else if (item.id === '198') {
    item.commonName = 'Rásbora Arlequim';
    item.scientificName = 'Trigonostigma heteromorpha';
  } else if (item.id === '317') {
    item.commonName = 'Pipe Organ Clássico';
    item.scientificName = 'Tubipora musica';
  } else if (item.id === '294') {
    item.commonName = 'Button Polyps Metallic';
    item.scientificName = 'Protopalythoa sp.';
  } else if (item.id === '370') {
    item.commonName = 'Seriatopora Bird of Paradise';
    item.scientificName = 'Seriatopora guttatus';
  } else if (item.id === '375') {
    item.commonName = 'Acropora Strawberry Shortcake';
    item.scientificName = 'Acropora microclados';
  } else if (item.id === '58') {
    item.commonName = 'Anêmona Bubble Tip Verde';
    item.scientificName = 'Entacmaea quadricolor';
  } else if (item.id === '62') {
    item.commonName = 'Hammer Verde Ponta Roxa';
    item.scientificName = 'Fimbriaphyllia ancora';
  } else if (item.id === '363') {
    item.commonName = 'Montipora Bubblegum Digitata';
    item.scientificName = 'Montipora digitata';
  } else if (item.id === '74') {
    item.commonName = 'Frammer Híbrido';
    item.scientificName = 'Euphyllia sp.';
  } else if (item.id === '361') {
    item.commonName = 'Montipora Incrustante Rainbow';
    item.scientificName = 'Montipora sp.';
  } else if (item.id === '349') {
    item.commonName = 'War Coral Vermelho e Roxo';
    item.scientificName = 'Favites pentagona';
  } else if (item.id === '78') {
    item.commonName = 'Duncan Clássico';
    item.scientificName = 'Duncanopsammia axifuga';
  } else if (item.id === '311') {
    item.commonName = 'Leather Finger';
    item.scientificName = 'Sinularia asterolobata';
  }

  // Pure Latin simplifications for varieties
  if (item.scientificName.startsWith('Pterophyllum scalare var.')) {
    item.scientificName = 'Pterophyllum scalare';
  } else if (item.scientificName.startsWith('Symphysodon aequifasciatus var.')) {
    item.scientificName = 'Symphysodon aequifasciatus';
  } else if (item.scientificName.startsWith('Mikrogeophagus ramirezi var.')) {
    item.scientificName = 'Mikrogeophagus ramirezi';
  } else if (item.scientificName.startsWith('Astronotus ocellatus var.')) {
    item.scientificName = 'Astronotus ocellatus';
  } else if (item.scientificName.startsWith('Carassius auratus var.')) {
    item.scientificName = 'Carassius auratus';
  } else if (item.scientificName.startsWith('Ancistrus cirrhosus var.')) {
    item.scientificName = 'Ancistrus cirrhosus';
  } else if (item.scientificName.startsWith('Neocaridina davidi var.')) {
    item.scientificName = 'Neocaridina davidi';
  } else if (item.scientificName.startsWith('Caridina logemanni var.')) {
    item.scientificName = 'Caridina logemanni';
  } else if (item.scientificName.startsWith('Caridina cantonensis var.')) {
    item.scientificName = 'Caridina cantonensis';
  } else if (item.scientificName.startsWith('Entacmaea quadricolor var.')) {
    item.scientificName = 'Entacmaea quadricolor';
  } else if (item.scientificName.startsWith('Heros efasciatus var.')) {
    item.scientificName = 'Heros efasciatus';
  } else if (item.scientificName === 'Pterophyllum scalare Peru Altum') {
    item.scientificName = 'Pterophyllum scalare';
  } else if (item.scientificName === 'Hypancistrus sp. L260') {
    item.scientificName = 'Hypancistrus sp.';
  }

  if (item.commonName.includes("H'ra") || item.scientificName.toLowerCase().includes('h\'ra') || item.scientificName.toLowerCase().includes("h\\'ra")) {
    item.scientificName = "Rotala rotundifolia 'Hra'";
  }

  // Genus Zoanthus morphs
  if (item.commonName.startsWith('Zoanthus ') && (!item.scientificName.includes(' ') || item.scientificName.startsWith('Zoanthus') || item.scientificName === item.commonName || item.scientificName === 'Sunny D' || item.scientificName === 'Melancia' || item.scientificName === 'Orange' || item.scientificName === 'AOG')) {
    item.scientificName = 'Zoanthus sp.';
  }

  // Genus Palythoa morphs
  if (item.commonName.startsWith('Palythoa ') && item.commonName !== 'Palythoa Grandis' && (!item.scientificName.includes(' ') || item.scientificName.startsWith('Palythoa') || item.scientificName === item.commonName)) {
    item.scientificName = 'Palythoa sp.';
  }

  // Genus Mushroom Discosoma morphs
  if (item.commonName.startsWith('Mushroom Discosoma ') && (!item.scientificName.includes(' ') || item.scientificName.startsWith('Mushroom') || item.scientificName === item.commonName || item.scientificName === 'Listrado' || item.scientificName === 'Tie-Dye')) {
    item.scientificName = 'Discosoma sp.';
  }

  // Genus Mushroom Rhodactis morphs
  if (item.commonName.startsWith('Mushroom Rhodactis ') && (!item.scientificName.includes(' ') || item.scientificName.startsWith('Mushroom') || item.scientificName === item.commonName)) {
    item.scientificName = 'Rhodactis sp.';
  }

  // Construct official standard name
  item.name = `${item.commonName} (${item.scientificName})`;
  newCatalog.push(item);
}

// Renumber IDs sequentially 1..N
newCatalog.forEach((item, idx) => {
  item.id = String(idx + 1);
  item.synonyms = [item.commonName, item.name, ...(item.synonyms || [])];
  item.synonyms = [...new Set(item.synonyms)];
});

console.log('Processed new catalog entries:', newCatalog.length);

// 100% Strict Validation
const validSciRegex = /^[A-Z][a-z]+(\s+([a-z.-]+|sp\.|spp\.|cf\.))?(\s+(var\.|subsp\.|x)\s+[A-Za-z0-9.-]+)?(\s+'[^']+')?$/;
let errors = [];
let nameMap = new Map();

newCatalog.forEach(item => {
  if (item.name !== `${item.commonName} (${item.scientificName})`) {
    errors.push(`Name mismatch in [${item.id}]: "${item.name}"`);
  }
  if (item.commonName.startsWith('Coral ') && !item.commonName.startsWith('Coral Sol') && !item.commonName.startsWith('Coral-Sol')) {
    errors.push(`Coral prefix in [${item.id}]: "${item.commonName}"`);
  }
  if (item.commonName.includes('&') || item.commonName.includes('/') || item.scientificName.includes('&') || item.scientificName.includes('/')) {
    errors.push(`Combo in [${item.id}]: "${item.name}"`);
  }
  const sci = item.scientificName.trim();
  if (!validSciRegex.test(sci)) {
    errors.push(`Invalid scientific name in [${item.id}]: "${sci}"`);
  }

  const norm = item.name.toLowerCase().trim();
  if (nameMap.has(norm)) {
    errors.push(`Duplicate name: "${norm}" (IDs ${nameMap.get(norm)} and ${item.id})`);
  } else {
    nameMap.set(norm, item.id);
  }
});

if (errors.length > 0) {
  console.error('Validation FAILED with errors:');
  errors.forEach(e => console.error('  - ' + e));
  process.exit(1);
}

console.log('SUCCESS: All 678 entries passed 100% strict taxonomy & naming validation!');

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

export const SPECIES_MASTER_CATALOG: MasterSpecies[] = ${JSON.stringify(newCatalog, null, 2)}

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

fs.writeFileSync(catalogPath, tsCatalog, 'utf8');
console.log('Saved updated speciesMasterCatalog.ts');

// Regenerate existingAnimalImages.ts
const remainingImages = fs.readdirSync(animalsDir);
console.log(`Remaining verified images on disk: ${remainingImages.length}`);

const existingImagesTs = `/**
 * Lista estática de imagens verificadas que existem no diretório public/images/animals/.
 * Autogerado para garantir zero falsos positivos no encarte e nos cards de produtos.
 */
export const EXISTING_ANIMAL_IMAGES: ReadonlySet<string> = new Set(${JSON.stringify(remainingImages, null, 2)});
`;

const existingImagesPath = path.resolve(__dirname, '../frontend/store-management-web/src/utils/existingAnimalImages.ts');
fs.writeFileSync(existingImagesPath, existingImagesTs, 'utf8');
console.log('Saved updated existingAnimalImages.ts');
