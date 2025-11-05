"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalmonellaCreator = exports.BacillusCreator = exports.StaphylococcusCreator = exports.LactobacillusCreator = exports.StreptococcusCreator = exports.EColiCreator = exports.BacteriaCreator = exports.BacteriaFactory = void 0;
const Bacteria_1 = require("../models/Bacteria");
class BacteriaCreator {
    someOperation(id) {
        const product = this.factoryMethod(id);
        return `Creator: The same creator's code has just worked with ${product.operation()}`;
    }
}
exports.BacteriaCreator = BacteriaCreator;
class EColiCreator extends BacteriaCreator {
    factoryMethod(id) {
        return new Bacteria_1.EColiBacteria(id);
    }
}
exports.EColiCreator = EColiCreator;
class StreptococcusCreator extends BacteriaCreator {
    factoryMethod(id) {
        return new Bacteria_1.StreptococcusBacteria(id);
    }
}
exports.StreptococcusCreator = StreptococcusCreator;
class LactobacillusCreator extends BacteriaCreator {
    factoryMethod(id) {
        return new Bacteria_1.LactobacillusBacteria(id);
    }
}
exports.LactobacillusCreator = LactobacillusCreator;
class StaphylococcusCreator extends BacteriaCreator {
    factoryMethod(id) {
        return new Bacteria_1.StaphylococcusBacteria(id);
    }
}
exports.StaphylococcusCreator = StaphylococcusCreator;
class BacillusCreator extends BacteriaCreator {
    factoryMethod(id) {
        return new Bacteria_1.BacillusBacteria(id);
    }
}
exports.BacillusCreator = BacillusCreator;
class SalmonellaCreator extends BacteriaCreator {
    factoryMethod(id) {
        return new Bacteria_1.SalmonellaBacteria(id);
    }
}
exports.SalmonellaCreator = SalmonellaCreator;
class BacteriaFactory {
    static createEColi(id) {
        return this.eColiCreator.factoryMethod(id);
    }
    static createStreptococcus(id) {
        return this.streptococcusCreator.factoryMethod(id);
    }
    static createLactobacillus(id) {
        return this.lactobacillusCreator.factoryMethod(id);
    }
    static createStaphylococcus(id) {
        return this.staphylococcusCreator.factoryMethod(id);
    }
    static createBacillus(id) {
        return this.bacillusCreator.factoryMethod(id);
    }
    static createSalmonella(id) {
        return this.salmonellaCreator.factoryMethod(id);
    }
    static createBacteria(id, name, description) {
        return new Bacteria_1.Bacteria({ id, name, description });
    }
}
exports.BacteriaFactory = BacteriaFactory;
BacteriaFactory.eColiCreator = new EColiCreator();
BacteriaFactory.streptococcusCreator = new StreptococcusCreator();
BacteriaFactory.lactobacillusCreator = new LactobacillusCreator();
BacteriaFactory.staphylococcusCreator = new StaphylococcusCreator();
BacteriaFactory.bacillusCreator = new BacillusCreator();
BacteriaFactory.salmonellaCreator = new SalmonellaCreator();
