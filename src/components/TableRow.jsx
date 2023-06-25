import PriceChange from "./PriceChange";
import PriceChangePercent from "./PriceChangePercent";

export default function TableRow({row, setRowData, assetNum}) {
  
  function handleRemoveRow(index) {
    setRowData((prevData) => {
      const copyState = [...prevData];
      copyState.splice(index, 1);
      return copyState;
    })
  }

  const dataCelldata = [
    '',
    'Asset:',
    'Allocation:',
    'Ticker Symbol:',
    'Stock Name:',
    'Last Price:',
    'Price Change:',
    'Price Change(%):',
    'Dividend Yield:',
    'Payout Ratio:',
    '5Y Div. Growth Rate:',
    '5Y CAGR:',
  ];

  return (
    <tr>
      <td>
        <div className="remove-button">
          <button onClick={() => handleRemoveRow(assetNum - 1)}>
            REMOVE
          </button>
        </div>
      </td>
      <td data-cell={dataCelldata[1]}>
        <div className="item-wrapper">
          <p>{assetNum}</p>
        </div>
      </td>
      <td data-cell={dataCelldata[2]}>
        <div className="item-wrapper">
          <p>{row.allocation.toFixed(2) + '%'}</p>
        </div>
      </td>
      <td data-cell={dataCelldata[3]}>
        <div className="item-wrapper">
          <p>{row.ticker.toUpperCase()}</p>
        </div>
      </td>
      <td data-cell={dataCelldata[4]}>
        <div className="item-wrapper" id="stockName">
          <p>{row.name}</p>
        </div>
      </td>
      <td data-cell={dataCelldata[5]}>
        <div className="item-wrapper">
          <p>{'$' + row.lastPrice.toFixed(2)}</p>
        </div>
      </td>
      <td data-cell={dataCelldata[6]}>
        <div className="item-wrapper">
          <p><PriceChange priceChange={row.change}/></p>
        </div>
      </td>
      <td data-cell={dataCelldata[7]}>
        <div className="item-wrapper">
          <p>
            <PriceChangePercent priceChangePercent={row.changePercent}/>
          </p>
        </div>
      </td>
      <td data-cell={dataCelldata[8]}>
        <div className="item-wrapper">
          <p>{row.divYield}</p>
        </div>
      </td>
      <td data-cell={dataCelldata[9]}>
        <div className="item-wrapper">
          <p>{row.payoutRatio}</p>
        </div>
      </td>
      <td data-cell={dataCelldata[10]}>
        <div className="item-wrapper">
          <p>{row.divGrowthRate}</p>
        </div>
      </td>
      <td data-cell={dataCelldata[11]}>
        <div className="item-wrapper">
          <p>{row.cagr5Years}</p>
        </div>
      </td>
    </tr>
  )
}
