export default function PortfolioDivYield({totalAllocation, portfolioDivYield}) {
  if (totalAllocation === 100) {
    return (
      <div className="footer-content-item">
        <p>Portfolio Dividend Yield:</p>
        <p>{portfolioDivYield}</p>
      </div>
    )
  }

  return (
    <div className="footer-content-item">
      <p>Portfolio Dividend Yield:</p>
    </div>
  )
}