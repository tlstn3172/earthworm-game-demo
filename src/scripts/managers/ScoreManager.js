export class ScoreManager {
    /**
     * @param {object} storageManager StorageManager instance
     */
    constructor(storageManager) {
        this.storageManager = storageManager;
        this.currentScore = 0;
        this.highScore = this.storageManager.getHighScore();
    }

    /**
     * Add points to score
     * @param {number} points 
     */
    addPoints(points) {
        this.currentScore += points;
        this.checkHighScore();
    }

    /**
     * Reset score
     */
    reset() {
        this.currentScore = 0;
        this.highScore = this.storageManager.getHighScore();
    }

    /**
     * Check and save high score
     */
    checkHighScore() {
        if (this.currentScore > this.highScore) {
            this.highScore = this.currentScore;
            this.storageManager.saveHighScore(this.highScore);
        }
    }
}
