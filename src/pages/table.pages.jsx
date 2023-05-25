import { useState } from 'react';
import TableBodyData from '../components/TableBodyData';
import './style.css';

function TablePage() {
  return (
    <>
      <h1>Responsive Tables</h1>
      <div className="table-container">
        <form action="">
          <table>
            <caption>Stock Portfolio Builder</caption>
            <thead>
              <tr>
                <th>(%) Allocation</th>
                <th>Ticker Symbol</th>
                <th>Stock Name</th>
                <th>Payout Months</th>
                <th>Dividend Yield</th>
                <th>5Y CAGR</th>
                <th>5Y Dividend Growth</th>
              </tr>
            </thead>
            <tbody>
              <TableBodyData />
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
}

export default TablePage;
