'use client';

import styles from './accordian_cart.module.css';
import { SelectedDevices } from '../../utils/interfaces';
import { Battery } from '../../utils/types';

// todo: aria
export default function AccordianCart({ deviceName, activeId, setActiveId, quantity, setSelectedDevices }: {
  deviceName: Battery,
  activeId: string,
  setActiveId: React.Dispatch<React.SetStateAction<string>>,
  quantity: number,
  setSelectedDevices: React.Dispatch<React.SetStateAction<SelectedDevices>>
}) {
  const id = `${deviceName}-accordian`;

  return (
    <div id={id} className={styles.accordian}>
      <button
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
          disabled={quantity === 99}
          onClick={() =>
            setSelectedDevices((prev) => {
              return {...prev, [deviceName]: Math.min(99, prev[deviceName] + 1)} as SelectedDevices;
            })
          }
        >{'+'}</button>
      </div>
    </div>
  );
}
