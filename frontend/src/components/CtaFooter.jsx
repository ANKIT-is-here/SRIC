import React from 'react';
import MagneticButton from './MagneticButton';

export default function CtaFooter({ onDemo }) {
  return (
    <div style={{ 
      padding: '120px 20px', 
      textAlign: 'center', 
      background: 'radial-gradient(ellipse at center, rgba(255, 210, 8, 0.15) 0%, #0a0a0a 60%)',
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid rgba(255, 210, 8, 0.1)'
    }}>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="heading-xl" style={{ marginBottom: 24, textShadow: '0 0 20px rgba(255, 210, 8, 0.3)' }}>
          Ready to secure your data?
        </h2>
        <p className="body-lg" style={{ maxWidth: 600, margin: '0 auto 40px auto', color: '#ccc' }}>
          Experience the power of Searchable Symmetric Encryption. See how you can search your private data without ever exposing it.
        </p>
        {/* 
        <button 
          className="btn btn-primary" 
          onClick={onDemo} 
          style={{ 
            fontSize: 18, 
            padding: '16px 36px', 
            borderRadius: 30, 
            boxShadow: '0 0 30px rgba(255, 210, 8, 0.4)',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 0 40px rgba(255, 210, 8, 0.6)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 210, 8, 0.4)';
          }}
        >
          Launch Demo Now
        </button>
        */}
        <MagneticButton strength={40}>
          <button 
            className="btn btn-primary" 
            onClick={onDemo} 
            style={{ 
              fontSize: 18, 
              padding: '16px 36px', 
              borderRadius: 30, 
              boxShadow: '0 0 30px rgba(255, 210, 8, 0.4)',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = '0 0 40px rgba(255, 210, 8, 0.6)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 210, 8, 0.4)';
            }}
          >
            Launch Demo Now
          </button>
        </MagneticButton>
      </div>
      
      {/* Floating particles background */}
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: 10, height: 10, background: '#ffd208', borderRadius: '50%', opacity: 0.5, animation: 'float 6s infinite' }} />
      <div style={{ position: 'absolute', top: '60%', right: '15%', width: 14, height: 14, background: '#27c93f', borderRadius: '50%', opacity: 0.3, animation: 'float 8s infinite alternate' }} />
      <div style={{ position: 'absolute', bottom: '20%', left: '20%', width: 8, height: 8, background: '#ff5f56', borderRadius: '50%', opacity: 0.4, animation: 'float 5s infinite alternate-reverse' }} />
      
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(-30px) scale(1.2); opacity: 0.6; }
          100% { transform: translateY(0px) scale(1); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
