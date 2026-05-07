'use client';

import styles from './device_selector.module.css';
import {  SelectedDevices } from '../../utils/interfaces';
import { Battery } from '../../utils/types';
import i18n from '../../utils/i18n';
import { useState, useContext } from 'react';
import AccordianCart from '../accordian_cart/accordian_cart';
import DeviceDetails from '../device_details/device_details';
import { DeviceContext } from '../device_context/device_context';

export default function DeviceSelector({ selectedDevices, setSelectedDevices }: {
  selectedDevices: SelectedDevices,
  setSelectedDevices: React.Dispatch<React.SetStateAction<SelectedDevices>>
}) {
  const context = useContext(DeviceContext);
  const batteries = context.batteries;

  // initialize with first accordian open
  const [activeId, setActiveId] = useState<string>(`${Object.values(batteries)[0].name}-accordian`);

  return (
    <section className={styles['device-selector']}>
      <h2>{i18n('selectDevices')}</h2>
      {Object.values(batteries).map((device) => {
        const id = `${device.name}-accordian`;

        return (
          <div key={device.name}>
            <AccordianCart
              deviceName={device.name as Battery}
              activeId={activeId}
              setActiveId={setActiveId}
              quantity={selectedDevices[device.name] ? selectedDevices[device.name] : 0}
              setSelectedDevices={setSelectedDevices}
            />
            {activeId === id && <DeviceDetails device={device} />}
          </div>
        );
      })}
    </section>
  );
}
