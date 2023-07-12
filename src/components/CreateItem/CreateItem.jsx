
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentComponent } from '../../redux/global/globalSlider'
import { useForm } from "react-hook-form"
import { createItem, getItems } from "../../services/Services"
import { BiError } from "react-icons/bi"
import PropTypes from 'prop-types'
import Swal from 'sweetalert'
import "./CreateItem.scss"

export const CreateItem = ({items, setItems }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState:{ errors }} = useForm();

  useEffect(() => {
   /*  setItems(items) */
    getItems("All").then((res) => {setItems(res.data)})
    .catch((error) => {  
      console.log("Error getting items", error); 
    });
  }, []);

  const onSubmit = (data) => {
    const foundItem = items.find(item => item.itemCode ===  parseInt(data.itemCode));
  
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
      <form onSubmit={handleSubmit(onSubmit)} className="formulary">
        <label className="formulary-tag">Asign item code:</label>
        <input className="formulary-input" type="number" {...register("itemCode", { required: true })} />
        {errors.itemCode && <p className="formulary-error"> <BiError/> Required, please enter a valid code</p>}

        <label className="formulary-tag">Item´s description: </label>
        <input 
          className="formulary-input"
          type="text"
          {...register("description", { required: true, maxLength: 250 })}
        />
        {errors.description && <p className="formulary-error"><BiError/> This field is required</p>}

        <label className="formulary-tag">Add price:</label>
        <input  className="formulary-input" type="text" {...register("price", { required: true, pattern: /^[0-9]+(\.[0-9]+)?$/ })} />
        {errors.price && <p className="formulary-error"> <BiError/> Field required, please enter a valid number</p>}
        <input className="formulary-submit" type="submit"  value='Create'/>
      </form>
    </div>
  );
};

CreateItem.propTypes = {
  items: PropTypes.array.isRequired,
  setItems: PropTypes.func.isRequired,
};