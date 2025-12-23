/**
 * Validates if the score is a valid non-negative integer
 * @param {any} score
 * @returns {boolean}
 */
export const validateScore = (score) => {
    return Number.isInteger(score) && score >= 0;
};

/**
 * Validates settings object structure
 * @param {any} settings
 * @returns {boolean}
 */
export const validateSettings = (settings) => {
    if (typeof settings !== 'object' || settings === null) {
        return false;
    }

    // Basic required keys check
    // In a real app, we might check types for each key too
    const requiredKeys = ['difficulty', 'sound', 'vibration'];
    return requiredKeys.every(key => key in settings);
};

/**
 * Sanitizes input string (removes HTML tags and trims)
 * @param {any} input
 * @returns {string}
 */
export const sanitizeString = (input) => {
    if (typeof input !== 'string') {
        return String(input === null || input === undefined ? '' : input);
    }

    // Remove HTML tags
    const clean = input.replace(/<[^>]*>?/gm, '');
    return clean.trim();
};
