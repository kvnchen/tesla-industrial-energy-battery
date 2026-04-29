import styles from './site_layout.module.css';
import { Device, SelectedDevices } from '../../utils/interfaces';

interface Row {
  contents: Device['name'][],
  available: number
}

export default function SiteLayout({ batteries, selectedDevices, transformer }: {
  batteries: { [key: string]: Device },
  selectedDevices: SelectedDevices,
  transformer: Device
}) {
  const layout: Row[] = [
    {
      contents: [],
      available: 100
    }
  ];
  
  // greedy algorithm
  function placeItem(device: Device, count: number) {
    while (count > 0) {
      let didPlace = false;

      for (const row of layout) {
        if (row.available >= device.floorSqFt[0]) {
          row.available -= device.floorSqFt[0];
          row.contents.push(device.name);
          count -= 1;
          didPlace = true;
          break;
        }
      }

      if (!didPlace) {
        const newRow = {
          contents: [device.name],
          available: 100 - device.floorSqFt[0]
        };
        layout.push(newRow);
        count -= 1;
      }
    }
  }

  for (const device of Object.values(batteries)) {
    let count = selectedDevices[device.name];

    placeItem(device, count);
  }

  const totalBatteries = Object.keys(selectedDevices).reduce((prev, cur) => prev + selectedDevices[cur], 0);
  let requiredTransformers = Math.floor(totalBatteries / 2);
  placeItem(transformer, requiredTransformers);

  console.log(layout);

  return (
    <></>
  );
}