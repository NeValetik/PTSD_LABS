import { IFish } from '../models/Fish';

// Open-Closed Principle: Open for extension, closed for modification
// This interface defines the contract for fish repositories
export interface IFishRepository {
  getAllFish(): IFish[];
  getFishById(id: string): IFish | undefined;
  getFishByHabitat(habitat: string): IFish[];
  addFish(fish: IFish): void;
}

// Base repository implementation
export abstract class BaseFishRepository implements IFishRepository {
  protected fishList: IFish[] = [];

  getAllFish(): IFish[] {
    return [...this.fishList]; // Return a copy to prevent external modification
  }

  getFishById(id: string): IFish | undefined {
    return this.fishList.find(fish => fish.id === id);
  }

  getFishByHabitat(habitat: string): IFish[] {
    return this.fishList.filter(fish => fish.habitat === habitat);
  }

  addFish(fish: IFish): void {
    this.fishList.push(fish);
  }

  // Abstract method that must be implemented by concrete repositories
  abstract initializeData(): void;
}

// In-memory repository implementation
export class InMemoryFishRepository extends BaseFishRepository {
  constructor() {
    super();
    this.initializeData();
  }

  initializeData(): void {
    // This method can be extended without modifying the base class
    // New fish types can be added here without changing existing code
  }
}

// JSON-based repository (extending the base without modification)
export class JsonFishRepository extends BaseFishRepository {
  private dataSource: string;

  constructor(dataSource: string) {
    super();
    this.dataSource = dataSource;
    this.initializeData();
  }

  initializeData(): void {
    // Could load from JSON file
    // This demonstrates how we can extend functionality without modifying base class
    console.log(`Loading fish data from: ${this.dataSource}`);
  }

  // Additional method specific to JSON repository
  saveToJson(): void {
    console.log('Saving fish data to JSON...');
  }
}
