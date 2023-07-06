import { useEffect, useState } from 'react';
import { getSuppliers } from '../../services/Services'
import Toolbar from '../Toolbar/Toolbar'
import './SuppliersOverview.scss'

const SuppliersOverview = () => {

 /*  const dispatch = useDispatch(); */
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    getSuppliers().then((res) => {setSuppliers(res.data)})
    .catch((error) => { 
      // Manejo de errores 
      console.log("Ocurrió un error al obtener los elementos:", error); 
    });
  }, []);


  const handleClick = () => {
  /*   dispatch(setCurrentComponent('suppliers')); */
    console.log(suppliers);
  };

  if(suppliers.length === 0){
    return (<p>There are no items avaible</p>)
  }

  return (
    <div className='suppliers-container'>
      <Toolbar/>
        <div className="table">
            <ul className='table-header'>
              <li className='table-header-suppliers'>Item Code</li>
              <li className='table-header-suppliers'>Price</li>
            </ul>
          {suppliers.map((supplier) => (
            <ul className='suppliers-list' key={supplier.supplierId} onClick={() => handleClick(supplier.supplierId)}>
              <li className='suppliers-list-item'>{supplier.name}</li>
              <li className='suppliers-list-item'>{supplier.country}</li>
            </ul>
          ))}
        </div>
    </div>
  )
}

export default SuppliersOverview
