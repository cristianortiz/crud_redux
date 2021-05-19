import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  deleteProductAction,
  getEditProductAction,
} from "../actions/productAction";
import Swal from "sweetalert2";

const SingleProduct = ({ product }) => {
  const { id, product_name, price } = product;

  const dispatch = useDispatch();
  //enable history to redirection
  const history = useHistory();

  //product delete confirmation
  const productDeleteOK = (id) => {
    //ask for user confirmation
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        //pass the id to the action to delte from DB and update the state
        dispatch(deleteProductAction(id));
      }
    });
  };

  //function to redirect using history
  const redirectEdition = (product) => {
    //dispatch to get object data to fill de edit form an then edit it
    dispatch(getEditProductAction(product));
    history.push(`/products/edit/${product.id}`);
  };

  return (
    <tr>
      <td>{product_name}</td>
      <td>
        <span className="font-weight-bold">$ {price}</span>
      </td>
      <td className="actions">
        <button
          type="button"
          onClick={() => redirectEdition(product)}
          className="btn btn-primary mr-2"
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => productDeleteOK(id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default SingleProduct;
