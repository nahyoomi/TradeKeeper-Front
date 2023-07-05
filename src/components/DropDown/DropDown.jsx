import './DropDown.scss';

const DropDown = () => {

  return (
    <div className="dropdown_content">
        <button onClick={() => handleButtonClick('priceReductions')}>
        Create Item
        </button>
        <button onClick={() => handleButtonClick('priceReductions')}>
        Update Item
        </button>
        <button onClick={() => handleButtonClick('priceReductions')}>
        Deactivate Item
        </button>
    </div>
  )
}

export default DropDown
