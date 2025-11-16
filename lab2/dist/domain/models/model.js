"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIModel = void 0;
class APIModel {
    constructor(link) {
        this.link = link;
        this.link = link;
    }
    async method() {
        const response = await fetch(this.link);
        return response.json();
    }
}
exports.APIModel = APIModel;
