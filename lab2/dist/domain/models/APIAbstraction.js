"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIAbstraction = void 0;
/**
 * Bridge Pattern - Abstraction
 * Defines the abstraction interface that uses the implementation
 */
class APIAbstraction {
    constructor(implementation) {
        this.implementation = implementation;
    }
    getImplementationType() {
        return this.implementation.getImplementationType();
    }
}
exports.APIAbstraction = APIAbstraction;
