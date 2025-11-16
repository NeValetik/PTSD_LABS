import { APIDecorator } from './APIDecorator';

/**
 * Decorator Pattern - Concrete Decorator
 * Adds logging functionality to API calls
 */
export class LoggingAPIDecorator extends APIDecorator {
  async call(endpoint: string, method: string, data?: any): Promise<any> {
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
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`[LOG] API Call Failed after ${duration}ms`);
      console.error(`[LOG] Error:`, error);
      console.log('═══════════════════════════════════════');
      throw error;
    }
  }
}

