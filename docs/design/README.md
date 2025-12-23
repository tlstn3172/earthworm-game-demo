# 디자인 파일

이 디렉토리에는 Snake Reborn 게임의 UI/UX 디자인 파일들이 포함되어 있습니다.

## 화면 구성

### 1. 시작 화면 (Start Screen)
- **위치**: `stitch_1/`
- **파일**: 
  - `screen.png` - 디자인 스크린샷
  - `code.html` - HTML/CSS 구현
- **주요 요소**:
  - 게임 로고 및 타이틀
  - 최고 점수 위젯
  - 게임 시작 버튼
  - 설정 버튼
  - 하단 툴바 (정보, 버전, 사운드)

### 2. 게임 오버 화면 (Game Over Screen)
- **위치**: `stitch_2/`
- **파일**:
  - `screen.png` - 디자인 스크린샷
  - `code.html` - HTML/CSS 구현
- **주요 요소**:
  - 게임 오버 타이틀
  - 최종 점수 카드
  - 다시 시작 버튼
  - 메인 메뉴 버튼
  - 점수 공유 버튼

### 3. 게임 플레이 화면 (Game Screen)
- **위치**: `stitch_3/`
- **파일**:
  - `screen.png` - 디자인 스크린샷
  - `code.html` - HTML/CSS 구현
- **주요 요소**:
  - 상단 HUD (점수, 타이머, 일시정지)
  - 게임 영역 (스네이크, 먹이, 장애물)
  - 가상 조이스틱
  - 부스트 버튼

### 4. 설정 화면 (Settings Screen)
- **위치**: `stitch_4/`
- **파일**:
  - `screen.png` - 디자인 스크린샷
  - `code.html` - HTML/CSS 구현
- **주요 요소**:
  - 사운드 설정 (효과음, 배경음악)
  - 게임 플레이 설정 (조작 감도, 난이도, 진동)
  - 설정 저장 버튼

## 디자인 시스템

### 컬러 팔레트
- **Primary**: `#7bf425` (네온 그린)
- **Primary Dark**: `#5ec315`
- **Background Light**: `#f7f8f5`
- **Background Dark**: `#172210`

### 타이포그래피
- **Font Family**: Spline Sans
- **Weights**: 300, 400, 500, 600, 700

### 아이콘
- **라이브러리**: Material Symbols Outlined

## 사용 방법

각 디렉토리의 `code.html` 파일을 브라우저에서 열면 해당 화면의 디자인을 확인할 수 있습니다.

```bash
# 예시: 시작 화면 확인
open docs/design/stitch_1/code.html
```

## 참고 문서

- [PRD (제품 요구사항)](../PRD.md) - 전체 화면 구성 및 기능 명세
- [Tech Spec (기술 명세)](../TECH_SPEC.md) - 디자인 시스템 상세 정보
