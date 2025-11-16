import { IAPIImplementation } from './IAPIImplementation';

/**
 * Bridge Pattern - Abstraction
 * Defines the abstraction interface that uses the implementation
 */
export abstract class APIAbstraction {
  protected implementation: IAPIImplementation;

  constructor(implementation: IAPIImplementation) {
    this.implementation = implementation;
  }

  abstract request(endpoint: string, method: string, data?: any): Promise<any>;
  
  getImplementationType(): string {
    return this.implementation.getImplementationType();
  }
}

