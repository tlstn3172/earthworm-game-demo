# Technical Specification
# Snake Reborn - 모바일 웹 게임

## 문서 정보

| 항목 | 내용 |
|------|------|
| 프로젝트명 | Snake Reborn |
| 문서 버전 | 1.0.0 |
| 작성일 | 2025-12-24 |
| 최종 수정일 | 2025-12-24 |

---

## 1. 기술 스택 개요

### 1.1 프론트엔드 기술

```javascript
{
  "core": {
    "html": "HTML5",
    "css": "CSS3 + Tailwind CSS 3.x",
    "javascript": "ES6+ (Vanilla JS)"
  },
  "rendering": {
    "primary": "HTML Canvas API",
    "fallback": "DOM-based rendering"
  },
  "styling": {
    "framework": "Tailwind CSS (CDN)",
    "customCSS": "CSS Variables + Custom Animations"
  }
}
```

### 1.2 개발 도구

```javascript
{
  "buildTool": "Vite 5.x",
  "packageManager": "npm",
  "linter": "ESLint",
  "formatter": "Prettier",
  "versionControl": "Git"
}
```

### 1.3 배포 및 호스팅

```javascript
{
  "ci_cd": "GitHub Actions",
  "hosting": "GitHub Pages",
  "pwa": "Workbox (Service Worker)"
}
```

---

## 2. 아키텍처 설계

### 2.1 전체 아키텍처

```
┌─────────────────────────────────────────────┐
│           Presentation Layer                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Start   │  │   Game   │  │ Settings │  │
│  │  Screen  │  │  Screen  │  │  Screen  │  │
│  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│            Application Layer                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Game    │  │  Input   │  │  Audio   │  │
│  │  Engine  │  │ Manager  │  │ Manager  │  │
│  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│              Core Layer                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Snake   │  │Collision │  │  Score   │  │
│  │  Logic   │  │ Detection│  │  System  │  │
│  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│              Data Layer                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Local   │  │  State   │  │ Settings │  │
│  │ Storage  │  │ Manager  │  │ Manager  │  │
│  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────┘
```

### 2.2 모듈 구조

```
src/
├── index.html              # 메인 HTML
├── main.js                 # 애플리케이션 엔트리 포인트
├── styles/
│   ├── index.css          # 글로벌 스타일
│   ├── variables.css      # CSS 변수
│   └── animations.css     # 커스텀 애니메이션
├── scripts/
│   ├── core/
│   │   ├── Game.js        # 게임 엔진 코어
│   │   ├── Snake.js       # 스네이크 로직
│   │   ├── Food.js        # 먹이 시스템
│   │   ├── Obstacle.js    # 장애물 시스템
│   │   └── Collision.js   # 충돌 감지
│   ├── managers/
│   │   ├── InputManager.js    # 입력 처리
│   │   ├── AudioManager.js    # 사운드 관리
│   │   ├── StateManager.js    # 상태 관리
│   │   ├── StorageManager.js  # 로컬 스토리지
│   │   └── ScoreManager.js    # 점수 관리
│   ├── ui/
│   │   ├── Screen.js      # 화면 베이스 클래스
│   │   ├── StartScreen.js # 시작 화면
│   │   ├── GameScreen.js  # 게임 화면
│   │   ├── GameOverScreen.js # 게임 오버 화면
│   │   └── SettingsScreen.js # 설정 화면
│   ├── components/
│   │   ├── Joystick.js    # 가상 조이스틱
│   │   ├── Button.js      # 버튼 컴포넌트
│   │   └── ScoreCard.js   # 점수 카드
│   └── utils/
│       ├── constants.js   # 상수 정의
│       ├── helpers.js     # 헬퍼 함수
│       └── validators.js  # 유효성 검사
├── assets/
│   ├── images/
│   │   └── logo.png
│   ├── sounds/
│   │   ├── eat.mp3
│   │   ├── gameover.mp3
│   │   └── boost.mp3
│   └── icons/
│       ├── icon-192.png
│       └── icon-512.png
├── public/
│   ├── manifest.json      # PWA 매니페스트
│   └── sw.js             # Service Worker
└── tests/
    ├── unit/
    └── integration/
```

---

## 3. 핵심 컴포넌트 상세 설계

### 3.1 Game Engine (Game.js)

**책임:**
- 게임 루프 관리
- 렌더링 조율
- 상태 전환 관리

**주요 메서드:**

