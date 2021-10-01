import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, editProduct } from "./redux/actions/actions";
import Styles from '../styles/Home.module.scss'
import Products from "./product";


export default function Home() {

  const dispatch = useDispatch();
  const[update, setUpdate] = useState({id:null, status:false});
  const [ form, setForm ] = useState({
    title :"",
    price:"",
    category:"",
  });



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
    form.category === "")
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
      })
    );
    alert("penambahan product berhasil");
  }
   setForm({title:"", category: "", price:""});
   setUpdate({ id: null, status: false });
  };
  
  
  const handleEdit = (product) => {
    setForm({
      title: product.title,
      price: product.price,
      category: product.category,
    });
    setUpdate({ id: product.id, status: true });
    console.log(product.id);
  };

  return (
   
    <div className='container'>
      <div className={Styles.section}>
        <form onSubmit={handleSubmit}>
        <input name="title" value={form.title}  type="text" onChange={handleChange} placeholder="title"/><br/>
        <input type="type" value={form.price} name="price" onChange={handleChange} placeholder="price"/><br/>
        <input name="category" value={form.category} type="text" onChange={handleChange} placeholder="category"/><br/>
        <input className={Styles.button} type="button" onClick={handleSubmit} placeholder="tambah" value="tambah"/>
        </form>
       
    </div>
    <Products  handleEdit={handleEdit}/>
    </div>
   )
 }