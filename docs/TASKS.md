# 개발 작업 목록 (Development Tasks)

> **프로젝트**: Snake Reborn  
> **버전**: 1.0.0  
> **최종 업데이트**: 2025-12-24

---

## 📋 작업 진행 상태

- ✅ 완료
- 🚧 진행 중
- ⏳ 대기 중
- ❌ 차단됨

---

## Phase 0: 프로젝트 초기 설정 ✅

### 문서화
- [x] PRD 작성
- [x] Tech Spec 작성
- [x] 배포 가이드 작성
- [x] 개발 규칙 정의 (TDD, SOLID)
- [x] 프로젝트 구조 문서화

### 인프라 설정
- [x] GitHub Actions 워크플로우 설정
- [x] GitHub Pages 배포 설정
- [x] package.json 구성
- [x] .gitignore 설정

---

## Phase 1: 개발 환경 구축 ⏳

### 1.1 프로젝트 초기화

#### 1.1.1 의존성 설치
- [ ] `package.json` 확인
- [ ] `npm install` 실행
- [ ] 설치 완료 확인 (`node_modules/` 생성)

#### 1.1.2 Vite 설정
- [ ] `vite.config.js` 생성
  - [ ] base URL 설정 (GitHub Pages용)
  - [ ] build 옵션 설정
  - [ ] PWA 플러그인 설정
  - [ ] dev server 포트 설정 (5173)
- [ ] 설정 테스트: `npm run dev` 실행

#### 1.1.3 ESLint 설정
- [ ] `.eslintrc.js` 생성
  - [ ] ES6+ 파서 설정
  - [ ] 환경 설정 (browser, es2021)
  - [ ] 규칙 설정 (권장 규칙)
- [ ] 테스트: `npm run lint` 실행

#### 1.1.4 Prettier 설정
- [ ] `.prettierrc` 생성
  - [ ] 탭 크기: 2
  - [ ] 세미콜론: true
  - [ ] 따옴표: single
  - [ ] 줄 길이: 100
- [ ] 테스트: `npm run format` 실행

#### 1.1.5 Vitest 설정
- [ ] `vitest.config.js` 생성
  - [ ] globals 활성화
  - [ ] environment: jsdom
  - [ ] coverage 설정
- [ ] 테스트: `npm run test` 실행

### 1.2 디렉토리 구조 생성
- [ ] `src/` 디렉토리 생성
- [ ] `src/scripts/core/` 생성
- [ ] `src/scripts/managers/` 생성
- [ ] `src/scripts/ui/` 생성
- [ ] `src/scripts/components/` 생성
- [ ] `src/scripts/utils/` 생성
- [ ] `src/styles/` 생성
- [ ] `src/assets/` 생성
- [ ] `tests/unit/` 생성
- [ ] `tests/integration/` 생성
- [ ] `public/` 생성

### 1.3 기본 파일 생성
- [ ] `src/index.html` - 메인 HTML
- [ ] `src/main.js` - 엔트리 포인트
- [ ] `src/styles/index.css` - 글로벌 스타일
- [ ] `src/styles/variables.css` - CSS 변수
- [ ] `src/styles/animations.css` - 애니메이션

---

## Phase 2: 코어 로직 구현 (TDD) ⏳

### 2.1 유틸리티 함수 (TDD 필수)

#### 2.1.1 상수 정의
- [ ] `src/scripts/utils/constants.js` 작성
  - [ ] 게임 설정 상수 (GAME_CONFIG)
  - [ ] 컬러 상수 (COLORS)
  - [ ] 난이도 설정 (DIFFICULTY)
  - [ ] 점수 값 (SCORE_VALUES)

#### 2.1.2 헬퍼 함수 (TDD)
- [ ] 테스트: `tests/unit/utils/helpers.test.js`
- [ ] 구현: `src/scripts/utils/helpers.js`
  - [ ] `randomPosition()` - 랜덤 위치 생성
  - [ ] `isValidPosition()` - 위치 유효성 검사
  - [ ] `calculateDistance()` - 거리 계산
  - [ ] `formatTime()` - 시간 포맷팅
  - [ ] `formatScore()` - 점수 포맷팅

