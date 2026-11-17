import Btn from '../components/Btn';
import Word from '../components/Word';
import { Block, Cta, Steps, FaqSection } from '../components/blocks';
import { SHOW_TEAM, S, ORDER, STANDARDS, OFFERS, V2030, IND_NAMES, DOMAIN } from '../lib/content';
import { STORIES } from '../lib/stories';
import Link from 'next/link';

export const metadata = {
  title: { absolute: 'Seenteco | Sustainability & Energy Consulting, Riyadh' },
  description: 'Cut energy costs, report ESG with confidence and deliver on Vision 2030. Saudi consultancy for sustainability, energy and operations.',
  alternates: { canonical: '/' },
};

const LD = {
  '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'Seenteco', url: DOMAIN, logo: DOMAIN + '/assets/logo.png',
  description: 'Sustainability, energy, technology, operational excellence and agriculture consulting for the Kingdom of Saudi Arabia.',
  address: { '@type': 'PostalAddress', streetAddress: 'King Fahad Road, Ar Rahmaniyah', addressLocality: 'Riyadh', postalCode: '12341', addressCountry: 'SA' }, areaServed: 'SA', openingHours: 'Su-Th 08:00-17:00',
};

export default function Home() {
  return (
    <>
      <section className="sec home-hero">
        <div className="wrap">
          <div className="wordbox"><Word text="SEENTECO" fit={0.98} fitm={0.98} /></div>
          <div className="hh-cols">
            <h1 className="h-xl rv">Sustainability that pays for itself.</h1>
            <div className="side">
              <p className="lead">We help Saudi organisations cut energy costs, report ESG with confidence and deliver on Vision 2030. Every result measured, verified and ready for the boardroom.</p>
              <div className="btns"><Btn href="/contact/" cls="dark">Book a consultation</Btn><Btn href="/services/" cls="line">Explore our services</Btn></div>
              <div className="vlabels">
                <div className="vl"><b>Baseline</b><span>Know exactly where your energy and emissions go.</span></div>
                <div className="vl"><b>Verified</b><span>Savings proven to international M&amp;V standards.</span></div>
              </div>
            </div>
          </div>
          <div className="stds"><h3>Standards we work to</h3><div className="chips-g">{STANDARDS.map((x) => <span key={x}>{x}</span>)}</div></div>
        </div>
      </section>

      <section className="sec t-moss offers">
        <i className="wv" />
        <div className="wrap">
          <h2 className="h-l rv">Start smart.<br />Scale with confidence.</h2>
          <p className="lead rv">Three focused engagements with clear deliverables. Each one creates value on its own and opens the door to what comes next.</p>
          <div className="offer-g">
            {OFFERS.map(([a, b, c, d]) => (
              <article className="offer rv" key={a}><h3>{a}</h3><p className="hook">{b}</p><p>{c}</p><div className="dlv"><b>Deliverable</b>{d}</div></article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec t-green intro-sec">
        <i className="wv" />
        <div className="wrap">
          <div className="eyebrow keep">Our services</div>
          <h2 className="h-l rv">One partner.<br />Six ways to<br />transform.</h2>
          <p className="lead">Sustainability, energy, technology, operations and agriculture under one roof, so your strategy, data and delivery finally speak the same language.</p>
        </div>
      </section>

      {ORDER.map((k) => <Block s={S[k]} key={k} />)}

      <section className="sec t-deep v30">
        <i className="wv" />
        <div className="wrap">
          <h2 className="h-l rv">Built for the<br />Kingdom’s ambition.</h2>
          <p className="lead rv">Saudi Arabia has committed to net zero by 2060, and regulators are raising the bar on efficiency, compliance and disclosure. We turn these requirements into a clear plan, and the plan into results.</p>
          <div className="rows">{V2030.map(([a, b]) => <div className="row-i rv" key={a}><h3>{a}</h3><p>{b}</p><span className="a" /></div>)}</div>
        </div>
      </section>

      <section className="sec proc">
        <i className="wv" />
        <div className="wrap">
          <h2 className="h-l rv">From baseline<br />to boardroom.</h2>
          <p className="lead rv" style={{ marginBottom: 34 }}>A disciplined four-stage method. No guesswork, no shelf-ware, just decisions backed by data.</p>
          <Steps />
        </div>
      </section>

      <section className="sec t-moss indtease">
        <i className="wv" />
        <div className="wrap">
          <h2 className="h-l rv">Deep in the sectors<br />that power<br />the Kingdom.</h2>
          <p className="lead rv">We focus where energy, emissions and compliance have the biggest impact on cost and reputation.</p>
          <ul className="tags big">{IND_NAMES.map((n) => <li key={n}><Link href="/industries/">{n}</Link></li>)}</ul>
          <Btn href="/industries/">View all industries</Btn>
        </div>
      </section>

      {SHOW_TEAM && <section className="sec experts">
        <i className="wv" />
        <div className="wrap">
          <h2 className="h-l rv">Led by doctors, engineers<br />and certified specialists.</h2>
          <p className="lead rv">Academic depth meets field experience. Our consultants hold doctorates and international certifications across energy, sustainability and management systems.</p>
          <Btn href="/about/#team" cls="dark">Meet the team</Btn>
        </div>
      </section>}

      {STORIES.length > 0 && STORIES[0].quote && (
        <section className="sec t-moss quote-strip">
          <i className="wv" />
          <div className="wrap">
            <h2 className="h-l rv">What our<br />clients say.</h2>
            <blockquote className="art-quote">“{STORIES[0].quote}”<cite>{STORIES[0].quoteBy} · {STORIES[0].client}</cite></blockquote>
            <Btn href="/client-stories/">All client stories</Btn>
          </div>
        </section>
      )}

      <FaqSection />

      <Cta heading={<>Ready to see<br />what you could save?</>} text="Book a consultation and we will map your quickest wins." />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
    </>
  );
}
