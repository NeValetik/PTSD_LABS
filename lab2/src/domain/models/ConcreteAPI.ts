import { APIAbstraction } from './APIAbstraction';
import { IAPIImplementation } from './IAPIImplementation';

/**
 * Bridge Pattern - Refined Abstraction
 * Concrete implementation of the abstraction
 */
export class ConcreteAPI extends APIAbstraction {
  constructor(implementation: IAPIImplementation) {
    super(implementation);
  }

  async request(endpoint: string, method: string, data?: any): Promise<any> {
    // Add abstraction-level logic here (e.g., validation, transformation)
    console.log(`[API Abstraction] Preparing ${method} request to ${endpoint}`);
    
    // Delegate to implementation
    const result = await this.implementation.execute(endpoint, method, data);
    
    console.log(`[API Abstraction] Request completed`);
    return result;
  }
}