#### 2.1.3 검증 함수 (TDD)
- [ ] 테스트: `tests/unit/utils/validators.test.js`
- [ ] 구현: `src/scripts/utils/validators.js`
  - [ ] `validateScore()` - 점수 유효성
  - [ ] `validateSettings()` - 설정 유효성
  - [ ] `sanitizeString()` - 문자열 정제

### 2.2 충돌 감지 시스템 (TDD 필수)

- [ ] 테스트: `tests/unit/core/Collision.test.js`
  - [ ] 점 충돌 테스트
  - [ ] 사각형 충돌 테스트
  - [ ] 경계값 테스트
- [ ] 구현: `src/scripts/core/Collision.js`
  - [ ] `pointsCollide()` - 점 충돌
  - [ ] `pointRectCollide()` - 점-사각형 충돌
  - [ ] `checkFoodCollision()` - 먹이 충돌
  - [ ] `checkObstacleCollision()` - 장애물 충돌
  - [ ] `checkWallCollision()` - 벽 충돌
  - [ ] `checkAllCollisions()` - 전체 충돌

### 2.3 스네이크 로직 (TDD 필수)

- [ ] 테스트: `tests/unit/core/Snake.test.js`
  - [ ] 초기화 테스트
  - [ ] 이동 테스트
  - [ ] 방향 변경 테스트 (반대 방향 금지)
  - [ ] 성장 테스트
  - [ ] 부스트 테스트
  - [ ] 자기 충돌 테스트
- [ ] 구현: `src/scripts/core/Snake.js`
  - [ ] `constructor()` - 초기화
  - [ ] `setDirection()` - 방향 설정
  - [ ] `move()` - 이동
  - [ ] `grow()` - 성장
  - [ ] `activateBoost()` - 부스트
  - [ ] `checkSelfCollision()` - 자기 충돌
  - [ ] `update()` - 업데이트
  - [ ] `render()` - 렌더링

### 2.4 먹이 시스템 (TDD 필수)

- [ ] 테스트: `tests/unit/core/Food.test.js`
  - [ ] 생성 테스트
  - [ ] 랜덤 위치 테스트
  - [ ] 유효한 위치 테스트
- [ ] 구현: `src/scripts/core/Food.js`
  - [ ] `constructor()` - 초기화
  - [ ] `spawn()` - 생성
  - [ ] `render()` - 렌더링

### 2.5 장애물 시스템 (TDD 필수)

- [ ] 테스트: `tests/unit/core/Obstacle.test.js`
  - [ ] 생성 테스트
  - [ ] 위치 검증 테스트
- [ ] 구현: `src/scripts/core/Obstacle.js`
  - [ ] `constructor()` - 초기화
  - [ ] `render()` - 렌더링

### 2.6 게임 엔진 (TDD 필수)

#### 2.6.1 게임 초기화 및 설정
- [ ] 테스트: `tests/unit/core/Game.test.js` - 초기화
  - [ ] Canvas 설정 테스트
  - [ ] 초기 상태 검증 (idle)
  - [ ] 엔티티 배열 초기화 테스트
  - [ ] 설정 객체 적용 테스트
- [ ] 구현: `constructor()` 및 `init()`
  - [ ] Canvas context 설정
  - [ ] 초기 상태 설정
  - [ ] Snake, Food, Obstacles 생성
  - [ ] 이벤트 바인딩

#### 2.6.2 게임 루프 구현
- [ ] 테스트: 게임 루프 테스트
  - [ ] requestAnimationFrame 호출 테스트
  - [ ] deltaTime 계산 테스트
  - [ ] FPS 제한 테스트 (60 FPS)
  - [ ] 상태별 루프 동작 테스트
- [ ] 구현: `gameLoop()`
  - [ ] 타임스탬프 처리
  - [ ] deltaTime 계산
  - [ ] FPS 제한 로직
  - [ ] update/render 호출

#### 2.6.3 상태 업데이트
- [ ] 테스트: 업데이트 로직
  - [ ] 스네이크 업데이트 호출 테스트
  - [ ] 충돌 감지 호출 테스트
  - [ ] 점수 업데이트 테스트
  - [ ] 타이머 업데이트 테스트
- [ ] 구현: `update(deltaTime)`
  - [ ] 엔티티 업데이트
  - [ ] 충돌 체크
  - [ ] 게임 상태 업데이트

