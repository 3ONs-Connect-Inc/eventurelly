
import admin from 'firebase-admin';
import { Buffer } from 'buffer';
import fs from 'fs';

const serviceAccountJson = Buffer.from(process.env.VITE_SERVICE_ACCOUNT_KEY, 'base64').toString('utf-8');

const serviceAccount = JSON.parse(serviceAccountJson);

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const baseUrl = 'https://eventurelly.com'; // replace with your domain

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

  const eventsSnapshot = await db.collection('events').get();
  eventsSnapshot.forEach(doc => {
    const { collectionName, id, slug } = doc.data();
    if (collectionName && id && slug) {
      urls.push(`${baseUrl}/book-event/${collectionName}/${id}/${slug}`);
      urls.push(`${baseUrl}/event-details/${collectionName}/${id}/${slug}`);
      urls.push(`${baseUrl}/edit-event/${collectionName}/${id}/${slug}`);
    }
  });

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
