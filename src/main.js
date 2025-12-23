import '../styles/index.css';
import { GameEngine } from './scripts/core/GameEngine';
import { InputManager } from './scripts/managers/InputManager';
import { StateManager } from './scripts/managers/StateManager';
import { ScoreManager } from './scripts/managers/ScoreManager';
import { AudioManager } from './scripts/managers/AudioManager';
import { StorageManager } from './scripts/managers/StorageManager';
import { GAME_STATE, DIFFICULTY } from './scripts/utils/constants';

// Initialize Managers
const storageManager = new StorageManager();
const scoreManager = new ScoreManager(storageManager);
const stateManager = new StateManager();
const audioManager = new AudioManager();
// Input Manager binds to window by default for keyboard, 
// but for touch we might want to bind to canvas or a specific layer if needed.
// Binding to window is fine for full screen.
const inputManager = new InputManager(window);

// Get Canvas
const canvas = document.getElementById('game-canvas');
const dpr = window.devicePixelRatio || 1;

// Resize Canvas
function resize() {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    // We might need to scale context or handle game engine resize logic?
    // For TDD scope, we just set it once or reload.
    // Ideally GameEngine handles resize.
}
resize();
window.addEventListener('resize', resize);

// UI Elements
const ui = {
    start: document.getElementById('start-screen'),
    hud: document.getElementById('hud'),
    pause: document.getElementById('pause-screen'),
    gameover: document.getElementById('gameover-screen'),
    // dynamic fields
    currentScore: document.getElementById('current-score'),
    startHigh: document.getElementById('start-high-score'),
    finalScore: document.getElementById('final-score'),
    finalHigh: document.getElementById('final-high-score'),
    // buttons
    startBtn: document.getElementById('start-btn'),
    pauseBtn: document.getElementById('pause-btn'),
    resumeBtn: document.getElementById('resume-btn'),
    restartBtn: document.getElementById('restart-btn'),
    homeBtn: document.getElementById('home-btn'),
    boostBtn: document.getElementById('boost-btn'),
    // Settings UI
    settingsBtn: document.getElementById('settings-btn'),
    settingsScreen: document.getElementById('settings-screen'),
    settingsBackBtn: document.getElementById('settings-back-btn'),
    toggleSoundBtn: document.getElementById('toggle-sound'),
    toggleVibrationBtn: document.getElementById('toggle-vibration'),
    toggleThemeBtn: document.getElementById('toggle-theme'),
    sensitivitySlider: document.getElementById('sensitivity-slider'),
    sensitivityValue: document.getElementById('sensitivity-value'),
    toggleVibrationBtn: document.getElementById('toggle-vibration'),
    toggleThemeBtn: document.getElementById('toggle-theme'),
    sensitivitySlider: document.getElementById('sensitivity-slider'),
    sensitivityValue: document.getElementById('sensitivity-value'),
    difficultyBtns: document.querySelectorAll('.difficulty-btn'),
    // Share
    shareBtn: document.getElementById('share-btn'),
    toast: document.getElementById('toast')
};

// TOAST HELPER
const showToast = (message) => {
    ui.toast.textContent = message;
    ui.toast.classList.add('show');
    setTimeout(() => {
        ui.toast.classList.remove('show');
    }, 2000);
};

// VIBRATION HELPER
const vibrate = (ms) => {
    const settings = storageManager.getSettings();
    if (settings && settings.vibration !== false && navigator.vibrate) {
        navigator.vibrate(ms);
    }
};

// Initialize GameEngine
const game = new GameEngine(canvas, {
    inputManager,
    stateManager,
    scoreManager,
    audioManager
});

// Haptic hook into audioManager or state changes for now?
// Actually GameEngine calls audioManager.play directly.
// We can wrap audioManager.play or pass a custom object.
// Let's monkey-patch audioManager.play for haptics to save refactoring time for now, 
// as GameEngine uses managers directly.

