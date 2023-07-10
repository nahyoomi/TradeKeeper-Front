import { useState } from 'react'
import { useSelector } from 'react-redux'
import Dashboard from '../../components/Dashboard/Dashboard'
import { Layout } from '../../components/Layout/Layout'
import './Home.scss'
import SuppliersOverview from '../../components/SuppliersOverview/SuppliersOverview'
import ItemsOverview from '../../components/ItemsOverview/ItemsOverview'
/* import PriceReductionsOverview from '../../components/PriceReductionsOverview/PriceReductionsOverview'
 */import ProductDetails from '../../components/ProductDetails/ProductDetails'
import { CreateItem } from '../../components/CreateItem/CreateItem'
import CreateSupplierModal from '../../components/CreateSupplierModal/CreateSupplierModal'

export const Home = () => {

  const currentComponent = useSelector((state) => state.global.currentComponent);

  const [selectedItemCode, setSelectedItemCode] = useState(null);
  const [items, setItems] = useState([]);

  const renderComponent = () => {
    switch (currentComponent) {
      case 'dashboard':
        return <Dashboard />;
      case 'items':
        return <ItemsOverview setSelectedItemCode = {setSelectedItemCode} items={items} setItems={setItems}/>;
      case 'suppliers':
        return <SuppliersOverview setSelectedItemCode = {setSelectedItemCode}/>;
      /* case 'priceReductions':
        return <PriceReductionsOverview setSelectedItemCode = {setSelectedItemCode}/>; */
      case 'productDetails':
        return <ProductDetails itemCode={selectedItemCode} />;
        case 'createItem':
          return <CreateItem items={items} setItems={setItems} />;
        case 'createSupplierModal':
          return <CreateSupplierModal />;
      default:
        return null;
    }
  };

  return (
    <Layout currentComponent={currentComponent}>
      <div className='home-container'>
      <div className='dynamic-container'>
        {renderComponent()}
      </div>
      </div>
    </Layout>
  )
}
