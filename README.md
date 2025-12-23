# Snake Reborn 🐍

현대적인 디자인의 모바일 웹 스네이크 게임

[![Deploy](https://github.com/[username]/earthworm-game-demo/actions/workflows/deploy.yml/badge.svg)](https://github.com/[username]/earthworm-game-demo/actions/workflows/deploy.yml)
[![CI](https://github.com/[username]/earthworm-game-demo/actions/workflows/ci.yml/badge.svg)](https://github.com/[username]/earthworm-game-demo/actions/workflows/ci.yml)

## 🎮 데모

**[게임 플레이하기](https://[username].github.io/earthworm-game-demo/)**

## ✨ 주요 기능

- 🎨 **현대적인 디자인**: 네온 그린 컬러와 미니멀한 UI
- 📱 **모바일 최적화**: 가상 조이스틱과 터치 컨트롤
- 🌓 **다크/라이트 모드**: 사용자 선호도에 따른 테마 전환
- 🎵 **사운드 효과**: 몰입감 있는 오디오 경험
- 📊 **점수 시스템**: 최고 점수 기록 및 통계
- 💾 **오프라인 지원**: PWA로 오프라인 플레이 가능
- ⚡ **부스트 기능**: 일시적 속도 증가
- 🎯 **난이도 조절**: 쉬움/보통/어려움 선택

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Rendering**: Canvas API
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **PWA**: Workbox
- **CI/CD**: GitHub Actions
- **Hosting**: GitHub Pages

## 📦 설치 및 실행

### 사전 요구사항

- Node.js 18.x 이상
- npm 또는 yarn

### 로컬 개발

```bash
# 저장소 클론
git clone https://github.com/[username]/earthworm-game-demo.git
cd earthworm-game-demo

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버가 `http://localhost:5173`에서 실행됩니다.

### 프로덕션 빌드

```bash
# 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 🧪 테스트

```bash
# 유닛 테스트
npm run test

# E2E 테스트
npm run test:e2e

# 린터
npm run lint

# 코드 포맷팅
npm run format
```

## 🚀 배포

이 프로젝트는 GitHub Actions를 통해 자동으로 배포됩니다.

### 자동 배포

`main` 브랜치에 push하면 자동으로 GitHub Pages에 배포됩니다:

```bash
git push origin main
```

자세한 내용은 [배포 가이드](docs/DEPLOYMENT.md)를 참조하세요.

## 📁 프로젝트 구조

```
earthworm-game-demo/
├── .github/
│   └── workflows/          # GitHub Actions 워크플로우
│       ├── deploy.yml      # 배포 워크플로우
│       └── ci.yml          # CI 워크플로우
├── docs/                   # 문서
│   ├── PRD.md             # 제품 요구사항 명세
│   ├── TECH_SPEC.md       # 기술 명세
│   └── DEPLOYMENT.md      # 배포 가이드
├── src/                    # 소스 코드
│   ├── index.html         # 메인 HTML
│   ├── main.js            # 엔트리 포인트
│   ├── styles/            # 스타일시트
│   ├── scripts/           # JavaScript 모듈
│   │   ├── core/          # 게임 코어 로직
│   │   ├── managers/      # 매니저 클래스
│   │   ├── ui/            # UI 컴포넌트
│   │   ├── components/    # 재사용 가능한 컴포넌트
│   │   └── utils/         # 유틸리티 함수
│   └── assets/            # 리소스 파일
│       ├── images/
│       ├── sounds/
│       └── icons/
├── public/                 # 정적 파일
│   ├── manifest.json      # PWA 매니페스트
│   └── sw.js             # Service Worker
├── tests/                  # 테스트 파일
│   ├── unit/
│   └── e2e/
├── vite.config.js         # Vite 설정
├── package.json
└── README.md
```

## 📖 문서

- [PRD (제품 요구사항 명세)](docs/PRD.md)
- [Tech Spec (기술 명세)](docs/TECH_SPEC.md)
- [Deployment Guide (배포 가이드)](docs/DEPLOYMENT.md)

## 🎮 게임 조작법

### 모바일
- **조이스틱**: 스네이크 방향 제어
- **부스트 버튼**: 일시적 속도 증가
- **일시정지 버튼**: 게임 일시정지

### 데스크톱
- **화살표 키** 또는 **WASD**: 스네이크 방향 제어
- **스페이스바**: 부스트
- **P**: 일시정지

## 🤝 기여하기

기여를 환영합니다! 다음 단계를 따라주세요:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 커밋 메시지 컨벤션

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 추가/수정
chore: 빌드 프로세스 또는 도구 변경
```

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 👥 제작자

- **Team** - [GitHub Profile](https://github.com/[username])

## 🙏 감사의 말

- [Tailwind CSS](https://tailwindcss.com/)
- [Google Fonts](https://fonts.google.com/)
- [Material Symbols](https://fonts.google.com/icons)
- [Vite](https://vitejs.dev/)

## 📞 문의

프로젝트 링크: [https://github.com/[username]/earthworm-game-demo](https://github.com/[username]/earthworm-game-demo)

---

⭐ 이 프로젝트가 마음에 드셨다면 Star를 눌러주세요!
