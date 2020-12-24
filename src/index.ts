import { DataFile } from './Data';
import { Algorithmia } from './Algorithmia';

export { Algorithmia } from './Algorithmia';
export { AlgorithmiaClient } from './AlgorithmiaClient';
export { DataFile, DataDir, DataList } from './Data';

const file: DataFile = Algorithmia.getClient(
  process.env.ALGORITHMIA_DEFAULT_API_KEY
).file('data://dherring/DalesFunTime/NahDawg.txt');
file.get().then((x) => {
  console.log(x);
});
