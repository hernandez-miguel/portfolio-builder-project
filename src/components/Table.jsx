import { useState } from 'react';
import TableRow from './TableRow';
import TableFooter from './TableFooter.jsx';
import Modal from './Modal';
import LoadingSpinner from './LoadingSpinner';
import { getCurrentDate, getHistoricalDate, getDivYield } from '../helpers/Table.helper';
import { getPayoutRatio, getStartYear, getEndYear } from '../helpers/Table.helper';
import { get5YCAGR, getDivGrowthRate, errorTypeObj } from '../helpers/Table.helper';
import { getTotalReturn } from '../helpers/Table.helper';
import { getTotalAllocations} from '../helpers/TableFooter.helper';

const date = new Date();
const currentDate = getCurrentDate(date);
const historicalDate = getHistoricalDate(date, 5);
const startYear = getStartYear(date, 6);
const endYear = getEndYear(date);

export default function Table() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  
  const [rowData, setRowData] = useState([]);
  const [ticker, setTicker] = useState('');
  const [allocation, setAllocation] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errorType, setErrorType] = useState(errorTypeObj);
  const [loading, setLoading] = useState(false);
  
  const totalAllocations = getTotalAllocations(rowData);

  function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

    setTicker('');
    setAllocation('');

    if(!ticker || !allocation) {
      setLoading(false)
      setShowModal(true);
      setErrorType((prevData) => ({
        ...prevData,
        emptyInputs: true,
      }))
      return;
    }

    if(Number(allocation) <= 0 || Number(allocation) > 100) {
      setLoading(false)
      setShowModal(true);
      setErrorType((prevData) => ({
        ...prevData,
        notInRange: true,
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
      const urlDgrHistory = `https://eodhistoricaldata.com/api/div/${tickerSymbol}.US?from=${startYear}&to=${endYear}&period=d&fmt=json&&api_token=${API_KEY}`
      const urlHistoricalPrices = `https://eodhistoricaldata.com/api/eod/${tickerSymbol}.US?from=${historicalDate}&to=${currentDate}&period=d&fmt=json&&api_token=${API_KEY}`;
      
      try {
        const firstResponse = await fetch(urlFundamentalData);
        const stockFundamentalData = await firstResponse.json();
      
        const stockName = stockFundamentalData.General.Name;
        const stockType =  stockFundamentalData.General.Type;
        
        const secondResponse = await fetch(urlDelayedPrice);
        const stockDelayedPrice = await secondResponse.json();
        const lastPrice = stockDelayedPrice.close;
        
        if (stockName && lastPrice !== 'NA') {
          const thirdResponse = await fetch(urlDgrHistory);
          const fourthResponse = await fetch(urlHistoricalPrices);
          
          const dgrHistory = await thirdResponse.json();
          const historicalPrices = await fourthResponse.json(); 
        
          if(stockType === 'Common Stock') {
            const divYield = stockFundamentalData.SplitsDividends.ForwardAnnualDividendYield;
            const payoutRatio = stockFundamentalData.SplitsDividends.PayoutRatio;

            setRowData((prevData) => {
              const copyState = [...prevData];
              return([...copyState, {
                ticker: ticker, 
                allocation: Number(allocation),
                name: stockName,
                lastPrice: lastPrice,
                divYield: getDivYield(divYield, stockType),
                payoutRatio: getPayoutRatio(payoutRatio),
                totalReturn: getTotalReturn(historicalPrices),
                cagr5Years: get5YCAGR(historicalPrices),
                divGrowthRate: getDivGrowthRate(dgrHistory)
              }]);
            });
          }

          if(stockType === 'ETF') {
            const divYield = stockFundamentalData.ETF_Data.Yield;

            setRowData((prevData) => {
              const copyState = [...prevData];
              return([...copyState, {
                ticker: ticker, 
                allocation: Number(allocation),
                name: stockName,
                lastPrice: lastPrice,
                divYield: getDivYield(divYield, stockType),
                payoutRatio: '-',
                totalReturn: getTotalReturn(historicalPrices),
                cagr5Years: get5YCAGR(historicalPrices),
                divGrowthRate: getDivGrowthRate(dgrHistory)
              }]);
            });
          }
          
          if(stockType === 'FUND') {

            setRowData((prevData) => {
              const copyState = [...prevData];
              return([...copyState, {
                ticker: ticker, 
                allocation: Number(allocation),
                name: stockName,
                lastPrice: lastPrice,
                divYield: '-',
                totalReturn: getTotalReturn(historicalPrices),
                payoutRatio: '-',
                cagr5Years: get5YCAGR(historicalPrices),
                divGrowthRate: getDivGrowthRate(dgrHistory)
              }]);
            });
          }
        } else {
          setShowModal(true);
          setErrorType((prevData) => ({
            ...prevData,
            tickerNotFound: true,
          }))
          throw new Error ('Ticker not found');
        }
      } catch (err) {
        setShowModal(true);
        setErrorType((prevData) => ({
          ...prevData,
          failedFetch: true,
        }))
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
            placeholder='Ticker'
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
          < LoadingSpinner loading={loading}/>
        </form>
      </div>
      <div className='disclaimer-container'>
        <p>
          Disclaimer: Past Performance is Not Indicative of Future Results
        </p>
      </div>
      <div className="table-container">
        <table>
          {rowData.length > 0 && 
            <thead>
              <tr>
                <th> </th>
                <th>Asset</th>
                <th>Allocation(%)</th>
                <th>Ticker</th>
                <th>Name</th>
                <th>Last Price</th>
                <th>Div. Yield</th>
                <th>Payout Ratio</th>
                <th>5Y Total Return</th>
                <th>5Y DGR</th>
                <th>5Y CAGR</th>
              </tr>
            </thead>
          }
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
