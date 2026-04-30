import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Summary from '../summary';
import { Device, SelectedDevices } from '../../../utils/interfaces';

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
let totalEnergy = requiredTransformers * transformer.energyMWh;
let totalSqFt = requiredTransformers * transformer.floorSqFt[0] * transformer.floorSqFt[1];
let totalCost = requiredTransformers * transformer.costUSD;

for (const device of Object.values(batteries)) {
  if (selectedDevices[device.name] > 0) {
    totalEnergy += selectedDevices[device.name] * device.energyMWh;
    totalSqFt += selectedDevices[device.name] * device.floorSqFt[0] * device.floorSqFt[1];
    totalCost += selectedDevices[device.name] * device.costUSD;
  }
}

const energyDensity = String((totalEnergy / totalSqFt) * 1000).slice(0, 4);

describe('Summary', () => {
  it('renders Summary', () => {
    render(<Summary batteries={batteries} transformer={transformer} selectedDevices={selectedDevices} />);

    const headers = screen.getAllByRole('heading');
    expect(headers.length).toBe(3);
    expect(headers[0]).toHaveTextContent('Summary');
    expect(headers[1]).toHaveTextContent('Selected Devices');
    expect(headers[2]).toHaveTextContent('Totals');

    const content = screen.getAllByRole('paragraph');
    expect(content.length).toBe(9);

    for (let i = 0; i < Object.values(batteries).length; i++) {
      const name = Object.keys(batteries)[i];
      expect(content[i]).toHaveTextContent(batteries[name].name);
      expect(content[i]).toHaveTextContent(`${selectedDevices[name]} x $${batteries[name].costUSD}`);
    }

    expect(content[4]).toHaveTextContent('Required Transformers');
    expect(content[4]).toHaveTextContent(`${requiredTransformers} x $${transformer.costUSD}`);

    expect(content[5]).toHaveTextContent('Energy');
    expect(content[5]).toHaveTextContent(`${totalEnergy} MWh`);

    expect(content[6]).toHaveTextContent('Land Required');
    expect(content[6]).toHaveTextContent(`${totalSqFt} sq ft`);

    expect(content[7]).toHaveTextContent('Energy Density');
    expect(content[7]).toHaveTextContent(`${energyDensity} KWh / sq ft`);

    expect(content[8]).toHaveTextContent('Cost');
    expect(content[8]).toHaveTextContent(`$${totalCost}`);
  });
});
