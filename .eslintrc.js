module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    rules: {
        'react/jsx-filename-extension': 0, // js에서 jsx문법 사용
        'import/no-unresolved': 0,
        'react/no-array-index-key': 0,
        'react/jsx-one-expression-per-line': 0,
        'react/prop-types': 0,
        indent: 0, // 주석 자유롭게 달기위해
        'object-curly-newline': 0, // 매개변수 한 줄에 작성 가능하게 함
        'import/no-named-as-default-member': 0,
        'linebreak-style': 0, // Expected linebreaks to be 'LF' but found 'CRLF' 오류 해결
        'raect/destructuring-assignment': 0,
        'array-callback-return': 0,
        'consistent-return': 0,
    },
};
