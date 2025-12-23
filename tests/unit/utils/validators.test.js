import { describe, test, expect } from 'vitest';
import { validateScore, validateSettings, sanitizeString } from '../../../src/scripts/utils/validators';

describe('Validator Functions', () => {
    describe('validateScore', () => {
        test('should return true for valid positive integers', () => {
            expect(validateScore(0)).toBe(true);
            expect(validateScore(100)).toBe(true);
        });

        test('should return false for negative numbers', () => {
            expect(validateScore(-1)).toBe(false);
        });

        test('should return false for non-numbers', () => {
            expect(validateScore('100')).toBe(false);
            expect(validateScore(null)).toBe(false);
            expect(validateScore(undefined)).toBe(false);
        });

        test('should return false for infinite numbers', () => {
            expect(validateScore(Infinity)).toBe(false);
        });
    });

    describe('validateSettings', () => {
        test('should return true for valid settings object', () => {
            const validSettings = {
                sound: true,
                vibration: false,
                difficulty: 'normal'
            };
            expect(validateSettings(validSettings)).toBe(true);
        });

        test('should return false if required keys are missing', () => {
            const invalidSettings = {
                sound: true
                // missing others
            };
            expect(validateSettings(invalidSettings)).toBe(false);
        });

        test('should return false for non-object', () => {
            expect(validateSettings(null)).toBe(false);
            expect(validateSettings('settings')).toBe(false);
        });
    });

    describe('sanitizeString', () => {
        test('should remove HTML tags', () => {
            expect(sanitizeString('<script>alert("xss")</script>')).toBe('alert("xss")');
            expect(sanitizeString('Hello <b>World</b>')).toBe('Hello World');
        });

        test('should trim whitespace', () => {
            expect(sanitizeString('  Hello  ')).toBe('Hello');
        });

        test('should handle non-string input', () => {
            expect(sanitizeString(123)).toBe('123');
            expect(sanitizeString(null)).toBe('');
        });
    });
});
