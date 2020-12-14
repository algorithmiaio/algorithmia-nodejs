//for testing
import { basename } from 'path';
import { Algorithmia } from '../src/Algorithmia';
import { DataFile, DataDir, DataList } from '../src/Data';
import { AlgoResponse } from './AlgorithmExecutable';
import { AlgorithmiaClient } from './AlgorithmiaClient';

let file: DataFile = Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).file('data://dherring/DalesNotSoFunTime2/NahDawg.txt');

            

            let expected = '{"result":"data://dherring/DalesNotSoFunTime2/NahDawg.txt"}';
            


            

           