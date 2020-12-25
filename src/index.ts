export { Algorithmia } from '../src/Algorithmia';
export { AlgorithmiaClient } from './AlgorithmiaClient';
export { DataFile, DataDir, DataList } from '../src/Data';
import { DataFile } from '../src/Data';
import { Algorithmia } from '../src/Algorithmia';

const file: DataFile = Algorithmia.getClient(
  process.env.ALGORITHMIA_DEFAULT_API_KEY
).file('data://dherring/DalesFunTime/NahDawg.txt');
file.get().then((x) => {
  console.log(x);
});
