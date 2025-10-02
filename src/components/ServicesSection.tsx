import { motion } from 'framer-motion';
import '../styles/services.css';

const carePrograms = [
  {
    title: '메디컬 코디네이션',
    description: '진료 전 상담, 검사 설계, 치료 플랜까지 전담 케어 매니저가 전체 과정을 연결합니다.',
    accent: '전담 케어 매니저 배정',
  },
  {
    title: '프리미엄 영상 진단',
    description: '128채널 CT와 고해상도 초음파, 디지털 X-ray를 활용해 빠르고 정확한 진단을 제공합니다.',
    accent: '영상의학 전공의 상주',
  },
  {
    title: '스페셜티 수술 & 회복',
    description: '무균 수술실과 회복 라운지를 연결해 수술 후 케어까지 안전하게 이어집니다.',
    accent: '24시간 모니터링 시스템',
  },
];

const specialtyList = [
  '야간까지 이어지는 전문과 협진 시스템',
  '응급 · 입원 · 재활을 아우르는 통합 케어',
  '보호자 전용 라운지와 프라이빗 상담실 상시 운영',
];

const ServicesSection = () => {
  return (
    <section className="services">
      <div className="services__frame">
        <div className="services__intro">
          <div className="services__copy">
            <p className="section-badge">Signature Care Program</p>
            <h2>하루 동선에 맞춘 토탈 진료 루틴</h2>
            <p>
              서울 펫 클리닉 센터는 진료, 영상, 수술, 회복이 한 공간에서 이어지도록 설계되었습니다. 첫 상담부터
              사후 케어까지 끊김 없는 플로우로 보호자님이 안심할 수 있는 진료 경험을 만들어갑니다.
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
              상담 스케줄 남기기
            </motion.a>
          </div>
          <div className="services__photo" aria-hidden>
            <img
              src="https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=1200&q=80"
              alt="서울 펫 클리닉 센터 진료 공간"
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
      </div>
    </section>
  );
};

export default ServicesSection;
