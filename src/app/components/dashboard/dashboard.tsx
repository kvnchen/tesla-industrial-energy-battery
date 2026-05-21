'use client';

import styles from './dashboard.module.css';
import { useState, useEffect } from 'react';
import { Device, SelectedDevices } from '../../utils/interfaces';
import DeviceSelector from '../device_selector/device_selector';
import Summary from '../summary/summary';
import SiteLayout from '../site_layout/site_layout';

export default function Dashboard({ batteries, transformer }: {
  batteries: { [key: string]: Device },
  transformer: Device
}) {
  const temp: SelectedDevices = {};
  for (const battery of Object.values(batteries)) {
    temp[battery.name] = 0;
  }

  const [selectedDevices, setSelectedDevices] = useState<SelectedDevices>(temp);
  const [maxBudget, setMaxBudget] = useState(1000000);

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
      <DeviceSelector maxBudget={maxBudget} setMaxBudget={setMaxBudget} batteries={batteries} selectedDevices={selectedDevices} setSelectedDevices={setSelectedDevices} transformer={transformer} />
      <Summary batteries={batteries} transformer={transformer} selectedDevices={selectedDevices} />
      <SiteLayout batteries={batteries} selectedDevices={selectedDevices} transformer={transformer} />
    </main>
  );
}
