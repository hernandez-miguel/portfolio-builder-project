export default function PortfolioDivGrowthRate({totalAllocation, portfolioDivGrowthRate}) {
  if (totalAllocation === 100) {
    return (
      <div className="footer-content-item">
        <p>Portfolio Dividend Growth Rate:</p>
        <p>{portfolioDivGrowthRate}</p>
      </div>
    )
  }

  return (
    <div className="footer-content-item">
      <p>Portfolio Dividend Growth Rate:</p>
    </div>
  )
}