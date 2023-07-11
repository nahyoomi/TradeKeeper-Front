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
  }, [itemCode, showModalReduction]);

  const handleSupplierChange = (event) => {
    /* setSelectedSupplier(event.target.value); */
    const newData = {
      ...item,
      suppliers: [
        {
          idItem: item.idItem,
          supplierId: parseInt(event.target.value),
        },
      ],
    };
    console.log("newData", newData);
    updateSupplier(newData).then((response) => {
      console.log("response", response);
    });
  };

  const handleEditButtonClick = () => {
    isEditing === "Edit" ? setIsEditing("Save") : setIsEditing("Edit");
  };

  const onSubmit = async (data) => {
    if (!data.field1 || !data.field2 || !data.field3) {
      console.log("All fields must be completed in any other case default results");
      return;
    }
    
    const itemUpdated = {
      field1: data.field1 ?? item.field1,
      field2: data.field2 ?? item.field2,
      field3: data.field3 ?? item.field3,
      price: parseInt(data.price),
      idItem: item.idItem,
      itemCode: item.itemCode,
      state: item.state,
      userId: item.userId,
      priceReductions: [...item.priceReductions],
      suppliers: [...item.suppliers],
    };
  
    console.log(itemUpdated, "Fields updated");
  
    try {
      const res = await updateItem(itemUpdated);
      setItem(res.data);
      console.log(res);
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

            <label className="card-header-labels">Price Reductions </label>
            {item.priceReductions.map((reduction) => {
              return (
                <div key={reduction.priceReductionId}>
                  <p>{reduction.priceReductionId}</p>
                  <span>{reduction.reducedPrice}</span>
                  <span>{DateTime.fromISO(reduction.startDate).toFormat("dd/MM/yyyy")}</span>
                  <span>{DateTime.fromISO(reduction.endDate).toFormat("dd/MM/yyyy")}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="card-elections">
          <select className="card-elections-select"
            /* value={selectedSupplier} */ onChange={handleSupplierChange}
          >
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
      <button className="addReduction-button"
        /* className="deactivate-button" */ onClick={() =>
          setShowModalReduction(true)
        }
      >
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
