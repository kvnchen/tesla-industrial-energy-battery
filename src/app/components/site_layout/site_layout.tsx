import styles from './site_layout.module.css';
import { Device, SelectedDevices } from '../../utils/interfaces';
import i18n from '../../utils/i18n';

interface Row {
  contents: Device['name'][],
  available: number
}

const COLORS = ['white', 'lightblue', 'lightyellow', 'lightpink'];

export default function SiteLayout({ batteries, selectedDevices, transformer }: {
  batteries: { [key: string]: Device },
  selectedDevices: SelectedDevices,
  transformer: Device
}) {
  const colorMap: { [key: string]: string } = {};
  Object.keys(batteries).map((key: string, index) => colorMap[key] = COLORS[index]);

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

  return (
    <section className={styles.layout}>
      <h2>{i18n('sampleLayout')}</h2>
      <div className={styles.grid}>
        {layout.map((row, index) =>
          <div key={`layout-row-${index}`} className={styles.row}>
            {row.contents.map((deviceName, deviceIndex) => {
              const sizeMod = batteries[deviceName] ? styles[`w${batteries[deviceName].floorSqFt[0]}`] : '';
              const colorMod = colorMap[deviceName] ? styles[colorMap[deviceName]] : '';

              return (
                <div
                  key={`row-${index}-device-${deviceIndex}`}
                  className={`${styles.device} ${sizeMod} ${colorMod}`}>
                  {i18n(`${deviceName}Abbr`) ? i18n(`${deviceName}Abbr`) : deviceName}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
