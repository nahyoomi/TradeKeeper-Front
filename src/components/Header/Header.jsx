import './Header.scss'
import PropTypes from 'prop-types';

const Header = ({ currentComponent }) => {
  const currentPath = `/${currentComponent}`;
  return (
    <div className="header">
      <span>Dashboard</span> {currentPath}
    </div>
  )
}

Header.propTypes = {
  currentComponent: PropTypes.string.isRequired
};

export default Header
