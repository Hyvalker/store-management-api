const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

const DEST_DIR = path.resolve(__dirname, '../frontend/store-management-web/public/images/animals');
if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

const t1Path = 'C:/Users/hyva/Downloads/Argon Tier 1/catalogo_150_imagens_curadas.json';
const t2Path = 'C:/Users/hyva/Downloads/Argon Tier 2/catalogo_tier2_151_a_300.json';
const t3Path = 'C:/Users/hyva/Downloads/Argon Tier 3/catalogo_flora_301_a_360.json';

const items = [];
if (fs.existsSync(t1Path)) items.push(...JSON.parse(fs.readFileSync(t1Path, 'utf8')));
if (fs.existsSync(t2Path)) items.push(...JSON.parse(fs.readFileSync(t2Path, 'utf8')));
if (fs.existsSync(t3Path)) items.push(...JSON.parse(fs.readFileSync(t3Path, 'utf8')));

console.log(`Total items to inspect for download: ${items.length}`);

function downloadFile(urlStr, destPath, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects < 0) return reject(new Error('Too many redirects'));

    let parsed;
    try {
      parsed = new URL(urlStr);
    } catch (e) {
      return reject(new Error(`Invalid URL: ${urlStr}`));
    }

    const client = parsed.protocol === 'https:' ? https : http;
    const req = client.get(
      urlStr,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        },
        timeout: 15000,
      },
      (res) => {
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          const redirectUrl = new URL(res.headers.location, urlStr).toString();
          return resolve(downloadFile(redirectUrl, destPath, maxRedirects - 1));
        }

        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode}`));
        }

        const fileStream = fs.createWriteStream(destPath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve(true);
        });
        fileStream.on('error', (err) => {
          fs.unlink(destPath, () => {});
          reject(err);
        });
      }
    );

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    req.on('error', reject);
  });
}

function getExtension(url) {
  const cleanUrl = url.split('?')[0].toLowerCase();
  if (cleanUrl.endsWith('.webp')) return '.webp';
  if (cleanUrl.endsWith('.png')) return '.png';
  if (cleanUrl.endsWith('.jpeg')) return '.jpeg';
  return '.jpg';
}

async function run() {
  const existingFiles = new Set(fs.readdirSync(DEST_DIR));
  let downloaded = 0;
  let alreadyPresent = 0;
  let failed = 0;

  // Process concurrently with a pool of 6
  const queue = [...items];
  const workers = Array(6)
    .fill(null)
    .map(async (_, workerId) => {
      while (queue.length > 0) {
        const item = queue.shift();
        if (!item || !item.image_url) continue;

        const ext = getExtension(item.image_url);
        // Normalize slug: replace whitespace or special chars
        const safeSlug = item.slug.trim().replace(/\s+/g, '_');
        const filename = `${safeSlug}${ext}`;
        const destPath = path.join(DEST_DIR, filename);

        // Check if any file with this slug already exists (>1000 bytes)
        const match = [...existingFiles].find(
          (f) => f.startsWith(safeSlug + '.') || f.startsWith(item.slug + '.')
        );

        if (match) {
          const stats = fs.statSync(path.join(DEST_DIR, match));
          if (stats.size > 1000) {
            alreadyPresent++;
            continue;
          }
        }

        try {
          await downloadFile(item.image_url, destPath);
          const stats = fs.statSync(destPath);
          if (stats.size < 500) {
            fs.unlinkSync(destPath);
            throw new Error(`File too small (${stats.size} bytes)`);
          }
          existingFiles.add(filename);
          downloaded++;
          console.log(`[Worker ${workerId}] OK: ${item.slot} -> ${filename} (${stats.size} bytes)`);
        } catch (e) {
          failed++;
          console.error(`[Worker ${workerId}] FAIL: ${item.slot} ${item.nome} (${e.message})`);
        }
      }
    });

  await Promise.all(workers);
  console.log('==============================');
  console.log(`Finished: Downloaded=${downloaded}, AlreadyPresent=${alreadyPresent}, Failed=${failed}`);
}

run().catch(console.error);
