import { useEffect, useRef } from 'react';

export default function Contact() {
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add('visible'); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const contacts = [
    { name: 'Prof. Debdeep Mukhopadhyay', role: 'Faculty Lead / Advisor', email: 'debdeep.mukhopadhyay@gmail.com', highlight: true },
    { name: 'Debadrita Talapatra', role: 'Research & Development', email: 'debadritat.fg2219@gmail.com', highlight: false }
  ];

  const teams = [
    {
      category: 'Research & Development',
      members: [
        { name: 'Prof. Debdeep Mukhopadhyay', role: 'Faculty Lead / Advisor', highlight: true },
        { name: 'Debadrita Talapatra' },
        { name: 'Nimish Mishra' },
      ]
    },
    {
      category: 'Website Development',
      members: [
        { name: 'Harsh Sharma' },
        { name: 'Ankit Pal' },
        { name: 'Manjunath Talari' },
      ]
    }
  ];

  return (
    <div className="section" style={{ borderTop: '1px solid #1a1a1a' }}>
      <div className="container">
        <div ref={ref} className="fade-up">
          
          {/* 1. Contact Us Section (ABOVE Team) */}
          <div id="contact" style={{ marginBottom: 56 }}>
            <div className="label" style={{ marginBottom: 16 }}>Get in Touch</div>
            <h2 className="heading-lg" style={{ marginBottom: 32 }}>Contact Us</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
              {contacts.map((c, i) => (
                <div
                  key={i}
                  className="card"
                  style={{
                    border: c.highlight ? '1px solid rgba(255, 210, 8, 0.6)' : '1px solid #222',
                    background: c.highlight ? 'linear-gradient(135deg, rgba(255, 210, 8, 0.08) 0%, rgba(15, 15, 15, 0.95) 100%)' : '#0d0d0d',
                    padding: '24px 28px'
                  }}
                >
                  <div style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', color: c.highlight ? '#ffd208' : '#888', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                    {c.role}
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 14 }}>{c.name}</div>
                  <a
                    href={`mailto:${c.email}`}
                    style={{
                      fontSize: 13,
                      color: '#ffd208',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      fontFamily: 'Space Mono, monospace',
                      padding: '8px 14px',
                      background: 'rgba(255, 210, 8, 0.1)',
                      border: '1px solid rgba(255, 210, 8, 0.3)',
                      borderRadius: 6,
                      transition: 'all 0.2s',
                      wordBreak: 'break-all'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255, 210, 8, 0.2)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255, 210, 8, 0.1)'; }}
                  >
                    ✉️ {c.email}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop: '1px dashed #222', marginBottom: 48 }} />

          {/* 2. Meet the Team Section (BELOW Contact) */}
          <div id="team">
            <div className="label" style={{ marginBottom: 16 }}>Our Team</div>
            <h2 className="heading-lg" style={{ marginBottom: 44 }}>Meet the Team</h2>

            {teams.map((group, gIdx) => (
              <div key={gIdx} style={{ marginBottom: 40 }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#ffd208', marginBottom: 20, letterSpacing: '-0.01em', fontFamily: 'Space Grotesk, sans-serif' }}>
                  {group.category}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                  {group.members.map((m, i) => (
                    <div
                      key={i}
                      className="card"
                      style={m.highlight ? {
                        border: '1px solid rgba(255, 210, 8, 0.6)',
                        background: 'linear-gradient(135deg, rgba(255, 210, 8, 0.1) 0%, rgba(18, 18, 18, 0.95) 100%)',
                        boxShadow: '0 0 25px rgba(255, 210, 8, 0.15)',
                        position: 'relative'
                      } : {}}
                    >
                      {m.highlight && (
                        <div style={{
                          fontSize: 10,
                          fontFamily: 'Space Mono, monospace',
                          color: '#ffd208',
                          background: 'rgba(255, 210, 8, 0.15)',
                          border: '1px solid rgba(255, 210, 8, 0.3)',
                          borderRadius: 4,
                          padding: '2px 8px',
                          display: 'inline-block',
                          marginBottom: 10,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em'
                        }}>
                          {m.role}
                        </div>
                      )}
                      <div style={{ fontSize: 16, fontWeight: 600, color: m.highlight ? '#fff' : '#f5f5f0' }}>{m.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}