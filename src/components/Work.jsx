import React, { useState, memo, useCallback } from 'react';
import { ExternalLink } from 'lucide-react';
import styles from '../styles/work.module.css';

// Memoized Project Card Component
const ProjectCard = memo(({ project, index, activeItem, handleMouseEnter }) => {
  const isActive = activeItem === index;
  const isSmallScreen = typeof window !== 'undefined' && window.innerWidth <= 1150;

  return (
    <div
      className={`${styles.projectCard} ${isActive ? styles.active : ""}`}
      onClick={() => handleMouseEnter(index)}
      style={{
        ...(isActive && { backgroundImage: `url(${project.image})` })
      }}
    >
      <div className={styles.cardContent}>
        <div className={styles.projectCardTop}>
          <div>
            <div className={styles.projectName}>
              <h3>{project.name}</h3>
            </div>
            <div className={styles.projectDescription}>
              {project.description}
            </div>
          </div>
        </div>
        <div className={styles.projectExternal}>
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            <span>Visit Project</span>
            <ExternalLink size={16} className={styles.externalIcon} />
          </a>
        </div>
      </div>
      <div className={styles.projectOuterName}>
        <span>0{project.id}</span>
        <h1>{project.name}</h1>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

const Work = () => {
  const [activeItem, setActiveItem] = useState(0);

  const projects = [
    {
      id: 1,
      name: "El Jamai Couture",
      description: "Luxury fashion e-commerce platform with elegant design and premium Arabic fashion collections.",
      image: "https://res.cloudinary.com/decjm9mmr/image/upload/q_10,f_auto/d-clubArtboard_1_cjqxkq.png",
      url: "https://eljamaicouture.ae/"
    },
    {
      id: 2,
      name: "Wardd Music",
      description: "Dynamic music platform featuring artist portfolios and cutting-edge audio streaming technology.",
      image: "https://res.cloudinary.com/decjm9mmr/image/upload/q_10,f_auto/wardd_cover_two_u2j8hi_ahpexf.webp",
      url: "https://www.warddmusic.com/"
    },
    {
      id: 3,
      name: "Wardd Studio",
      description: "Creative studio showcase with stunning visuals and innovative design solutions.",
      image: "https://res.cloudinary.com/decjm9mmr/image/upload/q_10,f_auto/Stretched_1_hjoiei.jpg",
      url: "https://www.warddstudio.com/"
    },
    {
      id: 4,
      name: "Stretched Web",
      description: "Modern web agency platform with innovative design and comprehensive digital solutions.",
      image: "https://res.cloudinary.com/decjm9mmr/image/upload/q_10,f_auto/wardd_music_02__xgryox.jpg",
      url: "https://stretched-web.vercel.app/"
    },
    {
      id: 5,
      name: "Lawyer Sulaiman",
      description: "Professional legal services website with clean design and comprehensive law practice solutions.",
      image: "https://res.cloudinary.com/decjm9mmr/image/upload/q_10,f_auto/lawyer_eto36c.webp",
      url: "https://lawyer-sulaiman.vercel.app/"
    },
    {
      id: 6,
      name: "Smiley Dentist",
      description: "Healthcare platform with friendly interface and comprehensive dental care services.",
      image: "https://res.cloudinary.com/decjm9mmr/image/upload/q_20,f_auto/post_gyz5fk.png",
      url: "https://smiley-dentist.vercel.app/"
    }
  ];

  const handleMouseEnter = useCallback((index) => {
    setActiveItem(index);
  }, []);

  return (
    <section className={styles.workSection}>
      <div className={styles.workContainer}>
        {/* Simple Title */}
        <div className={styles.titleContainer}>
          <h2 className={styles.sectionTitle}>PROJECTS</h2>
        </div>

        {/* Projects Content */}
        <div className={styles.workContent}>
          <div className={styles.projectsContainer}>
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                activeItem={activeItem}
                handleMouseEnter={handleMouseEnter}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;