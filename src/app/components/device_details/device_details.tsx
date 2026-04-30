import styles from './device_details.module.css';
import { Device } from '../../utils/interfaces';
import i18n from '../../utils/i18n';

// todo: dollar commas
export default function DeviceDetails({ device }: {
  device: Device
}) {
  return (
    <article className={styles.details}>
      <section className={styles.left}>
        <img
          src={device.imgURL as string}
          alt={device.name}
          fetchPriority='high'
          loading='eager'
        />
      </section>
      <section className={styles.right}>
        <h2>{device.name}</h2>
        <p>{`${i18n('energy')}: ${device.energyMWh} MWh`}</p>
        <p>{`${i18n('floorDimension')}: ${device.floorSqFt[0]} ft x ${device.floorSqFt[1]} ft`}</p>
        <p>{`${i18n('releaseDate')}: ${device.releaseYear}`}</p>
        <p>{`${i18n('price')}: $${device.costUSD}`}</p>
      </section>
    </article>
  );
}
