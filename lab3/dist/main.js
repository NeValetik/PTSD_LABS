"use strict";
/*
Stellar Events Observer App (TypeScript)
Patterns: Observer, Mediator, Strategy

How it works (short):
- StellarEventSource: produces stellar events (subject)
- EventMediator: acts as mediator between source and subscribers
- Observers register with mediator along with a Strategy (EventFilterStrategy)
- Strategies decide which events each observer cares about

Run:
- Install: npm init -y
- Install ts-node (optional): npm i -D ts-node typescript @types/node
- Run with ts-node: npx ts-node stellar-observer.ts
- Or compile: npx tsc stellar-observer.ts && node stellar-observer.js
*/
// -------------------- Types & Models --------------------
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
// Compose strategies — e.g., require both conditions to be true
class AndStrategy {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
    shouldSend(event) { return this.a.shouldSend(event) && this.b.shouldSend(event); }
    name() { return `And(${this.a.name()},${this.b.name()})`; }
}
// A simple console-logger observer
class ConsoleLogger {
    constructor(id) {
        this.id = id;
    }
    notify(event) {
        console.log(`[Logger:${this.id}] Received event ${event.id} — type=${event.type}, mag=${event.magnitude}, desc=${event.description ?? 'n/a'} at ${event.timestamp.toISOString()}`);
    }
}
// An analytics observer that aggregates stats
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
// A notification observer that "alerts" (simulated)
class NotifierObserver {
    constructor(id, channel) {
        this.id = id;
        this.channel = channel;
    }
    notify(event) {
        console.log(`[Notifier:${this.id}] Sending ${this.channel} alert: ${event.type} observed (mag=${event.magnitude}) — ${event.description ?? ''}`);
    }
}
// -------------------- Mediator Pattern --------------------
// Mediator coordinates subscriptions and dispatch
class EventMediator {
    constructor() {
        // subscriber id -> {observer, strategy}
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
    // Called by subject when an event is available
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
    // simulate emitting
    emit(event) {
        // In a real app we'd have network, database etc. Here we simply pass to mediator
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
// Create mediator
const mediator = new EventMediator();
// Create source
const source = new StellarEventSource(mediator);
// Create observers
const logger = new ConsoleLogger('logger-1');
const analytics = new AnalyticsObserver('analytics-1');
const notifier = new NotifierObserver('notifier-1', 'email');
// Subscribe with different strategies
mediator.subscribe(logger, new AllEventsStrategy());
mediator.subscribe(analytics, new MagnitudeThresholdStrategy(3.0));
mediator.subscribe(notifier, new AndStrategy(new CometOnlyStrategy(), new MagnitudeThresholdStrategy(5.0)));
// Start simulation
console.log('\n--- Starting stellar events simulation (10 events, 800ms interval) ---');
source.startSimulation(800, 10);
// For demonstration purposes, after 3 seconds add a new observer that only wants comets
setTimeout(() => {
    const cometWatch = new ConsoleLogger('comet-watch');
    mediator.subscribe(cometWatch, new CometOnlyStrategy());
    console.log('[Demo] comet-watch subscribed');
}, 3000);
// After 6 seconds unsubscribe the general logger
setTimeout(() => {
    mediator.unsubscribe(logger.id);
    console.log('[Demo] logger unsubscribed');
}, 6000);
// Keep process alive for long enough to finish simulation when run by tsc/node
setTimeout(() => {
    console.log('\n--- Simulation complete. Final analytics counts:');
    console.log(analytics.counts);
}, 10000);
//# sourceMappingURL=main.js.map