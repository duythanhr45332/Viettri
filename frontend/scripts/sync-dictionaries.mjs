import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wpBaseUrl =
  process.env.WORDPRESS_INTERNAL_URL ||
  process.env.WORDPRESS_URL ||
  (process.env.NEXT_PUBLIC_WORDPRESS_URL
    ? process.env.NEXT_PUBLIC_WORDPRESS_URL.replace(/\/graphql\/?$/, '')
    : 'https://viettrilegacylakeside.vn');

const locales = ['vi', 'en'];

async function fetchDictionary(locale) {
  const endpoints = [
    `${wpBaseUrl}/wp-json/viettri/v1/dictionary?lang=${locale}`,
    `${wpBaseUrl}/index.php?rest_route=/viettri/v1/dictionary&lang=${locale}`,
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`Fetching ${locale.toUpperCase()} dictionary from ${endpoint}...`);
      const res = await fetch(endpoint, {
        headers: { Accept: 'application/json' },
      });

      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const json = await res.json();
        if (json && typeof json === 'object' && Object.keys(json).length > 0) {
          return json;
        }
      }
    } catch (err) {
      console.warn(`Failed fetching from ${endpoint}:`, err.message);
    }
  }

  throw new Error(`Could not fetch valid dictionary for locale: ${locale}`);
}

async function sync() {
  console.log(`\n🔄 Syncing dictionaries from WordPress (${wpBaseUrl})...\n`);

  const dictionariesDir = path.resolve(__dirname, '../src/dictionaries');

  for (const locale of locales) {
    try {
      const data = await fetchDictionary(locale);
      const filePath = path.join(dictionariesDir, `${locale}.json`);
      const formattedJson = JSON.stringify(data, null, 2) + '\n';

      fs.writeFileSync(filePath, formattedJson, 'utf-8');
      console.log(`✅ Updated: src/dictionaries/${locale}.json (${Object.keys(data).length} root sections)`);
    } catch (err) {
      console.error(`❌ Error updating ${locale}.json:`, err.message);
    }
  }

  console.log('\n✨ Dictionary sync completed!\n');
}

sync();
