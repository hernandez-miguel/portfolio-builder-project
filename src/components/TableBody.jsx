import { useState } from 'react';
import TableRow from './TableRow';

export default function TableBody() {
  const API_KEY = '9a0013c808msh18c4d0d0abefb0fp1b1c1ajsnbde9fbcb0b68';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': `${API_KEY}`,
      'X-RapidAPI-Host': 'seeking-alpha.p.rapidapi.com',
    },
  };

  const [rowData, setRowData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
  const [tickerSymbols, setTickerSymbols] = useState([]);
  
  const date = new Date();
  let currentDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  let historicalDate = `${date.getFullYear() - 5}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  function updateTickerSymbol(rowIndex, newTicker) {
    const copyArr = [...tickerSymbols];
    copyArr.splice(rowIndex, 1, newTicker);
    setTickerSymbols(copyArr);

    if (newTicker.length === 4) {
      getStockData(rowIndex, newTicker);
    }
  }

  async function getStockData(rowIndex, tickerSymbol) {
    const urlProfile = `https://seeking-alpha.p.rapidapi.com/symbols/get-profile?symbols=${tickerSymbol}`;
    const urlSummary = `https://seeking-alpha.p.rapidapi.com/symbols/get-summary?symbols=${tickerSymbol}`;
    const urlDivHistory = `https://seeking-alpha.p.rapidapi.com/symbols/get-dividend-history?symbol=${tickerSymbol}&years=5&group_by=year`;
    const urlHistoricalPrices = `https://seeking-alpha.p.rapidapi.com/symbols/get-historical-prices?symbol=${tickerSymbol}&start=${historicalDate}&end=${currentDate}&show_by=day&sort=as_of_date`;

    try {
      const firstResponse = await fetch(urlProfile, options);
      const stockProfileData = await firstResponse.json();
      const secondResponse = await fetch(urlSummary, options);
      const stockSummaryData = await secondResponse.json();
      const thirdResponse = await fetch(urlDivHistory, options);
      const stockDividendHitory = await thirdResponse.json();
      const fourthResponse = await fetch(urlHistoricalPrices, options);
      const stockHistoricalPrices = await fourthResponse.json();

      if (stockSummaryData.data[0].attributes.divYield !== null) {
        const copyArr = [...rowData];
        copyArr.splice(rowIndex, 1, {
          stockName: stockProfileData.data[0].attributes.companyName,
          lastPrice: stockProfileData.data[0].attributes.lastDaily.last,
          divYield: stockProfileData.data[0].attributes.divYield,
          payDate: stockSummaryData.data[0].attributes.dividends[0].payDate,
          divGrowth: stockSummaryData.data[0].attributes.dividendGrowth,
          divRate: stockSummaryData.data[0].attributes.divRate,
          divHistory: stockDividendHitory.data,
          historicalPrices: stockHistoricalPrices.data
        });
        setRowData(copyArr);
      } else {
        const copyArr = [...rowData];
        copyArr.splice(rowIndex, 1, {
          stockName: stockProfileData.data[0].attributes.companyName,
          lastPrice: stockProfileData.data[0].attributes.lastDaily.last,
          divYield: '',
          payDate: '',
          divGrowth: '',
          divRate: '',
          divHistory: '',
          historicalPrices: stockHistoricalPrices.data
        });
        setRowData(copyArr);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {rowData.map((row, rowIndex) => {
        return (
          <TableRow
            key={rowIndex}
            row={row}
            tickerSymbol={tickerSymbols[rowIndex]}
            updateTickerList={(newTicker) => updateTickerSymbol(rowIndex, newTicker)}
          />
        );
      })}
    </>
  );
}
