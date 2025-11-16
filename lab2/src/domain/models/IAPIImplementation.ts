/**
 * Bridge Pattern - Implementation Interface
 * Defines the interface for API implementations
 */
export interface IAPIImplementation {
  execute(endpoint: string, method: string, data?: any): Promise<any>;
  getImplementationType(): string;
}

