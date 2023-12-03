module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:react/recommended'],
  plugins: ['react'],
  parser: 'babel-eslint',
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
    'no-param-reassign': 'off', // 매개변수 재할당
    'no-global-assign': 'off', // 전역 변수 재할당
    'no-unused-vars': 'off', // 정의 후 사용하지 않은 변수
    'react/prop-types': 'off', // prop type 검사 
    'react/jsx-key': 'off', // key prop 검사
  },
};
