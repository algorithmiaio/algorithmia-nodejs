const jest = require('@neutrinojs/jest');
const library = require('@neutrinojs/library');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { eslint } = require('./tools/plugins/nx-neutrino/eslint');

module.exports = {
  options: {
    root: __dirname,
    tsConfig: 'tsconfig.eslint.json',
  },
  use: [
    eslint(),
    library({
      name: 'algorithmia-nodejs',
      target: 'node',
      babel: {
        presets: [
          [
            '@babel/preset-env',
            {
              // useBuiltIns: 'usage',
            },
          ],
          [
            '@babel/preset-typescript',
            {
              allowDeclareFields: true,
            },
          ],
        ],
        plugins: [['@babel/plugin-proposal-class-properties', { loose: true }]],
      },
    }),
    (neutrino) => {
      neutrino.config.plugin('fork-ts-checker').use(ForkTsCheckerWebpackPlugin);
      neutrino.config.resolve.extensions.add('.ts');
      neutrino.config.module.rule('compile').test(/\.(js|ts)$/);
    },
    jest({
      testEnvironment: 'node',
      testMatch: null,
      testRegex: '/test/.*\\.test\\.(js|ts)$',
      preset: 'ts-jest',
    }),
  ],
};
