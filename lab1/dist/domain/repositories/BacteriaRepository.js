"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BacteriaRepository = void 0;
class BacteriaRepository {
    constructor() {
        this.bacteriaList = [];
    }
    getAll() {
        return this.bacteriaList;
    }
    getById(id) {
        return this.bacteriaList.find(bacteria => bacteria.getId() === id);
    }
    add(bacteria) {
        this.bacteriaList.push(bacteria);
    }
    update(bacteria) {
        const index = this.bacteriaList.findIndex(bacteriaFromList => bacteriaFromList.getId() === bacteria.getId());
        if (index !== -1) {
            this.bacteriaList[index] = bacteria;
        }
    }
    // mitoz implements the Prototype Pattern - clones bacteria using their clone() method
    mitoz(bacteria) {
        this.bacteriaList.push(bacteria.clone());
    }
    delete(id) {
        this.bacteriaList = this.bacteriaList.filter(bacteria => bacteria.getId() !== id);
    }
}
exports.BacteriaRepository = BacteriaRepository;
