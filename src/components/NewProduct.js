import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createNewProductAction } from "../actions/productAction";

const NewProduct = ({ history }) => {
  //local state only for the form inputs
  const [product_name, handleProductName] = useState("");
  const [price, handlePrice] = useState("");

  //useDispatch creates a function to comunicates whit actions
  const dispatch = useDispatch();

  //acces to store global state
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  //thw dispatch call in productActions the function to add a new product
  const addProduct = (product) => dispatch(createNewProductAction(product));

  //when user submit the form
  const submitNewProduct = (e) => {
    e.preventDefault();
    //validates form
    if (product_name.trim() === "" || price <= 0) {
      return;
    }

    //if there ir no error

    //create new product calling the function which call the action
    addProduct({
      product_name,
      price,
    });
    //redirect to main component
    history.push("/");
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Add New Product
            </h2>
            <form onSubmit={submitNewProduct}>
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="product name"
                  name="product_name"
                  value={product_name}
                  onChange={(e) => handleProductName(e.target.value)}
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
                  onChange={(e) => handlePrice(Number(e.target.value))}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Add
              </button>
            </form>
            {loading ? <p>Loading...</p> : null}
            {error ? (
              <p className="alert alert-danger p2 mt-4 text-center">
                An error occurs..
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
