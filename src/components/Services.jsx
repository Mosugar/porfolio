import React, { useRef, useEffect, useState } from 'react';
import { Code, Palette, Zap, Globe, Database, Smartphone, Server, Brush, ArrowRight, Sparkles } from 'lucide-react';
import CyberpunkTitle from './CyberpunkTitle';

const Services = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Crafting immersive digital experiences with cutting-edge technologies and pixel-perfect precision.",
      gradient: "from-orange-500 via-red-500 to-orange-600",
      glowColor: "rgba(255, 102, 0, 0.8)",
      particles: "🔥"
    },
    {
      icon: Brush,
      title: "Creative Design", 
      description: "Transforming visions into breathtaking interfaces that captivate and convert with artistic mastery.",
      gradient: "from-red-500 via-pink-500 to-red-600",
      glowColor: "rgba(255, 69, 0, 0.8)",
      particles: "✨"
    },
    {
      icon: Database,
      title: "Backend Architecture",
      description: "Building fortress-like systems with bulletproof security and lightning-fast performance at scale.",
      gradient: "from-orange-600 via-amber-500 to-orange-700",
      glowColor: "rgba(255, 140, 0, 0.8)",
      particles: "⚡"
    },
    {
      icon: Server,
      title: "Cloud Infrastructure",
      description: "Orchestrating cloud symphonies with DevOps mastery and infrastructure that never sleeps.",
      gradient: "from-red-600 via-rose-500 to-red-700",
      glowColor: "rgba(220, 38, 127, 0.8)",
      particles: "🚀"
    },
    {
      icon: Smartphone,
      title: "Mobile Innovation",
      description: "Pioneering next-generation mobile experiences that push the boundaries of what's possible.",
      gradient: "from-orange-400 via-yellow-400 to-orange-500",
      glowColor: "rgba(255, 165, 0, 0.8)",
      particles: "📱"
    },
    {
      icon: Globe,
      title: "Digital Strategy",
      description: "Orchestrating digital dominance with data-driven strategies that skyrocket your online presence.",
      gradient: "from-red-400 via-pink-400 to-red-500",
      glowColor: "rgba(255, 99, 71, 0.8)",
      particles: "🌟"
    }
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }, 5000);

    return () => {
      clearInterval(slideInterval);
    };
  }, []);

  const getCardTransform = (index) => {
    const offset = index - currentSlide;
    const translateX = offset * 350;
    const scale = Math.abs(offset) === 0 ? 1.05 : 0.85;
    const rotateY = offset * 8;
    const translateZ = Math.abs(offset) === 0 ? 50 : -20;
    const opacity = Math.abs(offset) > 2 ? 0 : Math.abs(offset) === 0 ? 1 : 0.4;
    
    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity: opacity,
      zIndex: Math.abs(offset) === 0 ? 20 : 10 - Math.abs(offset)
    };
  };

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden py-20 px-4"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Using the reusable CyberpunkTitle component */}
        <CyberpunkTitle 
          title="SERVICES"
          gradient="from-orange-400 via-red-400 to-orange-500"
          glowColor="text-orange-500"
          glitchColor="text-red-500"
          leftIcon={Sparkles}
          rightIcon={Zap}
          leftIconColor="text-orange-400"
          rightIconColor="text-red-400"
        />

        {/* Immersive Carousel */}
        <div className="relative">
          <div className="relative h-[500px] overflow-hidden" style={{ perspective: '2000px' }}>
            {/* Left Navigation */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + services.length) % services.length)}
              className="absolute left-8 top-1/2 -translate-y-1/2 z-30 group"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 shadow-2xl">
                <ArrowRight size={24} className="text-white rotate-180 group-hover:scale-125 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
              </div>
            </button>

            {/* Right Navigation */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % services.length)}
              className="absolute right-8 top-1/2 -translate-y-1/2 z-30 group"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 shadow-2xl">
                <ArrowRight size={24} className="text-white group-hover:scale-125 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
              </div>
            </button>

            {/* Cards */}
            <div className="absolute inset-0 flex items-center justify-center">
              {services.map((service, index) => (
                <div
                  key={index}
                  ref={el => cardsRef.current[index] = el}
                  className="absolute w-80 h-96 transition-all duration-1000 ease-out"
                  style={getCardTransform(index)}
                >
                  <div className="h-full bg-gradient-to-br from-white/5 to-white/1 backdrop-blur-xl border border-white/20 rounded-3xl p-8 flex flex-col justify-between group hover:border-orange-500/50 transition-all duration-500 hover:shadow-2xl relative overflow-hidden">
                    
                    {/* Holographic Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                    
                    {/* Animated Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl`} />
                    
                    {/* Particle Effect */}
                    <div className="absolute top-4 right-4 text-2xl animate-bounce group-hover:animate-spin">
                      {service.particles}
                    </div>

                    {/* Icon */}
                    <div className="relative z-10 mb-8">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} p-4 group-hover:scale-125 transition-transform duration-500 shadow-2xl relative`}>
                        <service.icon className="w-full h-full text-white drop-shadow-lg" strokeWidth={1.5} />
                        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex-1">
                      <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-red-400 transition-all duration-500">
                        {service.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-500">
                        {service.description}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <div className="relative z-10 mt-8">
                      <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-8 rounded-2xl font-bold text-sm hover:from-orange-600 hover:to-red-600 transition-all duration-500 transform hover:scale-105 shadow-2xl group/btn relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 rounded-2xl" />
                        <span className="flex items-center justify-center gap-3 relative z-10">
                          Explore More
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-500" />
                        </span>
                      </button>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-orange-400 to-red-400 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl" />
                    <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-br from-red-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Futuristic Pagination */}
          <div className="flex justify-center gap-4 mt-16">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`relative w-12 h-2 rounded-full transition-all duration-500 ${
                  index === currentSlide 
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 shadow-2xl' 
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              >
                {index === currentSlide && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-sm opacity-80" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;