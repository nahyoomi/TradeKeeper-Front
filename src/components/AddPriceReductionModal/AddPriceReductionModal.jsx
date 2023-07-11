
import { useForm } from "react-hook-form"
import PropTypes from "prop-types"
import { addReduction } from "../../services/Services"
import './AddPriceReductionModal.scss'
/* import { BiError } from "react-icons/bi"; */

export const AddPriceReductionModal = ({item, setShowModalReduction}) => {
  const { register, handleSubmit/* , formState: { errors } */ } = useForm(); 

  const onSubmit = (data) => { 

    const NewData = {
      ...item,
      priceReductions: [
        {        
              item: parseInt(item.idItem)  ,      
          reducedPrice: data.reducedPrice,
          startDate: data.startDate,
          endDate: data.endDate,
        }
      ]
    }
    console.log("NewData", NewData);
    addReduction(NewData) .then((res) => {
      console.log('====================================');
      console.log(res);
      console.log('====================================');
      setShowModalReduction(false)
    })
    .catch((error) => {
      // Manejo de errores
      console.log("Ocurrió un error al obtener los elementos:", error);
    });
  }; 

  return (
    <div className='login-reduction'> 
    <div className='welcome'> 
      <button onClick={()=>setShowModalReduction(false)} className='welcome-subtitle'>x</button> 
      <form onSubmit={handleSubmit(onSubmit)}> 
        <div className='form-group'> 
          <label className='form-group-label'>reducedPrice : </label> 
          <input className='form-group-input' type='text' {...register("reducedPrice", { required: true })}/> 
{/*           {errors.reducedPrice && <p className="form-error"><BiError/> Please check your username or password</p>} 
 */}    </div> 
        <div className='form-group'> 
          <label className='form-group-label'>startDate : </label> 
          <input className='form-group-input' type='date' {...register("startDate", { required: true, })} /> 
{/*           {errors.startDate && <p className="form-error"><BiError/> Please check your username or password</p>} 
 */}     </div> 
         <div className='form-group'> 
            <label className='form-group-label'>endDate : </label> 
            <input className='form-group-input' type='date' {...register("endDate", { required: true})} /> 
{/*           {errors.endDate && <p className="form-error"><BiError/> Please check your username or password</p>} 
 */}     </div> 
        <button className='login-button' type='submit'>Add price Reduction</button> 
      </form> 
    </div> 
  </div> 
  )
}


AddPriceReductionModal.propTypes = {
  item: PropTypes.any.isRequired,
  setShowModalReduction: PropTypes.any.isRequired,
};