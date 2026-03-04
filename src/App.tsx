import Header from './components/Header.tsx';
import FundOverview from './components/FundOverview.tsx';
import PortfolioComposition from './components/PortfolioComposition.tsx';
import IndustryContext from './components/IndustryContext.tsx';
import Footer from './components/Footer.tsx';

export default function App() {
  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14">
        <Header />
        <FundOverview />
        <PortfolioComposition />
        <IndustryContext />
        <Footer />
      </div>
    </div>
  );
}
