'use client';
import { useEffect, useState } from 'react';
import { BASE } from '../lib/base';

// Hand-drawn globe preloader. The % is REAL: it counts the assets listed below plus the web fonts.
// Plays once per visit (a flag in sessionStorage), then removes itself.
const ASSETS = [BASE + '/assets/logo.png', BASE + '/img/riyadh.jpg'];
const MIN_MS = 1700;          // shortest time it stays up
const MAX_MS = 9000;          // never waits longer than this
const NOTES = ['sharpening the pencil…', 'measuring carbon…', 'auditing the energy…', 'connecting the data…', 'leaning the process…', 'aligning with 2030…', 'planting something good.'];

export default function Preloader() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let skip = false;
    try { skip = !!sessionStorage.getItem('senPre'); } catch {}
    const L = document.getElementById('loader');
    if (skip || !L) { setGone(true); return; }

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.body.classList.add('ld-locked');

    // hand-drawn shapes: slightly wobbly, so it never looks machine-perfect
    let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647 - 0.5;
    const smooth = (pts) => pts.reduce((d, p, i, a) => {
      if (!i) return `M${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
      const q = a[i - 1], m = [(q[0] + p[0]) / 2, (q[1] + p[1]) / 2];
      return d + ` Q${q[0].toFixed(1)} ${q[1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`;
    }, '');
    const loop = (cx, cy, rx, ry, turns, start, wob, n = 72) => {
      const pts = [];
      for (let i = 0; i <= n; i++) { const a = start + (i / n) * turns * Math.PI * 2, w = 1 + (rnd() * wob) / Math.max(rx, 1); pts.push([cx + Math.cos(a) * rx * w, cy + Math.sin(a) * ry * w]); }
      return smooth(pts);
    };
    const jit = (pts) => pts.map((p) => [p[0] + rnd() * 3, p[1] + rnd() * 3]);
    const C = [150, 172], R = 96;
    const set = (id, d) => { const el = document.getElementById(id); el.setAttribute('d', d); const len = el.getTotalLength(); el.style.strokeDasharray = len; el.style.strokeDashoffset = len; return { el, len }; };

    // [stroke, starts at, finished at] as fractions of the progress
    const parts = [
      [set('ldRing', loop(C[0], C[1], R, R, 1.07, -1.95, 3.2)), 0, 0.4],
      [set('ldRing2', loop(C[0] + 1.5, C[1] - 1, R - 3, R - 2, 0.8, 1.2, 4)), 0.28, 0.52],
      [set('ldMer1', loop(C[0], C[1], R * 0.42, R, 1.0, -1.57, 2)), 0.38, 0.6],
      [set('ldLat', loop(C[0], C[1] + 8, R * 0.98, R * 0.28, 1.0, 0, 2)), 0.48, 0.68],
      [set('ldMer2', loop(C[0], C[1], R * 0.82, R, 0.5, -1.57, 2)), 0.56, 0.74],
      [set('ldLand', smooth(jit([[118, 122], [136, 114], [150, 128], [140, 144], [150, 160], [132, 174], [122, 194], [108, 180], [104, 154], [112, 136], [118, 122]])) + ' ' +
        smooth(jit([[176, 144], [196, 140], [212, 154], [204, 180], [188, 210], [174, 200], [170, 174], [178, 160], [176, 144]]))), 0.62, 0.86],
      [set('ldStem', `M150 ${C[1] - R + 2} C146 ${C[1] - R - 14} 156 ${C[1] - R - 26} 150 ${C[1] - R - 48}`), 0.72, 0.9],
    ];
    const top = C[1] - R - 40;
    const leafL = document.getElementById('ldLeafL'), leafR = document.getElementById('ldLeafR');
    leafL.setAttribute('d', `M150 ${top} C132 ${top - 4} 118 ${top - 18} 116 ${top - 34} C136 ${top - 34} 150 ${top - 20} 150 ${top} Z`);
    leafR.setAttribute('d', `M151 ${top + 8} C168 ${top + 2} 182 ${top - 10} 186 ${top - 26} C166 ${top - 28} 152 ${top - 14} 151 ${top + 8} Z`);

    // real loading progress
    const noteEl = document.getElementById('ldNote'), num = document.getElementById('ldNum');
    let done = 0; const total = ASSETS.length + 1; const tick = () => { done++; };
    ASSETS.forEach((u) => { const i = new Image(); i.onload = i.onerror = tick; i.src = u; });
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(tick, tick);

    const t0 = performance.now(), MIN = reduce ? 400 : MIN_MS;
    let shown = 0, noteIdx = 0, finished = false, raf = 0; const timers = [];
    const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); };

    function frame(now) {
      const el = now - t0;
      let target = Math.min(done / total, Math.min(1, el / MIN)); if (el > MAX_MS) target = 1;
      shown += (target - shown) * (reduce ? 1 : 0.07);
      if (target === 1 && shown > 0.996) shown = 1;
      num.textContent = Math.round(shown * 100);
      for (const [{ el: path, len }, a, b] of parts) { const k = Math.min(1, Math.max(0, (shown - a) / (b - a))); path.style.strokeDashoffset = len * (1 - k); }
      leafL.classList.toggle('on', shown > 0.84); leafR.classList.toggle('on', shown > 0.94);
      const ni = Math.min(NOTES.length - 1, Math.floor(shown * (NOTES.length - 1) + 0.001));
      if (ni !== noteIdx) { noteIdx = ni; noteEl.classList.add('fade'); later(() => { noteEl.textContent = NOTES[ni]; noteEl.classList.remove('fade'); }, 200); }
      if (shown >= 1 && !finished) { finished = true; later(exit, reduce ? 100 : 300); return; }
      raf = requestAnimationFrame(frame);
    }
    const swallow = (e) => { e.preventDefault(); e.stopImmediatePropagation(); };
    const keys = (e) => { if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(e.key)) swallow(e); };
    // while the preloader plays the page must not scroll; release() hands scrolling back
    const release = () => {
      removeEventListener('wheel', swallow, { capture: true });
      removeEventListener('touchmove', swallow, { capture: true });
      removeEventListener('keydown', keys, true);
      document.body.classList.remove('ld-locked');
    };
    addEventListener('wheel', swallow, { capture: true, passive: false });
    addEventListener('touchmove', swallow, { capture: true, passive: false });
    addEventListener('keydown', keys, true);

    function exit() {
      try { sessionStorage.setItem('senPre', '1'); } catch {}
      L.classList.add('out');
      document.dispatchEvent(new Event('preloader:leaving'));      // the page starts animating while the loader lifts away
      later(() => { release(); setGone(true); document.dispatchEvent(new Event('preloader:done')); }, reduce ? 450 : 850);
    }
    scrollTo(0, 0);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf); timers.forEach(clearTimeout);
      release();
    };
  }, []);

  if (gone) return null;
  return (
    <div className="loader" id="loader" role="status" aria-live="polite" aria-label="Loading Seenteco">
      <div className="bg">
        <svg viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true">
          <path fill="#F7F7EF" d="M0 0 H1440 V40 C1100 40 900 140 520 140 C260 140 120 90 0 70 Z" />
          <path fill="none" stroke="#19C652" strokeOpacity=".6" strokeWidth="2" vectorEffect="non-scaling-stroke" d="M1440 40 C1100 40 900 140 520 140 C260 140 120 90 0 70" />
        </svg>
      </div>
      <div className="brand-ld"><img className="logo-img" src={BASE + '/assets/logo.png'} alt="" />Seenteco</div>
      <div className="stage">
        <svg className="sketch" viewBox="0 0 300 300" aria-hidden="true">
          <path className="ink" id="ldStem" strokeWidth="3" d="" />
          <path className="leaf l" id="ldLeafL" d="" />
          <path className="leaf r" id="ldLeafR" d="" />
          <path className="ink" id="ldRing" strokeWidth="3.2" d="" />
          <path className="ink" id="ldRing2" strokeWidth="1.4" opacity=".5" d="" />
          <path className="ink" id="ldMer1" strokeWidth="2" opacity=".75" d="" />
          <path className="ink" id="ldLat" strokeWidth="2" opacity=".75" d="" />
          <path className="ink" id="ldMer2" strokeWidth="2" opacity=".75" d="" />
          <path className="ink" id="ldLand" strokeWidth="2.2" d="" />
        </svg>
        <div className="count"><span id="ldNum">0</span><small>%</small></div>
        <div className="note" id="ldNote">sharpening the pencil…</div>
      </div>
      <div className="sig">Sustainable transformation, drawn by people</div>
    </div>
  );
}
