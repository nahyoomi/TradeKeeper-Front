import { useState } from "react";
import { useForm } from "react-hook-form";
import "./ProductDetails.scss";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { getItemByCode, updateItem, deactivateItem } from "../../services/Services";
import Swal from "sweetalert";
import { useDispatch } from "react-redux";
import { setCurrentComponent } from "../../redux/global/globalSlider";
import { AssignSupplierModal } from "../AssignSupplierModal/AssignSupplierModal";
import { getSuppliers, updateSupplier } from "../../services/Services";
import { BiError } from "react-icons/bi";

const ProductDetails = ({ itemCode }) => {
  const [showModalReduction, setShowModalReduction] = useState(false);
  const dispatch = useDispatch();
  const [changeStateItem, setChangeStateItem] = useState();
  const [item, setItem] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  /* const [selectedSupplier, setSelectedSupplier] = useState(""); */
  const [isEditing, setIsEditing] = useState("Edit");
  const {
    register,
    handleSubmit,
     formState: { errors },
  } = useForm();

  useEffect(() => {
    if (changeStateItem) {
      Swal({
        title: "Item has been deactivated",
        text: `Description: ${changeStateItem}`,
        icon: "success",
      });
    }
    getSuppliers()
      .then((res) => {
        setSuppliers(res.data);
      })
      .catch((error) => {
        // Manejo de errores
        console.log("Ocurrió un error al obtener los elementos:", error);
      });
  }, [changeStateItem, item]);

  const handleClick = () => {
    Swal({
      title: "Deactivate Item",
      content: {
        element: "input",
        attributes: {
          placeholder: "Why do you want to change the state of item?",
          type: "text",
        },
      },
      buttons: {
        confirm: "Deactivate",
        cancel: "Cancel",
      },
    }).then((value) => {
      if (value) {
        setChangeStateItem(value);
        const ArrayValue = {
          idItem: item.idItem,
          reason: value,
        };
        deactivateItem(ArrayValue)
          .then((res) => {
            console.log("Has been deactivated", res);
            Swal({
              title: "Item has been deactivated",
              icon: "success",
            });
            dispatch(setCurrentComponent("items"));
          })
          .catch((error) => {
            console.log("no se ha enviado el item ", error);
            Swal({
              title: "Something went wrong, try again",
              icon: "error",
            });
          });
      }
    });
  };

  useEffect(() => {
    getItemByCode(itemCode).then((response) => {
      setItem(response);
    });
  }, [itemCode,showModalReduction]); 

  const handleSupplierChange = (event) => {
    /* setSelectedSupplier(event.target.value); */
    const newData = 
    { 
      ...item,
      suppliers: [
        {  
          idItem: item.idItem  ,
          supplierId: parseInt(event.target.value)
        }
      ]
    } 
    console.log("newData", newData);
    updateSupplier(newData).then((response) => {
      console.log("response",response);
    });
  };

  const handleEditButtonClick = () => {
    isEditing === "Edit" ? setIsEditing("Save") : setIsEditing("Edit");
  };
  const onSubmit = (data) => {
    const itemUpdated = 
    {
      ...data,
      price: parseInt(data.price),
      idItem:item.idItem,
      itemCode:item.itemCode,
      state:item.state,
      userId: item.userId,
      priceReductions: [
        ...item.priceReductions
      ],
      suppliers: [
        ...item.suppliers
      ]
    }
    console.log(itemUpdated, 'Fields updated');
    updateItem(itemUpdated)
    .then((res) => {
      setItem(res.data)
      console.log(res);
    })
    .catch((error) => {
      console.log("Nothing was updated", error);
    });

    
  };

  if (!item) {
    return <p>This {itemCode} is not related to any items</p>;
  }

  return (
    <>
          <form className="card" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="card-title">Item Details</h2>
      <div className="card-header">
        <label  className="card-header-labels">Item Code</label>
        <div className="card-item-code">{itemCode}</div>
      </div>
      <div className="card-body">
      {isEditing === "Edit" ? (
          <label  className="card-header-labels">Created on
            <div className="card-small-text">{item.creationDate}</div>
          </label>
        ) : (
          <>
            <input
              className="form-input"
              type="date"
              placeholder={item.creationDate}
              {...register("creationDate", { required: true})}
            />
             {errors.description && <p className="form-error"><BiError/> This field is required</p>}
          </>
        )}
        {isEditing === "Edit" ? (
           <label  className="card-header-labels">Description
            <p className="card-description">{item.description}</p>
          </label>
        ) : (
          <>
            <input
              className="form-input"
              type="textarea"
              placeholder={item.description}
              {...register("description", { required: true, maxLength: 50 })}
            />
             {errors.description && <p className="form-error"><BiError/> This field is required</p>}
          </>
        )}
        <div className="card-info">
          {isEditing === "Edit" ? (
            <label  className="card-header-labels">Price
              <div className="card-price">${item.price}</div>
            </label>
          ) : (
            <>
              <input
                className="form-input"
                type="text"
                placeholder={item.price}
                {...register("price", {
                  required: true,
                  pattern: /^[0-9]+(\.[0-9]+)?$/,
                })}
              />
              {errors.price && <p className="form-error"> <BiError/> Field required, please enter a valid number</p>}
            </>
          )}
          <label  className="card-header-labels">State
            <div className="card-state">{item.state}</div>
          </label>
          <label  className="card-header-labels">Created by</label>
          <div className="card-created-by">{item.userId}</div>

          <label  className="card-header-labels">Price Reduction:</label>
          {item.priceReductions.map((retuction)=>{
           return(
            <div  key={retuction.priceReductionId}>
              <p> {retuction.priceReductionId} </p>
              <span> {retuction.reducedPrice} </span>
              <span> {retuction.startDate} </span>
              <span> {retuction.endDate} </span>
            </div>
           
           ) 
          })}
        </div>
      </div>
      <div className="card-elections">
      <select /* value={selectedSupplier} */ onChange={handleSupplierChange}>
          {suppliers.map((supplier) => (
            <option key={supplier.supplierId} value={supplier.supplierId}>
              {supplier.name}
            </option>
          ))}
        </select>
{/*         <select value={selectedSupplier} onChange={handleSupplierChange}>
          {suppliers.map((supplier) => (
            <option key={supplier.supplierId} value={supplier.supplierId}>
              {supplier.name}
            </option>
          ))}
        </select> */}
      </div>
      <div className="card-buttons">
        <button className="edit-button" onClick={handleEditButtonClick}>
          {isEditing}
        </button>
        <button className="deactivate-button" onClick={handleClick}>
          Deactivate
        </button>

      </div>
    </form>
    <button /* className="deactivate-button" */ onClick={()=> setShowModalReduction(true)}>
          modalReduction
        </button>
    {showModalReduction && <AssignSupplierModal item={item} setShowModalReduction={setShowModalReduction} />}
    </>

  );
};

ProductDetails.propTypes = {
  itemCode: PropTypes.any.isRequired,
};
export default ProductDetails;
