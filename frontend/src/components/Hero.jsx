import { useEffect, useRef } from 'react';

export default function Hero({ onDemo }) {
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setTimeout(() => el.classList.add('visible'), 100);
  }, []);

  return (
    <div className="section" style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div ref={ref} className="fade-up" style={{ maxWidth: 760 }}>
          <div className="label" style={{ marginBottom: 24 }}>SEC / SEAL Lab, IIT Kharagpur</div>
          <h1 className="heading-xl" style={{ marginBottom: 24 }}>
            Search encrypted data.<br />
            <span className="yellow">Reveal nothing.</span>
          </h1>
          <p className="body-lg" style={{ maxWidth: 560, marginBottom: 40 }}>
            Documents live on the server fully encrypted. Search happens without the server ever seeing your query or your files.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={onDemo}>Try the demo</button>
            <a href="#how" className="btn btn-ghost" onClick={e => { e.preventDefault(); document.getElementById('how')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>
              See how it works
            </a>
          </div>
        </div>


      </div>
    </div>
  );
}

function TerminalPreview() {
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add('visible'); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="fade-up" style={{
      background: '#0d0d0d',
      border: '1px solid #1a1a1a',
      borderRadius: 8,
      padding: '20px 24px',
      maxWidth: 640,
      fontFamily: 'Space Mono, monospace',
    }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {['#ff5f56','#ffbd2e','#27c93f'].map((c, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
        ))}
      </div>
      {[
        { label: '// client generates search token', color: '#555' },
        { label: 'XToken = PRF(SecretKey, "patient")', color: '#ffd208' },
        { label: '// token sent to server', color: '#555' },
        { label: 'EDB_Search(0x4A7F3C...) → EncRecord[]', color: '#aaaaaa' },
        { label: '// server never sees the word "patient"', color: '#555' },
        { label: 'decrypt(EncRecord, SecretKey) → doc_42.pdf', color: '#f5f5f0' },
      ].map((line, i) => (
        <div key={i} style={{ fontSize: 12, lineHeight: 2, color: line.color }}>{line.label}</div>
      ))}
    </div>
  );
}