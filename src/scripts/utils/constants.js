export const GAME_CONFIG = {
    GRID_SIZE: 20,
    CANVAS_WIDTH: 400,
    CANVAS_HEIGHT: 600,
    INITIAL_SPEED: 150, // ms per frame (lower is faster)
    MIN_SPEED: 50,
    SPEED_DECREMENT: 2,
    BOOST_SPEED_MULTIPLIER: 0.5, // 50% faster (e.g. 75ms)
    INITIAL_SNAKE_LENGTH: 3
};

export const COLORS = {
    SNAKE_HEAD: '#7bf425',
    SNAKE_BODY: '#5ec315',
    FOOD: '#ff0055',
    OBSTACLE: '#ffffff',
    GRID: 'rgba(255, 255, 255, 0.05)'
};

export const DIRECTIONS = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 }
};

export const SCORE_VALUES = {
    FOOD: 10,
    TIME_BONUS: 100
};

export const GAME_STATE = {
    IDLE: 'idle',
    PLAYING: 'playing',
    PAUSED: 'paused',
    GAMEOVER: 'gameover'
};

export const DIFFICULTY = {
    EASY: { id: 'easy', multiplier: 1.2 },   // Slower
    NORMAL: { id: 'normal', multiplier: 1.0 },
    HARD: { id: 'hard', multiplier: 0.7 }    // Faster
};
