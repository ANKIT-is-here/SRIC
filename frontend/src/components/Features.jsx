import React, { useEffect, useRef } from 'react';

export default function Features() {
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    }, { threshold: 0.1 });
    
    if (ref.current) {
      obs.observe(ref.current);
    }
    return () => obs.disconnect();
  }, []);

  const features = [
    {
      title: "Zero-Knowledge",
      desc: "The server never sees your queries. Your data remains fully encrypted during search.",
      icon: "🔒"
    },
    {
      title: "Lightning Fast",
      desc: "O(1) search complexity ensures instant results, even over massive encrypted databases.",
      icon: "⚡"
    },
    {
      title: "Post-Quantum Ready",
      desc: "Built with future-proof cryptographic primitives to withstand next-generation threats.",
      icon: "🛡️"
    }
  ];

  return (
    <div className="container fade-up" ref={ref} style={{ marginTop: '-40px', marginBottom: '80px', position: 'relative', zIndex: 2 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {features.map((f, i) => (
          <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: '#111111' }}>
            <div style={{ fontSize: '32px' }}>{f.icon}</div>
            <h3 className="heading-md" style={{ fontSize: '20px' }}>{f.title}</h3>
            <p className="body-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
