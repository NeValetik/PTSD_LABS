import { Bacteria, BacteriaProduct, EColiBacteria, StreptococcusBacteria, LactobacillusBacteria, StaphylococcusBacteria, BacillusBacteria, SalmonellaBacteria } from "../models/Bacteria";

abstract class BacteriaCreator {
  public abstract factoryMethod(id: string): BacteriaProduct;

  public someOperation(id: string): string {
    const product = this.factoryMethod(id);
    return `Creator: The same creator's code has just worked with ${product.operation()}`;
  }
}

class EColiCreator extends BacteriaCreator {
  public factoryMethod(id: string): BacteriaProduct {
    return new EColiBacteria(id);
  }
}

class StreptococcusCreator extends BacteriaCreator {
  public factoryMethod(id: string): BacteriaProduct {
    return new StreptococcusBacteria(id);
  }
}

class LactobacillusCreator extends BacteriaCreator {
  public factoryMethod(id: string): BacteriaProduct {
    return new LactobacillusBacteria(id);
  }
}

class StaphylococcusCreator extends BacteriaCreator {
  public factoryMethod(id: string): BacteriaProduct {
    return new StaphylococcusBacteria(id);
  }
}

class BacillusCreator extends BacteriaCreator {
  public factoryMethod(id: string): BacteriaProduct {
    return new BacillusBacteria(id);
  }
}

class SalmonellaCreator extends BacteriaCreator {
  public factoryMethod(id: string): BacteriaProduct {
    return new SalmonellaBacteria(id);
  }
}

export class BacteriaFactory {
  private static eColiCreator = new EColiCreator();
  private static streptococcusCreator = new StreptococcusCreator();
  private static lactobacillusCreator = new LactobacillusCreator();
  private static staphylococcusCreator = new StaphylococcusCreator();
  private static bacillusCreator = new BacillusCreator();
  private static salmonellaCreator = new SalmonellaCreator();

  static createEColi(id: string): Bacteria {
    return this.eColiCreator.factoryMethod(id) as Bacteria;
  }

  static createStreptococcus(id: string): Bacteria {
    return this.streptococcusCreator.factoryMethod(id) as Bacteria;
  }

  static createLactobacillus(id: string): Bacteria {
    return this.lactobacillusCreator.factoryMethod(id) as Bacteria;
  }

  static createStaphylococcus(id: string): Bacteria {
    return this.staphylococcusCreator.factoryMethod(id) as Bacteria;
  }

  static createBacillus(id: string): Bacteria {
    return this.bacillusCreator.factoryMethod(id) as Bacteria;
  }

  static createSalmonella(id: string): Bacteria {
    return this.salmonellaCreator.factoryMethod(id) as Bacteria;
  }

  static createBacteria(id: string, name: string, description: string): Bacteria {
    return new Bacteria({ id, name, description });
  }
}

/**
 * Экспортируем создателей для использования в клиентском коде
 */
export { BacteriaCreator, EColiCreator, StreptococcusCreator, LactobacillusCreator, StaphylococcusCreator, BacillusCreator, SalmonellaCreator };