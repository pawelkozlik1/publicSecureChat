module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'prettier',
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
        'react/prop-types': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'class-methods-use-this': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'no-console': 'off',
        'import/prefer-default-export': 'off',
        'no-unused-vars': 'warn',
        'arrow-body-style': 'off',
        'import/order': 'off',
    },
};
