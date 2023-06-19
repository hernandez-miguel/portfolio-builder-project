import { useState, useEffect } from "react";

export const errorTypeObj = {
  tickerNotFound: false,
  overMaximumAllocation: false,
  emptyInputs: false,
  notInRange: false,
  duplicates: false
}

export function getCurrentDate(date){
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function getHistoricalDate(date, numYears){
  return`${date.getFullYear() - numYears}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function getStartYear(date, numYears) {
  return `${date.getFullYear() - numYears}-01-01`;
}

export function getEndYear(date) {
  return `${date.getFullYear()}-01-01`;
}

export function useDebounceValue(value, time = 250) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, time)

    return () => {
      clearTimeout(timeout)
    }
  }, [value, time]);

  return debounceValue;
}

export function getDivYield(divYield) {
  return divYield ? divYield: '-'; 
}

export function getPayoutRatio(payoutRatio) {
  return payoutRatio ? payoutRatio : '-';
}

export function get5YCAGR(divHistory, historicalPrices, lastPrice) {
  if (divHistory.length >= 20 && historicalPrices.length >= 1250) {
    const totalDivRecieved = divHistory.reduce((acc, currentValue) => {
    return acc += currentValue.value; 
    }, 0)

    const startPrice = historicalPrices[0].adjusted_close;
    const endPrice = lastPrice + totalDivRecieved;
    const annualizedRoR = ((Math.pow((endPrice / startPrice), 1/5) - 1) * 100).toFixed(2) + '%';
    return annualizedRoR;
  } 

  if (historicalPrices.length >= 1250) {
    const startPrice = historicalPrices[0].adjusted_close;
    const endPrice = lastPrice;
    const annualizedRoR = ((Math.pow((endPrice / startPrice), 1/5) - 1) * 100).toFixed(2) + '%';
    return annualizedRoR;
  }

  return '-';
}

export function getDivGrowthRate(divHistory) {
  let startingDivAmount = 0;
  let endingDivAmount = 0;

  if(divHistory.length === 20) {
    for(let i = 0; i < 4; i++) {
      startingDivAmount += divHistory[i].value;
    }
    for (let i = divHistory.length - 4; i < 20; i++){
      endingDivAmount += divHistory[i].value;
    }
    const dividendGrowthRate = ((Math.pow((endingDivAmount / startingDivAmount), 1/5) - 1) * 100).toFixed(2) + '%';
    return dividendGrowthRate;
  }

  if(divHistory.length === 60) {
    for(let i = 0; i < 12; i++) {
      startingDivAmount += divHistory[i].value; 
    }
    for(let i = divHistory.length - 12; i < 60; i++) {
      endingDivAmount += divHistory[i].value;
    }
    const dividendGrowthRate = ((Math.pow((endingDivAmount / startingDivAmount), 1/5) - 1) * 100).toFixed(2) + '%';
    return dividendGrowthRate;
  }

  return '-';
}