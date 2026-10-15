const fs = require('fs');
const path = require('path');

const catalogPath = path.resolve(__dirname, '../frontend/store-management-web/src/data/speciesMasterCatalog.ts');
// Read SPECIES_MASTER_CATALOG from speciesMasterCatalog.ts
const catalogTs = fs.readFileSync(catalogPath, 'utf8');
const match = catalogTs.match(/export const SPECIES_MASTER_CATALOG: MasterSpecies\[\] = (\[[\s\S]*?\])\s*export function/);
if (!match) {
  throw new Error('Could not parse SPECIES_MASTER_CATALOG from speciesMasterCatalog.ts');
}
const masterCatalog = JSON.parse(match[1]);
console.log('Loaded master species:', masterCatalog.length);

const initSqlPath = path.resolve(__dirname, '../docker/initdb/01-init.sql');
const seedCompleteSqlPath = path.resolve(__dirname, '../backend/store-management-api/scripts/seed-complete.sql');

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
      // Fix ID 1 name
      if (id === 1) {
        cleanedLine = cleanedLine
          .replace("Peixe-palhaço Ocellaris (Amphiprion ocellaris)", "Peixe-palhaço Comum (Amphiprion ocellaris)")
          .replace("peixe-palhaço ocellaris (amphiprion ocellaris)", "peixe-palhaço comum (amphiprion ocellaris)")
          .replace("palhaco-ocellaris-comum.jpg", "071_ocellaris_snowflake.jpg");
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
  // Extract normalized_name (column 11)
  const parts = pLine.match(/'([^']*)'/g);
  if (parts && parts.length >= 2) {
    const norm = parts[parts.length - 3] ? parts[parts.length - 3].replace(/'/g, '').toLowerCase().trim() : '';
    if (norm) existingNormNames.add(norm);
  }
}

// Generate new rows for products 106+
const newProductRowsInit = [];
let nextId = 106;

for (const sp of masterCatalog) {
  const norm = sp.name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  // Check if already in 1-105
  let alreadyExists = false;
  for (const ex of existingNormNames) {
    const cleanEx = ex.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
    if (cleanEx === norm || norm.includes(cleanEx) || cleanEx.includes(norm)) {
      alreadyExists = true;
      break;
    }
  }

  if (alreadyExists) continue;

  const paddedBarcode = `789000000${String(nextId).padStart(4, '0')}`;
  const costPrice = '35.00';
  const salePrice = '75.00';
  const profitMargin = '114.29';
  const quantity = '12';
  const escapedName = sp.name.replace(/'/g, "''");
  const normName = sp.name.toLowerCase().replace(/'/g, "''");
  const imgSlug = sp.imageSlug ? `'${sp.imageSlug.replace(/'/g, "''")}'` : 'NULL';

  const row = `INSERT INTO public.products VALUES (${nextId}, true, '${paddedBarcode}', ${costPrice}, '2026-09-02 23:34:02.980895', '${escapedName}', ${profitMargin}, ${quantity}, ${salePrice}, 'LIVING', '${normName}', ${imgSlug}, '${sp.subCategory}');`;
  newProductRowsInit.push(row);
  existingNormNames.add(norm);
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
    // Include 'VALUES' line next
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
      // do not push old product row
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

// First the base 105 items formatted nicely
for (const pLine of baseProducts105) {
  // Parse fields from INSERT INTO public.products VALUES (...)
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

// Next the new species from masterCatalog
for (const sp of masterCatalog) {
  const norm = sp.name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  // Check against 1-105
  let foundIn105 = false;
  for (const bLine of baseProducts105) {
    if (bLine.toLowerCase().includes(norm.slice(0, 15))) {
      foundIn105 = true;
      break;
    }
  }
  if (foundIn105) continue;

  const paddedBarcode = `78900000${String(1000 + seedBarcodeCounter++).slice(1)}`;
  const escapedName = sp.name.replace(/'/g, "''");
  const normName = sp.name.toLowerCase().replace(/'/g, "''");
  const imgSlug = sp.imageSlug ? `'${sp.imageSlug.replace(/'/g, "''")}'` : 'NULL';

  seedValues.push(`    ('${escapedName}', '${normName}', 'LIVING', '${sp.subCategory}', ${imgSlug}, 12, 35.00, 75.00, 114.29, '${paddedBarcode}', true, CURRENT_TIMESTAMP - INTERVAL '40 days')`);
}

const finalSeedSql = [
  ...beforeProducts,
  seedValues.join(',\n') + ';',
  ...afterProducts
].join('\n');

fs.writeFileSync(seedCompleteSqlPath, finalSeedSql, 'utf8');
console.log('SUCCESS: Written backend/store-management-api/scripts/seed-complete.sql');
