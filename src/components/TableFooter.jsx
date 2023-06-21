import {
  getTotalAllocations,
  getPortfolioDivYield,
  getPortfolioExpectedReturn,
  getPortfolioDivGrowth,
} from '../helpers/TableFooter.helper';

export default function TableFooter({ rowData }) {
  const totalAllocations = getTotalAllocations(rowData);

  const colorChange = (totalAllocations) => {
    if (totalAllocations > 100) {
      return (
        <p>
          Allocation:
          <span style={{ color: 'red' }}> {totalAllocations}% </span>
          of 100%
        </p>
      );
    }

    return <p>Allocation: {totalAllocations}% of 100%</p>;
  };

  return (
    <>
      <div className="table-footer">
        {colorChange(totalAllocations)}
        <p>
          Portfolio Dividend Yield:{' '}
          {totalAllocations === 100 ? getPortfolioDivYield(rowData) : ''}
        </p>
        <p>
          Portfolio Dividend Growth Rate:{' '}
          {totalAllocations === 100 ? getPortfolioDivGrowth(rowData) : ''}
        </p>
        <p>
          Portfolio CAGR:{' '}
          {totalAllocations === 100 ? getPortfolioExpectedReturn(rowData) : ''}
        </p>
      </div>
    </>
  );
}
