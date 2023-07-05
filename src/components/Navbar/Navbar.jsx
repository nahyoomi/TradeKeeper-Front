import { useState } from 'react';
import PropTypes from 'prop-types';
import './Navbar.scss';
import DropDown from '../DropDown/DropDown';

const Navbar = ({ setCurrentComponent }) => {
  const [activeButton, setActiveButton] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  Navbar.propTypes = {
    setCurrentComponent: PropTypes.func.isRequired,
  };
  
  const handleButtonClick = (componentName) => {
    setActiveButton(componentName);
    setCurrentComponent(componentName);
  };


  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="navbar">
      <ul className="navbar_list">
      <li className="navbar_item">
          <button className="navbar_item_btn" onClick={() => handleButtonClick('dashboard')}>Dashboard</button>
        </li>
        <li className="navbar_item">
          <button className={`navbar_item_btn ${activeButton === 'items' ? 'active' : ''}`} onClick={() => handleButtonClick('items')}>Items</button>
          <button onClick={toggleDropdown}><span>X</span></button>
          {showDropdown && ( <DropDown/>)}
        </li>
        <li className="navbar_item">
        <button className={`navbar_item_btn ${activeButton === 'suppliers' ? 'active' : ''}`} onClick={toggleDropdown}>Suppliers</button>
{/*         <button onClick={toggleDropdown}><span>X</span></button>
          {showDropdown && ( <DropDown/>)} */}
        </li>
        <li className="navbar_item">
        <button className={`navbar_item_btn ${activeButton === 'priceReductions' ? 'active' : ''}`} onClick={toggleDropdown}>Price Reductions</button>
{/*         <button onClick={toggleDropdown}><span>X</span></button>
          {showDropdown && ( <DropDown/>)} */}
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
