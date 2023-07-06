import { useState } from 'react';
import './ProductDetails.scss'
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { getItemByCode } from '../../services/Services';
import { deactivateItem } from '../../services/Services';

const ProductDetails = ({ itemCode }) => {
  const [item, setItem] = useState(null);

  ProductDetails.propTypes = {
    itemCode: PropTypes.any.isRequired,
  };

  const handleDeactivate = async () => {
    try {
      const response = await deactivateItem(item);
      console.log(response);
      
    } catch (error) {
      console.log("Ocurrió un error al desactivar el ítem:", error);
    }
  };

  useEffect(()=>{
    getItemByCode(itemCode).then(response =>{setItem(response)});
  }, [itemCode])

  if (!item) {
    return <p>This {itemCode} is not related to any items</p>;
  }
  
  return (
    <div className='card-container'>
      <div className='headset'>
        <div className='headset-left'>
          <button>Return</button>
        </div>
        <div className='headset-right'></div>
          <span>{itemCode}</span>
      </div>
      <div className='card-content'>
        <div className='card-content-tittle'>
          <h2>Type of Item</h2>
        </div>
        <div className='image'>
          <img  src='/' alt='item image'/>
        </div>
        <div className='price'>
          <div className='color-square'></div>
          <span> $ {item.price}</span>
        </div>
        <div className='details'>
          <div className='details-title'>
            <small>{item.creationDate}</small>
          </div>
          <div className='product-details'>
            <p><span>Icon</span>{item.description}</p>
          </div>
        </div>
      </div>
      <button onClick={handleDeactivate}>Deactivate</button>
    </div>
  )
}

export default ProductDetails
