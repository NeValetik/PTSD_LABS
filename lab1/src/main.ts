import { BacteriaRepository } from "./domain/repositories/BacteriaRepository";
import { BacteriaService } from "./domain/services/BacteriaService";
import { BacteriaFactory } from "./domain/services/BacteriaFactory";
import { Bacteria } from "./domain/models/Bacteria";

class BacteriaApp {
  private bacteriaRepository: BacteriaRepository;
  private bacteriaService: BacteriaService;

  constructor() {
    this.bacteriaRepository = new BacteriaRepository();
    this.bacteriaService = BacteriaService.getInstance(this.bacteriaRepository);
  }

  demonstratePatterns(): void {
    console.log("=".repeat(60));
    console.log("BACTERIA MANAGEMENT SYSTEM - PATTERN DEMONSTRATION");
    console.log("=".repeat(60));
    console.log("\n");

    this.demonstrateFactoryPattern();
    this.demonstrateSingletonPattern();
    this.demonstrateCRUDOperations();
    this.demonstratePrototypePattern();
    this.demonstrateMitozFeature();
  }

  private demonstrateFactoryPattern(): void {
    console.log("FACTORY PATTERN - Creating Bacteria using Factory");
    console.log("-".repeat(60));

    // Create different types of bacteria using the factory
    const eColi = BacteriaFactory.createEColi("1");
    const streptococcus = BacteriaFactory.createStreptococcus("2");
    const lactobacillus = BacteriaFactory.createLactobacillus("3");
    const staphylococcus = BacteriaFactory.createStaphylococcus("4");
    const bacillus = BacteriaFactory.createBacillus("5");
    const salmonella = BacteriaFactory.createSalmonella("6");

    // Add them to the service
    this.bacteriaService.createBacteria(eColi);
    this.bacteriaService.createBacteria(streptococcus);
    this.bacteriaService.createBacteria(lactobacillus);
    this.bacteriaService.createBacteria(staphylococcus);
    this.bacteriaService.createBacteria(bacillus);
    this.bacteriaService.createBacteria(salmonella);

    console.log("Created bacteria using factory methods:");
    this.displayBacteriaList(this.bacteriaService.getAllBacteria());
    console.log("\n");
  }

  private demonstrateSingletonPattern(): void {
    console.log("SINGLETON PATTERN - Verifying Single Instance");
    console.log("-".repeat(60));

    // Try to get multiple instances
    const service1 = BacteriaService.getInstance(this.bacteriaRepository);
    const service2 = BacteriaService.getInstance(this.bacteriaRepository);
    const service3 = BacteriaService.getInstance(this.bacteriaRepository);

    console.log("Created three service instances:");
    console.log(`Service 1 address:`, service1);
    console.log(`Service 2 address:`, service2);
    console.log(`Service 3 address:`, service3);
    console.log(`Are they the same instance? ${service1 === service2 && service2 === service3}`);
    console.log(`Total bacteria count (from any instance): ${service1.getAllBacteria().length}`);
    console.log("\n");
  }

  private demonstrateCRUDOperations(): void {
    console.log("CRUD OPERATIONS - Create, Read, Update, Delete");
    console.log("-".repeat(60));

    // CREATE - Create a custom bacteria
    const customBacteria = BacteriaFactory.createBacteria(
      "7",
      "Custom Bacteria",
      "A custom bacterium created for testing purposes"
    );
    this.bacteriaService.createBacteria(customBacteria);
    console.log("Created custom bacteria:");
    console.log(`   ID: ${customBacteria.getId()}`);
    console.log(`   Name: ${customBacteria.getName()}`);
    console.log(`   Description: ${customBacteria.getDescription()}`);

    // READ - Get bacteria by ID
    const foundBacteria = this.bacteriaService.getBacteriaById("1");
    console.log("\n Read bacteria by ID (ID: 1):");
    if (foundBacteria) {
      console.log(`   ${foundBacteria.getName()} - ${foundBacteria.getDescription()}`);
    }

    // READ - Get all bacteria
    console.log("\n All bacteria in repository:");
    console.log(`   Total count: ${this.bacteriaService.getAllBacteria().length}`);

    // UPDATE - Update a bacteria
    const updatedBacteria = BacteriaFactory.createBacteria(
      "7",
      "Updated Custom Bacteria",
      "This bacteria has been updated with new information"
    );
    this.bacteriaService.updateBacteria(updatedBacteria);
    console.log("\n Updated bacteria (ID: 7):");
    const updated = this.bacteriaService.getBacteriaById("7");
    if (updated) {
      console.log(`   ${updated.getName()} - ${updated.getDescription()}`);
    }

    // DELETE - Delete a bacteria
    this.bacteriaService.deleteBacteria("6");
    console.log("\n Deleted bacteria (ID: 6 - Salmonella)");
    console.log(`   Remaining bacteria count: ${this.bacteriaService.getAllBacteria().length}`);
    console.log("\n");
  }

