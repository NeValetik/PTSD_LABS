import { Observer } from '../observer/Observer';
import { EventFilterStrategy } from '../strategy/EventFilterStrategy';
import { StellarEvent } from '../../models/StellarEvent';

export class EventMediator {
  private subscribers = new Map<string, { observer: Observer; strategy: EventFilterStrategy }>();

  subscribe(observer: Observer, strategy: EventFilterStrategy) {
    this.subscribers.set(observer.id, { observer, strategy });
    console.log(`[Mediator] Subscriber added: ${observer.id} using strategy ${strategy.name()}`);
  }

  unsubscribe(observerId: string) {
    if (this.subscribers.delete(observerId)) {
      console.log(`[Mediator] Unsubscribed: ${observerId}`);
    }
  }

  publish(event: StellarEvent) {
    console.log(`\n[Mediator] Publishing event ${event.id} type=${event.type} mag=${event.magnitude} at ${event.timestamp.toISOString()}`);
    for (const { observer, strategy } of this.subscribers.values()) {
      try {
        if (strategy.shouldSend(event)) observer.notify(event);
      } catch (err) {
        console.error(`[Mediator] Error notifying ${observer.id}:`, err);
      }
    }
  }
}

