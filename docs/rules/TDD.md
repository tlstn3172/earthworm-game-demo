# Test-Driven Development (TDD) 규칙

## 개요

이 프로젝트의 **코어 로직**은 반드시 **Test-Driven Development (TDD)** 방식으로 구현해야 합니다.

> **중요:** UI 컴포넌트는 TDD 적용 대상이 아닙니다. 코어 로직(게임 엔진, 비즈니스 로직)에만 적용됩니다.

---

## TDD 적용 범위

### ✅ TDD 필수 적용 (코어 로직)

다음 디렉토리의 모든 코드는 TDD로 작성해야 합니다:

- `src/scripts/core/` - 게임 코어 로직
  - `Game.js` - 게임 엔진
  - `Snake.js` - 스네이크 로직
  - `Food.js` - 먹이 시스템
  - `Obstacle.js` - 장애물 시스템
  - `Collision.js` - 충돌 감지

- `src/scripts/managers/` - 매니저 클래스
  - `StateManager.js` - 상태 관리
  - `StorageManager.js` - 로컬 스토리지
  - `ScoreManager.js` - 점수 관리
  - `AudioManager.js` - 오디오 관리 (로직 부분)
  - `InputManager.js` - 입력 처리 (로직 부분)

- `src/scripts/utils/` - 유틸리티 함수
  - `helpers.js` - 헬퍼 함수
  - `validators.js` - 유효성 검사

### ❌ TDD 미적용 (UI 레이어)

**UI 컴포넌트는 자동화된 테스트를 작성하지 않습니다:**

- `src/scripts/ui/` - UI 화면 컴포넌트 (수동 테스트)
- `src/scripts/components/` - UI 컴포넌트 (수동 테스트)
- `src/styles/` - 스타일시트 (시각적 검증)

> **참고**: UI는 브라우저에서 직접 확인하며, E2E 테스트도 코어 로직 통합에만 집중합니다.

---

## Red-Green-Refactor 사이클

### 1️⃣ Red (실패하는 테스트 작성)

```javascript
test('should initialize with correct starting position', () => {
  expect(snake.body.length).toBe(3);
  expect(snake.body[0]).toEqual({ x: 100, y: 100 });
});
```

### 2️⃣ Green (최소한의 코드로 테스트 통과)

```javascript
export class Snake {
  constructor(startX, startY, gridSize) {
    this.body = [
      { x: startX, y: startY },
      { x: startX - gridSize, y: startY },
      { x: startX - gridSize * 2, y: startY }
    ];
  }
}
```

### 3️⃣ Refactor (코드 개선)

```javascript
export class Snake {
  constructor(startX, startY, gridSize) {
    this.body = this.#createInitialBody(startX, startY, gridSize);
  }
  
  #createInitialBody(x, y, size) {
    return Array.from({ length: 3 }, (_, i) => ({
      x: x - size * i,
      y: y
    }));
  }
}
```

---

## 테스트 작성 규칙

### AAA 패턴 (Arrange-Act-Assert)

```javascript
test('should grow snake when eating food', () => {
  // Arrange (준비)
  const snake = new Snake(100, 100, 20);
  const initialLength = snake.body.length;
  
  // Act (실행)
  snake.grow();
  
  // Assert (검증)
  expect(snake.body.length).toBe(initialLength + 1);
});
```

### 테스트 독립성

```javascript
describe('Snake', () => {
  let snake;
  
  beforeEach(() => {
    snake = new Snake(100, 100, 20);
  });
  
  test('test 1', () => { /* ... */ });
  test('test 2', () => { /* ... */ });
});
```

---

## 커버리지 목표

- **코어 로직**: 90% 이상
- **매니저 클래스**: 85% 이상
- **유틸리티 함수**: 95% 이상

```bash
npm run test -- --coverage
```

---

## 개발 워크플로우

1. **테스트 파일 생성**
2. **실패하는 테스트 작성** (Red)
3. **테스트 실행** → 실패 확인
4. **최소한의 구현** (Green)
5. **테스트 실행** → 통과 확인
6. **리팩토링** (Refactor)
7. **커밋**

---

## 체크리스트

- [ ] 테스트를 먼저 작성했는가?
- [ ] Red-Green-Refactor 사이클을 따랐는가?
- [ ] 모든 테스트가 통과하는가?
- [ ] 커버리지 기준을 충족하는가?
- [ ] 테스트가 독립적인가?
- [ ] AAA 패턴을 따랐는가?
