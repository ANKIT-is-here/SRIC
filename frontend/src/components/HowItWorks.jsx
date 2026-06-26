import { useEffect, useRef, useState } from 'react';

const STEPS = [
  {
    n: '01',
    title: 'Documents are encrypted on your device',
    body: 'Before anything leaves your machine, each document is broken into keywords. Those keywords are run through a cryptographic function using your private key, producing random-looking tokens. The actual words never leave your device.',
    visual: <EncryptVisual />,
  },
  {
    n: '02',
    title: 'Only encrypted tokens reach the server',
    body: 'The server receives a Bloom filter index and encrypted document IDs. The index maps token hashes to document positions. The server cannot reverse these hashes back to words. A breach of the server reveals nothing readable.',
    visual: <ServerVisual />,
  },
  {
    n: '03',
    title: 'Search happens without revealing the query',
    body: 'When you search, your device computes the same token for the keyword using your key. That token is sent to the server. The server checks its Bloom filter, finds matching encrypted records, and returns them. It never learns what you searched for.',
    visual: <SearchVisual />,
  },
  {
    n: '04',
    title: 'Only your device can read the result',
    body: 'The matching encrypted document IDs come back from the server. Your device decrypts them using a key derived from your secret and the search token. The server processed everything without ever seeing plaintext.',
    visual: <DecryptVisual />,
  },
];

export default function HowItWorks() {
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

          {/* Left: scrollable steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {STEPS.map((step, i) => (
              <div
                key={i}
                ref={el => stepRefs.current[i] = el}
                style={{
                  padding: '48px 0',
                  borderBottom: i < STEPS.length - 1 ? '1px solid #1a1a1a' : 'none',
                  opacity: active === i ? 1 : 0.3,
                  transition: 'opacity 0.4s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <span style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: 11,
                    color: active === i ? '#ffd208' : '#444',
                    transition: 'color 0.4s',
                  }}>{step.n}</span>
                  <div style={{ width: 24, height: 1, background: active === i ? '#ffd208' : '#333', transition: 'background 0.4s' }} />
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
            <div style={{
              background: '#0d0d0d',
              border: '1px solid #1a1a1a',
              borderRadius: 8,
              padding: 32,
              minHeight: 320,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.4s ease',
            }}>
              {STEPS[active].visual}
            </div>

            {/* Step dots */}
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

function EncryptVisual() {
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

function ServerVisual() {
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

function SearchVisual() {
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

function DecryptVisual() {
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