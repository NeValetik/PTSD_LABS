# Behavioral Design Patterns

## Author: Vitcovschii Vladimir
## Group: FAF-231

---

## Objectives:

1. **Study and understand the Behavioral Design Patterns.**

2. **As a continuation of the previous laboratory work, think about what communication between software entities might be involved in your system.**

3. **Implement some additional functionalities using behavioral design patterns.**

---

## Theoretical Background:

In software engineering, behavioral design patterns have the purpose of identifying common communication patterns between different software entities. By doing so, these patterns increase flexibility in carrying out this communication.

Some examples from this category of design patterns are:
- **Chain of Responsibility** - Passes requests along a chain of handlers
- **Command** - Encapsulates a request as an object
- **Interpreter** - Implements a specialized language
- **Iterator** - Provides a way to access elements sequentially
- **Mediator** - Defines how objects interact with each other
- **Observer** - Notifies multiple objects about state changes
- **Strategy** - Defines a family of algorithms and makes them interchangeable

---

## Domain Selection:

For this laboratory work, I have chosen the **Stellar Event Observation System** domain. This domain is well-suited for demonstrating behavioral design patterns because:

- **Stellar events** (comets, meteor showers, supernovae, asteroids) occur independently and need to be observed by multiple systems
- **Different observers** (loggers, analytics systems, notification services) need to be notified about events
- **Event filtering** strategies vary based on observer requirements (all events, specific types, magnitude thresholds)
- **Decoupled communication** is essential - event sources shouldn't know about all observers directly
- **Dynamic subscription/unsubscription** allows observers to join or leave the system at runtime

---

## Used Design Patterns:

1. **Observer Pattern** - Implemented through the `Observer` interface and concrete observer classes (`ConsoleLogger`, `AnalyticsObserver`, `NotifierObserver`) that get notified when stellar events occur.

2. **Mediator Pattern** - Implemented in the `EventMediator` class, which manages communication between the `StellarEventSource` and all observers, decoupling them from direct dependencies.

3. **Strategy Pattern** - Implemented through the `EventFilterStrategy` interface and multiple concrete strategies (`AllEventsStrategy`, `CometOnlyStrategy`, `MagnitudeThresholdStrategy`, `AndStrategy`) that determine which events should be sent to which observers.

---

## Implementation:

### 1. Observer Pattern Implementation

**Location:** `src/domain/patterns/observer/Observer.ts`

The Observer Pattern is implemented to allow multiple observers to be notified when stellar events occur. This pattern enables loose coupling between the event source and its observers, allowing new observers to be added without modifying the event source.

**Key Features:**
- `Observer` interface defines the contract for all observers
- `ConsoleLogger` - Logs all received events to the console
- `AnalyticsObserver` - Tracks event counts by type
- `NotifierObserver` - Sends alerts through various channels (email, SMS, etc.)

**Code Snippet:**

```typescript
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
```

**Motivation:** The Observer pattern is ideal here because we need multiple independent systems (logging, analytics, notifications) to react to the same events without the event source needing to know about each one individually.

---

### 2. Mediator Pattern Implementation

**Location:** `src/domain/patterns/mediator/EventMediator.ts`

The Mediator Pattern is implemented to centralize communication between the event source and observers. Instead of the event source directly notifying each observer, it publishes events to the mediator, which then distributes them to subscribed observers based on their filtering strategies.

**Key Features:**
- Centralized event distribution
- Manages observer subscriptions with associated filtering strategies
- Supports dynamic subscription and unsubscription
- Error handling for observer notifications

**Code Snippet:**

```typescript
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
```

**Motivation:** The Mediator pattern eliminates direct dependencies between the event source and observers. The event source only knows about the mediator, and observers register with the mediator. This makes the system more flexible and easier to extend.

---

### 3. Strategy Pattern Implementation

**Location:** `src/domain/patterns/strategy/EventFilterStrategy.ts`

The Strategy Pattern is implemented to allow different filtering algorithms to be applied when determining which events should be sent to which observers. Each observer can have its own filtering strategy, and strategies can be combined.

**Key Features:**
- `EventFilterStrategy` interface defines the filtering contract
- `AllEventsStrategy` - Sends all events
- `CometOnlyStrategy` - Filters only comet events
- `MagnitudeThresholdStrategy` - Filters events by magnitude threshold
- `AndStrategy` - Combines multiple strategies with AND logic

**Code Snippet:**

```typescript
export interface EventFilterStrategy {
  shouldSend(event: StellarEvent): boolean;
  name(): string;
}

export class AllEventsStrategy implements EventFilterStrategy {
  shouldSend(_: StellarEvent) { return true; }
  name() { return 'AllEvents'; }
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
```

