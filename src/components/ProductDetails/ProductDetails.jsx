import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { getItemByCode, updateItem, deactivateItem, getSuppliers, updateSupplier } from "../../services/Services"
import { useDispatch } from "react-redux"
import { setCurrentComponent } from "../../redux/global/globalSlider"
import { AddPriceReductionModal } from "../AddPriceReductionModal/AddPriceReductionModal"
import { DateTime } from "luxon"
import PropTypes from "prop-types"
import Swal from "sweetalert"
import { BiError } from "react-icons/bi"
import "./ProductDetails.scss"


const ProductDetails = ({ itemCode }) => {
  const dispatch = useDispatch();
  const [showModalReduction, setShowModalReduction] = useState(false);
  const [changeStateItem, setChangeStateItem] = useState();
  const [item, setItem] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
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
        console.log("There was an error obtaining data", error);
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
            console.log("Item has not been sent", error);
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
      setItem(response.item);
    });
  }, [itemCode, showModalReduction,isEditing]);

  const handleSupplierChange = (event) => {
    const newData = {
          idItem: item.idItem,
          supplierId: parseInt(event.target.value),
    };
    console.log("newData", newData);
    updateSupplier(newData).then((response) => {
      if(response.status == 200){
        Swal({
          title: "Item has been Add",
          text: `Add  Supplier : ${response.data.item_supplierId}`,
          icon: "success",
        });
        setIsEditing("Edit")
      }
    }).catch((error) =>{
      console.log(error)
      Swal({
        title: "Error",
        text: `the supply is already added`,
        icon: "error",
      });
    })
  };

  const handleEditButtonClick = () => {
    isEditing === "Edit" ? setIsEditing("Save") : setIsEditing("Edit");
  };

  const onSubmit = async (data) => {
    if (!data.creationDate || !data.description || !data.price) {
      console.log("All fields must be completed in any other case default results");
      return;
    }
    
    const itemUpdated = {
      ...item,
      creationDate: data.creationDate,
      description: data.description,
      price: parseInt(data.price),
      priceReductions: [...item.priceReductions],
      suppliers: [...item.suppliers],
    };
  
    try {
      const res = await updateItem(itemUpdated);
      setItem(res.data);
    } catch (error) {
      console.log("Nothing was updated", error);
    }
  };
  if (!item) {
    return <p>This {itemCode} is not related to any items</p>;
  }

  return (
    <div className="PDP-container">
      <form className="card" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="card-title">Item Details</h2>
        <div className="card-header">
          <label className="card-header-labels">Item Code</label>
          <div className="card-item-code">{itemCode}</div>
        </div>
        <div className="card-body">
          {isEditing === "Edit" ? (
            <>
              <label className="card-header-labels">Created on</label>
              <div className="card-small-text">{DateTime.fromISO(item.creationDate).toFormat("dd/MM/yyyy")}</div>
            </>
          ) : (
            <>
              <input
                className="form-input"
                type="date"
                placeholder={item.creationDate}
                {...register("creationDate", { required: true })}
              />
              {errors.description && (
                <p className="form-error">
                  <BiError /> This field is required
                </p>
              )}
            </>
          )}
          {isEditing === "Edit" ? (
            <>
              <label className="card-header-labels">Description</label>
              <p className="card-description">{item.description}</p>
            </>
          ) : (
            <>
              <input
                className="form-input"
                type="textarea"
                placeholder={item.description}
                {...register("description", { required: true, maxLength: 50 })}
              />
              {errors.description && (
                <p className="form-error">
                  <BiError /> This field is required
                </p>
              )}
            </>
          )}
          <div className="card-info">
            {isEditing === "Edit" ? (
              <>
              <label className="card-header-labels">Price</label>
              <div className="card-price">${item.price}</div>
              </>
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
                {errors.price && (
                  <p className="form-error">
                    {" "}
                    <BiError /> Field required, please enter a valid number
                  </p>
                )}
              </>
            )}
            <label className="card-header-labels">State</label>
              <div className="card-state">{item.state}</div>
            
            <label className="card-header-labels">Created by</label>
            <div className="card-created-by">{item.userId}</div>

            <label className="card-header-labels">Suppliers:</label>
            {item.suppliers.map((suppliers) => {
              return (
                <div key={suppliers.item_supplierId}>
                  <span>Id: {suppliers.item_supplierId} </span>
                </div>
              );
            })}

            <label className="card-header-labels">Price Reductions </label>
            {console.log("item",item.priceReductions)}
            {item.priceReductions.map((reduction) => {
              return (
                <div className="card-header-reductions" key={reduction.priceReductionId}>
                  <span><strong>Id: </strong>{reduction.priceReductionId}</span>
                  <span><strong>Price: </strong>{reduction.reducedPrice}</span>
                  <span><strong>Start Date: </strong>{DateTime.fromISO(reduction.startDate).toFormat("dd/MM/yyyy")}</span>
                  <span><strong>End Date: </strong>{DateTime.fromISO(reduction.endDate).toFormat("dd/MM/yyyy")}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="card-elections">
          <select className="card-elections-select" onChange={handleSupplierChange}>
            {suppliers.map((supplier) => (
              <option key={supplier.supplierId} value={supplier.supplierId}>
                {supplier.name}
              </option>
            ))}
          </select>
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
      <button className="addReduction-button" onClick={() => setShowModalReduction(true)}>
        Add Reduction
      </button>
      {showModalReduction && (
        <AddPriceReductionModal
          item={item}
          setShowModalReduction={setShowModalReduction}
        />
      )}
    </div>
  );
};

ProductDetails.propTypes = {
  itemCode: PropTypes.any.isRequired,
};
export default ProductDetails;
