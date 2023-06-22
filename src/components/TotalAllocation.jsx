export default function TotalAllocation({totalAllocation}) {
  if (totalAllocation > 100) {
    return (
      <div className="footer-content-item">
        <p>Total Allocation:</p>
        <p>
          <span style={{ color: 'red' }}>{totalAllocation}% </span>
          of 100%
        </p>
      </div>
    );
  }

  return (
    <div className="footer-content-item">
      <p>Total Allocation:</p>
      <p>{`${totalAllocation}% of 100%`}</p>
    </div>
  )
}
