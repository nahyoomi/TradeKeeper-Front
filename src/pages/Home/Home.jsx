

import { useState } from 'react'
import Dashboard from '../../components/Dashboard/Dashboard'
import { Layout } from '../../components/Layout/Layout'
import Navbar from '../../components/Navbar/Navbar'
import './Home.scss'
import SuppliersOverview from '../../components/SuppliersOverview/SuppliersOverview'
import ItemsOverview from '../../components/ItemsOverview/ItemsOverview'
import PriceReductionsOverview from '../../components/PriceReductionsOverview/PriceReductionsOverview'

export const Home = () => {

  const [currentComponent, setCurrentComponent] = useState('dashboard');

  const renderComponent = () => {
    switch (currentComponent) {
      case 'dashboard':
        return <Dashboard />;
      case 'items':
        return <ItemsOverview />;
      case 'suppliers':
        return <SuppliersOverview />;
      case 'priceReductions':
        return <PriceReductionsOverview />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className='home_container'>
        <div className='navbar_container'>
          <Navbar  setCurrentComponent={setCurrentComponent}/>
        </div>
      <div className='dashboard_container'>
        {renderComponent()}
      </div>
      </div>
    </Layout>
  )
}
