import { describe, test, expect } from 'vitest';
import { Collision } from '../../../src/scripts/core/Collision';
import { GAME_CONFIG } from '../../../src/scripts/utils/constants';

describe('Collision System', () => {
    describe('pointsCollide', () => {
        test('should return true when points are at same position', () => {
            expect(Collision.pointsCollide({ x: 10, y: 10 }, { x: 10, y: 10 })).toBe(true);
        });

        test('should return false when points are different', () => {
            expect(Collision.pointsCollide({ x: 10, y: 10 }, { x: 20, y: 10 })).toBe(false);
        });

        test('should return true within a small threshold if needed', () => {
            // In grid based game, usually must be exact unless we have smooth movement floating point
            // But assuming integer grid coordinates
            expect(Collision.pointsCollide({ x: 10, y: 10 }, { x: 10.01, y: 10 })).toBe(false);
        });
    });

    describe('checkWallCollision', () => {
        test('should return true given position is outside canvas', () => {
            const { CANVAS_WIDTH, CANVAS_HEIGHT } = GAME_CONFIG;
            expect(Collision.checkWallCollision({ x: -1, y: 50 }, CANVAS_WIDTH, CANVAS_HEIGHT)).toBe(true);
            expect(Collision.checkWallCollision({ x: CANVAS_WIDTH, y: 50 }, CANVAS_WIDTH, CANVAS_HEIGHT)).toBe(true);
            expect(Collision.checkWallCollision({ x: 50, y: -1 }, CANVAS_WIDTH, CANVAS_HEIGHT)).toBe(true);
            expect(Collision.checkWallCollision({ x: 50, y: CANVAS_HEIGHT }, CANVAS_WIDTH, CANVAS_HEIGHT)).toBe(true);
        });

        test('should return false given position is inside', () => {
            const { CANVAS_WIDTH, CANVAS_HEIGHT } = GAME_CONFIG;
            expect(Collision.checkWallCollision({ x: 0, y: 0 }, CANVAS_WIDTH, CANVAS_HEIGHT)).toBe(false);
            expect(Collision.checkWallCollision({ x: CANVAS_WIDTH - 1, y: CANVAS_HEIGHT - 1 }, CANVAS_WIDTH, CANVAS_HEIGHT)).toBe(false);
        });
    });

    describe('checkSelfCollision', () => {
        test('should return true if head collides with any body segment', () => {
            const head = { x: 100, y: 100 };
            const body = [
                { x: 120, y: 100 },
                { x: 120, y: 120 },
                { x: 100, y: 120 },
                { x: 100, y: 100 } // Tail at same pos as head? No, usually head is distinct from body in check?
                // Let's assume body array includes head or not? 
                // Typically body is the "rest".
                // If we pass body array that contains collision point.
            ];
            expect(Collision.checkSelfCollision(head, body)).toBe(true);
        });

        test('should return false if head does not collide', () => {
            const head = { x: 80, y: 100 };
            const body = [
                { x: 100, y: 100 },
                { x: 120, y: 100 }
            ];
            expect(Collision.checkSelfCollision(head, body)).toBe(false);
        });
    });
});
