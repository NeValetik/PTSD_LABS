interface Prototype {
  clone(): Prototype;
}

interface BacteriaProduct {
  operation(): string;
  getId(): string;
  getName(): string;
  getDescription(): string;
}

type BacteriaConstructor = {
  id: string;
  name: string;
  description: string;
} | {
  instance: Bacteria;
};

class Bacteria implements Prototype, BacteriaProduct {
  protected id: string;
  protected name: string;
  protected description: string;

  constructor(args: BacteriaConstructor) {
    if ('instance' in args) {
      this.id = args.instance.id;
      this.name = args.instance.name;
      this.description = args.instance.description;
    } else {
      const { id, name, description } = args;
      this.id = id;
      this.name = name;
      this.description = description;
    }
  }

  clone(): Prototype {
    return new Bacteria({instance: this});
  }

  operation(): string {
    return `{Result of the Bacteria: ${this.name} - ${this.description}}`;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }
}

class EColiBacteria extends Bacteria {
  constructor(id: string) {
    super({
      id,
      name: "E. coli",
      description: "Escherichia coli - Gram-negative, rod-shaped bacterium commonly found in intestines"
    });
  }

  public operation(): string {
    return `{Result of the EColiBacteria: ${this.name} - ${this.description}}`;
  }

  clone(): Prototype {
    return new EColiBacteria(this.id);
  }
}

class StreptococcusBacteria extends Bacteria {
  constructor(id: string) {
    super({
      id,
      name: "Streptococcus",
      description: "Gram-positive, spherical bacterium that can cause various infections"
    });
  }

  public operation(): string {
    return `{Result of the StreptococcusBacteria: ${this.name} - ${this.description}}`;
  }

  clone(): Prototype {
    return new StreptococcusBacteria(this.id);
  }
}

class LactobacillusBacteria extends Bacteria {
  constructor(id: string) {
    super({
      id,
      name: "Lactobacillus",
      description: "Gram-positive, rod-shaped bacterium beneficial for digestive health"
    });
  }

  public operation(): string {
    return `{Result of the LactobacillusBacteria: ${this.name} - ${this.description}}`;
  }

  clone(): Prototype {
    return new LactobacillusBacteria(this.id);
  }
}

class StaphylococcusBacteria extends Bacteria {
  constructor(id: string) {
    super({
      id,
      name: "Staphylococcus",
      description: "Gram-positive, spherical bacterium that can cause skin infections"
    });
  }

  public operation(): string {
    return `{Result of the StaphylococcusBacteria: ${this.name} - ${this.description}}`;
  }

  clone(): Prototype {
    return new StaphylococcusBacteria(this.id);
  }
}

class BacillusBacteria extends Bacteria {
  constructor(id: string) {
    super({
      id,
      name: "Bacillus",
      description: "Gram-positive, rod-shaped bacterium that forms spores"
    });
  }

  public operation(): string {
    return `{Result of the BacillusBacteria: ${this.name} - ${this.description}}`;
  }

  clone(): Prototype {
    return new BacillusBacteria(this.id);
  }
}

class SalmonellaBacteria extends Bacteria {
  constructor(id: string) {
    super({
      id,
      name: "Salmonella",
      description: "Gram-negative, rod-shaped bacterium that can cause food poisoning"
    });
  }

  public operation(): string {
    return `{Result of the SalmonellaBacteria: ${this.name} - ${this.description}}`;
  }

  clone(): Prototype {
    return new SalmonellaBacteria(this.id);
  }
}

export { Bacteria, Prototype, BacteriaProduct, EColiBacteria, StreptococcusBacteria, LactobacillusBacteria, StaphylococcusBacteria, BacillusBacteria, SalmonellaBacteria };