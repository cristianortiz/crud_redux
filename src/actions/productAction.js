import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  DELETE_PROD_ERROR,
  DELETE_PROD_SUCCESS,
  GET_EDIT_PRODUCT,
  ERROR_ADD_PROD,
  GET_PRODUCTS_LIST,
  GET_PROD_LIST_ERROR,
  GET_PROD_LIST_SUCCESS,
  SUCCESS_ADD_PROD,
  EDIT_PRODUCT,
  EDIT_PROD_SUCCESS,
  EDIT_PROD_ERROR,
} from "../types";
import axiosClient from "../config/axios";
import Swal from "sweetalert2";

//--------------create new products---------------------
export function createNewProductAction(product) {
  return async (dispatch) => {
    //the action to add a product to DB or API (notificacion to state)
    dispatch(addProduct());
    try {
      //the real tring to insert a new product in DB or API
      await axiosClient.post("/products", product);
      // action to update state when a product was succefully added in BD
      dispatch(successAddProduct(product));
      //alert to user
      Swal.fire("Success", "Product added correctly", "success");
    } catch (error) {
      console.log(error);
      //dispatch an action if there is an error trying to add a new product in BD
      dispatch(errorAddProduct(true));

      //error alert to user
      Swal.fire({
        icon: "error",
        title: "An error occurs",
        text: "there is an error, please try again",
      });
    }
  };
}
//action to add a new product in the state (see the reducer) when addProduct is called
const addProduct = () => ({
  type: ADD_PRODUCT,
});

//if new product was succefully saved in db go to productReducer and add it to state
const successAddProduct = (product) => ({
  type: SUCCESS_ADD_PROD,
  //adding a new product is going to modified the state, a payload will do it
  payload: product,
});
//if an error occurs trying to save product
const errorAddProduct = (state) => ({
  type: ERROR_ADD_PROD,
  payload: state,
});

//---------function to get products from DB or API---------
export function getProductsAction() {
  return async (dispatch) => {
    dispatch(getProducts());
    try {
      //request the API or DB for data
      const response = await axiosClient.get("/products");
      //dispatch the retrieved data to update state
      dispatch(getProductsSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(getProductsError());
    }
  };
}

const getProducts = () => ({
  type: GET_PRODUCTS_LIST,
  payload: true,
});
//send the retrieve data to productReducer to update the state
const getProductsSuccess = (products) => ({
  type: GET_PROD_LIST_SUCCESS,
  payload: products,
});

const getProductsError = () => ({
  type: GET_PROD_LIST_ERROR,
  payload: true,
});

//-----------selects and delete a product by id-------------
export function deleteProductAction(id) {
  return async (dispatch) => {
    dispatch(deleteProduct(id));
    try {
      await axiosClient.delete(`/products/${id}`);
      dispatch(deleteProductOK());
      //show delete success modal alert
      Swal.fire("Deleted!", "The Product has been deleted.", "success");
    } catch (error) {
      console.log(error);
      dispatch(deleteProductError());
    }
  };
}
const deleteProduct = (id) => ({
  type: DELETE_PRODUCT,
  payload: id,
});

const deleteProductOK = () => ({
  type: DELETE_PROD_SUCCESS,
});

const deleteProductError = () => ({
  type: DELETE_PROD_ERROR,
  payload: true,
});

//-----Fuction to get a product by id before edit it
export function getEditProductAction(product) {
  return (dispatch) => {
    dispatch(getProductAction(product));
  };
}

const getProductAction = (product) => ({
  type: GET_EDIT_PRODUCT,
  payload: product,
});

//-------functions to edit a product from edit form----
export function editProductAction(product) {
  return async (dispatch) => {
    dispatch(getProductAction(product));
    try {
      //passing the id of the product and their data to be edited
      const response = await axiosClient.put(
        `/products/${product.id}`,
        product
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
}
const editProduct = (product) => ({
  type: EDIT_PRODUCT,
  payload: product,
});
const editProductOK = () => ({
  type: EDIT_PROD_SUCCESS,
});

const editProductError = () => ({
  type: EDIT_PROD_ERROR,
  payload: true,
});
