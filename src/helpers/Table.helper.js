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

export function getDivYield(divYield, stockType) {
  if(divYield && stockType === 'Common Stock') {
    return (divYield * 100).toFixed(2) + '%';
  }

  if(divYield && stockType === 'ETF') {
    return Number(divYield).toFixed(2) + '%';
  }

  if(divYield && stockType === 'FUND') {
    return (Number(divYield) * 100).toFixed(2) + '%';
  }

  return '-';
}

export function getPayoutRatio(payoutRatio) {
  return payoutRatio ? (payoutRatio * 100).toFixed(2) + '%' : '-';
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
  console.log(divHistory);
  if(divHistory.length >= 20) {
    let startingDivAmount = 0;
    let endingDivAmount = 0;

    const date = new Date();
    const startYear = String(date.getFullYear() - 5);
    const endYear = String(date.getFullYear() - 1);

    for(let i = 0; i < divHistory.length; i++) {
      if(divHistory[i].date.slice(0, 4) === startYear) {
        startingDivAmount += divHistory[i].value;
      }

      if(divHistory[i].date.slice(0, 4) === endYear) {
        endingDivAmount += divHistory[i].value;
      }
    }

    const dividendGrowthRate = ((Math.pow((endingDivAmount / startingDivAmount), 1/5) - 1) * 100).toFixed(2) + '%';
    return dividendGrowthRate;
  }

  return '-';
}