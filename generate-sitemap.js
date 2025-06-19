import admin from 'firebase-admin';
import { Buffer } from 'buffer';
import fs from 'fs';

const serviceAccountJson = Buffer.from(process.env.VITE_SERVICE_ACCOUNT_KEY, 'base64').toString('utf-8');
const serviceAccount = JSON.parse(serviceAccountJson);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
  
const db = admin.firestore();
const baseUrl = 'https://eventurelly.com';

async function generateSitemap() {
  const staticRoutes = [
    '/',
    '/sign-in',
    '/sign-up',  
    '/2fa-auth',
    '/verify-email',
    '/forgot-password',
    '/password-success',
    '/search',
    '/team-building-events',
    '/demo-request',
  ];

  const urls = staticRoutes.map(route => `${baseUrl}${route}`);

  for (const collectionName of ['events', 'bookings']) {
    const snapshot = await db.collection(collectionName).get();
    console.log(`✅ Found ${snapshot.size} docs in ${collectionName}`);

    snapshot.forEach(doc => {
      const slug = doc.data().slug;
      const id = doc.id;

      if (id && slug) {
        console.log(`📦 Adding URLs for ${collectionName}/${id}/${slug}`);
        urls.push(`${baseUrl}/book-event/${collectionName}/${id}/${slug}`);
        urls.push(`${baseUrl}/event-details/${collectionName}/${id}/${slug}`);
        urls.push(`${baseUrl}/edit-event/${collectionName}/${id}/${slug}`);
      } else {
        console.warn(`⚠️ Missing id or slug in ${collectionName} doc:`, doc.data());
      }
    });
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    url => `  <url>
    <loc>${url}</loc>
  </url>`
  )
  .join('\n')}
</urlset>`;

  fs.mkdirSync('./public', { recursive: true });
  fs.writeFileSync('./public/sitemap.xml', sitemapXml);
  console.log('✅ Sitemap generated successfully.');
}

generateSitemap().catch(console.error);
