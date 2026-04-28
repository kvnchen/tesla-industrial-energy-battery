import { Battery } from './types';

export interface Dictionary {
  [key: string]: string
};

export interface Device {
  name: Battery | 'Transformer',
  floorSqFt: number[],
  energyMWh: number,
  costUSD: number,
  releaseYear: number | null,
  imgURL: string | null
};

export interface SelectedDevices {
  [key: string]: number
};
