
import admin from "firebase-admin";
import { Buffer } from "buffer";
import fs from "fs";
import path from "path";


const serviceAccountJson = Buffer.from(
  process.env.VITE_SERVICE_ACCOUNT_KEY,
  "base64"
).toString("utf-8");
const serviceAccount = JSON.parse(serviceAccountJson);

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const baseUrl = "https://eventurelly.com";

// Helper: ISO date (YYYY-MM-DD)
const isoDate = (d = new Date()) => d.toISOString().split("T")[0];

// Routes
const STATIC_ROUTES = [
  "/",
  "/search",
  "/team-building-events",
  "/demo-request",
  "/privacy-policy",
  "/terms-and-conditions",
];

// Routes we don’t want in sitemap (sign-in, auth, etc.)
const EXCLUDED = new Set([
  "/sign-in",
  "/sign-up",
  "/2fa-auth",
  "/verify-email",
  "/forgot-password",
  "/password-success",
  "/unauthorized",
]);

async function generateSitemap() {
  const urls = [];

  // Add static routes with priority and changefreq
  STATIC_ROUTES.forEach((route) => {
    if (!EXCLUDED.has(route)) {
      urls.push({
        loc: `${baseUrl}${route}`,
        lastmod: isoDate(),
        changefreq: "weekly", // static pages usually update weekly
        priority: "0.7",
      });
    }
  });

  // Add Firestore-based routes with custom priority and changefreq
  for (const collectionName of ["events", "bookings"]) {
    const snapshot = await db.collection(collectionName).get();
    console.log(`✅ Found ${snapshot.size} docs in ${collectionName}`);

    snapshot.forEach((doc) => {
      const data = doc.data();
      const slug = data.slug;
      const id = doc.id;

      if (id && slug) {
        console.log(`📦 Adding URLs for ${collectionName}/${id}/${slug}`);

        [
          {
            route: `/book-event/${collectionName}/${id}/${slug}`,
            changefreq: "weekly",
            priority: "0.8",
          },
          {
            route: `/event-details/${collectionName}/${id}/${slug}`,
            changefreq: "weekly",
            priority: "0.9",
          },
          {
            route: `/edit-event/${collectionName}/${id}/${slug}`,
            changefreq: "weekly",
            priority: "0.6",
          },
        ].forEach(({ route, changefreq, priority }) =>
          urls.push({
            loc: `${baseUrl}${route}`,
            lastmod: isoDate(data.updatedAt?.toDate?.() || new Date()),
            changefreq,
            priority,
          })
        );
      } else {
        console.warn(`⚠️ Missing id or slug in ${collectionName} doc:`, data);
      }
    });
  }

  // Build XML with priority and changefreq tags
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, lastmod, changefreq, priority }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  // Write file
  const publicDir = path.resolve("./public");
  fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf8");

  console.log("✅ Sitemap generated successfully at ./public/sitemap.xml");
}

// Run
generateSitemap().catch((err) => {
  console.error("❌ Error generating sitemap:", err);
  process.exit(1);
});