```javascript
class Game {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.config = config;
    this.state = 'idle'; // idle, playing, paused, gameover
    this.lastFrameTime = 0;
    this.targetFPS = 60;
  }

  // 게임 초기화
  init() {
    this.setupCanvas();
    this.loadAssets();
    this.initializeEntities();
    this.bindEvents();
  }

  // 게임 루프
  gameLoop(timestamp) {
    const deltaTime = timestamp - this.lastFrameTime;
    
    if (deltaTime >= 1000 / this.targetFPS) {
      this.update(deltaTime);
      this.render();
      this.lastFrameTime = timestamp;
    }
    
    if (this.state === 'playing') {
      requestAnimationFrame(this.gameLoop.bind(this));
    }
  }

  // 게임 상태 업데이트
  update(deltaTime) {
    this.snake.update(deltaTime);
    this.checkCollisions();
    this.updateScore();
    this.updateTimer();
  }

  // 렌더링
  render() {
    this.clearCanvas();
    this.renderGrid();
    this.renderObstacles();
    this.renderFood();
    this.renderSnake();
  }

  // 게임 시작
  start() {
    this.state = 'playing';
    this.gameLoop(performance.now());
  }

  // 게임 일시정지
  pause() {
    this.state = 'paused';
  }

  // 게임 재개
  resume() {
    this.state = 'playing';
    this.gameLoop(performance.now());
  }

  // 게임 종료
  gameOver() {
    this.state = 'gameover';
    this.saveScore();
    this.showGameOverScreen();
  }

  // 게임 리셋
  reset() {
    this.snake.reset();
    this.score = 0;
    this.time = 0;
    this.spawnFood();
  }
}
```

### 3.2 Snake Logic (Snake.js)

**책임:**
- 스네이크 이동 및 성장
- 방향 제어
- 자기 충돌 감지

**데이터 구조:**

```javascript
class Snake {
  constructor(startX, startY, gridSize) {
    this.gridSize = gridSize;
    this.body = [
      { x: startX, y: startY },
      { x: startX - gridSize, y: startY },
      { x: startX - gridSize * 2, y: startY }
    ];
    this.direction = { x: 1, y: 0 }; // right
    this.nextDirection = { x: 1, y: 0 };
    this.speed = 5; // cells per second
    this.moveTimer = 0;
    this.isBoosting = false;
  }

  // 방향 변경
  setDirection(newDirection) {
    // 반대 방향으로는 이동 불가
    if (this.direction.x + newDirection.x === 0 &&
        this.direction.y + newDirection.y === 0) {
      return;
    }
    this.nextDirection = newDirection;
  }

  // 스네이크 이동
  move() {
    this.direction = this.nextDirection;
    
    const head = this.body[0];
    const newHead = {
      x: head.x + this.direction.x * this.gridSize,
      y: head.y + this.direction.y * this.gridSize
    };
    
    this.body.unshift(newHead);
    this.body.pop();
  }

  // 스네이크 성장
  grow() {
    const tail = this.body[this.body.length - 1];
    this.body.push({ ...tail });
  }

  // 부스트 활성화
  activateBoost() {
    if (!this.isBoosting) {
      this.isBoosting = true;
      this.speed *= 1.5;
      
      setTimeout(() => {
        this.isBoosting = false;
        this.speed /= 1.5;
      }, 2000);
    }
  }

  // 자기 충돌 체크
  checkSelfCollision() {
    const head = this.body[0];
    return this.body.slice(1).some(segment => 
      segment.x === head.x && segment.y === head.y
    );
  }

  // 업데이트
  update(deltaTime) {
    this.moveTimer += deltaTime;
    const moveInterval = 1000 / this.speed;
    
    if (this.moveTimer >= moveInterval) {
      this.move();
      this.moveTimer = 0;
    }
  }

  // 렌더링
  render(ctx) {
    this.body.forEach((segment, index) => {
      const isHead = index === 0;
      const opacity = 1 - (index / this.body.length) * 0.5;
      
      ctx.fillStyle = isHead 
        ? '#7bf425' 
        : `rgba(123, 244, 37, ${opacity})`;
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      
      ctx.fillRect(segment.x, segment.y, this.gridSize, this.gridSize);
      ctx.strokeRect(segment.x, segment.y, this.gridSize, this.gridSize);
      
      // 머리에 눈 그리기
      if (isHead) {
        this.renderEyes(ctx, segment);
      }
    });
  }

  renderEyes(ctx, head) {
    const eyeSize = this.gridSize / 8;
    const eyeOffset = this.gridSize / 4;
    
    ctx.fillStyle = '#172210';
    
    // 방향에 따라 눈 위치 조정
    if (this.direction.x !== 0) {
      ctx.fillRect(head.x + eyeOffset, head.y + eyeOffset, eyeSize, eyeSize);
      ctx.fillRect(head.x + eyeOffset, head.y + this.gridSize - eyeOffset - eyeSize, eyeSize, eyeSize);
    } else {
      ctx.fillRect(head.x + eyeOffset, head.y + eyeOffset, eyeSize, eyeSize);
      ctx.fillRect(head.x + this.gridSize - eyeOffset - eyeSize, head.y + eyeOffset, eyeSize, eyeSize);
    }
  }
}
```

### 3.3 Input Manager (InputManager.js)

**책임:**
- 터치/마우스 입력 처리
- 가상 조이스틱 관리
- 키보드 입력 처리 (데스크톱)

```javascript
class InputManager {
  constructor(joystickElement, game) {
    this.joystick = joystickElement;
    this.game = game;
    this.isActive = false;
    this.startPos = { x: 0, y: 0 };
    this.currentPos = { x: 0, y: 0 };
    this.deadzone = 20; // pixels
    
    this.bindEvents();
  }

  bindEvents() {
    // 터치 이벤트
    this.joystick.addEventListener('touchstart', this.handleTouchStart.bind(this));
    this.joystick.addEventListener('touchmove', this.handleTouchMove.bind(this));
    this.joystick.addEventListener('touchend', this.handleTouchEnd.bind(this));
    
    // 마우스 이벤트 (데스크톱)
    this.joystick.addEventListener('mousedown', this.handleMouseDown.bind(this));
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    document.addEventListener('mouseup', this.handleMouseUp.bind(this));
    
    // 키보드 이벤트
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handleTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    this.startPos = { x: touch.clientX, y: touch.clientY };
    this.isActive = true;
  }

  handleTouchMove(e) {
    if (!this.isActive) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    this.currentPos = { x: touch.clientX, y: touch.clientY };
    
    this.updateJoystickVisual();
    this.updateDirection();
  }

  handleTouchEnd(e) {
    e.preventDefault();
    this.isActive = false;
    this.resetJoystick();
  }

  updateDirection() {
    const dx = this.currentPos.x - this.startPos.x;
    const dy = this.currentPos.y - this.startPos.y;
    
    // Deadzone 체크
    if (Math.abs(dx) < this.deadzone && Math.abs(dy) < this.deadzone) {
      return;
    }
    
    // 더 큰 변화량의 방향으로 이동
    if (Math.abs(dx) > Math.abs(dy)) {
      this.game.snake.setDirection({ x: dx > 0 ? 1 : -1, y: 0 });
    } else {
      this.game.snake.setDirection({ x: 0, y: dy > 0 ? 1 : -1 });
    }
  }

  handleKeyDown(e) {
    const keyMap = {
      'ArrowUp': { x: 0, y: -1 },
      'ArrowDown': { x: 0, y: 1 },
      'ArrowLeft': { x: -1, y: 0 },
      'ArrowRight': { x: 1, y: 0 },
      'w': { x: 0, y: -1 },
      's': { x: 0, y: 1 },
      'a': { x: -1, y: 0 },
      'd': { x: 1, y: 0 }
    };
    
    const direction = keyMap[e.key];
    if (direction) {
      e.preventDefault();
      this.game.snake.setDirection(direction);
    }
    
    // 스페이스바로 부스트
    if (e.key === ' ') {
      e.preventDefault();
      this.game.snake.activateBoost();
    }
  }

  updateJoystickVisual() {
    const dx = this.currentPos.x - this.startPos.x;
    const dy = this.currentPos.y - this.startPos.y;
    
    // 최대 이동 거리 제한
    const maxDistance = 50;
    const distance = Math.min(Math.sqrt(dx * dx + dy * dy), maxDistance);
    const angle = Math.atan2(dy, dx);
    
    const thumbX = Math.cos(angle) * distance;
    const thumbY = Math.sin(angle) * distance;
    
    const thumb = this.joystick.querySelector('.joystick-thumb');
    thumb.style.transform = `translate(${thumbX}px, ${thumbY}px)`;
  }

  resetJoystick() {
    const thumb = this.joystick.querySelector('.joystick-thumb');
    thumb.style.transform = 'translate(0, 0)';
  }
}
```

### 3.4 Collision Detection (Collision.js)

**책임:**
- 스네이크와 먹이 충돌
- 스네이크와 장애물 충돌
- 스네이크와 벽 충돌

```javascript
class CollisionDetector {
  constructor(gridSize, canvasWidth, canvasHeight) {
    this.gridSize = gridSize;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  // 두 점이 같은 위치인지 체크
  pointsCollide(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
  }

  // 점과 사각형 충돌 체크
  pointRectCollide(point, rect) {
    return point.x >= rect.x &&
           point.x < rect.x + rect.width &&
           point.y >= rect.y &&
           point.y < rect.y + rect.height;
  }

  // 스네이크와 먹이 충돌
  checkFoodCollision(snake, food) {
    const head = snake.body[0];
    return this.pointsCollide(head, food.position);
  }

  // 스네이크와 장애물 충돌
  checkObstacleCollision(snake, obstacles) {
    const head = snake.body[0];
    
    return obstacles.some(obstacle => 
      this.pointRectCollide(head, {
        x: obstacle.x,
        y: obstacle.y,
        width: obstacle.width,
        height: obstacle.height
      })
    );
  }

  // 스네이크와 벽 충돌
  checkWallCollision(snake) {
    const head = snake.body[0];
    
    return head.x < 0 ||
           head.x >= this.canvasWidth ||
           head.y < 0 ||
           head.y >= this.canvasHeight;
  }

  // 모든 충돌 체크
  checkAllCollisions(snake, food, obstacles) {
    return {
      food: this.checkFoodCollision(snake, food),
      obstacle: this.checkObstacleCollision(snake, obstacles),
      wall: this.checkWallCollision(snake),
      self: snake.checkSelfCollision()
    };
  }
}
```

### 3.5 Storage Manager (StorageManager.js)

**책임:**
- 로컬 스토리지 관리
- 점수 저장/로드
- 설정 저장/로드

