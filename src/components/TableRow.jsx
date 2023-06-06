import { getPayOutMonths, get5YCAGR, getDivYield, getDivGrowthYears, getLastPrice, getDivGrowthRate} from '../helpers/TableRow.helper.js';

import { useDebounceValue } from '../helpers/Table.helper.js';
import { useState, useEffect } from 'react';

export default function TableRow({row, assetNum, updateTickerList, updateAllocation}) {

  const [inputValue, setInputValue] = useState('');
  const changeValue = useDebounceValue(inputValue);

  let data;
  if (row.stockName) {
    data = true;
  }
  
  const dataCelldata = [
    'Asset',
    '(%) Allocation',
    'Ticker Symbol',
    'Stock Name',
    'Last Price',
    'Dividend Yield',
    'Payout Months',
    'Dividend Growth',
    '5Y CAGR',
    '5Y Dividend Growth Rate',
  ];

  useEffect(() => {
    if(changeValue.length > 0) {
      updateTickerList(changeValue);
    }
  }, [changeValue])

  return data ? (
    <tr>
      <td data-cell={dataCelldata[0]}>
        <div className="item-wrapper">
          {assetNum}
        </div>
      </td>
      <td data-cell={dataCelldata[1]}>
        <div className="input-wrapper">
          <input type="text" onChange={(ev) =>
          updateAllocation(ev.target.value)
          }/>
        </div>
      </td>
      <td data-cell={dataCelldata[2]}>
        <div className="input-wrapper">
          <input type="text"  value={inputValue} onChange={(ev) => {
            if (ev.target.value.length <= 5) {
              setInputValue(ev.target.value);
            }
          }}/>
        </div>
      </td>
      <td data-cell={dataCelldata[3]}>
        <div className="item-wrapper" id='stockName'>
          {row.stockName}
        </div>
      </td>
      <td data-cell={dataCelldata[4]}>
        <div className="item-wrapper">
          {getLastPrice(row.lastPrice)}
        </div>
      </td>
      <td data-cell={dataCelldata[5]}>
        <div className="item-wrapper">
          {getDivYield(row.divYield)}
        </div>
      </td>
      <td data-cell={dataCelldata[6]}>
        <div className="item-wrapper">
          {getPayOutMonths(row.divDistribution, row.payDate)}
        </div>
      </td>
      <td data-cell={dataCelldata[7]}>
        <div className="item-wrapper">
          {getDivGrowthYears(row.divGrowth)}
        </div>
      </td>
      <td data-cell={dataCelldata[8]}>
        <div className="item-wrapper">
          {get5YCAGR(row.divHistory, row.historicalPrices, row.lastPrice)}
        </div>
      </td>
      <td data-cell={dataCelldata[9]}>
        <div className="item-wrapper">
          {getDivGrowthRate(row.divHistory, row.divRate)}
        </div>
      </td>
    </tr>
  ) : (
    <tr>
      <td data-cell={dataCelldata[0]}>
        <div className="item-wrapper">
          {assetNum}
        </div>
      </td>
      <td data-cell={dataCelldata[1]}>
        <div className="input-wrapper">
          <input type="text" onChange={(ev) =>
          updateAllocation(ev.target.value)
          }/>
        </div>
      </td>
      <td data-cell={dataCelldata[2]}>
        <div className="input-wrapper">
          <input type="text"  value={inputValue} onChange={(ev) => {
            if (ev.target.value.length <= 5) {
              setInputValue(ev.target.value);
            }
          }}/>
        </div>
      </td>
    </tr>
  );
}
