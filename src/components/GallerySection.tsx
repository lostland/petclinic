import { motion } from 'framer-motion';
import '../styles/gallery.css';

const gallerySlides = [
  {
    title: '로비 & 웰컴 라운지',
    description: '자연광이 들어오는 로비에서 반려동물과 보호자를 가장 먼저 따뜻하게 맞이합니다.',
    image: 'https://images.unsplash.com/photo-1610276198568-eb6d0ff53d79?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: '수술 준비 구역',
    description: '무균 환경으로 설계된 준비실에서 수술 전 체크리스트를 꼼꼼하게 점검합니다.',
    image: 'https://images.unsplash.com/photo-1576765607924-3ddca5f90ca5?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: '보호자 케어 라운지',
    description: '프라이빗 좌석과 향기로운 티 서비스로 케어 중에도 편안한 휴식을 드립니다.',
    image: 'https://images.unsplash.com/photo-1616628182501-d48e0d3f0c8d?auto=format&fit=crop&w=1200&q=80'
  }
];

const newsItems = [
  {
    title: '야간 응급 전담팀 신설 안내',
    date: '2025.04.27',
    image: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: '보호자 케어 라운지 리뉴얼 오픈',
    date: '2025.04.12',
    image: 'https://images.unsplash.com/photo-1526403226667-4aa07b0604ef?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: '심장 재활 프로그램 런칭',
    date: '2025.03.30',
    image: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25?auto=format&fit=crop&w=800&q=80'
  }
];

const GallerySection = () => {
  return (
    <section className="gallery">
      <div className="gallery__hero">
        <div className="gallery__hero-content">
          <p className="section-badge">센터 공간 스케치</p>
          <h2>감각적인 휴식과 진료가 공존하는 무드</h2>
          <p>
            반려동물과 보호자가 모두 편안함을 느끼도록 동선을 정리하고, 공간마다 다른 감성을 담았습니다.
            머무는 동안 자연스럽게 긴장이 풀리는 서울 펫 클리닉 센터의 하루를 살펴보세요.
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
          <h3>센터 뉴스</h3>
          <span>서울 펫 클리닉 센터의 최신 소식을 만나보세요</span>
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
                <p>보호자님께 도움이 될 만한 진료 소식과 센터 업데이트를 정기적으로 전해드립니다.</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
