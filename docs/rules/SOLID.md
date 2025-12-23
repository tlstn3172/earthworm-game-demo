# SOLID 원칙 준수 규칙

## 개요

이 프로젝트의 모든 코드는 **SOLID 원칙**을 준수하여 작성해야 합니다.

SOLID는 객체지향 설계의 5가지 기본 원칙입니다:
- **S**ingle Responsibility Principle (단일 책임 원칙)
- **O**pen/Closed Principle (개방-폐쇄 원칙)
- **L**iskov Substitution Principle (리스코프 치환 원칙)
- **I**nterface Segregation Principle (인터페이스 분리 원칙)
- **D**ependency Inversion Principle (의존성 역전 원칙)

---

## 1. Single Responsibility Principle (SRP)
### 단일 책임 원칙

> 클래스는 단 하나의 책임만 가져야 하며, 변경의 이유도 단 하나여야 한다.

### ✅ Good Example

```javascript
// 각 클래스가 하나의 책임만 가짐
class Snake {
  constructor(startX, startY, gridSize) {
    this.body = [];
    this.direction = { x: 1, y: 0 };
  }
  
  move() { /* 이동 로직만 */ }
  grow() { /* 성장 로직만 */ }
  checkSelfCollision() { /* 자기 충돌 체크만 */ }
}

class ScoreManager {
  constructor() {
    this.score = 0;
  }
  
  addScore(points) { /* 점수 추가만 */ }
  getScore() { /* 점수 조회만 */ }
  resetScore() { /* 점수 리셋만 */ }
}

class StorageManager {
  save(key, data) { /* 저장만 */ }
  load(key) { /* 로드만 */ }
}
```

### ❌ Bad Example

```javascript
// 여러 책임을 가진 클래스 (안티패턴)
class Snake {
  constructor() {
    this.body = [];
    this.score = 0; // ❌ 점수 관리는 Snake의 책임이 아님
  }
  
  move() { /* 이동 */ }
  
  saveToLocalStorage() { // ❌ 저장은 Snake의 책임이 아님
    localStorage.setItem('snake', JSON.stringify(this));
  }
  
  playSound() { // ❌ 사운드는 Snake의 책임이 아님
    new Audio('sound.mp3').play();
  }
}
```

### 적용 가이드

- 클래스/함수 이름이 "And"를 포함하면 SRP 위반 가능성이 높음
- 클래스가 변경되는 이유가 2개 이상이면 분리 고려
- 메서드가 10개 이상이면 책임 분리 검토

---

## 2. Open/Closed Principle (OCP)
### 개방-폐쇄 원칙

> 소프트웨어 엔티티는 확장에는 열려있고, 수정에는 닫혀있어야 한다.

### ✅ Good Example

```javascript
// 기본 클래스
class Renderer {
  render(ctx, entity) {
    throw new Error('render() must be implemented');
  }
}

// 확장 (기존 코드 수정 없이 새 기능 추가)
class SnakeRenderer extends Renderer {
  render(ctx, snake) {
    snake.body.forEach(segment => {
      ctx.fillRect(segment.x, segment.y, 20, 20);
    });
  }
}

class FoodRenderer extends Renderer {
  render(ctx, food) {
    ctx.beginPath();
    ctx.arc(food.x, food.y, 10, 0, Math.PI * 2);
    ctx.fill();
  }
}

// 새로운 렌더러 추가 시 기존 코드 수정 불필요
class ObstacleRenderer extends Renderer {
  render(ctx, obstacle) {
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  }
}
```

### ❌ Bad Example

```javascript
// 새 기능 추가 시 기존 코드를 수정해야 함
class Renderer {
  render(ctx, entity, type) {
    if (type === 'snake') {
      // 스네이크 렌더링
    } else if (type === 'food') {
      // 먹이 렌더링
    } else if (type === 'obstacle') { // ❌ 새 기능 추가 시 수정 필요
      // 장애물 렌더링
    }
  }
}
```

### 적용 가이드

