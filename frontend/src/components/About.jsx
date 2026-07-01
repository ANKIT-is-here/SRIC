import { useEffect, useRef, useState } from 'react';

function TurnableSealCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Tilt effect (inverted so it leans towards the mouse)
    const rotateX = ((y - centerY) / centerY) * -15; 
    const rotateY = ((x - centerX) / centerX) * 15;
    
    // Add the base 180deg flip if it is flipped
    const flipDeg = isFlipped ? 180 : 0;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY + flipDeg}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `rotateX(0deg) rotateY(${isFlipped ? 180 : 0}deg)`;
  };

  return (
    <div 
      style={{ 
        perspective: '1500px', 
        width: '100%', 
        maxWidth: '900px', 
        margin: '0 auto 120px auto', 
        height: '450px', 
        cursor: 'none' // Use the custom cursor
      }}
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={cardRef}
        style={{
          width: '100%', height: '100%',
          position: 'relative',
          transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)', // Smooth snap back and flip
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* FRONT OF CARD */}
        <div style={{
          position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
          background: 'rgba(15, 15, 15, 0.8)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 210, 8, 0.3)', borderRadius: '24px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 30px 60px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.05)',
          overflow: 'hidden'
        }}>
          {/* Subtle glow behind text */}
          <div style={{ position: 'absolute', width: '200px', height: '200px', background: 'rgba(255, 210, 8, 0.15)', filter: 'blur(80px)', borderRadius: '50%' }} />
          
          <div style={{ fontSize: 16, color: '#ffd208', letterSpacing: 6, textTransform: 'uppercase', marginBottom: 20, zIndex: 1, fontFamily: 'Space Mono, monospace' }}>Developed at</div>
          <h2 style={{ fontSize: 'clamp(60px, 8vw, 100px)', fontWeight: 900, color: '#fff', margin: 0, textShadow: '0 0 60px rgba(255, 210, 8, 0.4)', zIndex: 1, letterSpacing: '-0.02em' }}>SEAL LAB</h2>
          <div style={{ fontSize: 24, color: '#888', marginTop: 10, zIndex: 1, fontWeight: 300 }}>IIT Kharagpur</div>
          
          <div style={{ marginTop: 60, padding: '12px 24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 30, fontSize: 13, color: '#aaa', zIndex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#ffd208', boxShadow: '0 0 10px #ffd208' }} />
            Click anywhere to flip
          </div>
        </div>

        {/* BACK OF CARD */}
        <div style={{
          position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
          background: 'linear-gradient(135deg, rgba(20,20,20,0.95) 0%, rgba(30,25,0,0.95) 100%)', 
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 210, 8, 0.6)', borderRadius: '24px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          transform: 'rotateY(180deg)', padding: '60px',
          boxShadow: '0 30px 60px rgba(255, 210, 8, 0.15), inset 0 0 60px rgba(255, 210, 8, 0.05)'
        }}>
          <p style={{ 
            fontSize: 'clamp(20px, 3vw, 32px)', lineHeight: '1.5', fontWeight: '600', color: '#f5f5f0', textAlign: 'center',
            textShadow: '0 4px 20px rgba(0,0,0,0.8)', margin: 0
          }}>
            The SEC / SEAL Lab at IIT Kharagpur is pioneering the next generation of cryptographic privacy. We believe that security shouldn't come at the cost of utility. With Searchable Symmetric Encryption, your data remains cryptographically locked on untrusted servers, while still giving you the power to find exactly what you need in milliseconds. <br/><br/><span style={{ color: '#ffd208', fontSize: '1.1em' }}>No compromises. No plaintext.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div className="section" style={{ borderTop: '1px solid #1a1a1a', padding: '120px 0' }}>
      <div className="container">
        
        {/* TURNABLE SEAL LAB CARD */}
        <TurnableSealCard />

        <div>
          <div className="label" style={{ marginBottom: 16 }}>Future plans</div>
          <h2 className="heading-lg" style={{ marginBottom: 48, maxWidth: 480 }}>
            Where this is headed
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1, border: '1px solid #1a1a1a', borderRadius: 8, overflow: 'hidden' }}>
            {[
              {
                title: 'Range and fuzzy queries',
                body: 'Extending support beyond exact keyword matches. Partial words and approximate terms should resolve without leaking structural information to the server.',
              },
              {
                title: 'Dynamic index updates',
                body: 'Adding or removing documents from the encrypted index without a full rebuild. Currently the index is static after setup.',
              },
              {
                title: 'Numeric FHE queries',
                body: 'Running aggregate operations like sum, average, and filter directly on encrypted numeric fields using Fully Homomorphic Encryption.',
              },
            ].map((item, i) => (
              <div key={i} style={{ padding: '32px 28px', background: '#0d0d0d', borderRight: i < 2 ? '1px solid #1a1a1a' : 'none' }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#f5f5f0', marginBottom: 12, letterSpacing: '-0.01em' }}>
                  {item.title}
                </h3>
                <p className="body-sm">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===========================================================================
// ORIGINAL ABOUT CODE & TEXT SCRUB BACKUP
// (Commented out so it can be reverted if needed)
// ===========================================================================
//
// export function AboutWithTextScrub() {
//   const [scrollProgress, setScrollProgress] = useState(0);
//   const containerRef = useRef();
//   
//   useEffect(() => {
//     const handleScroll = () => {
//       if (!containerRef.current) return;
//       const rect = containerRef.current.getBoundingClientRect();
//       const windowHeight = window.innerHeight;
//       
//       const start = windowHeight * 0.8;
//       const end = windowHeight * 0.2;
//       const current = rect.top;
//       
//       const progress = 1 - (current - end) / (start - end);
//       setScrollProgress(Math.min(Math.max(progress, 0), 1));
//     };
//     
//     window.addEventListener('scroll', handleScroll);
//     handleScroll(); // init
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
//
//   const text = "The SEC / SEAL Lab at IIT Kharagpur is pioneering the next generation of cryptographic privacy. We believe that security shouldn't come at the cost of utility. With Searchable Symmetric Encryption, your data remains cryptographically locked on untrusted servers, while still giving you the power to find exactly what you need in milliseconds. No compromises. No plaintext.";
//   const words = text.split(" ");
//
//   return (
//     <div className="section" style={{ borderTop: '1px solid #1a1a1a', padding: '120px 0' }}>
//       <div className="container">
//         
//         {/* TEXT SCRUB SECTION */}
//         <div ref={containerRef} style={{ 
//           fontSize: 'clamp(24px, 4vw, 42px)', 
//           lineHeight: '1.4', 
//           fontWeight: '700', 
//           maxWidth: '1000px', 
//           margin: '0 auto 120px auto', 
//           textAlign: 'center',
//           fontFamily: 'Inter, sans-serif',
//           letterSpacing: '-0.02em'
//         }}>
//           {words.map((w, i) => {
//             const wordProgress = i / words.length;
//             const isActive = scrollProgress > wordProgress - 0.05;
//             return (
//               <span key={i} style={{ 
//                 color: isActive ? '#f5f5f0' : '#222', 
//                 transition: 'color 0.4s ease',
//                 textShadow: isActive ? '0 0 20px rgba(255,255,255,0.1)' : 'none'
//               }}>
//                 {w}{" "}
//               </span>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }
//
// export function AboutOld() {
//   const ref = useRef();
//   useEffect(() => {
//     const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add('visible'); }, { threshold: 0.2 });
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, []);
//
//   return (
//     <div className="section" style={{ borderTop: '1px solid #1a1a1a' }}>
//       <div className="container">
//         <div ref={ref} className="fade-up">
//           <div className="label" style={{ marginBottom: 16 }}>Future plans</div>
//           <h2 className="heading-lg" style={{ marginBottom: 48, maxWidth: 480 }}>
//             Where this is headed
//           </h2>
//
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1, border: '1px solid #1a1a1a', borderRadius: 8, overflow: 'hidden' }}>
//             {[
//               {
//                 title: 'Range and fuzzy queries',
//                 body: 'Extending support beyond exact keyword matches. Partial words and approximate terms should resolve without leaking structural information to the server.',
//               },
//               {
//                 title: 'Dynamic index updates',
//                 body: 'Adding or removing documents from the encrypted index without a full rebuild. Currently the index is static after setup.',
//               },
//               {
//                 title: 'Numeric FHE queries',
//                 body: 'Running aggregate operations like sum, average, and filter directly on encrypted numeric fields using Fully Homomorphic Encryption.',
//               },
//             ].map((item, i) => (
//               <div key={i} style={{ padding: '32px 28px', background: '#0d0d0d', borderRight: i < 2 ? '1px solid #1a1a1a' : 'none' }}>
//                 <h3 style={{ fontSize: 16, fontWeight: 600, color: '#f5f5f0', marginBottom: 12, letterSpacing: '-0.01em' }}>
//                   {item.title}
//                 </h3>
//                 <p className="body-sm">{item.body}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }