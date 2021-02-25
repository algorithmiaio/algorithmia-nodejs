import { Algorithmia } from '../src/Algorithmia';

describe('Localisation initialization', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.setTimeout(60000);
  });

  describe('algorithm pipe call', () => {
    it('invokes algorithm', async () => {
      const result = await Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      )
        .algo('nlb/Hello/1.0.0')
        .pipe('foo');

      expect(result).toBe('Hello foo');
    });
  });
});
