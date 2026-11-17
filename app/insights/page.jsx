import Link from 'next/link';
import { Cta, Ph } from '../../components/blocks';
import { ARTICLES, ARTICLE_BODIES } from '../../lib/content';

export const metadata = {
  title: { absolute: 'Insights | Seenteco' },
  description: 'Practical guidance from our experts on the regulations, standards and decisions shaping Saudi business.',
  alternates: { canonical: '/insights/' },
};

export default function Insights() {
  return (
    <>
      <section className="sec page-hero" style={{ paddingBottom: 'var(--wh)' }}>
        <div className="wrap">
          <h1 className="h-xl rv">Clear thinking on sustainability, energy and operations in the Kingdom.</h1>
          <div className="bar"><p className="lead">Practical guidance from our experts on the regulations, standards and decisions shaping Saudi business.</p><a className="circle" href="#ideas" aria-label="Scroll to articles">↘</a></div>
          <div className="cards" id="ideas" style={{ marginTop: 'clamp(30px,4vw,60px)' }}>
            {ARTICLES.map(([tag, t, d, ph, feat, slug]) => (
              <Link href={`/insights/${slug}/`} className={`card rv${feat ? ' feat' : ''}`} key={t}>
                <Ph k={ph} />
                <div>
                  <div className="meta"><span>{tag}</span><span>{ARTICLE_BODIES[slug] ? 'Article' : 'Coming soon'}</span></div>
                  <h3 style={{ marginTop: 12 }}>{t}</h3><p style={{ marginTop: 10 }}>{d}</p>
                  <span className="more">Read the article →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Cta heading={<>Want this thinking<br />applied to your site?</>} text="Tell us your goal. We will recommend the right first step." />
    </>
  );
}
