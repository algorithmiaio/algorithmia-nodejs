import type {Config} from '@jest/types';
const {defaults} = require('jest-config');
/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

const config: Config.InitialOptions = {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.(ts|tsx)'],
  verbose: true,
}

export default config;