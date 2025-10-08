import { InMemoryFishRepository } from './FishRepository';
import { FishFactory } from '../services/FishService';

// Concrete implementation that extends the base repository
// Demonstrates Open-Closed Principle - we can add new functionality
// without modifying the base repository class
export class SampleFishRepository extends InMemoryFishRepository {
  
  initializeData(): void {
    // Add sample tropical fish
    this.addFish(FishFactory.createTropicalFish(
      '1', 'Clownfish', 'Amphiprion ocellatus', 10, 'Omnivore'
    ));
    
    this.addFish(FishFactory.createTropicalFish(
      '2', 'Angelfish', 'Pterophyllum scalare', 15, 'Omnivore'
    ));
    
    this.addFish(FishFactory.createTropicalFish(
      '3', 'Parrotfish', 'Scarus coeruleus', 30, 'Herbivore'
    ));

    // Add sample deep sea fish
    this.addFish(FishFactory.createDeepSeaFish(
      '4', 'Anglerfish', 'Melanocetus johnsonii', 20, 'Carnivore'
    ));
    
    this.addFish(FishFactory.createDeepSeaFish(
      '5', 'Viperfish', 'Chauliodus sloani', 35, 'Carnivore'
    ));
    
    this.addFish(FishFactory.createDeepSeaFish(
      '6', 'Gulper Eel', 'Eurypharynx pelecanoides', 100, 'Carnivore'
    ));

    // Add sample freshwater fish
    this.addFish(FishFactory.createFreshwaterFish(
      '7', 'Goldfish', 'Carassius auratus', 20, 'Omnivore'
    ));
    
    this.addFish(FishFactory.createFreshwaterFish(
      '8', 'Catfish', 'Silurus glanis', 50, 'Carnivore'
    ));
    
    this.addFish(FishFactory.createFreshwaterFish(
      '9', 'Trout', 'Salmo trutta', 40, 'Carnivore'
    ));

    // Add some additional fish to demonstrate variety
    this.addFish(FishFactory.createTropicalFish(
      '10', 'Butterflyfish', 'Chaetodon capistratus', 12, 'Omnivore'
    ));
    
    this.addFish(FishFactory.createDeepSeaFish(
      '11', 'Blobfish', 'Psychrolutes marcidus', 30, 'Carnivore'
    ));
    
    this.addFish(FishFactory.createFreshwaterFish(
      '12', 'Piranha', 'Pygocentrus nattereri', 25, 'Carnivore'
    ));
  }

  // Additional methods specific to this repository
  // This demonstrates Open-Closed Principle - we can add new functionality
  // without modifying the base class
  getFishCount(): number {
    return this.getAllFish().length;
  }

  getFishBySizeRange(minSize: number, maxSize: number) {
    return this.getAllFish().filter(fish => 
      fish.size >= minSize && fish.size <= maxSize
    );
  }

  getFishStatistics() {
    const allFish = this.getAllFish();
    const habitats = [...new Set(allFish.map(fish => fish.habitat))];
    const diets = [...new Set(allFish.map(fish => fish.diet))];
    
    return {
      totalFish: allFish.length,
      habitats: habitats.length,
      diets: diets.length,
      averageSize: allFish.reduce((sum, fish) => sum + fish.size, 0) / allFish.length
    };
  }
}
