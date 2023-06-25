import {
  getTotalAllocations,
  getPortfolioDivYield,
  getPortfolioCAGR,
  getPortfolioDivGrowthRate,
} from '../helpers/TableFooter.helper';

import TotalAllocation from './TotalAllocation';
import PortfolioDivYield from './PortfolioDivYield';
import PortfolioDivGrowthRate from './PortfolioDivGrowthRate';
import PortfolioCAGR from './PortfolioCAGR';

export default function TableFooter({ rowData }) {
  const totalAllocation = getTotalAllocations(rowData);
  const portfolioDivYield = getPortfolioDivYield(rowData);
  const portfolioDivGrowthRate = getPortfolioDivGrowthRate(rowData);
  const portfolioCAGR = getPortfolioCAGR(rowData);

  return (
    <>
      <div className="table-footer">
        <div className="table-footer-content">
          <TotalAllocation 
            totalAllocation={totalAllocation}
          />
          <PortfolioDivYield 
            portfolioDivYield={portfolioDivYield}
          />
          <PortfolioDivGrowthRate
            portfolioDivGrowthRate={portfolioDivGrowthRate}
          />
          <PortfolioCAGR 
            portfolioCAGR={portfolioCAGR}
          />
        </div>
      </div>
    </>
  );
}
