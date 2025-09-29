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
        <p class="map-info__highlight">영업시간 10:00 - 21:00 (연중무휴)</p>
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
    <section className="map" id="map">
      <div className="section-heading">
        <p className="section-badge">찾아오시는 길</p>
        <h2>언제든 부담 없이 방문하세요</h2>
        <p className="section-description">
          2호선 역삼역 3번 출구 도보 3분. 주차 발렛과 반려동물 픽업 서비스도 준비되어 있어요.
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
            <li>카페 같은 무드의 라운지와 포토존</li>
            <li>야간 응급 협력 네트워크 운영</li>
          </ul>
          <a className="map__link" href="tel:0277771234">
            지금 바로 전화하기 02-7777-1234
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default MapSection;
