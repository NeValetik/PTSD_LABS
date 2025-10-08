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
    console.log("🐠 Welcome to the Ocean Fish Listing App! 🐠\n");
    
    this.demonstrateSingleResponsibility();
    this.demonstrateOpenClosed();
    this.demonstrateLiskovSubstitution();
    
    this.runInteractiveDemo();
  }

  // Single Responsibility Principle Demo
  private demonstrateSingleResponsibility(): void {
    console.log("📋 SINGLE RESPONSIBILITY PRINCIPLE DEMO:");
    console.log("Each class has one reason to change:");
    console.log("- Fish models: Only responsible for fish data");
    console.log("- FishDisplay: Only responsible for displaying information");
    console.log("- FishService: Only responsible for business logic");
    console.log("- FishRepository: Only responsible for data access\n");
  }

  // Open-Closed Principle Demo
  private demonstrateOpenClosed(): void {
    console.log("🔧 OPEN-CLOSED PRINCIPLE DEMO:");
    console.log("Classes are open for extension, closed for modification:");
    
    // We can extend the repository without modifying the base class
    const jsonRepo = new JsonFishRepository("fish-data.json");
    const jsonService = new FishService(jsonRepo);
    
    console.log("- BaseFishRepository is closed for modification");
    console.log("- SampleFishRepository extends it without changing base code");
    console.log("- JsonFishRepository adds new functionality (saveToJson)");
    console.log("- New repository types can be added without changing existing code\n");
  }

  // Liskov Substitution Principle Demo
  private demonstrateLiskovSubstitution(): void {
    console.log("🔄 LISKOV SUBSTITUTION PRINCIPLE DEMO:");
    console.log("Objects of superclass can be replaced with subclass objects:");
    
    const allFish = this.fishService.getAllFish();
    console.log("- Any IFish implementation works with FishService methods");
    console.log("- TropicalFish, DeepSeaFish, FreshwaterFish are interchangeable");
    console.log("- Repository implementations are substitutable");
    
    // Demonstrate that different fish types work the same way
    if (allFish.length > 0) {
      console.log(`- Example: ${allFish[0].getInfo()}`);
    }
    console.log();
  }

  private runInteractiveDemo(): void {
    console.log("🎮 INTERACTIVE DEMO - Showing all features:\n");
    
    // Show all fish
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
    console.log("🏭 FISH FACTORY DEMO:");
    const newTropicalFish = this.sampleRepository.getFishById("1");
    if (newTropicalFish) {
      console.log(`Created fish: ${newTropicalFish.getInfo()}`);
    }
    
    console.log("\n✨ Demo completed! The app demonstrates:");
    console.log("✅ Single Responsibility: Each class has one job");
    console.log("✅ Open-Closed: Extensible without modification");
    console.log("✅ Liskov Substitution: Subtypes are substitutable");
    console.log("\n🐠 Thank you for exploring the Ocean Fish Listing App! 🐠");
  }
}

// Run the application
const app = new OceanFishApp();
app.demonstrateSOLIDPrinciples();