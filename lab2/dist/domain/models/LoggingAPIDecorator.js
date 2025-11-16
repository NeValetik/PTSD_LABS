"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingAPIDecorator = void 0;
const APIDecorator_1 = require("./APIDecorator");
/**
 * Decorator Pattern - Concrete Decorator
 * Adds logging functionality to API calls
 */
class LoggingAPIDecorator extends APIDecorator_1.APIDecorator {
    async call(endpoint, method, data) {
        console.log('═══════════════════════════════════════');
        console.log(`[LOG] API Call Started`);
        console.log(`[LOG] Endpoint: ${endpoint}`);
        console.log(`[LOG] Method: ${method}`);
        console.log(`[LOG] Timestamp: ${new Date().toISOString()}`);
        const startTime = Date.now();
        try {
            const result = await super.call(endpoint, method, data);
            const duration = Date.now() - startTime;
            console.log(`[LOG] API Call Completed Successfully`);
            console.log(`[LOG] Duration: ${duration}ms`);
            console.log(`[LOG] Response:`, JSON.stringify(result, null, 2));
            console.log('═══════════════════════════════════════');
            return result;
        }
        catch (error) {
            const duration = Date.now() - startTime;
            console.error(`[LOG] API Call Failed after ${duration}ms`);
            console.error(`[LOG] Error:`, error);
            console.log('═══════════════════════════════════════');
            throw error;
        }
    }
}
exports.LoggingAPIDecorator = LoggingAPIDecorator;
