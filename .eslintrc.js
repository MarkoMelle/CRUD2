module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'eslint:recommended', 'plugin:react/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {},
  settings: {
    react: {
      version: '18.2.0',
    },
  },
};
