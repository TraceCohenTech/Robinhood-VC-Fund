import { useState } from 'react';
import { useSimulation } from './hooks/useSimulation.ts';
import Header from './components/Header.tsx';
import KPICards from './components/KPICards.tsx';
import PortfolioComposition from './components/PortfolioComposition.tsx';
import MonteCarloDistribution from './components/MonteCarloDistribution.tsx';
import IRRCurve from './components/IRRCurve.tsx';
import ScenarioComparison from './components/ScenarioComparison.tsx';
import CompanyDeepDive from './components/CompanyDeepDive.tsx';
import BenchmarkComparison from './components/BenchmarkComparison.tsx';
import SensitivityAnalysis from './components/SensitivityAnalysis.tsx';
import Methodology from './components/Methodology.tsx';
import Footer from './components/Footer.tsx';

export default function App() {
  const [bullProb, setBullProb] = useState(0.35);
  const { result, loading } = useSimulation(bullProb);

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <Header medianMOIC={result?.medianMOIC ?? 0} loading={loading} />

        {result ? (
          <>
            <KPICards result={result} />
            <PortfolioComposition />
            <MonteCarloDistribution result={result} />
            <IRRCurve result={result} />
            <ScenarioComparison result={result} bullProb={bullProb} />
            <CompanyDeepDive result={result} />
            <BenchmarkComparison result={result} />
            <SensitivityAnalysis
              bullProb={bullProb}
              onBullProbChange={setBullProb}
              loading={loading}
            />
            <Methodology />
          </>
        ) : (
          <div className="flex items-center justify-center py-32">
            <div className="text-center space-y-4">
              <div className="w-10 h-10 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />
              <p className="text-slate-500">Running 50,000 simulations...</p>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}
