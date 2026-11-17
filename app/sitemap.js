import { DOMAIN, ORDER, ARTICLES, ARTICLE_BODIES } from '../lib/content';
import { STORIES } from '../lib/stories';

export const dynamic = 'force-static';

export default function sitemap() {
  const paths = ['/', '/services/', ...ORDER.map((k) => `/services/${k}/`), '/industries/', '/insights/', '/about/', '/faq/', '/contact/', '/privacy/', '/terms/',
    ...ARTICLES.filter((a) => ARTICLE_BODIES[a[5]]).map((a) => `/insights/${a[5]}/`),      // only articles that have their full text
    ...(STORIES.length ? ['/client-stories/', ...STORIES.map((s) => `/client-stories/${s.slug}/`)] : [])];
  return paths.map((p) => ({ url: DOMAIN + p }));
}
