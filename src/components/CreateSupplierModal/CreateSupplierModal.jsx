 import './CreateSupplierModal.scss'
 import PropTypes from 'prop-types'
 import { useForm } from 'react-hook-form'
 import { createSupplier } from '../../services/Services'
 import { BiError } from "react-icons/bi"

const CreateSupplierModal = ({ setShowModal }) => {

    const { register, handleSubmit, formState: { errors }} = useForm();

    const onSubmit = (data) => {
      console.log(data);
      createSupplier(data)
      .then((res) => {
        console.log(res, 'que informacion llega');
        setShowModal(false)
      })
      .catch((error) => {
        console.log("no se esta enviando el supplier ", error);
      });
    };

  return (
    <div className="modal">
    <div className="modal-content">
      <div className="modal-header">
        <h3>New Supplier</h3>
        <button className="close-button" onClick={()=> setShowModal(false) }>
          X
        </button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Provider name:</label>
            <input
              type="text"
              /* name="name" */
              {...register("name", { required: true })}
            />
            {errors.name && <span className='modal-span'><BiError/> Field is required</span>}
          </div>
          <div>
            <label>Country:</label>
            <input
              type="text"
              /* name="country" */
              {...register("country",{ required: true })}
            />
            {errors.country && <span className='modal-span'><BiError/> Field is required</span>}
          </div>
          <div className="modal-footer">
            <button type="button" onClick={()=> setShowModal(false) }>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

CreateSupplierModal.propTypes = {
  setShowModal: PropTypes.func.isRequired,
};
export default CreateSupplierModal