```javascript
class StorageManager {
  constructor() {
    this.storageKey = 'snakeReborn';
    this.defaultData = {
      bestScore: 0,
      settings: {
        soundEffects: true,
        backgroundMusic: false,
        sensitivity: 80,
        difficulty: 'normal',
        vibration: true,
        theme: 'dark'
      },
      stats: {
        totalGames: 0,
        totalPlayTime: 0,
        averageScore: 0
      }
    };
  }

  // 데이터 로드
  load() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : this.defaultData;
    } catch (error) {
      console.error('Failed to load data:', error);
      return this.defaultData;
    }
  }

  // 데이터 저장
  save(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Failed to save data:', error);
      return false;
    }
  }

  // 최고 점수 업데이트
  updateBestScore(score) {
    const data = this.load();
    if (score > data.bestScore) {
      data.bestScore = score;
      this.save(data);
      return true;
    }
    return false;
  }

  // 설정 업데이트
  updateSettings(settings) {
    const data = this.load();
    data.settings = { ...data.settings, ...settings };
    this.save(data);
  }

  // 통계 업데이트
  updateStats(gameScore, playTime) {
    const data = this.load();
    data.stats.totalGames += 1;
    data.stats.totalPlayTime += playTime;
    data.stats.averageScore = 
      (data.stats.averageScore * (data.stats.totalGames - 1) + gameScore) / 
      data.stats.totalGames;
    this.save(data);
  }

  // 데이터 초기화
  reset() {
    this.save(this.defaultData);
  }
}
```

---

## 4. 렌더링 전략

### 4.1 Canvas 렌더링

**그리드 시스템:**
```javascript
const GRID_CONFIG = {
  cellSize: 20,        // 각 셀의 크기 (px)
  cols: 20,            // 열 개수
  rows: 30,            // 행 개수
  lineWidth: 1,        // 그리드 선 두께
  lineColor: 'rgba(0, 0, 0, 0.05)'  // 그리드 선 색상
};

function renderGrid(ctx, config) {
  ctx.strokeStyle = config.lineColor;
  ctx.lineWidth = config.lineWidth;
  
  // 세로선
  for (let i = 0; i <= config.cols; i++) {
    const x = i * config.cellSize;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, config.rows * config.cellSize);
    ctx.stroke();
  }
  
  // 가로선
  for (let i = 0; i <= config.rows; i++) {
    const y = i * config.cellSize;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(config.cols * config.cellSize, y);
    ctx.stroke();
  }
}
```

### 4.2 레이어 구조

```
Layer 5: UI Overlay (HUD, Buttons)
Layer 4: Effects (Particles, Glow)
Layer 3: Snake
Layer 2: Food & Obstacles
Layer 1: Grid Background
Layer 0: Canvas Background
```

### 4.3 최적화 기법

**더블 버퍼링:**
```javascript
class CanvasRenderer {
  constructor(canvas) {
    this.displayCanvas = canvas;
    this.displayCtx = canvas.getContext('2d');
    
    // 오프스크린 캔버스
    this.bufferCanvas = document.createElement('canvas');
    this.bufferCanvas.width = canvas.width;
    this.bufferCanvas.height = canvas.height;
    this.bufferCtx = this.bufferCanvas.getContext('2d');
  }

  render(renderCallback) {
    // 버퍼에 렌더링
    this.bufferCtx.clearRect(0, 0, this.bufferCanvas.width, this.bufferCanvas.height);
    renderCallback(this.bufferCtx);
    
    // 디스플레이 캔버스로 복사
    this.displayCtx.clearRect(0, 0, this.displayCanvas.width, this.displayCanvas.height);
    this.displayCtx.drawImage(this.bufferCanvas, 0, 0);
  }
}
```

**Dirty Rectangle:**
```javascript
class DirtyRectManager {
  constructor() {
    this.dirtyRects = [];
  }

  addDirtyRect(x, y, width, height) {
    this.dirtyRects.push({ x, y, width, height });
  }

  clearDirtyRects() {
    this.dirtyRects = [];
  }

  renderDirtyRects(ctx, renderCallback) {
    this.dirtyRects.forEach(rect => {
      ctx.save();
      ctx.beginPath();
      ctx.rect(rect.x, rect.y, rect.width, rect.height);
      ctx.clip();
      renderCallback(ctx, rect);
      ctx.restore();
    });
  }
}
```

---

## 5. 상태 관리

### 5.1 상태 머신

```javascript
class StateMachine {
  constructor() {
    this.currentState = 'idle';
    this.states = {
      idle: {
        enter: () => this.showStartScreen(),
        exit: () => this.hideStartScreen()
      },
      playing: {
        enter: () => this.startGame(),
        update: (dt) => this.updateGame(dt),
        exit: () => this.pauseGame()
      },
      paused: {
        enter: () => this.showPauseMenu(),
        exit: () => this.hidePauseMenu()
      },
      gameover: {
        enter: () => this.showGameOverScreen(),
        exit: () => this.hideGameOverScreen()
      },
      settings: {
        enter: () => this.showSettingsScreen(),
        exit: () => this.hideSettingsScreen()
      }
    };
  }

  transition(newState) {
    if (this.states[this.currentState].exit) {
      this.states[this.currentState].exit();
    }
    
    this.currentState = newState;
    
    if (this.states[this.currentState].enter) {
      this.states[this.currentState].enter();
    }
  }

  update(deltaTime) {
    if (this.states[this.currentState].update) {
      this.states[this.currentState].update(deltaTime);
    }
  }
}
```

### 5.2 게임 상태 데이터

