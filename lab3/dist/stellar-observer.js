"use strict";
var StellarEventType;
(function (StellarEventType) {
    StellarEventType["Comet"] = "Comet";
    StellarEventType["MeteorShower"] = "MeteorShower";
    StellarEventType["Supernova"] = "Supernova";
    StellarEventType["Asteroid"] = "Asteroid";
})(StellarEventType || (StellarEventType = {}));
class AllEventsStrategy {
    shouldSend(_) { return true; }
    name() { return 'AllEvents'; }
}
class CometOnlyStrategy {
    shouldSend(event) { return event.type === StellarEventType.Comet; }
    name() { return 'CometOnly'; }
}
class MagnitudeThresholdStrategy {
    constructor(threshold) {
        this.threshold = threshold;
    }
    shouldSend(event) { return event.magnitude <= this.threshold; }
    name() { return `Magnitude<=${this.threshold}`; }
}
class AndStrategy {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
    shouldSend(event) { return this.a.shouldSend(event) && this.b.shouldSend(event); }
    name() { return `And(${this.a.name()},${this.b.name()})`; }
}
class ConsoleLogger {
    constructor(id) {
        this.id = id;
    }
    notify(event) {
        console.log(`[Logger:${this.id}] Received event ${event.id} — type=${event.type}, mag=${event.magnitude}, desc=${event.description ?? 'n/a'} at ${event.timestamp.toISOString()}`);
    }
}
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
class NotifierObserver {
    constructor(id, channel) {
        this.id = id;
        this.channel = channel;
    }
    notify(event) {
        console.log(`[Notifier:${this.id}] Sending ${this.channel} alert: ${event.type} observed (mag=${event.magnitude}) — ${event.description ?? ''}`);
    }
}
class EventMediator {
    constructor() {
        this.subscribers = new Map();
    }
    subscribe(observer, strategy) {
        this.subscribers.set(observer.id, { observer, strategy });
        console.log(`[Mediator] Subscriber added: ${observer.id} using strategy ${strategy.name()}`);
    }
    unsubscribe(observerId) {
        if (this.subscribers.delete(observerId)) {
            console.log(`[Mediator] Unsubscribed: ${observerId}`);
        }
    }
    publish(event) {
        console.log(`\n[Mediator] Publishing event ${event.id} type=${event.type} mag=${event.magnitude} at ${event.timestamp.toISOString()}`);
        for (const { observer, strategy } of this.subscribers.values()) {
            try {
                if (strategy.shouldSend(event))
                    observer.notify(event);
            }
            catch (err) {
                console.error(`[Mediator] Error notifying ${observer.id}:`, err);
            }
        }
    }
}
// -------------------- Subject (Event Source) --------------------
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
            const e = randomEvent();
            this.emit(e);
        }, intervalMs);
    }
}
// -------------------- Utilities --------------------
function uid(prefix = '') {
    return prefix + Math.random().toString(36).slice(2, 9);
}
function randomEvent() {
    const types = Object.values(StellarEventType);
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
// -------------------- Example Composition --------------------
const mediator = new EventMediator();
const source = new StellarEventSource(mediator);
const logger = new ConsoleLogger('logger-1');
const analytics = new AnalyticsObserver('analytics-1');
const notifier = new NotifierObserver('notifier-1', 'email');
mediator.subscribe(logger, new AllEventsStrategy());
mediator.subscribe(analytics, new MagnitudeThresholdStrategy(3.0));
mediator.subscribe(notifier, new AndStrategy(new CometOnlyStrategy(), new MagnitudeThresholdStrategy(5.0)));
console.log('\n--- Starting stellar events simulation (10 events, 800ms interval) ---');
source.startSimulation(800, 10);
setTimeout(() => {
    const cometWatch = new ConsoleLogger('comet-watch');
    mediator.subscribe(cometWatch, new CometOnlyStrategy());
    console.log('[Demo] comet-watch subscribed');
}, 3000);
setTimeout(() => {
    mediator.unsubscribe(logger.id);
    console.log('[Demo] logger unsubscribed');
}, 6000);
setTimeout(() => {
    console.log('\n--- Simulation complete. Final analytics counts:');
    console.log(analytics.counts);
}, 10000);
//# sourceMappingURL=stellar-observer.js.map