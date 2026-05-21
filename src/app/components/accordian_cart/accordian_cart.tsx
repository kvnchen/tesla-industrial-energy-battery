'use client';

import styles from './accordian_cart.module.css';
import { Device, SelectedDevices } from '../../utils/interfaces';
import { Battery } from '../../utils/types';
import { getTotals } from '../summary/summary';

export default function AccordianCart({ deviceName, activeId, setActiveId, quantity, selectedDevices, setSelectedDevices, batteries, transformer, maxBudget }: {
  deviceName: Battery,
  activeId: string,
  setActiveId: React.Dispatch<React.SetStateAction<string>>,
  quantity: number,
  selectedDevices: SelectedDevices,
  setSelectedDevices: React.Dispatch<React.SetStateAction<SelectedDevices>>,
  batteries: { [key: string]: Device },
  transformer: Device,
  maxBudget: number
}) {
  const id = `${deviceName}-accordian`;
  const megapacks = new Set(['MegapackXL', 'Megapack2', 'Megapack3', 'Megapack']);

  function countMegapacks() {
    let count = 0;

    for (const type of Object.keys(selectedDevices)) {
      if (megapacks.has(type) && selectedDevices[type] > 0)
        count++;
    }

    return count;
  }

  function isAvailableBudget() {
    const totals = getTotals(batteries, transformer, {
      ...selectedDevices,
      [deviceName]: selectedDevices[deviceName] + 1
    });

    return totals.totalCost <= maxBudget;
  }

  return (
    <div id={id} className={styles.accordian}>
      <button
        id={`accordian-${deviceName}-button`}
        aria-expanded={activeId === id}
        aria-controls={`${deviceName}-details`}
        aria-label={`Toggle ${deviceName} accordian`}
        className={styles.toggle}
        onClick={() =>
          activeId === id ? setActiveId('') : setActiveId(id)
        }
      >
        <svg
          className={activeId === id ? `${styles.caret} ${styles.up}` : styles.caret}
          viewBox="0 0 24 24"
        >
          <path d="M7 10l5 5 5-5H7z"></path>
        </svg>
        <h2>{deviceName}</h2>
      </button>
      <div className={styles['button-group']}>
        <button
          aria-label={`increment ${deviceName} quantity`}
          disabled={quantity === 0}
          onClick={() =>
            setSelectedDevices((prev) => {
              return {...prev, [deviceName]: Math.max(0, prev[deviceName] - 1)} as SelectedDevices;
            })
          }
        >{'-'}</button>
        <input
          id='device-quantity-input'
          name='device-quantity-input'
          aria-label={`set ${deviceName} quantity`}
          type='number'
          value={quantity}
          min={0}
          max={99}
          onChange={(e) =>
            setSelectedDevices((prev) => {
              return {...prev, [deviceName]: Number(e.target.value)} as SelectedDevices;
            })
          }
        />
        <button
          aria-label={`decrement ${deviceName} quantity`}
          disabled={quantity === 99 || !isAvailableBudget()}
          onClick={() => {
            if (isAvailableBudget()) {
              if (megapacks.has(deviceName)) {
                const megapackCount = countMegapacks();
                if (megapackCount < 3 || selectedDevices[deviceName] > 0)
                  setSelectedDevices((prev) => {
                    return {...prev, [deviceName]: Math.min(99, prev[deviceName] + 1)} as SelectedDevices;
                  });
              } else {
                setSelectedDevices((prev) => {
                  return {...prev, [deviceName]: Math.min(99, prev[deviceName] + 1)} as SelectedDevices;
                });
              }
            }
          }}
        >{'+'}</button>
      </div>
    </div>
  );
}
