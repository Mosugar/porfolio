import React, { useState } from 'react';
import { Sparkles, Zap } from 'lucide-react';

const CyberpunkTitle = ({ 
  title, 
  gradient = "from-orange-400 via-red-400 to-orange-500",
  glowColor = "text-orange-500",
  glitchColor = "text-red-500",
  leftIcon = Sparkles,
  rightIcon = Zap,
  leftIconColor = "text-orange-400",
  rightIconColor = "text-red-400",
  className = "",
  textSize = "text-7xl md:text-9xl"
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const LeftIcon = leftIcon;
  const RightIcon = rightIcon;

  return (
    <div 
      className={`text-center mb-20 relative ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative">
        <h2 className={`${textSize} font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r ${gradient} tracking-tight relative`}>
          {title}
          <div className={`absolute inset-0 ${textSize} font-black ${glowColor} opacity-20 blur-sm`}>
            {title}
          </div>
        </h2>
        
        {/* Glitch Effect */}
        <div className={`absolute inset-0 ${textSize} font-black ${glitchColor} opacity-30 ${isHovering ? 'animate-pulse' : ''}`}>
          <span style={{ transform: 'translate(-2px, -2px)' }}>{title}</span>
        </div>
        
        {/* Holographic Scan Line */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-80" 
               style={{ animation: 'scanLine 3s linear infinite' }} />
        </div>
      </div>

      {/* Floating Icons */}
      <div className={`absolute -top-8 -right-8 ${leftIconColor} animate-bounce`}>
        <LeftIcon size={32} className="animate-spin" />
      </div>
      <div className={`absolute -bottom-8 -left-8 ${rightIconColor} animate-bounce`} style={{ animationDelay: '1s' }}>
        <RightIcon size={28} className="animate-pulse" />
      </div>

      {/* Advanced CSS Animations */}
      <style jsx>{`
        @keyframes scanLine {
          0% { transform: translateY(0); }
          100% { transform: translateY(200px); }
        }
        
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        
        .animate-glitch {
          animation: glitch 0.3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CyberpunkTitle;