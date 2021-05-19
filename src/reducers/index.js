import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import productsReducer from "./productsReducer";

//state separations whit useSelector() we can use them in any components
export default combineReducers({
  products: productsReducer,
  alert: alertReducer,
});