#### 2.6.4 렌더링
- [ ] 테스트: 렌더링 테스트
  - [ ] Canvas 클리어 테스트
  - [ ] 그리드 렌더링 테스트
  - [ ] 엔티티 렌더링 순서 테스트
- [ ] 구현: `render()`
  - [ ] Canvas 클리어
  - [ ] 배경 그리드 렌더링
  - [ ] 장애물 렌더링
  - [ ] 먹이 렌더링
  - [ ] 스네이크 렌더링

#### 2.6.5 게임 상태 제어
- [ ] 테스트: 상태 전환 테스트
  - [ ] idle → playing 전환
  - [ ] playing → paused 전환
  - [ ] paused → playing 전환
  - [ ] playing → gameover 전환
- [ ] 구현: 상태 제어 메서드
  - [ ] `start()` - 게임 시작
  - [ ] `pause()` - 일시정지
  - [ ] `resume()` - 재개
  - [ ] `gameOver()` - 게임 오버
  - [ ] `reset()` - 리셋

#### 2.6.6 충돌 처리 통합
- [ ] 테스트: 충돌 처리 통합
  - [ ] 먹이 충돌 → 점수 증가 + 성장
  - [ ] 벽 충돌 → 게임 오버
  - [ ] 장애물 충돌 → 게임 오버
  - [ ] 자기 충돌 → 게임 오버
- [ ] 구현: `checkCollisions()`
  - [ ] 충돌 감지기 호출
  - [ ] 충돌 결과 처리
  - [ ] 게임 오버 트리거

---

## Phase 3: 매니저 클래스 구현 (TDD) ⏳

### 3.1 상태 관리 (TDD 필수)

- [ ] 테스트: `tests/unit/managers/StateManager.test.js`
  - [ ] 상태 전환 테스트
  - [ ] 상태 검증 테스트
- [ ] 구현: `src/scripts/managers/StateManager.js`
  - [ ] State Machine 구현
  - [ ] `transition()` - 상태 전환
  - [ ] `update()` - 상태 업데이트

### 3.2 로컬 스토리지 (TDD 필수)

- [ ] 테스트: `tests/unit/managers/StorageManager.test.js`
  - [ ] 저장 테스트
  - [ ] 로드 테스트
  - [ ] 최고 점수 업데이트 테스트
  - [ ] 설정 업데이트 테스트
- [ ] 구현: `src/scripts/managers/StorageManager.js`
  - [ ] `load()` - 데이터 로드
  - [ ] `save()` - 데이터 저장
  - [ ] `updateBestScore()` - 최고 점수
  - [ ] `updateSettings()` - 설정
  - [ ] `updateStats()` - 통계
  - [ ] `reset()` - 초기화

### 3.3 점수 관리 (TDD 필수)

- [ ] 테스트: `tests/unit/managers/ScoreManager.test.js`
  - [ ] 점수 추가 테스트
  - [ ] 점수 조회 테스트
  - [ ] 점수 리셋 테스트
- [ ] 구현: `src/scripts/managers/ScoreManager.js`
  - [ ] `addScore()` - 점수 추가
  - [ ] `getScore()` - 점수 조회
  - [ ] `resetScore()` - 점수 리셋
  - [ ] `getBestScore()` - 최고 점수 조회

### 3.4 오디오 관리 (TDD 필수 - 로직 부분)

- [ ] 테스트: `tests/unit/managers/AudioManager.test.js`
  - [ ] 사운드 로드 테스트
  - [ ] 사운드 재생 테스트 (Mock)
  - [ ] 설정 업데이트 테스트
- [ ] 구현: `src/scripts/managers/AudioManager.js`
  - [ ] `loadSound()` - 사운드 로드
  - [ ] `playSound()` - 사운드 재생
  - [ ] `playMusic()` - 배경음악 재생
  - [ ] `stopMusic()` - 배경음악 정지
  - [ ] `updateSettings()` - 설정 업데이트

### 3.5 입력 관리 (TDD 필수 - 로직 부분)

- [ ] 테스트: `tests/unit/managers/InputManager.test.js`
  - [ ] 방향 업데이트 테스트
  - [ ] Deadzone 테스트
  - [ ] 키보드 입력 테스트
