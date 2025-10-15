# Creational Design Patterns

## Author: Vladimir Vitcovschii

----

## Objectives:

* Get familiar with the Creational DPs;
* Choose a specific domain;
* Implement at least 3 CDPs for the specific domain;


## Used Design Patterns: 

* Factory Method Pattern
* Abstract Factory Pattern
* Builder Pattern


## Implementation

This TypeScript application demonstrates three creational design patterns through an ocean fish management system. The implementation showcases how these patterns can be used to create flexible and maintainable object creation mechanisms in a real-world scenario.

The Factory Method Pattern is implemented through the `FishFactory` class, which provides static methods to create different types of fish objects. This pattern encapsulates the object creation logic and allows the system to create fish instances without specifying their exact classes. The Abstract Factory Pattern is demonstrated through the repository system, where different repository implementations can be created and used interchangeably. The Builder Pattern is utilized in the fish creation process, allowing for step-by-step construction of complex fish objects with various attributes.

```typescript
// Factory Method Pattern
export class FishFactory {
  static createTropicalFish(id: string, name: string, species: string, size: number, diet: string): TropicalFish {
    return new TropicalFish(id, name, species, size, diet);
  }

  static createDeepSeaFish(id: string, name: string, species: string, size: number, diet: string): DeepSeaFish {
    return new DeepSeaFish(id, name, species, size, diet);
  }
}

// Abstract Factory Pattern
export interface IFishRepository {
  getAllFish(): IFish[];
  getFishById(id: string): IFish | undefined;
  getFishByHabitat(habitat: string): IFish[];
}

// Builder Pattern implementation
export class FishBuilder {
  private fish: Partial<IFish> = {};
  
  setId(id: string): FishBuilder {
    this.fish.id = id;
    return this;
  }
  
  setName(name: string): FishBuilder {
    this.fish.name = name;
    return this;
  }
  
  build(): IFish {
    return this.fish as IFish;
  }
}
```

The application provides comprehensive fish management capabilities including habitat-based filtering, size-based categorization, and diet-based organization. Users can explore different fish types through an interactive console interface that demonstrates the power and flexibility of creational design patterns in object-oriented programming.


## Conclusions / Screenshots / Results

The implementation successfully demonstrates how creational design patterns can be applied to solve real-world object creation challenges. The Factory Method Pattern provides a clean way to create different types of fish objects, the Abstract Factory Pattern enables flexible repository implementations, and the Builder Pattern allows for complex object construction with a fluent interface. These patterns work together to create a maintainable and extensible system that can easily accommodate new fish types and repository implementations without modifying existing code.
