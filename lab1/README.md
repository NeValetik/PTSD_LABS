# Creational Design Patterns

## Author: Vitcovschii Vladimir
## Group: FAF-231

------

## Objectives:

__1. Study and understand the Creational Design Patterns.__

__2. Choose a domain, define its main classes/models/entities and choose the appropriate instantiation mechanisms.__

__3. Use some creational design patterns for object instantiation in a sample project.__

## Theory:

In software engineering, the creational design patterns are the general solutions that deal with object creation, trying to create objects in a manner suitable to the situation. The basic form of object creation could result in design problems or added complexity to the design. Creational design patterns solve this problem by optimizing, hiding or controlling the object creation.

Some examples of this kind of design patterns are:
   * Singleton
   * Builder
   * Prototype
   * Object Pooling
   * Factory Method
   * Abstract Factory

## Domain Selection:

For this laboratory work, I have chosen the **Bacteria Management System** domain. This domain is well-suited for demonstrating creational design patterns because:

- Bacteria come in various types (E. coli, Streptococcus, Lactobacillus, etc.) that require different initialization parameters
- A single service instance should manage all bacteria operations (Singleton pattern)
- Bacteria can reproduce through cloning, which is a natural use case for the Prototype pattern
- Creating different types of bacteria can be abstracted through factory methods

## Used Design Patterns:

* **Factory Pattern** - Used in `BacteriaFactory` class to create different types of bacteria with predefined configurations
* **Singleton Pattern** - Implemented in `BacteriaService` to ensure only one instance manages all bacteria operations
* **Prototype Pattern** - Implemented in `Bacteria` class through the `clone()` method, allowing bacteria to be duplicated

## Implementation:

### Project Structure:

```
src/
├── client.ts                          # Main application entry point
└── domain/
    ├── models/
    │   └── Bacteria.ts                # Bacteria model implementing Prototype pattern
    ├── repositories/
    │   └── BacteriaRepository.ts      # Repository for storing and managing bacteria
    └── services/
        ├── BacteriaFactory.ts         # Factory for creating different bacteria types
        └── BacteriaService.ts         # Singleton service for bacteria operations
```

### 1. Factory Pattern Implementation

The Factory Pattern is implemented in the `BacteriaFactory` class, which provides static methods to create different types of bacteria with predefined configurations. This pattern encapsulates the creation logic and makes it easy to add new bacteria types without modifying existing code.

**Key Features:**
- Static factory methods for each bacteria type (E. coli, Streptococcus, Lactobacillus, etc.)
- A generic `createBacteria()` method for custom bacteria creation
- Centralized creation logic that ensures consistent initialization

**Code Snippet:**

```typescript
export class BacteriaFactory {
  static createEColi(id: string): Bacteria {
    return new Bacteria({
      id,
      name: "E. coli",
      description: "Escherichia coli - Gram-negative, rod-shaped bacterium commonly found in intestines"
    });
  }

  static createStreptococcus(id: string): Bacteria {
    return new Bacteria({
      id,
      name: "Streptococcus",
      description: "Gram-positive, spherical bacterium that can cause various infections"
    });
  }

  static createBacteria(id: string, name: string, description: string): Bacteria {
    return new Bacteria({ id, name, description });
  }
}
```

### 2. Singleton Pattern Implementation

The Singleton Pattern is implemented in the `BacteriaService` class, ensuring that only one instance of the service exists throughout the application lifecycle. This is crucial for maintaining consistent state across the application.

**Key Features:**
- Private constructor to prevent direct instantiation
- Static `getInstance()` method that returns the same instance
- Thread-safe implementation (for single-threaded JavaScript/TypeScript context)

**Code Snippet:**

```typescript
export class BacteriaService implements IBacteriaService {
  private static instance: BacteriaService | null = null;
  private bacteriaRepository: IBacteriaRepository;

  private constructor(bacteriaRepository: IBacteriaRepository) {
    this.bacteriaRepository = bacteriaRepository;
  }

  public static getInstance(bacteriaRepository: IBacteriaRepository): BacteriaService {
    if (BacteriaService.instance === null) {
      BacteriaService.instance = new BacteriaService(bacteriaRepository);
    }
    return BacteriaService.instance;
  }

  // ... other methods
}
```

### 3. Prototype Pattern Implementation

The Prototype Pattern is implemented in the `Bacteria` class, which implements the `Prototype` interface. This allows bacteria to be cloned, which is useful for simulating bacterial reproduction (mitosis).

**Key Features:**
- `Bacteria` class implements the `Prototype` interface with a `clone()` method
- The `clone()` method creates a new instance with the same properties
- The repository's `mitoz()` method uses cloning to simulate bacterial reproduction

**Code Snippet:**

```typescript
interface Prototype {
  clone(): Prototype;
}

class Bacteria implements Prototype {
  private id: string;
  private name: string;
  private description: string;

  constructor({id, name, description, instance}: {id?: string, name?: string, description?: string, instance?: Bacteria}) {
    if (instance) {
      this.id = instance.id;
      this.name = instance.name;
      this.description = instance.description;
      return;
    }
    // ... initialization logic
  }

  clone(): Prototype {
    return new Bacteria({instance: this});
  }
}
```

**Usage in Repository:**

```typescript
// mitoz implements the Prototype Pattern - clones bacteria using their clone() method
mitoz(bacteria: Bacteria): void {
  this.bacteriaList.push(bacteria.clone() as Bacteria);
}
```

## Demonstration:

The application demonstrates all three patterns through a comprehensive demonstration script in `client.ts`. The demonstration includes:

1. **Factory Pattern Demo:** Creates various types of bacteria using factory methods
2. **Singleton Pattern Demo:** Verifies that multiple calls to `getInstance()` return the same instance
4. **Prototype Pattern Demo:** Demonstrates cloning bacteria and verifying they are separate instances
5. **Mitoz Feature:** Shows bacterial reproduction using the prototype pattern

