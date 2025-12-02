"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StellarEventSource = void 0;
const helpers_1 = require("../../utilities/helpers");
class StellarEventSource {
    constructor(mediator) {
        this.mediator = mediator;
    }
    emit(event) {
        this.mediator.publish(event);
    }
    // Helper to simulate random events
    startSimulation(intervalMs = 1000, total = 10) {
        let count = 0;
        const t = setInterval(() => {
            if (count++ >= total) {
                clearInterval(t);
                return;
            }
            const e = (0, helpers_1.randomEvent)();
            this.emit(e);
        }, intervalMs);
    }
}
exports.StellarEventSource = StellarEventSource;
//# sourceMappingURL=StellarEventSource.js.map