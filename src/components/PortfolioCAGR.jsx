export default function PortfolioCAGR({totalAllocation, portfolioCAGR}) {
  if (totalAllocation === 100) {
    return (
      <div className="footer-content-item">
        <p>Portfolio CAGR:</p>
        <p>{portfolioCAGR}</p>
      </div>
    )
  }

  return (
    <div className="footer-content-item">
      <p>Portfolio CAGR:</p>
    </div>
  )
}