**Motivation:** The Strategy pattern allows each observer to define its own filtering logic without modifying the mediator or event source. This makes it easy to add new filtering criteria and combine multiple filters, providing great flexibility in event distribution.

---

## Results / Screenshots / Conclusions:

When running the application (`npm start`), you will see output similar to:

```
[Mediator] Subscriber added: logger-1 using strategy AllEvents
[Mediator] Subscriber added: analytics-1 using strategy Magnitude<=3
[Mediator] Subscriber added: notifier-1 using strategy And(CometOnly,Magnitude<=5)     

--- Starting stellar events simulation (10 events, 800ms interval) ---

[Mediator] Publishing event evt_hm6b1iq type=Comet mag=2.38 at 2025-12-02T16:37:08.783Z
[Logger:logger-1] Received event evt_hm6b1iq — type=Comet, mag=2.38, desc=Comet spotted with magnitude 2.38 at 2025-12-02T16:37:08.783Z
[Analytics:analytics-1] Count for Comet => 1
[Notifier:notifier-1] Sending email alert: Comet observed (mag=2.38) — Comet spotted with magnitude 2.38

[Mediator] Publishing event evt_g09whlg type=Asteroid mag=2.4 at 2025-12-02T16:37:09.590Z
[Logger:logger-1] Received event evt_g09whlg — type=Asteroid, mag=2.4, desc=Asteroid spotted with magnitude 2.4 at 2025-12-02T16:37:09.590Z
[Analytics:analytics-1] Count for Asteroid => 1

[Mediator] Publishing event evt_48ejlla type=MeteorShower mag=3.95 at 2025-12-02T16:37:10.400Z
[Logger:logger-1] Received event evt_48ejlla — type=MeteorShower, mag=3.95, desc=MeteorShower spotted with magnitude 3.95 at 2025-12-02T16:37:10.400Z
[Mediator] Subscriber added: comet-watch using strategy CometOnly
[Demo] comet-watch subscribed

[Mediator] Publishing event evt_3n6beg7 type=MeteorShower mag=0.56 at 2025-12-02T16:37:11.208Z
[Logger:logger-1] Received event evt_3n6beg7 — type=MeteorShower, mag=0.56, desc=MeteorShower spotted with magnitude 0.56 at 2025-12-02T16:37:11.208Z
[Analytics:analytics-1] Count for MeteorShower => 1

[Mediator] Publishing event evt_znb9qa8 type=Comet mag=6.85 at 2025-12-02T16:37:12.013Z
[Logger:logger-1] Received event evt_znb9qa8 — type=Comet, mag=6.85, desc=Comet spotted with magnitude 6.85 at 2025-12-02T16:37:12.013Z
[Logger:comet-watch] Received event evt_znb9qa8 — type=Comet, mag=6.85, desc=Comet spotted with magnitude 6.85 at 2025-12-02T16:37:12.013Z

[Mediator] Publishing event evt_ys5ln4b type=Asteroid mag=6.53 at 2025-12-02T16:37:12.820Z
[Logger:logger-1] Received event evt_ys5ln4b — type=Asteroid, mag=6.53, desc=Asteroid spotted with magnitude 6.53 at 2025-12-02T16:37:12.820Z

[Mediator] Publishing event evt_zrbogka type=Supernova mag=7.92 at 2025-12-02T16:37:13.629Z
[Logger:logger-1] Received event evt_zrbogka — type=Supernova, mag=7.92, desc=Supernova spotted with magnitude 7.92 at 2025-12-02T16:37:13.629Z
[Mediator] Unsubscribed: logger-1
[Demo] logger unsubscribed

[Mediator] Publishing event evt_527b8yf type=Comet mag=7.47 at 2025-12-02T16:37:14.438Z
[Logger:comet-watch] Received event evt_527b8yf — type=Comet, mag=7.47, desc=Comet spotted with magnitude 7.47 at 2025-12-02T16:37:14.438Z

[Mediator] Publishing event evt_usu3oto type=Asteroid mag=4.04 at 2025-12-02T16:37:15.245Z

[Mediator] Publishing event evt_rdr0r6x type=Supernova mag=1.68 at 2025-12-02T16:37:16.057Z
[Analytics:analytics-1] Count for Supernova => 1

--- Simulation complete. Final analytics counts:
Map(4) {
  'Comet' => 1,
  'Asteroid' => 1,
  'MeteorShower' => 1,
  'Supernova' => 1
}
```