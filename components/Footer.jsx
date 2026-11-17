'use client';
import { useState } from 'react';
import Link from 'next/link';
import Word from './Word';
import { SHOW_TEAM, S, ORDER, CONTACT } from '../lib/content';
import { DEMO } from '../lib/base';

const COLS = ['#2aa6e0', '#8cc63f', '#f7941d', '#ed1c24', '#92278f'];

export default function Footer() {
  const [msg, setMsg] = useState({ text: '', bad: false });
  const [busy, setBusy] = useState(false);

  async function subscribe(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const em = form.elements.email.value.trim();
    if (!/^\S+@\S+\.\S+$/.test(em)) return setMsg({ text: 'Please enter a valid email address.', bad: true });
    setBusy(true);
    try {
      if (DEMO) { await new Promise((r) => setTimeout(r, 800)); setMsg({ text: 'Demo copy: nothing was subscribed.', bad: false }); form.reset(); setBusy(false); return; }
      const r = await fetch('/api/enquiry.php', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Newsletter subscriber', email: em, interest: 'Newsletter', message: 'Newsletter subscription request' }) });
      const j = await r.json();
      if (!j.ok) throw new Error('failed');
      setMsg({ text: 'You’re subscribed. Look out for our next update.', bad: false });
      form.reset();
    } catch {
      setMsg({ text: 'Could not subscribe just now. Please try again in a moment.', bad: true });
    }
    setBusy(false);
  }

  return (
    <footer className="sec t-deep foot" style={{ paddingTop: 'calc(var(--wh) + 40px)' }}>
      <i className="wv" />
      <div className="wrap">
        <div className="foot-g">
          <div>
            <h5>Company</h5>
            <ul>
              <li><Link href="/about/">About Us</Link></li>{SHOW_TEAM && <li><Link href="/about/#team">Our Team</Link></li>}<li><Link href="/industries/">Industries</Link></li>
              <li><Link href="/insights/">Insights</Link></li><li><Link href="/faq/">FAQ</Link></li><li><Link href="/contact/">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h5>Practice areas</h5>
            <ul>{ORDER.map((k) => <li key={k}><Link href={S[k].href}>{S[k].name}</Link></li>)}</ul>
          </div>
          <div className="cont">
            <h5>Contact</h5>
            <p>{CONTACT.address.map((l, i) => <span key={i}>{i > 0 && <br />}{l}</span>)}</p>
            {CONTACT.email && <p><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>}
            {CONTACT.phone && <p><a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phone}</a></p>}
            {CONTACT.linkedin && <p><a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></p>}
            {CONTACT.social.length > 0 && <p className="soc">{CONTACT.social.map((s) => <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer">{s.name} ↗</a>)}</p>}
            <Link href="/contact/" className="flink">Contact the team ↗</Link>
            <form className="news" onSubmit={subscribe} noValidate>
              <label htmlFor="n-em">Saudi sustainability and energy updates, once a month.</label>
              <div className="nrow">
                <input id="n-em" name="email" type="email" placeholder="Your email" autoComplete="email" />
                <button className="btn sm" type="submit" disabled={busy}>Subscribe<i aria-hidden="true">→</i></button>
              </div>
              <p className="nmsg" role="status" style={msg.bad ? { color: '#ffb4a8' } : undefined}>{msg.text}</p>
            </form>
          </div>
        </div>
        <div className="foot-word"><Word text="SEENTECO" fit={0.94} fitm={0.96} logo /></div>
        <div className="foot-b">
          <div>
            <span><Link href="/privacy/">Privacy Policy</Link> · <Link href="/terms/">Terms of Use</Link></span>
            {CONTACT.reg && <span>Commercial Registration No. {CONTACT.reg}</span>}
          </div>
          <div><span>© 2026 Seenteco. All rights reserved.</span></div>
        </div>
        <p className="credits">
          <span>Designed by <a href="https://linkedin.com/in/aaaadhileyyy" target="_blank" rel="noopener noreferrer"><b>Aadhil</b></a></span>
          <span>Developed by <a href="https://www.linkedin.com/in/arshak-p" target="_blank" rel="noopener noreferrer"><b>Arshak P</b></a></span>
          <span>Powered by <a href="https://colourparrot.com/" target="_blank" rel="noopener noreferrer" aria-label="Colourparrot"><b className="cp">{'Colourparrot'.split('').map((c, i) => <i key={i} style={{ color: COLS[i % 5] }}>{c}</i>)}</b></a></span>
        </p>
      </div>
    </footer>
  );
}
