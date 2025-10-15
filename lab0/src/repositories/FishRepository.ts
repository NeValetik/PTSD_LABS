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

  abstract initializeData(): void;
}

export class InMemoryFishRepository extends BaseFishRepository {
  constructor() {
    super();
    this.initializeData();
  }

  initializeData(): void {}
}