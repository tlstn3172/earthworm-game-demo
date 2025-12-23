# Design Files

This directory contains the UI/UX design mockups for Snake Reborn game.

## Structure

```
design/
├── start-screen/       # Game start screen
│   ├── screen.png      # Screenshot
│   └── code.html       # HTML mockup
├── gameover-screen/    # Game over screen
│   ├── screen.png
│   └── code.html
├── gameplay-screen/    # Main gameplay screen
│   ├── screen.png
│   └── code.html
└── settings-screen/    # Settings screen
    ├── screen.png
    └── code.html
```

## Screens

### 1. Start Screen
- Game logo and branding
- "GAME START" button
- "SETTINGS" button
- Best score display
- Version info and controls

### 2. Gameplay Screen
- Game canvas with grid
- Snake and food rendering
- Virtual joystick control
- Boost button
- Score and timer HUD
- Pause button

### 3. Game Over Screen
- Final score display
- Best score comparison
- "다시 시작" (Restart) button
- "메인 메뉴" (Main Menu) button
- "점수 공유" (Share Score) button

### 4. Settings Screen
- Sound effects toggle
- Background music toggle
- Control sensitivity slider
- Difficulty selection (쉬움/보통/어려움)
- Vibration toggle
- Save settings button

## Design System

- **Primary Color**: #7bf425 (Neon Green)
- **Font**: Spline Sans
- **Icons**: Material Symbols Outlined
- **Framework**: Tailwind CSS
- **Theme**: Light/Dark mode support

## Usage

These mockups serve as reference for implementing the actual game screens.
Refer to [PRD.md](../PRD.md) for detailed specifications.
