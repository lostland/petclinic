import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/map.css';

declare global {
  interface Window {
    naver: any;
  }
}

const NAVER_MAP_SCRIPT =
  'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=454vo4765n';

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (window.naver) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = NAVER_MAP_SCRIPT;
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;
    const { naver } = window;

    if (!naver) return;

    const location = new naver.maps.LatLng(37.498095, 127.02761);
    const map = new naver.maps.Map(mapRef.current, {
      center: location,
      zoom: 16,
      scaleControl: false,
      mapDataControl: false
    });

    const marker = new naver.maps.Marker({
      position: location,
      map,
      icon: {
        url: 'https://img.icons8.com/color/48/000000/dog.png',
        size: new naver.maps.Size(48, 48),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(24, 48)
      }
    });

    const content = `
      <div class="map-info">
        <h3>서울 펫 클리닉 센터</h3>
        <p>서울특별시 강남구 테헤란로 123</p>
        <p class="map-info__highlight">연중무휴 24시간 진료</p>
      </div>
    `;

    const infoWindow = new naver.maps.InfoWindow({
      content,
      borderWidth: 0,
      backgroundColor: 'transparent'
    });

    infoWindow.open(map, marker);
  }, [isLoaded]);

  return (
    <section className="map">
      <div className="section-heading">
        <p className="section-badge">방문 안내</p>
        <h2>역삼역에서 가장 가까운 24시 동물병원</h2>
        <p className="section-description">
          2호선 역삼역 3번 출구에서 도보 3분. 지하 주차장 발렛과 반려동물 픽업 서비스를 통해 이동 부담을
          줄였습니다.
        </p>
      </div>
      <motion.div
        className="map__container"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div ref={mapRef} className="map__canvas" aria-label="서울 펫 클리닉 센터 위치 지도" />
        <div className="map__details">
          <h3>서울 펫 클리닉 센터</h3>
          <p>서울특별시 강남구 테헤란로 123, 2층</p>
          <ul>
            <li>지하철 2호선 역삼역 3번 출구 도보 3분</li>
            <li>지하 주차장 발렛 & 보호자 픽업 서비스</li>
            <li>야간 응급 전담팀 · 24ON 협력 네트워크</li>
          </ul>
          <a className="map__link" href="tel:0277771234">
            상담 및 예약 02-7777-1234
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default MapSection;
