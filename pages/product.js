import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProduct } from "./redux/actions/actions";
import Image from "next/image";

const Products = (props) => {
  const { handleEdit } = props;
  const dispatch = useDispatch();
  const allProductsData = useSelector((state) => state.Products);
  const { loading, error, products } = allProductsData;

  useEffect(() => {
    dispatch(getProducts());
  }, []);

   //SEARCH TITLE
   const [inputSearch, setInputSearch] = useState("");

   const handleChangeSearch = (e) => {
     e.preventDefault();
     setInputSearch(e.target.value);
   };
 
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    alert("Berhasil menghapus");
  };

  return (
    <div className="container">
      
       <div className="search">
          <form>
            {" "}
            <input
              name={inputSearch}
              type="text"
              placeholder="Search Product Here..."
              onChange={handleChangeSearch}
              value={inputSearch}
              className="input-search"
            />
            </form></div>
    <section className="product">
      {loading
        ? "Loading..."
        : error
        ? error.message
        : products
        .filter((product) => {
          if (inputSearch === "") {
            return product;
          } else if (
            product.title
              .toLowerCase()
              .includes(inputSearch.toLocaleLowerCase())
          ) {
            return product;
          }
        }).map((product) => (
            <div className="idproduct"  key={product.id}>
              <div className="daftarproduct">
              <h3 key={product.id}>{product.title}</h3>
              <img src={product.image}
              width={200}
              height={250} />
              <h4>$ {product.price}</h4>
              <h4>{product.category}</h4>
              
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </div>
            </div>
          ))}
    </section>
    </div>
  );
};

export default Products;