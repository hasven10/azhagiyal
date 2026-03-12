export async function GET() {

    const xml = `
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://azhagiyal.store/</loc>
    </url>
    <url>
      <loc>https://azhagiyal.store/fashion</loc>
    </url>
    <url>
      <loc>https://azhagiyal.store/brass</loc>
    </url>
    <url>
      <loc>https://azhagiyal.store/terracotta</loc>
    </url>
    <url>
      <loc>https://azhagiyal.store/wood</loc>
    </url>
  </urlset>
  `;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml"
        }
    });
}