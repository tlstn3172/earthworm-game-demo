import { describe, test, expect, vi, beforeEach } from 'vitest';
import { AudioManager } from '../../../src/scripts/managers/AudioManager';

describe('AudioManager', () => {
    let audioManager;
    let mockContext;

    beforeEach(() => {
        // Mock AudioContext
        mockContext = {
            state: 'suspended',
            resume: vi.fn(),
            suspend: vi.fn(),
            createOscillator: vi.fn(() => ({
                connect: vi.fn(),
                start: vi.fn(),
                stop: vi.fn(),
                frequency: {
                    value: 0,
                    setValueAtTime: vi.fn(),
                    exponentialRampToValueAtTime: vi.fn()
                },
                type: 'sine'
            })),
            createGain: vi.fn(() => ({
                connect: vi.fn(),
                gain: {
                    value: 0,
                    exponentialRampToValueAtTime: vi.fn(),
                    linearRampToValueAtTime: vi.fn(),
                    setValueAtTime: vi.fn()
                }
            })),
            currentTime: 0,
            destination: {}
        };

        global.AudioContext = vi.fn(() => mockContext);

        // Mock document interaction if needed
        audioManager = new AudioManager();
    });

    describe('Initialization', () => {
        test('should initialize mute state', () => {
            expect(audioManager.isMuted).toBe(false); // Default
        });

        // Note: AudioContext usually created on user interaction, or suspended.
        // We'll verify it doesn't try to play immediately.
    });

    describe('Control', () => {
        test('toggleMute() should flip muted state', () => {
            audioManager.toggleMute();
            expect(audioManager.isMuted).toBe(true);

            audioManager.toggleMute();
            expect(audioManager.isMuted).toBe(false);
        });

        test('play() should likely start context if suspended', async () => {
            // Mocking context state?
            // Usually we call resume() on first interaction.
            // But here we just test method calls.

            await audioManager.play('move'); // Async usually?
            // With mocked oscillator, hard to verify sound output,
            // but we can verify createOscillator called if not muted.
            expect(mockContext.createOscillator).toHaveBeenCalled();
        });

        test('play() should NOT play if muted', () => {
            audioManager.toggleMute();
            audioManager.play('move');
            expect(mockContext.createOscillator).not.toHaveBeenCalled();
        });
    });
});
