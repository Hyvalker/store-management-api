const fs = require('fs');
const path = require('path');

const t1 = JSON.parse(fs.readFileSync('C:/Users/hyva/Downloads/Argon Tier 1/catalogo_150_imagens_curadas.json', 'utf8'));
const t2 = JSON.parse(fs.readFileSync('C:/Users/hyva/Downloads/Argon Tier 2/catalogo_tier2_151_a_300.json', 'utf8'));
const t3 = JSON.parse(fs.readFileSync('C:/Users/hyva/Downloads/Argon Tier 3/catalogo_flora_301_a_360.json', 'utf8'));

const all = [...t1, ...t2, ...t3];

console.log('Total entries:', all.length);

const comboKeywords = ['/', '&', ' e ', ' e/ou '];
const combos = all.filter(x => {
  // Check if it's a combo by name or keywords
  return x.nome.includes('/') || x.nome.includes('&') || x.nome.includes(' e ');
});

console.log('Total combo entries to dismantle:', combos.length);

const comboSlots = combos.map(c => ({
  slot: c.slot,
  slug: c.slug,
  bloco: c.bloco,
  nome: c.nome,
  source_title: c.source_title
}));

fs.writeFileSync(path.resolve(__dirname, 'combos_inventory.json'), JSON.stringify(comboSlots, null, 2), 'utf8');
console.log('Saved combos_inventory.json');
