import { AlgorithmiaClient } from './AlgorithmiaClient';

class Algorithmia {
  private static client: AlgorithmiaClient;

  static getClient(key?: string, apiAddress?: string): AlgorithmiaClient {
    return new AlgorithmiaClient(key, apiAddress);
  }

  static defaultClient(): AlgorithmiaClient {
    return Algorithmia.getDefaultClient();
  }

  static getDefaultClient(): AlgorithmiaClient {
    if (Algorithmia.client == null) {
      Algorithmia.client = new AlgorithmiaClient();
    }
    return Algorithmia.client;
  }
}

export { Algorithmia };
