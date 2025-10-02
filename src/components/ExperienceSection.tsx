import { motion } from 'framer-motion';
import '../styles/experience.css';

const experienceBlocks = [
  {
    title: '영상진단 존',
    description:
      '128채널 CT, 고해상도 초음파, 디지털 X-ray를 갖춘 공간에서 케이스별 맞춤 프로토콜로 판독합니다.',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: '스페셜티 협진 스테이션',
    description: '심장 · 신경 · 재활 전문 의료진이 동일한 EMR을 공유하며 실시간으로 협진합니다.',
    image: 'https://images.unsplash.com/photo-1580281657521-3898e9480a06?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: '회복 & 웰니스 라운지',
    description: '프라이빗 입원실, 보호자 라운지, 아로마 케어 프로그램으로 회복 시간을 편안하게 채웁니다.',
    image: 'https://images.unsplash.com/photo-1615461066841-1eef8e612955?auto=format&fit=crop&w=1200&q=80'
  }
];

const ExperienceSection = () => {
  return (
    <section className="experience">
      <motion.div
        className="experience__feature"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
      >
        <div className="experience__feature-overlay" />
        <div className="experience__feature-inner">
          <p className="experience__badge">센터 경험 미리보기</p>
          <h2>하루 종일 이어지는 몰입형 의료 서비스</h2>
          <p>
            진료, 검사, 수술, 회복이 하나의 동선 안에서 매끄럽게 진행됩니다. 전문과 의료진과 케어 매니저가
            팀을 이루어 보호자님과 반려동물이 머무는 모든 순간을 세심하게 살핍니다.
          </p>
          <div className="experience__stats">
            <div>
              <strong>128ch</strong>
              <span>프리미엄 영상 진단</span>
            </div>
            <div>
              <strong>24h</strong>
              <span>전담 의료진 상주</span>
            </div>
            <div>
              <strong>5 Team</strong>
              <span>스페셜티 협진 라인업</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="experience__blocks">
        {experienceBlocks.map((block, index) => (
          <motion.article
            key={block.title}
            className="experience__block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="experience__block-image" style={{ backgroundImage: `url(${block.image})` }} />
            <div className="experience__block-content">
              <h3>{block.title}</h3>
              <p>{block.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
