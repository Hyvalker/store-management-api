const fs = require('fs');
const path = require('path');

const catalogPath = path.resolve(__dirname, '../frontend/store-management-web/src/data/speciesMasterCatalog.ts');
const catalogTs = fs.readFileSync(catalogPath, 'utf8');
const match = catalogTs.match(/export const SPECIES_MASTER_CATALOG: MasterSpecies\[\] = (\[[\s\S]*?\])\s*export function/);
if (!match) {
  throw new Error('Could not parse SPECIES_MASTER_CATALOG from speciesMasterCatalog.ts');
}
const masterCatalog = JSON.parse(match[1]);
console.log('Loaded master species:', masterCatalog.length);

const animalsDir = path.resolve(__dirname, '../frontend/store-management-web/public/images/animals');
const onDisk = new Set(fs.readdirSync(animalsDir));
console.log('Verified Argon images on disk:', onDisk.size);

const initSqlPath = path.resolve(__dirname, '../docker/initdb/01-init.sql');
const seedCompleteSqlPath = path.resolve(__dirname, '../backend/store-management-api/scripts/seed-complete.sql');

// Helper to find verified Argon image for a given product name
function resolveArgonImage(name, currentImg) {
  if (currentImg && currentImg !== 'NULL' && onDisk.has(currentImg)) {
    return currentImg;
  }
  const clean = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  const found = masterCatalog.find(c => {
    const cClean = c.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
    if (cClean === clean) return true;
    if (c.synonyms && c.synonyms.some(s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim() === clean)) return true;
    return false;
  });
  if (found && found.imageSlug && onDisk.has(found.imageSlug)) {
    return found.imageSlug;
  }
  return null;
}

// 1. Process 01-init.sql
let initSql = fs.readFileSync(initSqlPath, 'utf8');

// Update check constraint in 01-init.sql to include MARINE_INVERTEBRATE and FRESHWATER_INVERTEBRATE
initSql = initSql.replace(
  /CONSTRAINT products_sub_category_check CHECK \(\(\(sub_category\)::text = ANY \(\(ARRAY\[(.*?)\]\)::text\[\]\)\)\)/,
  "CONSTRAINT products_sub_category_check CHECK (((sub_category)::text = ANY ((ARRAY['CORAL'::character varying, 'MARINE_FISH'::character varying, 'FRESHWATER_FISH'::character varying, 'MARINE_INVERTEBRATE'::character varying, 'FRESHWATER_INVERTEBRATE'::character varying, 'INVERTEBRATE'::character varying, 'PLANT'::character varying, 'OTHER_LIVING'::character varying, 'EQUIPMENT'::character varying, 'SUPPLY'::character varying, 'OTHER_PRODUCT'::character varying])::text[])))"
);

// Split lines
const initLines = initSql.split('\n');
const baseProducts105 = [];
const otherInitLinesBefore = [];
const otherInitLinesAfter = [];

let inProductsSection = false;
let doneProductsSection = false;

for (let i = 0; i < initLines.length; i++) {
  const line = initLines[i];
  if (line.startsWith('INSERT INTO public.products VALUES')) {
    inProductsSection = true;
    const idMatch = line.match(/VALUES \((\d+),/);
    const id = idMatch ? parseInt(idMatch[1], 10) : 0;
    if (id >= 1 && id <= 105) {
      let cleanedLine = line;
      if (id === 1) {
        cleanedLine = cleanedLine
          .replace("Peixe-palhaço Ocellaris (Amphiprion ocellaris)", "Peixe-palhaço Comum (Amphiprion ocellaris)")
          .replace("peixe-palhaço ocellaris (amphiprion ocellaris)", "peixe-palhaço comum (amphiprion ocellaris)");
      }
      
      // Parse name and current image
      const m = cleanedLine.match(/VALUES \((\d+), (true|false), '([^']*)', ([\d.]+), '([^']*)', '([^']*)', ([\d.]+), (\d+), ([\d.]+), '([^']*)', '([^']*)', (NULL|'[^']*'), '([^']*)'\);/);
      if (m) {
        const prodName = m[6];
        const rawImg = m[12] === 'NULL' ? null : m[12].replace(/'/g, '');
        const validImg = resolveArgonImage(prodName, rawImg);
        const imgRepl = validImg ? `'${validImg}'` : 'NULL';
        cleanedLine = `INSERT INTO public.products VALUES (${m[1]}, ${m[2]}, '${m[3]}', ${m[4]}, '${m[5]}', '${prodName}', ${m[7]}, ${m[8]}, ${m[9]}, '${m[10]}', '${m[11]}', ${imgRepl}, '${m[13]}');`;
      }

      baseProducts105.push(cleanedLine);
    }
  } else {
    if (!inProductsSection) {
      otherInitLinesBefore.push(line);
    } else {
      doneProductsSection = true;
      otherInitLinesAfter.push(line);
    }
  }
}

console.log('Preserved base products (1-105) in 01-init.sql:', baseProducts105.length);

// Build map of normalized names already present in 1-105
const existingNormNames = new Set();
for (const pLine of baseProducts105) {
  const m = pLine.match(/VALUES \(\d+, (?:true|false), '[^']*', [\d.]+, '[^']*', '([^']*)', [\d.]+, \d+, [\d.]+, '[^']*', '([^']*)'/);
  if (m) {
    existingNormNames.add(m[2].toLowerCase().trim());
  }
}

