module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module'
  },
  rules: {
    'no-undef': 'off',
    'no-console': 'off',
    'no-unused-vars': 'off',
    'no-empty': 'off',
    // semi: ['warn', 'always'],
    quotes: ['warn', 'single'],
    eqeqeq: 'warn',
    'no-multi-spaces': ['error'],
    complexity: ['error', { max: 10 }],
    'max-classes-per-file': ['error'],
    'no-else-return': ['warn'],
    'no-empty-function': ['warn'],
    'no-extend-native': ['error'],
    'no-lone-blocks': ['warn'],
    'no-param-reassign': ['warn'],
    radix: ['warn', 'always'],
    'init-declarations': ['warn'],
    'comma-dangle': ['error', 'never'],
    'comma-spacing': ['warn'],
    'computed-property-spacing': ['warn'],
    'no-multiple-empty-lines': ['warn'],
    'func-call-spacing': ['warn'],
    'key-spacing': ['warn'],
    'max-depth': ['error', { max: 4 }],
    'max-lines-per-function': ['error', { max: 50 }],
    'max-lines': ['error', { max: 500 }],
    'multiline-ternary': ['error', 'never'],
    'no-nested-ternary': ['error'],
    'no-whitespace-before-property': ['warn'],
    'arrow-spacing': ['warn'],
    'space-before-blocks': ['warn', { functions: 'always' }],
    'space-infix-ops': ['warn']
  }
}