```javascript
class GameState {
  constructor() {
    this.reset();
  }

  reset() {
    this.score = 0;
    this.time = 0;
    this.isPaused = false;
    this.isGameOver = false;
    this.difficulty = 'normal';
    this.speed = 5;
  }

  toJSON() {
    return {
      score: this.score,
      time: this.time,
      isPaused: this.isPaused,
      isGameOver: this.isGameOver,
      difficulty: this.difficulty,
      speed: this.speed
    };
  }

  fromJSON(data) {
    Object.assign(this, data);
  }
}
```

---

## 6. 오디오 시스템

### 6.1 Audio Manager

```javascript
class AudioManager {
  constructor() {
    this.sounds = {};
    this.music = null;
    this.soundEnabled = true;
    this.musicEnabled = false;
    this.volume = {
      sound: 0.7,
      music: 0.3
    };
  }

  // 사운드 로드
  async loadSound(name, url) {
    try {
      const audio = new Audio(url);
      audio.preload = 'auto';
      this.sounds[name] = audio;
    } catch (error) {
      console.error(`Failed to load sound: ${name}`, error);
    }
  }

  // 사운드 재생
  playSound(name) {
    if (!this.soundEnabled || !this.sounds[name]) return;
    
    const sound = this.sounds[name].cloneNode();
    sound.volume = this.volume.sound;
    sound.play().catch(e => console.error('Sound play failed:', e));
  }

  // 배경음악 재생
  playMusic(url) {
    if (!this.musicEnabled) return;
    
    if (this.music) {
      this.music.pause();
    }
    
    this.music = new Audio(url);
    this.music.loop = true;
    this.music.volume = this.volume.music;
    this.music.play().catch(e => console.error('Music play failed:', e));
  }

  // 배경음악 정지
  stopMusic() {
    if (this.music) {
      this.music.pause();
      this.music.currentTime = 0;
    }
  }

  // 설정 업데이트
  updateSettings(settings) {
    this.soundEnabled = settings.soundEffects;
    this.musicEnabled = settings.backgroundMusic;
    
    if (!this.musicEnabled) {
      this.stopMusic();
    }
  }
}
```

### 6.2 사운드 이벤트

```javascript
const SOUND_EVENTS = {
  EAT_FOOD: 'eat',
  GAME_OVER: 'gameover',
  BOOST: 'boost',
  BUTTON_CLICK: 'click',
  LEVEL_UP: 'levelup'
};

// 사용 예시
game.on('foodEaten', () => {
  audioManager.playSound(SOUND_EVENTS.EAT_FOOD);
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
});
```

---

## 7. 성능 최적화

### 7.1 프레임레이트 관리

```javascript
class FrameRateManager {
  constructor(targetFPS = 60) {
    this.targetFPS = targetFPS;
    this.frameInterval = 1000 / targetFPS;
    this.lastFrameTime = 0;
    this.fps = 0;
    this.frameCount = 0;
    this.fpsUpdateTime = 0;
  }

  shouldRender(timestamp) {
    const elapsed = timestamp - this.lastFrameTime;
    
    if (elapsed >= this.frameInterval) {
      this.lastFrameTime = timestamp - (elapsed % this.frameInterval);
      this.updateFPS(timestamp);
      return true;
    }
    
    return false;
  }

  updateFPS(timestamp) {
    this.frameCount++;
    
    if (timestamp >= this.fpsUpdateTime + 1000) {
      this.fps = Math.round((this.frameCount * 1000) / (timestamp - this.fpsUpdateTime));
      this.frameCount = 0;
      this.fpsUpdateTime = timestamp;
    }
  }

  getFPS() {
    return this.fps;
  }
}
```

### 7.2 객체 풀링

```javascript
class ObjectPool {
  constructor(createFn, resetFn, initialSize = 10) {
    this.createFn = createFn;
    this.resetFn = resetFn;
    this.pool = [];
    this.active = [];
    
    // 초기 객체 생성
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(this.createFn());
    }
  }

  acquire() {
    let obj;
    
    if (this.pool.length > 0) {
      obj = this.pool.pop();
    } else {
      obj = this.createFn();
    }
    
    this.active.push(obj);
    return obj;
  }

  release(obj) {
    const index = this.active.indexOf(obj);
    
    if (index !== -1) {
      this.active.splice(index, 1);
      this.resetFn(obj);
      this.pool.push(obj);
    }
  }

  releaseAll() {
    this.active.forEach(obj => {
      this.resetFn(obj);
      this.pool.push(obj);
    });
    this.active = [];
  }
}

// 사용 예시: 파티클 시스템
const particlePool = new ObjectPool(
  () => ({ x: 0, y: 0, vx: 0, vy: 0, life: 0 }),
  (particle) => {
    particle.x = 0;
    particle.y = 0;
    particle.vx = 0;
    particle.vy = 0;
    particle.life = 0;
  },
  50
);
```

### 7.3 메모리 관리

