"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Algorithmia_1 = require("../src/Algorithmia");
let file = Algorithmia_1.Algorithmia.getClient(process.env.ALGORITHMIA_DEFAULT_API_KEY).file('data://dherring/DalesNotSoFunTime2/NahDawg.txt');
let expected = '{"result":"data://dherring/DalesNotSoFunTime2/NahDawg.txt"}';
//# sourceMappingURL=index.js.map