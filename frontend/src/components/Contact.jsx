import React from 'react';
import { Mail } from 'lucide-react';

export default function Contact() {
  const people = [
    {
      name: "Debadrita Talapatra",
      role: "Main Developer",
      email: "debadritatalapatra@gmail.com"
    },
    {
      name: "Prof. Debdeep Mukhopadhyay",
      role: "Faculty Advisor, CSE",
      email: "debdeep@cse.iitkgp.ac.in"
    }
  ];

  return (
    <section id="contact" className="section-padding" style={{ background: 'linear-gradient(180deg, var(--bg-dark) 0%, var(--bg-deep) 100%)' }}>
      <div className="container">

        <div className="text-center" style={{ marginBottom: 50 }}>
          <div className="badge badge-cyan" style={{ marginBottom: 16 }}>Get in Touch</div>
          <h2 className="section-title">Contact</h2>
        </div>

        <div className="contact-grid">
          {people.map((p, i) => (
            <div key={i} className="contact-card glass-panel">
              <h4 className="contact-name">{p.name}</h4>
              <p className="contact-role">{p.role}</p>
              <a href={`mailto:${p.email}`} className="contact-email">
                <Mail size={14} />
                <span>{p.email}</span>
              </a>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          max-width: 700px;
          margin: 0 auto;
        }

        .contact-card {
          padding: 28px;
          text-align: center;
        }

        .contact-name {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .contact-role {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 16px;
        }

        .contact-email {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--accent-cyan);
          text-decoration: none;
        }

        .contact-email:hover {
          text-decoration: underline;
        }
      `}</style>
    </section>
  );
}