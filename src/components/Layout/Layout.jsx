import PropTypes from 'prop-types'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import './Layout.scss'

export const Layout = ({children, currentComponent}) => {
  Layout.propTypes = {
    children: PropTypes.node.isRequired,
    currentComponent: PropTypes.string.isRequired
  };

  return (
    <div className='layout'>  
      <Header currentComponent={currentComponent}/>
      <div className='layout-content'>
          <Navbar />
          <main className='layout-content-container'>{children}</main>
      </div>
    </div>
  )
}
