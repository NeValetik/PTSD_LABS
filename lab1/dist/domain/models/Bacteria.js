"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bacteria = void 0;
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
