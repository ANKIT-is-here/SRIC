import { useEffect, useRef, useState } from 'react';
import { Database, FileText, Lock, Key, Shield, Search } from 'lucide-react';

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
    <div className="section">
      <div className="container">
        <div style={{ marginBottom: 80 }}>
          <div className="label" style={{ marginBottom: 16 }}>How it works</div>
          <h2 className="heading-lg" style={{ maxWidth: 500 }}>
            What actually happens when you search
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
                  transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
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
  const t = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';

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

      {/* Network line */}
      <div style={{ position: 'absolute', left: '30%', top: '50%', width: '40%', height: '2px', background: 'rgba(255,255,255,0.05)', transform: 'translateY(-50%)' }}>
        <div style={{ 
          position: 'absolute', top: -1, width: '40%', height: '4px', background: '#ffd208', borderRadius: '50%',
          boxShadow: '0 0 15px #ffd208',
          opacity: (active === 1 || active === 2 || active === 3) ? 0.8 : 0,
          left: active === 3 ? '100%' : (active === 1 || active === 2 ? 0 : 0),
          transform: active === 3 ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'left 0.8s ease-in-out, transform 0.8s ease-in-out, opacity 0.5s',
          animation: (active === 1 || active === 2) ? 'flow-right 1.5s infinite' : (active === 3 ? 'flow-left 1.5s infinite' : 'none')
        }} />
      </div>

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
              transition: 'all 0.5s'
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
      
      <style>{`
        @keyframes flow-right {
          0% { left: 0; transform: translateX(-100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 100%; transform: translateX(0); opacity: 0; }
        }
        @keyframes flow-left {
          0% { left: 100%; transform: translateX(0); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 0; transform: translateX(-100%); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* 
===========================================================================
ORIGINAL HOW IT WORKS CODE 
(Commented out so it can be reverted if needed)
===========================================================================

export function HowItWorksOld() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef([]);
  const sectionRef = useRef();

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
    <div className="section">
      <div className="container">
        <div style={{ marginBottom: 80 }}>
          <div className="label" style={{ marginBottom: 16 }}>How it works</div>
          <h2 className="heading-lg" style={{ maxWidth: 500 }}>
            What actually happens when you search
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {STEPS.map((step, i) => (
              <div key={i} ref={el => stepRefs.current[i] = el} style={{ padding: '48px 0', borderBottom: i < STEPS.length - 1 ? '1px solid #1a1a1a' : 'none', opacity: active === i ? 1 : 0.3, transition: 'opacity 0.4s ease' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: active === i ? '#ffd208' : '#444', transition: 'color 0.4s' }}>{step.n}</span>
                  <div style={{ width: 24, height: 1, background: active === i ? '#ffd208' : '#333', transition: 'background 0.4s' }} />
                </div>
                <h3 className="heading-md" style={{ marginBottom: 16, color: active === i ? '#f5f5f0' : '#888' }}>{step.title}</h3>
                <p className="body-sm" style={{ maxWidth: 400 }}>{step.body}</p>
              </div>
            ))}
          </div>

          <div style={{ position: 'sticky', top: 120 }}>
            <div style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 8, padding: 32, minHeight: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.4s ease' }}>
              {STEPS[active].visual}
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 20 }}>
              {STEPS.map((_, i) => (
                <div key={i} className={`step-dot ${active === i ? 'active' : ''}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EncryptVisualOld() {
  return (
    <div style={{ width: '100%', fontFamily: 'Space Mono, monospace' }}>
      <div style={{ fontSize: 11, color: '#777', marginBottom: 20 }}>On your device</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {['patient', 'glucose', 'diagnosis'].map((word, i) => (
          <div key={word} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 12, color: '#f5f5f0', background: '#1a1a1a', padding: '6px 12px', borderRadius: 4, minWidth: 90 }}>{word}</div>
            <div style={{ fontSize: 10, color: '#333' }}>PRF(K, ·)</div>
            <div style={{ fontSize: 10, color: '#ffd208', background: '#ffd20811', padding: '6px 10px', borderRadius: 4, border: '1px solid #ffd20822' }}>
              0x{(Math.abs(word.split('').reduce((h, c) => Math.imul(h, 31) + c.charCodeAt(0) | 0, 0)) >>> 0).toString(16).padStart(8, '0').toUpperCase()}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20, fontSize: 10, color: '#666' }}>Private key never leaves this device</div>
    </div>
  );
}

