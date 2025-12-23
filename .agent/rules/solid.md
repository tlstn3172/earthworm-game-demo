# SOLID 원칙

## 개요
이 프로젝트의 모든 코어 로직은 SOLID 원칙을 따라 구현해야 합니다.
SOLID 원칙은 유지보수 가능하고 확장 가능한 객체지향 설계를 위한 5가지 원칙입니다.

## SOLID 원칙

### S - Single Responsibility Principle (단일 책임 원칙)
**클래스는 하나의 책임만 가져야 한다.**

#### ✅ 좋은 예
```javascript
// 각 클래스가 하나의 책임만 가짐
class Snake {
  constructor() {
    this.segments = [];
  }
  
  move() { /* 이동 로직만 */ }
  grow() { /* 성장 로직만 */ }
}

class ScoreManager {
  constructor() {
    this.score = 0;
  }
  
  addPoints(points) { /* 점수 계산만 */ }
  getBestScore() { /* 최고 점수 관리만 */ }
}
```

#### ❌ 나쁜 예
```javascript
// 하나의 클래스가 너무 많은 책임을 가짐
class Game {
  move() { /* 이동 */ }
  grow() { /* 성장 */ }
  calculateScore() { /* 점수 계산 */ }
  saveScore() { /* 점수 저장 */ }
  playSound() { /* 사운드 재생 */ }
  render() { /* 렌더링 */ }
}
```

---

### O - Open/Closed Principle (개방-폐쇄 원칙)
**확장에는 열려있고, 수정에는 닫혀있어야 한다.**

#### ✅ 좋은 예
```javascript
// 기본 클래스
class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.points = 10;
  }
  
  getPoints() {
    return this.points;
  }
}

// 확장 - 기존 코드 수정 없이 새 기능 추가
class GoldenFood extends Food {
  constructor(x, y) {
    super(x, y);
    this.points = 50;
  }
}

class BonusFood extends Food {
  constructor(x, y) {
    super(x, y);
    this.points = 100;
    this.duration = 5000;
  }
}
```

#### ❌ 나쁜 예
```javascript
// 새 기능 추가 시 기존 코드를 계속 수정해야 함
class Food {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }
  
  getPoints() {
    if (this.type === 'normal') return 10;
    if (this.type === 'golden') return 50;
    if (this.type === 'bonus') return 100;
    // 새 타입 추가 시 여기를 계속 수정해야 함
  }
}
```

---

### L - Liskov Substitution Principle (리스코프 치환 원칙)
**자식 클래스는 부모 클래스를 대체할 수 있어야 한다.**

#### ✅ 좋은 예
```javascript
class Obstacle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  
  checkCollision(point) {
    return point.x >= this.x && 
           point.x < this.x + this.width &&
           point.y >= this.y && 
           point.y < this.y + this.height;
  }
}

class MovingObstacle extends Obstacle {
  constructor(x, y, width, height, speed) {
    super(x, y, width, height);
    this.speed = speed;
  }
  
  move() {
    this.x += this.speed;
  }
  
  // 부모의 checkCollision을 그대로 사용 가능
}

// 사용 - 부모 타입으로 자식 객체 사용 가능
function checkGameOver(obstacles) {
  obstacles.forEach(obstacle => {
    if (obstacle.checkCollision(snakeHead)) {
      gameOver();
    }
  });
}
```

---

### I - Interface Segregation Principle (인터페이스 분리 원칙)
**클라이언트는 사용하지 않는 인터페이스에 의존하면 안 된다.**

#### ✅ 좋은 예
```javascript
// 작고 구체적인 인터페이스
class Movable {
  move() { throw new Error('Must implement move()'); }
}

class Renderable {
  render(ctx) { throw new Error('Must implement render()'); }
}

class Collidable {
  checkCollision(point) { throw new Error('Must implement checkCollision()'); }
}

// 필요한 인터페이스만 구현
class Snake extends Movable {
  move() { /* 구현 */ }
}

class Food extends Collidable {
  checkCollision(point) { /* 구현 */ }
}
```

