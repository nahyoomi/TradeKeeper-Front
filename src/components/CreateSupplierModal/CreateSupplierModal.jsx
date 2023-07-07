 import './CreateSupplierModal.scss'
 import PropTypes from 'prop-types';
 import { useForm } from 'react-hook-form';
 import { createSupplier } from '../../services/Services'

const CreateSupplierModal = ({ onClose }) => {

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
      console.log(data);
      createSupplier(data)
      .then((res) => {
        console.log(res, 'que informacion llega');
      })
      .catch((error) => {
        console.log("no se esta enviando el supplier ", error);
      });
      onClose();
    };

  return (
    <div className="modal">
    <div className="modal-content">
      <div className="modal-header">
        <h3>New Supplier</h3>
        <button className="close-button" onClick={onClose}>
          X
        </button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Provider name:</label>
            <input
              type="text"
              name="supplierName"
              {...register("supplierName", { required: true })}
            />
            {errors.supplierName && <span>Field is required</span>}
          </div>
          <div>
            <label>Country:</label>
            <input
              type="text"
              name="country"
              {...register({ required: true })}
            />
            {errors.country && <span>Field is required</span>}
          </div>
          <div className="modal-footer">
            <button type="button" onClick={onClose}>
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
  onClose: PropTypes.func.isRequired,
};

export default CreateSupplierModal
