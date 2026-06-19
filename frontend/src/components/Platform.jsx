import React, { useState } from 'react';
import { Shield, Cpu, Layers, HardDrive, Compass, ArrowRight, Activity, Terminal } from 'lucide-react';

export default function Platform() {
  const [selectedNode, setSelectedNode] = useState('query-enc');

  // Architecture Nodes Details Data
  const nodeDetails = {
    'user-device': {
      title: "User Device (Client Side)",
      icon: <Compass className="node-pane-icon" />,
      what: "The local entry point where documents are loaded or queries entered. Plaintext variables and raw files are processed strictly within the local memory boundary of the user's browser or secure client hardware.",
      security: "Cryptographic secrets (NTRU keypairs, AES symmetric keys) never leave this device. Zero plaintext leakage to external networks.",
      metrics: {
        latency: "< 1ms",
        resource: "Minimal Client CPU",
        securityLevel: "128-bit Post-Quantum Secure"
      }
    },
    'query-enc': {
      title: "Query Encryption Module",
      icon: <Shield className="node-pane-icon" />,
      what: "Converts search strings into secure, pseudorandom trapdoors (tokens). It applies cryptographic hashes and NTRU-based homomorphic masking to prevent search pattern linkage.",
      security: "Prevents chosen-keyword attacks and prevents the cloud host from learning the actual keywords queried.",
      metrics: {
        latency: "< 2ms per keyword",
        resource: "Sub-millisecond hashing",
        securityLevel: "IND-CKA2 Secure"
      }
    },
    'search-layer': {
      title: "Encrypted Search Layer",
      icon: <Cpu className="node-pane-icon" />,
      what: "The active backend server engine. Consumes encrypted query tokens, performs secure token checks, and queries the Encrypted Index. It executes comparison math directly on ciphertext without decrypting index rows.",
      security: "Executes in zero-knowledge. The server processes operations blindly. Even in case of total database takeover, search commands reveal zero plaintext data.",
      metrics: {
        latency: "0.2ms - 15ms depending on dataset size",
        resource: "Highly parallelizable server cores",
        securityLevel: "Mathematically Guaranteed Isolation"
      }
    },
    'encrypted-index': {
      title: "Encrypted Index (Storage)",
      icon: <HardDrive className="node-pane-icon" />,
      what: "A high-performance cryptographic index. Stores unique word identifier hashes (word_ids) matched with list arrays of document identifiers (doc_ids), all encrypted symmetrically with AES-256-GCM.",
      security: "Protected against passive storage sniffing. Index values look like completely random, high-entropy hex sequences.",
      metrics: {
        latency: "O(1) dictionary retrieval",
        resource: "SSD storage optimized",
        securityLevel: "AES-256-GCM & Bloom Filter backed"
      }
    },
    'secure-results': {
      title: "Secure Results Pipeline",
      icon: <Layers className="node-pane-icon" />,
      what: "Returns matching document ciphertexts to the client device. Since the index queries and database rows match blindly, the results are wrapped in secure TLS envelopes and served directly to the user client.",
      security: "No decryption happens on the host storage nodes. The results are decrypted on-the-fly inside the client local sandbox.",
      metrics: {
        latency: "< 5ms network response",
        resource: "Zero host overhead",
        securityLevel: "Symmetric Cipher Integrity verified"
      }
    }
  };

  const active = nodeDetails[selectedNode];

  return (
    <section id="platform" className="section-padding" style={{ background: 'linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-dark) 100%)' }}>
      <div className="container">
        
        {/* PAGE HEADER */}
        <div className="text-center" style={{ marginBottom: 60 }}>
          <div className="badge badge-cyan" style={{ marginBottom: 16 }}>Platform Architecture</div>
          <h2 className="section-title">The Encrypted Search Platform</h2>
          <p className="subtitle">
            An enterprise-grade zero-knowledge flow. Click any node in the architecture diagram to explore its operation and security parameters.
          </p>
        </div>

        {/* ARCHITECTURE EXPLORER LAYOUT */}
        <div className="platform-grid">
          
          {/* LEFT: ARCHITECTURE DIAGRAM */}
          <div className="diagram-container glass-panel">
            <h3 className="panel-title-text"><Activity size={16} /> Interactive Architecture Flow</h3>
            
            <div className="nodes-flow">
              
              {/* Node 1 */}
              <div 
                className={`arch-node ${selectedNode === 'user-device' ? 'active' : ''}`}
                onClick={() => setSelectedNode('user-device')}
              >
                <div className="arch-node-badge">Client</div>
                <div className="arch-node-icon"><Compass /></div>
                <span className="arch-node-label">User Device</span>
              </div>

              <div className="flow-arrow"><ArrowRight size={16} /></div>

              {/* Node 2 */}
              <div 
                className={`arch-node ${selectedNode === 'query-enc' ? 'active' : ''}`}
                onClick={() => setSelectedNode('query-enc')}
              >
                <div className="arch-node-badge">Local Crypt</div>
                <div className="arch-node-icon"><Shield /></div>
                <span className="arch-node-label">Query Encryption</span>
              </div>

              <div className="flow-arrow"><ArrowRight size={16} /></div>

              {/* Node 3 */}
              <div 
                className={`arch-node ${selectedNode === 'search-layer' ? 'active' : ''}`}
                onClick={() => setSelectedNode('search-layer')}
              >
                <div className="arch-node-badge">SaaS Cloud</div>
                <div className="arch-node-icon"><Cpu /></div>
                <span className="arch-node-label">Secure Search Layer</span>
              </div>

              <div className="flow-arrow"><ArrowRight size={16} /></div>

              {/* Node 4 */}
              <div 
                className={`arch-node ${selectedNode === 'encrypted-index' ? 'active' : ''}`}
                onClick={() => setSelectedNode('encrypted-index')}
              >
                <div className="arch-node-badge">Cipher DB</div>
                <div className="arch-node-icon"><HardDrive /></div>
                <span className="arch-node-label">Encrypted Index</span>
              </div>

              <div className="flow-arrow"><ArrowRight size={16} /></div>

              {/* Node 5 */}
              <div 
                className={`arch-node ${selectedNode === 'secure-results' ? 'active' : ''}`}
                onClick={() => setSelectedNode('secure-results')}
              >
                <div className="arch-node-badge">Secure Output</div>
                <div className="arch-node-icon"><Layers /></div>
                <span className="arch-node-label">Secure Results</span>
              </div>

            </div>

            {/* Glowing lines representation */}
            <div className="data-flow-tracks">
              <div className="flow-track-line">
                <span className="glowing-data-pulse" />
              </div>
            </div>
          </div>

          {/* RIGHT: EXPLORATION PANEL */}
          <div className="details-panel glass-panel active-highlight">
            <div className="details-header">
              {active.icon}
              <div>
                <h3 className="details-title">{active.title}</h3>
                <span className="badge badge-cyan" style={{ marginTop: 4 }}>Active Component</span>
              </div>
            </div>

            <div className="details-body">
              <div className="details-section">
                <h4>What it does</h4>
                <p>{active.what}</p>
              </div>

              <div className="details-section">
                <h4>Security Guarantee</h4>
                <p className="text-secondary">{active.security}</p>
              </div>

              <div className="details-section">
                <h4>Performance Metrics</h4>
                <div className="metrics-grid">
                  <div className="metric-item">
                    <span className="metric-label">Latency Overhead</span>
                    <span className="metric-value">{active.metrics.latency}</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Resource Cost</span>
                    <span className="metric-value">{active.metrics.resource}</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Security Class</span>
                    <span className="metric-value text-purple">{active.metrics.securityLevel}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        .platform-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 30px;
        }

        @media (max-width: 1024px) {
          .platform-grid {
            grid-template-columns: 1fr;
          }
        }

        .panel-title-text {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 30px;
        }

        .diagram-container {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 40px 30px;
        }

        .nodes-flow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 40px 0;
          flex-wrap: wrap;
          gap: 15px;
        }

        @media (max-width: 640px) {
          .nodes-flow {
            flex-direction: column;
            gap: 24px;
          }
          .flow-arrow {
            transform: rotate(90deg);
          }
        }

        .arch-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          position: relative;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid var(--border-glass);
          background: rgba(255, 255, 255, 0.01);
          width: 120px;
          transition: var(--transition-smooth);
        }

        .arch-node:hover {
          border-color: rgba(0, 212, 255, 0.3);
          background: rgba(0, 212, 255, 0.02);
          transform: translateY(-2px);
        }

        .arch-node.active {
          border-color: var(--accent-cyan);
          background: rgba(0, 212, 255, 0.08);
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
          transform: scale(1.05);
        }

        .arch-node-badge {
          position: absolute;
          top: -10px;
          font-size: 9px;
          font-family: var(--font-mono);
          padding: 2px 6px;
          border-radius: 4px;
          background: var(--bg-slate);
          border: 1px solid var(--border-glass);
          color: var(--text-secondary);
        }

        .arch-node.active .arch-node-badge {
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
        }

        .arch-node-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
          color: var(--text-secondary);
          transition: var(--transition-smooth);
        }

        .arch-node.active .arch-node-icon {
          color: var(--accent-cyan);
        }

        .arch-node-label {
          font-size: 0.8rem;
          font-weight: 600;
          text-align: center;
          color: var(--text-secondary);
        }

        .arch-node.active .arch-node-label {
          color: var(--text-primary);
        }

        .flow-arrow {
          color: var(--text-muted);
        }

        .data-flow-tracks {
          width: 100%;
          margin-top: 20px;
        }

        .flow-track-line {
          height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,0.01), var(--border-glass), rgba(255,255,255,0.01));
          width: 100%;
          position: relative;
        }

        .glowing-data-pulse {
          position: absolute;
          height: 3px;
          width: 100px;
          background: linear-gradient(90deg, transparent, var(--accent-cyan), transparent);
          top: -1px;
          animation: laser-pulse 4s linear infinite;
        }

        @keyframes laser-pulse {
          0% { left: 0%; }
          100% { left: 100%; }
        }

        /* Exploration Panel */
        .details-panel {
          padding: 40px 30px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .details-header {
          display: flex;
          align-items: center;
          gap: 16px;
          border-bottom: 1px solid var(--border-glass);
          padding-bottom: 24px;
          margin-bottom: 24px;
        }

        .node-pane-icon {
          width: 48px;
          height: 48px;
          padding: 10px;
          border-radius: 12px;
          background: rgba(0, 212, 255, 0.1);
          color: var(--accent-cyan);
          border: 1px solid rgba(0, 212, 255, 0.2);
        }

        .details-title {
          font-size: 1.4rem;
          font-weight: 700;
        }

        .details-section {
          margin-bottom: 24px;
        }

        .details-section h4 {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .details-section p {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 12px;
        }

        @media (max-width: 480px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }
        }

        .metric-item {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-glass);
          padding: 12px;
          border-radius: 8px;
          text-align: center;
        }

        .metric-label {
          display: block;
          font-size: 10px;
          font-family: var(--font-mono);
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .metric-value {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-primary);
        }
      `}</style>
    </section>
  );
}
