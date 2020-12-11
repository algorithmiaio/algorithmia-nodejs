import { AlgorithmiaClient } from './AlgorithmiaClient';
declare class Algorithmia {
    private static defaultClient;
    private constructor();
    static clientKeyAddress(key: string, apiAddress: string): AlgorithmiaClient;
    static clientKey(key: string): AlgorithmiaClient;
    static client(): AlgorithmiaClient;
    static getDefaultClient(): AlgorithmiaClient;
}
export { Algorithmia };
