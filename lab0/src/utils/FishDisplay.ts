import { IFish } from '../models/Fish';

// Single Responsibility Principle: This class is only responsible for displaying fish information
export class FishDisplay {
  
  static displayFishList(fishList: IFish[], title: string = "Fish List"): void {
    console.log(`\n=== ${title} ===`);
    if (fishList.length === 0) {
      console.log("No fish found.");
      return;
    }
    
    fishList.forEach((fish, index) => {
      console.log(`${index + 1}. ${fish.getInfo()}`);
    });
    console.log(`\nTotal: ${fishList.length} fish\n`);
  }

  static displayFishDetails(fish: IFish): void {
    console.log(`\n=== Fish Details ===`);
    console.log(`ID: ${fish.id}`);
    console.log(`Name: ${fish.name}`);
    console.log(`Species: ${fish.species}`);
    console.log(`Habitat: ${fish.habitat}`);
    console.log(`Size: ${fish.size} cm`);
    console.log(`Diet: ${fish.diet}`);
    console.log(`Info: ${fish.getInfo()}`);
    console.log(`Habitat Info: ${fish.getHabitatInfo()}`);
    console.log("==================\n");
  }

  static displayStatistics(stats: {
    totalFish: number;
    habitats: number;
    diets: number;
    averageSize: number;
  }): void {
    console.log("\n=== Fish Statistics ===");
    console.log(`Total Fish: ${stats.totalFish}`);
    console.log(`Different Habitats: ${stats.habitats}`);
    console.log(`Different Diets: ${stats.diets}`);
    console.log(`Average Size: ${stats.averageSize.toFixed(1)} cm`);
    console.log("======================\n");
  }

  static displayMenu(): void {
    console.log("\n=== Ocean Fish Listing App ===");
    console.log("1. View all fish");
    console.log("2. View fish by habitat");
    console.log("3. View large fish (>30cm)");
    console.log("4. View small fish (<20cm)");
    console.log("5. View fish by diet");
    console.log("6. View fish statistics");
    console.log("7. Search fish by ID");
    console.log("8. Exit");
    console.log("==============================\n");
  }

  static displayHabitatOptions(): void {
    console.log("\n=== Select Habitat ===");
    console.log("1. Tropical Reef");
    console.log("2. Deep Ocean");
    console.log("3. Freshwater");
    console.log("=====================\n");
  }

  static displayDietOptions(): void {
    console.log("\n=== Select Diet ===");
    console.log("1. Carnivore");
    console.log("2. Herbivore");
    console.log("3. Omnivore");
    console.log("==================\n");
  }
}
