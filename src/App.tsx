import { useMemo } from 'react';
import { projectCompanies, projectFund, projectFundAllScenarios } from './simulation/engine.ts';
import Header from './components/Header.tsx';
import FundOverview from './components/FundOverview.tsx';
import PortfolioComposition from './components/PortfolioComposition.tsx';
import CompanyGrowth from './components/CompanyGrowth.tsx';
import FundUpside from './components/FundUpside.tsx';
import IndustryContext from './components/IndustryContext.tsx';
import Methodology from './components/Methodology.tsx';
import Footer from './components/Footer.tsx';

export default function App() {
  const companyProjections = useMemo(() => projectCompanies(), []);
  const fundProjections = useMemo(() => projectFund(companyProjections), [companyProjections]);
  const scenarioProjections = useMemo(() => projectFundAllScenarios(companyProjections), [companyProjections]);

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <Header />
        <FundOverview />
        <PortfolioComposition />
        <CompanyGrowth projections={companyProjections} />
        <FundUpside projections={fundProjections} scenarioProjections={scenarioProjections} />
        <IndustryContext />
        <Methodology />
        <Footer />
      </div>
    </div>
  );
}
