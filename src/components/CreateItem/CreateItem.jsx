/* import { useState } from 'react'; */
import { useForm } from "react-hook-form";
import { createItem } from '../../services/Services'
import './CreateItem.scss'

export const CreateItem = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    /* const [newItem, setNewItem] = useState({}); */

   /*  const onSubmit = (data, e) => {
      e.preventDefault();
      const newData = {
        itemCode: data.itemCode,
        description: data.description,
        price: data.price,
        state: data.state,
        creationDate: data.creationDate,
        userId: data.userId
      }; */

      
    const onSubmit = data => {
        console.log(data)
        createItem(data).then((res) => {
            console.log(res);
        })
        .catch((error) => { 
            // Manejo de errores 
            console.log("no se ha enviado el item ", error); 
          });
    };
      console.log(watch("example"));
/*       createItem(newData).then(() => {
        setNewItem({});
      }); */


  return (
    <div className="create-item">
      <h1  className="create-item-title">Create Item</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <label>code</label>
      <input {...register("itemCode", { required: true })} />
      {errors.itemCode && <span>This field is required</span>}

      <label>description</label>
      <input {...register("description", { required: true })} />
      {errors.description && <span>This field is required</span>}

      <label>price</label>
      <input {...register("price", { required: true })} />
      {errors.price && <span>This field is required</span>}

      <label>state</label>
      <input {...register("state", { required: true })} />
      {errors.state && <span>This field is required</span>}

      <label>creationDate</label>
      <input {...register("creationDate", { required: true })} />
      {errors.creationDate && <span>This field is required</span>}

      <input type="submit" />
    </form>
    </div>
  )
}
