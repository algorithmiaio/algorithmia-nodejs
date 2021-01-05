import { Algorithmia } from '../src/Algorithmia';

describe('Localisation initialization', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('algorithm file put call', () => {
    it('puts file', async () => {
      const file = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).file('data://dherring/DalesNotSoFunTime2/NahDawg.txt');

      const fileAlreadyExists = await file.exists();
      if (fileAlreadyExists) {
        await file.delete();
      }

      const parentDirExists = await file.parent()?.exists();

      if (!parentDirExists) {
        const dir = file.parent()!;
        const dirName = dir.baseName();
        const dirParentDir = dir.parent();
        const dirParentName = dirParentDir?.baseName();

        const dir2 = Algorithmia.getClient(
          process.env.ALGORITHMIA_DEFAULT_API_KEY
        ).dir(dirParentName!);

        await dir2.post(dirName);
      }

      await file.put('nah dawg');

      expect(await file.exists()).toBe(true);
    });
  });

  describe('algorithm file parent', () => {
    it('gets parent', async () => {
      const file = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).file('data://dherring/DalesNotSoFunTime2/NahDawg.txt');

      expect(await file.parent()?.baseName()).toBe('DalesNotSoFunTime2');
    });
  });

  describe('algorithm file get call', () => {
    it('gets for file', async () => {
      const file = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).file('data://dherring/DalesFunTime/NahDawg.txt');

      expect(await file.get()).toBe('nah dawg');
    });
  });

  describe('algorithm file head call', () => {
    it('checks for file', async () => {
      const file = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).file('data://dherring/DalesFunTime/NahDawg.txt');

      expect(await file.exists()).toBe(true);
    });
  });

  describe('algorithm file delete call', () => {
    it('deletes for file', async () => {
      const file = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).file('data://dherring/DalesNotSoFunTime2/NahDawg2.txt');

      await file.put('nah dawg 2');

      expect(await file.delete()).toBe(
        JSON.stringify({ result: { deleted: 1 } })
      );
    });
  });

  describe('algorithm directory head call', () => {
    it('checks for directory', async () => {
      const dir = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).dir('data://dherring/DalesNotSoFunTime2');

      expect(await dir.exists()).toBe(true);
    });
  });

  describe('algorithm directory post call', () => {
    it('creates dir', async () => {
      const dir = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).dir('data://dherring/DalesNotSoFunTime3');

      const directoryAlreadyExists = await dir.exists();
      if (directoryAlreadyExists) {
        await dir.delete(true);
      }

      await dir.post('DalesNotSoFunTime3');

      expect(await dir.exists()).toBe(true);
    });
  });

  describe('algorithm directory file put call', () => {
    it('puts file', async () => {
      const dir = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).dir('data://dherring/DalesNotSoFunTime2');
      const file = dir.file('YeahDawg.txt');

      const fileAlreadyExists = await file.exists();
      if (fileAlreadyExists) {
        await file.delete();
      }

      await dir.put(file.baseName(), 'yeah dawg');

      expect(await file.exists()).toBe(true);
    });
  });

  describe('algorithm directory get call', () => {
    it('gets dir', async () => {
      const dir = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).dir('data://dherring/DalesFunTime');

      const dataList = JSON.parse(await dir.get());

      expect(dataList.files.length).toBe(7);
    });
  });

  describe('algorithm directory delete call', () => {
    it('deletes directory', async () => {
      const dir = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).dir('data://dherring');

      await dir.post('DalesNotSoFunTime4');

      const newDir = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).dir('data://dherring/DalesNotSoFunTime4');

      expect(await newDir.delete(true)).toEqual(
        JSON.stringify({ result: { deleted: 1 } })
      );
    });
  });
});
