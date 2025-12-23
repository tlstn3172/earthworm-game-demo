import { describe, test, expect, beforeEach, vi } from 'vitest';
import { ScoreManager } from '../../../src/scripts/managers/ScoreManager';
import { SCORE_VALUES } from '../../../src/scripts/utils/constants';

describe('ScoreManager', () => {
    let scoreManager;
    let mockStorageManager;

    beforeEach(() => {
        mockStorageManager = {
            saveHighScore: vi.fn(),
            getHighScore: vi.fn(() => 100)
        };
        scoreManager = new ScoreManager(mockStorageManager);
    });

    describe('Initialization', () => {
        test('should initialize with current score 0 and load high score', () => {
            expect(scoreManager.currentScore).toBe(0);
            expect(scoreManager.highScore).toBe(100);
            expect(mockStorageManager.getHighScore).toHaveBeenCalled();
        });
    });

    describe('Score Updates', () => {
        test('should add points correctly', () => {
            scoreManager.addPoints(SCORE_VALUES.FOOD);
            expect(scoreManager.currentScore).toBe(SCORE_VALUES.FOOD);
        });

        test('should update high score via storage manager if new record', () => {
            scoreManager.addPoints(150); // Beating 100
            expect(mockStorageManager.saveHighScore).toHaveBeenCalledWith(150);
            expect(scoreManager.highScore).toBe(150);
        });

        test('should not call saveHighScore if not record', () => {
            scoreManager.addPoints(50);
            expect(mockStorageManager.saveHighScore).not.toHaveBeenCalled();
            expect(scoreManager.highScore).toBe(100); // Remain old high
        });
    });

    describe('Reset', () => {
        test('should reset score to 0 but keep high score', () => {
            scoreManager.addPoints(50);
            scoreManager.reset();
            expect(scoreManager.currentScore).toBe(0);
            expect(scoreManager.highScore).toBe(100);
        });
    });
});
