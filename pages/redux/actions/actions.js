import {
    ADD_PRODUCTS,
    EDIT_PRODUCTS,
    DELETE_PRODUCTS,
    GET_PRODUCTS,
    PRODUCTS_ERROR,
  } from "../reducers/types";
  import axios from "axios";

  export const getProducts = () => async (dispatch) => {
    try {
      const res = await axios.get(`https://fakestoreapi.com/products?limit=5`);
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      });
      console.log(res);
    } catch (error) {
      dispatch({
        type: PRODUCTS_ERROR,
        payload: error,
      });
    }
  };

  export const addProduct = (data) => async (dispatch) => {
    try {
      await axios.post(`https://fakestoreapi.com/products`, data)
        .then((res) => {
          dispatch({
            type: ADD_PRODUCTS,
            payload: res.data,
          });
          console.log(res);
        });
    } catch (error) {
      dispatch({
        type: PRODUCTS_ERROR,
        payload: error,
      });
    }
  };

  export const editProduct = (data) => async (dispatch) => {
    try {
      await axios
        .put(`https://fakestoreapi.com/products/${data.id}`, data)
        .then((res) => {
          dispatch({
            type: EDIT_PRODUCTS,
            payload: res.data,
          });
        });
    } catch (error) {
      dispatch({
        type: PRODUCTS_ERROR,
        payload: error,
      });
    }
  };

  export const deleteProduct = (id) => async (dispatch) => {
    try {
      await axios
        .delete(`https://fakestoreapi.com/products/${id}`)
        .then((res) => {
          dispatch({
            type: DELETE_PRODUCTS,
            payload: res.data,
          });
          console.log(res);
        });
    } catch (error) {
      dispatch({
        type: PRODUCTS_ERROR,
        payload: error,
      });
    }
  };