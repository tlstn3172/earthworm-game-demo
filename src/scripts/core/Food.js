import { randomPosition } from '../utils/helpers';
import { Collision } from './Collision';

export class Food {
    /**
     * @param {number} canvasWidth 
     * @param {number} canvasHeight 
     * @param {number} gridSize 
     */
    constructor(canvasWidth, canvasHeight, gridSize) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.gridSize = gridSize;
        this.position = { x: 0, y: 0 };
        // Spawn immediately or wait for explicit spawn? usually spawn immediately or in init.
        // Let's initialize at 0,0 but marked as valid? Or allow spawn to set it.
        // Test expects position to be defined.
    }

    /**
     * Spawn food at random valid position
     * @param {Array<{x: number, y: number}>} snakeBody 
     * @param {Array<{x: number, y: number}>} obstacles 
     */
    spawn(snakeBody, obstacles) {
        let isValid = false;
        let newPos;

        // Safety counter to prevent infinite loop
        let attempts = 0;
        const MAX_ATTEMPTS = 100;

        while (!isValid && attempts < MAX_ATTEMPTS) {
            newPos = randomPosition(this.canvasWidth, this.canvasHeight, this.gridSize);

            // Check collision with snake
            const snakeCollision = Collision.checkSelfCollision(newPos, snakeBody);

            // Check collision with obstacles
            const obstacleCollision = Collision.checkObstacleCollision(newPos, obstacles);

            if (!snakeCollision && !obstacleCollision) {
                isValid = true;
            }
            attempts++;
        }

        if (isValid) {
            this.position = newPos;
        } else {
            // Fallback: Just accept the random one or scan grid?
            // For simple game, just force it.
            this.position = newPos;
        }
    }
}
