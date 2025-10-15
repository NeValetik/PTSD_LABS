# Ocean Fish Listing App

A TypeScript application that demonstrates the implementation of three SOLID principles through an ocean fish listing system.

## SOLID Principles Implemented

### 1. Single Responsibility Principle (SRP)
Each class has only one reason to change:

- **`Fish` classes**: Responsible only for fish data and behavior
- **`FishDisplay`**: Responsible only for displaying fish information
- **`FishService`**: Responsible only for business logic operations
- **`FishRepository`**: Responsible only for data access operations

### 2. Open-Closed Principle (OCP)
Classes are open for extension but closed for modification:

- **`BaseFishRepository`**: Closed for modification, but can be extended
- **`SampleFishRepository`**: Extends base repository without modifying it
- **`JsonFishRepository`**: Adds new functionality (JSON operations) without changing base code
- New repository types can be added without modifying existing code

### 3. Liskov Substitution Principle (LSP)
Objects of a superclass should be replaceable with objects of its subclasses:

- **`IFish` implementations**: `TropicalFish`, `DeepSeaFish`, `FreshwaterFish` are interchangeable
- **`IFishRepository` implementations**: Any repository can be substituted in `FishService`
- **Factory pattern**: Creates different fish types that all implement the same interface

## Project Structure

```
src/
├── models/
│   └── Fish.ts              # Fish interfaces and classes
├── repositories/
│   ├── FishRepository.ts    # Repository interfaces and base classes
│   └── SampleFishRepository.ts # Concrete repository with sample data
├── services/
│   └── FishService.ts       # Business logic and fish factory
├── utils/
│   └── FishDisplay.ts       # Display utilities
└── main.ts                  # Application entry point
```

## Features

- **Fish Management**: Create and manage different types of ocean fish
- **Habitat Filtering**: Filter fish by habitat (Tropical Reef, Deep Ocean, Freshwater)
- **Size Filtering**: Find large or small fish based on size criteria
- **Diet Filtering**: Filter fish by diet type (Carnivore, Herbivore, Omnivore)
- **Statistics**: View comprehensive fish statistics
- **Factory Pattern**: Create fish instances using a factory

## Sample Fish Data

The app includes 12 sample fish across three habitats:
- **Tropical Fish**: Clownfish, Angelfish, Parrotfish, Butterflyfish
- **Deep Sea Fish**: Anglerfish, Viperfish, Gulper Eel, Blobfish
- **Freshwater Fish**: Goldfish, Catfish, Trout, Piranha

## Running the Application

```bash
npm install
npm run start
```

## SOLID Principles Demonstration

The application demonstrates each SOLID principle through:

1. **SRP**: Clear separation of concerns across different classes
2. **OCP**: Repository pattern allows extension without modification
3. **LSP**: Fish types and repository implementations are fully substitutable

Each principle is explained in the console output when running the application.
