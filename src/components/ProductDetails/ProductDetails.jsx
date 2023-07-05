import { useState } from 'react';
import './ProductDetails.scss'
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { getItemByCode } from '../../services/Services';

const ProductDetails = ({ itemCode }) => {
  const [item, setItem] = useState(null);

  ProductDetails.propTypes = {
    itemCode: PropTypes.any.isRequired,
  };

  useEffect(()=>{
    getItemByCode(itemCode).then(response =>{setItem(response)});
  }, [itemCode])

  if (!item) {
    return <p>This {itemCode} is not related to any items</p>;
  }
  
  return (
    <div className='card_container'>
      <div className='headset'>
        <div className='headset_left'>
          <button>Return</button>
        </div>
        <div className='headset_right'></div>
          <span>{itemCode}</span>
      </div>
      <div className='card_content'>
        <div className='card_content_tittle'>
          <h2>Type of Item</h2>
        </div>
        <div className='image'>
          <img  src='/' alt='item image'/>
        </div>
        <div className='price'>
          <div className='color_square'></div>
          <span>{item.price}</span>
        </div>
        <div className='details'>
          <div className='details_title'>
            <small>Clasification</small>
          </div>
          <div className='product_details'>
            <p><span>Icon</span> Lorem ipsum dolor sit, amet consectetur adipi</p>
            <p><span>Icon</span> Lorem ipsum dolor sit, amet consectetur adipi</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

/* "idItem": 1,
"itemCode": 1001,
"description": "Descripción del item 1",
"price": 10.99,
"state": "Active",
"creationDate": "2023-01-01T00:00:00.000+00:00",
"userId": "user1", */