import { describe, test, expect, beforeEach, vi } from 'vitest';
import { StateManager } from '../../../src/scripts/managers/StateManager';
import { GAME_STATE } from '../../../src/scripts/utils/constants';

describe('StateManager', () => {
    let stateManager;

    beforeEach(() => {
        stateManager = new StateManager();
    });

    describe('Initialization', () => {
        test('should initialize with default state (IDLE)', () => {
            // Assuming IDLE is default or we pass it
            expect(stateManager.currentState).toBe(GAME_STATE.IDLE);
        });
    });

    describe('State Transitions', () => {
        test('should change state correctly', () => {
            stateManager.setState(GAME_STATE.PLAYING);
            expect(stateManager.currentState).toBe(GAME_STATE.PLAYING);
        });

        test('should not change to invalid state', () => {
            // Assuming validation
            const invalidState = 'INVALID_STATE';
            stateManager.setState(invalidState);
            expect(stateManager.currentState).not.toBe(invalidState);
        });
    });

    describe('Observer Pattern', () => {
        test('should notify listeners on state change', () => {
            const listener = vi.fn();
            stateManager.subscribe(listener);

            stateManager.setState(GAME_STATE.PLAYING);
            expect(listener).toHaveBeenCalledWith(GAME_STATE.PLAYING);
        });

        test('should not notify if state is same', () => {
            stateManager.setState(GAME_STATE.IDLE);
            const listener = vi.fn();
            stateManager.subscribe(listener);

            stateManager.setState(GAME_STATE.IDLE);
            expect(listener).not.toHaveBeenCalled();
        });

        test('should unsubscribe correctly', () => {
            const listener = vi.fn();
            const unsubscribe = stateManager.subscribe(listener);

            unsubscribe();
            stateManager.setState(GAME_STATE.PLAYING);
            expect(listener).not.toHaveBeenCalled();
        });
    });
});
