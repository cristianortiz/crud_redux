import { ADD_PRODUCT, SUCCESS_ADD_PROD } from "../types";

//create new products
export function createNewProductAction(product) {
  return (dispatch) => {
    dispatch(addProduct());

    try {
      dispatch(successAddProduct(product));
    } catch (error) {
      dispatch(errorAddProduct(true));
    }
  };
}
//to fire up sometimes in state (see the reducer) when addProduct is called
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
const errorAddProduct = () => {};
