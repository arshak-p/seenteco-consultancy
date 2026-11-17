import { Block, Cta } from '../../components/blocks';
import { S, ORDER } from '../../lib/content';

export const metadata = {
  title: { absolute: 'Consulting Services | Seenteco' },
  description: 'Six practice areas, one team: ESG, energy, technology, management systems, Vision 2030 and agriculture advisory for Saudi organisations.',
  alternates: { canonical: '/services/' },
};

export default function Services() {
  return (
    <>
      <section className="sec t-deep intro-sec" style={{ paddingTop: 'clamp(104px,10vw,150px)', paddingBottom: 'calc(var(--wh) + 30px)' }}>
        <div className="wrap">
          <div className="eyebrow keep">Our services</div>
          <h1 className="h-xl rv" style={{ margin: '22px 0' }}>Six practice areas.<br />One accountable team.</h1>
          <p className="lead">Every service is delivered to recognised international standards and aligned with Saudi regulations from day one. Start with one practice area, or combine them into a single programme with one point of accountability.</p>
        </div>
      </section>
      {ORDER.map((k) => <Block s={S[k]} key={k} />)}
      <section className="sec t-deep why1">
        <i className="wv" />
        <div className="wrap">
          <h2 className="h-l rv">Why one integrated<br />team matters</h2>
          <p className="lead rv">Energy savings feed your carbon numbers. Carbon numbers feed your ESG report. Your management system keeps it all running. When one team handles all four, nothing is lost between consultants, and every figure ties back to the same data.</p>
        </div>
      </section>
      <Cta heading={<>Not sure where<br />to begin?</>} text="Tell us your goal. We will recommend the right first step." />
    </>
  );
}
