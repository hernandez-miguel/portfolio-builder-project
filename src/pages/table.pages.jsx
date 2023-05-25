import { useState } from 'react';
import TableBodyData from '../components/TableBodyData';

function TablePage() {
  return (
    <>
      <h1>Portfolio Builder</h1>
      <form action="">
        <table>
          <caption>Stock Portfolio</caption>
          <thead>
            <tr>
              <th>Target Weight(%)</th>
              <th>Ticker Symbol</th>
              <th>Stock Name</th>
              <th>Payout Months</th>
              <th>Dividend Yield</th>
              <th>Weighted Div Yield</th>
              <th>5Y CAGR</th>
              <th>5Y Dividend Growth</th>
              <th>Weighted CAGR</th>
              <th>Weighted Dividend Growth</th>
            </tr>
          </thead>
          <tbody>
            <TableBodyData />
          </tbody>
        </table>
      </form>
    </>
  );
}

export default TablePage;
