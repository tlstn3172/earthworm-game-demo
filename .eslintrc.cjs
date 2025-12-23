
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        'no-console': 'off', // Allow console for game logs (or warn)
        'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'prettier/prettier': 'error'
    }
};
