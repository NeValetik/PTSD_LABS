import { FishService } from './services/FishService';
import { SampleFishRepository } from './repositories/SampleFishRepository';
import { FishDisplay } from './utils/FishDisplay';
import { JsonFishRepository } from './repositories/FishRepository';

// Ocean Fish Listing App demonstrating SOLID principles
class OceanFishApp {
  private fishService: FishService;
  private sampleRepository: SampleFishRepository;

  constructor() {
    // Demonstrates Liskov Substitution Principle
    // We can use any repository implementation that implements IFishRepository
    this.sampleRepository = new SampleFishRepository();
    this.fishService = new FishService(this.sampleRepository);
  }

  // Demonstrate different SOLID principles
  demonstrateSOLIDPrinciples(): void {
    this.runInteractiveDemo();
  }

  private runInteractiveDemo(): void {
    const allFish = this.fishService.getAllFish();
    FishDisplay.displayFishList(allFish, "All Ocean Fish");
    
    // Show fish by habitat
    const tropicalFish = this.fishService.getFishByHabitat("Tropical Reef");
    FishDisplay.displayFishList(tropicalFish, "Tropical Reef Fish");
    
    const deepSeaFish = this.fishService.getFishByHabitat("Deep Ocean");
    FishDisplay.displayFishList(deepSeaFish, "Deep Sea Fish");
    
    const freshwaterFish = this.fishService.getFishByHabitat("Freshwater");
    FishDisplay.displayFishList(freshwaterFish, "Freshwater Fish");
    
    // Show large fish
    const largeFish = this.fishService.getLargeFish(30);
    FishDisplay.displayFishList(largeFish, "Large Fish (>30cm)");
    
    // Show small fish
    const smallFish = this.fishService.getSmallFish(20);
    FishDisplay.displayFishList(smallFish, "Small Fish (<20cm)");
    
    // Show fish by diet
    const carnivores = this.fishService.getFishByDiet("Carnivore");
    FishDisplay.displayFishList(carnivores, "Carnivorous Fish");
    
    // Show statistics
    const stats = this.sampleRepository.getFishStatistics();
    FishDisplay.displayStatistics(stats);
    
    // Show individual fish details
    if (allFish.length > 0) {
      FishDisplay.displayFishDetails(allFish[0]);
    }
    
    // Demonstrate fish creation with factory
    const newTropicalFish = this.sampleRepository.getFishById("1");
    if (newTropicalFish) {
      console.log(`Created fish: ${newTropicalFish.getInfo()}`);
    }
  }
}

// Run the application
const app = new OceanFishApp();
app.demonstrateSOLIDPrinciples();