import { GAME_CONFIG, DIRECTIONS } from '../utils/constants';

export class Snake {
    /**
     * @param {number} startX 
     * @param {number} startY 
     * @param {number} initialLength 
     */
    constructor(startX, startY, initialLength) {
        this.body = [];
        this.direction = DIRECTIONS.RIGHT;
        this.nextDirection = DIRECTIONS.RIGHT;
        this.speed = GAME_CONFIG.INITIAL_SPEED;
        this.growing = false;

        // Initialize body (horizontal, head at right)
        for (let i = 0; i < initialLength; i++) {
            this.body.push({
                x: startX - (i * GAME_CONFIG.GRID_SIZE),
                y: startY
            });
        }
    }

    /**
     * Update direction if not opposite
     * @param {{x: number, y: number}} newDir 
     */
    setDirection(newDir) {
        // Prevent reverse direction
        // If x sum is 0 and y sum is 0, they are opposite (assuming normalized vectors like 1, -1)
        // But our vectors are {x:0, y:-1}, etc.
        // Opposite if: newDir.x === -currDir.x && newDir.y === -currDir.y

        // We check against current 'direction' OR 'nextDirection'. 
        // Usually strict games check against last processed direction (this.direction) 
        // to allow quick double turns if processed per frame.
        // Test expecting snake.direction check logic.

        const isOpposite = (
            newDir.x + this.direction.x === 0 &&
            newDir.y + this.direction.y === 0
        );

        if (!isOpposite) {
            this.nextDirection = newDir;
        }
    }

    /**
     * Move the snake forward
     */
    move() {
        // Update current direction from buffer
        this.direction = this.nextDirection;

        const head = this.body[0];
        const newHead = {
            x: head.x + (this.direction.x * GAME_CONFIG.GRID_SIZE),
            y: head.y + (this.direction.y * GAME_CONFIG.GRID_SIZE)
        };

        // Add new head
        this.body.unshift(newHead);

        // Handle growth
        if (this.growing) {
            this.growing = false;
        } else {
            // Remove tail
            this.body.pop();
        }
    }

    /**
     * Trigger growth on next move
     */
    grow() {
        this.growing = true;
    }

    /**
     * Get head position
     */
    get head() {
        return this.body[0];
    }

    /**
     * Boost speed
     */
    activateBoost() {
        if (this.isBoosting) return;
        this.baseSpeed = this.speed; // Store current normal speed
        this.speed = Math.max(GAME_CONFIG.MIN_SPEED, Math.floor(this.speed * GAME_CONFIG.BOOST_SPEED_MULTIPLIER));
        this.isBoosting = true;
    }

    /**
     * Deactivate boost
     */
    deactivateBoost() {
        if (!this.isBoosting) return;
        this.speed = this.baseSpeed || GAME_CONFIG.INITIAL_SPEED; // Restore
        this.isBoosting = false;
    }
}
