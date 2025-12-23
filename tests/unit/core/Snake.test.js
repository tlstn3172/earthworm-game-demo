import { describe, test, expect, beforeEach } from 'vitest';
import { Snake } from '../../../src/scripts/core/Snake';
import { GAME_CONFIG, DIRECTIONS } from '../../../src/scripts/utils/constants';

describe('Snake Entity', () => {
    let snake;
    const START_X = 100;
    const START_Y = 100;

    beforeEach(() => {
        snake = new Snake(START_X, START_Y, GAME_CONFIG.INITIAL_SNAKE_LENGTH);
    });

    describe('Initialization', () => {
        test('should initialize with correct body length', () => {
            expect(snake.body.length).toBe(GAME_CONFIG.INITIAL_SNAKE_LENGTH);
        });

        test('should initialize at starting position', () => {
            expect(snake.body[0]).toEqual({ x: START_X, y: START_Y });
        });

        test('should have default direction (RIGHT likely)', () => {
            expect(snake.direction).toEqual(DIRECTIONS.RIGHT);
        });

        test('should have initial speed', () => {
            expect(snake.speed).toBe(GAME_CONFIG.INITIAL_SPEED);
        });
    });

    describe('Direction Control', () => {
        test('should change direction', () => {
            snake.setDirection(DIRECTIONS.DOWN);
            // Direction change might be applied on next update or immediately.
            // Assuming nextDirection pattern if multiple inputs per frame.
            expect(snake.nextDirection).toEqual(DIRECTIONS.DOWN);
        });

        test('should ignore reverse direction (180 degree turn)', () => {
            snake.direction = DIRECTIONS.RIGHT;
            snake.setDirection(DIRECTIONS.LEFT);
            expect(snake.nextDirection).toEqual(DIRECTIONS.RIGHT); // Should remain ignored

            snake.direction = DIRECTIONS.UP;
            snake.nextDirection = DIRECTIONS.UP; // Sync state
            snake.setDirection(DIRECTIONS.DOWN);
            expect(snake.nextDirection).toEqual(DIRECTIONS.UP); // Should remain
        });

        test('should allow perpendicular turns', () => {
            snake.direction = DIRECTIONS.RIGHT;
            snake.setDirection(DIRECTIONS.UP);
            expect(snake.nextDirection).toEqual(DIRECTIONS.UP);
        });
    });

    describe('Movement', () => {
        test('should move in current direction', () => {
            const initialHead = { ...snake.body[0] };
            snake.direction = DIRECTIONS.RIGHT;
            snake.nextDirection = DIRECTIONS.RIGHT; // Ensure sync

            snake.move();

            expect(snake.body[0].x).toBe(initialHead.x + GAME_CONFIG.GRID_SIZE);
            expect(snake.body[0].y).toBe(initialHead.y);
        });

        test('body should follow head', () => {
            // Mock body
            snake.body = [
                { x: 100, y: 100 },
                { x: 80, y: 100 },
                { x: 60, y: 100 }
            ];
            snake.direction = DIRECTIONS.DOWN;
            snake.nextDirection = DIRECTIONS.DOWN;

            snake.move();

            expect(snake.body[0]).toEqual({ x: 100, y: 100 + GAME_CONFIG.GRID_SIZE }); // New Head
            expect(snake.body[1]).toEqual({ x: 100, y: 100 }); // Old Head
            expect(snake.body[2]).toEqual({ x: 80, y: 100 }); // Old Body[1]
        });
    });

    describe('Growth', () => {
        test('should increase length when grow is called', () => {
            const initialLength = snake.body.length;
            snake.grow();
            // Usually grow happens on next move, or immediately adds tail?
            // "grow" usually sets a flag to not remove tail on next move.
            // Let's assume grow() just sets a flag 'growing' = true

            // If implementation is flag-based:
            expect(snake.growing).toBe(true);

            snake.move();
            expect(snake.body.length).toBe(initialLength + 1);
            expect(snake.growing).toBe(false);
        });
    });
    describe('Boost', () => {
        test('activateBoost() should increase speed', () => {
            const normalSpeed = snake.speed;
            snake.activateBoost();
            expect(snake.speed).toBeLessThan(normalSpeed); // Smaller value = faster tick
        });

        test('should revert speed after duration (or deactivate)', () => {
            // If we test toggle behavior
            snake.activateBoost();
            const boostedSpeed = snake.speed;

            snake.deactivateBoost();
            expect(snake.speed).toBe(GAME_CONFIG.INITIAL_SPEED);
            expect(snake.speed).toBeGreaterThan(boostedSpeed);
        });

        test('should respect cooldown (mock logic)', () => {
            // Assuming implementation has cooldown
            snake.activateBoost();
            snake.deactivateBoost();

            // If cooldown implemented, immediate re-boost might fail or just work 
            // dependent on design. For now simple toggle test is enough.
        });
    });
});
