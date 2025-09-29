import { useMemo } from 'react';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import ExperienceSection from './components/ExperienceSection';
import GallerySection from './components/GallerySection';
import InquirySection from './components/InquirySection';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import './styles/app.css';

function App() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="app-container">
      <HeroSection />
      <ServicesSection />
      <ExperienceSection />
      <GallerySection />
      <InquirySection />
      <MapSection />
      <Footer currentYear={currentYear} />
      <FloatingCTA />
    </div>
  );
}

export default App;