```javascript
class MemoryManager {
  constructor() {
    this.textures = new Map();
    this.maxTextureSize = 10 * 1024 * 1024; // 10MB
    this.currentSize = 0;
  }

  // 텍스처 캐싱
  cacheTexture(key, canvas) {
    const size = canvas.width * canvas.height * 4; // RGBA
    
    if (this.currentSize + size > this.maxTextureSize) {
      this.clearOldestTextures(size);
    }
    
    this.textures.set(key, {
      canvas: canvas,
      size: size,
      lastUsed: Date.now()
    });
    
    this.currentSize += size;
  }

  getTexture(key) {
    const texture = this.textures.get(key);
    
    if (texture) {
      texture.lastUsed = Date.now();
      return texture.canvas;
    }
    
    return null;
  }

  clearOldestTextures(requiredSize) {
    const sorted = Array.from(this.textures.entries())
      .sort((a, b) => a[1].lastUsed - b[1].lastUsed);
    
    let freedSize = 0;
    
    for (const [key, texture] of sorted) {
      if (freedSize >= requiredSize) break;
      
      this.textures.delete(key);
      this.currentSize -= texture.size;
      freedSize += texture.size;
    }
  }

  clear() {
    this.textures.clear();
    this.currentSize = 0;
  }
}
```

---

## 8. PWA 구현

### 8.1 Service Worker (sw.js)

```javascript
const CACHE_NAME = 'snake-reborn-v1.0.0';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles/index.css',
  '/scripts/main.js',
  '/assets/sounds/eat.mp3',
  '/assets/sounds/gameover.mp3',
  '/assets/sounds/boost.mp3',
  '/assets/icons/icon-192.png',
  '/assets/icons/icon-512.png'
];

// 설치 이벤트
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// 활성화 이벤트
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch 이벤트 (Cache First 전략)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        
        return fetch(event.request)
          .then((response) => {
            if (!response || response.status !== 200) {
              return response;
            }
            
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          });
      })
  );
});
```

### 8.2 Manifest (manifest.json)

```json
{
  "name": "Snake Reborn",
  "short_name": "Snake",
  "description": "Modern mobile snake game with neon aesthetics",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#172210",
  "theme_color": "#7bf425",
  "icons": [
    {
      "src": "/assets/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/assets/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "categories": ["games", "entertainment"],
  "screenshots": [
    {
      "src": "/assets/screenshots/game-1.png",
      "sizes": "540x720",
      "type": "image/png"
    }
  ]
}
```

---

## 9. 테스트 전략

### 9.1 유닛 테스트

```javascript
// tests/unit/Snake.test.js
import { Snake } from '../../src/scripts/core/Snake.js';

describe('Snake', () => {
  let snake;
  
  beforeEach(() => {
    snake = new Snake(100, 100, 20);
  });
  
  test('should initialize with correct starting position', () => {
    expect(snake.body.length).toBe(3);
    expect(snake.body[0]).toEqual({ x: 100, y: 100 });
  });
  
  test('should not allow reverse direction', () => {
    snake.direction = { x: 1, y: 0 };
    snake.setDirection({ x: -1, y: 0 });
    expect(snake.nextDirection).toEqual({ x: 1, y: 0 });
  });
  
  test('should grow when eating food', () => {
    const initialLength = snake.body.length;
    snake.grow();
    expect(snake.body.length).toBe(initialLength + 1);
  });
  
  test('should detect self collision', () => {
    // 스네이크를 원형으로 만들어 충돌 유도
    snake.body = [
      { x: 100, y: 100 },
      { x: 120, y: 100 },
      { x: 120, y: 120 },
      { x: 100, y: 120 },
      { x: 100, y: 100 } // 머리와 같은 위치
    ];
    expect(snake.checkSelfCollision()).toBe(true);
  });
});
```

### 9.2 통합 테스트

```javascript
// tests/integration/Game.test.js
import { Game } from '../../src/scripts/core/Game.js';

describe('Game Integration', () => {
  let game;
  let canvas;
  
  beforeEach(() => {
    canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 600;
    game = new Game(canvas, {});
    game.init();
  });
  
  test('should start game correctly', () => {
    game.start();
    expect(game.state).toBe('playing');
    expect(game.score).toBe(0);
  });
  
  test('should handle food collision', () => {
    const initialLength = game.snake.body.length;
    const initialScore = game.score;
    
    // 먹이를 스네이크 머리 위치로 이동
    game.food.position = { ...game.snake.body[0] };
    game.update(16);
    
    expect(game.snake.body.length).toBe(initialLength + 1);
    expect(game.score).toBeGreaterThan(initialScore);
  });
  
  test('should end game on wall collision', () => {
    // 스네이크를 벽 밖으로 이동
    game.snake.body[0] = { x: -20, y: 100 };
    game.update(16);
    
    expect(game.state).toBe('gameover');
  });
});
```

### 9.3 E2E 테스트 (Playwright)

