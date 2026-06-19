import React from 'react';
import { Award, Compass, BookOpen, ShieldAlert, Cpu, CheckCircle } from 'lucide-react';

export default function About() {
  const milestones = [
    {
      year: "Q1 2024",
      title: "Core Cryptographic R&D",
      desc: "Completed basic primitives implementation for symmetric index generation and NTRU lattice masking parameters, hitting <5ms trapdoor benchmarks.",
      status: "completed"
    },
    {
      year: "Q3 2024",
      title: "Academic Peer Review",
      desc: "Submitted index architecture papers to global cryptography conferences. Validated IND-CKA2 security constraints against active adversaries.",
      status: "completed"
    },
    {
      year: "Q1 2025",
      title: "FastAPI Engine & Setup Release",
      desc: "Built the high-speed Python/C++ search middleware. Rolled out CLI compilers and index statistics dashboards.",
      status: "completed"
    },
    {
      year: "Q3 2025",
      title: "V2 Enterprise SDK Release",
      desc: "Published official React, Python, and Node.js wrapper SDKs containing local trapdoor generators and client-side sandbox decryptors.",
      status: "current"
    },
    {
      year: "Q1 2026",
      title: "FHE Parallel Calculations",
      desc: "Deploying vectorized Homomorphic calculations to filter and aggregate database numeric columns directly on ciphertext.",
      status: "upcoming"
    }
  ];

  const team = [
    { name: "Debadrita Talapatra", role: "Main Developer", credentials: "Lead Cryptographic Systems Architect" },
    { name: "Ankit Pal", role: "Student Researcher", credentials: "Secure Search Algorithm Implementer" },
    { name: "Prof. Debdeep Mukhopadhyay", role: "Professor Advisor", credentials: "Faculty Advisor & Cryptography Consultant" }
  ];

  return (
    <section id="about" className="section-padding" style={{ background: 'linear-gradient(180deg, var(--bg-dark) 0%, var(--bg-deep) 100%)' }}>
      <div className="container">
        
        {/* PAGE HEADER */}
        <div className="text-center" style={{ marginBottom: 80 }}>
          <div className="badge badge-cyan" style={{ marginBottom: 16 }}>Our Narrative</div>
          <h2 className="section-title">Mission, Research & Roadmap</h2>
          <p className="subtitle">
            Pioneering post-quantum zero-knowledge search algorithms to secure enterprise databases.
          </p>
        </div>

        {/* MISSION & VISION */}
        <div className="about-intro-grid" style={{ marginBottom: 80 }}>
          <div className="intro-card glass-panel">
            <div className="intro-header">
              <Compass className="intro-icon" />
              <h3>Our Mission</h3>
            </div>
            <p className="intro-text">
              To eliminate the conflict between database usability and privacy. We believe enterprises should leverage the speed of cloud database index search without ever exposing proprietary payloads or search records to cloud hosting servers.
            </p>
          </div>

          <div className="intro-card glass-panel">
            <div className="intro-header">
              <BookOpen className="intro-icon" />
              <h3>Research Background</h3>
            </div>
            <p className="intro-text">
              Our indexing engine is built on standard Searchable Symmetric Encryption (SSE) protocols, using NTRU key exchange parameters and Blake3 block hashing. We specialize in post-quantum, sub-linear lookup times using Bloom filters and OQXT index designs.
            </p>
          </div>
        </div>

        {/* ROADMAP TIMELINE */}
        <div className="roadmap-timeline-section" style={{ marginBottom: 80 }}>
          <div className="text-center" style={{ marginBottom: 50 }}>
            <h3 className="section-subtitle">Development Roadmap</h3>
            <p className="subtitle">Trace our milestones from academic concepts to production deployment.</p>
          </div>

          <div className="timeline-track">
            {milestones.map((m, idx) => (
              <div key={idx} className={`timeline-item ${m.status}`}>
                <div className="timeline-dot-wrap">
                  <div className="timeline-node-dot">
                    {m.status === 'completed' && <CheckCircle size={14} className="node-icon-check" />}
                  </div>
                </div>
                
                <div className="timeline-content-card glass-panel">
                  <div className="timeline-year-badge">
                    <span className="text-mono">{m.year}</span>
                    <span className={`milestone-status-tag ${m.status}`}>{m.status}</span>
                  </div>
                  <h4>{m.title}</h4>
                  <p className="text-secondary">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TEAM & PARTNERS */}
        <div className="team-section">
          <div className="text-center" style={{ marginBottom: 50 }}>
            <h3 className="section-subtitle">Cryptographic Advisory Board</h3>
            <p className="subtitle">Built by leading researchers in secure multi-party computation and systems infrastructure.</p>
          </div>

          <div className="team-grid">
            {team.map((member, i) => (
              <div key={i} className="team-card glass-panel">
                <div className="team-avatar-placeholder">
                  <span>{member.name.split(' ').map(x => x[0]).join('')}</span>
                </div>
                <h4 className="team-name">{member.name}</h4>
                <p className="team-role accent-text-cyan">{member.role}</p>
                <p className="team-creds">{member.credentials}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .about-intro-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        @media (max-width: 768px) {
          .about-intro-grid {
            grid-template-columns: 1fr;
          }
        }

        .intro-card {
          padding: 35px;
        }

        .intro-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .intro-icon {
          color: var(--accent-cyan);
          width: 32px;
          height: 32px;
        }

        .intro-header h3 {
          font-size: 1.3rem;
          font-weight: 800;
        }

        .intro-text {
          color: var(--text-secondary);
          line-height: 1.6;
          font-size: 0.95rem;
        }

        /* Timeline Roadmap styles */
        .timeline-track {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px 0;
        }

        .timeline-track::before {
          content: '';
          position: absolute;
          left: 19px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--border-glass);
        }

        .timeline-item {
          display: flex;
          gap: 24px;
          margin-bottom: 40px;
          position: relative;
        }

        .timeline-dot-wrap {
          width: 40px;
          display: flex;
          justify-content: center;
          position: relative;
          z-index: 2;
        }

        .timeline-node-dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--bg-slate);
          border: 2px solid var(--border-glass);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 24px;
        }

        .timeline-item.completed .timeline-node-dot {
          background: rgba(16, 185, 129, 0.2);
          border-color: #10b981;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
        }

        .timeline-item.current .timeline-node-dot {
          background: rgba(123, 97, 255, 0.2);
          border-color: var(--accent-purple);
          box-shadow: 0 0 10px rgba(123, 97, 255, 0.3);
        }

        .node-icon-check {
          color: #10b981;
        }

        .timeline-content-card {
          flex-grow: 1;
          padding: 24px;
        }

        .timeline-year-badge {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .timeline-year-badge span:first-child {
          font-weight: 700;
          color: white;
          font-size: 1.1rem;
        }

        .milestone-status-tag {
          font-size: 9px;
          font-family: var(--font-mono);
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .milestone-status-tag.completed {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .milestone-status-tag.current {
          background: rgba(123, 97, 255, 0.1);
          color: var(--accent-purple);
        }

        .milestone-status-tag.upcoming {
          background: rgba(0, 212, 255, 0.1);
          color: var(--accent-cyan);
        }

        .timeline-content-card h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        /* Team styles */
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
        }

        .team-card {
          padding: 30px 20px;
          text-align: center;
        }

        .team-avatar-placeholder {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-glass);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--accent-cyan);
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }

        .team-name {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .team-role {
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .team-creds {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
      `}</style>
    </section>
  );
}
