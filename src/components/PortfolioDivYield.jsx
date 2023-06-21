export default function PortfolioDivYield({totalAllocation, portfolioDivYield}) {
  if (totalAllocation === 100) {
    return (
      <p>
         {`Portfolio Dividend Yield: ${portfolioDivYield}`}
      </p>
    )
  }

  return (
    <p>{'Portfolio Dividend Yield:'}</p>
  )
}