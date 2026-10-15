const fs = require('fs');
const path = require('path');
const { jsPDF } = require('../frontend/store-management-web/node_modules/jspdf');

// Read speciesMasterCatalog.ts
const catalogTsPath = path.resolve(__dirname, '../frontend/store-management-web/src/data/speciesMasterCatalog.ts');
const catalogTs = fs.readFileSync(catalogTsPath, 'utf8');
const match = catalogTs.match(/export const SPECIES_MASTER_CATALOG: MasterSpecies\[\] = (\[[\s\S]*?\])\s*export function/);
const masterCatalog = JSON.parse(match[1]);

// Read curated_fallback_log.json for slot and detail
const logPath = path.resolve(__dirname, '../curated_fallback_log.json');
const auditLog = JSON.parse(fs.readFileSync(logPath, 'utf8'));
const auditMap = new Map(auditLog.map(a => [a.id, a]));

// Filter species without image
const missingSpecies = masterCatalog.filter(s => !s.imageSlug || s.imageSlug.trim() === '');
console.log('Total missing species for PDF report:', missingSpecies.length);

// Group by section
const bySection = {};
for (const s of missingSpecies) {
  const sec = s.section || 'Outros';
  if (!bySection[sec]) bySection[sec] = [];
  bySection[sec].push(s);
}

// Generate PDF (A4 Portrait: 210mm x 297mm)
const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4'
});

const pageWidth = 210;
const pageHeight = 297;
const margin = 14;
const contentWidth = pageWidth - (margin * 2);

let y = 14;

function drawHeader(pageNum) {
  // Top bar background
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(margin, 10, contentWidth, 18, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('BAMBA AQUA  |  RELATÓRIO DE ESPÉCIES E MORFOTIPOS SEM IMAGEM', margin + 4, 18);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text('Levantamento de pendências fotográficas para curadoria e busca de imagens', margin + 4, 24);

  doc.setTextColor(56, 189, 248); // sky-400
  doc.text(`Pág. ${pageNum}`, margin + contentWidth - 16, 21);

  y = 34;
}

function drawFooter(pageNum, totalPages) {
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(margin, pageHeight - 12, margin + contentWidth, pageHeight - 12);

  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('Bamba Aqua - Sistema de Gestão & Catálogo Comercial  |  Padrão: Nome Popular Base + Morfotipo (Nome Científico)', margin, pageHeight - 8);
  doc.text(`Página ${pageNum} de ${totalPages}`, margin + contentWidth - 22, pageHeight - 8);
}

// --- PAGE 1: COVER & EXECUTIVE SUMMARY ---
drawHeader(1);

// Title banner
doc.setFillColor(241, 245, 249);
doc.roundedRect(margin, y, contentWidth, 34, 3, 3, 'F');

doc.setTextColor(30, 41, 59);
doc.setFontSize(14);
doc.setFont('helvetica', 'bold');
doc.text('Auditoria de Espécies Desmembradas Pendentes de Foto', margin + 5, y + 8);

doc.setFontSize(8.5);
doc.setFont('helvetica', 'normal');
doc.setTextColor(71, 85, 105);
doc.text('Este documento lista minuciosamente todas as espécies e morfotipos que foram individualizados', margin + 5, y + 15);
doc.text('a partir do desmembramento de combos ou slots sem foto no acervo curado do Argon.', margin + 5, y + 20);
doc.text('O sistema garante que nenhum animal compartilhe foto errada (regra de ouro: zero falsos positivos).', margin + 5, y + 25);
doc.text('Data de Emissão: 15/10/2026  |  Total de Pendências Auditadas: ' + missingSpecies.length + ' espécimes', margin + 5, y + 30);

y += 40;

// Metric Cards
const cardWidth = (contentWidth - 6) / 3;

// Card 1: Total Master Catalog
doc.setFillColor(248, 250, 252);
doc.setDrawColor(203, 213, 225);
doc.roundedRect(margin, y, cardWidth, 22, 2, 2, 'FD');
doc.setFontSize(7.5);
doc.setTextColor(100, 116, 139);
doc.text('TOTAL NO CATÁLOGO', margin + 4, y + 6);
doc.setFontSize(14);
doc.setFont('helvetica', 'bold');
doc.setTextColor(15, 23, 42);
doc.text(String(masterCatalog.length), margin + 4, y + 16);

// Card 2: Imagens Argon
doc.setFillColor(240, 253, 244);
doc.setDrawColor(187, 247, 208);
doc.roundedRect(margin + cardWidth + 3, y, cardWidth, 22, 2, 2, 'FD');
doc.setFontSize(7.5);
doc.setFont('helvetica', 'normal');
doc.setTextColor(22, 101, 52);
doc.text('FOTOS CURADAS ARGON', margin + cardWidth + 7, y + 6);
doc.setFontSize(14);
doc.setFont('helvetica', 'bold');
doc.setTextColor(21, 128, 61);
doc.text(String(masterCatalog.length - missingSpecies.length), margin + cardWidth + 7, y + 16);

// Card 3: Pendentes de Imagem
doc.setFillColor(254, 242, 242);
doc.setDrawColor(254, 202, 202);
doc.roundedRect(margin + (cardWidth * 2) + 6, y, cardWidth, 22, 2, 2, 'FD');
doc.setFontSize(7.5);
doc.setFont('helvetica', 'normal');
doc.setTextColor(153, 27, 27);
doc.text('PENDENTES DE FOTO', margin + (cardWidth * 2) + 10, y + 6);
doc.setFontSize(14);
doc.setFont('helvetica', 'bold');
doc.setTextColor(185, 28, 28);
doc.text(String(missingSpecies.length), margin + (cardWidth * 2) + 10, y + 16);

y += 28;

// Table header function
function drawTableHeader() {
  doc.setFillColor(30, 41, 59); // slate-800
  doc.rect(margin, y, contentWidth, 7, 'F');

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);

  doc.text('ID', margin + 2, y + 4.8);
  doc.text('NOME OFICIAL DA ESPÉCIE / MORFOTIPO (1:1)', margin + 14, y + 4.8);
  doc.text('SUBCATEGORIA', margin + 115, y + 4.8);
  doc.text('ORIGEM / SLOT ARGON', margin + 148, y + 4.8);

  y += 7;
}

