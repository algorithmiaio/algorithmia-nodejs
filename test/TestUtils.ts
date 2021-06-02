import dotenv from 'dotenv';
import assert from 'assert';

dotenv.config();

const envMessage = envVar =>
  `Environment variable ${envVar} is required to run this test suite. Reference TEST.md to help set up this variable`;

export const {
  ALGORITHMIA_TEST_API_ADDRESS,
  ALGORITHMIA_TEST_DEFAULT_API_KEY,
  ALGORITHMIA_TEST_USERNAME,
  ALGORITHMIA_TEST_ADMIN_API_KEY,
} = process.env;

// These assertions make sure the test suite can only run if the appropriate environment variables
// are set and a message is displayed stating why the suite could not run.
assert(
  ALGORITHMIA_TEST_USERNAME,
  envMessage(Object.keys({ ALGORITHMIA_TEST_USERNAME })[0])
);
assert(
  ALGORITHMIA_TEST_ADMIN_API_KEY,
  envMessage(Object.keys({ ALGORITHMIA_TEST_ADMIN_API_KEY })[0])
);
assert(
  ALGORITHMIA_TEST_DEFAULT_API_KEY,
  envMessage(Object.keys({ ALGORITHMIA_TEST_DEFAULT_API_KEY })[0])
);
assert(
  ALGORITHMIA_TEST_API_ADDRESS,
  envMessage(Object.keys({ ALGORITHMIA_TEST_API_ADDRESS })[0])
);
assert(
  ALGORITHMIA_TEST_ADMIN_API_KEY,
  envMessage(Object.keys({ ALGORITHMIA_TEST_ADMIN_API_KEY })[0])
);

export const createTestAlgo = name => ({
  details: {
    label: 'My Test Algorithm',
  },
  name: name,
  settings: {
    environment: 'cpu',
    language: 'python3-1',
    license: 'apl',
    network_access: 'full',
    pipeline_enabled: true,
    source_visibility: 'closed',
  },
});