  private demonstratePrototypePattern(): void {
    console.log(" PROTOTYPE PATTERN - Cloning Bacteria");
    console.log("-".repeat(60));

    const originalBacteria = this.bacteriaService.getBacteriaById("1");
    if (originalBacteria) {
      console.log("Original bacteria:");
      console.log(`   ID: ${originalBacteria.getId()}`);
      console.log(`   Name: ${originalBacteria.getName()}`);
      console.log(`   Description: ${originalBacteria.getDescription()}`);

      // Clone the bacteria
      const clonedBacteria = originalBacteria.clone() as Bacteria;
      console.log("\nCloned bacteria:");
      console.log(`   ID: ${clonedBacteria.getId()}`);
      console.log(`   Name: ${clonedBacteria.getName()}`);
      console.log(`   Description: ${clonedBacteria.getDescription()}`);

      console.log(`\nAre they the same object? ${originalBacteria === clonedBacteria}`);
      console.log(`Do they have the same ID? ${originalBacteria.getId() === clonedBacteria.getId()}`);
      console.log(`Do they have the same name? ${originalBacteria.getName() === clonedBacteria.getName()}`);

      // Create a new bacteria with a different ID from the clone
      const clonedWithNewId = BacteriaFactory.createBacteria(
        "8",
        clonedBacteria.getName(),
        clonedBacteria.getDescription()
      );
      this.bacteriaService.createBacteria(clonedWithNewId);
      console.log("\n Added cloned bacteria with new ID (ID: 8)");
    }
    console.log("\n");
  }

  private demonstrateMitozFeature(): void {
    console.log(" MITOZ - Prototype Pattern Implementation");
    console.log("-".repeat(60));

    const originalBacteria = this.bacteriaService.getBacteriaById("1");
    if (originalBacteria) {
      const initialCount = this.bacteriaService.getAllBacteria().length;
      console.log(`Initial bacteria count: ${initialCount}`);

      // Use mitoz (prototype pattern) to clone the bacteria
      this.bacteriaRepository.mitoz(originalBacteria);

      const afterMitozCount = this.bacteriaService.getAllBacteria().length;
      console.log(`After mitoz (prototype pattern cloning): ${afterMitozCount}`);
      console.log(`   Added bacteria: ${originalBacteria.getName()}`);
      console.log(`   Growth: +${afterMitozCount - initialCount} bacteria`);
    }
    console.log("\n");
  }

  private displayBacteriaList(bacteriaList: Bacteria[]): void {
    if (bacteriaList.length === 0) {
      console.log("   No bacteria found.");
      return;
    }

    bacteriaList.forEach((bacteria, index) => {
      console.log(`   ${index + 1}. [${bacteria.getId()}] ${bacteria.getName()}`);
      console.log(`      ${bacteria.getDescription()}`);
    });
  }

  displayFinalSummary(): void {
    console.log("=".repeat(60));
    console.log("FINAL SUMMARY");
    console.log("=".repeat(60));
    const allBacteria = this.bacteriaService.getAllBacteria();
    console.log(`Total bacteria in repository: ${allBacteria.length}`);
    console.log("\nAll bacteria:");
    this.displayBacteriaList(allBacteria);
    console.log("\n" + "=".repeat(60));
  }
}

// Run the demonstration
const app = new BacteriaApp();
app.demonstratePatterns();
app.displayFinalSummary();

