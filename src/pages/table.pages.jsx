import TableBody from '../components/TableBody.jsx';
import TableFooter from '../components/TableFooter.jsx';
import './style.css';

function TablePage() {
  return (
    <>
      <h1>Stock Portfolio Builder</h1>
      <div className="table-container">
        <table>
          <caption>Disclaimer: Past Performance is Not Indicative of Future Results</caption>
          <thead>
            <tr>
              <th>(%) Allocation</th>
              <th>Ticker Symbol</th>
              <th>Stock Name</th>
              <th>Last Price</th>
              <th>Dividend Yield</th>
              <th>Payout Months</th>
              <th>Dividend Growth</th>
              <th>5Y CAGR</th>
              <th>5Y Dividend Growth Rate</th>
            </tr>
          </thead>
          <tbody>
            <TableBody />
          </tbody>
        </table>
        <TableFooter />
      </div>
    </>
  );
}

export default TablePage;
