
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import { createItem } from "../../services/Services";
import "./CreateItem.scss";
import { BiError } from "react-icons/bi";
import { useDispatch } from 'react-redux'
import { setCurrentComponent } from '../../redux/global/globalSlider';
import PropTypes from 'prop-types';
import { getItems } from '../../services/Services';
import Swal from 'sweetalert';


export const CreateItem = ({items, setItems }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
   /*  setItems(items) */
    getItems().then((res) => {setItems(res.data)})
    .catch((error) => {  
      console.log("Ocurrió un error al obtener los elementos:", error); 
    });
  }, []);

  const onSubmit = (data) => {
    console.log(data.itemCode, 'data.itemCode');
    console.log(items, '----items');
    const foundItem = items.find(item => item.itemCode ===  parseInt(data.itemCode));
    console.log(foundItem, 'estre es el foundItem');
    if (foundItem) {
      console.log("El itemCode ya está en la base de datos");
      Swal({
        text: 'Item Code already exists, try a different one',
        buttons: {
          confirm: 'Understand',
        },
      })
    } else {
      console.log("OK");
      const newData = {
        ...data,
        price: parseInt(data.price),
        itemCode: parseInt(data.itemCode),
      };
      createItem(newData)
        .then((res) => {
          console.log(res, 'quien eres');
          if(res.status===200){
            dispatch(setCurrentComponent('items'));
          }
        })
        .catch((error) => {
          console.log("no se ha enviado el item ", error);
        });
    }
  };
  

  return (
    <div className="create-item">
      <h1 className="create-item-title">Create Item</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label className="form-label">Asign item code:</label>
        <input className="form-input" type="number" {...register("itemCode", { required: true })} />
        {errors.itemCode && <p className="form-error"> <BiError/> required, please enter a valid code</p>}

        <label className="form-label">Item´s description: </label>
        <input 
          className="form-input"
          type="text"
          {...register("description", { required: true, maxLength: 250 })}
        />
        {errors.description && <p className="form-error"><BiError/> This field is required</p>}

        <label className="form-label">Add price:</label>
        <input  className="form-input" type="text" {...register("price", { required: true, pattern: /^[0-9]+(\.[0-9]+)?$/ })} />
        {errors.price && <p className="form-error"> <BiError/> Field required, please enter a valid number</p>}
        <input className="form-submit" type="submit" />
      </form>
    </div>
  );
};

CreateItem.propTypes = {
  items: PropTypes.array.isRequired,
  setItems: PropTypes.func.isRequired,
};