// Generate new rows for products 106+
const newProductRowsInit = [];
let nextId = 106;

for (const sp of masterCatalog) {
  const normName = sp.name.toLowerCase().trim();
  if (existingNormNames.has(normName)) continue;

  const paddedBarcode = `789000000${String(nextId).padStart(4, '0')}`;
  const costPrice = '35.00';
  const salePrice = '75.00';
  const profitMargin = '114.29';
  const quantity = '12';
  const escapedName = sp.name.replace(/'/g, "''");
  const escapedNormName = normName.replace(/'/g, "''");
  const imgSlug = (sp.imageSlug && onDisk.has(sp.imageSlug)) ? `'${sp.imageSlug.replace(/'/g, "''")}'` : 'NULL';

  const row = `INSERT INTO public.products VALUES (${nextId}, true, '${paddedBarcode}', ${costPrice}, '2026-09-02 23:34:02.980895', '${escapedName}', ${profitMargin}, ${quantity}, ${salePrice}, 'LIVING', '${escapedNormName}', ${imgSlug}, '${sp.subCategory}');`;
  newProductRowsInit.push(row);
  existingNormNames.add(normName);
  nextId++;
}

console.log('Added non-duplicate species rows for 01-init.sql:', newProductRowsInit.length);
console.log('Total products in 01-init.sql:', baseProducts105.length + newProductRowsInit.length);

const finalInitSql = [
  ...otherInitLinesBefore,
  ...baseProducts105,
  ...newProductRowsInit,
  ...otherInitLinesAfter
].join('\n');

fs.writeFileSync(initSqlPath, finalInitSql, 'utf8');
console.log('SUCCESS: Written docker/initdb/01-init.sql');

// 2. Process backend/store-management-api/scripts/seed-complete.sql
let seedCompleteSql = fs.readFileSync(seedCompleteSqlPath, 'utf8');
const seedLines = seedCompleteSql.split('\n');

const beforeProducts = [];
const afterProducts = [];
let inSeedProducts = false;
let finishedSeedProducts = false;

for (let i = 0; i < seedLines.length; i++) {
  const line = seedLines[i];
  if (line.includes('INSERT INTO products (name, normalized_name,')) {
    inSeedProducts = true;
    beforeProducts.push(line);
    if (seedLines[i+1] && seedLines[i+1].trim() === 'VALUES') {
      beforeProducts.push(seedLines[i+1]);
      i++;
    }
    continue;
  }

  if (inSeedProducts && !finishedSeedProducts) {
    if (line.trim().endsWith(';')) {
      finishedSeedProducts = true;
      inSeedProducts = false;
    } else if (line.startsWith('-- 8.')) {
      finishedSeedProducts = true;
      inSeedProducts = false;
      afterProducts.push(line);
    }
  } else if (!inSeedProducts) {
    if (finishedSeedProducts) {
      afterProducts.push(line);
    } else {
      beforeProducts.push(line);
    }
  }
}

// Generate values for seed-complete.sql
const seedValues = [];
let seedBarcodeCounter = 1;

for (const pLine of baseProducts105) {
  const m = pLine.match(/VALUES \(\d+, true, '([^']*)', ([\d.]+), '[^']*', '([^']*)', ([\d.]+), (\d+), ([\d.]+), '([^']*)', '([^']*)', (NULL|'[^']*'), '([^']*)'\);/);
  if (m) {
    const barcode = m[1];
    const cost = m[2];
    const name = m[3];
    const profit = m[4];
    const qty = m[5];
    const sale = m[6];
    const type = m[7];
    const norm = m[8];
    const img = m[9];
    const subCat = m[10];
    seedValues.push(`    ('${name}', '${norm}', '${type}', '${subCat}', ${img}, ${qty}, ${cost}, ${sale}, ${profit}, '${barcode}', true, CURRENT_TIMESTAMP - INTERVAL '40 days')`);
  }
}

const seedNormNames = new Set();
for (const val of seedValues) {
  const parts = val.split("', '");
  if (parts.length >= 2) {
    seedNormNames.add(parts[1].toLowerCase().trim());
  }
}

for (const sp of masterCatalog) {
  const normName = sp.name.toLowerCase().trim();
  if (seedNormNames.has(normName)) continue;

  const paddedBarcode = `78900000${String(1000 + seedBarcodeCounter++).slice(1)}`;
  const escapedName = sp.name.replace(/'/g, "''");
  const escapedNormName = normName.replace(/'/g, "''");
  const imgSlug = (sp.imageSlug && onDisk.has(sp.imageSlug)) ? `'${sp.imageSlug.replace(/'/g, "''")}'` : 'NULL';

  seedValues.push(`    ('${escapedName}', '${escapedNormName}', 'LIVING', '${sp.subCategory}', ${imgSlug}, 12, 35.00, 75.00, 114.29, '${paddedBarcode}', true, CURRENT_TIMESTAMP - INTERVAL '40 days')`);
  seedNormNames.add(normName);
}

const finalSeedSql = [
  ...beforeProducts,
  seedValues.join(',\n') + ';',
  ...afterProducts
].join('\n');

fs.writeFileSync(seedCompleteSqlPath, finalSeedSql, 'utf8');
console.log('SUCCESS: Written backend/store-management-api/scripts/seed-complete.sql');
