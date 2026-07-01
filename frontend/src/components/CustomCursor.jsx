import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    
    // Check if hovering clickable elements
    const checkHover = (e) => {
      const target = e.target;
      if (
        target.tagName?.toLowerCase() === 'button' || 
        target.tagName?.toLowerCase() === 'a' || 
        target.closest('button') || 
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', checkHover);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', checkHover);
    };
  }, []);

  return (
    <div className="custom-cursor-container">
      {/* Small dot */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: 8, height: 8,
        background: isHovering ? '#27c93f' : '#ffd208', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 9999,
        transform: `translate(${pos.x - 4}px, ${pos.y - 4}px)`,
        transition: 'transform 0.05s linear, background 0.3s',
        boxShadow: isHovering ? '0 0 10px #27c93f' : '0 0 10px #ffd208'
      }} />
      {/* Trailing ring */}
      <div style={{
        position: 'fixed', top: 0, left: 0, 
        width: isHovering ? 60 : 30, height: isHovering ? 60 : 30,
        border: `2px solid ${isHovering ? 'rgba(39, 201, 63, 0.6)' : 'rgba(255, 210, 8, 0.4)'}`,
        borderRadius: '50%',
        pointerEvents: 'none', zIndex: 9998,
        transform: `translate(${pos.x - (isHovering ? 30 : 15)}px, ${pos.y - (isHovering ? 30 : 15)}px)`,
        transition: 'transform 0.15s ease-out, width 0.3s, height 0.3s, border-color 0.3s',
        boxShadow: isHovering ? '0 0 20px rgba(39, 201, 63, 0.2)' : 'none'
      }} />

      <style>{`
        @media (pointer: fine) {
          body, a, button { cursor: none !important; }
        }
        @media (pointer: coarse) {
          .custom-cursor-container { display: none !important; }
        }
      `}</style>
    </div>
  );
}