```javascript
// tests/e2e/gameplay.spec.js
import { test, expect } from '@playwright/test';

test.describe('Snake Reborn Gameplay', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });
  
  test('should display start screen', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('SNAKE REBORN');
    await expect(page.locator('button:has-text("GAME START")')).toBeVisible();
  });
  
  test('should start game on button click', async ({ page }) => {
    await page.click('button:has-text("GAME START")');
    await expect(page.locator('canvas')).toBeVisible();
    await expect(page.locator('.score-display')).toBeVisible();
  });
  
  test('should control snake with keyboard', async ({ page }) => {
    await page.click('button:has-text("GAME START")');
    
    // 방향키로 이동
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(500);
    await page.keyboard.press('ArrowDown');
    
    // 게임이 계속 진행 중인지 확인
    const score = await page.locator('.score-display').textContent();
    expect(score).toBeTruthy();
  });
  
  test('should save high score', async ({ page }) => {
    await page.click('button:has-text("GAME START")');
    
    // 게임 플레이 시뮬레이션
    await page.waitForTimeout(5000);
    
    // 로컬 스토리지 확인
    const bestScore = await page.evaluate(() => {
      const data = localStorage.getItem('snakeReborn');
      return data ? JSON.parse(data).bestScore : 0;
    });
    
    expect(bestScore).toBeGreaterThanOrEqual(0);
  });
});
```

---

## 10. 빌드 및 배포

### 10.1 Vite 설정 (vite.config.js)

```javascript
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/earthworm-game-demo/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'game-core': [
            './src/scripts/core/Game.js',
            './src/scripts/core/Snake.js'
          ],
          'managers': [
            './src/scripts/managers/InputManager.js',
            './src/scripts/managers/AudioManager.js'
          ]
        }
      }
    }
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['assets/**/*'],
      manifest: {
        name: 'Snake Reborn',
        short_name: 'Snake',
        theme_color: '#7bf425',
        background_color: '#172210',
        display: 'standalone',
        icons: [
          {
            src: '/assets/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/assets/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,mp3}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  server: {
    port: 5173,
    open: true
  }
});
```

### 10.2 배포 스크립트 (package.json)

```json
{
  "name": "snake-reborn",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint src --ext .js",
    "format": "prettier --write \"src/**/*.{js,css,html}\"",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "dependencies": {},
  "devDependencies": {
    "vite": "^5.0.0",
    "vite-plugin-pwa": "^0.17.0",
    "@playwright/test": "^1.40.0",
    "vitest": "^1.0.0",
    "eslint": "^8.55.0",
    "prettier": "^3.1.0",
    "gh-pages": "^6.1.0"
  }
}
```

---

## 11. 모니터링 및 분석

### 11.1 에러 트래킹

```javascript
class ErrorTracker {
  constructor() {
    this.errors = [];
    this.maxErrors = 100;
    
    this.setupGlobalErrorHandler();
  }

  setupGlobalErrorHandler() {
    window.addEventListener('error', (event) => {
      this.logError({
        type: 'runtime',
        message: event.message,
        filename: event.filename,
        line: event.lineno,
        column: event.colno,
        stack: event.error?.stack,
        timestamp: Date.now()
      });
    });
    
    window.addEventListener('unhandledrejection', (event) => {
      this.logError({
        type: 'promise',
        message: event.reason?.message || 'Unhandled Promise Rejection',
        stack: event.reason?.stack,
        timestamp: Date.now()
      });
    });
  }

  logError(error) {
    this.errors.push(error);
    
    if (this.errors.length > this.maxErrors) {
      this.errors.shift();
    }
    
    // 프로덕션에서는 외부 서비스로 전송
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(error);
    } else {
      console.error('Error logged:', error);
    }
  }

  sendToAnalytics(error) {
    // Sentry, LogRocket 등으로 전송
    // fetch('/api/errors', {
    //   method: 'POST',
    //   body: JSON.stringify(error)
    // });
  }

  getErrors() {
    return this.errors;
  }
}
```

### 11.2 성능 모니터링

```javascript
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      fps: [],
      loadTime: 0,
      renderTime: [],
      updateTime: []
    };
  }

  measureLoadTime() {
    if (performance.timing) {
      this.metrics.loadTime = 
        performance.timing.loadEventEnd - 
        performance.timing.navigationStart;
    }
  }

  recordFPS(fps) {
    this.metrics.fps.push(fps);
    
    if (this.metrics.fps.length > 60) {
      this.metrics.fps.shift();
    }
  }

  measureRenderTime(callback) {
    const start = performance.now();
    callback();
    const end = performance.now();
    
    this.metrics.renderTime.push(end - start);
    
    if (this.metrics.renderTime.length > 60) {
      this.metrics.renderTime.shift();
    }
  }

  getAverageFPS() {
    if (this.metrics.fps.length === 0) return 0;
    
    const sum = this.metrics.fps.reduce((a, b) => a + b, 0);
    return Math.round(sum / this.metrics.fps.length);
  }

  getAverageRenderTime() {
    if (this.metrics.renderTime.length === 0) return 0;
    
    const sum = this.metrics.renderTime.reduce((a, b) => a + b, 0);
    return (sum / this.metrics.renderTime.length).toFixed(2);
  }

  getReport() {
    return {
      loadTime: this.metrics.loadTime,
      averageFPS: this.getAverageFPS(),
      averageRenderTime: this.getAverageRenderTime(),
      currentFPS: this.metrics.fps[this.metrics.fps.length - 1] || 0
    };
  }
}
```

---

## 12. 보안 고려사항

### 12.1 Content Security Policy

```html
<meta http-equiv="Content-Security-Policy" 
      content="
        default-src 'self';
        script-src 'self' https://cdn.tailwindcss.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com;
        img-src 'self' data: https:;
        connect-src 'self';
      ">
```

