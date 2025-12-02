"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventMediator = void 0;
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
exports.EventMediator = EventMediator;
//# sourceMappingURL=EventMediator.js.map