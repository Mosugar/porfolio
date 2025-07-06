import Hero from './components/Hero.jsx';
import Skills from './components/Skills.jsx';
import MatrixRain from './components/MatrixRain.jsx';
import Footer from './components/Footer.jsx';
import Work from './components/Work.jsx';
import Services from './components/Services.jsx';
import GlobalBackground from './components/Layout.jsx';
import ExperienceHistory from './components/ExperienceHistory.jsx';
import CyberpunkNavigation from './components/CyberpunkNavigation.jsx'; // Add this import

function App() {
  return (
    <>
      <GlobalBackground>
        <CyberpunkNavigation /> {/* Add the navigation component */}
        <div id="home">
          <Hero />
        </div>
        <div id="skills">
          <Skills />
        </div>
        <div id="services">
          <Services />
        </div>
        <div id="experience">
          <ExperienceHistory/>
        </div>
        <div id="works">
          <Work />
        </div>
        <div id="contact">
          <Footer />
        </div>
        <MatrixRain />
      </GlobalBackground>
    </>
  )
}

export default App