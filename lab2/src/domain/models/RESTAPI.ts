import { IAPIImplementation } from './IAPIImplementation';

/**
 * Bridge Pattern - Concrete Implementation
 * REST API implementation (simulated without actual calls)
 */
export class RESTAPI implements IAPIImplementation {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async execute(endpoint: string, method: string, data?: any): Promise<any> {
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

  getImplementationType(): string {
    return 'REST';
  }
}

