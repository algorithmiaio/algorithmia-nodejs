"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlgorithmExecutable = void 0;
class AlgorithmExecutable {
    constructor(client, path) {
        this.client = client;
        this.path = path;
    }
    pipe(input, output) {
        return this.client.post(this.path + '/?output=' + output, input);
    }
}
exports.AlgorithmExecutable = AlgorithmExecutable;
//# sourceMappingURL=AlgorithmExecutable.js.map