import { useEffect, useState } from 'react';
import { getSuppliers } from '../../services/Services'
/* import { useDispatch } from "react-redux";
import { setCurrentComponent } from "../../redux/global/globalSlider"; */
import './SuppliersOverview.scss'
import CreateSupplierModal from '../CreateSupplierModal/CreateSupplierModal';

const SuppliersOverview = () => {

/*   const dispatch = useDispatch(); */
  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    /* dispatch(setCurrentComponent('createSupplierModal')); */
    setShowModal(true);
  };

  useEffect(() => {
    getSuppliers().then((res) => {setSuppliers(res.data)})
    .catch((error) => { 
      // Manejo de errores 
      console.log("Ocurrió un error al obtener los elementos:", error); 
    });
  }, [showModal]);

  if(suppliers.length === 0){
    return (<p>There are no items avaible</p>)
  }

  return (
    <div className='suppliers-container'>
            <div className="header">
        <div className="search-bar">
          {/* Aquí puedes agregar tu lógica de búsqueda */}
        </div>
        <button className="create-button" onClick={handleButtonClick}>
          New Supplier
        </button>
        {showModal && <CreateSupplierModal setShowModal={setShowModal} />}
      </div>
      <div className="supplier-list">
        {suppliers.map((supplier) => (
          <div key={supplier.supplierId} className="supplier-item">
            <span>{supplier.name}</span>
            <span>{supplier.country}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SuppliersOverview
