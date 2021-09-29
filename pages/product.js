import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProduct } from "./redux/actions/actions";

const Products = (props) => {
  const { handleEdit } = props;
  const dispatch = useDispatch();
  const allProductsData = useSelector((state) => state.Products);
  const { loading, error, products } = allProductsData;

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    alert("Berhasil menghapus");
  };

  return (
    <section className="product">
      {loading
        ? "Loading..."
        : error
        ? error.message
        : products.map((product) => (
            <div className="card">
             
              <div className="text">
                <h3 key={product.id}>{product.title}</h3>
                <h4>Rp. {product.price}</h4>
                <h4>{product.category}</h4>
              </div>
              <div>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </div>
            </div>
          ))}
    </section>
  );
};

export default Products;