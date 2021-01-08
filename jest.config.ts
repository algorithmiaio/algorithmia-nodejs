import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.ts'],
  verbose: true,
};

export default config;
