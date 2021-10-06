import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProduct, addProduct, editProduct } from "./redux/actions/actions";
import Styles from '../styles/Home.module.scss'
import image from "next/image";
import Modal from "react-modal";
import EditProduct from "react-modal";

export default function Home() {

  (Modal, EditProduct).setAppElement();

  const dispatch = useDispatch();
  
  const allProductsData = useSelector((state) => state.Products);
  const { loading, error, products } = allProductsData;
  const[update, setUpdate] = useState({id:null, status:false});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, seteditModalIsOpen] = useState(false);
  
  const [ form, setForm ] = useState({
    title :"",
    price:"",
    category:"",
    image:""
  });

  useEffect(() => {
    dispatch(getProducts());
  }, []);


   //search
  const [inputSearch, setInputSearch] = useState("");

  const handleChangeSearch = (e) => {
     e.preventDefault();
     setInputSearch(e.target.value);
   };
 
  //add data
  function handleChange(e){
    let data = {...form};
    data[e.target.name]= e.target.value;
    setForm(data);
  }  
  
  const handleSubmit=(e)=> {
  e.preventDefault();
  if (
    (form.title === "",
    form.price === "",
    form.category === "",
    form.image=="")
  ) {
    return false;
  }

  //edit
  if(update.status){
    dispatch(
    editProduct({
        id : update.id,
        title : form.title,
        price : form.price,
        category : form.category,
        image : form.image
      })
      );
      alert("product telah diedit");
    }
    else{
    //menambah data
    dispatch(
      addProduct({
        title: form.title,
        price: form.price,
        category: form.category,
        image : form.image
      })
    );
    alert("penambahan product berhasil");
  }
   setForm({title:"", category: "", price:"", image:""});
   setUpdate({ id: null, status: false });
  };


  const handleEdit = (product) => {
    setForm({
      title: product.title,
      price: product.price,
      category: product.category,
      image: product.image
    });
    setUpdate({ id: product.id, status: true });
    console.log(product.id);
  };

  //detele
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    alert("Berhasil menghapus");
  };
  
  return (
   
    <div className='container'>
      <div className='top'>
      <div className="Modal">
          <button onClick={() => setModalIsOpen(true)}>
            Add New Product
          </button>

          <Modal
            isOpen={modalIsOpen}
            ariaHideApp={false}
          >
            <button
            onClick={() => setModalIsOpen(false)}
            placeholder="cancel"
            value="cancel"
            style={{ float: "right" }}
          >Cancel</button>
           <div className={Styles.section}>
           <form onSubmit={handleSubmit}>
            <h1>TOKOTOKOAN</h1>
            <input name="title" value={form.title}  type="text" onChange={handleChange} placeholder="title"/><br/>
            <input name="price" value={form.price} type="type" onChange={handleChange} placeholder="price"/><br/>
            <input name="category" value={form.category} type="text" onChange={handleChange} placeholder="category"/><br/>
            <input name="image" value={form.image} type="input" onChange={handleChange} placeholder="Image Link"  /><br/>
            <input className={Styles.button} type="button" onClick={handleSubmit} placeholder="tambah" value="tambah"/>
            </form>
         </div>
        </Modal>
        </div>
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
            </form>
          </div>
        </div>
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
            
              <button onClick={() => setModalIsOpen(true)&handleEdit(product)}>
            Edit
              </button>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
              </div>
            </div>
          ))}
    </section>
        
    
    </div>
   )
 }