**Example Output:**
```ps
============================================================
BACTERIA MANAGEMENT SYSTEM - PATTERN DEMONSTRATION
============================================================


FACTORY PATTERN - Creating Bacteria using Factory
------------------------------------------------------------
Created bacteria using factory methods:
   1. [1] E. coli
      Escherichia coli - Gram-negative, rod-shaped bacterium commonly found in intestines
   2. [2] Streptococcus
      Gram-positive, spherical bacterium that can cause various infections
   3. [3] Lactobacillus
      Gram-positive, rod-shaped bacterium beneficial for digestive health 
   4. [4] Staphylococcus
      Gram-positive, spherical bacterium that can cause skin infections   
   5. [5] Bacillus
      Gram-positive, rod-shaped bacterium that forms spores
   6. [6] Salmonella
      Gram-negative, rod-shaped bacterium that can cause food poisoning   


SINGLETON PATTERN - Verifying Single Instance
------------------------------------------------------------
Created three service instances:
Service 1 address: BacteriaService {
  bacteriaRepository: BacteriaRepository {
    bacteriaList: [
      [EColiBacteria],
      [StreptococcusBacteria],
      [LactobacillusBacteria],
      [StaphylococcusBacteria],
      [BacillusBacteria],
      [SalmonellaBacteria]
    ]
  }
}
Service 2 address: BacteriaService {
  bacteriaRepository: BacteriaRepository {
    bacteriaList: [
      [EColiBacteria],
      [StreptococcusBacteria],
      [LactobacillusBacteria],
      [StaphylococcusBacteria],
      [BacillusBacteria],
      [SalmonellaBacteria]
    ]
  }
}
Service 3 address: BacteriaService {
  bacteriaRepository: BacteriaRepository {
    bacteriaList: [
      [EColiBacteria],
      [StreptococcusBacteria],
      [LactobacillusBacteria],
      [StaphylococcusBacteria],
      [BacillusBacteria],
      [SalmonellaBacteria]
    ]
  }
}
Are they the same instance? true
Total bacteria count (from any instance): 6


CRUD OPERATIONS - Create, Read, Update, Delete
------------------------------------------------------------
Created custom bacteria:
   ID: 7
   Name: Custom Bacteria
   Description: A custom bacterium created for testing purposes

 Read bacteria by ID (ID: 1):
   E. coli - Escherichia coli - Gram-negative, rod-shaped bacterium commonly found in intestines

 All bacteria in repository:
   Total count: 7

 Updated bacteria (ID: 7):
   Updated Custom Bacteria - This bacteria has been updated with new information

 Deleted bacteria (ID: 6 - Salmonella)
   Remaining bacteria count: 6


 PROTOTYPE PATTERN - Cloning Bacteria
------------------------------------------------------------
Original bacteria:
   ID: 1
   Name: E. coli
   Description: Escherichia coli - Gram-negative, rod-shaped bacterium commonly found in intestines

Cloned bacteria:
   ID: 1
   Name: E. coli
   Description: Escherichia coli - Gram-negative, rod-shaped bacterium commonly found in intestines

Are they the same object? false
Do they have the same ID? true
Do they have the same name? true

 Added cloned bacteria with new ID (ID: 8)


 MITOZ - Prototype Pattern Implementation
------------------------------------------------------------
Initial bacteria count: 7
After mitoz (prototype pattern cloning): 8
   Added bacteria: E. coli
   Growth: +1 bacteria


============================================================
FINAL SUMMARY
============================================================
Total bacteria in repository: 8

All bacteria:
   1. [1] E. coli
      Escherichia coli - Gram-negative, rod-shaped bacterium commonly found in intestines
   2. [2] Streptococcus
      Gram-positive, spherical bacterium that can cause various infections
   3. [3] Lactobacillus
      Gram-positive, rod-shaped bacterium beneficial for digestive health 
   4. [4] Staphylococcus
      Gram-positive, spherical bacterium that can cause skin infections   
   5. [5] Bacillus
      Gram-positive, rod-shaped bacterium that forms spores
   6. [7] Updated Custom Bacteria
      This bacteria has been updated with new information
   7. [8] E. coli
      Escherichia coli - Gram-negative, rod-shaped bacterium commonly found in intestines
   8. [1] E. coli
      Escherichia coli - Gram-negative, rod-shaped bacterium commonly found in intestines

============================================================
```

## Running the Project:

1. Install dependencies:
```bash
npm install
```

Or build and run:
```bash
npm run build
npm run start
```

## Conclusions:

This laboratory work successfully demonstrates the implementation of three creational design patterns:

1. **Factory Pattern** provides a clean way to create different types of bacteria without exposing the creation logic, making the code more maintainable and extensible.

2. **Singleton Pattern** ensures that only one instance of the `BacteriaService` exists, which is essential for maintaining consistent state and avoiding conflicts in a bacteria management system.

3. **Prototype Pattern** allows bacteria to be cloned efficiently, which is particularly useful for simulating bacterial reproduction (mitosis) in a biological context.

The chosen domain (Bacteria Management System) provides a natural and intuitive context for these patterns, making the code both educational and practical. The implementation follows best practices with proper separation of concerns, interfaces for abstraction, and clear demonstration of each pattern's benefits.

## Screenshots / Results:

The application produces console output demonstrating all three patterns working together. The output shows:
- Factory-created bacteria instances
- Singleton verification with multiple service instances
- CRUD operations on bacteria
- Prototype cloning functionality
- Bacterial reproduction simulation through the mitoz feature

All patterns are implemented correctly and work harmoniously within the application architecture.
