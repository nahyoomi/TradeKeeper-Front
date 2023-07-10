
import { useState } from 'react';
import Drawer from 'react-modern-drawer';
import { HiMenu/* , HiX  */} from "react-icons/hi";
import './MobileNavbar.scss';


const MobileNavbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <>
    <div onClick={toggleDrawer}><HiMenu></HiMenu></div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction='left'
        className='bla bla bla'
      >
      <div className='content'>
 {/*        <span onClick={toggleDrawer}><HiX></HiX></span>
        <div className='content__heading'>
          <NavLink to={'/login'} className='content__heading--navigateto'>
            <button>Login</button>
          </NavLink>
          <NavLink to={'/checkout'} className='content__heading--navigateto'>
            <button>My Orders</button>
          </NavLink>
        </div>
        <ul className='content__categories'>
          <NavLink to={'/'} className='content__categories--link'>
            <li>Dashboard</li>
          </NavLink>
          <NavLink to={'/shop'} className='content__categories--link'>
            <li>Items</li>
          </NavLink>
          <NavLink to={'/featured'} className='content__categories--link'>
            <li>Create Item</li>
          </NavLink>
          <NavLink to={'/recommended'} className='content__categories--link'>
            <li>Suppliers</li>
          </NavLink>
        </ul> */}
      </div>
      </Drawer>
    </>
  )
}

export default MobileNavbar
