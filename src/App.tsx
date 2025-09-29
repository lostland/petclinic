import { useMemo } from 'react';
import ExperienceSection from './components/ExperienceSection';
import FloatingCTA from './components/FloatingCTA';
import Footer from './components/Footer';
import FullPageScroller, { type FullPageSection } from './components/FullPageScroller';
import GallerySection from './components/GallerySection';
import HeroSection from './components/HeroSection';
import InquirySection from './components/InquirySection';
import MapSection from './components/MapSection';
import ServicesSection from './components/ServicesSection';
import './styles/app.css';

function App() {
  const currentYear = new Date().getFullYear();

  const sections = useMemo<FullPageSection[]>(
    () => [
      {
        id: 'home',
        label: '첫 화면',
        content: <HeroSection />,
        className: 'tone-light',
      },
      {
        id: 'services',
        label: '주요 진료',
        content: <ServicesSection />,
      },
      {
        id: 'experience',
        label: '센터 경험',
        content: <ExperienceSection />,
        className: 'tone-dark',
      },
      {
        id: 'gallery',
        label: '공간 미리보기',
        content: <GallerySection />,
      },
      {
        id: 'inquiry',
        label: '상담 및 예약',
        content: <InquirySection />,
      },
      {
        id: 'map',
        label: '오시는 길',
        content: <MapSection />,
      },
      {
        id: 'footer',
        label: '마무리 안내',
        content: <Footer currentYear={currentYear} />,
      },
    ],
    [currentYear],
  );

  return (
    <div className="page-root">
      <FullPageScroller sections={sections} />
      <FloatingCTA />
    </div>
  );
}

export default App;
