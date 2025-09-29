import { motion } from 'framer-motion';
import '../styles/services.css';

const carePrograms = [
  {
    title: '24시 통합 진료 센터',
    description: '내과 · 외과 · 치과 · 피부과 전문의가 팀을 이루어 케이스별 맞춤 진료 프로세스를 운영합니다.',
    accent: '24ON AMC 네트워크 연계'
  },
  {
    title: '정밀 영상 진단',
    description: '128ch CT, 디지털 X-ray, 고해상도 초음파 장비로 정확한 진단과 빠른 치료 결정을 돕습니다.',
    accent: '영상의학과 전공의 상주'
  },
  {
    title: '스마트 케어 라운지',
    description: '젊은 보호자를 위한 프라이빗 상담실과 감성 라운지를 제공하여 편안한 진료 경험을 선사합니다.',
    accent: '라이프스타일 맞춤 상담'
  }
];

const specialtyList = [
  '국내 최초 여성 보호자 전용 케어 컨시어지',
  '심장 · 재활 · 피부 등 분야별 협진 시스템',
  '24시간 회복실 CCTV & 모바일 모니터링'
];

const ServicesSection = () => {
  return (
    <section className="services">
      <div className="services__intro">
        <div className="services__copy">
          <p className="section-badge">서울 펫 클리닉 센터 진료 안내</p>
          <h2>대형 동물의료센터 수준의 토탈 케어</h2>
          <p>
            24on AMC가 보유한 첨단 장비와 숙련된 의료진, 그리고 젊은 보호자를 위한 감각적인 서비스
            플로우를 그대로 담았습니다. 진료 전 상담부터 사후 케어까지 믿고 맡겨주세요.
          </p>
          <ul className="services__list">
            {specialtyList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <motion.a
            href="#inquiry"
            className="services__cta"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            진료 문의 남기기
          </motion.a>
        </div>
        <div className="services__photo" aria-hidden>
          <img
            src="https://24onamc.com/theme/kt001a/img/intro.jpg"
            alt="서울 펫 클리닉 센터 내부"
            loading="lazy"
          />
        </div>
      </div>

      <div className="services__grid">
        {carePrograms.map((service, index) => (
          <motion.article
            key={service.title}
            className="services__card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <span className="services__number">0{index + 1}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <span className="services__accent">{service.accent}</span>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
