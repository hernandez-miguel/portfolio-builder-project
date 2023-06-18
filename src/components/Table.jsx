import { useState, useEffect } from 'react';
import TableRow from './TableRow';
import TableFooter from './TableFooter.jsx';
import Modal from './modal';
import { getCurrentDate, getHistoricalDate, getDivYield} from '../helpers/Table.helper';
import { getPayoutRatio} from '../helpers/Table.helper';
import { get5YCAGR, getDivGrowthRate, errorTypeObj } from '../helpers/Table.helper';
import { getTotalAllocations } from '../helpers/TableFooter.helper';
import {Oval} from 'react-loader-spinner';

const date = new Date();
const currentDate = getCurrentDate(date);
const historicalDate = getHistoricalDate(date, 5);

export default function Table() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  
  const [rowData, setRowData] = useState([]);
  const [ticker, setTicker] = useState('');
  const [allocation, setAllocation] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errorType, setErrorType] = useState(errorTypeObj);
  const [loading, setLoading] = useState(false);
  
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
      const urlFundamentalData = `https://eodhistoricaldata.com/api/fundamentals/${tickerSymbol}.US?fmt=json&&api_token=${API_KEY}`;
      const urlDelayedPrice = `https://eodhistoricaldata.com/api/real-time/${tickerSymbol}.US?fmt=json&&api_token=${API_KEY}`;
      const urlDivHistory = `https://eodhistoricaldata.com/api/div/${tickerSymbol}.US?from=${historicalDate}&to=${currentDate}&period=d&fmt=json&&api_token=${API_KEY}`
      const urlHistoricalPrices = `https://eodhistoricaldata.com/api/eod/${tickerSymbol}.US?from=${historicalDate}&to=${currentDate}&period=d&fmt=json&&api_token=${API_KEY}`;
      
      
      try {
        const firstResponse = await fetch(urlFundamentalData);
        const stockFundamentalData = await firstResponse.json();
        
        console.log(stockFundamentalData);

        const stockName = stockFundamentalData.General.Name;
        const stockType =  stockFundamentalData.General.Type;
        
        if (stockName && stockType === 'Common Stock') {
          const secondResponse = await fetch(urlDelayedPrice);
          const stockDelayedPrice = await secondResponse.json();
          const thirdResponse = await fetch(urlDivHistory);
          const stockDividendHitory = await thirdResponse.json();
          const fourthResponse = await fetch(urlHistoricalPrices);
          const stockHistoricalPrices = await fourthResponse.json();   

          console.log(stockDividendHitory);
          console.log(stockHistoricalPrices);
          
          const lastPrice = stockDelayedPrice.close;
          const change = stockDelayedPrice.change.toFixed(2);
          const changePercent = stockDelayedPrice.change_p.toFixed(2) + '%';
          const divYield = stockFundamentalData.SplitsDividends.ForwardAnnualDividendYield;
          const payoutRatio = stockFundamentalData.SplitsDividends.PayoutRatio;
          const annualPayout = stockFundamentalData.SplitsDividends.ForwardAnnualDividendRate;
          const divHistory = stockDividendHitory;
          const historicalPrices = stockHistoricalPrices

          setRowData((prevData) => {
            const copyState = [...prevData];
            return([...copyState, {
              ticker: ticker, 
              allocation: Number(allocation),
              name: stockName,
              lastPrice: lastPrice,
              change: change,
              changePercent: changePercent,
              divYield: getDivYield(divYield),
              payoutRatio: getPayoutRatio(payoutRatio),
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
              <th>Last Price (Delayed)</th>
              <th>Change</th>
              <th>Change (%)</th>
              <th>Dividend Yield</th>
              <th>Payout Ratio</th>
              <th>5Y Dividend Growth Rate</th>
              <th>5Y CAGR</th>
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
