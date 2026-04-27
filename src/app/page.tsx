import styles from "./page.module.css";
import type { Metadata } from 'next';
import i18n from './utils/i18n';
import { Device } from './utils/interfaces';

export const metadata: Metadata = {
  title: i18n('metadataTitle'),
  description: i18n('metadataDesc')
};

// Assume devices are fetched on the server during server-side rendering
const BATTERIES: Device[] = [
  {
    name: 'MegapackXL',
    floorSqFt: [40, 10],
    energyMWh: 4,
    costUSD: 120000,
    releaseYear: 2022
  },
  {
    name: 'Megapack2',
    floorSqFt: [30, 10],
    energyMWh: 3,
    costUSD: 80000,
    releaseYear: 2021
  },
  {
    name: 'Megapack',
    floorSqFt: [30, 10],
    energyMWh: 2,
    costUSD: 50000,
    releaseYear: 2005
  },
  {
    name: 'PowerPack',
    floorSqFt: [10, 10],
    energyMWh: 1,
    costUSD: 10000,
    releaseYear: 2000
  },
];
const TRANSFORMER: Device = {
  name: 'Transformer',
  floorSqFt: [10, 10],
  energyMWh: -0.5,
  costUSD: 10000,
  releaseYear: null
};

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <svg viewBox="0 0 342 35" xmlns="http://www.w3.org/2000/svg"><path fill="text-secondary" d="M0 .1a9.7 9.7 0 0 0 7 7h11l.5.1v27.6h6.8V7.3L26 7h11a9.8 9.8 0 0 0 7-7H0zm238.6 0h-6.8v34.8H263a9.7 9.7 0 0 0 6-6.8h-30.3V0zm-52.3 6.8c3.6-1 6.6-3.8 7.4-6.9l-38.1.1v20.6h31.1v7.2h-24.4a13.6 13.6 0 0 0-8.7 7h39.9v-21h-31.2v-7zm116.2 28h6.7v-14h24.6v14h6.7v-21h-38zM85.3 7h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7m0 13.8h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7m0 14.1h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7M308.5 7h26a9.6 9.6 0 0 0 7-7h-40a9.6 9.6 0 0 0 7 7"></path></svg>
      </header>
      <main className={styles.main}>

      </main>
    </div>
  );
}
