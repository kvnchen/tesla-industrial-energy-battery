import { Battery } from './types';

export interface Device {
  name: Battery | 'Transformer',
  floorSqFt: number[],
  energyMWh: number,
  costUSD: number,
  releaseYear: number | null
};

export interface Dictionary {
  [key: string]: string
};
