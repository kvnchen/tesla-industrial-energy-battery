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

    const img = screen.getByAltText('PowerPack');
    expect(img).toBeInTheDocument();
  });
});
