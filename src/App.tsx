import { useEffect, useMemo, useState } from 'react';
import ExperienceSection from './components/ExperienceSection';
import FloatingCTA from './components/FloatingCTA';
import Footer from './components/Footer';
import GallerySection from './components/GallerySection';
import HeroSection from './components/HeroSection';
import InquirySection from './components/InquirySection';
import MapSection from './components/MapSection';
import ServicesSection from './components/ServicesSection';
import './styles/app.css';

type HeroSlide =
  | {
      id: string;
      type: 'logo';
      title: string;
      subtitle: string;
      description: string;
    }
  | {
      id: string;
      type: 'advantages';
      title: string;
      highlights: string[];
    }
  | {
      id: string;
      type: 'staff';
      title: string;
      members: { name: string; role: string }[];
    };

const DISPLAY_DURATION = 3200;

function App() {
  const slides = useMemo<HeroSlide[]>(
    () => [
      {
        id: 'logo-primary',
        type: 'logo',
        title: '24온동물의료센터',
        subtitle: '24ON Animal Medical Center',
        description: '24시간 365일 응급 및 전문 진료를 제공하는 프리미엄 동물의료센터',
      },
      {
        id: 'advantages',
        type: 'advantages',
        title: '24ON의 장점',
        highlights: [
          '분과별 전문의로 구성된 협진 시스템',
          '첨단 장비와 체계적인 24시간 모니터링',
          '진료부터 회복까지 반려동물과 보호자 중심의 케어',
        ],
      },
      {
        id: 'staff',
        type: 'staff',
        title: '의료진 소개',
        members: [
          { name: '김태윤 대표원장', role: '내과 전문의 / 응급의학' },
          { name: '박서현 원장', role: '외과 전문의 / 정형외과' },
          { name: '이도현 원장', role: '영상의학 / 재활치료' },
        ],
      },
      {
        id: 'logo-secondary',
        type: 'logo',
        title: '24온동물의료센터',
        subtitle: '당신의 반려동물에게 최고의 시간을 선물합니다',
        description: '응급부터 전문 진료까지 24시간 한결같이 곁을 지키는 의료 파트너',
      },
    ],
    [],
  );

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [hasCompletedSlides, setHasCompletedSlides] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const viewportHeight = window.innerHeight || 1;
      const progress = Math.min(Math.max(window.scrollY / viewportHeight, 0), 1);
      setScrollProgress(progress);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  useEffect(() => {
    if (hasCompletedSlides) {
      return undefined;
    }

    const displayTimer = setTimeout(() => {
      let reachedEnd = false;
      setActiveSlide((prev) => {
        const nextIndex = prev + 1;
        if (nextIndex >= slides.length) {
          reachedEnd = true;
          return prev;
        }
        return nextIndex;
      });
      if (reachedEnd) {
        setHasCompletedSlides(true);
      }
    }, DISPLAY_DURATION);

    return () => {
      clearTimeout(displayTimer);
    };
  }, [activeSlide, slides.length, hasCompletedSlides]);

  const progress = Math.min(Math.max(scrollProgress, 0), 1);
  const heroTranslate = -progress * 28;
  const infoTranslate = Math.max(100 - progress * 180, -90);

  const renderSlideContent = () => {
    const slide = slides[activeSlide];

    if (!slide) {
      return null;
    }

    switch (slide.type) {
      case 'logo':
        return (
          <div className="hero-slide hero-slide-logo">
            <div className="hero-logo-mark" aria-hidden="true">
              <span>24</span>
              <span>ON</span>
            </div>
            <h1>{slide.title}</h1>
            <p className="hero-subtitle">{slide.subtitle}</p>
            <p className="hero-description">{slide.description}</p>
          </div>
        );
      case 'advantages':
        return (
          <div className="hero-slide hero-slide-advantages">
            <span className="hero-badge">Why 24ON</span>
            <h2>{slide.title}</h2>
            <ul>
              {slide.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        );
      case 'staff':
        return (
          <div className="hero-slide hero-slide-staff">
            <h2>{slide.title}</h2>
            <div className="hero-staff-list">
              {slide.members.map((member) => (
                <div className="hero-staff-card" key={member.name}>
                  <span className="hero-staff-name">{member.name}</span>
                  <span className="hero-staff-role">{member.role}</span>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="page-root">
      <div className="scroll-stage">
        <div className="sticky-scenes">
          <section className="scene scene-hero" style={{ transform: `translateY(${heroTranslate}vh)` }}>
            <div className="hero-content">{renderSlideContent()}</div>
          </section>
          <section className="scene scene-info" style={{ transform: `translateY(${infoTranslate}vh)` }}>
            <div className="info-content">
              <span className="info-badge">24ON CARE SYSTEM</span>
              <h2>한층 더 진화한 프리미엄 동물의료 서비스</h2>
              <p>
                24온동물의료센터는 보호자와 반려동물이 안심할 수 있는 진료 환경을 만들기 위해
                응급·내과·외과·재활 등 다양한 진료 과목이 긴밀하게 협력합니다. 두 번째 화면에서는
                병원 소개와 이용 안내, 그리고 세심한 케어 철학을 빠르게 만나볼 수 있습니다.
              </p>
              <div className="info-grid">
                <div className="info-card">
                  <h3>365일 24시간</h3>
                  <p>야간과 주말에도 전문의가 상주하며 응급 상황에 즉시 대응합니다.</p>
                </div>
                <div className="info-card">
                  <h3>첨단 진단 장비</h3>
                  <p>CT, MRI, 내시경 등 최첨단 장비로 정확한 진단과 맞춤형 치료가 이루어집니다.</p>
                </div>
                <div className="info-card">
                  <h3>원스톱 케어</h3>
                  <p>상담부터 재활, 홈케어 가이드까지 보호자와 함께하는 전인 케어를 제공합니다.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <main className="page-content">
        <HeroSection />
        <ServicesSection />
        <ExperienceSection />
        <GallerySection />
        <InquirySection />
        <MapSection />
      </main>

      <Footer currentYear={new Date().getFullYear()} />
      <FloatingCTA />
    </div>
  );
}

export default App;
