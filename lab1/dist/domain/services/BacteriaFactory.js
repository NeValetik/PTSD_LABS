"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BacteriaFactory = void 0;
const Bacteria_1 = require("../models/Bacteria");
class BacteriaFactory {
    static createEColi(id) {
        return new Bacteria_1.Bacteria({
            id,
            name: "E. coli",
            description: "Escherichia coli - Gram-negative, rod-shaped bacterium commonly found in intestines"
        });
    }
    static createStreptococcus(id) {
        return new Bacteria_1.Bacteria({
            id,
            name: "Streptococcus",
            description: "Gram-positive, spherical bacterium that can cause various infections"
        });
    }
    static createLactobacillus(id) {
        return new Bacteria_1.Bacteria({
            id,
            name: "Lactobacillus",
            description: "Gram-positive, rod-shaped bacterium beneficial for digestive health"
        });
    }
    static createStaphylococcus(id) {
        return new Bacteria_1.Bacteria({
            id,
            name: "Staphylococcus",
            description: "Gram-positive, spherical bacterium that can cause skin infections"
        });
    }
    static createBacillus(id) {
        return new Bacteria_1.Bacteria({
            id,
            name: "Bacillus",
            description: "Gram-positive, rod-shaped bacterium that forms spores"
        });
    }
    static createSalmonella(id) {
        return new Bacteria_1.Bacteria({
            id,
            name: "Salmonella",
            description: "Gram-negative, rod-shaped bacterium that can cause food poisoning"
        });
    }
    static createBacteria(id, name, description) {
        return new Bacteria_1.Bacteria({ id, name, description });
    }
}
exports.BacteriaFactory = BacteriaFactory;
