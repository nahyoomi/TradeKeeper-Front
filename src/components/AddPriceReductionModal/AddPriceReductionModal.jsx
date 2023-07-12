
import { useForm } from "react-hook-form"
import PropTypes from "prop-types"
import { addReduction } from "../../services/Services"
import './AddPriceReductionModal.scss'
import { BiError } from "react-icons/bi";

export const AddPriceReductionModal = ({item, setShowModalReduction}) => {
  const { register, handleSubmit, formState: { errors } } = useForm(); 

  const onSubmit = (data) => { 

    const NewData = {
      ...item,
      priceReductions: [
        {        
          item: parseInt(item.idItem),      
          reducedPrice: data.reducedPrice,
          startDate: data.startDate,
          endDate: data.endDate,
        }
      ]
    }
    console.log("NewData", NewData);
    addReduction(NewData) .then((res) => {
      console.log(res);
      setShowModalReduction(false)
    })
    .catch((error) => {
      console.log("There was an error obtaining data", error);
    });
  }; 

  return (
    <div className='login-reduction'> 
    <div className='login-reduction-modal'> 
      <button onClick={()=>setShowModalReduction(false)} className='modal-onclose'>x</button> 
      <form onSubmit={handleSubmit(onSubmit)}> 
        <div className='form-group'> 
          <label className='form-group-label'>Reduced Price</label> 
          <input className='form-group-input' type='text' {...register("reducedPrice", { required: true })}/> 
          {errors.reducedPrice && <p className="form-error"><BiError/> Please enter a valid number</p>}</div> 
        <div className='form-group'> 
          <label className='form-group-label'>Start Date</label> 
          <input className='form-group-input' type='date' {...register("startDate", { required: true, })} /> 
          {errors.startDate && <p className="form-error"><BiError/>Please enter a valid date</p>} 
         </div> 
         <div className='form-group'> 
            <label className='form-group-label'>End Date</label> 
            <input className='form-group-input' type='date' {...register("endDate", { required: true})} /> 
            {errors.endDate && <p className="form-error"><BiError/>Please enter a valid date</p>} 
        </div> 
        <button className='login-button' type='submit'> Apply</button> 
      </form> 
    </div> 
  </div> 
  )
}


AddPriceReductionModal.propTypes = {
  item: PropTypes.any.isRequired,
  setShowModalReduction: PropTypes.any.isRequired,
};