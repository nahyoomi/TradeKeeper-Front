import { useState, useEffect } from 'react';
import './ItemsOverview.scss'
import { getItems } from '../../services/Services';

const ItemsOverview = () => {

  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems().then((res) => {setItems(res.data)})
  }, [items]);


  return (
    <div className="items_container">
      {items.map((item) =>(
        <ul key = {item.itemCode}>
          <li>Image</li>
          <li>Product ID: {item.itemCode}</li>
          <li>Price: {item.price}</li>
          <li>Creation Date : {item.creationDate}</li>
        </ul>
      ))}
    </div>
  )
}

export default ItemsOverview
