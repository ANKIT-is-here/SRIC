import React, { useState } from 'react';
import { Shield, Lock, Cpu, Zap, Award, Globe, ArrowRight, Server, Eye, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

export default function Hero({ onNavigate }) {
  const [activeStory, setActiveStory] = useState('encrypted'); // 'traditional' or 'encrypted'

  // Why It Matters Cards Data
  const cards = [
    {
      icon: <Shield className="card-icon cyan" />,
      title: "End-to-End Privacy",
      description: "Data remains encrypted in transit, at rest, and even during computation. Plaintext never touches the host.",
      tag: "AES-GCM & NTRU"
    },
    {
      icon: <Lock className="card-icon purple" />,
      title: "Zero Knowledge Search",
      description: "Host servers execute complex search logic over ciphertexts without learning a single keyword or search result.",
      tag: "OQXT Protocol"
    },
    {
      icon: <Cpu className="card-icon cyan" />,
      title: "Cloud Scale Performance",
      description: "Proprietary cryptographic indexes search millions of records in sub-millisecond timelines, matching traditional database speeds.",
      tag: "Bloom Filters"
    },
    {
      icon: <Zap className="card-icon purple" />,
      title: "Fast Retrieval",
      description: "Leverages parallelized symmetric primitives to process encrypted indices quickly without decryption overhead.",
      tag: "Sub-millisecond"
    },
    {
      icon: <Award className="card-icon cyan" />,
      title: "Military Grade Security",
      description: "Standard cryptographic security guarantees including security against active adversaries and adaptive search leakage.",
      tag: "Quantum Resistant"
    },
    {
      icon: <Globe className="card-icon purple" />,
      title: "Compliance Redefined",
      description: "Satisfies stringent GDPR, HIPAA, and SOC 2 requirements by design, rendering cloud data breaches cryptographically harmless.",
      tag: "Compliance Ready"
    }
  ];

  // Mouse Tilt Effect
  const handleMouseMove = (e, idx) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Tilt angle
    const rotateX = -(y / (rect.height / 2)) * 8; 
    const rotateY = (x / (rect.width / 2)) * 8; 
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    card.style.boxShadow = `${x * -0.1}px ${y * -0.1}px 30px rgba(123, 97, 255, 0.25)`;
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    card.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';
  };

  return (
    <section id="home" className="section-padding">
      <div className="container">
        
        {/* HERO TITLE */}
        <div className="hero-text-wrapper">
          <div className="badge badge-cyan" style={{ marginBottom: 20 }}>
            🚀 State-of-the-Art Privacy Tech
          </div>
          <h1 className="hero-title">
            Search Encrypted Data <br />
            <span className="gradient-text">Without Revealing It</span>
          </h1>
          <p className="hero-subtitle">
            Privacy-preserving search powered by Searchable Symmetric Encryption (SSE) and Fully Homomorphic Encryption (FHE). Zero exposure guarantees for your enterprise data.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-cyan" onClick={() => onNavigate('demo')}>
              Try Live Demo <ArrowRight style={{ marginLeft: 8, width: 18, height: 18 }} />
            </button>
            <button className="btn btn-secondary" onClick={() => onNavigate('platform')}>
              View Architecture
            </button>
          </div>
        </div>

        {/* SCROLL STORY SECTION */}
        <div className="story-container">
          <div className="story-header text-center">
            <h2 className="section-subtitle">How Search Engine Architectures Compare</h2>
            <p className="subtitle">Select a search model to trace the flow of query and data visualization.</p>
            
            <div className="story-toggle">
              <button 
                className={`story-toggle-btn ${activeStory === 'traditional' ? 'active traditional' : ''}`}
                onClick={() => setActiveStory('traditional')}
              >
                Traditional Search
              </button>
              <button 
                className={`story-toggle-btn ${activeStory === 'encrypted' ? 'active encrypted' : ''}`}
                onClick={() => setActiveStory('encrypted')}
              >
                Encrypted Search (Our Platform)
              </button>
            </div>
          </div>

          <div className="story-flow-wrapper glass-panel">
            {activeStory === 'traditional' ? (
              <div className="flow-visual traditional-flow fade-in">
                {/* Step 1 */}
                <div className="flow-node">
                  <div className="flow-icon-circle"><FileText className="cyan" /></div>
                  <div className="flow-node-title">1. Search Query</div>
                  <p className="flow-node-desc">User enters a plaintext search term (e.g., "patient data").</p>
                </div>
                
                <div className="flow-connector danger-line">
                  <div className="flow-dot danger-dot"></div>
                </div>

                {/* Step 2 */}
                <div className="flow-node warning-highlight">
                  <div className="flow-icon-circle danger-border"><Server className="red" /></div>
                  <div className="flow-node-title text-red">2. Server Transmission</div>
                  <p className="flow-node-desc">Query and files are sent to cloud database in readable format.</p>
                </div>

                <div className="flow-connector danger-line">
                  <div className="flow-dot danger-dot"></div>
                </div>

                {/* Step 3 */}
                <div className="flow-node warning-highlight">
                  <div className="flow-icon-circle danger-border"><Eye className="red" /></div>
                  <div className="flow-node-title text-red">3. Data Exposure</div>
                  <p className="flow-node-desc">Server indexes data. Administrators, hackers, or cloud providers see everything.</p>
                  <div className="warning-badge"><AlertTriangle size={12} /> Privacy Risk</div>
                </div>
              </div>
            ) : (
              <div className="flow-visual encrypted-flow fade-in">
                {/* Step 1 */}
                <div className="flow-node">
                  <div className="flow-icon-circle secure-border"><Lock className="purple" /></div>
                  <div className="flow-node-title text-purple">1. Local Encryption</div>
                  <p className="flow-node-desc">Query is converted into a secure token locally on client device.</p>
                </div>

                <div className="flow-connector secure-line">
                  <div className="flow-dot secure-dot"></div>
                </div>

                {/* Step 2 */}
                <div className="flow-node">
                  <div className="flow-icon-circle secure-border"><Cpu className="cyan" /></div>
                  <div className="flow-node-title text-cyan">2. Ciphertext Search</div>
                  <p className="flow-node-desc">Symmetric / Homomorphic search executes entirely over encrypted files.</p>
                </div>

                <div className="flow-connector secure-line">
                  <div className="flow-dot secure-dot"></div>
                </div>

                {/* Step 3 */}
                <div className="flow-node">
                  <div className="flow-icon-circle secure-border"><CheckCircle className="green" /></div>
                  <div className="flow-node-title text-green">3. Local Decryption</div>
                  <p className="flow-node-desc">Only matching encrypted results are returned and decrypted on user device.</p>
                  <div className="secure-badge"><Shield size={12} /> 100% Secure</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* WHY IT MATTERS SECTION */}
        <div className="why-it-matters-section">
          <div className="text-center" style={{ marginBottom: 60 }}>
            <h2 className="section-title">Designed for Cryptographic Security</h2>
            <p className="subtitle">High-performance search primitives without sacrificing privacy or performance.</p>
          </div>
          
          <div className="cards-grid">
            {cards.map((c, i) => (
              <div 
                key={i} 
                className="card glass-panel"
                onMouseMove={(e) => handleMouseMove(e, i)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="card-top">
                  {c.icon}
                  <span className="card-tag">{c.tag}</span>
                </div>
                <h3 className="card-title">{c.title}</h3>
                <p className="card-desc">{c.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Styled JSX specifically for Hero & Scroll Story layout */}
      <style>{`
        .hero-text-wrapper {
          text-align: center;
          max-width: 900px;
          margin: 40px auto 80px;
          animation: slide-up 1s ease;
        }

        .hero-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 24px;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .hero-buttons {
          display: flex;
          justify-content: center;
          gap: 16px;
        }

        /* Scroll Story */
        .story-container {
          margin-top: 100px;
          margin-bottom: 120px;
        }

        .section-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .section-subtitle {
          font-size: 1.75rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          margin-bottom: 10px;
        }

        .story-toggle {
          display: inline-flex;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-glass);
          padding: 4px;
          border-radius: 9999px;
          margin: 30px 0;
        }

        .story-toggle-btn {
          padding: 10px 24px;
          border-radius: 9999px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition-smooth);
          font-size: 0.9rem;
        }

        .story-toggle-btn.active.traditional {
          background: rgba(244, 63, 94, 0.15);
          color: #f43f5e;
          border: 1px solid rgba(244, 63, 94, 0.3);
        }

        .story-toggle-btn.active.encrypted {
          background: rgba(123, 97, 255, 0.15);
          color: #a78bfa;
          border: 1px solid rgba(123, 97, 255, 0.3);
        }

        .story-flow-wrapper {
          padding: 50px 30px;
          min-height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .flow-visual {
          display: flex;
          align-items: flex-start;
          justify-content: space-around;
          width: 100%;
          gap: 20px;
        }

        @media (max-width: 768px) {
          .flow-visual {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 40px;
          }
          .flow-connector {
            width: 2px !important;
            height: 40px !important;
          }
          .flow-dot {
            animation: flow-v 2s linear infinite !important;
          }
        }

        .flow-node {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 250px;
        }

        .flow-icon-circle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-glass);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          transition: var(--transition-smooth);
        }

        .flow-icon-circle.danger-border {
          border-color: rgba(244, 63, 94, 0.3);
          background: rgba(244, 63, 94, 0.05);
        }

        .flow-icon-circle.secure-border {
          border-color: rgba(123, 97, 255, 0.3);
          background: rgba(123, 97, 255, 0.05);
        }

        .flow-node-title {
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 1.1rem;
          margin-bottom: 8px;
        }

        .flow-node-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .warning-badge, .secure-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 12px;
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .warning-badge {
          background: rgba(244, 63, 94, 0.1);
          color: #f43f5e;
          border: 1px solid rgba(244, 63, 94, 0.2);
        }

        .secure-badge {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .flow-connector {
          align-self: center;
          flex-grow: 1;
          height: 2px;
          position: relative;
          background: rgba(255,255,255,0.05);
          max-width: 120px;
        }

        .danger-line {
          background: linear-gradient(90deg, rgba(255,255,255,0.05), rgba(244,63,94,0.3));
        }

        .secure-line {
          background: linear-gradient(90deg, rgba(123,97,255,0.2), rgba(0,212,255,0.2));
        }

        .flow-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          top: -3px;
          left: 0;
          animation: flow-h 2s linear infinite;
        }

        .danger-dot {
          background: #f43f5e;
          box-shadow: 0 0 10px #f43f5e;
        }

        .secure-dot {
          background: var(--accent-cyan);
          box-shadow: 0 0 10px var(--accent-cyan);
        }

        @keyframes flow-h {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }

        @keyframes flow-v {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        .text-red { color: #f43f5e; }
        .text-purple { color: #a78bfa; }
        .text-green { color: #10b981; }
        .red { color: #f43f5e; }
        .green { color: #10b981; }

        /* Why it Matters Grid */
        .why-it-matters-section {
          margin-top: 100px;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 24px;
        }

        @media (max-width: 480px) {
          .cards-grid {
            grid-template-columns: 1fr;
          }
        }

        .card {
          transform-style: preserve-3d;
          transition: transform 0.1s ease, box-shadow 0.3s ease;
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .card-icon {
          width: 40px;
          height: 40px;
          padding: 8px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-glass);
        }

        .card-icon.cyan {
          color: var(--accent-cyan);
          border-color: rgba(0, 212, 255, 0.15);
        }

        .card-icon.purple {
          color: var(--accent-purple);
          border-color: rgba(123, 97, 255, 0.15);
        }

        .card-tag {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 12px;
          letter-spacing: -0.01em;
        }

        .card-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .fade-in {
          animation: fade-in-keyframes 0.5s ease-out forwards;
        }

        @keyframes fade-in-keyframes {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
