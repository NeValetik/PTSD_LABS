"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uid = uid;
exports.randomEvent = randomEvent;
const StellarEvent_1 = require("../domain/models/StellarEvent");
function uid(prefix = '') {
    return prefix + Math.random().toString(36).slice(2, 9);
}
function randomEvent() {
    const types = Object.values(StellarEvent_1.StellarEventType);
    const type = types[Math.floor(Math.random() * types.length)];
    // magnitude 0-10 (lower = brighter / more significant for our purposes)
    const magnitude = parseFloat((Math.random() * 10).toFixed(2));
    return {
        id: uid('evt_'),
        type: type,
        magnitude,
        description: `${type} spotted with magnitude ${magnitude}`,
        timestamp: new Date(),
    };
}
//# sourceMappingURL=helpers.js.map