### 12.2 입력 검증

```javascript
class InputValidator {
  static validateScore(score) {
    return Number.isInteger(score) && score >= 0 && score <= 999999;
  }

  static validateSettings(settings) {
    const schema = {
      soundEffects: 'boolean',
      backgroundMusic: 'boolean',
      sensitivity: 'number',
      difficulty: ['easy', 'normal', 'hard'],
      vibration: 'boolean',
      theme: ['light', 'dark']
    };
    
    for (const [key, type] of Object.entries(schema)) {
      if (!(key in settings)) return false;
      
      if (Array.isArray(type)) {
        if (!type.includes(settings[key])) return false;
      } else if (typeof settings[key] !== type) {
        return false;
      }
    }
    
    return true;
  }

  static sanitizeString(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}
```

---

## 13. 브라우저 호환성

### 13.1 Polyfills

```javascript
// polyfills.js

// requestAnimationFrame polyfill
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (function() {
    return window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           function(callback) {
             window.setTimeout(callback, 1000 / 60);
           };
  })();
}

// Performance.now polyfill
if (!window.performance || !window.performance.now) {
  window.performance = window.performance || {};
  window.performance.now = function() {
    return Date.now();
  };
}

// Array.from polyfill
if (!Array.from) {
  Array.from = function(arrayLike) {
    return Array.prototype.slice.call(arrayLike);
  };
}
```

### 13.2 Feature Detection

```javascript
class FeatureDetector {
  static checkFeatures() {
    return {
      canvas: this.hasCanvas(),
      localStorage: this.hasLocalStorage(),
      touchEvents: this.hasTouchEvents(),
      vibration: this.hasVibration(),
      audioContext: this.hasAudioContext(),
      serviceWorker: this.hasServiceWorker()
    };
  }

  static hasCanvas() {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext && canvas.getContext('2d'));
  }

  static hasLocalStorage() {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  }

  static hasTouchEvents() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  static hasVibration() {
    return 'vibrate' in navigator;
  }

  static hasAudioContext() {
    return !!(window.AudioContext || window.webkitAudioContext);
  }

  static hasServiceWorker() {
    return 'serviceWorker' in navigator;
  }
}
```

---

## 14. 개발 가이드라인

### 14.1 코딩 컨벤션

**네이밍:**
- 클래스: PascalCase (예: `GameEngine`, `InputManager`)
- 함수/메서드: camelCase (예: `updateScore`, `renderGrid`)
- 상수: UPPER_SNAKE_CASE (예: `GRID_SIZE`, `MAX_SCORE`)
- 파일명: PascalCase for classes, camelCase for utilities

**주석:**
```javascript
/**
 * 스네이크의 이동을 처리합니다.
 * @param {number} deltaTime - 이전 프레임으로부터의 경과 시간 (ms)
 * @returns {boolean} 이동 성공 여부
 */
function moveSnake(deltaTime) {
  // 구현...
}
```

### 14.2 Git Workflow

**브랜치 전략:**
```
main (프로덕션)
  └── develop (개발)
       ├── feature/game-engine
       ├── feature/ui-components
       └── feature/audio-system
```

**커밋 메시지:**
```
feat: 가상 조이스틱 구현
fix: 스네이크 자기 충돌 버그 수정
docs: README 업데이트
style: 코드 포맷팅
refactor: 게임 엔진 리팩토링
test: 충돌 감지 테스트 추가
chore: 빌드 스크립트 업데이트
```

---

## 15. 참고 자료

### 15.1 기술 문서
- [Canvas API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Service Worker API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web Audio API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

### 15.2 성능 최적화
- [Optimizing Canvas Performance](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas)
- [JavaScript Performance](https://web.dev/fast/)
- [PWA Best Practices](https://web.dev/pwa/)

---

## 부록 A: 상수 정의

```javascript
// src/scripts/utils/constants.js

export const GAME_CONFIG = {
  GRID_SIZE: 20,
  CANVAS_WIDTH: 400,
  CANVAS_HEIGHT: 600,
  INITIAL_SNAKE_LENGTH: 3,
  INITIAL_SPEED: 5,
  BOOST_MULTIPLIER: 1.5,
  BOOST_DURATION: 2000,
  TARGET_FPS: 60
};

export const COLORS = {
  PRIMARY: '#7bf425',
  PRIMARY_DARK: '#5ec315',
  BACKGROUND_LIGHT: '#f7f8f5',
  BACKGROUND_DARK: '#172210',
  SURFACE_LIGHT: '#ecf4e7',
  SURFACE_DARK: '#24331a'
};

export const DIFFICULTY = {
  EASY: { speed: 3, obstacles: 2 },
  NORMAL: { speed: 5, obstacles: 4 },
  HARD: { speed: 8, obstacles: 6 }
};

export const SCORE_VALUES = {
  FOOD: 10,
  COMBO_MULTIPLIER: 1.5,
  TIME_BONUS: 1
};
```

---

## 문서 버전 관리

| 버전 | 날짜 | 변경사항 | 작성자 |
|------|------|----------|--------|
| 1.0.0 | 2025-12-24 | 초기 기술 명세 작성 | Team |
