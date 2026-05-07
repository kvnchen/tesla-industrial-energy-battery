import { Device } from '../../../utils/interfaces';
import { type NextRequest } from 'next/server';

// Assume devices would be fetched on the server during server-side rendering.
// Decided that the app should treat the available devices and their details as variable.
// Arranged as a map for easier querying in SiteLayout.
const BATTERIES: { [key: string]: Device } = {
  MegapackXL: {
    name: 'MegapackXL',
    floorSqFt: [40, 10],
    energyMWh: 4,
    costUSD: 120000,
    releaseYear: 2022,
    imgURL: 'https://pv-magazine-usa.com/wp-content/uploads/sites/2/2022/02/megapack-1200x667-1.jpg'
  },
  Megapack2: {
    name: 'Megapack2',
    floorSqFt: [30, 10],
    energyMWh: 3,
    costUSD: 80000,
    releaseYear: 2021,
    imgURL: 'https://electrek.co/wp-content/uploads/sites/3/2021/07/Tesla-Megapack-hero.jpg'
  },
  Megapack: {
    name: 'Megapack',
    floorSqFt: [30, 10],
    energyMWh: 2,
    costUSD: 50000,
    releaseYear: 2005,
    imgURL: 'https://digitalcontent.tesla.com/image/upload/q_auto/f_auto/w_1920/prod/fulfillment/energy/Order/MegapackConfigurator/d_megapack-hero'
  },
  PowerPack: {
    name: 'PowerPack',
    floorSqFt: [10, 10],
    energyMWh: 1,
    costUSD: 10000,
    releaseYear: 2000,
    imgURL: 'https://www.pennoni.com/wp-content/uploads/2021/12/Tesla-header.jpg'
  }
};

// Assumption that there is only one type of non-selectable transformer at a time.
const TRANSFORMER: Device = {
  name: 'Transformer',
  floorSqFt: [10, 10],
  energyMWh: -0.5,
  costUSD: 10000,
  releaseYear: null,
  imgURL: null
};

export async function GET(request: NextRequest) {
  const data = {
    batteries: BATTERIES,
    transformer: TRANSFORMER
  };

  return new Response(JSON.stringify(data), {
    status: 200,
    statusText: 'OK'
  });
}
