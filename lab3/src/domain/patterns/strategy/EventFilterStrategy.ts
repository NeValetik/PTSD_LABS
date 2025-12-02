import { StellarEvent, StellarEventType } from '../../models/StellarEvent';

export interface EventFilterStrategy {
  shouldSend(event: StellarEvent): boolean;
  name(): string;
}

export class AllEventsStrategy implements EventFilterStrategy {
  shouldSend(_: StellarEvent) { return true; }
  name() { return 'AllEvents'; }
}

export class CometOnlyStrategy implements EventFilterStrategy {
  shouldSend(event: StellarEvent) { return event.type === StellarEventType.Comet; }
  name() { return 'CometOnly'; }
}

export class MagnitudeThresholdStrategy implements EventFilterStrategy {
  constructor(private threshold: number) {}
  shouldSend(event: StellarEvent) { return event.magnitude <= this.threshold; }
  name() { return `Magnitude<=${this.threshold}`; }
}

export class AndStrategy implements EventFilterStrategy {
  constructor(private a: EventFilterStrategy, private b: EventFilterStrategy) {}
  shouldSend(event: StellarEvent) { return this.a.shouldSend(event) && this.b.shouldSend(event); }
  name() { return `And(${this.a.name()},${this.b.name()})`; }
}

