
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            lines: 90,
            functions: 90,
            branches: 90,
            statements: 90,
            exclude: [
                'src/scripts/ui/**',
                'src/scripts/components/**',
                'src/styles/**',
                'scripts/**',
                '*.config.js',
                '.eslintrc.cjs'
            ]
        },
        include: ['tests/**/*.{test,spec}.js']
    }
});
