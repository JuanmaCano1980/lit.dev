import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Lit globals
        LitElement: 'readonly',
        html: 'readonly',
        css: 'readonly',
        // Browser globals (needed for ESLint)
        window: 'readonly',
        document: 'readonly',
        CustomEvent: 'readonly',
        localStorage: 'readonly',
        customElements: 'readonly',
        URLSearchParams: 'readonly',
        URL: 'readonly',
        console: 'readonly',
        // Testing globals
        global: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        expect: 'readonly',
        fixture: 'readonly',
        oneEvent: 'readonly',
        isIE: 'readonly',
        defineCE: 'readonly',
        assert: 'readonly',
        nextFrame: 'readonly',
        aTimeout: 'readonly',
        triggerBlurFor: 'readonly',
        triggerFocusFor: 'readonly',
        sendKeys: 'readonly',
        sendMouse: 'readonly',
        setViewport: 'readonly',
        resetMouse: 'readonly',
        waitUntil: 'readonly',
      },
    },
    plugins: {
      prettier: prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': 'warn',
    },
  },
  {
    ignores: ['dist/', 'node_modules/', '*.config.js'],
  },
];
