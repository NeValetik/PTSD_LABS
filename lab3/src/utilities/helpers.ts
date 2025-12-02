import { StellarEvent, StellarEventType } from '../domain/models/StellarEvent';

export function uid(prefix = ''): string {
  return prefix + Math.random().toString(36).slice(2, 9);
}

export function randomEvent(): StellarEvent {
  const types = Object.values(StellarEventType);
  const type = types[Math.floor(Math.random() * types.length)];
  // magnitude 0-10 (lower = brighter / more significant for our purposes)
  const magnitude = parseFloat((Math.random() * 10).toFixed(2));

  return {
    id: uid('evt_'),
    type: type as StellarEventType,
    magnitude,
    description: `${type} spotted with magnitude ${magnitude}`,
    timestamp: new Date(),
  };
}

