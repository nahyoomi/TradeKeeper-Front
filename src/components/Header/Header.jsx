import './Header.scss'
import PropTypes from 'prop-types';
import { HiChevronRight } from "react-icons/hi";

const Header = ({ currentComponent }) => {
  const currentPath = `/${currentComponent}`;
  return (
    <div className="heading">
      <div className='heading-content'>
        <div className='heading-content-route'>
          <span>Home</span>
          <HiChevronRight/>
          {currentPath}
        </div>
      </div>
    </div>
  )
}

Header.propTypes = {
  currentComponent: PropTypes.string.isRequired
};

export default Header
