import { EventMediator } from '../patterns/mediator/EventMediator';
import { StellarEvent } from '../models/StellarEvent';
import { randomEvent } from '../../utilities/helpers';

export class StellarEventSource {
  constructor(private mediator: EventMediator) {}

  emit(event: StellarEvent) {
    this.mediator.publish(event);
  }

  // Helper to simulate random events
  startSimulation(intervalMs = 1000, total = 10) {
    let count = 0;
    const t = setInterval(() => {
      if (count++ >= total) { clearInterval(t); return; }
      const e = randomEvent();
      this.emit(e);
    }, intervalMs);
  }
}

