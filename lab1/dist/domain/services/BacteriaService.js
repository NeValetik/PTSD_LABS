"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BacteriaService = void 0;
class BacteriaService {
    constructor(bacteriaRepository) {
        this.bacteriaRepository = bacteriaRepository;
    }
    static getInstance(bacteriaRepository) {
        if (BacteriaService.instance === null) {
            BacteriaService.instance = new BacteriaService(bacteriaRepository);
        }
        return BacteriaService.instance;
    }
    getAllBacteria() {
        return this.bacteriaRepository.getAll();
    }
    getBacteriaById(id) {
        return this.bacteriaRepository.getById(id);
    }
    createBacteria(bacteria) {
        this.bacteriaRepository.add(bacteria);
    }
    updateBacteria(bacteria) {
        this.bacteriaRepository.update(bacteria);
    }
    deleteBacteria(id) {
        this.bacteriaRepository.delete(id);
    }
}
exports.BacteriaService = BacteriaService;
BacteriaService.instance = null;
