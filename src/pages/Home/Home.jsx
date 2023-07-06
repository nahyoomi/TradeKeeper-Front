import { useState } from 'react'
import { useSelector } from 'react-redux'
import Dashboard from '../../components/Dashboard/Dashboard'
import { Layout } from '../../components/Layout/Layout'
import './Home.scss'
import SuppliersOverview from '../../components/SuppliersOverview/SuppliersOverview'
import ItemsOverview from '../../components/ItemsOverview/ItemsOverview'
import PriceReductionsOverview from '../../components/PriceReductionsOverview/PriceReductionsOverview'
import ProductDetails from '../../components/ProductDetails/ProductDetails'
import { CreateItem } from '../../components/CreateItem/CreateItem'

export const Home = () => {

  const currentComponent = useSelector((state) => state.global.currentComponent);

  const [selectedItemCode, setSelectedItemCode] = useState(null);

  const renderComponent = () => {
    switch (currentComponent) {
      case 'dashboard':
        return <Dashboard />;
      case 'items':
        return <ItemsOverview setSelectedItemCode = {setSelectedItemCode}/>;
      case 'suppliers':
        return <SuppliersOverview setSelectedItemCode = {setSelectedItemCode}/>;
      case 'priceReductions':
        return <PriceReductionsOverview />;
      case 'productDetails':
        return <ProductDetails itemCode={selectedItemCode} />;
        case 'createItem':
          return <CreateItem />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className='home-container'>
      <div className='dashboard-container'>
        {renderComponent()}
      </div>
      </div>
    </Layout>
  )
}
