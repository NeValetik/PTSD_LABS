"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventMediator_1 = require("./domain/patterns/mediator/EventMediator");
const StellarEventSource_1 = require("./domain/services/StellarEventSource");
const Observer_1 = require("./domain/patterns/observer/Observer");
const EventFilterStrategy_1 = require("./domain/patterns/strategy/EventFilterStrategy");
// -------------------- Example Composition --------------------
const mediator = new EventMediator_1.EventMediator();
const source = new StellarEventSource_1.StellarEventSource(mediator);
const logger = new Observer_1.ConsoleLogger('logger-1');
const analytics = new Observer_1.AnalyticsObserver('analytics-1');
const notifier = new Observer_1.NotifierObserver('notifier-1', 'email');
mediator.subscribe(logger, new EventFilterStrategy_1.AllEventsStrategy());
mediator.subscribe(analytics, new EventFilterStrategy_1.MagnitudeThresholdStrategy(3.0));
mediator.subscribe(notifier, new EventFilterStrategy_1.AndStrategy(new EventFilterStrategy_1.CometOnlyStrategy(), new EventFilterStrategy_1.MagnitudeThresholdStrategy(5.0)));
console.log('\n--- Starting stellar events simulation (10 events, 800ms interval) ---');
source.startSimulation(800, 10);
setTimeout(() => {
    const cometWatch = new Observer_1.ConsoleLogger('comet-watch');
    mediator.subscribe(cometWatch, new EventFilterStrategy_1.CometOnlyStrategy());
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
//# sourceMappingURL=client.js.map