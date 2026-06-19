import React from 'react';
import { Check, X, ShieldAlert, Award, FileCheck, CheckCircle2 } from 'lucide-react';

export default function Security() {
  const comparisonData = [
    {
      feature: "Server sees search query",
      traditional: { value: "Yes", status: "fail", desc: "The query string is exposed in memory and database execution logs." },
      platform: { value: "No", status: "pass", desc: "The keyword is encrypted locally to a trapdoor hash. The server only sees random hex tokens." }
    },
    {
      feature: "Encrypted-state indexing",
      traditional: { value: "No", status: "fail", desc: "Indices contain plain text words linking to plaintext docs." },
      platform: { value: "Yes", status: "pass", desc: "Index stores key mappings in high-entropy states, decryptable only by client private keys." }
    },
    {
      feature: "Search on ciphertext",
      traditional: { value: "No", status: "fail", desc: "Must decrypt database records or memory index before matching." },
      platform: { value: "Yes", status: "pass", desc: "Executes symmetric trapdoor token comparisons without revealing index rows." }
    },
    {
      feature: "Data exposure on database breach",
      traditional: { value: "High", status: "fail", desc: "A breach exposes all documents, indexes, and search logs." },
      platform: { value: "None", status: "pass", desc: "Breached index logs contain only high-entropy strings, rendering them useless." }
    },
    {
      feature: "End-to-end encryption integrity",
      traditional: { value: "Partial", status: "fail", desc: "Decrypted temporarily on host node during calculation loops." },
      platform: { value: "Full", status: "pass", desc: "Always encrypted in transit, storage, and computation layers." }
    }
  ];

  const certs = [
    {
      title: "GDPR Compliant",
      desc: "Perfectly aligns with Article 32 ('Security of Processing') and the Right to be Forgotten by cryptographically wiping client keys.",
      badge: "Regulation Compliant"
    },
    {
      title: "SOC 2 Type II",
      desc: "Designed to meet the absolute limits of the Security Trust Services Criteria through zero-trust isolation architecture.",
      badge: "Enterprise Ready"
    },
    {
      title: "ISO/IEC 27001",
      desc: "Fully integrates into standard Information Security Management Systems (ISMS), defining post-quantum backup protocols.",
      badge: "Certified Standard"
    },
    {
      title: "HIPAA Compliant",
      desc: "Protects Protected Health Information (PHI) by ensuring the hosting cloud cannot view clinical patient databases.",
      badge: "Healthcare Approved"
    }
  ];

  return (
    <section id="security" className="section-padding" style={{ background: 'linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-dark) 100%)' }}>
      <div className="container">
        
        {/* HEADER */}
        <div className="text-center" style={{ marginBottom: 60 }}>
          <div className="badge badge-red" style={{ marginBottom: 16 }}>Enterprise Compliance</div>
          <h2 className="section-title">Security First. Always.</h2>
          <p className="subtitle">
            We render cloud database breaches cryptographically harmless. Review how our mathematical guarantees stack up against traditional models.
          </p>
        </div>

        {/* COMPARISON TABLE */}
        <div className="table-wrapper-sec glass-panel" style={{ marginBottom: 80 }}>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Security Feature Matrix</th>
                <th>Traditional Search</th>
                <th className="highlight-col">Symmetric & FHE Search</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <tr key={idx}>
                  <td className="feature-cell">
                    <strong>{row.feature}</strong>
                  </td>
                  
                  <td className="trad-cell">
                    <div className="cell-flex">
                      <X className="cell-icon-err" size={16} />
                      <div>
                        <span>{row.traditional.value}</span>
                        <p className="cell-sub">{row.traditional.desc}</p>
                      </div>
                    </div>
                  </td>

                  <td className="plat-cell highlight-col">
                    <div className="cell-flex">
                      <CheckCircle2 className="cell-icon-ok" size={16} />
                      <div>
                        <span>{row.platform.value}</span>
                        <p className="cell-sub-light">{row.platform.desc}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CERTIFICATIONS */}
        <div className="certs-section">
          <div className="text-center" style={{ marginBottom: 50 }}>
            <h3 className="section-subtitle">Certifications & Standards by Design</h3>
            <p className="subtitle">Our zero-knowledge design matches global requirements out-of-the-box.</p>
          </div>

          <div className="certs-grid">
            {certs.map((c, i) => (
              <div key={i} className="cert-card glass-panel">
                <div className="cert-header">
                  <Award className="cert-icon" />
                  <span className="badge badge-cyan" style={{ fontSize: 9 }}>{c.badge}</span>
                </div>
                <h4 className="cert-title">{c.title}</h4>
                <p className="cert-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .table-wrapper-sec {
          overflow-x: auto;
          padding: 24px;
        }

        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .comparison-table th {
          padding: 18px 20px;
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border-glass);
        }

        .comparison-table td {
          padding: 24px 20px;
          border-bottom: 1px solid var(--border-glass);
          vertical-align: top;
        }

        .comparison-table tr:last-child td {
          border-bottom: none;
        }

        .feature-cell {
          font-size: 1rem;
          color: white;
          max-width: 250px;
        }

        .cell-flex {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .cell-icon-err {
          color: #f43f5e;
          flex-shrink: 0;
          margin-top: 4px;
        }

        .cell-icon-ok {
          color: #10b981;
          flex-shrink: 0;
          margin-top: 4px;
        }

        .cell-sub {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 4px;
          line-height: 1.4;
        }

        .cell-sub-light {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-top: 4px;
          line-height: 1.4;
        }

        .highlight-col {
          background: rgba(123, 97, 255, 0.02);
          border-left: 1px solid rgba(123, 97, 255, 0.1);
          border-right: 1px solid rgba(123, 97, 255, 0.1);
        }

        th.highlight-col {
          color: var(--accent-cyan) !important;
          background: rgba(123, 97, 255, 0.05);
        }

        /* Certifications cards grid */
        .certs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
        }

        .cert-card {
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cert-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .cert-icon {
          width: 32px;
          height: 32px;
          color: var(--accent-cyan);
          background: rgba(0, 212, 255, 0.05);
          padding: 6px;
          border-radius: 8px;
          border: 1px solid rgba(0, 212, 255, 0.15);
        }

        .cert-title {
          font-size: 1.15rem;
          font-weight: 700;
        }

        .cert-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
      `}</style>
    </section>
  );
}
