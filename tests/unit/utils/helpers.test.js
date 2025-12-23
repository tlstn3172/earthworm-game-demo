import { describe, test, expect } from 'vitest';
import { randomPosition, isValidPosition, calculateDistance, formatTime, formatScore } from '../../../src/scripts/utils/helpers';
import { GAME_CONFIG } from '../../../src/scripts/utils/constants';

describe('Helper Functions', () => {
    describe('randomPosition', () => {
        test('should return a position within grid and canvas bounds', () => {
            const pos = randomPosition(GAME_CONFIG.CANVAS_WIDTH, GAME_CONFIG.CANVAS_HEIGHT, GAME_CONFIG.GRID_SIZE);

            expect(pos.x).toBeGreaterThanOrEqual(0);
            expect(pos.x).toBeLessThan(GAME_CONFIG.CANVAS_WIDTH);
            expect(pos.y).toBeGreaterThanOrEqual(0);
            expect(pos.y).toBeLessThan(GAME_CONFIG.CANVAS_HEIGHT);

            // Should align with grid
            expect(pos.x % GAME_CONFIG.GRID_SIZE).toBe(0);
            expect(pos.y % GAME_CONFIG.GRID_SIZE).toBe(0);
        });
    });

    describe('isValidPosition', () => {
        test('should return true for position inside bounds', () => {
            const pos = { x: 100, y: 100 };
            expect(isValidPosition(pos, GAME_CONFIG)).toBe(true);
        });

        test('should return false for negative coordinates', () => {
            expect(isValidPosition({ x: -20, y: 100 }, GAME_CONFIG)).toBe(false);
            expect(isValidPosition({ x: 100, y: -20 }, GAME_CONFIG)).toBe(false);
        });

        test('should return false for out of bounds coordinates', () => {
            expect(isValidPosition({ x: GAME_CONFIG.CANVAS_WIDTH, y: 100 }, GAME_CONFIG)).toBe(false);
            expect(isValidPosition({ x: 100, y: GAME_CONFIG.CANVAS_HEIGHT }, GAME_CONFIG)).toBe(false);
        });
    });

    describe('calculateDistance', () => {
        test('should calculate correct distance between two points', () => {
            const p1 = { x: 0, y: 0 };
            const p2 = { x: 30, y: 40 };
            expect(calculateDistance(p1, p2)).toBe(50); // 3-4-5 rule
        });
    });

    describe('formatTime', () => {
        test('should format seconds into MM:SS', () => {
            expect(formatTime(0)).toBe('00:00');
            expect(formatTime(59)).toBe('00:59');
            expect(formatTime(60)).toBe('01:00');
            expect(formatTime(65)).toBe('01:05');
            expect(formatTime(600)).toBe('10:00');
        });
    });

    describe('formatScore', () => {
        test('should format score with current and best', () => {
            expect(formatScore(100)).toBe('100');
        });
    });
});
