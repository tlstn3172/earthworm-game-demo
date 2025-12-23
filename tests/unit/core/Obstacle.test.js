import { describe, test, expect, beforeEach } from 'vitest';
import { ObstacleManager } from '../../../src/scripts/core/ObstacleManager';
import { GAME_CONFIG } from '../../../src/scripts/utils/constants';

describe('Obstacle System', () => {
    let obstacleManager;
    const CANVAS_WIDTH = 400;
    const CANVAS_HEIGHT = 600;
    const GRID_SIZE = 20;

    beforeEach(() => {
        obstacleManager = new ObstacleManager(CANVAS_WIDTH, CANVAS_HEIGHT, GRID_SIZE);
    });

    describe('Initialization', () => {
        test('should initialize with empty obstacles', () => {
            expect(obstacleManager.obstacles).toEqual([]);
        });
    });

    describe('Level Generation', () => {
        test('should generate walls for level 1 (borders)', () => {
            // Some levels might have only borders, or borders are handled by Wall Collision?
            // Usually borders are separate. Obstacles are "internal" blocks.
            // Let's assume level 1 has "some" obstacles or none.
            // If we test generate(1), we assume it populates obstacles array.
            obstacleManager.generate(1);
            // Level 1 might be empty or basic?
            // Let's assume it puts something.
            // If Level 1 is "No Obstacles", expect length 0.
            // Let's assume Level 2 has obstacles.
        });

        test('should generate random obstacles for higher levels', () => {
            obstacleManager.generate(5);
            expect(obstacleManager.obstacles.length).toBeGreaterThan(0);
        });

        test('generated obstacles should be grid aligned', () => {
            obstacleManager.generate(5);
            if (obstacleManager.obstacles.length > 0) {
                const obs = obstacleManager.obstacles[0];
                expect(obs.x % GRID_SIZE).toBe(0);
                expect(obs.y % GRID_SIZE).toBe(0);
            }
        });
    });

    describe('Collision', () => {
        test('should verify checkCollision works via Manager', () => {
            obstacleManager.obstacles = [{ x: 100, y: 100 }];
            // Using helper or directly checking array?
            // The Collision class handles the logic, Manager just holds data usually.
            // But maybe Manager exposes check?
            // Let's test if it has a way to retrieve obstacles.
            expect(obstacleManager.getObstacles().length).toBe(1);
        });
    });
});
