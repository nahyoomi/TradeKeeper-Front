import PropTypes from 'prop-types';
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar';
import './Layout.scss'; 

export const Layout = ({children}) => {
  Layout.propTypes = {
    children: PropTypes.node.isRequired
  };

  return (
    <div className='layout'>  
      <Header/>
      <div className='layout-content'>
          <Navbar />
          <main>{children}</main>
      </div>
    </div>
  )
}
