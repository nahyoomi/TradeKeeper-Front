import { useDispatch } from "react-redux";
import { setCurrentComponent } from "../../redux/global/globalSlider";
import PropTypes from "prop-types";
import "./Navbar.scss";

const Navbar = () => {
  const dispatch = useDispatch();

  Navbar.propTypes = {
    setCurrentComponent: PropTypes.func.isRequired,
  };

  const handleButtonClick = (componentName) => {
    dispatch(setCurrentComponent(componentName));
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <button
            className="navbar-item-btn"
            onClick={() => handleButtonClick("dashboard")}
          >
            Dashboard
          </button>
        </li>
        <li className="navbar-item">
          <button
            className="navbar-item-btn"
            onClick={() => handleButtonClick("items")}
          >
            Items
          </button>
        </li>
        <li className="navbar-item">
          <button
            className="navbar-item-btn"
            onClick={() => handleButtonClick("createItem")}
          >
            Create Item
          </button>
        </li>
        <li className="navbar-item">
          <button
            className="navbar-item-btn"
            onClick={() => handleButtonClick("suppliers")}
          >
            Suppliers
          </button>
        </li>
        <li className="navbaritem">
          <button
            className="navbar-item-btn"
            onClick={() => handleButtonClick("priceReductions")}
          >
            Price Reductions
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;