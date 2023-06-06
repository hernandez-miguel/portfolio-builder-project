import { getTotalAllocations, getPortfolioDivyield, getPortfolioExpectedReturn, getPortfolioDivGrowth} from "../helpers/TableFooter.helper"

export default function TableFooter({allocations, rowData, setRowData}) {
  const totalAllocations = getTotalAllocations(allocations);

  return (
    <>
     <div className="table-footer">
        <button onClick={() => {setRowData([...rowData, ...Array(10).fill({})])}}>
          Add 10 Rows
        </button>
      <p>Allocation: {totalAllocations}% of 100%</p>
      <p>Portfolio Div Yield: {
        totalAllocations === 100 ? getPortfolioDivyield(allocations, rowData) 
        : ''}
      </p>
      <p>Portfolio CAGR: {
        totalAllocations === 100? getPortfolioExpectedReturn(allocations, rowData)
        : ''}
      </p>
      <p>Portfolio Div Growth Rate: {
        totalAllocations === 100 ? getPortfolioDivGrowth(allocations, rowData)
        : ''}
      </p>
     </div>
    </>
  )
}