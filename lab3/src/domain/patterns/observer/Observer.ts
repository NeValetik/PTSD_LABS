import { StellarEvent, StellarEventType } from '../../models/StellarEvent';

export interface Observer {
  id: string;
  notify(event: StellarEvent): void;
}

export class ConsoleLogger implements Observer {
  constructor(public id: string) {}
  notify(event: StellarEvent) {
    console.log(`[Logger:${this.id}] Received event ${event.id} — type=${event.type}, mag=${event.magnitude}, desc=${event.description ?? 'n/a'} at ${event.timestamp.toISOString()}`);
  }
}

export class AnalyticsObserver implements Observer {
  public counts = new Map<StellarEventType, number>();
  constructor(public id: string) {}
  notify(event: StellarEvent) {
    const prev = this.counts.get(event.type) ?? 0;
    this.counts.set(event.type, prev + 1);
    console.log(`[Analytics:${this.id}] Count for ${event.type} => ${this.counts.get(event.type)}`);
  }
}

export class NotifierObserver implements Observer {
  constructor(public id: string, private channel: string) {}
  notify(event: StellarEvent) {
    console.log(`[Notifier:${this.id}] Sending ${this.channel} alert: ${event.type} observed (mag=${event.magnitude}) — ${event.description ?? ''}`);
  }
}

