import { DIRECTIONS } from '../utils/constants';

export class InputManager {
    /**
     * @param {HTMLElement|Window} targetElement 
     */
    constructor(targetElement = window) {
        this.target = targetElement;
        this.directionCallback = null;

        // Touch tracking
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.swipeThreshold = 30; // Default sensitivity

        this.bindEvents();
    }

    /**
     * @param {number} value 1-100 range (lower is more sensitive)
     */
    setSensitivity(value) {
        // Map slider value (1-100) to actual threshold
        // High sensitivity (100) -> Low threshold (10px)
        // Low sensitivity (0) -> High threshold (60px)
        // Default 50 -> 35px

        // This mapping needs to be intuitive.
        // Let's say user passes raw threshold for now, or we map it in main.js.
        // PRD says "Sensitivity Slider". 
        // Let's implement setThreshold directly for clarity, main.js can handle mapping.
        this.swipeThreshold = value;
    }

    bindEvents() {
        this.target.addEventListener('keydown', this.handleKey.bind(this));

        // Touch events usually on canvas or window
        // Vitest might mock targetElement as an object without valid methods if not careful,
        // but our test passed addEventListener spy.

        // We bind to 'touchstart' and 'touchend'
        // If target is window, it works.
        this.target.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
        this.target.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });
    }

    /**
     * @param {Function} callback 
     */
    onDirection(callback) {
        this.directionCallback = callback;
    }

    /**
     * @param {KeyboardEvent} e 
     */
    handleKey(e) {
        if (!this.directionCallback) return;

        switch (e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                this.directionCallback(DIRECTIONS.UP);
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                this.directionCallback(DIRECTIONS.DOWN);
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                this.directionCallback(DIRECTIONS.LEFT);
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                this.directionCallback(DIRECTIONS.RIGHT);
                break;
        }
    }

    handleTouchStart(e) {
        const touch = e.touches[0];
        this.touchStartX = touch.clientX;
        this.touchStartY = touch.clientY;
    }

    handleTouchEnd(e) {
        if (!this.directionCallback) return;

        const touch = e.changedTouches[0];
        const diffX = touch.clientX - this.touchStartX;
        const diffY = touch.clientY - this.touchStartY;

        // Min swipe distance
        const threshold = this.swipeThreshold;

        if (Math.abs(diffX) < threshold && Math.abs(diffY) < threshold) return;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Horizontal
            if (diffX > 0) {
                this.directionCallback(DIRECTIONS.RIGHT);
            } else {
                this.directionCallback(DIRECTIONS.LEFT);
            }
        } else {
            // Vertical
            if (diffY > 0) {
                this.directionCallback(DIRECTIONS.DOWN);
            } else {
                this.directionCallback(DIRECTIONS.UP);
            }
        }
    }
}
