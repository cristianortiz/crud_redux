import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  DELETE_PROD_ERROR,
  DELETE_PROD_SUCCESS,
  EDIT_PROD_ERROR,
  EDIT_PROD_SUCCESS,
  ERROR_ADD_PROD,
  GET_EDIT_PRODUCT,
  GET_PRODUCTS_LIST,
  GET_PROD_LIST_ERROR,
  GET_PROD_LIST_SUCCESS,
  SUCCESS_ADD_PROD,
} from "../types";

//every  reducer must have their own state
const initialState = {
  products: [],
  error: null,
  loading: false,
  product_to_del: null,
  product_to_edit: null,
};

//the redux is a function so export it
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    //the action of save a product and action of get products, do the same
    case GET_PRODUCTS_LIST:
    case ADD_PRODUCT:
      return {
        ...state, //state copy
        loading: true,
      };
    //if the product was succesfully saved in DB
    case SUCCESS_ADD_PROD:
      return {
        ...state,
        loading: false,
        //add the new product object to state
        products: [...state.products, action.payload],
      };
    case ERROR_ADD_PROD:
    case GET_PROD_LIST_ERROR:
    case DELETE_PROD_ERROR:
    case EDIT_PROD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_PROD_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        //update the state products prop whit the retrieved data from productAction func
        products: action.payload,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        //id of the product to be deleted
        product_to_del: action.payload,
      };
    case DELETE_PROD_SUCCESS:
      return {
        ...state,
        products:
          //filter the products object and get all minus the id in product_ok_del
          state.products.filter(
            (product) => product.id !== state.product_to_del
          ),

        product_to_del: null, //reset the prop
      };
    //get the state product object to be edit it later
    case GET_EDIT_PRODUCT:
      return {
        ...state,
        //the product object picked by the user to edit it action.payload
        product_to_edit: action.payload,
      };
    //if a product was succesfully edited update it in state
    case EDIT_PROD_SUCCESS:
      return {
        ...state,
        product_to_edit: null,
        //iterates all state products, if the id of a product match whit
        // the edited product id, replace all data of that product
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? (product = action.payload)
            : product
        ),
      };

    default:
      return state;
  }
};
export default productReducer;
