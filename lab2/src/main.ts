/**
 * Lab 2 - Structural Design Patterns Demonstration
 * 
 * This file demonstrates three structural design patterns:
 * 1. Bridge Pattern - Separates API abstraction from implementation
 * 2. Decorator Pattern - Adds functionality to API calls dynamically
 * 3. Facade Pattern - Provides simplified interface to complex API subsystem
 */

import { RESTAPI } from './domain/models/RESTAPI';
import { GraphQLAPI } from './domain/models/GraphQLAPI';
import { MockAPI } from './domain/models/MockAPI';
import { APIBase } from './domain/models/APIBase';
import { LoggingAPIDecorator } from './domain/models/LoggingAPIDecorator';
import { CachingAPIDecorator } from './domain/models/CachingAPIDecorator';
import { RetryAPIDecorator } from './domain/models/RetryAPIDecorator';
import { APIFacade } from './domain/services/APIFacade';

async function demonstrateBridgePattern() {
  console.log('\n\n');
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║           BRIDGE PATTERN DEMONSTRATION                     ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('\nThe Bridge Pattern separates abstraction from implementation.');
  console.log('We can switch between different API implementations without changing the abstraction.\n');

  // Create different API implementations
  const restAPI = new RESTAPI('https://api.example.com');
  const graphQLAPI = new GraphQLAPI('https://graphql.example.com');
  const mockAPI = new MockAPI();

  // Use the same abstraction with different implementations
  const restAbstraction = new APIBase(restAPI);
  const graphQLAbstraction = new APIBase(graphQLAPI);
  const mockAbstraction = new APIBase(mockAPI);

  console.log('\n--- Testing REST API Implementation ---');
  await restAbstraction.call('/users', 'GET');
  
  console.log('\n--- Testing GraphQL API Implementation ---');
  await graphQLAbstraction.call('{ users { id name } }', 'QUERY', { limit: 10 });
  
  console.log('\n--- Testing Mock API Implementation ---');
  await mockAbstraction.call('/test', 'POST', { test: 'data' });
  await mockAbstraction.call('/test', 'GET');
}

async function demonstrateDecoratorPattern() {
  console.log('\n\n');
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║          DECORATOR PATTERN DEMONSTRATION                   ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('\nThe Decorator Pattern adds functionality dynamically without modifying the base class.\n');

  // Create base API component
  const mockAPI = new MockAPI();
  let api: any = new APIBase(mockAPI);

  console.log('\n--- Base API (no decorators) ---');
  await api.call('/users/1', 'GET');

  console.log('\n--- Adding Logging Decorator ---');
  api = new LoggingAPIDecorator(api);
  await api.call('/users/2', 'GET');

  console.log('\n--- Adding Caching Decorator (on top of Logging) ---');
  api = new CachingAPIDecorator(api, 30000); // 30 second cache
  await api.call('/users/3', 'GET');
  console.log('\n--- Same request (should use cache) ---');
  await api.call('/users/3', 'GET');

  console.log('\n--- Adding Retry Decorator (on top of Caching and Logging) ---');
  api = new RetryAPIDecorator(api, 3, 500);
  await api.call('/users/4', 'GET');

  console.log('\n--- Demonstrating decorator chain: Logging -> Caching -> Retry ---');
  const baseAPI = new APIBase(new MockAPI());
  const decoratedAPI = new RetryAPIDecorator(
    new CachingAPIDecorator(
      new LoggingAPIDecorator(baseAPI),
      30000
    ),
    3,
    500
  );
  await decoratedAPI.call('/products/1', 'GET');
}

async function demonstrateFacadePattern() {
  console.log('\n\n');
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║            FACADE PATTERN DEMONSTRATION                    ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('\nThe Facade Pattern provides a simplified interface to a complex subsystem.\n');

  // Create different APIs for different services
  const userAPIBase = new APIBase(new MockAPI());
  const productAPIBase = new APIBase(new MockAPI());
  const orderAPIBase = new APIBase(new MockAPI());

  // Optionally add decorators to each API
  const userAPI = new LoggingAPIDecorator(userAPIBase);
  const productAPI = new LoggingAPIDecorator(productAPIBase);
  const orderAPI = new LoggingAPIDecorator(orderAPIBase);

  // Create facade that simplifies interaction with all APIs
  const apiFacade = new APIFacade(userAPI, productAPI, orderAPI);

  console.log('\n--- Using Facade to get user profile (simplified) ---');
  await apiFacade.getUserProfile('user123');

  console.log('\n--- Using Facade to get product details (simplified) ---');
  await apiFacade.getProductDetails('product456');

  console.log('\n--- Using Facade to create order (handles complexity internally) ---');
  await apiFacade.createOrder('user123', 'product456', 2);

  console.log('\n--- Using Facade to get order history (simplified) ---');
  await apiFacade.getOrderHistory('user123');

  console.log('\n--- Using Facade to get complete order details (coordinates multiple APIs) ---');
  await apiFacade.getCompleteOrderDetails('order789');
}

async function demonstrateAllPatternsTogether() {
  console.log('\n\n');
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║        ALL PATTERNS WORKING TOGETHER                       ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('\nDemonstrating how Bridge, Decorator, and Facade patterns work together:\n');

  // Bridge: Choose implementation (REST, GraphQL, or Mock)
  const restImplementation = new RESTAPI('https://api.example.com');
  
  // Bridge: Create abstraction
  const apiBase = new APIBase(restImplementation);
  
  // Decorator: Add functionality layers
  const decoratedAPI = new RetryAPIDecorator(
    new CachingAPIDecorator(
      new LoggingAPIDecorator(apiBase),
      30000
    ),
    3,
    500
  );

  // Facade: Simplify complex operations
  const facade = new APIFacade(decoratedAPI, decoratedAPI, decoratedAPI);

  console.log('\n--- Complete example: Using all patterns together ---');
  await facade.createOrder('user999', 'product888', 5);
}

async function main() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  Structural Design Patterns - API Generalization Demo');
  console.log('  Bridge, Decorator, and Facade Patterns');
  console.log('═══════════════════════════════════════════════════════════════');

  try {
    await demonstrateBridgePattern();
    await demonstrateDecoratorPattern();
    await demonstrateFacadePattern();
    await demonstrateAllPatternsTogether();

    console.log('\n\n');
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║                    DEMONSTRATION COMPLETE                   ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('\nSummary:');
    console.log('✓ Bridge Pattern: Separated API abstraction from implementation');
    console.log('✓ Decorator Pattern: Added logging, caching, and retry functionality');
    console.log('✓ Facade Pattern: Simplified complex API interactions');
    console.log('\nAll patterns work together to create a flexible, maintainable API system.');
  } catch (error) {
    console.error('Error during demonstration:', error);
  }
}

main();

