import Link from 'next/link';
import { Cta } from '../../../components/blocks';
import { STORIES } from '../../../lib/stories';

export const dynamicParams = false;
// the static export needs at least one entry; while there are no stories this is a harmless blank page (not linked, not indexed)
export function generateStaticParams() { return STORIES.length ? STORIES.map((s) => ({ slug: s.slug })) : [{ slug: 'none' }]; }

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = STORIES.find((x) => x.slug === slug);
  return s ? { title: { absolute: `${s.headline} | Seenteco` }, description: s.challenge, alternates: { canonical: `/client-stories/${slug}/` } } : { title: { absolute: 'Client Stories | Seenteco' }, robots: { index: false, follow: false } };
}

export default async function Story({ params }) {
  const { slug } = await params;
  const s = STORIES.find((x) => x.slug === slug);
  if (!s) return <section className="sec page-hero" style={{ minHeight: '60vh' }}><div className="wrap"><h1 className="h-l">Story not found.</h1><p className="lead" style={{ marginTop: 20 }}><Link href="/client-stories/">← All client stories</Link></p></div></section>;
  return (
    <>
      <section className="sec page-hero" style={{ paddingBottom: 'var(--wh)' }}>
        <div className="wrap">
          <Link className="back" href="/client-stories/" style={{ marginTop: 0 }}>← All client stories</Link>
          <div className="art-meta"><span>{s.sector}</span><span>{s.practice}</span></div>
          <h1 className="h-l rv">{s.headline}</h1>
          <p className="lead">{s.client}</p>
          <div className="story-res">{s.results.map((r) => <div className="vl" key={r.label}><b>{r.figure}</b><span>{r.label}</span></div>)}</div>
          <div className="art-body">
            <h2>The challenge</h2><p>{s.challenge}</p>
            <h2>What we did</h2><p>{s.did}</p>
            {s.quote && <blockquote className="art-quote">“{s.quote}”<cite>{s.quoteBy}</cite></blockquote>}
            {s.video && <div className="mapbox"><iframe title="Client video interview" src={s.video} loading="lazy" allowFullScreen /></div>}
          </div>
        </div>
      </section>
      <Cta heading={<>Want results<br />like these?</>} text="Tell us your goal. We will show you what is possible." />
    </>
  );
}
