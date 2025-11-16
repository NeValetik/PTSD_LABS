"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESTAPI = void 0;
/**
 * Bridge Pattern - Concrete Implementation
 * REST API implementation (simulated without actual calls)
 */
class RESTAPI {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    async execute(endpoint, method, data) {
        // Simulated API call - no actual network request
        console.log(`[REST API] ${method} ${this.baseUrl}${endpoint}`);
        if (data) {
            console.log(`[REST API] Payload:`, JSON.stringify(data));
        }
        // Return simulated response
        return Promise.resolve({
            status: 200,
            data: {
                message: `REST API ${method} request to ${endpoint} simulated`,
                timestamp: new Date().toISOString(),
                payload: data || null
            }
        });
    }
    getImplementationType() {
        return 'REST';
    }
}
exports.RESTAPI = RESTAPI;
