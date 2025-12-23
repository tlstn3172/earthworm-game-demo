# Earthworm Game Tasks

## Phase 1: 기본 구조 설정 ⏳

### 1.1 프로젝트 초기화
- [x] Node.js 프로젝트 설정 (`package.json`)
- [x] Vite 설정 (`vite.config.js`)
- [x] HTML 템플릿 작성 (`index.html`)

### 1.2 기본 스타일링
- [x] CSS 변수 설정 (`variables.css`)
- [x] 기본 스타일 작성 (`index.css`)
- [x] 애니메이션 정의 (`animations.css`)

---

## Phase 2: 코어 로직 구현 (TDD) ⏳

### 2.1 유틸리티 함수 (TDD 필수)
- [x] 테스트: `tests/unit/utils/helpers.test.js`
- [x] 구현: `src/scripts/utils/helpers.js`
- [x] 테스트: `tests/unit/utils/validators.test.js`
- [x] 구현: `src/scripts/utils/validators.js`
- [x] `constants.js` 작성

### 2.2 충돌 감지 시스템 (TDD 필수)
- [x] 테스트: `tests/unit/core/Collision.test.js`
- [x] 구현: `src/scripts/core/Collision.js`

### 2.3 스네이크 로직 (TDD 필수)
- [x] 테스트: `tests/unit/core/Snake.test.js`
- [x] 구현: `src/scripts/core/Snake.js`

### 2.4 먹이 시스템 (TDD 필수)
- [x] 테스트: `tests/unit/core/Food.test.js`
- [x] 구현: `src/scripts/core/Food.js`

### 2.5 장애물 시스템 (TDD 필수)
- [x] 테스트: `tests/unit/core/Obstacle.test.js`
- [x] 구현: `src/scripts/core/ObstacleManager.js`

### 2.6 게임 엔진 (TDD 필수)
- [x] 테스트: `tests/unit/core/GameEngine.test.js`
- [x] 구현: `src/scripts/core/GameEngine.js`

---

## Phase 3: 매니저 클래스 구현 (TDD) ⏳

### 3.1 상태 관리 (TDD 필수)
- [x] 테스트: `tests/unit/managers/StateManager.test.js`
- [x] 구현: `src/scripts/managers/StateManager.js`

### 3.2 로컬 스토리지 (TDD 필수)
- [x] 테스트: `tests/unit/managers/StorageManager.test.js`
- [x] 구현: `src/scripts/managers/StorageManager.js`

### 3.3 점수 관리 (TDD 필수)
- [x] 테스트: `tests/unit/managers/ScoreManager.test.js`
- [x] 구현: `src/scripts/managers/ScoreManager.js`

### 3.4 오디오 시스템 (TDD 필수)
- [x] 테스트: `tests/unit/managers/AudioManager.test.js`
- [x] 구현: `src/scripts/managers/AudioManager.js`

### 3.5 입력 시스템 (TDD 필수)
- [x] 테스트: `tests/unit/managers/InputManager.test.js`
- [x] 구현: `src/scripts/managers/InputManager.js`

---

## Phase 4: 통합 및 UI 구현 ⏳

### 4.1 게임 엔진 통합
- [x] 테스트: `GameEngine` 통합 테스트 (`GameEngineIntegration.test.js`)
  - [x] Manager 의존성 주입 테스트
  - [x] Input -> Snake 이동 연결 테스트
  - [x] Collision -> Score/State/Audio 연결 테스트
- [x] 구현: `GameEngine` 리팩토링 (Managers 주입)

### 4.2 UI 구현 및 연동
- [x] HTML 구조 개선 (`index.html`)
- [x] CSS 스타일링 (`styles/`)
- [x] UI 스크립트 작성 (`UIManager.js` 등)
- [x] `main.js` 최종 연결

---

## Phase 5: 추가 기능 및 최적화 (PRD) ⏳

### 5.1 부스트 기능
- [x] 테스트: `Snake.activateBoost()` 로직
  - [x] 속도 증가 테스트
  - [x] 쿨다운 테스트
- [x] 구현: `Snake.js` 부스트 로직
- [x] UI: 부스트 버튼 추가 및 이벤트 연결

### 5.2 설정 화면 구현
- [x] UI: 설정 화면 HTML/CSS 추가
- [x] 구현: 사운드/진동 토글 로직 연결
- [x] 연동: `StorageManager` 설정 저장/로드

### 5.3 햅틱 및 PWA 최적화
- [x] 구현: 햅틱 피드백 (`navigator.vibrate`)
- [x] 최적화: 모바일 터치 반응성 개선 (`touch-action`)

---

## Phase 6: 고급 설정 및 테마 (PRD 완료) ⏳

### 6.1 난이도 및 감도 설정
- [x] UI: 설정 화면에 난이도 버튼 및 감도 슬라이더 추가
- [x] 구현: `GameEngine` 속도 로직 변경 (Difficulty)
- [x] 구현: `InputManager` 터치 민감도(Threshold) 적용
- [x] 연동: `StorageManager` 설정 저장/로드

### 6.2 테마 시스템 (Dark/Light)
- [x] UI: 설정 화면에 테마 토글 추가
- [x] 스타일: CSS 변수를 활용한 Light Mode 정의
- [x] 구현: Theme switching logic (`index.css` & `main.js`)

---

## Phase 7: 최종 보완 (PRD 미구현 항목) ⏳

### 7.1 점수 공유 기능
- [x] UI: 게임 오버 화면에 '공유하기' 버튼 추가
- [x] 구현: Web Share API 연동 (`navigator.share`)
- [x] 구현: 클립보드 복사 폴백 처리

### 7.2 PWA 오프라인 지원
- [x] 구현: Service Worker 등록 (`sw.js`)
- [x] 설정: 에셋 캐싱 전략 (Offline First)

- [x] 검증: 오프라인 모드 테스트

---

## Phase 8: 배포 (Deployment) ⏳

### 8.1 GitHub Pages 설정
- [x] 설정: `vite.config.js` Base Path (`/earthworm-game-demo/`)
- [x] 자동화: GitHub Actions Workflow 생성 (`static.yml`)
- [x] 실행: GitHub Push 및 배포 확인


