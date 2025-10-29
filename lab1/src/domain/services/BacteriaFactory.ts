import { Bacteria } from "../models/Bacteria";

export class BacteriaFactory {
  static createEColi(id: string): Bacteria {
    return new Bacteria({
      id,
      name: "E. coli",
      description: "Escherichia coli - Gram-negative, rod-shaped bacterium commonly found in intestines"
    });
  }

  static createStreptococcus(id: string): Bacteria {
    return new Bacteria({
      id,
      name: "Streptococcus",
      description: "Gram-positive, spherical bacterium that can cause various infections"
    });
  }

  static createLactobacillus(id: string): Bacteria {
    return new Bacteria({
      id,
      name: "Lactobacillus",
      description: "Gram-positive, rod-shaped bacterium beneficial for digestive health"
    });
  }

  static createStaphylococcus(id: string): Bacteria {
    return new Bacteria({
      id,
      name: "Staphylococcus",
      description: "Gram-positive, spherical bacterium that can cause skin infections"
    });
  }

  static createBacillus(id: string): Bacteria {
    return new Bacteria({
      id,
      name: "Bacillus",
      description: "Gram-positive, rod-shaped bacterium that forms spores"
    });
  }

  static createSalmonella(id: string): Bacteria {
    return new Bacteria({
      id,
      name: "Salmonella",
      description: "Gram-negative, rod-shaped bacterium that can cause food poisoning"
    });
  }

  static createBacteria(id: string, name: string, description: string): Bacteria {
    return new Bacteria({ id, name, description });
  }
}