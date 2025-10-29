import { IFish, Fish, TropicalFish, DeepSeaFish, FreshwaterFish } from '../models/Fish';
import { IFishRepository } from '../repositories/FishRepository';

export class FishService {
  constructor(private fishRepository: IFishRepository) {}

  getAllFish(): IFish[] {
    return this.fishRepository.getAllFish();
  }

  getFishById(id: string): IFish | undefined {
    return this.fishRepository.getFishById(id);
  }

  getFishByHabitat(habitat: string): IFish[] {
    return this.fishRepository.getFishByHabitat(habitat);
  }

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

  displayFishInfo(fish: IFish): string {
    return `
Fish Information:
${fish.getInfo()}
${fish.getHabitatInfo()}
---`;
  }

  displayAllFishInfo(): string {
    const allFish = this.getAllFish();
    if (allFish.length === 0) {
      return "No fish found in the repository.";
    }

    return allFish.map(fish => this.displayFishInfo(fish)).join('\n');
  }
}

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
