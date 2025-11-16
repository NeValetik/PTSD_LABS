import { IAPIImplementation } from './IAPIImplementation';

/**
 * Bridge Pattern - Concrete Implementation
 * Mock API implementation for testing (simulated without actual calls)
 */
export class MockAPI implements IAPIImplementation {
  private mockData: Map<string, any>;

  constructor() {
    this.mockData = new Map();
  }

  async execute(endpoint: string, method: string, data?: any): Promise<any> {
    // Simulated mock API call
    console.log(`[Mock API] ${method} ${endpoint}`);
    
    const key = `${method}:${endpoint}`;
    
    if (method === 'GET') {
      return Promise.resolve({
        status: 200,
        data: this.mockData.get(endpoint) || { message: 'No data found' }
      });
    } else if (method === 'POST' || method === 'PUT') {
      this.mockData.set(endpoint, data);
      return Promise.resolve({
        status: 200,
        data: { message: 'Data saved successfully', saved: data }
      });
    } else if (method === 'DELETE') {
      this.mockData.delete(endpoint);
      return Promise.resolve({
        status: 200,
        data: { message: 'Data deleted successfully' }
      });
    }
    
    return Promise.resolve({ status: 200, data: null });
  }

  getImplementationType(): string {
    return 'Mock';
  }
}

