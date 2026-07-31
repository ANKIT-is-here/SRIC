import React, { useEffect, useRef } from 'react';
import { Lock, Zap, ShieldCheck } from 'lucide-react';

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
      desc: "Powered by Searchable Symmetric Encryption, the server never sees your queries. Your data remains fully encrypted during search.",
      icon: <Lock size={26} color="#00d2ff" />
    },
    {
      title: "Lightning Fast",
      desc: "O(1) search complexity ensures instant results, even over massive encrypted databases.",
      icon: <Zap size={26} color="#ffd208" />
    },
    {
      title: "Post-Quantum Ready",
      desc: "Built with future-proof cryptographic primitives to withstand next-generation threats.",
      icon: <ShieldCheck size={26} color="#7b61ff" />
    }
  ];

  return (
    <div className="container fade-up" ref={ref} style={{ marginTop: '-40px', marginBottom: '80px', position: 'relative', zIndex: 2 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {features.map((f, i) => (
          <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: '#111111', borderRadius: '12px', border: '1px solid #1e1e1e', padding: '28px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {f.icon}
            </div>
            <h3 className="heading-md" style={{ fontSize: '20px' }}>{f.title}</h3>
            <p className="body-sm" style={{ color: '#999', lineHeight: '1.6' }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
