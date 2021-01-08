import { AlgorithmiaClient } from './AlgorithmiaClient';

class Algorithmia {
  static getClient(key?: string, apiAddress?: string): AlgorithmiaClient {
    return new AlgorithmiaClient(key, apiAddress);
  }
}

export { Algorithmia };
