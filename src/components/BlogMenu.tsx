'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GROUPS, postsOf } from '@/data/blog';
import { Diamond } from './Icons';

// Menu resumido do blog: mostra só os temas e expande os tópicos ao clicar.
export function BlogMenu({ current, startOpen }: { current?: string; startOpen?: string }) {
  const [open, setOpen] = useState<string | null>(startOpen ?? null);
  return (
    <nav className="bmenu" aria-label="Temas do blog">
      {GROUPS.map((g) => {
        const isOpen = open === g.slug;
        const posts = postsOf(g.slug);
        return (
          <div key={g.slug} className={`bm-group${isOpen ? ' open' : ''}`}>
            <button type="button" className="bm-head" aria-expanded={isOpen} aria-controls={`bm-${g.slug}`} onClick={() => setOpen(isOpen ? null : g.slug)}>
              <span className="display">{g.label}</span>
              <span className="mono bm-count">{posts.length} tópicos</span>
              <span className="bm-icon" aria-hidden="true" />
            </button>
            <div className="bm-body" id={`bm-${g.slug}`} hidden={!isOpen}>
              <p className="bm-intro">{g.intro}</p>
              <ul>
                {posts.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} aria-current={current === p.slug ? 'page' : undefined}>
                      <Diamond filled={current === p.slug} />{p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
