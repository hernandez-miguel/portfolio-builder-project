import { Oval } from 'react-loader-spinner';

export default function LoadingSpinner ({loading}) {
  if (loading) {
    return (
      <button type="submit">
        <Oval
        height={20}
        width={20}
        color="white"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="white"
        strokeWidth={3}
        strokeWidthSecondary={3}
        />
      </button>
    )
  }

  return (
    <button type="submit">
      ADD STOCK
    </button>
  )
}