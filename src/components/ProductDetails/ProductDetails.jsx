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
    <div>
      <h2>{item.name}</h2>
      <p>Precio: {item.price}</p>
      <p>Descripción: {item.description}</p>
    </div>
  )
}

export default ProductDetails