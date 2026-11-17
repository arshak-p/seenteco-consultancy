'use client';
import { useEffect, useRef, useState } from 'react';

/* Round "back to top" button: appears after the first screen, eases the page up (instant if reduced motion). */
export default function BackToTop() {
  const [show, setShow] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    const onScroll = () => setShow(scrollY > innerHeight * 0.8);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => { removeEventListener('scroll', onScroll); cancelAnimationFrame(raf.current); };
  }, []);

  const up = () => {
    cancelAnimationFrame(raf.current);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { scrollTo(0, 0); return; }
    const from = scrollY, t0 = performance.now(), dur = Math.min(1100, 450 + from * 0.12);
    const stop = () => cancelAnimationFrame(raf.current);
    addEventListener('wheel', stop, { once: true, passive: true });
    addEventListener('touchstart', stop, { once: true, passive: true });
    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      scrollTo(0, from * (1 - e));
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  };

  return (
    <button type="button" className={'totop' + (show ? ' on' : '')} onClick={up} aria-label="Back to top" tabIndex={show ? 0 : -1}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
    </button>
  );
}
