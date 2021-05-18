import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../actions/productAction";
import SingleProduct from "./SingleProduct";
import Swal from "sweetalert2";

const Products = () => {
  const dispatch = useDispatch();

  //keep updating
  useEffect(() => {
    //request products from API
    const getProducts = () => dispatch(getProductsAction());
    getProducts();
  }, []);
  //useSelector to acces the products object in  global Store products State
  const products = useSelector((state) => state.products.products);
  const error = useSelector((state) => state.products.error);
  const loading = useSelector((state) => state.products.loading);
  return (
    <Fragment>
      <h2 className="text-center my-5">Products List</h2>
      {error ? (
        <p className="font-weight-bold alert alert-danger text-center mt-4">
          An error occurs
        </p>
      ) : null}
      {loading ? <p className="text-center">Loading...</p> : null}
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0
            ? "No products to show"
            : products.map((product) => (
                <SingleProduct key={product.id} product={product} />
              ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Products;
