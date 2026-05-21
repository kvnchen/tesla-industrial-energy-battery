'use client';

import styles from './device_selector.module.css';
import { Device, SelectedDevices } from '../../utils/interfaces';
import { Battery } from '../../utils/types';
import i18n from '../../utils/i18n';
import { useState } from 'react';
import AccordianCart from '../accordian_cart/accordian_cart';
import DeviceDetails from '../device_details/device_details';
import { getTotals } from '../summary/summary';

export default function DeviceSelector({ maxBudget, setMaxBudget, batteries, selectedDevices, setSelectedDevices, transformer }: {
  maxBudget: number,
  setMaxBudget: React.Dispatch<React.SetStateAction<number>>,
  batteries: { [key: string]: Device },
  selectedDevices: SelectedDevices,
  setSelectedDevices: React.Dispatch<React.SetStateAction<SelectedDevices>>,
  transformer: Device
}) {
  // initialize with first accordian open
  const [activeId, setActiveId] = useState<string>(`${Object.values(batteries)[0].name}-accordian`);
  const totalCost = getTotals(batteries, transformer, selectedDevices).totalCost;

  return (
    <section className={styles['device-selector']}>
      <h2>{i18n('selectDevices')}</h2>
      <label>
        Max Budget:
        <input type='number' value={maxBudget} onChange={(e) => setMaxBudget(Number(e.target.value))} />
      </label>
      {totalCost >= maxBudget && (
        <p>Warning: Max budget hit</p>
      )}
      {Object.values(batteries).map((device) => {
        const id = `${device.name}-accordian`;

        return (
          <div key={device.name}>
            <AccordianCart
              deviceName={device.name as Battery}
              activeId={activeId}
              setActiveId={setActiveId}
              quantity={selectedDevices[device.name] ? selectedDevices[device.name] : 0}
              selectedDevices={selectedDevices}
              setSelectedDevices={setSelectedDevices}
              batteries={batteries}
              transformer={transformer}
              maxBudget={maxBudget}
            />
            {activeId === id && <DeviceDetails device={device} />}
          </div>
        );
      })}
    </section>
  );
}
