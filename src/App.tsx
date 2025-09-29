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
        className: 'tone-light section-bg-1',
      },
      {
        id: 'services',
        label: '주요 진료',
        content: <ServicesSection />,
        className: 'section-bg-2',
      },
      {
        id: 'experience',
        label: '센터 경험',
        content: <ExperienceSection />,
        className: 'tone-dark section-bg-3',
      },
      {
        id: 'gallery',
        label: '공간 미리보기',
        content: <GallerySection />,
        className: 'section-bg-4',
      },
      {
        id: 'inquiry',
        label: '상담 및 예약',
        content: <InquirySection />,
        className: 'section-bg-5',
      },
      {
        id: 'map',
        label: '오시는 길',
        content: <MapSection />,
        className: 'section-bg-6',
      },
      {
        id: 'footer',
        label: '마무리 안내',
        content: <Footer currentYear={currentYear} />,
        className: 'section-bg-7',
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
