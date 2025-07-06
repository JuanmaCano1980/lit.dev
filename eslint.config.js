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
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        CustomEvent: 'readonly',
        localStorage: 'readonly',
        JSON: 'readonly',
        setTimeout: 'readonly',
        customElements: 'readonly',
        // Module globals
        module: 'readonly',
        exports: 'readonly',
        require: 'readonly',
      },
    },
    plugins: {
      prettier: prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'no-undef': 'error',
    },
  },
  {
    ignores: ['dist/', 'node_modules/', '*.config.js'],
  },
];
