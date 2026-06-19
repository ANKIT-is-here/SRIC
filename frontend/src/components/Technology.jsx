import React, { useState } from 'react';
import { Shield, Database, Lock, Cpu, Server, Terminal, HelpCircle } from 'lucide-react';

export default function Technology() {
  const [hoveredLayer, setHoveredLayer] = useState(null);

  // Stack Layers Data
  const layers = [
    { id: 'app', name: 'Application Layer', desc: 'Secure APIs, search interfaces, and client integrations connecting to user workflows.', color: '#00d4ff' },
    { id: 'sec', name: 'Security & Access Control', desc: 'Post-Quantum signatures (NTRU/Falcon) validating request authorization and authenticity.', color: '#7b61ff' },
    { id: 'enc', name: 'Cryptographic Transform Layer', desc: 'SSE indexes and Homomorphic computations executing calculations without reading payload variables.', color: '#4cc9f0' },
    { id: 'store', name: 'Secure Storage Layer', desc: 'Encrypted document blobs, word maps, database indices, and Bloom filters written safely to disk.', color: '#c084fc' },
    { id: 'infra', name: 'Isolated Infrastructure', desc: 'Host container grids, sandboxed runtimes, and secure network pipes.', color: '#38bdf8' }
  ];

  return (
    <section id="technology" className="section-padding">
      <div className="container">
        
        {/* PAGE HEADER */}
        <div className="text-center" style={{ marginBottom: 80 }}>
          <div className="badge badge-cyan" style={{ marginBottom: 16 }}>Cryptographic Primitives</div>
          <h2 className="section-title">Security Primitives & Technology Stack</h2>
          <p className="subtitle">
            How we leverage advanced mathematics and secure system designs to search ciphertext with zero leaks.
          </p>
        </div>

        {/* TWO COLUMN PRIMITIVES EXPLANATION */}
        <div className="primitives-grid" style={{ marginBottom: 80 }}>
          
          {/* SSE Primitive Card */}
          <div className="primitive-card glass-panel">
            <div className="prim-header">
              <div className="badge">SSE</div>
              <h3>Searchable Symmetric Encryption</h3>
            </div>
            
            <p className="prim-desc">
              Allows the cloud database to query records matching a client-generated search token. It constructs an inverted index mapped with pseudorandom hashes. The server confirms matching documents without knowing the search string.
            </p>

            <div className="prim-flow-box">
              <div className="p-flow-step">
                <span className="p-flow-num">1</span>
                <span className="p-flow-lbl">Keyword</span>
              </div>
              <div className="p-flow-arrow">→</div>
              <div className="p-flow-step active">
                <span className="p-flow-num">2</span>
                <span className="p-flow-lbl">Trapdoor Token</span>
              </div>
              <div className="p-flow-arrow">→</div>
              <div className="p-flow-step">
                <span className="p-flow-num">3</span>
                <span className="p-flow-lbl">Cipher Index</span>
              </div>
              <div className="p-flow-arrow">→</div>
              <div className="p-flow-step active-cyan">
                <span className="p-flow-num">4</span>
                <span className="p-flow-lbl">Match Query</span>
              </div>
            </div>

            <div className="crypt-notes">
              <Lock size={12} /> Symmetric Index lookup runs in <strong>O(1)</strong> time complexity.
            </div>
          </div>

          {/* FHE Primitive Card */}
          <div className="primitive-card glass-panel">
            <div className="prim-header">
              <div className="badge badge-cyan">FHE</div>
              <h3>Fully Homomorphic Encryption</h3>
            </div>

            <p className="prim-desc">
              Enables the processing of queries across encrypted numerical fields, arrays, or text documents. Computations are performed directly on encrypted states, outputting an encrypted result that only the client can decrypt.
            </p>

            <div className="prim-flow-box">
              <div className="p-flow-step">
                <span className="p-flow-num">1</span>
                <span className="p-flow-lbl">Encrypted Data</span>
              </div>
              <div className="p-flow-arrow">→</div>
              <div className="p-flow-step active-purple">
                <span className="p-flow-num">2</span>
                <span className="p-flow-lbl">Encrypted Math</span>
              </div>
              <div className="p-flow-arrow">→</div>
              <div className="p-flow-step">
                <span className="p-flow-num">3</span>
                <span className="p-flow-lbl">Encrypted Result</span>
              </div>
            </div>

            <div className="crypt-notes">
              <Cpu size={12} /> Plaintext data is never exposed in memory during computation.
            </div>
          </div>

        </div>

        {/* 3D LAYERS STACK SECTION */}
        <div className="stack-section">
          <div className="text-center" style={{ marginBottom: 50 }}>
            <h3 className="section-subtitle">The Security Layer Cake</h3>
            <p className="subtitle">Hover over the layers to inspect the security architecture stacks.</p>
          </div>

          <div className="stack-container-grid">
            
            {/* LEFT: 3D INTERACTIVE STACK */}
            <div className="stack-visual-wrapper">
              <div className="layers-3d-stack">
                {layers.map((layer, index) => {
                  const isHovered = hoveredLayer === layer.id;
                  const zTranslate = index * 40;
                  const hoverTransform = isHovered 
                    ? `rotateX(-30deg) rotateY(15deg) translateY(-30px) translateZ(${zTranslate + 30}px)` 
                    : `rotateX(-30deg) rotateY(15deg) translateZ(${zTranslate}px)`;
                  
                  return (
                    <div 
                      key={layer.id}
                      className={`layer-slice ${isHovered ? 'hovered' : ''}`}
                      style={{ 
                        transform: hoverTransform,
                        zIndex: 10 - index,
                        borderColor: isHovered ? layer.color : 'rgba(255, 255, 255, 0.08)',
                        boxShadow: isHovered ? `0 0 40px ${layer.color}44` : 'none'
                      }}
                      onMouseEnter={() => setHoveredLayer(layer.id)}
                      onMouseLeave={() => setHoveredLayer(null)}
                    >
                      <div className="slice-content">
                        <span className="slice-number">0{layers.length - index}</span>
                        <span className="slice-title">{layer.name}</span>
                        <div className="slice-glow-border" style={{ background: layer.color }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: LAYER EXPLANATION PANE */}
            <div className="stack-info-pane glass-panel">
              {hoveredLayer ? (
                <div className="pane-content-info fade-in">
                  <div className="info-header" style={{ borderColor: layers.find(l => l.id === hoveredLayer).color }}>
                    <h4 className="info-title">{layers.find(l => l.id === hoveredLayer).name}</h4>
                  </div>
                  <p className="info-desc">{layers.find(l => l.id === hoveredLayer).desc}</p>
                  
                  <div className="info-audit">
                    <span className="audit-dot"></span> Audited Cryptographic Implementation
                  </div>
                </div>
              ) : (
                <div className="pane-placeholder">
                  <HelpCircle className="placeholder-icon" />
                  <p>Hover over any layer of the 3D stack on the left to inspect its role in our zero-knowledge search pipeline.</p>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

      <style>{`
        .primitives-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        @media (max-width: 768px) {
          .primitives-grid {
            grid-template-columns: 1fr;
          }
        }

        .primitive-card {
          padding: 35px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .prim-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .prim-header h3 {
          font-size: 1.3rem;
          font-weight: 800;
        }

        .prim-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .prim-flow-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid var(--border-glass);
          padding: 16px 12px;
          border-radius: 10px;
          margin-bottom: 24px;
        }

        .p-flow-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .p-flow-num {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .p-flow-lbl {
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
        }

        .p-flow-step.active .p-flow-num {
          background: rgba(123, 97, 255, 0.2);
          color: var(--accent-purple);
        }
        .p-flow-step.active .p-flow-lbl {
          color: var(--accent-purple);
        }

        .p-flow-step.active-cyan .p-flow-num {
          background: rgba(0, 212, 255, 0.2);
          color: var(--accent-cyan);
        }
        .p-flow-step.active-cyan .p-flow-lbl {
          color: var(--accent-cyan);
        }

        .p-flow-step.active-purple .p-flow-num {
          background: rgba(192, 132, 252, 0.2);
          color: #c084fc;
        }
        .p-flow-step.active-purple .p-flow-lbl {
          color: #c084fc;
        }

        .p-flow-arrow {
          color: var(--text-muted);
          font-weight: 700;
        }

        .crypt-notes {
          font-size: 11px;
          font-family: var(--font-mono);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* 3D Stack */
        .stack-container-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 40px;
          margin-top: 40px;
        }

        @media (max-width: 900px) {
          .stack-container-grid {
            grid-template-columns: 1fr;
          }
        }

        .stack-visual-wrapper {
          min-height: 380px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
        }

        .layers-3d-stack {
          width: 100%;
          max-width: 450px;
          height: 300px;
          position: relative;
          transform-style: preserve-3d;
        }

        .layer-slice {
          position: absolute;
          width: 100%;
          height: 60px;
          background: rgba(11, 16, 32, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--border-glass);
          border-radius: 12px;
          display: flex;
          align-items: center;
          padding: 0 24px;
          cursor: pointer;
          transform-style: preserve-3d;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s, box-shadow 0.4s;
        }

        .slice-content {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 20px;
          position: relative;
        }

        .slice-number {
          font-family: var(--font-mono);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .slice-title {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .slice-glow-border {
          position: absolute;
          top: 0;
          left: -24px;
          width: 4px;
          height: 100%;
          border-radius: 2px 0 0 2px;
        }

        .layer-slice.hovered .slice-number {
          color: var(--text-primary);
        }

        /* Stack Info Pane */
        .stack-info-pane {
          min-height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px;
        }

        .pane-placeholder {
          text-align: center;
          color: var(--text-muted);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .placeholder-icon {
          width: 48px;
          height: 48px;
          opacity: 0.3;
        }

        .pane-content-info {
          width: 100%;
        }

        .info-header {
          border-left: 3px solid var(--accent-purple);
          padding-left: 16px;
          margin-bottom: 20px;
        }

        .info-title {
          font-size: 1.4rem;
          font-weight: 700;
        }

        .info-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .info-audit {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #10b981;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .audit-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
        }
      `}</style>
    </section>
  );
}
