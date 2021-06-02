import { Algorithmia } from '../src/Algorithmia';
import { writeFileSync } from 'fs';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import {
  ALGORITHMIA_TEST_API_ADDRESS,
  ALGORITHMIA_TEST_DEFAULT_API_KEY,
  ALGORITHMIA_TEST_USERNAME,
} from './TestUtils';
import { AlgorithmiaClient } from '../src/AlgorithmiaClient';
import { DataFile } from '../src/Data';

const fileCheckExists = async (
  algoClient: AlgorithmiaClient,
  file: DataFile
) => {
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

    const dir2 = algoClient.dir(dirParentName!);

    await dir2.create(dirName);
  }
};

describe('Localisation initialization', () => {
  const algoClient = Algorithmia.getClient(
    ALGORITHMIA_TEST_DEFAULT_API_KEY,
    ALGORITHMIA_TEST_API_ADDRESS
  );

  beforeEach(() => {
    jest.resetModules();
  });

  describe('algorithm put call', () => {
    it('uploads file', async () => {
      const file = algoClient.file(
        `data://${ALGORITHMIA_TEST_USERNAME}/MyTestDirectory2/TestFile.txt`
      );

      await fileCheckExists(algoClient, file);

      await file.put('test text algorithm put call');

      expect(await file.exists()).toBe(true);
    });
  });

  describe('algorithm file putString call', () => {
    it('uploads file', async () => {
      const file = algoClient.file(
        `data://${ALGORITHMIA_TEST_USERNAME}/MyTestDirectory2/TestFile.txt`
      );

      await fileCheckExists(algoClient, file);

      await file.putString('test text algorithm file putString call');

      expect(await file.exists()).toBe(true);
    });
  });

  describe('algorithm file putJson call', () => {
    it('uploads file', async () => {
      const file = algoClient.file(
        `data://${ALGORITHMIA_TEST_USERNAME}/MyTestDirectory2/TestFile.txt`
      );

      await fileCheckExists(algoClient, file);

      const dataString = { testText: 'test text algorithm file putJson call' };
      await file.putJson(dataString);

      expect(await file.exists()).toBe(true);
    });
  });

  describe('algorithm file parent call', () => {
    it('gets parent of file', async () => {
      const file = algoClient.file(
        `data://${ALGORITHMIA_TEST_USERNAME}/MyTestDirectory2/TestFile.txt`
      );

      expect(await file.parent()?.baseName()).toBe('MyTestDirectory2');
    });
  });

  describe('algorithm file get call', () => {
    it('gets file', async () => {
      const file = algoClient.file(
        `data://${ALGORITHMIA_TEST_USERNAME}/MyTestDirectory2/TestFile.txt`
      );

      await fileCheckExists(algoClient, file);

      await file.put('test text algorithm file get call');

      const file2 = algoClient.file(
        `data://${ALGORITHMIA_TEST_USERNAME}/MyTestDirectory2/TestFile.txt`
      );

      expect(await file2.get()).toBe('test text algorithm file get call');
    });
  });

  describe('algorithm file getString call', () => {
    it('gets file', async () => {
      const file = algoClient.file(
        `data://${ALGORITHMIA_TEST_USERNAME}/MyTestDirectory2/TestFile.txt`
      );

      await fileCheckExists(algoClient, file);

      await file.put('algorithm file getString call');

      const file2 = algoClient.file(
        `data://${ALGORITHMIA_TEST_USERNAME}/MyTestDirectory2/TestFile.txt`
      );

      expect(await file2.getString()).toBe('algorithm file getString call');
    });
  });

  describe('algorithm file getJson call', () => {
    it('gets file', async () => {
      const file = algoClient.file(
        `data://${ALGORITHMIA_TEST_USERNAME}/MyTestDirectory2/TestFile.txt`
      );

      await fileCheckExists(algoClient, file);

      const dataString = { testText: 'test text algorithm file getJson call' };
      await file.putJson(dataString);

      const file2 = algoClient.file(
        `data://${ALGORITHMIA_TEST_USERNAME}/MyTestDirectory2/TestFile.txt`
      );

      expect(await file2.getJson()).toBe(JSON.stringify(dataString));
    });
  });

  describe('algorithm file getBinary call', () => {
    it('gets file', async () => {
      const file = algoClient.file(
        `data://${ALGORITHMIA_TEST_USERNAME}/MyTestDirectory2/TestFile.txt`
      );

      await fileCheckExists(algoClient, file);

      await file.put('test text algorithm file getBinary call');

      const file2 = algoClient.file(
        `data://${ALGORITHMIA_TEST_USERNAME}/MyTestDirectory2/TestFile.txt`
      );

      writeFileSync('test/TestFile.txt', await file2.getBinary());
      expect(
        await readFileSync('test/TestFile.txt', { encoding: 'utf-8' })
      ).toBe('test text algorithm file getBinary call');
    });
  });

  describe('algorithm file exists call', () => {
    it('checks for file existence', async () => {
      const file = algoClient.file(
        `data://${ALGORITHMIA_TEST_USERNAME}/MyTestDirectory2/TestFile.txt`
      );

      await fileCheckExists(algoClient, file);

      await file.put('test algorithm file exists call');

      const file2 = algoClient.file(
        `data://${ALGORITHMIA_TEST_USERNAME}/MyTestDirectory2/TestFile.txt`
      );

      expect(await file2.exists()).toBe(true);
    });
  });

  describe('algorithm file delete call', () => {
    it('deletes file', async () => {
      const file = algoClient.file(
        `data://${ALGORITHMIA_TEST_USERNAME}/MyTestDirectory2/TestFile2.txt`
      );

      await file.put('DELETE ME PLEASE: test algorithm file delete call');

      expect(await file.delete()).toBe(
        JSON.stringify({ result: { deleted: 1 } })
      );
    });
  });

  describe('algorithm directory exists call', () => {
    it('checks for directory existence', async () => {
      const file = algoClient.file(
        `data://${ALGORITHMIA_TEST_USERNAME}/MyTestDirectory2/TestFile.txt`
      );

      await file.put('test algorithm directory exists call');

      const dir = algoClient.dir(
        `data://${ALGORITHMIA_TEST_USERNAME}/MyTestDirectory2`
      );

      expect(await dir.exists()).toBe(true);
    });
  });

  describe('algorithm directory create call', () => {
    it('creates dir', async () => {
      const dir = algoClient.dir(
        `data://${ALGORITHMIA_TEST_USERNAME}/MyTestDirectory3`
      );

      const directoryAlreadyExists = await dir.exists();
      if (directoryAlreadyExists) {
        await dir.delete(true);
      }

      const newDir = algoClient.dir(`data://${ALGORITHMIA_TEST_USERNAME}/`);

      await newDir.create('MyTestDirectory3');

      expect(await newDir.exists()).toBe(true);
    });
  });

  describe('algorithm directory file put call', () => {
    it('uploads file', async () => {
      const dir = algoClient.dir(
        `data://${ALGORITHMIA_TEST_USERNAME}/MyTestDirectory2`
      );
      const file = dir.file('TestUploadFile.txt');

      const fileAlreadyExists = await file.exists();
      if (fileAlreadyExists) {
        await file.delete();
      }

      await dir.put(file.baseName(), 'test algorithm directory file put call');

      expect(await file.exists()).toBe(true);
    });
  });

  describe('algorithm directory file put call from local path', () => {
    it('uploads file from local path', async () => {
      const dir = algoClient.dir(
        `data://${ALGORITHMIA_TEST_USERNAME}/MyTestDirectory2`
      );

      const alreadyExistsFile = algoClient.file(
        `data://${ALGORITHMIA_TEST_USERNAME}/MyTestDirectory2/TestImage.png`
      );

      const fileAlreadyExists = await alreadyExistsFile.exists();

      if (fileAlreadyExists) {
        await alreadyExistsFile.delete();
      }

      await dir.putFile(resolve(`${__dirname}/TestImage.png`));

      expect(await alreadyExistsFile.exists()).toBe(true);
    });
  });

  describe('algorithm directory delete call', () => {
    it('deletes directory', async () => {
      const dir = algoClient.dir(`data://${ALGORITHMIA_TEST_USERNAME}`);

      await dir.create('MyTestDirectory4');

      const newDir = algoClient.dir(
        `data://${ALGORITHMIA_TEST_USERNAME}/MyTestDirectory4`
      );

      expect(await newDir.delete(true)).toEqual(
        JSON.stringify({ result: { deleted: 1 } })
      );
    });
  });

  describe('algorithm directory get call', () => {
    it('gets dir', async () => {
      const file = algoClient.file(
        `data://${ALGORITHMIA_TEST_USERNAME}/MyTestDirectory4/TestFile.txt`
      );

      await fileCheckExists(algoClient, file);

      await file.put('test algorithm directory get call');

      const dir = algoClient.dir(
        `data://${ALGORITHMIA_TEST_USERNAME}/MyTestDirectory4`
      );

      const dataList = JSON.parse(await dir.get());

      expect(dataList.files.length).toBe(1);

      const deleteDir = algoClient.dir(
        `data://${ALGORITHMIA_TEST_USERNAME}/MyTestDirectory4`
      );
      await deleteDir.delete(true);
    });
  });
});
