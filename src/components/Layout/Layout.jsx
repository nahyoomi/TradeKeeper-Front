import PropTypes from 'prop-types';
import Header from '../Header/Header'

export const Layout = ({children}) => {
  Layout.propTypes = {
    children: PropTypes.node.isRequired
  };

  return (
    <div className='layout'>  
      <Header/>
        <main>{children}</main>
    </div>
  )
}
