export default function TotalAllocation({totalAllocation}) {
  if (totalAllocation > 100) {
    return (
      <p>
        Total Allocation:
        <span style={{ color: 'red' }}> {totalAllocation}% </span>
        of 100%
      </p>
    );
  }

  return <p>Total Allocation: {totalAllocation}% of 100%</p>;
}