- 전략 패턴, 팩토리 패턴 활용
- if-else 체인이 길면 다형성으로 대체 고려
- 추상 클래스/인터페이스로 확장 포인트 제공

---

## 3. Liskov Substitution Principle (LSP)
### 리스코프 치환 원칙

> 하위 타입은 상위 타입을 대체할 수 있어야 한다.

### ✅ Good Example

```javascript
class Shape {
  getArea() {
    throw new Error('getArea() must be implemented');
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  
  getArea() {
    return this.width * this.height; // 올바른 구현
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  
  getArea() {
    return Math.PI * this.radius ** 2; // 올바른 구현
  }
}

// 사용: 어떤 Shape든 동일하게 동작
function printArea(shape) {
  console.log(shape.getArea()); // Rectangle, Circle 모두 정상 동작
}
```

### ❌ Bad Example

```javascript
class Bird {
  fly() {
    console.log('Flying');
  }
}

class Penguin extends Bird {
  fly() {
    throw new Error('Penguins cannot fly'); // ❌ LSP 위반
  }
}

// 사용 시 문제 발생
function makeBirdFly(bird) {
  bird.fly(); // Penguin이면 에러 발생!
}
```

### 적용 가이드

- 하위 클래스가 상위 클래스의 계약을 위반하지 않아야 함
- 하위 클래스에서 예외를 던지면 LSP 위반 가능성
- "is-a" 관계가 성립하는지 확인

---

## 4. Interface Segregation Principle (ISP)
### 인터페이스 분리 원칙

> 클라이언트는 사용하지 않는 인터페이스에 의존하면 안 된다.

### ✅ Good Example

```javascript
// 작고 구체적인 인터페이스
class Movable {
  move() {}
}

class Growable {
  grow() {}
}

class Renderable {
  render(ctx) {}
}

// 필요한 인터페이스만 구현
class Snake extends Movable {
  move() { /* 구현 */ }
}

class Food extends Renderable {
  render(ctx) { /* 구현 */ }
}

class SnakeWithGrowth extends Movable {
  move() { /* 구현 */ }
  grow() { /* 구현 */ }
}
```

### ❌ Bad Example

```javascript
// 거대한 인터페이스
class GameObject {
  move() {}
  grow() {}
  shrink() {}
  shoot() {}
  jump() {}
  swim() {}
}

// Food는 move, grow, shrink 등이 필요 없음
class Food extends GameObject {
  move() { throw new Error('Not supported'); } // ❌
  grow() { throw new Error('Not supported'); } // ❌
  shrink() { throw new Error('Not supported'); } // ❌
  shoot() { throw new Error('Not supported'); } // ❌
}
```

### 적용 가이드

- 인터페이스는 작고 구체적으로
- 클라이언트별로 인터페이스 분리
- 사용하지 않는 메서드가 있다면 인터페이스 분리 고려

---

## 5. Dependency Inversion Principle (DIP)
### 의존성 역전 원칙

> 고수준 모듈은 저수준 모듈에 의존하면 안 되며, 둘 다 추상화에 의존해야 한다.

### ✅ Good Example

```javascript
// 추상화 (인터페이스)
class Storage {
  save(key, data) {
    throw new Error('save() must be implemented');
  }
  load(key) {
    throw new Error('load() must be implemented');
  }
}

// 저수준 모듈
class LocalStorage extends Storage {
  save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  load(key) {
    return JSON.parse(localStorage.getItem(key));
  }
}

class SessionStorage extends Storage {
  save(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }
  load(key) {
    return JSON.parse(sessionStorage.getItem(key));
  }
}

// 고수준 모듈 (추상화에 의존)
class GameStateManager {
  constructor(storage) { // Storage 인터페이스에 의존
    this.storage = storage;
  }
  
  saveGame(state) {
    this.storage.save('gameState', state);
  }
  
  loadGame() {
    return this.storage.load('gameState');
  }
}

// 사용
const manager1 = new GameStateManager(new LocalStorage());
const manager2 = new GameStateManager(new SessionStorage());
```

### ❌ Bad Example