const originalPlay = audioManager.play.bind(audioManager);
audioManager.play = (name) => {
    originalPlay(name);
    // Haptic mapping
    switch (name) {
        case 'eat': vibrate(15); break;
        case 'crash': vibrate(200); break;
        case 'levelup': vibrate(50); break;
    }
};

// Load Settings
const userSettings = storageManager.getSettings();
if (userSettings) {
    if (userSettings.sound === false) audioManager.toggleMute();

    // Apply Sensitivity
    if (userSettings.sensitivity) {
        inputManager.setSensitivity(userSettings.sensitivity);
    }

    // Apply Difficulty
    if (userSettings.difficulty) {
        const diff = Object.values(DIFFICULTY).find(d => d.id === userSettings.difficulty);
        if (diff) game.setDifficulty(diff.multiplier);
    }

    // Apply Theme
    if (userSettings.theme === 'light') {
        document.body.classList.add('light-theme');
    }
}

// Update UI based on loaded settings
const updateSettingsUI = () => {
    // Sound
    if (audioManager.isMuted) {
        ui.toggleSoundBtn.textContent = 'OFF';
        ui.toggleSoundBtn.classList.remove('active');
    } else {
        ui.toggleSoundBtn.textContent = 'ON';
        ui.toggleSoundBtn.classList.add('active');
    }

    // Vibration
    const settings = storageManager.getSettings();
    const vibEnabled = !settings || settings.vibration !== false;
    if (vibEnabled) {
        ui.toggleVibrationBtn.textContent = 'ON';
        ui.toggleVibrationBtn.classList.add('active');
    } else {
        ui.toggleVibrationBtn.textContent = 'OFF';
        ui.toggleVibrationBtn.classList.remove('active');
    }

    // ThemeMode
    const isLight = document.body.classList.contains('light-theme');
    ui.toggleThemeBtn.textContent = isLight ? 'LIGHT' : 'DARK';

    // Difficulty
    const savedDiff = (storageManager.getSettings() || {}).difficulty || 'normal';
    ui.difficultyBtns.forEach(btn => {
        if (btn.dataset.diff === savedDiff) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Sensitivity
    const savedSens = (storageManager.getSettings() || {}).sensitivity || 30;
    if (ui.sensitivitySlider) {
        ui.sensitivitySlider.value = savedSens;
        ui.sensitivityValue.textContent = savedSens;
    }
};
updateSettingsUI();

// Boost Logic
const handleBoostStart = (e) => {
    if (e.cancelable) e.preventDefault();
    vibrate(10); // Light haptic on boost
    if (stateManager.currentState === GAME_STATE.PLAYING) {
        game.snake.activateBoost();
    }
};
const handleBoostEnd = (e) => {
    if (e.cancelable) e.preventDefault();
    game.snake.deactivateBoost();
};


ui.boostBtn.addEventListener('mousedown', handleBoostStart);
ui.boostBtn.addEventListener('mouseup', handleBoostEnd);
ui.boostBtn.addEventListener('mouseleave', handleBoostEnd);
ui.boostBtn.addEventListener('touchstart', handleBoostStart, { passive: false });
ui.boostBtn.addEventListener('touchend', handleBoostEnd, { passive: false });

// UI Event Listeners
ui.startBtn.addEventListener('click', () => {
    // Resume audio context on user interaction
    if (audioManager.ctx.state === 'suspended') {
        audioManager.ctx.resume();
    }
    game.start();
});

// Settings Navigation
ui.settingsBtn.addEventListener('click', () => {
    ui.start.classList.add('hidden');
    ui.start.classList.remove('active');

    ui.settingsScreen.classList.remove('hidden');
    ui.settingsScreen.classList.add('active');
});

ui.settingsBackBtn.addEventListener('click', () => {
    ui.settingsScreen.classList.add('hidden');
    ui.settingsScreen.classList.remove('active');

    ui.start.classList.remove('hidden');
    ui.start.classList.add('active');
});

// Settings Toggles
ui.toggleSoundBtn.addEventListener('click', () => {
    audioManager.toggleMute();
    updateSettingsUI();

    // Save Settings
    storageManager.saveSettings({
        sound: !audioManager.isMuted
    });
});

ui.toggleVibrationBtn.addEventListener('click', () => {
    const current = storageManager.getSettings() || {};
    const newState = current.vibration === false; // toggle

    storageManager.saveSettings({ vibration: newState });
    updateSettingsUI();
});

ui.toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    storageManager.saveSettings({ theme: isLight ? 'light' : 'dark' });
    updateSettingsUI();
});

