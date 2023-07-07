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
  
  const handleButtonClick = () => {
    dispatch(setCurrentComponent('createItem'));
  };

  const handleClick = (itemCode, e) => {
    e.stopPropagation();
    setSelectedItemCode(itemCode);
    dispatch(setCurrentComponent('productDetails'));
    console.log(items);
  };

  if(items.length === 0){
    return (<p>There are no items avaible</p>)
  }

  return (
    <div className="crud-container">
      <div className="header">
        <div className="search-bar">
          {/* Componente del buscador */}
        </div>
        <button className="create-button"  onClick={handleButtonClick}>New Item</button>
      </div>
      <div className="table">
        <ul className="table-header">
          <li className="table-header-item">Item Code</li>
          <li className="table-header-item">Price</li>
          <li className="table-header-item">State</li>
          <li className="table-header-item">Creation Date</li>
          <li className="table-header-item">Created by User</li>
          <li className="table-header-item"></li>
        </ul>
        {items.map((item) => (
          <ul className="items-list" key={item.itemCode} onClick={(e) => handleClick(item.itemCode,e)}>
            <li className="items-list-item">{item.itemCode}</li>
            <li className="items-list-item">{item.price}</li>
            <li className="items-list-item">{item.state}</li>
            <li className="items-list-item">{item.creationDate}</li>
            <li className="items-list-item">{item.userId}</li>
            <li className="items-list-item">
              {/* <button onClick={() => handleEdit(item.itemCode)}>Details</button> */}
              {/* <button onClick={() => handleDelete(item.itemCode)}>Deactivate</button>  */}
            </li>
          </ul>
        ))}
        </div>
      </div>
  );
}

export default ItemsOverview;