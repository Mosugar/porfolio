import React, { useRef, useEffect, useState, memo } from "react";
import { Code, Zap, Sparkles, Star, Cpu } from 'lucide-react';
import styles from "../styles/skills.module.css";
import Images from "../assets/images/index";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CyberpunkTitle from "./CyberpunkTitle"; // Import the new CyberpunkTitle component

// CyberpunkTitle Component


// Memoized Tilt component for better performance
const TiltComponent = memo(({ children, perspective = 110, scale = 1.06, className = "" }) => {
  const [tiltStyle, setTiltStyle] = useState({
    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`,
    transition: "transform 0.2s ease-out",
  });
  const [glareStyle, setGlareStyle] = useState({
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    pointerEvents: "none",
    opacity: 0,
    zIndex: 5,
  });
  const tiltRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!tiltRef.current) return;

    const rect = tiltRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Calculate tilt effect - max 10 degrees rotation
    const tiltX = (0.5 - y) * 10;
    const tiltY = (x - 0.5) * 10;

    // Update glare position
    const glareX = x * 100;
    const glareY = y * 100;

    setTiltStyle({
      transform: `perspective(${perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${scale})`,
      transition: "transform 0.2s ease-out",
    });

    setGlareStyle((prev) => ({
      ...prev,
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 80%)`,
      opacity: 0.6,
    }));
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`,
      transition: "transform 0.5s ease-out",
    });

    setGlareStyle((prev) => ({
      ...prev,
      opacity: 0,
    }));
  };

  return (
    <div
      className={`${styles.tiltContainer} ${className}`}
      ref={tiltRef}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div style={glareStyle} />
    </div>
  );
});

TiltComponent.displayName = "TiltComponent";

// Skill bubble component - memoized for performance
const SkillBubble = memo(({ skill, onMouseEnter }) => {
  const skillKey = Object.keys(skill)[0]; // Get the first key
  const { icon, name } = skill[skillKey];
  const isStyledComponents = name === "Styled-components";

  return (
    <TiltComponent>
      <div
        className={styles.skillBubble}
        onMouseEnter={onMouseEnter}
      >
        <div className={styles.bubbleContent}>
          <img
            className={isStyledComponents ? styles.styledComponentsIcon : ""}
            src={icon}
            alt={name}
            loading="lazy"
          />
          <span className={styles.skillTooltip}>{name}</span>
        </div>
      </div>
    </TiltComponent>
  );
});

SkillBubble.displayName = "SkillBubble";

// Main Skills component
const Skills = () => {
  const skillRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Set up Intersection Observer to trigger animations only when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (skillRef.current) {
      observer.observe(skillRef.current);
    }

    return () => {
      if (skillRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  // Set up GSAP animations when element is in view
  useEffect(() => {
    if (!isInView) return;

    gsap.registerPlugin(ScrollTrigger);
    const skillEl = skillRef.current;

    if (skillEl) {
      // Use timeline for better performance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: skillEl,
          start: "30% bottom",
          end: "bottom center",
        },
      });

      // Animate all bubbles at once with stagger, more efficient than fromTo
      tl.to(`.${styles.skillBubble}`, {
        y: 0,
        opacity: 1,
        stagger: {
          each: 0.05,
          from: "random",
        },
        duration: 0.5,
      });
    }
  }, [isInView]);

  const skillsList = [
    // { Html: { icon: Images.html, name: "HTML" } },
    { SCSS: { icon: Images.scss, name: "SCSS" } },
    { Js: { icon: Images.js, name: "JavaScript" } },
    { React: { icon: Images.react, name: "React.js" } },
    { Next: { icon: Images.next, name: "Next.js" } },
    {
      Styled_components: {
        icon: Images.styled_components,
        name: "Styled-components",
      },
    },
    { Tailwind: { icon: Images.tailwind, name: "Tailwind" } },
    { Bootstrap: { icon: Images.bootstrap, name: "Bootstrap" } },
    { GSAP: { icon: Images.gsap, name: "GSAP" } },
    { Vite: { icon: Images.vite, name: "Vite" } },
    { Figma: { icon: Images.figma, name: "Figma" } },
    { php: { icon: Images.php, name: "PHP" } },
    { laravel: { icon: Images.laravel, name: "Laravel" } },
    { mysql: { icon: Images.mysql, name: "MySQL" } },
    { api: { icon: Images.api, name: "Rest API" } },
    { A11Y: { icon: Images.a11y, name: "A11Y" } },
    { Optimization: { icon: Images.optimization, name: "PageSpeed" } },
    { git: { icon: Images.git, name: "git" } },
    { postman: { icon: Images.postman, name: "Postman" } },
    { docker: { icon: Images.docker, name: "Docker" } },
    { Wordpress: { icon: Images.wordpress, name: "WordPress" } },
    { Framer: { icon: Images.framer, name: "Framer" } },
    { Django: { icon: Images.django, name: "Django" } },
    {Python: { icon: Images.python, name: "Python" } },
    { Ubuntu: { icon: Images.ubuntu, name: "Ubuntu" } },
    { VirtualBox: { icon: Images.virtualbox, name: "VirtualBox" } },
    { VagrantUp: { icon: Images.vagrantup, name: "VagrantUp" } },
  ];

  return (
    <section className={styles.skillsSection}>
      {/* Using CyberpunkTitle instead of the old heading */}
      <div className="px-18" id="Skills">
        <CyberpunkTitle 
        title="MY SKILLS"
        gradient="from-orange-400 via-red-400 to-orange-500"
        glowColor="text-orange-500"
        glitchColor="text-red-500"
        leftIcon={Sparkles}
        rightIcon={Zap}
        leftIconColor="text-orange-400"
        rightIconColor="text-red-400"
        />
      </div>

      <div className={styles.skillsContent} ref={skillRef}>
        <div className={styles.bubblesContainer}>
          {skillsList.map((skill, index) => (
            <SkillBubble
              key={index}
              skill={skill}
            />
          ))}
        </div>
      </div>

      <div className={styles.skillsBlob}>
        <div className={styles.skillsBlob1}></div>
        <div className={styles.skillsBlob2}></div>
      </div>
    </section>
  );
};

export default Skills;