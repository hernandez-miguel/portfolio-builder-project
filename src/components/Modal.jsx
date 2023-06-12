import './Modal.css';

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
    }))
  }

  function errorMessage(errorTypeObj){
    if(errorTypeObj.tickerNotFound) {
      return <p>Ticker symbol not found</p>
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
      return <p>Please enter a number between 1-100</p>
    }
    if(errorTypeObj.duplicates) {
      return <p>Ticker is already in list</p>
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