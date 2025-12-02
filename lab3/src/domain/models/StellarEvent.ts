export enum StellarEventType {
  Comet = 'Comet',
  MeteorShower = 'MeteorShower',
  Supernova = 'Supernova',
  Asteroid = 'Asteroid',
}

export interface StellarEvent {
  id: string;
  type: StellarEventType;
  magnitude: number; // smaller = brighter (for stars) — we'll just treat as numeric importance
  description?: string;
  timestamp: Date;
}

