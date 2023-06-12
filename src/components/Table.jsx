import { useState, useEffect } from 'react';
import TableRow from './TableRow';
import TableFooter from './TableFooter.jsx';
import Modal from './modal';
import { getCurrentDate, getHistoricalDate, getDivYield} from '../helpers/Table.helper';
import { getDivGrowthYears, getPayoutRatio} from '../helpers/Table.helper';
import { get5YCAGR, getDivGrowthRate, errorTypeObj } from '../helpers/Table.helper';
import { getTotalAllocations } from '../helpers/TableFooter.helper';
import {Oval} from 'react-loader-spinner';

export default function Table() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const controller = new AbortController();

  const [rowData, setRowData] = useState([]);
  const [ticker, setTicker] = useState('');
  const [allocation, setAllocation] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errorType, setErrorType] = useState(errorTypeObj);
  const [loading, setLoading] = useState(false);

  const date = new Date();
  const currentDate = getCurrentDate(date);
  const historicalDate = getHistoricalDate(date, 5);
  const totalAllocations = getTotalAllocations(rowData);

  function loadingSpinner(loading) {
    if (loading) {
      return (
        <button type="submit">
          <Oval
          height={20}
          width={20}
          color="white"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="white"
          strokeWidth={3}
          strokeWidthSecondary={3}
          />
        </button>
      )
    }
  
    return (
      <button type="submit">
        ADD STOCK
      </button>
    )
  }

  function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

    setTicker('');
    setAllocation('');

    if(Number(allocation) < 0 || Number(allocation) > 100) {
      setLoading(false)
      setShowModal(true);
      setErrorType((prevData) => ({
        ...prevData,
        notInRange: true,
      }))
      return;
    }

    if(!ticker || !allocation) {
      setLoading(false)
      setShowModal(true);
      setErrorType((prevData) => ({
        ...prevData,
        emptyInputs: true,
      }))
      return;
    }
    
    if (totalAllocations >= 100) {
      setLoading(false)
      setShowModal(true);
      setErrorType((prevData) => ({
        ...prevData,
        overMaximumAllocation: true,
      }))
      return;
    }

    if(rowData.length > 0) {
      for(let i = 0; i < rowData.length; i++) {
        if(ticker === rowData[i].ticker){
          setLoading(false)
          setShowModal(true);
          setErrorType((prevData) => ({
            ...prevData,
            duplicates: true,
          }))
          return;
        }
      }
    }

    async function getStockData(tickerSymbol) {
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'seeking-alpha.p.rapidapi.com',
        },
        signal: controller.signal,
      };

      const urlProfile = `https://seeking-alpha.p.rapidapi.com/symbols/get-profile?symbols=${tickerSymbol}`;
      const urlSummary = `https://seeking-alpha.p.rapidapi.com/symbols/get-summary?symbols=${tickerSymbol}`;
      const urlDivHistory = `https://seeking-alpha.p.rapidapi.com/symbols/get-dividend-history?symbol=${tickerSymbol}&years=5&group_by=year`;
      const urlHistoricalPrices = `https://seeking-alpha.p.rapidapi.com/symbols/get-historical-prices?symbol=${tickerSymbol}&start=${historicalDate}&end=${currentDate}&show_by=day&sort=as_of_date`;
      
      try {
        const firstResponse = await fetch(urlProfile, options);
        const stockProfileData = await firstResponse.json();

        const companyName = stockProfileData.data[0].attributes.companyName;

        if (companyName) {
          const secondResponse = await fetch(urlSummary, options);
          const stockSummaryData = await secondResponse.json();
          const thirdResponse = await fetch(urlDivHistory, options);
          const stockDividendHitory = await thirdResponse.json();
          const fourthResponse = await fetch(urlHistoricalPrices, options);
          const stockHistoricalPrices = await fourthResponse.json();   
          
          const lastPrice = stockProfileData.data[0].attributes.lastDaily.last;
          const divYield =  stockProfileData.data[0].attributes.divYield;
          const payoutRatio = stockSummaryData.data[0].attributes.payoutRatio;
          const divGrowthYears = stockSummaryData.data[0].attributes.dividendGrowth;
          const annualPayout = stockSummaryData.data[0].attributes.divRate;
          const divHistory = stockDividendHitory.data;
          const historicalPrices = stockHistoricalPrices.data;

          setRowData((prevData) => {
            const copyState = [...prevData];
            return([...copyState, {
              ticker: ticker, 
              allocation: Number(allocation),
              name: companyName,
              lastPrice: lastPrice,
              divYield: getDivYield(divYield),
              payoutRatio: getPayoutRatio(payoutRatio),
              divGrowthYears: getDivGrowthYears(divGrowthYears, annualPayout),
              cagr5Years: get5YCAGR(divHistory, historicalPrices, lastPrice),
              divGrowthRate: getDivGrowthRate(divHistory, annualPayout)
            }]);
          });
        } else {
          setShowModal(true);
          setErrorType((prevData) => ({
            ...prevData,
            tickerNotFound: true,
          }))
          throw new Error (`Ticker symbol (${ticker}) not found`);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    
    getStockData(ticker);
  }

  return (
    <>
      <h1>Stock Portfolio Builder</h1>
        <div className="input-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="stockTickerInput"
              id="stockTickerInput"
              placeholder='Ticker Symbol'
              value={ticker}
              onChange={(ev) => {setTicker(ev.target.value)}}
            />
            <input
              type='number'
              step={0.01}
              name="allocationInput"
              id="allocationInput"
              placeholder='Allocation'
              value={allocation}
              onChange={(ev) => {setAllocation(ev.target.value)}}
            />
            {loadingSpinner(loading)}
          </form>
        </div>
      <div className="table-container">
        <table>
          <caption>
            Disclaimer: Past Performance is Not Indicative of Future Results
          </caption>
          <thead>
            <tr>
              <th> </th>
              <th>Asset #</th>
              <th>Allocation (%)</th>
              <th>Ticker Symbol</th>
              <th>Stock Name</th>
              <th>Last Price</th>
              <th>Dividend Yield</th>
              <th>Payout Ratio</th>
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
                  setRowData={setRowData}
                  tickerSymbol={row.ticker}
                  allocationAmount={row.allocation}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      {rowData.length > 0 &&
        <TableFooter
          rowData={rowData}
        />
      }
      {showModal && 
        <Modal 
          errorType={errorType} 
          setErrorType={setErrorType} 
          setShowModal={setShowModal}
        />
      }
    </>
  )
}
