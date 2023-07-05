import { useState, useEffect } from 'react';
import './ItemsOverview.scss';
import { getItems } from '../../services/Services';
import ProductDetails from '../ProductDetails/ProductDetails';

const ItemsOverview = () => {

  const [items, setItems] = useState([]);
  const [selectedItemCode, setSelectedItemCode] = useState(null);
  const [showItemOverview, setShowItemOverview] = useState(true);
  const [showProductDetails, setShowProductDetails] = useState(false);

  useEffect(() => {
    getItems().then((res) => {setItems(res.data)})
  }, []);

  const handleClick = (itemCode) => {
    setSelectedItemCode(itemCode);
    setShowItemOverview(false);
    setShowProductDetails(true);
  };

  return (
    <div>
      {showItemOverview && (
        <div className="items_container">
          {items.map((item) => (
            <ul className='items_list' key={item.itemCode} onClick={() => handleClick(item.itemCode)}>
              <li className='items_list_item'>Image</li>
              <li className='items_list_item'>Product ID: {item.itemCode}</li>
              <li className='items_list_item'>Price: {item.price}</li>
              <li className='items_list_item'>Creation Date: {item.creationDate}</li>
            </ul>
          ))}
        </div>
      )}
      {showProductDetails && <ProductDetails itemCode={selectedItemCode} />}
    </div>
  );
}

export default ItemsOverview;