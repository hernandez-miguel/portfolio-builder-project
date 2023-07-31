import '../styles/Modal.css';

export default function Modal({errorType, setErrorType, setShowModal}) {

  function handleClick() {
    setShowModal(false);
    setErrorType((prevData) => ({
      ...prevData,
      tickerNotFound: false,
      overMaximumAllocation: false,
      emptyInputs: false,
      notInRange: false,
      duplicates: false,
      failedFetch: false,
    }))
  }

  function errorMessage(errorTypeObj){
    if(errorTypeObj.tickerNotFound) {
      return (
        <p>
          Ticker symbol not found or has been delisted
        </p>
      )
    }
    if(errorTypeObj.overMaximumAllocation) {
      return (
        <p>
          Total allocation is at or above 100%
        </p>
      )
    } 
    if(errorTypeObj.emptyInputs) {
      return <p>Ticker symbol and allocation must be filled out</p>
    }
    if(errorTypeObj.notInRange) {
      return <p>Please enter a number between 0-100</p>
    }
    if(errorTypeObj.duplicates) {
      return <p>Ticker is already in list</p>
    }
    if(errorTypeObj.failedFetch) {
      return <p>Failed to fetch data</p>
    }
  }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <h1>Error:</h1>
          <div className="body">
              {errorMessage(errorType)}
          </div>
          <div className="modalFooter">
            <button id='modalButton' onClick={handleClick}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}