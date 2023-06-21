export default function PortfolioCAGR({totalAllocation, portfolioCAGR}) {
  if (totalAllocation === 100) {
    return (
      <p>
         {`Portfolio CAGR: ${portfolioCAGR}`}
      </p>
    )
  }

  return (
    <p>{'Portfolio CAGR:'}</p>
  )
}