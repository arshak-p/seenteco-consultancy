import { Cta } from './blocks';

export default function Legal({ title, intro, sections, ctaHeading }) {
  return (
    <>
      <section className="sec page-hero legal" style={{ paddingBottom: 'var(--wh)' }}>
        <div className="wrap">
          <h1 className="h-l rv">{title}</h1>
          <p className="lead">{intro}</p>
          {sections.map(([a, b]) => <div key={a}><h3>{a}</h3><p>{b}</p></div>)}
          <p className="small" style={{ marginTop: 40 }}>Last updated 2026. This page should be reviewed by a legal adviser before launch.</p>
        </div>
      </section>
      <Cta heading={ctaHeading} text="Get in touch and a member of our team will help." />
    </>
  );
}
