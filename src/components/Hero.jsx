import React from 'react';
// import GridDistortion from '../utils/GridDistortion';
import { Menu } from 'lucide-react';
import styles from '../styles/hero.module.css';

// SVG Logo Component (without ® symbol)
const MoSugarLogo = ({ className }) => (
  <svg 
    className={className}
    viewBox="0 0 129.79 27.71" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="currentColor">
      <path d="M26.16,1.81v18.28h-3.41v-10.06l-4.66,10.06h-1.79l-4.65-10.11v10.12h-3.41V1.81h3.07l5.9,12.54L23.09,1.81h3.07Z"/>
      <path d="M32.05,19.58c-1-.57-1.77-1.38-2.33-2.42-.56-1.04-.83-2.24-.83-3.59s.28-2.53.85-3.58c.56-1.05,1.34-1.86,2.33-2.44.99-.58,2.12-.87,3.38-.87s2.4.29,3.39.86,1.78,1.38,2.34,2.43.85,2.25.85,3.6-.28,2.52-.85,3.56-1.34,1.85-2.34,2.43-2.13.87-3.39.87-2.4-.29-3.39-.86h-.01ZM37.64,16.31c.55-.68.82-1.59.82-2.73s-.27-2.06-.82-2.74-1.28-1.03-2.2-1.03-1.63.34-2.17,1.03-.82,1.6-.82,2.74.27,2.05.81,2.73c.54.68,1.26,1.01,2.18,1.01s1.65-.34,2.2-1.01Z"/>
      <path d="M54.83,19.73c-1.15-.48-2.07-1.17-2.74-2.07-.68-.9-1.05-1.97-1.12-3.2h3.72c.1.88.52,1.59,1.24,2.12s1.66.79,2.82.79c1.09,0,1.96-.22,2.6-.66s.96-1.05.96-1.83c0-1.13-.8-1.87-2.39-2.24l-3.75-.81c-1.54-.35-2.73-.92-3.56-1.72s-1.25-1.83-1.25-3.1c0-1.09.29-2.05.86-2.89.57-.83,1.39-1.48,2.46-1.95s2.31-.7,3.73-.7c2.12,0,3.84.51,5.18,1.52,1.34,1.01,2.07,2.43,2.21,4.25h-3.69c-.17-1.8-1.39-2.71-3.64-2.71-1.04,0-1.86.19-2.47.57s-.91.92-.91,1.61c0,.55.2.99.6,1.3.4.31,1.02.56,1.87.75l3.62.81c3.31.71,4.97,2.36,4.97,4.94,0,1.21-.3,2.27-.91,3.16s-1.47,1.57-2.58,2.04c-1.11.47-2.4.7-3.88.7s-2.79-.24-3.94-.71v.03Z"/>
      <path d="M80.7,7.02v13.08h-2.73l-.36-1.85c-.94,1.46-2.39,2.18-4.37,2.18-1.51,0-2.64-.46-3.41-1.37-.76-.91-1.14-2.35-1.14-4.33v-7.72h3.46v7.72c0,.83.19,1.45.56,1.86s.89.61,1.55.61c.83,0,1.53-.31,2.11-.94s.86-1.51.86-2.65v-6.61h3.48v.02Z"/>
      <path d="M96.26,7.02v12.02c0,2.41-.58,4.21-1.74,5.41-1.16,1.2-2.75,1.79-4.76,1.79-1.77,0-3.21-.42-4.32-1.25s-1.73-2.09-1.87-3.77h3.22c.14.64.46,1.14.96,1.51s1.12.55,1.85.55c.99,0,1.77-.34,2.34-1.01.57-.68.86-1.6.86-2.76v-.52c-.94.97-2.14,1.46-3.62,1.46-1.21,0-2.29-.29-3.21-.86s-1.65-1.38-2.16-2.42c-.51-1.04-.77-2.25-.77-3.62s.27-2.6.82-3.64,1.27-1.83,2.18-2.38,1.89-.82,2.95-.82c.83,0,1.61.17,2.33.52.72.35,1.32.82,1.81,1.43l.26-1.64h2.87ZM92.8,12.19c-.19-.75-.54-1.33-1.05-1.76-.51-.42-1.15-.64-1.91-.64-.99,0-1.77.34-2.35,1.03s-.87,1.6-.87,2.74.29,2.05.87,2.73,1.37,1.01,2.38,1.01c.76,0,1.41-.2,1.94-.59s.86-.94,1-1.65v-2.89.02Z"/>
      <path d="M108.87,8.04c.99.91,1.48,2.29,1.48,4.15v7.91h-2.73l-.34-1.74c-.38.55-.95,1.04-1.69,1.46s-1.6.62-2.55.62c-1.37,0-2.47-.35-3.3-1.04-.83-.69-1.25-1.63-1.25-2.81,0-1.02.34-1.85,1.01-2.47.68-.62,1.62-1.1,2.82-1.42s2.73-.58,4.56-.77v-.18c0-.75-.19-1.3-.56-1.66s-.91-.55-1.6-.55-1.24.18-1.62.53c-.39.36-.58.8-.58,1.34h-3.46c0-.9.24-1.71.73-2.43.49-.72,1.16-1.28,2.03-1.69.87-.41,1.86-.61,2.97-.61,1.73,0,3.09.46,4.08,1.37h0ZM105.83,17.19c.57-.48.93-1.13,1.07-1.95v-1.04c-1.61.09-2.82.31-3.63.68-.81.36-1.21.88-1.21,1.56,0,.49.17.85.51,1.11.34.25.78.38,1.31.38.73,0,1.38-.24,1.95-.73h0Z"/>
      <path d="M121.53,6.73l-.16,3.48c-.33-.14-.76-.21-1.3-.21-.57,0-1.12.13-1.65.4-.53.27-.96.65-1.29,1.16s-.49,1.08-.49,1.74v6.79h-3.49V7.01h2.89l.29,1.85c.99-1.46,2.45-2.18,4.4-2.18.29,0,.56.02.81.05h0Z"/>
    </g>
  </svg>
);

