// Server-rendered building blocks shared by several pages.
import Link from 'next/link';
import Btn from './Btn';
import Word from './Word';
import Faq from './Faq';
import { S, THEME, wordColor, STEPS, cap, FAQ } from '../lib/content';
import { BASE } from '../lib/base';

export function Cta({ heading, text }) {
  return (
    <section className="sec t-moss cta last">
      <i className="wv" />
      <div className="wrap">
        <h2 className="h-xl rv">{heading}</h2>
        <div className="bot rv"><p>{text}</p><Btn href="/contact/">Book a consultation</Btn></div>
      </div>
    </section>
  );
}

export function Steps() {
  return (
    <div className="steps">
      {STEPS.map(([a, lead, rest], i) => (
        <div className="step rv" key={a}>
          <div className="n">{String(i + 1).padStart(2, '0')}</div><span className="dot" />
          <h4>{a}</h4><p><b>{lead}</b> {rest}</p>
        </div>
      ))}
    </div>
  );
}

export function Tags({ items, big }) {
  return <ul className={`tags${big ? ' big' : ''}`}>{items.map((x) => <li key={x}>{cap(x)}</li>)}</ul>;
}

export function Ph({ k }) {
  if (k === 'riyadh') return <div className="ph"><img src={BASE + '/img/riyadh.jpg'} alt="Riyadh skyline and park" loading="lazy" /></div>;
  return <div className={`ph ${k}`} role="img" aria-label="Image placeholder"><span>Photo to be supplied</span></div>;
}

// one practice area as a coloured block (home + services overview)
export function Block({ s }) {
  return (
    <section className={`sec blk ${THEME[s.theme]}`}>
      <i className="wv" />
      <div className="wrap">
        <div className="wordbox" style={{ color: wordColor(s) }}><Word text={s.word} fit={s.fit} fitm={s.fitm} cls={s.outline ? 'outline' : ''} /></div>
        <div className="cols">
          <div className="l"><div className="tag">{s.row}</div><Btn href={s.href} cls={s.btnclass || ''}>{s.btn}</Btn></div>
          <div className="mini">
            {s.services.slice(0, 6).map((t) => (
              <Link href={s.href} key={t.title}><b>{t.title}</b><span>{t.desc.split('. ')[0].replace(/\.$/, '') + '.'}</span><i style={{ fontStyle: 'normal' }}>↗</i></Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServiceDetail({ s }) {
  return (
    <>
      <section className={`sec shero ${THEME[s.theme]}`}>
        {s.photo && <div className="hero-photo"><img src={BASE + '/img/riyadh.jpg'} alt="" data-par="" /></div>}
        <div className="wrap">
          <div className="wordbox" style={{ color: wordColor(s) }}><Word text={s.word} fit={s.fit} fitm={s.fitm} cls={s.outline ? 'outline' : ''} /></div>
          <div className="cols">
            <h1 className="tag">{s.headline}</h1>
            <div><p>{s.intro}</p><Btn href="#expertise" cls={s.btnclass || ''}>{s.btn}</Btn></div>
          </div>
        </div>
      </section>

      <section className="sec" id="expertise">
        <i className="wv" />
        <div className="wrap">
          <div className="exp-head"><h2 className="h-l rv">Expertise.<br />Put to work.</h2><p><b>Who it is for.</b> {s.who}</p></div>
          <div className="rows svc-list">
            {s.services.map((t) => (
              <article className="svc-r rv" key={t.title}>
                <h3>{t.title}</h3>
                <div className="body">
                  <p>{t.desc}</p>
                  <div className="meta"><b>Included</b><Tags items={t.inc} /></div>
                  <div className="meta"><b>You receive</b><span>{cap(t.rec)}</span></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec t-moss">
        <i className="wv" />
        <div className="wrap gets-w">
          <h2 className="h-l rv">What you<br />get.</h2>
          <ul className="gets">{s.gets.map((g) => <li className="rv" key={g}><i aria-hidden="true">✓</i><span>{g.replace(/\.$/, '')}</span></li>)}</ul>
        </div>
      </section>

      <section className="sec proc">
        <i className="wv" />
        <div className="wrap">
          <h2 className="h-l rv">From baseline<br />to boardroom.</h2>
          <Steps />
          <div className="sector">
            <div className="l"><h2 className="h-l rv" style={{ fontSize: 'clamp(30px,3.8vw,56px)' }}>Built around<br />your industry.</h2><Btn href="/industries/" cls="sm">Explore industries</Btn></div>
            <div className="links">{s.sectors.map((x) => <Link href="/industries/" key={x}>{x}<span className="arr">↗</span></Link>)}</div>
          </div>
          <div className="conn">
            {s.conn.map((c) => <div className="conn-r" key={c}><h4>{S[c].name}</h4><Btn href={S[c].href} cls="sm">View service</Btn></div>)}
          </div>
          <Link className="back" href="/services/">← Back to all services</Link>
        </div>
      </section>

      <Cta heading={s.cta} text="Book a consultation and we will map your quickest wins." />
    </>
  );
}

// FAQ accordion section (home + about); the full list is on /faq/
export function FaqSection({ count = 6 }) {
  return (
    <section className="sec t-deep faqsec">
      <i className="wv" />
      <div className="wrap">
        <h2 className="h-l rv">Questions<br />we hear often.</h2>
        <div className="faq-g">
          <div className="side">
            <p>Can’t find your answer? Talk to a consultant.</p>
            <Btn href="/contact/" cls="sm">Contact the team</Btn>
            <Btn href="/faq/" cls="sm">View all questions</Btn>
          </div>
          <Faq items={FAQ.slice(0, count)} />
        </div>
      </div>
    </section>
  );
}