#### ❌ 나쁜 예
```javascript
// 너무 큰 인터페이스
class GameObject {
  move() {}
  render() {}
  checkCollision() {}
  playSound() {}
  saveState() {}
}

// Food는 move()가 필요없지만 구현해야 함
class Food extends GameObject {
  move() { /* 사용하지 않음 */ }
  render() { /* 구현 */ }
  checkCollision() { /* 구현 */ }
  playSound() { /* 사용하지 않음 */ }
  saveState() { /* 사용하지 않음 */ }
}
```

---

### D - Dependency Inversion Principle (의존성 역전 원칙)
**구체적인 것이 아닌 추상적인 것에 의존해야 한다.**

#### ✅ 좋은 예
```javascript
// 추상화된 인터페이스
class StorageInterface {
  save(key, value) { throw new Error('Must implement'); }
  load(key) { throw new Error('Must implement'); }
}

// 구현체
class LocalStorage extends StorageInterface {
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  load(key) {
    return JSON.parse(localStorage.getItem(key));
  }
}

class IndexedDBStorage extends StorageInterface {
  save(key, value) { /* IndexedDB 구현 */ }
  load(key) { /* IndexedDB 구현 */ }
}

// 의존성 주입 - 구체적인 구현이 아닌 인터페이스에 의존
class GameEngine {
  constructor(storage) {
    this.storage = storage; // StorageInterface 타입
  }
  
  saveGame() {
    this.storage.save('gameState', this.state);
  }
}

// 사용
const storage = new LocalStorage();
const game = new GameEngine(storage);
```

#### ❌ 나쁜 예
```javascript
// 구체적인 구현에 직접 의존
class GameEngine {
  constructor() {
    this.storage = new LocalStorage(); // 구체적인 클래스에 의존
  }
  
  saveGame() {
    this.storage.save('gameState', this.state);
  }
}
```

---

## 실전 적용 가이드

### 1. 클래스 설계 시
- [ ] 각 클래스가 하나의 책임만 가지는가? (SRP)
- [ ] 새 기능 추가 시 기존 코드 수정이 필요한가? (OCP)
- [ ] 자식 클래스가 부모 클래스를 완전히 대체할 수 있는가? (LSP)
- [ ] 사용하지 않는 메서드를 구현하도록 강제하는가? (ISP)
- [ ] 구체적인 구현이 아닌 추상화에 의존하는가? (DIP)

### 2. 리팩토링 시그널
다음 상황이 발생하면 SOLID 원칙 위반을 의심:
- 클래스가 100줄 이상
- 메서드가 20줄 이상
- if-else 또는 switch 문이 많음
- 한 클래스 변경 시 다른 클래스도 수정 필요
- 테스트 작성이 어려움

### 3. 의존성 주입 패턴
```javascript
// 생성자 주입 (권장)
class GameEngine {
  constructor(renderer, audioManager, storage) {
    this.renderer = renderer;
    this.audioManager = audioManager;
    this.storage = storage;
  }
}

// 사용
const game = new GameEngine(
  new CanvasRenderer(),
  new WebAudioManager(),
  new LocalStorage()
);
```

---

## 체크리스트

새로운 클래스를 작성할 때:

- [ ] 클래스 이름이 단일 책임을 나타내는가?
- [ ] 확장 가능한 구조인가?
- [ ] 부모 클래스의 계약을 위반하지 않는가?
- [ ] 필요한 메서드만 구현하는가?
- [ ] 의존성이 주입 가능한가?

코드 리뷰 시:

- [ ] SOLID 원칙 위반 사항 확인
- [ ] 리팩토링 필요성 검토
- [ ] 테스트 가능성 확인

---

## 참고 자료

- [Clean Code - Robert C. Martin](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [SOLID Principles - Wikipedia](https://en.wikipedia.org/wiki/SOLID)