- [ ] 구현: `src/scripts/managers/InputManager.js`
  - [ ] `bindEvents()` - 이벤트 바인딩
  - [ ] `handleTouchStart()` - 터치 시작
  - [ ] `handleTouchMove()` - 터치 이동
  - [ ] `handleTouchEnd()` - 터치 종료
  - [ ] `handleKeyDown()` - 키보드 입력
  - [ ] `updateDirection()` - 방향 업데이트
  - [ ] `updateJoystickVisual()` - 조이스틱 시각화

---

## Phase 4: UI 컴포넌트 구현 ⏳

### 4.1 기본 컴포넌트

#### 4.1.1 버튼 컴포넌트
- [ ] `src/scripts/components/Button.js`
  - [ ] Primary 버튼
  - [ ] Secondary 버튼
  - [ ] 아이콘 버튼
  - [ ] 호버/액티브 상태

#### 4.1.2 점수 카드
- [ ] `src/scripts/components/ScoreCard.js`
  - [ ] 점수 표시
  - [ ] 애니메이션
  - [ ] 최고 점수 배지

#### 4.1.3 가상 조이스틱
- [ ] `src/scripts/components/Joystick.js`
  - [ ] 조이스틱 베이스
  - [ ] 썸 렌더링
  - [ ] 터치 이벤트 처리

### 4.2 화면 컴포넌트

#### 4.2.1 화면 베이스 클래스
- [ ] `src/scripts/ui/Screen.js`
  - [ ] `show()` - 화면 표시
  - [ ] `hide()` - 화면 숨김
  - [ ] `render()` - 렌더링

#### 4.2.2 시작 화면
- [ ] `src/scripts/ui/StartScreen.js` 구조 설계
  - [ ] 클래스 정의 (extends Screen)
  - [ ] DOM 요소 참조 저장
- [ ] 로고 및 타이틀 렌더링
  - [ ] 배경 이미지 설정
  - [ ] "SNAKE REBORN" 텍스트
  - [ ] 네온 그린 강조 효과
- [ ] 최고 점수 위젯
  - [ ] StorageManager에서 점수 로드
  - [ ] 트로피 아이콘 + 점수 표시
  - [ ] 애니메이션 효과
- [ ] 게임 시작 버튼
  - [ ] Primary 버튼 스타일
  - [ ] 펄스 애니메이션
  - [ ] 클릭 이벤트 → 게임 화면 전환
- [ ] 설정 버튼
  - [ ] Secondary 버튼 스타일
  - [ ] 클릭 이벤트 → 설정 화면 전환
- [ ] 하단 툴바
  - [ ] 정보 버튼
  - [ ] 버전 정보 표시
  - [ ] 사운드 토글 버튼

#### 4.2.3 게임 화면
- [ ] `src/scripts/ui/GameScreen.js`
  - [ ] 상단 HUD (점수, 타이머, 일시정지)
  - [ ] Canvas 영역
  - [ ] 가상 조이스틱
  - [ ] 부스트 버튼

#### 4.2.4 게임 오버 화면
- [ ] `src/scripts/ui/GameOverScreen.js`
  - [ ] 게임 오버 타이틀
  - [ ] 최종 점수 카드
  - [ ] 다시 시작 버튼
  - [ ] 메인 메뉴 버튼
  - [ ] 점수 공유 버튼

#### 4.2.5 설정 화면
- [ ] `src/scripts/ui/SettingsScreen.js`
  - [ ] 사운드 설정
  - [ ] 게임 플레이 설정
  - [ ] 설정 저장 버튼

---

## Phase 5: 스타일링 ⏳

### 5.1 CSS 변수 설정
- [ ] `src/styles/variables.css`
  - [ ] 컬러 팔레트
  - [ ] 타이포그래피
  - [ ] 간격 시스템
  - [ ] Border radius
  - [ ] 그림자 효과

### 5.2 글로벌 스타일
- [ ] `src/styles/index.css`
  - [ ] 리셋 스타일
  - [ ] 기본 타이포그래피
  - [ ] 그리드 패턴
  - [ ] 스크롤바 커스터마이징

### 5.3 애니메이션
- [ ] `src/styles/animations.css`
  - [ ] Pulse 애니메이션
  - [ ] Fade in/out
  - [ ] Slide 애니메이션
  - [ ] Scale 애니메이션

---

## Phase 6: 통합 및 테스트 ⏳

### 6.1 통합 테스트

