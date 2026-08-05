import { useEffect, useRef } from 'react';

export default function Contact() {
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add('visible'); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const teams = [
    {
      category: 'Research & Development',
      members: [
        { name: 'Prof. Debdeep Mukhopadhyay', email: 'debdeep.mukhopadhyay@gmail.com', role: 'Faculty Lead / Advisor', highlight: true },
        { name: 'Debadrita Talapatra', email: 'debadritat.fg2219@gmail.com' },
        { name: 'Nimish Mishra', email: 'neelam.nimish@gmail.com' },
      ]
    },
    {
      category: 'Website Development',
      members: [
        { name: 'Harsh Sharma', email: 'harshsharma2024@gmail.com' },
        { name: 'Ankit Pal', email: 'ankitpal862005@gmail.com' },
        { name: 'Manjunath Talari', email: 'manjunath10580@gmail.com' },
      ]
    }
  ];

  return (
    <div className="section" style={{ borderTop: '1px solid #1a1a1a' }}>
      <div className="container">
        <div ref={ref} className="fade-up">
          <div className="label" style={{ marginBottom: 16 }}>Team & Contact</div>
          <h2 className="heading-lg" style={{ marginBottom: 48 }}>Meet the Team</h2>

          {teams.map((group, gIdx) => (
            <div key={gIdx} style={{ marginBottom: gIdx < teams.length - 1 ? 48 : 0 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#ffd208', marginBottom: 20, letterSpacing: '-0.01em', fontFamily: 'Space Grotesk, sans-serif' }}>
                {group.category}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
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
                    <div style={{ fontSize: 16, fontWeight: 600, color: m.highlight ? '#fff' : '#f5f5f0', marginBottom: 8 }}>{m.name}</div>
                    <a
                      href={`mailto:${m.email}`}
                      style={{
                        fontSize: 13,
                        color: '#ffd208',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        fontFamily: 'Space Mono, monospace',
                        wordBreak: 'break-all'
                      }}
                    >
                      {m.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}