import { useEffect, useRef, useState } from 'react';
import AnimatedWorkflow from './AnimatedWorkflow';
import ParticleNetwork from './ParticleNetwork';
import MagneticButton from './MagneticButton';

const TYPING_PHRASES = [
  "encrypted data.",
  "medical records.",
  "financial data.",
  "personal emails."
];

export default function Hero({ onDemo }) {
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setTimeout(() => el.classList.add('visible'), 100);
  }, []);

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentPhrase = TYPING_PHRASES[phraseIndex];
    
    if (isDeleting) {
      if (text === "") {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % TYPING_PHRASES.length);
      } else {
        timer = setTimeout(() => setText(text.slice(0, -1)), 30);
      }
    } else {
      if (text === currentPhrase) {
        timer = setTimeout(() => setIsDeleting(true), 2500);
      } else {
        timer = setTimeout(() => setText(currentPhrase.slice(0, text.length + 1)), 60);
      }
    }
    
    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex]);

  return (
    <div className="section" style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
      {/* <div className="hero-bg" /> */}
      <ParticleNetwork />
      <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '60px' }}>
        <div ref={ref} className="fade-up" style={{ textAlign: 'center', maxWidth: 800 }}>
          <div className="label" style={{ marginBottom: 24, justifyContent: 'center', display: 'flex' }}>SEC / SEAL Lab, IIT Kharagpur</div>
          <h1 className="heading-xl" style={{ marginBottom: 24 }}>
            Search <span>{text}<span className="typing-cursor">_</span></span><br />
            <span className="yellow">Reveal nothing.</span>
          </h1>
          <p className="body-lg" style={{ maxWidth: 600, margin: '0 auto 40px auto' }}>
            Documents live on the server fully encrypted. Search happens without the server ever seeing your query or your files.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            {/* 
            <button className="btn btn-primary" onClick={onDemo}>Try the demo</button> 
            */}
            <MagneticButton>
              <button className="btn btn-primary" onClick={onDemo}>Try the demo</button>
            </MagneticButton>

            {/* 
            <a href="#how" className="btn btn-ghost" onClick={e => { e.preventDefault(); document.getElementById('how')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>
              See how it works
            </a>
            */}
            <MagneticButton strength={30}>
              <a href="#how" className="btn btn-ghost" onClick={e => { e.preventDefault(); document.getElementById('how')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>
                See how it works
              </a>
            </MagneticButton>
          </div>
        </div>

        {/*
        <div style={{ width: '100%', maxWidth: 1000 }}>
          <AnimatedWorkflow />
        </div>
        */}
      </div>
    </div>
  );
}
