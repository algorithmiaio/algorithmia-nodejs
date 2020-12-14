"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Algorithmia = void 0;
const AlgorithmiaClient_1 = require("./AlgorithmiaClient");
class Algorithmia {
    constructor() {
    }
    static getClient(key, apiAddress) {
        return new AlgorithmiaClient_1.AlgorithmiaClient(key, apiAddress);
    }
    static defaultClient() {
        return Algorithmia.getDefaultClient();
    }
    static getDefaultClient() {
        if (Algorithmia.client == null) {
            Algorithmia.client = new AlgorithmiaClient_1.AlgorithmiaClient();
        }
        return Algorithmia.client;
    }
}
exports.Algorithmia = Algorithmia;
//# sourceMappingURL=Algorithmia.js.map