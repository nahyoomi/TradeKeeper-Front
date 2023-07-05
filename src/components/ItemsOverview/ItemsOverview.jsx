import { useState, useEffect } from 'react';
import './ItemsOverview.scss';
import { getItems } from '../../services/Services';
import { useDispatch  } from 'react-redux';
import { setCurrentComponent } from '../../redux/global/globalSlider';
import PropTypes from 'prop-types';


const ItemsOverview = ({setSelectedItemCode}) => {
  ItemsOverview.propTypes = {
    setSelectedItemCode: PropTypes.func.isRequired,
  };
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems().then((res) => {setItems(res.data)})
    .catch((error) => { 
      // Manejo de errores 
      console.log("Ocurrió un error al obtener los elementos:", error); 
    });
  }, []);


  const handleClick = (itemCode) => {
    setSelectedItemCode(itemCode);
    dispatch(setCurrentComponent('productDetails'));
    console.log(items);
  };

  if(items.length === 0){
    return (<p>There are no items avaible</p>)
  }

  return (
    <div>
        <div className="items-container">
          {items.map((item) => (
            <ul className='items-list' key={item.itemCode} onClick={() => handleClick(item.itemCode)}>
              <li className='items-list-item'>Image</li>
              <li className='items-list-item'>Product ID: {item.itemCode}</li>
              <li className='items-list-item'>Price: {item.price}</li>
              <li className='items-list-item'>Creation Date: {item.creationDate}</li>
            </ul>
          ))}
        </div>
    </div>
  );
}

export default ItemsOverview;