"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIDecorator = void 0;
/**
 * Decorator Pattern - Base Decorator
 * Maintains a reference to a component and delegates requests to it
 */
class APIDecorator {
    constructor(component) {
        this.component = component;
    }
    async call(endpoint, method, data) {
        return this.component.call(endpoint, method, data);
    }
}
exports.APIDecorator = APIDecorator;
