import { GAME_STATE } from '../utils/constants';

export class StateManager {
    constructor() {
        this.currentState = GAME_STATE.IDLE;
        this.listeners = new Set();
    }

    /**
     * Set new state and notify listeners
     * @param {string} newState 
     */
    setState(newState) {
        if (this.currentState === newState) return;

        // Validate state
        if (!Object.values(GAME_STATE).includes(newState)) {
            console.warn(`Invalid state: ${newState}`);
            return;
        }

        this.currentState = newState;
        this.notify();
    }

    /**
     * Subscribe to state changes
     * @param {Function} listener 
     * @returns {Function} unsubscribe
     */
    subscribe(listener) {
        this.listeners.add(listener);
        return () => {
            this.listeners.delete(listener);
        };
    }

    /**
     * Notify all listeners
     */
    notify() {
        this.listeners.forEach(listener => listener(this.currentState));
    }
}
