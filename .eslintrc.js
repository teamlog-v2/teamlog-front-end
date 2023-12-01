module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['react'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [
    {
      files: '.eslintrc.{js,cjs}',
      env: {
        node: true,
      },
      parserOptions: {
        sourceType: 'script',
        ecmaFeatures: {
          jsx: true,
          modules: false,
        },
      },
    },
  ],
  rules: {
    'react/jsx-filename-extension': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-param-reassign': 'off',
    'no-unused-vars': 'warn',
    'no-global-assign': 'warn',
  },
};
