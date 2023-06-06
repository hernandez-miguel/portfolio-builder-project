import { useState, useEffect } from 'react';
import TableRow from './TableRow';
import TableFooter from './TableFooter.jsx';
import { getCurrentDate, getHistoricalDate } from '../helpers/Table.helper';

export default function Table() {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const controller = new AbortController();

  const [rowData, setRowData] = useState(Array(10).fill({isEmpty: true}));
  const [tickerSymbols, setTickerSymbols] = useState([]);
  const [allocations, setAllocations] = useState([]);

  const date = new Date();
  const currentDate = getCurrentDate(date);
  const historicalDate = getHistoricalDate(date, 5);


  function updateTickerSymbol(rowIndex, newTicker) {
    const copyArr = [...tickerSymbols];
    copyArr.splice(rowIndex, 1, newTicker);
    setTickerSymbols(copyArr);
    setRowData((prevData) => {
      const copy = [...prevData];
      copy[rowIndex].isEmpty = true;
      return copy;
    })
  }

  function updateAllocation(rowIndex, newAllocation) {
    const copyArr = [...allocations];
    copyArr.splice(rowIndex, 1, newAllocation);
    setAllocations(copyArr);
  }

  async function getStockData(rowIndex, tickerSymbol) {
    const urlProfile = `https://seeking-alpha.p.rapidapi.com/symbols/get-profile?symbols=${tickerSymbol}`;
    const urlSummary = `https://seeking-alpha.p.rapidapi.com/symbols/get-summary?symbols=${tickerSymbol}`;
    const urlDivHistory = `https://seeking-alpha.p.rapidapi.com/symbols/get-dividend-history?symbol=${tickerSymbol}&years=5&group_by=year`;
    const urlHistoricalPrices = `https://seeking-alpha.p.rapidapi.com/symbols/get-historical-prices?symbol=${tickerSymbol}&start=${historicalDate}&end=${currentDate}&show_by=day&sort=as_of_date`;

    try {
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'seeking-alpha.p.rapidapi.com',
        },
        signal: controller.signal,
      };
      const firstResponse = await fetch(urlProfile, options);
      const stockProfileData = await firstResponse.json();

      if (stockProfileData.data[0].attributes.companyName) {
        const secondResponse = await fetch(urlSummary, options);
        const stockSummaryData = await secondResponse.json();
        const thirdResponse = await fetch(urlDivHistory, options);
        const stockDividendHitory = await thirdResponse.json();
        const fourthResponse = await fetch(urlHistoricalPrices, options);
        const stockHistoricalPrices = await fourthResponse.json();

        if (stockSummaryData.data[0].attributes.divYield) {
          setRowData((prevState) => {
            const copyArr = [...prevState];
            copyArr.splice(rowIndex, 1, {
              stockName: stockProfileData?.data[0]?.attributes?.companyName,
              lastPrice: stockProfileData?.data[0]?.attributes?.lastDaily.last,
              divYield: stockProfileData?.data[0]?.attributes?.divYield,
              payDate:
                stockSummaryData?.data[0]?.attributes?.dividends[0]?.payDate,
              divGrowth: stockSummaryData?.data[0]?.attributes?.dividendGrowth,
              divRate: stockSummaryData?.data[0]?.attributes?.divRate,
              divHistory: stockDividendHitory?.data,
              historicalPrices: stockHistoricalPrices?.data,
              divDistribution:
                stockSummaryData?.data[0]?.attributes?.divDistribution,
              isEmpty: false
            });
            return copyArr;
          });
        } else {
          setRowData((prevState) => {
            const copyArr = [...prevState];
            copyArr.splice(rowIndex, 1, {
              stockName: stockProfileData?.data[0]?.attributes?.companyName,
              lastPrice: stockProfileData?.data[0]?.attributes?.lastDaily?.last,
              divYield: 'N/A',
              payDate: 'N/A',
              divGrowth: 'N/A',
              divRate: 'N/A',
              divHistory: 'N/A',
              historicalPrices: stockHistoricalPrices?.data,
              divDistribution: 'N/A',
              isEmpty: false
            });
            return copyArr;
          });
        }
      } else {
        setRowData((prevState) => {
          const copyArr = [...prevState];
          copyArr.splice(rowIndex, 1, {
            stockName: 'not found',
            lastPrice: '',
            divYield: '',
            payDate: '',
            divGrowth: '',
            divRate: '',
            divHistory: '',
            historicalPrices: '',
            divDistribution: '',
            isEmpty: false
          });
          return copyArr;
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    for(let i = 0; i < tickerSymbols.length; i++){
      if (rowData[i].isEmpty) {
        getStockData(i, tickerSymbols[i])
      }
    }
    return () => {
      controller.abort();
    };
  }, [tickerSymbols]);

  return (
    <>
      <h1>Stock Portfolio Builder</h1>
      <div className="table-container">
        <table>
          <caption>
            Disclaimer: Past Performance is Not Indicative of Future Results
          </caption>
          <thead>
            <tr>
              <th>Asset</th>
              <th>(%) Allocation</th>
              <th>Ticker Symbol</th>
              <th>Stock Name</th>
              <th>Last Price</th>
              <th>Dividend Yield</th>
              <th>Payout Months</th>
              <th>Dividend Growth</th>
              <th>5Y CAGR</th>
              <th>5Y Dividend Growth Rate</th>
            </tr>
          </thead>
          <tbody>
            {rowData.map((row, rowIndex) => {
              return (
                <TableRow
                  key={rowIndex}
                  assetNum={rowIndex + 1}
                  row={row}
                  tickerSymbol={tickerSymbols[rowIndex]}
                  allocationAmount={allocations[rowIndex]}
                  updateTickerList={(newTicker) =>
                    updateTickerSymbol(rowIndex, newTicker)
                  }
                  updateAllocation={(newAllocation) => {
                    updateAllocation(rowIndex, newAllocation);
                  }}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <TableFooter
        allocations={allocations}
        rowData={rowData}
        setRowData={setRowData}
      />
    </>
  );
}
