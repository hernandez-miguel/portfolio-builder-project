import { getPayOutMonths, get5YCAGR, getDivYield, getDivGrowthYears, getLastPrice, getDivGrowthRate} from '../helpers/TableRow.helper.js';

export default function TableRow({row, updateTickerList, updateAllocation}) {
  let data = false;
  if (row.stockName && row.lastPrice) {
    data = true;
  }
  
  const dataCelldata = [
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

  return data ? (
    <tr>
      <td data-cell={dataCelldata[0]}>
        <div className="input-wrapper">
          <input type="text" onChange={(ev) =>
          updateAllocation(ev.target.value)
          }/>
        </div>
      </td>
      <td data-cell={dataCelldata[1]}>
        <div className="input-wrapper">
          <input type="text"  onChange={(ev) => {
            if (ev.target.value.length === 4) {
              updateTickerList(ev.target.value);
            }
          }}/>
        </div>
      </td>
      <td data-cell={dataCelldata[2]}>
        <div className="item-wrapper" id='stockName'>
          {row.stockName}
        </div>
      </td>
      <td data-cell={dataCelldata[3]}>
        <div className="item-wrapper">
          {getLastPrice(row.lastPrice)}
        </div>
      </td>
      <td data-cell={dataCelldata[4]}>
        <div className="item-wrapper">
          {getDivYield(row.divYield)}
        </div>
      </td>
      <td data-cell={dataCelldata[5]}>
        <div className="item-wrapper">
          {getPayOutMonths(row.payDate)}
        </div>
      </td>
      <td data-cell={dataCelldata[6]}>
        <div className="item-wrapper">
          {getDivGrowthYears(row.divGrowth)}
        </div>
      </td>
      <td data-cell={dataCelldata[7]}>
        <div className="item-wrapper">
          {get5YCAGR(row.divHistory, row.historicalPrices, row.lastPrice)}
        </div>
      </td>
      <td data-cell={dataCelldata[8]}>
        <div className="item-wrapper">
          {getDivGrowthRate(row.divHistory, row.divRate)}
        </div>
      </td>
    </tr>
  ) : (
    <tr>
      <td data-cell={dataCelldata[0]}>
        <div className="input-wrapper">
          <input type="text"/>
        </div>
      </td>
      <td data-cell={dataCelldata[1]}>
        <div className="input-wrapper">
          <input type="text"  onChange={(ev) => {
            if (ev.target.value.length === 4) {
              updateTickerList(ev.target.value);
            }
          }}/>
        </div>
      </td>
    </tr>
  );
}