#### 6.1.1 게임 플로우 테스트
- [ ] `tests/integration/GameFlow.test.js`
  - [ ] 시작 화면 → 게임 시작 버튼 클릭
  - [ ] 게임 초기화 확인 (스네이크, 먹이 생성)
  - [ ] 게임 루프 시작 확인
  - [ ] 게임 오버 조건 트리거
  - [ ] 게임 오버 화면 전환 확인

#### 6.1.2 먹이 시스템 통합 테스트
- [ ] `tests/integration/FoodSystem.test.js`
  - [ ] 먹이 생성 위치 검증
  - [ ] 스네이크가 먹이에 도달
  - [ ] 충돌 감지 확인
  - [ ] 점수 증가 확인 (ScoreManager)
  - [ ] 스네이크 길이 증가 확인
  - [ ] 새 먹이 생성 확인

#### 6.1.3 충돌 시스템 통합 테스트
- [ ] `tests/integration/CollisionSystem.test.js`
  - [ ] 벽 충돌 → 게임 오버
  - [ ] 장애물 충돌 → 게임 오버
  - [ ] 자기 충돌 → 게임 오버
  - [ ] 게임 오버 시 점수 저장 확인
  - [ ] 최고 점수 업데이트 확인

#### 6.1.4 설정 시스템 통합 테스트
- [ ] `tests/integration/SettingsSystem.test.js`
  - [ ] 설정 화면 열기
  - [ ] 설정 값 변경 (난이도, 사운드 등)
  - [ ] 설정 저장 버튼 클릭
  - [ ] StorageManager에 저장 확인
  - [ ] 페이지 새로고침 후 설정 로드 확인
  - [ ] 게임에 설정 적용 확인

### 6.2 E2E 테스트 (Playwright)

> **참고**: E2E 테스트는 코어 로직 통합 검증에만 사용하며, UI 자동화는 하지 않습니다.

- [ ] `tests/e2e/core-integration.spec.js`
  - [ ] 게임 시작 → 코어 로직 초기화 확인
  - [ ] 키보드 입력 → 스네이크 이동 확인
  - [ ] 먹이 충돌 → 점수 증가 확인
  - [ ] 게임 오버 → 점수 저장 확인
  - [ ] 설정 변경 → 로컬 스토리지 확인

### 6.3 성능 테스트
- [ ] 프레임레이트 측정
- [ ] 메모리 사용량 확인
- [ ] 로딩 시간 측정

---

## Phase 7: 리소스 및 PWA ⏳

### 7.1 에셋 준비
- [ ] 사운드 파일
  - [ ] `eat.mp3` - 먹이 먹는 소리
  - [ ] `gameover.mp3` - 게임 오버 소리
  - [ ] `boost.mp3` - 부스트 소리
  - [ ] `click.mp3` - 버튼 클릭 소리
- [ ] 아이콘
  - [ ] `icon-192.png` - PWA 아이콘
  - [ ] `icon-512.png` - PWA 아이콘
  - [ ] `favicon.ico` - 파비콘

### 7.2 PWA 설정
- [ ] `public/manifest.json` 작성
  - [ ] 앱 이름 및 설명
  - [ ] 아이콘 설정
  - [ ] 테마 컬러
  - [ ] 디스플레이 모드
- [ ] `public/sw.js` 작성
  - [ ] 캐시 전략
  - [ ] 오프라인 지원
  - [ ] 업데이트 처리

---

## Phase 8: 최적화 및 폴리싱 ⏳

### 8.1 성능 최적화
- [ ] 코드 스플리팅
- [ ] 번들 크기 최적화
- [ ] 이미지 최적화
- [ ] Lazy loading 구현

### 8.2 접근성 개선
- [ ] ARIA 레이블 추가
- [ ] 키보드 네비게이션
- [ ] 색상 대비 확인
- [ ] 포커스 인디케이터

### 8.3 크로스 브라우저 테스트
- [ ] Chrome 테스트
- [ ] Firefox 테스트
- [ ] Safari 테스트
- [ ] Mobile Safari 테스트
- [ ] Chrome Mobile 테스트

### 8.4 반응형 디자인
- [ ] 모바일 최적화
- [ ] 태블릿 지원
- [ ] 데스크톱 지원

---

## Phase 9: 배포 및 모니터링 ⏳

### 9.1 배포 준비
- [ ] 프로덕션 빌드 테스트
- [ ] 환경 변수 설정
- [ ] GitHub Pages 설정 확인

