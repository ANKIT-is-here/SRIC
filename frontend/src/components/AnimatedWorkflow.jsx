import React, { useState, useEffect, useRef } from 'react';
import { Database, FileText, Lock, Shield, Play, Pause, Key } from 'lucide-react';

export default function AnimatedWorkflow() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const ref = useRef(null);

  const TOTAL_STEPS = 8;
  const STEP_DUR = 1800; // faster animation speed

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) e.target.classList.add('visible');
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setTimeout(() => {
      setStep((prev) => (prev + 1) % TOTAL_STEPS);
    }, STEP_DUR);
    return () => clearTimeout(timer);
  }, [step, isPaused]);

  // Transitions with a slight bounce
  const t = 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)'; 

  const getDocStyle = () => {
    let style = { transition: t, position: 'absolute', top: '50%', transform: 'translate(-50%, -50%)', opacity: 1, zIndex: 10 };
    if (step < 3) style.left = '20%'; 
    else if (step >= 3 && step < 6) style.left = '80%'; 
    else style.left = '20%'; 
    return style;
  };

  const wordBase = { transition: t, position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 5 };
  
  const getWord1Style = () => ({ ...wordBase, top: '20%', opacity: (step >= 1 && step < 4) ? 1 : 0, left: step < 3 ? '25%' : '80%', color: step >= 2 ? '#ffd208' : '#fff' });
  const getWord2Style = () => ({ ...wordBase, top: '80%', opacity: (step >= 1 && step < 4) ? 1 : 0, left: step < 3 ? '25%' : '80%', color: step >= 2 ? '#ffd208' : '#fff' });
  const getWord3Style = () => ({ ...wordBase, top: '35%', opacity: (step >= 1 && step < 4) ? 1 : 0, left: step < 3 ? '35%' : '80%', color: step >= 2 ? '#ffd208' : '#fff' });

  const getTokenStyle = () => ({
    transition: t, position: 'absolute', top: '65%', transform: 'translate(-50%, -50%)',
    opacity: (step >= 4 && step < 6) ? 1 : 0,
    left: step < 5 ? '30%' : '80%',
    color: '#ffd208',
    zIndex: 10
  });

  const descriptions = [
    "1. Client prepares a sensitive document.",
    "2. Keywords are extracted locally.",
    "3. Keywords are hashed; document is encrypted.",
    "4. Encrypted data securely sent to server.",
    "5. Client generates a search token for a keyword.",
    "6. Server evaluates token without decrypting.",
    "7. Server returns encrypted match.",
    "8. Client locally decrypts the document."
  ];

  return (
    <div ref={ref} className="fade-up terminal-glow" style={{
      background: 'rgba(10, 10, 10, 0.6)', backdropFilter: 'blur(16px)',
      borderRadius: 16, padding: '24px', width: '100%',
      position: 'relative', overflow: 'hidden', border: '1px solid rgba(255, 210, 8, 0.2)'
    }}>
      {/* Header controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ff5f56','#ffbd2e','#27c93f'].map((c, i) => <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(0,0,0,0.5)', padding: '8px 16px', borderRadius: '20px', border: '1px solid #333', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)' }}>
          <div style={{ fontSize: '14px', color: '#ffd208', fontFamily: 'Space Mono, monospace', minWidth: '340px', textAlign: 'center', textShadow: '0 0 8px rgba(255, 210, 8, 0.4)' }}>
            {descriptions[step]}
          </div>
          <button 
            onClick={() => setIsPaused(!isPaused)} 
            style={{ background: 'rgba(255, 210, 8, 0.1)', border: '1px solid #ffd208', color: '#ffd208', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', borderRadius: '50%', transition: 'all 0.2s', boxShadow: '0 0 10px rgba(255, 210, 8, 0.2)' }}
            title={isPaused ? "Play" : "Pause"}
          >
            {isPaused ? <Play size={18} fill="currentColor" /> : <Pause size={18} fill="currentColor" />}
          </button>
        </div>
      </div>

      {/* Animation Canvas */}
      <div className="canvas-bg" style={{ height: '400px', position: 'relative', background: '#050505', borderRadius: '12px', border: '1px solid #222', overflow: 'hidden', boxShadow: 'inset 0 0 30px rgba(0,0,0,1)' }}>
        
        {/* Dynamic Data Path */}
        <div style={{
          position: 'absolute', top: '50%', left: '20%', width: '60%', height: '2px', 
          background: 'linear-gradient(90deg, transparent, rgba(255, 210, 8, 0.2), transparent)',
          transform: 'translateY(-50%)', zIndex: 1
        }}>
           <div style={{
             position: 'absolute', top: -1, width: '40%', height: '4px', background: 'var(--yellow)',
             boxShadow: '0 0 15px var(--yellow), 0 0 30px var(--yellow)', borderRadius: '50%',
             opacity: (step === 3 || step === 5 || step === 6) ? 0.8 : 0,
             transition: 'opacity 0.2s',
             animation: (step === 3 || step === 5 || step === 6) ? 'move-light 1.8s linear infinite' : 'none',
             left: (step === 6) ? 'auto' : 0, right: (step === 6) ? 0 : 'auto',
             animationDirection: step === 6 ? 'reverse' : 'normal'
           }} />
        </div>

        {/* Zones Background */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '40%', background: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '40%', background: 'radial-gradient(circle at 80% 50%, rgba(255, 210, 8, 0.05) 0%, transparent 70%)' }} />

        {/* Zone Labels */}
        <div style={{ position: 'absolute', left: '24px', top: '24px', color: '#777', fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 'bold' }}>Client Environment</div>
        <div style={{ position: 'absolute', right: '24px', top: '24px', color: '#777', fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 'bold' }}>Untrusted Server</div>
        
        {/* Background Icons */}
        <div style={{ position: 'absolute', left: '20%', top: '50%', transform: 'translate(-50%, -50%)', opacity: 0.03 }}><Shield size={200} /></div>
        <div style={{ position: 'absolute', left: '80%', top: '50%', transform: 'translate(-50%, -50%)', opacity: 0.03 }}><Database size={200} /></div>
        
        {/* Interactive Elements */}
        {/* Document */}
        <div style={getDocStyle()}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            {(step >= 2 && step <= 6) ? (
               <div style={{ padding: 24, background: 'rgba(39, 201, 63, 0.15)', border: '2px solid #27c93f', borderRadius: 16, boxShadow: '0 0 30px rgba(39, 201, 63, 0.3)' }}>
                 <Lock color="#27c93f" size={48} />
               </div>
            ) : (
               <div style={{ padding: 24, background: 'rgba(255, 255, 255, 0.1)', border: '2px solid rgba(255,255,255,0.4)', borderRadius: 16, boxShadow: '0 0 20px rgba(255,255,255,0.1)' }}>
                 <FileText color="#f5f5f0" size={48} />
               </div>
            )}
            <span style={{ fontSize: 15, fontWeight: 'bold', color: (step >= 2 && step <= 6) ? '#27c93f' : '#fff', fontFamily: 'Space Mono, monospace', background: 'rgba(0,0,0,0.8)', padding: '6px 12px', borderRadius: 6, backdropFilter: 'blur(4px)' }}>
              {(step >= 2 && step <= 6) ? "EncDoc_42" : "report.pdf"}
            </span>
          </div>
        </div>

        {/* Words */}
        <div style={getWord1Style()}>
          <div style={{ padding: '10px 20px', background: step >= 2 ? 'rgba(255, 210, 8, 0.15)' : 'rgba(255, 255, 255, 0.1)', border: '1px solid', borderColor: step >= 2 ? '#ffd208' : '#888', borderRadius: 30, fontSize: 16, fontWeight: 'bold', fontFamily: 'Space Mono, monospace', boxShadow: step >= 2 ? '0 0 20px rgba(255, 210, 8, 0.4)' : '0 0 15px rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)' }}>
            {step >= 2 ? "0x8F4C9B..." : '"financial"'}
          </div>
        </div>
        <div style={getWord2Style()}>
          <div style={{ padding: '10px 20px', background: step >= 2 ? 'rgba(255, 210, 8, 0.15)' : 'rgba(255, 255, 255, 0.1)', border: '1px solid', borderColor: step >= 2 ? '#ffd208' : '#888', borderRadius: 30, fontSize: 16, fontWeight: 'bold', fontFamily: 'Space Mono, monospace', boxShadow: step >= 2 ? '0 0 20px rgba(255, 210, 8, 0.4)' : '0 0 15px rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)' }}>
            {step >= 2 ? "0xA1B2C3..." : '"Q3"'}
          </div>
        </div>
        <div style={getWord3Style()}>
          <div style={{ padding: '10px 20px', background: step >= 2 ? 'rgba(255, 210, 8, 0.15)' : 'rgba(255, 255, 255, 0.1)', border: '1px solid', borderColor: step >= 2 ? '#ffd208' : '#888', borderRadius: 30, fontSize: 16, fontWeight: 'bold', fontFamily: 'Space Mono, monospace', boxShadow: step >= 2 ? '0 0 20px rgba(255, 210, 8, 0.4)' : '0 0 15px rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)' }}>
            {step >= 2 ? "0x9E7D2A..." : '"revenue"'}
          </div>
        </div>

        {/* Search Token */}
        <div style={getTokenStyle()}>
           <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 24px', background: 'rgba(255, 210, 8, 0.2)', border: '2px solid #ffd208', borderRadius: 40, boxShadow: '0 0 25px rgba(255, 210, 8, 0.4)', backdropFilter: 'blur(4px)' }}>
             <Key color="#ffd208" size={24} />
             <span style={{ fontSize: 18, fontFamily: 'Space Mono, monospace', fontWeight: 'bold', textShadow: '0 0 8px rgba(255, 210, 8, 0.5)' }}>XToken</span>
           </div>
        </div>

        {/* Server Processing Ring */}
        <div style={{ 
          position: 'absolute', top: '50%', left: '80%', transform: 'translate(-50%, -50%)', 
          width: 200, height: 200, borderRadius: '50%', border: '4px dashed #ffd208', 
          opacity: step === 5 ? 0.6 : 0, transition: 'all 0.4s', animation: step === 5 ? 'spin 3s linear infinite' : 'none', pointerEvents: 'none',
          boxShadow: '0 0 40px rgba(255,210,8,0.2)'
        }} />
      </div>
      
      <style>{`
        @keyframes spin { 100% { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes move-light {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
        .canvas-bg {
          background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
          background-position: 0 0;
        }
      `}</style>
    </div>
  );
}
