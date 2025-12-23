# 🐍 Snake Reborn: Modern Web Game Project

[![Deploy](https://github.com/tlstn3172/earthworm-game-demo/actions/workflows/deploy.yml/badge.svg)](https://github.com/tlstn3172/earthworm-game-demo/actions/workflows/deploy.yml)
[![CI](https://github.com/tlstn3172/earthworm-game-demo/actions/workflows/ci.yml/badge.svg)](https://github.com/tlstn3172/earthworm-game-demo/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **"고전의 현대적 재해석, 원칙 있는 엔지니어링으로 구현하다"**

**[🎮 플레이 하기 (Demo)](https://tlstn3172.github.io/earthworm-game-demo/)**

---

## 📖 프로젝트 개요

**Snake Reborn**은 단순한 게임 클론 코딩이 아닙니다. 이 프로젝트의 핵심 목표는 **"견고한 소프트웨어 아키텍처와 엔지니어링 원칙을 프론트엔드 게임 개발에 적용하는 것"**이었습니다.

프레임워크의 도움 없이 **Vanilla JavaScript**와 **Canvas API**만으로 코어 로직을 구현하여 언어의 본질적인 이해도를 높였으며, 게임 루프 최적화부터 PWA 오프라인 지원까지 웹 기술의 깊이 있는 활용을 보여줍니다.

### 🎯 핵심 목표
- **Zero-Dependency Core**: 게임 엔진과 로직을 라이브러리 없이 순수 JS로 구현
- **Test-Driven Compatibility**: TDD 방법론을 통한 안정적인 코어 로직 구축 (커버리지 90%+)
- **Software Craftsmanship**: SOLID 원칙 준수 및 클린 코드 지향
- **Modern UX**: 60FPS 부드러운 애니메이션과 모바일 최적화 (터치/조이스틱)

---

## 🏗️ 아키텍처 (Architecture)

이 프로젝트는 **관심사의 분리(Separation of Concerns)**를 위해 엄격한 4계층 아키텍처(4-Tier Architecture)를 채택했습니다. 각 계층은 단방향 의존성만을 가지며, 이를 통해 유지보수성과 테스트 용이성을 확보했습니다.

```mermaid
graph TD
    subgraph Presentation ["Presentation Layer (UI/View)"]
        UI[Start/Game/Over Screens]
        Canvas[Canvas Rendering]
        Components[Joystick/ScoreCard]
    end

    subgraph Application ["Application Layer (Managers)"]
        GameEngine[Game Engine]
        InputMgr[Input Manager]
        AudioMgr[Audio Manager]
        StateMgr[State Manager]
    end

    subgraph Core ["Core Layer (Domain Logic)"]
        Snake[Snake Entity]
        Food[Food System]
        Collision[Collision Detection]
        Physics[Physics/Movement]
    end

    subgraph Data ["Data Layer (Persistence)"]
        Storage[Storage Manager]
        Config[Game Config]
    end

    Presentation --> Application
    Application --> Core
    Application --> Data
    Core -.-> Data : Read Only
```

### 아키텍처 설계 의도
1.  **Presentation Layer**: 사용자와 상호작용하며 렌더링만 담당합니다. 비즈니스 로직을 전혀 포함하지 않습니다.
2.  **Application Layer**: 게임의 흐름(Flow)과 상태(State)를 관리합니다. UI와 코어 로직 사이의 오케스트레이션 역할을 합니다.
3.  **Core Layer**: 순수한 게임 규칙과 물리 법칙이 존재하는 곳입니다. 이 계층은 외부 라이브러리 의존성이 적어 **유닛 테스트(Unit Testing)**가 가장 활발하고 용이합니다.
4.  **Data Layer**: 사용자 설정과 최고 점수 등 영속성 데이터를 관리합니다.

---

## 🛠️ 기술적 특징 (Technical Highlights)

### 1. TDD 기반의 코어 로직 구현
게임의 핵심 로직(이동, 충돌, 성장 등)은 철저하게 **Red-Green-Refactor** 사이클을 통해 구현되었습니다. 이를 통해 사이드 이펙트 없는 안정적인 게임 엔진을 구축했습니다.

- **Unit Test**: Vitest를 사용하여 비즈니스 로직 검증
- **Integration Test**: 주요 게임 시나리오 검증
- **E2E Test**: Playwright를 이용한 핵심 사용자 플로우 검증

### 2. SOLID 원칙 적용 사례
- **SRP (단일 책임 원칙)**: `Snake` 클래스는 이동만, `Renderer`는 그리기만, `InputManager`는 입력만 처리합니다.
- **OCP (개방-폐쇄 원칙)**: 새로운 장애물 타입이나 아이템이 추가되어도 기존 렌더링 로직을 수정하지 않도록 인터페이스를 설계했습니다.
- **DIP (의존성 역전 원칙)**: 고수준 모듈(GameEngine)이 저수준 모듈(Canvas API)에 직접 의존하지 않고, 추상화된 메서드를 통해 통신합니다.

### 3. 성능 최적화 (Performance)
- **Object Pooling**: 빈번하게 생성/삭제되는 파티클 효과에 객체 풀링 패턴을 적용하여 GC(Garbage Collection) 오버헤드 최소화.
- **Double Buffering**: 깜빡임 없는 부드러운 렌더링을 위해 Off-screen Canvas 활용.
- **60FPS Guarantee**: `requestAnimationFrame`과 `deltaTime`을 활용한 프레임 독립적인 이동 로직 구현.

### 4. PWA (Progressive Web App)
- **Offline First**: Service Worker를 통한 리소스 캐싱으로 오프라인에서도 플레이 가능.
- **App-like Experience**: 모바일 홈 화면에 설치 가능하며 네이티브 앱과 유사한 경험 제공.

---

## 💻 기술 스택 (Tech Stack)

| Category | Technology | Usage |
|----------|------------|-------|
| **Core** | ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) | Game Logic, Vanilla JS (ES6+) |
| **Rendering** | HTML5 Canvas API | High-performance 2D Rendering |
| **Styling** | ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white) | Utility-first CSS for UI Components |
| **Build** | ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white) | Fast Build & Hot Module Replacement |
| **Testing** | ![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white) ![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white) | Unit & E2E Testing |
| **CI/CD** | ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=github-actions&logoColor=white) | Automated Testing & Deployment |

---

## 🚀 시작하기 (Getting Started)

### 요구사항
- Node.js 18.0.0 이상
- npm 9.0.0 이상

### 설치 및 실행

```bash
# Clone Repository
git clone https://github.com/tlstn3172/earthworm-game-demo.git

# Install Dependencies
npm install

# Run Dev Server
npm run dev
```

### 테스트 실행

```bash
# Run Unit Tests
npm run test

# Check Coverage
npm run test -- --coverage
```

---

## 📬 Contact

- **Name**: [Your Name]
- **Email**: [Your Email]
- **Portfolio**: [Link to Portfolio]
- **GitHub**: [Link to GitHub Profile]

---

<p align="center">
  Crafted with ❤️ and Code
</p>
