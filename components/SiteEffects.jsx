'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { BASE } from '../lib/base';

const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Site-wide behaviour: smooth wheel scrolling + page-switch fade (once), and the per-page effects:
   reveal on scroll, stacked sections, header hide, progress bar, parallax, flowing curves. */
export default function SiteEffects() {
  const pathname = usePathname();
  const router = useRouter();

  /* ---------- once: smooth scrolling and page transitions ---------- */
  useEffect(() => {
    const cleanups = [];
    const root = document.documentElement;

    if (!reduced()) {
      root.style.scrollBehavior = 'auto';
      const EASE = 0.085;
      let target = scrollY, current = scrollY, raf = 0;
      const max = () => Math.max(0, root.scrollHeight - innerHeight);
      const clamp = (v) => Math.min(max(), Math.max(0, v));
      const loop = () => {
        const d = target - current;
        if (Math.abs(d) < 0.3) { current = target; scrollTo(0, current); raf = 0; return; }
        current += d * EASE; scrollTo(0, current); raf = requestAnimationFrame(loop);
      };
      const start = () => { if (!raf) raf = requestAnimationFrame(loop); };
      const onWheel = (e) => {
        if (e.ctrlKey || e.defaultPrevented) return;
        if (document.body.classList.contains('lock') || document.body.classList.contains('ld-locked')) return;
        if (e.target.closest && e.target.closest('textarea, select, .mnav, [data-native-scroll]')) return;
        e.preventDefault();
        if (!raf) current = target = scrollY;
        target = clamp(target + e.deltaY * (e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? innerHeight : 1));
        start();
      };
      const onScroll = () => { if (!raf) current = target = scrollY; };
      const onHash = (e) => {
        const a = e.target.closest && e.target.closest('a[href^="#"]');
        if (!a || a.getAttribute('href') === '#') return;
        const el = document.querySelector(a.getAttribute('href'));
        if (!el) return;
        e.preventDefault();
        if (!raf) current = scrollY;
        target = clamp(el.getBoundingClientRect().top + scrollY - 80); start();
      };
      addEventListener('wheel', onWheel, { passive: false });
      addEventListener('scroll', onScroll, { passive: true });
      document.addEventListener('click', onHash);
      cleanups.push(() => { cancelAnimationFrame(raf); removeEventListener('wheel', onWheel); removeEventListener('scroll', onScroll); document.removeEventListener('click', onHash); });
    }

    if (!reduced()) {
      const onClick = (e) => {
        const a = e.target.closest && e.target.closest('a[href]');
        if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank' || a.hasAttribute('download')) return;
        const u = new URL(a.href, location.href);
        if (u.origin !== location.origin || (u.pathname === location.pathname && u.search === location.search)) return;   // other sites and same-page links: normal
        const pt = document.getElementById('pt');
        if (!pt) return;
        e.preventDefault(); e.stopPropagation();
        document.body.classList.add('leaving'); pt.classList.add('on');
        setTimeout(() => router.push((BASE && u.pathname.startsWith(BASE) ? u.pathname.slice(BASE.length) || '/' : u.pathname) + u.search + u.hash), 420);
      };
      document.addEventListener('click', onClick, true);      // capture: runs before the framework's own link handling
      cleanups.push(() => document.removeEventListener('click', onClick, true));
    }
    // text cannot be selected or copied (form fields stay normal so people can type)
    const typing = (t) => t && t.closest && t.closest('input, textarea, select, [contenteditable]');
    const block = (e) => { if (!typing(e.target)) e.preventDefault(); };
    ['selectstart', 'copy', 'cut', 'dragstart'].forEach((ev) => document.addEventListener(ev, block));
    cleanups.push(() => ['selectstart', 'copy', 'cut', 'dragstart'].forEach((ev) => document.removeEventListener(ev, block)));
    return () => cleanups.forEach((c) => c());
  }, [router]);

  /* ---------- every page: reveal, stacking, header, progress, parallax, curves ---------- */
  useEffect(() => {
    const cleanups = [];
    const pt = document.getElementById('pt');
    if (pt) pt.classList.remove('on');
    document.body.classList.remove('leaving');

    // stagger lists and cards
    $$('.rows,.steps,.cards,.tg,.chips-g,.links,.info,.mini,.tags,.offer-g,.gets,.icards').forEach((g) => {
      Array.from(g.children).forEach((k, i) => k.style.setProperty('--d', Math.min(i, 5) * 40 + 'ms'));
    });
    // every title gets the reveal
    $$('.tag,.step h4,.ind h3,.pr h3,.card h3,.tc h4,.conn-r h4,.stds h3,.form h3,.mv h4,.mv p,.exp-head p,.story p,.svc-r h3').forEach((t) => t.classList.add('rv'));

    // reveal on scroll (waits for the preloader on a first visit)
    const rv = $$('.rv,[data-fit]');
    let io, safety, started = false;
    const startReveal = () => {
      if (started) return; started = true;
      rv.forEach((r) => { if (r.getBoundingClientRect().top < innerHeight) r.classList.add('in'); });     // first screen: no waiting for the observer
      io = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting || e.boundingClientRect.top < 0) { e.target.classList.add('in'); io.unobserve(e.target); }
      }), { rootMargin: '0px 0px 18% 0px' });
      rv.forEach((r) => io.observe(r));
      safety = setInterval(() => rv.forEach((r) => { if (r.getBoundingClientRect().top < innerHeight * 1.1) r.classList.add('in'); }), 1200);   // nothing on screen stays hidden
    };
    if (document.body.classList.contains('ld-locked')) { document.addEventListener('preloader:leaving', startReveal, { once: true }); document.addEventListener('preloader:done', startReveal, { once: true }); }
    else startReveal();
    cleanups.push(() => { document.removeEventListener('preloader:leaving', startReveal); document.removeEventListener('preloader:done', startReveal); io && io.disconnect(); clearInterval(safety); });

    // a curve between two sections of the same colour would be invisible, so drop it
    const secs = $$('main > .sec');
    secs.forEach((s, i) => {
      const w = s.querySelector(':scope > .wv');
      if (i && w && getComputedStyle(s).backgroundColor === getComputedStyle(secs[i - 1]).backgroundColor) $$(':scope > .wv', s).forEach((x) => x.style.display = 'none');
    });

    // sections slide up over the one before (only where a curved section comes next)
    if (!reduced()) {
      document.body.classList.add('stack');
      const pins = [];
      secs.forEach((s, i) => {
        s.style.setProperty('--z', i + 1);
        const n = secs[i + 1], w = n && n.querySelector(':scope > .wv');
        if (w && w.style.display !== 'none') { s.classList.add('pin'); pins.push(s); }
      });
      const stick = () => pins.forEach((s) => { s.style.top = Math.min(0, innerHeight - s.offsetHeight) + 'px'; });
      stick(); addEventListener('resize', stick); addEventListener('load', stick);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(stick);
      const ro = new ResizeObserver(stick); secs.forEach((s) => ro.observe(s));
      cleanups.push(() => { removeEventListener('resize', stick); removeEventListener('load', stick); ro.disconnect(); document.body.classList.remove('stack'); secs.forEach((s) => { s.classList.remove('pin'); s.style.top = ''; }); });
    }

    // header hides on scroll down, progress bar, parallax photos, flowing curves
    if (!reduced()) {
      const hd = document.querySelector('.hd'), bar = document.getElementById('prog');
      const par = $$('[data-par]'), wvs = $$('.wv');
      let lastY = scrollY, tick = false;
      const onScroll = () => {
        const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
        if (bar) bar.style.transform = 'scaleX(' + (h > 0 ? y / h : 0) + ')';
        if (hd && !document.body.classList.contains('lock')) hd.classList.toggle('hide', y > 240 && y > lastY + 2 ? true : (y < lastY - 2 || y < 240) ? false : hd.classList.contains('hide'));
        lastY = y;
        wvs.forEach((w) => { w.style.setProperty('--wx', (y * -0.35).toFixed(1) + 'px'); });
        par.forEach((p) => { const r = p.parentNode.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return; p.style.transform = 'translate3d(0,' + ((r.top + r.height / 2 - innerHeight / 2) * -0.08).toFixed(1) + 'px,0) scale(1.12)'; });
        tick = false;
      };
      const req = () => { if (!tick) { tick = true; requestAnimationFrame(onScroll); } };
      addEventListener('scroll', req, { passive: true }); onScroll();
      cleanups.push(() => { removeEventListener('scroll', req); if (hd) hd.classList.remove('hide'); });
    }
    return () => cleanups.forEach((c) => c());
  }, [pathname]);

  return null;
}
