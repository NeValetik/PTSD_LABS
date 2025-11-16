import { IAPIComponent } from './IAPIComponent';
import { ConcreteAPI } from './ConcreteAPI';
import { IAPIImplementation } from './IAPIImplementation';

/**
 * Decorator Pattern - Concrete Component
 * Base API component that wraps the bridge abstraction
 */
export class APIBase implements IAPIComponent {
  private api: ConcreteAPI;

  constructor(implementation: IAPIImplementation) {
    this.api = new ConcreteAPI(implementation);
  }

  async call(endpoint: string, method: string, data?: any): Promise<any> {
    return this.api.request(endpoint, method, data);
  }
}

