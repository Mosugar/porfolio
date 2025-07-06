import { useState, useRef, useEffect, memo, useCallback } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cardDetails } from "../data/Projects";
// import { Button } from "../Buttons";
import { Link } from "react-router-dom";
import CyberpunkTitle from './CyberpunkTitle';


// Helper function to determine if a color is light or dark
const isLightColor = (hex) => {
  // Remove # if present
  const color = hex.replace('#', '');
  
  // Handle named colors
  const namedColors = {
    'white': '#ffffff',
    'black': '#000000',
    'red': '#ff0000',
    'green': '#008000',
    'blue': '#0000ff',
    'yellow': '#ffff00',
    'cyan': '#00ffff',
    'magenta': '#ff00ff',
    'gray': '#808080',
    'grey': '#808080'
  };
  
  const actualColor = namedColors[color.toLowerCase()] || `#${color}`;
  const cleanColor = actualColor.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(cleanColor.substring(0, 2), 16);
  const g = parseInt(cleanColor.substring(2, 4), 16);
  const b = parseInt(cleanColor.substring(4, 6), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5;
};

// Memoize individual project card to prevent unnecessary re-renders
const ProjectCard = memo(({ card, index, activeItem, handleMouseEnter }) => {
  const isActive = activeItem === index;
  const isSmallScreen = window.innerWidth <= 1150;
  
  // Determine background color
  const backgroundColor = (isActive || isSmallScreen) ? card.hex : '#1d1f22';
  const isLight = isLightColor(backgroundColor);
  
  // Determine text colors based on background
  const textColor = isLight ? 'var(--bg-navy)' : 'var(--color-white)';
  const buttonBgColor = isLight ? 'var(--bg-navy)' : 'var(--color-white)';
  const buttonIconColor = backgroundColor;

  return (
    <div
      className={`Project__card item_${index + 1}
        ${index === 0 ? "selected" : ""}
        ${activeItem === index ? "active" : ""}`}
      key={index}
      onClick={() => handleMouseEnter(index)}
      style={{
        backgroundColor: backgroundColor,
        '--text-color': textColor,
        '--button-bg-color': buttonBgColor,
        '--button-icon-color': buttonIconColor
      }}
    >
      <div className="card_content">
        <div className="Project__card__top">
          <div className="Project_Card__name">
            <h3 style={{ color: textColor }}>{card.name}</h3>
          </div>
          <div
            className={`Project_Card__external ${
              index >= 7 ? "d-none" : ""
            }`}
          >
            <a href={card.url} target={card.target}>
              <span style={{ color: textColor }}>Visit</span>
              <span style={{ backgroundColor: buttonBgColor }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1.87 1.87"
                  width={12}
                  height={12}
                  style={{ fill: buttonIconColor }}
                >
                  <polygon points="1.64 0 0.47 0 0.47 0.23 1.48 0.24 0 1.7 0.16 1.87 1.64 0.4 1.64 1.41 1.87 1.41 1.87 0.24 1.87 0.01 1.64 0" />
                </svg>
              </span>
            </a>
          </div>
        </div>
        <div className="Project__Pic">
          {/* Use native lazy loading for images */}
          <img src={card.img} alt={`${card.name} project`} loading="lazy" />
        </div>
      </div>
      <div className="Project_Outter__name">
        <span>0{card.id}</span>
        <h1>{card.name}</h1>
      </div>
    </div>
  );
});

// Optimize performance by memoizing the entire project list
const ProjectList = memo(({ activeItem, handleMouseEnter }) => {
  return (
    <StyledProjects>
      {cardDetails.map((card, index) => (
        <ProjectCard
          key={card.id}
          card={card}
          index={index}
          activeItem={activeItem}
          handleMouseEnter={handleMouseEnter}
        />
      ))}
    </StyledProjects>
  );
});

const Works = () => {
  const [activeItem, setActiveItem] = useState(0);
  const scrollAnim = useRef(null);
  const Header = useRef(null);


  // Memoize the handler to prevent unnecessary recreations
  const handleMouseEnter = useCallback((index) => {
    setActiveItem(index);
  }, []);

  useEffect(() => {
    // Register plugin once
    gsap.registerPlugin(ScrollTrigger);
    
    // Get DOM elements
    const headerEl = Header.current;
    
    // Create animation
    const headerAnimation = gsap.to(headerEl, {
      y: 0,
      x: 0,
      duration: 0.5,
      opacity: 1,
      paused: true,
      scrollTrigger: {
        trigger: headerEl,
        start: "top 96%",
        end: "bottom 95%",
        toggleActions: "restart none none reverse",
        ease: "power4.inOut",
      },
    });
    
    // Cleanup animation on unmount
    return () => {
      if (headerAnimation.scrollTrigger) {
        headerAnimation.scrollTrigger.kill();
      }
      headerAnimation.kill();
    };
  }, []);

  return (
    <StyledWorksSection id="Works" ref={scrollAnim}>
      <>
      <CyberpunkTitle 
          title="WORKS"
          gradient="from-orange-400 via-red-400 to-orange-500"
          glowColor="text-orange-500"
          glitchColor="text-red-500"
          // leftIcon={Sparkles}
          // rightIcon={Zap}
          leftIconColor="text-orange-400"
          rightIconColor="text-red-400"
        />
        <StyledWorkContent id="Works__content">
          <ProjectList 
            activeItem={activeItem} 
            handleMouseEnter={handleMouseEnter} 
          />
          {/* <div className="more__projs">
            <Link to="/projects">
              <Button
                $beforeContent="Explore more projects"
                $afterContent="Explore more projects"
              >
                Explore more projects
              </Button>
            </Link>
          </div> */}
        </StyledWorkContent>
      </>
    </StyledWorksSection>
  );
};

export default memo(Works);

// Updated styled components - removed hardcoded background colors
const StyledWorksSection = styled.section`
  background-color: var(--bg-navy);
  width: 100%;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  background: linear-gradient(
    to bottom,
    var(--bg-navy),
    var(--bg-navy),
    var(--bg-navy),
    var(--bg-navy),
    var(--bg-navy),
    transparent
  );
  margin: 0 auto;
  padding-bottom: 150px;
  position: relative;
  overflow: hidden;
  .Section__heading_jfrk54 {
    padding: 40px 0 0 40px;

    @media (max-width: 700px) {
      padding: 25px 0 0 25px;
    }
  }
  .Works_Blob__Jr91 {
    position: absolute;
    right: -30%;
    top: 100%;
    width: 40%;
    height: 40%;
    background: conic-gradient(#000, #0528a2);
    filter: blur(120px);
  }

  .Works_Blob__Jr9i2 {
    position: absolute;
    left: 0;
    top: -20%;
    width: 20%;
    height: 40%;
    background: conic-gradient(from 2.35rad, #c76000, rgba(7, 29, 228, 0.5));
    filter: blur(60px);
    z-index: 1;
    opacity: 0.4;
  }

  .Works_Blob__J5vi3 {
    position: absolute;
    left: 80%;
    top: 10%;
    transform: translateX(-50%);
    width: 50%;
    height: 40%;
    background: conic-gradient(#3d3d3d, rgba(6, 12, 68, 0.29));
    filter: blur(140px);
    opacity: 0.5;
  }
`;


const StyledWorkContent = styled.div`
  width: 100%;
  padding: 0px 30px 0;
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  border-radius: 20px;
  overflow: hidden;
  @media (max-width: 700px) {
    padding: 80px 0 0 0;
  }
  @media (max-width: 900px) {
    padding: 0 4%;
    padding-top: 80px;
  }
  .more__projs {
    grid-column: span 10 / span 10;
    width: 100%;
    padding-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const StyledProjects = styled.div`
  width: 100%;
  grid-column: span 10 / span 10;
  display: flex;
  flex-direction: row;
  overflow-y: hidden;
  border-radius: 30px;
  @media (max-width: 1150px) {
    flex-direction: column;
    gap: 25px;
    border-radius: 15px;
  }
  .Project__card {
    background-color: #1d1f22;
    height: 80svh;
    border-right: 3px solid #151515;
    position: relative;
    cursor: pointer;
    padding: 30px;
    transition: all 0.3s ease;
    
    @media (max-width: 1150px) {
      border-radius: 15px;
      width: 100%;
      border: none;
    }
    @media (max-width: 700px) {
      height: 62svh;
      padding: 20px;
    }
    @media (max-height: 700px) {
      height: 88svh;
    }
    @media (max-height: 500px) {
      height: 85svh;
    }
    
    .card_content {
      display: none;
      @media (max-width: 1150px) {
        display: block;
      }
    }
    
    .Project_Card__name {
      h3 {
        font-size: var(--fz-xxl);
        font-weight: var(--medium);
        transition: color 0.3s ease;
      }
    }
    
    .Project__card__top {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 1;
      
      .d-none {
        pointer-events: none;
        opacity: 0.6;
      }
      
      .Project_Card__external a {
        line-height: 1px;
        display: flex;
        align-items: center;
        text-decoration: none;
        
        &:hover {
          span {
            &:last-child {
              transition: all 0.2s ease;
              transform: translate(4px, -4px);
            }
          }
        }
        
        span {
          font-size: var(--fz-md);
          font-weight: 600;
          transition: color 0.3s ease;
          
          &:last-child {
            margin-left: 10px;
            padding: 10px;
            border-radius: 50px;
            transition: all 0.3s ease;
          }
        }
      }
    }
    
    &:last-child {
      border: none;
    }
    
    .Project__Pic {
      width: calc(100% - 60px);
      height: calc(100% - 90px);
      position: absolute;
      bottom: 0;
      left: 50%;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      transform: translateX(-50%);
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 50% 0;
      }
      
      @media (max-width: 700px) {
        width: calc(100% - 40px);
        height: calc(100% - 70px);
      }
    }
    
    .Project_Outter__name {
      height: 100%;
      color: transparent;
      -webkit-text-stroke-width: 1px;
      -webkit-text-stroke-color: #777676;
      transform: rotate(180deg);
      writing-mode: vertical-lr;
      font-size: 2rem;
      line-height: 65px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 13px;
      padding-top: 20px;
      transition: all 0.3s ease-in;
      
      @media (max-width: 1150px) {
        display: none;
      }
      
      h1 {
        font-family: "Roboto";
        font-weight: var(--w-black);
        letter-spacing: 4px;
      }
      
      span {
        transform: rotate(90deg);
        font-weight: var(--w-black);
        -webkit-text-stroke-color: #fff;
        font-family: "Roboto";
      }
    }
    
    &:hover {
      .Project_Outter__name {
        -webkit-text-stroke-color: transparent;
        color: var(--color-white);
      }
    }
  }

  @media (min-width: 1150px) {
    .active {
      width: 100%;
      transition: width 0.3s ease;
      
      .card_content {
        display: block;
      }
      
      .Project_Outter__name {
        display: none;
      }
    }
  }
`;