function ServerVisualOld() {
  return (
    <div style={{ width: '100%', fontFamily: 'Space Mono, monospace' }}>
      <div style={{ fontSize: 11, color: '#777', marginBottom: 20 }}>What the server stores</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 10, color: '#666', marginBottom: 4 }}>Bloom filter index</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginBottom: 16 }}>
          {Array.from({ length: 40 }, (_, i) => (
            <div key={i} style={{
              width: 8, height: 8, borderRadius: 1,
              background: [2,5,7,11,14,18,22,25,29,33,37].includes(i) ? '#ffd208' : '#1a1a1a',
            }} />
          ))}
        </div>
        {['YID_001: 0xA4F3C8E1...', 'YID_002: 0x2B7D9F4A...', 'YID_003: 0xE8C1A5B2...'].map((line, i) => (
          <div key={i} style={{ fontSize: 10, color: '#666', padding: '5px 10px', background: '#111', borderRadius: 4 }}>{line}</div>
        ))}
      </div>
      <div style={{ marginTop: 16, fontSize: 10, color: '#666' }}>No words. No documents. Only hashes.</div>
    </div>
  );
}

function SearchVisualOld() {
  return (
    <div style={{ width: '100%', fontFamily: 'Space Mono, monospace' }}>
      <div style={{ fontSize: 11, color: '#777', marginBottom: 20 }}>Search flow</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 10, color: '#f5f5f0', background: '#1a1a1a', padding: '6px 12px', borderRadius: 4 }}>
            "patient"
          </div>
          <div style={{ fontSize: 9, color: '#777' }}>on device</div>
        </div>
        <div style={{ fontSize: 9, color: '#333', paddingLeft: 8 }}>PRF(SecretKey, "patient")</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 10, color: '#ffd208', background: '#ffd20811', padding: '6px 12px', borderRadius: 4, border: '1px solid #ffd20822' }}>
            XToken: 0x4A7F3C91
          </div>
          <div style={{ fontSize: 9, color: '#777' }}>sent to server</div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <div style={{ width: 1, background: '#1a1a1a', marginLeft: 8 }} />
          <div style={{ fontSize: 9, color: '#777', paddingTop: 4 }}>Server checks Bloom filter with this token. Never sees "patient".</div>
        </div>
      </div>
    </div>
  );
}

function DecryptVisualOld() {
  return (
    <div style={{ width: '100%', fontFamily: 'Space Mono, monospace' }}>
      <div style={{ fontSize: 11, color: '#777', marginBottom: 20 }}>Result decryption</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 10, color: '#666', padding: '6px 12px', background: '#111', borderRadius: 4 }}>
          server returns: EncRecord[0xF3A2...]
        </div>
        <div style={{ fontSize: 9, color: '#333', paddingLeft: 4 }}>
          KE = AES(KS, XToken) via PBKDF2
        </div>
        <div style={{ fontSize: 9, color: '#333', paddingLeft: 4 }}>
          decrypt(EncRecord, KE)
        </div>
        <div style={{ fontSize: 10, color: '#f5f5f0', padding: '6px 12px', background: '#1a2a1a', border: '1px solid #2a4a2a', borderRadius: 4 }}>
          medical_records_042.pdf
        </div>
        <div style={{ fontSize: 10, color: '#27c93f', marginTop: 4 }}>
          Decrypted locally. Server never knew.
        </div>
      </div>
    </div>
  );
}

*/