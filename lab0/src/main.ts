import { FishService } from './services/FishService';
import { SampleFishRepository } from './repositories/SampleFishRepository';
import { FishDisplay } from './utils/FishDisplay';

class OceanFishApp {
  private fishService: FishService;
  private sampleRepository: SampleFishRepository;

  constructor() {
    this.sampleRepository = new SampleFishRepository();
    this.fishService = new FishService(this.sampleRepository);
  }

  demonstrateSOLIDPrinciples(): void {
    this.runInteractiveDemo();
  }

  private runInteractiveDemo(): void {
    const allFish = this.fishService.getAllFish();
    FishDisplay.displayFishList(allFish, "All Ocean Fish");
    
    const tropicalFish = this.fishService.getFishByHabitat("Tropical Reef");
    FishDisplay.displayFishList(tropicalFish, "Tropical Reef Fish");
    
    const deepSeaFish = this.fishService.getFishByHabitat("Deep Ocean");
    FishDisplay.displayFishList(deepSeaFish, "Deep Sea Fish");
    
    const freshwaterFish = this.fishService.getFishByHabitat("Freshwater");
    FishDisplay.displayFishList(freshwaterFish, "Freshwater Fish");
    
    const largeFish = this.fishService.getLargeFish(30);
    FishDisplay.displayFishList(largeFish, "Large Fish (>30cm)");
    
    const smallFish = this.fishService.getSmallFish(20);
    FishDisplay.displayFishList(smallFish, "Small Fish (<20cm)");
    
    const carnivores = this.fishService.getFishByDiet("Carnivore");
    FishDisplay.displayFishList(carnivores, "Carnivorous Fish");
    
    const stats = this.sampleRepository.getFishStatistics();
    FishDisplay.displayStatistics(stats);
    
    if (allFish.length > 0) {
      FishDisplay.displayFishDetails(allFish[0]);
    }
    
    const newTropicalFish = this.sampleRepository.getFishById("1");
    if (newTropicalFish) {
      console.log(`Created fish: ${newTropicalFish.getInfo()}`);
    }
  }
}

const app = new OceanFishApp();
app.demonstrateSOLIDPrinciples();