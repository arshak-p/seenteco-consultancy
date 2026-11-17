import { notFound } from 'next/navigation';
import Link from 'next/link';
import Btn from '../../../components/Btn';
import { Cta, Ph } from '../../../components/blocks';
import { ARTICLES, ARTICLE_BODIES, ARTICLE_BYLINES } from '../../../lib/content';

export const dynamicParams = false;
export function generateStaticParams() { return ARTICLES.map((a) => ({ slug: a[5] })); }

const find = (slug) => ARTICLES.find((a) => a[5] === slug);

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = find(slug);
  if (!a) return {};
  return { title: { absolute: `${a[1]} | Seenteco` }, description: a[2], alternates: { canonical: `/insights/${slug}/` },
    robots: ARTICLE_BODIES[slug] ? undefined : { index: false, follow: true },     // not indexed until the full article is added
    openGraph: { title: a[1], description: a[2] } };
}

export default async function Article({ params }) {
  const { slug } = await params;
  const a = find(slug);
  if (!a) notFound();
  const [tag, title, summary, ph] = a;
  const body = ARTICLE_BODIES[slug], by = ARTICLE_BYLINES[slug];
  const related = ARTICLES.filter((x) => x[5] !== slug).slice(0, 2);
  return (
    <>
      <section className="sec page-hero art-hero" style={{ paddingBottom: 'var(--wh)' }}>
        <div className="wrap">
          <Link className="back" href="/insights/" style={{ marginTop: 0 }}>← Back to Insights</Link>
          <div className="art-meta"><span>{tag}</span>{by && <span>{by}</span>}</div>
          <h1 className="h-l rv">{title}</h1>
          <p className="lead art-sum">{summary}</p>
          <div className="art-img"><Ph k={ph} /></div>
          <div className="art-body">
            {body
              ? body.map((b, i) => <div key={i}>{b.h && <h2>{b.h}</h2>}<p>{b.p}</p></div>)
              : <div className="art-soon"><h2>The full article is being prepared.</h2><p>Our experts are writing this piece. Want the answer sooner? Talk to a consultant about it today.</p><Btn href="/contact/" cls="sm">Talk to a consultant</Btn></div>}
          </div>
        </div>
      </section>
      <section className="sec t-deep art-rel">
        <i className="wv" />
        <div className="wrap">
          <h2 className="h-l rv">More from<br />Insights.</h2>
          <div className="cards">
            {related.map(([t2, ti, d, p2, , s2]) => (
              <Link href={`/insights/${s2}/`} className="card rv" key={s2}><Ph k={p2} /><div><div className="meta"><span>{t2}</span><span>Read the article →</span></div><h3 style={{ marginTop: 12 }}>{ti}</h3><p style={{ marginTop: 10 }}>{d}</p></div></Link>
            ))}
          </div>
        </div>
      </section>
      <Cta heading={<>Want this thinking<br />applied to your site?</>} text="Tell us your goal. We will recommend the right first step." />
    </>
  );
}
