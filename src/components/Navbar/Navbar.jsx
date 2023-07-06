import { useDispatch } from "react-redux";
import { setCurrentComponent } from "../../redux/global/globalSlider";
import "./Navbar.scss";
import { HiOutlineViewGridAdd, HiArchive, HiPencilAlt, HiUsers, HiColorSwatch } from "react-icons/hi";

const Navbar = () => {
  const dispatch = useDispatch();

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
            <HiOutlineViewGridAdd/> Dashboard
          </button>
        </li>
        <li className="navbar-item">
          <button
            className="navbar-item-btn"
            onClick={() => handleButtonClick("items")}
          >
           <HiArchive/> Items
          </button>
        </li>
        <li className="navbar-item">
          <button
            className="navbar-item-btn"
            onClick={() => handleButtonClick("createItem")}
          >
           <HiPencilAlt/> Create Item
          </button>
        </li>
        <li className="navbar-item">
          <button
            className="navbar-item-btn"
            onClick={() => handleButtonClick("suppliers")}
          >
           <HiUsers/> Suppliers
          </button>
        </li>
        <li className="navbaritem">
          <button
            className="navbar-item-btn"
            onClick={() => handleButtonClick("priceReductions")}
          >
           <HiColorSwatch/> Price Reductions
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;