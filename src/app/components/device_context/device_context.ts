import { createContext } from 'react';
import { Device } from '../../utils/interfaces';

interface BatteriesAndTransformer {
  batteries: { [key: string]: Device },
  transformer: Device | null
}

export const DeviceContext = createContext<BatteriesAndTransformer>({ batteries: {}, transformer: null});
