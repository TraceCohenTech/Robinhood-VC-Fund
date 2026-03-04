import { runSimulation } from '../simulation/engine.ts';
import type { SimulationParams } from '../types/index.ts';

self.onmessage = (e: MessageEvent<SimulationParams>) => {
  const result = runSimulation(e.data);
  self.postMessage(result);
};
