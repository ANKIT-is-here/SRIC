import React from 'react';
import { BookOpen, ShieldCheck, Key, Lock, EyeOff, Cpu, RefreshCw } from 'lucide-react';

export default function SSEExplanation() {
  const steps = [
    {
      icon: <Key className="sse-step-icon" />,
      title: "1. Setup Phase",
      formula: "Setup(λ) → K",
      desc: "Generates secure symmetric key K locally using security parameter λ. This key stays strictly on client hardware."
    },
    {
      icon: <BookOpen className="sse-step-icon" />,
      title: "2. Build Index Phase",
      formula: "BuildIndex(K, D) → I",
      desc: "Tokenizes and hashes document collection D. Unique words are converted to pseudo-random identifiers and mapped to document lists. The index is encrypted using K and stored on the server."
    },
    {
      icon: <RefreshCw className="sse-step-icon" />,
      title: "3. Trapdoor Generation",
      formula: "Trapdoor(K, w) → Tw",
      desc: "When searching for word w, the client uses K to generate a pseudorandom search token (trapdoor Tw) locally."
    },
    {
      icon: <Cpu className="sse-step-icon" />,
      title: "4. Ciphertext Search",
      formula: "Search(I, Tw) → R",
      desc: "The server receives trapdoor Tw. It queries encrypted index I to find matching document IDs blindly. The server returns encrypted search results R without learning w."
    }
  ];

  return (
    <section id="sse-explain" className="section-padding" style={{ background: 'linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-dark) 100%)' }}>
      <div className="container">
        
        {/* PAGE HEADER */}
        <div className="text-center" style={{ marginBottom: 60 }}>
          <div className="badge badge-cyan" style={{ marginBottom: 16 }}>Cryptographic Theory</div>
          <h2 className="section-title">Understanding Searchable Symmetric Encryption</h2>
          <p className="subtitle">
            SSE is a cryptographic breakthrough that balances cloud processing speed with absolute data confidentiality.
          </p>
        </div>

        {/* CORE DEFINITION PANEL */}
        <div className="sse-intro-panel glass-panel" style={{ marginBottom: 60 }}>
          <div className="sse-intro-content">
            <div className="sse-intro-title-wrap">
              <ShieldCheck className="sse-shield" />
              <h3>What is SSE?</h3>
            </div>
            <p className="sse-intro-text">
              <strong>Searchable Symmetric Encryption (SSE)</strong> enables a client to store a collection of encrypted documents on an untrusted server (such as a public cloud provider) while maintaining the ability to execute keyword searches over the encrypted corpus.
            </p>
            <p className="sse-intro-subtext">
              Unlike traditional models where data must be decrypted in host memory to be indexed or searched, SSE executes the search directly on the ciphertext. The server processes queries blindly, yielding zero exposure of underlying content or queries.
            </p>
          </div>
        </div>

        {/* MATHEMATICAL STEPS */}
        <div className="sse-steps-grid" style={{ marginBottom: 60 }}>
          {steps.map((step, idx) => (
            <div key={idx} className="sse-step-card glass-panel">
              <div className="sse-step-header">
                {step.icon}
                <span className="sse-step-formula text-mono">{step.formula}</span>
              </div>
              <h4 className="sse-step-title">{step.title}</h4>
              <p className="sse-step-desc text-secondary">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* ADVANCED THEORIES: LEAKAGE & SECURITY STRENGTH */}
        <div className="sse-theory-grid">
          
          {/* Security Standards */}
          <div className="theory-card glass-panel">
            <div className="theory-header">
              <Lock className="theory-icon" />
              <h4>IND-CKA2 Security Standard</h4>
            </div>
            <p className="theory-text">
              Our implementation adheres to the <strong>IND-CKA2</strong> (Indistinguishability under Chosen Keyword Attacks) standard. This mathematically guarantees that the encrypted files and index index tokens leak absolutely zero information about the documents to a passive adversary.
            </p>
            <ul className="theory-list">
              <li>Symmetric encryption blocks utilize AES-GCM-256 primitives.</li>
              <li>Keyword tokens are masked using cryptographically secure PRFs.</li>
              <li>Zero plaintext remnants are written to index databases.</li>
            </ul>
          </div>

          {/* Leakage Profiles */}
          <div className="theory-card glass-panel">
            <div className="theory-header">
              <EyeOff className="theory-icon" />
              <h4>Cryptographic Leakage Profiles</h4>
            </div>
            <p className="theory-text">
              In practical SSE deployments, minor patterns called leakage profiles are accepted to achieve practical search speeds (sub-millisecond O(1) searches):
            </p>
            <div className="leakage-boxes">
              <div className="leak-item">
                <h5>Search Pattern</h5>
                <p>Leaks whether two search queries are for the same keyword (essential for caching search tokens).</p>
              </div>
              <div className="leak-item">
                <h5>Access Pattern</h5>
                <p>Leaks which set of encrypted documents match a query (unavoidable when retrieving matching records).</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        .sse-intro-panel {
          padding: 40px;
          border-left: 4px solid var(--accent-cyan);
        }

        .sse-intro-title-wrap {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }

        .sse-shield {
          width: 36px;
          height: 36px;
          color: var(--accent-cyan);
        }

        .sse-intro-panel h3 {
          font-size: 1.5rem;
          font-weight: 800;
        }

        .sse-intro-text {
          font-size: 1.1rem;
          line-height: 1.7;
          margin-bottom: 16px;
        }

        .sse-intro-subtext {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* Steps */
        .sse-steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
        }

        .sse-step-card {
          padding: 30px 24px;
        }

        .sse-step-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .sse-step-icon {
          width: 32px;
          height: 32px;
          color: var(--accent-purple);
          background: rgba(123, 97, 255, 0.05);
          padding: 6px;
          border-radius: 8px;
          border: 1px solid rgba(123, 97, 255, 0.15);
        }

        .sse-step-formula {
          font-size: 11px;
          color: var(--accent-cyan);
          background: rgba(0, 212, 255, 0.05);
          padding: 4px 8px;
          border-radius: 4px;
          border: 1px solid rgba(0, 212, 255, 0.1);
          font-weight: 600;
        }

        .sse-step-title {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .sse-step-desc {
          font-size: 0.85rem;
          line-height: 1.5;
        }

        /* Theory section */
        .sse-theory-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        @media (max-width: 768px) {
          .sse-theory-grid {
            grid-template-columns: 1fr;
          }
        }

        .theory-card {
          padding: 35px;
        }

        .theory-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .theory-icon {
          color: var(--accent-cyan);
          width: 28px;
          height: 28px;
        }

        .theory-header h4 {
          font-size: 1.25rem;
          font-weight: 800;
        }

        .theory-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .theory-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .theory-list li {
          font-size: 0.85rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .theory-list li::before {
          content: '✔';
          color: var(--accent-cyan);
          font-size: 10px;
        }

        .leakage-boxes {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .leak-item {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--border-glass);
          padding: 14px;
          border-radius: 8px;
        }

        .leak-item h5 {
          color: var(--accent-purple);
          font-size: 0.85rem;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .leak-item p {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }
      `}</style>
    </section>
  );
}
