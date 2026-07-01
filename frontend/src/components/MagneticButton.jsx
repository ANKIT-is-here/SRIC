import React, { useRef, useState } from 'react';

export default function MagneticButton({ children, onClick, className, style, strength = 40 }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const deltaX = ((clientX - centerX) / width) * strength;
    const deltaY = ((clientY - centerY) / height) * strength;
    
    setPos({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
      style={{
        ...style,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: pos.x === 0 && pos.y === 0 ? 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'transform 0.1s linear',
        display: 'inline-block',
        cursor: 'none'
      }}
    >
      {children}
    </div>
  );
}
