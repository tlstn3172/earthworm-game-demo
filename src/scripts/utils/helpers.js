/**
 * Generates a random position aligned with the grid
 * @param {number} width Canvas width
 * @param {number} height Canvas height
 * @param {number} gridSize Grid size
 * @returns {{x: number, y: number}}
 */
export const randomPosition = (width, height, gridSize) => {
    const x = Math.floor(Math.random() * (width / gridSize)) * gridSize;
    const y = Math.floor(Math.random() * (height / gridSize)) * gridSize;
    return { x, y };
};

/**
 * Checks if a position is valid (within bounds)
 * @param {{x: number, y: number}} position
 * @param {object} config Game configuration
 * @returns {boolean}
 */
export const isValidPosition = (position, config) => {
    return (
        position.x >= 0 &&
        position.x < config.CANVAS_WIDTH &&
        position.y >= 0 &&
        position.y < config.CANVAS_HEIGHT
    );
};

/**
 * Calculates distance between two points
 * @param {{x: number, y: number}} p1
 * @param {{x: number, y: number}} p2
 * @returns {number}
 */
export const calculateDistance = (p1, p2) => {
    return Math.hypot(p2.x - p1.x, p2.y - p1.y);
};

/**
 * Formats seconds into MM:SS string
 * @param {number} seconds
 * @returns {string}
 */
export const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Formats score number to string
 * @param {number} score
 * @returns {string}
 */
export const formatScore = (score) => {
    return score.toString();
};
