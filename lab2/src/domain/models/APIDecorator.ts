import { IAPIComponent } from './IAPIComponent';

/**
 * Decorator Pattern - Base Decorator
 * Maintains a reference to a component and delegates requests to it
 */
export abstract class APIDecorator implements IAPIComponent {
  protected component: IAPIComponent;

  constructor(component: IAPIComponent) {
    this.component = component;
  }

  async call(endpoint: string, method: string, data?: any): Promise<any> {
    return this.component.call(endpoint, method, data);
  }
}

