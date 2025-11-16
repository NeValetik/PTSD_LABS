"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcreteAPI = void 0;
const APIAbstraction_1 = require("./APIAbstraction");
/**
 * Bridge Pattern - Refined Abstraction
 * Concrete implementation of the abstraction
 */
class ConcreteAPI extends APIAbstraction_1.APIAbstraction {
    constructor(implementation) {
        super(implementation);
    }
    async request(endpoint, method, data) {
        // Add abstraction-level logic here (e.g., validation, transformation)
        console.log(`[API Abstraction] Preparing ${method} request to ${endpoint}`);
        // Delegate to implementation
        const result = await this.implementation.execute(endpoint, method, data);
        console.log(`[API Abstraction] Request completed`);
        return result;
    }
}
exports.ConcreteAPI = ConcreteAPI;
