
import { useForm } from "react-hook-form";
import { createItem } from "../../services/Services";
import "./CreateItem.scss";
import { BiError } from "react-icons/bi";

export const CreateItem = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const newData = {
      ...data,
      price: parseInt(data.price),
      itemCode: parseInt(data.itemCode),
    };
    console.log(newData, 'body enviando........');
    createItem(data)
      .then((res) => {
        console.log(res, 'quien eres');
      })
      .catch((error) => {
        console.log("no se ha enviado el item ", error);
      });
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

{/*         <label className="form-label">Item´s state</label>
        <select className="form-select"{...register("state", { required: true })}>
          <option value="active">Active</option>
          <option value="deactive">Deactive</option>
        </select> */}

        {/* <label className="form-label">Creation date : should be default</label>
        <input  type="date" className="form-input"{...register("creationDate", { required: true })} />
        {errors.creationDate && <p className="form-error"><BiError/> This field is required</p>} */}

        <input className="form-submit" type="submit" />
      </form>
    </div>
  );
};
