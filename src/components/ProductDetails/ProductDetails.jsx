import { useState } from 'react';
import './ProductDetails.scss'
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { getItemByCode } from '../../services/Services';
import { deactivateItem } from '../../services/Services';
import Swal from 'sweetalert';
import { useDispatch  } from 'react-redux';
import { setCurrentComponent } from '../../redux/global/globalSlider';

const ProductDetails = ({ itemCode }) => {
  const dispatch = useDispatch();
  const [changeStateItem, setChangeStateItem] = useState();
  const [ item, setItem ] = useState(null);

  useEffect(() => {
    if (changeStateItem) {
      Swal({
        title: 'Item has been deactivated',
        text: `Description: ${changeStateItem}`,
        icon: 'success',
      });
    }
  }, [changeStateItem]);

  const handleClick = () => {
    Swal({
      title: 'Deactivate Item',
      content: {
        element: 'input',
        attributes: {
          placeholder: 'Why do you want to change the state of item?',
          type: 'text',
        },
      },
      buttons: {
        confirm: 'Deactivate',
        cancel: 'Cancel',
      },
    }).then((value) => {
      if (value) {
        setChangeStateItem(value);
        Swal({
          title: 'Item has been deactivated',
          text: `Description: ${changeStateItem}`,
          icon: 'success',
        });
        const ArrayValue ={
            "idItem": item.idItem ,
            "reason": value
        }
        deactivateItem(ArrayValue)
        .then((res) => {
          console.log('Has been deactivated', res );
          dispatch(setCurrentComponent('items'));
        })
        .catch((error) => {
          console.log("no se ha enviado el item ", error);
        });
      }
    });
  };

  useEffect(()=>{
    getItemByCode(itemCode).then(response =>{setItem(response)});
  }, [itemCode])

  if (!item) {
    return <p>This {itemCode} is not related to any items</p>;
  }
  
  return ( 
    <div className="card">
      <div className="card-header">
        <img src="/" alt="Imagen"  className="card-image"/>
        <div className="card-item-code">{itemCode}</div>
      </div>
      <div className="card-body">
        <div className="card-small-text">{item.creationDate}</div>
        <h2 className="card-title">This is title</h2>
        <p  className="card-description">{item.description}</p>
        <div className="card-info">
          <div className="card-price">$ {item.price}</div>
          <div className="card-state">{item.state}</div>
          <div className="card-created-by">{item.userId}</div>
        </div>
      </div>
      <div className="card-buttons">
        <button className="edit-button">Edit</button>
        <button className="back-button">Return</button>
        <button className="deactivate-button" onClick={handleClick}>Deactivate</button>
      </div>
  </div>   
  )
}

ProductDetails.propTypes = {
  itemCode: PropTypes.any.isRequired,
};
export default ProductDetails
