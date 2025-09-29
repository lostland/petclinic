import { motion } from 'framer-motion';
import '../styles/gallery.css';

const gallerySlides = [
  {
    title: '서울 펫 클리닉 센터 투어',
    description: '감각적인 인테리어와 감성 조명이 어우러진 공간, 프라이빗 라운지를 미리 만나보세요.',
    image: 'https://24onamc.com/theme/kt001a/img/main_visual02.jpg'
  },
  {
    title: '스페셜티 수술센터',
    description: '무균 수술실과 회복실, 집중케어실까지 한 공간에 구성해 안전한 수술 환경을 제공합니다.',
    image: 'https://24onamc.com/theme/kt001a/img/sur3.jpg'
  },
  {
    title: '힐링 펫 라운지',
    description: '여성 보호자를 위한 프라이빗 상담존과 향기로운 티 바, 포토 스팟을 준비했습니다.',
    image: 'https://24onamc.com/theme/kt001a/img/about4.jpg'
  }
];

const newsItems = [
  {
    title: '[희망이의 치료 여정 2] 불길 속에서 살아난 희망',
    date: '2025.04.23',
    image:
      'https://24onamc.com/data/editor/2504/thumb-f0e895a2f7e9c6967f77b3bb6fae40c5_1745369212_3398_600x.jpg'
  },
  {
    title: '[희망이의 치료 여정 1] 산불 현장에서 구조된 작은 생명',
    date: '2025.04.16',
    image:
      'https://24onamc.com/data/editor/2504/thumb-87f2172353105c219a1d2b77a1c69f27_1744766597_1599_600x.jpg'
  },
  {
    title: '첨단 영상진단센터 CT 장비 업그레이드 안내',
    date: '2025.03.28',
    image:
      'https://24onamc.com/data/editor/2503/thumb-521bcfddcd7f1a71296eb4c11b0e1b7e_1743279352_9973_600x.jpg'
  }
];

const GallerySection = () => {
  return (
    <section className="gallery">
      <div className="gallery__hero">
        <div className="gallery__hero-content">
          <p className="section-badge">공간 & 센터 미리보기</p>
          <h2>서울 펫 클리닉 센터의 특별한 하루</h2>
          <p>
            24on AMC의 감각적인 공간 구성과 전문 진료 동선을 그대로 담았습니다. 젊은 보호자들이 선호하는
            파스텔 무드, 라탄 포인트, 감성 조명이 어우러져 힐링되는 시간을 선사합니다.
          </p>
        </div>
        <div className="gallery__slider">
          {gallerySlides.map((slide, index) => (
            <motion.figure
              key={slide.title}
              className="gallery__slide"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="gallery__slide-image" style={{ backgroundImage: `url(${slide.image})` }} />
              <figcaption>
                <h3>{slide.title}</h3>
                <p>{slide.description}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      <div className="gallery__news">
        <div className="gallery__news-header">
          <h3>서울 펫 클리닉 소식</h3>
          <span>실시간으로 업데이트되는 치료 이야기</span>
        </div>
        <div className="gallery__news-list">
          {newsItems.map((item, index) => (
            <motion.article
              key={item.title}
              className="gallery__news-item"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="gallery__news-image" style={{ backgroundImage: `url(${item.image})` }} />
              <div className="gallery__news-content">
                <span className="gallery__news-date">{item.date}</span>
                <h4>{item.title}</h4>
                <p>서울 펫 클리닉 센터에서 진행 중인 특별한 치료 사례와 감동적인 이야기들을 만나보세요.</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