drawTableHeader();

let pageCount = 1;

for (const [sectionName, speciesList] of Object.entries(bySection)) {
  // Check section header space
  if (y > pageHeight - 30) {
    doc.addPage();
    pageCount++;
    drawHeader(pageCount);
    drawTableHeader();
  }

  // Section divider
  doc.setFillColor(224, 231, 255); // indigo-100
  doc.rect(margin, y, contentWidth, 6, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 27, 75); // indigo-950
  doc.text(`${sectionName.toUpperCase()} (${speciesList.length} pendências)`, margin + 3, y + 4.3);
  y += 6;

  let rowIdx = 0;
  for (const sp of speciesList) {
    if (y > pageHeight - 20) {
      doc.addPage();
      pageCount++;
      drawHeader(pageCount);
      drawTableHeader();
    }

    const rowBg = (rowIdx % 2 === 0) ? [255, 255, 255] : [248, 250, 252];
    doc.setFillColor(rowBg[0], rowBg[1], rowBg[2]);
    doc.rect(margin, y, contentWidth, 5.8, 'F');

    // ID
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 116, 139);
    doc.text(sp.id, margin + 2, y + 4);

    // Name
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    const displayName = sp.name.length > 56 ? sp.name.substring(0, 54) + '...' : sp.name;
    doc.text(displayName, margin + 14, y + 4);

    // SubCategory
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(sp.subCategory, margin + 115, y + 4);

    // Slot
    const auditInfo = auditMap.get(sp.id);
    const slotTxt = auditInfo && auditInfo.slot ? auditInfo.slot : '-';
    doc.setTextColor(14, 116, 144);
    doc.text(slotTxt, margin + 148, y + 4);

    y += 5.8;
    rowIdx++;
  }

  y += 2;
}

// Add page footers
const totalPages = doc.internal.getNumberOfPages();
for (let p = 1; p <= totalPages; p++) {
  doc.setPage(p);
  drawFooter(p, totalPages);
}

// Write PDF to disk
const rootPdfPath = path.resolve(__dirname, '../ESPECIES_DESMEMBRADAS_SEM_IMAGEM.pdf');
const brainPdfPath = 'C:/Users/hyva/.gemini/antigravity-cli/brain/32c3f10d-d747-4967-8044-ee200ccfbece/ESPECIES_DESMEMBRADAS_SEM_IMAGEM.pdf';

const pdfBytes = Buffer.from(doc.output('arraybuffer'));
fs.writeFileSync(rootPdfPath, pdfBytes);
fs.writeFileSync(brainPdfPath, pdfBytes);

console.log('SUCCESS: Written PDF to:', rootPdfPath);
console.log('SUCCESS: Written PDF to brain artifact path:', brainPdfPath);
console.log('Total PDF pages generated:', totalPages);
