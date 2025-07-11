import React, { useState, useEffect, useRef } from 'react';

// Creative Text Animation Component
const AnimatedText = ({ text, className = "" }) => {
  const [visibleChars, setVisibleChars] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const chars = text.length;
    let currentChar = 0;

    const typeInterval = setInterval(() => {
      if (currentChar <= chars) {
        setVisibleChars(currentChar);
        currentChar++;
      } else {
        clearInterval(typeInterval);
        // Add glitch effect after typing
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 500);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [text]);

  const displayText = text.slice(0, visibleChars);
  const remainingText = text.slice(visibleChars);

  return (
    <div className={`${className} ${glitchActive ? 'glitch-active' : ''}`}>
      <h1 className="animated-title">
        <span className="visible-text">{displayText}</span>
        <span className="hidden-text">{remainingText}</span>
        <span className="cursor">|</span>
      </h1>
    </div>
  );
};

const CyberpunkLoader = ({ onComplete }) => {
  const [percentage, setPercentage] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);
  const [showText, setShowText] = useState(false);

  // Main loading sequence
  useEffect(() => {
    // Start text animation after brief delay
    setTimeout(() => {
      setShowText(true);
    }, 800);

    const loadingSteps = [
      { delay: 1200, percentage: 15 },
      { delay: 2000, percentage: 35 },
      { delay: 2800, percentage: 55 },
      { delay: 3600, percentage: 75 },
      { delay: 4400, percentage: 90 },
      { delay: 5200, percentage: 100 }
    ];

    const timeouts = loadingSteps.map(step => 
      setTimeout(() => {
        setPercentage(step.percentage);
        
        if (step.percentage === 100) {
          setIsCompleting(true);
          setTimeout(() => {
            onComplete && onComplete();
          }, 1500);
        }
      }, step.delay)
    );

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [onComplete]);

  const circumference = 2 * Math.PI * 80;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`loader-container ${isCompleting ? 'completing' : ''}`}>
      {/* Animated Background */}
      <div className="background-animation">
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        <div className="bg-orb bg-orb-3"></div>
      </div>

      {/* Matrix Rain Background */}
      <div className="matrix-bg">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="matrix-line" style={{ '--delay': `${i * 1.2}s`, '--duration': `${5 + Math.random() * 3}s` }}>
            {[...Array(20)].map((_, j) => (
              <span key={j} className="matrix-char">
                {String.fromCharCode(0x30A0 + Math.random() * 96)}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Floating Particles */}
      <div className="particles">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="particle" style={{ '--delay': `${i * 0.6}s` }}></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="content">
        {/* Animated Text */}
        <div className="text-section">
          {showText && (
            <AnimatedText 
              text="Creative Full Stack Developer"
              className="main-title-container"
            />
          )}
        </div>

        {/* Clean Circular Progress */}
        <div className="progress-section">
          <div className="progress-circle-container">
            <svg className="progress-svg" width="200" height="200" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff6600" />
                  <stop offset="50%" stopColor="#ff4500" />
                  <stop offset="100%" stopColor="#ff6600" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Background Circle */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="rgba(255, 102, 0, 0.1)"
                strokeWidth="3"
              />
              
              {/* Progress Circle */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                transform="rotate(-90 100 100)"
                className="progress-circle"
                filter="url(#glow)"
              />
            </svg>
            
            {/* Center Content */}
            <div className="progress-center">
              <div className="percentage-display">{Math.floor(percentage)}%</div>
              <div className="loading-indicator">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .loader-container {
          position: fixed;
          inset: 0;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          z-index: 9999;
          opacity: 1;
          visibility: visible;
          transition: opacity 1.2s ease-out, visibility 1.2s ease-out, transform 1s ease-out;
        }

        .completing {
          opacity: 0;
          visibility: hidden;
          transform: scale(0.98);
        }

        .background-animation {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          animation: float 15s ease-in-out infinite;
        }

        .bg-orb-1 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(255, 102, 0, 0.3) 0%, transparent 70%);
          top: 20%;
          right: 20%;
          animation-delay: 0s;
        }

        .bg-orb-2 {
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, rgba(255, 69, 0, 0.25) 0%, transparent 70%);
          bottom: 20%;
          left: 15%;
          animation-delay: 5s;
        }

        .bg-orb-3 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255, 140, 0, 0.2) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 10s;
        }

        .matrix-bg {
          position: absolute;
          inset: 0;
          opacity: 0.06;
          overflow: hidden;
          pointer-events: none;
        }

        .matrix-line {
          position: absolute;
          top: -100%;
          width: 20px;
          height: 120vh;
          color: #ff6600;
          font-family: 'Courier New', monospace;
          font-size: 10px;
          line-height: 1.5;
          animation: matrixRain var(--duration, 6s) linear infinite;
          animation-delay: var(--delay, 0s);
        }

        .matrix-line:nth-child(1) { left: 8%; }
        .matrix-line:nth-child(2) { left: 16%; }
        .matrix-line:nth-child(3) { left: 24%; }
        .matrix-line:nth-child(4) { left: 32%; }
        .matrix-line:nth-child(5) { left: 40%; }
        .matrix-line:nth-child(6) { left: 48%; }
        .matrix-line:nth-child(7) { left: 56%; }
        .matrix-line:nth-child(8) { left: 64%; }
        .matrix-line:nth-child(9) { left: 72%; }
        .matrix-line:nth-child(10) { left: 80%; }
        .matrix-line:nth-child(11) { left: 88%; }
        .matrix-line:nth-child(12) { left: 96%; }

        .matrix-char {
          display: block;
          opacity: 0;
          animation: matrixChar 0.3s ease-in-out forwards;
          animation-delay: calc(var(--char-delay, 0) * 0.1s);
        }

        .particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: linear-gradient(45deg, #ff6600, #ff4500);
          border-radius: 50%;
          opacity: 0.8;
          animation: particleFloat 10s ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }

        .particle:nth-child(1) { top: 20%; left: 10%; }
        .particle:nth-child(2) { top: 80%; left: 90%; }
        .particle:nth-child(3) { top: 30%; left: 80%; }
        .particle:nth-child(4) { top: 70%; left: 20%; }
        .particle:nth-child(5) { top: 50%; left: 15%; }
        .particle:nth-child(6) { top: 25%; left: 60%; }
        .particle:nth-child(7) { top: 75%; left: 70%; }
        .particle:nth-child(8) { top: 40%; left: 40%; }
        .particle:nth-child(9) { top: 60%; left: 85%; }
        .particle:nth-child(10) { top: 15%; left: 35%; }

        .content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4rem;
          max-width: 90vw;
          text-align: center;
        }

        .text-section {
          position: relative;
        }

        .main-title-container {
          position: relative;
        }

        .animated-title {
          font-size: 3.5rem;
          font-weight: 900;
          color: #ff6600;
          margin: 0;
          padding: 0;
          line-height: 1.2;
          letter-spacing: -0.01em;
          text-shadow: 0 0 30px rgba(255, 102, 0, 0.5);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        .visible-text {
          color: #ff6600;
        }

        .hidden-text {
          color: transparent;
        }

        .cursor {
          color: #ff6600;
          animation: blink 1s ease-in-out infinite;
          margin-left: 2px;
        }

        .glitch-active .animated-title {
          animation: textGlitch 0.5s ease-in-out;
        }

        .progress-section {
          position: relative;
        }

        .progress-circle-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .progress-svg {
          transform: scale(1);
          filter: drop-shadow(0 0 20px rgba(255, 102, 0, 0.3));
        }

        .progress-circle {
          transition: stroke-dashoffset 0.8s ease-out;
        }

        .progress-center {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.8rem;
        }

        .percentage-display {
          font-size: 2.2rem;
          font-weight: 900;
          color: #ff6600;
          text-shadow: 0 0 20px rgba(255, 102, 0, 0.8);
          font-family: 'Courier New', monospace;
          letter-spacing: 1px;
        }

        .loading-indicator {
          display: flex;
          gap: 0.4rem;
          align-items: center;
        }

        .dot {
          width: 8px;
          height: 8px;
          background: #ff6600;
          border-radius: 50%;
          animation: dotPulse 1.4s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(255, 102, 0, 0.6);
        }

        .dot:nth-child(1) { animation-delay: 0s; }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }

        /* Animations */
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          33% { transform: translate(30px, -30px) rotate(120deg) scale(1.05); }
          66% { transform: translate(-25px, 25px) rotate(240deg) scale(0.95); }
        }

        @keyframes matrixRain {
          0% { transform: translateY(-120vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(120vh); opacity: 0; }
        }

        @keyframes matrixChar {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes particleFloat {
          0%, 100% { 
            transform: translate(0, 0) rotate(0deg) scale(1); 
            opacity: 0.8; 
          }
          25% { 
            transform: translate(20px, -20px) rotate(90deg) scale(1.2); 
            opacity: 1; 
          }
          50% { 
            transform: translate(10px, -10px) rotate(180deg) scale(0.8); 
            opacity: 0.6; 
          }
          75% { 
            transform: translate(15px, -15px) rotate(270deg) scale(1.1); 
            opacity: 0.9; 
          }
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @keyframes textGlitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-1px, 1px); }
          40% { transform: translate(-1px, -1px); }
          60% { transform: translate(1px, 1px); }
          80% { transform: translate(1px, -1px); }
        }

        @keyframes dotPulse {
          0%, 80%, 100% { 
            opacity: 0.4; 
            transform: scale(1); 
          }
          40% { 
            opacity: 1; 
            transform: scale(1.3); 
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .content {
            gap: 3rem;
            padding: 2rem 1rem;
          }

          .animated-title {
            font-size: 2.5rem;
            line-height: 1.3;
          }

          .progress-svg {
            width: 160px;
            height: 160px;
          }

          .percentage-display {
            font-size: 1.8rem;
          }

          .matrix-line {
            font-size: 8px;
          }

          .particle {
            width: 1.5px;
            height: 1.5px;
          }
        }

        @media (max-width: 480px) {
          .animated-title {
            font-size: 2rem;
            letter-spacing: 0;
          }

          .progress-svg {
            width: 140px;
            height: 140px;
          }

          .percentage-display {
            font-size: 1.6rem;
          }

          .content {
            gap: 2.5rem;
          }

          .dot {
            width: 6px;
            height: 6px;
          }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .loader-container {
            background: #000000;
          }

          .animated-title, .percentage-display {
            color: #ffffff;
            text-shadow: none;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .bg-orb, .particle, .matrix-line, .dot, .cursor {
            animation: none;
          }

          .glitch-active .animated-title {
            animation: none;
          }

          .cursor {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default CyberpunkLoader;