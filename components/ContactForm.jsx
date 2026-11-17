'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import Btn from './Btn';
import { DEMO } from '../lib/base';

const RULES = {
  name: (v) => v.trim().length >= 2 || 'Please enter your name.',
  email: (v) => /^\S+@\S+\.\S+$/.test(v.trim()) || 'Please enter a valid email address.',
  message: (v) => v.trim().length >= 10 || 'Please add a short message.',
};

function toast(text) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = text; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

function shake(f) { f.classList.remove('shake'); void f.offsetWidth; f.classList.add('shake'); }

export default function ContactForm({ areas }) {
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle');
  const h = useRef(0);                                  // the form's height, so the thank-you card keeps the same space           // idle | sending | sent

  const check = (name, value) => {
    const r = RULES[name](value);
    setErrors((e) => ({ ...e, [name]: r === true ? '' : r }));
    return r === true;
  };
  const Field = ({ name, label, type = 'text', auto, required, area }) => (
    <div className={`fld${errors[name] ? ' bad' : ''}`}>
      <label htmlFor={`f-${name}`}>{label}{required ? ' *' : ''}</label>
      {area
        ? <textarea id={`f-${name}`} name={name} onBlur={(e) => RULES[name] && check(name, e.target.value)} />
        : <input id={`f-${name}`} name={name} type={type} autoComplete={auto} onBlur={(e) => RULES[name] && check(name, e.target.value)} />}
      {RULES[name] && <div className="err">{errors[name]}</div>}
    </div>
  );

  async function submit(e) {
    e.preventDefault();
    const f = e.currentTarget, d = Object.fromEntries(new FormData(f));
    if (d.website) return;                               // hidden spam-trap field
    const good = Object.keys(RULES).map((k) => check(k, d[k] || '')).every(Boolean);
    if (!good) { const bad = f.querySelector('.fld.bad input,.fld.bad textarea'); setTimeout(() => (f.querySelector('.fld.bad input,.fld.bad textarea') || bad)?.focus(), 0); return; }
    h.current = f.offsetHeight;
    setState('sending');
    const wait = new Promise((r) => setTimeout(r, 1100));          // keep the sending animation visible for a moment
    try {
      if (!DEMO) {
        const r = await fetch('/api/enquiry.php', { method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: d.name, company: d.company, email: d.email, phone: d.phone, title: d.jobtitle, interest: d.area, message: d.message }) });
        const j = await r.json();
        if (!j.ok) throw new Error(j.error || 'failed');
      }
      await wait;
      setState('sent');
      setTimeout(() => { const el = document.querySelector('.ok.sent'); if (el) { const r = el.getBoundingClientRect(); scrollTo({ top: scrollY + r.top + Math.min(r.height / 2, 260) - innerHeight / 2, behavior: 'smooth' }); } }, 60);
    } catch {
      await wait;
      setState('idle');
      shake(f);
      toast('Your enquiry could not be sent. Please try again in a moment.');
    }
  }

  if (state === 'sent') {
    const id = 'SEN-' + Date.now().toString(36).toUpperCase().slice(-6);
    return (
      <div className="ok formcard sent" role="status" style={{ minHeight: h.current || undefined }}>
        <div className="okmark" aria-hidden="true">
          <i className="ring r1" /><i className="ring r2" />
          <svg viewBox="0 0 52 52" width="76" height="76" fill="none"><circle className="okc" cx="26" cy="26" r="23" /><path className="okt" d="M15 27l8 8 15-17" /></svg>
          {Array.from({ length: 10 }).map((_, i) => <b key={i} className="dot" style={{ '--a': `${i * 36}deg`, '--d': `${i % 2 ? 54 : 70}px` }} />)}
        </div>
        <div className="tk up" style={{ '--i': 0 }}>Enquiry received · {id}</div>
        <h3 className="h-m up" style={{ '--i': 1 }}>Thank you.</h3>
        <p className="lead up" style={{ '--i': 2 }}>{DEMO ? 'This is a demo copy of the website, so nothing was sent. To contact the company, email info@seenteco.com.' : 'Your enquiry has been received and our team will be in touch shortly.'}</p>
      </div>
    );
  }

  return (
    <form className={'form formcard' + (state === 'sending' ? ' busy' : '')} id="enq" noValidate onSubmit={submit}>
      <h3>Tell us what’s on your mind.</h3>
      <div className="two"><Field name="name" label="Full name" auto="name" required /><Field name="company" label="Company" auto="organization" /></div>
      <div className="two"><Field name="jobtitle" label="Job title" auto="organization-title" /><Field name="email" label="Work email" type="email" auto="email" required /></div>
      <div className="two">
        <Field name="phone" label="Phone" type="tel" auto="tel" />
        <div className="fld"><label htmlFor="f-area">Area of interest</label>
          <select id="f-area" name="area" defaultValue=""><option value="">Select an area</option>{areas.map((a) => <option key={a}>{a}</option>)}</select></div>
      </div>
      <Field name="message" label="How can we help?" required area />
      <p className="req">* Required fields. By submitting, you agree to our <Link href="/privacy/">Privacy Policy</Link>.</p>
      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className={'btn' + (state === 'sending' ? ' is-sending' : '')} type="submit" disabled={state === 'sending'} aria-live="polite">
        {state === 'sending' ? <><span className="spin" aria-hidden="true" />Sending…</> : <>Send enquiry<i aria-hidden="true">→</i></>}
      </button>
    </form>
  );
}
