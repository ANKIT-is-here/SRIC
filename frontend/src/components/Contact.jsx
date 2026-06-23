import { useEffect, useRef } from 'react';

export default function Contact() {
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add('visible'); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const people = [
    { name: 'Debadrita Talapatra', role: 'Main Developer', email: 'debadritatalapatra@gmail.com' },
    { name: 'Prof. Debdeep Mukhopadhyay', role: 'Faculty Advisor, CSE Dept.', email: 'debdeep@cse.iitkgp.ac.in' },
  ];

  return (
    <div className="section" style={{ borderTop: '1px solid #1a1a1a' }}>
      <div className="container">
        <div ref={ref} className="fade-up">
          <div className="label" style={{ marginBottom: 16 }}>Contact</div>
          <h2 className="heading-lg" style={{ marginBottom: 48 }}>Get in touch</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, maxWidth: 640 }}>
            {people.map((p, i) => (
              <div key={i} className="card">
                <div style={{ fontSize: 15, fontWeight: 600, color: '#f5f5f0', marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: '#555', marginBottom: 16, fontFamily: 'Space Mono, monospace' }}>{p.role}</div>
                <a
                  href={`mailto:${p.email}`}
                  style={{
                    fontSize: 13,
                    color: '#ffd208',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontFamily: 'Space Mono, monospace',
                  }}
                >
                  {p.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}