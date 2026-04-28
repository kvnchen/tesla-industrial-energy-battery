'use client';

import styles from './device_selector.module.css';
import { Device, SelectedDevices } from '../../utils/interfaces';
import { Battery } from '../../utils/types';
import i18n from '../../utils/i18n';
import { useState } from 'react';
import AccordianCart from '../accordian_cart/accordian_cart';

export default function DeviceSelector({ batteries, selectedDevices, setSelectedDevices }: {
  batteries: Device[],
  selectedDevices: SelectedDevices,
  setSelectedDevices: React.Dispatch<React.SetStateAction<SelectedDevices>>
}) {
  // initialize with first accordian open
  const [activeId, setActiveId] = useState<string>(`${batteries[0].name}-accordian`);

  return (
    <section className={styles['device-selector']}>
      <h1>{i18n('selectDevices')}</h1>
      {batteries.map((device) =>
        <AccordianCart
          key={device.name}
          deviceName={device.name as Battery}
          activeId={activeId}
          setActiveId={setActiveId}
          quantity={selectedDevices[device.name] ? selectedDevices[device.name] : 0}
          setSelectedDevices={setSelectedDevices}
        />
      )}
    </section>
  );
}
