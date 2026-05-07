'use client';

import styles from './dashboard.module.css';
import { useState, useEffect } from 'react';
import { Device, SelectedDevices } from '../../utils/interfaces';
import DeviceSelector from '../device_selector/device_selector';
import Summary from '../summary/summary';
import SiteLayout from '../site_layout/site_layout';
import { DeviceContext } from '../device_context/device_context';

export default function Dashboard({ batteries, transformer }: {
  batteries: { [key: string]: Device },
  transformer: Device
}) {
  const temp: SelectedDevices = {};
  for (const battery of Object.values(batteries)) {
    temp[battery.name] = 0;
  }

  const [selectedDevices, setSelectedDevices] = useState<SelectedDevices>(temp);

  useEffect(() => {
    const saved = window.localStorage.getItem('tesla_selected_devices');
    if (saved !== null) {
      // saved devices may be different from input devices in the future
      const tempSelected: SelectedDevices = {};
      const parsed = JSON.parse(saved);

      for (const name of Object.keys(batteries)) {
        if (typeof parsed[name] === 'number')
          tempSelected[name] = parsed[name];
      }
      setSelectedDevices(tempSelected);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('tesla_selected_devices', JSON.stringify(selectedDevices));
  }, [selectedDevices]);

  return (
    <main className={styles.main}>
      <DeviceContext value={{ batteries: batteries, transformer: transformer }}>
        <DeviceSelector selectedDevices={selectedDevices} setSelectedDevices={setSelectedDevices} />
        <Summary selectedDevices={selectedDevices} />
        <SiteLayout selectedDevices={selectedDevices} />
      </DeviceContext>
    </main>
  );
}
