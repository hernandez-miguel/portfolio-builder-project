import { get5YCAGR, getDivGrowthRate } from "./TableRow.helper";

export function getTotalAllocations(allocations) {

  const totalAllocations = allocations.reduce((acc, curr) => {
    if (curr) return Number(acc) + Number(curr);
    return acc;
  }, 0)
  return totalAllocations;
}

export function getPortfolioDivyield(allocations, rowData) {
  let total = 0;

  for(let i = 0; i < allocations.length; i++) {
    let allocationPercent = Number(allocations[i]) / 100;

    if (allocationPercent > 0 && rowData[i].divYield) {
      total += allocationPercent * rowData[i].divYield;
    }
  }

  return total.toFixed(2) + '%';
}

export function getPortfolioExpectedReturn(allocations, rowData) {
  let total = 0;
  
  for(let i = 0; i < allocations.length; i++) {
    let cagrStr = get5YCAGR(rowData[i].divHistory, rowData[i].historicalPrices, rowData[i].lastPrice);
    let allocationPercent = Number(allocations[i]) / 100;

    if (allocationPercent > 0 && cagrStr !== 'N/A') {
      let cagrNum = Number(cagrStr.slice(0, -1));
        total += allocationPercent * cagrNum;
    }
  }

  return total.toFixed(2) + '%';
}

export function getPortfolioDivGrowth(allocations, rowData) {
  let total = 0;

  for (let i = 0; i < allocations.length; i++) {
    let dgrStr = getDivGrowthRate(rowData[i].divHistory, rowData[i].divRate);
    let allocationPercent = Number(allocations[i]) / 100;

    if (allocationPercent > 0 && dgrStr !== 'N/A') {
      let dgrNum = Number(dgrStr.slice(0, -1));
      total += allocationPercent * dgrNum;
    }
  }

  return total.toFixed(2) + '%';
}