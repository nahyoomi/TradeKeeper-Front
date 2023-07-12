import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Layout } from '../../components/Layout/Layout'
import Dashboard from '../../components/Dashboard/Dashboard'
import SuppliersOverview from '../../components/SuppliersOverview/SuppliersOverview'
import ItemsOverview from '../../components/ItemsOverview/ItemsOverview'
import ProductDetails from '../../components/ProductDetails/ProductDetails'
import { CreateItem } from '../../components/CreateItem/CreateItem'
import CreateSupplierModal from '../../components/CreateSupplierModal/CreateSupplierModal'
import './Home.scss'

export const Home = () => {

  const currentComponent = useSelector((state) => state.global.currentComponent);
  const user = useSelector((state) => state.global.user);
  const [selectedItemCode, setSelectedItemCode] = useState(null);
  const [items, setItems] = useState([]);


  console.log("this is user id", user.id);
  const renderComponent = () => {
    switch (currentComponent) {
      case 'dashboard':
        return <Dashboard />;
      case 'items':
        return <ItemsOverview setSelectedItemCode = {setSelectedItemCode} items={items} setItems={setItems}/>;
      case 'suppliers':
        return <SuppliersOverview setSelectedItemCode = {setSelectedItemCode}/>;
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
