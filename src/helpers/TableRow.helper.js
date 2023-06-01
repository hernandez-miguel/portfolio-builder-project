export function getLastPrice(lastPrice) {
  return lastPrice > 0 ? `$${lastPrice.toFixed(2)}` : 'N/A';
}

export function getDivYield(divYield) {
  return divYield ? `${divYield}%` : 'N/A'; 
}

export function getDivGrowthYears(divGrowth) {
  return divGrowth ? `${divGrowth} Years` : 'N/A';
}

export function getPayOutMonths(payDate) {
  if(!payDate) {
    return 'N/A';
  }

  const divMonth = payDate[5] + payDate[6];

  if (divMonth === '01' || divMonth === '04' || divMonth === '07' || divMonth === '10') {
    return 'Jan, Apr, July, Oct';
  } else if (divMonth === '02' || divMonth === '05' || divMonth === '08' || divMonth === '11') {
    return 'Feb, May, Aug, Nov';
  } else {
    return 'Mar, June, Sept, Dec'
  }
}


export function get5YCAGR(divHistory, historicalPrices, lastPrice) {

  if (divHistory.length === 6 && historicalPrices.length >= 1250) {
    const totalDivRecieved = divHistory.reduce((acc, currentValue) => {
      return acc += currentValue.attributes.adjusted_amount; 
    }, 0)
    const startPrice = historicalPrices[0].attributes.close;
    const endPrice = lastPrice + totalDivRecieved;
    const annualizedRoR = ((Math.pow((endPrice / startPrice), 1/5) - 1) * 100).toFixed(2) + '%';
    return annualizedRoR;

  } else if (historicalPrices.length >= 1250) {
    const startPrice = historicalPrices[0].attributes.close;
    const endPrice = lastPrice;
    const annualizedRoR = ((Math.pow((endPrice / startPrice), 1/5) - 1) * 100).toFixed(2) + '%';
    return annualizedRoR;
    
  } else {
    return 'N/A';
  }
  
}

export function getDivGrowthRate(divHistory, annualPayout) {
  if (divHistory.length !== 6) {
    return 'N/A'
  }
  
  const startingDivAmount = divHistory[0].attributes.adjusted_amount;
  const endingDivAmount = annualPayout;
  const dividendGrowthRate = ((Math.pow((endingDivAmount / startingDivAmount), 1/5) - 1) * 100).toFixed(2) + '%';

  return dividendGrowthRate;
 }
