import Link from 'next/link';
import { Cta } from '../../components/blocks';
import { STORIES } from '../../lib/stories';

export const metadata = {
  title: { absolute: 'Client Stories | Seenteco' },
  description: 'Real projects and verified numbers, in our clients\u2019 own words.',
  alternates: { canonical: '/client-stories/' },
  robots: STORIES.length ? undefined : { index: false, follow: false },     // hidden until the first approved story
};

export default function ClientStories() {
  return (
    <>
      <section className="sec page-hero" style={{ paddingBottom: 'var(--wh)' }}>
        <div className="wrap">
          <h1 className="h-xl rv">Results our<br />clients can measure.</h1>
          <p className="lead">Real projects and verified numbers, in our clients’ own words.</p>
          {STORIES.length === 0
            ? <p className="lead" style={{ marginTop: 40, opacity: 0.8 }}>Our first client stories will be published here soon.</p>
            : (
              <div className="cards" style={{ marginTop: 'clamp(30px,4vw,60px)' }}>
                {STORIES.map((s) => (
                  <Link href={`/client-stories/${s.slug}/`} className="card rv" key={s.slug}>
                    <div><div className="meta"><span>{s.sector}</span><span>{s.practice}</span></div>
                      <h3 style={{ marginTop: 12 }}>{s.headline}</h3><p style={{ marginTop: 10 }}>{s.client}</p><span className="more">Read the story →</span></div>
                  </Link>
                ))}
              </div>
            )}
        </div>
      </section>
      <Cta heading={<>Want results<br />like these?</>} text="Tell us your goal. We will show you what is possible." />
    </>
  );
}
