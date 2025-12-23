import { describe, test, expect, vi, beforeEach } from 'vitest';
import { GameEngine } from '../../../src/scripts/core/GameEngine';
import { GAME_STATE, DIRECTIONS } from '../../../src/scripts/utils/constants';

describe('GameEngine Integration', () => {
    let game;
    let canvas;
    let mockInput, mockState, mockScore, mockAudio;

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

        // Mock Managers
        mockInput = {
            onDirection: vi.fn()
        };
        mockState = {
            currentState: GAME_STATE.IDLE,
            setState: vi.fn((newState) => {
                mockState.currentState = newState;
            }),
            subscribe: vi.fn()
        };
        mockScore = {
            currentScore: 0,
            addPoints: vi.fn(),
            reset: vi.fn()
        };
        mockAudio = {
            play: vi.fn()
        };

        game = new GameEngine(canvas, {
            inputManager: mockInput,
            stateManager: mockState,
            scoreManager: mockScore,
            audioManager: mockAudio
        });
    });

    test('should subscribe to input changes', () => {
        expect(mockInput.onDirection).toHaveBeenCalled();
    });

    test('should update snake direction on input', () => {
        // Find the callback passed to onDirection
        const callback = mockInput.onDirection.mock.calls[0][0];

        // Start game first to set state to PLAYING and create snake
        game.start();

        // Simulate input
        callback(DIRECTIONS.UP);

        expect(game.snake.nextDirection).toBe(DIRECTIONS.UP);
    });

    test('should play sound and update score on food collision', () => {
        game.start();
        // Force collision setup
        game.snake.body[0] = { x: 100, y: 100 };
        game.food.position = { x: 100, y: 100 };

        // Mock Collision return true (if we mocked Collision class, but here we use real logic or override)
        // Since we are integration testing, we rely on real logic mostly.

        // Run collision check
        game.checkCollisions();

        expect(mockAudio.play).toHaveBeenCalledWith('eat');
        expect(mockScore.addPoints).toHaveBeenCalled();
    });

    test('should play crash sound and set gameover state on wall collision', () => {
        game.start();
        // Force wall collision
        game.snake.body[0] = { x: -10, y: 100 };

        game.checkCollisions();

        expect(mockAudio.play).toHaveBeenCalledWith('crash');
        expect(mockState.setState).toHaveBeenCalledWith(GAME_STATE.GAMEOVER);
    });
});
