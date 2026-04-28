'use client';

import styles from './dashboard.module.css';
import { useState, useEffect } from 'react';
import { Device, SelectedDevices } from '../../utils/interfaces';
import DeviceSelector from '../device_selector/device_selector';

export default function Dashboard({ batteries, transformer }: {
  batteries: Device[],
  transformer: Device
}) {
  const temp: SelectedDevices = {};
  for (const battery of batteries) {
    temp[battery.name] = 0;
  }

  const [selectedDevices, setSelectedDevices] = useState<SelectedDevices>(temp);

  useEffect(() => {
    const saved = window.localStorage.getItem('tesla_selected_devices');
    if (saved !== null) {
      setSelectedDevices(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('tesla_selected_devices', JSON.stringify(selectedDevices));
  }, [selectedDevices]);

  return (
    <main className={styles.main}>
      <DeviceSelector batteries={batteries} selectedDevices={selectedDevices} setSelectedDevices={setSelectedDevices} />
    </main>
  );
}
