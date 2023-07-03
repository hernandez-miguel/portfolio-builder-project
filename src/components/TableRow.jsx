export default function TableRow({row, setRowData, assetNum}) {
  
  function handleRemoveRow(index) {
    setRowData((prevData) => {
      const copyState = [...prevData];
      copyState.splice(index, 1);
      return copyState;
    })
  }

  const dataCellData = [
    'Asset:',
    'Allocation:',
    'Ticker:',
    'Stock Name:',
    'Last Price:',
    'Dividend Yield:',
    'Payout Ratio:',
    '5Y Total Return:',
    '5Y DGR:',
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
      <td data-cell={dataCellData[0]}>
        <div className="item-wrapper">
          <p>{assetNum}</p>
        </div>
      </td>
      <td data-cell={dataCellData[1]}>
        <div className="item-wrapper">
          <p>{row.allocation.toFixed(2) + '%'}</p>
        </div>
      </td>
      <td data-cell={dataCellData[2]}>
        <div className="item-wrapper">
          <p>{row.ticker.toUpperCase()}</p>
        </div>
      </td>
      <td data-cell={dataCellData[3]}>
        <div className="item-wrapper" id="stockName">
          <p>{row.name}</p>
        </div>
      </td>
      <td data-cell={dataCellData[4]}>
        <div className="item-wrapper">
          <p>{'$' + row.lastPrice.toFixed(2)}</p>
        </div>
      </td>
      <td data-cell={dataCellData[5]}>
        <div className="item-wrapper">
          <p>{row.divYield}</p>
        </div>
      </td>
      <td data-cell={dataCellData[6]}>
        <div className="item-wrapper">
          <p>{row.payoutRatio}</p>
        </div>
      </td>
      <td data-cell={dataCellData[7]}>
        <div className="item-wrapper">
          <p>{row.totalReturn}</p>
        </div>
      </td>
      <td data-cell={dataCellData[8]}>
        <div className="item-wrapper">
          <p>{row.divGrowthRate}</p>
        </div>
      </td>
      <td data-cell={dataCellData[9]}>
        <div className="item-wrapper">
          <p>{row.cagr5Years}</p>
        </div>
      </td>
    </tr>
  )
}
