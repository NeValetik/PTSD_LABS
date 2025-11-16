"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIBase = void 0;
const ConcreteAPI_1 = require("./ConcreteAPI");
/**
 * Decorator Pattern - Concrete Component
 * Base API component that wraps the bridge abstraction
 */
class APIBase {
    constructor(implementation) {
        this.api = new ConcreteAPI_1.ConcreteAPI(implementation);
    }
    async call(endpoint, method, data) {
        return this.api.request(endpoint, method, data);
    }
}
exports.APIBase = APIBase;
