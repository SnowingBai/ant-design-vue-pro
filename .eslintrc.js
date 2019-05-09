module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/strongly-recommended'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'quotes': ['error', 'single']
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
