export default function PriceChange({priceChange}) {
  if(priceChange > 0) {
    return (
      <span style={{ color: 'rgb(0, 255, 0)' }}> {priceChange.toFixed(2)}</span>
    )
  }
  if (priceChange < 0) {
    return (
      <span style={{ color: 'rgb(255, 0, 0)' }}> {priceChange.toFixed(2)}</span>
    )
  }

  return (
    {priceChange}
  )
}