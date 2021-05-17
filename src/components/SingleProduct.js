import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProductAction } from "../actions/productAction";

const SingleProduct = ({ product }) => {
  const { id, product_name, price } = product;

  const dispatch = useDispatch();

  //product delete confirmation
  const productDeleteOK = (id) => {
    //ask for user confirmation

    //pass the id to the action to delte from DB and update the state
    dispatch(deleteProductAction(id));
  };

  return (
    <tr>
      <td>{product_name}</td>
      <td>
        <span className="font-weight-bold">$ {price}</span>
      </td>
      <td className="actions">
        <Link to={`/products/edit/${id}`} className="btn btn-primary mr-2">
          Edit
        </Link>
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
