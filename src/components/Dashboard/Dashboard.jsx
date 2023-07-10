import { useState } from 'react';
import { useDispatch } from "react-redux";
import { setCurrentComponent } from "../../redux/global/globalSlider";
import { HiArchive, HiMinusCircle, HiUsers, HiColorSwatch } from "react-icons/hi";
import './Dashboard.scss';

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch();

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleButtonClick = (componentName) => {
    dispatch(setCurrentComponent(componentName));
  };

  return (
    <div className={`container ${darkMode ? "dark-mode" : ""}`}>
      <button className="dark-mode-toggle" onClick={handleDarkModeToggle}></button>
      <div className="left-column">
        <div className='left-column-greeting'>
          <h4>Welcome to TradeKeeper, user!</h4>
          <p>We are thrilled to have you on board with us. TradeKeeper is a powerful software designed to streamline your trading activities and help you manage your portfolio effectively. With our user-friendly interface and robust features, you can easily track your trades, analyze performance, and make informed decisions.</p>
        </div>
        <div className='left-column-details'>
          <div className="item">
            <h3><HiArchive/> New Items!</h3>
            <p>Adding new items to track and manage. Stay organized and keep a comprehensive record.</p>
            <div className='btn-details'>
              <button onClick={() => handleButtonClick("items")}>See Details</button>
            </div>
          </div>
          <div className="item">
            <h3><HiUsers/> New Suppliers!</h3>
            <p>Register and manage the information of your suppliers in one place. Simplify your supplier management.</p>
            <div className='btn-details'>
              <button onClick={() => handleButtonClick("suppliers")}>See Details</button>
            </div>
          </div>
          <div className="item">
            <h3><HiColorSwatch /> New Prices!</h3>
            <p>Easily track and manage prices.</p>
            <div className='btn-details'>
              <button  onClick={() => handleButtonClick("createItem")}>See Details</button>
            </div>
          </div>
          <div className="item">
            <h3><HiMinusCircle/> Deactivated</h3>
            <p>Temporarily pause tracking a certain stock.</p>
            <div className='btn-details'>
              <button onClick={() => handleButtonClick("items")}>See Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;