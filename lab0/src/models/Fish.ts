// Single Responsibility Principle: Each class has one reason to change
// This interface defines the contract for all fish types
export interface IFish {
  id: string;
  name: string;
  species: string;
  habitat: string;
  size: number; 
  diet: string;
  getInfo(): string;
  getHabitatInfo(): string;
}

export abstract class Fish implements IFish {
  constructor(
    public id: string,
    public name: string,
    public species: string,
    public habitat: string,
    public size: number,
    public diet: string
  ) {}

  getInfo(): string {
    return `${this.name} (${this.species}) - Size: ${this.size}cm, Diet: ${this.diet}`;
  }

  getHabitatInfo(): string {
    return `Lives in: ${this.habitat}`;
  }
}

export class TropicalFish extends Fish {
  constructor(id: string, name: string, species: string, size: number, diet: string) {
    super(id, name, species, "Tropical Reef", size, diet);
  }

  getInfo(): string {
    return `🐠 ${super.getInfo()} - Tropical species`;
  }
}

export class DeepSeaFish extends Fish {
  constructor(id: string, name: string, species: string, size: number, diet: string) {
    super(id, name, species, "Deep Ocean", size, diet);
  }

  getInfo(): string {
    return `🦈 ${super.getInfo()} - Deep sea species`;
  }
}

export class FreshwaterFish extends Fish {
  constructor(id: string, name: string, species: string, size: number, diet: string) {
    super(id, name, species, "Freshwater", size, diet);
  }

  getInfo(): string {
    return `🐟 ${super.getInfo()} - Freshwater species`;
  }
}
