export default function PortfolioDivGrowthRate({totalAllocation, portfolioDivGrowthRate}) {
  if (totalAllocation === 100) {
    return (
      <p>
         {`Portfolio Dividend Growth Rate: ${portfolioDivGrowthRate}`}
      </p>
    )
  }

  return (
    <p>{'Portfolio Dividend Growth Rate:'}</p>
  )
}