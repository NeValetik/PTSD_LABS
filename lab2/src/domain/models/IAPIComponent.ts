/**
 * Decorator Pattern - Component Interface
 * Defines the interface for API operations
 */
export interface IAPIComponent {
  call(endpoint: string, method: string, data?: any): Promise<any>;
}

