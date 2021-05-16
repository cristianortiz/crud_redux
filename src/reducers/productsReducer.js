import { ADD_PRODUCT, SUCCESS_ADD_PROD } from "../types";

//every  reducer must have their own state
const initialState = {
  products: [],
  error: null,
  loading: false,
};

//the redux is a function so export it
export default function (state = initialState, action) {
  switch (action.type) {
    //the action of save a product in db
    case ADD_PRODUCT:
      return {
        ...state,
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
    default:
      return state;
  }
}
