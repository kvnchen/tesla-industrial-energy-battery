import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import DeviceDetails from '../device_details';
import { Device } from '../../../utils/interfaces';

const powerPack: Device = {
  name: 'PowerPack',
  floorSqFt: [10, 10],
  energyMWh: 1,
  costUSD: 10000,
  releaseYear: 2000,
  imgURL: 'https://www.pennoni.com/wp-content/uploads/2021/12/Tesla-header.jpg'
};

describe('DeviceDetails', () => {
  it('renders DeviceDetails', () => {
    render(<DeviceDetails device={powerPack} />);

    const img = screen.getByAltText(powerPack.name);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', powerPack.imgURL);

    const header = screen.getByText(powerPack.name);
    expect(header).toBeInTheDocument();

    const energy = screen.getByText(`Energy: ${powerPack.energyMWh} MWh`);
    expect(energy).toBeInTheDocument();

    const floorDimensions = screen.getByText(`Floor Dimensions: ${powerPack.floorSqFt[0]} ft x ${powerPack.floorSqFt[1]} ft`);
    expect(floorDimensions).toBeInTheDocument();

    const releaseDate = screen.getByText(`Release Date: ${powerPack.releaseYear}`);
    expect(releaseDate).toBeInTheDocument();

    const price = screen.getByText(`Price per unit: $${powerPack.costUSD}`);
    expect(price).toBeInTheDocument();
  });
});
