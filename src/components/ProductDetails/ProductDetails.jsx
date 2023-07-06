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
      <button onClick={handleClick}>Deactivate</button>
    </div>
  )
}

ProductDetails.propTypes = {
  itemCode: PropTypes.any.isRequired,
};
export default ProductDetails