// Difficulty Buttons
ui.difficultyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const diffId = btn.dataset.diff;
        const diffConfig = Object.values(DIFFICULTY).find(d => d.id === diffId);

        if (diffConfig) {
            game.setDifficulty(diffConfig.multiplier);
            storageManager.saveSettings({ difficulty: diffId });
            updateSettingsUI();
        }
    });
});

// Sensitivity Slider
if (ui.sensitivitySlider) {
    ui.sensitivitySlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        ui.sensitivityValue.textContent = val;
    });

    ui.sensitivitySlider.addEventListener('change', (e) => {
        const val = parseInt(e.target.value, 10);
        inputManager.setSensitivity(val);
        storageManager.saveSettings({ sensitivity: val });
    });
}

ui.pauseBtn.addEventListener('click', () => game.pause());
ui.resumeBtn.addEventListener('click', () => game.pause());
ui.restartBtn.addEventListener('click', () => game.start());
ui.homeBtn.addEventListener('click', () => {
    stateManager.setState(GAME_STATE.IDLE);
});

ui.shareBtn.addEventListener('click', async () => {
    const score = scoreManager.currentScore;
    const shareData = {
        title: 'Snake Reborn',
        text: `I scored ${score} points in Snake Reborn! Can you beat me?`,
        url: window.location.href
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            // Fallback
            await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
            showToast('Score copied to clipboard!');
        }
    } catch (err) {
        console.warn('Share failed:', err);
    }
});

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('SW registered:', registration.scope);
        }).catch(err => {
            console.log('SW registration failed:', err);
        });
    });
}



// State Changes Observer
stateManager.subscribe((state) => {
    // Hide all screens first
    ui.start.classList.add('hidden');
    ui.start.classList.remove('active');

    ui.hud.classList.add('hidden'); // default hidden

    ui.pause.classList.add('hidden');
    ui.pause.classList.remove('active');

    ui.gameover.classList.add('hidden');
    ui.gameover.classList.remove('active');

    ui.boostBtn.classList.add('hidden');

    switch (state) {
        case GAME_STATE.IDLE:
            ui.start.classList.remove('hidden');
            ui.start.classList.add('active');
            ui.startHigh.textContent = scoreManager.highScore;
            break;
        case GAME_STATE.PLAYING:
            ui.hud.classList.remove('hidden');
            ui.boostBtn.classList.remove('hidden');
            break;
        case GAME_STATE.PAUSED:
            ui.hud.classList.remove('hidden'); // Keep HUD visible? or hide
            ui.pause.classList.remove('hidden');
            ui.pause.classList.add('active');
            break;
        case GAME_STATE.GAMEOVER:
            ui.gameover.classList.remove('hidden');
            ui.gameover.classList.add('active');
            ui.finalScore.textContent = scoreManager.currentScore;
            ui.finalHigh.textContent = scoreManager.highScore;
            break;
    }
});

// Game Loop
let lastTime = 0;
function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    game.update(deltaTime);
    game.render();

    // Update Score in HUD if playing
    if (stateManager.currentState === GAME_STATE.PLAYING) {
        ui.currentScore.textContent = scoreManager.currentScore;
    }

    requestAnimationFrame(gameLoop);
}

// Initial UI State
stateManager.setState(GAME_STATE.IDLE);
requestAnimationFrame(gameLoop);
