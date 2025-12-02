import { EventMediator } from './domain/patterns/mediator/EventMediator';
import { StellarEventSource } from './domain/services/StellarEventSource';
import { ConsoleLogger, AnalyticsObserver, NotifierObserver } from './domain/patterns/observer/Observer';
import { AllEventsStrategy, MagnitudeThresholdStrategy, CometOnlyStrategy, AndStrategy } from './domain/patterns/strategy/EventFilterStrategy';

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

