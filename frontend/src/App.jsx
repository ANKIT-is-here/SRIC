import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import LiveDemo from './components/LiveDemo';
import About from './components/About';
import Contact from './components/Contact';
import { Shield, Menu, X } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [navShrunk, setNavShrunk] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll for shrinking navbar and highlighting active section
  useEffect(() => {
    const handleScroll = () => {
      setNavShrunk(window.scrollY > 50);

      const sections = ['home', 'demo', 'about', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll helper
  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="app-container">

      <div className="aurora-bg">
        <div className="aurora-glow-1"></div>
        <div className="aurora-glow-2"></div>
      </div>
      <div className="grid-overlay"></div>

      {/* FLOAT NAVBAR */}
      <nav className={`navbar ${navShrunk ? 'shrunk' : ''}`}>
        <div className="nav-container">
          <div className="nav-brand" onClick={() => scrollToSection('home')}>
            <Shield className="brand-logo" />
            <span>SSE Vault</span>
          </div>

          <div className="nav-menu">
            <button className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} onClick={() => scrollToSection('home')}>Home</button>
            <button className={`nav-link ${activeSection === 'demo' ? 'active' : ''}`} onClick={() => scrollToSection('demo')}>Demo</button>
            <button className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={() => scrollToSection('about')}>About</button>
            <button className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} onClick={() => scrollToSection('contact')}>Contact</button>
          </div>

          <div className="nav-actions">
            <button className="btn-nav btn-nav-primary" onClick={() => scrollToSection('demo')}>Try the Demo</button>
          </div>

          <button className="nav-hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {mobileMenuOpen && (
          <div className="mobile-menu glass-panel">
            <button onClick={() => scrollToSection('home')}>Home</button>
            <button onClick={() => scrollToSection('demo')}>Demo</button>
            <button onClick={() => scrollToSection('about')}>About</button>
            <button onClick={() => scrollToSection('contact')}>Contact</button>
            <div className="mobile-menu-actions">
              <button className="btn btn-primary" style={{ width: '100%', marginTop: 10 }} onClick={() => scrollToSection('demo')}>Try the Demo</button>
            </div>
          </div>
        )}
      </nav>

      {/* RENDER PAGES */}
      <main className="main-content">

        <Hero onNavigate={scrollToSection} />

        <LiveDemo />

        <About />

        <Contact />

      </main>

      {/* FOOTER */}
      <footer className="footer-bar">
        <div className="container footer-container">
          <div className="footer-brand">
            <Shield className="brand-logo" />
            <span>SSE Vault</span>
          </div>
          <p className="footer-copyright">
            © {new Date().getFullYear()} SEC / SEAL Lab
          </p>
          <div className="footer-links">
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </footer>

      <style>{`
        .app-container {
          min-height: 100vh;
          position: relative;
          z-index: 1;
        }

        /* Navbar Styles */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 80px;
          z-index: 100;
          background: rgba(5, 8, 22, 0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          transition: var(--transition-smooth);
        }

        .navbar.shrunk {
          height: 64px;
          background: rgba(5, 8, 22, 0.75);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
          border-bottom: 1px solid rgba(123, 97, 255, 0.15);
        }

        .nav-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 800;
          font-size: 1.25rem;
          color: white;
          cursor: pointer;
          letter-spacing: -0.01em;
        }

        .brand-logo {
          color: var(--accent-cyan);
          width: 24px;
          height: 24px;
          filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.4));
        }

        .nav-menu {
          display: flex;
          gap: 4px;
        }

        @media (max-width: 1024px) {
          .nav-menu, .nav-actions {
            display: none;
          }
          .nav-hamburger {
            display: block !important;
          }
        }

        .nav-link {
          background: transparent;
          border: none;
          padding: 8px 14px;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          border-radius: 6px;
          transition: var(--transition-smooth);
        }

        .nav-link:hover {
          color: white;
          background: rgba(255, 255, 255, 0.02);
        }

        .nav-link.active {
          color: var(--accent-cyan);
          background: rgba(0, 212, 255, 0.05);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .btn-nav {
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: var(--transition-smooth);
        }

        .btn-nav-primary {
          background: var(--accent-cyan);
          color: #050816;
          border: none;
        }

        .btn-nav-primary:hover {
          box-shadow: 0 0 15px rgba(0, 212, 255, 0.4);
          transform: translateY(-1px);
        }

        .nav-hamburger {
          display: none;
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
        }

        /* Mobile Dropdown menu */
        .mobile-menu {
          position: absolute;
          top: 80px;
          left: 24px;
          right: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 24px;
          border-radius: 12px;
        }

        .mobile-menu button {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 1rem;
          font-weight: 600;
          text-align: left;
          padding: 8px 0;
          cursor: pointer;
        }

        .mobile-menu button:hover {
          color: var(--accent-cyan);
        }

        .mobile-menu-actions {
          margin-top: 12px;
          border-top: 1px solid var(--border-glass);
          padding-top: 16px;
        }

        /* Main structure */
        .main-content {
          padding-top: 80px;
        }

        /* Footer */
        .footer-bar {
          background: #03050f;
          border-top: 1px solid var(--border-glass);
          padding: 40px 0;
          margin-top: 80px;
        }

        .footer-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        @media (max-width: 640px) {
          .footer-container {
            flex-direction: column;
            text-align: center;
          }
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 800;
          color: white;
        }

        .footer-copyright {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .footer-links {
          display: flex;
          gap: 20px;
        }

        .footer-links a {
          color: var(--text-secondary);
          font-size: 0.85rem;
          text-decoration: none;
          transition: var(--transition-smooth);
        }

        .footer-links a:hover {
          color: var(--accent-cyan);
        }
      `}</style>
    </div>
  );
}