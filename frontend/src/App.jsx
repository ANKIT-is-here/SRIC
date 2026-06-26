import { useState, useEffect, useRef } from 'react';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import About from './components/About';
import Contact from './components/Contact';
import LiveDemo from './components/LiveDemo';

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
        <main style={{ paddingTop: 64 }}>
          <section id="hero"><Hero onDemo={goDemo} /></section>
          <section id="how"><HowItWorks /></section>
          <section id="about"><About /></section>
          <section id="contact"><Contact /></section>
        </main>
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