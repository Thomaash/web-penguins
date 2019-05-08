module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: 'standard-with-typescript',
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'array-bracket-spacing': [2, 'never']
  }
}
