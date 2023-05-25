function TableBodyData() {
  const dataCellNames = [
    'target weight',
    'ticker symbol',
    'stock name',
    'payout months',
    'dividend yield',
    'weighted div yield',
    '5y cagr',
    '5y dividend growth',
    'weighted cagr',
    'weighted dividend growth',
  ];

  let counter = 0;
  let rowCounter = 1;
  
  return (
    <>
      {dataCellNames.map((row) => {
        return (
        <tr key = {rowCounter++}>
          {dataCellNames.map((item) => {
            counter++;
            console.log('counter:', counter)
            if (counter < 3) {
              return (
                <td key={item}>
                  <input type="text" />
                </td>
              );
            }
            if (counter === 10) {
              counter = 0;
            }
            return <td key={item}>test</td>;
          })}
        </tr> )
      })}
    </>
  );
}

export default TableBodyData;
