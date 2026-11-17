'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Btn from './Btn';
import { NAV, FOOT_DESC } from '../lib/content';
import { BASE } from '../lib/base';

export default function Header() {
  const path = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const active = (h) => (h === '/' ? path === '/' : path.startsWith(h));

  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    document.body.classList.toggle('lock', open);
    return () => document.body.classList.remove('lock');
  }, [open]);
  useEffect(() => {
    const esc = (e) => { if (e.key === 'Escape') setOpen(false); };
    const rs = () => { if (innerWidth >= 1100) setOpen(false); };
    document.addEventListener('keydown', esc); addEventListener('resize', rs);
    return () => { document.removeEventListener('keydown', esc); removeEventListener('resize', rs); };
  }, []);

  return (
    <>
      <header className="hd">
        <Link className="logo" href="/" aria-label="Seenteco home"><img src={BASE + '/assets/logo.png'} alt="" width="28" height="28" />SEENTECO</Link>
        <nav className="nav" aria-label="Main">
          {NAV.map(([n, h]) => <Link key={h} href={h} aria-current={active(h) ? 'page' : undefined}>{n}</Link>)}
        </nav>
        <div className="hd-r">
          <Btn href="/contact/" cls="dark">Book a consultation</Btn>
          <button className="menu-btn" aria-expanded={open} aria-controls="mnav" onClick={() => setOpen(!open)}>
            {open ? 'Close ' : 'Menu '}<span aria-hidden="true">{open ? '×' : '≡'}</span>
          </button>
        </div>
      </header>
      <div className={`mnav${open ? ' open' : ''}`} id="mnav" aria-label="Menu">
        <div className="mblob" aria-hidden="true" />
        {NAV.map(([n, h], i) => <Link key={h} href={h} style={{ '--k': i }}>{n}<span>↗</span></Link>)}
        <Btn href="/contact/">Book a consultation</Btn>
        <p className="mfoot">{FOOT_DESC}</p>
      </div>
    </>
  );
}
