'use client';
import { useEffect, useRef } from 'react';
import { BASE } from '../lib/base';

// Giant word that is sized to a share of its container's width, letters rising in one by one.
export default function Word({ text, fit, fitm, cls = '', logo = false }) {
  const box = useRef(null);
  const w = useRef(null);

  useEffect(() => {
    const b = box.current, el = w.current;
    if (!b || !el) return;
    const lg = logo ? b.querySelector('.fw-logo') : null;
    const run = () => {
      const f = innerWidth < 700 && fitm ? fitm : fit;
      el.style.fontSize = '100px';
      const cw = b.clientWidth, ww = el.getBoundingClientRect().width;
      if (!ww) return;
      const fs = lg ? (100 * cw * f) / (ww + 88) : (100 * cw * f) / ww;      // with a logo in front, share the width with it
      el.style.fontSize = fs + 'px';
      if (lg) { lg.style.width = lg.style.height = fs * 0.74 + 'px'; lg.style.marginRight = fs * 0.12 + 'px'; }
    };
    run();
    addEventListener('resize', run);
    addEventListener('load', run);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(run);
    return () => { removeEventListener('resize', run); removeEventListener('load', run); };
  }, [fit, fitm, logo]);

  return (
    <span className={`fitbox${logo ? ' lg' : ''}`} ref={box}>
      {logo && <img className="fw-logo" src={BASE + '/assets/logo.png'} alt="" aria-hidden="true" />}
      <span className={`word ${cls}`.trim()} data-fit="" ref={w} aria-label={text}>
        {text.split('').map((c, i) => <span className="ch" aria-hidden="true" key={i} style={{ '--i': i }}>{c}</span>)}
      </span>
    </span>
  );
}
