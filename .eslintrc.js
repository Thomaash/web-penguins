module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: 'standard-with-typescript',
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.lint.json'
  },
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'array-bracket-spacing': [2, 'never']
  }
}
