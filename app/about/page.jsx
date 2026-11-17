import { Cta, Steps, FaqSection } from '../../components/blocks';
import { SHOW_TEAM, VALUES, PRINCIPLES, MODELS } from '../../lib/content';

export const metadata = {
  title: { absolute: 'About Seenteco | Riyadh Consultancy' },
  description: 'Doctors, engineers and certified specialists delivering measurable sustainability and energy results across the Kingdom.',
  alternates: { canonical: '/about/' },
};

const Rows = ({ items }) => items.map(([a, b]) => <div className="pr rv" key={a}><h3>{a}</h3><p>{b}</p></div>);

export default function About() {
  return (
    <>
      <section className="sec about-hero">
        <div className="wrap">
          <h1 className="h-xl rv">Measured.<br />Local.<br />Hands-on.</h1>
          <div className="bar">
            <p className="lead">Seenteco is a Riyadh-based consultancy that unites sustainability, energy, technology, operational excellence and agriculture in one team. We don’t write strategies that sit on shelves. We deliver results you can measure, verify and report.</p>
            <a className="circle" href="#why" aria-label="Scroll down">↘</a>
          </div>
        </div>
      </section>

      <section className="sec t-moss why" id="why">
        <i className="wv" />
        <div className="wrap">
          <h2 className="h-xl rv" style={{ fontSize: 'clamp(40px,7vw,104px)' }}>Why we exist</h2>
          <div className="story">
            <p>Saudi organisations are being asked to do more than ever: cut energy use, disclose emissions, certify their systems and show progress on Vision 2030. Too often, that work is split between separate advisers who never compare notes.</p>
            <p>We built Seenteco to bring it together. One team of doctors, engineers and certified specialists who understand how energy savings become carbon reductions, how carbon data becomes an ESG report, and how a management system keeps the results coming.</p>
            <p>We are Saudi-based and Saudi-focused. We work to the Kingdom’s regulations, codes and programmes from day one, and we stay with our clients through implementation, not just until the report is delivered.</p>
          </div>
          <div className="mv">
            <div><h4>Our mission</h4><p>To help Saudi organisations turn sustainability and energy commitments into measurable, verified results.</p></div>
            <div><h4>Our vision</h4><p>To be the Kingdom’s most trusted partner for measurable sustainability.</p></div>
          </div>
        </div>
      </section>

      <section className="sec princ">
        <i className="wv" />
        <div className="wrap">
          <h2 className="h-l rv">Our values.</h2>
          <Rows items={VALUES} />
          <h2 className="h-l rv" style={{ marginTop: 'clamp(50px,7vw,100px)' }}>What you can<br />expect from us.</h2>
          <Rows items={PRINCIPLES} />
        </div>
      </section>

      <section className="sec t-deep models">
        <i className="wv" />
        <div className="wrap">
          <h2 className="h-l rv">Flexible ways<br />to work together.</h2>
          <p className="lead rv">Choose the model that fits your budget, timeline and appetite for results.</p>
          <div className="offer-g">{MODELS.map(([a, b]) => <article className="offer rv" key={a}><h3>{a}</h3><p>{b}</p></article>)}</div>
        </div>
      </section>

      <section className="sec proc">
        <i className="wv" />
        <div className="wrap">
          <h2 className="h-l rv">From baseline<br />to boardroom.</h2>
          <Steps />
        </div>
      </section>

      {SHOW_TEAM && <section className="sec team" id="team">
        <i className="wv" />
        <div className="wrap">
          <h2 className="h-l rv">Led by doctors, engineers<br />and certified specialists.</h2>
          <p className="lead rv">Academic depth meets field experience. Our consultants hold doctorates and international certifications across energy, sustainability and management systems.</p>
          <div className="tg">
            {[0, 1, 2].map((i) => (
              <article className="tc rv" key={i}>
                <div className="pic"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></svg><span>Photo coming soon</span></div><h4>Dr. Name Surname</h4>
                <dl><div><dt>Role</dt><dd>Coming soon</dd></div><div><dt>Credentials</dt><dd>Coming soon</dd></div><div><dt>Practice area</dt><dd>Coming soon</dd></div></dl>
              </article>
            ))}
          </div>
        </div>
      </section>}

      <FaqSection />

      <Cta heading={<>Work with people who<br />measure what matters.</>} text="Tell us where you want to be. We will show you how to get there, and how to prove it." />
    </>
  );
}
