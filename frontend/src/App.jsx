import React, { useState, useEffect, useRef } from 'react';
import Hero from './components/Hero';
import Platform from './components/Platform';
import Technology from './components/Technology';
import LiveDemo from './components/LiveDemo';
import TryYourOwnFiles from './components/TryYourOwnFiles';
import Security from './components/Security';
import Documentation from './components/Documentation';
import About from './components/About';
import SSEExplanation from './components/SSEExplanation';
import { Shield, Sparkles, Menu, X, ArrowRight, Check } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [navShrunk, setNavShrunk] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const canvasRef = useRef(null);

  // Monitor scroll for shrinking navbar and highlighting active section
  useEffect(() => {
    const handleScroll = () => {
      setNavShrunk(window.scrollY > 50);

      // Section highlighters
      const sections = ['home', 'platform', 'technology', 'sse-explain', 'demo', 'try-files', 'security', 'pricing', 'docs', 'about'];
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
        top: el.offsetTop - 80, // Offset for sticky navbar
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  // 3D Canvas Particle Network Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse
    let mouse = { x: width / 2, y: height / 2, tx: width / 2, ty: height / 2 };
    
    const handleMouseMove = (e) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Initialize 3D particles
    const particleCount = 70;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 800,
        y: (Math.random() - 0.5) * 800,
        z: Math.random() * 800 - 400,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        vz: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1
      });
    }

    // Camera parameters
    let cameraRotationY = 0;
    let cameraRotationX = 0;
    const fov = 400; // perspective depth factor

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      // Parallax camera rotation based on mouse coordinates
      cameraRotationY = ((mouse.x - width / 2) / (width / 2)) * 0.25;
      cameraRotationX = -((mouse.y - height / 2) / (height / 2)) * 0.25;

      const cosY = Math.cos(cameraRotationY);
      const sinY = Math.sin(cameraRotationY);
      const cosX = Math.cos(cameraRotationX);
      const sinX = Math.sin(cameraRotationX);

      // Map 3D coordinates and sort by Z index for painters algorithm
      const projected = [];

      particles.forEach((p) => {
        // Update physics
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Boundary bounce inside 3D cube
        if (p.x > 400 || p.x < -400) p.vx *= -1;
        if (p.y > 400 || p.y < -400) p.vy *= -1;
        if (p.z > 400 || p.z < -400) p.vz *= -1;

        // Rotate Y axis
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;

        // Rotate X axis
        let y2 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        // Adjust translation to center of screen
        const transZ = z2 + 600; // Shift camera distance
        
        if (transZ > 50) {
          const scale = fov / transZ;
          const screenX = width / 2 + x1 * scale;
          const screenY = height / 2 + y2 * scale;
          
          projected.push({
            sx: screenX,
            sy: screenY,
            scale: scale,
            depth: transZ,
            raw: p
          });
        }
      });

      // Sort by depth (far first)
      projected.sort((a, b) => b.depth - a.depth);

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          const distSq = Math.pow(p1.sx - p2.sx, 2) + Math.pow(p1.sy - p2.sy, 2);
          
          // Connect nodes if screen distance is small
          if (distSq < 15000) {
            const alpha = (1 - Math.sqrt(distSq) / 122) * 0.15;
            ctx.strokeStyle = `rgba(123, 97, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.sx, p1.sy);
            ctx.lineTo(p2.sx, p2.sy);
            ctx.stroke();
          }
        }
      }

      // Draw node particles
      projected.forEach((p) => {
        const rad = p.raw.radius * p.scale;
        
        // Calculate distance to mouse cursor
        const toMouse = Math.sqrt(Math.pow(p.sx - mouse.x, 2) + Math.pow(p.sy - mouse.y, 2));
        
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, rad + (toMouse < 80 ? 2 : 0), 0, Math.PI * 2);
        
        if (toMouse < 80) {
          // Node glowing when mouse hover
          ctx.fillStyle = 'rgba(0, 212, 255, 0.9)';
          ctx.shadowBlur = 15;
          ctx.shadowColor = 'rgba(0, 212, 255, 0.8)';
        } else {
          ctx.fillStyle = `rgba(123, 97, 255, ${0.4 + p.scale * 0.3})`;
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="app-container">
      
      {/* 3D CANVASES & BACKDROP */}
      <canvas ref={canvasRef} className="particles-canvas" />
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
            <span>LatticeCrypt</span>
          </div>

          <div className="nav-menu">
            <button className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} onClick={() => scrollToSection('home')}>Home</button>
            <button className={`nav-link ${activeSection === 'platform' ? 'active' : ''}`} onClick={() => scrollToSection('platform')}>Platform</button>
            <button className={`nav-link ${activeSection === 'technology' ? 'active' : ''}`} onClick={() => scrollToSection('technology')}>Technology</button>
            <button className={`nav-link ${activeSection === 'sse-explain' ? 'active' : ''}`} onClick={() => scrollToSection('sse-explain')}>About SSE</button>
            <button className={`nav-link ${activeSection === 'demo' ? 'active' : ''}`} onClick={() => scrollToSection('demo')}>Demo</button>
            <button className={`nav-link ${activeSection === 'try-files' ? 'active' : ''}`} onClick={() => scrollToSection('try-files')}>Try Files</button>
            <button className={`nav-link ${activeSection === 'security' ? 'active' : ''}`} onClick={() => scrollToSection('security')}>Security</button>
            <button className={`nav-link ${activeSection === 'pricing' ? 'active' : ''}`} onClick={() => scrollToSection('pricing')}>Pricing</button>
            <button className={`nav-link ${activeSection === 'docs' ? 'active' : ''}`} onClick={() => scrollToSection('docs')}>Docs</button>
            <button className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={() => scrollToSection('about')}>About</button>
          </div>

          <div className="nav-actions">
            <button className="btn-nav btn-nav-secondary" onClick={() => scrollToSection('demo')}>Book Demo</button>
            <button className="btn-nav btn-nav-primary" onClick={() => scrollToSection('try-files')}>Get Started</button>
          </div>

          <button className="nav-hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {mobileMenuOpen && (
          <div className="mobile-menu glass-panel">
            <button onClick={() => scrollToSection('home')}>Home</button>
            <button onClick={() => scrollToSection('platform')}>Platform</button>
            <button onClick={() => scrollToSection('technology')}>Technology</button>
            <button onClick={() => scrollToSection('sse-explain')}>About SSE</button>
            <button onClick={() => scrollToSection('demo')}>Demo</button>
            <button onClick={() => scrollToSection('try-files')}>Try Files</button>
            <button onClick={() => scrollToSection('security')}>Security</button>
            <button onClick={() => scrollToSection('pricing')}>Pricing</button>
            <button onClick={() => scrollToSection('docs')}>Docs</button>
            <button onClick={() => scrollToSection('about')}>About</button>
            <div className="mobile-menu-actions">
              <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => scrollToSection('demo')}>Book Demo</button>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: 10 }} onClick={() => scrollToSection('try-files')}>Get Started</button>
            </div>
          </div>
        )}
      </nav>

      {/* RENDER PAGES */}
      <main className="main-content">
        
        {/* PAGE 1: HERO & WHY IT MATTERS */}
        <Hero onNavigate={scrollToSection} />

        {/* PAGE 2: PLATFORM INTERACTIVE ARCHITECTURE */}
        <Platform />

        {/* PAGE 3: CRITICAL CRYPTO TECHNOLOGY */}
        <Technology />

        {/* PAGE 3.5: DETAILED THEORY OF SSE */}
        <SSEExplanation />

        {/* PAGE 4: LIVE INTERACTIVE DEMO */}
        <LiveDemo />

        {/* PAGE 5: UPLOAD & SEARCH PORTAL */}
        <TryYourOwnFiles />

        {/* PAGE 6: SECURITY MATRIX */}
        <Security />

        {/* PRICING SECTION (SaaS Requirement) */}
        <section id="pricing" className="section-padding">
          <div className="container">
            <div className="text-center" style={{ marginBottom: 60 }}>
              <div className="badge badge-cyan" style={{ marginBottom: 16 }}>SaaS Plans</div>
              <h2 className="section-title">Transparent Enterprise Pricing</h2>
              <p className="subtitle">Choose a tier matching your query indexing size and computing performance requirements.</p>
            </div>

            <div className="pricing-grid">
              
              {/* Developer Tier */}
              <div className="pricing-card glass-panel">
                <div className="pricing-header">
                  <h4>Developer Sandbox</h4>
                  <span className="price">$0</span>
                  <p className="price-term">Free Forever</p>
                </div>
                <ul className="pricing-features">
                  <li><Check size={14} className="accent-text-cyan" /> 50 Indexed Documents</li>
                  <li><Check size={14} className="accent-text-cyan" /> 1,000 Unique Vocab Entries</li>
                  <li><Check size={14} className="accent-text-cyan" /> Post-Quantum NTRU Primitives</li>
                  <li><Check size={14} className="accent-text-cyan" /> Community API Access</li>
                </ul>
                <button className="btn btn-secondary" style={{ width: '100%', marginTop: 30 }} onClick={() => scrollToSection('demo')}>Launch Sandbox</button>
              </div>

              {/* Startup Pro Tier */}
              <div className="pricing-card glass-panel active-highlight">
                <div className="card-popular-badge">POPULAR</div>
                <div className="pricing-header">
                  <h4>Startup Scale</h4>
                  <span className="price">$420</span>
                  <p className="price-term">Per Month</p>
                </div>
                <ul className="pricing-features">
                  <li><Check size={14} className="accent-text-cyan" /> 10,000 Indexed Documents</li>
                  <li><Check size={14} className="accent-text-cyan" /> Infinite Vocab Size</li>
                  <li><Check size={14} className="accent-text-cyan" /> 2x Parallel CPU Threading</li>
                  <li><Check size={14} className="accent-text-cyan" /> 99.9% Cloud SLA</li>
                  <li><Check size={14} className="accent-text-cyan" /> Email & Discord Support</li>
                </ul>
                <button className="btn btn-primary" style={{ width: '100%', marginTop: 30 }} onClick={() => scrollToSection('try-files')}>Get Started</button>
              </div>

              {/* Enterprise Elite Tier */}
              <div className="pricing-card glass-panel">
                <div className="pricing-header">
                  <h4>Custom Enterprise</h4>
                  <span className="price">Custom</span>
                  <p className="price-term">Custom Agreements</p>
                </div>
                <ul className="pricing-features">
                  <li><Check size={14} className="accent-text-cyan" /> Infinite Index Boundaries</li>
                  <li><Check size={14} className="accent-text-cyan" /> Full FHE Numeric Calculations</li>
                  <li><Check size={14} className="accent-text-cyan" /> Isolated Dedicated Clusters</li>
                  <li><Check size={14} className="accent-text-cyan" /> 24/7/365 Cryptographic Support</li>
                  <li><Check size={14} className="accent-text-cyan" /> Custom SOC 2 Type II SLA audits</li>
                </ul>
                <button className="btn btn-secondary" style={{ width: '100%', marginTop: 30 }} onClick={() => scrollToSection('demo')}>Schedule Audits</button>
              </div>

            </div>
          </div>
        </section>

        {/* PAGE 7: SDK CODE EXAMPLE */}
        <Documentation />

        {/* PAGE 8: TIMELINE & TEAM */}
        <About />

      </main>

      {/* FOOTER */}
      <footer className="footer-bar">
        <div className="container footer-container">
          <div className="footer-brand">
            <Shield className="brand-logo" />
            <span>LatticeCrypt</span>
          </div>
          <p className="footer-copyright">
            © {new Date().getFullYear()} LatticeCrypt Systems Inc. Licensed under Apache 2.0.
          </p>
          <div className="footer-links">
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
            <a href="#docs">Docs</a>
            <a href="#security">Security Core</a>
          </div>
        </div>
      </footer>

      <style>{`
        .app-container {
          min-height: 100vh;
          position: relative;
          z-index: 1;
        }

        .particles-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: -1;
          pointer-events: none;
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

        .btn-nav-secondary {
          background: transparent;
          color: white;
          border: 1px solid var(--border-glass);
        }

        .btn-nav-secondary:hover {
          border-color: var(--accent-purple);
          color: var(--accent-purple);
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

        /* Pricing Page cards */
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }

        .pricing-card {
          padding: 40px 30px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .pricing-card.active-highlight {
          border-color: var(--accent-purple);
          box-shadow: 0 12px 40px 0 rgba(123, 97, 255, 0.15);
        }

        .card-popular-badge {
          position: absolute;
          top: -12px;
          right: 30px;
          background: var(--accent-purple);
          color: white;
          font-size: 10px;
          font-family: var(--font-mono);
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 9999px;
          letter-spacing: 0.1em;
        }

        .pricing-header {
          margin-bottom: 24px;
          border-bottom: 1px solid var(--border-glass);
          padding-bottom: 24px;
        }

        .pricing-header h4 {
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
          margin-bottom: 12px;
        }

        .pricing-header .price {
          font-size: 3rem;
          font-weight: 800;
          color: white;
          line-height: 1;
        }

        .pricing-header .price-term {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 4px;
        }

        .pricing-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 30px;
        }

        .pricing-features li {
          font-size: 0.9rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 10px;
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
