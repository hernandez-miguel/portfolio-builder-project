function TableBodyData() {
  const dataCellNames = [
    '(%) Allocation',
    'Ticker Symbol',
    'Stock Name',
    'Payout Months',
    'Dividend Yield',
    '5y CAGR',
    '5y Dividend growth',
  ];

  let counter = 0;
  let rowCounter = 1;
  
  return (
    <>
      {dataCellNames.map((row) => {
        return (
        <tr key={rowCounter++}>
          {dataCellNames.map((item) => {
            counter++;
            if (counter < 3) {
              return (
                <td key={item} data-cell={item}>
                  <input type="text" />
                </td>
              );
            }
            if (counter === 7) {
              counter = 0;
            }
            return <td key={item} data-cell={item}>-</td>
          })}
        </tr> )
      })}
    </>
  );
}

export default TableBodyData;
