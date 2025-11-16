import { APIDecorator } from './APIDecorator';

/**
 * Decorator Pattern - Concrete Decorator
 * Adds retry functionality to API calls
 */
export class RetryAPIDecorator extends APIDecorator {
  private maxRetries: number;
  private retryDelay: number; // in milliseconds

  constructor(
    component: import('./APIDecorator').APIDecorator,
    maxRetries: number = 3,
    retryDelay: number = 1000
  ) {
    super(component);
    this.maxRetries = maxRetries;
    this.retryDelay = retryDelay;
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async call(endpoint: string, method: string, data?: any): Promise<any> {
    let lastError: any;
    
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        console.log(`[RETRY] Attempt ${attempt}/${this.maxRetries} for ${endpoint}`);
        const result = await super.call(endpoint, method, data);
        
        if (attempt > 1) {
          console.log(`[RETRY] Successfully completed on attempt ${attempt}`);
        }
        
        return result;
      } catch (error) {
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

