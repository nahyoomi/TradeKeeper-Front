import { useState, useEffect } from 'react';
import './ItemsOverview.scss'
import { getItems } from '../../services/Services';

const ItemsOverview = () => {

  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems().then((res) => {setItems(res.data)})
  }, []);


  return (
    <div className="items_container">
      {items.map((item) =>(
        <ul className='items_list' key = {item.itemCode}>
          <li className='items_list_item'>Image</li>
          <li className='items_list_item'>Product ID: {item.itemCode}</li>
          <li className='items_list_item'>Price: {item.price}</li>
          <li className='items_list_item'>Creation Date : {item.creationDate}</li>
        </ul>
      ))}
    </div>
  )
}

export default ItemsOverview
