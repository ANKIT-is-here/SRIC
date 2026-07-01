import { useState, useEffect, useRef } from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import CtaFooter from './components/CtaFooter';
import About from './components/About';
import Contact from './components/Contact';
import LiveDemo from './components/LiveDemo';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [page, setPage] = useState('home'); // 'home' | 'demo'
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    if (page !== 'home') return;
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ['hero', 'how', 'about', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 100;
          const bot = top + el.offsetHeight;
          if (window.scrollY >= top && window.scrollY < bot) {
            setActive(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [page]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' });
  };

  const goDemo = () => {
    setPage('demo');
    window.scrollTo(0, 0);
  };

  const goHome = () => {
    setPage('home');
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <CustomCursor />
      {/* NAV */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <div className="nav-brand" onClick={goHome}>
            SSE<span>Vault</span>
          </div>

          {page === 'home' ? (
            <>
              <div className="nav-links">
                <button className={`nav-link ${active === 'hero' ? 'active' : ''}`} onClick={() => scrollTo('hero')}>Home</button>
                <button className={`nav-link ${active === 'how' ? 'active' : ''}`} onClick={() => scrollTo('how')}>How it works</button>
                <button className={`nav-link ${active === 'about' ? 'active' : ''}`} onClick={() => scrollTo('about')}>About</button>
                <button className={`nav-link ${active === 'contact' ? 'active' : ''}`} onClick={() => scrollTo('contact')}>Contact</button>
              </div>
              <button className="nav-cta" onClick={goDemo}>Try the demo</button>
            </>
          ) : (
            <button className="btn-ghost btn" onClick={goHome} style={{ fontSize: 13, padding: '6px 16px' }}>Back to site</button>
          )}
        </div>
      </nav>

      {/* PAGES */}
      {page === 'home' && (
        <>
          {/* ORIGINAL LAYOUT (Commented out for reverting if needed) 
          <main style={{ paddingTop: 64 }}>
            <section id="hero"><Hero onDemo={goDemo} /></section>
            <Features />
            <section id="how"><HowItWorks /></section>
            <section id="about"><About /></section>
            <section id="contact"><Contact /></section>
          </main>
          */}

          {/* NEW LAYOUT (With Sweeping Dividers and CTA) */}
          <main style={{ paddingTop: 64, background: '#0a0a0a' }}>
            <section id="hero" style={{ background: '#0a0a0a' }}>
              <Hero onDemo={goDemo} />
            </section>
            
            {/* Sweeping SVG Divider from Hero to Features */}
            <div style={{ width: '100%', overflow: 'hidden', lineHeight: 0, marginTop: '-2px', background: '#0a0a0a' }}>
              <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '60px', transform: 'rotate(180deg)' }}>
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#111111"></path>
              </svg>
            </div>

            <div style={{ background: '#111111', paddingTop: '40px' }}>
              <Features />
            </div>

            {/* Sweeping SVG Divider from Features to HowItWorks */}
            <div style={{ width: '100%', overflow: 'hidden', lineHeight: 0, marginTop: '-2px', background: '#0a0a0a' }}>
              <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '60px' }}>
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#111111"></path>
              </svg>
            </div>

            <section id="how" style={{ background: '#0a0a0a' }}><HowItWorks /></section>
            
            {/* Diagonal Divider for About */}
            <div style={{ width: '100%', height: '60px', background: 'linear-gradient(to bottom right, #0a0a0a 50%, #111111 50.1%)' }} />

            <section id="about" style={{ background: '#111111' }}><About /></section>

            {/* Diagonal Divider for Contact */}
            <div style={{ width: '100%', height: '60px', background: 'linear-gradient(to bottom right, #111111 50%, #0a0a0a 50.1%)' }} />

            <section id="contact" style={{ background: '#0a0a0a' }}><Contact /></section>
            
            {/* MASSIVE CTA FOOTER */}
            <CtaFooter onDemo={goDemo} />
          </main>
        </>
      )}

      {page === 'demo' && (
        <main style={{ paddingTop: 64 }}>
          <LiveDemo />
        </main>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="nav-brand">SSE<span>Vault</span></div>
          <span className="footer-copy">SEC / SEAL Lab, IIT Kharagpur</span>
          <a href="https://github.com/debadrita05/NTRU-OQXT" target="_blank" rel="noreferrer" className="footer-link">GitHub</a>
        </div>
      </footer>
    </div>
  );
}