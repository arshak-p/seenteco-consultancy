import { DOMAIN } from '../lib/content';

export const dynamic = 'force-static';

export default function robots() {
  return { rules: [{ userAgent: '*', allow: '/', disallow: '/api/' }], sitemap: `${DOMAIN}/sitemap.xml` };
}
