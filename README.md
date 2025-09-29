# 서울 펫 클리닉 센터 랜딩 페이지

서울 펫 클리닉 센터의 감성적인 랜딩 페이지와 문의 접수를 위한 백엔드 서버입니다. 프론트엔드는 Vite + React + TypeScript로 작성되었고, 문의 데이터는 SQLite 데이터베이스에 저장됩니다.

## 주요 기능

- 프레이머 모션을 활용한 다이나믹 애니메이션과 파스텔 무드의 디자인
- 반려동물과 공간의 사랑스러운 이미지를 강조한 갤러리 섹션
- 문의 내용을 SQLite DB에 저장하는 API 연동 문의 폼
- 네이버 지도 API(ncpKeyId=454vo4765n)를 활용한 병원 위치 안내
- 모바일 친화적인 반응형 레이아웃과 플로팅 CTA 버튼

## 개발 환경 준비

```bash
npm install
```

## 개발 서버 실행

프론트엔드와 백엔드가 동시에 실행됩니다.

```bash
npm run dev
```

- 프론트엔드: http://localhost:5173
- 백엔드 API: http://localhost:3001/api/inquiries

## 프로덕션 빌드

```bash
npm run build
```

빌드 후에는 다음 명령으로 서버를 실행할 수 있습니다.

```bash
npm start
```

## 문의 데이터 확인

`server/data/inquiries.db` 파일은 SQLite 데이터베이스입니다. 원하는 도구를 사용해 테이블(`inquiries`)을 조회할 수 있습니다.
