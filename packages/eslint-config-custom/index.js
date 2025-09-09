module.exports = {
  env: {
    node: true
  },
  parser: '@typescript-eslint/parser',
  extends: [
    // 'turbo', // 移除这一行，可能是导致问题的原因
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:cypress/recommended'
  ],
  globals: {
    vi: true
  },
  plugins: ['@typescript-eslint', 'cypress'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module',
    ecmaVersion: 2020
  },
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
    'import/no-anonymous-default-export': 'off',
    'prefer-const': ['error'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
};