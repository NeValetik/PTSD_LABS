import { IFish, Fish, TropicalFish, DeepSeaFish, FreshwaterFish } from '../models/Fish';
import { IFishRepository } from '../repositories/FishRepository';

// Liskov Substitution Principle: Objects of a superclass should be replaceable 
// with objects of its subclasses without breaking the application

// Service class that works with any fish repository implementation
export class FishService {
  constructor(private fishRepository: IFishRepository) {}

  // This method works with any repository implementation
  getAllFish(): IFish[] {
    return this.fishRepository.getAllFish();
  }

  getFishById(id: string): IFish | undefined {
    return this.fishRepository.getFishById(id);
  }

  getFishByHabitat(habitat: string): IFish[] {
    return this.fishRepository.getFishByHabitat(habitat);
  }

  // Business logic methods
  getLargeFish(minSize: number): IFish[] {
    return this.fishRepository.getAllFish().filter(fish => fish.size >= minSize);
  }

  getSmallFish(maxSize: number): IFish[] {
    return this.fishRepository.getAllFish().filter(fish => fish.size <= maxSize);
  }

  getFishByDiet(diet: string): IFish[] {
    return this.fishRepository.getAllFish().filter(fish => 
      fish.diet.toLowerCase().includes(diet.toLowerCase())
    );
  }

  // Method that demonstrates Liskov Substitution
  // Any fish type can be passed here and will work correctly
  displayFishInfo(fish: IFish): string {
    return `
Fish Information:
${fish.getInfo()}
${fish.getHabitatInfo()}
---`;
  }

  // Method that works with collections of any fish type
  displayAllFishInfo(): string {
    const allFish = this.getAllFish();
    if (allFish.length === 0) {
      return "No fish found in the repository.";
    }

    return allFish.map(fish => this.displayFishInfo(fish)).join('\n');
  }
}

// Factory class to create different types of fish
// Demonstrates how different fish types can be substituted
export class FishFactory {
  static createTropicalFish(id: string, name: string, species: string, size: number, diet: string): TropicalFish {
    return new TropicalFish(id, name, species, size, diet);
  }

  static createDeepSeaFish(id: string, name: string, species: string, size: number, diet: string): DeepSeaFish {
    return new DeepSeaFish(id, name, species, size, diet);
  }

  static createFreshwaterFish(id: string, name: string, species: string, size: number, diet: string): FreshwaterFish {
    return new FreshwaterFish(id, name, species, size, diet);
  }

  // Generic method that can create any fish type
  static createFish<T extends Fish>(
    fishType: new (id: string, name: string, species: string, size: number, diet: string) => T,
    id: string, 
    name: string, 
    species: string, 
    size: number, 
    diet: string
  ): T {
    return new fishType(id, name, species, size, diet);
  }
}
