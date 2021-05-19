import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { editProductAction } from "../actions/productAction";

const EditProduct = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  //local state for handle the edit form inputs
  const [product_edited, handleProduct] = useState({
    product_name: "",
    price: "",
  });
  //product to edit from state
  const product_to_edit = useSelector(
    (state) => state.products.product_to_edit
  );

  //fill the state in automated way
  useEffect(() => {
    handleProduct(product_to_edit);
  }, [product_to_edit]);

  //destructuring local state to show the changes in inputs when user edit it
  const { product_name, price } = product_edited;
  //get the edit data form
  const onChangeForm = (e) => {
    handleProduct({
      ...product_edited,
      [e.target.name]: e.target.value,
    });
  };

  const submitEditedProduct = (e) => {
    e.preventDefault();

    //dispatch the Action to edit the product
    dispatch(editProductAction(product_edited));

    //redirect to main component
    history.push("/");
  };
  //console.log(product);
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">Edit Product</h2>
            <form onSubmit={submitEditedProduct}>
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="product name"
                  name="product_name"
                  value={product_name}
                  onChange={onChangeForm}
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="product price"
                  name="price"
                  value={price}
                  onChange={onChangeForm}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
