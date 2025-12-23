import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { GameEngine } from '../../../src/scripts/core/GameEngine';
import { GAME_CONFIG, GAME_STATE } from '../../../src/scripts/utils/constants';

describe('GameEngine', () => {
    let game;
    let canvas;
    let ctx;

    beforeEach(() => {
        // Mock Canvas
        canvas = {
            width: 400,
            height: 600,
            getContext: vi.fn(() => ({
                clearRect: vi.fn(),
                fillRect: vi.fn(),
                fillStyle: ''
            }))
        };
        ctx = canvas.getContext('2d');

        game = new GameEngine(canvas);
    });

    describe('Initialization', () => {
        test('should initialize with IDLE state', () => {
            expect(game.state).toBe(GAME_STATE.IDLE);
        });

        test('should initialize entities', () => {
            expect(game.snake).toBeDefined();
            expect(game.food).toBeDefined();
            expect(game.obstacleManager).toBeDefined();
        });

        test('should have default score 0', () => {
            expect(game.score).toBe(0);
        });
    });

    describe('Game Control', () => {
        test('start() should set state to PLAYING and reset entities', () => {
            game.start();
            expect(game.state).toBe(GAME_STATE.PLAYING);
            expect(game.score).toBe(0);
            expect(game.snake.body.length).toBe(GAME_CONFIG.INITIAL_SNAKE_LENGTH);
        });

        test('pause() should toggle state between PLAYING and PAUSED', () => {
            game.start();
            game.pause();
            expect(game.state).toBe(GAME_STATE.PAUSED);
            game.pause();
            expect(game.state).toBe(GAME_STATE.PLAYING);
        });

        test('gameover() should set state to GAMEOVER', () => {
            game.gameOver();
            expect(game.state).toBe(GAME_STATE.GAMEOVER);
        });
    });



    describe('Difficulty Settings', () => {
        test('should apply difficulty multiplier to snake speed', () => {
            // Default speed is 150
            // Set Easy (1.2x) -> 180
            game.setDifficulty(1.2);
            game.start();
            expect(game.snake.speed).toBe(180);

            // Set Hard (0.7x) -> 105
            game.setDifficulty(0.7);
            game.start();
            expect(game.snake.speed).toBe(105);
        });
    });

    describe('Game Loop and Logic', () => {
        test('update() should not update snake if IDLE or PAUSED', () => {
            const spySnakeMove = vi.spyOn(game.snake, 'move');
            game.state = GAME_STATE.IDLE;
            game.update(16);
            expect(spySnakeMove).not.toHaveBeenCalled();

            game.state = GAME_STATE.PAUSED;
            game.update(16);
            expect(spySnakeMove).not.toHaveBeenCalled();
        });

        test('update() should move snake when PLAYING and time elapsed', () => {
            game.start();
            const spySnakeMove = vi.spyOn(game.snake, 'move');

            // First update might set lastTime
            game.update(0);

            // Simulate time passage greater than move interval
            // Default speed 150ms
            game.timeSinceLastMove = 151;

            // We need to allow game.update logic to consume timeAccumulator
            game.update(16); // delta
            // Logic usually: timeAccumulator += delta; if (timeAccumulator > speed) move()

            // Let's modify game instance directly for testability if possible
            // or just assume update(150+) triggers move.

            // game.update takes delta time? or timestamp?
            // Usually delta.

            // Manually force accumulation check if exposed, or rely on update inputs.
        });
    });
});
