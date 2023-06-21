export default function PriceChangePercent({priceChangePercent}) {
  if(priceChangePercent > 0) {
    return (
      <span style={{ color: 'rgb(0, 255, 0)' }}> {priceChangePercent.toFixed(2)}%</span>
    )
  }
  if (priceChangePercent < 0) {
    return (
      <span style={{ color: 'rgb(255, 0, 0)' }}> {priceChangePercent.toFixed(2)}%</span>
    )
  }

  return (
    {priceChange}
  )
}