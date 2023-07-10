import { useEffect, useState } from 'react';
import { getItems } from '../../services/Services';
import { useDispatch/* , useSelector  */ } from 'react-redux';
import { setCurrentComponent } from '../../redux/global/globalSlider';
import { HiOutlinePlus } from "react-icons/hi";
import PropTypes from 'prop-types';
import './ItemsOverview.scss';

const ItemsOverview = ({setSelectedItemCode, items, setItems}) => {
  /* const token = useSelector((state) => state.global.token); */
  const [filter, setFilter] = useState('All');

  ItemsOverview.propTypes = {
    setSelectedItemCode: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    setItems: PropTypes.func.isRequired,
  };
  const dispatch = useDispatch();
  /* const [items, setItems] = useState([]); */

  useEffect(() => {
    /* console.log(items, 'estas son mis items');
    setItems(items) */
    getItems(filter).then((res) => {setItems(res.data)})
    .catch((error) => {  
      console.log("Ocurrió un error al obtener los elementos:", error); 
    });
  }, [filter]);

  useEffect(() => {
    console.log("filter", filter);
  }, [filter]);
  
  const handleButtonClick = () => {
    dispatch(setCurrentComponent('createItem'));
  };

  const handleClick = (itemCode, e) => {
    e.stopPropagation();
    setSelectedItemCode(itemCode);
    dispatch(setCurrentComponent('productDetails'));
    console.log(items);
  };
  
  
    const handleFilterChange = (event) => {
      setFilter(event.target.value);
      /* console.log("filter", event.target.value); */
    };


/*   if(items.length === 0){
    return (<p>There are no items avaible</p>)
  } */

  return (
    <div className="crud-container">
      <div className="header">
        <select className="header-selector"value={filter} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Deactive">Deactive</option>
        </select>
        <button className="create-button"  onClick={handleButtonClick}><HiOutlinePlus/> New Item</button>
      </div>
      {
          items.length === 0
        ?<p>There are no items avaible</p>
        :
        <>
              <div className="table">
        <ul className="table-header">
          <li className="table-header-item">Item Code</li>
          <li className="table-header-item">Description</li>
          <li className="table-header-item">Price</li>
          <li className="table-header-item">State</li>
          <li className="table-header-item">Created by</li>
          <li className="table-header-item"></li>
        </ul>
        {items.map((item) => (
          <ul className="items-list" key={item.idItem} onClick={(e) => handleClick(item.itemCode,e)}>
            <li className="items-list-item">{item.itemCode}</li>
            <li className="items-list-item">{item.description}</li>
            <li className="items-list-item">{item.price}</li>
            <li className="items-list-item">{item.state}</li>
            <li className="items-list-item">{item.userId}</li>
            <li className="items-list-item">
            </li>
          </ul>
        ))}
        </div>
        </>
        }

      </div>
  );
}

export default ItemsOverview;