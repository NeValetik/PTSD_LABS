import { Bacteria } from "../models/Bacteria";
import { IBacteriaRepository } from "../repositories/BacteriaRepository";

export interface IBacteriaService {
  getAllBacteria(): Bacteria[];
  getBacteriaById(id: string): Bacteria | undefined;
  createBacteria(bacteria: Bacteria): void;
  updateBacteria(bacteria: Bacteria): void;
  deleteBacteria(id: string): void;
}

export class BacteriaService implements IBacteriaService {
  private static instance: BacteriaService | null = null;
  private bacteriaRepository: IBacteriaRepository;

  private constructor(bacteriaRepository: IBacteriaRepository) {
    this.bacteriaRepository = bacteriaRepository;
  }

  public static getInstance(bacteriaRepository: IBacteriaRepository): BacteriaService {
    if (BacteriaService.instance === null) {
      BacteriaService.instance = new BacteriaService(bacteriaRepository);
    }
    return BacteriaService.instance;
  }

  getAllBacteria(): Bacteria[] {
    return this.bacteriaRepository.getAll();
  }

  getBacteriaById(id: string): Bacteria | undefined {
    return this.bacteriaRepository.getById(id);
  }

  createBacteria(bacteria: Bacteria): void {
    this.bacteriaRepository.add(bacteria);
  }

  updateBacteria(bacteria: Bacteria): void {
    this.bacteriaRepository.update(bacteria);
  }

  deleteBacteria(id: string): void {
    this.bacteriaRepository.delete(id);
  }
}

