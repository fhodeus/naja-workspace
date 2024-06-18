/* eslint-disable no-undef */
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:react-hooks/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:storybook/recommended',
    ],
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'react': {
            createClass: 'createReactClass',
            pragma: 'React',
            fragment: 'Fragment',
            version: 'detect',
        },
        'typescript': {
            alwaysTryTypes: true,
        },
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'import',
        'unused-imports',
        '@arthurgeron/react-usememo',
    ],
    rules: {
        '@arthurgeron/react-usememo/require-usememo': [2],
        'no-unused-vars': 'off',
        'no-restricted-imports': ['error'],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'],
        'import/no-unresolved': 'off',
        'import/order': [
            'error',
            {
                'newlines-between': 'always',
                'groups': ['builtin', 'external', 'internal', 'parent', ['sibling', 'index']],
                'pathGroups': [
                    {
                        pattern: 'react**',
                        group: 'builtin',
                        position: 'before',
                    },
                    {
                        pattern: '@endeavour/**',
                        patternOptions: { partial: true },
                        group: 'external',
                    },
                ],
                'pathGroupsExcludedImportTypes': ['builtin'],
                'alphabetize': {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
        'semi': ['error', 'always'],
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'react/display-name': 'off',
        'react/hook-use-state': ['error', { allowDestructuredState: true }],
        'react/self-closing-comp': ['error', { component: true, html: false }],
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
            'error',
            { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
        ],
    },
};
