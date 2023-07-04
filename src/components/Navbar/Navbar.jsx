import PropTypes from 'prop-types';
import './Navbar.scss';

const Navbar = ({ setCurrentComponent }) => {

  Navbar.propTypes = {
    setCurrentComponent: PropTypes.func.isRequired,
  };
  
  const handleButtonClick = (componentName) => {
    setCurrentComponent(componentName);
  };

  return (
    <nav className="navbar">
      <ul className="navbar_list">
      <li className="navbar_item">
          <button onClick={() => handleButtonClick('dashboard')}>Dashboard</button>
        </li>
        <li className="navbar_item">
          <button onClick={() => handleButtonClick('items')}>Items</button>
        </li>
        <li className="navbar_item">
          <button onClick={() => handleButtonClick('suppliers')}>Suppliers</button>
        </li>
        <li className="navbar_item">
          <button onClick={() => handleButtonClick('priceReductions')}>Price Reductions</button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
