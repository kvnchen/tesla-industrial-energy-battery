import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AccordianCart from '../accordian_cart';
import { Battery } from '../../../utils/types';

describe('AccordianCart', () => {
  it('renders AccordianCart', () => {
    render(
      <AccordianCart
        deviceName={'MegaPack2' as Battery}
        activeId=''
        setActiveId={() => null}
        quantity={4}
        setSelectedDevices={() => null}
      />
    );

    const header = screen.getByText('MegaPack2');
    expect(header).toBeInTheDocument();

    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('value', '4');
  });
});
