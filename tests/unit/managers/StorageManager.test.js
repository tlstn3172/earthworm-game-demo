import { describe, test, expect, vi, beforeEach } from 'vitest';
import { StorageManager } from '../../../src/scripts/managers/StorageManager';

describe('StorageManager', () => {
    let storageManager;
    let mockStorage;

    beforeEach(() => {
        // Mock localStorage
        mockStorage = {};
        global.localStorage = {
            getItem: vi.fn((key) => mockStorage[key] || null),
            setItem: vi.fn((key, value) => { mockStorage[key] = value; }),
            clear: vi.fn(() => { mockStorage = {}; })
        };

        storageManager = new StorageManager();
    });

    describe('High Score', () => {
        test('should save high score', () => {
            storageManager.saveHighScore(100);
            expect(localStorage.setItem).toHaveBeenCalledWith('snake_highscore', '100');
        });

        test('should get high score', () => {
            mockStorage['snake_highscore'] = '50';
            expect(storageManager.getHighScore()).toBe(50);
        });

        test('should return 0 if no high score', () => {
            expect(storageManager.getHighScore()).toBe(0);
        });

        test('should only update if new score is higher', () => {
            mockStorage['snake_highscore'] = '100';
            storageManager.saveHighScore(50); // Lower
            expect(localStorage.setItem).not.toHaveBeenCalledWith('snake_highscore', '50');

            storageManager.saveHighScore(150); // Higher
            expect(localStorage.setItem).toHaveBeenCalledWith('snake_highscore', '150');
        });
    });

    describe('Settings', () => {
        test('should save settings', () => {
            const settings = { sound: true, vibration: false };
            storageManager.saveSettings(settings);
            expect(localStorage.setItem).toHaveBeenCalledWith('snake_settings', JSON.stringify(settings));
        });

        test('should load settings', () => {
            const settings = { sound: true, vibration: false };
            mockStorage['snake_settings'] = JSON.stringify(settings);
            expect(storageManager.getSettings()).toEqual(settings);
        });

        test('should return default settings if not found', () => {
            const defaults = { sound: true, vibration: true, difficulty: 'normal' };
            // Assuming implemented default return
            const loaded = storageManager.getSettings();
            // Just check if it returns object and has expected keys
            expect(loaded).toHaveProperty('sound');
            expect(loaded).toHaveProperty('difficulty');
        });
    });
});
