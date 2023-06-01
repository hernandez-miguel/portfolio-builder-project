import { getTotalAllocations, getPortfolioDivyield, getPortfolioExpectedReturn, getPortfolioDivGrowth} from "../helpers/TableFooter.helper"

export default function TableFooter({allocations, rowData}) {
  
  const totalAllocations = getTotalAllocations(allocations);
  console.log(totalAllocations, typeof totalAllocations);

  return (
    <>
     <div className="table-footer">
      <p>Total Allocation: {totalAllocations}% of 100%</p>
      <p>Portfolio Div Yield: {
        totalAllocations === 100 ?  getPortfolioDivyield(allocations, rowData) 
        : ''}
      </p>
      <p>Portfolio Expected Return: {
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