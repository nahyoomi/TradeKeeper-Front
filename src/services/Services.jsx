import axios from "axios";

let URL_MAIN = "http://localhost:8080/api";

//Related to Item
export const createItem = async (data) => {
    let URL = `${URL_MAIN}/item`;
    let response = await axios.post(URL, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'es',
        "Access-Control-Allow-Origin": "*"
      }
    });
    return response;
  };

export const getItems = async(token) => {
    let URL =`${URL_MAIN}/item/items/Active`;
    console.log(token);
    let response = await axios.get(URL, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'aleman',
          "Access-Control-Allow-Origin": "*",
          'Authorization1':  token/* "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY4ODkwOTQzNSwiZXhwIjoxNjg4OTM5NDM1fQ.srh_DZDMcUIROSLNI0yg0FR-HWyrRYcg-Sw5FLzw3qA" */
        },
      });
    return response;
};

export const getItemByCode = async(itemCode) => {
    const response = await axios.get(`${URL_MAIN}/item/${itemCode}`);
    return response.data;
}

export const updateItem = async(data) => {
    let URL = `${URL_MAIN}/item/update`;
    let response = await axios.put(URL, data);
    return response;
}

export const deactivateItem = async(data) => {
    let URL = `${URL_MAIN}/item/remove/${data.idItem}/${data.reason}`;
    console.log(data, URL, 'esta es el body del delete');
/*     const newData = {
      idItem: 1 ,
      reason: "No completo"
    } */
    let response = await axios.delete(URL, data);
    return response;
}

//Related to Supplier

export const createSupplier = async(data) =>{
    let URL =`${URL_MAIN}/supplier`;
    let response = await axios.post(URL, data);
    return response;
};

export const getSuppliers = async() => {
    let URL =`${URL_MAIN}/supplier/suppliers`;
    let response = await axios.get(URL);
    return response;
};

//Related to price reductions 

export const getPriceReductions = async() => {
    let URL =`${URL_MAIN}/supplier/suppliers`;
    let response = await axios.get(URL);
    return response;
};
