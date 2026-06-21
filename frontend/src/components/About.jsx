import React from 'react';

export default function About() {
  return (
    <section id="about" className="section-padding" style={{ background: 'linear-gradient(180deg, var(--bg-dark) 0%, var(--bg-deep) 100%)' }}>
      <div className="container">

        <div className="text-center" style={{ marginBottom: 40 }}>
          <div className="badge badge-cyan" style={{ marginBottom: 16 }}>Future Plans</div>
          <h2 className="section-title">What's Next for SSE</h2>
        </div>

        <div className="future-plans-panel glass-panel">
          <p className="future-plans-text">
            The current implementation handles single and conjunctive keyword search over an encrypted index built with Bloom filters and trapdoor tokens. The next phase focuses on extending this to support range queries and fuzzy matching, so partial or approximate keywords can still resolve correctly without leaking structure to the server.
          </p>
          <p className="future-plans-text">
            We are also exploring update support, allowing documents to be added or removed from the encrypted index without rebuilding it from scratch, and evaluating Fully Homomorphic Encryption for numeric fields so aggregate queries can run directly on ciphertext.
          </p>
          <p className="future-plans-text">
            Performance work is ongoing in parallel: reducing index size, tightening search latency at scale, and benchmarking against larger document collections to validate the design under realistic load.
          </p>
        </div>

      </div>

      <style>{`
        .future-plans-panel {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px;
        }

        .future-plans-text {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 0.98rem;
          margin-bottom: 20px;
        }

        .future-plans-text:last-child {
          margin-bottom: 0;
        }
      `}</style>
    </section>
  );
}