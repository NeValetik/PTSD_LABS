"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalmonellaBacteria = exports.BacillusBacteria = exports.StaphylococcusBacteria = exports.LactobacillusBacteria = exports.StreptococcusBacteria = exports.EColiBacteria = exports.Bacteria = void 0;
class Bacteria {
    constructor({ id, name, description, instance }) {
        if (instance) {
            this.id = instance.id;
            this.name = instance.name;
            this.description = instance.description;
            return;
        }
        if (!id || !name || !description) {
            throw new Error("id, name, and description are required");
        }
        this.id = id;
        this.name = name;
        this.description = description;
    }
    clone() {
        return new Bacteria({ instance: this });
    }
    operation() {
        return `{Result of the Bacteria: ${this.name} - ${this.description}}`;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
    }
}
exports.Bacteria = Bacteria;
class EColiBacteria extends Bacteria {
    constructor(id) {
        super({
            id,
            name: "E. coli",
            description: "Escherichia coli - Gram-negative, rod-shaped bacterium commonly found in intestines"
        });
    }
    operation() {
        return `{Result of the EColiBacteria: ${this.name} - ${this.description}}`;
    }
    clone() {
        return new EColiBacteria(this.id);
    }
}
exports.EColiBacteria = EColiBacteria;
class StreptococcusBacteria extends Bacteria {
    constructor(id) {
        super({
            id,
            name: "Streptococcus",
            description: "Gram-positive, spherical bacterium that can cause various infections"
        });
    }
    operation() {
        return `{Result of the StreptococcusBacteria: ${this.name} - ${this.description}}`;
    }
    clone() {
        return new StreptococcusBacteria(this.id);
    }
}
exports.StreptococcusBacteria = StreptococcusBacteria;
class LactobacillusBacteria extends Bacteria {
    constructor(id) {
        super({
            id,
            name: "Lactobacillus",
            description: "Gram-positive, rod-shaped bacterium beneficial for digestive health"
        });
    }
    operation() {
        return `{Result of the LactobacillusBacteria: ${this.name} - ${this.description}}`;
    }
    clone() {
        return new LactobacillusBacteria(this.id);
    }
}
exports.LactobacillusBacteria = LactobacillusBacteria;
class StaphylococcusBacteria extends Bacteria {
    constructor(id) {
        super({
            id,
            name: "Staphylococcus",
            description: "Gram-positive, spherical bacterium that can cause skin infections"
        });
    }
    operation() {
        return `{Result of the StaphylococcusBacteria: ${this.name} - ${this.description}}`;
    }
    clone() {
        return new StaphylococcusBacteria(this.id);
    }
}
exports.StaphylococcusBacteria = StaphylococcusBacteria;
class BacillusBacteria extends Bacteria {
    constructor(id) {
        super({
            id,
            name: "Bacillus",
            description: "Gram-positive, rod-shaped bacterium that forms spores"
        });
    }
    operation() {
        return `{Result of the BacillusBacteria: ${this.name} - ${this.description}}`;
    }
    clone() {
        return new BacillusBacteria(this.id);
    }
}
exports.BacillusBacteria = BacillusBacteria;
class SalmonellaBacteria extends Bacteria {
    constructor(id) {
        super({
            id,
            name: "Salmonella",
            description: "Gram-negative, rod-shaped bacterium that can cause food poisoning"
        });
    }
    operation() {
        return `{Result of the SalmonellaBacteria: ${this.name} - ${this.description}}`;
    }
    clone() {
        return new SalmonellaBacteria(this.id);
    }
}
exports.SalmonellaBacteria = SalmonellaBacteria;
