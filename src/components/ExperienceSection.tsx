import { motion } from 'framer-motion';
import '../styles/experience.css';

const experienceBlocks = [
  {
    title: '영상진단센터',
    description:
      '128채널 CT와 최신 DR X-ray, 초음파 장비를 갖춘 영상진단센터에서 빠르고 정확한 판독을 제공합니다.',
    image: 'https://24onamc.com/theme/kt001a/img/sur2.jpg'
  },
  {
    title: '스페셜티 협진',
    description: '심장·신경·재활·피부 등 전문 의료진이 24ON 네트워크와 함께 협력 진료를 진행합니다.',
    image: 'https://24onamc.com/theme/kt001a/img/about3.jpg'
  },
  {
    title: '회복 & 웰니스 라운지',
    description: '프라이빗 입원실과 보호자 라운지, 감성 케어 프로그램으로 안심하고 회복할 수 있는 환경을 제공합니다.',
    image: 'https://24onamc.com/theme/kt001a/img/about1.jpg'
  }
];

const ExperienceSection = () => {
  return (
    <section className="experience" id="experience">
      <motion.div
        className="experience__feature"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
      >
        <div className="experience__feature-overlay" />
        <div className="experience__feature-inner">
          <p className="experience__badge">첨단 영상진단센터 안내</p>
          <h2>첨단 영상장비와 숙련된 전공의 팀</h2>
          <p>
            CT, 초음파, X-ray, C-Arm 등 최신 영상장비를 완비한 진단센터에서 정확한 진단과 빠른 치료 계획을
            세우세요. 영상의학과 전공의가 24시간 상주하며 협진 시스템을 가동합니다.
          </p>
          <div className="experience__stats">
            <div>
              <strong>128ch</strong>
              <span>멀티 슬라이스 CT</span>
            </div>
            <div>
              <strong>24h</strong>
              <span>상시 판독 지원</span>
            </div>
            <div>
              <strong>5Team</strong>
              <span>스페셜티 협진</span>
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
