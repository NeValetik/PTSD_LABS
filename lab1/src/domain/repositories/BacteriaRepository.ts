import { Bacteria } from "../models/Bacteria";

export interface IBacteriaRepository {
  getAll(): Bacteria[];
  getById(id: string): Bacteria | undefined;
  add(bacteria: Bacteria): void;
  update(bacteria: Bacteria): void;
  delete(id: string): void;
}

export class BacteriaRepository implements IBacteriaRepository {
  private bacteriaList: Bacteria[] = [];

  getAll(): Bacteria[] {
    return this.bacteriaList;
  }

  getById(id: string): Bacteria | undefined {
    return this.bacteriaList.find(bacteria => bacteria.getId() === id);
  }
  
  add(bacteria: Bacteria): void {
    this.bacteriaList.push(bacteria);
  }

  update(bacteria: Bacteria): void {
    const index = this.bacteriaList.findIndex(bacteriaFromList => bacteriaFromList.getId() === bacteria.getId());
    if (index !== -1) {
      this.bacteriaList[index] = bacteria;
    }
  }

  // mitoz implements the Prototype Pattern - clones bacteria using their clone() method
  mitoz(bacteria: Bacteria): void {
    this.bacteriaList.push(bacteria.clone() as Bacteria);
  }

  delete(id: string): void {
    this.bacteriaList = this.bacteriaList.filter(bacteria => bacteria.getId() !== id);
  }
}
