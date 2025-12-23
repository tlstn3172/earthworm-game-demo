/**
 * Manage local storage operations
 */
export class StorageManager {
    constructor() {
        this.KEYS = {
            HIGHSCORE: 'snake_highscore',
            SETTINGS: 'snake_settings'
        };
    }

    /**
     * Save high score if greater than current
     * @param {number} score 
     */
    saveHighScore(score) {
        const currentHigh = this.getHighScore();
        if (score > currentHigh) {
            localStorage.setItem(this.KEYS.HIGHSCORE, score.toString());
        }
    }

    /**
     * Get saved high score
     * @returns {number}
     */
    getHighScore() {
        const stored = localStorage.getItem(this.KEYS.HIGHSCORE);
        return stored ? parseInt(stored, 10) : 0;
    }

    /**
     * Save game settings
     * @param {object} settings 
     */
    saveSettings(settings) {
        localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(settings));
    }

    /**
     * Get game settings
     * @returns {object}
     */
    getSettings() {
        const stored = localStorage.getItem(this.KEYS.SETTINGS);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error('Failed to parse settings', e);
                return this.getDefaultSettings();
            }
        }
        return this.getDefaultSettings();
    }

    /**
     * Default settings
     * @returns {object}
     */
    getDefaultSettings() {
        return {
            sound: true,
            vibration: true,
            difficulty: 'normal'
        };
    }
}
