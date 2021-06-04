import { Algorithmia } from '../src/Algorithmia';
import { writeFileSync } from 'fs';
import { readFileSync } from 'fs';
import { resolve } from 'path';

describe('Localisation initialization', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('algorithm put call', () => {
    it('uploads file', async () => {
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

        await dir2.create(dirName);
      }

      await file.put('nah dawg');

      expect(await file.exists()).toBe(true);
    });
  });

  describe('algorithm file putString call', () => {
    it('uploads file', async () => {
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

        await dir2.create(dirName);
      }

      await file.putString('nah dawg');

      expect(await file.exists()).toBe(true);
    });
  });

  describe('algorithm file putJson call', () => {
    it('uploads file', async () => {
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

        await dir2.create(dirName);
      }

      const dataString = 'nah dawg';
      // adding a comment to trigger ci
      await file.putJson(JSON.stringify(dataString));

      expect(await file.exists()).toBe(true);
    });
  });

  describe('algorithm file parent call', () => {
    it('gets parent of file', async () => {
      const file = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).file('data://dherring/DalesNotSoFunTime2/NahDawg.txt');

      expect(await file.parent()?.baseName()).toBe('DalesNotSoFunTime2');
    });
  });

  describe('algorithm file get call', () => {
    it('gets file', async () => {
      const file = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).file('data://dherring/DalesFunTime/NahDawg.txt');

      expect(await file.get()).toBe('nah dawg');
    });
  });

  describe('algorithm file getString call', () => {
    it('gets file', async () => {
      const file = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).file('data://dherring/DalesFunTime/NahDawg.txt');

      expect(await file.getString()).toBe('nah dawg');
    });
  });

  describe('algorithm file getJson call', () => {
    it('gets file', async () => {
      const file = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).file('data://dherring/DalesFunTime/NahDawg.txt');

      expect(await file.getJson()).toBe('nah dawg');
    });
  });

  describe('algorithm file getBinary call', () => {
    it('gets file', async () => {
      const file = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).file('data://dherring/DalesFunTime/NahDawg.txt');

      writeFileSync('./NahDawg.txt', await file.getBinary());
      expect(await readFileSync('./NahDawg.txt', { encoding: 'utf-8' })).toBe(
        'nah dawg'
      );
    });
  });

  describe('algorithm file exists call', () => {
    it('checks for file existence', async () => {
      const file = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).file('data://dherring/DalesFunTime/NahDawg.txt');

      expect(await file.exists()).toBe(true);
    });
  });

  describe('algorithm file delete call', () => {
    it('deletes file', async () => {
      const file = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).file('data://dherring/DalesNotSoFunTime2/NahDawg2.txt');

      await file.put('nah dawg 2');

      expect(await file.delete()).toBe(
        JSON.stringify({ result: { deleted: 1 } })
      );
    });
  });

  describe('algorithm directory exists call', () => {
    it('checks for directory existence', async () => {
      const dir = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).dir('data://dherring/DalesNotSoFunTime2');

      expect(await dir.exists()).toBe(true);
    });
  });

  describe('algorithm directory create call', () => {
    it('creates dir', async () => {
      const dir = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).dir('data://dherring/DalesNotSoFunTime3');

      const directoryAlreadyExists = await dir.exists();
      if (directoryAlreadyExists) {
        await dir.delete(true);
      }

      const newDir = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).dir('data://dherring/');

      await newDir.create('DalesNotSoFunTime3');

      expect(await newDir.exists()).toBe(true);
    });
  });

  describe('algorithm directory file put call', () => {
    it('uploads file', async () => {
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

  describe('algorithm directory file put call from local path', () => {
    it('uploads file from local path', async () => {
      const dir = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).dir('data://dherring/DalesNotSoFunTime2');

      const alreadyExistsFile = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).file('data://dherring/DalesNotSoFunTime2/HorribleNightCurse.png');

      const fileAlreadyExists = await alreadyExistsFile.exists();

      if (fileAlreadyExists) {
        await alreadyExistsFile.delete();
      }

      await dir.putFile(resolve(__dirname + `/HorribleNightCurse.png`));

      expect(await alreadyExistsFile.exists()).toBe(true);
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

      await dir.create('DalesNotSoFunTime4');

      const newDir = Algorithmia.getClient(
        process.env.ALGORITHMIA_DEFAULT_API_KEY
      ).dir('data://dherring/DalesNotSoFunTime4');

      expect(await newDir.delete(true)).toEqual(
        JSON.stringify({ result: { deleted: 1 } })
      );
    });
  });
});
