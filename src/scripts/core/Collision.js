/**
 * Collision detection utilities
 */
export class Collision {
    /**
     * Check if two points are at the same position
     * @param {{x: number, y: number}} p1 
     * @param {{x: number, y: number}} p2 
     * @returns {boolean}
     */
    static pointsCollide(p1, p2) {
        return p1.x === p2.x && p1.y === p2.y;
    }

    /**
     * Check if a point is inside a rectangle
     * @param {{x: number, y: number}} point 
     * @param {{x: number, y: number, width: number, height: number}} rect 
     * @returns {boolean}
     */
    static pointRectCollide(point, rect) {
        return (
            point.x >= rect.x &&
            point.x < rect.x + rect.width &&
            point.y >= rect.y &&
            point.y < rect.y + rect.height
        );
    }

    /**
     * Check collision with walls
     * @param {{x: number, y: number}} head 
     * @param {number} canvasWidth 
     * @param {number} canvasHeight 
     * @returns {boolean}
     */
    static checkWallCollision(head, canvasWidth, canvasHeight) {
        return (
            head.x < 0 ||
            head.y < 0 ||
            head.x >= canvasWidth ||
            head.y >= canvasHeight
        );
    }

    /**
     * Check collision with self (body)
     * @param {{x: number, y: number}} head 
     * @param {Array<{x: number, y: number}>} body 
     * @returns {boolean}
     */
    static checkSelfCollision(head, body) {
        // If strict compliance: body usually excludes head. 
        // If body array includes head, we need to ignore index 0 or ensure head !== segment by reference.
        // For TDD test "checkSelfCollision", let's assume body IS the potential collision targets.
        return body.some(segment => this.pointsCollide(head, segment));
    }

    /**
     * Check collision with food
     * @param {{x: number, y: number}} head 
     * @param {{x: number, y: number}} foodPosition 
     * @returns {boolean}
     */
    static checkFoodCollision(head, foodPosition) {
        return this.pointsCollide(head, foodPosition);
    }

    /**
     * Check collision with obstacles
     * @param {{x: number, y: number}} head 
     * @param {Array<{x: number, y: number}>} obstacles 
     * @returns {boolean}
     */
    static checkObstacleCollision(head, obstacles) {
        return obstacles.some(obstacle => this.pointsCollide(head, obstacle));
    }

    /**
     * Check all collisions
     * @param {object} params
     * @returns {object} collision result { wall: bool, self: bool, obstacle: bool }
     */
    static checkAllCollisions({ head, body, obstacles, canvasWidth, canvasHeight }) {
        return {
            wall: this.checkWallCollision(head, canvasWidth, canvasHeight),
            self: this.checkSelfCollision(head, body),
            obstacle: this.checkObstacleCollision(head, obstacles)
        };
    }
}
