import React, { useRef, useEffect, useState } from 'react';

const GlobalBackground = ({ children }) => {
  const particlesRef = useRef([]);
  const hologramRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
      
      // Parallax effect for hologram
      if (hologramRef.current) {
        const moveX = (x - 50) * 0.1;
        const moveY = (y - 50) * 0.1;
        hologramRef.current.style.transform = `translate(${moveX}px, ${moveY}px) rotateX(${moveY * 0.5}deg) rotateY(${moveX * 0.5}deg)`;
      }
    };

    const animateParticles = () => {
      particlesRef.current.forEach((particle, index) => {
        if (particle) {
          const speed = 0.5 + Math.random() * 0.5;
          const currentTransform = particle.style.transform || 'translateY(0px)';
          const currentY = parseFloat(currentTransform.match(/translateY\((-?\d+\.?\d*)px\)/) || [0, 0])[1];
          const newY = currentY - speed;
          
          if (newY < -100) {
            particle.style.transform = `translateY(${window.innerHeight + 100}px) translateX(${Math.random() * 100 - 50}px)`;
          } else {
            particle.style.transform = `translateY(${newY}px) translateX(${Math.sin(Date.now() * 0.001 + index) * 20}px)`;
          }
        }
      });
      requestAnimationFrame(animateParticles);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animateParticles();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const createParticles = () => {
    return Array.from({ length: 50 }, (_, i) => (
      <div
        key={i}
        ref={el => particlesRef.current[i] = el}
        className="absolute w-1 h-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-60 pointer-events-none"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${3 + Math.random() * 4}s`
        }}
      />
    ));
  };

  return (
    <div className="relative min-h-screen">
      {/* Base Background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%)'
        }}
      />

      {/* Quantum Field Background */}
      <div className="fixed inset-0 z-0 opacity-30">
        <div 
          className="absolute inset-0" 
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(255, 102, 0, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(255, 69, 0, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 60% 40%, rgba(255, 140, 0, 0.1) 0%, transparent 50%)
            `
          }} 
        />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {createParticles()}
      </div>

      {/* Neural Network Grid */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 102, 0, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 102, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            animation: 'gridMove 20s linear infinite'
          }} 
        />
      </div>

      {/* Holographic Overlay */}
      <div 
        ref={hologramRef}
        className="fixed inset-0 z-0 pointer-events-none opacity-10"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 102, 0, 0.3) 2px, rgba(255, 102, 0, 0.3) 4px)',
          mixBlendMode: 'screen'
        }}
      />

      {/* Dynamic Gradient Orb (Cursor Effect) */}
      <div 
        className="fixed inset-0 z-0 transition-all duration-1000 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 102, 0, 0.4) 0%, rgba(255, 69, 0, 0.2) 25%, rgba(255, 140, 0, 0.1) 50%, transparent 70%)`,
          filter: 'blur(60px)'
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Advanced CSS Animations */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(100px, 100px); }
        }
      `}</style>
    </div>
  );
};

export default GlobalBackground;