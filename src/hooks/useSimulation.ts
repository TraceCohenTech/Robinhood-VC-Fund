import { useState, useEffect, useCallback, useRef } from 'react';
import type { SimulationParams, SimulationResult } from '../types/index.ts';
import { runSimulation } from '../simulation/engine.ts';

const DEFAULT_PARAMS: SimulationParams = {
  iterations: 50000,
  bullProb: 0.35,
  managementFee: 0.015,
  riskFreeRate: 0.045,
  cashWeight: 10,
};

export function useSimulation(bullProb: number) {
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(true);
  const workerRef = useRef<Worker | null>(null);

  const run = useCallback((bp: number) => {
    setLoading(true);
    const params: SimulationParams = { ...DEFAULT_PARAMS, bullProb: bp };

    // Try Web Worker first, fall back to main thread
    try {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
      const worker = new Worker(
        new URL('../workers/simulation.worker.ts', import.meta.url),
        { type: 'module' }
      );
      workerRef.current = worker;
      worker.onmessage = (e: MessageEvent<SimulationResult>) => {
        setResult(e.data);
        setLoading(false);
      };
      worker.onerror = () => {
        // Fallback to main thread
        const res = runSimulation(params);
        setResult(res);
        setLoading(false);
      };
      worker.postMessage(params);
    } catch {
      // Fallback to main thread
      const res = runSimulation(params);
      setResult(res);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    run(bullProb);
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, [bullProb, run]);

  return { result, loading };
}