const Hero = () => {
  return (
    <div className={styles.hero}>
      {/* Base black background */}
      {/* <div className={styles.backgroundBlack}></div> */}
      
      {/* GridDistortion background layer */}
      <div className={styles.backgroundDistortion}>
        {/* <GridDistortion
          imageSrc="./img/12.jpg"
          grid={15}
          mouse={0.3}
          strength={0.2}
          relaxation={0.85}
          className={styles.distortionCanvas}
        /> */}
      </div>
      
      {/* Dark overlay */}
      {/* <div className={styles.darkOverlay}></div> */}

      {/* Navigation */}
      <nav className={styles.navigation}>
        <div className={styles.navLeft}>
          <div className={styles.navLogoContainer}>
            <MoSugarLogo className={styles.navLogo} />
          </div>
        </div>
        
        <button className={styles.menuButton}>
          <span className={styles.menuButtonText}>Menu</span>
          <Menu size={16} />
        </button>
      </nav>

      {/* Available Status - Bottom Right */}
      <div className={styles.availableStatus}>
        <div className={styles.statusDot}></div>
        <span className={styles.statusText}>Available for work</span>
      </div>

      {/* Main Hero Content */}
      <div className={styles.mainContent}>
        {/* Main heading */}
        <div className={styles.titleSection}>
          <div className={styles.mainLogoContainer}>
            <MoSugarLogo className={styles.mainLogo} />
          </div>
        </div>
        
        {/* Three column grid: Copyright/Tagline, Brand, UI/UX */}
        <div className={styles.sectionsGrid}>
          <div className={styles.copyrightSection}>
            <div className={styles.orangeEdge}></div>
            <div className={styles.copyright}>©2025</div>
            <div className={styles.tagline}>
              Designing digital experiences that captivate, connect, and convert.
            </div>
          </div>
          
          <div className={styles.section}>
            <div className={styles.orangeEdge}></div>
            <h2 className={styles.sectionTitle}>Brand</h2>
            <p className={styles.sectionDescription}>
              We craft bold, memorable brand identities that tell your story and leave a lasting impression.
            </p>
          </div>
          
          <div className={styles.section}>
            <div className={styles.orangeEdge}></div>
            <h2 className={styles.sectionTitle}>UI/UX</h2>
            <p className={styles.sectionDescription}>
              Intuitive, user-focused interfaces that elevate engagement and drive seamless interactions.
            </p>
          </div>
        </div>
      </div>

      {/* Ambient lighting effects */}
      <div className={styles.ambientLighting}>
        <div className={styles.lightingEffect1}></div>
        <div className={styles.lightingEffect2}></div>
      </div>
    </div>
  );
};


export default Hero;