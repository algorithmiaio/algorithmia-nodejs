import { Algorithmia } from '../src/Algorithmia';
import {
  ALGORITHMIA_TEST_API_ADDRESS,
  ALGORITHMIA_TEST_DEFAULT_API_KEY,
  ALGORITHMIA_TEST_USERNAME,
  createTestAlgo,
} from './TestUtils';

describe('Localisation initialization', () => {
  const testAlgo = createTestAlgo('test_algorithm_executable');
  const algoClient = Algorithmia.getClient(
    ALGORITHMIA_TEST_DEFAULT_API_KEY,
    ALGORITHMIA_TEST_API_ADDRESS
  );

  beforeEach(() => {
    jest.resetModules();
    jest.setTimeout(60000);
  });

  describe('algorithm pipe call', () => {
    it('invokes algorithm', async () => {
      // create an algorithm.
      await algoClient.createAlgo(ALGORITHMIA_TEST_USERNAME, testAlgo);

      const buildHash = JSON.parse(
        await algoClient.buildAlgo(ALGORITHMIA_TEST_USERNAME, testAlgo.name)
      ).version_info.git_hash;

      // invoke algorithm.
      const result = await algoClient
        .algo(`${ALGORITHMIA_TEST_USERNAME}/${testAlgo.name}/${buildHash}`)
        .pipe('foo');

      expect(result).toBe('hello foo');

      // delete the algorithm.
      await algoClient.deleteAlgo(ALGORITHMIA_TEST_USERNAME, testAlgo.name);
    });
  });
});
