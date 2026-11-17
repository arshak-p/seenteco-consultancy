'use client';
import { useState } from 'react';

export default function Faq({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div>
      {items.map(([q, a], i) => (
        <div className={`qa${open === i ? ' open' : ''}`} key={q}>
          <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{q}</span><span className="pm" aria-hidden="true">{open === i ? '×' : '+'}</span>
          </button>
          <div className="ans">{a}</div>
        </div>
      ))}
    </div>
  );
}
