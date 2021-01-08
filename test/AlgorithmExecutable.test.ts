import { Algorithmia } from '../src/Algorithmia';

describe('Localisation initialization', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('algorithm pipe call', () => {
    it('invokes algorithm', async () => {
      const expected =
        'Before bytes -  14004 after bytes -  24776 result file path - {"imageSaveLocation":"data://dherring/DalesFunTime/save_location.png","rectsSaveLocation":"data://dherring/DalesFunTime/save_location.pngrects.txt"}';

      const result = await Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      )
        .algo('dherring/ResultFile')
        .pipe(
          {
            user_file: 'data://dherring/DalesFunTime/SpongebobMockingApp.jpg',
          },
          '0.5.37'
        );

      expect(result).toBe(expected);
    });
  });

});
