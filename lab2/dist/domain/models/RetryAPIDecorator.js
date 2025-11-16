"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetryAPIDecorator = void 0;
const APIDecorator_1 = require("./APIDecorator");
/**
 * Decorator Pattern - Concrete Decorator
 * Adds retry functionality to API calls
 */
class RetryAPIDecorator extends APIDecorator_1.APIDecorator {
    constructor(component, maxRetries = 3, retryDelay = 1000) {
        super(component);
        this.maxRetries = maxRetries;
        this.retryDelay = retryDelay;
    }
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async call(endpoint, method, data) {
        let lastError;
        for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
            try {
                console.log(`[RETRY] Attempt ${attempt}/${this.maxRetries} for ${endpoint}`);
                const result = await super.call(endpoint, method, data);
                if (attempt > 1) {
                    console.log(`[RETRY] Successfully completed on attempt ${attempt}`);
                }
                return result;
            }
            catch (error) {
                lastError = error;
                console.log(`[RETRY] Attempt ${attempt} failed:`, error);
                if (attempt < this.maxRetries) {
                    console.log(`[RETRY] Waiting ${this.retryDelay}ms before retry...`);
                    await this.sleep(this.retryDelay);
                    // Exponential backoff
                    this.retryDelay *= 2;
                }
            }
        }
        console.error(`[RETRY] All ${this.maxRetries} attempts failed`);
        throw lastError;
    }
}
exports.RetryAPIDecorator = RetryAPIDecorator;
