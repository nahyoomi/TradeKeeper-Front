import axios from "axios";

let URL_MAIN = "http://localhost:8080";

//Related to Item
export const createItem = async(data) =>{
    let URL =`${URL_MAIN}/item`;
    let response = await axios.post(URL, data);
    return response;
};

export const getItems = async() => {
    let URL =`${URL_MAIN}/item/items`;
    let response = await axios.get(URL);
    return response;
};

export const getItemByCode = async(itemCode) => {
    const response = await axios.get(`http://localhost:8080/item/${itemCode}`);
    return response.data;
}

export const updateItem = async(data) => {
    let URL = `${URL_MAIN}/item/update`;
    let response = await axios.put(URL, data);
    return response;
}

export const deactivateItem = async(data) => {
    let URL = `${URL_MAIN}/item/remove`;
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