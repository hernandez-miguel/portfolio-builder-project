export function getTotalAllocations(rowData) {
  let total = 0;
  for (let i = 0; i < rowData.length; i++){
    total += (rowData[i].allocation * 10);
  }
  return total / 10;
}

export function getPortfolioDivYield(rowData) {
  let total = 0;

  for(let i = 0; i < rowData.length; i++) {
    let allocationPercent = Number(rowData[i].allocation) / 100;
    const divYieldNum = Number(rowData[i].divYield.slice(0, -1));
    total += allocationPercent * divYieldNum;
  }

  return total.toFixed(2) + '%';
}

export function getPortfolioExpectedReturn(rowData) {
  let total = 0;
  
  for(let i = 0; i < rowData.length; i++) {
    let allocationPercent = Number(rowData[i].allocation) / 100;
    if (allocationPercent > 0) {
      let cagrNum = Number(rowData[i].cagr5Years.slice(0, -1));
        total += allocationPercent * cagrNum;
    }
  }

  return total.toFixed(2) + '%';
}

export function getPortfolioDivGrowth(rowData) {
  let total = 0;

  for (let i = 0; i < rowData.length; i++) {
    let allocationPercent = Number(rowData[i].allocation) / 100;
    if (allocationPercent > 0) {
      let dgrNum = Number(rowData[i].divGrowthRate.slice(0, -1));
      total += allocationPercent * dgrNum;
    }
  }

  return total.toFixed(2) + '%';
}