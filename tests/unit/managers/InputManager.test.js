import { describe, test, expect, vi, beforeEach } from 'vitest';
import { InputManager } from '../../../src/scripts/managers/InputManager';
import { DIRECTIONS } from '../../../src/scripts/utils/constants';

describe('InputManager', () => {
    let inputManager;
    let mockElement;

    beforeEach(() => {
        mockElement = {
            addEventListener: vi.fn(),
            removeEventListener: vi.fn()
        };
        // Mock document behavior via simple object or global
        inputManager = new InputManager(mockElement);
    });

    describe('Initialization', () => {
        test('should bind events on initialization', () => {
            // If manual bind called or in constructor
            // Expect keydown, touchstart, touchend
            expect(mockElement.addEventListener).toHaveBeenCalledWith('touchstart', expect.any(Function), expect.any(Object));
            expect(mockElement.addEventListener).toHaveBeenCalledWith('touchend', expect.any(Function), expect.any(Object));

            // Keyboard often on window/document
            // We'll see if constructor uses window for keyboard.
        });
    });

    describe('Keyboard Input', () => {
        test('should notify direction on arrow key', () => {
            const onDirection = vi.fn();
            inputManager.onDirection(onDirection);

            // Simulate Key Event
            const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
            inputManager.handleKey(event);

            expect(onDirection).toHaveBeenCalledWith(DIRECTIONS.UP);
        });

        test('should notify direction on WASD', () => {
            const onDirection = vi.fn();
            inputManager.onDirection(onDirection);

            const event = new KeyboardEvent('keydown', { key: 'w' });
            inputManager.handleKey(event);

            expect(onDirection).toHaveBeenCalledWith(DIRECTIONS.UP);
        });

        test('should ignore other keys', () => {
            const onDirection = vi.fn();
            inputManager.onDirection(onDirection);
            inputManager.handleKey(new KeyboardEvent('keydown', { key: 'Space' }));
            expect(onDirection).not.toHaveBeenCalled();
        });
    });

    describe('Touch Input (Swipe)', () => {
        test('should detect swipe UP', () => {
            const onDirection = vi.fn();
            inputManager.onDirection(onDirection);

            // Start
            inputManager.handleTouchStart({ touches: [{ clientX: 100, clientY: 100 }] });
            // End (Swipe Up -> smaller Y)
            inputManager.handleTouchEnd({ changedTouches: [{ clientX: 100, clientY: 50 }] });

            expect(onDirection).toHaveBeenCalledWith(DIRECTIONS.UP);
        });

        test('should ignore small taps', () => {
            const onDirection = vi.fn();
            inputManager.onDirection(onDirection);

            inputManager.handleTouchStart({ touches: [{ clientX: 100, clientY: 100 }] });
            inputManager.handleTouchEnd({ changedTouches: [{ clientX: 101, clientY: 101 }] });

            expect(onDirection).not.toHaveBeenCalled();
        });
    });

    describe('Sensitivity Settings', () => {
        test('should update threshold via setSensitivity', () => {
            // Default is 30
            inputManager.setSensitivity(50);
            expect(inputManager.swipeThreshold).toBe(50);
        });

        test('should respect high sensitivity (low threshold)', () => {
            const onDirection = vi.fn();
            inputManager.onDirection(onDirection);

            inputManager.setSensitivity(10); // 10px threshold

            // 15px move should trigger
            inputManager.handleTouchStart({ touches: [{ clientX: 100, clientY: 100 }] });
            inputManager.handleTouchEnd({ changedTouches: [{ clientX: 115, clientY: 100 }] });

            expect(onDirection).toHaveBeenCalledWith(DIRECTIONS.RIGHT);
        });

        test('should respect low sensitivity (high threshold)', () => {
            const onDirection = vi.fn();
            inputManager.onDirection(onDirection);

            inputManager.setSensitivity(100); // 100px threshold

            // 50px move should NOT trigger
            inputManager.handleTouchStart({ touches: [{ clientX: 100, clientY: 100 }] });
            inputManager.handleTouchEnd({ changedTouches: [{ clientX: 150, clientY: 100 }] });

            expect(onDirection).not.toHaveBeenCalled();
        });
    });
});
