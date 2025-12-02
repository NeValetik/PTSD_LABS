"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifierObserver = exports.AnalyticsObserver = exports.ConsoleLogger = void 0;
class ConsoleLogger {
    constructor(id) {
        this.id = id;
    }
    notify(event) {
        console.log(`[Logger:${this.id}] Received event ${event.id} — type=${event.type}, mag=${event.magnitude}, desc=${event.description ?? 'n/a'} at ${event.timestamp.toISOString()}`);
    }
}
exports.ConsoleLogger = ConsoleLogger;
class AnalyticsObserver {
    constructor(id) {
        this.id = id;
        this.counts = new Map();
    }
    notify(event) {
        const prev = this.counts.get(event.type) ?? 0;
        this.counts.set(event.type, prev + 1);
        console.log(`[Analytics:${this.id}] Count for ${event.type} => ${this.counts.get(event.type)}`);
    }
}
exports.AnalyticsObserver = AnalyticsObserver;
class NotifierObserver {
    constructor(id, channel) {
        this.id = id;
        this.channel = channel;
    }
    notify(event) {
        console.log(`[Notifier:${this.id}] Sending ${this.channel} alert: ${event.type} observed (mag=${event.magnitude}) — ${event.description ?? ''}`);
    }
}
exports.NotifierObserver = NotifierObserver;
//# sourceMappingURL=Observer.js.map