```javascript
// 고수준 모듈이 저수준 모듈에 직접 의존
class GameStateManager {
  constructor() {
    this.storage = localStorage; // ❌ 구체적인 구현에 의존
  }
  
  saveGame(state) {
    this.storage.setItem('gameState', JSON.stringify(state));
  }
  
  loadGame() {
    return JSON.parse(this.storage.getItem('gameState'));
  }
}

// sessionStorage로 변경하려면 클래스 수정 필요
```

### 적용 가이드

- 의존성 주입(Dependency Injection) 사용
- 구체적인 클래스보다 추상 클래스/인터페이스에 의존
- new 키워드 사용을 최소화하고 팩토리 패턴 활용

---

## 실전 적용 예시

### Game 클래스 설계

```javascript
// SOLID 원칙을 모두 적용한 예시

// DIP: 추상화 정의
class Renderer {
  render(ctx) {}
}

class InputHandler {
  handleInput() {}
}

// SRP: 각 클래스가 하나의 책임만
class Game {
  constructor(renderer, inputHandler, stateManager) {
    this.renderer = renderer; // DIP: 추상화에 의존
    this.inputHandler = inputHandler;
    this.stateManager = stateManager;
    this.entities = [];
  }
  
  // SRP: 게임 루프만 담당
  gameLoop(timestamp) {
    this.update(timestamp);
    this.render();
  }
  
  update(deltaTime) {
    this.entities.forEach(entity => entity.update(deltaTime));
  }
  
  render() {
    this.entities.forEach(entity => {
      this.renderer.render(entity);
    });
  }
}

// OCP: 확장에 열려있음
class CanvasRenderer extends Renderer {
  render(entity) {
    // Canvas 렌더링
  }
}

class WebGLRenderer extends Renderer {
  render(entity) {
    // WebGL 렌더링
  }
}

// ISP: 작은 인터페이스
class KeyboardInputHandler extends InputHandler {
  handleInput() {
    // 키보드 입력만 처리
  }
}

class TouchInputHandler extends InputHandler {
  handleInput() {
    // 터치 입력만 처리
  }
}

// 사용
const game = new Game(
  new CanvasRenderer(),
  new KeyboardInputHandler(),
  new StateManager()
);
```

---

## 코드 리뷰 체크리스트

### SRP 체크
- [ ] 클래스가 하나의 책임만 가지는가?
- [ ] 변경의 이유가 하나뿐인가?

### OCP 체크
- [ ] 새 기능 추가 시 기존 코드 수정이 필요한가?
- [ ] 확장 포인트가 명확한가?

### LSP 체크
- [ ] 하위 클래스가 상위 클래스를 대체할 수 있는가?
- [ ] 예외를 던지거나 계약을 위반하지 않는가?

### ISP 체크
- [ ] 사용하지 않는 메서드가 있는가?
- [ ] 인터페이스가 너무 크지 않은가?

### DIP 체크
- [ ] 구체적인 구현에 의존하는가?
- [ ] 의존성 주입을 사용하는가?

---

## 안티패턴 예시

### ❌ God Object (신 객체)

```javascript
// 모든 것을 다 하는 클래스 (SRP 위반)
class GameManager {
  constructor() {
    this.snake = [];
    this.food = {};
    this.score = 0;
    this.audio = new Audio();
  }
  
  moveSnake() {}
  growSnake() {}
  spawnFood() {}
  updateScore() {}
  playSound() {}
  saveToLocalStorage() {}
  renderGame() {}
  handleInput() {}
  checkCollision() {}
}
```

### ✅ 올바른 분리

```javascript
class Snake {
  move() {}
  grow() {}
}

class Food {
  spawn() {}
}

class ScoreManager {
  update() {}
}

class AudioManager {
  play() {}
}

class StorageManager {
  save() {}
}

class Renderer {
  render() {}
}

class InputManager {
  handle() {}
}

class CollisionDetector {
  check() {}
}
```

---

## 참고 자료

- [Clean Code - Robert C. Martin](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Design Patterns - Gang of Four](https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612)
