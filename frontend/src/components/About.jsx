import { useEffect, useRef } from 'react';

export default function About() {
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add('visible'); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="section" style={{ borderTop: '1px solid #1a1a1a' }}>
      <div className="container">
        <div ref={ref} className="fade-up">
          <div className="label" style={{ marginBottom: 16 }}>Future plans</div>
          <h2 className="heading-lg" style={{ marginBottom: 48, maxWidth: 480 }}>
            Where this is headed
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1, border: '1px solid #1a1a1a', borderRadius: 8, overflow: 'hidden' }}>
            {[
              {
                title: 'Range and fuzzy queries',
                body: 'Extending support beyond exact keyword matches. Partial words and approximate terms should resolve without leaking structural information to the server.',
              },
              {
                title: 'Dynamic index updates',
                body: 'Adding or removing documents from the encrypted index without a full rebuild. Currently the index is static after setup.',
              },
              {
                title: 'Numeric FHE queries',
                body: 'Running aggregate operations like sum, average, and filter directly on encrypted numeric fields using Fully Homomorphic Encryption.',
              },
            ].map((item, i) => (
              <div key={i} style={{ padding: '32px 28px', background: '#0d0d0d', borderRight: i < 2 ? '1px solid #1a1a1a' : 'none' }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#f5f5f0', marginBottom: 12, letterSpacing: '-0.01em' }}>
                  {item.title}
                </h3>
                <p className="body-sm">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}