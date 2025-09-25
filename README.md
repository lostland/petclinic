# Purrfect Paws 동물병원 랜딩 페이지

젊은 세대가 선호하는 디자인과 인터랙션을 갖춘 동물병원 랜딩 페이지입니다. 귀여운 강아지와 고양이의 사진/영상 갤러리, 네이버 지도 연동, 문의 접수 및 관리자 대시보드를 포함하고 있습니다.

## 주요 기능

- 트렌디한 히어로 섹션과 스크롤 애니메이션
- 사진/영상 전환이 가능한 갤러리 및 후기 섹션
- 문의 폼을 통한 이름/전화번호/문의 내용 수집 및 SQLite 저장
- 관리자 로그인(세션 기반)으로 문의 내역 조회 및 상태/메모 업데이트
- 네이버 지도 임베드를 통한 위치 안내

## 시작하기

```bash
npm install
cp .env.example .env # 필요 시 환경변수 수정
npm start
```

기본적으로 서버는 `http://localhost:3000` 에서 실행됩니다.

## 관리자 계정

- 기본 아이디: `admin`
- 기본 비밀번호: `petclinic123!`

배포 환경에서는 `.env` 파일에 `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, `SESSION_SECRET`을 안전하게 설정하세요.

## 프로젝트 구조

```
.
├── server.js               # Express 서버 및 API
├── public/
│   ├── index.html          # 랜딩 페이지
│   ├── admin.html          # 관리자 페이지
│   ├── css/
│   │   ├── styles.css      # 메인 스타일
│   │   └── admin.css       # 관리자 전용 스타일
│   └── js/
│       ├── main.js         # 랜딩 페이지 스크립트
│       └── admin.js        # 관리자 대시보드 스크립트
└── data/
    └── petclinic.db        # 문의 데이터베이스 (실행 시 자동 생성)
```

## 라이선스

이 프로젝트는 학습 및 데모 목적의 예제입니다.
