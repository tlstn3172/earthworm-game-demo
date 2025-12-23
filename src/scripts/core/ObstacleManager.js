import { randomPosition } from '../utils/helpers';

export class ObstacleManager {
    /**
     * @param {number} canvasWidth 
     * @param {number} canvasHeight 
     * @param {number} gridSize 
     */
    constructor(canvasWidth, canvasHeight, gridSize) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.gridSize = gridSize;
        this.obstacles = [];
    }

    /**
     * Generate obstacles for a specific level
     * @param {number} level 
     */
    generate(level) {
        this.obstacles = [];

        // Level 1: No obstacles (or just borders if handled here, but borders are usually implicit)
        if (level === 1) {
            return;
        }

        // Higher levels: Add random obstacles
        const count = (level - 1) * 3; // Example: Level 2 = 3 obs, Level 3 = 6 obs

        for (let i = 0; i < count; i++) {
            const pos = randomPosition(this.canvasWidth, this.canvasHeight, this.gridSize);
            // Simple implementation: allow overlap for now, or check uniqueness?
            // For robustness, check if already exists.

            // Note: Should ideally check against snake start pos too, but ObstacleManager doesn't know snake?
            // Usually we generate obstacles first, then snake spawns? Or snake spawns at center/fixed.
            // Let's assume obstacles shouldn't cover starting area (e.g., center or top-left).
            // For now, simple random.

            this.obstacles.push(pos);
        }
    }

    /**
     * Get current obstacles
     * @returns {Array<{x: number, y: number}>}
     */
    getObstacles() {
        return this.obstacles;
    }
}
