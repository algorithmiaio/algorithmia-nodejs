const eslintPreset = require('@neutrinojs/eslint');
const merge = require('deepmerge');
const { basename } = require('path');

module.exports.eslint = (eslintOptions = {}) => (neutrino) => {
  const options = merge(
    {
      eslint: {
        emitWarning: process.env.NODE_ENV === 'development',
        baseConfig: {
          ignorePatterns: ['!.eslintrc.js', '!.neutrinorc.js'],
          overrides: [
            {
              files: ['*.ts'],
              extends: ['airbnb-typescript/base'],
            },
            {
              files: ['*.js'],
              extends: ['airbnb-base'],
            },
            {
              files: ['*.ts'],
              extends: [
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
                'prettier/@typescript-eslint',
                'plugin:prettier/recommended',
              ],
              parser: '@typescript-eslint/parser',
              parserOptions: {
                tsconfigRootDir: neutrino.options.root,
                project: [basename(neutrino.options.tsConfig)],
              },
              plugins: ['@typescript-eslint'],
              rules: {
                '@typescript-eslint/ban-ts-comment': 'off',
                '@typescript-eslint/explicit-module-boundary-types': 'off',
                '@typescript-eslint/no-explicit-any': 'off',
                '@typescript-eslint/no-non-null-assertion': 'off',
                '@typescript-eslint/no-unsafe-assignment': 'off',
                '@typescript-eslint/no-unsafe-call': 'off',
                '@typescript-eslint/restrict-template-expressions': 'off',
                '@typescript-eslint/no-floating-promises': 'off',
                '@typescript-eslint/unbound-method': 'off',
                'prettier/prettier': [
                  'error',
                  {
                    jsxBracketSameLine: true,
                    singleQuote: true,
                    proseWrap: 'always',
                  },
                  {
                    usePrettierrc: false,
                  },
                ],
              },
              settings: {
                'import/resolver': {
                  node: {
                    extensions: ['.ts'],
                  },
                },
              },
            },
            {
              files: ['*.js'],
              extends: ['plugin:prettier/recommended'],
              rules: {
                'prettier/prettier': [
                  'error',
                  {
                    singleQuote: true,
                    proseWrap: 'always',
                  },
                  {
                    usePrettierrc: false,
                  },
                ],
              },
            },
            {
              files: ['*.ts', '*.js'],
              parserOptions: { ecmaVersion: 2020 },
              rules: {
                'class-methods-use-this': 'off',
                'import/extensions': [
                  'error',
                  'ignorePackages',
                  {
                    js: 'never',
                    mjs: 'never',
                    jsx: 'never',
                    ts: 'never',
                    tsx: 'never',
                  },
                ],
                'import/prefer-default-export': 'off',
                'import/no-extraneous-dependencies': 'off',
                'no-param-reassign': [
                  'error',
                  {
                    props: true,
                    ignorePropertyModificationsFor: [
                      'neutrino',
                      'config',
                      'request',
                      'response',
                    ],
                  },
                ],
                'no-shadow': 'off',
                'padding-line-between-statements': [
                  'error',
                  {
                    blankLine: 'always',
                    prev: 'multiline-block-like',
                    next: '*',
                  },
                ],
              },
            },
          ],
        },
      },
    },
    eslintOptions
  );

  neutrino.use(eslintPreset(options));
};
