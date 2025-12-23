# Snake Reborn 🐍

A modern, neon-styled mobile web implementation of the classic Snake game. Built with Vanilla JavaScript and Vite, emphasizing TDD and clean architecture.

## Features

- **Classic Gameplay**: Eat food, grow, and avoid walls/obstacles.
- **Modern Aesthetics**: Neon glow, smooth animations, and dark mode interface.
- **Mobile First**: Touch swipe controls and responsive layout.
- **Game Loop**: stable 60 FPS loop with `requestAnimationFrame`.
- **Managers**:
  - `StateManager`: Handles game states (IDLE, PLAYING, PAUSED, GAMEOVER).
  - `ScoreManager`: Tracks current and high scores with localStorage persistence.
  - `AudioManager`: Synthesized sound effects using Web Audio API (no external assets needed).
  - `InputManager`: Unified keyboard (Arrow/WASD) and touch (Swipe) handling.
- **PWA Support**: Installable on mobile devices with offline support (Service Worker).
- **Advanced Features**: 
  - Difficulty Settings (Easy/Normal/Hard)
  - Customizable Sensitivity
  - Dark/Light Theme Support
  - Haptic Feedback & Share Score Functionality

## Tech Stack

- **Core**: HTML5 Canvas, Vanilla JavaScript (ES Modules)
- **Styling**: CSS3 (Variables, Flexbox)
- **Build Tool**: Vite
- **Testing**: Vitest (Unit & Integration Tests)

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Run Tests**
   ```bash
   npm run test
   ```

## Project Structure

```
src/
├── scripts/
│   ├── components/      # (Planned) UI Components
│   ├── core/           # Game Entities (Snake, Food, Engine)
│   ├── managers/       # System Managers (State, Audio, etc.)
│   └── utils/          # Helpers & Constants
├── styles/             # CSS Files
└── main.js             # Entry Point & UI Wiring
tests/                  # Unit Tests
index.html             # Entry HTML
```

## License

MIT
