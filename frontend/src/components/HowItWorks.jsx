import { useEffect, useRef, useState } from 'react';
import { Database, FileText, Lock, Shield, Search } from 'lucide-react';

const STEPS = [
  {
    n: '01',
    title: 'Documents are encrypted on your device',
    body: 'Before anything leaves your machine, each document is broken into keywords. Those keywords are run through a cryptographic function using your private key, producing random-looking tokens. The actual words never leave your device.',
  },
  {
    n: '02',
    title: 'Only encrypted tokens reach the server',
    body: 'The server receives a Bloom filter index and encrypted document IDs. The index maps token hashes to document positions. The server cannot reverse these hashes back to words. A breach of the server reveals nothing readable.',
  },
  {
    n: '03',
    title: 'Search happens without revealing the query',
    body: 'When you search, your device computes the same token for the keyword using your key. That token is sent to the server. The server checks its Bloom filter, finds matching encrypted records, and returns them. It never learns what you searched for.',
  },
  {
    n: '04',
    title: 'Only your device can read the result',
    body: 'The matching encrypted document IDs come back from the server. Your device decrypts them using a key derived from your secret and the search token. The server processed everything without ever seeing plaintext.',
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const idx = stepRefs.current.indexOf(e.target);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { threshold: 0.6, rootMargin: '-10% 0px -40% 0px' }
    );
    stepRefs.current.forEach(r => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="section" id="how">
      <div className="container">
        <div style={{ marginBottom: 80 }}>
          <div className="label" style={{ marginBottom: 16 }}>How it works</div>
          <h2 className="heading-lg" style={{ maxWidth: 500 }}>
            What actually happens during Searchable Symmetric Encryption
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 60, alignItems: 'start' }}>
          
          {/* Left: scrollable steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {STEPS.map((step, i) => (
              <div
                key={i}
                ref={el => stepRefs.current[i] = el}
                style={{
                  padding: '60px 0',
                  borderBottom: i < STEPS.length - 1 ? '1px solid #1a1a1a' : 'none',
                  opacity: active === i ? 1 : 0.3,
                  transform: active === i ? 'translateX(10px)' : 'translateX(0)',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 13, color: active === i ? '#ffd208' : '#444', transition: 'color 0.4s' }}>
                    {step.n}
                  </span>
                  <div style={{ width: 40, height: 2, background: active === i ? '#ffd208' : '#333', transition: 'background 0.4s' }} />
                </div>
                <h3 className="heading-md" style={{ marginBottom: 16, color: active === i ? '#f5f5f0' : '#888' }}>
                  {step.title}
                </h3>
                <p className="body-sm" style={{ maxWidth: 400 }}>{step.body}</p>
              </div>
            ))}
          </div>

          {/* Right: sticky visual */}
          <div style={{ position: 'sticky', top: 120 }}>
            <ScrollytellingDiagram active={active} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ScrollytellingDiagram({ active }) {
  // Smooth ease-out transition with zero oscillation/overshoot
  const t = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';

  return (
    <div style={{
      background: 'rgba(10,10,10,0.8)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 210, 8, 0.2)',
      borderRadius: 16,
      height: 500,
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8), 0 20px 40px rgba(0,0,0,0.4)'
    }}>
      {/* Background Zones */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '45%', background: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 70%)' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '45%', background: 'radial-gradient(circle at 80% 50%, rgba(255, 210, 8, 0.05) 0%, transparent 70%)' }} />
      
      <div style={{ position: 'absolute', left: '24px', top: '24px', color: '#555', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>Client Device</div>
      <div style={{ position: 'absolute', right: '24px', top: '24px', color: '#555', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>Cloud Server</div>

      <div style={{ position: 'absolute', left: '22%', top: '50%', transform: 'translate(-50%, -50%)', opacity: 0.03 }}><Shield size={180} /></div>
      <div style={{ position: 'absolute', right: '22%', top: '50%', transform: 'translate(50%, -50%)', opacity: 0.03 }}><Database size={180} /></div>

      {/* -- Step 0: Encryption -- */}
      {/* Original Document */}
      <div style={{
        position: 'absolute', transition: t,
        top: active === 0 ? '40%' : (active === 3 ? '50%' : '20%'),
        left: active === 0 ? '22%' : (active === 3 ? '22%' : '10%'),
        transform: 'translate(-50%, -50%)',
        opacity: (active === 0 || active === 3) ? 1 : 0.1,
      }}>
        <div style={{ padding: 24, background: 'rgba(255, 255, 255, 0.05)', border: '2px solid rgba(255,255,255,0.2)', borderRadius: 12 }}>
          <FileText color="#f5f5f0" size={40} />
        </div>
      </div>

      {/* Keywords (only active=0) */}
      <div style={{
        position: 'absolute', transition: t, top: '65%', left: '22%', transform: 'translate(-50%, -50%)',
        opacity: active === 0 ? 1 : 0,
        background: 'rgba(0,0,0,0.8)', border: '1px solid #333', padding: '8px 16px', borderRadius: 6, color: '#aaa', fontSize: 13, fontFamily: 'Space Mono'
      }}>
        ["patient", "glucose"]
      </div>

      {/* Encrypted Hash / Document */}
      <div style={{
        position: 'absolute', transition: t,
        top: active === 0 ? '40%' : (active === 1 ? '50%' : (active === 3 ? '50%' : '20%')),
        left: active === 0 ? '45%' : (active === 1 ? '78%' : (active === 3 ? '22%' : '78%')),
        transform: 'translate(-50%, -50%)',
        opacity: (active === 0 || active === 1 || active === 3) ? 1 : 0.1
      }}>
        <div style={{ padding: 24, background: 'rgba(39, 201, 63, 0.1)', border: '2px solid #27c93f', borderRadius: 12, boxShadow: '0 0 30px rgba(39,201,63,0.3)' }}>
          <Lock color="#27c93f" size={40} />
        </div>
        <div style={{ position: 'absolute', top: '115%', left: '50%', transform: 'translateX(-50%)', color: '#27c93f', fontSize: 12, fontFamily: 'Space Mono', whiteSpace: 'nowrap', background: '#000', padding: '4px 8px', borderRadius: 4 }}>
          EncDoc_42
        </div>
      </div>

      {/* -- Step 1 & 2: Server Bloom Filter -- */}
      <div style={{
        position: 'absolute', transition: t,
        top: active >= 1 ? '70%' : '90%', left: '78%', transform: 'translate(-50%, -50%)',
        opacity: active >= 1 ? 1 : 0,
        display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center'
      }}>
        <div style={{ fontSize: 11, color: '#777', textTransform: 'uppercase', letterSpacing: 1 }}>Bloom Filter Index</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 6 }}>
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} style={{
              width: 14, height: 14, borderRadius: 2,
              background: [2,5,9,14,19,22].includes(i) ? (active === 2 ? '#ffd208' : '#665511') : 'rgba(255,255,255,0.05)',
              boxShadow: [2,5,9,14,19,22].includes(i) && active === 2 ? '0 0 15px #ffd208' : 'none',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }} />
          ))}
        </div>
      </div>

      {/* -- Step 2: Search Token -- */}
      <div style={{
        position: 'absolute', transition: t,
        top: active === 2 ? '45%' : '80%',
        left: active === 2 ? '78%' : '22%',
        transform: 'translate(-50%, -50%)',
        opacity: active === 2 ? 1 : 0
      }}>
        <div style={{ padding: '12px 20px', background: 'rgba(255,210,8,0.15)', border: '2px solid #ffd208', borderRadius: 30, display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 0 25px rgba(255,210,8,0.4)', backdropFilter: 'blur(4px)' }}>
          <Search color="#ffd208" size={18} />
          <span style={{ color: '#ffd208', fontSize: 15, fontFamily: 'Space Mono', fontWeight: 'bold' }}>XToken: 0x4A7F</span>
        </div>
      </div>
    </div>
  );
}