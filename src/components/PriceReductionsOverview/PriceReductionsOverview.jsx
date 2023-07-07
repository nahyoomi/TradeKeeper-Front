import './PriceReductionsOverview.scss'
import { useEffect, useState } from 'react';
import { getPriceReductions } from '../../services/Services'
import { useDispatch } from "react-redux";
import { setCurrentComponent } from "../../redux/global/globalSlider";

const PriceReductionsOverview = () => {
  const dispatch = useDispatch();
  const [priceReductions, setPriceReductions] = useState([]);
  

  const handleButtonClick = () => {
    dispatch(setCurrentComponent('createSupplierModal'));
    /* setShowModal(false); */
  };
/*   const handleCloseModal = () => {
    setShowModal(true);
  };
 */
  useEffect(() => {
    getPriceReductions().then((res) => {setPriceReductions(res.data)})
    .catch((error) => { 
      // Manejo de errores 
      console.log("Ocurrió un error al obtener los elementos:", error); 
    });
  }, []);

  if(priceReductions.length === 0){
    return (<p>There are no items avaible</p>)
  }

  return (
    <div className='pricesRed-container'>
            <div className="header">
        <div className="search-bar">
          {/* Aquí puedes agregar tu lógica de búsqueda */}
        </div>
        <button className="create-button" onClick={handleButtonClick}>
          New Price Reduction
        </button>
        
      </div>
      <div className="pricesRed-list">
        {priceReductions.map((reduction) => (
          <div key={reduction.priceReductionId} className="pricesRed-item">
            <span>{reduction.reducedPrice}</span>
            <span>{reduction.startDate}</span>
            <span>{reduction.endDate}</span>
            <div className="buttons">
              <button className="buttons-edit"/* onClick={() => handleEdit(supplier.id)} */>Edit</button>
              <button className="buttons-remove"/* onClick={() => handleDelete(supplier.id)} */>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PriceReductionsOverview
