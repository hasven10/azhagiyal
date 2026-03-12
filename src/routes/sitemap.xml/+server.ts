import { SitemapStream, streamToPromise } from 'sitemap';

export async function GET() {

    const sm = new SitemapStream({
        hostname: 'https://azhagiyal.store'
    });

    sm.write({ url: '/', priority: 1 });
    sm.write({ url: '/fashion', priority: 0.9 });
    sm.write({ url: '/brass', priority: 0.9 });
    sm.write({ url: '/terracotta', priority: 0.9 });
    sm.write({ url: '/wood', priority: 0.9 });

    sm.end();

    const xml = await streamToPromise(sm);

    return new Response(xml.toString(), {
        headers: {
            'Content-Type': 'application/xml'
        }
    });
}