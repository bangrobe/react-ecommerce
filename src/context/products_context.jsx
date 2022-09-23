import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  isSidebarOpen : false,
  product_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {}
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  //Reducer la cach dung khac cua useState khi state co logic phuc tap, co nhieu action
  const [ state, dispatch  ] = useReducer(reducer, initialState)

  //Control Sidebar
  const openSidebar = () => {
    dispatch({type: SIDEBAR_OPEN}) //dispatch an action
  }

  const closeSidebar = () => {
    dispatch({type: SIDEBAR_CLOSE})
  }

  //fetch all products and filter featured products in reducer action
  const fetchProducts = async (url) => {
    dispatch({type: GET_PRODUCTS_BEGIN})
    try {
      const response = await axios.get(url)
      const products = response.data;
      dispatch({type: GET_PRODUCTS_SUCCESS, payload: products})
    } catch(error) {
      dispatch({type: GET_PRODUCTS_ERROR})
    }
    
  }

  const fetchSingleProduct = async(url) => {
    dispatch({type: GET_SINGLE_PRODUCT_BEGIN})
    try {
      const response = await axios.get(url);
      const singleProduct = response.data;
      //Nhan duoc data xong tra ve payload tai reducer-> nhap vao state
      dispatch({type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct})
    } catch(error) {
      dispatch({type: GET_SINGLE_PRODUCT_ERROR})
    }
  }

  // run fetchProducts when app first running
  useEffect(()=> {
    fetchProducts(url)
  },[])
  return (
    <ProductsContext.Provider value={{...state, openSidebar, closeSidebar, fetchSingleProduct}}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
