import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Device, SelectedDevices } from '../../../utils/interfaces';
import SiteLayout from '../site_layout';

const batteries: { [key: string]: Device } = {
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

const transformer: Device = {
  name: 'Transformer',
  floorSqFt: [10, 10],
  energyMWh: -0.5,
  costUSD: 10000,
  releaseYear: null,
  imgURL: null
};

const selectedDevices: SelectedDevices = {
  MegapackXL: 6,
  Megapack2: 7,
  Megapack: 4,
  PowerPack: 3
};

const totalBatteries = Object.keys(selectedDevices).reduce((prev, cur) => prev + selectedDevices[cur], 0);
const requiredTransformers = Math.floor(totalBatteries / 2);

describe('SiteLayout', () => {
  it('renders SiteLayout', () => {
    render(<SiteLayout batteries={batteries} transformer={transformer} selectedDevices={selectedDevices} />);

    for (const device of Object.keys(selectedDevices)) {
      let item;
      if (device === 'PowerPack')
        item = screen.getAllByText('PP');
      else
        item = screen.getAllByText(device);

      expect(item.length).toBe(selectedDevices[device]);
    }

    const transformers = screen.getAllByText('T');
    expect(transformers.length).toBe(requiredTransformers);
  });
});
