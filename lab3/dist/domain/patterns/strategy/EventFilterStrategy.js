"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AndStrategy = exports.MagnitudeThresholdStrategy = exports.CometOnlyStrategy = exports.AllEventsStrategy = void 0;
const StellarEvent_1 = require("../../models/StellarEvent");
class AllEventsStrategy {
    shouldSend(_) { return true; }
    name() { return 'AllEvents'; }
}
exports.AllEventsStrategy = AllEventsStrategy;
class CometOnlyStrategy {
    shouldSend(event) { return event.type === StellarEvent_1.StellarEventType.Comet; }
    name() { return 'CometOnly'; }
}
exports.CometOnlyStrategy = CometOnlyStrategy;
class MagnitudeThresholdStrategy {
    constructor(threshold) {
        this.threshold = threshold;
    }
    shouldSend(event) { return event.magnitude <= this.threshold; }
    name() { return `Magnitude<=${this.threshold}`; }
}
exports.MagnitudeThresholdStrategy = MagnitudeThresholdStrategy;
class AndStrategy {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
    shouldSend(event) { return this.a.shouldSend(event) && this.b.shouldSend(event); }
    name() { return `And(${this.a.name()},${this.b.name()})`; }
}
exports.AndStrategy = AndStrategy;
//# sourceMappingURL=EventFilterStrategy.js.map