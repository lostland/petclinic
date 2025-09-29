import { motion } from 'framer-motion';
import '../styles/hero.css';

const floatingVariants = {
  initial: { y: 0 },
  animate: {
    y: [0, -18, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

const HeroSection = () => {
  return (
    <header className="hero">
      <div className="hero__visual">
        <img
          src="https://24onamc.com/theme/kt001a/img/main_visual01.jpg"
          alt="따뜻하게 안아주는 수의사와 강아지"
          className="hero__image"
          loading="lazy"
        />
        <div className="hero__overlay" />
        <motion.div
          className="hero__floating hero__floating--left"
          variants={floatingVariants}
          initial="initial"
          animate="animate"
        >
          <span>24시간 케어</span>
          <strong>응급 · 입원 시스템</strong>
        </motion.div>
        <motion.div
          className="hero__floating hero__floating--right"
          variants={floatingVariants}
          initial="initial"
          animate="animate"
        >
          <span>첨단 영상진단</span>
          <strong>CT · X-ray · 초음파</strong>
        </motion.div>
      </div>
      <div className="hero__content">
        <motion.p
          className="hero__badge"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          서울 펫 클리닉 센터
        </motion.p>
        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          젊은 보호자를 위한<br />
          프리미엄 24시 동물병원
        </motion.h1>
        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          반려가족의 하루에 스며드는 감각적인 공간, 첨단 장비와 숙련된 의료진의 팀 케어로 안심을 전합니다.
        </motion.p>
        <motion.ul
          className="hero__features"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <li>여의도 · 강남권 10분 내 접근</li>
          <li>여성 보호자 전용 상담 라운지</li>
          <li>24on AMC 협력 의료 네트워크</li>
        </motion.ul>
        <div className="hero__actions">
          <motion.a
            href="#inquiry"
            className="hero__cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            맞춤 상담 예약하기
          </motion.a>
          <motion.a
            href="#map"
            className="hero__cta hero__cta--ghost"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            오시는 길 보기
          </motion.a>
        </div>
        <motion.div
          className="hero__pets"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <img
            src="https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80"
            alt="웃는 강아지"
            className="hero__pet"
            loading="lazy"
          />
          <img
            src="https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&w=900&q=80"
            alt="포근한 고양이"
            className="hero__pet"
            loading="lazy"
          />
          <img
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80"
            alt="함께 있는 강아지와 고양이"
            className="hero__pet"
            loading="lazy"
          />
        </motion.div>
      </div>
    </header>
  );
};

export default HeroSection;
