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
    'Asset #:',
    'Allocation (%):',
    'Ticker Symbol:',
    'Stock Name:',
    'Last Price:',
    'Dividend Yield:',
    'Payout Ratio:',
    'Dividend Growth:',
    '5Y CAGR:',
    '5Y Dividend Growth Rate:',
  ];

  return (
    <tr>
      <td>
        <div className="item-wrapper">
          <div className="remove-button">
            <button onClick={() => handleRemoveRow(assetNum - 1)}>
              REMOVE
            </button>
          </div>
        </div>
      </td>
      <td data-cell={dataCelldata[1]}>
        <div className="item-wrapper">
          {assetNum}
        </div>
      </td>
      <td data-cell={dataCelldata[2]}>
        <div className="item-wrapper">
          {row.allocation.toFixed(2) + '%'}
        </div>
      </td>
      <td data-cell={dataCelldata[3]}>
        <div className="item-wrapper">
          {row.ticker.toUpperCase()}
        </div>
      </td>
      <td data-cell={dataCelldata[4]}>
        <div className="item-wrapper" id="stockName">
          {row.name}
        </div>
      </td>
      <td data-cell={dataCelldata[5]}>
        <div className="item-wrapper">
          {'$' + row.lastPrice.toFixed(2)}
        </div>
      </td>
      <td data-cell={dataCelldata[6]}>
        <div className="item-wrapper">
          {row.divYield}
        </div>
      </td>
      <td data-cell={dataCelldata[7]}>
        <div className="item-wrapper">
          {row.payoutRatio}
        </div>
      </td>
      <td data-cell={dataCelldata[8]}>
        <div className="item-wrapper">
          {row.divGrowthYears}
        </div>
      </td>
      <td data-cell={dataCelldata[9]}>
        <div className="item-wrapper">
          {row.cagr5Years}
        </div>
      </td>
      <td data-cell={dataCelldata[10]}>
        <div className="item-wrapper">
          {row.divGrowthRate}
        </div>
      </td>
    </tr>
  )
}
