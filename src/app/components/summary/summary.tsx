'use client';

import styles from './summary.module.css';
import { Device, SelectedDevices } from '../../utils/interfaces';
import i18n from '../../utils/i18n';
import { DeviceContext } from '../device_context/device_context';
import { useContext } from 'react';

// total price, floor dimension, energy density
export default function Summary({ selectedDevices }: {
  selectedDevices: SelectedDevices
}) {
  const context = useContext(DeviceContext);
  const batteries = context.batteries;
  const transformer = context.transformer as Device;

  const totalBatteries = Object.keys(selectedDevices).reduce((prev, cur) => prev + selectedDevices[cur], 0);
  const requiredTransformers = Math.floor(totalBatteries / 2);
  let totalEnergy = requiredTransformers * transformer.energyMWh;
  let totalSqFt = requiredTransformers * transformer.floorSqFt[0] * transformer.floorSqFt[1];
  let totalCost = requiredTransformers * transformer.costUSD;

  for (const device of Object.values(batteries)) {
    if (selectedDevices[device.name] > 0) {
      totalEnergy += selectedDevices[device.name] * device.energyMWh;
      totalSqFt += selectedDevices[device.name] * device.floorSqFt[0] * device.floorSqFt[1];
      totalCost += selectedDevices[device.name] * device.costUSD;
    }
  }

  const energyDensity = String((totalEnergy / totalSqFt) * 1000).slice(0, 4);

  return (
    <section className={styles.summary}>
      <h2>{i18n('summary')}</h2>
      {totalBatteries > 0 && <div className={styles.itemized}>
        <h3>{i18n('selectedDevices')}</h3>
        {Object.values(batteries).map((device) => {
          if (selectedDevices[device.name] > 0)
            return (
              <p key={device.name} className={styles['device-line']}>
                <span>{device.name}</span>
                <span>{`${selectedDevices[device.name]} x $${device.costUSD}`}</span>
              </p>
            );
        })}
        {requiredTransformers > 0 && (
          <p className={styles['device-line']}>
            <span>{i18n('requiredTransformers')}</span>
            <span>{`${requiredTransformers} x $${transformer.costUSD}`}</span>
          </p>
        )}
      </div>}
      {totalBatteries > 0 && <div className={styles.itemized}>
        <h3>{i18n('totals')}</h3>
        <p className={styles['device-line']}>
          <span>{i18n('energy')}</span>
          <span className={styles.bold}>{`${totalEnergy} MWh`}</span>
        </p>
        <p className={styles['device-line']}>
          <span>{i18n('landRequired')}</span>
          <span className={styles.bold}>{`${totalSqFt} sq ft`}</span>
        </p>
        <p className={styles['device-line']}>
          <span>{i18n('energyDensity')}</span>
          <span className={styles.bold}>{`${energyDensity} KWh / sq ft`}</span>
        </p>
        <p className={styles['device-line']}>
          <span>{i18n('cost')}</span>
          <span className={styles.bold}>{`$${totalCost}`}</span>
        </p>
      </div>}
    </section>
  );
}
