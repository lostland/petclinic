import { motion } from 'framer-motion';
import '../styles/hero.css';

const heroHighlights = [
  {
    title: '24시간 전담 진료',
    description: '응급, 입원, 야간 협진까지 한 번에 이어지는 원스톱 케어',
  },
  {
    title: '첨단 영상 · 수술 시스템',
    description: '128ch CT와 무균 수술실, 회복실을 연결한 토탈 진료 인프라',
  },
  {
    title: '라이프스타일 컨시어지',
    description: '젊은 보호자를 위한 프라이빗 상담존과 감성 라운지 운영',
  },
];

const heroFacts = [
  { label: '진료시간', value: '연중무휴 24h' },
  { label: '상담 채널', value: '전화 · 카카오톡 · 온라인' },
  { label: '위치', value: '역삼역 3번 출구 도보 3분' },
];

const HeroSection = () => {
  return (
    <header className="hero">
      <div className="hero__background" aria-hidden>
        <img
          src="https://images.unsplash.com/photo-1558944351-c3a08818bd0c?auto=format&fit=crop&w=1600&q=80"
          alt="감각적인 동물병원 내부"
          loading="lazy"
        />
        <div className="hero__background-overlay" />
      </div>

      <div className="hero__inner">
        <motion.span
          className="hero__badge"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          24ON AMC 협력 프리미엄 센터
        </motion.span>

        <motion.div
          className="hero__logo"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <svg viewBox="0 0 64 64" role="img" aria-label="서울 펫 클리닉 로고">
            <circle cx="32" cy="32" r="30" fill="url(#heroLogoGradient)" />
            <path
              d="M32 18c-4.3 0-7.8 3.5-7.8 7.8 0 1.5.4 3 1.2 4.2l6.6 10.5 6.6-10.5c.8-1.2 1.2-2.7 1.2-4.2 0-4.3-3.5-7.8-7.8-7.8zm0 11.4a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2z"
              fill="#fff"
            />
            <path
              d="M22.2 35.4c-4.1 0-7.4 3.3-7.4 7.4S18.1 50.2 22.2 50.2c2.4 0 4.5-1.1 5.9-2.8l3.9-5.6-3.9-6c-1.3-2-3.5-3.2-5.9-3.2zM41.8 35.4c-2.4 0-4.6 1.2-5.9 3.2l-3.9 6 3.9 5.6c1.4 1.8 3.5 2.8 5.9 2.8 4.1 0 7.4-3.3 7.4-7.4s-3.3-7.4-7.4-7.4z"
              fill="#fff"
              opacity="0.88"
            />
            <defs>
              <linearGradient id="heroLogoGradient" x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#65b9b6" />
                <stop offset="100%" stopColor="#4f5d8c" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          서울 펫 클리닉 센터
        </motion.h1>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          프리미엄 24시 동물병원
        </motion.p>

        <motion.p
          className="hero__description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          반려가족의 하루에 자연스럽게 스며드는 진료 경험을 디자인했습니다. 감각적인 공간, 첨단 장비,
          숙련된 의료진이 팀을 이뤄 언제 방문하셔도 동일한 퀄리티의 케어를 제공합니다.
        </motion.p>

        <motion.ul
          className="hero__highlights"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          {heroHighlights.map((highlight) => (
            <li key={highlight.title}>
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
            </li>
          ))}
        </motion.ul>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <a href="#inquiry" className="hero__cta">
            상담 예약하기
          </a>
          <a href="#services" className="hero__cta hero__cta--ghost">
            센터 프로그램 보기
          </a>
        </motion.div>

        <motion.dl
          className="hero__facts"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          {heroFacts.map((fact) => (
            <div key={fact.label} className="hero__fact">
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </header>
  );
};

export default HeroSection;
