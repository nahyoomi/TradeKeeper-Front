import "./Toolbar.scss";
import { HiOutlinePlus, HiOutlineSearch } from "react-icons/hi";
import { useDispatch } from 'react-redux';
import { setCurrentComponent } from '../../redux/global/globalSlider';

const Toolbar = () => {
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(setCurrentComponent('createItem'));
  };

  return (
    <div className="clearfix">
      <div className="clearfix-left">
        <input type="text" />
        <span><HiOutlineSearch/></span>
      </div>
      <div className="clearfix-right">
        <button className="clearfix-right-btn" onClick={handleButtonClick}><HiOutlinePlus/>New Item</button>
      </div>
    </div>
  );
};

export default Toolbar;