### 9.2 모니터링 설정
- [ ] 에러 트래킹 구현
- [ ] 성능 모니터링 구현
- [ ] 사용자 분석 (선택)

### 9.3 문서 업데이트
- [ ] README 업데이트
- [ ] CHANGELOG 작성
- [ ] API 문서 (필요시)

---

## Phase 10: 추가 기능 (선택) ⏳

### 10.1 게임 모드
- [ ] 타임 어택 모드
- [ ] 서바이벌 모드
- [ ] 클래식 모드

### 10.2 소셜 기능
- [ ] 리더보드
- [ ] 점수 공유 (SNS)
- [ ] 친구 초대

### 10.3 커스터마이징
- [ ] 스네이크 스킨
- [ ] 테마 변경
- [ ] 배경 선택

---

## 우선순위 가이드

### 🔴 High Priority (Phase 1-3)
코어 로직 및 기본 기능 구현

### 🟡 Medium Priority (Phase 4-6)
UI 구현 및 통합 테스트

### 🟢 Low Priority (Phase 7-9)
리소스, PWA, 최적화

### ⚪ Optional (Phase 10)
추가 기능

---

## 개발 규칙 준수 체크리스트

각 작업 완료 시 확인:

### TDD
- [ ] 테스트를 먼저 작성했는가?
- [ ] Red-Green-Refactor 사이클을 따랐는가?
- [ ] 커버리지 목표를 달성했는가?

### SOLID
- [ ] 단일 책임 원칙 (SRP)
- [ ] 개방-폐쇄 원칙 (OCP)
- [ ] 리스코프 치환 원칙 (LSP)
- [ ] 인터페이스 분리 원칙 (ISP)
- [ ] 의존성 역전 원칙 (DIP)

### 코드 품질
- [ ] ESLint 통과
- [ ] Prettier 포맷팅
- [ ] 코드 리뷰 완료

---

## 진행 상황 추적

**전체 진행률**: 13/200+ 작업 (6.5%)

- Phase 0: ✅ 13/13 (100%)
- Phase 1: ⏳ 0/26 (0%)
  - 1.1: 0/15 (프로젝트 초기화)
  - 1.2: 0/11 (디렉토리 구조)
- Phase 2: ⏳ 0/60 (0%)
  - 2.1: 0/12 (유틸리티)
  - 2.2: 0/9 (충돌 감지)
  - 2.3: 0/14 (스네이크)
  - 2.4: 0/6 (먹이)
  - 2.5: 0/4 (장애물)
  - 2.6: 0/30 (게임 엔진)
- Phase 3: ⏳ 0/32 (0%)
  - 3.1: 0/5 (상태 관리)
  - 3.2: 0/10 (스토리지)
  - 3.3: 0/7 (점수 관리)
  - 3.4: 0/8 (오디오)
  - 3.5: 0/10 (입력 관리)
- Phase 4: ⏳ 0/35 (0%)
  - 4.1: 0/12 (기본 컴포넌트)
  - 4.2: 0/23 (화면 컴포넌트)
- Phase 5: ⏳ 0/14 (0%)
- Phase 6: ⏳ 0/28 (0%)
  - 6.1: 0/20 (통합 테스트)
  - 6.2: 0/5 (E2E 테스트)
  - 6.3: 0/3 (성능 테스트)
- Phase 7: ⏳ 0/11 (0%)
- Phase 8: ⏳ 0/12 (0%)
- Phase 9: ⏳ 0/9 (0%)
- Phase 10: ⏳ 0/9 (0%)

---

## 다음 작업

**즉시 시작 가능:**
1. Phase 1.1: 프로젝트 초기화
2. Phase 1.2: 디렉토리 구조 생성
3. Phase 1.3: 기본 파일 생성

**권장 순서:**
Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6 → Phase 7 → Phase 8 → Phase 9

---

## 참고 문서

- [PRD](./PRD.md) - 제품 요구사항
- [Tech Spec](./TECH_SPEC.md) - 기술 명세
- [TDD 규칙](./rules/TDD.md) - TDD 가이드
- [SOLID 원칙](./rules/SOLID.md) - SOLID 가이드
- [프로젝트 구조](./PROJECT_STRUCTURE.md) - 디렉토리 구조
